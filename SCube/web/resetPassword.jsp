<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.*" %>
<%    Account account = (Account) session.getAttribute("account");

%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/createForm.css">
        <link rel="stylesheet" href="assets/css/home.css">
        <title>Reset Password</title>
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <%                    if (account instanceof CompanyAccount) {
                %>
                <jsp:include page="sidebarCompany.jsp"></jsp:include>
                <%
                } else {
                %>
                <jsp:include page="sidebarManager.jsp"></jsp:include>
                <%
                    }
                %>
                <jsp:include page="navbar.jsp"></jsp:include>
                    <!-- page content -->
                    <div class="right_col"  >
                        <div class="row">
                            <div class="col-xs-offset-1 col-xs-10" >
                                <div class="form" >
                                    <form action="resetPassword" method="post" id="Sform">
                                        <div class="row">
                                            <div class="col-md-10">
                                                <h1 style="color: #2F4F4F; font-family: Oswald; font-size: 40px">Reset Password</h1>
                                            </div>
                                        </div>
                                        <br>

                                        <div class="row">
                                            <div class="col-md-5">
                                                <label for="password" class="icon-key"> New Password
                                                    <span class="required">*</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-10 col-xs-12 ">
                                                <input type="password" class="form-control" id="password" name="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?])[A-Za-z\d!@#$%^&*()?]{8,}" title="Must contain at least one number and one uppercase and lowercase letter and one special characters, and at least 8 or more characters" required/>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-5">
                                                <label for="confirm" class="icon-key"> Confirm Password
                                                    <span class="required">*</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-10 col-xs-12 ">
                                                <input type="password" class="form-control" id="confirm" required />
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-3 col-xs-12" style="font-size:13px">
                                                [ Password format :
                                            </div>
                                            <div class="col-md-4 col-xs-6" style="font-size:13px" >
                                                <span class="glyphicon glyphicon-remove invalid" id="length"  style="color:#FF0004;"></span> At least 8 Characters Long
                                                <br>
                                                <span class="glyphicon glyphicon-remove invalid" id="capital" style="color:#FF0004;"></span> One Uppercase Letter
                                                <br>
                                                <span class="glyphicon glyphicon-remove invalid" id="space"   style="color:#FF0004;"></span> One Special Character
                                            </div>
                                            <div class="col-md-4 col-xs-6" style="font-size: 13px">
                                                <span class="glyphicon glyphicon-remove invalid" id="letter"  style="color:#FF0004;"></span> One Lowercase Letter
                                                <br>
                                                <span class="glyphicon glyphicon-remove invalid" id="number"  style="color:#FF0004;"></span> One Number 
                                                <br>
                                                <span class="glyphicon glyphicon-remove invalid" id="match"   style="color:#FF0004;"></span> Passwords Match ]
                                            </div>
                                        </div>
                                        <br>
                                        <input type="hidden" name="companyId" value="<%= account.getCompanyId()%>">
                                    <input type="hidden" name="accountType" value="user">
                                    <input type="hidden" name="operation" value="resetPassword" />
                                    <input type="hidden" name="username" value=<%=account.getUsername()%> />
                                    <%if (account.getAccountType().equals("manager")) {%>
                                    <input type="hidden" name="type" value="managerHome.jsp" id="type"/>
                                    <% } else { %>
                                    <input type="hidden" name="type" value="companyHome.jsp" id="type"/>
                                    <% }%>
                                    <div class="row">
                                        <div class="col-md-offset-9 col-sm-offset-8 col-xs-offset-7">
                                            <label class="indication">Fields with
                                                <span class="required"> * </span>are required</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-offset-9 col-sm-offset-8 col-xs-offset-7">
                                            <input type="submit" value="Reset" class="btn btn-success" style="width: 70% !important"/>
                                        </div>
                                    </div>
                                    <br/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- page content -->
            </div>
        </div>

        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Chart.js -->
        <script src="assets/js/chart.min.js"></script>
        <!--Sweet alert -->
        <script src="assets/js/sweetalert.min.js"></script>
        <!-- Custom JS -->
        <script src="assets/js/dashboard.js"></script> 

        <script>
            var myInput = document.getElementById("password");
            var confirm = document.getElementById("confirm");
            var letter = document.getElementById("letter");
            var capital = document.getElementById("capital");
            var number = document.getElementById("number");
            var length = document.getElementById("length");
            var space = document.getElementById("space");
            var match = document.getElementById("match");

