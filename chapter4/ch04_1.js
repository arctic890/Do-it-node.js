var url = require('url'); //bring url module

var curUrl = url.parse('https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty');

var curStr = url.format(curUrl);

console.dir(curUrl);

var queryString = require('querystring');
var param = queryString.parse(curUrl.query);

console.log('query in query parameter :', param.query);
console.log('original query parameter :', queryString.stringify(param));