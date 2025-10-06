import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// === Route for handling contact form submission ===
app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Configure transporter with your SpaceMail SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.spacemail.com", // Example: replace with the actual SpaceMail SMTP host
      port: 587,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER, // your SpaceMail email
        pass: process.env.SMTP_PASS, // your SpaceMail password or app password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "godwinmokua2004@gmail.com", // your receiving email
      subject: subject,
      text: message,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
