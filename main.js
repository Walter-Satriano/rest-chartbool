// end-point http://157.230.17.132:4011/sales

$(document).ready(function() {

  getData();

  //funzione per recuperare i dati dalla url
  function getData() {

    $.ajax({
      url: "http://157.230.17.132:4011/sales",
      method: "GET",

      success: function(data) {

        print(data);
        console.log("data", data);
      },

      error: function() {
        alert("errore");
      }

    });
  }


  //funzione per convertire la data in italiano
  function getItaMonths() {

    moment.locale("it");

    var months = moment.months();
    console.log("months", months);

    return months;
  }


  //funzione per sommare le vendite
  function salesSum(data) {

    //creo un array con tutti i valori indicizzati a [0]
    var months = new Array(12).fill(0);

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      var monthNum = moment(d.date, "DD-MM-YYYY").month();
      var amount = d.amount;

      months[monthNum] += amount;
    }
    console.log("sono nella funzione salesSum", months);

    return months;
  }


  //funzione per stampare
  function print(data) {
    var ctx = document.getElementById("line_graph").getContext("2d");

    var monthsLabel = getItaMonths();
    var monthsAmount = salesSum(data);

    var lineGraph = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthsLabel,
        datasets: [{
          label: "# Fatturato Mensile",
          data: monthsAmount
        }]
      },

    });
  }







});
