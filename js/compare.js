
function uploadLineValue() {

  d3.select("#labels2").remove();
 d3.select("#viz4").remove();
  d3.select('#target3')
  .append('div')
  .attr("id", "viz4")
  .attr("class", "col");

  var yearSL = document.querySelector("input[id='slYear']").value; //get the slide value
  console.log("Slide value: ", yearSL );

// margenes
var margin = {
    top: 20,
    right: 70,
    bottom: 30,
    left: 40
  },
  width = 790,
  height = 450,
  radius = Math.min(width, height) / 2,
  iwidth = width - margin.left - margin.right,
  iheight = height - margin.top - margin.bottom;

// formato de fecha
// formato de fecha
var parseTime = d3.timeParse("%m/%d/%Y"),
  parseTimeMonth = d3.timeParse("%B"),
  formatMonth = d3.timeFormat("%B");

// escala de color
const c = d3.scaleOrdinal(d3.schemeCategory10);

// crear svg
var svg = d3
  .select("#viz4")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/data/OLD/2016.csv").then(data => {

  // Nest de los datos
  var nested_data = d3.nest()
    .key(function(d) {
      // return d3.timeMonth(parseTime(d.FECHA));
      return d.FECHA;
    })
    .rollup(d => {
      return d3.sum(d, d => +d.CANTIDAD);
    })
    .sortKeys(d3.ascending)
    .entries(data);

  // filtered by months
  var orderByMonth = d3.nest()
    .key(function(d) {
      return formatMonth(parseTime(d.key));
    })
    .rollup(d => {
      return d3.sum(d, d => +d.value);
    })
    .entries(nested_data);

  // meses posibles
  const months = d3.extent(orderByMonth, d => parseTimeMonth(d.key));
  // console.log("Extend months: ", months);

  // Escala eje Y
  y = d3.scaleLinear()
    .domain([0, 80000000])
    .range([height - margin.bottom, margin.top]);

  // crear eje y
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

    // Label eje Y
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left )
  .attr("x", 0 - height / 1.7)
  .attr("dy", "1em")
  .text("CANTIDAD (g)");

  // escala x
  const x = d3.scaleTime()
    .domain(months)
    .range([margin.left, width - margin.right]);

  // crear eje x
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%B")));

});


var files = ["/data/OLD/2010.csv",
"/data/OLD/2011.csv",
"/data/OLD/2012.csv",
"/data/OLD/2013.csv",
"/data/OLD/2014.csv",
"/data/OLD/2015.csv",
"/data/OLD/2016.csv",
"/data/OLD/2017.csv",
"/data/OLD/2018.csv"];

Promise.all(files.map(url => d3.csv(url))).then(function(data) {
    console.log(data);

yearSL = yearSL -1;


for (var i = 7; i > yearSL; i--) {

        // Nest de los datos
        var nested_data = d3.nest()
          .key(function(d) {
            // return d3.timeMonth(parseTime(d.FECHA));
            return d.FECHA;
          })
          .rollup(d => {
            return d3.sum(d, d => +d.CANTIDAD);
          })
          .sortKeys(d3.ascending)
          .entries(data[i]);

          console.log("Ano: 201" + i, nested_data);

        // filtered by months
        var orderByMonth = d3.nest()
          .key(function(d) {
            return formatMonth(parseTime(d.key));
          })
          .rollup(d => {
            return d3.sum(d, d => +d.value);
          })
          .entries(nested_data);

        // meses posibles
        const months = d3.extent(orderByMonth, d => parseTimeMonth(d.key));
        // console.log("Extend months: ", months);

        // filtered by months
        var fixOrderByMonth = d3.nest()
          .key(function(d) {
            return parseTimeMonth(d.key);
          })
          .rollup(d => {
            return d3.sum(d, d => +d.value);
          })
          .entries(orderByMonth);

        // Escala eje Y
        y = d3.scaleLinear()
          .domain([0, 80000000])
          .range([height - margin.bottom, margin.top]);

        // escala x
        const x = d3.scaleTime()
          .domain(months)
          .range([margin.left, width - margin.right]);

        // agregar linea
        var line = d3
          .line()
          .x(d => x(parseTimeMonth(d.key)))
          .y(d => y(+d.value));

        // agregar path
        svg.append("path")
          .datum(orderByMonth)
          .attr("fill", "none")
          .attr("stroke", c(i))
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line);

           d3.select('#labels')
           .append('div')
           .attr("id", "labels2");


            d3.select("#labels2").append("p")
            .text("201" + i)
            .style("color", c(i))
            .attr("class", "text-truncate");
}

});

};
