 // margenes
var margin = {
     top: 20,
     right: 30,
     bottom: 30,
     left: 100
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

 // crear svg
 var svg = d3
   .select("#target1")
   .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 // Llamar data
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
   // console.log("Nested data: ", nested_data);
   // var nestTotal = nested_data.map(d => d.value);
   // console.log("nestTotal: ", nestTotal);
   // console.log("TOTAL: ", nestTotal.reduce((a, b) => a + b, 0));

   // filtered by months
   var orderByMonth = d3.nest()
     .key(function(d) {
       return formatMonth(parseTime(d.key));
     })
     .rollup(d => {
       return d3.sum(d, d => +d.value);
     })
     .entries(nested_data);
   // console.log("Ordered by month: ", orderByMonth);
   // var nestTotal2 = orderByMonth.map(d => d.value);
   // console.log("TOTAL: ", nestTotal2.reduce((a, b) => a + b, 0));

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
   // console.log("FIX Ordered by month: ", fixOrderByMonth);// var nestTotal23 = fixOrderByMonth.map(d => d.value);
   // console.log("TOTAL: ", nestTotal23.reduce((a, b) => a + b, 0));

   var min = d3.min(fixOrderByMonth, d => +d.value),
     max = d3.max(fixOrderByMonth, d => +d.value);
   // console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);

   // Escala eje Y
   y = d3.scaleLinear()
     .domain([0, max])
     .range([height - margin.bottom, margin.top]);

   // crear eje y
   svg.append("g")
     .attr("transform", `translate(${margin.left},0)`)
     .call(d3.axisLeft(y));

   // escala x
   const x = d3.scaleTime()
     .domain(months)
     .range([margin.left, width - margin.right]);

   // crear eje x
   svg.append("g")
     .attr("transform", `translate(0,${height - margin.bottom})`)
     .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%B")));


   var fixed = orderByMonth.map(d => x(parseTimeMonth(d.key)))
   // console.log("Fixed: ", fixed);
   var nestTotal234 = fixed.map(d => d.value);
   // console.log("TOTAL: ", nestTotal234.reduce((a, b) => a + b, 0));


   var fixed2 = orderByMonth.map(d => y(+d.value))
   // console.log("Fixed: ", fixed2);

   // agregar linea
   var line = d3
     .line()
     .x(d => x(parseTimeMonth(d.key)))
     .y(d => y(+d.value));

   // agregar path
   svg.append("path")
     .datum(orderByMonth)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 2)
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("d", line);
 });
