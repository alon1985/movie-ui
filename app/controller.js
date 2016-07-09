angular.module('movieApp', ['wt.responsive', 'ngAnimate', 'ui.bootstrap']);
angular.module('movieApp').controller('mainController', function($scope, $http, $window, $uibModal) {
    $scope.animationsEnabled = true;
    $scope.sortType = 'title'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order

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
                            movieFormat: $scope.addMovieFormat
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

    $http.get('https://alon-film-id.appspot.com/movies/search')
        .then(function(res) {
            $scope.movies = res.data;
        });

    $scope.search = function(row) {
        return (angular.lowercase(row.title).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.format).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.year).indexOf(angular.lowercase($scope.query) || '') !== -1);
    };

});
angular.module('movieApp').controller('addMovieController', function($scope, $http, $uibModalInstance, $uibModal, items) {

    $scope.items = items;
    $scope.ok = function() {
        var data = {
            'title': $scope.items.addMovieTitle,
            'year': $scope.items.addMovieYear,
            'format': $scope.items.addMovieFormat,
            'consumer': $scope.items.moviePassword
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
});
