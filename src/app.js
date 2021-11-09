require("dotenv/config");

const { Telegraf } = require("telegraf");

const token = process.env.BOT_TOKEN;

if (token === undefined) throw new Error("BOT_TOKEN must be provided!");

const templates = require("./app/templates/messages.json");

const bot = new Telegraf(token);

const chats = new Object();

function isNewChat(id, username, stage = 1) {
  if (!(id in chats)) {
    chats[id] = {
      username,
      stage,
    };
    return true;
  } else return false;
}

bot.start((ctx) => {
  const { id, username } = ctx.chat;
  let message;
  if (isNewChat(id, username)) {
    message = `Olá, ${username}, tudo bem com voce? ${templates.start}`;
  } else {
    if (chats[id].stage === 1) {
      message = templates.start_again;
    } else if (chats[id].stage === 2) {
      message = templates.return;
    }
  }

  ctx.reply(message);
});

bot.on("text", (ctx) => {
  const { id, username } = ctx.chat;

  let message;

  if (isNewChat(id, username)) message = templates.welcome;
  else {
    if (chats[id].stage === 1) message = ctx.message.text;
  }
  ctx.replyWithHTML(message);
});

bot.launch();
