<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <!-- Styling for bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <title>API Call Test</title>
    </head>
    <body>
        <h1>Testing API</h1>
        <label class="col-xs-2">API URL: </label>
        <%=request.getParameter("param1")%>
    </body>
    
    <!-- jQuery -->
    <script src="assets/js/jquery.min.js"></script>   
    <!-- Bootstrap -->
    <script src="assets/js/bootstrap.min.js"></script>
    <!-- JsonProcessor -->    
    <script src="assets/js/jsonProcessor.js"></script>

</html>
