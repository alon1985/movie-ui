angular.module('movieApp', ['ngAnimate', 'ui.bootstrap']);
angular.module('movieApp').controller('mainController', function($scope, $http, $window, $uibModal, movieService) {
    $scope.animationsEnabled = true;

    $scope.open = function(size) {
        if ($scope.addMovieTitle && $scope.addMovieFormat && $scope.addMovieYear) {
            $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'confirmMovie.html',
                controller: 'addMovieController',
                size: size,
                resolve: {
                    items: function() {
                        return {
                            movieTitle: $scope.addMovieTitle,
                            movieYear: $scope.addMovieYear,
                            movieFormat: $scope.addMovieFormat,
                            consumer: $scope.moviePassword
                        };
                    }
                }
            });
        }
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.Range = function(start, end) {
        var result = [];
        for(var i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    };

    movieService.getMovies().then(function(movies) {
        $scope.movies = movies;
    });



});
angular.module('movieApp').factory('movieService', function($http) {
    var getMovies = function() {
        return $http.get('https://alon-film-id.appspot.com/movies/search').then(function(response) {
            return response.data;
        });
    };

    return {
        getMovies: getMovies
    };
});
angular.module('movieApp').controller('addMovieController', function($scope, $http, $uibModalInstance, $uibModal, items, $window) {

    $scope.items = items;
    $scope.ok = function() {
        var data = {
            'title': $scope.items.movieTitle,
            'year': $scope.items.movieYear,
            'format': $scope.items.movieFormat,
            'consumer': $scope.items.consumer
        };
        var parameter = JSON.stringify(data);

        $http.post('https://alon-film-id.appspot.com/movies/add', parameter, {headers: {'Content-Type': 'application/json'}}).success(function(data, status, headers, config) {
            $uibModalInstance.dismiss();
            $uibModal.open({
                templateUrl: 'successMovieModal.html',
                controller: 'addMovieController',
                resolve: {
                    items: function() {
                        return;
                    }
                }
            });
        }).error(function(data, status, headers, config) {
            $uibModalInstance.dismiss();
            $uibModal.open({
                templateUrl: 'failedMovieModal.html',
                controller: 'addMovieController',
                resolve: {
                    items: function() {
                        return;
                    }
                }
            });
        });
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.closeAndReload = function() {
        $uibModalInstance.dismiss('cancel');
        $window.location.reload();
    }
});
