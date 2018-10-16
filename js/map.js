var width = 900,
  height = 900;

var svg = d3.select("#target3").append("svg")
  .attr("width", width)
  .attr("height", height);

/*
ogr2ogr -f GeoJSON depts.json depto.shp -s_srs EPSG:26986 -t_srs EPSG:4326
topojson --id-property NOMBRE_DPT -p name=NOMBRE_DPT -p name -o colombia-departamentos.json depts.json
*/

d3.json("data/colombia-municipios.json", function(error, co) {
  var subunits = topojson.feature(co, co.objects.mpios);
  var projection = d3.geo.mercator()
    .scale(2000)
    .translate([width / 2, height / 2])
    .center([-61, 43])
    .rotate([2, 3, 2]);
  var path = d3.geo.path()
    .projection(projection);
  svg.append("path")
    .datum(subunits)
    .attr("d", path);
  svg.selectAll(".mpio")
    .data(topojson.feature(co, co.objects.mpios).features)
    .enter().append("path")
    .attr("class", function(d) {
      return "mpio " + "_" + d.id;
    })
    .attr("d", path);
  svg.append("path")
    .datum(topojson.mesh(co, co.objects.mpios, function(a, b) {
      return a !== b;
    }))
    .attr("d", path)
    .attr("class", "mpio-borde");
  svg.append("path")
    .datum(topojson.mesh(co, co.objects.depts, function(a, b) {
      return a !== b;
    }))
    .attr("d", path)
    .attr("class", "depto-borde");

  svg.selectAll(".dept-label")
    .data(topojson.feature(co, co.objects.depts).features)
    .enter().append("text")
    .attr("class", function(d) {
      return "dept-label " + d.id;
    })
    .attr("transform", function(d) {
      return "translate(" + path.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .text(function(d) {
      return d.properties.name;
    });
});
