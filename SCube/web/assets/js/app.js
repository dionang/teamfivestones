import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request';
import RichTextEditor from 'react-rte';
import Rnd from 'react-rnd';
import { Navbar, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { Formik, Form, Field } from 'formik';

const Component = React.Component;
const api = 'http://localhost:8084/';
const datasourceUrl = 'http://localhost:8084/Dummy_API/getCustomerOrders';
//const api = 'http://103.3.61.39:8080/SCube/';
//const datasourceUrl = 'http://103.3.61.39:8080/Dummy_API/getCustomerOrders';


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
            // initial state has two line charts
            components: [
                // {type:"table", x:0, y:0, height:200, width:200}
                // {type:"image", x:0, y:0, height:200, width:200, properties: {imageUrl:''}}
                // {type:"line", x:10, y:10, height:200, width:300, data:lineChartData},
                /*{type:"bar", x:320, y:10, height:300, width:400, display:true,
                    properties:{
                        initialized:true, 
                        datasourceUrl:'http://localhost:8084/Dummy_API/getFurnituresByCategory?category=Furniture', 
                        dataset:'furnitures',
                        title: 'Furniture Sales By Region',  
                        xAxis:'Region', 
                        yAxis:'Sales',
                        aggregate:'sum'
                    }
                },*/
                // {type:"text", x:10, y:310, height:100, width:150, properties:{text:"<p>Hello World!</p>"}},
                // {type:"basic", x:0, y:0, height:300, width:200}
            ],
            border: "dotted",
            visibility: "",
            editButtonValue: "Leave Edit Mode",
            selectedSize: 'A4',
            selectedLayout:'Portrait',
            w : 21*37.795276,
            h : 29.7*37.795276,
            formVisibility: "hidden",
            templateName:""

        }

    }


    addTextbox = () => {
        let components = this.state.components;
        components.push(
            { type: "text", x: 0, y: 0, height: 50, width: 200, display: true, properties: { text: "<p><br></p>" } }
        );

        this.setState({ components });
    }

    addBarChart = () => {
        let components = this.state.components;
        // adds new component to state
        components.push(
            {
                type: "bar", x: 0, y: 0, height: 200, width: 300, display: true,
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
        this.setState({ components });
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

        this.setState({ components });
    }


    addTable = () => {
        let components = this.state.components;
        components.push(
            { type: "table", x: 0, y: 0, height: 200, width: 300, display: true }
        );

        this.setState({ components });
    }

    addImage = () => {
        let components = this.state.components;
        components.push(
            { type: "image", x: 0, y: 0, height: 200, width: 200, display: true, properties: { imageUrl: '' } }
        );
        this.setState({ components });
    }
    componentDidMount() {

        // Toggle sidebar
        $('#options li').click(function () {
            $(this).find('ul').toggle();
        });

        $('#menu_toggle').click(function () {
            $('#logo').toggle();
            $('#logo2').toggle();
            $('#title').toggle();
            $('#title1').toggle();
            if ($('div').hasClass('nav-md')) {
                //$('#sidebar-menu').find('li.active ul').hide();
                $('#sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
            } else {
                // $('#sidebar-menu').find('li.active-sm ul').show();
                $('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
            }

            $('#main').toggleClass('nav-md nav-sm');
        });

    }

    
    closeModal = () => {
        var modal = document.getElementById('size');
        modal.style.display = "none";
    }


    changeSettings(i) {
        let components = this.state.components;
        components[i].properties.initialized = false;
        this.setState({ components });
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

      handleFormSubmit= (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        var size=this.state.selectedSize;
        var layout=this.state.selectedLayout;
        var h;
        var w;
        if (size==="A3" && layout==="Portrait") {
            this.setState({w : 29.7 *37.795276,
                h : 42*37.795276});
            
        }
        else if (size==="A3" && layout==="Landscape") {
            this.setState({h : 29.7 *37.795276,
                w : 42*37.795276});

        }
        else if (size==="A4" && layout==="Portrait") {
            this.setState({h : 29.7 *37.795276,
                w : 21*37.795276});

        }
        else if (size==="A4" && layout==="Landscape") {
            this.setState({w : 29.7 *37.795276,
                h : 21*37.795276});

        }
        else if (size==="A5" && layout==="Portrait") {
            
            this.setState({w : 14.8*37.795276,
                h : 21*37.795276}); 

        } else if (size==="A5" && layout==="Landscape") {
            this.setState({w : 21*37.795276,
                h : 14.8*37.795276});
        }

        this.setState({formVisibility:"hidden"});
       
        var modal = document.getElementById('size');
        modal.style.display = "none";
      }
      handleTemplateName = (changeEvent) => {
        this.setState({
            value: changeEvent.target.value
        });
      }

    loadTemplate = () => {
        let self = this;
        let templateId = parseInt(document.getElementById("template").value, 10);
        request.post({
            url: api + 'loadComponents',
            json: true,
            body: { operation: "loadComponents", templateId: templateId }
        }, function (error, response, body) {
            let components = body.components;
            // for (let component of components){
            //     if (component.type === "bar") {
            //         component.data = barChartData;
            //     } else if (component.type === "line") {
            //         component.data = lineChartData;
            //     }
            // }
            // console.log(body);
            self.setState({ components });
        });
    }

    saveTemplate = () => {
        let templateId = parseInt(document.getElementById("template").value, 10);
        let companyId = parseInt(document.getElementById("companyId").value, 10);
        let userName =document.getElementById("userName").value;
        if(templateId===0){
            request.post({
                url: api + 'createTemplate',
             
                body: { templateName: this.state.templateName,templatesize: this.state.selectedSize,templatelayout:this.state.selectedLayout,companyId:companyId,userName:userName,operation: "createTemplate" }
            }, function (error, response, body) {
                if(body.status) {
                    alert("Saved successfully!");
                } else {
                    alert("Failed to save!");
                }
            });  
        }
        request.post({
            url: api + 'saveComponents',
            json: true,
            body: { operation: "saveComponents", templateId: templateId, components: this.state.components }
        }, function (error, response, body) {
            console.log(body);
        });
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
    openModal = () => {
        var modal = document.getElementById('size');
        modal.style.display = "block";
        this.setState({formVisibility:""});
    }


    updateProperties = (properties, i) => {
        let components = this.state.components;
        components[i].properties = properties;
        this.setState({ properties });
    }



    leaveEditMode = () => {
        if (this.state.border === "dotted") {
            this.setState({ border: "hidden", visibility: "hidden", editButtonValue: "Edit the View" })
        } else {
            this.setState({ border: "dotted", visibility: "", editButtonValue: "Leave Edit Mode" })
        }

    }
   

    render() {
        return (
            <div>
                <div className="nav-md" id="main">
                    <div className="container body" >
                        <div className="main_container">
                            <div className="col-md-3 left_col">
                                <div className="left_col scroll-view">
                                    <div className="navbar nav_title" id="logo" style={{ border: 0 }}>
                                        <a href="" className="site_title"><img src="/assets/images/logo.png" style={{ height: 90, width: 200 }} /></a>
                                    </div>
                                    <div className="navbar nav_title" id="logo2" style={{ border: 0, display: 'none' }}>
                                        <a href="" className="site_title"><img src="/assets/images/logo1_1.png" style={{ height: 80, width: 50 }} /></a>
                                    </div>
                                    <div className="clearfix"></div><br />
                                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                                        <div className="menu_section">
                                            <ul className="nav side-menu" id="options">
                                                <li id="title"><a style={{ fontSize: 16, fontWeight: 'bold' }}>Component</a></li>
                                                <li id="title1" style={{ display: 'none' }}><a style={{ fontWeight: 'bold', fontSize: 11 }}> Component</a></li>
                                                <li><a id="addTextbox" onClick={this.addTextbox}><i className="fa fa-font"></i> Textbox</a></li>
                                                <li><a><i className="fa fa-bar-chart"></i> Charts <span className="fa fa-chevron-down"></span></a>
                                                    <ul className="nav child_menu">
                                                        <li><a id="addBarChart" onClick={this.addBarChart}><i className="fa fa-bar-chart a"  ></i>Bar</a></li>
                                                        <li><a id="addPieChart" onClick={this.addLineChart}><i className="fa fa-pie-chart a"></i> Pie</a></li>
                                                        <li><a id="addLineChart" onClick={this.addLineChart}><i className="fa fa-line-chart a"></i>Line</a></li>
                                                    </ul>
                                                </li>
                                                <li><a id="addTable" onClick={this.addTable}><i className="fa fa-table"></i> Table</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="top_nav" >
                                <div className="nav_menu">
                                    <nav>
                                        <div className="nav toggle">
                                            <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                                        </div>

                                        <ul className="nav navbar-nav navbar-right">
                                            <li>
                                                <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                    <img src="/assets/images/user.png" />
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
                                <button className="btn btn-primary" id="changeSize" onClick={this.openModal} >Change Page Size</button>
                                <button className="btn btn-success" id="createTemplate" onClick={this.saveTemplate}>Save Template</button>
                                <button className="btn" id="printPage" >Screenshot</button>
                                <br /><br />
                                <div className="row">
                                    <div className="col-md-2">
                                        <h4>Template Name: </h4>
                                    </div>
                                    <div className="col-md-5">
                                        <input type="text" name="templateName" className="tbTemplate" value={this.state. templateName} onChange={this.handleTemplateName}/>
                                    </div>
                                </div>

                                <div id="size" className="modal">

                                    /* Modal content */
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
                                                        <label><input type="radio" name="size" value="A4" checked={this.state.selectedSize === 'A4'} onChange={this.handleSizetChange} />A4</label>
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
                                </div>


                                <Button bsStyle="info" onClick={this.getComponentDetails} style={{ marginTop: 10 }}>Get Component Details</Button>
                                <Button bsStyle="info" onClick={this.loadTemplate} style={{ marginTop: 10 }}>Load Template</Button>
                                <Button bsStyle="success" onClick={this.leaveEditMode} style={{ marginTop: 10 }}>{this.state.editButtonValue}</Button>

                                <input type="number" id="template" defaultValue="1" />
                                <div style={{maxWidth:70 , maxHeight:100}}>
                                <div id="container" style={{width:this.state.w, height:this.state.h, backgroundColor:'white',overflow:'auto'}}>
                                    {/* map does a for loop over all the components in the state */}
                                    {this.state.components.map((item, i) => {
                                        if (item.display) {
                                            return <Rnd key={i} style={{ padding: 10, "borderStyle": this.state.border, "borderWidth": 2 }}

                                                // intialize components x,y,height and width
                                                position={{ x: item.x, y: item.y }}
                                                size={{ width: item.width, height: item.height }}

                                                // min height and size
                                                minHeight={80} minWidth={120}

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
                                                <div style={{ float: "right" }}>
                                                    <i style={{ "marginTop": 10, "marginRight": 6, visibility: this.state.visibility }} className="fa fa-wrench"
                                                        onClick={() => this.changeSettings(i)}></i>
                                                    <i style={{ "marginTop": 10, "marginRight": 10, visibility: this.state.visibility }} className="fa fa-times"
                                                        onClick={() => this.deleteComponent(i)}></i>
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
        console.log(this.state.imageUrl);
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

class BasicForm extends Component {
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
                    <Form className="draggable" style={{textAlign: "center", zIndex: -1}}>
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