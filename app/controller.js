var movieApp = angular.module('movieApp', []);

   movieApp.controller('mainController', function($scope, $http, $window) {
        $scope.sortType     = 'title'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

       $scope.Range = function(start, end) {
           var result = [];
           for (var i = start; i <= end; i++) {
               result.push(i);
           }
           return result;
       };

        $http.get('https://alon-film-id.appspot.com/movies/search')
            .then(function(res){
                $scope.movies = res.data;
            });

        $scope.search = function (row) {
            return (angular.lowercase(row.title).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
            angular.lowercase(row.format).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
            angular.lowercase(row.year).indexOf(angular.lowercase($scope.query) || '') !== -1);
        };

        $scope.submit = function(){
            if (angular.isDefined($scope.addMovieTitle) && $scope.addMovieYear!= ''
                && $scope.addMovieFormat!= '') {
                var data = {
                    'title': $scope.addMovieTitle,
                    'year': $scope.addMovieYear,
                    'format': $scope.addMovieFormat,
                    'consumer': $scope.moviePassword
            };
                var parameter = JSON.stringify(data);

                $http.post('https://alon-film-id.appspot.com/movies/add', parameter, {headers: {'Content-Type': 'application/json'}}).success(function(data, status, headers, config) {
                    $scope.movies.push({ title: $scope.addMovieTitle, format: $scope.addMovieFormat, year: $scope.addMovieYear});
                    $window.alert("Movie added");
                    $window.location.reload();
                }).error(function(data, status, headers, config) {
                    $window.alert("Failed to add movie");
                });

            }
            else{
                $window.alert("Failed to add movie");
            }
        };

    });
