const fs = require('fs');
var fileUtil = {
    remove: function (filePath) {
        fs.unlink(filePath, function (err) {
            if (err) {
                console.error(err);
            }
        });
    },
    read: function (filePath, callback) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.log(err);
                return false;
            }
            callback(data.toString());
        });
    },
    write: function (filePath, data) {
        fs.write(filePath, data, 'w');
    },
    accessLog: function () {
        var accessLogfile = fs.createWriteStream('./logs/access.log', {flags: 'a'}); //访问日志
    }
};

module.exports = fileUtil;