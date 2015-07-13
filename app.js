var data;
var artistId;
var baseUrl = 'https://api.spotify.com/v1/search?q=';
var endUrl = '&type=artist&limit=1';
var baseRelatedUrl = 'https://api.spotify.com/v1/artists/';
var endRelatedUrl = '/related-artists';
var baseSearchUrl = 'https://api.spotify.com/v1/search?type=track&query=';

var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {};
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track + endUrl).success(function(response){
      artistId = response.artists.items.id; //store the searched artistId#
        $http.get(baseRelatedUrl + artistId + endRelatedUrl).success(function(response2) {
          var related = response2.artists; //store related artists
          var randRelated = related[Math.floor(Math.random() * (related.length))]; // picks random related artist
          var randRelatedName = randRelated.name;
          $http.get(baseSearchUrl + randRelatedName).success(function(response3) {
            data = $scope.tracks = response3.tracks.items;
          });
        });
      });
    }
  });
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