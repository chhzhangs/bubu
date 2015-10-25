var express = require('express');
var router = express.Router();
var pool = require('./mysql').pool;
var mysql = require('mysql');


router.post('/getlist', function(req, res, next) {
    // console.log(req.body.lat);
    var lat = req.body.lat;
    var lon = req.body.lon;
    var skill = req.body.skill;

    console.log(JSON.stringify(req.body));

    pool.getConnection(function(err, conn) {

        if (err) {
            throw err;
        }
        if (skill=="skill") {
            var sql = 'select login.user_id,nickname,portrait,skill,tags,login_x,login_y from login,user where login_x is not null and login.user_id = user.user_id';
        } else {
            var sql = 'select login.user_id,nickname,portrait,skill,tags,login_x,login_y from login,user where login_x is not null and login.user_id = user.user_id and user.skill = ? ';
            var inserts = [skill];
            sql = mysql.format(sql, inserts);
        }
        conn.query(sql, function(err, rows, fields) {
            if (err) {
                res.json({
                    status: 0
                });
            } else {

                var results = new Array();
                for (var i = 0; i < rows.length; i++) {
                    var d = dis(lon, lat, rows[i].login_x, rows[i].login_y);
                    // console.log(d);
                    if (d[0] > 0) {
                        results[i] = {};
                        results[i].user_id = rows[i].user_id;
                        results[i].nickname = rows[i].nickname;
                        results[i].portrait = rows[i].portrait;
                        results[i].tags = rows[i].tags;
                        results[i].skill = rows[i].skill;
                        results[i].lat = rows[i].login_y;
                        results[i].lon = rows[i].login_x;
                        results[i].dis = d[0];
                    }
                }
                // console.log(results);

                results.sort(function(a, b) {
                    var da = a.dis;
                    var db = b.dis;

                    if (da > db) {
                        return 1;
                    } else if (da < db) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                console.log(results);

                res.json(results);
            }
            conn.release();
        });

    });
});


/*
  获取坐标地址：http://api.map.baidu.com/lbsapi/getpoint/index.html
  计算地图两点距离，返回的数组由距离(d[0])和单位(d[1])组成
  dis（起点经，纬，终点经，纬）
*/
function dis(sLon, sLat, eLon, eLat) {
    if ((sLon == 0 && sLat == 0) || (eLon == 0 && eLat == 0) || sLon == undefined || sLat == undefined || eLon == undefined || eLat == undefined) {
        return new Array("unknow");
    }
    var arr = new Array(2);

    var radLat1 = sLat * Math.PI / 180.0;
    var radLat2 = eLat * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = (sLon * Math.PI / 180.0) - (eLon * Math.PI / 180.0);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.14;
    // s = Math.round(s*1000)/1000;
    // if(s<1){
    //     s  *= 1000;
    //     arr[1] = 'm';
    // }else{
    //     s = Math.round(s*10)/10;
    //     arr[1] = 'km';
    // }
    arr[0] = Math.round(s * 10) / 10;
    arr[1] = 'km';
    return arr;
}

module.exports = router;
