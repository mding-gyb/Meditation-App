const app = () =>{
    // elements
    const song = document.querySelector('.song');
    const play  = document.querySelector('.play');
    const outline = document.querySelector('.moving_outline circle')
    const video = document.querySelector('.vid_container video')

    //sounds
    const sounds = document.querySelectorAll('.sound_picker button');

    //time display
    const time_display = document.querySelector('.time_display');
    const time_select = document.querySelectorAll('.time_select button');
    const outline_length = outline.getTotalLength();
    console.log(outline_length);

    //Durations
    let fakeDuration = 300;

    function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    outline.style.strokeDasharray = outline_length;
    outline.style.strokeDashoffset = outline_length;

    // pick sound
    sounds.forEach(sound=>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            check_playing(song);
        });
    });

    // play sound
    play.addEventListener('click', () => {
        check_playing(song);
    });

    //select duration
    time_select.forEach(option =>{
        option.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time");
            time_display.textContent = `${Math.floor(fakeDuration/60)}:${pad(Math.floor(fakeDuration%60), 2)}`
            song.currentTime = 0;
        });
    });

    //stop and play
    const check_playing = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };
    
    //circle animation
    song.ontimeupdate = () =>{
        let current_time = song.currentTime;
        let elapsed = fakeDuration - current_time;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        console.log(current_time); // debug circle
        let progress = outline_length - (current_time / fakeDuration) * outline_length;
        outline.style.strokeDashoffset = progress;

        time_display.textContent = `${minutes}:${pad(seconds,2)}`;
        if(current_time >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    }
};

app();
