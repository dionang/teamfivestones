<%@ include file="protect.jsp" %>
<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%@ page import="scube.entities.Manager" %>
<%
    Account account = (Account) session.getAttribute("account");
    //if (!(account instanceof Manager)){
       // response.sendRedirect("/");
       // return;
    //}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
        <link rel="stylesheet" href="assets/css/createForm.css">
         <link rel="stylesheet" href="assets/css/home.css">
        <title>Manager Home</title>
        
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                
                <jsp:include page="sidebar.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                <!-- page content -->
                <div class="right_col">
                    
                    <div class="form">
                    <h1>Create User Account</h1><br/>
                    <form action="/createUser" method="post" id="submitForm">
                        <p>
                            <label for="username" class="icon-user"> Name
                                <span class="required">*</span>
                            </label>
                            <input type="text" class="form-control" name="name" placeholder="Enter your name" required="" />
                        </p>
                        <p>
                            <label for="username" class="icon-user"> User Name
                                <span class="required">*</span>
                            </label>
                           <input class="form-control" name="username" placeholder="Enter your username" required="" />
                        </p>
                        <p>
                            <label for="username" class="icon-key"> Password
                                <span class="required">*</span>
                            </label>
                            <input type="password" class="form-control" id="psw" name="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}" title="Must contain at least one number and one uppercase and lowercase letter and one special characters, and at least 8 or more characters" required/>
                            <div class="row">
                                <div class="col-sm-3" style="font-size:13px">
                                  [ Password format :
                                </div>
                                <div class="col-sm-4" style="font-size:13px" >
                                   <span class="glyphicon glyphicon-remove invalid" id="length" style="color:#FF0004;"></span> 8 Characters Long
                                    <br>
                                    <span class="glyphicon glyphicon-remove invalid" id="capital" style="color:#FF0004;"></span> One Uppercase Letter
                                    <br>
                                    <span class="glyphicon glyphicon-remove invalid" id="space" style="color:#FF0004;"></span> One Special Letter ]
                                
                                </div>
                              
                                <div class="col-sm-4" style="font-size: 13px">
                                   <span class="glyphicon glyphicon-remove invalid" id="letter" style="color:#FF0004;"></span> One Lowercase Letter
                                    <br>
                                    <span class="glyphicon glyphicon-remove invalid" style="color:#FF0004;" id="number"></span> One Number </div>
                                </div>
                        </p>
 
                        <input type="hidden" name="companyId" value="<%= account.getCompanyId() %>">
                        <input type="hidden" name="operation" value="createUser"/>
                        <br>
                        <p class="indication">Fields with
                            <span class="required"> * </span>are required
                        </p>
                      
                        <input type="submit" value="Create User" class="btn btn-success" />

                        <br><br>
                    </form>
                </div>
                        <br><br>
                </div>
               
                <!-- page content -->
            </div>
        </div>
        
        <!-- jQuery -->
        <script src="/assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="/assets/js/bootstrap.min.js"></script>
        <!-- Chart.js -->
        <script src="/assets/js/chart.min.js"></script>
        <!--swal-->
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="/assets/js/dashboard.js"></script> 
        <script>
            var myInput = document.getElementById("psw");
            var letter = document.getElementById("letter");
            var capital = document.getElementById("capital");
            var number = document.getElementById("number");
            var length = document.getElementById("length");
            var space = document.getElementById("space");

            
            // When the user starts to type something inside the password field
            myInput.onkeyup = function() {
              // Validate lowercase letters
              var lowerCaseLetters = /[a-z]/g;
              if(myInput.value.match(lowerCaseLetters)) { 
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
              var upperCaseLetters = /[A-Z]/g;
              if(myInput.value.match(upperCaseLetters)) { 
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
              var numbers = /[0-9]/g;
              if(myInput.value.match(numbers)) { 
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
              if(myInput.value.length >= 8) {
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
              if(myInput.value.match(special)) { 
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
            };
        </script>
        <script>
            document.getElementById('submitForm').onsubmit = function(e){
            e.preventDefault()  ;
            
            swal({
                title: "Confirmation",
                text: "Are you sure you want to create this account?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
            .then((willDelete) => {
                if (willDelete) {

                    swal(" Account has been created successfully!", {
                      icon: "success",   
                    })
                    .then((willDelete)=>{
                        if (willDelete) {
                             document.getElementById('submitForm').submit();
                        }
                    });   
                }
            });
  
             
            };
           
               
            

           
        </script>
       
    </body>
</html>

