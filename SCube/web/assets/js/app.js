import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request';
import RichTextEditor from 'react-rte';
import Rnd from 'react-rnd';
import { Button, ButtonToolbar, SplitButton, MenuItem, Navbar } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { Formik, Form, Field } from 'formik';

const Component = React.Component;
//const api = 'http://localhost:8084/';
//const datasourceUrl = 'http://localhost:8084/Dummy_API/getCustomerOrders';
//const api = 'http://103.3.61.39:8080/SCube/';
//const datasourceUrl = 'http://103.3.61.39:8080/Dummy_API/getCustomerOrders';
const api = 'http://18.222.28.50/SCube/';
const datasourceUrl = 'http://18.222.28.50/Dummy_API/getCustomerOrders';

const apiData = 
{
  "customerOrders": [
    {
      "customerName": "A",
      "customerID": 110100,
      "purchaseDate": "2017-12-11",
      "discount": 0.3,
      "age": 29,
      "gender": "M",
      "noOfGoodsBought": 18,
      "totalPayment": 126
    },
    {
      "customerName": "A",
      "customerID": 110100,
      "purchaseDate": "2017-12-12",
      "discount": 0.3,
      "age": 29,
      "gender": "M",
      "noOfGoodsBought": 18,
      "totalPayment": 126
    },
    {
      "customerName": "A",
      "customerID": 110100,
      "purchaseDate": "2017-12-13",
      "discount": 0.3,
      "age": 29,
      "gender": "M",
      "noOfGoodsBought": 18,
      "totalPayment": 126
    },
    {
      "customerName": "A",
      "customerID": 110100,
      "purchaseDate": "2017-12-14",
      "discount": 0.3,
      "age": 29,
      "gender": "M",
      "noOfGoodsBought": 18,
      "totalPayment": 126
    },
    {
      "customerName": "AA",
      "customerID": 110123,
      "purchaseDate": "2017-12-11",
      "discount": 0.4,
      "age": 60,
      "gender": "M",
      "noOfGoodsBought": 15,
      "totalPayment": 90
    },
    {
      "customerName": "AA",
      "customerID": 110123,
      "purchaseDate": "2017-12-12",
      "discount": 0.4,
      "age": 60,
      "gender": "M",
      "noOfGoodsBought": 15,
      "totalPayment": 90
    },
    {
      "customerName": "AA",
      "customerID": 110123,
      "purchaseDate": "2017-12-13",
      "discount": 0.4,
      "age": 60,
      "gender": "M",
      "noOfGoodsBought": 15,
      "totalPayment": 90
    },
    {
      "customerName": "B",
      "customerID": 110101,
      "purchaseDate": "2017-12-11",
      "discount": 0.3,
      "age": 28,
      "gender": "F",
      "noOfGoodsBought": 2,
      "totalPayment": 14
    },
    {
      "customerName": "B",
      "customerID": 110101,
      "purchaseDate": "2017-12-12",
      "discount": 0.3,
      "age": 28,
      "gender": "F",
      "noOfGoodsBought": 2,
      "totalPayment": 14
    },
    {
      "customerName": "B",
      "customerID": 110101,
      "purchaseDate": "2017-12-13",
      "discount": 0.3,
      "age": 28,
      "gender": "F",
      "noOfGoodsBought": 2,
      "totalPayment": 14
    },
    {
      "customerName": "B",
      "customerID": 110101,
      "purchaseDate": "2017-12-14",
      "discount": 0.3,
      "age": 28,
      "gender": "F",
      "noOfGoodsBought": 2,
      "totalPayment": 14
    },
    {
      "customerName": "BB",
      "customerID": 110124,
      "purchaseDate": "2017-12-11",
      "discount": 0.2,
      "age": 53,
      "gender": "F",
      "noOfGoodsBought": 11,
      "totalPayment": 88
    },
    {
      "customerName": "BB",
      "customerID": 110124,
      "purchaseDate": "2017-12-12",
      "discount": 0.2,
      "age": 53,
      "gender": "F",
      "noOfGoodsBought": 11,
      "totalPayment": 88
    },
    {
      "customerName": "BB",
      "customerID": 110124,
      "purchaseDate": "2017-12-13",
      "discount": 0.2,
      "age": 53,
      "gender": "F",
      "noOfGoodsBought": 11,
      "totalPayment": 88
    },
    {
      "customerName": "BB",
      "customerID": 110124,
      "purchaseDate": "2017-12-14",
      "discount": 0.2,
      "age": 53,
      "gender": "F",
      "noOfGoodsBought": 11,
      "totalPayment": 88
    },
    {
      "customerName": "C",
      "customerID": 110102,
      "purchaseDate": "2017-12-11",
      "discount": 0.3,
      "age": 57,
      "gender": "F",
      "noOfGoodsBought": 6,
      "totalPayment": 42
    },
    {
      "customerName": "C",
      "customerID": 110102,
      "purchaseDate": "2017-12-12",
      "discount": 0.3,
      "age": 57,
      "gender": "F",
      "noOfGoodsBought": 6,
      "totalPayment": 42
    },
    {
      "customerName": "CC",
      "customerID": 110125,
      "purchaseDate": "2017-12-11",
      "discount": 0.1,
      "age": 46,
      "gender": "F",
      "noOfGoodsBought": 8,
      "totalPayment": 72
    },
    {
      "customerName": "CC",
      "customerID": 110125,
      "purchaseDate": "2017-12-12",
      "discount": 0.1,
      "age": 46,
      "gender": "F",
      "noOfGoodsBought": 8,
      "totalPayment": 72
    },
    {
      "customerName": "CC",
      "customerID": 110125,
      "purchaseDate": "2017-12-13",
      "discount": 0.1,
      "age": 46,
      "gender": "F",
      "noOfGoodsBought": 8,
      "totalPayment": 72
    },
    {
      "customerName": "CC",
      "customerID": 110125,
      "purchaseDate": "2017-12-14",
      "discount": 0.1,
      "age": 46,
      "gender": "F",
      "noOfGoodsBought": 8,
      "totalPayment": 72
    },
    {
      "customerName": "D",
      "customerID": 110103,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 51,
      "gender": "M",
      "noOfGoodsBought": 6,
      "totalPayment": 30
    },
    {
      "customerName": "D",
      "customerID": 110103,
      "purchaseDate": "2017-12-12",
      "discount": 0.5,
      "age": 51,
      "gender": "M",
      "noOfGoodsBought": 6,
      "totalPayment": 30
    },
    {
      "customerName": "DD",
      "customerID": 110126,
      "purchaseDate": "2017-12-11",
      "discount": 0.1,
      "age": 34,
      "gender": "M",
      "noOfGoodsBought": 13,
      "totalPayment": 117
    },
    {
      "customerName": "DD",
      "customerID": 110126,
      "purchaseDate": "2017-12-12",
      "discount": 0.1,
      "age": 34,
      "gender": "M",
      "noOfGoodsBought": 13,
      "totalPayment": 117
    },
    {
      "customerName": "DD",
      "customerID": 110126,
      "purchaseDate": "2017-12-13",
      "discount": 0.1,
      "age": 34,
      "gender": "M",
      "noOfGoodsBought": 13,
      "totalPayment": 117
    },
    {
      "customerName": "DD",
      "customerID": 110126,
      "purchaseDate": "2017-12-14",
      "discount": 0.1,
      "age": 34,
      "gender": "M",
      "noOfGoodsBought": 13,
      "totalPayment": 117
    },
    {
      "customerName": "E",
      "customerID": 110104,
      "purchaseDate": "2017-12-11",
      "discount": 0.1,
      "age": 37,
      "gender": "M",
      "noOfGoodsBought": 9,
      "totalPayment": 81
    },
    {
      "customerName": "E",
      "customerID": 110104,
      "purchaseDate": "2017-12-12",
      "discount": 0.1,
      "age": 37,
      "gender": "M",
      "noOfGoodsBought": 9,
      "totalPayment": 81
    },
    {
      "customerName": "EE",
      "customerID": 110127,
      "purchaseDate": "2017-12-11",
      "discount": 0.4,
      "age": 20,
      "gender": "F",
      "noOfGoodsBought": 2,
      "totalPayment": 12
    },
    {
      "customerName": "EE",
      "customerID": 110127,
      "purchaseDate": "2017-12-12",
      "discount": 0.4,
      "age": 20,
      "gender": "F",
      "noOfGoodsBought": 2,
      "totalPayment": 12
    },
    {
      "customerName": "EE",
      "customerID": 110127,
      "purchaseDate": "2017-12-13",
      "discount": 0.4,
      "age": 20,
      "gender": "F",
      "noOfGoodsBought": 2,
      "totalPayment": 12
    },
    {
      "customerName": "EE",
      "customerID": 110127,
      "purchaseDate": "2017-12-14",
      "discount": 0.4,
      "age": 20,
      "gender": "F",
      "noOfGoodsBought": 2,
      "totalPayment": 12
    },
    {
      "customerName": "F",
      "customerID": 110105,
      "purchaseDate": "2017-12-11",
      "discount": 0.2,
      "age": 42,
      "gender": "M",
      "noOfGoodsBought": 9,
      "totalPayment": 72
    },
    {
      "customerName": "F",
      "customerID": 110105,
      "purchaseDate": "2017-12-12",
      "discount": 0.2,
      "age": 42,
      "gender": "M",
      "noOfGoodsBought": 9,
      "totalPayment": 72
    },
    {
      "customerName": "FF",
      "customerID": 110128,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 31,
      "gender": "M",
      "noOfGoodsBought": 6,
      "totalPayment": 30
    },
    {
      "customerName": "FF",
      "customerID": 110128,
      "purchaseDate": "2017-12-12",
      "discount": 0.5,
      "age": 31,
      "gender": "M",
      "noOfGoodsBought": 6,
      "totalPayment": 30
    },
    {
      "customerName": "FF",
      "customerID": 110128,
      "purchaseDate": "2017-12-13",
      "discount": 0.5,
      "age": 31,
      "gender": "M",
      "noOfGoodsBought": 6,
      "totalPayment": 30
    },
    {
      "customerName": "FF",
      "customerID": 110128,
      "purchaseDate": "2017-12-14",
      "discount": 0.5,
      "age": 31,
      "gender": "M",
      "noOfGoodsBought": 6,
      "totalPayment": 30
    },
    {
      "customerName": "G",
      "customerID": 110106,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 47,
      "gender": "M",
      "noOfGoodsBought": 8,
      "totalPayment": 40
    },
    {
      "customerName": "G",
      "customerID": 110106,
      "purchaseDate": "2017-12-12",
      "discount": 0.5,
      "age": 47,
      "gender": "M",
      "noOfGoodsBought": 8,
      "totalPayment": 40
    },
    {
      "customerName": "GG",
      "customerID": 110129,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 20,
      "gender": "M",
      "noOfGoodsBought": 5,
      "totalPayment": 25
    },
    {
      "customerName": "GG",
      "customerID": 110129,
      "purchaseDate": "2017-12-12",
      "discount": 0.5,
      "age": 20,
      "gender": "M",
      "noOfGoodsBought": 5,
      "totalPayment": 25
    },
    {
      "customerName": "GG",
      "customerID": 110129,
      "purchaseDate": "2017-12-13",
      "discount": 0.5,
      "age": 20,
      "gender": "M",
      "noOfGoodsBought": 5,
      "totalPayment": 25
    },
    {
      "customerName": "GG",
      "customerID": 110129,
      "purchaseDate": "2017-12-14",
      "discount": 0.5,
      "age": 20,
      "gender": "M",
      "noOfGoodsBought": 5,
      "totalPayment": 25
    },
    {
      "customerName": "H",
      "customerID": 110107,
      "purchaseDate": "2017-12-11",
      "discount": 0.2,
      "age": 47,
      "gender": "F",
      "noOfGoodsBought": 10,
      "totalPayment": 80
    },
    {
      "customerName": "H",
      "customerID": 110107,
      "purchaseDate": "2017-12-12",
      "discount": 0.2,
      "age": 47,
      "gender": "F",
      "noOfGoodsBought": 10,
      "totalPayment": 80
    },
    {
      "customerName": "H",
      "customerID": 110107,
      "purchaseDate": "2017-12-13",
      "discount": 0.2,
      "age": 47,
      "gender": "F",
      "noOfGoodsBought": 10,
      "totalPayment": 80
    },
    {
      "customerName": "I",
      "customerID": 110108,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 43,
      "gender": "M",
      "noOfGoodsBought": 5,
      "totalPayment": 25
    },
    {
      "customerName": "I",
      "customerID": 110108,
      "purchaseDate": "2017-12-12",
      "discount": 0.5,
      "age": 43,
      "gender": "M",
      "noOfGoodsBought": 5,
      "totalPayment": 25
    },
    {
      "customerName": "I",
      "customerID": 110108,
      "purchaseDate": "2017-12-13",
      "discount": 0.5,
      "age": 43,
      "gender": "M",
      "noOfGoodsBought": 5,
      "totalPayment": 25
    },
    {
      "customerName": "J",
      "customerID": 110109,
      "purchaseDate": "2017-12-11",
      "discount": 0.2,
      "age": 53,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 136
    },
    {
      "customerName": "J",
      "customerID": 110109,
      "purchaseDate": "2017-12-12",
      "discount": 0.2,
      "age": 53,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 136
    },
    {
      "customerName": "J",
      "customerID": 110109,
      "purchaseDate": "2017-12-13",
      "discount": 0.2,
      "age": 53,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 136
    },
    {
      "customerName": "K",
      "customerID": 110110,
      "purchaseDate": "2017-12-11",
      "discount": 0.3,
      "age": 31,
      "gender": "F",
      "noOfGoodsBought": 15,
      "totalPayment": 105
    },
    {
      "customerName": "K",
      "customerID": 110110,
      "purchaseDate": "2017-12-13",
      "discount": 0.3,
      "age": 31,
      "gender": "F",
      "noOfGoodsBought": 15,
      "totalPayment": 105
    },
    {
      "customerName": "O",
      "customerID": 110111,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 33,
      "gender": "M",
      "noOfGoodsBought": 9,
      "totalPayment": 45
    },
    {
      "customerName": "O",
      "customerID": 110111,
      "purchaseDate": "2017-12-13",
      "discount": 0.5,
      "age": 33,
      "gender": "M",
      "noOfGoodsBought": 9,
      "totalPayment": 45
    },
    {
      "customerName": "P",
      "customerID": 110112,
      "purchaseDate": "2017-12-11",
      "discount": 0.2,
      "age": 60,
      "gender": "M",
      "noOfGoodsBought": 12,
      "totalPayment": 96
    },
    {
      "customerName": "P",
      "customerID": 110112,
      "purchaseDate": "2017-12-13",
      "discount": 0.2,
      "age": 60,
      "gender": "M",
      "noOfGoodsBought": 12,
      "totalPayment": 96
    },
    {
      "customerName": "Q",
      "customerID": 110113,
      "purchaseDate": "2017-12-11",
      "discount": 0.3,
      "age": 22,
      "gender": "M",
      "noOfGoodsBought": 4,
      "totalPayment": 28
    },
    {
      "customerName": "Q",
      "customerID": 110113,
      "purchaseDate": "2017-12-13",
      "discount": 0.3,
      "age": 22,
      "gender": "M",
      "noOfGoodsBought": 4,
      "totalPayment": 28
    },
    {
      "customerName": "R",
      "customerID": 110114,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 24,
      "gender": "M",
      "noOfGoodsBought": 10,
      "totalPayment": 50
    },
    {
      "customerName": "R",
      "customerID": 110114,
      "purchaseDate": "2017-12-13",
      "discount": 0.5,
      "age": 24,
      "gender": "M",
      "noOfGoodsBought": 10,
      "totalPayment": 50
    },
    {
      "customerName": "S",
      "customerID": 110115,
      "purchaseDate": "2017-12-11",
      "discount": 0.1,
      "age": 29,
      "gender": "M",
      "noOfGoodsBought": 6,
      "totalPayment": 54
    },
    {
      "customerName": "S",
      "customerID": 110115,
      "purchaseDate": "2017-12-13",
      "discount": 0.1,
      "age": 29,
      "gender": "M",
      "noOfGoodsBought": 6,
      "totalPayment": 54
    },
    {
      "customerName": "T",
      "customerID": 110116,
      "purchaseDate": "2017-12-11",
      "discount": 0.1,
      "age": 50,
      "gender": "F",
      "noOfGoodsBought": 20,
      "totalPayment": 180
    },
    {
      "customerName": "T",
      "customerID": 110116,
      "purchaseDate": "2017-12-13",
      "discount": 0.1,
      "age": 50,
      "gender": "F",
      "noOfGoodsBought": 20,
      "totalPayment": 180
    },
    {
      "customerName": "U",
      "customerID": 110117,
      "purchaseDate": "2017-12-11",
      "discount": 0.3,
      "age": 50,
      "gender": "M",
      "noOfGoodsBought": 13,
      "totalPayment": 91
    },
    {
      "customerName": "U",
      "customerID": 110117,
      "purchaseDate": "2017-12-13",
      "discount": 0.3,
      "age": 50,
      "gender": "M",
      "noOfGoodsBought": 13,
      "totalPayment": 91
    },
    {
      "customerName": "V",
      "customerID": 110118,
      "purchaseDate": "2017-12-11",
      "discount": 0.3,
      "age": 29,
      "gender": "M",
      "noOfGoodsBought": 14,
      "totalPayment": 98
    },
    {
      "customerName": "V",
      "customerID": 110118,
      "purchaseDate": "2017-12-13",
      "discount": 0.3,
      "age": 29,
      "gender": "M",
      "noOfGoodsBought": 14,
      "totalPayment": 98
    },
    {
      "customerName": "W",
      "customerID": 110119,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 57,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 85
    },
    {
      "customerName": "W",
      "customerID": 110119,
      "purchaseDate": "2017-12-12",
      "discount": 0.5,
      "age": 57,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 85
    },
    {
      "customerName": "W",
      "customerID": 110119,
      "purchaseDate": "2017-12-13",
      "discount": 0.5,
      "age": 57,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 85
    },
    {
      "customerName": "X",
      "customerID": 110120,
      "purchaseDate": "2017-12-11",
      "discount": 0.3,
      "age": 50,
      "gender": "F",
      "noOfGoodsBought": 14,
      "totalPayment": 98
    },
    {
      "customerName": "X",
      "customerID": 110120,
      "purchaseDate": "2017-12-12",
      "discount": 0.3,
      "age": 50,
      "gender": "F",
      "noOfGoodsBought": 14,
      "totalPayment": 98
    },
    {
      "customerName": "X",
      "customerID": 110120,
      "purchaseDate": "2017-12-13",
      "discount": 0.3,
      "age": 50,
      "gender": "F",
      "noOfGoodsBought": 14,
      "totalPayment": 98
    },
    {
      "customerName": "Y",
      "customerID": 110121,
      "purchaseDate": "2017-12-11",
      "discount": 0.4,
      "age": 31,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 102
    },
    {
      "customerName": "Y",
      "customerID": 110121,
      "purchaseDate": "2017-12-12",
      "discount": 0.4,
      "age": 31,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 102
    },
    {
      "customerName": "Y",
      "customerID": 110121,
      "purchaseDate": "2017-12-13",
      "discount": 0.4,
      "age": 31,
      "gender": "F",
      "noOfGoodsBought": 17,
      "totalPayment": 102
    },
    {
      "customerName": "Z",
      "customerID": 110122,
      "purchaseDate": "2017-12-11",
      "discount": 0.5,
      "age": 22,
      "gender": "M",
      "noOfGoodsBought": 11,
      "totalPayment": 55
    },
    {
      "customerName": "Z",
      "customerID": 110122,
      "purchaseDate": "2017-12-12",
      "discount": 0.5,
      "age": 22,
      "gender": "M",
      "noOfGoodsBought": 11,
      "totalPayment": 55
    },
    {
      "customerName": "Z",
      "customerID": 110122,
      "purchaseDate": "2017-12-13",
      "discount": 0.5,
      "age": 22,
      "gender": "M",
      "noOfGoodsBought": 11,
      "totalPayment": 55
    }
  ]
};

