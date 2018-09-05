
<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Developer" %>
<%    Account account = (Account) session.getAttribute("account");
    //if (!(account instanceof Developer)){
    //response.sendRedirect("/");
    //return;
    // }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/createForm.css">
        <title>Add DataSource</title>
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">

                <jsp:include page="sidebarDev.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                    <!-- page content -->

                    <!-- set datasource -->
                    <div class="right_col">
                        <div class="row">
                            <div class="col-sm-offset-1 col-sm-10">
                                <div class="form-inline form">
                                    <form action="addDatasource" method="post" id="submitForm">
                                        <div class="row">
                                            <div class="col-md-10 ">
                                                <h1>Add Datasource</h1>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <label for="username" class="icon-link"> Datasource URL
                                                    <span class="required">*</span>
                                                </label> 
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-10 col-xs-12 ">
                                                <input type="text" class="form-control" name="datasourceUrl" placeholder="Enter your datasource url" required="" id="url" style="width:700px"/>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <label for="datasourceName" class="icon-bookmark-empty"> Datasource Name
                                                    <span class="required">*</span>
                                                </label> 
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-10 col-xs-12 ">
                                                <input type="text" class="form-control" name="datasourceName" placeholder="Enter your datasource name" required="" style="width:700px"/>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <label for="datasourceName" class="icon-bookmark-empty"> Configuration </label>  
                                            </div>
                                        </div>
                                        <div class="row" id="con">
                                            <div class="col-md-5">
                                                <a class="btn btn-warning"  onclick="clone();"><i class="fa fa-plus"></i> Add</a>
                                            </div>
                                            <input type="hidden" name="counter" id="counter"/>

                                            <br/><br/>
                                            <div id="list" style="display:none;margin-top: 10px">

                                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" onclick="getData(this)" style="margin-left:12px;">Select<span class="caret"></span></button>
                                                <div class="row" style="margin-top:10px">

                                                    <div class="col-lg-4 form-group" style="margin-left: 12px;" >
                                                        <label style="font-size:15px">Path: </label>
                                                        <input type="text" name="path" id="p" class="form-control" style="width:230px" />
                                                    </div>

                                                    <div class="col-lg-4 form-group" >
                                                        <label style="font-size:15px">Dataset Name: </label>
                                                        <input type="text" name="name" class="form-control" style="width:170px"/>
                                                    </div>


                                                    <div class="col-lg-3 form-group" >
                                                        <label style="font-size:15px">Type: </label>
                                                        <select id="type" name="type" style="font-size:14px;height:40px;">
                                                            <option value="string" >String</option>
                                                            <option value="number" >Number</option>
                                                            <option value="list" >List</option>
                                                            <option value="datetime" >Datetime</option>
                                                        </select>
                                                        <label></label>
                                                        <a class="close-link" onclick="remove(this);" id ="remove"><i class="fa fa-close"></i></a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <br>
                                        <div class="row" >
                                            <div class="col-md-5">
                                                <label for="username" class="icon-bookmark"> Remark
                                                </label> 
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-10 col-xs-12 ">
                                                <textarea class="form-control" name="remark"  style="width:700px"></textarea>
                                            </div>
                                        </div>
                                        <br>
                                        <input type="hidden" name="companyId" value="<%= account.getCompanyId()%>">
                                    <input type="hidden" name="operation" value="addDatasource" />
                                    <div class="row">
                                        <div class="col-sm-5">
                                            <input type="submit" value="Create Datasource" class="btn btn-success"/>
                                        </div>
                                        <div class="col-sm-2"></div>
                                        <div class="col-sm-5">
                                            <a class="btn btn-primary" style="float:right" href="devHome.jsp"><i class="fa fa-home"></i> Back</a>
                                        </div>
                                    </div>
                                    <br/>

                                </form>

                            </div>
                        </div>
                        <!-- set datasource -->


                        <!-- page content -->
                    </div>
                </div>

                <!-- jQuery -->
                <script src="assets/js/jquery.min.js"></script>
                <!-- Bootstrap -->
                <script src="assets/js/bootstrap.min.js"></script>
                <!-- Sweet Alert -->
                <script src="assets/js/sweetalert.min.js"></script>
                <!-- Chart.js -->
                <script src="assets/js/chart.min.js"></script>
                <script src="assets/js/dashboard.js"></script> 
                <script>
                                                            document.getElementById('submitForm').onsubmit = function (e) {
                                                                e.preventDefault();
                                                                swal({
                                                                    title: "Confirmation",
                                                                    text: "Are you sure you want to add this datasource?",
                                                                    icon: "warning",
                                                                    buttons: true,
                                                                    dangerMode: true
                                                                })
                                                                        .then((confirm) => {
                                                                            if (confirm) {
                                                                                var form = document.getElementById("submitForm");
                                                                                var count = document.getElementById("counter").value;
                                                                                var i;
                                                                                var j;
                                                                                var list = [];
                                                                                if (count !== "") {
                                                                                    for (i = 0; i < count; i++) {
                                                                                        var d1 = document.getElementById(i);
                                                                                        if (d1 !== null) {
                                                                                            var div = [];
                                                                                            div.push(document.getElementsByName("path" + i + "")[0].value);
                                                                                            div.push(document.getElementsByName("name" + i + "")[0].value);
                                                                                            div.push(document.getElementsByName("type" + i + "")[0].value);
                                                                                            var t = document.getElementsByName("type" + i + "")[0].value
                                                                                            if (t === "list") {
                                                                                                var subCount = document.getElementsByName("subCounter" + i + "")[0].value;
                                                                                                for (j = 0; j < subCount; j++) {
                                                                                                    var d = document.getElementById("" + i + j);
                                                                                                    console.log(d);
                                                                                                    if (d !== null) {
                                                                                                        var field = [];
                                                                                                        field.push(document.getElementsByName("fName" + i + j + "")[0].value);
                                                                                                        field.push(document.getElementsByName("dType" + i + j + "")[0].value);
                                                                                                        field.push(document.getElementsByName("iType" + i + j + "")[0].value);
                                                                                                        div.push(field);
                                                                                                    }
//                                                                                                    else{
//                                                                                                        var field = [];
//                                                                                                        field.push(document.getElementsByName("fName" + i + j + "")[0].value);
//                                                                                                        field.push(document.getElementsByName("dType" + i + j + "")[0].value);
//                                                                                                        field.push(document.getElementsByName("iType" + i + j + "")[0].value);
//                                                                                                        div.push(field);
                                                                                                   // }

                                                                                                }
                                                                                            }
                                                                                            list.push(div);
                                                                                        }

                                                                                    }

                                                                                }
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    url: "addDatasource",
                                                                                    data: JSON.stringify({
                                                                                        operation: form.elements["operation"].value,
                                                                                        datasourceUrl: form.elements["datasourceUrl"].value,
                                                                                        datasourceName: form.elements["datasourceName"].value,
                                                                                        remark: form.elements["remark"].value,
                                                                                        counter: count,
                                                                                        subCounter: subCount,
                                                                                        params: list,
                                                                                    }),
                                                                                    success: function (success) {
                                                                                        if (success === "true") {
                                                                                            swal({icon: "success", text: "Datasource has been added successfully!!", type:
                                                                                                        "success"}).then(function () {
                                                                                                window.location = "devHome.jsp";
                                                                                            }
                                                                                            );
                                                                                        } else {
                                                                                            swal("Error!", {
                                                                                                icon: "error"
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                            };
                </script>
                <script>
                    var counter = 0;
                    var count = 0;
                    var array = [];
                    var chkArray = [];
                    //clone div to display the dropdown multiple times
                    function clone() {
                        var div = $("#list").clone();
                        div.attr("id", counter);
                        div.find('input[name=path]').attr('name', 'path' + counter);
                        div.find('input[name=name]').attr('name', 'name' + counter);
                        div.find('select[name=type]').attr('name', 'type' + counter);
                        div.attr("class", "jsonForm");
                        $("#con").append(div.show());
                        counter++;
                        array = [];
                        chkArray = [];
                        document.getElementById("counter").value = counter;
                    }
                    // delete selected div
                    function remove(element) {

                        var parentId = element.parentNode.parentNode.parentNode.id;
                        document.getElementById(parentId).remove();
                        counter--;
                        
                    }
                    function removeList(element) {

                        var parentId = element.parentNode.parentNode.id;
                        alert(parentId);
                        document.getElementById(parentId).remove();
                       
                    }

                    //call API
                    function getData(element) {

                        var top = element.offsetTop;
                        var height = element.clientHeight;
                        var parentId = element.parentNode.id;
                        $('#' + String(parentId) + ' input[name="path' + parentId + '"]').val("");
                        var url = document.getElementById("url").value;
                        var requestURL = url;
                        var request = new XMLHttpRequest();
                        request.open('GET', requestURL);
                        request.responseType = 'json';
                        request.onload = function () {
                            var json = request.response;
                            array = ["<ul class='dropdown-menu' style='left:25px;top:" + (top + height) + "px'>"];
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
                                        array.push("<li style='display:inline'><a tabindex='-1' ><input type='checkbox' style='display:inline;height:auto;width:auto' class='chk' value=" + child + ">" + child + "</a></li>");
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
//                                                                $("#" + String(parentId)).html('<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" onclick="getData(this)">Select<span class="caret"></span></button>  <label>Path: </label><input type="text" name="path" /> <label>Name: </label><input type="text" name="name" /><label>Type: </label><select id="type"><option value="string">String</option><option value="number">Number</option> <option value="list">List</option><option value="datetime">Datetime</option></select> <a class="close-link" onclick="remove(this);"><i class="fa fa-close"></i></a>' + array.join(""));
//                                                               console.log(array.join(""));

                            $("#" + String(parentId)).append(array.join(""));
                            $('.dropdown-submenu a.test').on("click", function (e) {
                                $(this).next('ul').toggle();
                                e.stopPropagation();
                                e.preventDefault();
                            });
                            $('.getList').on("click", function (e) {

                                /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */

                                var parentId = $(this).closest('div').attr('id');
                                var path = $('#' + String(parentId) + ' input[name="path"]').val();
                                
                                count=0;
                                $(".chk:checked").each(function () {
                                    chkArray.push("<div class='row' id=" + parentId + count + " >");
                                    chkArray.push("<div class='col-lg-5 form-group' style='margin-left: 12px;' >");
                                    chkArray.push("<label style='font-weight:200;font-size:15px'>Field Name: </label>");
                                    chkArray.push("<input type='text' name='fName" + parentId + count + "' class='form-control' value=" + $(this).val().slice(0, -1) + " style='width:230px;display:inline'  />");
                                    chkArray.push("</div>");
                                    chkArray.push("<div class='col-lg-2 form-group' >");
                                    chkArray.push("<label style='font-weight:200; font-size:15px'>Type: </label>");
                                    chkArray.push("<select id='dataType' name='dType" + parentId + count + "' style='font-size:14px; height:40px;'>");
                                    chkArray.push("<option value='string'> String </option>");
                                    chkArray.push("<option value='number' >Number</option>");
                                    chkArray.push("<option value='list' >List</option>");
                                    chkArray.push("<option value='datetime' >Datetime</option>");
                                    chkArray.push("</select>");
                                    chkArray.push("</div>");
                                    chkArray.push("<div class='col-lg-3 form-group' >");
                                    chkArray.push("<label style='font-weight:200; font-size:15px'>Info Type: </label>");
                                    chkArray.push("<select id='infoType' name='iType" + parentId + count + "' style='font-size:14px; height:40px;'>");
                                    chkArray.push("<option value='categorical' >Categorical</option>");
                                    chkArray.push("<option value='numerical' >Numerical</option>");
                                    chkArray.push("</select>");
                                    chkArray.push('<label></label>');
                                    chkArray.push('<a class="close-link" onclick="removeList(this);" id ="remove"><i class="fa fa-close"></i></a>');
                                    chkArray.push("</div>");
                                    chkArray.push("</div></br>");
                                    count++;
                                });
                                
                                chkArray.push("<input type='text' value=" + count + " name='subCounter" + parentId + "' value=" + count + "/>");

                                var id = $(this).closest('div').attr('id');
                                $("#" + id).append(chkArray.join(""));
                                $(".chk:checkbox").prop('checked', false);
                            });
                        };
                        request.send();
                    }
                    ;
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
                        $('#' + e.id + ' input[name="path' + e.id + '"]').val(path);
                    }

                </script>

                </body>
                </html>
