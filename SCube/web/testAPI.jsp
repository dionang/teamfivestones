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
        <label class="col-md-2">API URL: </label>
        <input class="col-md-8" id="url" value="http://localhost:8084/Dummy_API/getFurnituresByCategory?category=Furniture">
        <button class="col-md-2"id="button">Send request..</button><br>
        <textarea id="result"></textarea>
    </body>
    
    <!-- Bootstrap -->
    <script src="/assets/js/bootstrap.min.js"></script>
    <!-- jQuery -->
    <script src="/assets/js/jquery.min.js"></script>   
    
    <script>
        $(function () {
            $("#button").click(function () {
                $.ajax({
                    type: "GET",
                    url: $("#url").val(),
                    // The key needs to match your method's input parameter (case-sensitive).
                    // hardcoded templateId to 1 for now
                    //contentType: "application/json; charset=utf-8",
                    success: function(data){
                        $("#result").val(data);
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
            });
        });
    </script>   
</html>
