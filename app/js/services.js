angular.module('app.services', [])
    .factory('movieService', function($http, CacheFactory) {
        var movieCache;
        if (!CacheFactory.get('movieCache')) {
            movieCache = CacheFactory('movieCache');
        }
        var getMovies = function(style) {
            return $http.get('https://alon-film-id.appspot.com/movies/search' + style).then(function(response) {
                if (response.status === 200) {
                    movieCache.put('movieList', response.data);
                    return response.data;
                } else {
                    return movieCache.get('movieList');
                }
            });
        };
        var getMovieInfo = function(title) {
            if(movieCache.get(title)){
                return movieCache.get(title);
            }
            else {
                var url = 'http://www.omdbapi.com/?t=' + title + '&y=&plot=short&r=json';
                return $http.get(url).success(function(response) {
                    movieCache.put(response);
                    return response;
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
        var syncMovies = function(key) {
            return $http.get('http://alon-film-id.appspot.com/movies/upload?key=' + key).then(function(response) {
                return response;
            });
        };

        var postMovie = function(title, format, year) {
            var data = {
                'title': title,
                'year': year,
                'format': format,
                'consumer': 'al3185on1'
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
            getMovies: getMovies,
            getMovieInfo: getMovieInfo,
            postMovie: postMovie,
            getMovieStats: getMovieStats,
            syncMovies: syncMovies
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