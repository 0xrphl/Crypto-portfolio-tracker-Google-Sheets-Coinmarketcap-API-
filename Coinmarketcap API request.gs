function getCryptoValue() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lrow = sheet.getLastRow()-1;
  var apiKey = "17e6b5b3-1769-42fb-81fe-9e283edde2d6"; // 17e6b5b3-1769-42fb-81fe-9e283edde2d6, 9abb9b92-2c48-4057-80a8-f5426b904cd0
  var cell = "A";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getRange("A:A").getValues();
  var count = 0;

  for (var i = 0; i < data.length; i++) {
    if (data[i][0] !== "") {
      count++;
    }
  }
  var headers = {
    "X-CMC_PRO_API_KEY": apiKey
  };
  var options = {
    "headers": headers
  };
 for (var i = 2; i <= count; i++) {
   cell = "A" + i;
  var cryptoName = sheet.getRange("A"+ i).getValue();
  var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=" + cryptoName + "&convert=USD";
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  var value = data.data[cryptoName].quote.USD.price;
  sheet.getRange("E" + i).setValue(value);
  Logger.log(value);
 }
}