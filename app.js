const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-container video');


    //音
    const sounds = document.querySelectorAll('.sound-picker button');
    //時間表示
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')
    //アウトラインの長さの取得
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    //間隔
    let fakeDuration = 5400;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //音楽の選択
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            sound.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);            
        });
    });
    //音楽の再生
    play.addEventListener('click', () => {
        checkPlaying(song);
    });
    //時間の選択
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            console.log(fakeDuration);
            if(fakeDuration <= 3600){
                timeDisplay.textContent = Math.floor(fakeDuration / 60) + ':' + Math.floor(fakeDuration % 60);
            }else{
                timeDisplay.textContent = Math.floor(fakeDuration / 3600) + ':' + Math.floor(fakeDuration / 60 - 60) + ':' + Math.floor(fakeDuration % 60);
            }
        },false);
    })


    //一時停止と再生の関数
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //円のアニメーション
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let hours = Math.floor(elapsed / 3600);

        //円の描画
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //時間の描画
        if(fakeDuration <= 3600){
            timeDisplay.textContent = minutes + ':' + seconds;
        }else{
            timeDisplay.textContent = hours + ':' + (minutes - 60) + ':' + seconds;
        }
        
        //終了時の処理
        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }

    };
};



window.addEventListener('DOMContentLoaded', function(){
    app();
})