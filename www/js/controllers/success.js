myApp.controller('SuccessController', function($scope, $firebaseArray, $cordovaCamera) {

  $scope.images = [];

  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReferences = fb.child("users/" + fbAuth.uid);
    var syncArray = $firebaseArray(userReferences.child("images"));
    $scope.images = syncArray;
  } else {
    $state.go("firebase");
  }
  
  $scope.upload = function() {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourcetype: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: Camera.popoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      syncArray.$add({image: imageData}).then(function() {
        alert("The Image Was Saved")
      });
    }, function(error) {
      console.error("ERROR:" + error);
    });
    }
  });