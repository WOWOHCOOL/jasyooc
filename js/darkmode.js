/**
 * 江湖禪心 - 深色模式控制器
 * 统一管理全站深色模式功能
 */

(function() {
    'use strict';

    // 深色模式配置
    const DarkModeConfig = {
        storageKey: 'jianghuDarkMode',
        toggleClass: 'dark-mode-toggle',
        buttonSelector: '.dark-mode-toggle',
        bodyClass: 'dark-mode',
        
        // 按钮状态图标
        icons: {
            light: '🌙',
            dark: '☀️'
        },
        
        // 快捷键配置
        hotkey: {
            key: 'd',
            ctrl: true,
            meta: true // for Mac
        }
    };

    // 深色模式管理器
    const DarkModeManager = {
        
        // 初始化
        init() {
            this.createToggleButton();
            this.loadSavedMode();
            this.bindEvents();
            console.log('🌙 深色模式已初始化');
        },

        // 创建切换按钮
        createToggleButton() {
            // 检查是否已存在按钮
            let button = document.querySelector(DarkModeConfig.buttonSelector);
            
            if (!button) {
                button = document.createElement('button');
                button.className = DarkModeConfig.toggleClass;
                button.title = '切换深色模式 (Ctrl+D)';
                button.innerHTML = DarkModeConfig.icons.light;
                button.setAttribute('aria-label', '切换深色模式');
                
                // 插入到页面合适位置
                this.insertButton(button);
            }
            
            this.button = button;
        },

        // 插入按钮到页面
        insertButton(button) {
            // 尝试插入到header后或body开头
            const header = document.querySelector('header');
            const main = document.querySelector('main');
            
            if (header) {
                header.appendChild(button);
            } else if (main) {
                main.parentNode.insertBefore(button, main);
            } else {
                document.body.insertBefore(button, document.body.firstChild);
            }
            
            // 设置按钮样式
            this.styleButton(button);
        },

        // 设置按钮样式
        styleButton(button) {
            const style = {
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: '1000',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid var(--gold, #c9a66b)',
                borderRadius: '50px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '1.2em',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
            };
            
            Object.assign(button.style, style);
            
            // 悬停效果
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            });
            
            // 深色模式下的样式
            this.updateButtonStyle();
        },

        // 更新按钮样式（响应深色模式变化）
        updateButtonStyle() {
            if (!this.button) return;
            
            const isDark = document.body.classList.contains(DarkModeConfig.bodyClass);
            
            if (isDark) {
                this.button.style.background = 'rgba(45, 45, 68, 0.9)';
                this.button.style.color = 'var(--gold, #d4af37)';
            } else {
                this.button.style.background = 'rgba(255, 255, 255, 0.9)';
                this.button.style.color = 'inherit';
            }
        },

        // 绑定事件
        bindEvents() {
            // 按钮点击事件
            if (this.button) {
                this.button.addEventListener('click', () => this.toggle());
            }
            
            // 键盘快捷键
            document.addEventListener('keydown', (e) => {
                if (this.checkHotkey(e)) {
                    e.preventDefault();
                    this.toggle();
                }
            });
            
            // 系统深色模式变化
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addListener((e) => {
                    if (!localStorage.getItem(DarkModeConfig.storageKey)) {
                        // 只有用户没有手动设置时才跟随系统
                        this.setMode(e.matches);
                    }
                });
            }
        },

        // 检查快捷键
        checkHotkey(e) {
            const config = DarkModeConfig.hotkey;
            const isCtrl = e.ctrlKey || e.metaKey;
            
            return isCtrl && e.key === config.key;
        },

        // 切换深色模式
        toggle() {
            const isDark = document.body.classList.contains(DarkModeConfig.bodyClass);
            this.setMode(!isDark);
            this.saveMode(!isDark);
            this.showToast(isDark ? '已切换到浅色模式 🌞' : '已切换到深色模式 🌙');
        },

        // 设置模式
        setMode(isDark) {
            const body = document.body;
            
            if (isDark) {
                body.classList.add(DarkModeConfig.bodyClass);
                if (this.button) {
                    this.button.innerHTML = DarkModeConfig.icons.dark;
                }
            } else {
                body.classList.remove(DarkModeConfig.bodyClass);
                if (this.button) {
                    this.button.innerHTML = DarkModeConfig.icons.light;
                }
            }
            
            this.updateButtonStyle();
            
            // 触发自定义事件
            window.dispatchEvent(new CustomEvent('darkModeChanged', {
                detail: { isDark }
            }));
        },

        // 保存模式
        saveMode(isDark) {
            localStorage.setItem(DarkModeConfig.storageKey, isDark ? 'true' : 'false');
        },

        // 加载保存的模式
        loadSavedMode() {
            const saved = localStorage.getItem(DarkModeConfig.storageKey);
            
            if (saved) {
                this.setMode(saved === 'true');
            } else {
                // 检查系统偏好
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.setMode(true);
                } else {
                    this.setMode(false);
                }
            }
        },

        // 显示提示
        showToast(message) {
            // 检查是否已有toast
            let toast = document.querySelector('.dark-mode-toast');
            
            if (!toast) {
                toast = document.createElement('div');
                toast.className = 'dark-mode-toast';
                
                const toastStyle = {
                    position: 'fixed',
                    top: '70px',
                    right: '20px',
                    background: 'var(--gold, #c9a66b)',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    zIndex: '1001',
                    opacity: '0',
                    transform: 'translateY(-10px)',
                    transition: 'all 0.3s ease'
                };
                
                Object.assign(toast.style, toastStyle);
                document.body.appendChild(toast);
            }
            
            toast.textContent = message;
            
            // 显示动画
            setTimeout(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0)';
            }, 10);
            
            // 自动隐藏
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, 2000);
        }
    };

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            DarkModeManager.init();
        });
    } else {
        DarkModeManager.init();
    }

    // 导出到全局（供特殊页面使用）
    window.DarkModeManager = DarkModeManager;
    
})();