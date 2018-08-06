<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>jQuery UI Resizable - Default functionality</title>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <!--Bootstrap CSS CDN--> 
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <!--Our Custom CSS--> 
        <link rel="stylesheet" href="assets/css/report.css">
        <!--jQuery CDN--> 
        <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
        <!--Bootstrap Js CDN--> 
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <!--icon library-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <style>
            #resizable { width: 150px; height: 150px; padding: 0.5em; }
            #resizable h3 { text-align: center; margin: 0; }
            #draggable { width: 150px; height: 150px; padding: 0.5em; }

            #content{
                background: darkblue;
            }

            .reportArea{
                background: white;
                top: 20px;
                height: 600px;
                border: lightgray;
                border: 3px;
            }

            h1{
                font-family: "Times New Roman", Times, serif;
                color: white;
                text-align: center;
                font-size: 40px;
            }

            i {
                border: solid;
                border-width: 0 3px 3px 0;
                display: block;
                padding: 2px;
                float: left
            }

            .textbox{
                display:table;
                width: fit-content;
                padding: 10px;
                cursor: pointer;
            }
        </style>
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    </head>
    <body>
        <div class="wrapper">
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3>Report Template Creator</h3>
                </div>

                <ul class="list-unstyled components">
                    <li class="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle">Components</a>
                        <ul class="list-unstyled collapse in" aria-expanded="true" id="homeSubmenu">
                            <li><a id="textHype"><i class="fa fa-font"></i>&nbsp;&nbsp;&nbsp;Text Box</a></li>  
                            <li>
                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-chevron-down"></i>&nbsp;&nbsp;&nbsp;Charts</a>
                                <ul class="collapse list-unstyled" id="pageSubmenu">
                                    <li><a id="barChart"><i class="fa fa-bar-chart"></i>&nbsp;&nbsp;&nbsp;Bar</a></li>
                                    <li><a id="pieChart"><i class="fa fa-pie-chart"></i>&nbsp;&nbsp;&nbsp;Pie</a></li>
                                    <li><a id="lineChart"><i class="fa fa-line-chart"></i>&nbsp;&nbsp;&nbsp;Line</a></li>
                                </ul>
                            </li>    
                        </ul>
                    </li>
                </ul>
            </nav>
            <div id="content">

                <h1> Build Your Template </h1>
                <div class="reportArea" id="container">
                    <div class="textbox" id="textbox" style="background:red; display:none; ">
                        <textarea id="text" placeholder="Enter your text here" contenteditable="true" style="display: table-row;"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <script>
            $(function () {
                //$( "#text" ).resizable();
                //$( ".textbox" ).draggable({ containment: "#container", scroll: false  });

                $("#textHype").click(function () {
                    var textbox = $("#textbox").clone().draggable({containment: "#container", scroll: false});
                    $("#container").append(textbox.show());

                })

                $("#barChart").click(function () {
                    var hiid = $("#hiid").clone().draggable({containment: "#container", scroll: false});
                    $("#container").append(hiid.show());

                })
            });

        </script>
    </body>  
</html>