<%@page import="java.util.ArrayList"%>
<%@page import="scube.dao.ReportDAO"%>
<%@page import="scube.entities.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/slideShow.css">
        <title>Slide Show</title>
        <%
            Account account = (Account) session.getAttribute("account");

            if (!(account instanceof Manager) && !(account instanceof User)) {
                response.sendRedirect("login.jsp");
                return;
            }
            int companyId = account.getCompanyId();
            String message = (String) request.getAttribute("alertMsg");
        %>
    </head>
    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <jsp:include page="sidebarManager.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                    <div class="right_col"
                        <div class="form" style=" margin-top: 20px; " >
                            <form action="slideShow" method="post" target="_blank" >
                                <input type="hidden" name="operation" value="slideShow"/>
                                <h1 style="color: #2F4F4F; font-family: Oswald; font-size: 30px">Select Template</h1>
                                <br/>
                                <select name="template" class="form-control" style="font-size:14px;height:40px;" id="templateName">
                                <%                                    ReportDAO reportDao = new ReportDAO();
                                    ArrayList<Template> templateList = reportDao.retrieveAllTemplatesByCompany(companyId);
                                    for (Template eachTemplate : templateList) {
                                %>
                                <option value="<%=eachTemplate.getTemplateId() + "," + eachTemplate.getTemplateName()%>">
                                    <%=eachTemplate.getTemplateName()%>
                                </option>   
                                <% }%>
                            </select>
                            <br/>
                            <a  class="btn btn-warning" id="myBtn">Compose Email</a>
                        </form>

                        <!-- Modal content -->
                        <div id="myModal" class="modal" >
                            <div class="modal-content">

                                <div class="row">
                                    <form action="EmailController" method="post" id="submitForm" enctype="multipart/form-data">
                                        <div class="row header">
                                            <h3 style="float:left">New Message</h3>
                                            <span class="close" >&times;</span>

                                        </div>
                                        <br>

                                        <div class="row form-group" style="border-bottom: 1px solid #DBDBDB;">
                                            <span>To</span>
                                            <input type="text" class="new" name="to" placeholder="Enter recipient's email address" required="" />
                                        </div>
                                        <div class="row form-group" style="border-bottom: 1px solid #DBDBDB;">
                                            <input type="text" class="new" name="subject" placeholder="Subject" />
                                        </div>
                                        <div class="row">
                                            <textarea class="message" placeholder="Add a message here" name="message"></textarea>
                                        </div>
                                        <br>
                                        <div class="row">
                                            Attached:
                                        </div>
                                        <div class="row form-group">
                                            <input type="checkbox" id="ppt" name="ppt" value="" checked><label id="pptName"></label>
                                            <input type="checkbox" id="pdf" name="pdf" value="" checked style="margin-left:10px"> <label id="pdfName" ></label>
                                        </div>
                                        <input type="hidden" name="username" value="<%= account.getUsername()%>">
                                        <input type="hidden" id="fileNum" name="fileNum" value="" />
                                        <input type=hidden id="fileName" name="fileName" value="" />
                                        <div class="row">
                                            <p  id="demo">

                                            </p>
                                        </div>
                                        <input type = "file" name = "file" multiple="multiple" class="btn btn-danger" id="myFile" onchange="myFunction()" style="display:none"/>
                                        <div class="row form-group">

                                            <a id="upload" value="Send"  class="btn btn-danger"  ><img src="assets/images/attach.png" style="wodth:20px;height:20px"/>Attach</a>
                                            <input type="submit" value="Send"  class="btn btn-success" style="margin-left:10px;" id="btnSubmit"/>

                                        </div>

                                        <br/>
                                    </form>


                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Sweet Alert -->
        <script src="assets/js/sweetalert.min.js"></script>
        <script src="assets/js/dashboard.js"></script> 
        <script>
                                            // Get the modal
                                            var modal = document.getElementById('myModal');

                                            // Get the button that opens the modal
                                            var btn = document.getElementById("myBtn");

                                            // Get the <span> element that closes the modal
                                            var span = document.getElementsByClassName("close")[0];
                                            var file = "";
                                            var fileName = "";

                                            // When the user clicks the button, open the modal 
                                            btn.onclick = function () {
                                                modal.style.display = "block";

                                                file = document.getElementById("templateName");
                                                var fileName = file.options[file.selectedIndex].text;
                                                document.getElementById("fileName").value = fileName;
                                                document.getElementById("ppt").value = fileName + ".pptx";
                                                document.getElementById("pdf").value = fileName + ".pdf";
                                                document.getElementById("pptName").innerHTML = fileName + ".pptx";
                                                document.getElementById("pdfName").innerHTML = fileName + ".pdf";

                                            };

                                            // When the user clicks on <span> (x), close the modal
                                            span.onclick = function () {
                                                modal.style.display = "none";
                                            };

                                            // When the user clicks anywhere outside of the modal, close it
                                            window.onclick = function (event) {
                                                if (event.target === modal) {
                                                    modal.style.display = "none";
                                                }

                                            };
                                            $('#upload').click(function () {
                                                $('#myFile').trigger('click');
                                            });
                                            var form = document.getElementById("submitForm");
                                            $("#btnSubmit").click(function (event) {

                                                event.preventDefault();
                                                swal({
                                                    title: "Confirmation",
                                                    text: "Are you sure you want to send this email?",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true


                                                }).then((confirm) => {
                                                    if (confirm) {
                                                        var form = $('#submitForm')[0];
                                                        var data = new FormData(form);
                                                        // disabled the submit button
                                                        $("#btnSubmit").prop("disabled", true);

                                                        $.ajax({
                                                            type: "POST",
                                                            url: "EmailController",
                                                            data: data,
                                                            processData: false,
                                                            contentType: false,
                                                            success: function (success) {
                                                 
                                                                if (success === "true") {
                                      
                                                                    swal({icon: "success", text: "An email has been sent out successfully!!", type:
                                                                                "success"}).then(function () {
                                                                                $("#btnSubmit").prop("disabled", false);
                                                                                modal.style.display = "none";
                                                                    }
                                                                    );
                                                                } else {
                                                                    swal({icon: "error", text: "Error with email"}).then(function () {
                                                                                $("#btnSubmit").prop("disabled", false);
                                                                                
                                                                    }
                                                                    );
                                                                }
                                                            }
                                                        });

                                                    }
                                                });

                                            });
        </script>

        <script>
            function myFunction() {
                var x = document.getElementById("myFile");
                var txt = "";
                if ('files' in x) {

                    for (var i = 0; i < x.files.length; i++) {
                        var file = x.files[i];
                        if ('name' in file) {
                            txt += file.name;
                        }
                        if ('size' in file) {
                            txt += "(" + file.size + " bytes) <br>";
                        }
                    }

                } else {
                    txt += "The files property is not supported by your browser!";
                    txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.     
                }
                document.getElementById("demo").innerHTML = txt;
            }

        </script>
        <!--<script type="text/javascript">
            var msg = "<%=message%>";
            alert(msg);
        </script>-->
    </body>
</html>
