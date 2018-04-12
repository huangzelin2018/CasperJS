/**
 * 抓取拉钩简历主线程
 */
const userDao = require('./dbo/UserDao');
var dbUtil = require('./utli/DbUtil');

var sql = "select * from user ";
dbUtil.query(sql, function (rows) {
    for (var i = 0; i < rows.length; i++) {
        capture(rows[i]);
    }
});


function capture(rows) {
    var spawn = require('child_process').spawn;
    var ls = spawn('casperjs', ['casperjs.js', rows.url]);
    ls.on('close', function (code) {
        if (code == 1) {
            console.log('child process异常结束。目标：' + rows.url);
        }
    });
    ls.stdout.on('data', function (d) {
        if (d) {
            rows.detail = unescape(d.toString());
            console.info(rows);
            userDao.updateDetail(rows);
        }
    });
}

