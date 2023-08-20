const SendGrid = require("@sendgrid/mail");
require("dotenv").config();



const SendMail = ({ recipient, subject, template }) => {
    SendGrid.setApiKey(process.env.SENDGRID_SECURITY_KEY);

    const msg = {
        to: recipient || "kunal.86agency@gmail.com",
        from: process.env.SENDGRID_EMAIL,
        subject: subject || "Sample Email",
        html: template || `<p>This is a test email sent via <strong>SendGrid</strong> and Node.js. </p>`
    };

    SendGrid.send(msg)
        .then((res) => console.log("Email sent to Recipient : ", recipient, "with subject", subject))
        .catch((error) => console.error("Error sending email:", error));
}

module.exports = SendMail;
