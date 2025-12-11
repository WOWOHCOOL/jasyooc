// --- 預設籤文庫 (完整的 60 支籤文數據) ---
const fortuneSticks = [
    {
        number: "第一籤", title: "上吉 龍虎相會", verse: "龍虎風雲際會時，雷霆震動起新機。萬事亨通皆得意，占得斯籤百不疑。",
        interpretation: "此籤為上吉之選，喻示有利的時機即將降臨。**事業：** 猶如龍虎相會，有機會大展宏圖，職位或項目展望樂觀。**財運：** 財源趨向穩健，投資宜把握新機。**婚姻：** 緣分已到，是締結良緣的良好時機。**健康：** 身體狀況有望好轉，保持活力。**學業：** 學習效率提高，成績有所進步。**尋人：** 有望獲知其消息。**失物：** 有機會尋回。",
        keywords: ['事業', '開始', '升職', '投資', '婚姻', '機遇', '順利', '前景', '貴人', '新機', '上吉', '成功']
    },
    {
        number: "第二籤", title: "中吉 欲求仙方", verse: "雲深霧罩山重重，欲求仙方問天翁。功名財利難如意，且須等到花開時。",
        interpretation: "此籤顯示目前處於觀察等待階段，切勿急躁。**事業：** 努力付出，但短期內回報不明顯，宜穩守本位。**財運：** 收入穩定，但不宜進行高風險投資。**婚姻：** 感情發展緩慢，需要更多時間培養。**健康：** 須留意身體小恙，及時調理。**學業：** 基礎需夯實，不可投機取巧。**尋人：** 暫無消息，需耐心等待。**失物：** 尋回機會不大，或需費一番周折。",
        keywords: ['等待', '緩慢', '耐心', '觀察', '穩守', '平靜', '困難', '中吉', '時間', '積蓄', '調理']
    },
    {
        number: "第三籤", title: "中平 漁翁撒網", verse: "不見魚兒滿網歸，皆因潮退水流低。一朝潮漲添舟楫，魚躍龍門自可期。",
        interpretation: "此籤喻示目前機緣未至，需等待時機。**事業：** 暫時未見成績，宜靜待市場或環境變化。**財運：** 收入平穩，不宜大額投資，等待資金回流。**婚姻：** 感情尚處於鋪墊階段，不宜強求結果。**健康：** 注意季節變化，多休息。**學業：** 努力已經足夠，欠缺的只是發揮的機會。**尋人：** 很快會有消息。**失物：** 可尋，在水中或北方。",
        keywords: ['等待', '時機', '中平', '潮漲', '努力', '積累', '耐心', '變化', '事業', '財運']
    },
    {
        number: "第四籤", title: "下籤 船行遇風", verse: "風狂雨驟急須防，船破槳折難進港。若問前途何處去，此去定然有驚慌。",
        interpretation: "此籤警示目前環境不利，須極度謹慎。**事業：** 危機重重，不宜進行任何重大改變或擴張，宜退守。**財運：** 有破財風險，投資宜立即停止。**婚姻：** 感情關係不穩定，易生爭吵或變故。**健康：** 須立即就醫檢查，注意心血管。**學業：** 壓力過大，需調整心態。**尋人：** 難尋，或情況不佳。**失物：** 難尋，已被人取走。",
        keywords: ['凶險', '危機', '困難', '下籤', '謹慎', '停止', '破財', '變故', '健康', '事業']
    },
    {
        number: "第五籤", title: "中吉 否極泰來", verse: "月老紅線兩手牽，喜鵲橋邊喜訊傳。事事如今漸順利，前途光景勝從前。",
        interpretation: "此籤為轉機之象，表示壞運已過，漸入佳境。**事業：** 困境解除，新的合作和項目將帶來轉機。**財運：** 逐漸穩定回升，適合小額投資。**婚姻：** 感情修成正果，或有喜事臨門。**健康：** 身體好轉，心情愉悅。**學業：** 學習環境改善，成績提升。**尋人：** 很快會回來。**失物：** 可找回，在西南方。",
        keywords: ['轉機', '中吉', '順利', '恢復', '喜訊', '婚姻', '事業', '財運', '健康', '機會']
    },
    {
        number: "第六籤", title: "中平 貴人指引", verse: "進退難決意彷徨，貴人指引有主張。雲開月出見分明，前途一片光明揚。",
        interpretation: "此籤提示您在困惑時應尋求外部幫助。**事業：** 面臨抉擇，多向長輩或專家請教，能做出正確決定。**財運：** 聽從理財顧問建議，避免盲目投資。**婚姻：** 雙方意見不合時，可尋求第三方協調。**健康：** 保持心情開朗，貴人幫助調整心態。**學業：** 聽取老師教誨，找到正確方法。**尋人：** 貴人能提供線索。**失物：** 需他人協助才能找到。",
        keywords: ['貴人', '指引', '抉擇', '彷徨', '請教', '協助', '光明', '中平', '決斷']
    },
    {
        number: "第七籤", title: "上吉 天賜良緣", verse: "天開地闊結良緣，千載一時此日全。占得此籤大吉利，百福駢臻萬事圓。",
        interpretation: "此籤為極佳吉籤，代表萬事順心，尤其利於婚戀。**事業：** 發展迅速，易得重要資源和合作夥伴。**財運：** 財運亨通，有意外之財。**婚姻：** 緣分已定，可速定婚期。**健康：** 身心狀態極佳，無憂無慮。**學業：** 輕易取得好成績。**尋人：** 立即相遇。**失物：** 必然尋回。",
        keywords: ['婚姻', '良緣', '大吉', '成功', '圓滿', '財運', '事業', '快速', '緣分', '喜事']
    },
    {
        number: "第八籤", title: "中下籤 守株待兔", verse: "日落烏啼半掩門，等閒空過一年春。勸君守舊方為吉，守株待兔實勞神。",
        interpretation: "此籤告誡不要空等，但也不宜輕舉妄動，宜守成。**事業：** 不宜開展新業務，守住現有成績為上策。**財運：** 收入持平，投資恐有失誤，不宜冒險。**婚姻：** 感情缺乏主動性，關係停滯不前。**健康：** 身體略顯疲憊，需主動調理。**學業：** 學習效率低下，需改變方法。**尋人：** 暫無歸期。**失物：** 難尋，已錯失良機。",
        keywords: ['守舊', '等待', '不宜動', '勞神', '停滯', '中下籤', '保守', '改變', '財運', '事業']
    },
    {
        number: "第九籤", title: "中吉 春風化雨", verse: "春風吹起柳絲長，和氣盈門百事昌。時機一到自然發，不須辛苦自奔忙。",
        interpretation: "此籤喻示時運將至，自然順利。**事業：** 處於上升期，人際關係和諧，有助於業務擴展。**財運：** 財源廣進，來自正當渠道，積累穩定。**婚姻：** 感情和睦，適合談婚論嫁。**健康：** 身心皆安，心情舒暢。**學業：** 輕鬆應對，發揮穩定。**尋人：** 不久將歸。**失物：** 有望不勞而獲。",
        keywords: ['順利', '中吉', '和睦', '上升', '擴展', '財運', '婚姻', '輕鬆', '自然', '春天']
    },
    {
        number: "第十籤", title: "中下籤 迷途知返", verse: "路險山高步步難，羊腸小徑不宜行。倘能迷途知回轉，自有無災保平安。",
        interpretation: "此籤警示目前方向錯誤，必須及時回頭。**事業：** 正在做的事情可能並非長久之計，宜重新審視方向。**財運：** 投資方向錯誤，應立即止損。**婚姻：** 關係陷入僵局，需誠實溝通或考慮暫時分開。**健康：** 需徹底改變不良習慣。**學業：** 學習方式有誤，應請教他人。**尋人：** 已走上岔路。**失物：** 無法找回，應視為教訓。",
        keywords: ['困難', '迷途', '回轉', '止損', '改變', '中下籤', '謹慎', '錯誤', '事業', '健康']
    },
    {
        number: "第十一籤", title: "中吉 鏡花水月", verse: "鏡花水月空自忙，竹籃打水一場空。若問何時得成就，靜待雲開見月明。",
        interpretation: "此籤提示目前所追求的目標可能虛幻，需調整心態和方向。**事業：** 努力付出與回報不成正比，應重新評估目標的可行性。**財運：** 避免投機和高風險項目，否則容易空手而歸。**婚姻：** 感情發展可能不切實際，需面對現實。**健康：** 注意失眠和壓力。**學業：** 學習效率不高，需專注於基礎。**尋人：** 消息虛假。**失物：** 難以追回。",
        keywords: ['虛幻', '空', '等待', '調整', '壓力', '事業', '財運', '中吉', '不切實際', '耐心']
    },
    {
        number: "第十二籤", title: "上吉 日出東方", verse: "日出東方萬里紅，前途光景盡亨通。財源滾滾如潮湧，占此必是福祿宏。",
        interpretation: "此籤為極佳吉兆，預示著一切將光明順利。**事業：** 充滿朝氣，是拓展市場和建立新項目的大好時機。**財運：** 財運極旺，投資回報豐厚。**婚姻：** 關係甜蜜，適合舉辦喜事。**健康：** 精力充沛，健康無憂。**學業：** 考運極佳，成績優異。**尋人：** 即將歸來。**失物：** 順利尋回。",
        keywords: ['大吉', '光明', '亨通', '事業', '財運', '婚姻', '機會', '成功', '拓展', '迅速']
    },
    {
        number: "第十三籤", title: "中平 靜水流深", verse: "靜水流深不見波，君子行事要低調。一帆風順無風險，福祿壽喜自相招。",
        interpretation: "此籤教導謙遜和低調是成功之道。**事業：** 雖然進展順利，但應避免鋒芒太露，以免招人妒忌。**財運：** 收入穩定增長，但勿向外透露。**婚姻：** 感情深厚，但宜保持平靜，不炫耀。**健康：** 保持規律生活，身心平和。**學業：** 默默耕耘，成績會顯現。**尋人：** 已經在安全地方。**失物：** 在家中的隱蔽處。",
        keywords: ['低調', '謙遜', '穩定', '順利', '靜水', '平靜', '中平', '事業', '財運', '安穩']
    },
    {
        number: "第十四籤", title: "中下籤 緣淺緣薄", verse: "花開花落總無情，人情冷暖世態輕。勸君不必多勞心，緣淺緣薄難共鳴。",
        interpretation: "此籤提示緣分或關係的短暫與不確定性。**事業：** 合作夥伴可能無法長久，專注於個人能力提升。**財運：** 財來財去，難以積聚。**婚姻：** 感情關係不穩定，易因誤會而分離。**健康：** 心情低落，影響身體，需自我調節。**學業：** 缺乏學習動力，需找到興趣。**尋人：** 緣分已盡，難再見。**失物：** 難尋，不必強求。",
        keywords: ['緣淺', '分離', '不穩', '短暫', '中下籤', '勞心', '感情', '合作', '財來財去']
    },
    {
        number: "第十五籤", title: "中吉 登山越嶺", verse: "登山越嶺步步高，雲霧撥開見光毫。莫謂前途多阻滯，自有神力暗中扶。",
        interpretation: "此籤喻示努力終有回報，困難只是暫時的考驗。**事業：** 雖然過程艱辛，但每一步的努力都會帶來提升和進步。**財運：** 收入隨著地位和能力的提升而增加。**婚姻：** 共同經歷困難後，感情更堅固。**健康：** 多運動有助於身體恢復。**學業：** 只要堅持，一定能克服難關。**尋人：** 正沿著路途歸來。**失物：** 在高處或山邊。",
        keywords: ['努力', '進步', '提升', '困難', '考驗', '中吉', '事業', '學業', '堅持', '回報']
    },
    {
        number: "第十六籤", title: "中平 一念之差", verse: "人情好惡只一時，莫因意氣失良機。只須心平無雜念，一念之差禍自離。",
        interpretation: "此籤提醒心態決定成敗，切勿意氣用事。**事業：** 避免與人發生爭執，平和處事才能把握良機。**財運：** 勿因一時衝動進行大額交易。**婚姻：** 感情穩定，但須克制情緒，避免口舌之爭。**健康：** 心情平靜是養生之道。**學業：** 專心一致，不受外界干擾。**尋人：** 已經在附近。**失物：** 很快可以找到，在西南方。",
        keywords: ['心態', '平和', '意氣', '避免', '爭執', '良機', '中平', '克制', '專注']
    },
    {
        number: "第十七籤", title: "中吉 猛虎出林", verse: "猛虎出林威勢壯，一聲長嘯動山崗。從今開始無阻礙，任君發揮展才能。",
        interpretation: "此籤為積極行動的信號，表示障礙已被清除。**事業：** 宜主動出擊，把握時機，展示領導力，會有突破性進展。**財運：** 財運強勁，適合積極投資和擴大業務。**婚姻：** 感情發展迅速，充滿激情和決心。**健康：** 體能達到巔峰。**學業：** 學習效率極高，能超越競爭者。**尋人：** 很快會出現。**失物：** 可迅速尋回。",
        keywords: ['積極', '行動', '突破', '威勢', '發展', '中吉', '事業', '財運', '迅速', '領導力']
    },
    {
        number: "第十八籤", title: "中下籤 緣木求魚", verse: "緣木求魚實可哀，此路不通早應開。縱然花費千般力，終究無功空手回。",
        interpretation: "此籤明確指出方向錯誤，付出再多也無濟於事。**事業：** 目前的策略或項目是錯誤的，應及時調整方向，避免浪費資源。**財運：** 投資標的錯誤，應果斷止損，尋求專業意見。**婚姻：** 感情投入無法得到回應，需理性評估關係。**健康：** 治療方式可能不對，需諮詢第二意見。**學業：** 方法無效，徒勞無功。**尋人：** 難尋，方向錯誤。**失物：** 不可能尋回。",
        keywords: ['錯誤', '無效', '徒勞', '停止', '中下籤', '財運', '事業', '調整', '浪費']
    },
    {
        number: "第十九籤", title: "上吉 金玉滿堂", verse: "金玉滿堂福祿全，榮華富貴得天然。佔得此籤事事好，家門和睦樂團圓。",
        interpretation: "此籤為財富和家庭和諧的吉兆。**事業：** 處於穩定成長和收穫期，名利雙收。**財運：** 財富積累快速且穩定，適合長期規劃。**婚姻：** 家庭和睦，關係幸福美滿。**健康：** 長久安康，身心愉悅。**學業：** 學習環境理想，成績穩定上升。**尋人：** 很快就會團聚。**失物：** 可在家庭範圍內尋回。",
        keywords: ['金玉', '財富', '家庭', '和睦', '穩定', '上吉', '事業', '收穫', '幸福', '長期']
    },
    {
        number: "第二十籤", title: "中平 困龍得水", verse: "困龍得水變化新，雲開月出見清明。前途有望皆如意，只待風雲際會時。",
        interpretation: "此籤喻示困境即將結束，轉機在望，但仍需等待啟動時機。**事業：** 之前的限制和阻礙將被解除，新的發展空間出現。**財運：** 資金回流，適合重新開始投資。**婚姻：** 誤會冰釋，關係恢復。**健康：** 舊疾好轉，恢復元氣。**學業：** 壓力減輕，學習效率提升。**尋人：** 很快會擺脫困境。**失物：** 有望找回。",
        keywords: ['困境', '解除', '轉機', '希望', '等待', '中平', '事業', '恢復', '冰釋', '風雲']
    },
    {
        number: "第二十一籤", title: "中吉 柳暗花明", verse: "柳暗花明又一村，山窮水盡不須愁。若能堅定向前進，自然有路通津頭。",
        interpretation: "此籤鼓勵在絕望時堅持，轉機就在眼前。**事業：** 遇到瓶頸時不要放棄，換個角度或方法會有新的出路。**財運：** 財務壓力大，但會找到新的收入來源。**婚姻：** 感情出現危機，但通過溝通能找到新的相處模式。**健康：** 保持樂觀，病情會出現轉折。**學業：** 突破學習障礙。**尋人：** 在意想不到的地方找到。**失物：** 在絕望時尋回。",
        keywords: ['瓶頸', '轉折', '柳暗花明', '堅持', '希望', '中吉', '出路', '溝通', '事業', '健康']
    },
    {
        number: "第二十二籤", title: "下籤 孤舟無援", verse: "孤舟無援在海中，浪急風高難從容。求神問卜徒增憂，不如自己靠自躬。",
        interpretation: "此籤警示目前處於孤立無援的狀態，不宜依賴他人。**事業：** 合作關係破裂，項目獨自承擔，壓力巨大。**財運：** 投資損失無法得到補償，應靠自己儲蓄。**婚姻：** 關係疏離，雙方缺乏支持。**健康：** 情況不佳，需主動尋求專業治療。**學業：** 只能依靠自學。**尋人：** 處境艱難，無法聯繫。**失物：** 難以找回。",
        keywords: ['孤立', '無援', '壓力', '艱難', '下籤', '獨自', '事業', '損失', '疏離', '自躬']
    },
    {
        number: "第二十三籤", title: "中平 潮起潮落", verse: "潮起潮落皆有時，月盈月虧豈無期。休將成敗論英雄，萬事循環從頭始。",
        interpretation: "此籤教導接受事物的規律和循環，不必執著於一時的得失。**事業：** 接受低潮期，準備迎接下一波高潮，穩定發展。**財運：** 收入有波動，保持平常心。**婚姻：** 關係經過起伏，最終趨於平靜。**健康：** 慢性病需長期調養。**學業：** 勿因一時成績波動而氣餒。**尋人：** 會在循環的某個時間點出現。**失物：** 難尋，但會以另一種方式補償。",
        keywords: ['循環', '規律', '平常心', '波動', '中平', '接受', '穩定', '長期', '事業', '財運']
    },
    {
        number: "第二十四籤", title: "上吉 百花齊放", verse: "百花齊放滿庭芳，萬紫千紅喜氣揚。占得此籤大吉利，處處皆是好風光。",
        interpretation: "此籤為大興旺、多方面成功的吉兆。**事業：** 多個項目或合作同時獲得成功，名聲大振。**財運：** 多元收入，財富快速增長。**婚姻：** 眾多選擇中找到佳偶，或家庭添丁。**健康：** 身體極佳，充滿生機。**學業：** 全面優秀，表現出色。**尋人：** 很快在熱鬧處出現。**失物：** 可迅速尋回。",
        keywords: ['成功', '多方面', '興旺', '大吉', '快速', '事業', '財富', '多元', '喜氣', '機會']
    },
    {
        number: "第二十五籤", title: "中下籤 枯木逢春", verse: "枯木逢春尚待時，眼前景物總淒迷。勸君不必多勞心，人事紛爭惹是非。",
        interpretation: "此籤警示雖然有恢復的可能，但過程緩慢且易有口舌爭議。**事業：** 項目重啟緩慢，需耐心處理人際糾紛。**財運：** 資金回籠慢，避免與人有借貸關係。**婚姻：** 感情容易因小事爭吵，需保持距離和空間。**健康：** 恢復期長，忌操勞。**學業：** 學習環境不佳，易受干擾。**尋人：** 暫時消息不確定。**失物：** 難尋，多因人為因素。",
        keywords: ['緩慢', '爭吵', '是非', '人際', '中下籤', '耐心', '恢復', '操勞', '事業', '健康']
    },
    {
        number: "第二十六籤", title: "中吉 否去泰來", verse: "否去泰來不用疑，花開結實正及時。占得此籤皆如意，財源廣進祿自隨。",
        interpretation: "此籤喻示壞運已盡，好運降臨，是收穫成果的時候。**事業：** 過去的努力現在開始產生回報，是簽訂合同的好時機。**財運：** 收入豐厚，可考慮新的投資佈局。**婚姻：** 關係穩定，適合邁入下一階段。**健康：** 身體狀態良好，精神煥發。**學業：** 成果顯著。**尋人：** 很快傳來好消息。**失物：** 立即找回。",
        keywords: ['收穫', '回報', '中吉', '簽約', '穩定', '財源', '事業', '成功', '及時', '努力']
    },
    {
        number: "第二十七籤", title: "中平 一葉知秋", verse: "一葉落知天下秋，萬事變化在心頭。不用勞心空計較，順應天時自無憂。",
        interpretation: "此籤教導順應自然規律，看清事物的發展趨勢。**事業：** 掌握市場變化，順勢而為，不必逆流而上。**財運：** 根據趨勢調整投資組合，保守為宜。**婚姻：** 關係發展順其自然，不強求。**健康：** 注意換季時節的保養。**學業：** 領悟力強，效率高。**尋人：** 情況變化很快。**失物：** 難以找回，順其自然。",
        keywords: ['順應', '變化', '規律', '保守', '心態', '中平', '事業', '趨勢', '領悟']
    },
    {
        number: "第二十八籤", title: "中下籤 緣淺難聚", verse: "長江後浪推前浪，新人勝舊舊人傷。莫問前緣今何在，緣淺難聚空惆悵。",
        interpretation: "此籤提示關係或時局的更迭，有分離和失落之意。**事業：** 競爭激烈，後起之秀不斷出現，需不斷學習和創新。**財運：** 資金流失，需注意投資風險。**婚姻：** 舊的關係難以維繫，或有新人介入，心境失落。**健康：** 情緒低落影響身體。**學業：** 學習壓力大，注意比較心態。**尋人：** 難再相見。**失物：** 不可復得。",
        keywords: ['分離', '更迭', '競爭', '失落', '中下籤', '創新', '學習', '婚姻', '財運']
    },
    {
        number: "第二十九籤", title: "上吉 春暖花開", verse: "春暖花開萬物生，雨露滋潤百業興。占得此籤時運到，發達亨通喜盈門。",
        interpretation: "此籤為百業興旺，機運成熟的吉兆。**事業：** 處於最佳發展期，適合啟動大項目和擴大團隊。**財運：** 財運旺盛，投資順利，收入翻倍。**婚姻：** 感情穩定，適合結婚或生育。**健康：** 身體強壯，充滿活力。**學業：** 靈感不斷，輕鬆達標。**尋人：** 馬上相見。**失物：** 可迅速找回。",
        keywords: ['興旺', '大吉', '發展', '發達', '事業', '財運', '婚姻', '機運', '快速', '成功']
    },
    {
        number: "第三十籤", title: "中平 雲遮月影", verse: "雲遮月影夜漫漫，獨自徘徊在江邊。勸君不必多憂慮，撥開雲霧見青天。",
        interpretation: "此籤喻示雖然目前處於迷茫或困境，但只是暫時的。**事業：** 項目進展不明確，多與資深人士溝通，很快能找到突破口。**財運：** 財務狀況有些混亂，宜整理賬目。**婚姻：** 感情出現誤會，需主動解釋。**健康：** 保持樂觀，憂慮是健康大敵。**學業：** 學習缺乏方向感。**尋人：** 很快有確切消息。**失物：** 在家中陰暗處。",
        keywords: ['迷茫', '暫時', '困境', '憂慮', '溝通', '中平', '整理', '解釋', '希望']
    },
    {
        number: "第三十一籤", title: "中吉 鯉魚化龍", verse: "鯉魚化龍躍龍門，一躍衝霄變不凡。從此事業皆如意，名利雙收天下傳。",
        interpretation: "此籤預示重大的轉變和成功，地位或身份將發生質的飛躍。**事業：** 將迎來重要突破，職位高升，獲得業界認可。**財運：** 收入和地位同步提升，財運極佳。**婚姻：** 關係將有一個飛躍性的發展，得到親友祝福。**健康：** 身體狀態極佳，充滿能量。**學業：** 考上理想學校或獲得重要證書。**尋人：** 將以全新的身份出現。**失物：** 難以找回，但會有更好的替代。",
        keywords: ['轉變', '成功', '飛躍', '升職', '名利', '中吉', '事業', '學業', '財運', '突破']
    },
    {
        number: "第三十二籤", title: "下籤 落花流水", verse: "落花流水總無情，人面不知何處尋。勸君回頭莫貪戀，徒勞無功損精神。",
        interpretation: "此籤警示失意和徒勞，應學會放手。**事業：** 項目失敗或合作破裂，不宜強行挽回，應果斷放手。**財運：** 資金流失嚴重，不宜再追加投入。**婚姻：** 感情已無法挽回，不宜執著。**健康：** 精神受創，導致身體虛弱。**學業：** 努力方向錯誤。**尋人：** 難以找回，關係已變。**失物：** 徹底失去。",
        keywords: ['失敗', '破裂', '放手', '徒勞', '下籤', '損失', '精神', '虛弱', '執著']
    },
    {
        number: "第三十三籤", title: "中平 孤雁離群", verse: "孤雁離群獨自飛，前途渺茫兩相違。若問何時得相聚，等到蘆花滿地時。",
        interpretation: "此籤喻示目前處於孤獨和迷茫狀態，但這是暫時的。**事業：** 缺乏合作夥伴，獨自奮鬥，感到壓力。**財運：** 只能依靠個人收入，積累緩慢。**婚姻：** 感情關係有隔閡或遠距離，相聚困難。**健康：** 注意情緒低落和抑鬱傾向。**學業：** 適合獨立研究。**尋人：** 在遠方，暫時不會回來。**失物：** 難尋，在偏僻處。",
        keywords: ['孤獨', '獨自', '迷茫', '壓力', '暫時', '中平', '緩慢', '遠距離', '情緒']
    },
    {
        number: "第三十四籤", title: "中吉 乘風破浪", verse: "乘風破浪濟滄海，一帆風順自無憂。占得此籤皆大吉，財源滾滾不用求。",
        interpretation: "此籤為積極順利的吉兆，形容充滿信心和能力去達成目標。**事業：** 處於強勁的發展勢頭，可以大膽推進計劃。**財運：** 收入穩定且豐厚，適合擴大投資規模。**婚姻：** 感情關係進展順利，目標一致。**健康：** 身體強健，精力旺盛。**學業：** 學習狀態極佳，自信滿滿。**尋人：** 乘興而歸。**失物：** 很快在水邊或交通工具上尋回。",
        keywords: ['順利', '中吉', '信心', '大膽', '推進', '事業', '財運', '強勁', '目標']
    },
    {
        number: "第三十五籤", title: "上吉 明月當空", verse: "明月當空照四方，光芒萬丈耀輝煌。占得此籤萬事好，貴人指引更無妨。",
        interpretation: "此籤喻示光明普照，一切順遂，且有貴人相助。**事業：** 發展清晰，目標明確，能獲得高層或重要人物的賞識和幫助。**財運：** 收入穩定且來源光明，財富增長迅速。**婚姻：** 關係公開透明，得到親友支持。**健康：** 身體無恙，心境開闊。**學業：** 智慧開啟，學有所成。**尋人：** 貴人會引導相見。**失物：** 可迅速尋回，在顯眼處。",
        keywords: ['光明', '貴人', '指引', '清晰', '上吉', '事業', '財富', '支持', '成功', '迅速']
    },
    {
        number: "第三十六籤", title: "中下籤 雨過天晴", verse: "雨過天青雲未散，風吹浪打尚未平。若問前途何時好，還須等到月圓盈。",
        interpretation: "此籤提示困難已經過去，但仍需要一段時間才能完全恢復。**事業：** 危機解除，但市場尚未完全穩定，宜保持謹慎和觀察。**財運：** 損失已停止，但資金回籠緩慢。**婚姻：** 爭吵結束，但關係仍需時間修復。**健康：** 恢復期長，需要靜養。**學業：** 雖然有進步，但仍需努力。**尋人：** 消息不確定，需等待時機。**失物：** 難尋，需花費時間。",
        keywords: ['恢復', '緩慢', '等待', '謹慎', '觀察', '中下籤', '時間', '修復', '靜養']
    },
    {
        number: "第三十七籤", title: "中平 鶴立雞群", verse: "鶴立雞群眾不同，智慧超群名利榮。只因才華太出眾，恐有小人暗中攻。",
        interpretation: "此籤喻示才華出眾，但需提防妒忌和小人。**事業：** 表現突出，容易被器重，但也易受同事排擠，宜謙遜。**財運：** 收入優於常人，但需低調處理。**婚姻：** 感情受外界干擾，需堅定立場。**健康：** 注意因壓力引起的焦慮。**學業：** 表現優異，但需警惕競爭者。**尋人：** 在人群中很顯眼。**失物：** 被小人藏匿，難以尋回。",
        keywords: ['才華', '出眾', '小人', '妒忌', '謙遜', '中平', '事業', '壓力', '警惕']
    },
    {
        number: "第三十八籤", title: "中吉 緣分注定", verse: "前世因緣今生聚，月老紅線早已牽。不須勞心空計較，緣分注定美滿全。",
        interpretation: "此籤強調緣分的不可抗拒性，一切都是最好的安排。**事業：** 合作夥伴是注定的貴人，應珍惜。**財運：** 財源來自於既有的關係或合作。**婚姻：** 緣定三生，感情自然而然會走向美滿。**健康：** 心態平和，順其自然。**學業：** 學習是天賦的展現。**尋人：** 很快在宿命的安排下相遇。**失物：** 難以找回，但可能是命中註定要失去。",
        keywords: ['緣分', '注定', '美滿', '合作', '婚姻', '中吉', '順其自然', '平和', '珍惜']
    },
    {
        number: "第三十九籤", title: "中下籤 山高水遠", verse: "山高水遠路難行，進退兩難心不定。勸君駐足莫強求，退守保平安為上。",
        interpretation: "此籤警示前路艱難，不宜強行推進，應暫時停止。**事業：** 目標難以達成，應縮減規模，避免損失。**財運：** 資金鏈可能緊張，不宜借貸或投資。**婚姻：** 關係出現危機，宜暫時冷靜分開，不要強求。**健康：** 需長途跋涉或勞心，注意身體。**學業：** 難以專心致志。**尋人：** 距離遙遠，歸期未定。**失物：** 難以找回。",
        keywords: ['艱難', '停止', '退守', '中下籤', '損失', '冷靜', '危機', '事業', '財運']
    },
    {
        number: "第四十籤", title: "中吉 和氣生財", verse: "和氣生財是真理，家中老幼盡歡顏。若問財源何處有，只在笑語談笑間。",
        interpretation: "此籤強調家庭和睦與良好的人際關係帶來財富和順利。**事業：** 應重視團隊合作和客戶關係，以和為貴。**財運：** 財源來自人脈和關係，通過合作獲得。**婚姻：** 關係和睦，家庭是最大的支持。**健康：** 心情愉悅，自然健康。**學業：** 在集體討論中獲得進步。**尋人：** 很快在聚會中出現。**失物：** 在家中找到。",
        keywords: ['和睦', '人際', '合作', '財源', '支持', '中吉', '家庭', '事業', '愉悅']
    },
    {
        number: "第四十一籤", title: "中平 一時糊塗", verse: "一時糊塗心不定，錯把魚目當珍珠。幸有貴人來指點，方知此寶價不同。",
        interpretation: "此籤警示因一時判斷失誤而犯錯，但有機會得到指正。**事業：** 誤判了項目價值，需虛心接受前輩的意見。**財運：** 投資失誤，需及時止損，聽從專業建議。**婚姻：** 錯愛或誤會，有貴人介入幫助釐清。**健康：** 因判斷失誤延誤治療。**學業：** 選錯專業或方向。**尋人：** 貴人能找到線索。**失物：** 已錯過最好的尋找時機。",
        keywords: ['失誤', '糊塗', '貴人', '指點', '釐清', '中平', '判斷', '事業', '投資']
    },
    {
        number: "第四十二籤", title: "上吉 撥雲見日", verse: "撥開雲霧見青天，積壓已久事得宣。從今開始多順利，事事如意喜連連。",
        interpretation: "此籤喻示長久的困境或冤屈終獲解決，前景一片光明。**事業：** 糾紛解決，項目可以重新啟動並順利發展。**財運：** 積壓的欠款或收益得以回籠。**婚姻：** 誤會解除，關係重修舊好。**健康：** 困擾已久的舊疾將會好轉。**學業：** 難題迎刃而解。**尋人：** 消息公開透明。**失物：** 很快找回。",
        keywords: ['解決', '順利', '光明', '上吉', '事業', '財運', '恢復', '喜悅', '重啟']
    },
    {
        number: "第四十三籤", title: "中下籤 風中燈火", verse: "風中燈火搖曳時，忽明忽滅難支持。問君如何保平安，堅守本心莫變移。",
        interpretation: "此籤警示環境變動劇烈，個人力量難以抵抗，需堅守原則。**事業：** 市場極不穩定，不宜擴張或冒險，固守現狀。**財運：** 收入不穩定，需保守理財，避免投機。**婚姻：** 感情關係脆弱，易受外界影響，需堅定信念。**健康：** 情緒波動大，導致身體不適。**學業：** 專注力分散。**尋人：** 情況危急，需儘快尋求幫助。**失物：** 難以找回。",
        keywords: ['不穩', '脆弱', '變動', '堅守', '保守', '中下籤', '事業', '財運', '情緒']
    },
    {
        number: "第四十四籤", title: "中吉 守得雲開", verse: "守得雲開見月明，枯木逢春再發榮。此時進退皆如意，謀望求財總稱心。",
        interpretation: "此籤喻示經過漫長等待後，終於迎來成功的時機。**事業：** 之前停滯的項目可以重新啟動，且將順利。**財運：** 資金回籠，收益超出預期。**婚姻：** 關係經歷考驗後更加堅固。**健康：** 舊疾完全康復。**學業：** 努力終得回報。**尋人：** 很快歸來。**失物：** 可找回。",
        keywords: ['等待', '成功', '時機', '恢復', '中吉', '事業', '財運', '重新', '順利']
    },
    {
        number: "第四十五籤", title: "中平 踏實耕耘", verse: "一分耕耘一分收，不必妄想空計謀。若是勤力加努力，福祿自然不遠求。",
        interpretation: "此籤教導踏實努力，不投機取巧，靠實力獲得成功。**事業：** 成功來自日常的積累和努力，沒有捷徑。**財運：** 收入與付出成正比，不宜妄想暴利。**婚姻：** 關係需細心經營，日久見人心。**健康：** 透過運動和規律飲食維護健康。**學業：** 紮實基礎是關鍵。**尋人：** 訊息需一步步核實。**失物：** 難以找回，是因疏忽所致。",
        keywords: ['踏實', '努力', '積累', '實力', '耕耘', '中平', '事業', '健康', '經營']
    },
    {
        number: "第四十六籤", title: "中吉 小人遠離", verse: "小人遠離君子近，是非紛爭自不聞。前途坦蕩無限好，舉步高昇更超群。",
        interpretation: "此籤喻示人際環境將得到淨化，有貴人相助，發展順利。**事業：** 內部環境改善，得到重要人物支持，發展空間擴大。**財運：** 避免了因小人導致的破財風險，收入穩定。**婚姻：** 關係不受外界干擾，專注於兩人世界。**健康：** 心情舒暢，遠離煩惱。**學業：** 專心致志，成績突出。**尋人：** 很快在友善的環境中找到。**失物：** 難尋，多因人為。",
        keywords: ['小人', '遠離', '貴人', '淨化', '順利', '中吉', '事業', '人際', '提升']
    },
    {
        number: "第四十七籤", title: "下籤 守口如瓶", verse: "口舌是非日日有，無心之言惹禍端。勸君守口要如瓶，是非爭議自然散。",
        interpretation: "此籤警示口舌是非帶來的風險，需謹言慎行。**事業：** 避免評論他人，專注於自己的工作，否則易捲入辦公室政治。**財運：** 避免與人合夥或保證，遠離是非。**婚姻：** 爭吵多由言辭不慎引起，需控制情緒。**健康：** 易因上火或壓力導致口腔問題。**學業：** 專心聽講，少與人爭辯。**尋人：** 消息混亂，無法確定。**失物：** 難尋，多因人際糾紛。",
        keywords: ['是非', '口舌', '爭議', '謹言', '下籤', '避免', '爭吵', '事業', '人際']
    },
    {
        number: "第四十八籤", title: "中平 順水行舟", verse: "順水行舟自無憂，不必勞心空計謀。前途自有神明佑，一切皆從自然流。",
        interpretation: "此籤教導順應大勢，不必過度操心，順其自然即可。**事業：** 抓住目前的良好趨勢，自然能順利推進，避免畫蛇添足。**財運：** 投資跟隨市場大勢，保守為宜。**婚姻：** 關係穩定，不需刻意經營，順其自然發展。**健康：** 保持規律生活，身心安適。**學業：** 找到適合自己的節奏。**尋人：** 很快在順利的環境中找到。**失物：** 可找回，在河流或水邊。",
        keywords: ['順應', '自然', '穩定', '保守', '趨勢', '中平', '事業', '生活', '節奏']
    },
    {
        number: "第四十九籤", title: "中吉 否極泰來", verse: "否極泰來不用疑，困苦艱辛總過去。從今開始運氣轉，一帆風順自如意。",
        interpretation: "此籤明確表示所有的困境已結束，好運即將到來。**事業：** 限制解除，項目將會加速推進，獲得成功。**財運：** 過去的虧損將得到彌補，資金回籠。**婚姻：** 關係中的矛盾消除，重新開始。**健康：** 身體完全恢復元氣。**學業：** 學習效率和成果大幅提高。**尋人：** 擺脫困境歸來。**失物：** 可找回，且會帶來驚喜。",
        keywords: ['困境', '結束', '轉運', '恢復', '成功', '中吉', '事業', '財運', '加速', '彌補']
    },
    {
        number: "第五十籤", title: "下籤 守成安份", verse: "日出月落幾多時，勸君守成分安居。若問前途何時好，須待猴子脫袍衣。",
        interpretation: "此籤警示目前不宜冒險，宜安分守己，等待變革的時機。**事業：** 避免任何變動或擴張，守住現有市場和客戶。**財運：** 收入穩定，但不宜有任何投資投機行為。**婚姻：** 關係平淡，缺乏激情，宜保持現狀。**健康：** 容易疲勞，需保持規律生活。**學業：** 成績平穩，缺乏突破。**尋人：** 難尋，需等待特殊時機。**失物：** 難以找回，是因貪心所致。",
        keywords: ['守成', '安分', '等待', '不宜動', '平穩', '下籤', '事業', '財運', '規律', '疲勞']
    },
    {
        number: "第五十一籤", title: "中平 謙受益滿招損", verse: "謙受益兮滿招損，戒之在心莫放縱。若問前途何處去，只須低頭莫逞能。",
        interpretation: "此籤教導謙虛的重要性，提醒避免自滿和驕傲。**事業：** 順利時更要保持低調，聽取不同的意見，避免獨斷。**財運：** 收入穩定，切勿炫耀，以免引起不必要的風險。**婚姻：** 關係中保持謙讓，避免爭強好勝。**健康：** 保持平和心態。**學業：** 謙虛向學，避免驕傲。**尋人：** 保持低調才能找到。**失物：** 難以找回，是因疏忽。",
        keywords: ['謙虛', '低調', '自滿', '避免', '中平', '事業', '財運', '謙讓', '平和']
    },
    {
        number: "第五十二籤", title: "中吉 福德綿長", verse: "福德綿長天自佑，行善積德喜無憂。若問前程皆順利，一切成就不用愁。",
        interpretation: "此籤強調品德和善行帶來的福報，一切皆在神明庇佑之下。**事業：** 事業順利，貴人多助，因平日積善而獲得良好聲譽。**財運：** 財源來自正道，收入穩定且富足。**婚姻：** 關係和睦，家庭幸福，因善緣而結。**健康：** 長久安康，身心平靜。**學業：** 學習成果源自勤奮。**尋人：** 善緣相助，很快找到。**失物：** 很快歸還。",
        keywords: ['福德', '行善', '順利', '庇佑', '中吉', '事業', '財運', '和睦', '安康', '貴人']
    },
    {
        number: "第五十三籤", title: "中下籤 虛花不實", verse: "虛花不實總難持，猶如海市蜃樓時。勸君早早知回頭，免得一場空歡喜。",
        interpretation: "此籤警示目標或事物虛假不實，應及時抽身。**事業：** 項目或合作可能是空頭支票，應仔細核實，避免浪費時間。**財運：** 投資項目過於美好，可能隱藏巨大風險，宜果斷撤資。**婚姻：** 感情發展基礎不牢固，應面對現實。**健康：** 藥物或治療方案可能無效。**學業：** 所學知識不實用。**尋人：** 消息虛假。**失物：** 徹底失去，一場空。",
        keywords: ['虛假', '不實', '撤資', '風險', '中下籤', '回頭', '浪費', '事業', '財運']
    },
    {
        number: "第五十四籤", title: "中平 舊瓶新酒", verse: "舊瓶新酒味不同，人事更迭意難通。勸君莫貪戀舊情，放下包袱向前衝。",
        interpretation: "此籤教導接受改變，放下過去的執著，迎接新的開始。**事業：** 舊的模式需要注入新元素，放下過去的成功經驗，創新發展。**財運：** 過去的投資方式已不適用，需調整策略。**婚姻：** 關係需要更新，放下舊日爭執。**健康：** 改變不良習慣。**學業：** 學習新知識和技術。**尋人：** 關係需要重新定義。**失物：** 難以找回，是為了讓您向前看。",
        keywords: ['改變', '創新', '放下', '舊情', '中平', '調整', '事業', '技術', '重新']
    },
    {
        number: "第五十五籤", title: "中吉 雙喜臨門", verse: "雙喜臨門樂無邊，求財謀望兩周全。若問婚姻和合事，天作之合美姻緣。",
        interpretation: "此籤為大吉之兆，預示多重喜事降臨，尤其利於婚戀。**事業：** 同時獲得兩個重要的成功或合作機會。**財運：** 收入來源增加，財富雙豐收。**婚姻：** 緣分極佳，是結婚或添丁的大好時機。**健康：** 身心愉悅，充滿福氣。**學業：** 考試或申請雙雙成功。**尋人：** 兩位同時歸來。**失物：** 找回一件，另一件也有好消息。",
        keywords: ['雙喜', '喜事', '婚姻', '合作', '財富', '中吉', '事業', '成功', '緣分', '周全']
    },
    {
        number: "第五十六籤", title: "中下籤 畫餅充飢", verse: "畫餅充飢不可為，徒勞無功自心悲。勸君早覓真糧食，莫在虛幻費力氣。",
        interpretation: "此籤警示目標不切實際或方法錯誤，應尋求實際的解決方案。**事業：** 項目只是空想，缺乏實際可行性，應立即調整。**財運：** 避免夢想暴富的投機行為，應腳踏實地。**婚姻：** 感情關係建立在幻想之上，缺乏現實基礎。**健康：** 尋求實際有效的治療。**學業：** 學習方法需要落地。**尋人：** 消息虛假。**失物：** 難以找回。",
        keywords: ['虛幻', '不實', '空想', '調整', '中下籤', '腳踏實地', '事業', '財運', '現實']
    },
    {
        number: "第五十七籤", title: "中平 危機警示", verse: "危機暗藏在順利，得意之時需警惕。凡事小心方為吉，樂極生悲悔已遲。",
        interpretation: "此籤提示在順利時更要保持警惕，不要得意忘形。**事業：** 發展順利，但需注意合同細節或潛在的法律風險。**財運：** 收入增加時，更要控制開支，避免高風險投資。**婚姻：** 關係穩定，但需避免因疏忽而產生矛盾。**健康：** 注意因飲食放縱導致的身體不適。**學業：** 保持謙虛。**尋人：** 很快會回來，但需注意安全。**失物：** 可找回，但可能隱藏危機。",
        keywords: ['危機', '警惕', '小心', '順利', '中平', '低調', '事業', '財運', '風險', '細節']
    },
    {
        number: "第五十八籤", title: "中吉 喜氣洋洋", verse: "喜氣洋洋樂開顏，前途如意事周全。財源廣進祿自來，吉星高照保安然。",
        interpretation: "此籤為歡樂和順利的吉兆，表示萬事皆在掌控之中。**事業：** 發展穩定且令人滿意，團隊合作愉快。**財運：** 收入穩定增長，財務狀況良好。**婚姻：** 關係和睦，適合社交和慶祝活動。**健康：** 身體強健，心情愉快。**學業：** 考運佳，成績突出。**尋人：** 很快在聚會中出現。**失物：** 可迅速找回。",
        keywords: ['喜悅', '順利', '穩定', '中吉', '事業', '財運', '和睦', '慶祝', '團隊']
    },
    {
        number: "第五十九籤", title: "中平 變通之道", verse: "變通之道活水來，死守舊法必生災。勸君審時度勢變，方能前行無阻礙。",
        interpretation: "此籤教導靈活應變，不能墨守成規，變則通。**事業：** 現有策略需要根據環境變化進行調整和創新。**財運：** 投資應靈活調整，分散風險，不能固執己見。**婚姻：** 關係需要不斷創新和溝通，避免僵化。**健康：** 改變生活習慣，尋求新的調理方式。**學業：** 學習方法需要多樣化。**尋人：** 需改變尋找方式。**失物：** 難以找回，是為了讓您改變。",
        keywords: ['變通', '創新', '調整', '靈活', '中平', '事業', '策略', '風險', '溝通']
    },
    {
        number: "第六十籤", title: "上吉 圓滿無缺", verse: "六十甲子盡循環，花開富貴喜相迎。萬事皆已圓滿矣，從此無憂樂太平。",
        interpretation: "此籤為最吉之籤，代表階段性的圓滿結束和完美開端。**事業：** 達到預期目標，可準備迎接更高層次的挑戰。**財運：** 財務狀況穩固，心境平和。**婚姻：** 關係有望走向美滿幸福的狀態。**健康：** 身體狀況佳，精神煥發。**學業：** 獲得良好的學術成就。**尋人：** 關係最終將獲得圓滿的結局。**失物：** 即使失去，也有更好的替代品出現，結局完美。",
        keywords: ['圓滿', '結束', '開始', '完美', '幸福', '最終', '最高', '太平', '挑戰', '富貴', '上吉', '無缺', '心想事成']
    }
];


