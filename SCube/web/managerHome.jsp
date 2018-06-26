<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager" %>
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
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
        <link rel="stylesheet" href="/assets/css/home.css">
        <title>Manager Home</title>
        
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                
                <jsp:include page="sidebarManager.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                <!-- page content -->
                
                
                <div class="right_col">
                    <div class="content">
                        <div class="col-sm-4 img">
                            <a href="dashboard.jsp" style="text-decoration: none">
                                <div class="pic">
                                    <img  src="/assets/images/dashboard.png" class="image"  />
                                </div>
                           
                            <h4>View Dashboard</h4>
                            </a>
                        </div>
                        <div class="col-sm-4 img">
                            <a href="createUserAccount.jsp" style="text-decoration: none">
                                <div class="pic">
                                   <img  src="/assets/images/userHome.png" class="image" />
                                </div>
                            
                            <h4 >Create User Account</h4>
                            </a>
                        </div>
                       <div class="col-sm-4 img">
                           <a href="report.jsp" style="text-decoration: none">
                               <div class="pic">
                                   <img  src="/assets/images/report.png"  class="image"/>
                                </div>
                            
                            <h4 >Create Report Template</h4>
                           </a>
                       </div>
                    </div>  
                <!-- page content -->
                </div>
            </div>
        </div>
        
        <!-- jQuery -->
        <script src="/assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="/assets/js/bootstrap.min.js"></script>
        <!-- Custom JS -->
        <script src="/assets/js/dashboard.js"></script> 
    </body>
</html>
