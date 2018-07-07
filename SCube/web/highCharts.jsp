<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager"%>
<%
    Account account = (Account) session.getAttribute("account");
    if (!(account instanceof Manager)){
        response.sendRedirect("/");
        return;
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="/resources/demos/style.css">
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/series-label.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        
        <style>
            
           .reportArea{
                background: white;
                top: 20px;
                height: 80%;
                border: lightgray;
                border: 3px;
            }
            
            .outer {
                height:400px;
                width:400px;
                padding: 10px;
                position:absolute; 
                background: red;
              }
              
              #lineChartBox{
                  display:block;
                width: 100%;
                height: 100%;
                position:relative;
               }
            
        </style>
        <title>Report Template</title>
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <jsp:include page="sidebarReport.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>

                <!-- page content -->
                <div class="right_col" role="main" >
                    <h2>Build Your Report Template</h2>
                    <div class="reportArea" id="container">
                        
                        <div class ="outer" id = "outerLine" style = "display:none"><div id="lineChartBox" ></div></div>
                            
                        
                    </div>
                </div>      
                <!-- page content -->
            </div>
        </div>
<!--                            
        
        <!-- jQuery -->
        <script src="/assets/js/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <!-- Bootstrap -->
        <script src="/assets/js/bootstrap.min.js"></script>
        <!-- Chart.js -->
        <script src="/assets/js/chart.min.js"></script>
        <script src="/assets/js/dashboard.js"></script> 
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

        <script>
            
            $("#addLineChart").click(function () {
                    var lineChartBox = $("#outerLine").clone().draggable({containment: "#container", scroll: false}).resizable();  
                    $("#container").append(lineChartBox.show());
                });
                
                $("#outerLine").resize(function(){
                    var newFontSize = $("#outerLine").height() * 0.07 
                    $("#lineChartBox").css("font-size",newFontSize +"px");
                });

           
            
            Highcharts.chart('lineChartBox', {

                title: {
                  text: 'Solar Employment Growth by Sector, 2010-2016'
                },

                subtitle: {
                  text: 'Source: thesolarfoundation.com'
                },

                yAxis: {
                  title: {
                    text: 'Number of Employees'
                  }
                },
                legend: {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'middle'
                },

                plotOptions: {
                  series: {
                    label: {
                      connectorAllowed: false
                    },
                    pointStart: 2010
                  }
                },

                series: [{
                  name: 'Installation',
                  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                  name: 'Manufacturing',
                  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                  name: 'Sales & Distribution',
                  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                  name: 'Project Development',
                  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                  name: 'Other',
                  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }],

                responsive: {
                  rules: [{
                    condition: {
                      maxWidth: 500,
                      reflow: false
                    },
                    
                    chartOptions: {
                      legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                      }
                    }
                  }]
                }

              });
            
             lineChartBox.setSize(width, height, doAnimation = true);  
        </script>
    </body>
</html>
