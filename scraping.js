const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs')


var csv = []

var stream = fs.createWriteStream("link.csv", { flags: 'a' });

for (var i = 0; i < 6; i++) {
    axios.get(`https://apkpure.com/app?page=${i}`)
        .then(res => {
            const $ = cheerio.load(res.data);
            $(".category-template-down").each((index, element) => {
                stream.write($(element).children().last().attr('href') + "," + "\n")
            })
        })
}
