'use strict';

angular.module('socialNetwork')
    .constant('Constant', {
        MyId: '',
        SearchReqText: '',
        ToastMsg: '',
        UploadedImgID: null,
        APIBaseUrl: 'http://192.168.7.121:8080',//'https://sjc2016vs7.fwd.wf',//'https://scntw.herokuapp.com',//'https://scntw.herokuapp.com',//'https://mighty-inlet-90070.herokuapp.com',//'https://damp-meadow-52783.herokuapp.com',////'https://sjc2016vs6.fwd.wf',////////// //http://localhost:8080/SocialNetwork',// // 'https://kkq-social.fwd.wf',//'https://social.fwd.wf', //http://www.mocky.io/v2/578e18f50f00006f19aebc38',// 'https://sjc2016vs3.fwd.wf/',
        Auth: {
            clientHash: "cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg=="
        },
        AuthType: {
            AUTH: 'Auth',
            REG: 'Reg',
            NONE: 'None',
            BASIC: 'Basic',
            OAUTH: 'Oauth'
        },
        Events: {
            REFRESHBLIST: 'RefreshBList',
            REFRESHPOSTS: 'RefreshPosts',
            REFRESHIDPOSTS: 'RefresiIdPosts',
            REFRESHGPOSTS: 'RefreshGPosts',
            UPDATEFRIEND: 'UpdateFriend',
            UPDATEPSEARCH: 'UpdatePSearch',
            UPDATEFRIENDS: 'UpdateFriends',
            UPDATEGROUP: 'UpdateGroup',
            UPDATEGSEARCH: 'UpdateGSearch'
        }
    });
