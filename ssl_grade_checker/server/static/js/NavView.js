var NavView = {
    render: function() {
        this.CreateNavLinks();
        this.setActiveLink();
    },

    CreateNavLinks: function() {

        var pages = ctrl.getPages();
        var navLinksEl = document.getElementById('navViewLinks');
        for(i = 0; i < pages.length; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            li.setAttribute('class','nav-item');
            a.setAttribute('class', 'nav-link');
            a.innerHTML = pages[i];
            a.addEventListener('click', (function(page) {
                return function() {
                    ctrl.setCurrentPage(page);
                    PageView.renderPage();
                    NavView.setActiveLink();
                };   
            })(pages[i]));
            li.appendChild(a);
            navLinksEl.appendChild(li);
        }

    },

    setActiveLink: function() {
        var navItems = document.getElementsByClassName('nav-item');
        var currentPage = ctrl.getCurrentPage();
        for(i = 0; i < navItems.length; i++) {
            if(navItems[i].firstChild.innerHTML == currentPage) {
                navItems[i].classList.add('active');
            } else {
                navItems[i].classList.remove('active');
            }
        }
    }

};