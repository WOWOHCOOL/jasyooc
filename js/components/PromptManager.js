/**
 * 提示词管理器
 * 负责整个提示词页面的核心逻辑
 */
class PromptManager {
    constructor() {
        this.data = null;
        this.categories = [];
        this.currentCategory = null;
        this.promptCard = null;
        this.searchTerm = '';
        this.filters = {
            difficulty: 'all',
            type: 'all',
            tags: []
        };
    }

    /**
     * 初始化
     */
    async init() {
        try {
            // 首先更新加载状态
            const countElement = document.getElementById('result-count');
            if (countElement) {
                countElement.textContent = '正在加载数据...';
            }
            
            // 加载数据
            await this.loadData();
            
            // 初始化组件
            this.initComponents();
            
            // 绑定基础事件（移除筛选相关事件）
            this.bindBasicEvents();
            
            // 初始渲染
            this.renderAllPrompts();
            
            console.log('提示词管理器初始化完成');
        } catch (error) {
            console.error('提示词管理器初始化失败:', error);
            
            // 更新结果计数显示错误
            const countElement = document.getElementById('result-count');
            if (countElement) {
                countElement.textContent = '❌ 初始化失败';
            }
            
            this.showError('加载数据失败，请刷新页面重试');
        }
    }

    /**
     * 加载数据
     */
    async loadData() {
        this.data = await window.dataLoader.loadPromptsData();
        this.categories = this.data.categories || [];
    }

    /**
     * 初始化组件
     */
    initComponents() {
        const container = document.getElementById('prompt-container');
        if (!container) {
            throw new Error('提示词容器未找到');
        }
        
        this.promptCard = new PromptCard(container);
    }

