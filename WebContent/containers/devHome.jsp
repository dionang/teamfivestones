<%@ page import="entities.Developer" %>
<%
	Developer dev = (Developer) session.getAttribute("account");
%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="./assets/css/dashboard.css">
        <title>Developer Homepage</title>
    </head>
    <body>
        <div class="container" style="width:100%">
            <div class="row" style="background-color:#393254;border:1px solid black;height:100px">
                <div class="col-lg-3">
                    <img src="./assets/images/logo.png" />
            	</div>
                <div>
                    <ul class="nav navbar-nav navbar-right" style="margin-right:30px">
                        <li class="">      
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="./assets/images/user.png" style="height:50px;weight:50px" alt="" class="img-circle profile_img"> 
                                <label style="color:white"><%=dev.getName() %></label>
                                <span class=" fa fa-angle-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">
                                <li><a href="javascript:;"> Profile</a></li>
                                <li><a href=""><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
    	</div>
    	
    	<form action="setDatasource">
    		Set Datasource URL: <input name="datasource">
    		<input type="hidden" name="companyId" value=<%= dev.getCompanyId()%>>
    		<input type="submit">
    	</form>
    	
    	
	    <!-- jQuery -->
	    <script src="./assets/js/jquery.min.js"></script>
	    <!-- Bootstrap -->
	    <script src="./assets/js/bootstrap.min.js"></script>
    </body>
</html>