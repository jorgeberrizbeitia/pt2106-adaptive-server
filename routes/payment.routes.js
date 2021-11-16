const router = require("express").Router();

// This is a sample test API key.
const stripe = require("stripe")('sk_test_51Jw5EKCKKbaZslJcK9Ut1BDvKJHOeByhviy6AHFgQts2K8NRt4LCZWjQyb53cxsX9KM3wdOsYiLM0zubBIvyROAf00SKd7LHa5');

const calculateOrderAmount = (items) => {
  console.log(items[0])
  // ! IMPORTANT always use the id of the product to access your DB and get the real price
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    payment_method_types: [
      "card",
    ],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;