// --- 匹配權重配置 (保持不變) ---
const WEIGHTS = {
    '事業': ['工作', '職位', '升職', '跳槽', '發展', '創業', '公司', '業務', '職場'],
    '財運': ['錢', '財富', '投資', '買房', '股票', '賺錢', '收入', '資金', '債務', '理財', '利潤'],
    '婚姻': ['姻緣', '愛情', '感情', '戀愛', '結婚', '復合', '對象', '緣分', '伴侶', '家庭', '關係'],
    '健康': ['病', '身體', '健康', '康復', '生病', '治療', '長壽', '平安', '檢查', '疾病'],
    '學業': ['考試', '學習', '成績', '深造', '留學', '讀書', '升學', '畢業', '論文', '學校'],
    '尋人': ['找人', '失蹤', '走失', '尋找', '歸來', '人在哪', '朋友', '親人'],
    '失物': ['丟', '不見', '失物', '找回', '遺失', '物品', '貴重'],
    
    '正面意圖': ['順利', '成功', '好嗎', '能', '可以', '是否', '快點', '何時', '開始', '有望', '得到'],
    '負面意圖': ['風險', '危機', '失敗', '不好', '怎麼辦', '停止', '難嗎', '避免', '結束', '會失去', '嚴重'],
};


// --- 確定性隨機數生成器 (PRNG) ---
function seededRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; 
    }
    
    let x = (hash * 0x7fffffff) & 0xfffffff;

    return function() {
        x = (x * 9301 + 49297) % 233280;
        return x / 233280;
    };
}


