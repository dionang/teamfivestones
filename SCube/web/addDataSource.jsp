
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
                                                <h1>Configure New Datasource</h1>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <label for="username" class="icon-link"> API URL
                                                    <span class="required">*</span>
                                                </label> 
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12 col-xs-12 ">
                                                <input type="text" class="form-control" name="datasourceUrl" placeholder="Enter your API URL. Eg: https://my.uuvoucher.com/api/1/getServiceList" required="" id="url" style="width:100%" />
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <label for="datasourceName" class="icon-bookmark-empty"> API Name
                                                    <span class="required">*</span>
                                                </label> 
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12 col-xs-12 ">
                                                <input type="text" class="form-control" name="datasourceName" placeholder="Give a name for the API" required="" style="width:100%"/>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <label for="datasourceName" class="icon-bookmark-empty"> Configuration </label>  
                                            </div>
                                        </div>

                                        <div class="row" id="con">
                                            <div id="content" >
                                                <div id="list" style="display:none;margin-top: 10px;border-bottom: 1px solid rgba(0, 0, 0, 0.3);padding-bottom: 20px;">
                                                    <div class="row" style="margin-top:10px;display:inline-block;width:100%;">

                                                        <div class="col-lg-4 col-xs-12 form-group"  >
                                                            <span class="span" style="margin-left:12px;" >Path: </span>
                                                            <div class="buttonInside" name="dropdown" style="position:relative;margin-bottom:10px;height:40px">
                                                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" onclick="getData(this)" style="position:absolute;height:40px">Select<span class="caret"></span></button>
                                                                <input type="text" name="path" id="p" class="form-control" style="width:80%;padding-left:80px" readonly />
                                                            </div>

                                                        </div>



                                                        <div class="col-lg-5 col-xs-12 form-group" >
                                                            <span class="span">Dataset Name: </span>
                                                            <input type="text" name="name" class="form-control" style="width:60%" placeholder="Give a name for the Dataset"/>
                                                        </div>


                                                        <div class="col-lg-3 col-xs-12 form-group" >
                                                            <span class="span">Type: </span>
                                                            <select id="type" name="type" style="font-size:14px;height:40px;width:50%">
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
                                            
                                            <div class="col-md-5" style="padding-top: 20px">
                                                <a class="btn btn-warning"  onclick="clone();"><i class="fa fa-plus"></i> Add Data Configuration</a>
                                            </div>
                                            <input type="hidden" name="counter" id="counter"/>

                                            

                                        </div>

                                        <br>
                                        <div class="row" >
                                            <div class="col-md-5">
                                                <label for="username" class="icon-bookmark"> Remark
                                                </label> 
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 col-xs-12 ">
                                                <textarea class="form-control" name="remark"  style="width:100%"></textarea>
                                            </div>
                                        </div>
                                        <br>
                                        <input type="hidden" name="companyId" value="<%= account.getCompanyId()%>">
                                    <input type="hidden" name="operation" value="addDatasource" />
                                    <div class="row">                                        
                                        <div class="col-sm-5" style="float:right; width:25.66666667%">
                                            <input   type="submit" value="Create Datasource" class="btn btn-success"/>
                                            <a class="btn btn-primary" href="devHome.jsp" ><i class="fa fa-home"></i> Back</a>                                            
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
                                                                                                field.push(document.getElementsByName("fNValue" + i + j + "")[0].value);
                                                                                                field.push(document.getElementsByName("fName" + i + j + "")[0].value);
                                                                                                field.push(document.getElementsByName("dType" + i + j + "")[0].value);
                                                                                                field.push(document.getElementsByName("iType" + i + j + "")[0].value);
                                                                                                div.push(field);
                                                                                            }
