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
        a.remove()
    })
})
(function(){
var ctx = document.getElementById('lineChart').getContext('2d');
    ctx.canvas.width = 1500;
    ctx.canvas.height = 400;
var chart = new Chart(ctx, {
    responsive:true,
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});})()