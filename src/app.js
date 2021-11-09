require("dotenv/config");

const { Telegraf } = require("telegraf");
const bot = require("./app/services/Bot");

const token = process.env.BOT_TOKEN;

if (token === undefined) console.log("BOT_TOKEN must be provided!");
else bot.newBot(token);
