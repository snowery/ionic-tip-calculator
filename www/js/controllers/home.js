/**
 * Created by lan on 3/20/15.
 */
angular.module('starter')
.controller('HomeTabCtrl', function($scope) {
    $scope.rates = [15, 18, 20];

    $scope.pre_tax = 0;
    $scope.tax = 0;

    $scope.calculate = function(sub_total, tax_rate){

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

    $scope.rate_change = function(rate){

        var tip = rate * $scope.pre_tax / 100;
        var total = $scope.pre_tax + $scope.tax + tip;
        $scope.tip = {
            rate: rate,
            tip: tip.toFixed(2),
            total: total.toFixed(2)
        }
    }
});