// 江湖禅心 - 转盘组件
class WheelOfFortune {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.options = options;
        this.segments = [];
        this.currentRotation = 0;
        this.isSpinning = false;
        this.selectedSegment = null;
        this.soundEnabled = options.soundEnabled !== false; // 默认开启音效
        
        // 转盘配置
        this.config = {
            radius: options.radius || 150,
            centerX: options.centerX || 150,
            centerY: options.centerY || 150,
            borderWidth: options.borderWidth || 4,
            borderColor: options.borderColor || '#8b4513',
            textColor: options.textColor || '#ffffff', // 使用白色文字，在彩色背景上更清晰
            textSize: options.textSize || 14, // 适当字体大小，确保不超出圆圈
            spinDuration: options.spinDuration || 4000,
            spinRotations: options.spinRotations || 8,
            pointerSize: options.pointerSize || 20,
            pointerColor: options.pointerColor || '#8b4513'
        };
        
        // 设置画布大小，确保是正方形
        const size = this.config.radius * 2;
        this.canvas.width = size;
        this.canvas.height = size;
        
        // 设置CSS尺寸，确保显示为正方形
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';
        
        this.init();
        this.initSounds();
    }
    
    init() {
        this.bindEvents();
        this.draw();
    }
    
    // 初始化音效
    initSounds() {
        if (!this.soundEnabled) return;
        
        try {
            this.spinSound = new Audio('sounds/spin.mp3');
            this.successSound = new Audio('sounds/success.mp3');
            
            // 设置音效属性
            this.spinSound.volume = 0.3;
            this.successSound.volume = 0.5;
            
            // 设置spin音效循环播放
            this.spinSound.loop = true;
            
            // 预加载音效
            this.spinSound.load();
            this.successSound.load();
        } catch (error) {
            console.log('音效加载失败:', error);
            this.soundEnabled = false;
        }
    }
    
    // 播放转盘音效
    playSpinSound() {
        if (!this.soundEnabled || !this.spinSound) return;
        
        try {
            this.spinSound.currentTime = 0;
            this.spinSound.play().catch(error => {
                console.log('转盘音效播放失败:', error);
            });
        } catch (error) {
            console.log('转盘音效播放异常:', error);
        }
    }
    
    // 停止转盘音效
    stopSpinSound() {
        if (!this.soundEnabled || !this.spinSound) return;
        
        try {
            this.spinSound.pause();
            this.spinSound.currentTime = 0;
        } catch (error) {
            console.log('停止转盘音效失败:', error);
        }
    }
    
    // 播放成功音效
    playSuccessSound() {
        if (!this.soundEnabled || !this.successSound) return;
        
        try {
            this.successSound.currentTime = 0;
            this.successSound.play().catch(error => {
                console.log('成功音效播放失败:', error);
            });
        } catch (error) {
            console.log('成功音效播放异常:', error);
        }
    }
    
    // 设置音效开关
    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
        if (!enabled) {
            this.stopSpinSound();
        }
    }
    
    bindEvents() {
        // 转盘点击事件
        this.canvas.addEventListener('click', (e) => {
            console.log('Canvas被点击，转盘状态:', {
                isSpinning: this.isSpinning,
                segmentsLength: this.segments.length
            });
            
            if (!this.isSpinning && this.segments.length > 0) {
                console.log('触发转盘转动');
                this.spin();
            } else {
                console.log('转盘无法转动:', this.isSpinning ? '正在转动' : '没有选项');
            }
        });
        
        // 转盘鼠标悬停效果
        this.canvas.addEventListener('mouseenter', () => {
            if (!this.isSpinning && this.segments.length > 0) {
                this.canvas.style.cursor = 'pointer';
                console.log('鼠标悬停在转盘上');
            }
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.canvas.style.cursor = 'default';
        });
        
        // 添加触摸支持（移动设备）
        this.canvas.addEventListener('touchstart', (e) => {
            console.log('Canvas被触摸');
            if (!this.isSpinning && this.segments.length > 0) {
                e.preventDefault();
                this.spin();
            }
        });
    }
    
    // 设置转盘选项
    setSegments(segments) {
        console.log('设置转盘段数:', segments.length);
        this.segments = segments;
        this.currentRotation = 0;
        this.draw();
    }
    
    // 绘制转盘
    draw() {
        const ctx = this.ctx;
        const centerX = this.config.centerX;
        const centerY = this.config.centerY;
        const radius = this.config.radius;
        
        console.log('绘制转盘，段数:', this.segments.length, '半径:', radius, '中心:', centerX, centerY);
        
        // 清空画布
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.segments.length === 0) {
            console.log('转盘为空，绘制空转盘');
            // 绘制空转盘
            this.drawEmptyWheel();
            return;
        }
        
        // 计算每个扇形的角度
        const anglePerSegment = (Math.PI * 2) / this.segments.length;
        
        // 保存当前状态
        ctx.save();
        
        // 应用旋转 - 修正：使用正值表示顺时针旋转
        ctx.translate(centerX, centerY);
        ctx.rotate(-this.currentRotation); // 使用负值，让转盘看起来顺时针旋转
        ctx.translate(-centerX, -centerY);
        
        // 绘制扇形
        this.segments.forEach((segment, index) => {
            // 第一个扇形从12点钟位置开始（-π/2）
            const startAngle = index * anglePerSegment - Math.PI / 2;
            const endAngle = startAngle + anglePerSegment;
            
            // 绘制扇形背景
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = segment.color;
            ctx.fill();
            
            // 绘制扇形边框
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // 绘制文字
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + anglePerSegment / 2);
            
            // 处理长文字，自动换行
            const maxWidth = radius * 0.6; // 控制文字显示区域，确保不超出圆圈
            const text = segment.text;
            const words = text.split('');
            let lines = [];
            let currentLine = '';
            
            ctx.font = `bold ${this.config.textSize}px 'Arial', sans-serif`;
            ctx.textAlign = 'center';
            
            // 自动换行处理
            for (let char of words) {
                const testLine = currentLine + char;
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && currentLine !== '') {
                    lines.push(currentLine);
                    currentLine = char;
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine);
            
            // 绘制多行文字
            const lineHeight = this.config.textSize * 1.1; // 行间距
            const textRadius = radius * 0.65; // 文字位置，确保不超出圆圈
            const startY = -((lines.length - 1) * lineHeight) / 2; // 定义startY变量
            
            // 使用白色文字，添加黑色阴影确保可读性
            ctx.fillStyle = this.config.textColor;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'; // 增强阴影效果
            ctx.lineWidth = 3;
            
            lines.forEach((line, index) => {
                const y = startY + index * lineHeight;
                // 先绘制阴影
                ctx.strokeText(line, textRadius, y);
                // 再绘制文字
                ctx.fillText(line, textRadius, y);
            });
            
            ctx.restore();
        });
        
        // 恢复状态
        ctx.restore();
        
        // 不绘制canvas内的中心圆，使用CSS的wheel-center-hint元素
    }
    
    // 绘制空转盘
    drawEmptyWheel() {
        const ctx = this.ctx;
        const centerX = this.config.centerX;
        const centerY = this.config.centerY;
        const radius = this.config.radius;
        
        // 绘制外圆
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#f8f5f0';
        ctx.fill();
        ctx.strokeStyle = '#8b4513';
        ctx.lineWidth = this.config.borderWidth;
        ctx.stroke();
        
        // 绘制文字
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#666';
        ctx.font = '16px "KaiTi", "STKaiTi", serif';
        ctx.fillText('请选择决策类别', centerX, centerY - 10);
        ctx.fillText('点击下方选项', centerX, centerY + 15);
        
        // 绘制指针
        this.drawPointer();
    }
    
    // 绘制中心圆
    drawCenterCircle() {
        const ctx = this.ctx;
        const centerX = this.config.centerX;
        const centerY = this.config.centerY;
        const centerRadius = 15;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#8b4513';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // 指针现在通过CSS绘制，这个方法不再需要
    drawPointer() {
        // 空方法，指针通过CSS的.wheel-pointer类绘制
    }
    
    // 转动转盘
    spin() {
        if (this.isSpinning || this.segments.length === 0) {
            console.log('转盘无法转动:', {
                isSpinning: this.isSpinning,
                segmentsLength: this.segments.length
            });
            return;
        }
        
        console.log('开始转动转盘...');
        this.isSpinning = true;
        
        // 更新中心提示UI
        const centerHint = document.getElementById('wheelCenterHint');
        if (centerHint) {
            centerHint.classList.add('spinning');
            centerHint.textContent = '⏳';
        }
        
        // 更新按钮UI
        const spinButton = document.getElementById('spinButton');
        if (spinButton) {
            spinButton.textContent = '🌪️ 转动中...';
            spinButton.disabled = true;
        }
        
        // 播放转盘音效
        this.playSpinSound();
        
        // 计算最终旋转角度
        const totalRotation = this.config.spinRotations * Math.PI * 2;
        const randomAngle = Math.random() * Math.PI * 2;
        const finalRotation = totalRotation + randomAngle;
        
        // 动画参数
        const startTime = Date.now();
        const duration = this.config.spinDuration;
        const startRotation = this.currentRotation;
        
        // 缓动函数
        const easeOut = (t) => {
            return 1 - Math.pow(1 - t, 3);
        };
        
        // 动画函数
        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOut(progress);
            
            this.currentRotation = startRotation + finalRotation * easedProgress;
            this.draw();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // 动画结束
                console.log('转盘动画结束');
                this.stopSpinSound();
                this.isSpinning = false;
                
                // 恢复UI
                if (centerHint) {
                    centerHint.classList.remove('spinning');
                    centerHint.textContent = '🎯';
                }
                
                if (spinButton) {
                    spinButton.textContent = '🎯 再转一次';
                    spinButton.disabled = false;
                }
                
                this.onSpinComplete();
            }
        };
        
        animate();
    }
    
    // 转动完成回调 - 简化算法（无指针版本）
    onSpinComplete() {
        // 简化算法：12点钟位置（顶部）的扇形就是结果
        
        // 1. 计算每个扇形的角度
        const anglePerSegment = (Math.PI * 2) / this.segments.length;
        
        // 2. 计算当前旋转角度
        let normalizedRotation = this.currentRotation % (Math.PI * 2);
        if (normalizedRotation < 0) {
            normalizedRotation += Math.PI * 2;
        }
        
        // 3. 计算哪个扇形在12点钟位置
        // 由于我们在draw中使用了负号，所以这里需要相应的调整
        const twelveOClockPosition = normalizedRotation;
        
        // 4. 计算选中的索引
        let selectedIndex = Math.floor(twelveOClockPosition / anglePerSegment);
        
        // 5. 确保索引在有效范围内
        if (selectedIndex < 0 || selectedIndex >= this.segments.length) {
            selectedIndex = 0;
        }
        
        // 6. 调试信息
        console.log('转盘调试信息:', {
            segments: this.segments.length,
            currentRotation: this.currentRotation,
            normalizedRotation: normalizedRotation,
            anglePerSegment: anglePerSegment,
            twelveOClockPosition: twelveOClockPosition,
            selectedIndex: selectedIndex,
            selectedSegment: this.segments[selectedIndex]?.text
        });
        
        this.selectedSegment = this.segments[selectedIndex];
        
        // 播放成功音效
        this.playSuccessSound();
        
        // 触发结果回调
        console.log('准备触发结果回调，选中的段落:', this.selectedSegment);
        console.log('回调函数存在:', !!this.options.onSpinComplete);
        console.log('回调函数类型:', typeof this.options.onSpinComplete);
        
        if (this.options.onSpinComplete && this.selectedSegment) {
            console.log('触发onSpinComplete回调');
            try {
                this.options.onSpinComplete(this.selectedSegment);
                console.log('回调执行完成');
            } catch (error) {
                console.error('回调执行出错:', error);
            }
        } else {
            console.error('无法触发回调:', {
                hasCallback: !!this.options.onSpinComplete,
                hasSegment: !!this.selectedSegment,
                callbackType: typeof this.options.onSpinComplete
            });
        }
    }
    
    // 重置转盘
    reset() {
        this.currentRotation = 0;
        this.selectedSegment = null;
        this.isSpinning = false;
        this.draw();
    }
    
    // 获取选中的扇形
    getSelectedSegment() {
        return this.selectedSegment;
    }
    
    // 检查是否正在转动
    getIsSpinning() {
        return this.isSpinning;
    }
}

// 工具函数：生成随机颜色
function generateRandomColor() {
    const colors = [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
        '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#c0392b',
        '#f1c40f', '#e67e22', '#95a5a6', '#34495e', '#d35400'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 响应式调整
function makeWheelResponsive(wheel) {
    function adjustWheelSize() {
        const container = wheel.canvas.parentElement;
        const containerWidth = container.offsetWidth;
        
        let newSize;
        if (containerWidth <= 480) {
            newSize = 240; // 手机端
        } else if (containerWidth <= 768) {
            newSize = 280; // 平板
        } else {
            newSize = 300; // 桌面
        }
        
        wheel.config.radius = newSize / 2;
        wheel.config.centerX = newSize / 2;
        wheel.config.centerY = newSize / 2;
        wheel.canvas.width = newSize;
        wheel.canvas.height = newSize;
        wheel.canvas.style.width = newSize + 'px';
        wheel.canvas.style.height = newSize + 'px';
        
        wheel.draw();
    }
    
    // 初始调整
    adjustWheelSize();
    
    // 窗口大小改变时重新调整
    window.addEventListener('resize', () => {
        adjustWheelSize();
    });
    
    return wheel;
}

// 导出类供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WheelOfFortune, generateRandomColor, makeWheelResponsive };
}