/**
 * Created by lan on 3/20/15.
 */
app
.controller('HomeCtrl', ['$scope', '$ionicPlatform', 'dao', function($scope, $ionicPlatform, dao) {

    $ionicPlatform.ready(function() {
        dao.get(function (err, data) {
            console.log("home get rate");
            $scope.tax_rate = data.tax_rate;
            $scope.rates = [data.rate1, data.rate2, data.rate3];
        });
    });

    $scope.pre_tax = 0;
    $scope.sub_total = 100;

    $scope.calculate = function(sub_total, tax_rate) {

        $scope.pre_tax = sub_total / (1 + tax_rate/100);
        $scope.tax = sub_total - $scope.pre_tax;

        $scope.text = "Pre-tax Total: " + $scope.pre_tax.toFixed(2) + ", Tax: " + $scope.tax.toFixed(2);

        $scope.tips = $scope.rates.map(function(r) {
            var tip = r * $scope.pre_tax / 100;
            var total = $scope.pre_tax + $scope.tax + tip;
            return {
                rate: r,
                tip: tip.toFixed(2),
                total: total.toFixed(2)
            }
        });
    }

    $scope.rate_change = function(rate) {

        var tip = rate * $scope.pre_tax / 100;
        var total = $scope.pre_tax + $scope.tax + tip;
        $scope.tip = {
            rate: rate,
            tip: tip.toFixed(2),
            total: total.toFixed(2)
        }
    }
}]);