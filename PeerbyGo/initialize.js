// Jelle Mul
// 11402148
var timedata =  [{time: "30-07 00:00", categories:{}},
                {time: "30-07 06:00", categories:{}},
                {time: "30-07 12:00", categories:{}},
                {time: "30-07 18:00", categories:{}},
                {time: "31-07 00:00", categories:{}},
                {time: "31-07 06:00", categories:{}},
                {time: "31-07 12:00", categories:{}},
                {time: "31-07 18:00", categories:{}}]

var map = new google.maps.Map(d3.select("#map").node(), {
  zoom: 9,
  zoomcontrol: true,
  center: {lat:52.161555, lng: 4.859314},
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  scrollwheel: false
});

function Zoom(lat, lng, zoom) {
  var myOptions = {
    zoom: zoom,
    center: {lat:lat, lng: lng}
  }
  map.setOptions(myOptions);
};

d3.json("../Data/transactions-of-3-random-days.json", function(error, data) {
  if (error) throw error;
  d3.json("../Data/archetypes-of-3-random-days.json", function(error, data2) {
    if (error) throw error;
    timeindex = 0
    for (i = 0; i < data.length; i++) {
      for (j = new Date("2011-07-30T06:00:00.000Z"), counter = 0; j < new Date("2011-08-01T00:00:00.000Z"); j.setHours(j.getHours() + 6)) {
        if (new Date(data[i].delivery.start) < j) {
          timeindex = counter
          break;
        }
        counter++
      }
      for (j = 0; j < data2.length; j++){
        if (data[i].productArchetype.id == data2[j].id) {
          for (k = 0; k < data2[j].categories.length; k++) {
            categorie = data2[j].categories[k].split(' ').join('_')
            categorie = categorie.split('-').join('_')
            if (categorie in timedata[0].categories) {
              timedata[timeindex].categories[categorie] += 1
            } else {
              timedata[timeindex].categories[categorie] = 1
            }
          };
        }
      }
    }
    function Filter(length, timestamp) {
    };

    // compute total for each state.

    total_transactions = []

    function sum( obj ) {
      var sum = 0;
      for( var el in obj ) {
        if( obj.hasOwnProperty( el ) ) {
          sum += parseFloat( obj[el] );
        }
      }
      return sum;
    }

    for (i = 0; i < timedata.length; i++) {
      total_transactions[i] = sum(timedata[i].categories)
    }

    TransactionMap(data);

    dashboard('#dashboard',timedata, data);
  });
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
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
