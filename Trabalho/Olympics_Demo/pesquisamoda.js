// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.error = ko.observable('');

    var query=location.href.split("?")[1].split("=")[1]
    self.baseUri = "http://192.168.160.58/Olympics/api/Modalities/SearchByName?q="+query;

    self.displayName = 'Pesquisa por modalidades';

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

// cor para o button
function teste(){

    var obj=document.getElementById('innerSearchValue').value // get the query 
    location.href="./pesquisamoda.html?query="+obj // go to the another page to avoid ko multiple element bidding error
}

function myfunc(id){

    document.getElementById(id).style.color="red"

    let type=null


    if(location.href.includes("modalities") || location.href.includes("query")){

        type="modalities"
    }else
        //type="countries"


        /// precisa continuar
    localStorage.setItem(type,id)

    console.log(localStorage)
}

