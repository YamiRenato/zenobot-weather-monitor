const { Telegraf } = require("telegraf");

const templates = require("../templates/messages.json");

const chats = new Object();

module.exports = {
  newBot(token) {
    const bot = new Telegraf(token);

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
        if (chats[id].stage === 1) message = templates.start_again;
        else if (chats[id].stage === 2) message = templates.return;
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
  },
};
