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
