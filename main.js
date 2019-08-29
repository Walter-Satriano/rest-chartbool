// end-point http://157.230.17.132:4011/sales

$(document).ready(function() {

  getData();

  //funzione per recuperare i dati dalla url
  function getData() {

    $.ajax({
      url: "http://157.230.17.132:4011/sales",
      method: "GET",

      success: function(data) {

        printLineGraph(data);
        printPieGraph(data);
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


  //funzione per stampare il grafico a linea
  function printLineGraph(data) {
    var ctxLine = document.getElementById("line_graph").getContext("2d");

    var monthsLabel = getItaMonths();
    var monthsAmount = salesSum(data);

    var lineGraph = new Chart(ctxLine, {
      type: "line",
      data: {
        labels: monthsLabel,
        datasets: [{
          label: "# Fatturato Mensile",
          data: monthsAmount,
           borderColor: [
             "rgb(170, 0, 255)"
           ]
        }]
      },

    });
  }

  //funzione per stampare il grafico a torta
  function printPieGraph(data) {
    var ctxPie = document.getElementById("pie_graph").getContext("2d");

    var sellers = getSellers(data);
    var nameSalesMan = Object.keys(sellers);
    var amountSalesMan = Object.values(sellers);


    var pieGraph = new Chart(ctxPie, {
      type: "pie",
      data: {
        labels: nameSalesMan,
        datasets: [{
          label: "# of Votes",
          data: amountSalesMan,
          backgroundColor: [
            "rgb(255, 0, 0)",
            "rgb(255, 255, 0)",
            "rgb(0, 255, 0)",
            "rgb(0, 0, 255)"
          ]
        }]
      },

    });
  }

  function getSellers(data) {

    var sellers = {};

    for (var i = 0; i < data.length; i++) {
      var item = data[i];


      var salesMan = item.salesman;
      if (!sellers[salesMan]) {
        sellers[salesMan] = 0;
      }

      var amount = item.amount;
      sellers[salesMan] += amount;
    }
    console.log("sono nella funzione getSellers ", sellers);

    return sellers;
  }






});
