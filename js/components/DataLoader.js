/**
 * 数据加载器
 * 负责加载和管理提示词数据
 */
class DataLoader {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5分钟缓存
    }

    /**
     * 加载提示词数据
     * @returns {Promise<Object>} 提示词数据
     */
    async loadPromptsData() {
        const cacheKey = 'prompts_data';
        const cached = this.cache.get(cacheKey);
        
        // 检查缓存
        if (cached && (Date.now() - cached.timestamp < this.cacheTimeout)) {
            return cached.data;
        }

        try {
            // 从JSON文件加载数据
            const response = await fetch('data/prompts.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // 缓存数据
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.error('加载提示词数据失败:', error);
            
            // 返回备用数据或抛出错误
            if (cached) {
                console.warn('使用缓存数据');
                return cached.data;
            }
            
            throw error;
        }
    }

    /**
     * 加载分类数据
     * @returns {Promise<Object>} 分类数据
     */
    async loadCategoriesData() {
        const data = await this.loadPromptsData();
        return data.categories || [];
    }

    /**
     * 根据ID获取提示词
     * @param {string} promptId 提示词ID
     * @returns {Promise<Object|null>} 提示词对象
     */
    async getPromptById(promptId) {
        const data = await this.loadPromptsData();
        
        for (const category of data.categories) {
            const prompt = category.prompts.find(p => p.id === promptId);
            if (prompt) {
                return prompt;
            }
        }
        
        return null;
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * 获取缓存状态
     * @returns {Object} 缓存信息
     */
    getCacheStatus() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// 导出单例实例
const dataLoader = new DataLoader();
window.dataLoader = dataLoader;