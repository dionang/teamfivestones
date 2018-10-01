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
        <title>Load Template</title>
    </head>

   <body>
        <input type="hidden" id="templateId"   value="<%= request.getParameter("templateId") %>"/>        
        <input type="hidden" id="templateName" value="<%= request.getParameter("templateName") %>"/>        
        <input type="hidden" id="companyId"    value="<%= account.getCompanyId() %>"/>
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
        <script src="assets/js/jspdf.js"></script>
        <script src="assets/js/dom-to-image.js"></script>
        <script src="https://cdn.rawgit.com/gitbrent/PptxGenJS/v2.2.0/dist/pptxgen.bundle.js"></script>
        <!-- JsonProcessor -->
        <script src="assets/js/jsonProcessor.js"></script>
        <!-- Custom React Script -->
        <script type="text/babel" src="assets/js/app.js"></script> 
       
    </body>
</html>
