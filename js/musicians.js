// 江湖禪心 - musicians.js 音樂人專頁互動功能

// 音樂人數據
const musiciansData = {
    wubai: {
        name: '伍佰',
        songs: {
            norway: { title: '挪威的森林', year: '1996', searchQuery: '伍佰+挪威的森林+官方MV' },
            tears: { title: '淚橋', year: '2003', searchQuery: '伍佰+淚橋+官方MV' },
            sudden: { title: '突然的自我', year: '2003', searchQuery: '伍佰+突然的自我+官方MV' },
            world: { title: '世界第一等', year: '1997', searchQuery: '伍佰+世界第一等+官方MV' },
            evening: { title: '晚風', year: '1998', searchQuery: '伍佰+晚風+官方MV' }
        }
    },
    roman: {
        name: '羅文',
        songs: {
            manjianghong: { title: '滿江紅', year: '1983', searchQuery: '羅文+滿江紅+官方MV' },
            tiexue: { title: '鐵血丹心', year: '1983', searchQuery: '羅文+鐵血丹心+官方MV' },
            shijian: { title: '世間始終你好', year: '1983', searchQuery: '羅文+世間始終你好+官方MV' },
            xiaoli: { title: '小李飛刀', year: '1978', searchQuery: '羅文+小李飛刀+官方MV' }
        }
    },
    lee: {
        name: '李宗盛',
        songs: {
            dream: { title: '夢醒時分', year: '1989', searchQuery: '李宗盛+夢醒時分+官方MV' },
            mortal: { title: '凡人歌', year: '1991', searchQuery: '李宗盛+凡人歌+官方MV' },
            hero: { title: '真心英雄', year: '1993', searchQuery: '李宗盛+真心英雄+官方MV' },
            love: { title: '愛的代價', year: '1992', searchQuery: '李宗盛+愛的代價+官方MV' }
        }
    },
    zhang: {
        name: '張雨生',
        songs: {
            sea: { title: '大海', year: '1992', searchQuery: '張雨生+大海+官方MV' },
            future: { title: '我的未來不是夢', year: '1988', searchQuery: '張雨生+我的未來不是夢+官方MV' },
            fish: { title: '一天到晚游泳的魚', year: '1993', searchQuery: '張雨生+一天到晚游泳的魚+官方MV' },
            heart: { title: '口是心非', year: '1995', searchQuery: '張雨生+口是心非+官方MV' }
        }
    }
};

// 投票數據
let voteData = {
    wubai: 0,
    roman: 0,
    lee: 0,
    zhang: 0
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadVoteData();
    initSmoothScroll();
    initLazyLoading();
});