// --- 生成唯一的查詢種子 (Seed) ---
function generateQuerySeed(query) {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    const cleanQuery = query.trim().replace(/[^\w\s]/gi, '').toLowerCase(); 
    
    const queryKey = `fortune-result-${dateStr}-${cleanQuery}`;
    const seed = `${dateStr}:${cleanQuery}:jasyooc_v1`; 

    return { queryKey, seed };
}


/**
 * 根據權重分數進行 確定性選擇
 */
function deterministicSelect(scoredSticks, nextRandom) {
    const totalScore = scoredSticks.reduce((sum, stick) => sum + stick.score, 0);
    let randomNum = nextRandom() * totalScore; 
    
    for (const stick of scoredSticks) {
        randomNum -= stick.score;
        if (randomNum < 0) {
            return stick;
        }
    }
    
    return scoredSticks.sort((a, b) => b.score - a.score)[0];
}


/**
 * 根據使用者問題計算每支籤文的權重分數。
 */
function calculateStickScores(query) {
    const scores = [];
    const normalizedQuery = query.toLowerCase().replace(/\s/g, ''); 

    // 1. 識別使用者問題意圖
    let userIntent = '中性意圖';
    if (WEIGHTS['正面意圖'].some(word => normalizedQuery.includes(word))) {
        userIntent = '正面意圖';
    } else if (WEIGHTS['負面意圖'].some(word => normalizedQuery.includes(word))) {
        userIntent = '負面意圖';
    }
    
    // 2. 遍歷所有籤文，計算分數
    fortuneSticks.forEach((stick) => {
        let score = 0;
        
        // A. 核心關鍵詞匹配得分 (10分/詞)
        // 🚨 修正：確保 stick.keywords 存在
        if (stick.keywords && Array.isArray(stick.keywords)) {
            stick.keywords.forEach(keyword => {
                if (normalizedQuery.includes(keyword.toLowerCase())) {
                    score += 10; 
                }
            });
        }

        // B. 領域匹配加權得分 (15分/領域)
        Object.keys(WEIGHTS).filter(k => k.length > 2 && k !== '正面意圖' && k !== '負面意圖').forEach(field => {
            const fieldKeywords = WEIGHTS[field];
            if (fieldKeywords.some(word => normalizedQuery.includes(word))) {
                if (stick.keywords && stick.keywords.includes(field)) {
                    score += 15; 
                }
            }
        });
        
        // C. 意圖調整分數 (吉凶傾向調整)
        const isFavorable = stick.title.includes('上吉') || stick.title.includes('中吉');
        const isCautious = stick.title.includes('下籤') || stick.title.includes('中下籤');

        if (userIntent === '正面意圖') {
            if (isFavorable) {
                score += 20;
            } else if (isCautious) {
                score -= 10; 
            }
        } else if (userIntent === '負面意圖') {
            if (isCautious) {
                score += 20;
            } else if (isFavorable) {
                score -= 10; 
            }
        }
        
        // 確保最低分數 (基礎機率)
        score = Math.max(1, score); 

        scores.push({ ...stick, score });
    });
    
    return scores;
}


