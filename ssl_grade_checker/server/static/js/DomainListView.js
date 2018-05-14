var DomainListView = {
    renderDomainList: function(tableBodyID) {
        var domains = ctrl.getDomains();
        var domainListEl = document.getElementById(tableBodyID);
        this.removeChildrenElements(domainListEl);
        for(i = 0; i < domains.length; i++) {
            if(domains[i].active) {
                var tr = document.createElement("tr");
                var th = document.createElement("th");
                th.setAttribute("scope","row");
                th.innerHTML = i + 1;
                tr.appendChild(th);
                var td = document.createElement("td");
                td.innerHTML = domains[i].domain_name;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.appendChild(this.renderStatus(domains[i].status));
                tr.appendChild(td);
                var td = document.createElement("td");
                td.appendChild(this.renderGrade(domains[i].grade));
                tr.appendChild(td);
                var td = document.createElement("td");
                td.innerHTML = this.renderDateString(domains[i].last_updated);
                tr.appendChild(td);

                // Append new row to table
                domainListEl.appendChild(tr);
            }
        }
    },

    renderStatus: function(status) {
        var spanEl = document.createElement("span");
        if(status == "OK") {
            spanEl.setAttribute("class", "badge badge-pill badge-success");
            spanEl.innerHTML = status;
        } else if (status == "Error") {
            spanEl.setAttribute("class", "badge badge-pill badge-danger");
            spanEl.innerHTML = status;
        } else {
            spanEl.innerHTML = status;
        }
        return spanEl;
    },

    renderGrade: function(grade) {
        var spanEl = document.createElement("span");
        if(grade == "A+" || grade == "A" || grade == "A-") {
            spanEl.setAttribute("class", "badge badge-pill badge-success");
            spanEl.innerHTML = grade;
        } else if (grade == "B" || grade == "C") {
            spanEl.setAttribute("class", "badge badge-pill badge-warning");
            spanEl.innerHTML = grade;
        } else {
            spanEl.setAttribute("class", "badge badge-pill badge-danger");
            spanEl.innerHTML = grade;
        }
        return spanEl;
    },

    renderDateString: function(date) {
        var d = new Date(date);
        return d.toDateString();
    },

    renderActiveCheckBox: function(active) {
        var input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('class', 'form-check-input');
        input.checked = active;
        return input;
    },

    renderAnalyzeButton: function(domain_name) {
        var buttEl = document.createElement("button");
        buttEl.setAttribute("class", "btn btn-primary btn-sm analyzeButton");
        buttEl.innerHTML = 'Analyze';
        buttEl.addEventListener('click', function() {
            $('#addDomainModal').modal('show');
            $('#add-domain-name').val(domain_name);
            ctrl.StartDomainAnalyze(domain_name);
        });
        return buttEl;
    },

    renderRemoveButton: function(domain_name) {
        var buttEl = document.createElement("button");
        buttEl.setAttribute("class", "btn btn-danger btn-sm");
        buttEl.innerHTML = 'Remove';
        buttEl.addEventListener('click', function() {
            ctrl.removeDomain(domain_name);
        });
        return buttEl;
    },

    renderAddButton: function(domain_name) {
        var buttEl = document.createElement("button");
        buttEl.setAttribute("class", "btn btn-success btn-sm");
        buttEl.setAttribute("data-toggle", "modal");
        buttEl.setAttribute("data-target", "#addDomainModal");
        buttEl.innerHTML = 'Add Domain';
        
        return buttEl;
    },

    renderConfigTable: function(tableBodyID) {
        var domains = ctrl.getDomains();
        var domainListEl = document.getElementById(tableBodyID);
        this.removeChildrenElements(domainListEl);
        for(i = 0; i < domains.length; i++) {            
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.setAttribute("scope","row");
            th.innerHTML = i + 1;
            tr.appendChild(th);
            
            var td = document.createElement("td");
            td.innerHTML = domains[i].domain_name;
            tr.appendChild(td);
            
            var td = document.createElement("td");
            td.appendChild(this.renderStatus(domains[i].status));
            tr.appendChild(td);
            
            var td = document.createElement("td");
            td.appendChild(this.renderGrade(domains[i].grade));
            tr.appendChild(td);
            
            var td = document.createElement("td");
            td.innerHTML = this.renderDateString(domains[i].last_updated);
            tr.appendChild(td);
            
            var td = document.createElement("td");
            td.appendChild(this.renderActiveCheckBox(domains[i].active));
            tr.appendChild(td);
            
            var td = document.createElement("td");
            td.appendChild(this.renderAnalyzeButton(domains[i].domain_name));
            tr.appendChild(td);

            var td = document.createElement("td");
            td.appendChild(this.renderRemoveButton(domains[i].domain_name));
            tr.appendChild(td);

            // Append new row to table
            domainListEl.appendChild(tr);
            
        }

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(this.renderAddButton(domains[i]));
        tr.appendChild(td);
        domainListEl.appendChild(tr);

    },

    removeChildrenElements: function(el) {
        while(el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

};