//                                                                                                    

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
                    var parentId;
                    //clone div to display the dropdown multiple times
                    function clone() {

                        var div = $("#list").clone();
                        div.attr("id", counter);
                        div.find('input[name=path]').attr("required", true);
                        div.find('input[name=path]').attr('name', 'path' + counter);

                        div.find('input[name=name]').attr("required", true);
                        div.find('input[name=name]').attr('name', 'name' + counter);
                        
                        div.find('select[name=type]').attr('name', 'type' + counter);
                        
                        div.find('div[name=dropdown]').attr('name', 'dropdown' + counter);
                        div.attr("class", "jsonForm");
                        $("#content").append(div.show());
                        counter++;
                        array = [];
                        chkArray = [];
                        document.getElementById("counter").value = counter;
                        var button = document.getElementsByName("dropdown" + (counter - 1))[0];

                        var top = button.offsetTop;
                        var height = button.clientHeight;
                        var url = document.getElementById("url").value;
                        var requestURL = url;
                        var request = new XMLHttpRequest();
                        request.open('GET', requestURL);
                        request.responseType = 'json';
                        request.onload = function () {
                            var json = request.response;
                            array = ["<ul class='dropdown-menu parent' style='left:25px;top:" + (top + height) + "px'>"];
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

                                            array.push("<li class='dropdown-submenu' ><a class='test' tabindex='-1' href='#' onclick='handleClick(this);'>" + child + "<span class='caret'></span></a><ul class='dropdown-menu child'>");
                                            printArray(parent[child]);
                                            array.push("</ul></li>");
                                        } else
                                            array.push("<li onclick='handleClick(this);'><a tabindex='-1'>" + child + "<span class='caret'></span></a></li>");
                                    } else {
                                        array.push("<li class='dropdown-submenu' ><a class='test' tabindex='-1' href='#' onclick='handleClick(this);'>" + child + "<span class='caret'></span></a><ul class='dropdown-menu child'>");
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
                                    array.push("<li><button class='btn btn-default' type='button' onclick='getList();' >Select </button></li>");
                                } else {
                                    for (var i = 0; i < myArray.length; i++) {
                                        printAll(myArray[i]);
                                    }
                                }
                            }

                            printAll(json);
                            array.push("</ul>");

                            $(".buttonInside").append(array.join(""));
                                                        $('.dropdown-submenu a.test').on("click", function (e) {
                                
                                console.log("click");
                                var maxHeight = 200;
                                var $container = $(".buttonInside"),
                                        $list = $(this).next('ul'),
                                        
                                        $anchor = $list.find("a"),
                                        height = $list.height(), // make sure there is enough room at the bottom
                                        multiplier = height / maxHeight;

                                // need to save height here so it can revert on mouseout            
                                $container.data("origHeight", $container.height());

                                // so it can retain it's rollover color all the while the dropdown is open
                                $anchor.addClass("hover");
console.log(multiplier);
                                if (multiplier > 1) {
                                     
                                    console.log("click");
                                    $list
                                            .css({
                                                height: maxHeight,
                                                overflow: "hidden",
                                                
                                                
                                            })
                                            .mousemove(function (e) {
                                                var offset = $container.position();
                                        console.log(offset);
                                                var relativeY = ((e.pageY - offset.top) * multiplier) - ($container.data("origHeight") * multiplier);
                                                if (relativeY > $container.data("origHeight")) {
                                                    $list.css("top", -relativeY + $container.data("origHeight"));
                                                }
                                                ;
                                            });
                                }

$(this).next('ul').toggle();
                               
                                e.stopPropagation();
                                e.preventDefault();
                            }),
                             function() {
    
        var $el = $(this);
        
        // put things back to normal
        $el
            .height($(this).data("origHeight"))
            .find("ul")
            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
    
    };

                        };
                        request.send();
                    }
                    // delete selected div
                    function remove(element) {

                        var parentId = element.parentNode.parentNode.parentNode.id;
                        document.getElementById(parentId).remove();
                        counter--;

                    }
                    function removeList(element) {

                        var parentId = element.parentNode.parentNode.id;
                        document.getElementById(parentId).remove();
                        count--;

                    }
                    function getList() {
                        /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
                        var path = $('#' + String(parentId) + ' input[name="path"]').val();
                        document.getElementsByName("type" + parentId)[0].value = "list";
                        //document.getElementsByName("type"+parentId)[0].selectmenu('refresh');
                        count = 0;
                        chkArray = [];
                        $(".chk:checked").each(function () {

                            chkArray.push("<div class='row' id=" + parentId + count + " >");
                            chkArray.push("<input type='hidden' name='fNValue" + parentId + count + "' class='form-control'  value=" + $(this).val() + " style='display:inline'  />");
                            chkArray.push("<div class='col-lg-5 col-xs-12 form-group' style='margin-left: 12px;' >");
                            chkArray.push("<label style='font-weight:200;font-size:15px'>Field Name: </label>");
                            chkArray.push("<input type='text' name='fName" + parentId + count + "' class='form-control' required='' value=" + $(this).val() + " style='width:60%;display:inline'  />");
                            chkArray.push("</div>");
                            chkArray.push("<div class='col-lg-3 col-xs-12 form-group' >");
                            chkArray.push("<label style='font-weight:200; font-size:15px'>Variable Type: </label>");
                            chkArray.push("<select id='dataType' name='dType" + parentId + count + "' style='font-size:14px; height:40px;'>");
                            chkArray.push("<option value='string'> String </option>");
                            chkArray.push("<option value='number' >Number</option>");
                            chkArray.push("<option value='list' >List</option>");
                            chkArray.push("<option value='datetime' >Datetime</option>");
                            chkArray.push("</select>");
                            chkArray.push("</div>");
                            chkArray.push("<div class='col-lg-3 col-xs-12 form-group' >");
                            chkArray.push("<label style='font-weight:200; font-size:15px'>Data Type: </label>");
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

                        chkArray.push("<input type='hidden' value=" + count + " name='subCounter" + parentId + "' value=" + count + "/>");


                        $("#" + parentId).append(chkArray.join(""));
                        //$(".chk:checkbox").prop('checked', false);
                    }
                    //call API
                    function getData(element) {

                        
                        parentId = element.parentNode.parentNode.parentNode.parentNode.id;
                        var maxHeight = 200;
                        // Returns a NodeList
                        var elems = $(document.getElementById(parentId)).find("ul");

// Convert the NodeList to an Array
                        var ul = jQuery.makeArray(elems);
                        //var $container =$(document.getElementById(parentId));
                        //var $list = jQuery.makeArray($container.find("ul") );
                        console.log(ul);

                        jQuery.each(ul, function (i, list) {

                            var height = $(list).height() * 1.1; // make sure there is enough room at the bottom
                            console.log(height);
                            var multiplier = height / maxHeight;     // needs to move faster if list is taller

                            console.log(multiplier);
                            // need to save height here so it can revert on mouseout            
                            $(list).data("origHeight", $(list).height());

                            // so it can retain it's rollover color all the while the dropdown is open
                            //$anchor.addClass("hover");

                            // make sure dropdown appears directly below parent list item    
//                            $list
//                                    .show()
//                                    .css({
//                                        paddingTop: $container.data("origHeight")
//                                    });

                            // don't do any animation if list shorter than max
                            if (multiplier > 1) {
                                $(list)
                                        .css({
                                            height: maxHeight,
                                            overflow: "hidden"
                                        })
                                        .mousemove(function (e) {
                                            var offset = $(list).offset();
                                            var relativeY = ((e.pageY - offset.top) * multiplier) - ($(list).data("origHeight") * multiplier);
                                            if (relativeY > $(list).data("origHeight")) {
                                                $(list).css("top", -relativeY + $(list).data("origHeight"));
                                            }
                                            ;
                                        });
                            }


                        });




                        if (count != 0) {

                            for (var i = count - 1; i >= 0; i--) {
                                document.getElementById(parentId + i).remove();

                            }
                        }

                        count = 0;
                        chkArray = [];

                        $('.child').hide();
                        //$('#' + String(parentId) + ' input[name="path' + parentId + '"]').val("");

//                        var url = document.getElementById("url").value;
//                      
//                        var requestURL = url;
//                        var request = new XMLHttpRequest();
//                        request.open('GET', requestURL);
//                        request.responseType = 'json';
//                        request.onload = function () {
//                            var json = request.response;
//                            array = ["<ul class='dropdown-menu' style='left:25px;top:" + (top + height) + "px'>"];
//                            function printAll(items) {
//                                switch ($.type(items)) {
//                                    case "object":
//                                        getChildren(items);
//                                        break;
//                                    case "array":
//                                        printArray(items);
//                                        break;
//                                }
//
//                            }
//
//                            function getChildren(parent) {
//                                for (var child in parent) {
//                                    //console.log(child);
//                                    if ($.type(parent[child]) !== "object" && $.type(parent[child]) !== "array") {
//                                        array.push("<li onclick='handleClick(this);'><a tabindex='-1'>" + child + "</a></li>");
//                                        
//                                    } else if ($.type(parent[child]) === "array") {
//
//                                        if ((parent[child]).length !== 0) {
//
//                                            array.push("<li class='dropdown-submenu' ><a class='test' tabindex='-1' href='#' onclick='handleClick(this);'>" + child + "<span class='caret'></span></a><ul class='dropdown-menu'>");
//                                            printArray(parent[child]);
//                                            array.push("</ul></li>");
//                                        } else
//                                            array.push("<li onclick='handleClick(this);'><a tabindex='-1'>" + child + "<span class='caret'></span></a></li>");
//                                    } else {
//                                        array.push("<li class='dropdown-submenu' ><a class='test' tabindex='-1' href='#' onclick='handleClick(this);'>" + child + "<span class='caret'></span></a><ul class='dropdown-menu'>");
//                                        printAll(parent[child]);
//                                        array.push("</ul></li>");
//                                    }
//
//                                }
//                            }
//
//                            function printArray(myArray) {
//
//
//                                var first = myArray[0];
//                                if (typeof (first) === "object") {
//                                    for (var child in first) {
//                                        array.push("<li style='display:inline'><a tabindex='-1' ><input type='checkbox' style='display:inline;height:auto;width:auto' class='chk' value=" + child + ">" + child + "</a></li>");
//                                    }
//                                    array.push("<li><button class='btn btn-default getList' type='button'>Select </button></li>");
//                                } else {
//                                    for (var i = 0; i < myArray.length; i++) {
//                                        printAll(myArray[i]);
//                                    }
//                                }
//                            }
//
//                            printAll(json);
//                            array.push("</ul>");
//
//                            $(".buttonInside").append(array.join(""));
//                            $('.dropdown-submenu a.test').on("click", function (e) {
//                                $(this).next('ul').toggle();
//                                e.stopPropagation();
//                                e.preventDefault();
//                            });
//                            $('.getList').on("click", function (e) {
//
//                                /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
//
//                               
//                                var path = $('#' + String(parentId) + ' input[name="path"]').val();
//                                document.getElementsByName("type"+parentId)[0].value="list";
//                               //document.getElementsByName("type"+parentId)[0].selectmenu('refresh');
//                                count=0;
//                                $(".chk:checked").each(function () {
//                                    chkArray.push("<input type='hidden' name='fNValue" + parentId + count + "' class='form-control' value=" + $(this).val() + " style='width:230px;display:inline'  />");
//                                    chkArray.push("<div class='row' id=" + parentId + count + " >");
//                                    chkArray.push("<div class='col-lg-5 form-group' style='margin-left: 12px;' >");
//                                    chkArray.push("<label style='font-weight:200;font-size:15px'>Field Name: </label>");
//                                    chkArray.push("<input type='text' name='fName" + parentId + count + "' class='form-control' value=" + $(this).val() + " style='width:230px;display:inline'  />");
//                                    chkArray.push("</div>");
//                                    chkArray.push("<div class='col-lg-2 form-group' >");
//                                    chkArray.push("<label style='font-weight:200; font-size:15px'>Type: </label>");
//                                    chkArray.push("<select id='dataType' name='dType" + parentId + count + "' style='font-size:14px; height:40px;'>");
//                                    chkArray.push("<option value='string'> String </option>");
//                                    chkArray.push("<option value='number' >Number</option>");
//                                    chkArray.push("<option value='list' >List</option>");
//                                    chkArray.push("<option value='datetime' >Datetime</option>");
//                                    chkArray.push("</select>");
//                                    chkArray.push("</div>");
//                                    chkArray.push("<div class='col-lg-3 form-group' >");
//                                    chkArray.push("<label style='font-weight:200; font-size:15px'>Info Type: </label>");
//                                    chkArray.push("<select id='infoType' name='iType" + parentId + count + "' style='font-size:14px; height:40px;'>");
//                                    chkArray.push("<option value='categorical' >Categorical</option>");
//                                    chkArray.push("<option value='numerical' >Numerical</option>");
//                                    chkArray.push("</select>");
//                                    chkArray.push('<label></label>');
//                                    chkArray.push('<a class="close-link" onclick="removeList(this);" id ="remove"><i class="fa fa-close"></i></a>');
//                                    chkArray.push("</div>");
//                                    chkArray.push("</div></br>");
//                                    count++;
//                                });
//                                
//                                chkArray.push("<input type='hidden' value=" + count + " name='subCounter" + parentId + "' value=" + count + "/>");
//
//                                
//                                $("#" + parentId).append(chkArray.join(""));
//                                $(".chk:checkbox").prop('checked', false);
//                            });
//                        };
//                        request.send();
//                        
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
                        while (e && e.className !== "buttonInside open") {

                            // append the text content to the 

                            path = e.firstChild.firstChild.textContent + "/" + path;
                            // go up to the previous menu
                            e = e.parentNode.parentNode;


                        }

                        // set the form's path value
                        $('#' + parentId + ' input[name="path' + parentId + '"]').val(path);
                        var name = /[^/]*$/.exec(path)[0];
                        $('#' + parentId + ' input[name="name' + parentId + '"]').val(name);
                    }

                </script>

                </body>
                </html>
