<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager"%>
<%
    Account account = (Account) session.getAttribute("account");
    /**if (!(account instanceof Manager)){
        response.sendRedirect("/");
        return;
    }**/
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        
        <style>
            #container{
                background: white;
                height: 85%;
                border: lightgray;
                border: 3px;
                position: relative;
            }

            #textbox{
                display:table;
                width: fit-content;
                padding: 10px;
                cursor: pointer;
            }
            
            .x_panel{
                overflow: hidden;
                position: relative;
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
                <div class="right_col">
                    <h2>Build Your Report Template</h2>
                        <div class="x_panel" id="textbox" style="background-color:whitesmoke; display:none;">
                            <textarea placeholder="Enter your text here" style="box-sizing: border-box; float:left; width:150px; height: 50px"></textarea>
                            <ul class="nav navbar-right panel_toolbox_short">
                                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                                <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                            </ul>
                        </div>
                            
                        <div class="x_panel" id = "lineChartBox" style="display: none; width:700px; height: 200px">
                            <div class="x_title" style="height:90%">
                                <textarea class="col-md-10 text-center" placeholder="Enter title here" style='font-family:"Helvetica Neue",sans-serif; font-size:13px;' rows="1"></textarea>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                    <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                                    <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                                </ul>
                                <div class="clearfix" ></div>
                                <div class="x_content" style="height:100%">
                                    <canvas class="lineChart" ></canvas>
                                </div>
                            </div>
                        </div>
                            
                        <div class="x_panel" id = "barChartBox" style="display: none; width:700px; height: 300px">
                            <div class="x_title" style="height:90%">
                                <textarea class="col-md-10 text-center" placeholder="Enter title here" style='font-family:"Helvetica Neue",sans-serif; font-size:13px;' rows="1"></textarea>
                                <ul class="nav navbar-right panel_toolbox">
                                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                                        <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                                    </ul>
                                <div class="clearfix"></div>
                                <div class="x_content" style="height:100%">
                                    <canvas class="barChart"></canvas>
                                </div>
                            </div>
                        </div>
                        
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
                            <div class="x_content" style="height:80%">
                                <canvas class="pieChart"></canvas>
                            </div>
                        </div>
                    <div id="container"></div>
                    <button class="btn btn-success" id="saveTemplate" style="float:right">Save Template</button>
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
            $(function () {
                $("#addTextbox").click(function() {
                    var textbox = $("#textbox").clone();
                    textbox.draggable({
                        containment: "#container", scroll: false, 
                        drag: function(){}
//                        var xPos = this.style.left;
//                        var yPos = this.style.top;
//                        console.log(xPos+","+yPos);
                    });
                    // make div wrap around textarea
                    textbox.css({"display":"table", "position":"absolute"}),
                    $("#container").append(textbox.show());
                    loadChartBoxes();
                });
                    
                
                $("#addLineChart").click(function () {
                    var lineChartBox = $("#lineChartBox").clone();
                    lineChartBox.draggable({
                        containment: "#container", 
                        scroll: false,
                        drag: function(){}
                    }).resizable();
                    lineChartBox.css({"position":"absolute"}),
                    $("#container").append(lineChartBox.show().resizable());
                    initLineCharts();
                    loadChartBoxes();
                });
                
                $("#addBarChart").click(function () {
                    var barChartBox = $("#barChartBox").clone();
                    barChartBox.draggable({
                        containment: "#container", 
                        scroll: false,
                        drag: function(){}
                    }).resizable();
                    barChartBox.css({"position":"absolute"}),
                    $("#container").append(barChartBox.show().resizable());
                    initBarCharts();
                    loadChartBoxes();
                });
                
                $("#addPieChart").click(function () {
                    var pieChartBox = $("#pieChartBox").clone();
                    pieChartBox.draggable({
                        containment: "#container", 
                        scroll: false,
                        drag: function(){}
                    }).resizable();
                    pieChartBox.css({"position":"absolute"}),
                    $("#container").append(pieChartBox.show().resizable());
                    initPieCharts();
                    loadChartBoxes();
                });
                
                $("#saveTemplate").click(function () {
                    var components = [];
                    for(var component of $("#container").children()){
                        var componentObj = {};
                        
                        // push default component properties first
                        // change implementation of randomId and page at a later time
                        componentObj.type = component.id;        
                        componentObj.id = component.id + (Math.floor(Math.random() * 9999) + 1);
                        componentObj.page = 1
                        componentObj.x = parseInt(component.style.left || 0 , 10); // removes px, set to 0 if undefined
                        componentObj.y = parseInt(component.style.top || 0 , 10);
                        componentObj.height = parseInt(component.style.height || 0 , 10);
                        componentObj.width = parseInt(component.style.width || 0 , 10);
                        console.log(parseInt(component.style.height || 0 , 10));
                        console.log(parseInt(component.style.width || 0 , 10));

                        if(component.id === "textbox"){
                            // default padding on all sides is 10px, use this to recreate the textbox
                            componentObj.text = component.children[0].value;
                            componentObj.height = parseInt(component.children[0].style.height || 0 , 10);
                            componentObj.width = parseInt(component.children[0].style.width || 0 , 10);
                        // complete properties of other components later
                        } else {
                            
                        }
                        
                        components.push(componentObj);
                    }
                    
                    $.ajax({
                        type: "POST",
                        url: "/saveComponents",
                        // The key needs to match your method's input parameter (case-sensitive).
                        // hardcoded templateId to 1 for now
                        data: JSON.stringify({operation: "saveComponents", components: components, templateId: 1}),
                        contentType: "application/json; charset=utf-8",
                        success: function(data){alert(data);},
                        failure: function(errMsg) {
                            alert(errMsg);
                        }
                    });
                });
            });
            
        </script>
    </body>
</html>
