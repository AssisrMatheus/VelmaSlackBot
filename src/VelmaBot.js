var VelmaBot = {
    PostReaction: (token, channel, reaction, ts) => {
        var data = {
            "name": reaction,
            "channel": channel,
            "timestamp": ts,
            "token": token
        };

        $.post("https://slack.com/api/reactions.add", data)
            .done((data) => {
                if (!data.ok) {
                    console.log("Failed. Reaction is not ok::");
                    console.log(data);
                }
            })
            .fail((data) => {
                console.log("Failed on posting reaction:");
                console.log(data);
            });
    },
    PostMessage: (token, data) => {
        data.charset = "utf-8";
        data.token = token;

        $.post("https://slack.com/api/chat.postMessage", data)
            .done((data) => {
                if (!data.ok) {
                    console.log("Failed. Message is not ok:");
                    console.log(data);
                }
            })
            .fail((data) => {
                console.log("Failed on posting message:");
                console.log(data);
            });
    },
    Listen: (token, channel, onMessage) => {
        var oldestTimestamp = 0;
        var data = {
            "charset": "utf-8",
            "Content-Type": "application/json",
            "token": token,
            "channel": channel,
            "count": 5,
            "oldest": oldestTimestamp
        };

        var method = "";
        var channelChar = channel.charAt(0);
        if (channelChar === "g")
            method = "https://slack.com/api/groups.history";
        else if (channelChar === "d")
            method = "https://slack.com/api/im.history";
        else
            method = "https://slack.com/api/channels.history";

        setInterval(() => {
            $.post(method, data)
                .done((data) => {
                    if (data.ok) {
                        var history = data.messages;
                        var latestMessage = history[0];

                        if (oldestTimestamp < latestMessage.ts) {
                            onMessage(latestMessage);
                            oldestTimestamp = latestMessage.ts;
                        }

                        lastHistory = history;
                    }
                    else {
                        console.log("Failed on capturing channel's messages:");
                        console.log(data);
                    }
                })
                .fail((data) => {
                    console.log("Failed when requesting channel's messages:");
                    console.log(data);
                });
        }, 1000)
    }
}