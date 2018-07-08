<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">   
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="/assets/css/login.css">
        <script src="/assets/js/jquery.min.js"></script>
        <script src="/assets/js/bootstrap.min.js"></script>
        <title>Login Page</title>
    </head>
    <body>
        
        
        
  
        <div class="row" style="margin-top:18%">
            <div class="col-md-1 col-xs-2"></div>
            <div class="col-md-3 col-xs-8" style="padding-left: 0px">
                <img style="width: 100%; max-width: 300px" src="/assets/images/logo.png" />
            </div>
            <div class="col-md-2 col-xs-2">
                <div class="vl col-sm-12 hidden-sm hidden-xs"></div>    
            </div>
            <div class="col-md-4 col-xs-12" >
                <div class="row">
                <%
                    String error = request.getParameter("error");
                    if (error != null) {
                        out.println("<h4 class= 'col-md-10 col-xs-offset-2' style='color:red'>Incorrect username/password!</h4>");
                    }
                %>
                </div>
                <div class="row">
                    <div class="col-md-10 col-xs-offset-2 col-xs-8" >
                        <form name="loginForm" action="login" method="post">
                            <div class="row">
                                <div class="input-group" >
                                    <span class="input-group-addon" ><i class="glyphicon glyphicon-user"></i></span>
                                    <input id="email" type="text" class="form-control" name="username" placeholder="User Name" required="true">
                                </div>
                            </div>
                            <br>
                            <div class="row" >
                                <div class="input-group">
                                    <span class="input-group-addon" ><i class="glyphicon glyphicon-lock" ></i></span>
                                    <input id="password" type="password" class="form-control" name="password" placeholder="Password" required="true">
                                </div>
                            </div>
                            <br><br>
                            <div class="row" >
                                <input class="btn btn-success btn-block" type="submit" value="Login" >
                            </div>
                            <br><br>  
                            <div class="row">
                                <label class="forget">Forget your password?</label>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>           
        </div>
    </body>
</html>
