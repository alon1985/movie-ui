angular.module('app.routes', [])

    .config(function($routeProvider, $locationProvider, CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, { maxAge: 24 * 60 * 60 * 1000 });
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js

        $routeProvider.otherwise('/');

        $routeProvider


            .when('/home', {
                templateUrl: 'templates/list.html',
                controller: 'listController'
            })
            .when('/list', {
                templateUrl: 'templates/list.html',
                controller: 'listController'
            })
            .when('/detail', {
                templateUrl: 'templates/details.html',
                controller: 'detailsController'
            })
            .when('/add', {
                templateUrl: 'templates/add.html',
                controller: 'addController'

            })
            .when('/stats', {
                templateUrl: 'templates/stats.html',
                controller: 'statsController'

            })
            .when('/watchlist', {
                templateUrl: 'templates/watchlist.html',
                controller: 'watchlistController'

            })

        $locationProvider.html5Mode(true);




    });