angular.module('app.controllers', [])

    .controller('mainController', function($scope) {
        firebase.auth().onAuthStateChanged(function(user) {
            user ? handleSignedInUser(user) : handleSignedOutUser();
        });
        $scope.user = null;
        $scope.animationsEnabled = true;
        $scope.login = function() {
            window.open('/templates/authTemplate.html', 'Sign In', 'width=985,height=735');
        };
        $scope.logout = function() {
            firebase.auth().signOut();
        };
        var handleSignedInUser = function(user) {
            $scope.user = user;
            if (user.photoURL) {
                document.getElementById('user-account').src = user.photoURL;
            }

        };
        var handleSignedOutUser = function(user) {
            document.getElementById('user-account').src = 'https://www.materialui.co/materialIcons/action/account_circle_grey_96x96.png';
        };
    })


    .controller('listController', function($scope, movieService, movieSelectionService) {
        movieService.getMovies().then(function(movies) {
            $scope.movies = movies;
        });

        $scope.setMovie = function(movie) {
            movieSelectionService.setMovie(movie);
            $state.go('tabsController.movieDetails');
        };

        $scope.doRefresh = function() {
            movieService.getMovies().then(function(movies) {
                $scope.movies = movies;
            }).finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    })