// When the user starts to type something inside the password field
            myInput.onkeyup = function () {
                // Validate lowercase letters
                var lowerCaseLetters = "[a-z]";
                if (myInput.value.match(lowerCaseLetters)) {
                    letter.classList.remove("invalid");
                    letter.classList.add("valid");
                    letter.classList.remove("glyphicon-remove");
                    letter.classList.add("glyphicon-ok");
                    letter.style.color = "#00A41E";
                } else {
                    letter.classList.remove("valid");
                    letter.classList.add("invalid");
                    letter.classList.remove("glyphicon-ok");
                    letter.classList.add("glyphicon-remove");
                    letter.style.color = "#FF0004";
                }

                // Validate capital letters
                var upperCaseLetters = "[A-Z]";
                if (myInput.value.match(upperCaseLetters)) {
                    capital.classList.remove("invalid");
                    capital.classList.add("valid");
                    capital.classList.remove("glyphicon-remove");
                    capital.classList.add("glyphicon-ok");
                    capital.style.color = "#00A41E";
                } else {
                    capital.classList.remove("valid");
                    capital.classList.add("invalid");
                    capital.classList.remove("glyphicon-ok");
                    capital.classList.add("glyphicon-remove");
                    capital.style.color = "#FF0004";
                }

                // Validate numbers
                var numbers = "[0-9]";
                if (myInput.value.match(numbers)) {
                    number.classList.remove("invalid");
                    number.classList.add("valid");
                    number.classList.remove("glyphicon-remove");
                    number.classList.add("glyphicon-ok");
                    number.style.color = "#00A41E";
                } else {
                    number.classList.remove("valid");
                    number.classList.add("invalid");
                    number.classList.remove("glyphicon-ok");
                    number.classList.add("glyphicon-remove");
                    number.style.color = "#FF0004";
                }

                // Validate length
                if (myInput.value.length >= 8) {
                    length.classList.remove("invalid");
                    length.classList.add("valid");
                    length.classList.remove("glyphicon-remove");
                    length.classList.add("glyphicon-ok");
                    length.style.color = "#00A41E";
                } else {
                    length.classList.remove("valid");
                    length.classList.add("invalid");
                    length.classList.remove("glyphicon-ok");
                    length.classList.add("glyphicon-remove");
                    length.style.color = "#FF0004";
                }

                // Validate special 
                var special = /[^a-zA-Z0-9\-\/]/;
                if (myInput.value.match(special)) {
                    space.classList.remove("invalid");
                    space.classList.add("valid");
                    space.classList.remove("glyphicon-remove");
                    space.classList.add("glyphicon-ok");
                    space.style.color = "#00A41E";
                } else {
                    space.classList.remove("valid");
                    space.classList.add("invalid");
                    space.classList.remove("glyphicon-ok");
                    space.classList.add("glyphicon-remove");
                    space.style.color = "#FF0004";
                }

                // Validate confirm password
                if (myInput.value === confirm.value) {
                    match.classList.remove("invalid");
                    match.classList.add("valid");
                    match.classList.remove("glyphicon-remove");
                    match.classList.add("glyphicon-ok");
                    match.style.color = "#00A41E";
                    confirm.setCustomValidity("");
                } else {
                    match.classList.remove("valid");
                    match.classList.add("invalid");
                    match.classList.remove("glyphicon-ok");
                    match.classList.add("glyphicon-remove");
                    match.style.color = "#FF0004";
                    confirm.setCustomValidity("Passwords Don't Match");
                }
            };

            confirm.onkeyup = function () {
                // Validate confirm password
                if (myInput.value === confirm.value) {
                    match.classList.remove("invalid");
                    match.classList.add("valid");
                    match.classList.remove("glyphicon-remove");
                    match.classList.add("glyphicon-ok");
                    match.style.color = "#00A41E";
                    confirm.setCustomValidity("");
                } else {
                    match.classList.remove("valid");
                    match.classList.add("invalid");
                    match.classList.remove("glyphicon-ok");
                    match.classList.add("glyphicon-remove");
                    match.style.color = "#FF0004";
                    confirm.setCustomValidity("Passwords Don't Match");
                }
            };
            document.getElementById("Sform").onsubmit = function (e) {
                e.preventDefault();
                swal({
                    title: "Confirmation",
                    text: "Are you sure you want to reset password?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                        .then((confirm) => {
                            if (confirm) {
                                var form = document.getElementById("Sform");
                                $.ajax({
                                    type: "POST",
                                    url: "resetPassword",
                                    data: {
                                        username: form.elements["username"].value,
                                        password: form.elements["password"].value,
                                        operation: form.elements["operation"].value
                                    },
                                    success: function (success) {
                                        if (success === "true") {
                                          
                                            swal({icon: "success", text: "Password reset successfully!", type: "success"});

                                        } else {
                                            swal("Error occurs when reset password!!!", {
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