// --- SVG 繪製函數 ---
const censerWidth = 150;
const censerHeight = 350;
const censerOffsetX = 50; 
const svgContainerWidth = censerWidth + 100;
const svgContainerHeight = censerHeight + 50;

/**
 * 繪製籤筒的 SVG 元素
 */
function createCenserSVG(width, height) {
    const baseColor = "#8b4513"; 
    const edgeColor = "#a0522d"; 
    const topRadius = width / 2;
    const bottomRadius = topRadius * 0.9;
    
    const topEllipse = `<ellipse cx="${width / 2}" cy="10" rx="${topRadius}" ry="5" fill="${edgeColor}" stroke="${baseColor}" stroke-width="2"/>`;
    
    const bodyPath = `M ${width / 2 - topRadius} 10 
                      L ${width / 2 - bottomRadius} ${height - 10} 
                      A ${bottomRadius} 5 0 0 0 ${width / 2 + bottomRadius} ${height - 10} 
                      L ${width / 2 + topRadius} 10 Z`;
    
    const bottomRect = `<rect x="${width / 2 - bottomRadius}" y="${height - 15}" width="${bottomRadius * 2}" height="10" rx="3" fill="${edgeColor}"/>`;

    return `<svg class="censer" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <g>
                    ${bottomRect}
                    <path d="${bodyPath}" fill="${baseColor}" stroke="${baseColor}" stroke-width="1"/>
                    ${topEllipse}
                </g>
            </svg>`;
}

