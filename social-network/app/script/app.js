'use strict';

var app = angular.module('socialNetwork', ['ngStomp', 'ngImgCrop', 'ngCookies', 'ngMedia', 'ui.router', 'ngMessages', 'ngMaterialDatePicker', 'ngMaterial', 'ngFileUpload']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/authorisation');

    $stateProvider
        .state('404', {
            url: '/',
            templateUrl: 'view/404.html'
        })
        .state('test', {
            url: '/test',
            templateUrl: 'view/test.html'
        })
        .state('menu', {
            abstract: true,
            templateUrl: 'view/menu.html'
        })
        .state('menu.profile', {
            url: '/profile',
            templateUrl: 'view/profile.html'
        })
        .state('menu.search', {
            url: '/search:searchReq',
            templateUrl: 'view/search.html'
        })
        .state('menu.friends', {
            url: '/friends',
            templateUrl: 'view/friends.html'
        })
        .state('menu.groups', {
            url: '/my-groups',
            templateUrl: 'view/my-groups.html'
        })
        .state('menu.messages', {
            url: '/messages',
            templateUrl: 'view/messages.html'
        })
        .state('menu.face-group', {
            url: '/face-group/:groupIdentifier',
            templateUrl: 'view/face-group.html'
        })
        .state('menu.edit-profile', {
            url: '/edit-profile',
            templateUrl: 'view/edit-profile.html'
        })
        .state('menu.create-group', {
            url: '/create-group',
            templateUrl: 'view/create-group.html'
        })
        .state('menu.audio', {
            url: '/audio',
            templateUrl: 'view/audio.html'
        })
        .state('menu.video', {
            url: '/video',
            templateUrl: 'view/video.html'
        })
        .state('home', {
            url: '/authorisation',
            templateUrl: 'view/authorisation.html'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'view/registration.html'
        })
        .state('forgot_pass', {
            url: '/forgot_pass',
            templateUrl: 'view/forgot_pass.html'
        })
        .state('menu.settings', {
            url: '/settings',
            templateUrl: 'view/settings.html'
        })
        .state('menu.settings.black-list', {
            url: '/black-list',
            templateUrl: 'view/black-list.html'
        })
        .state('menu.settings.change_pass', {
            url: '/change_pass',
            templateUrl: 'view/change_pass.html'
        })
        .state('menu.friend', {
            url: '/users/:userIdentifier',
            templateUrl: "view/friendProfile.html"
        })
        .state('menu.group', {
            url: '/groups/:groupIdentifier',
            templateUrl: "view/face-group.html"
        })
        .state('menu.search-group', {
            url: '/groups:searchReq',
            templateUrl: "view/search-group.html"
        });

    $locationProvider.html5Mode(false);
});