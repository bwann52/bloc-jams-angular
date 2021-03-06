(function() {
    function SongPlayer($rootScope, Fixtures) {
         
        /**
         * @desc songPlayer service??
         * @type {Object}
         */
         var SongPlayer = {};
        
        
         var currentAlbum = Fixtures.getAlbum();
        
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };
         
//        SongPlayer.currentAlbum = currentAlbum;    
        SongPlayer.currentSong = null;
        
        /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
        
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
            
            currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
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
        
         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         }
        
        
        return SongPlayer;
    }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();