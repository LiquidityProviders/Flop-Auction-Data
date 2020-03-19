
const makerAddresses = ['0xD9d1E81bb35DB066986Fa441113a27708663D70B', '0x8A559ebE64bd94634f2107ea8d4C4261C5220fe6', '0xc2d6B57905B089a006BB23f3B5e8F70a30e4b214'];
let auctionResults;

/**
 * Call webserver that interacts with Ethereum blockchain to parse event data
 *
 * @return Auctions object representing returned Flop Auction Event
 *     Developer blog.
 * @customfunction
 */
function getAuctions() {
  const url = 'https://flop-auction-data-omega.now.sh/auctions';
  const response = UrlFetchApp.fetch(url);
  const auctions = JSON.parse(response);
  Logger.log("Auctions : ", auctions);
  
  const auctionsList = []
  for (auction in auctions) {
    auctionsList.push(auctions[auction]);
  }
  auctionResults = auctionsList;
  return auctionResults;
}

function parseAuctions(auctions) {
  const ourBids = [];
  for (auctionId in auctions) {
    if (makerAddresses.indexOf(auctions[auctionId].guy) != -1) {
      ourBids.push(auctions[auctionId]);
    }
  }
  
  Logger.log("Our Bids: ", ourBids)
  return ourBids;
}

function addArrayToSheetColumn(sheet, startRow, column, values, field) {
  Logger.log(sheet, column, values)
  const range = [column, `${startRow}:`, column, startRow - 1 + values.length].join("");
  const fn = function(v) {
    if (field.length > 0) {
      if (field == "lot") {
        return [ 50000 / v[field] ]
      }
      else {
        return [ v[field] ];    
      }
    }
    else {
      return [ v ];
    }
  };
  sheet.getRange(range).setValues(values.map(fn));
}

function addData() {
  // retrieve latest auction data  
  getAuctions()
  
  const app = SpreadsheetApp
  const ss = app.openById('1tZXmGtUiyU_Ma9fSKhZEWUoW7uqZIdvJOC5HZ3iTRZw');
  const cache = ss.getSheetByName("Dynamic Sheet");
  
//  // add complete object  
  addArrayToSheetColumn(cache, 16, "A", auctionResults, "");
  
  //  add id
  addArrayToSheetColumn(cache, 16, "B", auctionResults, "id");
  
  //  add current price
  addArrayToSheetColumn(cache, 16, "C", auctionResults, "lot");

  //  add kick date
  addArrayToSheetColumn(cache, 16, "J", auctionResults, "kickDate");
  
  //  add dent date
  addArrayToSheetColumn(cache, 16, "K", auctionResults, "dentDate");
  
   //  add kick date
  addArrayToSheetColumn(cache, 16, "L", auctionResults, "guy");
  
}


