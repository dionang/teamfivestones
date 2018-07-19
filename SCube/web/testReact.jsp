<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
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
    <!-- React -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.js"></script>
    <!-- use normal for development, min for debugging 
    <script src="https://npmcdn.com/react@15.6.2/dist/react-with-addons.min.js"></script>
    <script src="https://npmcdn.com/react-dom@15.6.2/dist/react-dom.min.js"></script>
    -->
    <script src="https://npmcdn.com/react@15.6.2/dist/react-with-addons.js"></script>
    <script src="https://npmcdn.com/react-dom@15.6.2/dist/react-dom.js"></script>
    <script src="https://npmcdn.com/prop-types@15.6.2/prop-types.min.js"></script>
    <!-- Recharts -->
    <script src="https://npmcdn.com/recharts@1.0.1/umd/Recharts.min.js"></script>
    <!-- Draggable -->
    <script src="assets/js/react-draggable.js"></script>
    <script src="assets/js/re-resizable.js"></script>
    <script src="assets/js/react-rnd.js"></script>
    <!-- Custom React Script -->
    <script type="text/babel" src="assets/js/app.js"></script>
    
    <!-- Custom Dashboard Script -->
    <script>
        $(document).ready(function () {
            // Toggle sidebar
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
