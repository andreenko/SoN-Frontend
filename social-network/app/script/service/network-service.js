'use strict';

angular.module('socialNetwork').service('NetworkService', NetworkService);

NetworkService.$inject = ['$http', '$q', '$log', 'Constant', 'ResponseFactory', '$mdToast', 'authFact'];

function NetworkService($http, $q, $log, Constant, ResponseFactory, $mdToast, authFact) {

    $http.defaults.useXDomain = true;
    $http.defaults.withCredentials = false;
    delete $http.defaults.headers.common['X-Requested-With'];

    function authorised() {
        var token = authFact.getAccessToken();
        return token;
    }

    function _get(url, authType, params) {
        if(authorised) {
            var deferred = $q.defer();

            var cancel = function () {
                deferred.resolve();
            };

            params = params || {};
            params.access_token = authFact.getAccessToken();

            $http.get(url, {
                params: params,
                headers: _getHeadersByAuthType(authType)
            }).success(function (data) {
                deferred.resolve(ResponseFactory.buildResponse(data));
            }).error(function (xhr, status) {
                Constant.ToastMsg = "Server error, " + xhr;
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'ToastController',
                    templateUrl: 'view/toast.html'
                });
                $log.error('[NetworkService] ' + url + ': Error request');
                deferred.reject(status);
            });

            return {
                promise: deferred.promise,
                cancel: cancel
            };
        }
    }

    function _put(url, data, authType, params) {
        if(authorised) {
            authType = authType || Constant.AuthType.NONE;
            var deferred = $q.defer();

            var cancel = function () {
                deferred.resolve();
            };

            params = params || {};

            if (authType != Constant.AuthType.REG)
                params.access_token = authFact.getAccessToken();

            var req = {
                method: 'PUT',
                url: url,
                params: params,
                headers: _getHeadersByAuthType(authType),
                data: data
            };

            $http(req).success(function (data) {
                deferred.resolve(ResponseFactory.buildResponse(data));
            }).error(function (xhr, status) {
                Constant.ToastMsg = "Server error...";
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'ToastController',
                    templateUrl: 'view/toast.html'
                });
                $log.error('[NetworkService] ' + url + ': Error request');
                deferred.reject(status);
            });

            return {
                promise: deferred.promise,
                cancel: cancel
            };
        }
    }

    function _post(url, data, authType, params) {
        if(authorised || authType == Constant.AuthType.AUTH || authType == Constant.AuthType.REG) {
            authType = authType || Constant.AuthType.NONE;
            var deferred = $q.defer();

            var cancel = function () {
                deferred.resolve();
            };

            params = params || {};

            if (authType != Constant.AuthType.REG && authType != Constant.AuthType.AUTH) {
                params.access_token = authFact.getAccessToken();
            }

            var req = {
                method: 'POST',
                url: url,
                params: params,
                headers: _getHeadersByAuthType(authType),
                data: data
            };


            $http(req).success(function (data) {
                deferred.resolve(ResponseFactory.buildResponse(data));
            }).error(function (xhr, status) {
                // Constant.ToastMsg = "Server error...";
                // $mdToast.show({
                //     hideDelay: 3000,
                //     position: 'top right',
                //     controller: 'ToastController',
                //     templateUrl: 'view/toast.html'
                // });
                $log.error(xhr);
                $log.error('[NetworkService] ' + url + ': Error request');
                deferred.reject(status);
            });

            return {
                promise: deferred.promise,
                cancel: cancel
            };
        }
        else {
            Constant.ToastMsg = "Not authorised !";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
        }
    }
    function _delete(url, data, authType, params) {
        if(authorised) {
            authType = authType || Constant.AuthType.NONE;
            var deferred = $q.defer();

            var cancel = function () {
                deferred.resolve();
            };

            params = params || {};

            if (authType != Constant.AuthType.REG && authType != Constant.AuthType.AUTH) {
                params.access_token = authFact.getAccessToken();
            }

            var req = {
                method: 'DELETE',
                url: url,
                params: params,
                headers: _getHeadersByAuthType(authType),
                data: data
            };


            $http(req).success(function (data) {
                deferred.resolve(ResponseFactory.buildResponse(data));
            }).error(function (xhr, status) {
                Constant.ToastMsg = "Server error...";
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'ToastController',
                    templateUrl: 'view/toast.html'
                });
                $log.error('[NetworkService] ' + url + ': Error request');
                deferred.reject(status);
            });

            return {
                promise: deferred.promise,
                cancel: cancel
            };
        }
    }

    function _getHeadersByAuthType(authType) {

        switch (authType) {
            case Constant.AuthType.NONE:
                return {
                    'Content-Type': 'application/json'
                };
            case Constant.AuthType.AUTH:
                return {
                    'Authorization': 'Basic cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg==',
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            case Constant.AuthType.REG:
                return {
                    'Content-Type': 'application/json'
                };
            case Constant.AuthType.BASIC:
                return {
                    'Authorization': 'Basic cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg==',
                    'Content-Type': 'application/json'
                };
            // case Constant.AuthType.OAUTH:
            //     return {
            //         'Authorization': 'Bearer ' + AuthFactory.getAccessToken()
            //     };
        }
    }

    function _leaveGroup(additionalUrl, id) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            groupId: id
        };
        var data = {};
        return _delete(url, data, Constant.AuthType.NONE, params);
    }

    function _joinGroup(additionalUrl, id) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            groupId: id
        };
        var data = {};
        return _post(url, data, Constant.AuthType.NONE, params);
    }


    function _editProfile(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _put(url, Constant.AuthType.NONE, params);
    }
    function _addToFriends(id, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            userId: id
        };
        var data = {};
        return _post(url, data, Constant.AuthType.NONE, params);
    }

    function _deletePost(id, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            postId: id
        };
        var data = {};
        return _delete(url, data, Constant.AuthType.NONE, params);
    }
    function _deleteFromFriendsns(id, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            userId: id
        };
        var data = {};
        return _delete(url, data, Constant.AuthType.NONE, params);
    }
    function _createPosterToUser(additionalUrl, data) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.NONE, params);
    }
    function _createPosterToGroup(additionalUrl, data) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.NONE, params);
    }
    function _getGroups(additionalUrl, limit, offset, id) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            userId: id,
            limit: limit,
            offset: offset
        };
        return _get(url, Constant.AuthType.NONE, params);

    }

    function _authorisation(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.AUTH, params);
    }

    function _postingData(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;//Constant.APIBaseUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.BASIC, params);
    }

    function _getMyProfile(additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _getProfileById(additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _getAudiolist(additionalUrl, userId) {
        var url = additionalUrl;
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _postImage(data, additionalUrl, name) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            name: name
        };
        return _post(url, data, Constant.AuthType.NONE, params);
    }

    function _getPost(additionalUrl, userId, offset, limit) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            userId: userId,
            offset: offset,
            limit: limit
        };
        return _get(url, Constant.AuthType.NONE, params);
    }
    function _getGroupPost(additionalUrl, groupId, offset, limit) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            groupId: groupId,
            offset: offset,
            limit: limit
        };
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _registration(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.REG, params);
    }

    function _getFriends(additionalUrl, params) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var authType = Constant.AuthType.BASIC;
        return _get(url, authType, params);
    }

    function _getGroup(additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }
    function _searchTA(text, additionalUrl, limit, offset) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            fullName: text,
            limit: limit,
            offset: offset
        };
        return _get(url, Constant.AuthType.NONE, params);
    }


    return {
        joinGroup: _joinGroup,
        leaveGroup: _leaveGroup,
        getGroups: _getGroups,
        getGroup: _getGroup,
        deleteFromFriendsns: _deleteFromFriendsns,
        addToFriends: _addToFriends,
        editProfile: _editProfile,
        postImage: _postImage,
        getGroupPost: _getGroupPost,
        getPost: _getPost,
        getFriends: _getFriends,
        post: _postingData,
        createPosterToUser: _createPosterToUser,
        createPosterToGroup: _createPosterToGroup,
        getMyProfile: _getMyProfile,
        getProfileById: _getProfileById,
        getAudioList: _getAudiolist,
        authorisation: _authorisation,
        registration: _registration,
        deletePost: _deletePost,
        searchTA: _searchTA
    }
}
