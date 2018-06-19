<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">   
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="/assets/css/login.css">
        <script src="/assets/js/jquery.min.js"></script>
        <script src="/assets/js/bootstrap.min.js"></script>
        <title>Login Page</title>
    </head>
    <body>
        <div class="row" style="margin-top:250px">
            <div class="col-lg-1"></div>
            <div class="col-lg-3">
                <img src="/assets/images/logo.png" />
            </div>
            <div class="col-lg-3">
                <div class="vl"></div>    
            </div>
            <div class="col-lg-3">
                <%
                    String message = (String)session.getAttribute("message");
                    if (message!= null) {
                        out.println("<h4 style=\"color:red\">"+message+"</h4>");
                    }
                    session.removeAttribute("message");
                %>
                <form name="loginForm" action="login" method="post">
                    <div class="input-group " >
                      <span class="input-group-addon" ><i class="glyphicon glyphicon-user"></i></span>
                      <input id="email" type="text" class="form-control" name="username" placeholder="User Name" required="true">
                    </div>
                    <br>
                    <div class="input-group">
                      <span class="input-group-addon" ><i class="glyphicon glyphicon-lock" ></i></span>
                      <input id="password" type="password" class="form-control" name="password" placeholder="Password" required="true">
                    </div>
                    <br><br>
                    <input class="btn btn-primary" type="submit" value="Login">
                    <br><br>    
                    <label class="forget">Forget your password?</label>
                </form>   
            </div>           
        </div>
    </body>
</html>
