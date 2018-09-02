

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <style>
            .dropdown-submenu {
                position: relative;

            }

            .dropdown-submenu .dropdown-menu {
                top: 0;
                left: 100%;
                margin-top: -1px;
            }
        </style>
    </head>
    <body>
        <button class="btn btn-default " type="button" onclick="clone();">Add </button>
        <div id="list" class="dropdown" >
            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" onclick="getData()">Select<span class="caret"></span></button>
            <input type="text" id="value" />
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <!--        <script>
                    function clone(){
                        
                    }
                </script>-->
        <script>
                function getData() {
                    document.getElementById("value").value = "";
                    var requestURL = 'http://gronex.sg:8081/api/api?actionKey=getAppt&pfc=SG&cid=JWINE&uid=1525945167982&docId=APPT-0395';
                    var request = new XMLHttpRequest();
                    request.open('GET', requestURL);
                    request.responseType = 'json';
                    request.onload = function () {
                        var json = request.response;
                        var array = ["<ul class='dropdown-menu'>"];

                        function printAll(items) {
                            switch ($.type(items)) {
                                case "object":
                                    getChildren(items);
                                    break;
                                case "array":
                                    printArray(items);
                                    break;
                            }

                        }

                        function getChildren(parent) {
                            for (var child in parent) {
                                //console.log(child);
                                if ($.type(parent[child]) !== "object" && $.type(parent[child]) !== "array") {
                                    array.push("<li onclick='lang1(event);'><a tabindex='-1'>" + child + "</a></li>");
                                } else {
                                    array.push("<li class='dropdown-submenu' ><a class='test' tabindex='-1' href='#' onclick='lang1(event);'>" + child + "<span class='caret'></span></a><ul class='dropdown-menu'>");
                                    printAll(parent[child]);
                                    array.push("</ul></li>");
                                }

                            }
                        }

                        function printArray(myArray) {
                            var first = myArray[0];
                            if (typeof (first) === "object") {
                                getChildren(first);
                            } else {
                                for (var i = 0; i < myArray.length; i++) {
                                    //console.log(myArray[i]);
                                    //array.push("<li>" + myArray[i] + "</li>");
                                    printList(myArray[i]);
                                }
                            }


                        }

                        printAll(json);
                        array.push("</ul>");

                        $("#list").html('<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" onclick="getData()">Select<span class="caret"></span></button> <input type="text" id="value" />' + array.join(""));
                        console.log(array.join(""));

                        $('.dropdown-submenu a.test').on("click", function (e) {
                            $(this).next('ul').toggle();
                            e.stopPropagation();
                            e.preventDefault();
                        });


                    };
                    request.send();
                }
                ;
        </script> 

        <script type="text/javascript">
            function lang1(event) {
                var result;
                var path = document.getElementById("value").value;
                var target = event.target || event.srcElement;
                if (path === "")
                    result = target.textContent;
                else
                    result = path + "," + target.textContent;
                document.getElementById("value").value = result;
            }
        </script>
    </body>
</html>
