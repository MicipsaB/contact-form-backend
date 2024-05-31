require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Mailgun = require("mailgun.js");
const forData = require("form-data");

// Créer une nouvelle instance de mailgun
const mailgun = new Mailgun(FormData);

// Connexion au compte mailgun
const mg = mailgun.client({
  username: "Micipsa",
  key: process.env.KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    // on destructure req.body
    const { firstname, lastname, email, subject, message } = req.body;

    // Je demande à mailgun d'envoyer un mail en fonction du body reçu
    const response = await mg.messages.create(
      "sandbox9f67e0f664ae45548e2d662404e5f01e.mailgun.org",
      {
        from: `${firstname} ${lastname} <${email}>`,
        to: process.env.EMAIL,
        subject: subject,
        text: message,
      }
    );

    //Je réponds au client
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
