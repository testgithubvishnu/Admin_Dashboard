const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    // const contactData = req.body;
    const { username, email, message } = await req.body;

    //mandatory fiels:
    if (!username || !email || !message) {
      res.status(400).send("All field are mandatory");
    }
    await Contact.create(username, email, message);
    return res.status(200).json({ message: "message sent successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "message not delivered" });
    //next(err);
  }
};
module.exports = contactForm;
