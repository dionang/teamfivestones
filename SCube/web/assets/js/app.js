import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import request from 'request';
import Rnd from 'react-rnd';
import RichTextEditor from 'react-rte';
import { Button, ButtonToolbar, SplitButton, MenuItem, Navbar, DropdownButton } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Label, Legend, Tooltip, ResponsiveContainer} from 'recharts';
import { Formik, Form, Field } from 'formik';

//const api = 'http://localhost:8084/';
//const datasourceUrl = 'http://localhost:8084/Dummy_API/getCustomerOrders';
const api = 'https://scube.rocks/SCube/';
const datasourceUrl = 'https://scube.rocks/SCube/Dummy_API/getCustomerOrders';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [[]],
            editMode: false,
            selectedSize: 'A4',
            selectedLayout: 'Portrait',
            // w : 21*37.795276,
            // h : 29.7*37.795276,
            templateName: "Template Name",
            sidebar: true,
            pageNo: 0,
            picArr:[],
            exporting: false,
            slideshowBool:true
        }
    }

    componentDidMount() {
        let templateName = document.getElementById("templateName").value;
        if (templateName !== "null") {
            this.setState({templateName});
        }
        this.loadTemplate();
    }

    addTextbox = () => {
        let components = this.state.components;
        components[this.state.pageNo].push(
            { type: "text", x: 0, y: 0, height: 150, width: 220, display: true, properties: { text: "<p><br></p>" } }
        );

        this.setState({ components, editMode: true });
    }

    addBarChart = () => {
        let components = this.state.components;
        // adds new component to state
        components[this.state.pageNo].push(
            {
                type: "bar", x: 0, y: 0, height: 370, width: 450, display: true,
                properties: {
                    initialized: false,
                }
            }
        );

        // updates state
        this.setState({ components, editMode: true });
    }

    addLineChart = () => {
        let components = this.state.components;
        components[this.state.pageNo].push(
            {
                type: "line", x: 0, y: 0, height: 370, width: 450, display: true,
                properties: {
                    initialized: false,
                }
            }
        );

        this.setState({ components, editMode: true });
    }

    addTable = () => {
        let components = this.state.components;
        components[this.state.pageNo].push(
            { 
                type: "table", x: 0, y: 0, height:150, width:300, display: true,
                properties: {
                    columns: [{
                        dataField: 'col1',
                        text: 'Header 1'
                    }, {
                        dataField: 'col2',
                        text: 'Header 2'
                    }],
                    data: [{
                        id: 'row1',
                        col1: '',
                        col2: '',
                    },{
                        id: 'row2',
                        col1: '',
                        col2: ''
                    }]
                }
            }
        );

        this.setState({ components, editMode: true });
    }

    addImage = () => {
        let components = this.state.components;
        components[this.state.pageNo].push(
            {
                type: "image", x: 0, y: 0, height: 200, width: 200, display: true,
                properties: {
                    imageUrl: '',
                    initialized: false,
                }
            }
        );
        this.setState({ components, editMode: true });
    }

    addVideo = () => {
        let components = this.state.components;
        components[this.state.pageNo].push(
            {
                type: "video", x: 0, y: 0, height: 240, width: 400, display: true,
                properties: {
                    initialized: false,
                    videoUrl: '',
                }
            }
        );
        this.setState({ components, editMode: true });
    }

    changeSettings(i) {
        let components = this.state.components;
        let pageNo = this.state.pageNo;

        components[pageNo][i].properties.initialized = false;
        this.setState({ components });
    }

    closeModal = () => {
        var modal = document.getElementById('size');
        modal.style.display = "none";
    }
    
    dataUrlToFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    deleteComponent(i) {
        let components = this.state.components;
        let pageNo = this.state.pageNo;

        components[pageNo][i].display = false;
        this.setState({ components });
    }

    export = (e) => {
        let self = this;
        this.setState({editMode: false});
        setTimeout(function () {
            if (e === "PDF") {
                self.savePDF();
            } else {
                self.savePresentation();
            }
        }, 100);
    }
    
    getComponentDetails = () => {
        console.log(this.state.components);
    }

    // handleSizeChange = (changeEvent) => {
    //     this.setState({
    //         selectedSize: changeEvent.target.value
    //     });
    // }

    // handleLayoutChange = (changeEvent) => {
    //     this.setState({
    //         selectedLayout: changeEvent.target.value
    //     });
    // }

    loadTemplate = () => {
        let self = this;
        let templateId = parseInt(document.getElementById("templateId").value, 10);
        if (templateId !== 0) {
            request.post({
                url: api + 'loadComponents',
                json: true,
                body: { operation: "loadComponents", templateId: templateId }
            }, function (error, response, body) {
                if (body) {
                    let components = body.components;
                    self.setState({ components });
                }
            });
        }
    }

    previousPage = () => {
        let pageNo = this.state.pageNo;
        if (pageNo !== 0) {
            pageNo = this.state.pageNo - 1;
            this.setState({ pageNo });
        }
    }

    nextPage = () => {
        let components = this.state.components;
        let pageNo = this.state.pageNo + 1;

        // add new page if it doesnt exist
        if (pageNo === components.length) {
            components.push([]);
        }
        this.setState({ components, pageNo });
    }

    renameTemplate = (e) => {
        this.setState({ templateName: e.target.value });
    }

    // i represents index of current item in this.state.components
    // convert style data to integer. e.g. 10px -> 10
    onResize(ref, pos, i) {
        let components = this.state.components;
        let pageNo = this.state.pageNo;
        components[pageNo][i].height = parseInt(ref.style.height, 10);
        components[pageNo][i].width = parseInt(ref.style.width, 10);
        components[pageNo][i].x = pos.x;
        components[pageNo][i].y = pos.y;
        this.setState({ components });
    }

    onDragStop(ref, i) {
        let components = this.state.components;
        let pageNo = this.state.pageNo;
        components[pageNo][i].x = ref.x;
        components[pageNo][i].y = ref.y;
        this.setState({ components });
    }

    saveComponents(templateId) {
        let self = this;
        request.post({
            url: api + 'saveComponents',
            json: true,
            body: { operation: "saveComponents", templateId: templateId, components: self.state.components }
        }, function (error, response, body) {
            if (body && body.status) {
//                alert("Saved succesfully");
                swal({icon:"success", text:"Saved succesfully"});
            } else {
//                alert("Error in saving");
                swal({icon:"error", text:"Error in saving"});
            }

        });
    }

    savePDF() {
        let self = this;

        // if exporting
        if (this.state.exporting) {
            domtoimage.toJpeg(document.getElementById('container'), { quality: 1 })
                .then(function (dataUrl) {
                    // add page screenshot to picArr
                    var picArr = self.state.picArr;
                    picArr.push(dataUrl);
                    let pageNo = self.state.pageNo;

                    // if not on last page, increment pageNo and trigger rerender
                    if (pageNo < self.state.components.length - 1) {
                        pageNo += 1;
                        self.setState({ pageNo });

                        // give time for page to rerender before calling the method
                        setTimeout(function () {
                            self.savePDF();
                        }, 2000);

                        // reached the last page, proceed to export PDF
                    } else {
                        // hardcoded A4 dimensions, width * height
                        let doc = new jsPDF('l', 'mm', [297, 210]);

                        // iterate through the pages
                        for (let i = 0; i < self.state.picArr.length; i++) {
                            let dataUrl = self.state.picArr[i];

                            // uploads the image to our public folder
                            let formData = new FormData();
                            formData.append("file", self.dataUrlToFile(dataUrl, self.state.templateName + "_slide" + (i + 1) + ".jpg"));
                            let xhr = new XMLHttpRequest();
                            xhr.open("POST", api + "saveFile");
                            xhr.send(formData);

                            // should use these values to set PDF dimensions
                            // let width = document.getElementById('container').width;
                            // let height = document.getElementById('container').height;

                            doc.addImage(dataUrl, 'JPEG', 0, 0, 297, 140);

                            // 20 is left margin, 200 is top margin
                            doc.text(20, 200, "Page No: " + (i + 1));

                            // if not last page, add page
                            if (i != self.state.picArr.length - 1) {
                                doc.addPage();
                            }
                        }

                        // completed the rendering of doc
                        // upload PDF to public folder
                        let formData = new FormData();
                        formData.append("file", doc.output('blob'), self.state.templateName + ".pdf");
                        let xhr = new XMLHttpRequest();
                        xhr.open("POST", api + "saveFile");
                        xhr.send(formData);

                        // proceed to save locally
                        doc.save(self.state.templateName);
                        picArr = [];
                        self.setState({ picArr: [], exporting: false });
                    }
                });

            // starts the exporting process, starting from the first page
        } else {
            this.setState({ pageNo: 0, exporting: true });

            // give time for page to rerender before calling the method
            setTimeout(function () {
                self.savePDF();
            }, 1500);
        }
    }

    savePresentation = () => {
        var pptx = new PptxGenJS();
        pptx.setBrowser(true);

        for (let pageNo in this.state.components) {
            let components = this.state.components[pageNo];
            let slide = pptx.addNewSlide();
            for (let component of components) {
                // if component is not displayed, skip the entry
                if (!component.display) {
                    continue;
                }

                // convert px to inches
                let x = component.x / 96;
                let y = component.y / 96;
                let w = component.width / 96;
                let h = (component.height) / 96;

                if (component.type === "text") {
                    let text = component.properties.text;
                    // remove non breaking spaces
                    text = text.replace(/&nbsp;/g, " ");
                    // replace break tag
                    text = text.replace(new RegExp("<br>","g"), "\n");
                    // extract all tokens
                    let tokens = text.split(/(<strong>|<\/strong>|<em>|<\/em>|<u>|<\/u>|<p>|<\/p>|<ul>|<\/ul>|<ol>|<\/ol>|<li>|<\/li>)/);

                    let texts = [];
                    let bold = false;
                    let underline = false;
                    let italic = false;
                    let breakLine = true;
                    let bulletType = false;
                    let bullet = false;
                    for (let text of tokens){
                        if (text === "" || text === "\n" || text === "\n  ") {
                            continue;
                        } else if (text === "<strong>" || text === "</strong>"){
                            bold = !bold;
                        } else if (text === "<em>" || text === "</em>"){
                            italic = !italic;
                        } else if (text === "<u>" || text === "</u>"){
                            underline = !underline;
                        } else if (text === "<p>" || text === "</p>") {
                            breakLine = !breakLine;
                            // push a line break if p tag end was hit
                            if (breakLine) {
                                texts.push({text:"\n"});
                            }
                        } else if (text === "<ul>" || text === "</ul>") {
                            bulletType = true;
                        } else if (text === "<ol>" || text === "</ol>") {
                            bulletType = {type:"number"};
                        } else if (text === "<li>" || text === "</li>") {
                            bullet = !bullet;
                        } else {
                            let textItem = { text:text, options:{ bold:bold, underline:underline, italic:italic }};
                            // only introduce the bullet attribute if necessary, as this starts a new line
                            if (bullet) {
                                textItem.options.bullet = bulletType;
                            }
                            texts.push(textItem);
                        }
                    }

                    slide.addText(texts, {
                        x: x, y: y, w: w, h: h,
                        fontSize: 14, color: '363636'
                    });
                } else if (component.type === "image") {
                    let imageUrl = component.properties.imageUrl;

                    // remove height of toolbar
                    y = (component.y + 27.5) / 96;
                    h = (component.height - 27.5) / 96;
                    slide.addImage({ data: imageUrl, x: x, y: y, w: w, h: h });
                } else if (component.type === "table") {
                    // remove height of toolbar
                    y = (component.y + 27.5) / 96;
                    h = (component.height - 27.5) / 96;
                    let headerNames = [];
                    let headerData = [];

                    // store the header names and data
                    for (let col of component.properties.columns) {
                        headerNames.push(col.dataField);
                        headerData.push({text: col.text, options: {bold: true}});
                    }

                    let tableData = [];
                    tableData.push(headerData);

                    // insert table data
                    for (let row of component.properties.data) {
                        let rowData = [];
                        for (let name of headerNames) {
                            rowData.push(row[name]);
                        }

                        tableData.push(rowData);
                    }

                    let tableOpts = { x:x, y:y, w:w }
                    slide.addTable(tableData, tableOpts);
                } else if (component.type === "video") {
                    // remove the p tags
                    let videoUrl = component.properties.videoUrl.trim();
                    slide.addMedia({ type: 'online', link: videoUrl, x: x, y: y, w: w, h: h });
                }
            }
        }

        pptx.save(this.state.templateName);
    }

    saveTemplate = () => {
        let self = this;
        let templateId = parseInt(document.getElementById("templateId").value, 10);
        let companyId = parseInt(document.getElementById("companyId").value, 10);
        let userName = document.getElementById("userName").value;
        if (templateId === 0 || templateId === 1) {
            request.post({
                url: api + 'createTemplate',
                form: {
                    operation: "createTemplate",
                    templateId: templateId,
                    templateName: self.state.templateName,
                    templatesize: self.state.selectedSize,
                    templatelayout: self.state.selectedLayout,
                    companyId: companyId,
                    userName: userName
                }
            }, function (error, response, body) {
                if (body === "false") {
                    swal({icon:"error", text:"Failed to create template!"});
                } else {
                    // update the value of the hidden fields
                    document.getElementById("templateId").value = body;
                    self.saveComponents(body);
                }
            });
        } else {
            request.post({
                url: api + 'updateTemplate',
                form: {
                    operation: "updateTemplate",
                    templateId: templateId,
                    templateName: self.state.templateName,
                    templatesize: self.state.selectedSize,
                    templatelayout: self.state.selectedLayout,
                    companyId: companyId,
                    userName: userName
                }
            }, function (error, response, body) {
                if (body === "false") {
                    swal({icon:"error", text:"Failed to update template!"});
                } else {
                    self.saveComponents(templateId);
                }
            });
        }
        this.setState({ editMode: false });
    }

    toggleChartMenu = () => {
        let chartMenu = document.getElementById("chartMenu");
        if (chartMenu.style.display === "block") {
            chartMenu.style.display = "none";
        } else {
            chartMenu.style.display = "block";
        }
    }

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode })
    }

    toggleSidebar = () => {
        this.setState({ sidebar: !this.state.sidebar });
    }

    updateProperties = (properties, i) => {
        let components = this.state.components;
        let pageNo = this.state.pageNo;

        components[pageNo][i].properties = properties;
        this.setState({ properties });
    }
    
    slideShow=()=>{
        this.setState({slideshowBool:false,editMode: false, pageNo:0});
    }
    
    exitSlide=()=>{
        this.setState({slideshowBool:true,editMode: true});
    }

    // handleFormSubmit= (formSubmitEvent) => {
    //     formSubmitEvent.preventDefault();
    //     var size=this.state.selectedSize;
    //     var layout=this.state.selectedLayout;
    //     if (size==="A3" && layout==="Portrait") {
    //         this.setState({w : 29.7 *37.795276, h : 42*37.795276});
    //     } else if (size==="A3" && layout==="Landscape") {
    //         this.setState({h : 29.7 *37.795276, w : 42*37.795276});
    //     } else if (size==="A4" && layout==="Portrait") {
    //         this.setState({h : 29.7 *37.795276, w : 21*37.795276});
    //     } else if (size==="A4" && layout==="Landscape") {
    //         this.setState({w : 29.7 *37.795276, h : 21*37.795276});
    //     } else if (size==="A5" && layout==="Portrait") {
    //         this.setState({w : 14.8*37.795276, h : 21*37.795276}); 
    //     } else if (size==="A5" && layout==="Landscape") {
    //         this.setState({w : 21*37.795276, h : 14.8*37.795276});
    //     }

    //     this.setState({formVisibility:"hidden"});
    //     var modal = document.getElementById('size');
    //     modal.style.display = "none";
    // }

    // openModal = () => {
    //     var modal = document.getElementById('size');
    //     modal.style.display = "block";
    //     this.setState({formVisibility:""});
    // }

    render() {
        return (
                <div>
                {this.state.slideshowBool? 
             <div className={this.state.sidebar ? "nav-md" : "nav-sm"} id="main"  >
                <div className="container body" style={{  margin: 0, padding: 0, width: "100%",backgroundColor:"#2A3F54" }}>
                    <div className="main_container" >
                        <div className="col-md-3 left_col" >
                            <div className="left_col scroll-view" >
                                <div className="navbar nav_title" style={{ border: 0,  }}>
                                    <a className="site_title">
                                        <img src={this.state.sidebar ? "assets/images/logo.png" : "assets/images/logo1_1.png"}
                                            style={{
                                                height: this.state.sidebar ? 90 : 80,
                                                width: this.state.sidebar ? 200 : 50,
                                            }} />
                                    </a>
                                </div>
                                <div className="clearfix"  style={{height:"100%"}}></div><br />
                                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu" style={{height:"100%"}}>
                                    <div className="menu_section">
                                        <ul className="nav side-menu" id="options">
                                            <ul className="nav side-menu" id="options">
                                                <li><a href="managerHome.jsp"><i className="fa fa-home"/>  Home</a></li>
                                                <li><a href="dashboard.jsp"><i className="fa fa-bar-chart"/>  View Dashboard</a></li>
                                                <li><a href="createUserAccount.jsp"><i className="fa fa-group"/>  Create User Account</a></li>
                                                <li><a href="templateHome.jsp"><i className="fa fa-file-image-o"/>  Template</a></li>
                                                <li><a href="slideShow.jsp"><i className="fa fa-slideshare"/>  Slide Show</a></li> 
                                            </ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top_nav" >
                            <div className="nav_menu">
                                <nav>
                                    <div className="nav toggle" onClick={this.toggleSidebar}>
                                        <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                                    </div>
                                    <ul className="nav navbar-nav navbar-right">
                                        <li>
                                            <a className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                {document.getElementById('profileName').value}
                                                <img style={{marginLeft:2}} src="assets/images/user.png" />
                                                <span className=" fa fa-angle-down"></span>
                                            </a>
                                            <ul className="dropdown-menu dropdown-usermenu pull-right">
                                                <li><a href="logout.jsp"><i className="fa fa-sign-out pull-right"/> Log Out</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="right_col" style={{ height:"100%", overflow:"hidden", backgroundColor:"white", textAlign:"center", }}>


                             <div id= "addComponent" style={{backgroundColor: 'white', width:"fist-content", float:"right", height:"fit-content",  marginTop:50,overflow:"hide" }}>
                                 
                                 
                            <input style={{ fontSize: 16, textAlign:"center", height:"30px", fontWeight:"bold", width:"200px"}} value={this.state.templateName} onChange={this.renameTemplate}></input>
                                <br/>
                               
                                     {this.state.editMode ?
                                            <div >
                                            <Button style={{marginTop:"8px", width:101,height:"35px"}} onClick={this.saveTemplate} > 
                                                <i className="fa fa-save fa-lg"  style={{ marginRight: 2 }}/>Save
                                            </Button>
                                        
                                            <Button  bsStyle= "warn" style={{width:101,marginTop:"8px",marginLeft:"-10px",height:"35px"}} onClick={this.toggleEditMode}>
                                                <i className="fa fa-edit" style={{ marginRight: 2 }} />
                                                Editing
                                            </Button>  
                                            </div>
                                        :
                                                <div >
                                        
                                            <Button style={{marginTop:"8px",width:101,height:"35px"}} onClick={this.saveTemplate} > 
                                                <i className="fa fa-save fa-lg"  style={{ marginRight: 2 }}/>Save
                                            </Button>
                                            <Button bsStyle= "info" style={{marginTop:"8px",width:101,height:"35px"}}  onClick={this.toggleEditMode}>
                                                <i className="fa fa-edit" style={{ marginRight: 2 }} />
                                                Edit
                                            </Button>                                  
                                            </div>
                                        
                                    }
                                    
                                       
                                
                            
                                    <DropdownButton title="Export As" id="dropdown-size-medium" style={{height:"35px", width:101}}  onSelect={this.export} >
                                        <MenuItem eventKey="PDF">PDF</MenuItem>
                                        <MenuItem eventKey="PPT">PPT</MenuItem>
                                    </DropdownButton>
                                    
                                     <Button onClick={this.slideShow} style={{ height:"35px", width:101}}>
                                        <img src="assets/images/slideshow.png" style={{height: "25px", marginRight:"5px", }} />
                                                    <span style={{fontFamily: 'Georgia', fontSize: 15}}>Play</span></Button>
                                    
                                                                    
                                    <br/><br/>
                                    <span style={{ fontFamily: 'Georgia', fontSize: 17}}>Page No.
                                <Button data-toggle="tooltip" data-placement="bottom" title="Previous Page" bsStyle="warn" bsSize="small" onClick={this.previousPage}
                                    style={{ marginRight: 10, marginLeft: 10, textAlign:"center"  }}>
                                    <svg height="15" preserveAspectRatio="xMinYMax meet" viewBox="0 0 17 17" width="24">
                                        <path d="M0-.5h24v24H0z" fill="none"></path>
                                        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" className="jWRuRT"></path>
                                    </svg>
                                </Button>

                                <span style={{ fontFamily: 'Georgia', fontSize: 18,textAlign:"center"  }}>{this.state.pageNo + 1}</span>
                                    <Button data-toggle="tooltip" data-placement="bottom" title="Next Page" bsStyle="warn" bsSize="small" onClick={this.nextPage}
                                        style={{ marginLeft: 10,  textAlign:"center"  }}>
                                        <svg height="15" preserveAspectRatio="xMinYMax meet" viewBox="0 0 17 17" width="24">
                                            <path d="M0-.5h24v24H0z" fill="none"></path>
                                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" className="jWRuRT"></path>
                                        </svg>
                                    </Button>
                                    
                                                   
                                </span>
                                                                                
                                    <br/><br/>
                                    
                                    
                            <div id= "addComponent" style={{ width:"200px", borderTop:"grey solid 3px"}}>
                                <label style={{fontSize:"17px"}}> Add Component: </label><br/>
                                <input type="image" data-toggle="tooltip" title="Add Textbox"
                                    onClick={this.addTextbox} style={{  height:"60px", marginBottom:"10px"}} src= "assets/images/text.png"/><br/>
                                <input type="image" data-toggle="tooltip" title="Add Bar Chart"
                                    onClick={this.addBarChart} style={{ height:"60px",  marginBottom:"10px"  }} src= "assets/images/bar chart.png"/><br/>
                                <input type="image"  data-toggle="tooltip"  title="Add Line Chart" 
                                    onClick={this.addLineChart} style={{  height:"60px", marginBottom:"10px" }} src= "assets/images/line chart.png"/><br/>
                                <input type="image"  data-toggle="tooltip"  title="Add Table" 
                                    onClick={this.addTable} style={{ height:"60px",  marginBottom:"10px" }} src= "assets/images/table.png"/><br/>
                                <input type="image"  data-toggle="tooltip"  title="Add Image" 
                                    onClick={this.addImage} style={{  height:"60px",  marginBottom:"10px" }} src= "assets/images/picture.png"/><br/>
                                <input type="image"  data-toggle="tooltip"  title="Add Video" 
                                    onClick={this.addVideo} style={{ height:"60px",  marginBottom:"10px" }} src= "assets/images/video_4880.png"/><br/>
                            </div>  
                            </div>
                                {/*
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Textbox" bsStysle="primary"
                                    onClick={this.addTextbox} style={{ marginRight: 5, marginLeft: 6 }}><i classsName="fa fa-font" /></Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Bar Chart" bsSstyle="warning"
                                    onClick={this.addBarChart} style={{ marginRight: 5 }}><i className="fa fa-bsar-chart" /></Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Line Chart" bssStyle="success"
                                    onClick={this.addLineChart} style={{ marginRight: 5 }}><i className="fa fa-sline-chart" /></Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Table" bsStyles="danger"
                                    onClick={this.addTable} style={{ marginRight: 5 }}><i className="fa fa-tablse" /> </Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Image"s
                                    onClick={this.addImage} style={{ backgroundColor: "#31B0D5", color: "white"s, border: "1px solid #31B0D5", marginRight: 5 }}><i className="fa fa-image" /></Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Video"s
                                    onClick={this.addVideo} style={{ backgroundColor: "#D896FF", color: "white"s, border: "1px solid #D896FF", marginRight: 5}}><i className="fa fa-play-circle" /></Button>
                                */}
                            
                                
                            <div  style={{ backgroundColor: "white" }}>
                                <div id="container" style={{
                                    border:"grey solid 1px", width:"1024px", height: "768px", overflow:"auto"
                                }}>

                                    {/* map does a for loop over all the components in the state */}
                                    {/* {console.log("pageNo" + this.state.pageNo)} */}
                                    {this.state.components[this.state.pageNo].map((item, i) => {
                                        if (item.display) {
                                            return <Rnd key={this.state.pageNo + "," + i}
                                                style={{
                                                    borderStyle: this.state.editMode ? "dotted" : "hidden",
                                                    borderWidth: 2,
                                                    backgroundColor: (item.type === "text" || item.type === "image" || item.type === "video") 
                                                                      ? "transparent" : "white",
                                                    borderColor: 'grey',
                                                    width: "fit-content"
                                                }}

                                                // intialize components x,y,height and width
                                                position={{ x: item.x, y: item.y }}
                                                size={{ width: item.width, height: item.height }}

                                                // min height and size
                                                minHeight={10} minWidth={10}

                                                // to customize the dragging and resizing behavior
                                                bounds={"parent"}
                                                cancel={".nonDraggable"}
                                                dragHandleClassName={this.state.editMode ? "draggable" : "cannotDrag"}
                                                enableResizing={{
                                                    bottom: this.state.editMode,
                                                    bottomLeft: this.state.editMode,
                                                    bottomRight: this.state.editMode,
                                                    left: this.state.editMode,
                                                    right: this.state.editMode,
                                                    top: this.state.editMode,
                                                    topLeft: this.state.editMode,
                                                    topRight: this.state.editMode
                                                }}

                                                // update height and width onResizeStop
                                                // onResizeStop will activate a callback function containing these params
                                                // ref represents item that was resized
                                                onResize={(event, dir, ref, delta, pos) => this.onResize(ref, pos, i)}

                                                // update height and width onResizeStop
                                                // onDragStop will activate a callback function containing these params
                                                // ref represents item that was dragged
                                                onDragStop={(event, ref) => this.onDragStop(ref, i)}
                                            >
                                                <div style={{ height: 27.5, float: "right" }}>
                                                    <i style={{ marginTop: 10, marginRight: 6, visibility: this.state.editMode ? "" : "hidden" }} className="fa fa-wrench"
                                                        onClick={() => this.changeSettings(i)}></i>
                                                    <i style={{ marginTop: 10, marginRight: 10, visibility: this.state.editMode ? "" : "hidden" }} className="fa fa-times"
                                                        onClick={() => this.deleteComponent(i)}></i>
                                                </div>
                                                <ReportComponent type={item.type} editMode={this.state.editMode}
                                                    properties={item.properties} i={i}
                                                    updateProperties={this.updateProperties.bind(this)}
                                                />
                                                {/* <Descriptive type={item.type} editMode={this.state.editMode}
                                                properties={item.properties} i={i}
                                                updateProperties={this.updateProperties.bind(this)}></Descriptive> */}
                                            </Rnd>
                                        }
                                    })}
                                    
                                </div>
                                </div>
                                 
                        </div>
                    </div>
                </div>
            </div>:      
                   
                   
                                                                                                                                                    
           <div style={{  backgroundColor:"white", height:"fit-content", textAlign:"center", overflow:"hidden" }}>
       
                    <div style={{height:window.innerHeight*0.70, marginTop:window.innerHeight*0.1}}>
     
                                 
                    <div style={{float:"left", height: window.innerHeight * 0.70, width: window.innerWidth * 0.06, backgroundColor:"#E9E9E8", textAlign:"center", cursor: "pointer"}} onClick={this.previousPage}>
                            <img src="assets/images/arrow left.png" class="image" style={{height:window.innerWidth * 0.050, marginTop: window.innerHeight * 0.30}} /> 
                    </div>
                  
                  
                   <div style={{float:"right",  height: window.innerHeight * 0.70,width: window.innerWidth * 0.06,backgroundColor:"#E9E9E8", textAlign:"center", cursor: "pointer"}} onClick={this.nextPage}>
                            <img src="assets/images/arrow right.png" class="image" style={{height: window.innerWidth * 0.050,  marginTop: window.innerHeight * 0.30}} />
                    </div>
                                <div style={{ height: window.innerHeight * 0.70, backgroundColor:"white", marginLeft: window.innerWidth * 0.08}}>

                                    {/* map does a for loop over all the components in the state */}
                                    {/* {console.log("pageNo" + this.state.pageNo)} */}
                                    {this.state.components[this.state.pageNo].map((item, i) => {
                                        if (item.display) {
                                            return <Rnd key={this.state.pageNo + "," + i}
                                                style={{
                                                    borderStyle: this.state.editMode ? "dotted" : "hidden",
                                                    borderWidth: 2,
                                                    backgroundColor: (item.type === "text" || item.type === "image" || item.type === "video") 
                                                                      ? "transparent" : "white",
                                                    borderColor: 'grey',
                                                    width: "fit-content",
                                                    
                                                }}

                                                // intialize components x,y,height and width
                                                position={{ x: item.x, y: item.y }}
                                                size={{ width: item.width, height: item.height }}

                                                // min height and size
                                                minHeight={10} minWidth={10}

                                                // to customize the dragging and resizing behavior
                                                bounds={"parent"}
                                                cancel={".nonDraggable"}
                                                dragHandleClassName={this.state.editMode ? "draggable" : "cannotDrag"}
                                                enableResizing={{
                                                    bottom: this.state.editMode,
                                                    bottomLeft: this.state.editMode,
                                                    bottomRight: this.state.editMode,
                                                    left: this.state.editMode,
                                                    right: this.state.editMode,
                                                    top: this.state.editMode,
                                                    topLeft: this.state.editMode,
                                                    topRight: this.state.editMode
                                                }}

                                                // update height and width onResizeStop
                                                // onResizeStop will activate a callback function containing these params
                                                // ref represents item that was resized
                                                onResize={(event, dir, ref, delta, pos) => this.onResize(ref, pos, i)}

                                                // update height and width onResizeStop
                                                // onDragStop will activate a callback function containing these params
                                                // ref represents item that was dragged
                                                onDragStop={(event, ref) => this.onDragStop(ref, i)}
                                            >
                                                <div style={{ height: 27.5, float: "right" }}>
                                                    <i style={{ marginTop: 10, marginRight: 6, visibility: this.state.editMode ? "" : "hidden" }} className="fa fa-wrench"
                                                        onClick={() => this.changeSettings(i)}></i>
                                                    <i style={{ marginTop: 10, marginRight: 10, visibility: this.state.editMode ? "" : "hidden" }} className="fa fa-times"
                                                        onClick={() => this.deleteComponent(i)}></i>
                                                </div>
                                                <ReportComponent type={item.type} editMode={this.state.editMode}
                                                    properties={item.properties} i={i}
                                                    updateProperties={this.updateProperties.bind(this)}
                                                />
                                                {/* <Descriptive type={item.type} editMode={this.state.editMode}
                                                properties={item.properties} i={i}
                                                updateProperties={this.updateProperties.bind(this)}></Descriptive> */}
                                            </Rnd>
                                        }
                                    })}
                                    </div>
                                    </div> 
                                    
                                        <span style={{ fontFamily: 'Georgia', fontSize: 18,  margin: "60px" }}>Page Number: {this.state.pageNo + 1} </span>                 
                                                                                                                                                                                                                
                                                                                                                                                                                                                
                                        <Button onClick={this.exitSlide} style={{float:"right",marginTop:window.innerHeight*0.1}}>Exit Slide Show</Button>
                                    
                                    
                               
                               
                                                          </div>
                               
                }
                </div>
           
        );
    }
}

