/**
 * 模态框组件
 * 负责显示提示词详情
 */
class Modal {
    constructor() {
        this.isOpen = false;
        this.currentPrompt = null;
        this.touchStartTime = 0;
        this.touchStartY = 0;
        
        this.init();
    }

    /**
     * 初始化模态框
     */
    init() {
        this.elements = {
            modal: document.getElementById('modal'),
            modalImage: document.getElementById('modal-image'),
            modalTitle: document.getElementById('modal-title'),
            modalPrompt: document.getElementById('modal-prompt'),
            closeBtn: document.getElementById('close-modal')
        };

        if (!this.elements.modal) {
            console.error('模态框元素未找到');
            return;
        }

        this.bindEvents();
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 关闭按钮事件
        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => this.close());
        }

        // 点击背景关闭
        this.elements.modal.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) {
                this.close();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // 触摸事件处理
        const modalImageContainer = this.elements.modal.querySelector('.modal-img');
        if (modalImageContainer) {
            modalImageContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            modalImageContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
            modalImageContainer.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: false });
        }
    }

    /**
     * 显示模态框
     * @param {Object} prompt 提示词数据
     */
    async show(prompt) {
        if (this.isOpen) return;
        
        this.currentPrompt = prompt;
        this.isOpen = true;
        
        // 设置内容
        this.elements.modalImage.src = prompt.images.full;
        this.elements.modalTitle.textContent = prompt.title;
        this.elements.modalPrompt.textContent = this.formatPrompt(prompt.prompt);
        
        // 显示模态框
        this.elements.modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // 预加载图片
        await this.preloadImage(prompt.images.full);
    }

    /**
     * 关闭模态框
     */
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        this.currentPrompt = null;
        
        // 隐藏模态框
        this.elements.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // 清空图片
        this.elements.modalImage.src = '';
    }

    /**
     * 格式化提示词显示
     * @param {Object|string} prompt 提示词数据
     * @returns {string} 格式化后的提示词
     */
    formatPrompt(prompt) {
        if (typeof prompt === 'string') {
            return prompt;
        }
        
        // 如果是对象，格式化显示
        if (prompt.positive && prompt.negative) {
            return `【正向提示】\n${prompt.positive}\n\n【负向提示】\n${prompt.negative}`;
        }
        
        // 其他复杂对象格式
        return JSON.stringify(prompt, null, 2);
    }

    /**
     * 预加载图片
     * @param {string} src 图片地址
     * @returns {Promise} 预加载Promise
     */
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * 处理触摸开始
     * @param {TouchEvent} e 触摸事件
     */
    handleTouchStart(e) {
        if (this.isOpen) return;
        
        const touch = e.touches[0];
        this.touchStartTime = Date.now();
        this.touchStartY = touch.clientY;
    }

    /**
     * 处理触摸结束
     * @param {TouchEvent} e 触摸事件
     */
    handleTouchEnd(e) {
        if (this.isOpen) return;
        
        const duration = Date.now() - this.touchStartTime;
        const endY = e.changedTouches[0].clientY;
        const moveDistance = Math.abs(this.touchStartY - endY);
        
        // 短按 + 小移动距离才触发（防止滑动误触）
        if (duration < 250 && moveDistance < 25) {
            e.preventDefault();
            // 触发卡片点击事件
            this.emitClick();
        }
    }

    /**
     * 触发点击事件
     */
    emitClick() {
        // 创建自定义点击事件
        const clickEvent = new CustomEvent('modalImageClick', {
            detail: { prompt: this.currentPrompt }
        });
        document.dispatchEvent(clickEvent);
    }

    /**
     * 获取当前显示的提示词
     * @returns {Object|null} 当前提示词
     */
    getCurrentPrompt() {
        return this.currentPrompt;
    }

    /**
     * 检查是否开启
     * @returns {boolean} 是否开启
     */
    isModalOpen() {
        return this.isOpen;
    }
}

// 导出单例实例
const modal = new Modal();
window.modal = modal;