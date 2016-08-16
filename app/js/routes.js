angular.module('app.routes', [])

    .config(function($stateProvider, $urlRouterProvider, CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, { maxAge: 24 * 60 * 60 * 1000 });
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider



            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'mainController'
            })

            .state('list', {
                url: '/list',
                templateUrl: 'templates/list.html',
                controller: 'listController',
                views: {
                    'details': {
                        templateUrl: 'templates/details.html',
                        controller: 'detailsController',
                        params: ['movieSeen']
                    }
                }

            })
            .state('add', {
                url: '/add',
                templateUrl: 'templates/add.html',
                controller: 'addController'

            })
            .state('stats', {
                url: '/stats',
                templateUrl: 'templates/stats.html',
                controller: 'statsController'

            })
            .state('upcoming', {
                url: '/upcoming',
                templateUrl: 'templates/upcoming.html',
                controller: 'upcomingController'

            })

        $urlRouterProvider.otherwise('/home')



    });