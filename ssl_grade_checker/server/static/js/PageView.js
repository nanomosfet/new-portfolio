var PageView = {
    renderPage: function() {
        currentPage = ctrl.getCurrentPage();
        sections = document.getElementsByTagName("section");
        for(i = 0; i < sections.length; i++) {
            if(sections[i].id == currentPage) {
                sections[i].style.display = "block";
            } else {
                sections[i].style.display = "none";
            }
        }

    }
};