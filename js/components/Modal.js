/**
 * Modal component
 * Responsible for displaying prompt details
 */
class Modal {
    constructor() {
        try {
            console.log('Modal constructor starting...');
            this.isOpen = false;
            this.currentPrompt = null;
            this.touchStartTime = 0;
            this.touchStartY = 0;
            
            this.init();
            console.log('Modal constructor completed');
        } catch (error) {
            console.error('Modal constructor failed:', error);
            throw error;
        }
    }

    /**
     * Initialize modal
     */
    init() {
        console.log('Initializing modal...');
        
        this.elements = {
            modal: document.getElementById('modal'),
            modalImage: document.getElementById('modal-image'),
            modalTitle: document.getElementById('modal-title'),
            modalPrompt: document.getElementById('modal-prompt'),
            closeBtn: document.getElementById('close-modal'),
            modalImgContainer: document.getElementById('modal-img-container')
        };

        // Check all required elements
        const missingElements = [];
        Object.keys(this.elements).forEach(key => {
            if (!this.elements[key]) {
                missingElements.push(key);
            }
        });

        if (missingElements.length > 0) {
            console.error('Modal elements not found:', missingElements);
            throw new Error('Modal elements missing: ' + missingElements.join(', '));
        }

        console.log('All modal elements found successfully');
        this.bindEvents();
        console.log('Modal initialization completed');
    }

    /**
     * Bind events
     */
    bindEvents() {
        // Close button event
        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => this.close());
        }

        // Click background to close
        this.elements.modal.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) {
                this.close();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    /**
     * Show modal
     * @param {Object} prompt Prompt data
     */
    async show(prompt) {
        if (this.isOpen) return;
        
        this.currentPrompt = prompt;
        this.isOpen = true;
        
        // Set content
        this.elements.modalImage.src = prompt.images.full;
        this.elements.modalTitle.textContent = prompt.title;
        this.elements.modalPrompt.textContent = this.formatPrompt(prompt.prompt);
        
        // Show modal
        this.elements.modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Preload image
        await this.preloadImage(prompt.images.full);
    }

    /**
     * Close modal
     */
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        this.currentPrompt = null;
        
        // Hide modal
        this.elements.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Clear image
        this.elements.modalImage.src = '';
    }

    /**
     * Format prompt display
     * @param {Object|string} prompt Prompt data
     * @returns {string} Formatted text
     */
    formatPrompt(prompt) {
        if (typeof prompt === 'string') {
            return prompt;
        }
        
        // If object, format display
        if (prompt.positive && prompt.negative) {
            return `【Positive Prompt】\n${prompt.positive}\n\n【Negative Prompt】\n${prompt.negative}`;
        }
        
        // Check other important fields
        if (prompt.positive) {
            return `【Positive Prompt】\n${prompt.positive}`;
        }
        
        if (prompt.negative) {
            return `【Negative Prompt】\n${prompt.negative}`;
        }
        
        // If object has other meaningful content, try to beautify display
        const keys = Object.keys(prompt);
        if (keys.length > 0) {
            let result = '';
            keys.forEach(key => {
                if (typeof prompt[key] === 'string') {
                    result += `【${key}】\n${prompt[key]}\n\n`;
                } else if (typeof prompt[key] === 'object') {
                    result += `【${key}】\n${JSON.stringify(prompt[key], null, 2)}\n\n`;
                }
            });
            return result.trim();
        }
        
        // Final fallback: JSON format
        return JSON.stringify(prompt, null, 2);
    }

    /**
     * Preload image
     * @param {string} src Image URL
     * @returns {Promise} Preload Promise
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
     * Get current prompt
     * @returns {Object|null} Current prompt
     */
    getCurrentPrompt() {
        return this.currentPrompt;
    }

    /**
     * Check if modal is open
     * @returns {boolean} Is open
     */
    isModalOpen() {
        return this.isOpen;
    }
}

// Export singleton instance
const modal = new Modal();
window.modal = modal;