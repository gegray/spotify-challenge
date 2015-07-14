var data;
var baseUrl = 'https://api.spotify.com/v1/search?q=';
var endUrl = '&type=artist&limit=1';
var baseRelatedUrl = 'https://api.spotify.com/v1/artists/';
var endRelatedUrl = '/related-artists';
var baseSearchUrl = 'https://api.spotify.com/v1/search?type=track&query=';

var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {};
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track + endUrl).success(function(response) {
      var artistId = response.artists.items[0].id;
      console.log("artistId: " + artistId);
      $http.get(baseRelatedUrl + artistId + endRelatedUrl).success(function(response2) {
        var related = response2.artists;
        console.log("related: " + related);
        var randRelated = related[Math.floor(Math.random() * (related.length))];
        console.log("randRelated: " + randRelated);
        var randRelatedName = randRelated.name;
        console.log("randRelatedName: " + randRelatedName);
        var randRelatedId = randRelated.id;
        console.log("randRelatedId: " + randRelatedId);
        $http.get(baseRelatedUrl + randRelatedId + endRelatedUrl).success(function(response3) {
          var reRelated = response3.artists;
          console.log("reRelated: " + reRelated);
          var randReRelated = reRelated[Math.floor(Math.random() * (reRelated.length))];
          console.log("randReRelated: " + randReRelated);
          var randReRelatedName = $scope.reName = randReRelated.name;
          console.log("randReRelatedName: " + randReRelatedName);
          $http.get(baseSearchUrl + randReRelatedName).success(function(response4) {
            console.log("response4: " + response4);
            data = $scope.tracks = response4.tracks.items;
          })
        })
      })
    })
  }

  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
        $scope.audioObject = new Audio(song);
        $scope.audioObject.play() 
        $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});