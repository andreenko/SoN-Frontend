'use strict';

angular.module('socialNetwork').service('PostCreationService', PostCreationService);

PostCreationService.$inject = ['$mdToast', 'NetworkService', 'Constant', 'authFact'];

function PostCreationService($mdToast, NetworkService, Constant, authFact) {

    function _createPost() {
        var fileId = 11;
        var postText = "New fresh created post ! ALLILUIJA !!!";

        var master = {
            udTo: authFact.getId(),
            fkImage: fileId,
            text: postText
        };

        var promise = NetworkService.createPoster("/posts", master).promise;

        promise.then(function (responce) {
            var data = responce.getData();

            Constant.ToastMsg = "Post creation seccess.";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
        });
    }
    return{
        createPost: _createPost
    }
}