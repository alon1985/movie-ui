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

    .controller('listController', function($scope, movieService, userSelectionService, $uibModal) {
        $scope.animationsEnabled = true;
        $scope.user = userSelectionService.getUser();
        if ($scope.user.uid) {
            movieService.getMovies("?style=list&uid=" + $scope.user.uid).then(function(movies) {
                $scope.movies = movies;
            });

        }
        $scope.showMovieDetails = function(movie) {
            movieService.getMovieInfo(movie.Title).then(function(response) {
                if (response) {
                    $uibModal.open({
                        animation: $scope.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'movieDetailsModal',
                        controller: 'movieModalController',
                        controllerAs: '$ctrl',
                        resolve: {
                            movie: function() {
                                return response;
                            }
                        }
                    });
                };
            });
        };

        $scope.toggleAnimation = function() {
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
    .controller('movieModalController', function($uibModalInstance, movie) {
        var $ctrl = this;
        $ctrl.movie = movie;
        $ctrl.ok = function() {
            $uibModalInstance.close();
        };
    })
    .controller('statsController', function($scope, movieService, userSelectionService) {
        $scope.user = userSelectionService.getUser();
        if ($scope.user.uid) {
            $scope.series = ['In Theaters', 'Video'];
            movieService.getMovieStats($scope.user.uid).then(function(response) {
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
        }
        $scope.chartClick = function (points, evt) {
            console.log(points[0].value); // 0 -> Series A, 1 -> Series B
            //points[0]._view.label
            //points[0]._view.datasetLabel
        };
    })
    .controller('addController', function($scope, $uibModal, $http) {
        $scope.selectedMovie = null;
        $scope.getMovies = function(val) {
            return $http.get('https://api.themoviedb.org/3/search/movie?api_key=2298bae6fa115550839717f1fb686552&query=' +val, {
            }).then(function(response){
                return response.data.results.map(function(item){
                    return item;
                });
            });
        };
        $scope.movieSelected = function(movieSelected){
            $scope.selectedMovie = movieSelected;
        };

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
                            Year:$scope.movieYear,
                            Format: $scope.movieFormat
                        };
                        movieReturned.Title = $scope.selectedMovie ? $scope.selectedMovie.original_title : $scope.movieTitle;
                        movieReturned.Id = $scope.selectedMovie.id || 0;
                        movieReturned.PosterPath = $scope.selectedMovie.id > 0 ? 'http://image.tmdb.org/t/p/w342' + $scope.selectedMovie.poster_path : '';
                        return movieReturned;
                    }
                }
            });
        };
    })
    .controller('movieModalController2', function($scope, $uibModalInstance, $uibModal, movie, movieService) {
        var $ctrl2 = this;
        $ctrl2.movie = movie;
        $ctrl2.ok = function() {
            movieService.postMovie($scope.movie.Title, $scope.Format, $scope.Year)
                .then(function(result) {
                    $uibModal.open({
                        animation: $scope.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'postMovieModal.html',
                        controller: 'movieModalController3',
                        controllerAs: '$ctrl3',
                        resolve: {
                            message: (result === 0 || !result) ? 'Failed to Add Movie' : 'Movie Added'
                        }
                    });
                });
        };
        $ctrl2.cancel = function() {
            $uibModalInstance.close();
        };
    })
    .controller('movieModalController3', function($scope, $uibModalInstance) {
        var $ctrl3 = this;
        $ctrl3.ok = function() {
            $uibModalInstance.close();
        };
    })