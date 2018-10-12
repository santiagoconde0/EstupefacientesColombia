 // margenes
 margin = {
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

 // crear svg
 var svg = d3
   .select("#target1")
   .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 // Escala eje Y
 y = d3.scaleLinear()
   .domain([d3.min(nested_data, d => d.value), d3.max(nested_data, d => d.value)]).nice()
   .range([height - margin.bottom, margin.top]);

 // crear eje y
 svg.append("g")
   .attr("transform", `translate(${margin.left},0)`)
   .call(d3.axisLeft(y));


 // Llamar data
 d3.csv("/data/2010-2018.csv").then(data => {
   console.log("total data: ", data);
   // valores extremos
   var min = d3.min(data, d => +d.CANTIDAD),
     max = d3.max(data, d => +d.CANTIDAD);
   console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);


   // Escala eje Y
   y = d3.scaleLinear()
     .domain([min, max]).nice()
     .range([height - margin.bottom, margin.top]);

   // crear eje y
   svg.append("g")
     .attr("transform", `translate(${margin.left},0)`)
     .call(d3.axisLeft(y));
 });
