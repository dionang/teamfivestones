import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import request from 'request';
import Rnd from 'react-rnd';
import RichTextEditor from 'react-rte';
import PDFDocument from 'pdfkit';
import { Button, ButtonToolbar, SplitButton, MenuItem, Navbar } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Label, Legend, Tooltip, ResponsiveContainer} from 'recharts';
import { Formik, Form, Field } from 'formik';

//const api = 'http://localhost:8084/';
//const datasourceUrl = 'http://localhost:8084/Dummy_API/getCustomerOrders';
//const api = 'http://103.3.61.39:8080/SCube/';
//const datasourceUrl = 'http://103.3.61.39:8080/Dummy_API/getCustomerOrders';
const api = 'http://scube.tk/SCube/';
const datasourceUrl = 'http://scube.tk/Dummy_API/getCustomerOrders';
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
            components: [[]],
            editMode: false,
            selectedSize: 'A4',
            selectedLayout: 'Portrait',
            // w : 21*37.795276,
            // h : 29.7*37.795276,
            templateName: "Template Name",
            sidebar: true,
            pageNo: 0,
            selectedPages: "all"
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
                    datasourceUrl: '',
                    dataset: '',
                    title: '',
                    xAxis: '',
                    yAxis: '',
                    summary:''
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
                type: "line", x: 0, y: 0, height: 250, width: 300, display: true,
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
                    text: "Paste a video link here",
                }
            }
        );
        this.setState({ components, editMode: true });
    }

    changePages = (e) => {
        this.setState({selectedPages: e.target.value});
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
        if(pageNo !== 0){
            pageNo = this.state.pageNo-1;
            this.setState({pageNo});
        }
    }

    nextPage = () => {
        let components = this.state.components;
        let pageNo = this.state.pageNo+1;

        // add new page if it doesnt exist
        if(pageNo === components.length){
            components.push([]);
        }
        this.setState({components, pageNo});
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
                alert("Saved succesfully");
                // swal("saved succesfully");
            } else {
                alert("Error in saving");
                // swal("error in saving");
            }

        });
    }

    savePdf = () => {
        let container = document.getElementById('container').outerHTML;
        let doc = new PDFDocument;
        console.log("created");
        
        pdfkit.from_string('MicroPyramid', 'micro.pdf')
        doc.addPage();
        doc.end();
        
    }

    savePresentation = () => {
        let pptx = new PptxGenJS();
        
        // allow this library to be used in browser
        pptx.setBrowser(true);
        
        let selectedPages = document.getElementById("selectedPages").value;
        
        // remove 1 from every page number so that the index matches
        let pages = selectedPages === "all" ? this.state.components.keys() : selectedPages.split(",").map(function(value){
            return Number(value) - 1;
        });

        console.log(this.state.components.keys());
        for(let page of pages){
            let components = this.state.components[page];
            let slide = pptx.addNewSlide();
            for(let component of components) {
                // convert px to inches
                let x = component.x / 96;
                let y = component.y / 96;
                let w = component.width / 96;
                let h = (component.height) / 96;

                if (component.type === "text") {
                    // remove the p tags
                    let text = component.properties.text.substring(3, component.properties.text.length-4);
                    // console.log(text);
                    // let texts = text.split(/\r\n|\n|\r/);
                    // console.log(texts); 
                    slide.addText(text, {x:x, y:y,  w:w, h:h, 
                        fontSize:14, color:'363636'
                        // , bullet:{code:'25BA'} 
                    });
                    
                } else if (component.type === "image") {
                    let imageUrl = component.properties.imageUrl;

                    // remove height of toolbar
                    y = (component.y + 27.5) / 96;
                    h = (component.height - 27.5) / 96;
                    slide.addImage({ data:imageUrl, x:x, y:y, w:w, h:h });
                } else if (component.type === "video") {
                    // remove the p tags
                    let videoUrl = component.properties.text.substring(3, component.properties.text.length-4).trim();
                    slide.addMedia({ type:'online', link:videoUrl, x:x, y:y, w:w, h:h });
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
                    alert("Failed to create template!");
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
                    alert("Failed to update template!");
                } else {
                    self.saveComponents(templateId);
                }
            });
        }
        this.setState({editMode:false});
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
                                                <li><a href="dashboard.jsp"><i className="fa fa-bar-chart"></i>  View Dashboard</a></li>
                                                <li><a href="createUserAccount.jsp"><i className="fa fa-group"></i>  Create User Account</a></li>
                                                <li><a href="templateHome.jsp"><i className="fa fa-file-image-o"></i>  Template</a></li>
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
                                <div className="col-md-6 col-xs-6">
                                    <label style={{ fontSize: 15, marginRight: 2 }}>Template Name:</label>
                                    <input style={{ fontSize: 15 }} value={this.state.templateName} onChange={this.renameTemplate} />
                                </div>
                                    {/* <button className="btn btn-primary" id="changeSize" onClick={this.openModal} >Change Page Size</button> */}
                                    {/* <Button bsStyle="info" onClick={this.getComponentDetails}>Get Component Details</Button> */}
                                    <Button className="col-md-2 col-xs-3" style={{ float:"right", minWidth:130 }} bsStyle="info" onClick={this.saveTemplate}>
                                        <i className="fa fa-save" /> Save Template
                                    </Button>
                                    <Button className="col-md-2 col-xs-3" style={{ float:"right", minWidth:150 }} bsStyle="success" onClick={this.toggleEditMode}>
                                        <i className="fa fa-edit" style={{ marginRight: 2 }} />
                                        {this.state.editMode ? "Leave Edit Mode" : "Enter Edit Mode"}
                                    </Button>
                                    <Button className="col-md-2 col-xs-2" style={{ float:"right", minWidth:150 }} bsStyle="warning" onClick={this.savePresentation}>
                                        <i className="fa fa-edit" style={{ marginRight: 2 }} /> Export as PPT
                                    </Button>
                                    <Button className="col-md-2 col-xs-2" style={{ float:"right", minWidth:150 }} bsStyle="warning" onClick={this.savePdf}>
                                        <i className="fa fa-edit" style={{ marginRight: 2 }} /> Export as PDF
                                    </Button>
                                    <br/>

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
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Textbox" bsStyle="primary"
                                        onClick={this.addTextbox}   style={{ marginRight:5, marginLeft: 6 }}><i className="fa fa-font" /></Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Bar Chart" bsStyle="warning"
                                        onClick={this.addBarChart}  style={{ marginRight:5 }}><i className="fa fa-bar-chart" /></Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Line Chart" bsStyle="success"
                                        onClick={this.addLineChart} style={{ marginRight:5 }}><i className="fa fa-line-chart" /></Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Table" bsStyle="danger"
                                        onClick={this.addTable}     style={{ marginRight:5 }}><i className="fa fa-table" /> </Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Image"
                                        onClick={this.addImage}     style={{ backgroundColor:"#31B0D5", color:"white", border:"1px solid #31B0D5", marginRight:5 }}><i className="fa fa-image" /></Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Video"
                                        onClick={this.addVideo}     style={{ backgroundColor:"#D896FF", color:"white", border:"1px solid #D896FF", marginRight:90 }}><i className="fa fa-play-circle" /></Button>

                                    <span style={{fontFamily:'Georgia', fontSize:18}}>Page Number</span>
                                    <Button data-toggle="tooltip" data-placement="bottom" title = "Previous Page" bsStyle="warning" bsSize="small" onClick={this.previousPage}
                                        style={{ marginRight: 10, marginLeft: 10, padding: 5, paddingTop: 0 }}>
                                        <svg height="15" preserveAspectRatio="xMinYMax meet" viewBox="0 0 17 17" width="24">
                                            <path d="M0-.5h24v24H0z" fill="none"></path>
                                            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" className="jWRuRT"></path>
                                        </svg>
                                    </Button>                                   
                                    <span style={{fontFamily:'Georgia', fontSize:18}}>{this.state.pageNo+1}</span>
                                    <Button data-toggle="tooltip" data-placement="bottom" title = "Next Page" bsStyle="warning" bsSize="small" onClick={this.nextPage}
                                        style={{ marginLeft: 10, padding: 5, paddingTop: 0}}>
                                        <svg height="15" preserveAspectRatio="xMinYMax meet" viewBox="0 0 17 17" width="24">
                                            <path d="M0-.5h24v24H0z" fill="none"></path>
                                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" className="jWRuRT"></path>
                                        </svg>
                                    </Button>

                                    <Button bsStyle="default" bsSize="small" onClick={this.saveTemplate}
                                        style={{ marginLeft: 10, color:'orange', border:'none' }}> <i className="fa fa-save fa-2x" />
                                    </Button>
                                    Pages: <input id="selectedPages" value={this.state.selectedPages} onChange={this.changePages}/>
                                </div>

                                <div id="container" className="col-sm-12 col-xs-12" style={{ backgroundColor: 'white',  height:"calc(100% + 100px)", marginTop: -5 }}>
                                    {/* map does a for loop over all the components in the state */}

                                    {this.state.components[this.state.pageNo].map((item, i) => {
                                        if (item.display) {
                                            return <Rnd key={this.state.pageNo + "," + i}
                                                style={{
                                                    borderStyle: this.state.editMode ? "dotted" : "hidden",
                                                    borderWidth: 2,
                                                    backgroundColor: "white",
                                                    borderColor: 'grey'
                                                    
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
                <Image i={this.props.i}  editMode={this.props.editMode} 
                    properties={this.props.properties} updateProperties={this.props.updateProperties}/>
            );
        } else if (this.props.type ==="table"){
            return(
                <Table/>
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
            chartData:[],
            summaryData:'',
            heightP:"62%"
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
        let self = this;
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
        
        let summaryData = processor.getDetails(dataset,yAxis);

        this.setState({
            initialized:true,
            datasourceUrl: datasourceUrl,
            dataset: dataset,
            title: title,
            xAxis: xAxis,
            yAxis: yAxis,
            aggregate: aggregate,
            chartData: data,
            summary: values.summary,
            summaryData: summaryData
        })


        let {chartData, ...other} = this.state;
        this.props.updateProperties(other, this.props.i);
        

    }

    render() {
        return ( 
            <div className="draggable" style={{height:"100% "}}>
                {this.state.initialized ?
                <div style={{height:"calc(62.5% + 1px)"}}>
                    <p style={{fontFamily:'Georgia', textAlign:"center", fontSize:20, }}> {this.state.title} </p>
                    <ResponsiveContainer > 
                        <BarChart  data={this.state.chartData} width={730} height={250}  margin={{ top: 1,right: 30, left: 20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3"/>                 
                            <XAxis dataKey={this.state.xAxis}>
                                <Label value={this.state.xAxis} offset={-5} position="insideBottom" />
                            </XAxis>
                            <YAxis dataKey={this.state.yAxis}>
                                <Label value={this.state.yAxis} offset={-10} position="insideLeft" angle={-90}/>
                            </YAxis>
                            <Tooltip/>
                            <Bar dataKey={this.state.yAxis} fill="#CD5C5C" />
                            {/* <Bar dataKey="neutral" fill="orange" /> */}
                            {/* <Bar dataKey="negative" fill="grey" /> */}
                            
                            <Legend verticalAlign="top" height={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                :   <ChartForm initializeChart={this.initializeChart}/>
                }
                <div style={{marginTop:"20px"}} >
                    {this.state.summary ? 
                        <div>
                            <Descriptive summaryData={this.state.summaryData}/> 
                        </div> : ""}
                    {/* summary={this.props.properties.summary} summaryData = {this.state.summaryData} */}
                </div>
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
            summaryData:'',
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
        let url = this.props.properties.datasourceUrl;
        let aggregate = this.props.properties.aggregate;
        if (url) {
            request.get({
                url: url,
            }, function (error, response, body) {
                let data = JSON.parse(body);
                let chartData = data[self.props.properties.dataset];
                let xAxis = self.props.properties.xAxis;
                let yAxis = self.props.properties.yAxis;
                if (aggregate === "") {
                    chartData.sort((a, b) => a[xAxis] - b[xAxis]);
                } else {
                    chartData = new JsonProcessor().getAggregatedData(chartData, xAxis, yAxis, aggregate);
                }
                self.setState({ chartData });
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
        if (processor.getType(dataset, xAxis) !== "string") {
            data.sort((a, b) => a[xAxis] - b[xAxis]);
        } else {
            aggregate = "sum";
            data = processor.getAggregatedData(data, xAxis, yAxis, aggregate);
        }

        let summaryData = processor.getDetails(dataset,yAxis);

        this.setState({
            initialized: true,
            datasourceUrl: datasourceUrl,
            dataset: dataset,
            title: title,
            xAxis: xAxis,
            yAxis: yAxis,
            aggregate: aggregate,
            chartData: data,
            summary: values.summary,
            summaryData: summaryData
        })

        let { chartData, ...other } = this.state;
        this.props.updateProperties(other, this.props.i);
    }

    render() {
        return (
            <div className="draggable" style={{ height: "100% " }}>
                {this.state.initialized ?
                    <div style={{ height: "calc(70.5% + 1px)" }}>
                        <p style={{ fontFamily: 'Georgia', textAlign: "center", fontSize: 20, }}> {this.state.title} </p>
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
                        </ResponsiveContainer></div>

                    : <ChartForm initializeChart={this.initializeChart} />
                }

                <div style={{marginTop:"20px"}} >
                {this.state.summary ? 
                    <div>
                        <Descriptive summaryData={this.state.summaryData}/> 
                    </div>: ""}
                    {/* summary={this.props.properties.summary} summaryData = {this.state.summaryData} */}
                </div>
            </div>
        );   
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
                    processor:jsonProcessor,
                    summary:false,
                    
                }}

                // pass values to the charts
                onSubmit={this.props.initializeChart}

               
                // render form
                render={formProps=>(
                    <Form name="title" className="draggable" style={{textAlign: "center", zIndex: 100,height:"100%",width:"100%"}}>
                        <label>Chart Title</label>
                        <Field type="text" name="title" placeholder="Chart Title" style={{position:"relative"}} className = "cannotDrag"/>
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
        console.log("hiii" +e);
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

    // update state of initialized when props change
    /*componentWillReceiveProps(nextProps){
        if (nextProps.properties.initialized != this.state.initialized){
            this.setState({initialized: nextProps.properties.initialized});
        }
    }*/
    
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
        } else {
            columns.push({
                dataField: 'Max',
                text:  
                <div>Max<i style={{marginTop:10, marginRight:10, marginRight:4}} className="fa fa-times" onClick={() => this.delete(order)}></i></div>,
                

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
          }];


        var products = [{
            Sum: this.props.summaryData.total,
            Median: 30,
            Average: this.props.summaryData.average,
            Min: this.props.summaryData.min,
            Max:this.props.summaryData.max,
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
            <div  className="draggable" height="100%">
                
                <BootstrapTable keyField='id' data={products}
                    columns={columns}
                    //cellEdit={cellEditFactory({ mode: 'dbclick' })}
                    rowStyle={rowStyle}>
                   
                    
                </BootstrapTable>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('container'));