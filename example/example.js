var slackToken = "";
var channelId = "";

var bot = {
    onMessage: (slackMessage) => {
        //Do something if the message text contains the text you want
        if (slackMessage.text.indexOf("") != -1) {
            var attachments = [
                {
                    "text": "Sample header",
                    "fallback": "Sample header",
                    "image_url": "http://sample.link"
                }
            ];

            var message = {
                "channel": channelId,
                "text": "Sample message text",
                "username": "sample username",
                "icon_emoji": ":sampleemoji:",
                "attachments": JSON.stringify(attachments)
            };

            VelmaBot.PostMessage(slackToken, message);
        }  
    }
}

VelmaBot.Listen(slackToken, channelId, bot.onMessage);