const jsonProcessor = new JsonProcessor(apiData);
const datasets = jsonProcessor.getDatasetNames();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [],
            editMode: true,
            selectedSize: 'A4',
            selectedLayout:'Portrait',
            // w : 21*37.795276,
            // h : 29.7*37.795276,
            formVisibility: "hidden",
            templateName:"Template Name",
            sidebar: false
        }
    }

    componentDidMount(){
        this.loadTemplate();
    }

    addTextbox = () => {
        let components = this.state.components;
        components.push(
            {type:"text", x:0, y:0, height:120, width:200, display:true, properties:{text:"<p><br></p>" }}
        );

        this.setState({ components, editMode:true });
    }

    addBarChart = () => {
        let components = this.state.components;
        // adds new component to state
        components.push(
            {
                type:"bar", x:0, y:0, height:200, width:300, display: true,
                properties: {
                    initialized: false,
                    datasourceUrl: '',
                    dataset: '',
                    title: '',
                    xAxis: '',
                    yAxis: ''
                }
            }
        );

        // updates state
        this.setState({ components, editMode:true });
    }

    addLineChart = () => {
        let components = this.state.components;
        components.push(
            {
                type: "line", x: 0, y: 0, height: 200, width: 300, display: true,
                properties: {
                    initialized: false,
                    datasourceUrl: '',
                    dataset: '',
                    title: '',
                    xAxis: '',
                    yAxis: ''
                }
            }
        );

        this.setState({ components, editMode:true });
    }


    addTable = () => {
        let components = this.state.components;
        components.push(
            {type:"table", x:0, y:0, height:200, width:300, display:true}
        );

        this.setState({ components, editMode:true });
    }

    addImage = () => {
        let components = this.state.components;
        components.push(
            {type:"image", x:0, y:0, height:200, width:200, display:true, properties:{imageUrl:''}}
        );
        this.setState({ components });
    }

    changeSettings(i) {
        let components = this.state.components;
        components[i].properties.initialized = false;
        this.setState({ components });
    }

    closeModal = () => {
        var modal = document.getElementById('size');
        modal.style.display = "none";
    }

    deleteComponent(i) {
        let components = this.state.components;
        components[i].display = false;
        this.setState({ components });
    }

    getComponentDetails = () => {
        console.log(this.state.components);
    }

    handleSizeChange= (changeEvent) => {
        this.setState({
            selectedSize: changeEvent.target.value
        });
    }
    
    handleLayoutChange= (changeEvent) => {
        this.setState({
            selectedLayout: changeEvent.target.value
        });
    }

    loadTemplate = () => {
        let self = this;
        let templateId = parseInt(document.getElementById("templateId").value, 10);
        if (templateId !== 0){
            request.post({
                url: api + 'loadComponents',
                json: true,
                body: { operation: "loadComponents", templateId: templateId }
            }, function (error, response, body) {
                let components = body.components;
                self.setState({components});
            });
        }
    }

    renameTemplate = (e) => {
        this.setState({templateName: e.target.value});
    }

    saveTemplate = () => {
        let self = this;
        let templateId = parseInt(document.getElementById("templateId").value, 10);
        //let companyId = parseInt(document.getElementById("companyId").value, 10);
        //let userName =document.getElementById("userName").value;
        if(templateId===0){
            console.log(self.state.templateName)
            request.post({
                url: api + 'createTemplate',
                form: { 
                    operation: "createTemplate",
                    templateId: templateId,
                    templateName: self.state.templateName,
                    templatesize: self.state.selectedSize,
                    templatelayout: self.state.selectedLayout,
                    companyId: 1,
                    userName: 'aa'
                }
            }, function (error, response, body) {
                console.log(body);
                if(body === "false") {
                    alert("Failed to create template!");
                } else {
                    templateId = parseInt(body, 10);
                    request.post({
                        url: api + 'saveComponents',
                        json: true,
                        body: { operation: "saveComponents", templateId: templateId, components: self.state.components }
                    }, function (error, response, body) {
                        console.log(body);
                    });
                }
            });  
        } else {
            request.post({
                url: api + 'saveComponents',
                json: true,
                body: { operation: "saveComponents", templateId: templateId, components: self   .state.components }
            }, function (error, response, body) {
                console.log(body);
            });
        }
    }

    // i represents index of current item in this.state.components
    // convert style data to integer. e.g. 10px -> 10
    onResize(ref, pos, i) {
        let components = this.state.components;
        components[i].height = parseInt(ref.style.height, 10);
        components[i].width = parseInt(ref.style.width, 10);
        components[i].x = pos.x;
        components[i].y = pos.y;
        this.setState({ components });
    }

    onDragStop(ref, i) {
        let components = this.state.components;
        components[i].x = ref.x;
        components[i].y = ref.y;
        this.setState({ components });
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
        this.setState({editMode: !this.state.editMode})
    }

    toggleSidebar = () => {
        this.setState({sidebar: !this.state.sidebar});
    }

    updateProperties = (properties, i) => {
        let components = this.state.components;
        components[i].properties = properties;
        this.setState({properties});
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
                <input type="hidden" id="templateId" value="1"/>
                <div className={this.state.sidebar ? "nav-md" : "nav-sm"} id="main">
                    <div className="container body">
                        <div className="main_container">
                            <div className="col-md-3 left_col">
                                <div className="left_col scroll-view">
                                    <div className="navbar nav_title" style={{ border:0 }}>
                                        <a href="" className="site_title">
                                            <img src={this.state.sidebar ? "assets/images/logo.png" : "assets/images/logo1_1.png"} 
                                                style={{ 
                                                    height: this.state.sidebar ? 90 : 80, 
                                                    width: this.state.sidebar ? 200 : 50,  
                                                }}/>
                                        </a>
                                    </div>
                                    <div className="clearfix"></div><br />
                                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                                        <div className="menu_section">
                                            <ul className="nav side-menu" id="options">
                                                <li id="title">
                                                    <a style={{ 
                                                        fontSize: this.state.sidebar ? 16 : 11,
                                                        fontWeight: 'bold'
                                                    }}>Component</a>
                                                </li>
                                                <li><a id="addTextbox" onClick={this.addTextbox}><i className="fa fa-font"/> Textbox</a></li>
                                                <li>
                                                    <a onClick={this.toggleChartMenu}>
                                                        <i className="fa fa-bar-chart"/> Charts <span className="fa fa-chevron-down"></span>
                                                    </a>
                                                    <ul className="nav child_menu" id="chartMenu">
                                                        <li><a onClick={this.addBarChart}><i className="fa fa-bar-chart a"/>Bar</a></li>
                                                        <li><a onClick={this.addLineChart}><i className="fa fa-pie-chart a"/> Pie</a></li>
                                                        <li><a onClick={this.addLineChart}><i className="fa fa-line-chart a"/>Line</a></li>
                                                    </ul>
                                                </li>
                                                <li><a id="addTable" onClick={this.addTable}><i className="fa fa-table"/> Table</a></li>
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
                                                    <img src="assets/images/user.png" />
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
                            <div className="right_col">
                                <div className="row">
                                    <div className="col-md-6 col-xs-12">
                                        <label style={{fontSize:15}}>Template Name: </label>
                                        <input style={{fontSize:15}} value={this.state.templateName} onChange={this.renameTemplate}/>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        {/* <button className="btn btn-primary" id="changeSize" onClick={this.openModal} >Change Page Size</button> */}
                                        {/* <Button bsStyle="info" onClick={this.getComponentDetails}>Get Component Details</Button> */}
                                        <Button style={{float:"right"}} bsStyle="info" onClick={this.saveTemplate}>
                                            <i className="fa fa-save"/> Save Template
                                        </Button>
                                        <Button style={{float:"right"}} bsStyle="success" onClick={this.toggleEditMode}>
                                            <i className="fa fa-edit" style={{marginRight:2}}/>
                                            {this.state.editMode ? "Leave Edit Mode" : "Enter Edit Mode"}
                                        </Button>
                                    </div>
                                </div>
                            

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
                                <div id="container" style={{backgroundColor:'white',overflow:'auto'}}>
                                    {/* map does a for loop over all the components in the state */}
                                    {this.state.components.map((item, i) => {
                                        if (item.display) {
                                            return <Rnd key={i} 
                                                style={{ 
                                                    borderStyle: this.state.editMode ? "dotted" : "hidden", 
                                                    borderWidth: 2, 
                                                    backgroundColor: "white", 
                                                    borderColor: 'grey'
                                                }}

                                                // intialize components x,y,height and width
                                                position={{ x:item.x, y:item.y }}
                                                size={{ width:item.width, height:item.height }}

                                                // min height and size
                                                minHeight={10} minWidth={10}

                                                // to limit the drag area to a particular class
                                                cancel={".nonDraggable"}
                                                dragHandleClassName={"draggable"}

                                                // update height and width onResizeStop
                                                // onResizeStop will activate a callback function containing these params
                                                // ref represents item that was resized
                                                onResize={(event, dir, ref, delta, pos) => this.onResize(ref, pos, i)}

                                                // update height and width onResizeStop
                                                // onDragStop will activate a callback function containing these params
                                                // ref represents item that was dragged
                                                onDragStop={(event, ref) => this.onDragStop(ref, i)}
                                            >
                                                <div style={{float:"right"}}>
                                                    <i style={{marginTop:10, marginRight:6,  visibility:this.state.editMode ? "" : "hidden"}} className="fa fa-wrench"
                                                        onClick={() => this.changeSettings(i)}></i>
                                                    <i style={{marginTop:10, marginRight:10, visibility:this.state.editMode ? "" : "hidden"}} className="fa fa-times"
                                                        onClick={() => this.deleteComponent(i)}></i>
                                                </div>
                                                <ReportComponent type={item.type} editMode={this.state.editMode}
                                                    properties={item.properties} i={i}
                                                    updateProperties={this.updateProperties.bind(this)}
                                                />
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
                <Image i={this.props.i}  
                    properties={this.props.properties}
                    updateProperties={this.props.updateProperties}/>
            )
        } else if (this.props.type ==="table"){
            return(
                <Table/>
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
            :   <ChartForm initializeChart={this.initializeChart}/>
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
            :   <ChartForm initializeChart={this.initializeChart}/>
    }
}

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            imageUrl: this.props.properties.imageUrl, 
        };
    }

    imageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({imageUrl: reader.result});
            this.props.updateProperties({imageUrl: reader.result}, this.props.i);
        }

        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className="draggable" style={{height:"100%", width:"100%"}}>
                {this.state.imageUrl ? 
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
            display: ['INLINE_STYLE_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
              {label: 'Italic', style: 'ITALIC'},
              {label: 'Underline', style: 'UNDERLINE'}
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
            chartData: [],
            columns: [{
                dataField: 'id',
                text: 'Product ID',
                sort: true
            }],
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
        console.log("init table")
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
        let col = this.state.columns;
        if (e === "name") {
            col.push({
                dataField: 'name',
                text: 'Product Name',
                sort: true

            });

        } else if(e==="price") {
            col.push({
                dataField: 'price',
                text: 'Product Price',
                sort: true

            });
        } else {
            col.push({
                dataField: 'id',
                text: 'Product ID',
                sort: true

            });
        }

        this.setState({ col });
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
        return this.state.initialized ?
            <div>
                <ButtonToolbar>
                    <SplitButton title="Add a Column" bsStyle="info" dropup id="split-button-dropup" onSelect={this.addCol}>
                        Categories
                        <MenuItem eventKey="id">Product ID</MenuItem>
                        <MenuItem eventKey="name">Product Name</MenuItem>
                        <MenuItem eventKey="price">Product Price</MenuItem>
                    </SplitButton>
                </ButtonToolbar>

                <BootstrapTable keyField='id' data={products}
                    columns={this.state.columns}
                    cellEdit={cellEditFactory({ mode: 'dbclick' })}
                    rowStyle={rowStyle}>
                </BootstrapTable>



            </div>
            : <TableForm initializeTable={this.initializeTable} />
    }
}

