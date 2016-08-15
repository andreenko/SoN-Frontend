'use strict';

angular.module('socialNetwork').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', 'NetworkService', 'Constant', 'authFact', 'PostCreationService', '$state'];

function ProfileController($scope, NetworkService, Constant, authFact, PostCreationService, $state) {
    $scope.profileLoaded = false;

    var promise = NetworkService.getMyProfile('/users/profile').promise;
    $scope.postText = '';
    promise.then(function (responce) {
        var data = responce.getData();

        authFact.setId(data.entity.id);
        $scope.userName = data.entity.name || 'Not set';
        $scope.userSubname = data.entity.lastName || 'Not set';
        $scope.userBirthday = data.entity.birthday || 'Not set';
        $scope.userAvatar = data.entity.avatar || null;
        $scope.userContacts = data.entity.contactUser || 'Not set';
        $scope.userCity = data.entity.city || 'Not set';
        $scope.userAbout = data.entity.about || 'Not set';
        $scope.userSex = data.entity.sex;

    });

    $scope.PostIt = function () {
        var id = authFact.getId();
        var imgURL = Constant.UploadedImgID;
        PostCreationService.createPostToUser(imgURL || null, $scope.postText, id);
        $scope.postText = "";
        $state.reload();
    }
}