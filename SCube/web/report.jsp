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
         <link rel="stylesheet" href="/assets/css/template.css">
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
                    <button class="btn btn-primary" id="changeSize" >Change Page Size</button>
                    <button class="btn btn-success" id="createTemplate" >Create Template</button>
                    <button class="btn" id="printPage" style="color:black">Screenshot</button>
                    <br><br>
                    <div class="row">
                        <div class="col-md-2">
                            <h4>Template Name: </h4>
                        </div>
                        <div class="col-md-5">
                            <input type="text" name="templateName" placeholder="Enter your template Name" class="tbTemplate"/>
                        </div>
                    </div>
                    
                    <input type="hidden" name="companyId" value="<%out.print(account.getCompanyId());%>"/>
                     <input type="hidden" name="userName" value="<%out.print(account.getUsername());%>" />
                   

                     <%String size=request.getParameter("size");
                      String layout=request.getParameter("layout");
                       if(size!=null && layout!=null){%>
                       <input type="hidden" name="size" value="<%out.print(size);%>"/>
                     <input type="hidden" name="layout" value="<%out.print(layout);%>" />
                     <% if (size.equals("A3")&&layout.equals("Portrait")){%>
                      <div id="container" style="width: 29.7cm;height: 42cm;"></div>
                       
                    <% }
                    else if (size.equals("A3")&&layout.equals("Landscape")){%>
                    <div id="container" style="width: 42cm;height: 29.7cm; "></div>
                      
                    <%}
                    else if (size.equals("A4")&&layout.equals("Portrait")){%>
                    <div id="container" style="width: 21cm;height: 29.7cm;"></div>
                                  
                    <%}
                    else if (size.equals("A4")&&layout.equals("Landscape")){%>
                    <div id="container" style=" width: 29.7cm;height: 21cm; "></div>
                        
                    <%}
                    else if (size.equals("A5")&&layout.equals("Portrait")){%>
                    <div id="container" style=" width: 14.8cm;height: 21cm;"></div>
                        
                    <%}else if (size.equals("A5")&&layout.equals("Landscape")){%>
                    <div id="container" style="width: 21cm;height: 14.8cm;"></div>
                       
                    <%}%>
                    <br>
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
                       <div id="size" class="modal">

                                    <!-- Modal content -->
                                    <div class="modal-content">
                                        <form action="report.jsp" method="post">
                                            <div class="row">
                                                 <span class="close">&times;</span>
                                            </div>
                                             <div class="row">
                                                 <div class="col-sm-offset-4 col-sm-3 ">
                                                     <div class='title'>Please choose your report page size.</div>
                                                     <div class="radio">
                                                         <label><input type="radio" name="size" value="A3">A3</label>
                                                     </div>
                                                     <div class="radio">
                                                         <label><input type="radio" name="size" value="A4" checked>A4</label>
                                                     </div>
                                                     <div class="radio">
                                                         <label><input type="radio" name="size" value="A5" >A5</label>
                                                     </div> 
                                                 </div> 

                                             </div> 
                                             <div class="row">
                                                 <div class="col-sm-offset-4 col-sm-3 ">
                                                     <div class='title'>Please choose your report layout.</div>
                                                     <div class="radio">
                                                         <label><input type="radio" name="layout" value="Portrait" checked>Portrait</label>
                                                     </div>
                                                     <div class="radio">
                                                         <label><input type="radio" name="layout" value="Landscape">Landscape</label>
                                                     </div>

                                                 </div> 

                                            </div> 
                                            <div class="row">
                                                <div class="col-sm-offset-7 col-sm-2 ">
                                                <input type="submit" value="Submit" class="btn btn-info">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                  </div>
                    <br><br>
                    <%}%>
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
         <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <!-- HTML To Canvas -->
        <!--<script src="/assets/js/html2canvas.js"></script>-->
        <!-- JS PDF -->
        <script src="/assets/js/jspdf.js"></script>
        <script src="/assets/js/html2pdf.js"></script>
        <script>
            // Get the modal
            var modal = document.getElementById('size');
            // Get the button that opens the modal
            var btn = document.getElementById("changeSize");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            btn.onclick = function() {
                modal.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }

            }
</script>

        <script>
            $(function () {
                $("#printPage").click(function() {
//                    html2canvas(container,{
//                        onrendered: function(canvas) {         
//                            var imgData = canvas.toDataURL(
//                                'image/png');              
//                            var doc = new jsPDF('p', 'mm');
//                            doc.addImage(imgData, 'PNG', 10, 10);
//                            doc.save('sample-file.pdf');
//                        }
//                    });
                    var pdf = new jsPDF('p', 'pt', 'letter');
                    var canvas = pdf.canvas;

                    canvas.width = 8.5 * 72;

                    html2canvas(document.body, {
                        canvas:canvas,
                        onrendered: function(canvas) {
                            var iframe = document.createElement('iframe');
                            iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:500px');
                            document.body.appendChild(iframe);
                            iframe.src = pdf.output('datauristring');

                           //var div = document.createElement('pre');
                           //div.innerText=pdf.output();
                        }
                    });
                });
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
                
                 $("#createTemplate").click(function () {
                     var name = $('input[name=templateName]').val();
                    var size = $('input[name=size]').val();
                    var layout = $('input[name=layout]').val();
                    var company = $('input[name=companyId]').val();
                   var user = $('input[name=userName]').val();
                    
                    if(name===""){
                        swal({icon: "error", text: "Please enter a template name!!", type: "warning"}); 
                    }else{
                         $.ajax({
                      url: "/createTemplate",
                        data: {
                           templateName: name,
                           templatesize: size,
                           templatelayout:layout,
                           companyId:company,
                           userName:user,
                           operation:"createTemplate",
                        },
                        success: function(result){
                          if(result===null){
        
                          } else{  
                                var templateId=result;
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
                                    data: JSON.stringify({operation: "saveComponents", components: components, templateId: templateId}),
                                    contentType: "application/json; charset=utf-8",
                                    success: function(data){
                                        if(data!==null){
                                            swal({icon: "success", text: "Template has been created successfully!!", type: 
                                            "success"}).then(function(){ 
                                               location.reload();
                                               }
                                            ); 
                                        }
                                       
                                },
                                    failure: function(errMsg) {
                                        swal( errMsg, {
                                            icon: "error"
                                        });
                                       
                                    }
                                });
                                
                            } 
                        }
                        
                    }); 
                    }
                    
                    
                  
                });
               
            });
            
        </script>
    </body>
</html>