/**
 * 初始化抽籤區域和籤筒
 */
function initializeDrawing() {
    const drawArea = document.getElementById('draw-area');
    
    let svgContent = `<svg id="main-svg" width="${svgContainerWidth}" height="${svgContainerHeight}" viewBox="0 0 ${svgContainerWidth} ${svgContainerHeight}" style="overflow: visible;">`;
    
    const stickCountVisual = 15; 
    
    // 繪製筒內籤文
    for (let i = 0; i < stickCountVisual; i++) {
        const stickX = censerOffsetX + censerWidth / 2 + (i - stickCountVisual / 2) * 2 - 5; 
        const stickY = censerHeight - 20; 
        
        svgContent += `<rect class="stick-in-censer" data-index="${i}" x="${stickX - 3}" y="${stickY - 200}" width="6" height="200" rx="2" fill="#e6b36a" stroke="#8b4513" stroke-width="1"/>`;
    }

    // 繪製籤筒
    const censerSVG = createCenserSVG(censerWidth, censerHeight).replace('<svg', `<svg x="${censerOffsetX}" y="0"`);
    svgContent += censerSVG.replace('class="censer"', 'class="censer" id="censer-svg-group"');

    svgContent += `</svg>`;
    drawArea.innerHTML = svgContent;
    
    document.getElementById('result-display').style.display = 'none';
    document.getElementById('draw-button').style.display = 'block';
    document.getElementById('reset-button').style.display = 'none';
    
    document.getElementById('user-query').value = '';
}

