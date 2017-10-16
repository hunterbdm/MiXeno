const request = require('request').defaults({gzip: true});
const fs = require('fs');

// How many entries you want
const ENTRIES = 100;
const firstName = 'Brayden';
const lastName = 'Paul;
// YYYY-MM-DD
const dateOfBirth = '2002-01-23';
// What number you want the emails to start on
const startingIndex = 81529;
// Change email on line 44

function formatProxy(proxy) {
    if (proxy && ['localhost', ''].indexOf(proxy) < 0) {
        proxy = proxy.replace(' ', '_');
        const proxySplit = proxy.split(':');
        if (proxySplit.length > 3)
            return "http://" + proxySplit[2] + ":" + proxySplit[3] + "@" + proxySplit[0] + ":" + proxySplit[1];
        else
            return "http://" + proxySplit[0] + ":" + proxySplit[1];
    }
    else
        return undefined;
}

function main() {
    const proxyInput = fs.readFileSync('proxies.txt').toString().split('\n');
    const proxyList = [];
    for (let p = 0; p < proxyInput.length; p++) {
        proxyInput[p] = proxyInput[p].replace('\r', '').replace('\n', '');
        if (proxyInput[p] != '')
            proxyList.push(proxyInput[p]);
    }
    console.log('Found ' + proxyList.length + ' proxies.');

    for(let i = startingIndex; i < startingIndex + ENTRIES; i++) {
        /*
        For the email, leave ${i} where you want the number to appear
    
        If you want to use the gmail + method you can do something like this  ->  ultraboost+${i}@gmail.com
        If you have a catchall domain, you don't need a + , like this         ->  ultraboost${i}@customdomain.com
        */
        const email = `commanderbtp${i}@yahoo.com`
    
        request({
            method: 'post',
            url: 'https://www.adidas.com/com/apps/mi_ultraboost_xeno/application/crm.php',
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.8',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Host': 'www.adidas.com',
                'Origin': 'https://www.adidas.com',
                'Referer': 'https://www.adidas.com/us/mi_ultraboost_xeno',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Mobile Safari/537.36'
            },
            formData: {
                firstName: Brayden,
                lastName: Paul,
                dateOfBirth: 2002/01/23,
                email: commanderbtp@yahoo.com,
                consent: 'Y',
                gender: 'M',
                market: 'US',
                language: 'EN'
            },
            proxy: formatProxy(proxyList[Math.floor(Math.random() * proxyList.length)])
        }, (err, resp, body) => {
            if (err) {
                console.log('Error when entering: ' + err);
            }
            else if (resp.statusCode != 200) {
                console.log('Got bad response code ' + resp.statusCode);
            }
            else {
                try {
                    const respJson = JSON.parse(body);
                    const respMessage = respJson['conditionCodeParameter']['parameter'][0]['name'];
                    console.log(email + '  -  ' + respMessage);
                }
                catch(err) {
                    console.log('Invalid JSON response (Probably Banned/Blocked)');
                }
            }
        })
    }
}

main();