    /**
     * 绑定基础事件（保留标签筛选功能）
     */
    bindBasicEvents() {
        // 搜索功能
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.trim();
                this.applyFilters();
            });
        }

        // 标签筛选
        this.initTagFilters();

        // 复制按钮事件
        const copyBtn = document.getElementById('copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyCurrentPrompt());
        }

        // 模态框图片点击事件
        document.addEventListener('modalImageClick', (e) => {
            console.log('模态框图片被点击:', e.detail.prompt);
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'f':
                        e.preventDefault();
                        this.focusSearch();
                        break;
                    case 'c':
                        if (window.modal.isModalOpen()) {
                            e.preventDefault();
                            this.copyCurrentPrompt();
                        }
                        break;
                    case 'Escape':
                        if (window.modal.isModalOpen()) {
                            window.modal.close();
                        }
                        break;
                }
            }
        });
    }

    /**
     * 初始化标签筛选
     */
    initTagFilters() {
        // 收集所有标签
        const allTags = new Set();
        this.categories.forEach(category => {
            category.prompts.forEach(prompt => {
                if (prompt.tags) {
                    prompt.tags.forEach(tag => allTags.add(tag));
                }
            });
        });

        // 创建标签筛选界面
        this.createTagFilterUI(Array.from(allTags));
    }

    /**
     * 创建标签筛选UI
     * @param {Array} tags 标签数组
     */
    createTagFilterUI(tags) {
        const tagContainer = document.getElementById('tag-filter');
        if (!tagContainer) return;

        const tagHtml = tags.map(tag => 
            `<label class="tag-filter-label">
                <input type="checkbox" value="${this.escapeHtml(tag)}">
                <span>${this.escapeHtml(tag)}</span>
            </label>`
        ).join('');

        tagContainer.innerHTML = tagHtml;

        // 绑定标签点击事件
        tagContainer.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.updateTagFilters();
            }
        });
    }

    /**
     * 更新标签筛选
     */
    updateTagFilters() {
        const checkboxes = document.querySelectorAll('#tag-filter input[type="checkbox"]:checked');
        this.filters.tags = Array.from(checkboxes).map(cb => cb.value);
        this.applyFilters();
    }

    /**
     * 应用筛选条件（搜索 + 标签）
     */
    applyFilters() {
        const allCards = this.promptCard.getAllCards();
        const searchLower = this.searchTerm.toLowerCase();
        const selectedTags = this.filters.tags;
        
        allCards.forEach(card => {
            let shouldShow = true;
            
            // 搜索筛选
            if (this.searchTerm) {
                const title = card.dataset.title?.toLowerCase() || '';
                shouldShow = title.includes(searchLower);
            }
            
            // 标签筛选
            if (shouldShow && selectedTags.length > 0) {
                const promptId = card.dataset.promptId;
                const prompt = this.findPromptById(promptId);
                const promptTags = prompt?.tags || [];
                shouldShow = selectedTags.some(tag => promptTags.includes(tag));
            }
            
            card.style.display = shouldShow ? 'block' : 'none';
        });
        
        this.updateResultCount();
    }

    /**
     * 根据ID查找提示词
     * @param {string} promptId 提示词ID
     * @returns {Object|null} 提示词对象
     */
    findPromptById(promptId) {
        for (const category of this.categories) {
            const prompt = category.prompts.find(p => p.id === promptId);
            if (prompt) {
                return prompt;
            }
        }
        return null;
    }

    /**
     * 更新结果数量（简化版）
     */
    updateResultCount() {
        const countElement = document.getElementById('result-count');
        if (!countElement) return;
        
        try {
            const visibleCount = this.promptCard.getVisibleCards().length;
            const totalCount = this.promptCard.getAllCards().length;
            
            if (totalCount === 0) {
                countElement.textContent = '加载中...';
            } else if (visibleCount === totalCount) {
                countElement.textContent = `共 ${totalCount} 个提示词`;
            } else {
                countElement.textContent = `显示 ${visibleCount} / ${totalCount} 个提示词`;
            }
        } catch (error) {
            console.error('更新结果数量失败:', error);
            countElement.textContent = '加载失败';
        }
    }

    /**
     * 渲染所有提示词
     */
    renderAllPrompts() {
        const allPrompts = [];
        this.categories.forEach(category => {
            allPrompts.push(...category.prompts);
        });
        
        this.promptCard.render(allPrompts);
        this.updateResultCount();
    }

    /**
     * 按分类渲染提示词
     * @param {string} categoryId 分类ID
     */
    renderByCategory(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (category) {
            this.currentCategory = category;
            this.promptCard.render(category.prompts);
            this.updateResultCount();
        }
    }

    /**
     * 复制当前提示词
     */
    async copyCurrentPrompt() {
        const currentPrompt = window.modal.getCurrentPrompt();
        if (!currentPrompt) {
            this.showToast('没有可复制的提示词');
            return;
        }

        try {
            const text = this.formatPromptForCopy(currentPrompt.prompt);
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                this.showToast('提示词已复制到剪贴板');
            } else {
                this.fallbackCopy(text);
            }
        } catch (error) {
            console.error('复制失败:', error);
            this.showToast('复制失败，请手动选择复制');
        }
    }

    /**
     * 格式化提示词用于复制
     * @param {Object|string} prompt 提示词数据
     * @returns {string} 格式化后的文本
     */
    formatPromptForCopy(prompt) {
        if (typeof prompt === 'string') {
            return prompt;
        }

        // 复杂对象的格式化
        let formatted = '';
        
        if (prompt.positive) {
            formatted += `【正向提示】\n${prompt.positive}\n\n`;
        }
        
        if (prompt.negative) {
            formatted += `【负向提示】\n${prompt.negative}\n\n`;
        }
        
        // 添加其他字段
        const otherFields = {};
        Object.keys(prompt).forEach(key => {
            if (key !== 'positive' && key !== 'negative' && typeof prompt[key] === 'string') {
                otherFields[key] = prompt[key];
            }
        });
        
        if (Object.keys(otherFields).length > 0) {
            formatted += `【其他信息】\n${JSON.stringify(otherFields, null, 2)}`;
        }
        
        return formatted.trim();
    }

    /**
     * 备用复制方法
     * @param {string} text 要复制的文本
     */
    fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        try {
            document.execCommand('copy');
            this.showToast('提示词已复制');
        } catch (err) {
            this.showToast('复制失败，请手动选择复制');
        }
        
        document.body.removeChild(textarea);
    }

    /**
     * 显示提示消息
     * @param {string} message 消息内容
     * @param {number} duration 显示时长
     */
    showToast(message, duration = 2000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // 设置样式
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-break: break-word;
        `;
        
        document.body.appendChild(toast);
        
        // 显示动画
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });
        
        // 自动隐藏
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    /**
     * 聚焦搜索框
     */
    focusSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }

    /**
     * 显示错误信息
     * @param {string} message 错误消息
     */
    showError(message) {
        // 更新结果计数显示错误
        const countElement = document.getElementById('result-count');
        if (countElement) {
            countElement.textContent = '❌ 加载失败';
        }
        
        const container = document.getElementById('prompt-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ 加载错误</h3>
                    <p>${this.escapeHtml(message)}</p>
                    <button onclick="location.reload()" class="btn">重新加载</button>
                </div>
            `;
        }
    }

    /**
     * 获取统计信息
     * @returns {Object} 统计数据
     */
    getStats() {
        const stats = {
            totalPrompts: 0,
            totalCategories: this.categories.length,
            difficultyDistribution: {},
            typeDistribution: {},
            tagDistribution: {}
        };

        this.categories.forEach(category => {
            category.prompts.forEach(prompt => {
                stats.totalPrompts++;
                
                // 难度分布
                stats.difficultyDistribution[prompt.difficulty] = 
                    (stats.difficultyDistribution[prompt.difficulty] || 0) + 1;
                
                // 类型分布
                stats.typeDistribution[prompt.type] = 
                    (stats.typeDistribution[prompt.type] || 0) + 1;
                
                // 标签分布
                if (prompt.tags) {
                    prompt.tags.forEach(tag => {
                        stats.tagDistribution[tag] = 
                            (stats.tagDistribution[tag] || 0) + 1;
                    });
                }
            });
        });

        return stats;
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

// 导出单例实例
const promptManager = new PromptManager();
window.promptManager = promptManager;