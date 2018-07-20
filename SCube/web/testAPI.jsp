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
        <input class="col-xs-8" id="url" value="http://localhost:8084/Dummy_API/getFurnituresByCategory?category=Furniture">
        <button class="col-xs-2"id="button">Send request..</button><br><br>
        <h4>Result</h4>
        <textarea class="col-xs-12" rows=10 style="resize:both; overflow:auto;" id="result"></textarea>
        <textarea class="col-xs-12" rows=10 style="resize:both; overflow:auto;" id="processed"></textarea>
    </body>
    
    <!-- jQuery -->
    <script src="/assets/js/jquery.min.js"></script>   
    <!-- Bootstrap -->
    <script src="/assets/js/bootstrap.min.js"></script>
    <!-- JsonProcessor -->    
    <script src="assets/js/jsonProcessor.js"></script>
    <script>
//        let self = this;
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
                        data = JSON.parse(data);
                        let processor = new JsonProcessor(data);
                        console.log(processor);
                        console.log(processor.getDatasets());
                        console.log(processor.getOptions("customers"));
                        $("#processed").val(JSON.stringify(processor.result, null, 4));
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
            });
        });
    </script>   

</html>
