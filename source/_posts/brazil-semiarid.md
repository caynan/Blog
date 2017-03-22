---
title: Visualizing the Brazilian Semiarid
tags: 'Data Visualization, Data Analysis, Brazil, Semiarid'
disqusIdentifier: brazil-semiarid
keywords:
  - d3.js
  - data visualization
thumbnailImage: sertao_fre_sonneveld_thumb.jpg
thumbnailImagePosition: right
autoThumbnailImage: 'yes'
metaAlignment: center
coverImage: sertao_fre_sonneveld.jpg
coverCaption: Sertão by Fré Sonneveld
coverMeta: in
coverSize: full
comments: true
mathjax: false
date: 2017-03-20 21:26:02
---
{% raw %}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.7.3/d3.js"></script>
    <script src="https://d3js.org/d3-color.v1.min.js"></script>
    <script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
    <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
    <script src="https://d3js.org/d3-scale.v1.min.js"></script>
    <script src="//d3js.org/topojson.v1.min.js"></script>
{% endraw %}

Also Know as Sertão.

Originally the term referred to the vast hinterlands of Asia and South America that Lusitanian explorers encountered. In Brazil it referred to backlands away from the Atlantic coastal regions where the Portuguese first settled in South America in the early sixteenth century. A Brazilian historian once referred to colonial life in Brazil as a "civilization of crabs", as most settlers clung to the shoreline, with few trying to make inroads into the sertão. In modern terms, "sertão" refers to the semi-arid region in Northeastern Brazil comprising parts of the states of Alagoas, Bahia, Pernambuco, Paraíba, Rio Grande do Norte, Ceará, Maranhão, Piauí, and parts of northern Minas Gerais. The term Vaqueiro is similar to the generic use of "cowboy" in the United States.

Geographically, the sertão consists mainly of low uplands that form part of the Brazilian Highlands. Most parts of the sertão are between 200 and 500 meters above sea level, with higher elevations found on the eastern edge in the Planalto da Borborema, where it merges into a sub-humid region known as agreste, in the Serra da Ibiapaba in western Ceará and in the Serro do Periquito of central Pernambuco. In the north, the sertão extends to the northern coastal plains of Rio Grande do Norte state, whilst in the south it fades out in the northern fringe of Minas Gerais.
Two major rivers cross the sertão, the Rio Jaguaribe and the Rio Piranhas further east. Apart from the Rio São Francisco, which originates outside the region, other rivers dry out after the rainy periods end.

# Visualizing info about it
Let's plot some maps of this region with some interesting data.

## Quantity of water supply stops

Let's see which cities had the highest rate of stop in the water supply. We're using a continuos color scale from blue to red, which means that the lower
the number of water supply stops during the year of 2015 the bluer the city is and the more stops we have the city is in a darker shade of red. Grey cities show are cities on which we don't have data.

{% raw %}
    <div id="chart-paralizations"></div>
{% endraw %}

{% raw %}
<script>
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
  </script>
{% endraw %}


## Regions with the highest demand for water

Let's see where is concentrated the highest number of people with water supply, so we can see which regions has the highest demand for water. We're using a color scale from light blue to dark blue, the higher the demand the darker is the shade of blue. Grey cities show are cities on which we don't have data.

{% raw %}
    <div id="chart-water-supply"></div>
{% endraw %}

{% raw %}
  <script>
      width = 600,
      height = 800;

      var svg_water = d3.select("#chart-water-supply")
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
      .await(draw_water);

      function draw_water(error, br, dados_csv) {
        if (error) throw error;

        var scale = d3.scaleLinear()
          .domain([1714, 22590])
          .range([0, 1]);      

        var municipios = topojson.feature(br, br.objects.municipios_sab);

        svg_water.selectAll(".municipios")
        .data(municipios.features)
        .enter().append("path")
        .attr("id", function(d) {return "chart-water-supply-municipio-" + d.properties.ID;})
        .attr("d", path)
        .style("opacity", 0.8);

        for (var i = 0; i < dados_csv.length; i++) {
          svg_water.select("#chart-water-supply-municipio-" + dados_csv[i].geoid)
          .attr("fill", function (){
            var value = +dados_csv[i].pop_with_water_supply
            if (isNaN(value)) return "#D3D3D3";
            return d3.interpolateBlues(scale(value))
          });
        }
      }
    </script>
{% endraw %}

## If the City Has Selective Waste Collection or Not

Let's see which cities have selective waste collection or not, cities in green have it and cities in red don't have it. Grey cities show cities on which we don't have data.

{% raw %}
    <div id="chart-waste"></div>
{% endraw %}

{% raw %}
  <script>
      width = 600,
      height = 800;

      var svg_waste = d3.select("#chart-waste")
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
      .await(draw_waste);

      function draw_waste(error, br, dados_csv) {
        if (error) throw error;    

        var municipios = topojson.feature(br, br.objects.municipios_sab);

        svg_waste.selectAll(".municipios")
        .data(municipios.features)
        .enter().append("path")
        .attr("id", function(d) {return "chart-waste-supply-municipio-" + d.properties.ID;})
        .attr("d", path)
        .style("opacity", 0.8);

        for (var i = 0; i < dados_csv.length; i++) {
          svg_waste.select("#chart-waste-supply-municipio-" + dados_csv[i].geoid)
          .attr("fill", function (){
            var value = dados_csv[i].has_selective_waste_collection

            if (value == "NA") {
              return "#D3D3D3"
            }
            else if (value == "TRUE") {
              return "#77dd77"
            }
            else {
              return "#ff6961"
            }
          });
        }
      }
    </script>
{% endraw %}
