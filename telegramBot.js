require('dotenv').config()
// console.log(process.env)

const fs = require('fs');

const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply(`Hi，這是用來收集juno地址用的bot
請直接輸入你的juno地址`)
})

let data = []
bot.on('text', (ctx) => {
    let junoOrNot = ctx.message.text.slice(0,4)
    let junoOrNotLen = ctx.message.text.length
    // console.log(junoOrNot)
    if(junoOrNot.includes("juno") && junoOrNotLen==43){
        let dataTemp = {
            id:ctx.message.chat.id,
            username:ctx.message.chat.username,
            address:ctx.message.text
        }
        data.push(dataTemp)
        // console.log(data)
        fs.writeFileSync('./tmp/test.txt', JSON.stringify(data));
        ctx.reply(`登記完成
本bot僅為簡單編寫，請勿重複登記 謝謝🙏`)
        console.log(`${ctx.message.chat.id},${ctx.message.chat.username}登記了地址`)
    }else{
        ctx.reply('請輸入正確的juno地址')
    }
})

// bot.help((ctx) => ctx.reply(ctx.message.chat.id))
// bot.use((ctx) => {
//     console.log(ctx.message)
//   })
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))