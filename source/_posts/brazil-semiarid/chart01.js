width = 600,
height = 800;

var svg_paralizations = d3.select("#chart-paralizations")
.append("svg")
.attr('version', '1.1')
.attr('viewBox', '0 0 ' + width + ' ' + height)
.attr('width', '100%')
.attr('class', 'map-chart');

var projection = d3.geoAlbers()
.center([-36.820037, -7.195265])
.rotate([0, 0])
.parallels([0, 0])
.scale(2800);

var path = d3.geoPath().projection(projection);

d3.queue()
.defer(d3.json, "cities_sertao.json")
.defer(d3.csv, "data_sertao.csv")
.await(draw_paralizations);

function draw_paralizations(error, br, dados_csv) {
  if (error) throw error;

  var scale = d3.scaleLinear()
    .domain([0, 50])
    .range([0, 1]);

  var municipios = topojson.feature(br, br.objects.municipios_sab);

  svg_paralizations.selectAll(".municipios")
  .data(municipios.features)
  .enter().append("path")
  .attr("id", function(d) {return "chart-paralizations-municipio-" + d.properties.ID;})
  .attr("d", path)
  .style("opacity", 0.8);

  for (var i = 0; i < dados_csv.length; i++) {
    svg_paralizations.select("#chart-paralizations-municipio-" + dados_csv[i].geoid)
    .attr("fill", function (){
      if (isNaN(dados_csv[i].qty_water_supply_paralizations)) return "#D3D3D3";
      return d3.interpolateRdYlBu(scale(+dados_csv[i].qty_water_supply_paralizations))
    });
  }
}
