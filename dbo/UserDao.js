
var dbUtil = require('../utli/DbUtil');

var userDao = {
    updateDetail:function(rows){
        var modSql = 'UPDATE User SET detail = ? WHERE Id = ?';
        var modSqlParams = [rows.detail, rows.id];
        dbUtil.update(modSql, modSqlParams);
    }
};


module.exports = userDao;