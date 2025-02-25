const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf("8131527159:AAHfP-g0B5OdHiqOI_ooDRrwrh-YrIiMeSI")

bot.start((ctx) => ctx.reply('سلام به ربات من خوش آمدید! لطفا عدد مورد نظر را وارد کنید🥰'));


function sieveOfEratosthenes(number) {

    // ایجاد یک آرایه از اعداد از 0 تا number و مقداردهی اولیه به true
    let isPrime = new Array(number + 1).fill(true);
    isPrime[0] = isPrime[1] = false; // 0 و 1 اول نیستند

    // شروع از اولین عدد اول (2)
    for (let i = 2; i * i <= number; i++) {
        // اگر i اول است، تمام مضارب آن را غیر اول علامت بزن
        if (isPrime[i]) {
            for (let j = i * i; j <= number; j += i) {
                isPrime[j] = false;
            }
        }
    }

    // جمعآوری تمام اعداد اول
    let primes = [];
    for (let i = 2; i <= number; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }

    return primes;
}

bot.on(message('text'), async (ctx) => {
    console.log('User Info:', ctx.from);
    console.log('Chat Info:', ctx.chat);
    console.log('Message:', ctx.message.text);
    let number = parseInt(ctx.message.text);
    let primes = sieveOfEratosthenes(number);
    await ctx.reply(`عدد های اول کوچک تر از ${number} عبارتند از : ${primes.join(', ')}`);
})


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))