class ReportComponent extends Component {
    render() {
        // based on the item type, render a type of component
        if (this.props.type === "line") {
            return(
                <Linechart i={this.props.i} properties={this.props.properties} updateProperties={this.props.updateProperties}/>
            );
        } else if (this.props.type === "bar") {
            return (
                <Barchart i={this.props.i} properties={this.props.properties} updateProperties={this.props.updateProperties}/>
            );
        } else if (this.props.type === "text") {
            return(
                <Textbox i={this.props.i} text={this.props.properties.text} editMode={this.props.editMode}
                    updateProperties={this.props.updateProperties} />
            );
        } else if (this.props.type ==="image"){
            return(
                <ImageComponent i={this.props.i}  editMode={this.props.editMode} 
                    properties={this.props.properties} updateProperties={this.props.updateProperties}/>
            );
        } else if (this.props.type ==="table"){
            return(
                <EmptyTable i={this.props.i} editMode={this.props.editMode} 
                    properties={this.props.properties} updateProperties={this.props.updateProperties} />
            );
        } else if (this.props.type === "video") {
            return(
                <VideoComponent i={this.props.i} editMode={this.props.editMode} 
                    properties={this.props.properties} updateProperties={this.props.updateProperties} />
            );
        }
    }
}

class Textbox extends Component {
    constructor(props) {
        super(props);
        // initialize state with what was passed by the props
        this.state = {
            // converts the markup value into the value used by this component
            editMode: this.props.editMode,
            value: RichTextEditor.createValueFromString(this.props.text, 'html'),
            htmlValue: this.props.text
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.editMode != nextProps.editMode){
            this.setState({editMode: nextProps.editMode});
        }
    }

