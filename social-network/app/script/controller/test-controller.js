'use strict';

angular.module('socialNetwork').controller('TestController', TestController);

TestController.inject = ['$scope', 'Upload', 'NetworkService', 'Constant', '$mdToast', 'NotifyService'];

function TestController($scope, Upload, NetworkService, Constant, $mdToast, NotifyService) {
    $scope.fieldToReturn = '';
    $scope.eventText = 'There is no events yet';

    var hendler = NotifyService.subscribe(Constant.Events.UPDATEPSEARCH, eventHappened);

    //NotifyService.notify(Constant.Events.UPDATEPSEARCH, whenNotify());

    function eventHappened(event, data) {
        $scope.eventText = data.name + ', ' + data.lastName + '\n' + data.field;
    }

    $scope.$on('$destroy', function () {
        hendler();
    });

    function whenNotify() {
        var i = 0;
        return {
            name: 'firstEvent',
            lastName: 'coolShit!',
            field: $scope.fieldToReturn
        }
    }


    // $scope.upload = {};
    //
    // $scope.fileName = "";
    // $scope.data = {};
    // $scope.submit = function () {
    //     if ($scope.form.file.$valid && $scope.file) {
    //         $scope.fileName = $scope.file.name;
    //         $scope.upload($scope.file);
    //     }
    // };
    //
    // // upload on file select or drop
    // $scope.upload = function (file) {
    //     $scope.data = {file: file, 'name': $scope.fileName};
    //     Upload.upload({
    //         url: Constant.APIBaseUrl + '/files',
    //         data: $scope.data
    //     }).then(function (resp) {
    //         Constant.ToastMsg = "Upload seccess, id is: " + resp.data.entity;
    //         $mdToast.show({
    //             hideDelay: 3000,
    //             position: 'top right',
    //             controller: 'ToastController',
    //             templateUrl: 'view/reg-toast.html'
    //         });
    //         console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //         Constant.ToastMsg = "Server error, " + resp.message;
    //         $mdToast.show({
    //             hideDelay: 3000,
    //             position: 'top right',
    //             controller: 'ToastController',
    //             templateUrl: 'view/reg-toast.html'
    //         });
    //     }, function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };
}