const getAuctionData = require("./getAuctions")

const express = require("express");
const app = express();

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
  
// Mock APIs
app.get("/auctions", (req, res) => {
    // res.json([
    //     { name: "William", location: "Abu Dhabi" },
    //     { name: "Chris", location: "Vegas" }
    // ]);
    res.send(getAuctionData())
});