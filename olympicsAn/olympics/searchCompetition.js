// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.error = ko.observable('');

    var query=location.href.split("?")[1].split("=")[1]
    self.baseUri = "http://192.168.160.58/Olympics/api/Competitions/SearchByName?q="+query;

    self.records = ko.observableArray([]);
   

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getGames...');
        
        hideLoading();
        ajaxHelper(this.baseUri, 'GET').done(function (data) {
            hideLoading();
            
    
            self.records(data);
        
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

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function showLoading() {
        $("#myModal").modal('show', {
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
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };


    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("ready!");
   ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})

function test1() {
    var obj = document.getElementById('innerSearchValue').value
    //var queryTo ="http://192.168.160.58/Olympics/api/Athletes/SearchByName?q="+obj
    location.href = "./searchAthlete.html?query=" + obj
}
function test2() {
    var obj = document.getElementById('innerSearchValue').value
    //var queryTo ="http://192.168.160.58/Olympics/api/Competitions/SearchByName?q="+obj
    location.href = "./searchCompetition.html?query=" + obj
}
function test3() {
    var obj = document.getElementById('innerSearchValue').value
    //var queryTo ="http://192.168.160.58/Olympics/api/Countries/SearchByName?q="+obj
    location.href = "./searchCountry.html?query=" + obj
}
function test4() {
    var obj = document.getElementById('innerSearchValue').value
    //var queryTo ="http://192.168.160.58/Olympics/api/Games/SearchByName?q="+obj
    location.href = "./searchGame.html?query=" + obj
}
function test5() {
    var obj = document.getElementById('innerSearchValue').value
    //var queryTo ="http://192.168.160.58/Olympics/api/Modalities/SearchByName?q="+obj
    location.href = "./searchModality.html?query=" + obj
}