// --- 动画和逻辑 ---

let isDrawing = false;
let drawnStickData = null;
let shakingSound;
let dropSound;


function startDrawing() {
    if (isDrawing) return;
    
    const userQuery = document.getElementById('user-query').value.trim();
    
    if (userQuery.length < 5) {
        alert("請誠心輸入您的問題，至少五個字，以示虔誠！");
        document.getElementById('user-query').focus();
        return;
    }
    
    isDrawing = true;

    const drawButton = document.getElementById('draw-button');
    const censerGroup = document.getElementById('censer-svg-group');
    const sticksInCenser = document.querySelectorAll('.stick-in-censer');
    
    drawButton.disabled = true;
    drawButton.textContent = "🙏 正在感應神機...";

    // ⭐ 確定性抽籤邏輯 ⭐
    const { queryKey, seed } = generateQuerySeed(userQuery);
    let resultIndex = -1; 
    const storedResult = localStorage.getItem(queryKey);
    
    if (storedResult) {
        resultIndex = parseInt(storedResult);
        drawnStickData = fortuneSticks[resultIndex];
        console.log(`[知遇籤] 從 LocalStorage 獲取今日結果: 第 ${resultIndex + 1} 籤`);
    } else {
        const scoredSticks = calculateStickScores(userQuery);
        const nextRandom = seededRandom(seed); 
        
        drawnStickData = deterministicSelect(scoredSticks, nextRandom);
        
        resultIndex = fortuneSticks.findIndex(stick => stick.number === drawnStickData.number);
        localStorage.setItem(queryKey, resultIndex.toString());
        console.log(`[知遇籤] 確定性抽籤完成，結果已儲存: 第 ${resultIndex + 1} 籤`);
    }

    // 2. 播放搖籤音效並開始搖晃動畫
    if (shakingSound) {
        shakingSound.loop = true; 
        shakingSound.play().catch(e => console.error("播放搖籤音效失敗:", e)); 
    }
    censerGroup.classList.add('shaking');

    // 隨機選定一根筒內籤用於視覺掉落
    const stickToHide = sticksInCenser[Math.floor(Math.random() * sticksInCenser.length)];
    
    // 3. 延遲後籤子「彈出」
    setTimeout(() => {
        // 停止搖晃動畫和音效
        censerGroup.classList.remove('shaking');
        if (shakingSound) {
            shakingSound.pause();
            shakingSound.currentTime = 0; 
        }

        // 隱藏筒內其中一根籤
        stickToHide.style.opacity = '0'; 

        const svgContainer = document.getElementById('main-svg');
        const stickWidth = 8; 
        const stickHeight = 250;
        
        const startX = parseFloat(stickToHide.getAttribute('x'));
        const startY = parseFloat(stickToHide.getAttribute('y')); 

        const fallingStickSVG = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        fallingStickSVG.setAttribute('class', 'drawn-stick-svg falling');
        fallingStickSVG.setAttribute('x', startX.toString());
        fallingStickSVG.setAttribute('y', startY.toString());
        fallingStickSVG.setAttribute('width', stickWidth.toString());
        fallingStickSVG.setAttribute('height', stickHeight.toString());
        fallingStickSVG.setAttribute('rx', '2');
        
        // 設定 CSS 變數，用於控制 fallAndBounce 動畫
        const initialBounceX = (Math.random() * 20) - 10; 
        const dropX = (Math.random() * 80) - 40; 
        const dropY = censerHeight + 30; 
        const dropRot = (Math.random() * 60) - 30; 

        fallingStickSVG.style.setProperty('--start-x', `0px`);
        fallingStickSVG.style.setProperty('--start-y', `0px`);
        fallingStickSVG.style.setProperty('--initial-bounce-x', `${initialBounceX}px`);
        fallingStickSVG.style.setProperty('--initial-rot', `${(Math.random() * 10) - 5}deg`); 
        fallingStickSVG.style.setProperty('--drop-x', `${dropX}px`);
        fallingStickSVG.style.setProperty('--drop-y', `${dropY}px`);
        fallingStickSVG.style.setProperty('--drop-rot', `${dropRot}deg`);
        
        fallingStickSVG.style.animationDuration = '2.0s'; 
        
        fallingStickSVG.style.opacity = '1';
        svgContainer.appendChild(fallingStickSVG);

        // 播放落定聲響
        if (dropSound) {
            setTimeout(() => {
                 dropSound.play().catch(e => console.error("播放落籤音效失敗:", e));
            }, 1500); 
        }

        // 4. 掉落動畫結束後顯示結果
        setTimeout(() => {
            svgContainer.removeChild(fallingStickSVG);

            displayResult(drawnStickData, userQuery);

            drawButton.disabled = false;
            drawButton.textContent = "🙏 搖晃籤筒，抽取神籤";
            drawButton.style.display = 'none';
            document.getElementById('reset-button').style.display = 'block';

            isDrawing = false;
        }, 2000); 
        
    }, 1800); 
}

