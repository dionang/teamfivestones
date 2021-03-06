<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.*" %>
<%
    Account account = (Account) session.getAttribute("account");
    if (!(account instanceof Manager) && !(account instanceof User)){
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
        <title>Load Template</title>
    </head>

   <body>
        <input type="hidden" id="companyId"    value="<%= account.getCompanyId() %>"/>
        <input type="hidden" id="accountId"    value="<%= account.getAccountId() %>"/>
        <input type="hidden" id="userName"     value="<%= account.getUsername() %>" />
        <input type="hidden" id="profileName"  value="<%= account.getName() %>" />
        <div id="reportContainer"></div>
                    
        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!--Sweet alert -->
        <script src="assets/js/sweetalert.min.js"></script>
        <!-- Custom JS -->
        <script src="assets/js/dashboard.js"></script> 
        <!-- React modules-->
        <script src="assets/js/babel.min.js" charset="utf-8"></script>
        <script src="assets/js/bundle.min.js"></script>    
        <!-- PptXGenJS -->
        <script src="https://cdn.rawgit.com/gitbrent/PptxGenJS/v2.0.0/dist/pptxgen.bundle.js"></script>
        <!-- JsonProcessor -->
        <script src="assets/js/jsonProcessor.js"></script>
        <!-- Custom React Script -->
        <script type="text/babel" src="assets/js/dashboardApp.js"></script> 
        
    </body>
</html>
