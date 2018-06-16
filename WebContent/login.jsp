<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="./assets/js/jquery.min.js"></script>
        <script src="./assets/js/bootstrap.min.js"></script>
        <style>
            body{
                background-color: #393254;
                            
            }
            .vl {
                border-left: 1px solid rgb(207, 207, 209, 0.2);
                height: 300px;
                position: absolute;
                left: 50%;
                margin-left: -3px;
                margin-top:-55px;
                top:0px;
            }
            .input-group{
                border:2px solid rgb(207, 207, 209, 0.2);
                border-radius:15px;
            }
            .input-group-addon{
                height:50px;
                background-color: transparent;
                border:none;
            }
            .form-control{
                height:50px;
                background-color: transparent;
                border:none;
            }
            .btn{
                width:320px;
                height:50px;
                background-color: #57BB59;
                border-color:#57BB59;
                font-size:large;
                font-weight:bold;
                
            }
            .forget{
                color:rgb(207, 207, 209, 0.8);
                font-size:medium;
                
            }
        </style>
        <title>Login Page</title>
    </head>
    <body>
        <div class="row" style="margin-top:250px">
            <div class="col-lg-1"></div>
            <div class="col-lg-3">
                <img src="./assets/images/logo.png" />
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
                      <input id="email" type="text" class="form-control" name="user" placeholder="User Name" required="true">
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