// 播放歌曲功能
function playSong(musicianId, songId) {
    const musician = musiciansData[musicianId];
    const song = musician.songs[songId];
    
    if (song && song.searchQuery) {
        // 打開YouTube搜索頁面（合法方式）
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.searchQuery)}`;
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
        
        // 顯示播放提示
        showPlayNotification(musician.name, song.title);
    }
}

// 顯示播放提示
function showPlayNotification(musicianName, songTitle) {
    const notification = document.createElement('div');
    notification.className = 'play-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🎵</span>
            <span class="notification-text">正在播放：${musicianName} - ${songTitle}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 自動移除提示
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// 提交故事功能
function submitStory() {
    const storyTextarea = document.getElementById('user-story');
    const story = storyTextarea.value.trim();
    
    if (!story) {
        showMessage('請分享你的音樂故事', 'warning');
        return;
    }
    
    if (story.length < 20) {
        showMessage('故事內容太短，請分享更多細節', 'warning');
        return;
    }
    
    // 保存故事到本地存儲
    const stories = JSON.parse(localStorage.getItem('musicStories') || '[]');
    const newStory = {
        id: Date.now(),
        content: story,
        date: new Date().toLocaleDateString('zh-TW'),
        approved: false // 實際項目中需要審核
    };
    
    stories.push(newStory);
    localStorage.setItem('musicStories', JSON.stringify(stories));
    
    // 清空輸入框
    storyTextarea.value = '';
    
    // 顯示成功提示
    showMessage('感謝分享！你的故事已提交，我們會盡快審核', 'success');
    
    // 記錄分析事件
    if (typeof gtag !== 'undefined') {
        gtag('event', 'submit_story', {
            'event_category': 'engagement',
            'event_label': 'music_story'
        });
    }
}

// 投票功能
function voteMusician(musicianId) {
    // 檢查是否已投票
    const hasVoted = localStorage.getItem('hasVotedMusician');
    if (hasVoted) {
        showMessage('你已經投過票了，感謝參與！', 'info');
        return;
    }
    
    // 更新投票數
    voteData[musicianId]++;
    localStorage.setItem('musicianVotes', JSON.stringify(voteData));
    localStorage.setItem('hasVotedMusician', 'true');
    
    // 顯示投票結果
    updateVoteResults();
    
    // 顯示成功提示
    const musicianName = musiciansData[musicianId].name;
    showMessage(`成功投票給${musicianName}！`, 'success');
    
    // 記錄分析事件
    if (typeof gtag !== 'undefined') {
        gtag('event', 'vote_musician', {
            'event_category': 'engagement',
            'event_label': musicianId
        });
    }
}

// 加載投票數據
function loadVoteData() {
    const savedVotes = localStorage.getItem('musicianVotes');
    if (savedVotes) {
        voteData = JSON.parse(savedVotes);
    }
    updateVoteResults();
}

// 更新投票結果顯示
function updateVoteResults() {
    const resultsContainer = document.getElementById('vote-results');
    if (!resultsContainer) return;
    
    const totalVotes = Object.values(voteData).reduce((sum, count) => sum + count, 0);
    
    if (totalVotes === 0) {
        resultsContainer.innerHTML = '<p class="no-votes">暫無投票數據</p>';
        return;
    }
    
    let resultsHTML = '<div class="vote-chart"><h5>投票結果</h5>';
    
    for (const [musicianId, count] of Object.entries(voteData)) {
        const musicianName = musiciansData[musicianId].name;
        const percentage = totalVotes > 0 ? (count / totalVotes * 100).toFixed(1) : 0;
        
        resultsHTML += `
            <div class="vote-bar">
                <span class="vote-name">${musicianName}</span>
                <div class="vote-progress">
                    <div class="vote-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="vote-count">${count}票 (${percentage}%)</span>
            </div>
        `;
    }
    
    resultsHTML += `<p class="total-votes">總投票數：${totalVotes}</p></div>`;
    resultsContainer.innerHTML = resultsHTML;
}

// 顯示消息提示
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // 添加到頁面
    const container = document.querySelector('main') || document.body;
    container.appendChild(messageDiv);
    
    // 自動移除
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// 平滑滾動
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 懶加載圖片
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// 鍵盤導航支持
document.addEventListener('keydown', function(e) {
    // ESC鍵關閉通知
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.play-notification, .message');
        notifications.forEach(notification => notification.remove());
    }
    
    // 數字鍵快速導航到音樂人
    if (e.key >= '1' && e.key <= '4') {
        const musicianIds = ['wubai', 'roman', 'lee', 'zhang'];
        const targetId = musicianIds[parseInt(e.key) - 1];
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// 無障礙支持
function initAccessibility() {
    // 為所有互動元素添加鍵盤支持
    document.querySelectorAll('.play-btn, .vote-btn, .submit-btn').forEach(btn => {
        btn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // 添加ARIA標籤
    document.querySelectorAll('.musician-card').forEach(card => {
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', `音樂人介紹：${card.querySelector('h3').textContent}`);
    });
}

// 初始化無障礙功能
initAccessibility();

// 頁面性能監控
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`頁面加載時間：${loadTime}ms`);
        
        // 記錄性能數據
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'event_category': 'performance',
                'value': loadTime
            });
        }
    }
});

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('頁面錯誤：', e.error);
    
    // 記錄錯誤
    if (typeof gtag !== 'undefined') {
        gtag('event', 'javascript_error', {
            'event_category': 'error',
            'event_label': e.message
        });
    }
});

// 導出函數供HTML使用
window.playSong = playSong;
window.submitStory = submitStory;
window.voteMusician = voteMusician;