/**
 * 顯示放大後的籤子和解籤
 */
function displayResult(stickData, query) {
    const resultDisplay = document.getElementById('result-display');
    const stickMagnified = document.getElementById('drawn-stick-magnified');
    const interpretationText = document.getElementById('interpretation-text');

    const userQueryHtml = query ? `<p style="font-style: italic; color: #555; margin-bottom: 15px;">您所問：${query} </p>` : '';

    const verseLines = stickData.verse.split('，').join('，\n').split('。').join('。\n\n');

    const stickHTML = `
        <div class="magnified-stick-container">
            <h3 style="color:#a52a2a; margin-bottom: 10px;">${stickData.number} - ${stickData.title}</h3>
            <div class="stick-content">
                ${verseLines}
            </div>
        </div>
    `;

    stickMagnified.innerHTML = stickHTML;
    
    let interpretationParts = stickData.interpretation.split('。');
    let interpretedHtml = '';
    
    const aspects = ['事業', '財運', '婚姻', '健康', '學業', '尋人', '失物'];
    
    let generalInterpretation = interpretationParts.shift();
    if (generalInterpretation) {
         interpretedHtml += `<p><strong>總體解讀：</strong>${generalInterpretation}。</p>`;
    }
    
    aspects.forEach(aspect => {
        let part = interpretationParts.find(p => p.includes(`**${aspect}：**`));
        if (part) {
            let formattedPart = part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            interpretedHtml += `<p>${formattedPart}。</p>`;
        }
    });
    
    // 增加提醒，避免誤導
    interpretedHtml += `<p style="font-size: 0.9em; color: #999; margin-top: 20px;">溫馨提醒：籤文是一種指引與參考，最終決策仍需依據您的理性判斷和實際情況。</p>`;


    interpretationText.innerHTML = userQueryHtml + interpretedHtml;
    
    resultDisplay.style.display = 'block';
    
    resultDisplay.scrollIntoView({ behavior: 'smooth' });
}


