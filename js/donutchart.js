d3.csv("https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2017.csv").then(data => {

  // crear de nuevo el div que contiene la visualización
  d3.select('#target2')
    .append('div')
    .attr("id", "viz3");
  // console.log("DATA: ", data);

  // Nest de los datos
  var nested_data = d3.nest()
    .key(function(d) {
      // return d3.timeMonth(parseTime(d.FECHA));
      return d["CLASE DE ESTUPEFACIENTE"];
    })
    .rollup(d => {
      return d3.sum(d, d => +d.CANTIDAD);
    })
    .sortKeys(d3.ascending)
    .entries(data);
  // console.log("Nested data: ", nested_data);

  var text = "";

  var width = 270,
    height = 270,
    thickness = 40,
    duration = 750;

  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var svg = d3.select("#viz3")
    .append('svg')
    .attr('class', 'pie')
    .attr('width', width)
    .attr('height', height);

  var g = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

  var arc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius);

  var pie = d3.pie()
    .value(function(d) {
      return d.value;
    })
    .sort(null);

  var path = g.selectAll('path')
    .data(pie(nested_data))
    .enter()
    .append("g")
    .on("mouseover", function(d) {
      let g = d3.select(this)
        .style("cursor", "pointer")
        .style("fill", "black")
        .append("g")
        .attr("class", "text-group");

      g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.key}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '-1.2em');

      g.append("text")
        .attr("class", "value-text")
        .text(`${d.data.value}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.6em');
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")
        .style("fill", color(this._current))
        .select(".text-group").remove();
    })
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(i))
    .on("mouseover", function(d) {
      d3.select(this)
        .style("cursor", "pointer")
        .style("fill", "black");
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")
        .style("fill", color(this._current));
    })
    .each(function(d, i) {
      this._current = i;
    });


  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')

    .text(text);

});



// UPDATE

function updatePie() {

  d3.select("#viz3").remove();

  // crear de nuevo el div que contiene la visualización
  d3.select('#target2')
    .append('div')
    .attr("id", "viz3");

  var year = document.getElementById("dropdown").value;
  console.log("YEAR: ", year);


  d3.csv("https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/201" + year + ".csv").then(data => {
    // console.log("DATA: ", data);

    // Nest de los datos
    var nested_data = d3.nest()
      .key(function(d) {
        // return d3.timeMonth(parseTime(d.FECHA));
        return d["CLASE DE ESTUPEFACIENTE"];
      })
      .rollup(d => {
        return d3.sum(d, d => +d.CANTIDAD);
      })
      .sortKeys(d3.ascending)
      .entries(data);
    // console.log("Nested data: ", nested_data);

    var text = "";

    var width = 270,
      height = 270,
      thickness = 40,
      duration = 750;

    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#viz3")
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);

    var g = svg.append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    var pie = d3.pie()
      .value(function(d) {
        return d.value;
      })
      .sort(null);

    var path = g.selectAll('path')
      .data(pie(nested_data))
      .enter()
      .append("g")
      .on("mouseover", function(d) {
        let g = d3.select(this)
          .style("cursor", "pointer")
          .style("fill", "black")
          .append("g")
          .attr("class", "text-group");

        g.append("text")
          .attr("class", "name-text")
          .text(`${d.data.key}`)
          .attr('text-anchor', 'middle')
          .attr('dy', '-1.2em');

        g.append("text")
          .attr("class", "value-text")
          .text(`${d.data.value}`)
          .attr('text-anchor', 'middle')
          .attr('dy', '.6em');
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")
          .style("fill", color(this._current))
          .select(".text-group").remove();
      })
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .on("mouseover", function(d) {
        d3.select(this)
          .style("cursor", "pointer")
          .style("fill", "black");
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")
          .style("fill", color(this._current));
      })
      .each(function(d, i) {
        this._current = i;
      });


    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(text);

  });

};
