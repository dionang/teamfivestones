<%-- 
    Document   : forgetPassword
    Created on : Oct 14, 2018, 5:17:08 PM
    Author     : ZhenDan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/createForm.css">

        <title>Forget Password</title>
    </head>
    <body>
        <div class="col-md-offset-1 col-md-10" style="margin-top:100px;">
            <div class="form">
                <form action="password" method="post" id="submitForm">
                    <input type="hidden" name="operation" value="forgetPassword" />
                    <div class="row">
                        <div class="col-md-10">
                            <h1>Forget Password ?</h1>
                            <h5>Enter your user name to reset your password.</h5>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-5">
                            <label for="username" class="icon-user"> User Name
                                <span class="required">*</span>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-xs-12">
                            <input class="form-control" name="username" placeholder="Enter your username" required="" />
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-5">
                            <label for="username" class="icon-envelope"> Email Address:
                                <span class="required">*</span>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-xs-12">
                            <input class="form-control" name="email" placeholder="Enter your email" required="" />
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-lg-offset-7 col-xs-offset-6" >

                            <button class="btn btn-success" type="submit" id="btnSubmit" style="width: 25% !important;margin-left:50px">
                                <i class="fa fa-refresh"></i> Reset
                            </button>

                            <a class="btn btn-primary" style="float:right;margin-right:220px" href="login.jsp"><i class="fa fa-home"></i> Back</a>
                        </div>
                    </div>
                    <br/>
                </form>
            </div>
        </div>
        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Sweet Alert -->
        <script src="assets/js/sweetalert.min.js"></script>

        <script>
            document.getElementById('submitForm').onsubmit = function (e) {
                e.preventDefault();
                
                swal({
                    title: "Confirmation",
                    text: "Are you sure you want to reset your paswword?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                        .then((confirm) => {
                            if (confirm) {
                                var form = document.getElementById("submitForm");
                                $.ajax({
                                    type: "POST",
                                    url: "password",
                                    data: {
                                        operation: form.elements[0].value,
                                        username: form.elements[1].value,
                                        email: form.elements[2].value, 
                                    },
                                    success: function (success) {
                                        var array =success.split(",");
                                        var result=array[0];
                                        var message=array[1];
                                        if (result === "true") {
                                            swal({icon: "success", text: message, type: "success"});
                                                   
                                        } else {
                                            swal(message, {
                                                icon: "error"
                                            });
                                        }
                                    }
                                });
                            }
                        });

            };
        </script>
    </body>
</html>
