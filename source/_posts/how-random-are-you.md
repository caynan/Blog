---
title: How Random Are You?
tags: 'Data Visualization, Data Analysis'
disqusIdentifier: how-random-are-you
keywords:
  - d3.js
  - data visualization
thumbnailImage: snow-flake-kacper-szczechla-thumb.jpg
thumbnailImagePosition: left
autoThumbnailImage: 'yes'
metaAlignment: center
coverImage: snow-flake-kacper-szczechla-thumb.jpg
coverCaption: Snow Flake by Kacper Szczechla
coverMeta: in
coverSize: full
comments: true
mathjax: false
date: 2017-02-24 21:26:02
---
How random do you really think you are?

<!-- more -->

This chart is an improvement on a colleague work, which can be found [here](https://arthurgca.github.io/visualizacaodados/#).

I tried to improve the information communication channel, by using a heat map.
The use of a heat map allowed us to have a better insight on the hours and days of the week on which the people who completed the survey perceived their selves as the most random.

The previous chart also used mean to aggregate all the users that answered on a given time slot, I choose to use median, since is a more robust metric to outliers, people who perceived theirselves as really bad(0) or really random (10).

Without further ado...

## Here is the chart

{% raw %}
<style>
  rect.bordered {
    stroke: #E6E6E6;
    stroke-width:2px;
  }

  text.mono {
    font-size: 9pt;
    font-family: Consolas, courier;
    fill: #aaa;
  }

  text.axis-workweek {
    fill: #000;
  }

  text.axis-worktime {
    fill: #000;
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>

<div id="chart"></div>
    <script type="text/javascript">
      var margin = { top: 50, right: 0, bottom: 100, left: 30 },
          width = 740 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
          days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          times = ["12p", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];
          datasets = "data.tsv";

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

      var timeLabels = svg.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((i >= 7 && i <= 18) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

      var heatmapChart = function(tsvFile) {
        d3.tsv(tsvFile,
        function(d) {
          return {
            day: +d.day,
            hour: +d.hour,
            value: +d.value
          };
        },
        function(error, data) {
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.day+':'+d.hour;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d) {return (d.hour) * gridSize; })
              .attr("y", function(d) { return (d.day) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });

          cards.select("title").text(function(d) { return d.value; });

          cards.exit().remove();

          console.log([].concat(colorScale.quantiles()))
          var legend = svg.selectAll(".legend")
              .data([].concat(colorScale.quantiles()), function(d) {console.log(d); return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) {return "≥ " + +d.toFixed(1); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();

        });
      };

      heatmapChart(datasets);
    </script>
    {% endraw %}     


## Insights

What this visualization tell us, is that first we probably have more people answering the form on Thursday; Second, it tell us that the majority of people tend to think that they are not that random.

We need more data, specially data from different days of the week, but we can see from the visualization that we probably don't have a great correlation between day of the week/hour and how random a person perceive itself.
