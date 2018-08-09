<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager" %>
<%
    Account account = (Account) session.getAttribute("account");
    /**if (!(account instanceof Manager)){
        response.sendRedirect("/");
        return;
    }**/
        
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/bootstrap.css">
        <link rel="stylesheet" href="assets/css/report.css">        

        <title>Load Template</title>
    </head>

    <body>
        <%  String templateId = request.getParameter("templateId");
            if(templateId == null){
                templateId = "0";
            }
            out.println("<input type='hidden' id='templateId' value='" + templateId +  "'/>");
        %>
        <div id="container"></div>
        
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