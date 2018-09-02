import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rnd from 'react-rnd';
import request from 'request';
import { Formik, Form, Field } from 'formik';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Label, Legend, Tooltip, ResponsiveContainer} from 'recharts';
import { SplitButton, FormGroup, FormControl, Navbar, Nav, NavItem, NavDropdown, MenuItem, ButtonToolbar, Row, Col, Grid, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';


const api = 'http://localhost:8084/';
const datasourceUrl = 'http://localhost:8084/Dummy_API/getCustomerOrders';
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

class Dashboard extends Component {
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
            pageNo: 0
        }
    }

    componentDidMount() {
        // let templateName = document.getElementById("templateName").value;
        // if (templateName !== "null") {
        //     this.setState({templateName});
        // }
//        this.loadTemplate();
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
                    summary: ''
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

    changeSettings(i) {
        let components = this.state.components;
        let pageNo = this.state.pageNo;

        components[pageNo][i].properties.initialized = false;
        this.setState({ components });
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

                            <div className="right_col" width="100%">
                                <div className="col-md-6 col-xs-6">
                                    <DashboardForm/>
                                </div>

                                {/* <button className="btn btn-primary" id="changeSize" onClick={this.openModal} >Change Page Size</button> */}
                                {/* <Button bsStyle="info" onClick={this.getComponentDetails}>Get Component Details</Button> */}
                                {/* <Button className="col-md-2 col-xs-3" style={{ float:"right", minWidth:130 }} bsStyle="info" onClick={this.saveTemplate}>
                                        <i className="fa fa-save" /> Save Template
                                    </Button> */}
                                    <Button className="col-md-2 col-xs-3" style={{ float:"right", minWidth:150 }} bsStyle="success" onClick={this.toggleEditMode}>
                                        <i className="fa fa-edit" style={{ marginRight: 2 }} />
                                        {this.state.editMode ? "Leave Edit Mode" : "Enter Edit Mode"}
                                    </Button>
                                    {/* <Button className="col-md-2 col-xs-2" style={{ float:"right", minWidth:150 }} bsStyle="warning" onClick={this.savePresentation}>
                                        <i className="fa fa-edit" style={{ marginRight: 2 }} /> Export as PPT
                                    </Button> */}
                                <br />

                                <div className="col-sm-12 col-xs-12" style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: 'white', borderBottom: '3px solid #EB6B2A' }}>

                                    {/* <label> Add Component: </label> */}
                                    {/* <Button data-toggle="tooltip"   data-placement="bottom" title="Add Textbox" bsStyle="primary"
                                        onClick={this.addTextbox}   style={{ marginRight:5, marginLeft: 6 }}><i className="fa fa-font" /></Button> */}
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Bar Chart" bsStyle="warning"
                                        onClick={this.addBarChart}  style={{ marginRight:5 }}><i className="fa fa-bar-chart" /></Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Line Chart" bsStyle="success"
                                        onClick={this.addLineChart} style={{ marginRight:5 }}><i className="fa fa-line-chart" /></Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Table" bsStyle="danger"
                                        onClick={this.addTable}     style={{ marginRight:5 }}><i className="fa fa-table" /> </Button>
                                    {/* <Button data-toggle="tooltip"   data-placement="bottom" title="Add Image"
                                        onClick={this.addImage}     style={{ backgroundColor:"#31B0D5", color:"white", border:"1px solid #31B0D5", marginRight:5 }}><i className="fa fa-image" /></Button>
                                    <Button data-toggle="tooltip"   data-placement="bottom" title="Add Video"
                                        onClick={this.addVideo}     style={{ backgroundColor:"#D896FF", color:"white", border:"1px solid #D896FF", marginRight:160 }}><i className="fa fa-play-circle" /></Button> */}

                                </div>

                                <div style={{marginTop:40, height:120}} >
                                    <div className="col-xs-3 col-md-3" style={{textAlign:"center", verticalAlign:"middle"}}> 
                                        <label style={{fontFamily:'Georgia', fontSize:16,  marginTop:5, width:'100%', backgroundColor:'gold'}}>Total No. Users</label>
                                        <label style={{ fontSize:50, width: '100%', backgroundColor:'#FDFFA4',}}>100</label>
                                    </div>
                                    <div className="col-xs-3 col-md-3" style={{textAlign:"center", verticalAlign:"middle"}}> 
                                        <label style={{fontFamily:'Georgia', fontSize:16,  marginTop:5, width:'100%', backgroundColor:'limegreen'}}>Peak Hour</label>
                                        <br/><label style={{ fontSize:"50px",  width: '100%', backgroundColor:'#E1FFF3' }}>100</label>
                                    </div>
                                    <div className="col-xs-3 col-md-3" style={{textAlign:"center", verticalAlign:"middle"}}> 
                                        <label style={{fontFamily:'Georgia', fontSize:16,  marginTop:5, width:'100%', backgroundColor:'lightseagreen'}}>Most liked Product</label>
                                        <br/><label style={{fontSize:"50px", width: '100%', backgroundColor:'#E7EAFD'}}>100</label>
                                    </div>
                                    <div className="col-xs-3 col-md-3" style={{textAlign:"center",verticalAlign:"middle" }}> 
                                        <label style={{fontFamily:'Georgia', fontSize:16,  marginTop:5, width:'100%', backgroundColor:'deeppink'}}>Most liked Product</label>
                                        <br/><label style={{fontSize:"50px", width: '100%',backgroundColor:'#FDE7F9' }}>100</label>
                                    </div>
                                </div>

                                <div id="container" className="col-sm-12 col-xs-12" style={{ backgroundColor: 'white', height: "calc(100% + 100px)", marginTop: 15, }}>
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
                                                cancel={".nonDraggable"}
                                                dragHandleClassName={this.state.editMode ? "draggable" : "cannotDrag"}

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
                                            updateProperties={this.updateProperties.bind(this)}></Descriptive>*/}
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

class DashboardForm extends Component {
    render() {
        return (
            <Formik 
                // initialize values to use in form
                initialValues={{
                    dataset: datasets[0],
                    datasourceUrl: datasourceUrl,
                    processor:jsonProcessor,
                    
                }}

                // pass values to the charts
                onSubmit={this.props.initialiseBreakdown}

               
                // render form
                render={formProps=>(
                    <Form name="title" className="draggable" style={{ zIndex:100, height:45, width:700}}>
                        <label style={{fontFamily:'Georgia', textAlign:"center", fontSize:20, marginRight:20, marginTop:10}}>Choose the dataset</label>
                        <Field component="select" name="dataset" style={{textAlign:"center",  marginRight:20, borderRadius:20, fontSize:15, width:200}}>
                            {datasets.map((dataset)=>
                                <option key={dataset}>{dataset}</option>
                            )}
                        </Field>
                        <Button type="submit" bsStyle="warning" style={{backgroundColor:'#FF4500', font:"white"}}>Save the View</Button>
                    </Form>
                )}
            />
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
                <Textbox i={this.props.i} text={this.props.properties.text} editMode={false}
                    updateProperties={this.props.updateProperties} />
            );
        }
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

ReactDOM.render(<Dashboard/>, document.getElementById('container'));