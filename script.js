// 音乐控制
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

// 预加载音乐
bgMusic.load();

// 添加音乐加载错误处理
bgMusic.addEventListener('error', function(e) {
    console.error('Music loading error:', e);
    // 尝试重新加载音乐
    setTimeout(() => {
        bgMusic.src = 'assets/music/background.mp3';
        bgMusic.load();
    }, 1000);
});

// 添加音乐加载成功处理
bgMusic.addEventListener('canplaythrough', function() {
    console.log('Music loaded successfully');
});

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.classList.add('paused');
    } else {
        // 使用 Promise 确保音乐开始播放
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                musicBtn.classList.add('playing');
                musicBtn.classList.remove('paused');
            })
            .catch(error => {
                console.error('Playback failed:', error);
                // 用户交互后重试播放
                musicBtn.addEventListener('click', function retryPlay() {
                    bgMusic.play().then(() => {
                        musicBtn.removeEventListener('click', retryPlay);
                    });
                });
            });
        }
    }
    isPlaying = !isPlaying;
});

// 点击爱心效果
const heartContainer = document.getElementById('heartContainer');
heartContainer.addEventListener('click', () => {
    heartContainer.style.transform = 'scale(1.2)';
    setTimeout(() => {
        heartContainer.style.transform = 'scale(1)';
    }, 200);
});

// 显示表白消息
function showLove() {
    const modal = document.getElementById('messageModal');
    modal.style.display = 'flex';
    
    // 播放音效
    const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABQAFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
    audio.volume = 0.3;
    audio.play();
    
    // 震动效果
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// 关闭表白消息
function closeModal() {
    const modal = document.getElementById('messageModal');
    modal.style.display = 'none';
}

// 页面加载完成后自动播放音乐
document.addEventListener('DOMContentLoaded', () => {
    // 尝试自动播放
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            isPlaying = true;
            musicBtn.classList.add('playing');
        })
        .catch(error => {
            console.log('Auto-play was prevented');
            // 自动播放被阻止是正常的，用户需要手动点击播放
        });
    }
});