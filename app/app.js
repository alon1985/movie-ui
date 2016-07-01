// Declare app level module which depends on views, and components
angular.module('movieApp', [
    'ngRoute',
    'wt.responsive'
]).config('$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './index.html',
        controller: 'mainController'
    })
        .when('/home', {
            templateUrl: './index.html',
            controller: 'mainController'
        })
});
