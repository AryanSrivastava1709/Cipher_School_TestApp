const cron = require("node-cron");
const evaluationController = require("../controllers/evaluationController");
cron.schedule("0 * * * *", async () => {
	await evaluationController.evaluateAll();
});
