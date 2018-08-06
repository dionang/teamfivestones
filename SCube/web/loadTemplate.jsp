<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager" %>
<%
    Account account = (Account) session.getAttribute("account");
    /**if (!(account instanceof Manager)){
        response.sendRedirect("/");
        return;
    }**/
        
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/template.css">
        <title>Load Template</title>
        
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                
                <jsp:include page="sidebarManager.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                <!-- page content -->
                
                <div class="right_col">
                    <div class="content">
                      <% String id=request.getParameter("templateId");
                       int templateId;
                         if(id==null){
                              templateId=0;
                         }else{
                         templateId=Integer.parseInt(id);
                         }
                          
                      
                     
                      %>
 
                       </div>
                    </div>  
                <!-- page content -->
                </div>
            </div>
        </div>
        
        <!-- jQuery -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Custom JS -->
        <script src="assets/js/dashboard.js"></script> 
        

    </body>
</html>
