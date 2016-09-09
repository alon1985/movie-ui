angular.module('app.services', [])
    .factory('movieService', function($http, CacheFactory) {
        var movieCache;
        var searchTerm;
        if (!CacheFactory.get('movieCache')) {
            movieCache = CacheFactory('movieCache');
        }
         var getSearchTerm = function() {
             return searchTerm;
         };
         var setSearchTerm = function(searchInput){
                searchTerm = searchInput;
            };

        var getMyMovies = function(style) {
            return $http.get('https://alon-film-id.appspot.com/movies/search' + style).then(function(response) {
                if (response.status === 200) {
                    movieCache.put('movieList', response.data);
                    return response.data;
                } else {
                    return movieCache.get('movieList');
                }
            });
        };
        var exportMyMovies = function(uid){
            return $http.get('https://alon-film-id.appspot.com/movies/export?uid=' + uid).then(function(response){
                return response.data;
            });
        };
        var getMovieInfo = function(title) {
            if(movieCache.get(title)){
                return movieCache.get(title);
            }
            else {
                var url = 'https://api.themoviedb.org/3/search/movie?api_key=2298bae6fa115550839717f1fb686552&query=' + title;
                return $http.get(url).then(function(response) {
                    var movieResult = response.data.results[0];
                    movieCache.put(movieResult.original_title, movieResult);
                    return {
                        Title: movieResult.original_title,
                        Year: movieResult.release_date.split('-')[0],
                        Poster: 'http://image.tmdb.org/t/p/w342' + movieResult.poster_path,
                        Description: movieResult.overview,
                        Id: movieResult.id
                    };
                });
            }
        };
        var getMovieStats = function(userId) {
            var query = '';
            if(userId){
                query = '?uid=' + userId;
            }
            return $http.get('http://alon-film-id.appspot.com/movies/stats' + query).then(function(response) {
                if (response.data) {
                    movieCache.put('movieStats', response.data);
                    return response.data;
                } else {
                    return movieCache.get('movieStats');
                }
                return response.data;
            });
        };

        var postMovie = function(title, format, year, uid) {
            var data = {
                'title': title,
                'year': year,
                'format': format,
                'consumer': 'al3185on1',
                'uid': uid
            };
            var parameter = JSON.stringify(data);
            return $http.post('https://alon-film-id.appspot.com/movies/add', parameter, {headers: {'Content-Type': 'application/json'}})
                .then(function successCallback() {
                    return 1;
                }, function errorCallback() {
                    return 0;
                });
        };

        return {
            getMovies: getMyMovies,
            getMovieInfo: getMovieInfo,
            postMovie: postMovie,
            getMovieStats: getMovieStats,
            exportMyMovies: exportMyMovies,
            setSearchTerm: setSearchTerm,
            getSearchTerm: getSearchTerm
        };
    })
    .factory('userSelectionService', function() {
        var user = {};
        return {
            getUser: function() {
                return user;
            },
            setUser: function(userParam) {
                user = userParam;
            }
        };
    });