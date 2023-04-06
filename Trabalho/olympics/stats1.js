$("document").ready(function () {
    function drawStuff() {
        console.log('CALL: getGames...');
        var data = new google.visualization.DataTable();
        var options = {
            title: 'Athletes per Olympics Edition',
            width: 800,
            legend: { position: 'none' },
            chart: {
                title: '',
                subtitle: ''
            },
            bars: 'horizontal', // Required for Material Bar Charts.
            axes: {
                x: {
                    0: { side: 'top', label: 'Athletes' } // Top x-axis.
                }
            },
            bar: { groupWidth: "90%" }
        };
        var composedUri = "http://192.168.160.58/Olympics/api/Statistics/Games_Athletes";
        ajaxHelper(composedUri, 'GET').done(function (stats) {
            data.addColumn('string', 'Olympics Edition');
            data.addColumn('number', 'Athletes');
            data.addRows(stats.length);
            $.each(stats, function (index, item) {
                data.setCell(index, 0, item.Name);
                data.setCell(index, 1, item.Counter);
            })
            var chart = new google.charts.Bar(document.getElementById('chart1'));
            chart.draw(data, options);
        });
    };
    google.load("visualization", "1.1", { packages: ["bar"] });
    google.setOnLoadCallback(drawStuff);
})
//--- Internal functions
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
        }
    });
}
