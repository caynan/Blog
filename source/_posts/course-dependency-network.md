---
title: Course Dependency Network
tags: 'D3.js, data visualization'
disqusIdentifier: course-dependency-network
keywords:
  - javascript
  - d3.js
  - data visualization
thumbnailImage: image/network-delfi-de-la-rua-min.jpg
thumbnailImagePosition: left
autoThumbnailImage: 'yes'
metaAlignment: center
coverImage: image/network-delfi-de-la-rua-min.jpg
coverCaption: by Delfi De La Rua
coverMeta: in
coverSize: full
comments: true
mathjax: false
date: 2017-04-02 18:45:19
---

Let's do some data visualization on networks (graphs)...

<!-- more -->

{% raw %}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.7.3/d3.js"></script>
    <script src="https://d3js.org/d3-color.v1.min.js"></script>
    <script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
    <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
    <script src="https://d3js.org/d3-scale.v1.min.js"></script>
    <script src="js/d3-tip.js"></script>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
      integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
      crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
{% endraw %}


{% raw %}
  <style>
    .link {
      stroke: #ccc;
    }

    .node text {
      pointer-events: none;
      font: 10px sans-serif;
    }

    .d3-tip {
      line-height: 1;
      font-weight: bold;
      padding: 12px;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      border-radius: 2px;
    }

    .d3-tip:after {
      box-sizing: border-box;
      display: inline;
      font-size: 10px;
      width: 100%;
      line-height: 1;
      color: rgba(0, 0, 0, 0.8);
      content: "\25BC";
      position: absolute;
      text-align: center;
    }

    .d3-tip.n:after {
      margin: -1px 0 0 0;
      top: 100%;
      left: 0;
    }
  </style>
{% endraw %}


Below you can choose a course (or two) and se the difference between them, you can
also double-click on any given node to see only it's immediate neighbors.

All courses have a central node (the bigger one) which basically is connected to all courses which don't have dependencies.

For example, if you choose `administracao_n_ss` you can see all the courses from the business major at the Campina Grande campus, you can compare it with the
same major but on a different campus (e.g: `administracao_n_cg`) you cann see how different they are, the one from the Campina Grande campus have more classes from different departments, and have a different topology, you can hover over the node to see their name (sorry they're all in portuguese).

Have Fun!!  

{% alert info %}
- You can __double click__ on node to see only their immediate neighbors.
- You can __hover over__ the node to see their names.
- The bigger node show the beginning of the course (all classes you can take without any pre-requisite).
{% endalert %}

{% raw %}
<div class="row">
    <div class="col-md-6">
        <div class="input-group center">
            <div class="dropdown">
                <button id="dropdown1" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    engenharia_eletrica_cg
                    <span class="caret"></span>
                </button>
                <ul id="options1" class="dropdown-menu scrollable-menu">

                </ul>
            </div>
        </div>
    </div>
    </div>
        <!-- endcontent -->
          <div id="chart1" style="width=100%; margin: 0 auto;"></div>
        <!-- content -->


        <div class="input-group center">
            <div class="dropdown">
                <button id="dropdown2" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    ciencia_da_computacao_d_cg
                    <span class="caret"></span>
                </button>
                <ul id="options2" class="dropdown-menu scrollable-menu">

                </ul>
            </div>
        </div>
        <!-- endcontent -->
          <div id="chart2" style="width=100%; margin: 0 auto;"></div>
        <!-- content -->
{% endraw %}

{% raw %}
<script src="js/d3-network.js"></script>
{% endraw%}
