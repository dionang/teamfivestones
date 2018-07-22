const {BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} = Recharts;
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

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // initial state has two line charts
            components: [
                {type:"line", x:10, y:10, height:200, width:300, data:lineChartData},
                {type:"bar", x:320, y:10, height:300, width:400, data:barChartData}
            ]
        }
    }

    addBarChart(){
        let components = this.state.components;
        // adds new component to state
        components.push(
            {type:"bar", x:0, y:0, height:200, width:300, data:barChartData}
        );

        // updates state
        this.setState({components});
    }

    addLineChart(){
        let components = this.state.components;
        // adds new component to state
        components.push(
            {type:"line", x:0, y:0, height:200, width:300, data:lineChartData}
        );

        // updates state
        this.setState({components});
    }

    getComponentDetails(){
        console.log(this.state.components);
    }

    render () {
        // "self" references the App component, as "this" may be changed when in method scope
        let self = this;
        return (
            <div>
                <button onClick={()=>this.addBarChart()}>Add Bar Chart</button>
                <button onClick={()=>this.addLineChart()}>Add Line Chart</button>
                <button onClick={()=>this.getComponentDetails()}>Get Component Details</button>
                <div id="container">
                    {/* map does a for loop over all the components in the state */}
                    {this.state.components.map((item,i)=>
                        <Rnd style={{border: "1px solid grey"}}
                            // intialize components x,y,height and width
                            default={{
                                x: item.x,
                                y: item.y,
                                width: item.width,
                                height: item.height
                            }}

                            // update height and width onResizeStop
                            // onResizeStop will activate a callback function containing these params
                            // ref represents item that was resized
                            onResizeStop={(event, dir, ref)=>{
                                // i represents index of current item in this.state.components
                                // convert style data to integer. e.g. 10px -> 10
                                // good practice to not update state directly, but through setState
                                let components = self.state.components;
                                components[i].height = parseInt(ref.style.height,10);
                                components[i].width = parseInt(ref.style.width,10);
                                self.setState({components});
                                console.log(components);
                            }}

                            // update height and width onResizeStop
                            // onDragStop will activate a callback function containing these params
                            // ref represents item that was dragged
                            onDragStop={(event, ref)=>{
                                // i represents index of current item in this.state.components
                                let components = self.state.components;
                                components[i].x = ref.x;
                                components[i].y = ref.y;
                                self.setState({components});
                                console.log(components);
                            }}
                        >
                            <ReportComponent type={item.type} data={item.data}/>
                        </Rnd>
                    )}
                </div>
            </div>
        ) 
    }
}

class ReportComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // based on the item type, render a type of component
        if (this.props.type === "line") {
            return(
                <ResponsiveContainer width="100%" height="100%">
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
                <ResponsiveContainer width="100%" height="100%">
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
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);