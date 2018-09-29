<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.*" %>
<%  
    Account account = (Account) session.getAttribute("account");
    
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
        <title>Create User Account</title>
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <%
                    if (account instanceof CompanyAccount) {
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
                <div class="right_col" style="background-image: url(https://auditplus.com.pl/wp-content/uploads/2013/06/Abstract-office-table-free-ppt-backgrounds.jpg); background-size:  100% 100%; " >
                    <div class="row">
                        <div class="col-xs-offset-1 col-xs-10" style="background-color: #FDFDFD">
                            <div class="form" >
                                <form action="createAccount" method="post" id="submitForm">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <h1 style="color: #2F4F4F; font-family: Oswald; font-size: 40px">Create User Account</h1>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <label for="name" class="icon-user" > Name
                                                <span class="required">*</span>
                                            </label>  
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-10 col-xs-12 ">
                                            <input type="text" class="form-control" name="name" placeholder="Enter your name" required="" />
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
                                            <label for="password" class="icon-key"> Password
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
                                    <input type="hidden" name="operation" value="createAccount"/>
                                    <%if (account.getAccountType().equals("manager")){%>
                                         <input type="hidden" name="type" value="managerHome.jsp" id="type"/>
                                    <% } else { %>
                                        <input type="hidden" name="type" value="companyHome.jsp" id="type"/>
                                    <% } %>
                                    <div class="row">
                                        <div class="col-md-offset-9 col-sm-offset-8 col-xs-offset-7">
                                            <label class="indication">Fields with
                                                <span class="required"> * </span>are required</label>
                                        </div>
                                    </div>
                                    <%
                                        String error = request.getParameter("error");
                                        if(error != null){
                                             out.print("<h5 class='col-lg-4' style='color:red'>Username already exists!</h5>");
                                        }
                                    %>
                                    <div class="row">
                                        <div class="col-md-offset-9 col-sm-offset-8 col-xs-offset-7">
                                            <input type="submit" value="Create User" class="btn btn-success" style="width: 70% !important"/>
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
        <script src="assets/js/checkPassword.js"></script>
    </body>
</html>



