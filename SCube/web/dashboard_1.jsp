<%@ include file="protect.jsp" %>
<%@ page import="scube.entities.Account" %>
<%
    Account account = (Account) session.getAttribute("account");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/css/dashboard.css">
        <title>Dashboard</title>
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <jsp:include page="sidebarManager.jsp"></jsp:include>
                <jsp:include page="navbar.jsp"></jsp:include>

                <!-- page content -->
                <div class="right_col" role="main" >
                    <!-- top tiles -->
                    <div class="row tile_count">
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <span class="count_top"><i class="fa fa-user"></i> Total Users</span>
                            <div class="count">2500</div>
                            <span class="count_bottom"><i class="green">4% </i> From last Week</span>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <span class="count_top"><i class="fa fa-clock-o"></i> Average Time</span>
                            <div class="count">123.50</div>
                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>3% </i> From last Week</span>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <span class="count_top"><i class="fa fa-user"></i> Total Males</span>
                            <div class="count green">2,500</div>
                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <span class="count_top"><i class="fa fa-user"></i> Total Females</span>
                            <div class="count">4,567</div>
                            <span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>12% </i> From last Week</span>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <span class="count_top"><i class="fa fa-user"></i> Total Collections</span>
                            <div class="count">2,315</div>
                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                            <span class="count_top"><i class="fa fa-user"></i> Total Connections</span>
                            <div class="count">7,325</div>
                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
                        </div>
                        <div>
                            <div class="clearfix"></div>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="x_panel" >
                                    <div class="x_title">
                                        <h2>Line Graph </h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                                            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content" >
                                        <canvas class="lineChart"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Bar Graph </h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                            </li>
                                            <li class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <canvas class="barChart"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Donut Chart Graph </h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                            </li>
                                            <li class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <canvas id="doughnut"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Radar Chart </h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                            </li>
                                            <li class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <canvas id="radar"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Polar Chart </h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                            </li>
                                            <li class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="#">Settings 1</a>
                                                    </li>
                                                    <li><a href="#">Settings 2</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <canvas id="polarArea"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Pie Chart Graph </h2>
                                        <ul class="nav navbar-right panel_toolbox">
                                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                            </li>
                                            <li class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>

                                            </li>
                                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <canvas class="pieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <!-- page content -->
                    </div>
                </div>
            </div>
        </div>
<!--                            
        
        <!-- jQuery -->
        <script src="/assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="/assets/js/bootstrap.min.js"></script>
        <!-- Chart.js -->
        <script src="/assets/js/chart.min.js"></script>
        <script src="/assets/js/dashboard.js"></script> 

        <script>initAllCharts();</script>
    </body>
</html>