    onChange = (value) => {
        // converts the value in state
        this.setState({value:value, htmlValue:value.toString('html')});
        this.props.updateProperties({text:this.state.htmlValue}, this.props.i);
    };

    render() {
        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS','BLOCK_TYPE_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
                {label: 'Bold', style: 'BOLD'},
                {label: 'Italic', style: 'ITALIC'},
                {label: 'Underline', style: 'UNDERLINE'}
            ],
            BLOCK_TYPE_BUTTONS: [
                {label: 'UL', style: 'unordered-list-item'},
                {label: 'OL', style: 'ordered-list-item'}
            ]
        };

        return(
            <RichTextEditor 
                rootStyle={{height:"100%", minHeight:100, minWidth:150, border:0, fontFamily: "Arial",
                    backgroundColor:this.state.editMode ? "white" : "transparent"}}
                editorStyle={{marginRight:20}}
                value={this.state.value}
                onChange={this.onChange}
                toolbarConfig={toolbarConfig}
                toolbarClassName={"draggable"}
                toolbarStyle={{display: this.state.editMode ? "" : "none", position:"absolute", margin:0, bottom:0, paddingLeft:10, 
                    borderTop:"1px solid lightgray", width:"100%", backgroundColor:"whitesmoke"}}
            />
        );
    }
}

