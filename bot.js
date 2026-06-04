import config from './config.json' with { type: 'json' };

const Token = config.token;

client.login(Token);
const {
    Client,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});



const CHANNEL_ID =
    '1507041145564168202';

const WEBHOOK_URL =
    'https://barber-reprimand-ducky.ngrok-free.dev/webhook';

const PREFIX = '!fivem';

client.once('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {

    if (message.author.bot)
        return;

    if (message.channel.id !== CHANNEL_ID)
        return;

    if (!message.content.startsWith(PREFIX))
        return;

    try {

        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json'
            },
            body: JSON.stringify({
                username:
                    message.author.username,
                content:
                    message.content
            })
        });

        console.log(
            `Forwarded: ${message.author.username}`
        );

    } catch (err) {

        console.error(
            'Forward failed:',
            err
        );

    }
});

client.login(TOKEN);