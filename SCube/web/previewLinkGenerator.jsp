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
        <title>Generate Preview Link</title>
        <%
            Account account = (Account) session.getAttribute("account");

            if (!(account instanceof Manager) && !(account instanceof User)) {
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
                <div class="right_col"
                    <div class="form" style=" margin-top: 20px; " >
                        <h1 style="color: #2F4F4F; font-family: Oswald; font-size: 30px">Select Template</h1>
                        <br/>
                        <div class="form-group row">
                            <label class="control-label col-sm-2" style="padding-top:10px;font-size:14px;height:40px;">Report Name</label>
                            <div class="col-sm-10">
                                <select id="selectedTemplate" class="form-control" style="font-size:14px;height:40px;">
                                    <%                                    
                                        ReportDAO reportDao = new ReportDAO();
                                        ArrayList<Template> templateList = reportDao.retrieveAllTemplatesByCompany(companyId);
                                        for (Template eachTemplate : templateList) {
                                    %>
                                    <option value="<%=eachTemplate.getTemplateId() + "," + eachTemplate.getTemplateName()%>">
                                        <%=eachTemplate.getTemplateName()%>
                                    </option>   
                                    <%  } %>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-2" style="padding-top:10px;font-size:14px;height:40px;">Access Token</label>
                            <div class="col-sm-10">
                                <input id='accessToken' class="form-control" style="font-size:14px;height:40px;"/>
                            </div>
                        </div>
                        <br/>
                        <button class="btn btn-success col-sm-3" onclick="generateLink()">Generate Preview Link</button>
                        <button class="btn btn-primary col-sm-2" id='copyLink' onclick="copyLink()">Copy Link</button>
                        <div class="col-sm-7">
                            <input class="form-control" id="previewLink" target="_blank" style="padding-top:10px;font-size:12px"></input>
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
            function generateLink() {
                let templateId = document.getElementById('selectedTemplate').value.split(',')[0];
                let accessToken = document.getElementById('accessToken').value;
                let previewLink = document.getElementById('previewLink');
//                let previewUrl = 'https://report.scubeapp.com/SCube/renderPdf.jsp?accessToken=' + accessToken + '&templateId=' + templateId;
                let previewUrl = 'https://scube.rocks/SCube/renderPdf.jsp?accessToken=' + accessToken + '&templateId=' + templateId;
                previewLink.value = previewUrl;
            }
            
            function copyLink() {
                let previewLink = document.querySelector('#previewLink');
                previewLink.select();
                document.execCommand("copy");
            }
        </script>
    </body>
</html>
