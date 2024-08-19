const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");

const transport = nodemailer.createTransport({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendEmail = async (to, username, testname, score) => {
	const html = pug.renderFile(
		path.join(__dirname,"..", "config", "emailTemplate.pug"),
		{
			username,
			testname,
			score,
		}
	);

	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to,
		subject: `Your Results for ${testname}`,
		html,
	};

	try {
		await transport.sendMail(mailOptions);
		console.log(`Email sent to ${to}`);
	} catch (err) {
		console.error("Error sending email", err);
	}
};

module.exports = sendEmail;
