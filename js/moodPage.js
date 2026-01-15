// 江湖禅心 - Mood页面主逻辑
class MoodPage {
    constructor() {
        this.currentCategory = null;
        this.wheel = null;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupPage();
            });
        } else {
            this.setupPage();
        }
    }
    
    setupPage() {
        console.log('页面设置开始');
        
        // 等待数据加载完成
        this.waitForDataAndInit();
    }
    
    waitForDataAndInit() {
        console.log('等待数据初始化...');
        let attempts = 0;
        const maxAttempts = 100; // 最多等待10秒
        
        const checkData = () => {
            attempts++;
            console.log(`检查数据，第${attempts}次尝试`);
            
            if (typeof decisionData !== 'undefined' && decisionData.categories && decisionData.categories.length > 0) {
                console.log('决策数据已加载，开始初始化，类别数量:', decisionData.categories.length);
                
                // 确保DOM元素存在
                const container = document.getElementById('categoriesContainer');
                if (!container) {
                    console.error('categoriesContainer元素不存在，等待DOM...');
                    setTimeout(checkData, 100);
                    return;
                }
                
                // 渲染类别
                try {
                    this.renderCategories();
                    this.bindEvents();
                    this.initWheel();
                    this.isInitialized = true;
                    console.log('页面初始化完成');
                } catch (error) {
                    console.error('初始化过程中出错:', error);
                    setTimeout(checkData, 200);
                }
            } else if (attempts < maxAttempts) {
                console.log('等待决策数据加载...');
                setTimeout(checkData, 100);
            } else {
                console.error('数据加载超时，尝试使用备用数据');
                // 尝试手动创建测试数据
                this.createFallbackData();
            }
        };
        checkData();
    }
    
    // 创建备用测试数据
    createFallbackData() {
        console.log('创建备用数据');
        window.decisionData = {
            categories: [
                {
                    id: "test1",
                    title: "🎵 今夜听哪首歌",
                    description: "深夜emo时，让古人帮你选歌",
                    options: []
                },
                {
                    id: "test2", 
                    title: "🍃 周末做什么",
                    description: "选择最适合的周末活动",
                    options: []
                }
            ]
        };
        
        this.renderCategories();
        this.bindEvents();
        this.initWheel();
        this.isInitialized = true;
    }
    
    // 渲染决策类别
    renderCategories() {
        console.log('开始渲染决策类别');
        const container = document.getElementById('categoriesContainer');
        if (!container) {
            console.error('categoriesContainer元素未找到');
            return;
        }
        
        console.log('decisionData:', decisionData);
        console.log('categories数量:', decisionData?.categories?.length);
        
        // 清空容器
        container.innerHTML = '';
        
        if (!decisionData || !decisionData.categories || decisionData.categories.length === 0) {
            console.error('决策数据未加载或为空');
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">决策类别加载中...</p>';
            return;
        }
        
        try {
            decisionData.categories.forEach((category, index) => {
                console.log(`生成类别卡片 ${index + 1}:`, category.title);
                
                const categoryCard = document.createElement('div');
                categoryCard.className = 'category-card';
                categoryCard.dataset.categoryId = category.id;
                
                categoryCard.innerHTML = `
                    <div class="category-title">${category.title}</div>
                    <div class="category-desc">${category.description}</div>
                `;
                
                categoryCard.addEventListener('click', () => {
                    console.log('点击类别:', category.title);
                    this.selectCategory(category);
                });
                
                container.appendChild(categoryCard);
                console.log(`类别卡片 ${index + 1} 已添加到DOM`);
            });
            
            console.log(`总共生成了 ${decisionData.categories.length} 个类别卡片`);
            console.log('容器当前子元素数量:', container.children.length);
            
        } catch (error) {
            console.error('渲染类别时出错:', error);
            container.innerHTML = '<p style="text-align: center; color: red; padding: 20px;">渲染失败，请刷新页面重试</p>';
        }
    }
    
    // 选择决策类别
    selectCategory(category) {
        console.log('=== selectCategory 被调用 ===');
        console.log('选择的类别:', category);
        
        this.currentCategory = category;
        
        // 更新UI状态
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const selectedCard = document.querySelector(`[data-category-id="${category.id}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
            console.log('已激活选中的卡片');
        } else {
            console.log('未找到对应的卡片元素');
        }
        
        // 延迟后显示转盘
        console.log('准备显示转盘...');
        setTimeout(() => {
            this.showWheel(category);
        }, 300);
    }
    
    // 显示转盘
    showWheel(category) {
        console.log('=== showWheel 开始 ===');
        console.log('显示转盘，类别:', category);
        
        const categorySection = document.getElementById('categorySelection');
        const wheelSection = document.getElementById('wheelSection');
        const resultSection = document.getElementById('resultSection');
        const wheelTitle = document.getElementById('wheelTitle');
        const currentCategorySpan = document.getElementById('currentCategory');
        
        console.log('DOM元素检查:', {
            categorySection: !!categorySection,
            wheelSection: !!wheelSection,
            wheelTitle: !!wheelTitle,
            currentCategorySpan: !!currentCategorySpan
        });
        
        // 更新转盘标题和类别显示
        if (wheelTitle) {
            wheelTitle.textContent = category.title;
            console.log('转盘标题已更新');
        }
        if (currentCategorySpan) {
            currentCategorySpan.textContent = category.title;
            console.log('当前类别已更新');
        }
        
        // 隐藏结果区域
        if (resultSection) {
            resultSection.classList.remove('show');
        }
        
        // 设置转盘数据
        if (this.wheel) {
            console.log('设置转盘数据:', category.options);
            console.log('转盘段数:', category.options.length);
            console.log('转盘组件状态:', !!this.wheel);
            
            // 确保数据格式正确
            if (category.options && Array.isArray(category.options) && category.options.length > 0) {
                this.wheel.setSegments(category.options);
                console.log('转盘段数设置完成:', category.options.length);
                
                // 强制重绘
                setTimeout(() => {
                    console.log('强制重绘转盘');
                    this.wheel.draw();
                }, 100);
            } else {
                console.error('转盘数据格式错误:', category.options);
            }
        } else {
            console.error('转盘组件未初始化');
        }
        
        // 显示转盘区域
        if (categorySection) {
            categorySection.style.display = 'none';
            console.log('类别选择区域已隐藏');
        }
        if (wheelSection) {
            wheelSection.style.display = 'block';
            console.log('转盘区域已显示');
            // 滚动到转盘区域
            setTimeout(() => {
                wheelSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
        
        console.log('=== showWheel 完成 ===');
    }
    
    // 初始化转盘
    initWheel() {
        const canvas = document.getElementById('wheelCanvas');
        if (!canvas) {
            console.error('wheelCanvas元素不存在');
            return;
        }
        
        try {
            console.log('初始化转盘组件...');
            this.wheel = new WheelOfFortune('wheelCanvas', {
                radius: 146, // 设置合适的半径
                soundEnabled: true,
                onSpinComplete: (segment) => {
                    this.onWheelComplete(segment);
                }
            });
            
            // 响应式调整
            makeWheelResponsive(this.wheel);
            
            // 设置默认数据（防止空白转盘）
            if (decisionData && decisionData.categories && decisionData.categories.length > 0) {
                const firstCategory = decisionData.categories[0];
                if (firstCategory && firstCategory.options && firstCategory.options.length > 0) {
                    console.log('设置默认转盘数据:', firstCategory.title);
                    this.wheel.setSegments(firstCategory.options);
                }
            }
            
            console.log('转盘组件初始化成功');
            
        } catch (error) {
            console.error('转盘组件初始化失败:', error);
        }
    }
    
    // 绑定事件
    bindEvents() {
        // 使用事件委托处理所有按钮点击
        document.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            
            console.log('按钮被点击:', target.id, target.className);
            
            // 转盘按钮
            if (target.id === 'spinButton') {
                console.log('spinButton被点击');
                this.spinWheel();
                return;
            }
            
            // 重置按钮
            if (target.id === 'resetButton') {
                console.log('resetButton被点击');
                this.resetToCategories();
                return;
            }
            

            
            // 选择新类别按钮
            if (target.id === 'newCategoryButton') {
                console.log('newCategoryButton被点击');
                this.resetToCategories();
                return;
            }
        });
        
        // 转盘中心点击区域事件
        const wheelCenterHint = document.getElementById('wheelCenterHint');
        if (wheelCenterHint) {
            wheelCenterHint.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!this.wheel.getIsSpinning()) {
                    this.spinWheel();
                }
            });
        }
        
        // 转盘画布点击事件（可选）
        const canvas = document.getElementById('wheelCanvas');
        if (canvas) {
            canvas.addEventListener('click', () => {
                if (!this.wheel.getIsSpinning()) {
                    this.spinWheel();
                }
            });
        }
        
        // 音效控制按钮
        this.bindSoundControl();
    }
    
    // 绑定音效控制
    bindSoundControl() {
        const soundControl = document.getElementById('soundControl');
        if (!soundControl) return;
        
        // 从localStorage读取音效设置
        let soundEnabled = localStorage.getItem('wheelSoundEnabled');
        if (soundEnabled === null) {
            soundEnabled = 'true'; // 默认开启
        } else {
            soundEnabled = soundEnabled === 'true';
        }
        
        this.updateSoundControl(soundEnabled);
        
        soundControl.addEventListener('click', () => {
            const currentEnabled = !soundControl.classList.contains('muted');
            const newEnabled = !currentEnabled;
            
            this.updateSoundControl(newEnabled);
            
            if (this.wheel) {
                this.wheel.setSoundEnabled(newEnabled);
            }
            
            localStorage.setItem('wheelSoundEnabled', newEnabled.toString());
            
            // 显示提示
            this.showSoundTip(newEnabled ? '音效已开启' : '音效已关闭');
        });
    }
    
    // 更新音效控制状态
    updateSoundControl(enabled) {
        const soundControl = document.getElementById('soundControl');
        const soundIcon = soundControl?.querySelector('.sound-icon');
        
        if (!soundControl || !soundIcon) return;
        
        if (enabled) {
            soundControl.classList.remove('muted');
            soundIcon.textContent = '🔊';
        } else {
            soundControl.classList.add('muted');
            soundIcon.textContent = '🔇';
        }
    }
    
    // 显示音效提示
    showSoundTip(message) {
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            z-index: 10000;
            font-size: 14px;
            pointer-events: none;
            animation: fadeInOut 2s ease-in-out;
        `;
        tip.textContent = message;
        
        // 添加淡入淡出动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(tip);
        
        setTimeout(() => {
            document.body.removeChild(tip);
            document.head.removeChild(style);
        }, 2000);
    }
    
    // 转动转盘
    spinWheel() {
        console.log('=== spinWheel 开始 ===');
        console.log('this.wheel:', !!this.wheel);
        console.log('isSpinning:', this.wheel ? this.wheel.getIsSpinning() : 'undefined');
        
        if (!this.wheel) {
            console.error('转盘组件不存在');
            return;
        }
        
        if (this.wheel.getIsSpinning()) {
            console.warn('转盘正在转动中');
            return;
        }
        
        console.log('转盘当前段数:', this.wheel.segments ? this.wheel.segments.length : 'undefined');
        
        const spinButton = document.getElementById('spinButton');
        const wheelCenterHint = document.getElementById('wheelCenterHint');
        
        // 更新按钮状态
        if (spinButton) {
            spinButton.disabled = true;
            spinButton.classList.add('spinning');
            const spinText = spinButton.querySelector('.spin-text');
            const spinIcon = spinButton.querySelector('.spin-icon');
            if (spinText) spinText.textContent = '轸動中...';
            if (spinIcon) spinIcon.textContent = '🌪️';
        }
        
        // 更新中心提示
        if (wheelCenterHint) {
            wheelCenterHint.classList.add('spinning');
            wheelCenterHint.textContent = '⏳';
        }
        
        // 开始转动
        console.log('开始调用 wheel.spin()');
        this.wheel.spin();
        console.log('wheel.spin() 调用完成');
        
        // 注意：转盘动画完全由canvas内部处理，不影响其他元素
        console.log('=== spinWheel 结束 ===');
    }
    
    // 转盘完成回调
    onWheelComplete(segment) {
        console.log('=== 转盘完成回调开始 ===');
        console.log('callback received segment:', segment);
        
        // 立即测试结果显示 - 强制显示
        console.log('立即强制显示结果区域测试');
        const testResultSection = document.getElementById('resultSection');
        if (testResultSection) {
            testResultSection.style.display = 'block';
            testResultSection.style.opacity = '1';
            testResultSection.classList.add('show');
            console.log('强制显示测试完成');
        }
        
        const spinButton = document.getElementById('spinButton');
        const canvas = document.getElementById('wheelCanvas');
        const wheelCenterHint = document.getElementById('wheelCenterHint');
        

        
        // 恢复按钮状态
        if (spinButton) {
            spinButton.disabled = false;
            spinButton.classList.remove('spinning');
            const spinText = spinButton.querySelector('.spin-text');
            const spinIcon = spinButton.querySelector('.spin-icon');
            if (spinText) spinText.textContent = '再轉一次';
            if (spinIcon) spinIcon.textContent = '🎯';

        }
        

        
        // 恢复中心提示
        if (wheelCenterHint) {
            wheelCenterHint.classList.remove('spinning');
            wheelCenterHint.textContent = '🎯';
            console.log('中心提示已恢复');
        }
        
        // 注意：转盘动画完全由canvas内部处理，不影响其他元素
        
        // 显示结果
        console.log('准备显示结果...');
        console.log('调用showResult前，检查resultSection:', !!document.getElementById('resultSection'));
        
        // 强制显示结果 - 多重保险
        const resultSection = document.getElementById('resultSection');
        if (resultSection) {
            console.log('强制设置resultSection样式为block');
            resultSection.style.display = 'block';
            resultSection.style.opacity = '1';
            resultSection.style.transform = 'translateY(0)';
        }
        
        this.showResult(segment);
        
        // 再次确保显示
        setTimeout(() => {
            const rs = document.getElementById('resultSection');
            if (rs) {
                rs.classList.add('show');
                rs.style.display = 'block';
                console.log('最终确保结果显示，当前状态:', rs.className, rs.style.display);
            }
        }, 100);
        
        console.log('=== 转盘完成回调结束 ===');
    }
    
    // 显示结果
    showResult(segment) {
        console.log('=== showResult 开始 ===');
        console.log('显示转盘结果:', segment);
        const resultSection = document.getElementById('resultSection');
        const resultTitle = document.getElementById('resultTitle');
        const resultContent = document.getElementById('resultContent');
        
        console.log('结果区域元素:', {
            resultSection: !!resultSection,
            resultTitle: !!resultTitle,
            resultContent: !!resultContent
        });
        
        if (!resultSection) {
            console.error('resultSection 未找到！');
            return;
        }
        
        if (!resultSection || !resultTitle || !resultContent) {
            console.error('结果区域元素未找到');
            return;
        }
        
        // 设置结果标题 - 保持原有风格
        if (resultTitle) {
            resultTitle.textContent = '轉盤結果';
        } else {
            console.warn('resultTitle元素不存在');
        }
        

        
        // 处理结果内容，高亮关键词
        if (!segment || !segment.result || !segment.result.explanation) {
            console.error('segment数据结构错误:', segment);
            resultContent.innerHTML = '<p style="color: red; text-align: center;">数据加载错误，请重试</p>';
            return;
        }
        
        let content = segment.result.explanation;
        
        // 高亮古人和歌曲名字
        content = content.replace(/(伍佰|李白|蘇軾|岳飛|王維|杜甫|陶淵明|羅文|李宗盛|張雨生|范仲淹|陸游|劉禹錫|司馬光|莊子|關羽|孔明|蘇軾與黃庭堅|孟郊|曾子|王陽明|老子|范蠡|華佗|張三豐|王勃|李商隐)/g, '<span class="result-highlight">$1</span>');
        
        // 高亮经典诗词句子
        content = content.replace(/(「[^」]+」)/g, '<span class="result-highlight">$1</span>');
        
        // 高亮歌曲名
        content = content.replace(/(《[^》]+》)/g, '<span class="result-highlight">$1</span>');
        
        // 使用原有的简单结构，但内容更丰富
        resultContent.innerHTML = `
            <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #f8f5f0 0%, #fff 100%); border-radius: 12px; border-left: 4px solid #c9a66b; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <span style="font-size: 2em; margin-right: 12px;">🎯</span>
                    <div>
                        <strong style="color: #c9a66b; font-size: 1.2em; display: block; margin-bottom: 5px;">轉盤結果：</strong>
                        <span style="color: #8b4513; font-weight: bold; font-size: 1.1em;">${segment.text}</span>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 25px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #e8e8e8; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
                <h4 style="color: #8b4513; margin-bottom: 15px; font-size: 1.1em; display: flex; align-items: center;">
                    <span style="margin-right: 8px;">📖</span> 古人解讀
                </h4>
                <div style="line-height: 1.8; color: #444; font-size: 1.05em; text-align: justify;">${content}</div>
            </div>
            
            <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #e8f4f0 0%, #f0f8f4 100%); border-radius: 12px; border: 1px solid rgba(76, 175, 80, 0.2); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
                <h4 style="color: #4caf50; margin-bottom: 15px; font-size: 1.1em; display: flex; align-items: center;">
                    <span style="margin-right: 8px;">💡</span> 人生啟示
                </h4>
                <div style="line-height: 1.7; color: #333;">
                    <p style="margin: 8px 0;">這個結果不僅是一個簡單的選擇，更是命運給你的一個契機。古人說「順其自然」，重要的是保持內心的平靜與智慧。</p>
                    <p style="margin: 8px 0;">讓我們學習古人的灑脫與智慧，以更從容的態度面對生活中的每個選擇，在轉折中找到新的方向。</p>
                </div>
            </div>
            
            <div style="padding: 20px; background: linear-gradient(135deg, #fff3e0 0%, #fff8f0 100%); border-radius: 12px; border: 1px solid rgba(255, 152, 0, 0.2); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
                <h4 style="color: #ff9800; margin-bottom: 15px; font-size: 1.1em; display: flex; align-items: center;">
                    <span style="margin-right: 8px;">🌟</span> 今日行動
                </h4>
                <div style="line-height: 1.7; color: #444;">
                    <ul style="margin: 0; padding-left: 20px;">
                        <li style="margin: 8px 0; position: relative;"><span style="color: #ff9800; font-weight: bold;">•</span> 靜下心來，思考這個結果對你的意義</li>
                        <li style="margin: 8px 0; position: relative;"><span style="color: #ff9800; font-weight: bold;">•</span> 給自己一些時間，感受內心的聲音</li>
                        <li style="margin: 8px 0; position: relative;"><span style="color: #ff9800; font-weight: bold;">•</span> 相信自己的選擇，勇敢前行</li>
                    </ul>
                </div>
            </div>
        `;
        
        // 显示结果区域 - 强制显示
        console.log('准备显示结果区域，当前classes:', resultSection.className);
        
        // 多重显示保险
        resultSection.classList.add('show');
        resultSection.style.display = 'block';
        resultSection.style.opacity = '1';
        resultSection.style.visibility = 'visible';
        resultSection.style.transform = 'translateY(0)';
        
        console.log('添加show class后，当前classes:', resultSection.className);
        console.log('resultSection style:', resultSection.style.cssText);
        console.log('resultSection computed style (display):', window.getComputedStyle(resultSection).display);
        console.log('resultSection computed style (opacity):', window.getComputedStyle(resultSection).opacity);
        
        // 滚动到结果区域
        setTimeout(() => {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
        
        // 添加分享功能
        this.addShareButtons(segment);
        
        // 确保按钮可用
        setTimeout(() => {
            const newCatBtn = document.getElementById('newCategoryButton');
            const resetBtn = document.getElementById('resetButton');
            
            if (newCatBtn) {
                newCatBtn.disabled = false;
            }
            if (resetBtn) {
                resetBtn.disabled = false;
            }
        }, 100);
    }
    

    
    // 添加分享按钮
    addShareButtons(segment) {
        const resultContent = document.getElementById('resultContent');
        if (!resultContent) return;
        
        const shareContainer = document.createElement('div');
        shareContainer.style.cssText = 'text-align: center; margin-top: 20px; padding: 15px; background: #f8f5f0; border-radius: 8px;';
        shareContainer.innerHTML = `
            <p style="margin-bottom: 10px; color: #666; font-size: 0.9em;">分享這個古風智慧：</p>
            <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                <button onclick="moodPage.shareToSocial('wechat')" style="background: #07c160; color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 0.9em;">微信</button>
                <button onclick="moodPage.shareToSocial('weibo')" style="background: #e6162d; color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 0.9em;">微博</button>
                <button onclick="moodPage.shareToSocial('copy')" style="background: var(--accent); color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 0.9em;">複製文本</button>
            </div>
        `;
        
        resultContent.appendChild(shareContainer);
    }
    
    // 分享到社交媒体
    shareToSocial(platform) {
        const segment = this.wheel.getSelectedSegment();
        if (!segment) return;
        
        const title = segment.result.title;
        const text = `古風決策指引：${title}。${segment.result.explanation.substring(0, 100)}...`;
        const url = window.location.href;
        
        switch (platform) {
            case 'wechat':
                // 微信分享提示
                this.showShareTip('請使用微信掃描二維碼或在微信中打開分享');
                break;
            case 'weibo':
                window.open(`https://service.weibo.com/share/share.php?title=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'copy':
                this.copyToClipboard(`${title}\n\n${text}\n\n來自：江湖禪心 ${url}`);
                break;
        }
    }
    
    // 显示分享提示
    showShareTip(message) {
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            z-index: 9999;
            font-size: 16px;
            text-align: center;
            max-width: 80%;
        `;
        tip.textContent = message;
        
        document.body.appendChild(tip);
        
        setTimeout(() => {
            document.body.removeChild(tip);
        }, 3000);
    }
    
    // 复制到剪贴板
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showShareTip('已複製到剪貼板');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }
    
    // 备用复制方法
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showShareTip('已複製到剪貼板');
        } catch (err) {
            this.showShareTip('複製失敗，請手動複製');
        }
        
        document.body.removeChild(textArea);
    }
    
    // 重置到类别选择
    resetToCategories() {
        const categorySection = document.getElementById('categorySelection');
        const wheelSection = document.getElementById('wheelSection');
        const resultSection = document.getElementById('resultSection');
        
        // 重置转盘
        if (this.wheel) {
            this.wheel.reset();
        }
        
        // 重置按钮状态
        const spinButton = document.getElementById('spinButton');
        if (spinButton) {
            spinButton.disabled = false;
            spinButton.classList.remove('spinning');
            const spinText = spinButton.querySelector('.spin-text');
            const spinIcon = spinButton.querySelector('.spin-icon');
            if (spinText) spinText.textContent = '開始轉動';
            if (spinIcon) spinIcon.textContent = '🎯';
        }
        
        const wheelCenterHint = document.getElementById('wheelCenterHint');
        if (wheelCenterHint) {
            wheelCenterHint.classList.remove('spinning');
            wheelCenterHint.textContent = '🎯';
        }
        
        // 重置类别选择
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
        
        this.currentCategory = null;
        
        // 显示类别选择区域
        if (categorySection) categorySection.style.display = 'block';
        if (wheelSection) wheelSection.style.display = 'none';
        if (resultSection) {
            resultSection.classList.remove('show');
            console.log('结果区域已隐藏');
        }
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 获取当前类别
    getCurrentCategory() {
        return this.currentCategory;
    }
    
    // 检查是否已初始化
    getIsInitialized() {
        return this.isInitialized;
    }
}

// 页面加载完成后初始化
let moodPage;
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== DOM加载完成，开始初始化MoodPage ===');
    
    // 立即测试全局函数定义
    console.log('立即测试全局函数定义...');
    
    moodPage = new MoodPage();
    window.moodPage = moodPage; // 确保全局可访问
    
    console.log('MoodPage已创建，window.moodPage =', !!window.moodPage);
});

// 处理浏览器后退按钮
window.addEventListener('popstate', (event) => {
    if (moodPage && moodPage.getCurrentCategory()) {
        moodPage.resetToCategories();
    }
});

// 键盘快捷键支持
document.addEventListener('keydown', (event) => {
    if (!moodPage || !moodPage.getIsInitialized()) return;
    
    // 空格键转动转盘
    if (event.code === 'Space' && moodPage.getCurrentCategory()) {
        event.preventDefault();
        if (!moodPage.wheel.getIsSpinning()) {
            moodPage.spinWheel();
        }
    }
    
    // ESC键返回类别选择
    if (event.code === 'Escape' && moodPage.getCurrentCategory()) {
        moodPage.resetToCategories();
    }
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 窗口大小变化时的响应式处理
window.addEventListener('resize', debounce(() => {
    if (moodPage && moodPage.wheel) {
        // 转盘会在wheelComponent.js中自动调整大小
        console.log('Window resized, wheel auto-adjusted');
    }
}, 250));