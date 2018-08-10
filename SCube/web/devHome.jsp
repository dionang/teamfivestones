<%@page import="scube.entities.Datasource"%>
<%@page import="java.util.ArrayList"%>
<%@page import="scube.dao.DatasourceDAO"%>
<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Developer" %>
<%
    Account account = (Account) session.getAttribute("account");
    ArrayList<Datasource> dsList;
    if (!(account instanceof Developer)){
        response.sendRedirect("login.jsp");
        return;
   }else{
        int companyId=account.getCompanyId();
        DatasourceDAO datasource=new DatasourceDAO();
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
                <div class="right_col">
                <div class="content">
                    
                               
                        <% for(int i=0;i<dsList.size();i++) {
                            Datasource datasourece=dsList.get(i); 
                            if(i==0){%>
                            <div class="col-md-3 ">
                              
                        <a href="addDataSource.jsp" >
                            <div class="card card-inverse card-info">
                                 <div class="card-block">
                                    <img class="card-img-top create" src="assets/images/create.png">
                                </div>
                                <div class="card-footer">

                                <div class="row">
                                    <div class="col-sm-offset-1 col-sm-4">
                                        <h5 class="card-title "><span class="glyphicon glyphicon-plus "></span>Create New Datasource</h5>
                                    </div>
                                </div>

                                    <div class="row" style=" opacity: 0;" >
                                        <div class="col-md-5 ">

                                        <button class="btn edit" name="viewBtn" value="view"><i class="fa fa-edit"></i> View/Edit</button>
                                        </div>
                                        <div class="col-xs-1  " ></div>
                                        <div class="col-md-5  " >
                                            <button class="btn delete" name="deleteBtn" value="delete" ><i class="fa fa-trash"></i> Delete</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a> 
                    </div>  
                           <% }%>
                            <form action="getDatasources" method="post" id="test">
                                <input type=hidden name="datasourceId" value="<%out.print(datasourece.getDatasourceId());%>">
                                <input type=hidden name="operation" value="getDatasources">
                                <div class="col-sm-3">
                                   
                                        <div class="card card-inverse card-info">
                                            <div class="card-block">
                                                <img class="card-img-top" src="assets/images/download.png">
                                            </div>
                                            <div class="card-footer">
                                                <div class="row">
                                                    <div class="col-sm-offset-1 col-sm-4">
                                                        <h5 class="card-title"><%out.println(datasourece.getDatasourceName());%></h5>
                                                    </div>
                                                </div>
                                                
                                                <div class="row"  >
                                                    <div class="col-md-5 ">
                                                      
                                                    <button class="btn edit" name="viewBtn" value="view"><i class="fa fa-edit"></i> View/Edit</button>
                                                    </div>
                                                    <div class="col-xs-1  " ></div>
                                                    <div class="col-md-5  " >
                                                        <button class="btn delete" name="deleteBtn" value="delete" ><i class="fa fa-trash"></i> Delete</button>
                   
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                   
                                </div>             
                            </form>      
                           
                        <% }%>
                        
 
                       </div>
        </div>
        
        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Chart.js -->
        <script src="assets/js/chart.min.js"></script>
        <script src="assets/js/dashboard.js"></script> 
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
         <script>
            let datasoure = document.getElementsByClassName('delete');
            for(i = 0; i < datasoure.length;i++) {
                datasoure[i].addEventListener('click', function(e){
                    e.preventDefault();
                    swal({
                        title: "Confirmation",
                        text: "Are you sure you want to delete this datasource?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true
                    })
                    .then((confirm) => {
                        if(confirm){
                            var form = document.getElementById("test");
                            $.ajax({
                                url: "/getDatasources",
                                data: {
                                    id: form.elements["datasourceId"].value,
                                   deleteBtn: form.elements["deleteBtn"].value,
                                   operation:form.elements["operation"].value,
                                },
                                success: function(success){
                                    if(success === "true"){
                                        swal({icon: "success", text: "Datasource has been deleted successfully!!", type: 
                                            "success"}).then(function(){ 
                                               location.reload();
                                               }
                                            );    
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
        
    </body>
</html>
