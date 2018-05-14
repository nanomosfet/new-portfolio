# California Surf Spot Map Project - Udacity

## Description

This single page application provides the user with a list of surf spots provided by api.spitcast.com.

There are essentially two parts to this project:

1. Google Maps Api class wrapper
2. Knockout JS View Model implementation of list.

## Functionality

1. Responsive on all devices
2. Markers are animated when clicked or list item is clicked.
3. Street View is provided for all the spots. This grabs the nearest street view within 3 km.
4. On smaller devices (less than 500px) list will hide automatically and a menu icon will show up on the right hand side.
5. Build pipeline using npm, babel, and webpack for easy building and developing.
6. Automatic zooming when changing a county.
7. Filtering of surf spots by county.


## How to run

Clone this repository and open dist/index.html in a browser.

or

Clone this repository then do a `npm install` in the root of this repository.
Finally:

```
npm run start
```

to build and open up a development server to run the site on localhost:8080
