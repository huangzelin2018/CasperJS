/**
 * 抓取拉钩简历详情
 */
const util = require("./utli/Util.js");
const system = require('system');
var url = system.args[4];

var number = util.getQueryParam(url);

var casper = require('casper').create({
    // clientScripts: ["jquery.js"],
    verbose: false,
    // logLevel: 'debug',
    pageSettings: {
        loadImages: false, // The WebPage instance used by Casper will
        loadPlugins: false // use these settings
    }
});

casper.start(url);

casper.wait(5000, function () {
    var filePath = number + ".html";
    var data = '';
    if (this.exists('div.text-layer')) {
        var html = this.getHTML('div.left-content');
        data = util.filterHtml(html);
    } else if (this.exists('div.online-preview')) {
        var html = this.getHTML('div.online-preview');
        var style = "<style>.mobile{display:block;}.email{display:block;}</style>";
        data = style + html;
    }
    console.log(escape(data));
})

// casper开始运行
casper.run();