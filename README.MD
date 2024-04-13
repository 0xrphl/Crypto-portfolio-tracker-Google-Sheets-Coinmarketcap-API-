# Crypto Portfolio Tracker

![Crypto Portfolio Tracker](https://i.ibb.co/LhnMQ5R/Crypto-Portfolio-tracker-google-sheets.png)

This Google Sheets project allows you to track your cryptocurrency portfolio using real-time data fetched from CoinMarketCap. It utilizes Google Apps Script to request data from the CoinMarketCap API and update your spreadsheet with the latest prices.

# Table of Contents

1. [Introduction](#introduction)
2. [Setup](#setup)
3. [Functionality](#functionality)
4. [Recommendations](#recommendations)
5. [Support](#Support)
6. [Adding Real-time Crypto Prices](#adding-real-time-crypto-prices)
7. [Direct Questions](#direct-questions)
8. [Contributing](#contributing)

## Setup

1. **Clone the Spreadsheet**: Make a copy of the [Google Sheets template](https://docs.google.com/spreadsheets/d/1jJYahSsV-q7SyyeQlDUovDmQT0NAwOzn__CePDycqfs/edit?usp=sharing) to your Google Drive.

2. **Enable Google Apps Script**: Open your copied spreadsheet and navigate to `Extensions` > `Apps Script`. This will open the Google Apps Script editor.

3. **Paste the Script**: Copy the contents of the `crypto_portfolio.gs` file in this repository and paste it into the Google Apps Script editor.

4. **Save and Authorize**: Save the script and authorize it to access your Google Sheets data.

5. **API Key**: Obtain an API key from [CoinMarketCap](https://coinmarketcap.com/api/) and replace `'YOUR_API_KEY'` in the script with your actual API key.

6. **Add Cryptocurrency Holdings**: In the spreadsheet, add the cryptocurrencies you own in the `Cryptocurrencies` sheet. Enter the name, symbol, and the amount you hold for each cryptocurrency.

7. **Run the Script**: Manually run the `updatePrices` function from the Google Apps Script editor to fetch real-time prices for your cryptocurrencies.

## Functionality

- **Real-time Price Updates**: Fetches real-time prices for the cryptocurrencies listed in your portfolio from CoinMarketCap.
  
- **Portfolio Summary**: Calculates the total value of your cryptocurrency holdings based on the latest prices.

- **Customizable**: You can customize the spreadsheet layout and add additional features as per your requirements.

## Recommendations

To keep your portfolio up-to-date, you can set up a trigger in Google Apps Script to automatically run the `updatePrices` function at regular intervals. However, please note that the free API option from CoinMarketCap has limited request tokens per month. Consider upgrading to a paid plan if you require more frequent updates or monitor your usage to stay within the free tier limits.

To set up a trigger for automatic updates:

1. In the Google Apps Script editor, click on the clock icon (Triggers) on the left sidebar.

2. Click on the "Add Trigger" button.

3. Choose `updatePrices` as the function to run.

4. Select `Time-driven` under "Select event source."

5. Choose `Minutes timer` and set it to `Every 5 minutes`.

6. Click "Save."

## Support
For any questions or issues, please contact [here](https://github.com/0xrphl/Google-calendar-events-analysis-Google-sheets-Google-App-Scripts-Looker-Studio-/issues/new).

## Adding Real-time Crypto Prices

To fetch real-time cryptocurrency prices from CoinMarketCap and update your spreadsheet, you can use the following Google Apps Script function:

```javascript
function getCryptoValue() {
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Get the last row index
  var lrow = sheet.getLastRow()-1;
  
  // CoinMarketCap API key
  var apiKey = "17e6b5b3-1769-42fb-81fe-9e283edde2d6"; // Replace this with your actual API key
  
  // Column to start fetching crypto names
  var cell = "A";
  
  // Get the active spreadsheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get all the data in column A
  var data = sheet.getRange("A:A").getValues();
  
  // Initialize count to track the number of crypto entries
  var count = 0;

  // Loop through the data to count non-empty cells
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] !== "") {
      count++;
    }
  }
  
  // Set headers for API request
  var headers = {
    "X-CMC_PRO_API_KEY": apiKey
  };
  
  // Set options for URL fetch
  var options = {
    "headers": headers
  };
  
  // Loop through each row containing crypto names
  for (var i = 2; i <= count; i++) {
    // Construct the cell to fetch crypto name
    cell = "A" + i;
    
    // Get the crypto name from the sheet
    var cryptoName = sheet.getRange("A"+ i).getValue();
    
    // Construct the URL for fetching crypto data
    var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=" + cryptoName + "&convert=USD";
    
    // Fetch data from CoinMarketCap API
    var response = UrlFetchApp.fetch(url, options);
    
    // Parse the JSON response
    var data = JSON.parse(response.getContentText());
    
    // Extract the crypto value from the response
    var value = data.data[cryptoName].quote.USD.price;
    
    // Set the value in column E of the corresponding row
    sheet.getRange("E" + i).setValue(value);
    
    // Log the value for debugging
    Logger.log(value);
  }
}
```

# Crypto Value Updater

## Overview

The `getCryptoValue()` function fetches the latest USD price for each cryptocurrency listed in column A of the active sheet and updates the corresponding value in column E. It utilizes the CoinMarketCap API to fetch real-time cryptocurrency data. The API key is provided as a variable `apiKey`. Replace it with your actual API key.

## Usage

1. Ensure you have an API key from CoinMarketCap.
2. Replace the `apiKey` variable with your actual API key.
3. Run the `getCryptoValue()` function.

The function loops through each row containing a cryptocurrency name, constructs the API URL for that cryptocurrency, fetches the data, and updates the price in the spreadsheet.

## Logging

Logging is used to debug and log the fetched values. You can view the logs in the Google Apps Script editor under View > Logs.

## Contributing

Feel free to contribute to this project by submitting pull requests or reporting issues.
