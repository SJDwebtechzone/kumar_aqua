const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const ENQUIRIES_FILE = path.join(__dirname, "../../enquiries.json");

// Helper to read enquiries
function readEnquiries() {
  try {
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(ENQUIRIES_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading enquiries file:", err);
    return [];
  }
}

// Helper to write enquiries
function writeEnquiries(data) {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing enquiries file:", err);
  }
}

// GET all enquiries
router.get("/", (req, res) => {
  const data = readEnquiries();
  res.json(data);
});

// POST new enquiry (with SMTP nodemailer)
router.post("/", async (req, res) => {
  const { name, email, phone, fishType, message } = req.body;

  if (!name || !email || !fishType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // 1. Save to JSON file database
  const enquiries = readEnquiries();
  const newEnquiry = {
    id: Math.random(),
    name,
    email,
    phone: phone || "",
    fishType,
    message: message || "",
    date: new Date().toISOString()
  };
  enquiries.push(newEnquiry);
  writeEnquiries(enquiries);

  // 2. SMTP Mailer Transporter
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"${name}" <${user}>`;
  const to = process.env.SMTP_TO || "rajesh@kumaraquatic.com";

  if (host && user && pass) {
    console.log(`Attempting to send SMTP email from ${user} to ${to}...`);
    
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // True for port 465 SSL/TLS, false for 587 STARTTLS
      auth: { user, pass }
    });

    const mailOptions = {
      from,
      to,
      subject: `New Livestock Enquiry: ${name} (${fishType})`,
      text: `Hello Kumar Aqua Farm,

You have received a new livestock enquiry:

Customer Name: ${name}
Email Address: ${email}
Phone Number: ${phone || "Not provided"}
Requested Species: ${fishType}

Customer Message:
${message || "No message provided."}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("SMTP Email sent successfully!");
    } catch (mailErr) {
      console.error("SMTP Mail Send Failed:", mailErr);
    }
  } else {
    console.warn("SMTP credentials not fully configured in backend .env. Skipping email dispatch.");
  }

  res.status(201).json({ success: true, enquiry: newEnquiry });
});

// DELETE an enquiry
router.delete("/:id", (req, res) => {
  let enquiries = readEnquiries();
  const filtered = enquiries.filter(e => String(e.id) !== String(req.params.id));
  writeEnquiries(filtered);
  res.json({ success: true });
});

module.exports = router;
