<%@page import="scube.dao.CompanyDAO"%>
<%@page import="java.util.ArrayList"%>
<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager" %>
<%
    Account account = (Account) session.getAttribute("account");
    if (!(account instanceof Manager)){
        response.sendRedirect("/");
        return;
    }
    Manager manager = (Manager) account;
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
                    <h2>All users of <%= CompanyDAO.getCompanyNameFromId(manager.getCompanyId()) %></h2>
                    <table class="table table-striped table-bordered">
                        <tr><th>Name</th><th>Username</th><th>Account Type</th></tr>
                        <%
                            ArrayList<Account> accounts = manager.getAllUsers();
                            for (Account acc : accounts) {
                                out.println("<tr>");
                                out.println("<td>" + acc.getName() + "</td>");
                                out.println("<td>" + acc.getUsername() + "</td>");
                                out.println("<td>" + acc.getAccountType() + "</td>");
                                out.println("</tr>");
                            }
                        %>
                    </table>
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
        <script src="/assets/js/checkPassword.js"></script>
    </body>
</html>
