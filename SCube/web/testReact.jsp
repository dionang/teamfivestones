<%@ include file="protect.jsp" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
        <link rel="stylesheet" href="/assets/css/app.css">
    </head>
    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <jsp:include page="sidebarReport.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>
                <div class="right_col" style="overflow-x: hidden">
                    <div id="container"></div>
                </div>
            </div>
        </div>
    <!-- jQuery -->
    <script src="/assets/js/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="/assets/js/bootstrap.min.js"></script>
    <!-- React modules-->
    <script src="assets/js/babel.js"></script>
    <script src="assets/js/bundle.js"></script>
    <!-- React modules-->
    <script src="assets/js/jsonProcessor.js"></script>
    <!-- Custom React Script -->
    <script type="text/babel" src="assets/js/app.js"></script>    
    <script src="assets/js/screenshot.js"></script>
    <script src="/assets/js/jspdf.js"></script>
    <script src="/assets/js/html2pdf.js"></script>


    <!-- Custom Dashboard Script -->
    <script>
        $(document).ready(function () {
            // Toggle sidebar
            $('#screenshot').click(function () {
                var pdf = new jsPDF('p', 'pt', 'letter');
                var canvas = pdf.canvas;

                canvas.width = 8.5 * 72;

                html2canvas(document.body, {
                    canvas:canvas,
                    onrendered: function(canvas) {
                        var iframe = document.createElement('iframe');
//                        iframe.setAttribute('style','left:0; top:0; bottom:0; height:100%; width:500px');
                        iframe.src = pdf.output('datauristring');
                        pdf.save("test.pdf");

                    }
                });
//                window.open(window.URL.createObjectURL(screenshotPage()));
            });
            
            $('#options li').click(function () {
                $(this).find('ul').toggle();
            });

            $('#menu_toggle').click(function () {
                $('#logo').toggle();
                $('#logo2').toggle();
                $('#title').toggle();
                $('#title1').toggle();

                $('body').hasClass("nav-md") ? ($('#sidebar-menu').find("li.active ul").hide(), $('#sidebar-menu').find("li.active").addClass("active-sm").removeClass("active")) : ($('#sidebar-menu').find("li.active-sm ul").show(), $('#sidebar-menu').find("li.active-sm").addClass("active").removeClass("active-sm")), $('body').toggleClass("nav-md nav-sm");
            });
        });
    </script> 
</html>
