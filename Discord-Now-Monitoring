import discord
import requests
from discord.ext import commands

intents = discord.Intents.default()
intents.guilds = True
intents.voice_states = True

client = commands.Bot(command_prefix='!', intents=intents)
line_notify_token = '519qVgtTwcrB0VaKxonCSl0nP7lizXLTEqZV5yA0eMw'  # LINE Notifyのアクセストークンを設定

# チャンネル入退室時の通知処理
@client.event
async def on_voice_state_update(member, before, after):
    # 通知メッセージを書き込むテキストチャンネル（チャンネルIDを指定）
    bot_room = client.get_channel(1235267349007962214)

    # 入退室を監視する対象のボイスチャンネル（チャンネルIDを指定）
    announce_channel_ids = [1227539867165130803]

    # ユーザーがボイスチャンネルに参加したときのみ通知
    if after.channel and after.channel.id in announce_channel_ids and not before.channel:
        await discord_send_notifications(bot_room, f'\n🔊**{after.channel.name}**　⇦　👤**{member.display_name}**')
        await line_send_notifications(f'\n🔊{after.channel.name}\n👤{member.display_name}')

# Discordにメッセージを送信する関数
async def discord_send_notifications(channel, message):
    await channel.send(message)

# LINE Notifyにメッセージを送信する関数
async def line_send_notifications(message):
    await send_line_notify(line_notify_token, message)

# LINE Notifyにメッセージを送信する関数
def send_line_notify(token, message):
    line_notify_api = 'https://notify-api.line.me/api/notify'
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    payload = {'message': message}
    
    response = requests.post(line_notify_api, headers=headers, data=payload)
    
    if response.status_code != 200:
        raise Exception(f'Failed to send LINE Notify: {response.status_code} - {response.text}')

# Botのトークンを指定（デベロッパーサイトで確認可能）
client.run('MTIzNTI2MTAwNTA0MzU5NzMxMg.G1agsM.tGxaIckYJtmcvYZDTlSFkaxGBBVFz6C8K3HKCg')
