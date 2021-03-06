<%@page import="scube.entities.Datasource"%>
<%@page import="java.util.ArrayList"%>
<%@page import="scube.dao.DatasourceDAO"%>
<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Developer" %>
<%    Account account = (Account) session.getAttribute("account");
    ArrayList<Datasource> dsList;
    if (!(account instanceof Developer)) {
        response.sendRedirect("login.jsp");
        return;
    } else {
        int companyId = account.getCompanyId();
        DatasourceDAO datasource = new DatasourceDAO();
        dsList = DatasourceDAO.getAllDatasources(account.getCompanyId());
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/template.css">
        <title>Developer Home</title>
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">

                <jsp:include page="sidebarDev.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                    <!-- page content -->

                    <!-- set datasource -->
                    <div class="right_col" id="all">
                        <input id="myInput" class="form-control" type="text" placeholder="Search.." style="width:20%;float:right;margin-right:10px">
                        <br><br><br>
                        <div class="content">

                            <div class="col-lg-3 col-sm-4 col-xs-6" style="margin-bottom: 15px">
                                <a href="addDataSource.jsp" >
                                    <div class="card card-inverse card-info">
                                        <div class="card-block">
                                            <img class="card-img-top create" src="assets/images/create.png">
                                        </div>
                                        <div class="card-footer" >

                                            <div class="row">
                                                <div class="col-sm-offset-1 col-sm-4" style="width:230px">
                                                    <h5 class="card-title "><span class="glyphicon glyphicon-plus "></span>Create New Datasource</h5>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </a> 
                            </div> 
                             <div id="myDiv">   
                            <% for (int i = 0; i < dsList.size(); i++) {
                                Datasource datasource = dsList.get(i);%>
                            <form action="getDatasources" method="post" id="form<%=i%>">
                                <input type=hidden name="datasourceId" value="<%out.print(datasource.getDatasourceId());%>">
                                <input type=hidden name="operation" value="getDatasources">
                                <div class="col-lg-3 col-sm-4 col-xs-6" style="margin-bottom: 15px">
                                    <div class="card card-inverse card-info">
                                        <div class="card-block">
                                            <img class="card-img-top" src="assets/images/download.png">
                                        </div>
                                        <div class="card-footer">
                                            <div class="row" style="margin-left:10px;">

                                                <div class="col-sm-offset-1 col-sm-6" >
                                                    <button class="edit" name="viewBtn" value="view">
                                                        <h4 class="card-title"><%out.println(datasource.getDatasourceName());%></h4>
                                                    </button>

                                                </div>
                                                <div class="col-sm-2" ></div>
                                                <div class="col-sm-1" >
                                                    <button class="delete" name="deleteBtn" value="delete" >
                                                        <i class="fa fa-trash" style="color:black;font-size:x-large;color:#CA5D5F"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>             
                            </form>      
                            <% }%>
                            </div>
                        </div>
                    </div>

                    <!-- jQuery -->
                    <script src="assets/js/jquery.min.js"></script>
                    <!-- Bootstrap -->
                    <script src="assets/js/bootstrap.min.js"></script>
                    <!-- Chart.js -->
                    <script src="assets/js/sweetalert.min.js"></script>
                    <script src="assets/js/dashboard.js"></script>
                    <script>
                        let datasources = document.getElementsByClassName('delete');
                        for (let i = 0; i < datasources.length; i++) {

                            datasources[i].addEventListener('click', function (e) {
                                var form = document.getElementById("form" + i);
                                e.preventDefault();
                                swal({
                                    title: "Confirmation",
                                    text: "Are you sure you want to delete this datasource?",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true
                                })
                                        .then((confirm) => {
                                            if (confirm) {

                                                $.ajax({
                                                    type: "POST",
                                                    url: "getDatasources",
                                                    data: JSON.stringify({
                                                        id: form.elements["datasourceId"].value,
                                                        deleteBtn: form.elements["deleteBtn"].value,
                                                        operation: form.elements["operation"].value,
                                                    }),

                                                    success: function (success) {
                                                        if (success === "true") {
                                                            swal({icon: "success", text: "Datasource has been deleted successfully!!", type: "success"})
                                                                    .then(function () {
                                                                        location.reload();
                                                                    });
                                                        } else {
                                                            swal("ERROR!", {
                                                                icon: "error"
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        });
                            });
                        }

                    </script>

                    <script>
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
              
                $("#myDiv form").filter(function () {
                  
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
            });
        });
    </script>
                    </body>
                    </html>
