angular.module('movieApp', [])

    .controller('mainController', function($scope, $http) {
        $scope.sortType     = 'title'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $http.get('http://alon-film-id.appspot.com/movies/search')
            .then(function(res){
                $scope.movies = res.data;
            });

        $scope.search = function (row) {
            return (angular.lowercase(row.title).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
            angular.lowercase(row.format).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
            angular.lowercase(row.year).indexOf(angular.lowercase($scope.query) || '') !== -1);
        };

    });