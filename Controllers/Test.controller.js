



exports.SendMailRoute = async (req, res) => {
    const { recipientEmail, client_name } = req.body
    if (!recipientEmail || !client_name) {
        return res.status(400).send("Details not provided")
    }
    try {
        const html = `<h1>HELLO THIS IS A TEST EMAIL FROM SENDGRID</h1>`

        res.status(200).send({ msg: "Email Sent" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
