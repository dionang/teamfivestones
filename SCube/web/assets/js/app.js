import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request';
import RichTextEditor from 'react-rte';
import Rnd from 'react-rnd';
import Img from 'react-image';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { Formik, Form, Field } from 'formik';

const Component = React.Component;
const api = 'http://localhost:8084/';
const datasourceUrl = 'http://localhost:8084/Dummy_API/getFurnituresByCategory?category=Furniture';

const apiData = 
{
  "status": "success",
  "furnitures": [
    {
      "Name": "Bush Somerset Collection Bookcase",
      "Sales": 261.96,
      "Quantity": 2,
      "Discount": 0.0,
      "Profit": 41.9136,
      "Ship Mode": "Second Class",
      "Order Date": "8/11/2016",
      "Region": "South"
    },
    {
      "Name": "Hon Deluxe Fabric Upholstered Stacking Chairs, Rounded Back",
      "Sales": 731.94,
      "Quantity": 3,
      "Discount": 0.0,
      "Profit": 219.582,
      "Ship Mode": "Second Class",
      "Order Date": "8/11/2016",
      "Region": "South"
    },
    {
      "Name": "Bretford CR4500 Series Slim Rectangular Table",
      "Sales": 957.5775,
      "Quantity": 5,
      "Discount": 0.45,
      "Profit": -383.031,
      "Ship Mode": "Standard Class",
      "Order Date": "11/10/2015",
      "Region": "South"
    },
    {
      "Name": "Eldon Expressions Wood and Plastic Desk Accessories, Cherry Wood",
      "Sales": 48.86,
      "Quantity": 7,
      "Discount": 0.0,
      "Profit": 14.1694,
      "Ship Mode": "Standard Class",
      "Order Date": "9/6/2014",
      "Region": "West"
    },
    {
      "Name": "Chromcraft Rectangular Conference Tables",
      "Sales": 1706.184,
      "Quantity": 9,
      "Discount": 0.2,
      "Profit": 85.3092,
      "Ship Mode": "Standard Class",
      "Order Date": "9/6/2014",
      "Region": "West"
    },
    {
      "Name": "Global Deluxe Stacking Chair, Gray",
      "Sales": 71.372,
      "Quantity": 2,
      "Discount": 0.3,
      "Profit": -1.0196,
      "Ship Mode": "Second Class",
      "Order Date": "16/7/2017",
      "Region": "East"
    },
    {
      "Name": "Bretford CR4500 Series Slim Rectangular Table",
      "Sales": 1044.63,
      "Quantity": 3,
      "Discount": 0.0,
      "Profit": 240.2649,
      "Ship Mode": "Standard Class",
      "Order Date": "25/9/2015",
      "Region": "West"
    },
    {
      "Name": "Riverside Palais Royal Lawyers Bookcase, Royale Cherry Finish",
      "Sales": 3083.43,
      "Quantity": 7,
      "Discount": 0.5,
      "Profit": -1665.0522,
      "Ship Mode": "Standard Class",
      "Order Date": "17/9/2015",
      "Region": "East"
    },
    {
      "Name": "Howard Miller 13-3/4\" Diameter Brushed Chrome Round Wall Clock",
      "Sales": 124.2,
      "Quantity": 3,
      "Discount": 0.2,
      "Profit": 15.525,
      "Ship Mode": "Standard Class",
      "Order Date": "17/9/2015",
      "Region": "East"
    },
    {
      "Name": "Electrix Architect\u0027s Clamp-On Swing Arm Lamp, Black",
      "Sales": 190.92,
      "Quantity": 5,
      "Discount": 0.6,
      "Profit": -147.963,
      "Ship Mode": "First Class",
      "Order Date": "8/12/2016",
      "Region": "Central"
    },
    {
      "Name": "Atlantic Metals Mobile 3-Shelf Bookcases, Custom Colors",
      "Sales": 532.3992,
      "Quantity": 3,
      "Discount": 0.32,
      "Profit": -46.9764,
      "Ship Mode": "Standard Class",
      "Order Date": "27/12/2015",
      "Region": "Central"
    },
    {
      "Name": "Global Fabric Manager\u0027s Chair, Dark Gray",
      "Sales": 212.058,
      "Quantity": 3,
      "Discount": 0.3,
      "Profit": -15.147,
      "Ship Mode": "Standard Class",
      "Order Date": "27/12/2015",
      "Region": "Central"
    },
    {
      "Name": "Longer-Life Soft White Bulbs",
      "Sales": 6.16,
      "Quantity": 2,
      "Discount": 0.0,
      "Profit": 2.9568,
      "Ship Mode": "Standard Class",
      "Order Date": "18/4/2015",
      "Region": "Central"
    },
    {
      "Name": "Global Leather Task Chair, Black",
      "Sales": 89.99,
      "Quantity": 1,
      "Discount": 0.0,
      "Profit": 17.0981,
      "Ship Mode": "Standard Class",
      "Order Date": "18/4/2015",
      "Region": "Central"
    },
    {
      "Name": "Novimex Turbo Task Chair",
      "Sales": 319.41,
      "Quantity": 5,
      "Discount": 0.1,
      "Profit": 7.098,
      "Ship Mode": "First Class",
      "Order Date": "17/6/2016",
      "Region": "East"
    },
    {
      "Name": "Luxo Economy Swing Arm Lamp",
      "Sales": 79.76,
      "Quantity": 4,
      "Discount": 0.0,
      "Profit": 22.3328,
      "Ship Mode": "Standard Class",
      "Order Date": "24/11/2015",
      "Region": "West"
    },
    {
      "Name": "Global Value Mid-Back Manager\u0027s Chair, Gray",
      "Sales": 213.115,
      "Quantity": 5,
      "Discount": 0.3,
      "Profit": -15.2225,
      "Ship Mode": "Standard Class",
      "Order Date": "30/4/2015",
      "Region": "Central"
    },
    {
      "Name": "High-Back Leather Manager\u0027s Chair",
      "Sales": 831.936,
      "Quantity": 8,
      "Discount": 0.2,
      "Profit": -114.3912,
      "Ship Mode": "Standard Class",
      "Order Date": "26/4/2015",
      "Region": "South"
    },
    {
      "Name": "Tenex Traditional Chairmats for Medium Pile Carpet, Standard Lip, 36\" x 48\"",
      "Sales": 97.04,
      "Quantity": 2,
      "Discount": 0.2,
      "Profit": 1.213,
      "Ship Mode": "Standard Class",
      "Order Date": "26/4/2015",
      "Region": "South"
    },
    {
      "Name": "6\" Cubicle Wall Clock, Black",
      "Sales": 9.708,
      "Quantity": 3,
      "Discount": 0.6,
      "Profit": -5.8248,
      "Ship Mode": "First Class",
      "Order Date": "9/12/2017",
      "Region": "Central"
    },
    {
      "Name": "Eldon Expressions Desk Accessory, Wood Pencil Holder, Oak",
      "Sales": 19.3,
      "Quantity": 5,
      "Discount": 0.6,
      "Profit": -14.475,
      "Ship Mode": "Second Class",
      "Order Date": "26/11/2014",
      "Region": "Central"
    },
    {
      "Name": "Novimex Swivel Fabric Task Chair",
      "Sales": 301.96,
      "Quantity": 2,
      "Discount": 0.0,
      "Profit": 33.2156,
      "Ship Mode": "Second Class",
      "Order Date": "28/5/2017",
      "Region": "South"
    },
    {
      "Name": "Seth Thomas 13 1/2\" Wall Clock",
      "Sales": 53.34,
      "Quantity": 3,
      "Discount": 0.0,
      "Profit": 16.5354,
      "Ship Mode": "Second Class",
      "Order Date": "31/1/2015",
      "Region": "Central"
    },
    {
      "Name": "9-3/4 Diameter Round Wall Clock",
      "Sales": 96.53,
      "Quantity": 7,
      "Discount": 0.0,
      "Profit": 40.5426,
      "Ship Mode": "Second Class",
      "Order Date": "9/11/2017",
      "Region": "East"
    }
  ],
  "customers": [
    {
      "Customer ID": "CG-12520",
      "Customer Name": "Claire Gute",
      "City": "Henderson",
      "Ship Mode": "Second Class",
      "Order ID": "CA-2016-152156",
      "Order Date": "8/11/2016"
    },
    {
      "Customer ID": "CG-12520",
      "Customer Name": "Claire Gute",
      "City": "Henderson",
      "Ship Mode": "Second Class",
      "Order ID": "CA-2016-152156",
      "Order Date": "8/11/2016"
    },
    {
      "Customer ID": "SO-20335",
      "Customer Name": "Sean O\u0027Donnell",
      "City": "Fort Lauderdale",
      "Ship Mode": "Standard Class",
      "Order ID": "US-2015-108966",
      "Order Date": "11/10/2015"
    },
    {
      "Customer ID": "BH-11710",
      "Customer Name": "Brosina Hoffman",
      "City": "Los Angeles",
      "Ship Mode": "Standard Class",
      "Order ID": "CA-2014-115812",
      "Order Date": "9/6/2014"
    },
    {
      "Customer ID": "BH-11710",
      "Customer Name": "Brosina Hoffman",
      "City": "Los Angeles",
      "Ship Mode": "Standard Class",
      "Order ID": "CA-2014-115812",
      "Order Date": "9/6/2014"
    },
    {
      "Customer ID": "SF-20065",
      "Customer Name": "Sandra Flanagan",
      "City": "Philadelphia",
      "Ship Mode": "Second Class",
      "Order ID": "US-2017-156909",
      "Order Date": "16/7/2017"
    },
    {
      "Customer ID": "EB-13870",
      "Customer Name": "Emily Burns",
      "City": "Orem",
      "Ship Mode": "Standard Class",
      "Order ID": "CA-2015-106320",
      "Order Date": "25/9/2015"
    },
    {
      "Customer ID": "TB-21520",
      "Customer Name": "Tracy Blumstein",
      "City": "Philadelphia",
      "Ship Mode": "Standard Class",
      "Order ID": "US-2015-150630",
      "Order Date": "17/9/2015"
    },
    {
      "Customer ID": "TB-21520",
      "Customer Name": "Tracy Blumstein",
      "City": "Philadelphia",
      "Ship Mode": "Standard Class",
      "Order ID": "US-2015-150630",
      "Order Date": "17/9/2015"
    },
    {
      "Customer ID": "GH-14485",
      "Customer Name": "Gene Hale",
      "City": "Richardson",
      "Ship Mode": "First Class",
      "Order ID": "CA-2016-117590",
      "Order Date": "8/12/2016"
    },
    {
      "Customer ID": "SN-20710",
      "Customer Name": "Steve Nguyen",
      "City": "Houston",
      "Ship Mode": "Standard Class",
      "Order ID": "CA-2015-117415",
      "Order Date": "27/12/2015"
    },
    {
      "Customer ID": "SN-20710",
      "Customer Name": "Steve Nguyen",
      "City": "Houston",
      "Ship Mode": "Standard Class",
      "Order ID": "CA-2015-117415",
      "Order Date": "27/12/2015"
    },
    {
      "Customer ID": "DP-13000",
      "Customer Name": "Darren Powers",
      "City": "New Albany",
      "Ship Mode": "Standard Class",
      "Order ID": "CA-2015-115742",
      "Order Date": "18/4/2015"
    },
    {
      "Customer ID": "DP-13000",
      "Customer Name": "Darren Powers",
      "City": "New Albany",
      "Ship Mode": "Standard Class",
      "Order ID": "CA-2015-115742",
      "Order Date": "18/4/2015"
    },
    {
      "Customer ID": "TB-21055",
      "Customer Name": "Ted Butterfield",
      "City": "Troy",
      "Ship Mode": "First Class",
      "Order ID": "CA-2016-111682",
      "Order Date": "17/6/2016"
    },
    {
      "Customer ID": "KM-16720",
      "Customer Name": "Kunst Miller",
      "City": "Los Angeles",
      "Ship Mode": "Standard Class",
      "Order ID": "CA-2015-135545",
      "Order Date": "24/11/2015"
    },
    {
      "Customer ID": "PS-18970",
      "Customer Name": "Paul Stevenson",
      "City": "Chicago",
      "Ship Mode": "Standard Class",
      "Order ID": "US-2015-164175",
      "Order Date": "30/4/2015"
    },
    {
      "Customer ID": "JE-15745",
      "Customer Name": "Joel Eaton",
      "City": "Memphis",
      "Ship Mode": "Standard Class",
      "Order ID": "US-2015-134026",
      "Order Date": "26/4/2015"
    },
    {
      "Customer ID": "JE-15745",
      "Customer Name": "Joel Eaton",
      "City": "Memphis",
      "Ship Mode": "Standard Class",
      "Order ID": "US-2015-134026",
      "Order Date": "26/4/2015"
    },
    {
      "Customer ID": "KB-16600",
      "Customer Name": "Ken Brennan",
      "City": "Houston",
      "Ship Mode": "First Class",
      "Order ID": "US-2017-118038",
      "Order Date": "9/12/2017"
    },
    {
      "Customer ID": "JE-15745",
      "Customer Name": "Joel Eaton",
      "City": "Houston",
      "Ship Mode": "Second Class",
      "Order ID": "US-2014-147606",
      "Order Date": "26/11/2014"
    },
    {
      "Customer ID": "PO-18865",
      "Customer Name": "Patrick O\u0027Donnell",
      "City": "Columbia",
      "Ship Mode": "Second Class",
      "Order ID": "CA-2017-140088",
      "Order Date": "28/5/2017"
    },
    {
      "Customer ID": "KB-16315",
      "Customer Name": "Karl Braun",
      "City": "Minneapolis",
      "Ship Mode": "Second Class",
      "Order ID": "CA-2015-149587",
      "Order Date": "31/1/2015"
    },
    {
      "Customer ID": "PN-18775",
      "Customer Name": "Parhena Norris",
      "City": "New York City",
      "Ship Mode": "Second Class",
      "Order ID": "CA-2017-161018",
      "Order Date": "9/11/2017"
    }
  ]
};

