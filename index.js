
const express = require("express");
const app = express();

const { getAuctionData } = require("./getAuctions")

const port = 5000;


// Body parser
app.use(express.urlencoded({ extended: false }));

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});

// Home route
app.get("/", (req, res) => {
    res.send("Retrieve latest Flop Auction Data from Eth Mainnet");
});
  
// Retrieve Auction Data
app.get("/auctions", async (req, res) => {
    Promise.resolve(getAuctionData())
        .then(auctions => {
            console.log("auctions!", auctions)
            res.json(auctions)
        })
        .catch(error => {
            res.send(error)
        })
});