'use strict';

app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/navbar/navbar.html',
        controller: 'NavbarController'
    };

});

app.controller('NavbarController', function($scope, $rootScope, AuthService, AUTH_EVENTS, $state, $stateParams){

  $scope.user = null;

  $scope.tabs = [
    { name: "Board", link: "board({ name: repoName, owner: repoOwner })", ifSelected: "" },
    { name: "Analytics", link: "chart({ name: repoName, owner: repoOwner })", ifSelected: "" },
    { name: "Repo Activity", link: "repo-activity({ name: repoName, owner: repoOwner, pageNumber: 1 })", ifSelected: "" },
    { name: "Other Cards", link: "other-cards({ name: repoName, owner: repoOwner })", ifSelected: "" }];

  $scope.changeActiveTab = function(indx) {
    $scope.tabs.forEach(function(tab){
      tab.ifSelected = "";
    });
    $scope.tabs[indx].ifSelected = "tab-active";
  };

  $scope.isLoggedIn = function () {
      return AuthService.isAuthenticated();
  };

  $scope.logout = function () {
      AuthService.logout().then(function () {
         $state.go('home');
      });
  };

  var setUser = function () {
      AuthService.getLoggedInUser().then(function (user) {
          $scope.user = user;
      });
  };

  var removeUser = function () {
      $scope.user = null;
  };

  setUser();

  $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
  $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
   $('.button-collapse').sideNav({
	menuWidth: 450, // Default is 240
	edge: 'left', // Choose the horizontal origin
	closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

 });