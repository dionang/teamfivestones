<%@page import="scube.entities.Template"%>
<%@page import="java.util.*"%>
<%@page import="scube.dao.ReportDAO"%>
<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager" %>
<%
    Account account = (Account) session.getAttribute("account");
    /**if (!(account instanceof Manager)){
        response.sendRedirect("/");
        return;
    }else{**/
        int companyId=account.getCompanyId();
        ReportDAO report=new ReportDAO();
        ArrayList<Template> templateList=report.retrieveAllTemplatesByCompany(companyId);
            /**}**/
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
        <link rel="stylesheet" href="/assets/css/template.css">
        <title>Template Home</title>
        
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                
                <jsp:include page="sidebarManager.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                <!-- page content -->
                
                <div class="right_col">
                    <div class="content">
                        <div class="col-lg-3 col-md-4">
                            <!-- Trigger/Open The Modal -->
                            <a href="#" id="myBtn">
                                <div class="card card-inverse card-info">
                                     <div class="card-block">
                                        <img class="card-img-top create" src="/assets/images/create.png">
                                    </div>
                                    <div class="card-footer">

                                    <div class="row">
                                            <div class="col-sm-offset-1 col-sm-4">
                                                <h4 class="card-title "><span class="glyphicon glyphicon-plus "></span>Create New Template</h4>
                                            </div>
                                        </div>

                                        <div class="row" style=" opacity: 0;" >
                                            <div class="col-md-5 edit">
                                             <h5><span class="glyphicon glyphicon-edit "></span></h5> 
                                            </div>
                                            <div class="col-sm-1"></div>
                                            <div class="col-sm-5 delete " >
                                           <h5><span class="glyphicon glyphicon-trash "></span></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a> 
                        </div>  
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">
                                <div class="row">
                                    <span class="close">&times;</span>
                                </div>
                                <div class="row">
                                    <div class="col-sm-offset-2 col-sm-4 ">
                                        <a href="loadTemplate.jsp">
                                             <div class="card card-inverse card-info">
                                                 <div class="card-block">
                                                     <img class="card-img-top" src="/assets/images/dummyReprot.png">
                                                 </div>
                                                 <div class="card-footer">
                                                 <h4 class="card-title " style="text-align:center">Default Template</h4>
                                                 </div>
                                             </div>
                                         </a> 
                                    </div> 
                                    <div class="col-sm-1 "></div>
                                    <div class="col-sm-4 ">
                                        <a href="#" id="pageSize">
                                             <div class="card card-inverse card-info">
                                                 <div class="card-block">
                                                     <img class="card-img-top" src="/assets/images/dummyReprot.png" style="opacity:0">
                                                 </div>
                                                 <div class="card-footer">
                                                 <h4 class="card-title " style="text-align:center">Blank Template</h4>
                                                 </div>
                                             </div>
                                         </a> 
                                    </div> 
                                    <div id="size" class="modal">
                                        <!-- Modal content -->
                                        <div class="modal-content">
                                            <form action="report.jsp" method="post">
                                                <div class="row">
                                                     <span class="close">&times;</span>
                                                </div>
                                                 <div class="row">
                                                     <div class="col-sm-offset-3 col-sm-4 ">
                                                         <div class='title'>Please choose your report page size.</div>
                                                         <div class="radio">
                                                             <label><input type="radio" name="size" value="A3">A3</label>
                                                         </div>
                                                         <div class="radio">
                                                             <label><input type="radio" name="size" value="A4" checked >A4</label>
                                                         </div>
                                                         <div class="radio">
                                                             <label><input type="radio" name="size" value="A5" >A5</label>
                                                         </div> 
                                                     </div> 

                                                </div> 
                                                <div class="row">
                                                    <div class="col-sm-offset-3 col-sm-4 ">
                                                        <div class='title'>Please choose your report layout.</div>
                                                        <div class="radio">
                                                            <label><input type="radio" name="layout" value="Portrait" checked>Portrait</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio" name="layout" value="Landscape">Landscape</label>
                                                        </div>
                                                    </div> 
                                                </div> 
                                                <div class="row">
                                                    <div class="col-sm-offset-7 col-sm-2 ">
                                                        <input type="submit" value="Submit" class="btn btn-info">
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>

                        <%for(int i=0;i<templateList.size();i++) {
                            Template template=templateList.get(i); %>
                            <form action="/templateControl" method="post" id="test">
                                <input type=hidden name="templateId" value="<% out.print(template.getTemplateId());%>">
                                <input type=hidden name="operation" value="templateControl">
                                <div class="col-lg-3 col-md-4">
                                    <div class="card card-inverse card-info">
                                        <div class="card-block">
                                            <img class="card-img-top" src="/assets/images/dummyReprot.png">
                                        </div>
                                        <div class="card-footer">
                                            <div class="row">
                                                <div class="col-sm-offset-1 col-sm-4">
                                                    <h4 class="card-title"><%out.println(template.getTemplateName());%></h4>
                                                </div>
                                            </div>

                                            <div class="row"  >
                                                <div class="col-md-5 ">

                                                <button class="btn edit" name="viewBtn" value="view"><i class="fa fa-edit"></i> View/Edit</button>
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <div class="col-sm-5  " >
                                                    <button class="btn delete" name="deleteBtn" value="delete" ><i class="fa fa-trash"></i> Delete</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>             
                            </form>      
                        <% }%>
                        </div>
                    </div>  
                <!-- page content -->
                </div>
            </div>
        </div>
        
        <!-- jQuery -->
        <script src="/assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="/assets/js/bootstrap.min.js"></script>
        <!-- Custom JS -->
        <script src="/assets/js/dashboard.js"></script> 
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="/assets/js/checkPassword.js"></script>
        <script>
            let template = document.getElementsByClassName('delete');
            for(i = 0; i < template.length;i++) {
                template[i].addEventListener('click', function(e){
                    e.preventDefault();
                    swal({
                        title: "Confirmation",
                        text: "Are you sure you want to delete this template?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true
                    })
                    .then((confirm) => {
                        if(confirm){
                            var form = document.getElementById("test");
                            $.ajax({
                                url: "/templateControl",
                                data: {
                                    id: form.elements["templateId"].value,
                                   deleteBtn: form.elements["deleteBtn"].value,
                                   operation:form.elements["operation"].value,
                                },
                                success: function(success){
                                    if(success === "true"){
                                        swal({icon: "success", text: "Template has been deleted successfully!!", type: 
                                            "success"}).then(function(){ 
                                               location.reload();
                                               }
                                            );    
                                    } else {
                                        swal("ERROR!", {
                                            icon: "error"
                                        });
                                    }
                                }
                            });
                        }
                    }); 
                    });
              }
           
        </script>
        <script>
            // Get the modal
            var modal = document.getElementById('myModal');
            var modal1 = document.getElementById('size');

            // Get the button that opens the modal
            var btn = document.getElementById("myBtn");
             var btn1 = document.getElementById("pageSize");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            var span1 = document.getElementsByClassName("close")[1];
             


            // When the user clicks the button, open the modal 
            btn.onclick = function() {
                modal.style.display = "block";
            }
            
            btn1.onclick = function() {
                modal1.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }
            span1.onclick = function() {
                modal1.style.display = "none";
            }
           
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
                if (event.target == modal1) {
                    modal1.style.display = "none";
                }
            }
        </script>
    </body>
</html>

