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
                        data = JSON.parse(data);
                        
                        // object to store result of processing data    
                        let processed = {};
                        
                        for (let key in data) {
                            let value = data[key];
                            
                            //props is an object that stores the properties of the particular key of the json data
                            let props = {};

                            // if value is an array
                            if(typeof(value) === "object" && value.length !== undefined){
                                
                                props.type = "list";
                                props.length = value.length;
                                
                                // get the first object of the list
                                if (value.length > 0 && typeof(value[0]) === "object") {
                                    let firstObj = value[0];
                                    props.options = []
                                    
                                    // for each property in the first object
                                    for (let objKey in firstObj){
                                        let objValue = firstObj[objKey];
                                        
                                        // create an array of fields that are choosable
                                        props.options.push(objKey);
                                        props[objKey] = {type: typeof(objValue)}
                                        if (typeof(objValue) === "number"){
                                            props[objKey].min = objValue;
                                            props[objKey].max = objValue;
                                            props[objKey].total = 0;
                                        }
                                    }
                                }
                                
                                // iterate through objects in the list
                                for(let obj of value){
                                    // for each option in the options list
                                    for(let option of props.options) {
                                        // update props min and max
                                        let objectField = props[option];
                                        if (objectField.type === "number")  {
                                            let currValue = obj[option];
                                            objectField.total += currValue;
                                            if(currValue < objectField.min){
                                                objectField.min = currValue;
                                            } else if (currValue > objectField.max){
                                                objectField.max = currValue;
                                            }
                                        }
                                    }
                                }
                                
                                // calculate the average of each props that is a number
                                for(let option of props.options) {
                                    // update props min and max
                                    let objectField = props[option];
                                    if (objectField.type === "number")  {
                                        objectField.average = objectField.total / props.length;
                                    }
                                }
                                
                            } else {
                                props.type = typeof(value);
                            }
                            
                            //add object to processed
                            processed[key] = props;
                        }
                        $("#processed").val(JSON.stringify(processed, null, 2));
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
            });
        });
    </script>   
</html>