class Barchart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.properties,
            chartData: [],
            summaryData: {},
        }
    }

    // update state of initialized when props change
    componentWillReceiveProps(nextProps) {
        if (nextProps.properties.initialized != this.state.initialized) {
            this.setState({ initialized: nextProps.properties.initialized });
        }
    }

    // do API call to render chartData upon loading of component from DB
    componentWillMount() {
        let {title, datasourceUrl, path, xAxis, yAxis, aggregate, summary} = this.props.properties;
        this.initialize(title, datasourceUrl, path, xAxis, yAxis, aggregate, summary, function(){});
    }

    initialize (title, datasourceUrl, path, xAxis, yAxis, aggregate, summary, callback) {
        let self = this;
        request.get({
            url: datasourceUrl,
        }, function (error, response, body) {
            if(body){
                let data = JSON.parse(body);

                // iterate through the path until the correct dataset is reached
                for (let subpath of path.split("/")) {
                    data = data[subpath];
                }

                // aggregate the data for the chart
                let processor = new JsonProcessor();
                let aggregatedData = processor.getAggregatedData(data, xAxis, yAxis, aggregate, summary);
                let statSummary = {
                    sum: aggregatedData.sum, 
                    avg: aggregatedData.avg,
                    min: aggregatedData.min,
                    max: aggregatedData.max,
                    median: aggregatedData.median,
                    var: aggregatedData.var
                };

                // write the cal for the variance 
                self.setState({
                    initialized: true,
                    datasourceUrl: datasourceUrl,
                    path: path,
                    title: title,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    aggregate: aggregate,
                    chartData: aggregatedData.chartData,
                    summary: summary,
                    summaryData: statSummary,
                });

                callback();
            }
        });
    }

    initializeChart = (values) => {
        //set settings of barchart
        let self = this;
        let {title, datasourceUrl, path, xAxis, yAxis, summary} = values;
        let aggregate = "sum"; // should get from form

        this.initialize(title, datasourceUrl, path, xAxis, yAxis, aggregate, summary, function(){
            let { chartData,summaryData, ...other } = self.state;
            self.props.updateProperties(other, self.props.i);
        });
    }

    render() {
        return (
            <div className="draggable" style={{ height: "100%" }}>
                { this.state.initialized ?
                    <div style={{ height: "calc(62.5% + 100px)" }}>
                        <p style={{ fontFamily: 'Georgia', textAlign: "center", fontSize: 20, }}> {this.state.title} </p>
                        {this.state.facetype ?
                        <BarChart data={this.state.chartData} width={650} height={250} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={this.state.xAxis}>
                                <Label value={this.state.xAxis} offset={-5} position="insideBottom" />
                            </XAxis>
                            <YAxis dataKey={this.state.yAxis}>
                                <Label value={this.state.yAxis} offset={-10} position="insideLeft" angle={-90} />
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey={this.state.yAxis} fill="#CD5C5C" isAnimationActive={false}/>
                            {/* <Bar dataKey="neutral" fill="orange" /> */}
                            {/* <Bar dataKey="negative" fill="grey" /> */}

                            <Legend verticalAlign="top" height={20} />
                        </BarChart>
                        :
                        <ResponsiveContainer style={{height:"100%"}}>
                            <BarChart data={this.state.chartData} width={730} height={250} margin={{ top: 1, right: 30, left: 20, bottom: 30 }}>
                                <CartesianGrid strokeDa1sharray="3 3" />
                                <XAxis dataKey={this.state.xAxis}>
                                    <Label value={this.state.xAxis} offset={-5} position="insideBottom" />
                                </XAxis>
                                <YAxis dataKey={this.state.yAxis}>
                                    <Label value={this.state.yAxis} offset={-10} position="insideLeft" angle={-90} />
                                </YAxis>
                                <Tooltip />
                                <Bar dataKey={this.state.yAxis} fill="#CD5C5C" />
                                {/* <Bar dataKey="neutral" fill="orange" /> */}
                                {/* <Bar dataKey="negative" fill="grey" /> */}
                                <Legend verticalAlign="top" height={20} />
                            </BarChart>
                        </ResponsiveContainer>}
                        {this.state.summary ? <Descriptive summaryData={this.state.summaryData}/> : ""}
                    </div>
                    : <ChartForm initializeChart={this.initializeChart} />
                }
            </div>
        );
    }
}

