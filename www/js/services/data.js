/**
 * Created by lan on 3/21/15.
 */
app
// user local storage
.factory('localstorage', ['$window', function($window) {
    return {
        set: function(key, value){
            $window.localStorage[key] = JSON.stringify(value);
        },
        get: function(key){
            return JSON.parse($window.localStorage[key] || {tax_rate: 8.75, rate1: 15, rate2: 18, rate3: 20});
        }
    }
}])

// use json file
.factory('setting', function($http, $window){
    return {
        get: function(){
            return $http.get('/setting.json')
        },
        // need backend server
        set: function(rate){
            $http.post('/setting.json', rate).success(function(){
                $window.location = '/home'
            }).error(function(err){
                console.log("Error Save Setting: " + JSON.stringify(err))
            });
        }
    }
})

// use sqlite plugin
.factory('dao', function($cordovaSQLite){

    var query = "SELECT tax_rate, rate1, rate2, rate3 FROM setting WHERE id = 1";  // cannot use * here
    var insert = "INSERT INTO setting (tax_rate, rate1, rate2, rate3) VALUES (?,?,?,?)";
    var update = "UPDATE setting SET tax_rate=?, rate1=?, rate2=?, rate3=? WHERE id = 1";
    return {
        get: function(callback){
            console.log('get db')
            console.log(db)
            $cordovaSQLite.execute(db, query).then(function(res) {
                if(res.rows.length > 0) {
                    console.log("get setting: " + JSON.stringify(res.rows.item(0)));
                    callback(null, res.rows.item(0));
                } else {
                    console.log("No results found");
                    $cordovaSQLite.execute(db, insert, [8.75,15,18,20]).then(function(res) {
                        console.log("add setting: " + res.insertId);
                        callback(null, {tax_rate: 8.75, rate1: 15, rate2: 18, rate3: 20});
                    }, function (err) {
                        console.error(err);
                        callback(err);
                    });
                }
            }, function (err) {
                console.error(err);
                callback(err);
            });
        },
        set: function(rate, callback){
            $cordovaSQLite.execute(db, update, [rate.tax_rate, rate.rate1, rate.rate2, rate.rate3]).then(function(res) {
                console.log("update setting");
                callback();
            }, function (err) {
                console.error(err);
                callback(err);
            });
        }
    }
});