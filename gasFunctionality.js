
const makerAddresses = ['0xD9d1E81bb35DB066986Fa441113a27708663D70B', '0x8A559ebE64bd94634f2107ea8d4C4261C5220fe6', '0xc2d6B57905B089a006BB23f3B5e8F70a30e4b214'];
let auction_results;

/**
 * Call webserver that interacts with Ethereum blockchain to parse event data
 *
 * @return Auctions object representing returned Flop Auction Event
 *     Developer blog.
 * @customfunction
 */
function getAuctions() {
  const url = 'https://flop-auction-data.now.sh/auctions';
  const response = UrlFetchApp.fetch(url);
  const auctions = JSON.parse(response);
  Logger.log("Auctions : ", auctions);
  
  auction_results = auctions;
  return auctions;
  
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


const ss = SpreadsheetApp.getActiveSpreadsheet();
const cache = ss.getSheetByName("Test Sheet");
addArrayToSheetColumn(cache, "A", auction_results);

function addArrayToSheetColumn(sheet, column, values) {
  const range = [column, "1:", column, values.length].join("");
  const fn = function(v) {
    return [ v ];
  };
  sheet.getRange(range).setValues(values.map(fn));
}