(function() {
    function SongPlayer() {
         
        /**
         * @desc songPlayer service??
         * @type {Object}
         */
         var SongPlayer = {};
         
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
        
        //public methods with SongPlayer.method        
        SongPlayer.play = function(song) {// blue
                        console.log("this is:" + song)

            song = song || SongPlayer.currentSong;
                        console.log("song has been set to:" + song)

            
//            console.log(SongPlayer.currentSong)
            
            if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);
//             currentSong = null;
            } else {
                // you need something here, so you don't have to start the song from the beginning
                playSong(song)
            }       
         }

        SongPlayer.pause = function(song) {
            console.log("this is:" + song)
         song = song || SongPlayer.currentSong; // null -- you clicker the actual song || you click player bard
         
            console.log("song has been set to:" + song)
            currentBuzzObject.pause();
         song.playing = false;
        };
        
        return SongPlayer;
    }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();