const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const data = require("./products.json")

// interface Product {
//   name: string
//   price: number
//   image: string
// }
//
// interface Order {
//   products: Product[]
// }

const orders = [];

const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 8080

app.get("/products", (req, res) => {
  return res.json(data)
})

app.post("/checkout", (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder)
  res.json({ success: true, orderId: orders.length - 1 })
})

app.get("/order/:orderId", (req, res) => {
  const {orderId} = req.params;
  const order = orders[Number(orderId)]

  if (order) {
    return res.json({
      success: true,
      products: order.products
    })
  } else {
    return res.json({
      success: false
    })
  }
})

app.listen(port, () =>
  console.log(`马里奥商店 Mock接口： http://localhost:${port}!`)
)
