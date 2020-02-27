"use-strict";

let width = 800;
let height = 600;

let svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

svg.append('text')
  .attr('x', 150)
  .attr('y', 60)
  .style('font-size', '15pt')
  .text("Airbnb locations in New York City");

let g = svg.append("g");

let project = d3.geoAlbers()
  .scale(70000)
  .rotate([74, 0])
  .center([0, 40.70])
  .translate([width/2,height/2]);

let geoPath = d3.geoPath()
  .projection(project);

d3.json('data/nygeo.json').then(function (data) {
  g.selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("fill", "#ccc")
    .attr("d", geoPath)
  });

  d3.csv('data/data.csv').then(function (point) {
    var location = svg.append( "g" ).attr( "id", "location" );
    location.selectAll('.circle')
      .data(point)
      .enter()
      .append('circle')
        .attr('cx', function(d) { 
            return project([d.longitude, d.latitude])[0]
        })
        .attr('cy', function(d) {
            return project([d.longitude, d.latitude])[1]
        })
        .attr('r', 2)
        .attr('fill', '#00cc44')
        .on( "click", function(){
          d3.select(this)
          .attr("opacity",1)
          .transition()
          .duration( 1000 )
          .attr( "cx", width * Math.round( Math.random() ) )
          .attr( "cy", height * Math.round( Math.random() ) )
          .attr( "opacity", 0 )
          .on("end",function(){
              d3.select(this).remove();
          })
      });
});