const jsonProcessor = new JsonProcessor(apiData);
const datasets = jsonProcessor.getDatasetNames();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial state has two line charts
            components: [
                // {type:"table", x:0, y:0, height:200, width:200}
                // {type:"image", x:0, y:0, height:200, width:200, properties: {imageUrl:''}}
                // {type:"line", x:10, y:10, height:200, width:300, data:lineChartData},
                {type:"bar", x:320, y:10, height:300, width:400, display:true,
                    properties:{
                        initialized:true, 
                        datasourceUrl:'http://localhost:8084/Dummy_API/getFurnituresByCategory?category=Furniture', 
                        dataset:'furnitures',
                        title: 'Furniture Sales By Region',  
                        xAxis:'Region', 
                        yAxis:'Sales',
                        aggregate:'sum'
                    }
                },
                // {type:"text", x:10, y:310, height:100, width:150, properties:{text:"<p>Hello World!</p>"}},
                // {type:"basic", x:0, y:0, height:300, width:200}
            ]
        }
    }

    addTextbox = () => {
        let components = this.state.components;
        components.push(
            {type:"text", x:0, y:0, height:50, width:200, display:true, properties:{text:"<p><br></p>"}}
        );

        this.setState({components});
    }

    addBarChart = () => {
        let components = this.state.components;
        // adds new component to state
        components.push(
            {type:"bar", x:0, y:0, height:200, width:300, display:true,
                properties:{
                    initialized:false, 
                    datasourceUrl:'', 
                    dataset:'', 
                    title: '', 
                    xAxis:'', 
                    yAxis:''
                }
            }
        );

        // updates state
        this.setState({components});
    }

    addLineChart = () => {
        let components = this.state.components;
        components.push(
            {type:"line", x:0, y:0, height:200, width:300, display:true,
                properties:{
                    initialized:false,
                    datasourceUrl:'', 
                    dataset:'', 
                    title: '', 
                    xAxis:'',
                    yAxis:''
                }
            }
        );

        this.setState({components});
    }


    addTable = () => {
        let components = this.state.components;
        components.push(
            {type:"table", x:0, y:0, height:200, width:300, display:true}
        );

        this.setState({components});
    }

    addImage = () =>{
        let components = this.state.components;
        components.push(
            {type:"image", x:0, y:0, height:200, width:200, display:true, properties: {imageUrl:''}}
        );
        this.setState({components});
    }

    changeSettings(i) {
        let components = this.state.components;
        components[i].properties.initialized = false;
        this.setState({components});
    }
    
    deleteComponent(i) {
        let components = this.state.components;
        components[i].display = false;
        this.setState({components});
    }

    getComponentDetails = () => {
        console.log(this.state.components);
    }

    loadTemplate = () => {
        let self = this;
        let templateId = parseInt(document.getElementById("template").value, 10);
        request.post({
            url:  api + 'loadComponents',
            json: true,
            body: {operation:"loadComponents", templateId: templateId}
        }, function(error, response, body){
            let components = body.components;
            // for (let component of components){
            //     if (component.type === "bar") {
            //         component.data = barChartData;
            //     } else if (component.type === "line") {
            //         component.data = lineChartData;
            //     }
            // }
            // console.log(body);
            self.setState({components});
        });
    }

    saveTemplate = () => {
        let templateId = parseInt(document.getElementById("template").value, 10);
        request.post({
            url:  api + 'saveComponents',
            json: true,
            body: {operation:"saveComponents", templateId: templateId, components:this.state.components}
        }, function(error, response, body){
            console.log(body);
        });
    }

    // i represents index of current item in this.state.components
    // convert style data to integer. e.g. 10px -> 10
    onResize (ref, pos, i){
        let components = this.state.components;
        components[i].height = parseInt(ref.style.height,10);
        components[i].width = parseInt(ref.style.width,10);
        components[i].x = pos.x;
        components[i].y = pos.y;
        this.setState({components});
    }

    onDragStop (ref, i){
        let components = this.state.components;
        components[i].x = ref.x;
        components[i].y = ref.y;
        this.setState({components});
    }

    updateProperties = (properties, i) => {
        let components = this.state.components;
        components[i].properties = properties;
        this.setState({properties});
    }

    render() {
        return (
            <div>
                <button onClick={this.addTextbox}>Add Textbox</button>
                <button onClick={this.addBarChart}>Add Bar Chart</button>
                <button onClick={this.addLineChart}>Add Line Chart</button>
                <button onClick={this.addTable}>Add Table</button>
                <button onClick={this.getComponentDetails}>Get Component Details</button>
                <button onClick={this.addImage}>Add Image</button>
                <button onClick={this.saveTemplate}>Save Template</button>
                <button onClick={this.loadTemplate}>Load Template</button>
                <input type="number" id="template" defaultValue="1"/>
                <div id="container">
                    {/* map does a for loop over all the components in the state */}
                    {this.state.components.map((item,i)=>{
                        if (item.display){
                            return <Rnd key={i} style={{border: "1px solid grey"}}
                                // intialize components x,y,height and width
                                position = {{x: item.x, y: item.y}}
                                size = {{width: item.width, height: item.height}}

                                // min height and size
                                minHeight={80} minWidth={120}

                                // to limit the drag area to a particular class
                                cancel={".nonDraggable"}
                                dragHandleClassName={"draggable"}

                                // update height and width onResizeStop
                                // onResizeStop will activate a callback function containing these params
                                // ref represents item that was resized
                                onResize={(event, dir, ref, delta, pos)=>this.onResize(ref, pos, i)}

                                // update height and width onResizeStop
                                // onDragStop will activate a callback function containing these params
                                // ref represents item that was dragged
                                onDragStop={(event, ref)=>this.onDragStop(ref,i)}
                            >
                                <div style={{float:"right"}}>
                                    <i style={{margin:2}} className="fa fa-wrench"
                                        onClick={()=>this.changeSettings(i)}></i>
                                    <i style={{margin:2}} className="fa fa-times"
                                        onMouseDown={()=>this.deleteComponent(i)}></i>
                                </div>
                                <ReportComponent type={item.type}
                                    properties={item.properties} i={i}
                                    updateProperties={this.updateProperties.bind(this)}    
                                />
                            </Rnd>
                        }
                    })}  
                </div>
            </div>
        ) 
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
                <Textbox i={this.props.i} text={this.props.properties.text} 
                    updateProperties={this.props.updateProperties} />
            );
        } else if (this.props.type === "basic"){
            return(
                <BasicForm/>
            )
        } else if (this.props.type ==="image"){
            return(
                <Image i={this.props.i}  
                    properties={this.props.properties}
                    updateProperties={this.props.updateProperties}/>
            )
        } else if (this.props.type ==="table"){
            return(
            <ResponsiveContainer className="draggable" height="100%" width="100%" boarder="none">
                <BasicTable/>
            </ResponsiveContainer>
            )
        }
    }
}

