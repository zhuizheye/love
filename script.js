// 音乐控制
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

// 预加载音乐
bgMusic.load();

// 强制自动播放音乐的函数
async function forceAutoPlay() {
    try {
        // 设置音量为30%
        bgMusic.volume = 0.3;
        // 解除浏览器的自动播放限制
        bgMusic.muted = false;
        // 强制播放
        await bgMusic.play();
        isPlaying = true;
        musicBtn.classList.add('playing');
        console.log('Music auto-play successful');
    } catch (error) {
        console.error('Auto-play failed:', error);
        // 如果自动播放失败，每秒尝试重新播放
        setTimeout(forceAutoPlay, 1000);
    }
}

// 添加音乐加载错误处理
bgMusic.addEventListener('error', function(e) {
    console.error('Music loading error:', e);
    // 尝试重新加载音乐
    setTimeout(() => {
        bgMusic.src = 'assets/music/background.mp3';
        bgMusic.load();
        forceAutoPlay();
    }, 1000);
});

// 添加音乐加载成功处理
bgMusic.addEventListener('canplaythrough', function() {
    console.log('Music loaded successfully');
    forceAutoPlay();
});

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.classList.add('paused');
    } else {
        forceAutoPlay();
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
    
    // 尝试播放音乐
    if (!isPlaying) {
        forceAutoPlay();
    }
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
    
    // 尝试播放背景音乐
    if (!isPlaying) {
        forceAutoPlay();
    }
}

// 关闭表白消息
function closeModal() {
    const modal = document.getElementById('messageModal');
    modal.style.display = 'none';
}

// 页面加载完成后自动播放音乐
document.addEventListener('DOMContentLoaded', () => {
    forceAutoPlay();
});

// 用户交互时也尝试播放
document.addEventListener('click', () => {
    if (!isPlaying) {
        forceAutoPlay();
    }
}, { once: true });