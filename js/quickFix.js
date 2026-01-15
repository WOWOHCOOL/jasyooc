// 最简化的mood页面修复脚本
console.log('=== 修复脚本加载 ===');

// 立即执行函数，不等待DOM加载
(function() {
    // 等待decisionData加载
    function waitForDecisionData() {
        if (typeof decisionData !== 'undefined' && decisionData.categories) {
            console.log('decisionData已加载，开始修复...');
            fixCategoriesDisplay();
        } else {
            console.log('等待decisionData加载...');
            setTimeout(waitForDecisionData, 100);
        }
    }
    
    // 修复分类显示
    function fixCategoriesDisplay() {
        const container = document.getElementById('categoriesContainer');
        if (!container) {
            console.error('categoriesContainer不存在');
            setTimeout(fixCategoriesDisplay, 100);
            return;
        }
        
        console.log('开始修复分类显示，分类数量:', decisionData.categories.length);
        
        // 清空容器
        container.innerHTML = '';
        
        // 设置容器样式
        container.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 10px;
        `;
        
        // 创建分类卡片
        decisionData.categories.forEach((category, index) => {
            console.log(`创建分类 ${index + 1}: ${category.title}`);
            
            const card = document.createElement('div');
            card.style.cssText = `
                background: white;
                border: 2px solid #e0e0e0;
                border-radius: 10px;
                padding: 16px 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
                min-height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            `;
            
            card.innerHTML = `
                <div style="font-size: 1em; font-weight: bold; color: #8b4513; margin-bottom: 6px; line-height: 1.2; word-break: break-word;">${category.title}</div>
                <div style="font-size: 0.85em; color: #666; line-height: 1.3; word-break: break-word;">${category.description}</div>
            `;
            
            // 添加悬停效果
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = '#8b4513';
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 4px 12px rgba(139, 69, 19, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = '#e0e0e0';
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            });
            
            // 添加点击事件
            card.addEventListener('click', () => {
                console.log('点击分类:', category.title);
                selectCategory(category, card);
            });
            
            container.appendChild(card);
        });
        
        console.log(`成功创建 ${decisionData.categories.length} 个分类卡片`);
        
        // 添加状态显示
        const statusDiv = document.createElement('div');
        statusDiv.style.cssText = `
            text-align: center;
            color: #666;
            margin: 10px 0;
            font-size: 0.9em;
        `;
        statusDiv.textContent = `✅ 成功加载 ${decisionData.categories.length} 个决策分类`;
        container.parentNode.insertBefore(statusDiv, container);
    }
    
    // 选择分类的处理函数
    function selectCategory(category, cardElement) {
        console.log('选择分类:', category.title);
        
        // 移除所有激活状态
        document.querySelectorAll('#categoriesContainer > div').forEach(card => {
            card.style.borderColor = '#e0e0e0';
            card.style.background = 'white';
        });
        
        // 激活当前卡片
        cardElement.style.borderColor = '#daa520';
        cardElement.style.background = 'linear-gradient(135deg, #f8f5f0 0%, #fff 100%)';
        
        // 显示转盘区域
        const categorySection = document.getElementById('categorySelection');
        const wheelSection = document.getElementById('wheelSection');
        
        if (categorySection && wheelSection) {
            categorySection.style.display = 'none';
            wheelSection.style.display = 'block';
            
            // 更新转盘信息
            const wheelTitle = document.getElementById('wheelTitle');
            const currentCategorySpan = document.getElementById('currentCategory');
            
            if (wheelTitle) wheelTitle.textContent = category.title;
            if (currentCategorySpan) currentCategorySpan.textContent = category.title;
            
            // 滚动到转盘区域
            wheelSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // 初始化转盘（如果还没有初始化）
            if (typeof window.initWheelForCategory === 'function') {
                window.initWheelForCategory(category);
            }
        }
    }
    
    // 开始等待数据
    waitForDecisionData();
})();

// 添加全局函数供调试使用
window.forceFixCategories = function() {
    if (typeof decisionData !== 'undefined') {
        const container = document.getElementById('categoriesContainer');
        if (container) {
            container.innerHTML = '';
            console.log('清空容器，准备重新创建...');
        }
        
        // 重新触发修复
        setTimeout(() => {
            const event = new Event('DOMContentLoaded');
            document.dispatchEvent(event);
        }, 100);
    }
};

console.log('修复脚本已加载，可使用 forceFixCategories() 强制修复');