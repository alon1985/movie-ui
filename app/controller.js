var movieApp = angular.module('movieApp', []);

   movieApp.controller('mainController', function($scope, $http, $window) {
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

        $scope.addMovie = function(){
            if (angular.isDefined($scope.addMovieTitle) && $scope.addMovieYear!= ''
                && $scope.addMovieFormat!= '') {
                var data = {
                    'title': $scope.addMovieTitle,
                    'year': $scope.addMovieYear,
                    'format': $scope.addMovieFormat
                };
                var parameter = JSON.stringify(data);

                $http.post(url, parameter, {headers: {'Content-Type': 'application/json'}}).success(function(data, status, headers, config) {
                    $scope.movies.push({ title: $scope.addMovieTitle, format: $scope.addMovieFormat, year: $scope.addMovieYear, consumer: $scope.moviePassword });
                    // CLEAR THE FIELDS.
                    $scope.addMovieTitle = '';
                    $scope.addMovieFormat = '';
                    $scope.addMovieYear = '';
                    $scope.moviePassword = '';
                }).error(function(data, status, headers, config) {
                    $window.alert("Failed to add movie");
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            }
            else{
                $window.alert("Failed to add movie");
            }
        };

    });
