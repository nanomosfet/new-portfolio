var DomainAnalysisController = {
    startAnalysis: function(domain_name) {
        this.AnalysisLoop(domain_name);
        this.initializeAnalysis();
        
    },

    AnalysisLoop: function(domain_name) {
        var self = this;
        // Check Model what the status of the current analysis if it is going on
        currentAnalysis = Model.CurrentAnalysis;
        if(!currentAnalysis) {
            Model.getDomainSSL(domain_name).then(function(response) {
                console.log('Starting Analysis');
                
                Model.CurrentAnalysis = JSON.parse(response);
                setTimeout(function() {
                    self.AnalysisLoop(domain_name);
                }, 5000);
            }, function(error) {
                console.error("Failed!", error);
            });
        }
        else if(currentAnalysis.status == "READY") {
            console.log("Analysis is complete!")
            Model.addDomainFromCurrentAnalysis();
            return true;
        }
        else if(currentAnalysis.status == "ERROR") {
            console.log("Error occured during analysis\nStatus Message is: "+currentAnalysis.statusMessage);
            AnalyzeDomainView.updateProgress();
            return false;
        }
        else if(currentAnalysis.status == "DNS") {
            Model.getDomainSSL(domain_name).then(function(response) {
                Model.CurrentAnalysis = JSON.parse(response);
                console.log('Status is'+currentAnalysis.status);
                AnalyzeDomainView.updateProgress();
                setTimeout(function() {
                    self.AnalysisLoop(domain_name);
                }, 5000);
                
            }, function(error) {
                console.error("Failed!", error);
            });
        }
        else if (currentAnalysis.status == "IN_PROGRESS"){
            Model.getDomainSSL(domain_name).then(function(response) {
                Model.CurrentAnalysis = JSON.parse(response);
                console.log('Status is'+currentAnalysis.status);
                AnalyzeDomainView.updateProgress();
                setTimeout(function() {
                    self.AnalysisLoop(domain_name);
                }, 5000);
                
            }, function(error) {
                console.error("Failed!", error);
            });
        }     
    },

    calculateCurrentPercent: function() {
        var numEndPoints = Model.CurrentAnalysis.endpoints.length;
        
        this.updateCurrentEndpoint();
        var currentProgress = Model.CurrentAnalysis.endpoints[this.currentEndpoint].progress;
        if (currentProgress < 0) {
            currentProgress = 0;
        }
        return (currentProgress + 100*this.currentEndpoint)/(numEndPoints);
    },

    getCurrentStatusMessage: function() {
        if (Model.CurrentAnalysis.endpoints[this.currentEndpoint].statusDetailsMessage) {
            return Model.CurrentAnalysis.endpoints[this.currentEndpoint].statusDetailsMessage;
        }
        else {
            return Model.CurrentAnalysis.status;
        }
    },

    updateCurrentEndpoint: function () {
        if (Model.CurrentAnalysis.endpoints.length - 1 == this.currentEndpoint) {
            // Do Nothing because were at the last endpoint
        }
        else {
            for (var i = this.currentEndpoint; i < Model.CurrentAnalysis.endpoints.length; i++) {
                if (Model.CurrentAnalysis.endpoints[i].progress == 100) {
                    this.currentEndpoint++;
                }
                else {
                    break;
                }
            }
        }
    },

    initializeAnalysis: function() {
        this.currentEndpoint = 0;
        AnalyzeDomainView.initAnalysis();
    },
    currentEndpoint: null,

}