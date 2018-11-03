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
const api = 'https://scube.rocks/SCube/';
//const api = 'http://18.222.40.231/SCube/';
const datasourceUrl = 'https://scube.rocks/SCube/Dummy_API/getCustomerOrders';

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
        }
    }

    componentDidMount(){
        this.getTemplateCount();
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

    renameTemplate = (e) => {
        this.setState({ templateName: e.target.value });
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

    render() {
        return (
            <div>
                <input type="hidden" id="templateId" value="1" />
                <input type="hidden" id="companyId" value="1" />
                <input type="hidden" id="userName" value="manager" />
                <div className={this.state.sidebar ? "nav-md" : "nav-sm"} id="main">
                    <div className="container body" style={{ margin: 0, padding: 0, width: "100%" }}>
                        <div className="main_container">
                            <div className="col-md-3 left_col">
                            <div className="left_col scroll-view">
                                <div className="navbar nav_title" style={{ border: 0 }}>
                                    <a className="site_title" style={{backgroundColor:"white",height:"57px"}}>
                                        <img src={this.state.sidebar ? "assets/images/logo.jpg" : "assets/images/logo1.jpg"}
                                            style={{
                                                height: this.state.sidebar ? 50 : 51,
                                                width: this.state.sidebar ? 100 : 50,
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
                                                <li><a href="slideShow.jsp"><i className="fa fa-envelope"/>  Email</a></li> 
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
                                               
                                                <img style={{marginLeft:2}} src="assets/images/man.png" />
                                                     {document.getElementById('profileName').value}
                                                <span className=" fa fa-angle-down"></span>
                                            </a>
                                                <ul className="dropdown-menu dropdown-usermenu pull-right">
                                                    <li><a href="javascript:;"> Profile</a></li>
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
                                    <br /><label style={{ margin: '0px', fontSize: "40px", width: '100%', border: "1px solid grey", }}>{this.state.templateCount}</label>
                                </div>

                                {/* <button className="btn btn-primary" id="changeSize" onClick={this.openModal} >Change Page Size</button> */}
                                {/* <Button bsStyle="info" onClick={this.getComponentDetails}>Get Component Details</Button> */}
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
                                <br />

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



                                <div id="container" ref={this.myInput} className="col-sm-12 col-xs-12" style={{ backgroundColor: 'white', height: "calc(100% + 500px)", marginTop: 15, display: "block" , overflow:"scroll", marginLeft:"10px", maxHeight:this.state.halfHeight}}>
                                    {/* map does a for loop over all the components in the state */}
                                    {this.state.components[this.state.pageNo].map((item, i) => {
                                        if (item.display) {
                                            return <div key={this.state.pageNo + "," + i}
                                                style={{
                                                    width: "47%",
                                                    display: "inline-block",
                                                    marginLeft:15
                                                }}
                                            >
                                                 <div style={{ height: 27.5, float: "right" }}>
                                                    <i style={{ marginTop: 10, marginRight: 6, visibility: this.state.editMode ? "" : "hidden" }} className="fa fa-wrench"
                                                        onClick={() => this.changeSettings(i)}></i>
                                                </div>
                                                <ReportComponent type={item.type} editMode={this.state.editMode}
                                                    properties={item.properties} i={i}
                                                    updateProperties={this.updateProperties.bind(this)}
                                                    
                                                />
                                            </div>
                                        }
                                    })}
                                    <i style={{ zIndex: 99, marginTop: 10, marginRight: 6,display:this.state.isBarPic}} className="fa fa-wrench"
                                                        onClick={() => this.addBarChart()}></i>
                                    <img  src = "assets/images/barchartsample.png" style={{float:"left",display:this.state.isBarPic, width:"49%"}}></img>
                                     <i style={{ zIndex: 99, marginTop: 10, marginRight: 6,float:"right", display:this.state.isLinePic}} className="fa fa-wrench"
                                                        onClick={() => this.addLineChart()}></i>
                                                    
                                    <img src = "assets/images/linechartsample.png" style={{float:"right",display:this.state.isLinePic, width:"49%"}}></img>

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
            <div  >
                { this.state.initialized ?
                    <div style={{ width:"90%" }}>
                        <p style={{ fontFamily: 'Georgia', textAlign: "center", fontSize: 20, }}> {this.state.title} </p>
                        {this.state.facetype ?
                        <BarChart data={this.state.chartData} width={500} height={400}>
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
                        <ResponsiveContainer style={{width:"90%"}}>
                            <BarChart data={this.state.chartData} width={500} height={400}>
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
                    <Form className="form-horizontal " style={{ height:"100%", width:"90%", backgroundColor:"white", textAligh:"center",marginTop:"20px"}}>
                        <div className="form-group">
                            <label >Chart Title</label>
                            <div >
                                <Field className="form-control nonDraggable" type="text" name="title" placeholder="Chart Title" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label >Choose the datasource</label>
                            <div >
                                <Field className="form-control" component="select" name="datasource" onChange={(e)=>this.loadDataset(e.target.value, formProps)}>
                                    {self.state.datasources.map((datasource)=>
                                        <option key={"datasource" + datasource.id} value={datasource.id}>{datasource.name}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label >Choose the dataset</label>
                            <div >
                                <Field className="form-control" component="select" name="path" onChange={(e)=>this.loadListOptions(e.target.value, formProps)}>
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
                            <label >Choose the Y&#8209;Axis</label>
                            <div >
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
            <div >
                {this.state.initialized ?
                    <div style={{width:"90%"}}>
                        <p style={{ fontFamily: 'Georgia', textAlign: "center", fontSize: 20, }}> {this.state.title} </p>
                        {this.state.facetype ?
                        <LineChart  width={500} height={400} data={this.state.chartData}>
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
                        <ResponsiveContainer>
                            <LineChart  width={500} height={400} data={this.state.chartData}>
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


            new_columns.push(column);
        }
        new_columns.push({
            dataField: 'col' + columns.length,
            text: 'Header ' + columns.length,
            headerEvents: {
                onClick: this.handleClick,
                onBlur: (e) => this.handleBlur(e,columns.length-1)
            }
        })

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
            <div className="draggable" style={{width:"100%"}}>
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

ReactDOM.render(<DashboardApp/>, document.getElementById('reportContainer'));