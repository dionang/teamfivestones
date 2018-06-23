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
  
    
      
      
      .textbox{
        background-color:#F9F7F7;
        display: inline-block;
        padding: 10px;
        
      }      

    
    textarea{
        width: 200px;
        height: 50px;
    }
    
    .sidebar{
        float:left;
        background: lightgray;
        width: 15%;
        height: 735px;
    }
    
    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
    
    i {
        border: solid;
        border-width: 0 3px 3px 0;
        display: block;
        padding: 2px;
        float: left
      }
      
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
      
      .button {
                -moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
                -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
                box-shadow:inset 0px 1px 0px 0px #ffffff;
                background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ffffff), color-stop(1, #f6f6f6));
                background:-moz-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
                background:-webkit-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
                background:-o-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
                background:-ms-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
                background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
                filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f6f6f6',GradientType=0);
                background-color:#ffffff;
                -moz-border-radius:6px;
                -webkit-border-radius:6px;
                border-radius:6px;
                border:1px solid #dcdcdc;
                display:inline-block;
                cursor:pointer;
                color:#666666;
                font-family:Trebuchet MS;
                font-size:14px;
                padding:3px 5px;
                text-decoration:none;
                text-shadow:0px 1px 0px #ffffff;
        }
        .button:hover {
                background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f6f6f6), color-stop(1, #ffffff));
                background:-moz-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
                background:-webkit-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
                background:-o-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
                background:-ms-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
                background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
                filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f6f6f6', endColorstr='#ffffff',GradientType=0);
                background-color:#f6f6f6;
        }
        .button:active {
                position:relative;
                top:1px;
        }
       
        
        h1{
            font-family: "Times New Roman", Times, serif;
            color: white;
            text-align: center;
            font-size: 40px;
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
            
            
                <div class = "textbox" id = "tb" style="display:none">
                    <a id = "edit" style= "display:none; float:right"> Edit</a>
                    <textarea id= "text" placeholder =" Enter your text here" contenteditable="true"></textarea><br>
                    <input type="button" class="button" id ='btnBold' value = "Bold"/> 
                     <input type="button" class="button" id ='sizeUp' value = "Z" onclick="changeFontSize(this)"/> 
                     <input type="button" class="button" id ='sizeDown' value = "z" onclick="changeFontSize(this)"/> 
                     <input type="button" class="button" id = 'italic' value = "Italic" onClick="font('I')"/> 
                     <!--<input type="button" class="button" id = 'underline' value = "Underline" onClick="font('U')"/> -->
                    <input type="button" class="btn-success" id = "done" value ="Done">
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
        var dup = $("#tb").clone().draggable({ containment: "#container", scroll: false  });
        $("#container").append(dup.show());
        
    })
    
    $('#edit').click(function() {
         $("#btnBold").show();
        $("#sizeUp").show();
        $("#sizeDown").show();
        $("#btnBold").show();
        $("#italic").show();
        $("#underline").show();
        $("#done").show();
        $("#edit").hide();
       return false;
       });
       
       
       $('#done').click(function(){
          $("#btnBold").hide();
        $("#sizeUp").hide();
        $("#sizeDown").hide();
        $("#btnBold").hide();
        $("#italic").hide();
        $("#underline").hide();
        $("#done").hide();
        $("#edit").show(); 
        return false;
       });
    
    
    
    
    
    
  } );
  
  
  
  function bolden() {
    

    if (this.value == 'Bold') {

        document.getElementById('text').style.fontWeight = 'bold';

        this.value = 'UnBold';

    } else {

         document.getElementById('text').style.fontWeight = 'normal';
        this.value = 'Bold';
    }
}
document.getElementById('btnBold').addEventListener('click', bolden, false);


function changeFontSize(target) {
  var demo = document.getElementById("text");
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(demo) // Standards
        : demo.currentStyle;     // Old IE
  var fontSize;

  if (computedStyle) { // This will be true on nearly all browsers
      fontSize = parseFloat(computedStyle && computedStyle.fontSize);

      if (target == document.getElementById("sizeUp")) {
        fontSize += 5;
      } else if (target == document.getElementById("sizeDown")) {
        fontSize -= 5;
      }
      demo.style.fontSize = fontSize + "px";
  }
}


    function font(type) {
      if (type == 'I') {
        document.getElementById("text").style.fontStyle = 'italic';
      }
     // if (type == "U") {
       // document.getElementById("text").style.textDecoration = "underline";
      //}
    }
  
  
  
  
  </script>
 
 
</body>  
</html>