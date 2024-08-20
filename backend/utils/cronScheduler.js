const cron = require("node-cron");
const evaluationController = require("../controllers/evaluationController");
cron.schedule("* * * * *", async () => {
	await evaluationController.evaluateAll();
});
