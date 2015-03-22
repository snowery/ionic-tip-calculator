// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
var app = angular.module('starter', ['ionic', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: 'HomeCtrl'
        })

        .state('setting', {
            url: "/setting",
            templateUrl: "templates/setting.html",
            controller: 'SettingCtrl'
        });


    $urlRouterProvider.otherwise("home");

})

.run(function($ionicPlatform, $window, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        // run on chrome browser
        //db = $window.openDatabase("tip_calculator.db",'1.0', 'Offline document storage', 5*1024*1024);

        // run on mobile
        db = $cordovaSQLite.openDB("tip_calculator.db", 1);

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS setting (id integer primary key, tax_rate decimal, rate1 decimal, rate2 decimal, rate3 decimal)");
    });
})