class ChartForm extends Component {
    render() {
        return (
            <Formik 
                // initialize values to use in form
                initialValues={{
                    title:'', 
                    dataset: datasets[0],
                    datasourceUrl: datasourceUrl,
                    xAxis: jsonProcessor.getOptions(datasets[0])[0], 
                    yAxis: jsonProcessor.getNumericalOptions(datasets[0])[0], 
                    processor:jsonProcessor
                }}

                // pass values to the charts
                onSubmit={this.props.initializeChart}

                // render form
                render={formProps=>(
                    <Form className="draggable" style={{textAlign: "center", zIndex: -1,height:"100%",width:"100%"}}>
                        <label>Chart Title</label>
                        <Field type="text" name="title" placeholder="Chart Title"/>
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
                            {jsonProcessor.getNumericalOptions(formProps.values.dataset)
                            .map((option)=> 
                                <option key={option}>{option}</option>
                            )}
                        </Field>
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
    render() {
        return (
            <Formik 
                // initialize values to use in form
                initialValues={{
                    title:'', 
                    dataset: datasets[0],
                    datasourceUrl: datasourceUrl,
                    processor:jsonProcessor
                }}

                // pass values to the charts
                onSubmit={this.props.initializeTable}

                // render form
                render={formProps=>(
                    <Form className="draggable" style={{textAlign: "center", zIndex: -1,height:"100%",width:"100%"}}>
                        <label>Chart Title</label>
                        <Field type="text" name="title" placeholder="Chart Title"/>
                        <br/><br/>
                        <label>Choose the dataset</label>
                        <Field component="select" name="dataset">
                            {datasets.map((dataset)=>
                                <option key={dataset}>{dataset}</option>
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

ReactDOM.render(<App/>, document.getElementById('container'));