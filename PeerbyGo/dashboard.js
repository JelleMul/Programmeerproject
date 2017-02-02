function sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}



function dashboard(id, fData, data){
  var barColor = 'lightgreen';
  function segColor(c){ return {Christmas:"#a6cee3", Cooking:"#1f78b4", Cycling:"#b2df8a", Electronics:"#33a02c",
  Entertainment:"#dd4477", Garden: "#fb9a99", Home_improvement:"#e31a1c", Ironwork:"#22aa99", Kitchen:"#fdbf6f",
  Moving:"#ff7f00", Office:"#cab2d6", Party:"#6a3d9a", Photo:"#8b0707", TV:"#ffff99", Video:"#b15928", Woodwork:"#a6cee3",
  boormachine:"#994499", festival:"#1f78b4", game_night:"#b2df8a", going_outside:"#33a02c", koningsdag:"#6633cc",
  oktoberfest:"#dc991f", partytent:"#fdbf6f", sinterklaas:"#dd4477"}[c]; }

  function filter(d) {
    var st = fData.filter(function(s){ return s.time == d[0];})[0]
    typeList = [];
    for (var key in st.categories) {
      if (typeList.indexOf(key) == -1) {
        typeList.push(key)
      };
    };
    typeList.sort();

    var nD = typeList.map(function(d) {
      if (st.categories[d] != 0) {
        return {type:d, freq: st.categories[d]}
      }
    });

    for (i = 0; i < nD.length; i++) {
      if (nD[i] == undefined) {
        nD.splice(i, 1);
        i--;
      }
    }
    return [st, nD]
  }

  // compute total for each state.
  fData.forEach(function(d){d.total = sum(d.categories)});
  // function to handle histogram.
  function histoGram(fD){
      var hG={},    hGDim = {t: 60, r: 0, b: 50, l: 100};
      hGDim.w = 550 - hGDim.l - hGDim.r,
      hGDim.h = 300- hGDim.t - hGDim.b;

      //create svg for histogram.
      var hGsvg = d3.select(id).append("svg")
          .attr("id", "barchart")
          .attr("width", hGDim.w + hGDim.l + hGDim.r)
          .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
          .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

      // create function for x-axis mapping.
      var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
              .domain(fD.map(function(d) { return d[0]; }));

      // Add x-axis to the histogram svg.
      hGsvg.append("g").attr("class", "x axis")
          .attr("transform", "translate(0," + hGDim.h + ")")
          .call(d3.svg.axis().scale(x).orient("bottom"))
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)" );

      hGsvg.append("text")
        .attr("id", "title")
        .attr("x", 230)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Amount of transactions")
        .style("font-weight", "bold");

      // Create function for y-axis map.
      var y = d3.scale.linear().range([hGDim.h, 0])
              .domain([0, d3.max(fD, function(d) { return d[1]; })]);

      // Create bars for histogram to contain rectangles and freq labels.
      var bars = hGsvg.selectAll(".bar").data(fD).enter()
              .append("g").attr("class", "bar");

      //create the rectangles.
      bars.append("rect")
          .attr("x", function(d) { return x(d[0])+27; })
          .attr("y", function(d) { return y(d[1]); })
          .attr("width", x.rangeBand())
          .attr("height", function(d) { return hGDim.h - y(d[1]); })
          .attr('fill',barColor)
          .on("mouseover",mouseover)// mouseover is defined below.
          .on("mouseout",mouseout);// mouseout is defined below.

      //Create the frequency labels above the rectangles.
      bars.append("text").text(function(d){ return d3.format(",")(d[1])})
          .attr("x", function(d) { return x(d[0]) +27 +x.rangeBand()/2; })
          .attr("y", function(d) { return y(d[1])-5; })
          .attr("text-anchor", "middle");

      function mouseover(d){  // utility function to be called on mouseover.
          // filter for selected timeblock.

          selected_data = filter(d);
          // call update functions of pie-chart and legend.
          pC.update(selected_data[1], d[0]);
          leg.update(selected_data[1]);
      }

      function mouseout(d){    // utility function to be called on mouseout.
          // reset the pie-chart and legend.
          pC.update(tF, "Frequency of categories");
          leg.update(tF);
      }

      // create function to update the bars. This will be used by pie-chart.
      hG.update = function(nD, color, categorie){
          // update the domain of the y-axis map to reflect change in frequencies.
          y.domain([0, d3.max(nD, function(d) { return d[1]; })]);

          // Attach the new data to the bars.
          var bars = hGsvg.selectAll(".bar").data(nD);

          // transition the height and color of rectangles.
          bars.select("rect").transition().duration(500)
              .attr("y", function(d) {return y(d[1]); })
              .attr("height", function(d) { return hGDim.h - y(d[1]); })
              .attr("fill", color);

          hGsvg.selectAll("#title")
            .text(function(d){ return categorie })
            .style("font-weight", "bold")

          // transition the frequency labels location and change value.
          bars.select("text").transition().duration(500)
              .text(function(d){ return d3.format(",")(d[1])})
              .attr("y", function(d) {return y(d[1])-5; });


      }
      return hG;
  }

  // function to handle pieChart.
  function pieChart(pD){
      var pC ={},    pieDim ={w:290, h: 350};
      pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

      // create svg for pie chart.
      var piesvg = d3.select(id).append("svg")
          .attr("id", "piechart")
          .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
          .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

      // create function to draw the arcs of the pie slices.
      var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

      // create a function to compute the pie slice angles.
      var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

      // Draw the pie slices.
      piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
          .each(function(d) { this._current = d; })
          .style("fill", function(d) { return segColor(d.data.type); })
          .on("mouseover",mouseover).on("mouseout",mouseout);

      piesvg.append("text")
        .attr("x", 0)
        .attr("y", -160)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Frequency of categories")
        .style("font-weight", "bold");

      // create function to update pie-chart. This will be used by histogram.
      pC.update = function(nD, timestamp){
        var Parent = document.getElementById("piechart");
        if (Parent != null) {
          while(Parent.hasChildNodes())
          {
           Parent.removeChild(Parent.firstChild);
          }
        };

        var piesvg = d3.select('#piechart')
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

        piesvg.append("text")
          .attr("x", 0)
          .attr("y", -160)
          .attr("text-anchor", "middle")
          .style("font-size", "20px")
          .text(function(d) { return timestamp})
          .style("font-weight", "bold");

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(nD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout)
            .transition()
            .duration(function(d, i) {
              return 600;
            })
            .attrTween('d', function(d) {
              var i = d3.interpolate(d.startAngle, d.endAngle);
              return function(t) {
                d.endAngle = i(t);
              return arc(d);
              }
            })

      }

      // Utility function to be called on mouseover a pie slice.
      function mouseover(d){
          // call the update function of histogram with new data.
          hG.update(fData.map(function(v){
            if (v.categories[d.data.type] == undefined) {
              v.categories[d.data.type] = 0
            }
              return [v.time,v.categories[d.data.type]];}),segColor(d.data.type), d.data.type);

          leg.highlight(d.data.type, "blue")
      }
      //Utility function to be called on mouseout a pie slice.
      function mouseout(d){
          // call the update function of histogram with all data.
          hG.update(fData.map(function(v){
              return [v.time,v.total];}), barColor, "Amount of transactions");

          leg.highlight(d.data.type, "#5998E5")
      }
      // Animating the pie-slice requiring a custom function which specifies
      // how the intermediate paths should be drawn.
      function arcTween(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) { return arc(i(t));    };
      }
      return pC;

  }

  // function to handle legend.
  function legend(lD){
      function columns(tr) {
        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
            .attr("fill",function(d){ return segColor(d.type); });

        // create the second column for each segment.
        tr.append("td").attr("class",'LegendName')
            .text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return d3.format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});
      }
      var leg = {};

      // create table for legend.
      var legend = d3.select("#tablediv").append("table").attr('id', 'legenda').attr('class','legend');

      // create one row per segment.s
      var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
      // create table
      columns(tr)

      // Utility function to be used to update the legend.
      leg.update = function(nD, string){
          var Parent = document.getElementById("legenda");
          if (Parent != null) {
            while(Parent.hasChildNodes())
            {
             Parent.removeChild(Parent.firstChild);
            }
          };
          if (string == undefined) {
            // update the data attached to the row elements.
            var tr = legend.append("tbody").selectAll("tr").data(nD).enter().append("tr");
            // create table
            columns(tr)

          } else {
            legend.append("text")
            .text(string)
            .style("margin-left", "40px")
            .style("font-size", "20px")
            .style("font-weight", "bold")
          }
      }
      // highlight row of the categorie with color
      leg.highlight = function(categorie, color){
        d3.selectAll("tr").filter(function() {
          return this.innerText.startsWith(categorie)
          })
          .style("background-color", color)
      }
      // Utility function to compute percentage.
      function getLegend(d,aD){
          return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
      }
      return leg;
  }
  // calculate total frequency by segment for all timestamps.
  function typesToArray(data) {
    typeList = [];
    for (i = 0; i < data.length; i++){
      for (var key in data[i].categories) {
        if (typeList.indexOf(key) == -1) {
          typeList.push(key)
        };
      };
    };
    typeList.sort();
    return {typeList}
  };

  typesToArray(fData)
  var tF = typeList.map(function(d){
      return {type:d, freq: d3.sum(fData.map(function(t){
        if (d in t.categories) {
          return t.categories[d]
        }
        ;}))};
  });

  // calculate total frequency by state for all segment.
  var sF = fData.map(function(d){return [d.time,d.total];});

  var hG = histoGram(sF), // create the histogram.
      pC = pieChart(tF), // create the pie-chart.
      leg= legend(tF);  // create the legend.

  var elements = []
  elements.push("All timestamps")
  for (i = 0; i < timedata.length; i++) {
    elements.push(timedata[i].time)
  }
  var selection = elements[0];

  var selector = d3.select(".dropdown")
    .append("select")
    .attr("id","dropdown")
    .on("change", function(d){
      selection = document.getElementById("dropdown");
      if (selection.value != "All timestamps") {
        d = []
        for (i = 0; i < timedata.length; i++) {
          if (timedata[i].time == selection.value) {
            d.push(selection.value, timedata[i].total)
          }
        }

        selected_data=filter(d)

        // call update functions of pie-chart and legend.
        if (selected_data[1].length != 0) {
          pC.update(selected_data[1], selection.value);
          leg.update(selected_data[1]);
          transmap.update(data, selection.value)
        } else {
          pC.update(selected_data[1], "No Data to show");
          leg.update(selected_data[1], "No Data to show");
          transmap.update(data, "No Data to show")
        }

      } else {
        pC.update(tF, "Frequency of categories");
        leg.update(tF);
        transmap.update(data, selection.value)
      }
    });
  selector.selectAll("option")
    .data(elements)
    .enter().append("option")
    .attr("value", function(d){
      return d;
    })
    .text(function(d){
      return d;
    })
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
