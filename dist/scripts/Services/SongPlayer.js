(function() {
    function SongPlayer(Fixtures) {
         
        /**
         * @desc songPlayer service??
         * @type {Object}
         */
         var SongPlayer = {};
        
        
        //when calling another function from service, do not use ()?
         var currentAlbum = Fixtures.getAlbum;
        
        
        var getSongIndex = function(song) {
            console.log(currentAlbum);
//             return currentAlbum.songs.indexOf(song);
         };
         
        
        SongPlayer.currentSong = null;
        
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
        
        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
        /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */       
        SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
            
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
            }
         };

         /**
         * @function pause
         * @desc Pause current song
         * @param {Object} song
         */
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
        };
        
        SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
            if (currentSongIndex < 0) {
             stopSong(song);
            }else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
            }
        };
        
        SongPlayer.next = function (){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
            
             if (currentSongIndex > currentAlbum.songs.length) {
             stopSong(song);
            }else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
            }
            
        }
        
        return SongPlayer;
    }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();