/**
 * 重置網頁到初始狀態
 */
function resetDrawing() {
    initializeDrawing();
    drawnStickData = null;
    document.getElementById('draw-area').style.opacity = '1';
    document.getElementById('user-query').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 事件監聽 ---
document.addEventListener('DOMContentLoaded', () => {
    initializeDrawing(); 
    
    // 載入音效
    shakingSound = document.getElementById('shaking-sound');
    dropSound = document.getElementById('drop-sound');

    // 檢查音效是否已經載入，如果沒有，設置一個預設的靜音函數以防報錯
    if (!shakingSound || !dropSound) {
        console.warn("音效文件未找到，動畫將靜音運行。請確保 'sounds/shaking.mp3' 和 'sounds/drop.mp3' 存在。");
        // 為了不讓 startDrawing 報錯，重新定義靜音 'play' 函數
        shakingSound = { play: () => Promise.resolve(), pause: () => {}, currentTime: 0, loop: false };
        dropSound = { play: () => Promise.resolve(), pause: () => {}, currentTime: 0, loop: false };
    }

    document.getElementById('draw-button').addEventListener('click', startDrawing);
    document.getElementById('reset-button').addEventListener('click', resetDrawing);
    
    // 允許 Enter 鍵提交問題
    document.getElementById('user-query').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !isDrawing) {
            startDrawing();
        }
    });
});

initializeDrawing();