class Linechart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.properties,
            chartData:[]
        }
    }
    
    // update state of initialized when props change
    componentWillReceiveProps(nextProps){
        if (nextProps.properties.initialized != this.state.initialized){
            this.setState({initialized: nextProps.properties.initialized});
        }
    }

    // do API call to render chartData upon loading of component from DB
    componentWillMount(){
        let self = this;
        let url = this.props.properties.datasourceUrl;
        let aggregate = this.props.properties.aggregate;
        if (url){
            request.get({
                url: url,
            }, function(error, response, body){
                let data = JSON.parse(body);
                let chartData = data[self.props.properties.dataset];
                let xAxis = self.props.properties.xAxis;
                let yAxis = self.props.properties.yAxis;
                if (aggregate === ""){
                    chartData.sort((a, b) => a[xAxis] - b[xAxis]);
                } else {
                    chartData = new JsonProcessor().getAggregatedData(chartData, xAxis, yAxis, aggregate);
                }
                self.setState({chartData});
            });
        }
    }

    initializeChart = (values) => {
        //set settings of barchart
        let processor = values.processor;
        let datasourceUrl = values.datasourceUrl;
        let dataset = values.dataset;
        let data = processor.getDataset(dataset);

        let title = values.title;
        let xAxis = values.xAxis;
        let yAxis = values.yAxis;
        let aggregate = "";

        // if x-axis is non-categorical, 
        // sort data in ascending order by x-axis
        if (processor.getType(dataset, xAxis) !== "string"){
            data.sort((a, b) => a[xAxis] - b[xAxis]);
        } else {
            aggregate = "sum";
            data = processor.getAggregatedData(data, xAxis, yAxis, aggregate);
        }
        
        this.setState({
            initialized:true,
            datasourceUrl: datasourceUrl,
            dataset: dataset,
            title: title,
            xAxis: xAxis,
            yAxis: yAxis,
            aggregate: aggregate,
            chartData: data
        })
        
        let {chartData, ...other} = this.state;
        this.props.updateProperties(other, this.props.i);
    }

    render() {
        return this.state.initialized ?
            <ResponsiveContainer className="draggable" width="100%" height="100%">
                <LineChart style={{width:"100%", height:"100%"}} data={this.state.chartData}>
                    <XAxis dataKey={this.state.xAxis}/>
                    <YAxis dataKey={this.state.yAxis}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend />
                    <Tooltip />
                    <Line type="monotone" dataKey={this.state.yAxis} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
            :   <BasicForm initializeChart={this.initializeChart}/>
    }
}

