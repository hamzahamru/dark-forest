const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const readlineSync = require('readline-sync');
const chalk = require('chalk');
const { fa, faker} = require('@faker-js/faker');

const getEmailRandom = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const result = [];
            $('.e7m.tt-suggestions').find('div > p').each(function (index, element) {
                result.push($(element).text());
            });
            resolve(result);
        })
        .catch(err => reject(err));
});
  
const postData = (email, username, requestId) => new Promise((resolve, reject) => {
    fetch('https://airtable.com/v0.3/view/viwsJFVb2yU07Qp2I/submitSharedForm', {
  method: 'POST',
  headers: {
    'x-time-zone': 'Asia/Jakarta',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'x-airtable-client-queue-time': '40',
    'x-user-locale': 'en',
    'x-airtable-inter-service-client-code-version': '5bd96df848022d9902148ed627e3bc4c68637059',
    'x-airtable-application-id': 'appEYpE10C0pzOKX6',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': 'en-us',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://airtable.com',
    'x-airtable-page-load-id': 'pglhgQvukBSt6BZ2s',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
    'Connection': 'keep-alive',
    'x-airtable-inter-service-client': 'webClient',
    'Cookie': 'brw=brwPdFT9qcSvOUMfF; AWSALB=/H58tlZMC3W/sfBTLVrS7cXQAp/ziur5jloWEdOy+VtV5sUmutM6hTunGsk17/5Z0iw7E8+3FM9zdq2Ryhccgm8kxDA1KVfBQLZSWcSq0kzMmw0J1mlZ3f1F30+m; AWSALBCORS=/H58tlZMC3W/sfBTLVrS7cXQAp/ziur5jloWEdOy+VtV5sUmutM6hTunGsk17/5Z0iw7E8+3FM9zdq2Ryhccgm8kxDA1KVfBQLZSWcSq0kzMmw0J1mlZ3f1F30+m; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Dec+04+2023+15%3A22%3A37+GMT%2B0700+(WIB)&version=202308.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=481faf50-59f8-4820-b628-562df6850a49&interactionCount=0&landingPath=https%3A%2F%2Fairtable.com%2FappEYpE10C0pzOKX6%2FshrLHfZnB6Vni8z9p&groups=C0001%3A1%2CC0002%3A1%2CC0007%3A1%2CC0003%3A1%2CC0004%3A1; __Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNsOEpxaWRXU3JvTkRITSIsImNzcmZTZWNyZXQiOiJmcndUU29fSGg0ZDlTVEJxWFoxbGJHU2oifQ==; __Host-airtable-session.sig=-ogJfKuJIROTxSvoorloATjMsWHwSh0oA-ryVM0rhGE'
  },
  body: new URLSearchParams({
    'stringifiedObjectParams': `{"rowId":"recHoRQBVAmFpRF1O","cellValuesByColumnId":{"fldrxQwGr8OM2laiu":"${username}","fld0OQUYoAFij8d7b":"${email}"}}`,
    'requestId': `${requestId}`,
    'accessPolicy': '{"allowedActions":[{"modelClassName":"view","modelIdSelector":"viwsJFVb2yU07Qp2I","action":"readSharedFormData"},{"modelClassName":"view","modelIdSelector":"viwsJFVb2yU07Qp2I","action":"submitSharedForm"},{"modelClassName":"application","modelIdSelector":"appEYpE10C0pzOKX6","action":"createAttachmentUploadS3Policies"},{"modelClassName":"application","modelIdSelector":"appEYpE10C0pzOKX6","action":"createMultipartUpload"},{"modelClassName":"application","modelIdSelector":"appEYpE10C0pzOKX6","action":"getUrlMultipartUpload"},{"modelClassName":"application","modelIdSelector":"appEYpE10C0pzOKX6","action":"cancelMultipartUpload"},{"modelClassName":"application","modelIdSelector":"appEYpE10C0pzOKX6","action":"completeMultipartUpload"},{"modelClassName":"application","modelIdSelector":"appEYpE10C0pzOKX6","action":"listPartsMultipartUpload"}],"shareId":"shrLHfZnB6Vni8z9p","applicationId":"appEYpE10C0pzOKX6","generationNumber":0,"expires":"2023-12-21T00:00:00.000Z","signature":"a3b3296bd762e3e64f4db9a2948ea57003f73b04acc4f3eaa5f33b7f834d7a7d"}',
    '_csrf': 'jrsZXetY-uMmRXjkE1aXHR4GrQKqq-JIMuAE'
  })
})
.then(res => res.json())
.then(res => {
    resolve(res)
})
.catch(err => {
    reject(err)
})
});


const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });


(async () => {

a:while (true) {
   console.log(`Pilih method
    [1] Use from email.txt
    [2] Use random`
    )
    var reffmetod = readlineSync.question(
        '[+] Pilih method (1/2) [x untuk exit] ?'
        )
    console.log('')

if (reffmetod == 1) {
    do{
    i= 0
    var stop = false;
    i = i + 1;
    let wallet = fs.readFileSync('email.txt', 'utf8').split('\n');
    let exe = wallet.splice(0, 1);
    let sisa = wallet;
    if (sisa.length <= 0) {
    stop = true;
    }
    const email = exe[0].trim();
    if(email.trim() === ''){
        console.log(`[!] ${chalk.red('File email.txt kosong')}`);
        console.log('')
        continue a;
    }
    const username = email.split('@')[0];
    const requestId = `req${await randstr(14)}`

    const submit = await postData(email, username, requestId);
    if(submit.msg != 'SUCCESS'){
    console.log(`[!] ${email} : ${chalk.red(submit.msg)}`)
    }
    console.log(`[!] ${email} : ${chalk.green(submit.msg)}`)
    console.log('')
    await fs.writeFileSync('email.txt', sisa.join('\n'));
    
    } while (stop === false);
} else if (reffmetod == 2) {
    const piroRefE = readlineSync.question('[+] Mau berapa x? ');
    console.log('')
    for (let index = 0; index < parseInt(piroRefE); index++){
const domainList = await getEmailRandom();
const domain = domainList[Math.floor(Math.random() * domainList.length)];
const firstName = faker.person.firstName().replace(/["']/g, "");
const lastName = faker.person.lastName().replace(/["']/g, "");
const ml = `${firstName}${lastName}${await randstr(2)}@${domain}`.toLowerCase();
const username = ml.split('@')[0];
const requestId = `req${await randstr(14)}`

const submit = await postData(ml, username, requestId);
if(submit.msg != 'SUCCESS'){
    console.log(`[!] ${ml} : ${chalk.red(submit.msg)}`)
}
console.log(`[!] ${ml} : ${chalk.green(submit.msg)}`);
fs.appendFileSync('darkforest.txt',`${ml}\n`, 'utf-8');
console.log('')
        
        
        
    }
console.log(`[!] Saved data to darkforest.txt`);    
console.log('')
    //process.exit(0);
    } else if(reffmetod == 'x'){
        process.exit(0);
    }else {
        console.log(chalk.red('[!] Masukan pilihan yang benar !!'))      
       // process.exit(0);
    }
}



})();
