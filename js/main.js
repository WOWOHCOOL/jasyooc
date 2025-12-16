// 情绪转盘
function spinWheel() {
    const wheel = document.getElementById('wheel');
    const result = document.getElementById('moodResult');
    wheel.style.transform = 'rotate(1080deg)';
    const moods = ['怀旧', '江湖豪情', '低落疗愈', '无聊解闷', '需要一首老歌'];
    setTimeout(() => {
        const choice = moods[Math.floor(Math.random() * moods.length)];
        result.textContent = `今日心情：${choice}，为你推荐相关内容～`;
        wheel.style.transform = 'rotate(0deg)';
    }, 3000);
}

// 今日一签
function drawSign() {
    const signs = [
        '上签：长风破浪会有时，直挂云帆济沧海。——坚持到底，必有收获。',
        '中签：人生如梦，一尊还酹江月。——多一点洒脱，少一点执着。',
        '上签：海到无边天作岸，山登绝顶我为峰。——自信前行，你就是顶峰。',
        '中签：举杯邀明月，对影成三人。——孤独时，也要好好爱自己。',
        '上签：天生我材必有用，千金散尽还复来。——相信自己，未来可期。'
    ];
    const result = document.getElementById('signResult');
    result.textContent = signs[Math.floor(Math.random() * signs.length)];
}
function startSpin() {
    if (spinning) return;
    spinning = true;
    document.querySelectorAll('button').forEach(b => b.disabled = true);

    const winningIndex = Math.floor(Math.random() * options.length);
    const segmentAngle = 360 / options.length;
    const randomOffset = (Math.random() - 0.5) * segmentAngle * 0.8; // ±40% 偏移
    const targetAngle = winningIndex * segmentAngle + randomOffset;
    const extraSpins = 5 + Math.random() * 1; // 5~6圈
    const finalAngle = targetAngle + extraSpins * 360;

    canvas.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    canvas.style.transform = `rotate(${finalAngle}deg)`;

    setTimeout(() => {
        document.getElementById('final-choice').textContent = options[winningIndex];
        document.getElementById('inspiration').textContent = inspirations[Math.floor(Math.random() * inspirations.length)];
        document.getElementById('result-card').style.display = 'block';
        spinning = false;
        document.querySelectorAll('button').forEach(b => b.disabled = false);
    }, 5200);
}