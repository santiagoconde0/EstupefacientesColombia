var url2010 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2010.csv",
  url2011 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2011.csv",
  url2012 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2012.csv",
  url2013 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2013.csv",
  url2014 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2014.csv",
  url2015 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2015.csv",
  url2016 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2016.csv",
  url2017 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2017.csv",
  url2018 = "https://raw.githubusercontent.com/santiagoconde0/EstupefacientesColombia/master/data/2018.csv";

// llamar fata del 2010

let y = 0;

d3.csv(url2010).then(data => {
  // console.log("url 2010:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
  y = max;
});


d3.csv(url2011).then(data => {
  // console.log("url 2011:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
});
d3.csv(url2012).then(data => {
  // console.log("url 2012:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
});
d3.csv(url2013).then(data => {
  // console.log("url 2013:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
});
d3.csv(url2014).then(data => {
  // console.log("url 2014:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
});
d3.csv(url2015).then(data => {
  // console.log("url 2015:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
});
d3.csv(url2016).then(data => {
  // console.log("url 2016:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
});
d3.csv(url2017).then(data => {
  // console.log("url 2017:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
});
d3.csv(url2018).then(data => {
  // console.log("url 2018:", data);

  // valores extremos
  var min = d3.min(data, d => +d.CANTIDAD),
    max = d3.max(data, d => +d.CANTIDAD);
  console.log("Cantidad minima: " + min + " y Cantidad maxima: " + max);
});


var i = 0; //anio min

  function myLoop() {
    setTimeout(function() {
console.log("Y:", y);
      i++;
      if (i < 5) { //anio max
        myLoop();
      }
    }, 500)
  }
  myLoop();
