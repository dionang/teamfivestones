<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/css/ppt.css">
        <title>Create User Account</title>
    </head>
    
    <h1>PptxGenJS - Demo</h1>
    <h3>Generate PowerPoint from JavaScript</h3>
    <div id="checks">Library Check:<br>==============<br></div>

    <button id="btnDemo" type="button" onclick="doDemo()">Generate Demo PowerPoint</button>
    <div id="console"></div>

    <div style="margin-top:50px; font-size:.75em">
            <a href="https://github.com/gitbrent/PptxGenJS/">PptxGenJS Project</a>
    </div>
    
    <script>
        // Lets make sure were setup correctly
        $('#checks').append('<div>jQuery... = pass</div>');
        $('#checks').append('<div>jszip.... = '+ (typeof JSZip || 'fail') +'</div>');
        $('#checks').append('<div>FileSaver = '+ (typeof saveAs || 'fail') +'</div>');
        $('#checks').append('<div>PptxGenJS = '+ (typeof PptxGenJS || 'fail') +'</div>');
        var pptx = new PptxGenJS();
        $('#checks').append('<div>PptxGenJS version: '+ pptx.getVersion() +'</div>');

        // Simple Slide
        window.doDemo = function do7cells() {
                var pptx = new PptxGenJS();
                var slide = pptx.addNewSlide();
                var opts = { x:1.0, y:1.0, font_size:42, color:'00FF00' };
                slide.addText('Hello World!', opts);
                pptx.save();
        }

        </script>
    
    
</html>