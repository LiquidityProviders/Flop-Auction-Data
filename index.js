
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

app.get("/test", (req, res) => {
    const mockData = {
        42069: {
            id: 42069,
            address: '0xD9d1E81bb35DB066986Fa441113a27708663D70B',
            kickDate: new Date(),
            kickDay: new Date(),
            kickMonth: new Date(),
            kickPrice: "200.00",
            kickLot: 500.00000,
            tends: 0,
            dents: 0,
            bid: 198.00000,
            bidPrice: null,
            lot: null,
            tab: 0,
            guy: null,
            dealPrice: null,
            paidPrice: null,
            state: "OPEN"            
        },
        42100: {
            id: 42069,
            address: '0x332f60EDC783E4Db3E0a18F8dFEB368Ae178CCd9',
            kickDate: new Date(),
            kickDay: new Date(),
            kickMonth: new Date(),
            kickPrice: "200.00",
            kickLot: 500.00000,
            tends: 0,
            dents: 0,
            bid: 198.00000,
            bidPrice: null,
            lot: null,
            tab: 0,
            guy: null,
            dealPrice: null,
            paidPrice: null,
            state: "OPEN"            
        }
    }

    res.json(mockData)
});