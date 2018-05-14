var ctrl = {
    getDomains: function() {
        return Model.domains;
    },

    init: function() {
        Model.init();
        Model.currentPage = Model.pages[0];
        NavView.render();
        PageView.renderPage();
        AnalyzeDomainView.bindAnalyzeButton('analyzeButton');
    },

    getCurrentPage: function() {
        return Model.currentPage;
    },

    getPages: function() {
        return Model.pages;
    },

    setCurrentPage: function(page) {
        Model.currentPage = page;
    },

    reloadDomainLists: function() {
        DomainListView.renderDomainList("domainTableBody");
        DomainListView.renderConfigTable("domainConfigTableBody");
    },

    StartDomainAnalyze: function(domain_name) {        
        DomainAnalysisController.startAnalysis(domain_name);        
    },

    getAnalysisStatus: function() {
        return Model.CurrentAnalyzeStatus;
    },

    removeDomain: function(domain_name) {
        Model.removeDomain(domain_name);
    },

    finishAnalyze: function() {
        AnalyzeDomainView.finishAnalyzeRender();
    }
};