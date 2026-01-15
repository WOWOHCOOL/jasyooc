/**
 * 提示词卡片组件
 * 负责渲染和管理提示词卡片
 */
class PromptCard {
    constructor(container) {
        this.container = container;
        this.cards = new Map();
        this.currentFilter = null;
        this.currentCategory = null;
        
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.setupEventListeners();
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 使用事件委托处理卡片点击
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('.prompt-card');
            if (card) {
                this.handleCardClick(card);
            }
        });

        // 触摸事件优化
        this.container.addEventListener('touchstart', (e) => {
            const card = e.target.closest('.prompt-card');
            if (card) {
                card.classList.add('touching');
            }
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            const touchingCards = this.container.querySelectorAll('.touching');
            touchingCards.forEach(card => card.classList.remove('touching'));
        }, { passive: true });
    }

    /**
     * 渲染提示词卡片
     * @param {Array} prompts 提示词数组
     * @param {Object} options 渲染选项
     */
    render(prompts, options = {}) {
        this.clear();
        
        const fragment = document.createDocumentFragment();
        
        prompts.forEach((prompt, index) => {
            const card = this.createCard(prompt, index);
            fragment.appendChild(card);
            this.cards.set(prompt.id, card);
        });
        
        this.container.appendChild(fragment);
        
        // 应用动画效果
        this.animateCards();
    }

    /**
     * 创建单个卡片
     * @param {Object} prompt 提示词数据
     * @param {number} index 索引
     * @returns {HTMLElement} 卡片元素
     */
    createCard(prompt, index) {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.dataset.promptId = prompt.id;
        card.dataset.title = prompt.title;
        
        // 安全地处理图片路径
        const thumbnail = prompt.images?.thumbnail || 'images/prompt/default.webp';
        card.dataset.img = thumbnail;
        
        // 安全地处理prompt数据
        const promptData = prompt.prompt || '提示词数据';
        if (typeof promptData === 'object') {
            card.dataset.prompt = JSON.stringify(promptData);
        } else {
            card.dataset.prompt = promptData;
        }
        
        // 安全地处理描述
        const description = prompt.description || '暂无描述';
        
        card.innerHTML = `
            <img src="${thumbnail}" alt="${this.escapeHtml(prompt.title)}" loading="lazy" 
                 onerror="this.src='images/prompt/default.webp'">
            <h3>${this.escapeHtml(prompt.title)}</h3>
            <p>${this.escapeHtml(description)}</p>
            <div class="card-meta">
                <span class="difficulty ${prompt.difficulty || 'beginner'}">${this.getDifficultyLabel(prompt.difficulty)}</span>
                <span class="type">${this.getTypeLabel(prompt.type)}</span>
            </div>
            ${this.createTagsHtml(prompt.tags || [])}
        `;
        
        // 延迟添加动画类以实现交错效果
        setTimeout(() => {
            card.classList.add('loaded');
        }, index * 50);
        
        return card;
    }

    /**
     * 创建标签HTML
     * @param {Array} tags 标签数组
     * @returns {string} 标签HTML
     */
    createTagsHtml(tags) {
        if (!tags || tags.length === 0) return '';
        
        return `
            <div class="card-tags">
                ${tags.slice(0, 3).map(tag => 
                    `<span class="tag">${this.escapeHtml(tag)}</span>`
                ).join('')}
                ${tags.length > 3 ? `<span class="tag-more">+${tags.length - 3}</span>` : ''}
            </div>
        `;
    }

    /**
     * 获取难度标签
     * @param {string} difficulty 难度
     * @returns {string} 难度标签
     */
    getDifficultyLabel(difficulty) {
        const labels = {
            'beginner': '初级',
            'intermediate': '中级', 
            'advanced': '高级',
            'expert': '专家'
        };
        return labels[difficulty] || difficulty;
    }

    /**
     * 获取类型标签
     * @param {string} type 类型
     * @returns {string} 类型标签
     */
    getTypeLabel(type) {
        const labels = {
            'portrait': '人像',
            'landscape': '风景',
            'artistic': '艺术',
            'group': '团体',
            'other': '其他'
        };
        return labels[type] || type;
    }

    /**
     * 处理卡片点击
     * @param {HTMLElement} card 卡片元素
     */
    handleCardClick(card) {
        try {
            const promptId = card.dataset.promptId;
            const title = card.dataset.title;
            const img = card.dataset.img;
            
            // 安全地解析prompt数据
            let promptData;
            try {
                promptData = JSON.parse(card.dataset.prompt);
            } catch (parseError) {
                // 如果不是JSON，直接使用字符串
                promptData = card.dataset.prompt;
            }
            
            // 检查模态框是否可用
            if (!window.modal) {
                console.error('模态框对象未找到');
                alert('模态框对象未找到，请检查Modal.js是否正确加载');
                return;
            }
            
            if (typeof window.modal.show !== 'function') {
                console.error('模态框show方法不存在', window.modal);
                alert('模态框show方法不存在，请检查Modal.js');
                return;
            }
            
            console.log('准备调用模态框show，数据:', {
                id: promptId,
                title: title,
                promptType: typeof promptData,
                hasImages: !!(img)
            });
            
            // 触发全局模态框显示事件
            try {
                window.modal.show({
                    id: promptId,
                    title: title,
                    prompt: promptData,
                    images: {
                        full: img,
                        thumbnail: img
                    }
                });
                console.log('模态框show调用成功');
            } catch (modalError) {
                console.error('调用模态框show时出错:', modalError);
                alert('打开模态框失败: ' + modalError.message);
            }
            
            // 添加点击反馈
            this.addClickFeedback(card);
        } catch (error) {
            console.error('处理卡片点击时出错:', error);
            alert('打开卡片详情失败: ' + error.message);
        }
    }

    /**
     * 添加点击反馈
     * @param {HTMLElement} card 卡片元素
     */
    addClickFeedback(card) {
        card.classList.add('clicked');
        setTimeout(() => {
            card.classList.remove('clicked');
        }, 300);
    }

    /**
     * 动画效果
     */
    animateCards() {
        const cards = this.container.querySelectorAll('.prompt-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, index * 50);
        });
    }

    /**
     * 筛选卡片
     * @param {Object} filter 筛选条件
     */
    filter(filter) {
        this.currentFilter = filter;
        const cards = this.container.querySelectorAll('.prompt-card');
        
        cards.forEach(card => {
            const matches = this.matchesFilter(card, filter);
            card.style.display = matches ? 'block' : 'none';
        });
    }

    /**
     * 检查卡片是否匹配筛选条件
     * @param {HTMLElement} card 卡片元素
     * @param {Object} filter 筛选条件
     * @returns {boolean} 是否匹配
     */
    matchesFilter(card, filter) {
        // 难度筛选
        if (filter.difficulty && filter.difficulty !== 'all') {
            const cardDifficulty = card.querySelector('.difficulty').textContent;
            if (cardDifficulty !== filter.difficulty) {
                return false;
            }
        }
        
        // 类型筛选
        if (filter.type && filter.type !== 'all') {
            const cardType = card.querySelector('.type').textContent;
            if (cardType !== filter.type) {
                return false;
            }
        }
        
        // 标签筛选
        if (filter.tags && filter.tags.length > 0) {
            const cardTags = Array.from(card.querySelectorAll('.tag')).map(tag => 
                tag.textContent.toLowerCase()
            );
            const filterTagsLower = filter.tags.map(tag => tag.toLowerCase());
            
            const hasMatchingTag = filterTagsLower.some(filterTag => 
                cardTags.some(cardTag => cardTag.includes(filterTag))
            );
            
            if (!hasMatchingTag) {
                return false;
            }
        }
        
        // 搜索筛选
        if (filter.search && filter.search.trim()) {
            const searchText = filter.search.toLowerCase();
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (!title.includes(searchText) && !description.includes(searchText)) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * 清空容器
     */
    clear() {
        this.container.innerHTML = '';
        this.cards.clear();
    }

    /**
     * 获取所有卡片
     * @returns {Array} 卡片数组
     */
    getAllCards() {
        return Array.from(this.container.querySelectorAll('.prompt-card'));
    }

    /**
     * 获取可见卡片
     * @returns {Array} 可见卡片数组
     */
    getVisibleCards() {
        return this.getAllCards().filter(card => card.style.display !== 'none');
    }

    /**
     * HTML转义
     * @param {string} text 原始文本
     * @returns {string} 转义后的文本
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 导出组件
window.PromptCard = PromptCard;