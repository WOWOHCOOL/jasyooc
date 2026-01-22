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
            // 临时优先使用内联数据以确保服务器环境正常工作
            console.warn('服务器环境：优先使用内联数据确保稳定性');
            return this.getInlineData();
            
            /* 原有逻辑暂时注释
            // 首先尝试从文件加载（用于web服务器环境）
            if (window.location.protocol !== 'file:') {
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
            } else {
                // 如果是file://协议，使用内联数据
                console.warn('检测到file://协议，使用内联数据');
                return this.getInlineData();
            }
            */
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
     * 获取内联数据（用于本地文件访问）
     * @returns {Object} 提示词数据
     */
    getInlineData() {
        return {
            "metadata": {
                "version": "2.0",
                "lastUpdated": "2026-01-21",
                "totalPrompts": 9,
                "categories": 1
            },
            "categories": [
                {
                    "id": "photography",
                    "name": "摄影提示词",
                    "icon": "📷",
                    "description": "专业摄影AI提示词",
                    "prompts": [
                        {
                            "id": "photo_001",
                            "title": "路口转角反光镜",
                            "type": "portrait",
                            "difficulty": "advanced",
                            "tags": ["夜景", "自拍", "凸面镜", "8K"],
                            "description": "超精致夜景自拍提示词",
                            "prompt": {
                                "positive": "创作，最佳画质，超高清8K分辨率，清晰对焦，电影级光影，景深完美，构图精妙，获得殊榮的专业摄影风格，对细节的极致追求，精致的纹理，1:1微距特写，一位美丽的中国女偶像在夜色笼罩的城市十字路口，对着大型凸面交通安全镜距特写。她可爱的脸庞，明亮的大眼睛，精致的五官，柔顺的黑色长发，戴着白色兔耳朵发箍，脖子上围着舒适的棕白条纹围巾，甜美的偶像气质扑面而来。凸面镜的倒影呈现出十字路口的广角扭曲全景，她可爱的身影、汽车、行人、建筑物、路灯都以戏剧性的鱼眼畸变呈现。她纤细的手戴着优雅的梵克雅宝Alhambra手链（金色四叶草图案），伸出手拿着手机自拍。柔和舒适的夜色氛围，路灯和霓虹灯的温暖金光照亮了场景和镜面，展现黄金时刻的迷人风采。色调融合柔和的夜蓝色，高动态范围，逼真的玻璃凸面镜纹理，强烈的镜面反射，照片级逼真的肌肤、珠宝和金属细节，鲜艳而温馨的色彩，无文字，无水印。 ar3:4",
                                "negative": "貝面提示：低品质、模糊、脸部和手部畸形、解剖结构错误、多余肢体、变异、丑陋、复制粗糙、水印、文字、签名、曝光过度、曝光不足、卡通、3D渲染、恐怖、白天强光。"
                            },
                            "images": {
                                "thumbnail": "images/prompt/1.webp",
                                "full": "images/prompt/1.webp"
                            }
                        },
                        {
                            "id": "photo_002",
                            "title": "极简空间的向上凝视",
                            "type": "portrait",
                            "difficulty": "advanced",
                            "tags": ["俯视", "极简", "广角透视", "工作室"],
                            "description": "极简俯视内省肖像提示词",
                            "prompt": {
                                "positive": "最佳画质，8K分辨率，电影级光影，从极高角度拍摄的全身照，强烈的广角透视夸张，戴眼镜的年轻人，深棕色夹克，圆脸柔和的下颌线条，俯视视角，工作室环境，光滑无缝的地板，渐变背景",
                                "negative": "低品质，模糊，白天强光，喧闹背景，过多的杂物，不自然的透视畸变"
                            },
                            "images": {
                                "thumbnail": "images/prompt/2.webp",
                                "full": "images/prompt/2.webp"
                            }
                        },
                        {
                            "id": "photo_003",
                            "title": "活力四射的自拍",
                            "type": "portrait",
                            "difficulty": "expert",
                            "tags": ["自拍", "K-Pop", "Y2K", "偶像"],
                            "description": "超精致自拍提示词",
                            "prompt": {
                                "positive": "K-Pop偶像，圆形眼镜，甜美可爱，粉彩色调，圆形眼镜，甜美偶像气质，圆形眼镜，韩式流行风格眼妆，明亮的大眼睛，玻璃肌效果",
                                "negative": "丑陋，粗糙质感，白天强光，不自然的姿势，模糊，像素化"
                            },
                            "images": {
                                "thumbnail": "images/prompt/3.webp",
                                "full": "images/prompt/3.webp"
                            }
                        },
                        {
                            "id": "photo_004",
                            "title": "与手机原图同框的铅笔肖像",
                            "type": "portrait",
                            "difficulty": "expert",
                            "tags": ["素描", "铅笔", "写实", "艺术"],
                            "description": "提示词",
                            "prompt": "｛perfect composition, impeccable attention to detail, highest quality, rich detail, sharp focus, 8K/4K resolution, clear edges, exquisite details, perfect composition, depth of field, cinematic lighting, vibrant colors, award-winning style, professional level, perfect depiction. Create an extremely detailed, hyper-realistic 3D graphite pencil sketch depicting face of a Chinese idol girl, drawn on textured white notebook paper with clear paper quality, delicate details, and subtle imperfections. The facial sketch should be perfectly identical to reference photo displayed on an iPhone placed next to notebook. The iPhone screen clearly displays artist original portrait photograph with natural reflections and soft sunlight reflections on glass.｝",
                            "images": {
                                "thumbnail": "images/prompt/4.webp",
                                "full": "images/prompt/4.webp"
                            }
                        },
                        {
                            "id": "photo_005",
                            "title": "咖啡館的雨天小确幸",
                            "type": "portrait",
                            "difficulty": "advanced",
                            "tags": ["雨天", "咖啡馆", "暖色", "温馨"],
                            "description": "超精致自拍提示词",
                            "prompt": {
                                "positive": "年轻女子，东亚裔，柔顺的黑色长发，奶油白粗针织毛衣，咖啡馆窗边，雨天氛围，温暖的木质镶板，柔和的漫射窗光，胶片摄影风格",
                                "negative": "强光，白天，喧闹，冷色调，不自然的姿势，低品质"
                            },
                            "images": {
                                "thumbnail": "images/prompt/5.webp",
                                "full": "images/prompt/5.webp"
                            }
                        },
                        {
                            "id": "photo_006",
                            "title": "逆光发梢的温柔忧郁",
                            "type": "portrait",
                            "difficulty": "expert",
                            "tags": ["逆光", "长发", "戏剧性光线", "胶片"],
                            "description": "超精致自拍提示词",
                            "prompt": {
                                "positive": "逆光，长发，戏剧性光线，胶片质感，年轻东亚女性，回头看，深棕色夹克，长长的松散的波浪卷，强烈的背光照射，光晕效果",
                                "negative": "正面光，白天，低品质，不自然的逆光效果，模糊"
                            },
                            "images": {
                                "thumbnail": "images/prompt/6.webp",
                                "full": "images/prompt/6.webp"
                            }
                        },
                        {
                            "id": "photo_007",
                            "title": "冬日晴空下的闺蜜团",
                            "type": "group",
                            "difficulty": "expert",
                            "tags": ["团体照", "逆光", "冬日", "朋友"],
                            "description": "超精致自拍提示词",
                            "prompt": {
                                "positive": "5个女孩，圆形合影，低角度拍摄，纯蓝色天空，高key自然光，白色毛绒耳套，深色外套，黑贝雷帽，高清晰度，K-pop风格",
                                "negative": "模糊的脸部，丑陋的牙齿，坏的解剖结构，多云天空，建筑物，鱼眼畸变"
                            },
                            "images": {
                                "thumbnail": "images/prompt/7.webp",
                                "full": "images/prompt/7.webp"
                            }
                        },
                        {
                            "id": "p_mko0jg0q_",
                            "title": "粉系猫耳少女对镜自拍",
                            "type": "portrait",
                            "difficulty": "intermediate",
                            "tags": [],
                            "description": "",
                            "prompt": {
                                "positive": "{\n  \"image_generation_prompt\": {\n    \"subject\": {\n      \"demographics\": {\n        \"gender\": \"女性\",\n        \"age_group\": \"年轻成人\",\n        \"skin_tone\": \"白皙\"\n      },\n      \"hair\": {\n        \"color\": \"金色\",\n        \"length\": \"长发\",\n        \"style\": \"直发/微卷\",\n        \"accessory\": \"白色毛茸茸猫耳朵发箍\"\n      },\n      \"face\": {\n        \"expression\": {\n          \"mood\": \"俏皮\",\n          \"mouth\": \"吐舌，略带微笑\",\n          \"gaze\": \"向上看向左侧\"\n        },\n        \"makeup\": {\n          \"eyes\": \"淡妆配猫眼眼线\",\n          \"lips\": \"粉色\",\n          \"cheeks\": \"玫瑰色\",\n          \"features\": \"立体鼻梁\"\n        }\n      },\n      \"wardrobe\": {\n        \"upper_body\": {\n          \"item\": \"束身衣\",\n          \"material\": \"织锦\",\n          \"color\": \"粉色\",\n          \"details\": [\n            \"正面系带\",\n            \"镶边\"\n          ]\n        },\n        \"lower_body\": {\n          \"item\": \"迷你裙\",\n          \"pattern\": \"格纹\",\n          \"color\": \"粉色\",\n          \"details\": [\n            \"荷叶边层叠\",\n            \"白色蕾丝镶边\"\n          ]\n        },\n        \"leg_wear\": {\n          \"item\": \"过膝袜\",\n          \"color\": \"白色\",\n          \"details\": \"顶部有粉色条纹\"\n        },\n        \"accessories\": {\n          \"neck\": \"粉色项圈配小银铃\",\n          \"ears\": \"小耳钉\",\n          \"wrist\": \"精致金手链\"\n        }\n      },\n      \"pose\": {\n        \"action\": \"对镜自拍\",\n        \"hand_position\": \"右手持手机\",\n        \"posture\": \"站立\"\n      }\n    },\n    \"scene\": {\n      \"environment\": {\n        \"location\": \"现代公寓室内\",\n        \"flooring\": \"灰色木地板\",\n        \"walls\": \"灰色瓷砖区域\"\n      },\n      \"lighting\": {\n        \"source\": \"自然日光\",\n        \"direction\": \"来自落地窗\",\n        \"quality\": \"明亮\"\n      },\n      \"background_elements\": {\n        \"windows\": \"巨大落地窗，可见明亮日间城市景观与天空\",\n        \"furniture\": {\n          \"left\": \"靠墙的大棕色泰迪熊\",\n          \"right\": [\n            \"白色软垫扶手椅\",\n            \"木质边桌\",\n            \"架子上的透明玻璃花瓶\"\n          ]\n        }\n      },\n      \"foreground_elements\": {\n        \"props\": \"悬挂的绿色人造常春藤\",\n        \"overlays\": {\n          \"text_content\": \"HIII\",\n          \"text_color\": \"白色\",\n          \"position\": \"椅子附近的背景叠加\"\n        }\n      }\n    },\n    \"technical_specifications\": {\n      \"medium\": \"摄影\",\n      \"sub_genre\": \"镜子自拍\",\n      \"device_prop\": \"白色iPhone\",\n      \"composition\": \"反射呈现主体与房间环境\",\n      \"aspect_ratio\": \"2:3\"\n    }\n  }\n}"
                            },
                            "images": {
                                "thumbnail": "images/prompt/9.webp",
                                "full": "images/prompt/9.webp"
                            }
                        },
                        {
                            "id": "photo_008",
                            "title": "K-Pop偶像报纸时尚概念",
                            "type": "portrait",
                            "difficulty": "expert",
                            "tags": ["K-Pop", "报纸", "时尚", "创意"],
                            "description": "超精致自拍提示词",
                            "prompt": {
                                "positive": "韩国K-Pop偶像，无肩带迷你连衣裙，真正的再生报纸页面，建筑风格的折纸褶皱，棕褐色调的纸张，大号纤细银圈耳环，极简主义",
                                "negative": "低品质，模糊，不自然的姿势，白天强光，不对的报纸纹理"
                            },
                            "images": {
                                "thumbnail": "images/prompt/8.webp",
                                "full": "images/prompt/8.webp"
                            }
                        },
						{
  "id": "p_mko16lop_",
  "title": "瓷娃娃海岸高角度自拍",
  "type": "portrait",
  "difficulty": "intermediate",
  "tags": [
    "瓷娃娃",
    "深V",
    "海滩",
    "自拍"
  ],
  "description": "",
  "prompt": {
    "positive": "{\n  \"format\": {\n    \"type\": \"editorial\",\n    \"intent\": \"candid/selfie/accidental\",\n    \"aspect_ratio\": \"9:16\",\n    \"resolution\": \"4K\"\n  },\n  \"camera_system\": {\n    \"body\": \"iPhone 15 Pro\",\n    \"lens\": \"Main Camera\",\n    \"focal_length\": \"24mm\",\n    \"associative_traits\": \"computational photography, deep depth of field, sharp digital readout, auto-exposure\"\n  },\n  \"subject\": {\n    \"identity\": \"拥有精致瓷娃娃五官的年轻女子\",\n    \"physical_details\": \"无暇苍白肌肤，大而圆的冰蓝色眼睛配清晰睫毛，小巧立体的鼻子，中性嘟唇，铂金色双麻花辫，鲜艳蓝色美甲\",\n    \"clothing\": \"浅蓝色紧身超深V领上衣，显著露出乳沟\",\n    \"action\": \"高角度自拍视角，一手遮眼抵御海岸强光，抬头望向镜头\",\n    \"expression\": \"中性、睁大眼睛、面无表情、空洞的瓷娃娃凝视\"\n  },\n  \"lighting\": {\n    \"source\": \"明亮自然海岸日光+沙滩反光\",\n    \"direction\": \"顶部与全向填充\",\n    \"quality\": \"柔和、漫射却极亮\",\n    \"color_temp\": \"中性日光(5500K)\",\n    \"fill\": \"来自亮白沙滩反射的最大填充光\",\n    \"distribution\": \"均匀照明，极少阴影，对皮肤纹理友好\",\n    \"intent\": \"海滩明媚白日\"\n  },\n  \"environment\": {\n    \"setting\": \"日间沙滩\",\n    \"hero_materials\": [\n      {\n        \"material\": \"沙子\",\n        \"micro_detail\": \"细白颗粒，高反射\"\n      },\n      {\n        \"material\": \"布料\",\n        \"micro_detail\": \"浅蓝色泳装/弹力棉混纺\"\n      },\n      {\n        \"material\": \"肌肤\",\n        \"micro_detail\": \"光滑无毛孔，瓷质纹理，因热度微微湿润\"\n      }\n    ],\n    \"objects\": \"远处模糊的海平面，广阔沙滩\",\n    \"state\": \"明亮、阳光、海岸氛围\"\n  },\n  \"technical_finish\": {\n    \"film_stock\": \"数字源\",\n    \"exposure\": \"明亮曝光(高调)\",\n    \"grain\": \"无/数字噪点\",\n    \"tone_curve\": \"线性中性\",\n    \"color_science\": \"粉彩调色(浅蓝色、白沙滩、苍白肌肤)，自然日光色彩\"\n  },\n  \"constraints\": {\n    \"avoid\": [\n      \"雪\",\n      \"冬季衣物\",\n      \"红色指甲\",\n      \"黑色上衣\",\n      \"保守领口\",\n      \"浓重阴影\"\n    ],\n    \"must_include\": [\n      \"蓝色指甲\",\n      \"浅蓝色上衣\",\n      \"深乳沟\",\n      \"海滩背景\",\n      \"瓷娃娃五官\"\n    ]\n  }\n}"
  },
  "images": {
    "thumbnail": "images/prompt/10.webp",
    "full": "images/prompt/10.webp"
  }
},
                    ]
                }
            ]
        };
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