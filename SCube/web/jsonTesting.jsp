<%-- 
    Document   : jsonTesting
    Created on : Aug 26, 2018, 1:49:03 PM
    Author     : ZhenDan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            .dropdown-submenu {
                position: relative;
            }

            .dropdown-submenu .dropdown-menu {
                top: 0;
                left: 100%;
                margin-top: -1px;
            }
            .dropdown-menu{
                top:0;
            }

        </style>
    </head>
    <body>
        <button class="btn btn-default " type="button" onclick="clone();">Add </button>

        <div id="list" style="display:none">
            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" onclick="getData(this)">Select<span class="caret"></span></button>
            <label>Path: </label><input type="text" name="path" />
            <label>Name: </label><input type="text" name="name" />
            <label>Type: </label>
            <select id="type">
                <option value="string" >String</option>
                <option value="number" >Number</option>
                <option value="list" >List</option>
                <option value="datetime" >Datetime</option>
            </select>
            <a class="close-link" onclick="remove(this);"><i class="fa fa-close"></i></a>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script>
            var counter = 0;
            var array = [];
            var chkArray = [];
            
            //clone div to display the dropdown multiple times
            function clone() {
                var div = $("#list").clone();
                div.attr("id", counter);                
                div.attr("class", "jsonForm");
                $('body').append(div.show());
                counter++;
                array = [];
                chkArray = [];
            }
            
            // delete selected div
            function remove(element) {
                var parentId = element.parentNode.id;
                document.getElementById(parentId).remove();
            }

            //call API
            function getData(element) {
                var top = element.offsetTop;
                var height = element.clientHeight;
                var parentId = element.parentNode.id;
                $('#' + String(parentId) + ' input[name="path"]').val("");

                var requestURL = 'http://gronex.sg:8081/api/api?actionKey=getAppt&pfc=SG&cid=JWINE&uid=1525945167982&docId=APPT-0395';
                var request = new XMLHttpRequest();
                request.open('GET', requestURL);
                request.responseType = 'json';
                request.onload = function () {
                    var json = request.response;
                    array = ["<ul class='dropdown-menu' style='top:" + (top + height) + "px'>"];

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
                                array.push("<li onclick='handleClick(this);'><a tabindex='-1'>" + child + "</a></li>");
                            } else if ($.type(parent[child]) === "array") {

                                if ((parent[child]).length !== 0) {

                                    array.push("<li class='dropdown-submenu' ><a class='test' tabindex='-1' href='#' onclick='handleClick(this);'>" + child + "<span class='caret'></span></a><ul class='dropdown-menu'>");
                                    printArray(parent[child]);

                                    array.push("</ul></li>");


                                } else
                                    array.push("<li onclick='handleClick(this);'><a tabindex='-1'>" + child + "<span class='caret'></span></a></li>");
                            } else {
                                array.push("<li class='dropdown-submenu' ><a class='test' tabindex='-1' href='#' onclick='handleClick(this);'>" + child + "<span class='caret'></span></a><ul class='dropdown-menu'>");
                                printAll(parent[child]);
                                array.push("</ul></li>");
                            }
                        }
                    }

                    function printArray(myArray) {
                        var first = myArray[0];
                        if (typeof (first) === "object") {
                            for (var child in first) {
                                array.push("<li><a tabindex='-1'><input type='checkbox' class='chk' value=" + child + ">" + child + "</a></li>");
                            }
                            array.push("<li><button class='btn btn-default getList' type='button'>Select </button></li>");

                        } else {
                            for (var i = 0; i < myArray.length; i++) {
                                printAll(myArray[i]);
                            }
                        }
                    }

                    printAll(json);
                    array.push("</ul>");

                    $("#" + String(parentId)).html('<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" onclick="getData(this)">Select<span class="caret"></span></button>  <label>Path: </label><input type="text" name="path" /> <label>Name: </label><input type="text" name="name" /><label>Type: </label><select id="type"><option value="string">String</option><option value="number">Number</option> <option value="list">List</option><option value="datetime">Datetime</option></select> <a class="close-link" onclick="remove(this);"><i class="fa fa-close"></i></a>' + array.join(""));

                    $('.dropdown-submenu a.test').on("click", function (e) {
                        $(this).next('ul').toggle();
                        e.stopPropagation();
                        e.preventDefault();
                    });

                    $('.getList').on("click", function (e) {

                        /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
                        chkArray.push("<div>");
                        $(".chk:checked").each(function () {
                            chkArray.push("<label>Name: </label><input type='text' name='name' value=" + $(this).val() + "/> <label>Type: </label><select id='type'><option value='string' >String</option><option value='number' >Number</option><option value='list' >List</option><option value='datetime' >Datetime</option></select> <label>Info Type: </label><input type='text'  /></br>");

                        });
                        chkArray.push("</div>");
                        var id=$(this).closest('div').attr('id');
                      $( "#"+id ).append(chkArray.join(""));

                      $(".chk:checkbox").prop('checked', false);

                    });
                };
                request.send();
            };

            function handleClick(e) {
                // get the text value of the selected field
                var path = e.firstChild.innerHTML;
                
                // if a dropdown list is clicked, set path to the string inside the a tag, 
                // and get the parent <li> element
                if (path === undefined) {
                    path = e.firstChild.textContent;
                    e = e.parentNode;
                }
                
                e = e.parentNode.parentNode;

                // while there exists a parent selection
                while (e && e.className !== "jsonForm open") {
                    // append the text content to the path
                    path = e.firstChild.firstChild.textContent + "/" + path;
                    // go up to the previous menu
                    e = e.parentNode.parentNode;
                }
                
                // set the form's path value
                $('#' + e.id + ' input[name="path"]').val(path);
            }
        </script>   
    </body>
</html>
