<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager" %>
<%
    Account account = (Account) session.getAttribute("account");
    //if (!(account instanceof Manager)){
       // response.sendRedirect("/");
       // return;
    //}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/createForm.css">
        <title>Manager Home</title>
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                
                <jsp:include page="sidebar.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                <!-- page content -->
                <div class="right_col">
                    
                    <div class="form">
                    <h1>Create User Account</h1><br/>
                    <form action="/createUser" method="post">
                        <p>
                            <label for="username" class="icon-user"> Name
                                <span class="required">*</span>
                            </label>
                            <input type="text" class="form-control" name="name" placeholder="Enter your name" required="" />
                        </p>
                        <p>
                            <label for="username" class="icon-user"> User Name
                                <span class="required">*</span>
                            </label>
                           <input class="form-control" name="username" placeholder="Enter your username" required="" />
                        </p>
                        <p>
                            <label for="username" class="icon-key"> Password
                                <span class="required">*</span>
                            </label>
                            <input type="password" class="form-control" name="password" placeholder="Enter your password" required=""/>
                        </p>
 
                        <input type="hidden" name="companyId" value="<%= account.getCompanyId() %>">
                        <input type="hidden" name="operation" value="createUser"/>
                        <p class="indication">Fields with
                            <span class="required"> * </span>are required
                        </p>
                        <input type="submit" value="Create User" class="btn btn-success"/>
                        <br><br>
                    </form>
                </div>
                        <br><br>
                </div>
               
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
