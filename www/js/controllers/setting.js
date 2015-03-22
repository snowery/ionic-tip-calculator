/**
 * Created by lan on 3/21/15.
 */
app
.controller('SettingCtrl', ['$scope', 'dao', '$state', function($scope, dao, $state) {

    dao.get(function(err, data){
        console.log("setting get rate")
        $scope.rate = {
            tax_rate: data.tax_rate,
            rate1: data.rate1,
            rate2: data.rate2,
            rate3: data.rate3
        };
    });

    $scope.save = function(rate){
        dao.set(rate, function(err){
            if(err) window.alert(err);
            else $state.go('home');
        });
    }
}])
