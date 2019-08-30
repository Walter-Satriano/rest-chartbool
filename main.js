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
        printSellersOption(data);
        printMonthsOption(data);
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
    console.log("funzione getItaMonths", months);

    return months;
  }


  //funzione per sommare le vendite
  function salesSum(data) {

    //creo un array con tutti i valori indicizzati a [0]
    var months = new Array(12).fill(0);

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      var monthNum = moment(d.date, "DD-MM-YYYY").month();
      var amount = Number(d.amount);

      months[monthNum] += amount;
    }
    console.log("sono nella funzione salesSum", months);

    return months;
  }


  //funzione per stampare il grafico a linea
  function printLineGraph(data) {

    var monthsLabel = getItaMonths();
    var monthsAmount = salesSum(data);

    var ctxLine = document.getElementById("line_graph").getContext("2d");
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

    var sellers = getSellers(data);

    var nameSalesMan = Object.keys(sellers); //ritorna un array di tutte le chiavi
    console.log("nameSalesMan", nameSalesMan);
    var amountSalesMan = Object.values(sellers); //ritorna un array di tutti i valori
    console.log("amountSalesMan", amountSalesMan);

    //sommo gli elementi presenti nell'array amountSalesMan
    var reducer = (accumulator, currentValue) => accumulator + currentValue;
    var totalAmount = amountSalesMan.reduce(reducer);
    //ottengo la percentuale
    for (var i = 0; i < amountSalesMan.length; i++) {
      amountSalesMan[i] = ((amountSalesMan[i] / totalAmount) * 100).toFixed(1);
    }

    var ctxPie = document.getElementById("pie_graph").getContext("2d");
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


  //funzione per ottenere e confrontare le chiavi e valori ottenuti dalla chiamatas
  function getSellers(data) {

    var sellers = {};

    for (var i = 0; i < data.length; i++) {
      var item = data[i];


      var salesMan = item.salesman;
      if (!sellers[salesMan]) {
        sellers[salesMan] = 0;
      }

      var amount = item.amount;
      sellers[salesMan] += Number(amount);

    }
    console.log("sono nella funzione getSellers ", sellers);

    return sellers;
  }


  // funzione per inserire i nomi dei venditori nella select
  function printSellersOption(data) {

    var sellers = getSellers(data);
    var nameSalesMan = Object.keys(sellers);

    var source = $("#select_name").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < nameSalesMan.length; i++) {

      var sellersName = nameSalesMan[i];

      var context = {
        sellers_name: sellersName,
      };

      var html = template(context);

      $(".sellers_list").append(html);
    }
  }


  // funzione per inserire i nomi dei mesi nella select
  function printMonthsOption(data) {

    var months = getItaMonths();

    var source = $("#select_month").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < months.length; i++) {
      var month = months[i]
      console.log("month", month);

      var context = {
        months: month,
      };

      var html = template(context);

      $(".months_list").append(html);
    }
  }


  /* DA RIVEDERE E COMPLETARE */

  $("#add_amount").click(addAmount);

  //funzione per aggiungere le vendite
  function addAmount() {
    //salvo l'input utente in una variabile
    var amountInput = $(".amount_input").val();
    console.log(amountInput);
    //svuoto l'input
    $(".amount_input").val("");

    postData();

  }

  // funzione per mandare i dati alla url
  function postData() {

    $.ajax({
      url: "http://157.230.17.132:4011/sales",
      method: "POST",

      success: function(data) {


        console.log("POSTdata", data);
      },

      error: function() {
        alert("errore");
      }

    });
  }





});
