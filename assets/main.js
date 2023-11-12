let canvas1 = document.createElement("canvas");
let canvas2 = document.createElement("canvas");
let chart1 = document.getElementById("table1");
let chart2 = document.getElementById("table2");
canvas1.setAttribute("id", "graph1");
canvas2.setAttribute("id", "graph2");
let ContainerTable = document.getElementById("mw-content-text");
ContainerTable.insertBefore(canvas1, chart1);
ContainerTable.insertBefore(canvas2, chart2);
canvas1.width = 800; 
canvas1.height = 600; 
canvas2.width = 800; 
canvas2.height = 600; 

document.addEventListener("DOMContentLoaded", function () {
  let labels = [];
  let data = [];
  let tables = document.getElementsByTagName("table")[0];
  let tBodies = tables.getElementsByTagName("tbody")[0];
  let rows = tBodies.getElementsByTagName("tr");

  for (let i=1; i<rows.length; i++) {
    let countries = rows[i].getElementsByTagName("td")[0].innerText;
    labels.push(countries);
    let values = rows[i].getElementsByTagName("td");
    let countriesData = [];

    for (let j=2; j<values.length; j++) {
      let value = parseFloat(values[j].innerText.replace(",", "."));
      countriesData.push(value);
    }
    data.push(countriesData);
  }

  let context = document.getElementById("graph1").getContext("2d");

  if (context) {
    new Chart(context, {
      type: "line",
      data: {
        labels: [
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
        ],
        datasets: data.map((countryData, index) => ({
          label: labels[index],
          data: countryData,
          fill: false,
          borderColor: getRandomColor(),
        })),
      },
      options: {
        responsive: true,
      },
    });
  }
});

const mygraph2 = document.getElementById("table2");

let dataGraph2 = [];
for (let i=1; i<mygraph2.rows.length; i++) {
  const rowData = mygraph2.rows[i].cells;
  const object = {
    "N°": rowData[0].innerText.trim(),
    Country: rowData[1].innerText.trim(),
    "2007-09": rowData[2].innerText.trim(),
    "2010-12": rowData[3].innerText.trim(),
  };
  dataGraph2.push(object);
}

const context2 = document.getElementById("graph2").getContext("2d");
const countries2 = dataGraph2.map(data => data.Country);
const values2007_09 = dataGraph2.map(data => data["2007-09"]);
const values2010_12 = dataGraph2.map(data => data["2010-12"]);
new Chart(context2, {
  type: "bar",
  data: {
    labels: countries2,
    datasets: [
      {
        label: "2007-09",
        data: values2007_09,
        borderWidth: 1,
      },
      {
        label: "2010-12",
        data: values2010_12,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let table3 = document.createElement("canvas");
table3.id = "graph3";
let data3 = [];
const context3 = table3.getContext("2d");

const chart3Setup = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Data Series",
        data: data3,
        fill: false,
        borderColor: "rgb(0,0,0)",
        tension: 0.2,
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "X-Axis",
        },
      },
      y: {
        title: {
          display: true,
          text: "Y-Axis",
        },
      },
    },
  },
};

const graph3 = new Chart(context3, chart3Setup);
function updateChart() {
  const xstart = data3.length > 0 ? data3[data3.length - 1].x + 1 : 1;
  const ystart = data3.length > 0 ? data3[data3.length - 1].y : 0;
  fetch(
    `https://canvasjs.com/services/data/datapoints.php?xstart=${xstart}&ystart=${ystart}`
  )
    .then(response => response.json())
    .then(data => {
      data3.push({
        x: xstart,
        y: data[0][1],
      });
      graph3.update();
      setTimeout(updateChart, 1000);
    });
}

const h1 = document.querySelector("h1");
h1.insertAdjacentElement("beforebegin", table3);

updateChart();