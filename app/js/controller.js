angular.module('movieApp', ['ngAnimate', 'ui.bootstrap']);
angular.module('movieApp').controller('mainController', function($scope) {
        firebase.auth().onAuthStateChanged(function(user) {
            user ? handleSignedInUser(user) : handleSignedOutUser();
        });
        $scope.animationsEnabled = true;
        $scope.login = function() {
            window.open('/templates/authTemplate.html', 'Sign In', 'width=985,height=735');
        };
        $scope.logout = function() {
            firebase.auth().signOut();
        };

        /**
         * Displays the UI for a signed in user.
         */
        var handleSignedInUser = function(user) {
            if (user.photoURL) {
                document.getElementById('user-account').src = user.photoURL;
            }
        };
        var handleSignedOutUser = function(user) {
            if (user.photoURL) {
                document.getElementById('user-account').src = '';
            }
        };
    }
);