class Barchart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.properties,
            chartData:[],
        }
    }
    
    // update state of initialized when props change
    componentWillReceiveProps(nextProps){
        if (nextProps.properties.initialized != this.state.initialized){
            this.setState({initialized: nextProps.properties.initialized});
        }
    }

    // do API call to render chartData upon loading of component from DB
    componentWillMount(){
        let self = this;
        let url = this.props.properties.datasourceUrl;
        let aggregate = this.props.properties.aggregate;
        if (url){
            request.get({
                url: url,
            }, function(error, response, body){
                let data = JSON.parse(body);
                let chartData = data[self.props.properties.dataset];
                let xAxis = self.props.properties.xAxis;
                let yAxis = self.props.properties.yAxis;
                if (aggregate === ""){
                    chartData.sort((a, b) => a[xAxis] - b[xAxis]);
                } else {
                    chartData = new JsonProcessor().getAggregatedData(chartData, xAxis, yAxis, aggregate);
                }
                self.setState({chartData});
            });
        }
    }

    initializeChart = (values) => {
        //set settings of barchart
        let processor = values.processor;
        let datasourceUrl = values.datasourceUrl;
        let dataset = values.dataset;
        let data = processor.getDataset(dataset);

        let title = values.title;
        let xAxis = values.xAxis;
        let yAxis = values.yAxis;
        let aggregate = "";

        // if x-axis is non-categorical, 
        // sort data in ascending order by x-axis
        if (processor.getType(dataset, xAxis) !== "string"){
            data.sort((a, b) => a[xAxis] - b[xAxis]);
        } else {
            aggregate = "sum";
            data = processor.getAggregatedData(data, xAxis, yAxis, aggregate);
        }
        
        this.setState({
            initialized:true,
            datasourceUrl: datasourceUrl,
            dataset: dataset,
            title: title,
            xAxis: xAxis,
            yAxis: yAxis,
            aggregate: aggregate,
            chartData: data
        })
        
        let {chartData, ...other} = this.state;
        this.props.updateProperties(other, this.props.i);
    }

    render() {
        return this.state.initialized ?
            <ResponsiveContainer className="draggable" width="100%" height="100%">
                <BarChart style={{width:"100%", height:"100%"}} data={this.state.chartData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.state.xAxis} />
                    <YAxis dataKey={this.state.yAxis} />
                    <Bar dataKey={this.state.yAxis} fill="blue" />
                    {/* <Bar dataKey="neutral" fill="orange" /> */}
                    {/* <Bar dataKey="negative" fill="grey" /> */}
                    <Legend/>
                    <Tooltip/>
                </BarChart>
            </ResponsiveContainer>
            :   <BasicForm initializeChart={this.initializeChart}/>
    }
}

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            file: '', 
            imageUrl: '', 
        };
    }

    imageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imageUrl: reader.result,
            });
            this.props.updateProperties({imageUrl: reader.result}, this.props.i);
        }

        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className="draggable" style={{height:"100%", width:"100%"}}>
                {this.state.imageUrl ? <Img style={{height:"100%", width:"100%"}} src={this.state.imageUrl} />
                : <div>
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
            value: RichTextEditor.createValueFromString(this.props.text, 'html'),
            htmlValue: this.props.text
        }
    }

    onChange(value){
        // converts the value in state
        this.setState({value:value, htmlValue:value.toString('html')});
        this.props.updateProperties({text:this.state.htmlValue}, this.props.i);
    };

    render() {
        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
              {label: 'Italic', style: 'ITALIC'},
              {label: 'Underline', style: 'UNDERLINE'}
            ]
        };

        return(
            <RichTextEditor
                rootStyle={{height:"calc(100% - 2px)", minHeight:80, minWidth:120}}
                value={this.state.value}
                onChange={(e)=>this.onChange(e)}
                toolbarConfig={toolbarConfig}
                toolbarClassName={"draggable"}
            />
        );
    }
}

class BasicForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Formik 
                // initialize values to use in form
                initialValues={{
                    title:'', 
                    dataset: datasets[0],
                    datasourceUrl: datasourceUrl,
                    xAxis: jsonProcessor.getOptions(datasets[0])[0], 
                    yAxis: jsonProcessor.getOptions(datasets[0])[0], 
                    processor:jsonProcessor
                }}

                // pass values to the charts
                onSubmit={this.props.initializeChart}

                // render form
                render={formProps=>(
                    <Form className="draggable" style={{textAlign: "center", zIndex: -1}}>
                        <label>Chart Title</label>
                        <Field className="nonDraggable" type="text" name="title" placeholder="Chart Title"/>
                        <br/><br/>
                        <label>Choose the dataset</label>
                        <Field component="select" name="dataset">
                            {datasets.map((dataset)=>
                                <option key={dataset}>{dataset}</option>
                            )}
                        </Field>
                        <br/><br/>
                        <label>Choose the X-Axis</label> 
                        <Field component="select" name="xAxis">
                            {/* gets the option based on selected dataset */}
                            {jsonProcessor.getOptions(formProps.values.dataset)
                            .map((option)=>
                                <option key={option}>{option}</option>
                            )}
                        </Field>
                        <br/><br/>
                        <label>Choose the Y-Axis</label> 
                        <Field component="select" name="yAxis">
                            {jsonProcessor.getOptions(formProps.values.dataset)
                            .map((option)=>
                                <option key={option}>{option}</option>
                            )}
                        </Field>
                        <br/><br/>
                        <button type="submit">Submit</button>
                        {/* <DisplayFormikState {...this.props}/> */}
                    </Form>
                )}
            />
        );
    }
}

class BasicTable extends React.Component {
    render() {
        const columns = [{
            dataField: 'id',
            text: 'Product ID',
            sort: true

        }, {
            dataField: 'name',
            text: 'Product Name',
            sort: true

        }, {
            dataField: 'price',
            text: 'Product Price',
            sort: true

        }];

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
        },{
            id: 5,
            name: "Product1",
            price: 120
        }];
        
        const rowStyle = { backgroundColor: '#c8e6c9' };

        return (
            <div>
                <BootstrapTable keyField='id' data={products}
                    columns={columns}
                    cellEdit={cellEditFactory({ mode: 'dbclick' })}
                    rowStyle={ rowStyle }>
                </BootstrapTable>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('container'));