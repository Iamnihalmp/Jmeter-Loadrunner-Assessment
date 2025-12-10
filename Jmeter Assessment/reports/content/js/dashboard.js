/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7142857142857143, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7833333333333333, 500, 1500, "https://demowebshop.tricentis.com/"], "isController": false}, {"data": [0.975, 500, 1500, "https://demowebshop.tricentis.com/login"], "isController": false}, {"data": [0.5, 500, 1500, "https://demowebshop.tricentis.com/logout"], "isController": false}, {"data": [0.9, 500, 1500, "https://demowebshop.tricentis.com/register"], "isController": false}, {"data": [0.95, 500, 1500, "https://demowebshop.tricentis.com/logout-1"], "isController": false}, {"data": [0.95, 500, 1500, "https://demowebshop.tricentis.com/logout-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://demowebshop.tricentis.com/search?q=laptop"], "isController": false}, {"data": [1.0, 500, 1500, "https://demowebshop.tricentis.com/register-1"], "isController": false}, {"data": [0.9, 500, 1500, "https://demowebshop.tricentis.com/register-0"], "isController": false}, {"data": [0.0, 500, 1500, "register"], "isController": true}, {"data": [0.0, 500, 1500, "login and add to cart"], "isController": true}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 120, 0, 0.0, 493.7666666666668, 143, 4367, 335.5, 866.2, 1238.5999999999992, 4096.3099999999895, 0.7836990595611285, 16.275244446757444, 0.7091876979656478], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://demowebshop.tricentis.com/", 30, 0, 0.0, 721.1333333333332, 319, 4367, 358.5, 1237.5000000000005, 3370.949999999999, 4367.0, 0.24649767881352452, 8.520217945031018, 0.15759161497062568], "isController": false}, {"data": ["https://demowebshop.tricentis.com/login", 20, 0, 0.0, 308.24999999999994, 266, 619, 285.5, 333.0, 604.7499999999998, 619.0, 0.16895887540972526, 3.7796710925092083, 0.1319908714687595], "isController": false}, {"data": ["https://demowebshop.tricentis.com/logout", 10, 0, 0.0, 574.6, 513, 848, 527.5, 832.7, 848.0, 848.0, 0.09346755273906664, 3.284234389750348, 0.1376455757133911], "isController": false}, {"data": ["https://demowebshop.tricentis.com/register", 10, 0, 0.0, 633.4000000000001, 338, 3078, 363.0, 2808.200000000001, 3078.0, 3078.0, 0.09388260918547447, 0.18492306906943556, 0.1740037148174922], "isController": false}, {"data": ["https://demowebshop.tricentis.com/logout-1", 10, 0, 0.0, 351.4, 319, 506, 335.0, 489.80000000000007, 506.0, 506.0, 0.09363383552280452, 3.226892632421652, 0.07068257310461708], "isController": false}, {"data": ["https://demowebshop.tricentis.com/logout-0", 10, 0, 0.0, 221.6, 177, 511, 188.5, 480.4000000000001, 511.0, 511.0, 0.09376201325794867, 0.0632710460559009, 0.0672998825630784], "isController": false}, {"data": ["https://demowebshop.tricentis.com/search?q=laptop", 10, 0, 0.0, 732.4000000000001, 547, 1242, 578.5, 1235.2, 1242.0, 1242.0, 0.0933401782797405, 2.4787104179306483, 0.06781747328137397], "isController": false}, {"data": ["https://demowebshop.tricentis.com/register-1", 10, 0, 0.0, 150.9, 143, 160, 153.0, 159.4, 160.0, 160.0, 0.0940786874141532, 0.13735120867593656, 0.07487708031497545], "isController": false}, {"data": ["https://demowebshop.tricentis.com/register-0", 10, 0, 0.0, 481.00000000000006, 195, 2932, 211.0, 2661.000000000001, 2932.0, 2932.0, 0.09400881802713094, 0.04792246387711167, 0.09941616117341806], "isController": false}, {"data": ["register", 10, 0, 0.0, 2418.3, 1520, 5062, 1631.5, 5025.0, 5062.0, 5062.0, 0.09119095385737734, 6.492991832710195, 0.27899622982400146], "isController": true}, {"data": ["login and add to cart", 10, 0, 0.0, 2302.0, 1976, 2967, 2132.5, 2938.2000000000003, 2967.0, 2967.0, 0.09211835366078337, 12.979197156882163, 0.4120946936373853], "isController": true}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 120, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
