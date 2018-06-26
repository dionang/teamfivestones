<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%
    Account account = (Account) session.getAttribute("account");
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
        
        <style>
            
            #resizable { width: 150px; height: 150px; padding: 0.5em; }
            #resizable h3 { text-align: center; margin: 0; }
            #draggable { width: 150px; height: 150px; padding: 0.5em; }
/*
*/          .reportArea{
                background: white;
                top: 20px;
                height: 80%;
                border: lightgray;
                border: 3px;
            }

            .dragbox{
                display:table;
                width: fit-content;
                padding: 10px;
                cursor: pointer;
            }
            
           
            .x_panel{
                overflow: hidden;
                position: relative;
            }
                
}
           
            
            

            
        </style>
        <title>Report Template</title>

    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <jsp:include page="reportSidebar.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>

                <!-- page content -->
                <div class="right_col" role="main" >
                    <h2>Build Your Report Template</h2>
                    <div class="reportArea" id="container">
                        
                        
                        <div class="dragbox" id="textbox" style="background:whitesmoke; display:none;">
                            <textarea placeholder="Enter your text here" style="display: table-row"></textarea>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                                    <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                                </ul>
                        </div>

                            
                            <!--<div id="lineChartBox" class="col-md-8 col-sm-8 col-xs-8" style="display: none">-->
                                <div class="x_panel" id = "lineChartBox" style="display: none; width:900px; height: 200px">
                                    <div class="x_title" >
                                        <textarea class="col-md-10 text-center" placeholder="Enter title here" style='font-family:"Helvetica Neue",sans-serif; font-size:13px;' rows="1"></textarea>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                                        </ul>
                                        <div class="clearfix" ></div>
                                    
                                    <div class="x_content" >
                                        <canvas class="lineChart"></canvas>
                                    </div>
                                    </div>
                                </div>
                                <!--</div>-->
                            <!--</div>-->
                        
                        
                            
                            
                        <!--<div id="barChartBox" class="col-md-6 col-sm-6 col-xs-12" style="display:none;">-->
                            <div class="x_panel" id = "barChartBox" style="display: none; width:700px; height: 300px">
                                <div class="x_title">
                                    <textarea class="col-md-10 text-center" placeholder="Enter title here" style='font-family:"Helvetica Neue",sans-serif; font-size:13px;' rows="1"></textarea>
                                    <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                                        </ul>
                                    <div class="clearfix"></div>
                                
                                <div class="x_content">
                                    <canvas class="barChart"></canvas>
                                </div>
                                </div>
                            </div>
                        <!--</div>-->
                        
                        
                        
                        <!--<div id="pieChartBox" class="col-md-4 col-sm-6 col-xs-12" style="display:none;">-->
                            <div class="x_panel" id="pieChartBox" style="display:none; width:500px; height: 300px">
                                <div class="x_title">
                                    <textarea class="col-md-10 text-center" placeholder="Enter title here" style='font-family:"Helvetica Neue",sans-serif; font-size:13px;' rows="1"></textarea>
                                    <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                                        </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                                    <canvas class="pieChart" width="20px" height="20px" ></canvas>
                                </div></div>
                            </div>
                        <!--</div>-->
                        
                        
                        
                        
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
            
            $(document).ready(function() { $('div:empty').remove(); });
            
            
            $(function () {
                $("#addTextbox").click(function () {
                    var textbox = $("#textbox").clone().draggable({containment: "#container", scroll: false});
                    $("#container").append(textbox.show());
                });
                
                $("#addLineChart").click(function () {
                    var lineChartBox = $("#lineChartBox").clone().draggable({containment: "#container", scroll: false}).resizable();
                    $("#container").append(lineChartBox.show());
                     initLineCharts();
                    loadChartBoxes();
                });
                
                $("#addBarChart").click(function () {
                    var barChartBox = $("#barChartBox").clone().draggable({containment: "#container", scroll: false}).resizable();
                    $("#container").append(barChartBox.show());
                     initBarCharts();
                    loadChartBoxes();
                });
                
                $("#addPieChart").click(function () {
                    var pieChartBox = $("#pieChartBox").clone().draggable({containment: "#container", scroll: false}).resizable();
                    $("#container").append(pieChartBox.show());
                     initPieCharts();
                    loadChartBoxes();
                });
                

                
                
                
                
            });

        </script>
    </body>
</html>
