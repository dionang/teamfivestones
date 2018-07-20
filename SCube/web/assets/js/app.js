const {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class SimpleLineChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            width: 600,
            height: 300
        }
    }
    
    toggleSize() {
        console.log("clicked");
        if(this.state.width === 600 && this.state.height === 300){
            this.setState({width:400, height:200});
        } else {
            this.setState({width:600, height:300});
        }
    }
    
    render () {
  	const divStyle = {border: "1px solid"};
        return (
            <Rnd id="lineChart" style={divStyle} default={{
                x: 0,
                y: 0,
                width: 400,
                height: 250
            }}>
                <ResponsiveContainer width={"100%"} height="100%">
                    <LineChart width={"100%"} height={"100%"} data={data} >
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </Rnd>
        );
    }
};

ReactDOM.render(
    <SimpleLineChart />,
    document.getElementById('container')
);