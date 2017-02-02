// Jelle Mul
// 11402148

// create a format where data can be put into
var timedata =  [{time: "30-07 00:00", categories:{}},
                {time: "30-07 06:00", categories:{}},
                {time: "30-07 12:00", categories:{}},
                {time: "30-07 18:00", categories:{}},
                {time: "31-07 00:00", categories:{}},
                {time: "31-07 06:00", categories:{}},
                {time: "31-07 12:00", categories:{}},
                {time: "31-07 18:00", categories:{}}]

// load 2 json datasets
d3.json("../Data/transactions-of-3-random-days.json", function(error, data) {
  if (error) throw error;
  d3.json("../Data/archetypes-of-3-random-days.json", function(error, data2) {
    if (error) throw error;
    timeindex = 0
    // loop through all the transactions
    for (i = 0; i < data.length; i++) {
      // find in which timestamp the transaction is deliverd
      for (j = new Date("2011-07-30T06:00:00.000Z"), counter = 0; j < new Date("2011-08-01T00:00:00.000Z"); j.setHours(j.getHours() + 6)) {
        if (new Date(data[i].delivery.start) < j) {
          timeindex = counter
          break;
        }
        counter++
      }
      // find for every transaction to which categories it belongs in data2
      for (j = 0; j < data2.length; j++){
        // link id from data to id in data2
        if (data[i].productArchetype.id == data2[j].id) {
          // add the found categories to the timedata variable
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
    // compute total transactions of categories for each timestamp.
    total_transactions = []
    for (i = 0; i < timedata.length; i++) {
      // sum function is defined in dashboard.js
      total_transactions[i] = sum(timedata[i].categories)
    }
    // make map visualisation defined in map.js
    TransactionMap(data);
    // make pie, barchart and legend, defined in dashboard
    dashboard('#dashboard',timedata, data);
  });
});
