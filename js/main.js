function detallar() {

  d3.select('#comparar')
    .transition()
    .style("display", "block");

  d3.select('#detallar')
    .transition()
    .style("display", "none");

  d3.select('#dropdown')
    .transition()
    .style("display", "block");

  d3.select('#slYear')
    .transition()
    .style("display", "none");

  d3.select('#slider')
    .transition()
    .style("display", "none");

  d3.select('#col2')
    .transition()
    .style("display", "block");

  d3.select('#col1')
    .transition()
    .attr("class", "col-xl-8");

  d3.select('#target1')
    .transition()
    .style("display", "block");

  d3.select('#target3')
    .transition()
    .style("display", "none");

  d3.select('#labels')
    .transition()
    .style("display", "none");



};


function comparar() {

  d3.select('#comparar')
    .transition()
    .style("display", "none");

  d3.select('#target1')
    .transition()
    .style("display", "none");

  d3.select('#detallar')
    .transition()
    .style("display", "block");

  d3.select('#dropdown')
    .transition()
    .style("display", "none");

  d3.select('#slYear')
    .transition()
    .style("display", "block");

  d3.select('#slider')
    .transition()
    .style("display", "block");

  d3.select('#col2')
    .transition()
    .style("display", "none");

  d3.select('#col1')
    .transition()
    .attr("class", "col");

  d3.select('#target3')
    .transition()
    .style("display", "block");

  d3.select('#labels')
    .transition()
    .style("display", "block");

};
