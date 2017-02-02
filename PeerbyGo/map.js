// Jelle Mul
// 11402148

// import sources
// https://bl.ocks.org/mbostock/899711 for d3 overlay
//


// initialize the google maps
var map = new google.maps.Map(d3.select("#map").node(), {
  zoom: 9,
  zoomcontrol: true,
  center: {lat:52.161555, lng: 4.859314},
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  scrollwheel: false
});

// zoom to certain city
function Zoom(zoominfo) {
  var myOptions = {
    zoom: zoominfo[2],
    center: {lat:zoominfo[0], lng: zoominfo[1]}
  }
  map.setOptions(myOptions);
};

// makes clicked marker bigger and set all others to small
function resize_marker(markername) {
  d3.selectAll(markername)
    .on("click", function(d) {
      d3.selectAll('.marker').transition()
        .duration(100)
        .attr("r", 4.5)
      d3.selectAll('.marker2').transition()
        .duration(100)
        .attr("r", 4.5)
      d3.select(this).transition()
        .duration(100)
        .attr("r", 8)
  });
}

function TransactionMap(data) {
  transmap = {}
  // make bounds for the svg
  var bounds = new google.maps.LatLngBounds();
  d3.entries(data).forEach(function(d){
    bounds.extend(d.value.lat_lng = new google.maps.LatLng(d.value.contactInfo.geolocation.lat, d.value.contactInfo.geolocation.lng));
    bounds.extend(d.value.lat_lng_supp = new google.maps.LatLng(d.value.suppliers[0].user.geolocation.lat, d.value.suppliers[0].user.geolocation.lng));
  });
  map.fitBounds(bounds);

  // create overlay for d3 options
  var overlay = new google.maps.OverlayView(),
      r = 4.5,
      padding = r*2;
  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayMouseTarget)
        .append("svg")
        .attr('class','transactions');
    overlay.draw = function(){
      var projection = this.getProjection(),
          sw = projection.fromLatLngToDivPixel(bounds.getSouthWest()),
          ne = projection.fromLatLngToDivPixel(bounds.getNorthEast());
      // extend the boundaries so that markers on the edge aren't cut in half
      sw.x -= padding;
      sw.y += padding;
      ne.x += padding;
      ne.y -= padding;

      // set attributes of layer
      d3.select('.transactions')
        .attr('width',(ne.x - sw.x) + 'px')
        .attr('height',(sw.y - ne.y) + 'px')
        .style('position','absolute')
        .style('left',sw.x+'px')
        .style('top',ne.y+'px');

      // draw lines from start to end
      var line = layer.selectAll('.line')
        .data(d3.entries(data))
        .each(transform3)
        .each(transform4)
      .enter().append('line')
        .attr('class','line')
        .attr('x1', function(d) {
          d = projection.fromLatLngToDivPixel(d.value.lat_lng_supp);
          return d.x-sw.x;
        })
        .attr('y1', function(d) {
          d = projection.fromLatLngToDivPixel(d.value.lat_lng_supp);
          return d.y-ne.y;
        })
        .attr('x2', function(d) {
          d = projection.fromLatLngToDivPixel(d.value.lat_lng);
          return d.x-sw.x;
        })
        .attr('y2', function(d) {
          d = projection.fromLatLngToDivPixel(d.value.lat_lng);
          return d.y-ne.y;
        })
        .attr('stroke-width', 2)
        .attr('stroke', "black")
        .append('title').text(function(d){
          return ["product: "+d.value.productArchetype.locales.nl_NL[0]];
        });

      // draw red markes
      var marker = layer.selectAll('.marker')
        .data(d3.entries(data))
        .each(transform)
      .enter().append('circle')
        .attr('class','marker')
        .attr('r',r)
        .attr('cx',function(d) {
          d = projection.fromLatLngToDivPixel(d.value.lat_lng);
          return d.x-sw.x;
        })
        .attr('cy',function(d) {
          d = projection.fromLatLngToDivPixel(d.value.lat_lng);
          return d.y-ne.y;
        })
        .append('title').text(function(d){
          return ["product: "+d.value.productArchetype.locales.nl_NL[0]];
        })

      // draw blue markers
      var marker2 = layer.selectAll('.marker2')
        .data(d3.entries(data))
        .each(transform2)
      .enter().append('circle')
        .attr('class','marker2')
        .attr('r',r)
        .attr('cx',function(d) {
          d = projection.fromLatLngToDivPixel(d.value.lat_lng_supp);
          return d.x-sw.x;
        })
        .attr('cy',function(d) {
          d = projection.fromLatLngToDivPixel(d.value.lat_lng_supp);
          return d.y-ne.y;
        })
        .append('title').text(function(d){
          return ["product: "+d.value.productArchetype.locales.nl_NL[0]];
        });

      // functions to resize markers on click
      resize_marker('.marker')
      resize_marker('.marker2')

      // transform for red markers
      function transform(d) {
        d = projection.fromLatLngToDivPixel(d.value.lat_lng);
        return d3.select(this)
          .attr('cx',d.x-sw.x)
          .attr('cy',d.y-ne.y);
      }

      // transform for blue markers
      function transform2(d) {
        d = projection.fromLatLngToDivPixel(d.value.lat_lng_supp);
        return d3.select(this)
          .attr('cx',d.x-sw.x)
          .attr('cy',d.y-ne.y);
      }

      // transform for end points
      function transform3(d) {
        d = projection.fromLatLngToDivPixel(d.value.lat_lng_supp);
        return d3.select(this)
          .attr('x1',d.x-sw.x)
          .attr('y1',d.y-ne.y);
      }

      // transform for starting points
      function transform4(d) {
        d = projection.fromLatLngToDivPixel(d.value.lat_lng);
        return d3.select(this)
          .attr('x2',d.x-sw.x)
          .attr('y2',d.y-ne.y);
      }
    };
  };

  // update for map, called in dropdown
  transmap.update = function(data, timestamp) {
    // create deepcopy of data
    var copydata = JSON.parse(JSON.stringify(data));
    if (timestamp != "All timestamps" && timestamp != "No Data to show") {
      // set string to readable string for new date
      timestamp = ([timestamp.slice(0, 0), "2011-", timestamp.slice(0)].join('').replace(' ','T').split('T'))
      timestamp[1] = timestamp[1].concat(":00.000Z")
      timestamp[0] = timestamp[0].split('-')
      timestamp = timestamp[0][0].concat(timestamp[0][2].concat(timestamp[0][1].concat(timestamp[1])))
      timestamp = [timestamp.slice(0, 4), "-", timestamp.slice(4)].join('');
      timestamp = [timestamp.slice(0, 7), "-", timestamp.slice(7)].join('');
      timestamp = [timestamp.slice(0, 10), "T", timestamp.slice(10)].join('');
      // create date
      timestamp = new Date(timestamp)
      timestamp2 = timestamp
      timestamp3 = new Date(timestamp2.setHours(timestamp2.getHours() + 6))
      timestamp = new Date(timestamp.setHours(timestamp.getHours() - 6))
      // select right mapdata from copydata based on the dateobject
      for(i = 0; i < copydata.length; i++) {
        delivery = new Date(copydata[i].delivery.start)
        // remove all data who do not correspond to the timestamp
        if ((delivery.getTime() > timestamp.getTime() && delivery.getTime() < timestamp3.getTime()) == false) {
          copydata.splice(i, 1);
          i--;
        }
      }
    }
    // remove all current markers and lines
    d3.selectAll(".line").remove()
    d3.selectAll(".marker").remove()
    d3.selectAll(".marker2").remove()
    d3.selectAll(".transactions").remove()
    // create new overlay in any data is present
    if (timestamp != "No Data to show"){
      TransactionMap(copydata)
    }
  }
  overlay.setMap(map);
};
