const request = require('request').defaults({gzip: true});

// How many entries you want
const ENTRIES = 1;
const firstName = 'John';
const lastName = 'Biggens';
// YYYY-MM-DD
const dateOfBirth = '1984-08-08';
// What number you want the emails to start on
const startingIndex = 3523;
// Change email on line 17

for(let i = startingIndex; i < startingIndex + ENTRIES; i++) {
    /*
    For the email, leave ${i} where you want the number to appear

    If you want to use the gmail + method you can do something like this  ->  ultraboost+${i}@gmail.com
    If you have a catchall domain, you don't need a + , like this         ->  ultraboost${i}@customdomain.com
    */
    const email = `ultraboost${i}@deadass.win`

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
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            email: email,
            consent: 'N',
            gender: 'F',
            market: 'US',
            language: 'EN'
        }
    }, (err, resp, body) => {
        if (err) {
            console.log('Error when entering: ' + err);
        }
        else if (resp.statusCode != 200) {
            console.log('Got bad response code ' + resp.statusCode);
        }
        else {
            const respJson = JSON.parse(body);
            const respMessage = respJson['conditionCodeParameter']['parameter'][0]['name'];
            console.log(email + '  -  ' + respMessage);
        }
    })
}