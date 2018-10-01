<%-- 
    Document   : slideShow2
    Created on : Sep 15, 2018, 9:15:30 PM
    Author     : ZhenDan
--%>

<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="assets/css/slideShow.css">
        <title>JSP Page</title>
    </head>
    <body>
        <div class="row" style=" margin-top:20px;">
             
            <div class="slideshow-container" >
                <a class="prev" onclick="plusSlides(-1)" >&#10094;</a>
                <% 
                    ArrayList<String> slides = (ArrayList<String>) request.getAttribute("slides");
                    for (int i=0;i<slides.size();i++) {
                %>
                        <div class="mySlides fade" >
                            <img src="<%=slides.get(i)%>" style="width:100%;">
                            <div class="text"><%= i+1%>/<%=slides.size()%></div>
                        </div>
                <%  } %>

               
                <a class="next" onclick="plusSlides(1)">&#10095;</a>
            </div>
            <br>
           
        </div>
        <script>
            var slideIndex = 1;
            showSlides(slideIndex);

            function plusSlides(n) {
                showSlides(slideIndex += n);
            }

            function currentSlide(n) {
                showSlides(slideIndex = n);
            }

            function showSlides(n) {
                var i;
                var slides = document.getElementsByClassName("mySlides");
                var dots = document.getElementsByClassName("dot");
                if (n > slides.length) {
                    slideIndex = 1
                }
                if (n < 1) {
                    slideIndex = slides.length
                }
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }
                slides[slideIndex - 1].style.display = "block";
                dots[slideIndex - 1].className += " active";
            }
        </script>
    </body>
</html>
