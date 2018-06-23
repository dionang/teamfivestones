<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Resizable - Default functionality</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <!-- Bootstrap CSS CDN -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">
        <!-- jQuery CDN -->
    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <!-- Bootstrap Js CDN -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- icon libaray-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <style>
        #resizable { width: 150px; height: 150px; padding: 0.5em; }
        #resizable h3 { text-align: center; margin: 0; }
        #draggable { width: 150px; height: 150px; padding: 0.5em; }
        
        .marginRight{
          height: 735px; 
          width:85%; 
          background: darkblue; 
          float: right;
      }
      
        .innerarea{
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
      
      
      .sidebar{
        float:left;
        background: lightgray;
        width: 15%;
        height: 735px;
    }
    
    
    .hi{
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
    
    <div class ="marginRight">
        
        <h1> Build Your Template </h1>
                

                    
        <div class = "innerarea" id = "container"> <!-- the template area -->
            <h2> </h2>
                <div class = "hi" id ="hiid" style = "background:red; display:none; ">
                    <textarea id= "text" placeholder =" Enter your text here" contenteditable="true" style ="display: table-row;"></textarea><br>
                </div>
           
        </div>
        
        
    </div>

 
    

      
     <div class = "marginLeft">
    
        <div class ="sidebar">
            <h3>Insert</h3>

            <a href="#" id = "textHype">Text Box </a><br>

            <i class="down"></i> <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" >Charts</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li><a href="#">Bar</a></li>
                        <li><a href="#">Pie</a></li>
                        <li><a href="#">Line</a></li>
                    </ul>

        </div>
    </div>

    <script>
        
          $( function() {
    //$( "#text" ).resizable();
    //$( ".textbox" ).draggable({ containment: "#container", scroll: false  });
    
    $("#textHype").click(function(){
        var hiid = $("#hiid").clone().draggable({ containment: "#container", scroll: false  });
        $("#container").append(hiid.show());
        
    })
    
      
    
    
  } );
  
  </script>
 
 
</body>  
</html>