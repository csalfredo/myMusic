/*jshint esversion: 6 */
//!using IFFE
const TrackBar=(()=>{
    const state = {
        currentTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }

    //cache DOM
    const trackBarFillEl = document.querySelector(".track-bar__fill");
    const init=()=>{
        render();
    }

    const render=()=>{
        trackBarFillEl.style.width = `${state.fillWidth}%`;
    }

    const getPercent = (current,full)=>{
        return (current/full)*100;
    }
    const setState = obj=>{
        state.currentTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = getPercent(state.currentTime, state.fullTrackTime);
        render();

    }
    return{
        init,
        setState
    }
})();

export default TrackBar;