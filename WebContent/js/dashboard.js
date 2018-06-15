$(document).ready(function () {
	$(".collapse-link").on("click", function () {
        var a = $(this).closest(".x_panel"),
            b = $(this).find("i"), 
            c = a.find(".x_content");
            a.attr("style") ? c.slideToggle(200, function () {
            a.removeAttr("style")
        }) : (c.slideToggle(200), a.css("height", "auto")), b.toggleClass("fa-chevron-up fa-chevron-down")
    }), 
	$(".close-link").click(function () {
        var a = $(this).closest(".x_panel");
        a.remove();
	})
	
	//initialize charts
	initLineChart();
	initBarChart();
	initDoughnutChart();
	initRadarChart();
	initPolarChart();
	initPieChart();
})

function initLineChart(){
	var ctx = document.getElementById('lineChart').getContext('2d');
    ctx.canvas.width = 1200;
    ctx.canvas.height = 200;
    var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',
	
	    // The data for our dataset
	    data: {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        datasets: [
	            {
	            label: "My First dataset",
	            backgroundColor: "rgba(38, 185, 154, 0.31)",
	            borderColor: "rgba(38, 185, 154, 0.7)",
	            pointBorderColor: "rgba(38, 185, 154, 0.7)", 
	            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
	            pointHoverBackgroundColor: "#fff",
	            pointHoverBorderColor: "rgba(220,220,220,1)", 
	            pointBorderWidth: 1,
	            data: [31, 74, 6, 39, 20, 85, 7]
	            },
	            {label: "My Second dataset", 
	                        backgroundColor: "rgba(3, 88, 106, 0.3)", 
	                        borderColor: "rgba(3, 88, 106, 0.70)",
	                        pointBorderColor: "rgba(3, 88, 106, 0.70)", 
	                        pointBackgroundColor: "rgba(3, 88, 106, 0.70)", 
	                        pointHoverBackgroundColor: "#fff",
	                        pointHoverBorderColor: "rgba(151,187,205,1)", 
	                        pointBorderWidth: 1, 
	                        data: [82, 23, 66, 9, 99, 4, 2],
	        }]
	    },
	
	    // Configuration options go here
	    options: {}
	});
}

function initBarChart(){
	var ctx = document.getElementById('barChart').getContext('2d');
    ctx.canvas.width = 600;
    ctx.canvas.height = 200;
    var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'bar',
	
	    // The data for our dataset
	    data: {labels: ["January", "February", "March", "April", "May", "June", "July"], 
			datasets: [{label: "# of Votes", 
			backgroundColor: "#26B99A", 
			data: [51, 30, 40, 28, 92, 50, 45]}, 
			{label: "# of Votes", 
			backgroundColor: "#03586A", 
			data: [41, 56, 25, 48, 72, 34, 12]}]},
	
	    // Configuration options go here
	    options: {scales: {yAxes: [{ticks: {beginAtZero: !0}}]}}
	});
}

function initDoughnutChart(){
	var ctx = document.getElementById('doughnut').getContext('2d');
    ctx.canvas.width = 600;
    ctx.canvas.height = 200;
    var chart = new Chart(ctx, {
	
	    // The type of chart we want to create
	    type: "doughnut",
	
	    // The data for our dataset
	    data: {labels: ["Dark Grey", "Purple Color", "Gray Color", "Green Color", "Blue Color"], 
			datasets: [{ 
			backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"], 
			data: [120, 50, 140, 180, 100]}, 
			]},
	
	    // Configuration options go here
	   
	});
}

function initRadarChart(){
	var ctx = document.getElementById('radar').getContext('2d');
    ctx.canvas.width = 350;
    ctx.canvas.height = 200;
    var chart = new Chart(ctx, {

    // The type of chart we want to create
    type: "radar",

    // The data for our dataset
    data: {labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"], 
		datasets: [{ 
                        
                        backgroundColor: "rgba(3, 88, 106, 0.2)",
                        borderColor: "rgba(3, 88, 106, 0.80)", 
                        pointBorderColor: "rgba(3, 88, 106, 0.80)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.80)", 
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220,220,220,1)", 
                        data: [65, 59, 90, 81, 56, 55, 40]}, 
                        {
                        backgroundColor: "rgba(38, 185, 154, 0.2)",
                        borderColor: "rgba(38, 185, 154, 0.85)", 
                        pointColor: "rgba(38, 185, 154, 0.85)", 
                        pointStrokeColor: "#fff", 
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 96, 27, 100]}
		]},

    // Configuration options go here
   
    });
}

function initPolarChart(){
	var ctx = document.getElementById('polarArea').getContext('2d');
    ctx.canvas.width = 350;
    ctx.canvas.height = 200;
    var chart = new Chart(ctx, {

    // The type of chart we want to create
    type: 'polarArea',

    // The data for our dataset
   data: {labels: ["Dark Gray", "Purple", "Gray", "Green", "Blue"], 
		datasets: [{label: "My dataset", 
		backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"], 
		data: [120, 50, 140, 180, 100]}, 
		]},

    // Configuration options go here
    
    });
}

function initPieChart(){
	var ctx = document.getElementById('pie').getContext('2d');
    ctx.canvas.width = 350;
    ctx.canvas.height = 200;
    var chart = new Chart(ctx, {

    // The type of chart we want to create
    type: "pie",

    // The data for our dataset
    data: {labels: ["Dark Grey", "Purple Color", "Gray Color", "Green Color", "Blue Color"], 
		datasets: [{ 
		 backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"], 
		data: [120, 50, 140, 180, 100]}, 
		]},

    // Configuration options go here
    });
}