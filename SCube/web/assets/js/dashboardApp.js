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
//const api = 'https://scube.rocks/SCube/';
const api = 'https://report.scubeapp.com/SCube/';
//const api = 'http://18.222.40.231/SCube/';

class DashboardApp extends Component {
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
            templateCount: 0,
            sidebar: true,
            pageNo: 0,
            picArr:[],
            exporting: false,
            isBarPic:"-webkit-inline-box",
            isLinePic:"-webkit-inline-box",
            displayChart:true,
        }
    }

    componentDidMount(){
        this.getTemplateCount();
        this.loadDashboard();
    }

    addBarChart = () => {
        let components = this.state.components;
        // adds new component to state
        components[this.state.pageNo].push(
            {
                type: "bar", x: 0, y: 0, height: 370, width: 500, display: true,
                properties: {
                    initialized: false,
                    facetype: true
                }
            }
        );

        // updates state
        this.setState({ components, editMode: true,isBarPic:"none"  });
    }

    addLineChart = () => {
        let components = this.state.components;
        components[this.state.pageNo].push(
            {
                type: "line", x: 0, y: 0, height: 370, width: 500, display: true,
                properties: {
                    initialized: false,
                    facetype: true
                }
            }
        );

        this.setState({ components, editMode: true,isLinePic:"none" });
    }

    addTable = () => {
        let components = this.state.components;
        components[this.state.pageNo].push(
            { 
                type: "table", x: 0, y: 0, height:150, width:250, display: true,
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

    deleteComponent(i) {
        let components = this.state.components;
        let pageNo = this.state.pageNo;
        components[pageNo][i].display = false;
        this.setState({ components });
    }
    
    getComponentDetails = () => {
        console.log(this.state.components);
    }
    
    getTemplateCount = () => {
        let self = this;
        request.post({
            url: api + 'getTemplateCountByUser',
            form: { 
                userName: document.getElementById("userName").value,
                operation: "getTemplateCountByUser" 
            }
        }, function (error, response, body) {
            if (body) {
                self.setState({templateCount:body});
            }
        });
    }

    loadDashboard = () => {
            let self = this;
        if(self.state.displayChart===true){
            let accountId = parseInt(document.getElementById("accountId").value, 10);
            request.post({
                url: api + 'loadDashboard',
                json: true,
                body: { operation: "loadDashboard", accountId: accountId }
            }, function (error, response, body) {
                if (body) {
                    let components = self.state.components;
                    for (let type in body) {
                        let properties = body[type];
                        if (type == "bar") {
                            components[self.state.pageNo].push(
                                {
                                    type: "bar", x: 0, y: 0, height: 370, width: 500, display: true, properties: properties
                                }
                            );
                        } else if (type == "line") {
                            components[self.state.pageNo].push(
                                {
                                    type: "line", x: 0, y: 0, height: 370, width: 500, display: true, properties: properties
                                }
                            );
                        }
                    }

                    self.setState({ components });
                }
            });}
    }
    
    renameTemplate = (e) => {
        this.setState({ templateName: e.target.value });
    }
    
    saveDashboard(){
        let self = this;
        let accountId = parseInt(document.getElementById("accountId").value, 10);
        console.log(self.state.components)
        request.post({
            url: api + 'saveDashboard',
            json: true,
            body: { operation: "saveDashboard", accountId: accountId, components: self.state.components[0] }
        }, function (error, response, body) {
            if (body && body.status) {
                swal({icon:"success", text:"Saved succesfully"});
            } else {
                swal({icon:"error", text:"Error in saving"});
            }
        });
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
        let self = this;
        let components = this.state.components;
        let pageNo = this.state.pageNo;

        components[pageNo][i].properties = properties;
        this.setState({ properties });
        setTimeout(function () {
            self.saveDashboard();
        }, 100);
        
    }

    render() {
        return (
            <div>
                <div className={this.state.sidebar ? "nav-md" : "nav-sm"} id="main">
                    <div className="container body" style={{ margin: 0, padding: 0, width: "100%" }}>
                        <div className="main_container">
                            <div className="col-md-3 left_col">
                            <div className="left_col scroll-view">
                                <div className="navbar nav_title" style={{ border: 0 ,height:"fit-content"}}>
                                    <a className="site_title" style={{backgroundColor:"white",height:"57px"}}>
                                        
                                        <img src={this.state.sidebar ? "assets/images/logo.jpg" : "assets/images/logo1.jpg"}
                                            style={{
                                                height: this.state.sidebar ? 50 : 51,
                                                width: this.state.sidebar ? 100 : 50,
                                            }} />
                                    </a>
                                    </div>
                                    <div className="clearfix"></div><br/>
                                    <div id="compress" style={{display: this.state.sidebar ? 'block':'none', float:'right', marginRight:30, marginTop:-5, color:'white'}} 
                                        onClick={this.toggleSidebar}>
                                        <i className="fa fa-minus-square-o" ></i>
                                    </div>
                                    <div id="expand" style={{display: this.state.sidebar ? 'none':'block', float:'right', marginRight:10, marginTop:-5, color:'white'}} 
                                        onClick={this.toggleSidebar}>
                                        <i className="fa fa-plus-square-o" ></i>
                                    </div>
                                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                                        <div className="menu_section">
                                            <ul className="nav side-menu" id="options">
                                                <li><a href="managerHome.jsp"><i className="fa fa-home"/>  Home</a></li>
                                                <li><a href="dashboard.jsp"><i className="fa fa-bar-chart"/>  View Dashboard</a></li>
                                                <li><a href="createUserAccount.jsp"><i className="fa fa-group"/>  Create User Account</a></li>
                                                <li><a href="templateHome.jsp"><i className="fa fa-file-image-o"/>  Reports</a></li>
                                                <li><a href="slideShow.jsp"><i className="fa fa-envelope"/>  Email</a></li> 
                                                <li><a href="previewLinkGenerator.jsp"><i className="fa fa-link"></i> Generate Preview URL</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="top_nav" >
                                <div className="nav_menu">
                                    <nav>
                                        <ul className="nav navbar-nav navbar-right">
                                            <li>
                                                <a className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                    <img style={{marginLeft:2}} src="assets/images/man.png" />
                                                        {document.getElementById('profileName').value}
                                                    <span className=" fa fa-angle-down" style={{marginLeft:5}}></span>
                                                </a>
                                                <ul className="dropdown-menu dropdown-usermenu pull-right">
                                                    <li><a href="resetPassword.jsp"><i className="fa fa-refresh pull-right"></i> Reset Password</a></li>
                                                    <li><a href="logout.jsp"><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>



                            <div className="right_col" width="100%" style={{ backgroundColor: "#F3F3F3", overflow:"hidden" }}>

                                <div className="col-xs-3 col-md-3" style={{ textAlign: "center", verticalAlign: "middle", float: "right", height: 'fit-content', }}>
                                    <label style={{ margin: '0px', fontFamily: 'Georgia', fontSize: "16px", marginTop: "5px",  backgroundColor: 'brown', width: "100%", color: 'white', borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>Number of Templates Created</label>
                                    <br/><label style={{ margin: '0px', fontSize: "40px", width: '100%', border: "1px solid grey", }}>{this.state.templateCount-1}</label>
                                </div>

                                {/* <button className="btn btn-primary" id="changeSize" onClick={this.openModal} >Change Page Size</button> */}
                                {/*<Button bsStyle="info" onClick={this.getComponentDetails}>Get Component Details</Button> */}
                                {/* <Button className="col-md-2 col-xs-3" style={{ float:"right", minWidth:130 }} bsStyle="info" onClick={this.saveTemplate}>
                                        <i className="fa fa-save" /> Save Template
                                    </Button> */}
                                {/* <Button className="col-md-2 col-xs-3" style={{ float:"right", minWidth:150 }} bsStyle="success" onClick={this.toggleEditMode}>
                                        <i className="fa fa-edit" style={{ marginRight: 2 }} />
                                        {this.state.editMode ? "Leave Edit Mode" : "Enter Edit Mode"}
                                    </Button> */}
                                {/* <Button className="col-md-2 col-xs-2" style={{ float:"right", minWidth:150 }} bsStyle="warning" onClick={this.savePresentation}>
                                        <i className="fa fa-edit" style={{ marginRight: 2 }} /> Export as PPT
                                    </Button> */}
                                <br/>

                                <span style={{ fontFamily: "INTUITIVE", fontSize: "20px", marginRight: "20px" }}><span style={{ fontSize: "50px", backgroundColor: "#F3F3F3", fontWeight: 'bold' }}>Dashboard</span> </span>
                                <div className="col-sm-12 col-xs-12" style={{ borderBottom: '3px solid maroon' }}>

                                    {/* <label> Add Component: </label> */}
                                    {/* <Button data-toggle="tooltip"   data-placement="bottom" title="Add Textbox" bsStyle="primary"
                                        onClick={this.addTextbox}   style={{ marginRight:5, marginLeft: 6 }}><i className="fa fa-font" /></Button> */}

                                    {/* <Button data-toggle="tooltip"   data-placement="bottom" title="Add Image"
                                        onClick={this.addImage}     style={{ backgroundColor:"#31B0D5", color:"white", border:"1px solid #31B0D5", marginRight:5 }}><i className="fa fa-image" /></Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Video"
                                        onClick={this.addVideo}     style={{ backgroundColor:"#D896FF", color:"white", border:"1px solid #D896FF", marginRight:160 }}><i className="fa fa-play-circle" /></Button> */}

                                    {/* <span style={{fontFamily:'Georgia', fontSize:18}}>Page Number</span>
                                    <Button data-toggle="tooltip" data-placement="bottom" title = "Previous Page" bsStyle="warning" bsSize="small" onClick={this.previousPage}
                                        style={{ marginRight: 10, marginLeft: 10}}>
                                        <svg height="15" preserveAspectRatio="xMinYMax meet" viewBox="0 0 17 17" width="24">
                                            <path d="M0-.5h24v24H0z" fill="none"></path>
                                            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" className="jWRuRT"></path>
                                        </svg>
                                    </Button>                                   
                                    <span style={{fontFamily:'Georgia', fontSize:18}}>{this.state.pageNo+1}</span>
                                    <Button data-toggle="tooltip" data-placement="bottom" title = "Next Page" bsStyle="warning" bsSize="small" onClick={this.nextPage}
                                        style={{ marginLeft: 10}}>
                                        <svg height="15" preserveAspectRatio="xMinYMax meet" viewBox="0 0 17 17" width="24">
                                            <path d="M0-.5h24v24H0z" fill="none"></path>
                                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" className="jWRuRT"></path>
                                        </svg>
                                    </Button>

                                    <Button bsStyle="default" bsSize="small" onClick={this.saveTemplate}
                                        style={{ marginLeft: 10, color:'orange', border:'none' }}> <i className="fa fa-save fa-2x" />
                                    </Button> */}
                                </div>

                                {/* this is for the figures on top */}



                                <div id="container" ref={this.myInput} className="col-sm-12 col-xs-12" style={{ backgroundColor: 'white', height: "calc(100% + 500px)", marginTop: 15, display: "inline-flex" , overflow:"scroll", marginLeft:"10px", maxHeight:this.state.halfHeight}}>
                                    {/* map does a for loop over all the components in the state */}
                                    {this.state.components[this.state.pageNo].map((item, i) => {
                                        if (item.display) {
                                            return <div key={this.state.pageNo + "," + i}
                                                style={{
                                                    width: "47%",
                                                    marginLeft:10
                                                }}
                                            >
                                            
                                            <div style={{ height: 27.5, float: "right" }}>
                                                    <i style={{ marginTop: 10, marginRight: 6,  }} className="fa fa-wrench"
                                                        onClick={() => this.changeSettings(i)}></i>
                                                </div>
                                                 
                                                <ReportComponent type={item.type} editMode={this.state.editMode}
                                                    properties={item.properties} i={i}
                                                    updateProperties={this.updateProperties.bind(this)}
                                                    
                                                />
                                                
                                            </div>
                                        }
                                    })}
                                    {/*<i style={{ zIndex: 99, marginTop: 10, marginRight: 6,display:this.state.isBarPic}} className="fa fa-wrench"
                                                        onClick={() => this.addBarChart()}></i>
                                    <img  src = "assets/images/barchartsample.png" style={{float:"left",display:this.state.isBarPic, width:"48%", marginTop:-40}}></img>
                                     <i style={{ zIndex: 99, marginTop: 10, marginRight: 6,float:"right", display:this.state.isLinePic}} className="fa fa-wrench"
                                                        onClick={() => this.addLineChart()}></i>
                                                    
                                    <img src = "assets/images/linechartsample.png" style={{float:"right",display:this.state.isLinePic, width:"48%"}}></img>*/}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        let self = this;
        let {title, datasourceId, datasetId, xAxis, yAxis, aggregate, summary} = this.props.properties;
        console.log("props.properties" + this.props.properties);
        request.post({
            url: api + "getChartDetails",
            json: true,
            body: { operation: "getChartDetails", datasourceId: datasourceId, datasetId: datasetId }
        }, function (error, response, body) {
            if(body){
                console.log(body);
                self.initialize(title, body.datasourceUrl, datasourceId, datasetId, body.path, xAxis, yAxis, aggregate, summary, function(){}); //dion changed
            }
        });
    }

    initialize (title, datasourceUrl, datasourceId, datasetId, path, xAxis, yAxis, aggregate, summary, callback) {
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
                console.log(aggregatedData);
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
                    datasourceId: datasourceId,
                    datasetId: datasetId,
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
        console.log(values);
        let self = this;
        let {title, datasourceUrl, datasourceId, datasetId, path, xAxis, yAxis, summary} = values;
        let aggregate = "sum"; // should get from form

        this.initialize(title, datasourceUrl, datasourceId, datasetId, path, xAxis, yAxis, aggregate, summary, function(){
            let { chartData, summaryData, ...other } = self.state;
            self.props.updateProperties(other, self.props.i);
        });
    }   

    render() {
        return (
            <div  style={{ zIndex: 99}}>
                { this.state.initialized ?
                    <div>
                        <p style={{ fontFamily: 'Georgia', textAlign: "center", fontSize: 20, }}> {this.state.title} </p>
                        <BarChart data={this.state.chartData} width={400} height={300}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Text/>
                            <XAxis dataKey={this.state.xAxis}>
                                <Label value={this.state.xAxis} offset={-5} position="insideBottom" />
                            </XAxis>
                            <YAxis dataKey={this.state.yAxis}>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey={this.state.yAxis} fill="#CD5C5C" isAnimationActive={false}/>
                            {/* <Bar dataKey="neutral" fill="orange" /> */}
                            {/* <Bar dataKey="negative" fill="grey" /> */}

                            <Legend verticalAlign="top" height={20} />
                        </BarChart>
                       
                        {this.state.summary ? <Descriptive summaryData={this.state.summaryData}/> : ""}
                    </div>
                    : <ChartForm initializeChart={this.initializeChart} style={{width:"90%"}} />
                }
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
            body: { operation: "loadDatasource", companyId: document.getElementById("companyId").value }
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
        formProps.values.datasourceId = parseInt(datasourceId,10);
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
        formProps.values.datasetId = parseInt(datasetId,10);
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
                    datasourceId:0,
                    datasetId:0
                }}

                // pass values to the charts
                onSubmit={this.props.initializeChart}

                // render form
                render={formProps=>(
                    <Form className="form-horizontal " style={{ height:"100%", width:"90%", backgroundColor:"white", textAligh:"center",marginTop:"20px"}}>
                        <div className="form-group">
                            <label>Chart Title</label>
                            <div>
                                <Field className="form-control nonDraggable" type="text" name="title" placeholder="Chart Title" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Choose the datasource</label>
                            <div>
                                <Field className="form-control" component="select" name="datasource" onChange={(e)=>this.loadDataset(e.target.value, formProps)}>
                                    {self.state.datasources.map((datasource)=>
                                        <option key={"datasource" + datasource.id} value={datasource.id}>{datasource.name}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Choose the dataset</label>
                            <div>
                                <Field className="form-control" component="select" name="path" onChange={(e)=>this.loadListOptions(e.target, formProps)}>
                                    {self.state.datasets.map((dataset)=>
                                        <option key={"path" + dataset.id} value={dataset.id}>{dataset.name}</option>
                                    )}  
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label >Choose the X&#8209;Axis</label>
                            <div >
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
                            <label>Choose the Y&#8209;Axis</label>
                            <div>
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
                        <Button className="col-md-offset-3 col-md-7" style={{backgroundColor:"#E0E0E0"}} type="submit">Submit</Button>
                        
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
            <div>
                <BootstrapTable keyField='id' data={products}
                    columns={columns}
                    //cellEdit={cellEditFactory({ mode: 'dbclick' })}
                    rowStyle={rowStyle}>
                </BootstrapTable>
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
        let self = this;
        let {title, datasourceId, datasetId, xAxis, yAxis, aggregate, summary} = this.props.properties;
        request.post({
            url: api + "getChartDetails",
            json: true,
            body: { operation: "getChartDetails", datasourceId: datasourceId, datasetId: datasetId }
        }, function (error, response, body) {
            if(body){
                console.log(body);
                self.initialize(title, body.datasourceUrl, datasourceId, datasetId, body.path, xAxis, yAxis, aggregate, summary, function(){});
            }
        });
    }

    initialize (title, datasourceUrl, datasourceId, datasetId, path, xAxis, yAxis, aggregate, summary, callback) {
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
                    datasourceId: datasourceId,
                    datasetId: datasetId,
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
        console.log(values);
        let self = this;
        let {title, datasourceUrl, datasourceId, datasetId, path, xAxis, yAxis, summary} = values;
        let aggregate = "sum"; // should get from form

        this.initialize(title, datasourceUrl, datasourceId, datasetId, path, xAxis, yAxis, aggregate, summary, function(){
            let { chartData, summaryData, datasourceUrl, path, ...other } = self.state;
            self.props.updateProperties(other, self.props.i);
        });
    }   

    render() {
        return (
            <div style={{ zIndex: 99}}>
                {this.state.initialized ?
                    <div style={{width:"90%"}}>
                        <p style={{ fontFamily: 'Georgia', textAlign: "center", fontSize: 20, }}> {this.state.title} </p>
                        <LineChart  width={400} height={300} data={this.state.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={this.state.xAxis}>
                                <Label value={this.state.xAxis}offset={-5} position="insideBottom" />
                            </XAxis>
                            <YAxis dataKey={this.state.yAxis}>
                            </YAxis>
                            <Tooltip />
                            <Legend verticalAlign="top" height={20} />
                            <Line type="monotone" dataKey={this.state.yAxis} stroke="#8884d8" />
                        </LineChart>
                        
                        {this.state.summary ? <Descriptive summaryData={this.state.summaryData}/> : ""}
                    </div>
                    : <ChartForm initializeChart={this.initializeChart} style={{width:"90%"}}/>
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

ReactDOM.render(<DashboardApp/>, document.getElementById('reportContainer'));