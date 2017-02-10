(function() {
     function AlbumCtrl() {
         this.albumData = [];
         this.albumdata.push(angular.copy(albumPicasso))
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();

