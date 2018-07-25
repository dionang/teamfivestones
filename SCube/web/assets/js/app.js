import React from 'react';
import ReactDOM from 'react-dom';
import RichTextEditor from 'react-rte';
import Rnd from 'react-rnd';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import request from 'request';

const Component = React.Component;
const barChartData = [
    { name: 'Telstra', positive: 50, neutral: 20, negative: 2 },
    { name: 'Groupstar Public', positive: 40, neutral: 30, negative: 10 },
    { name: 'Orange', positive: 40, neutral: 45, negative: 4 },
    { name: 'Oracle', positive: 30, neutral: 10, negative: 20 }
];

const lineChartData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const api = 'http://localhost:8084/';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial state has two line charts
            components: [
                {type:"line", x:10, y:10, height:200, width:300, data:lineChartData},
                {type:"bar", x:320, y:10, height:300, width:400, data:barChartData},
                {type:"text", x:10, y:220, height:50, width:200, properties:{text:"<p>Hello World!</p>"}}
            ]
        }
    }

    addTextbox = () => {
        let components = this.state.components;
        components.push(
            {type:"text", x:0, y:0, height:50, width:200, properties:{text:"<p><br></p>"}}
        );

        this.setState({components});
    }

    addBarChart = () => {
        let components = this.state.components;
        // adds new component to state
        components.push(
            {type:"bar", x:0, y:0, height:200, width:300, data:barChartData}
        );

        // updates state
        this.setState({components});
    }

    addLineChart = () => {
        let components = this.state.components;
        components.push(
            {type:"line", x:0, y:0, height:200, width:300, data:lineChartData}
        );

        this.setState({components});
    }

    getForm = () =>{
        let components = this.state.components;
        components.push(
            {type:"basic"}
        );
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
            for (let component of components){
                if (component.type == "bar") {
                    component.data = barChartData;
                } else if (component.type == "line") {
                    component.data = lineChartData;
                }
            }
            console.log(body);
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
    onResizeStop (ref, i){
        let components = this.state.components;
        components[i].height = parseInt(ref.style.height,10);
        components[i].width = parseInt(ref.style.width,10);
        this.setState({components});
        console.log(components);
    }

    onDragStop (ref, i){
        let components = this.state.components;
        components[i].x = ref.x;
        components[i].y = ref.y;
        this.setState({components});
        console.log(components);
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
                <button onClick={this.getComponentDetails}>Get Component Details</button>
                <button onClick={this.getForm}>Show the form</button>
                <button onClick={this.saveTemplate}>Save Template</button>
                <button onClick={this.loadTemplate}>Load Template</button>
                <input type="number" id="template" defaultValue="1"/>
                <div id="container">
                    {/* map does a for loop over all the components in the state */}
                    {this.state.components.map((item,i)=>
                        <Rnd key={i} style={{border: "1px solid grey"}}
                            // intialize components x,y,height and width
                            position = {{x: item.x, y: item.y}}
                            size = {{width: item.width, height: item.height}}

                            // to limit the drag area to a particular class
                            dragHandleClassName={"dragHandle"}

                            // update height and width onResizeStop
                            // onResizeStop will activate a callback function containing these params
                            // ref represents item that was resized
                            onResizeStop={(event, dir, ref)=>this.onResizeStop(ref,i)}

                            // update height and width onResizeStop
                            // onDragStop will activate a callback function containing these params
                            // ref represents item that was dragged
                            onDragStop={(event, ref)=>this.onDragStop(ref,i)}
                        >
                            <ReportComponent type={item.type} data={item.data} 
                                properties={item.properties} i={i}
                                updateProperties={this.updateProperties.bind(this)}    
                            />
                        </Rnd>
                    )}  
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
                <ResponsiveContainer className="dragHandle" width="100%" height="100%">
                    <LineChart style={{width:"100%", height:"100%"}} data={this.props.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            );
        } else if (this.props.type === "bar") {
            return(
                <ResponsiveContainer className="dragHandle" width="100%" height="100%">
                    <BarChart style={{width:"100%", height:"100%"}} data={this.props.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="positive" fill="blue" />
                        <Bar dataKey="neutral" fill="orange" />
                        <Bar dataKey="negative" fill="grey" />
                    </BarChart>
                </ResponsiveContainer>
            );
        } else if (this.props.type === "text") {
            return(
                <Textbox i={this.props.i} text={this.props.properties.text} 
                    updateProperties={this.props.updateProperties}/>
            );
        } else if (this.props.type === "basic"){
            return(
                <ResponsiveContainer className="dragHandle" width="100%" height="100%">
                    <BasicForm ></BasicForm>
                </ResponsiveContainer>
                
            )
        }
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
                value={this.state.value}
                onChange={(e)=>this.onChange(e)}
                toolbarConfig={toolbarConfig}
                toolbarClassName={"dragHandle"}
                style={{width:"100%", height:"100%"}}
            />
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('container'));