class Linechart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.properties,
            chartData: [],
            summaryData: {},
        }
    }

    // update state of initialized when props change
    componentWillReceiveProps(nextProps) {
        if (nextProps.properties.initialized != this.state.initialized) {
            this.setState({ initialized: nextProps.properties.initialized });
        }
    }

    // do API call to render chartData upon loading of component from DB
    componentWillMount() {
        let {title, datasourceUrl, path, xAxis, yAxis, aggregate, summary} = this.props.properties;
        this.initialize(title, datasourceUrl, path, xAxis, yAxis, aggregate, summary, function(){});
    }

    initialize (title, datasourceUrl, path, xAxis, yAxis, aggregate, summary, callback) {
        let self = this;
        request.get({
            url: datasourceUrl,
        }, function (error, response, body) {
            if(body){
                let data = JSON.parse(body);

                // iterate through the path until the correct dataset is reached
                for (let subpath of path.split("/")) {
                    data = data[subpath];
                }

                // aggregate the data for the chart
                let processor = new JsonProcessor();
                let aggregatedData = processor.getAggregatedData(data, xAxis, yAxis, aggregate, summary);
                let statSummary = {
                    sum: aggregatedData.sum, 
                    avg: aggregatedData.avg,
                    min: aggregatedData.min,
                    max: aggregatedData.max,
                    median: aggregatedData.median,
                    var: aggregatedData.var
                };

                // write the cal for the variance 
                self.setState({
                    initialized: true,
                    datasourceUrl: datasourceUrl,
                    path: path,
                    title: title,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    aggregate: aggregate,
                    chartData: aggregatedData.chartData,
                    summary: summary,
                    summaryData: statSummary,
                });

                callback();
            }
        });
    }

    initializeChart = (values) => {
        //set settings of barchart
        let self = this;
        let {title, datasourceUrl, path, xAxis, yAxis, summary} = values;
        let aggregate = "sum"; // should get from form

        this.initialize(title, datasourceUrl, path, xAxis, yAxis, aggregate, summary, function(){
            let { chartData,summaryData, ...other } = self.state;
            self.props.updateProperties(other, self.props.i);
        });
    }   

    render() {
        return (
            <div className="draggable" style={{ height: "100%" }}>
                {this.state.initialized ?
                    <div style={{ height: "calc(70.5% + 1px)" }}>
                        <p style={{ fontFamily: 'Georgia', textAlign: "center", fontSize: 20, }}> {this.state.title} </p>
                        {this.state.facetype ?
                        <LineChart width={700} height={250}  margin={{ top: 1,right: 30, left: 20, bottom: 30 }} data={this.state.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={this.state.xAxis}>
                                <Label value={this.state.xAxis}offset={-5} position="insideBottom" />
                            </XAxis>
                            <YAxis dataKey={this.state.yAxis}>
                                <Label value={this.state.yAxis} offset={-10} position="insideLeft" angle={-90} />
                            </YAxis>
                            <Tooltip />
                            <Legend verticalAlign="top" height={20} />
                            <Line type="monotone" dataKey={this.state.yAxis} stroke="#8884d8" />
                        </LineChart>
                        :
                        <ResponsiveContainer className="draggable" width="95%" height="90%">
                            <LineChart width={730} height={250}  margin={{ top: 1,right: 30, left: 20, bottom: 30 }} data={this.state.chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey={this.state.xAxis}>
                                    <Label value={this.state.xAxis}offset={-5} position="insideBottom" />
                                </XAxis>
                                <YAxis dataKey={this.state.yAxis}>
                                    <Label value={this.state.yAxis} offset={-10} position="insideLeft" angle={-90} />
                                </YAxis>
                                <Tooltip />
                                <Legend verticalAlign="top" height={20} />
                                <Line type="monotone" dataKey={this.state.yAxis} stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>}
                        {this.state.summary ? <Descriptive summaryData={this.state.summaryData}/> : ""}
                    </div>
                    : <ChartForm initializeChart={this.initializeChart} />
                }
            </div>
        );   
    }
}

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            initialized: this.props.properties.initialized,
            imageUrl: this.props.properties.imageUrl, 
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.properties.initialized != this.state.initialized){
            this.setState({initialized: nextProps.properties.initialized});
        }
    }

    imageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({initialized: true, imageUrl: reader.result});
            this.props.updateProperties({initialized: true, imageUrl: reader.result}, this.props.i);
        }

        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className="draggable" style={{height:"100%", width:"100%", backgroundColor: this.props.editMode ? "white" : "transparent"}}>
                {this.state.initialized ? 
                <img style={{height:"calc(100% - 27.5px)", width:"100%"}} 
                    src={this.state.imageUrl} 
                />
                : <div style={{border: "1px dotted grey", height:"100%", backgroundColor:"white"}}>
                    <input className="fileInput" type="file" onChange={this.imageChange} /><br/>
                    Please select an Image for Preview
                </div>}
            </div>
        );
    }
}

class VideoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            initialized: this.props.properties.initialized,
            videoUrl: this.props.properties.videoUrl,
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.properties.initialized != this.state.initialized){
            this.setState({
                initialized:nextProps.properties.initialized, 
                videoUrl: nextProps.properties.videoUrl
            });
        }
    }

    loadVideo = (e) => {
        let videoUrl = document.getElementById("videoUrl").value.trim();
        this.setState({initialized: true, videoUrl: videoUrl});
        this.props.updateProperties({initialized: true, videoUrl: videoUrl}, this.props.i);
    }

    render() {
        return (
            <div className="draggable" style={{height:"100%", width:"100%", background:this.props.editMode ? "white" : "transparent"}}>
                {this.state.initialized ? 
                    <iframe style={{width:"100%", height:"calc(100% - 27.5px)"}} 
                        src={this.state.videoUrl} frameBorder="0" allow="encrypted-media" allowFullScreen>
                    </iframe>
                : <div style={{height:"100%", width:"100%", display:"flex"}}>
                    <input id="videoUrl" className="nonDraggable" placeholder="Please enter a embed video URL" 
                        style={{margin:"auto", width:"80%"}}/>
                    <button style={{margin:"auto"}} onClick={this.loadVideo}>Submit</button>
                </div>}
            </div>
        );
    }
}


class ChartForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasources: [],
            datasets: [],
            listOptions: []
        }
    }

    componentDidMount() {
        this.loadDatasource();
    }

    loadDatasource(){
        let self = this;
        request.post({
            url: api + 'loadDatasource',
            json: true,
            body: { operation: "loadDatasource", companyId: 1 }
        }, function (error, response, body) {
            if (body) {
                let datasources = body.datasource;
                if (datasources.length > 0) {
                    self.loadDataset(datasources[0].id, {values:{}});
                }
                self.setState({ datasources });
            }
        });
    }

    loadDataset(datasourceId, formProps){
        let self = this;
        request.post({
            url: api + 'loadDataset',
            json: true,
            body: { operation: "loadDataset", datasourceId: datasourceId }
        }, function (error, response, body) {
            if (body) {
                let datasets = body.dataset;
                if (datasets.length > 0) {
                    formProps.values.path = datasets[0].path;
                    self.loadListOptions(datasets[0].id, formProps);
                }

                for (let datasource of self.state.datasources) {
                    // assign the correct datasourceUrl to formProps upon changing
                    if (datasource.id == datasourceId) {
                        formProps.values.datasourceUrl = datasource.url;
                        break;
                    }
                }
                self.setState({ datasets });
            }
        });
    }

    loadListOptions(datasetId, formProps){
        let self = this;
        request.post({
            url: api + 'loadListOptions',
            json: true,
            body: { operation: "loadListOptions", datasetId: datasetId }
        }, function (error, response, body) {
            if (body) {
                let listOptions = body.list;
                let initXAxis = false;
                let initYAxis = false;
                for (let listOption of listOptions) {
                    // assign the correct datasourceUrl to formProps upon changing
                    if (listOption.infoType === "categorical" && !initXAxis) {
                        formProps.values.xAxis = listOption.value;
                        initXAxis = true;
                    } else if (listOption.infoType === "numerical" && !initYAxis) {
                        formProps.values.yAxis = listOption.value;
                        initYAxis = true;
                    }

                    if(initXAxis && initYAxis) {
                        break;
                    }
                }
                
                self.setState({ listOptions });
            }
        });
    }

    render() {
        let self = this;
        return (
            <Formik 
                // initialize values to use in form
                initialValues={{
                    title:'', 
                    path: '',
                    summary:false,
                }}

                // pass values to the charts
                onSubmit={this.props.initializeChart}

                // render form
                render={formProps=>(
                    <Form className="form-horizontal draggable" style={{ height:"100%", width:"100%", backgroundColor:"white"}}>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Chart Title</label>
                            <div className="col-md-7">
                                <Field className="form-control nonDraggable" type="text" name="title" placeholder="Chart Title" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Choose the datasource</label>
                            <div className="col-md-7">
                                <Field className="form-control" component="select" name="datasource" onChange={(e)=>this.loadDataset(e.target.value, formProps)}>
                                    {self.state.datasources.map((datasource)=>
                                        <option key={"datasource" + datasource.id} value={datasource.id}>{datasource.name}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Choose the dataset</label>
                            <div className="col-md-7">
                                <Field className="form-control" component="select" name="path" onChange={(e)=>this.loadListOptions(e.target.value, formProps)}>
                                    {self.state.datasets.map((dataset)=>
                                        <option key={"path" + dataset.id} value={dataset.id}>{dataset.name}</option>
                                    )}  
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Choose the X&#8209;Axis</label>
                            <div className="col-md-7">
                                <Field className="form-control" component="select" name="xAxis">
                                    {/* gets the option based on selected dataset */}
                                    {self.state.listOptions.map((listOption)=>
                                        {if(listOption.infoType === "categorical") {
                                            return <option key={"listOption" + listOption.value} value={listOption.value}>{listOption.name}</option>
                                        }}
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Choose the Y&#8209;Axis</label>
                            <div className="col-md-7">
                                <Field className="form-control" component="select" name="yAxis">
                                    {self.state.listOptions.map((listOption)=>
                                        {if(listOption.infoType === "numerical") {
                                            return <option key={"listOption" + listOption.value} value={listOption.value}>{listOption.name}</option>
                                        }}
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-offset-3 col-md-7">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="summary" onChange={function(){
                                            formProps.values.summary = !formProps.values.summary;
                                        }}/> Show Summary Statistics
                                    </label>
                                </div>
                            </div>
                        </div>
                        <Button className="col-md-offset-5 col-md-2" type="submit">Submit</Button>
                        
                        {/* <DisplayFormikState {...this.props}/> */}
                    </Form>
                )}
            />
        );
    }
}

class Descriptive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.properties,
            columns: 
            [{
                dataField: 'Sum',
                text:<div>Sum <i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(1)}></i></div>,
                
            }],
            order: 1,
            aggregateType: 'Sum',
        }
    }

    addCol = (e) => {
        let columns = this.state.columns;
        let order = this.state.order+1;

        if (e === "Median") {
            columns.push({
                dataField: 'Median',
                text:
                <div>Median<i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(order)}></i></div>,
                
            });
            

        } else if (e === "Min") {
            columns.push({
                dataField: 'Min',
                text: 
                <div>Min <i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(order)}></i></div>,
                

            });
        } else if(e==="Max"){
            columns.push({
                dataField: 'Max',
                text:  
                <div>Max<i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(order)}></i></div>,
                

            });
        } else if(e==="Variance"){
            columns.push({
                dataField:"Variance",
                text:
                <div>Variance<i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(order)}></i></div>,
            })
        }

        this.setState({ columns,order });
        
    }

    delete(e){
        console.log(e);
        const columns = this.state.columns ;
        delete columns[(e-1)];
        //console.log(col);
        this.setState({columns});
    }


    render() {
        const columns = [{
            dataField: 'Sum',
            text: 'Sum'
          }, {
            dataField: 'Average',
            text: 'Average'
          }, {
            dataField: 'Max',
            text: 'Max'
          },{
            dataField: 'Min',
            text: 'Min'
          },{
            dataField: 'Median',
            text: 'Median'
          },{
              dataField:"Variance",
              text:"Variance"
          }];

        var products = [{
            Sum: this.props.summaryData.sum,
            Median: this.props.summaryData.median,
            Average: this.props.summaryData.avg,
            Min: this.props.summaryData.min,
            Max:this.props.summaryData.max,
            Variance:this.props.summaryData.var,
        }];
        

        const rowStyle = { backgroundColor: '#D3D3D3' };
        const { value, onUpdate, ...rest } = this.props;
        
        // loop through the columns to remove the empty items
        const actualTitle = [];
        for (var i=0; i < this.state.columns.length; i++) {
            if(this.state.columns[i] !== undefined){
                actualTitle.push(this.state.columns[i]);
            }
        }

        
        return (
            <div className="draggable" height="100%">
                <BootstrapTable keyField='id' data={products}
                    columns={columns}
                    //cellEdit={cellEditFactory({ mode: 'dbclick' })}
                    rowStyle={rowStyle}>
                </BootstrapTable>
            </div>
        );
    }
}

class EmptyTable extends Component {
    constructor(props) {
        super(props);
        let self = this;
        this.state = {
            editMode: this.props.editMode,
            columns: [{
                    dataField: 'col1',
                    text: 'Header 1',
                    headerEvents: {
                        onClick: this.handleClick,
                        onBlur: (e) => this.handleBlur(e,0)
                    }
                }, {
                    dataField: 'col2',
                    text: 'Header 2',
                    headerEvents: {
                        onClick: this.handleClick,
                        onBlur: (e) => this.handleBlur(e,1)
                    }
                }, {
                    dataField: 'delete',
                    text: 'Delete',
                    align: 'center',
                    editable: false,
                    hidden: false,
                    formatter: function(cell, row, rowIndex){
                        return <i className="fa fa-trash" onClick={() => self.delRow(rowIndex)}/>
                    }
                }],
            data: [{
                    id: 'row1',
                    col1: '',
                    col2: ''
                },{
                    id: 'row2',
                    col1: '',
                    col2: ''
                }],
        }
    }

