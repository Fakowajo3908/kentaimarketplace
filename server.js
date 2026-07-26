const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const axios = require("axios"); // For making HTTP requests to Flutterwave API

// Initialize Firebase Admin SDK
// IMPORTANT: This now reads from an environment variable for security.
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

// Flutterwave webhook secret hash and secret key
// These MUST be set as environment variables in your hosting environment (e.g., Render.com).
const FLUTTERWAVE_SECRET_HASH = process.env.FLUTTERWAVE_SECRET_HASH;
const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

app.post("/flutterwave-webhook", async (req, res) => {
  console.log("Webhook received:", req.body);

  // 1. Verify webhook signature
  const secretHash = req.headers["verif-hash"];
  if (!secretHash || secretHash !== FLUTTERWAVE_SECRET_HASH) {
    console.warn("Webhook verification failed: Invalid secret hash");
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  const payload = req.body;

  // 2. Process only successful payment events
  if (payload.event === "charge.completed" && payload.data.status === "successful") {
    const txRef = payload.data.tx_ref;
    const transactionId = payload.data.id; // Flutterwave's unique transaction ID

    console.log(`Successful payment for transaction: ${txRef}, Flutterwave ID: ${transactionId}`);

    try {
      // 3. Verify the transaction with Flutterwave's API
      if (!FLUTTERWAVE_SECRET_KEY) {
          console.error("FLUTTERWAVE_SECRET_KEY is not set. Cannot verify transaction.");
          return res.status(500).json({ status: "error", message: "Server configuration error" });
      }

      const verificationResponse = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
          },
        }
       );

      const verificationData = verificationResponse.data.data;

      if (
        verificationData.status === "successful" &&
        verificationData.tx_ref === txRef &&
        verificationData.currency === payload.data.currency &&
        verificationData.amount === payload.data.amount
      ) {
        // Payment is genuinely successful and matches our records
        console.log("Flutterwave transaction verification successful.");

        // Find the listing that was initiated by the frontend using tx_ref
        const listingQuery = await db.collection("listings").where("tx_ref", "==", txRef).limit(1).get();

        if (listingQuery.empty) {
          console.error(`Listing with tx_ref ${txRef} not found or already processed.`);
          // It's important to return 200 OK to Flutterwave even if our internal lookup fails
          // to prevent them from retrying indefinitely, but log the error.
          return res.status(200).json({ status: "warning", message: "Listing not found or already processed internally" });
        }

        const listingDoc = listingQuery.docs[0];
        const listingRef = db.collection("listings").doc(listingDoc.id);
        const listingData = listingDoc.data();

        // Update the listing status to live and payment successful
        await listingRef.update({
          isLive: true,
          paymentStatus: "successful",
          paymentDetails: payload.data, // Store full payment details for audit
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Increment totalProducts count for the store owner
        if (listingData.ownerId) {
          const userRef = db.collection("users").doc(listingData.ownerId);
          await userRef.update({
            totalProducts: admin.firestore.FieldValue.increment(1),
          });
        }

        console.log(`Listing ${listingDoc.id} updated to live and payment successful.`);
        res.status(200).json({ status: "success", message: "Webhook processed successfully" });
      } else {
        console.warn("Flutterwave transaction verification failed or data mismatch.", verificationData);
        // Optionally update listing status to 'verification_failed' or similar
        const listingQuery = await db.collection("listings").where("tx_ref", "==", txRef).limit(1).get();
        if (!listingQuery.empty) {
            const listingRef = db.collection("listings").doc(listingQuery.docs[0].id);
            await listingRef.update({
                paymentStatus: "verification_failed",
                isLive: false,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
        }
        res.status(400).json({ status: "error", message: "Transaction verification failed or data mismatch" });
      }
    } catch (error) {
      console.error("Error processing webhook for tx_ref", txRef, error);
      // If there's an error during verification, mark the listing as failed
      const listingQuery = await db.collection("listings").where("tx_ref", "==", txRef).limit(1).get();
      if (!listingQuery.empty) {
          const listingRef = db.collection("listings").doc(listingQuery.docs[0].id);
          await listingRef.update({
              paymentStatus: "failed_verification_error",
              isLive: false,
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
      }
      res.status(500).json({ status: "error", message: "Internal server error during verification" });
    }
  } else {
    console.log("Webhook event not a successful charge, ignoring.");
    res.status(200).json({ status: "ignored", message: "Event not relevant or not successful" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
