<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/dashboard.css">
        <title>Dashboard</title>
    </head>
    <body>
        <div class="container" style="width:100%">
            <div class="row" style="background-color:#393254;border:1px solid black;height:100px">
                <div class="col-lg-3">
                    <img src="image/logo.png" />
                </div>
                <div>
                    <ul class="nav navbar-nav navbar-right" style="margin-right:30px">
                        <li class="">      
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="image/user.png" style="height:50px;weight:50px" alt="" class="img-circle profile_img"> 
                                <label style="color:white">John Doe</label>
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
               <!-- top tiles -->
            <div class="row">   
                <div class="row tile_count">
                    <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count" style="border-left:none">
                        <span class="count_top"><i class="fa fa-user"></i> Total Users</span>
                        <div class="count">2500</div>
                        <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>4% </i> From last Week</span>
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
                </div>    

            </div>
           
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Line Graph <small>Sessions</small></h2>
                    <ul class="nav navbar-right panel_toolbox">
                      <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                      <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a></li>
                      <li><a class="close-link"><i class="fa fa-close"></i></a></li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content" >
                    <canvas id="lineChart"></canvas>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Bar Graph <small>Sessions</small></h2>
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
                    <canvas id="barChart"></canvas>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Donut Chart Graph <small>Sessions</small></h2>
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
                    <h2>Radar Chart <small>Sessions</small></h2>
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
                    <h2>Pie Area Chart <small>Sessions</small></h2>
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
                    <h2>Pie Chart Graph <small>Sessions</small></h2>
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
                    <canvas id="pie"></canvas>
                  </div>
                </div>
              
               </div>
             
        <!-- jQuery -->
    <script src="js/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Chart.js -->
    <script src="js/Chart.min.js"></script>
    <script src="js/dashboard.js"></script>
    <script>
        var ctx = document.getElementById('lineChart').getContext('2d');
        ctx.canvas.width = 1200;
        ctx.canvas.height = 200;
        var chart = new Chart(ctx, {
   
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                label: "My First dataset",
                backgroundColor: "rgba(38, 185, 154, 0.31)",
                borderColor: "rgba(38, 185, 154, 0.7)",
                pointBorderColor: "rgba(38, 185, 154, 0.7)", 
                pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)", 
                pointBorderWidth: 1,
                data: [31, 74, 6, 39, 20, 85, 7]
                },
                {label: "My Second dataset", 
                            backgroundColor: "rgba(3, 88, 106, 0.3)", 
                            borderColor: "rgba(3, 88, 106, 0.70)",
                            pointBorderColor: "rgba(3, 88, 106, 0.70)", 
                            pointBackgroundColor: "rgba(3, 88, 106, 0.70)", 
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(151,187,205,1)", 
                            pointBorderWidth: 1, 
                            data: [82, 23, 66, 9, 99, 4, 2],
            }]
        },

        // Configuration options go here
        options: {}
    });
    </script>
    
    <script>
        var ctx = document.getElementById('barChart').getContext('2d');
        ctx.canvas.width = 600;
        ctx.canvas.height = 200;
        var chart = new Chart(ctx, {
   
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
       data: {labels: ["January", "February", "March", "April", "May", "June", "July"], 
			datasets: [{label: "# of Votes", 
			backgroundColor: "#26B99A", 
			data: [51, 30, 40, 28, 92, 50, 45]}, 
			{label: "# of Votes", 
			backgroundColor: "#03586A", 
			data: [41, 56, 25, 48, 72, 34, 12]}]},

        // Configuration options go here
        options: {scales: {yAxes: [{ticks: {beginAtZero: !0}}]}}
    });
    </script>
    
    <script>
        var ctx = document.getElementById('doughnut').getContext('2d');
        ctx.canvas.width = 600;
        ctx.canvas.height = 200;
        var chart = new Chart(ctx, {
   
        // The type of chart we want to create
        type: "doughnut",

        // The data for our dataset
        data: {labels: ["Dark Grey", "Purple Color", "Gray Color", "Green Color", "Blue Color"], 
			datasets: [{ 
			backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"], 
			data: [120, 50, 140, 180, 100]}, 
			]},

        // Configuration options go here
       
    });
    </script>
    
    <script>
        var ctx = document.getElementById('radar').getContext('2d');
        ctx.canvas.width = 350;
        ctx.canvas.height = 200;
        var chart = new Chart(ctx, {
   
        // The type of chart we want to create
        type: "radar",

        // The data for our dataset
        data: {labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"], 
			datasets: [{ 
                            
                            backgroundColor: "rgba(3, 88, 106, 0.2)",
                            borderColor: "rgba(3, 88, 106, 0.80)", 
                            pointBorderColor: "rgba(3, 88, 106, 0.80)",
                            pointBackgroundColor: "rgba(3, 88, 106, 0.80)", 
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(220,220,220,1)", 
                            data: [65, 59, 90, 81, 56, 55, 40]}, 
                            {
                            backgroundColor: "rgba(38, 185, 154, 0.2)",
                            borderColor: "rgba(38, 185, 154, 0.85)", 
                            pointColor: "rgba(38, 185, 154, 0.85)", 
                            pointStrokeColor: "#fff", 
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [28, 48, 40, 19, 96, 27, 100]}
			]},

        // Configuration options go here
       
    });
    </script>
    
    <script>
        var ctx = document.getElementById('polarArea').getContext('2d');
        ctx.canvas.width = 350;
        ctx.canvas.height = 200;
        var chart = new Chart(ctx, {
   
        // The type of chart we want to create
        type: 'polarArea',

        // The data for our dataset
       data: {labels: ["Dark Gray", "Purple", "Gray", "Green", "Blue"], 
			datasets: [{label: "My dataset", 
			backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"], 
			data: [120, 50, 140, 180, 100]}, 
			]},

        // Configuration options go here
        
    });
    </script> 
    
    <script>
        var ctx = document.getElementById('pie').getContext('2d');
        ctx.canvas.width = 350;
        ctx.canvas.height = 200;
        var chart = new Chart(ctx, {
   
        // The type of chart we want to create
        type: "pie",

        // The data for our dataset
        data: {labels: ["Dark Grey", "Purple Color", "Gray Color", "Green Color", "Blue Color"], 
			datasets: [{ 
			 backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"], 
			data: [120, 50, 140, 180, 100]}, 
			]},

        // Configuration options go here
       
    });
    </script>
 
     
    </body>
</html>