const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// POST route to handle email requests
app.post("/se", (req, res) => {
  const { name, phone, querry } = req.body;

  // Set up mail transport service using the app password
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "swetpandeyFB@gmail.com", // Sender's email address
      pass: "noupdzxbixagkilo", // App password for Gmail (not the regular password)
    },
  });

  // Mail options
  let mailOptions = {
    from: "swetpandeyFB@gmail.com", // Sender address
    to: "swetpandey18092003@gmail.com", // Receiver address
    subject: `Enquiry from ${name}`, // Subject line
    text: `Name: ${name}\nPhone: ${phone}\nQuery: ${querry}`, // Email body content
  };

  // Send email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json("Email sent successfully");
    }
  });
});

// Start the server
app.listen(9000, () => {
  console.log("Server running on port 9000");
});
