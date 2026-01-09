/**
 * 完美的转盘实现
 */

class MoodWheel {
    constructor(containerId, options, onSpinEnd) {
        this.container = document.getElementById(containerId);
        this.options = options;
        this.onSpinEnd = onSpinEnd;
        this.canvas = null;
        this.ctx = null;
        this.isSpinning = false;
        this.currentRotation = 0;
        this.colors = [
            '#f5f0e8', '#ece6de', '#e3dcd4', '#dad3ca',
            '#d1cac0', '#c8c1b6', '#f0e9e2', '#e8dfda'
        ];

        this.init();
    }

    init() {
        // 清空容器
        this.container.innerHTML = '';

        // 创建canvas
        const wheelWrapper = document.createElement('div');
        wheelWrapper.className = 'perfect-wheel-wrapper';
        wheelWrapper.innerHTML = `
            <div class="wheel-indicator"></div>
            <canvas class="perfect-wheel-canvas"></canvas>
            <div class="wheel-center-btn">開始</div>
        `;

        this.container.appendChild(wheelWrapper);

        this.canvas = wheelWrapper.querySelector('.perfect-wheel-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.centerBtn = wheelWrapper.querySelector('.wheel-center-btn');

        // 初始化音效
        this.initSounds();

        // 设置canvas尺寸
        this.resizeCanvas();
        // 立即绘制转盘，预加载选项
        setTimeout(() => this.draw(), 50);
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.draw();
        });

        // 绑定点击事件
        this.centerBtn.addEventListener('click', () => this.spin());
    }

    resizeCanvas() {
        const size = 340;
        const dpr = window.devicePixelRatio || 1;

        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';
        this.canvas.style.margin = '0 auto';
        this.canvas.style.display = 'block';

        this.ctx.scale(dpr, dpr);
        this.radius = size / 2;
        this.centerX = this.radius;
        this.centerY = this.radius;
    }

    initSounds() {
        // 使用Web Audio API生成音效
        this.audioContext = null;

        // 创建音效生成器
        this.spinSound = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };

        this.stopSound = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            // 创建和弦音效
            const frequencies = [523.25, 659.25, 783.99]; // C大调和弦
            frequencies.forEach((freq, index) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);

                oscillator.frequency.value = freq;
                oscillator.type = 'sine';

                const startTime = this.audioContext.currentTime + index * 0.05;
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

                oscillator.start(startTime);
                oscillator.stop(startTime + 0.5);
            });
        };
    }

    playSpinSound() {
        try {
            this.spinSound();
        } catch (e) {
            console.log('音效播放失败:', e);
        }
    }

    playStopSound() {
        try {
            this.stopSound();
        } catch (e) {
            console.log('音效播放失败:', e);
        }
    }

    draw() {
        const ctx = this.ctx;
        const radius = this.radius;
        const centerX = this.centerX;
        const centerY = this.centerY;
        const segmentAngle = (2 * Math.PI) / this.options.length;

        ctx.clearRect(0, 0, radius * 2, radius * 2);

        // 绘制扇区
        this.options.forEach((option, index) => {
            const startAngle = index * segmentAngle - Math.PI / 2;
            const endAngle = startAngle + segmentAngle;

            // 绘制扇形
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius - 10, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = this.colors[index % this.colors.length];
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.stroke();

            // 绘制文字
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#333';
            ctx.font = 'bold 14px KaiTi, STKaiTi, serif';

            // 文字换行处理
            const textRadius = radius * 0.65;
            const maxWidth = 60;

            // 简单的换行逻辑
            const words = option.split('');
            let line = '';
            let lines = [];

            words.forEach(word => {
                const testLine = line + word;
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && line !== '') {
                    lines.push(line);
                    line = word;
                } else {
                    line = testLine;
                }
            });
            lines.push(line);

            // 绘制每一行文字
            lines.forEach((lineText, i) => {
                const yOffset = (i - lines.length / 2 + 0.5) * 16;
                ctx.fillText(lineText, textRadius, yOffset);
            });

            ctx.restore();
        });

        // 绘制中心圆
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        ctx.fillStyle = '#c9a66b';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // 绘制顶部箭头指示器
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.beginPath();
        ctx.moveTo(-15, -radius + 10);
        ctx.lineTo(0, -radius + 40);
        ctx.lineTo(15, -radius + 10);
        ctx.closePath();
        ctx.fillStyle = '#8ca89b';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    spin() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.centerBtn.textContent = '轉動中';
        this.centerBtn.style.background = '#ccc';
        this.centerBtn.style.cursor = 'not-allowed';

        // 随机选择结果
        const winningIndex = Math.floor(Math.random() * this.options.length);
        const segmentAngle = 360 / this.options.length;

        // 计算目标角度，让选中扇区停在顶部指示器处（270度）
        // 扇区i的中心角度：i * segmentAngle + segmentAngle/2 - 90
        // 要让这个角度转到270度，需要旋转：270 - (i * segmentAngle + segmentAngle/2 - 90) = 360 - i * segmentAngle - segmentAngle/2
        const targetAngle = 360 - (winningIndex * segmentAngle + segmentAngle / 2);
        const spins = 5 + Math.floor(Math.random() * 3);
        const finalRotation = targetAngle + spins * 360;

        // 动画旋转
        const startRotation = this.currentRotation;
        const duration = 4000;
        const startTime = Date.now();
        let lastSoundTime = 0;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用缓动函数
            const easeOut = 1 - Math.pow(1 - progress, 4);
            this.currentRotation = startRotation + (finalRotation - startRotation) * easeOut;

            // 播放转动音效（每经过一个扇区播放一次）
            const segmentCount = this.options.length;
            const currentSegment = Math.floor(this.currentRotation / (360 / segmentCount));
            if (currentSegment > lastSoundTime && progress < 0.9) {
                this.playSpinSound();
                lastSoundTime = currentSegment;
            }

            // 重新绘制
            this.ctx.save();
            this.ctx.translate(this.centerX, this.centerY);
            this.ctx.rotate((this.currentRotation * Math.PI) / 180);
            this.ctx.translate(-this.centerX, -this.centerY);
            this.draw();
            this.ctx.restore();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                this.centerBtn.textContent = '再轉';
                this.centerBtn.style.background = '#c9a66b';
                this.centerBtn.style.cursor = 'pointer';

                // 播放停止音效
                this.playStopSound();

                // 调用回调函数
                if (this.onSpinEnd) {
                    this.onSpinEnd(this.options[winningIndex]);
                }
            }
        };

        animate();
    }

    reset() {
        this.currentRotation = 0;
        this.draw();
        this.centerBtn.textContent = '開始';
    }
}
