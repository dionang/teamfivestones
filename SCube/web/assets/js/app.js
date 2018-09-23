import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import request from 'request';
import Rnd from 'react-rnd';
import RichTextEditor from 'react-rte';
import { Button, ButtonToolbar, SplitButton, MenuItem, Navbar } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Label, Legend, Tooltip, ResponsiveContainer} from 'recharts';
import { Formik, Form, Field } from 'formik';

//const api = 'http://localhost:8084/';
//const datasourceUrl = 'http://localhost:8084/Dummy_API/getCustomerOrders';
//const api = 'http://103.3.61.39:8080/SCube/';
//const datasourceUrl = 'http://103.3.61.39:8080/Dummy_API/getCustomerOrders';
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
            exporting: false
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
                type: "bar", x: 0, y: 0, height: 250, width: 500, display: true,
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
                type: "line", x: 0, y: 0, height: "fit-content", width: "fit-content", display: true,
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
            { type: "table", x: 0, y: 0, height: 300, width: 300, display: true }
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
                type: "video", x: 0, y: 0, height: 200, width: 200, display: true,
                properties: {
                    // using textbox properties for now
                    text: '',
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

    savePDF(){
        let self = this; 

        // if exporting
        if(this.state.exporting){
            domtoimage.toJpeg(document.getElementById('container'), { quality: 1 })
            .then(function(dataUrl) {
                // add page screenshot to picArr
                var picArr = self.state.picArr;
                picArr.push(dataUrl);
                let pageNo = self.state.pageNo;

                // if not on last page, increment pageNo and trigger rerender
                if (pageNo < self.state.components.length-1) {
                    pageNo += 1;
                    self.setState({pageNo});

                    // give time for page to rerender before calling the method
                    setTimeout(function(){
                        self.savePDF();
                    }, 1500);

                // reached the last page, proceed to export PDF
                } else {
                    // hardcoded A4 dimensions, width * height
                    let doc = new jsPDF('l', 'mm', [297, 210]); 

                    // iterate through the pages
                    for(let i=0; i<self.state.picArr.length; i++){
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

                        doc.addImage(dataUrl,'JPEG', 0, 0, 297,140);  

                        // 20 is left margin, 200 is top margin
                        doc.text(20,200, "Page No: " + (i+1));
                        
                        // if not last page, add page
                        if(i != self.state.picArr.length-1){
                            doc.addPage();
                        }
                    }

                    // completed the rendering of doc
                    // upload PDF to public folder
                    let formData = new FormData();
                    formData.append("file", doc.output('blob'), self.state.templateName+".pdf");
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", api + "saveFile");
                    xhr.send(formData);

                    // proceed to save locally
                    doc.save(self.state.templateName);
                    picArr = [];
                    self.setState({picArr:[], exporting:false});
                }
            });

        // starts the exporting process, starting from the first page
        } else {
            this.setState({ pageNo:0, exporting:true });

            // give time for page to rerender before calling the method
            setTimeout(function(){
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
                // convert px to inches
                let x = component.x / 96;
                let y = component.y / 96;
                let w = component.width / 96;
                let h = (component.height) / 96;

                if (component.type === "text") {
                    // remove the p tags
                    let text = component.properties.text.substring(3, component.properties.text.length - 4);
                    // console.log(text);
                    // let texts = text.split(/\r\n|\n|\r/);
                    // console.log(texts); 
                    slide.addText(text, {
                        x: x, y: y, w: w, h: h,
                        fontSize: 14, color: '363636'
                        // , bullet:{code:'25BA'} 
                    });

                } else if (component.type === "image") {
                    let imageUrl = component.properties.imageUrl;

                    // remove height of toolbar
                    y = (component.y + 27.5) / 96;
                    h = (component.height - 27.5) / 96;
                    slide.addImage({ data: imageUrl, x: x, y: y, w: w, h: h });
                } else if (component.type === "video") {
                    // remove the p tags
                    let videoUrl = component.properties.text.substring(3, component.properties.text.length - 4).trim();
                    console.log(videoUrl);
                    slide.addMedia({ type: 'online', link: videoUrl, x: x, y: y, w: w, h: h });
                }
            }
        }

        pptx.save('Sample Presentation');
    }

    saveTemplate = () => {
        let self = this;
        let templateId = parseInt(document.getElementById("templateId").value, 10);
        let companyId = parseInt(document.getElementById("companyId").value, 10);
        let userName = document.getElementById("userName").value;
        if (templateId === 0 || templateId === 9) {
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
            <div className={this.state.sidebar ? "nav-md" : "nav-sm"} id="main">
                <div className="container body" style={{ margin: 0, padding: 0, width: "100%" }}>
                    <div className="main_container">
                        <div className="col-md-3 left_col">
                            <div className="left_col scroll-view">
                                <div className="navbar nav_title" style={{ border: 0 }}>
                                    <a className="site_title">
                                        <img src={this.state.sidebar ? "assets/images/logo.png" : "assets/images/logo1_1.png"}
                                            style={{
                                                height: this.state.sidebar ? 90 : 80,
                                                width: this.state.sidebar ? 200 : 50,
                                            }} />
                                    </a>
                                </div>
                                <div className="clearfix"></div><br />
                                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
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
                                                <li><a href="javascript:;"> Profile</a></li>
                                                <li><a href="logout.jsp"><i className="fa fa-sign-out pull-right"/> Log Out</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="right_col">
                            <div className="col-md-4 col-xs-4">
                                <label style={{ fontSize: 15, marginRight: 2 }}>Template Name:</label>
                                <input style={{ fontSize: 15 }} value={this.state.templateName} onChange={this.renameTemplate} />
                            </div>
                            {/* <button className="btn btn-primary" id="changeSize" onClick={this.openModal} >Change Page Size</button> */}
                            {/* <Button bsStyle="info" onClick={this.getComponentDetails}>Get Component Details</Button> */}
                            <Button className="col-md-2 col-xs-2" style={{ float: "right", minWidth: 130 }} bsStyle="info" onClick={this.saveTemplate}>
                                <i className="fa fa-save" /> Save Template
                                </Button>
                            <Button className="col-md-2 col-xs-2" style={{ float: "right", minWidth: 150 }} bsStyle="success" onClick={this.toggleEditMode}>
                                <i className="fa fa-edit" style={{ marginRight: 2 }} />
                                {this.state.editMode ? "Leave Edit Mode" : "Enter Edit Mode"}
                            </Button>
                            <Button className="col-md-2 col-xs-2" style={{ float: "right", minWidth: 150 }} bsStyle="warning" onClick={this.savePresentation}>
                                <i className="fa fa-file-powerpoint-o" style={{ marginRight: 2 }} /> Export as PPT
                            </Button>
                            <Button className="col-md-2 col-xs-2" style={{ float: "right", minWidth: 130 }} bsStyle="info" onClick={()=>{this.setState({editMode: false}); this.savePDF()}}>
                                <i className="fa fa-file-pdf-o"></i> Save PDF
                            </Button>
                            <br />

                            {/* <div id="size" className="modal">
                                <div className="modal-content">
                                    <form onSubmit={this.handleFormSubmit} id="myform" visibility= {this.state.formVisibility}>
                                        <div className="row">
                                            <span className="close" onClick={this.closeModal}>&times;</span>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-offset-4 col-sm-3 ">
                                                <div className='title'>Please choose your report page size.</div>
                                                <div className="radio">
                                                    <label><input type="radio" name="size" value="A3" checked={this.state.selectedSize === 'A3'} onChange={this.handleSizeChange}  />A3</label>
                                                </div>
                                                <div className="radio">
                                                    <label><input type="radio" name="size" value="A4" checked={this.state.selectedSize === 'A4'} onChange={this.handleSizeChange} />A4</label>
                                                </div>
                                                <div className="radio">
                                                    <label><input type="radio" name="size" value="A5" checked={this.state.selectedSize === 'A5'} onChange={this.handleSizeChange} />A5</label>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-sm-offset-4 col-sm-3 ">
                                                <div className='title'>Please choose your report layout.</div>
                                                <div className="radio">
                                                    <label><input type="radio" name="layout" value="Portrait" checked={this.state.selectedLayout === 'Portrait'}  onChange={this.handleLayoutChange}  />Portrait</label>
                                                </div>
                                                <div className="radio">
                                                    <label><input type="radio" name="layout" value="Landscape" checked={this.state.selectedLayout === 'Landscape'}  onChange={this.handleLayoutChange} />Landscape</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-offset-7 col-sm-2 ">
                                                <input type="submit" value="Submit" className="btn btn-info" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div> */}


                            <div className="col-sm-12 col-xs-12" style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: 'white', borderBottom: '7px solid #EB6B2A' }}>
                                <label> Add Component: </label>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Textbox" bsStyle="primary"
                                    onClick={this.addTextbox} style={{ marginRight: 5, marginLeft: 6 }}><i className="fa fa-font" /></Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Bar Chart" bsStyle="warning"
                                    onClick={this.addBarChart} style={{ marginRight: 5 }}><i className="fa fa-bar-chart" /></Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Line Chart" bsStyle="success"
                                    onClick={this.addLineChart} style={{ marginRight: 5 }}><i className="fa fa-line-chart" /></Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Table" bsStyle="danger"
                                    onClick={this.addTable} style={{ marginRight: 5 }}><i className="fa fa-table" /> </Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Image"
                                    onClick={this.addImage} style={{ backgroundColor: "#31B0D5", color: "white", border: "1px solid #31B0D5", marginRight: 5 }}><i className="fa fa-image" /></Button>
                                <Button data-toggle="tooltip" data-placement="bottom" title="Add Video"
                                    onClick={this.addVideo} style={{ backgroundColor: "#D896FF", color: "white", border: "1px solid #D896FF"}}><i className="fa fa-play-circle" /></Button>

                                <span style={{ float:"right", fontFamily: 'Georgia', fontSize: 18, textAlign: "center" }}>Page Number
                                    <Button data-toggle="tooltip" data-placement="bottom" title="Previous Page" bsStyle="warning" bsSize="small" onClick={this.previousPage}
                                        style={{ marginRight: 10, marginLeft: 10 }}>
                                        <svg height="15" width="24" style={{marginTop: -5}} preserveAspectRatio="xMinYMax meet" viewBox="0 0 17 17" >
                                            <path d="M0-.5h24v24H0z" fill="none"></path>
                                            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" className="jWRuRT"></path>
                                        </svg>
                                    </Button>
                                    <span style={{ fontFamily: 'Georgia', fontSize: 18 }}>{this.state.pageNo + 1}</span>
                                    <Button data-toggle="tooltip" data-placement="bottom" title="Next Page" bsStyle="warning" bsSize="small" onClick={this.nextPage}
                                        style={{ marginLeft: 10 }}>
                                        <svg height="15" width="24" style={{marginTop: -5}} preserveAspectRatio="xMinYMax meet" viewBox="0 0 17 17" >
                                            <path d="M0-.5h24v24H0z" fill="none"></path>
                                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" className="jWRuRT"></path>
                                        </svg>
                                    </Button>
                                </span>
                            </div>

                            <div className="col-sm-12 col-xs-12" style={{ background: "#EEEEEE" }}>
                                <div id="container" style={{
                                    backgroundColor: 'white', height: window.innerHeight * 0.70, margin:0
                                }}>

                                    {/* map does a for loop over all the components in the state */}
                                    {/* {console.log("pageNo" + this.state.pageNo)} */}
                                    {this.state.components[this.state.pageNo].map((item, i) => {
                                        if (item.display) {
                                            return <Rnd key={this.state.pageNo + "," + i}
                                                style={{
                                                    borderStyle: this.state.editMode ? "dotted" : "hidden",
                                                    borderWidth: 2,
                                                    backgroundColor: "white",
                                                    borderColor: 'grey',
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
                <Iimage i={this.props.i}  editMode={this.props.editMode} 
                    properties={this.props.properties} updateProperties={this.props.updateProperties}/>
            );
        } else if (this.props.type ==="table"){
            return(
                <EmptyTable/>
            );
        } else if (this.props.type === "video") {
            return(
                <Textbox i={this.props.i} text={this.props.properties.text} editMode={this.props.editMode}
                    updateProperties={this.props.updateProperties} />
            );
        }
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

class EmptyTable extends React.Component {

    constructor(props) {
      super(props);
  
      //  this.state.products = [];
      this.state = {};
      this.state.filterText = "";
      this.state.products = [];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(product) {
      var index = this.state.products.indexOf(product);
      this.state.products.splice(index, 1);
      this.setState(this.state.products);
    };
  
    handleAddEvent(evt) {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var product = {
        id: id,
        name: "",
        price: "",
        category: "",
        qty: 0
      }
      this.state.products.push(product);
      this.setState(this.state.products);
  
    }
  
    handleProductTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var products = this.state.products.slice();
    var newProducts = products.map(function(product) {
  
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
  
        }
      }
      return product;
    });
      this.setState({products:newProducts});
    //  console.log(this.state.products);
    };
    render() {
  
      return (
        <div class="draggable" autofocus="true">
          {/* <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/> */}
          <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  class SearchBar extends React.Component {
    handleChange() {
      this.props.onUserInput(this.refs.filterTextInput.value);
    }
    render() {
      return (
        <div>
  
          <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
  
        </div>
  
      );
    }
  
  }
  
  class ProductTable extends React.Component {
  
    render() {
      var onProductTableUpdate = this.props.onProductTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var product = this.props.products.map(function(product) {
        if (product.name.indexOf(filterText) === -1) {
          return;
        }
        return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
      });
      return (
        <div>
  
  
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>price</th>
                <th>quantity</th>
                <th>category</th>
              </tr>
            </thead>
  
            <tbody>
              {product}
  
            </tbody>
  
          </table>
        </div>
      );
  
    }
  
  }
  
  class ProductRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.product);
  
    }
    render() {
  
      return (
        <tr className="eachRow">
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            "type": "name",
            value: this.props.product.name,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "price",
            value: this.props.product.price,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "qty",
            value: this.props.product.qty,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "category",
            value: this.props.product.category,
            id: this.props.product.id
          }}/>
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  class EditableCell extends React.Component {
  
    render() {
      return (
        <td>
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
        </td>
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
            <div className="draggable" style={{ height: "100% " }}>
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

class Iimage extends React.Component {
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
            <div className="draggable" style={{height:"100%", width:"100%"}}>
                {this.state.initialized ? 
                <img style={{height:"calc(100% - 27.5px)", width:"100%"}} 
                    src={this.state.imageUrl} 
                />
                : <div style={{border: "1px dotted grey", height:"100%"}}>
                    <input className="fileInput" type="file" onChange={this.imageChange} /><br/>
                    Please select an Image for Preview
                </div>}
            </div>
        );
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
            <RichTextEditor style={{border:"hidden"}}
                rootStyle={{height:"100%", minHeight:100, minWidth:150}}
                value={this.state.value}
                onChange={this.onChange}
                toolbarConfig={toolbarConfig}
                toolbarClassName={"draggable"}
                toolbarStyle={{display: this.state.editMode ? "" : "none"}}
            />
        );
    }
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.properties,
            columns: 
            [{
                dataField: 'id',
                text:<div>Product ID <i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(1)}></i></div>,
                sort: true
            }],
            order: 1,
            aggregateType: 'Sum'
        }
    }

    // update state of initialized when props change
    /*componentWillReceiveProps(nextProps){
        if (nextProps.properties.initialized != this.state.initialized){
            this.setState({initialized: nextProps.properties.initialized});
        }
    }*/

    initializeTable = (values) => {
        //set settings of barchart
        let processor = values.processor;
        let datasourceUrl = values.datasourceUrl;
        let dataset = values.dataset;
        let data = processor.getDataset(dataset);

        this.setState({
            initialized: true,
            datasourceUrl: datasourceUrl,
            dataset: dataset,
            chartData: data
        })

        // sending all data to app2 other than chartData
        //let {chartData, ...other} = this.state;
        //this.props.updateProperties(other, this.props.i);
    }

    
    addCol = (e) => {
        let columns = this.state.columns;
        let order = this.state.order+1;

        if (e === "name") {
            columns.push({
                dataField: 'name',
                text:
                <div>Product Name <i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(order)}></i></div>,
                sort: true,
            });
            

        } else if (e === "price") {
            columns.push({
                dataField: 'price',
                text: 
                <div>Price <i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(order)}></i></div>,
                sort: true

            });
        } else {
            columns.push({
                dataField: 'id',
                text:  
                <div>Product ID <i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(order)}></i></div>,
                sort: true

            });
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
        var products = [{
            id: 1,
            name: "Product1",
            price: 120
        }, {
            id: 2,
            name: "Product2",
            price: 80
        }, {
            id: 3,
            name: "Product1",
            price: 120
        }, {
            id: 4,
            name: "Product2",
            price: 80
        }, {
            id: 5,
            name: "Product1",
            price: 120
        }];

        const rowStyle = { backgroundColor: '#c8e6c9' };
        const { value, onUpdate, ...rest } = this.props;
        
        // loop through the columns to remove the empty items
        const actualTitle = [];
        for (var i=0; i < this.state.columns.length; i++) {
            if(this.state.columns[i] !== undefined){
                actualTitle.push(this.state.columns[i]);
            }
        }

        return this.state.initialized ?
        
            <div  className="draggable">
                <ButtonToolbar >
                    <SplitButton title="Add a Column" bsStyle="info" pullRight id="split-button-pull-right" onSelect={this.addCol}>
                        Categories
                        <MenuItem eventKey="id">Product ID</MenuItem>
                        <MenuItem eventKey="name">Product Name</MenuItem>
                        <MenuItem eventKey="price">Product Price</MenuItem>
                    </SplitButton>
                </ButtonToolbar>

                <BootstrapTable keyField='id' data={products}
                    columns={actualTitle}
                    //cellEdit={cellEditFactory({ mode: 'dbclick' })}
                    rowStyle={rowStyle}>
                    
                </BootstrapTable>
            </div>
            : <TableForm initializeTable={this.initializeTable} />
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
                    <Form className="draggable" style={{textAlign: "center", height:"100%",width:"100%"}}>
                        <label>Chart Title</label>
                        <Field type="text" name="title" placeholder="Chart Title" />
                        <br/><br/>
                        <label>Choose the datasource</label>
                        <Field component="select" name="datasource" onChange={(e)=>this.loadDataset(e.target.value, formProps)}>
                            {self.state.datasources.map((datasource)=>
                                <option key={"datasource" + datasource.id} value={datasource.id}>{datasource.name}</option>
                            )}
                        </Field>
                        <br/><br/>
                        <label>Choose the dataset</label>
                        <Field component="select" name="path" onChange={(e)=>this.loadListOptions(e.target.value, formProps)}>
                            {self.state.datasets.map((dataset)=>
                                <option key={"path" + dataset.id} value={dataset.id}>{dataset.name}</option>
                            )}  
                        </Field>
                        <br/><br/>
                        <label>Choose the X-Axis</label> 
                        <Field component="select" name="xAxis">
                            {/* gets the option based on selected dataset */}
                            {self.state.listOptions.map((listOption)=>
                                {if(listOption.infoType === "categorical") {
                                    return <option key={"listOption" + listOption.value} value={listOption.value}>{listOption.name}</option>
                                }}
                            )}
                        </Field>
                        <br/><br/>
                        <label>Choose the Y-Axis</label> 
                        <Field component="select" name="yAxis">
                            {self.state.listOptions.map((listOption)=>
                                {if(listOption.infoType === "numerical") {
                                    return <option key={"listOption" + listOption.value} value={listOption.value}>{listOption.name}</option>
                                }}
                            )}
                        </Field>
                        <br/><br/>
                        <span style={{marginRight:10}}>Show Summary Table</span>
                        <input type="checkbox" name="summary" onChange={function(){
                            formProps.values.summary = !formProps.values.summary;
                        }}>
                            
                        </input>
                        <br/><br/>
                        <Button type="submit">Submit</Button>
                        {/* <DisplayFormikState {...this.props}/> */}
                    </Form>
                )}
            />
        );
    }
}

class TableForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            aggregateType: 'Sum'
        }
    }

    changeAggregate = (e)=>{
        let aggregateType = this.state.aggregateType;
        aggregateType = e;
        this.setState(aggregateType);
    }

    render() {
        return (
            <Formik 
                // initialize values to use in form
                initialValues={{
                    title:'', 
                    dataset: datasets[0],
                    datasourceUrl: datasourceUrl,
                    primaryCol: jsonProcessor.getOptions(datasets[0])[0], 
                    processor:jsonProcessor,
                }}

                // pass values to the charts
                onSubmit={this.props.initializeTable}

                // render form
                render={formProps=>(
                    <Form className="draggable" style={{textAlign: "center", zIndex: -1,height:"100%",width:"100%"}}>
                        <label style={{marginRight:5}}>Chart Title</label>
                        <Field type="text" name="title" placeholder="Chart Title"/>
                        <br/><br/>
                        <label style={{marginRight:5}}>Choose the dataset</label>
                        <Field component="select" name="dataset">
                            {datasets.map((dataset)=>
                                <option key={dataset}>{dataset}</option>
                            )}
                        </Field>
                        <br/><br/>
                        <label style={{marginRight:5}}>Type of Calculation</label> 
                        <select name="tableAggregate">
                            {/* gets the option based on selected dataset */}
                            <option key = "Sum" onClick={this.changeAggregate}>Sum</option>
                            <option key = "Average"  onClick={this.changeAggregate}>Average</option>
                            <option key = "Medium"  onClick={this.changeAggregate}>Medium</option>
                        </select>
                        <br/><br/>
                        <label style={{marginRight:5}}>Choose the category for {this.state.aggregateType}</label>   
                        <Field component="select" name="tableCat">
                            {/* gets the option based on selected dataset */}
                            {jsonProcessor.getOptions(formProps.values.dataset)
                            .map((option)=>
                                <option key={option}>{option}</option>
                            )}
                        </Field>

                        <br/><br/>
                        <Button bsStyle="default" type="submit">Submit</Button>
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

ReactDOM.render(<App/>, document.getElementById('reportContainer'));