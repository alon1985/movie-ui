angular.module('movieApp', ['ngAnimate', 'ui.bootstrap']);
angular.module('movieApp').controller('mainController', function($scope) {
    $scope.animationsEnabled = true;
    $scope.displayLogin = false;
    $scope.open = function() {
        $scope.displayLogin = !$scope.displayLogin;
    }
});