    componentWillMount(){
        let self = this;
        let columns = this.props.properties.columns;
        let new_columns = [];

        for (let i in columns) {
            new_columns.push({
                dataField:columns[i].dataField, 
                text:columns[i].text, 
                headerEvents:{
                    onClick: this.handleClick,
                    onBlur: (e) => this.handleBlur(e,i)
                }
            }) 
        }

        // add the delete column
        new_columns.push({
            dataField: 'delete',
            text: 'Delete',
            align: 'center',
            editable: false,
            hidden: !self.props.editMode,
            formatter: function(cell, row, rowIndex){
                return <i className="fa fa-trash" onClick={() => self.delRow(rowIndex)}/>
            }
        });

        this.setState({columns: new_columns, data:this.props.properties.data})
    }

    componentWillReceiveProps(nextProps){
        if(this.props.editMode != nextProps.editMode){
            let columns = this.state.columns;
            columns[columns.length - 1].hidden = !columns[columns.length - 1].hidden;
            this.setState({columns, editMode:nextProps.editMode});
        }
    }

    addRow = (e) => {
        let self = this;
        let data = this.state.data;
        let new_data = {id:'row' + (data.length+1)}

        for (let i=1; i < this.state.columns.length; i++){
            new_data["col" + i] = '';
        }

        data.push(new_data);
        this.setState({data})

        setTimeout(function () {
            self.updateProperties();
        }, 100);
    }

    delRow(rowIndex){
        let data = this.state.data;
        data.splice(rowIndex,1);
        
        // fix id referencing error        
        for(let i=0; i < data.length; i++) {
            data[i].id = "row" + (i+1);
        }
        this.setState({data});
    }

    addCol = (e) => {
        let self = this;
        let columns = this.state.columns;
        let new_columns = [];
        let data = this.state.data;

        // add new item to end of each table row (or else code will crash)
        for (let obj of data){
            obj["col" + columns.length] = '';
        }

        for (let i in columns) {
            let column = columns[i];

            // push the new column before the cancel column
            if(i == columns.length - 1) {
                new_columns.push({
                    dataField: 'col' + columns.length,
                    text: 'Header ' + columns.length,
                    headerEvents: {
                        onClick: this.handleClick,
                        onBlur: (e) => this.handleBlur(e,columns.length-1)
                    }
                })
            }

            new_columns.push(column);
        }

        this.setState({columns: new_columns, data});

        setTimeout(function() {
            self.updateProperties();
        }, 100);
    }

    handleClick = (e) => {
        let value = e.target.innerHTML;
        e.target.innerHTML = '<input class="nonDraggable" value="' + value + '"/>';
        e.target.childNodes[0].focus();
    }

    handleBlur(e, i) {
        let self = this;
        let parent = e.target.parentNode;
        let columns = this.state.columns;

        parent.innerHTML = e.target.value;
        columns[i].text = e.target.value;

        this.setState({columns});
        setTimeout(function() {
            self.updateProperties();
        }, 100);
    }

    updateProperties() {
        let columns = this.state.columns;
        let new_columns = [];
        for (let i in columns) {
            let column = columns[i];
            if(i != columns.length - 1) {
                new_columns.push({dataField:column.dataField, text:column.text})
            }
        }
        this.props.updateProperties({columns:new_columns, data:this.state.data}, this.props.i);
    }

    render(){
        return (
            <div className="draggable">
                <Button bsSize="small" bsStyle="primary" style={{ display:this.state.editMode ? "inline-block" : "none", padding:"4px 6px" }}
                    onClick={this.addRow}>Add Row</Button>
                <Button bsSize="small" bsStyle="primary" style={{ display:this.state.editMode ? "inline-block" : "none", padding:"4px 6px" }}
                    onClick={this.addCol}>Add Col</Button>
                <BootstrapTable keyField='id' className="nonDraggable" 
                    striped responsive
                    data={ this.state.data } 
                    columns={ this.state.columns } 
                    cellEdit={ 
                        cellEditFactory({ 
                            blurToSave: true,
                            mode:'click'
                        }) 
                    }
                />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('reportContainer'));


// code for the size change A2/A3/A4
                            {/* <div id="size" className="modal">s
                                <div className="modal-content">s
                                    <form onSubmit={this.handleFormSubmit} id="myform" visibility= {this.state.sformVisibility}>
                                        <div className="row">s
                                            <span className="close" onClick={this.closeModal}>&times;</span>s
                                        </div>s
                                        <div className="row">s
                                            <div className="col-sm-offset-4 col-sm-3 ">s
                                                <div className='title'>Please choose your report page size.</disv>
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A3" checked={sthis.state.selectedSize === 'A3'} onChange={this.handleSizeChange}  />A3</label>
                                                </div>s
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A4" checked={sthis.state.selectedSize === 'A4'} onChange={this.handleSizeChange} />A4</label>
                                                </div>s
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A5" checked={sthis.state.selectedSize === 'A5'} onChange={this.handleSizeChange} />A5</label>
                                                </div>s
                            {/* <div id="size" className="modal">s
                                <div className="modal-content">s
                                    <form onSubmit={this.handleFormSubmit} id="myform" visibility= {this.state.sformVisibility}>
                                        <div className="row">s
                                            <span className="close" onClick={this.closeModal}>&times;</span>s
                                        </div>s
                                        <div className="row">s
                                            <div className="col-sm-offset-4 col-sm-3 ">s
                                                <div className='title'>Please choose your report page size.</disv>
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A3" checked={sthis.state.selectedSize === 'A3'} onChange={this.handleSizeChange}  />A3</label>
                                                </div>s
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A4" checked={sthis.state.selectedSize === 'A4'} onChange={this.handleSizeChange} />A4</label>
                                                </div>s
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A5" checked={sthis.state.selectedSize === 'A5'} onChange={this.handleSizeChange} />A5</label>
                                                </div>s
                            {/* <div id="size" className="modal">s
                                <div className="modal-content">s
                                    <form onSubmit={this.handleFormSubmit} id="myform" visibility= {this.state.sformVisibility}>
                                        <div className="row">s
                                            <span className="close" onClick={this.closeModal}>&times;</span>s
                                        </div>s
                                        <div className="row">s
                                            <div className="col-sm-offset-4 col-sm-3 ">s
                                                <div className='title'>Please choose your report page size.</disv>
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A3" checked={sthis.state.selectedSize === 'A3'} onChange={this.handleSizeChange}  />A3</label>
                                                </div>s
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A4" checked={sthis.state.selectedSize === 'A4'} onChange={this.handleSizeChange} />A4</label>
                                                </div>s
                                                <div className="radio">s
                                                    <label><input type="radio" name="size" value="A5" checked={sthis.state.selectedSize === 'A5'} onChange={this.handleSizeChange} />A5</label>
                                                </div>s
                                            </div>s
s
                                        </div>s
                                        <div className="row">s
                                            <div className="col-sm-offset-4 col-sm-3 ">s
                                                <div className='title'>Please choose your report layout.</div>s
                                                <div className="radio">s
                                                    <label><input type="radio" name="layout" value="Portrait" cshecked={this.state.selectedLayout === 'Portrait'}  onChange={this.handleLayoutChange}  />Portrait</label>
                                                </div>s
                                                <div className="radio">s
                                                    <label><input type="radio" name="layout" value="Landscape" schecked={this.state.selectedLayout === 'Landscape'}  onChange={this.handleLayoutChange} />Landscape</label>
                                                </div>s
                                            </div>s
                                        </div>s
                                        <div className="row">s
                                            <div className="col-sm-offset-7 col-sm-2 ">s
                                                <input type="submit" value="Submit" className="btn btn-info" />s
                                            </div>s
                                        </div>s
                                    </form>s
                                </div>s
                            </div> */}
                                        