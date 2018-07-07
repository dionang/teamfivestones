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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
         <link rel="stylesheet" href="assets/css/createForm.css">
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
                    <div class="row">
                        <div class="col-md-offset-1 col-md-10">
                             <div class="form">
                                 <form action="/setDatasource" method="post">
                                     <div class="row">
                                        <div class="col-md-10 ">
                                            <h1>Set Datasource</h1>
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
                                        <input type="text" class="form-control" name="datasource" placeholder="Enter your datasource url" required="" />
                                        </div>
                                     </div>
                        
                                     <br>
                                    <input type="hidden" name="companyId" value="<%= account.getCompanyId() %>">
                                    <input type="hidden" name="operation" value="setDatasource"/>
                                    <div class="row">
                                        <div class="col-md-5" >
                                            <input type="submit" value="Set Datasource" class="btn btn-success"/>
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
        <script src="/assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="/assets/js/bootstrap.min.js"></script>
        <!-- Chart.js -->
        <script src="/assets/js/chart.min.js"></script>
        <script src="/assets/js/dashboard.js"></script> 
    </body>
</html>
