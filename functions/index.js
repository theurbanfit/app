"use strict";

const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_QA1GiImBNroCnTap4jGkHKr0003DgRGXOm");

exports.completePaymentWithStripe = functions.https.onRequest(
    async (request, response) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 55 * 100,
          currency: "usd",
        });

        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: "cus_JfTwkBBclanmy0"},
            {apiVersion: "2020-08-27"},
        );
        response.json({
          paymentIntent: paymentIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
        });
      } catch (error) {
      // Handle the error
        console.log(error);
        response.status(500).send(error);
      }
    },
);
