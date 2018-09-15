
<%@page import="scube.entities.Manager"%>
<%@page import="scube.entities.Template"%>
<%@page import="java.util.ArrayList"%>
<%@page import="scube.dao.ReportDAO"%>
<%@page import="scube.entities.Account"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/createForm.css">
        <title>Slide Show</title>
        <%
            Account account = (Account) session.getAttribute("account");

            if (!(account instanceof Manager)) {
                response.sendRedirect("login.jsp");
                return;
            }
            int companyId = account.getCompanyId();

        %>
    </head>
    <body class="nav-md">

        <div class="container body">
            <div class="main_container">

                <jsp:include page="sidebarManager.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                    <!-- page content -->

                    <!-- set datasource -->
                    <div class="right_col">
                         <div class="form">
                            <form action="slideShow" method="post" target="_blank">
                                <input type="hidden" name="operation" value="slideShow"/>
                                <h1>Select Template</h1>
                                <br/>
                                <select name="template" class="form-control" style="font-size:14px;height:40px;">
                                   
                                <% ReportDAO reportDao = new ReportDAO();
                                ArrayList<Template> templateList = reportDao.retrieveAllTemplatesByCompany(companyId);
                                for (Template eachTemplate : templateList) {%>
                                <option  value="<%=eachTemplate.getTemplateId() + "," + eachTemplate.getTemplateName()%>"><%=eachTemplate.getTemplateName()%></option>   
                                <% }
                                %>

                            </select>
                               <br/>
                            <button type="submit" class="btn btn-success" >Generate Slide Show</button>
                          
                        </form> 
                    </div>
                </div>
            </div>
        </div>


    </body>
</html>
