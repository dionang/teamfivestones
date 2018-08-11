<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager" %>
<%
    Account account = (Account) session.getAttribute("account");
    if (!(account instanceof Manager)){
        response.sendRedirect("login.jsp");
        return;
    }
        
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/report.css">        
        <link rel="stylesheet" href="assets/css/bootstrap.css">
     
        <title>Load Template</title>
    </head>

   <body>
        <!--<div class="container body">
            <div class="main_container">
             
                 page content 
                
                <div class="right_col">
                    <div class="content">-->
                        <%  String templateId = request.getParameter("templateId");
                            
                            out.println("<input type='hidden' id='templateId' value='" + templateId +  "'/>");
                        %>
                        <input type="hidden" name="companyId" value="<%out.print(account.getCompanyId());%>"/>
                        <input type="hidden" name="userName" value="<%out.print(account.getUsername());%>" />
                        <div id="container"></div>
                     <!--</div>
                </div>  
                <!-- page content 
            </div>
        </div>       
        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Custom JS -->
        <script src="assets/js/dashboard.js"></script> 
        <!-- React modules-->
        <script src="assets/js/babel.js"></script>
        <script src="assets/js/compressed.js"></script>
        <!-- JsonProcessor -->
        <script src="assets/js/jsonProcessor.js"></script>
        <!-- Custom React Script -->
        <script type="text/babel" src="assets/js/app.js"></script> 

    </body>
</html>
