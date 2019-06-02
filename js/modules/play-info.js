/*jshint esversion: 6 */
import Playlist from './playlist.js';

//!using IFFE
const PlayInfo =(()=>{

    //creating an object
    const state={
        songsLength: 0,
        isPlaying: false
    }

    //cache the DOM
    const playerCountEl = document.querySelector(".player__count");
    const playerTriggerEl = document.querySelector(".player__trigger");

    const init=()=>{
        render();
        listeners();
    }

    const listeners=()=>{
        playerTriggerEl.addEventListener("click",_=>{
            //1. Change our own (Playinfo's) state
            //2. render it
            //3. toggle the playpause song functionality
                state.isPlaying = state.isPlaying ? false  : true;
                render();
                Playlist.flip();
                
        })
    }
    const setState= obj=>{
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    }
    const render=()=>{
        playerCountEl.innerHTML = state.songsLength;
        console.log(`state.isPlaying is ${state.isPlaying}`);
        playerTriggerEl.innerHTML = state.isPlaying ? 'Pause' : 'Play';

    }
    return{
        init,
        setState
    }
})();

export default PlayInfo;