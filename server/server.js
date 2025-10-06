import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors({ origin: "https://godwinobiria.co.ke" }));
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    host: "mail.spacemail.com",
    port: 465,
    auth: {
      user: "info@godwinobiria.co.ke",
      pass: "Godwin@18465",
    },
  });

  const mailOptions = {
    from: "info@godwinobiria.co.ke",
    replyTo: email,
    to: "godwinmokua2004@gmail.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: "Message sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
