const request = require("request");
const cheerio = require("cheerio");
var Iconv  = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

const dataCookieToString = (dataCookie) => {
    let t = "";
    for (let x = 0; x < dataCookie.length; x++) {
        t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
    }
    return t;
}

const mkdataCookie = (cookie) => {
    let t, j;
    cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
    for (let x = 0; x < cookie.length; x++) {
        cookie[x] = cookie[x].split("; ");
        j = cookie[x][0].split("=");
        t = {
            key: j[0],
            value: j[1]
        };
        for (let i = 1; i < cookie[x].length; i++) {
            j = cookie[x][i].split("=");
            t[j[0]] = j[1];
        }
        cookie[x] = t;
    }

    return cookie;
}

const dataCookie = mkdataCookie('MC_STORE_ID=66860; expires=' + new Date(new Date().getTime() + 86409000));


request({
    uri: "https://www.google.com/ncr",
    headers: {
        'User-Agent': 'Mozilla/5.0',
        "Cookie": dataCookieToString(dataCookie)
    }
}, function(error, response, body) {

    request({
        'User-Agent': 'Mozilla/5.0',
        uri: "https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=google&oq=google",
        encoding: null
    }, (error, response, body) => {
        var data = iconv.convert(body).toString();

        const $ = cheerio.load(data);

        $("#center_col .g").each(function() {
            var link = $(this).find('h3[class="r"]');
            var text = link.text();

            console.log(link.children('a').attr('href'))
            console.log(text + '\n');
            console.log(link.next().find('.st').text());
        });
    });
});