
<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Developer" %>
<%
    Account account = (Account) session.getAttribute("account");
    //if (!(account instanceof Developer)){
        //response.sendRedirect("/");
        //return;
   // }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/createForm.css">
        <title>Add DataSource</title>
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                
                <jsp:include page="sidebarDev.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                <!-- page content -->
                
                <!-- set datasource -->
                <div class="right_col">
                    <div class="row">
                        <div class="col-md-offset-1 col-md-10">
                             <div class="form">
                                 <form action="addDatasource" method="post" id="submitForm">
                                     <div class="row">
                                        <div class="col-md-10 ">
                                            <h1>Add Datasource</h1>
                                        </div>
                                    </div>
                                     <br>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <label for="username" class="icon-link"> Datasource URL
                                                <span class="required">*</span>
                                            </label> 
                                        </div>
                                     </div>
                                     <div class="row">
                                         <div class="col-md-10 col-xs-12 ">
                                        <input type="text" class="form-control" name="datasourceUrl" placeholder="Enter your datasource url" required="" />
                                        </div>
                                     </div>
                                     <br>
                                     <div class="row">
                                        <div class="col-md-5">
                                            <label for="datasourceName" class="icon-bookmark-empty"> Datasource Name
                                                <span class="required">*</span>
                                            </label> 
                                        </div>
                                     </div>
                                     <div class="row">
                                         <div class="col-md-10 col-xs-12 ">
                                        <input type="text" class="form-control" name="datasourceName" placeholder="Enter your datasource name" required="" />
                                        </div>
                                     </div>
                                     <br>
                                     <div class="row">
                                        <div class="col-md-5">
                                            <label for="username" class="icon-bookmark"> Remark
                                            </label> 
                                        </div>
                                     </div>
                                     <div class="row">
                                         <div class="col-md-10 col-xs-12 ">
                                             <textarea class="form-control" name="remark"  ></textarea>
                                        </div>
                                     </div>
                                     <br>
                                    <input type="hidden" name="companyId" value="<%= account.getCompanyId() %>">
                                    <input type="hidden" name="operation" value="addDatasource"/>
                                    <div class="row">
                                        <div class="col-md-5" >
                                            <input type="submit" value="Create Datasource" class="btn btn-success"/>
                                        </div>
                                       
                                    </div>
                            <br/>
                        
                         </form>
                                   
                    </div>
                     <br><br>
                </div>
                <!-- set datasource -->

                
                <!-- page content -->
            </div>
        </div>
        
        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Sweet Alert -->
        <script src="assets/js/sweetalert.min.js"></script>
        <!-- Chart.js -->
        <script src="assets/js/chart.min.js"></script>
        <script src="assets/js/dashboard.js"></script> 
        <script>
            document.getElementById('submitForm').onsubmit = function (e) {
                e.preventDefault();

                swal({
                    title: "Confirmation",
                    text: "Are you sure you want to add this datasource?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then((confirm) => {
                    if(confirm){
                        var form = document.getElementById("submitForm");
                        $.ajax({
                            url: "addDatasource",
                            data: {
                                datasourceUrl: form.elements["datasourceUrl"].value,
                                datasourceName: form.elements["datasourceName"].value,
                                remark: form.elements["remark"].value,
                                operation:form.elements["operation"].value,
                            },
                            success: function(success){
                                if(success === "true"){
                                    swal({icon: "success", text: "Datasource has been added successfully!!", type: 
                                        "success"}).then(function(){ 
                                           window.location = "devHome.jsp";
                                           }
                                        );    
                                } else {
                                    swal("Error!", {
                                        icon: "error"
                                    });
                                }
                            }
                        });
                    }
                });
            };
        </script>
    </body>
</html>
