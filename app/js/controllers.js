angular.module('app.controllers', [])

    .controller('mainController', function($scope, userSelectionService) {
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
            userSelectionService.setUser(user);
            if (user.photoURL) {
                document.getElementById('user-account').src = user.photoURL;
            }

        };
        var handleSignedOutUser = function(user) {
            document.getElementById('user-account').src = 'https://www.materialui.co/materialIcons/action/account_circle_grey_96x96.png';
        };
    })


    .controller('listController', function($scope, movieService, movieSelectionService, userSelectionService, $uibModal) {
        $scope.searchQuery = '';
        $scope.animationsEnabled = true;
        $scope.user = userSelectionService.getUser();
        if($scope.user.uid){
            movieService.getMovies("?style=list&uid=" + $scope.user.uid).then(function(movies) {
                $scope.movies = movies;
            });

        }

        $scope.showMovieDetails = function(movie){
            movieService.getMovieInfo(movie.Title).then(function(response) {
                if(response.data.Title){
                    $uibModal.open({
                        animation: $scope.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'movieDetailsModal.html',
                        controller: 'movieModalController',
                        controllerAs: '$ctrl',
                        resolve: {
                            movie: function () {
                                return response.data;
                            }
                        }
                    });
                };
                });
            };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
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
    .controller('movieModalController', function ($uibModalInstance, movie){
        var $ctrl = this;
        $ctrl.movie = movie;
        $ctrl.ok = function () {
            $uibModalInstance.close();
        };
    })
    .controller('statsController', function($scope, movieService) {
        $scope.series = ['In Theaters', 'Video'];
        movieService.getMovieStats().then(function(response) {
            $scope.options = {legend: {display: true}, showTooltips: false};
            $scope.totalMovies = response.totalMovies;

            var labels = [];
            var moviesPerYear = [];
            response.moviesPerYear.forEach(function(mPY) {
                labels.push(mPY.year);
                moviesPerYear.push(mPY.total);
            });
            $scope.labels = labels;
            $scope.moviesPerYear = moviesPerYear;

            var moviesPerYearTheaters = [];
            var moviesPerYearVideo = [];
            response.movieFormatsPerYear.forEach(function(mFPY) {
                var formatTotals = mFPY.formatTotals;
                if (formatTotals[0].format === 'In Theaters') {
                    moviesPerYearTheaters.push(formatTotals[0].total);
                    moviesPerYearVideo.push(formatTotals[1].total);
                } else {
                    moviesPerYearVideo.push(formatTotals[0].total);
                    moviesPerYearTheaters.push(formatTotals[1].total);
                }
            });
            var moviesPerYearByFormat = [moviesPerYearTheaters, moviesPerYearVideo];
            $scope.moviesPerYearByFormat = moviesPerYearByFormat;
        });
    })
.controller('addController', function($scope, $uibModal){
    $scope.addMovie = function() {
        $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'confirmMovieModal.html',
            controller: 'movieModalController2',
            controllerAs: '$ctrl2',
            resolve: {
                movie: function() {
                    var movieReturned = {
                        Title: $scope.movieTitle,
                        Year: $scope.movieYear,
                        Formmat: $scope.movieFormat
                    };
                    return movieReturned;
                }
            }
        });
    };
})
    .controller('movieModalController2', function ($uibModalInstance, movie){
        var $ctrl2 = this;
        $ctrl2.movie = movie;
        $ctrl2.ok = function () {
            $uibModalInstance.close();
        };
    })
