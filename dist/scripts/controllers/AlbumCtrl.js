(function() {
     function AlbumCtrl(Fixtures) {
//         Inject the custom service into the AlbumCtrl
         this.albumData = Fixtures.getAlbum();
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
 })();