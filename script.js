const percentage = document.getElementById("percentComplete");
// bound values for chart
const min = 0;
var max = 10;
var tasksComplete = 0;

const chart = new Chart("chart", {
    type: "horizontalBar",
    data: {
        labels: [""],
        datasets: [{
            label: "Done",
            backgroundColor: ["teal"],
            data: [tasksComplete],
            maxBarThickness: 100,
            hoverBackgroundColor: ["aquamarine"],
        }]
    },
    options: {
        legend: {display: false},
        scales: {
            xAxes: [{ticks: {min: min, max: max}}]
        }
    }
});

/**
 * Updates the label and value of the first datapoint 
 * in the first dataset of achart.
 * @param {*} chart 
 * @param {*} name 
 * @param {*} val 
 */
function updateSettings(chart, name, val) {
    max = parseInt(val);
    chart.data.labels[0] = name;
    chart.options.scales.xAxes[0].ticks.max = max;
    chart.update();
}
/**
 * Increments or decrements a chart's 0th data value by incAmount. 
 * Won't increment or decrement beyond the bounds of local [min, max].
 * @param {*} chart chart to update
 * @param {*} incAmount increment amount. Make negative to decrement
 */
function incDec(chart, incAmount) {
    if ((tasksComplete <= min && incAmount < 0) || (tasksComplete >= max && incAmount > 0)) { return; }
    tasksComplete += incAmount;
    chart.data.datasets[0].data[0] = tasksComplete;
    chart.update();
    percentage.innerHTML = Math.round(tasksComplete/max*100) + "%";
};

// inc & dec chart value with buttons
document.getElementById("increment").addEventListener('click', () => incDec(chart, 1));
document.getElementById("decrement").addEventListener('click', () => incDec(chart, -1));

// update settings if they change
document.getElementById("settings").addEventListener('submit', (e) => {
    e.preventDefault();
    const numSubtasks = document.getElementById("numSubtasks").value;
    const taskName = document.getElementById("taskName").value;
    updateSettings(chart, taskName, numSubtasks);
    // if min / max is changed, fix to the bounds
    if (tasksComplete < min) { tasksComplete = min; }
    else if (tasksComplete > max) { tasksComplete = max; }
    percentage.innerHTML = Math.round(tasksComplete/max*100) + "%";
});