<%
    String accessToken = request.getParameter("accessToken");
    
    // validate access token
    if (accessToken == null || !accessToken.equals("123")){
        out.println("invalid access token entered");
        return;
    }
    
    String templateID = request.getParameter("templateId");
    if (templateID == null){
        out.println("No templateId entered!");
        return;
    }
    
    try {
        int templateId = Integer.parseInt(templateID);
        out.println("<input type='hidden' id='templateId' value='" + templateId + "'/>");
    } catch (NumberFormatException e){
        out.println("Invalid templateId entered!");
        return;
    } catch (Exception e) {
        
    }
%>
<%@ page import="scube.entities.*" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/report.css">        
        <title>Load Template</title>
    </head>

    <body>
        <div id="spinLoader"></div>
        <img id="downloadCompletedTick" src="assets/images/tick.png"/>
        <div id="downloadStatus">Rendering ...</div>
        <div id="screenOverlay"></div>
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
        <!-- JsonProcessor -->
        <script src="assets/js/jsonProcessor.js"></script>
        <!-- Custom React Script -->
        <script type="text/babel" src="assets/js/previewApp.js"></script> 
    </body>
</html>
