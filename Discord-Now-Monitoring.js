const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_VOICE_STATES, 
    ] 
});
const lineNotifyToken = '519qVgtTwcrB0VaKxonCSl0nP7lizXLTEqZV5yA0eMw'; // LINE Notifyのアクセストークンを設定

// チャンネル入退室時の通知処理
client.on('voiceStateUpdate', async (oldState, newState) => {
    // 通知メッセージを書き込むテキストチャンネル（チャンネルIDを指定）
    const botRoom = client.channels.cache.get('1235267349007962214');

    // 入退室を監視する対象のボイスチャンネル（チャンネルIDを指定）
    const announceChannelIds = ['1227539867165130803'];

    // ユーザーがボイスチャンネルに参加したときのみ通知
    if (newState.channelId && announceChannelIds.includes(newState.channelId) && !oldState.channelId) {
        const member = newState.member;
        await Discord_sendNotifications(botRoom, `\n🔊**${newState.channel.name}**　⇦　👤**${member.displayName}**`);
        await LINE_sendNotifications(botRoom, `\n🔊${newState.channel.name}\n👤${member.displayName}`);
    }
});

// Discordにメッセージを送信する関数
async function Discord_sendNotifications(channel, message) {
    // Discordにメッセージを送信
    await channel.send(message);
}

// LINE Notifyにメッセージを送信する関数
async function LINE_sendNotifications(channel, message) {   
    // LINE Notifyにメッセージを送信
    await sendLineNotify(lineNotifyToken, message);
}

// LINE Notifyにメッセージを送信する関数
async function sendLineNotify(token, message) {
    const lineNotifyApi = 'https://notify-api.line.me/api/notify';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = new URLSearchParams({ message: message });

    const response = await fetch(lineNotifyApi, {
        method: 'POST',
        headers: headers,
        body: body
    });

    if (!response.ok) {
        throw new Error(`Failed to send LINE Notify: ${response.status} - ${response.statusText}`);
    }
}

// Botのトークンを指定（デベロッパーサイトで確認可能）
client.login('MTIzNTI2MTAwNTA0MzU5NzMxMg.G1agsM.tGxaIckYJtmcvYZDTlSFkaxGBBVFz6C8K3HKCg');
