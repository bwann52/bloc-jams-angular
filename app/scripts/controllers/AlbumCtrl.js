(function() {
     function AlbumCtrl(Fixtures, SongPlayer) {
//         Inject the custom service into the AlbumCtrl
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
 })();