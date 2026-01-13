const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// Schemas
const orderschema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order" // Must match model name
    }
  ]
});

// Models
const Order = mongoose.model("Order", orderschema);
const customer = mongoose.model("Customer", customerSchema);

// Add customer with orders
const addCustomer = async () => {
  let cust1 = new customer({
    name: "Dhiraj kumar"
  });

  // Find existing orders
  let order1 = await Order.findOne({ item: "chips" });
  let order2 = await Order.findOne({ item: "chocolate" });

  // Push ObjectId into orders array
  cust1.orders.push(order1._id);
  cust1.orders.push(order2._id);

  // Save customer
  let result = await cust1.save();
  console.log(result);
};

// Run
addCustomer();



// const addOrders = async()=>{
//    let res= await Order.insertMany([
//         {item: "Samosa", price:12},
//         {item:"chips",price:10},
//         {item:"chocolate",price:40}
//     ]);
//     console.log(res);
// };
// addOrders();