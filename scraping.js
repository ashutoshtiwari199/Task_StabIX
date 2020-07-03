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
                $(".category-template-title").each((i,e)=>{
                    stream.write("Name:- "+$(e).children().attr('title')+ "\n"+"Landing Page URL:- "+"https://apkpure.com"+$(e).children().attr('href')+ "\n"+"Download Link:- "+"https://apkpure.com"+$(element).children('a').last().attr('href') + "," + "\n"+ "\n")
                })
            })
        })
}
