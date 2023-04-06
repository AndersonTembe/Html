// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Vari�veis locais
    var self = this;
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record   
    self.Year = ko.observable('');
    self.Records = ko.observableArray([]);
    self.Races = ko.observable('');
    self.Drivers = ko.observable('');
    self.DriverStandings = ko.observableArray([]);
    self.Constructors = ko.observable('');
    self.ConstructorStandings = ko.observableArray([]);
    self.Champions = ko.observableArray([]);
   


    //--- Page Events
    self.activate = function (id) {       
        ajaxHelper("http://192.168.160.58//api/Statistics/Athlete_Country?id={id}&IOC={IOC}"+query, 'GET').done(function (data) {
            console.log('Estatisticas ' + data.Year, data);
            console.log(data.Year);
            self.athletes(data.athletes);
            self.countries(data.countries);
            self.athletessex(data.athletessex);
            self.countrieslogo(data.countrieslogo)
        
            hideLoading();
        });
       

    };
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }
    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());

});
