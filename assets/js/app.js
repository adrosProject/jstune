
const wraper = document.querySelector('#wraper');
    song_banner = wraper.querySelector('.song-banner');
    
    singer_image = wraper.querySelector('.song-image');
    singer_imgae_fade = wraper.querySelector('.singer_image_fade');

    music_name = wraper.querySelector('.song-name');
    music_singer_name = wraper.querySelector('.singer-name');
    main_audio = wraper.querySelector('#main_audio');

    // control the music palyer
    playPauseBtn = wraper.querySelector('#playPause');
    playPauseIcon = wraper.querySelector('#playPauseIcon')

    nextMusicBtn = wraper.querySelector('#nextbtn');
    prevMusicBtn = wraper.querySelector('#prevmusic');

    // show muisic's basic information
    progressArea = wraper.querySelector('.progressbar-wraper');
    progressBar = wraper.querySelector('.progress-bar');

let musicIndex = 1;

// Load music function 
window.addEventListener('load', ()=>{
    loadMusic(musicIndex);
});


function loadMusic(musicIndex){
    music_name.innerText = allmusic[musicIndex - 1].name;
    music_singer_name.innerText = allmusic[musicIndex - 1].artist;
    setTimeout(() => {
        singer_image.src = 'file/images/'+allmusic[musicIndex - 1].img+'.jpg';
    }, 100);
    song_banner.src = 'file/images/'+allmusic[musicIndex - 1].img+'.jpg';
    main_audio.src = 'file/musics/'+allmusic[musicIndex - 1].src+'.mp3';
    console.log(musicIndex);

}
// PLAY MUSIC FUNCTION
function playMusic(){
    main_audio.play();
    wraper.classList.add('paused');
    playPauseIcon.classList.remove('bi-play');
    playPauseIcon.classList.add('bi-pause');
}

// PAUSED MUSIC FUNCTION
function pauseMusic(){
    main_audio.pause();
    wraper.classList.remove('paused');
    playPauseIcon.classList.add('bi-play')
    playPauseIcon.classList.remove('bi-pause');
}
// PLAY NEXT MUSIC
function nextMusic(){
    musicIndex++;
    if(musicIndex > allmusic.length){
        musicIndex = 1;
        musicIndex = musicIndex;
    }
    loadMusic(musicIndex);
    playMusic();
}
// PLAY PREV MUSIC
function prevMusic(){
    musicIndex--;
    loadMusic(musicIndex);
    playMusic();
}
function animatedTranform(){
    singer_image.style.opacity = '0';
    singer_image.style.transform = 'translateY(84px)';
    music_name.style.opacity = '0';
    music_singer_name.style.opacity = '0';
    setTimeout(()=> {
        singer_image.style.opacity = '10'
        singer_image.style.transform = 'translateY(0px)';
        music_name.style.opacity = '1';
        music_singer_name.style.opacity = '1';
    }, 100);
}

playPauseBtn.addEventListener("click", () =>{
    const isMusicPause = wraper.classList.contains('paused');
    isMusicPause ? pauseMusic() : playMusic();
});

nextMusicBtn.addEventListener('click', () =>{
    nextMusic();
    animatedTranform()
});

prevMusicBtn.addEventListener('click', ()=>{
    prevMusic();
    animatedTranform()
});

main_audio.addEventListener('timeupdate', (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = progressWidth+'%';
    
    // updateing playing song current time
    let current_Time = wraper.querySelector('.current');
    musicDuration = wraper.querySelector('.duration');

    main_audio.addEventListener('loadeddata', ()=> {
        //update music durations
        let audioDuration = main_audio.duration;
        let total_min = Math.floor(audioDuration / 60);
        let total_sec = Math.floor(audioDuration % 60);
        musicDuration.innerText = total_min+':'+total_sec;
    });
        //update music durrent_time
        let currnet_min = Math.floor(currentTime / 60);
        let currnet_sec = Math.floor(currentTime % 60);
        current_Time.innerText = currnet_min+':'+currnet_sec;
});

// 
progressArea.addEventListener('click', (e)=> {
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = main_audio.duration;

    main_audio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
});
