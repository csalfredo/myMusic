
/*jshint esversion: 6 */
import {songsList} from '../data/songs.js';
import PlayInfo from './play-info.js';
import TrackBar from './track-bar.js';

//Using an  IFFE
const Playlist=(()=>{

        //!DATA OR STATE
        //here it has all the existing songs
        let songs = songsList;
        //here keeping track of the current song
        let currentlyPlayingIndex = 0;
        let currentSong = new Audio(songs[currentlyPlayingIndex].url);
      
        //!CACHE THE DOM
        const  playlistEl = document.querySelector(".playlist");

        const init=()=>{
        render();
        listeners();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }

    const togglePlayPause= () =>{
        
        return currentSong.paused ? currentSong.play() : currentSong.pause();
    }

    const flip=()=>{
        togglePlayPause();
        render();
    }
    const changeAudioSrc = () =>{
        currentSong.src = songs[currentlyPlayingIndex].url;
    }

    const  mainPlay = clickedIndex =>{
        if (currentlyPlayingIndex === clickedIndex) {
            //toggle play or pause
            // console.log(clickedIndex);
            togglePlayPause();
        }
        else
        {
            currentlyPlayingIndex=clickedIndex;
            changeAudioSrc();
            togglePlayPause();
        }

        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
            
        })
    }

    const playNext=()=>{
         if (songs[currentlyPlayingIndex + 1]) {
                currentlyPlayingIndex++;
                currentSong.src = songs[currentlyPlayingIndex].url;
                togglePlayPause();
                render();
                }
    }

    const listeners=()=>{
            playlistEl.addEventListener("click",event=>{
                if (event.target && event.target.matches(".fa")) {
                    const listElem = event.target.parentNode.parentNode;
                    const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
                    mainPlay(listElemIndex);
                    render();
                }
            })

            currentSong.addEventListener("timeupdate", ()=>{
                TrackBar.setState(currentSong);
            })

            currentSong.addEventListener("ended", ()=>{
                playNext();
            })
    }

    const render=()=>{
        let markup = "";
 
    const toggleIcon = itemIndex =>{
        if (currentlyPlayingIndex === itemIndex) {
            return currentSong.paused ? 'fa-play' : 'fa-pause';
        }
        else{
            return 'fa-play';
        }
    }

        songs.forEach((songObj, index)=>{
            markup += `
            <li class = "playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active' : ""}" >
             <div class = "play-pause" >
                <i class = "fa ${toggleIcon(index)} pp-icon" > </i> 
               </div> 
                <div class = "playlist__song-details" >
                <span class = "playlist__song-name" >${songObj.title}</span> 
                <br >
                <span class = "playlist__song-artist" > ${songObj.artist}</span> 
                </div>
                 <div class = "playlist__song-duration" > ${songObj.time}</div> 
                </li> 
                                `;
        })

        playlistEl.innerHTML = markup;
    }
    return {
        init,
        flip
    }
})();

//!when it's only one component then you want to export default
export default Playlist;
