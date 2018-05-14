/*jshint esversion: 6 */
import loadGoogleMapsApi from 'load-google-maps-api';
import ko from 'knockout';

const getSurfSpots = () => {
    return fetch('http://api.spitcast.com/api/spot/all')
        .then(res => res.json());
};
class GoogleMaps {
    /*
    This class wraps the load-google-maps-api so that we can
    access the map functionality in an easy way.
    */
    constructor(key, element) {
        this.map = null;
        this.googleMaps = null;
        this.markers = [];
        this.key = key;
        this.element = element;
        this.sv = null;

        this.setStreetView = this.setStreetView.bind(this);
        this.zoomInToLocation = this.zoomInToLocation.bind(this);

    }

    loadMaps() {
        /*
        Needed to provide some kind of promise so that we know when the
        map is loaded.
        */
        const key = this.key;
        const element = this.element;
        return loadGoogleMapsApi({'key': key})
            .then(
                (googleMaps) => {
                    this.googleMaps = googleMaps;
                    this.map = new this.googleMaps.Map(element, {
                        center: {lat: 37.769, lng: -122.446},
                        zoom: 6,
                        streetViewControl: false,
                        mapTypeId: 'hybrid'
                    });
                    this.markers = [];
                    this.sv = new googleMaps.StreetViewService();

                },
                (error) => {
                    console.log(error);
                }
            );
    }

    addMarker(location, contentString, key) {
        /*
        This adds a marker to the map and makes a key that we can later
        get the marker from.
        */
        const googleMaps = this.googleMaps;
        const zoomInToLocation = this.zoomInToLocation;
        const self = this;
        let marker = new googleMaps.Marker({
            position: location,
            map: this.map
        });
        var infoWindow = new googleMaps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function() {
            self.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
            zoomInToLocation(marker.getPosition());
            self.toggleBounce(key);
        });

        this.markers.push({marker: marker, key: key, infoWindow: infoWindow});

    }

    getMarker(key) {
        const marker = this.markers.filter((marker) => marker.key == key);
        console.log(marker);
        return marker[0];

    }
    openInfoWindow(key) {
        const marker = this.markers.filter((marker) => marker.key == key);
        console.log(marker);
        marker[0].infoWindow.open(this.map, marker[0].marker);
    }
    closeAllInfoWindows() {
        this.markers.map((marker) => {
            marker.infoWindow.close();
        });
    }

    setStreetView(location) {
        this.sv.getPanorama({location: location, radius: 1000}, (data, status) => {
            const streetView = this.map.getStreetView();
            streetView.setPosition(data.location.latLng);
            streetView.setVisible(true);
        });

    }

    zoomInToLocation(location, zoom=15) {
        this.map.setZoom(zoom);
        this.map.setCenter(location);

    }

    clearMarkers() {
        this.markers.map((marker) => {
            marker.marker.setMap(null);
        });
        this.markers = [];
    }
    toggleBounce(markerKey) {
      const marker = this.markers.filter((marker) => marker.key == markerKey)[0].marker;
      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(this.googleMaps.Animation.BOUNCE);
        setTimeout(() => (marker.setAnimation(null)), 5000);
      }
    }

}
function Spot(data) {
    this.spot_name = ko.observable(data.spot_name);
    this.county_name = ko.observable(data.county_name);
    this.latitude = ko.observable(data.latitude);
    this.longitude = ko.observable(data.longitude);
}

function SurfSpotMapViewModel() {
    /*
    This is the ViewModel for Knockout js. It uses the spit cast api to get the data,
    display the data, and filter the data. It also uses the Google Maps Wrapper class to
    interface with the map/
    */
    var self = this;
    // Need to initialize the map and do some ajax requests to initialize the data
    this.surfSpotMap = new GoogleMaps(
        'AIzaSyCIw77AT33fN4gObr96dtGWKuyYfmO5Tx8',
        document.getElementById('map'));
    this.spots = ko.observableArray([]);
    getSurfSpots().then(
        (result) => {
            const mappedSpots = result.map((item) => {return new Spot(item);});
            this.spots(mappedSpots);
            this.surfSpotMap.loadMaps().then(
                () => {
                    mappedSpots.map(
                        (surfSpot) => {
                            const spotDescription = "<div>"+
                            "<h4>Name: "+surfSpot.spot_name()+"</h4>"+
                            "<h5>County: "+surfSpot.county_name()+"</h5>"+
                            "</div>";
                            this.surfSpotMap.addMarker({lat: surfSpot.latitude(), lng: surfSpot.longitude()}, spotDescription, surfSpot.spot_name());
                        });
                    }
            );

        },
        (error) => {
            alert('There was an error getting the API');
        });
    this.countyNames = ko.computed(() => {
        let allSpots = this.spots();
        let countyNames = ['All'];
        allSpots.map((spot) => {
            if (!countyNames.includes(spot.county_name())) {
                countyNames.push(spot.county_name());
            }
        });
        return countyNames;
    });
    this.selectedCounty = ko.observable('All');

    this.filteredSpots = ko.computed(() => {
        if(this.selectedCounty() == 'All') {
            return this.spots();
        } else {
            return this.spots().filter(spot => spot.county_name() == this.selectedCounty());
        }

    });
    // This renders the markers anytime selectedCounty Changes
    this.renderMarkers = ko.computed(() => {
        if (this.surfSpotMap.googleMaps !== null) {
            this.surfSpotMap.clearMarkers();
            this.filteredSpots().map((surfSpot) => {
                const spotDescription = "<div>"+
          "<h2>Name: "+surfSpot.spot_name()+"</h2>"+
                    "<h3>County: "+surfSpot.county_name()+"</h3>"+
                    "</div>";
                this.surfSpotMap.addMarker({lat: surfSpot.latitude(), lng: surfSpot.longitude()}, spotDescription, surfSpot.spot_name());
            });
            const filSpots = self.filteredSpots();
            console.log(filSpots.length/2);
            self.surfSpotMap.zoomInToLocation({
                lat:filSpots[Math.floor(filSpots.length/2)].latitude(),
                lng:filSpots[Math.floor(filSpots.length/2)].longitude()
            }, 10);


        }
        console.log(this.selectedCounty());

    });

    this.ZoomToSpot = function(spot) {
        document.getElementById('menu').click();
        console.log(self.surfSpotMap.getMarker(spot.spot_name()));
        self.surfSpotMap.closeAllInfoWindows();
        self.surfSpotMap.openInfoWindow(spot.spot_name());
        self.surfSpotMap.toggleBounce(spot.spot_name());
        self.surfSpotMap.zoomInToLocation({
            lat: spot.latitude(), lng: spot.longitude()
        });
    };

    this.goToStreetView = function(spot) {
        self.surfSpotMap.setStreetView({
            lat: spot.latitude(), lng: spot.longitude()
        });
    };

}

ko.applyBindings(new SurfSpotMapViewModel());
