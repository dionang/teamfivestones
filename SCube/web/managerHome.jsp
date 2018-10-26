<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.*" %>
<%
    Account account = (Account) session.getAttribute("account");
    if (!(account instanceof Manager) && !(account instanceof User)){
        response.sendRedirect("login.jsp");
        return;
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/home.css">
        <title>User Home</title>
        
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                
                <jsp:include page="sidebarManager.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                <!-- page content -->
                
                
                <div class="right_col"  >
                    <!--<div class="content" >-->
                    <h1 style="text-align: center; color: #2F4F4F; font-family: Oswald; font-size: 60px">S-Cube Reporting Tool</h1>
                    <div class="icons" style="border-top: 3px solid">
                        <div class="col-sm-4 outer" style="padding: 70px 0; ">
                        <div class="img" >
                            <a href="dashboard.jsp" style="text-decoration: none; ">
                                <div class="pic"style=" padding-top:30px; ">
                                    <img src="assets/images/dashboard.png" class="image" />
                                </div>
                           
                            <h4 style="font-family:  Georgia; font-size:22px;color: #2F4F4F;">View Dashboard</h4>
                            </a>
                        </div>
                        </div>
                        <div class="col-sm-4 img" style="padding: 70px 0;">
                            <a href="createUserAccount.jsp" style="text-decoration: none">
                                <div class="pic" >
                                   <img src="assets/images/user.png" class="image" />
                                </div>
                            
                            <h4 style="font-family: Georgia; font-size:22px; color: #2F4F4F;" >Create User Account</h4>
                            </a>
                        </div>
                       <div class="col-sm-4 img" style="padding: 70px 0;">
                            <a href="templateHome.jsp" style="text-decoration: none">
                               <div class="pic" >
                                   
                                   <img src="assets/images/report.png"  class="image" style="margin-top:35px"/>
                                </div>
                            <h4 style="font-family:  Georgia; font-size:22px; color: #2F4F4F;" >Create Report Template</h4>
                           </a>
                       </div>
                    </div>
                    <!--</div>-->  
                <!-- page content -->
                </div>
            </div>
        </div>
        
        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Custom JS -->
        <script src="assets/js/dashboard.js"></script> 
    </body>
</html>
