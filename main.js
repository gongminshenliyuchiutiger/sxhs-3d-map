/**
 * 新北市立雙溪高級中學 3D 互動校園地圖系統
 * 採用 Three.js、OrbitControls 與 Tween.js 打造
 */

/// 校園景點與建築物資料結構（完全依據學校公告正式版本導覽圖對位）
const CAMPUS_DATA = [
  {
    id: 'gate',
    name: '校門口與迎賓廣場',
    shortName: '校門口',
    enName: 'Campus Main Gate & Welcome Plaza',
    icon: 'fa-archway',
    position: { x: -98, y: 0, z: 12 },
    cameraOffset: { x: -36, y: 26, z: -8 },
    tags: ['校園正門', '藍色波浪大門', '警衛室', '校徽精神柱', '波浪校名牆', '迎賓圓形廣場'],
    desc: '雙溪高中正門入口，座落於大智樓與大勇樓西端開口處，正對中庭花園與桃李花園。設有亮藍色金屬波浪大門、亮藍斜頂警衛室、校徽精神紀念柱、金色題字波浪校名牆與迎賓圓形拼花廣場。跨越聯外大橋筆直進入校園，氣勢恢弘。',
    floors: [
      { floor: '地面', desc: '亮藍色金屬大門、警衛室、校徽精神柱、金色校名題字牆、迎賓圓形廣場、人行進校側門' }
    ],
    accessibility: [
      '進校迎賓大道與廣場全區平緩無階梯，寬闊平坦',
      '人車分道動線規劃，輪椅與無障礙通行無阻'
    ]
  },
  {
    id: 'dazhi',
    name: '大智樓 (Da Zhi Building - 3層樓)',
    shortName: '大智樓',
    enName: 'Da Zhi Building',
    icon: 'fa-school',
    position: { x: -73, y: 0, z: 28 },
    cameraOffset: { x: 15, y: 36, z: 46 },
    tags: ['3層樓', '行政核心', '總務處', '人事室', '會計室', '理化實驗室', '3F空中天橋'],
    desc: '依「雙溪高中校舍平面圖」標準配置：大智樓樓高三層，北面隔著中庭步道與桃李花園和大勇樓相望。1F配置國中九年級班級、烹飪教室、特教資源與靜思書軒；2F為行政核心總務處、人事室、會計室與國中導師室；3F匯集化學、生物、物理自然科學實驗室與美術教室，並於三樓設有懸空天橋跨通大勇樓三樓。',
    floors: [
      {
        floor: '1F',
        desc: '國中九年級教室(901, 902)、烹飪教室、特教資源中心、靜思書軒、維修室與無障礙電梯',
        rooms: [
          { name: '維修室', type: 'service', desc: '校園設備修繕維護庫房' },
          { name: '靜思書軒', type: 'special', desc: '靜思閱覽與心靈沉澱書軒' },
          { name: '資源班 / 學習中心(2)', type: 'special', desc: '特殊教育個別化資源教學中心' },
          { name: '特教辦公室', type: 'office', desc: '特教組教師聯合辦公室' },
          { name: '資源班', type: 'special', desc: '特殊教育輔導與適性學習教室' },
          { name: '烹飪教室', type: 'lab', desc: '家政與烘焙烹飪實習專科教室' },
          { name: '文化走廊 (一樓穿堂)', type: 'corridor', desc: '一樓建築完全挖空之挑空貫通穿堂，連通中庭與南岸走道' },
          { name: '國中教室 901', type: 'classroom', desc: '國中部九年一班班級教室' },
          { name: '國中教室 902', type: 'classroom', desc: '國中部九年二班班級教室' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間與盥洗設施' },
          { name: '無障礙電梯', type: 'accessible', desc: '無障礙客梯，直通 1F 至 3F' }
        ]
      },
      {
        floor: '2F',
        desc: '行政處室核心（總務處、會計室、人事室、會議室）、國中導師室與九年級教室(903)',
        rooms: [
          { name: '家長會辦公室', type: 'office', desc: '學生家長會聯誼與會務空間' },
          { name: '檔案室', type: 'service', desc: '學校歷史文書與機密公文檔案庫' },
          { name: '會計室', type: 'office', desc: '主計會計行政業務處室' },
          { name: '總務處', type: 'office', desc: '總務行政、庶務出納管理中心' },
          { name: '行政會議室', type: 'office', desc: '全校行政協調與校務會議室' },
          { name: '樓梯 (西側)', type: 'service', desc: '西側安全疏散階梯' },
          { name: '國中導師室', type: 'office', desc: '國中部各班導師聯合研討辦公室' },
          { name: '人事室', type: 'office', desc: '教職員人事福利與考核處室' },
          { name: '國中教室 903', type: 'classroom', desc: '國中部九年三班班級教室' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間與盥洗設施' },
          { name: '樓梯 (東側)', type: 'service', desc: '東側連通樓梯' }
        ]
      },
      {
        floor: '3F',
        desc: '自然科學實驗室重鎮（化學、生物、物理）、美術教室與跨棟空中走道',
        rooms: [
          { name: '器械室', type: 'service', desc: '實驗器材與精密儀器庫房' },
          { name: '化學實驗室', type: 'lab', desc: '標準通風抽氣設備之化學教學實驗室' },
          { name: '生物實驗室', type: 'lab', desc: '顯微鏡與生物標本研習實驗室' },
          { name: '跨棟空中天橋', type: 'corridor', desc: '三樓高空景觀走道，跨通大勇樓3F' },
          { name: '物理實驗室', type: 'lab', desc: '力學光學電學專用物理教學實驗室' },
          { name: '美術教室', type: 'lab', desc: '視覺藝術、陶藝與繪畫專科教室' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間與盥洗設施' }
        ]
      }
    ],
    accessibility: [
      '東南角配置標準無障礙專用電梯，直通 1F 至 3F 各樓層',
      '大智樓東南角設有無障礙專用斜坡引道',
      '平緩步道連通中庭廣場與桃李花園'
    ]
  },
  {
    id: 'dayong',
    name: '大勇樓 (Da Yong Building - 3層樓)',
    shortName: '大勇樓',
    enName: 'Da Yong Building',
    icon: 'fa-user-graduate',
    position: { x: -70, y: 0, z: 0 },
    cameraOffset: { x: 15, y: 36, z: 38 },
    tags: ['3層樓', '輔導中心', '創客教室', '生科教室', '3F空中天橋'],
    desc: '依「雙溪高中校舍平面圖」標準配置：大勇樓樓高三層，與大智樓平行相望。1F配置國中七、八年級教室(701, 702, 703, 801, 802)與風雨走廊；2F為輔導處中心、個人諮商室、團體諮商室、資源班與視聽教室；3F匯集創客教室(Maker Space)、生活科技、音樂、語言與多功能綜合教室，並於三樓設有景觀空中天橋跨通大智樓三樓。',
    floors: [
      {
        floor: '1F',
        desc: '國中七、八年級教室(701, 702, 703, 801, 802)、文化走廊與風雨走廊',
        rooms: [
          { name: '國中教室 701', type: 'classroom', desc: '國中部七年一班班級教室' },
          { name: '國中教室 702', type: 'classroom', desc: '國中部七年二班班級教室' },
          { name: '國中教室 703', type: 'classroom', desc: '國中部七年三班班級教室' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間' },
          { name: '文化走廊 (一樓穿堂)', type: 'corridor', desc: '一樓建築完全挖空之挑空貫通穿堂，正對大智樓穿堂' },
          { name: '國中教室 801', type: 'classroom', desc: '國中部八年一班班級教室' },
          { name: '國中教室 802', type: 'classroom', desc: '國中部八年二班班級教室' },
          { name: '風雨走廊', type: 'corridor', desc: '防雨遮陽戶外連通迴廊' }
        ]
      },
      {
        floor: '2F',
        desc: '學生輔導中心（輔導處、個人諮商室1/2、團體諮商室）、資源班學習中心與視聽教室',
        rooms: [
          { name: '個人諮商室 (1)', type: 'office', desc: '個別心理諮商與保密談話室' },
          { name: '團體諮商室', type: 'office', desc: '同儕團體輔導與心理衛生活動室' },
          { name: '個人諮詢室 (2)', type: 'office', desc: '個別個案會談與親師晤談室' },
          { name: '資源班 / 學習中心', type: 'special', desc: '學習輔助與適性充實教室' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間' },
          { name: '樓梯 (西側)', type: 'service', desc: '西側通往一樓及三樓樓梯' },
          { name: '輔導處', type: 'office', desc: '輔導組、資料組與專任輔導教師辦公室' },
          { name: '視聽教室', type: 'special', desc: '多媒體簡報與大型視聽教學空間' },
          { name: '樓梯 (東側)', type: 'service', desc: '東側安全通道樓梯' }
        ]
      },
      {
        floor: '3F',
        desc: '藝能特色教室（創客教室、生活科技、音樂、語言、多功能）與跨棟空中走道',
        rooms: [
          { name: '多功能教室', type: 'special', desc: '彈性靈活跨領域多元學習教室' },
          { name: '語言教室', type: 'lab', desc: '英語與本土語雙語教學專用教室' },
          { name: '音樂教室', type: 'lab', desc: '音樂合唱與樂器鑑賞教學專科教室' },
          { name: '跨棟空中天橋', type: 'corridor', desc: '高空景觀走道，跨通大智樓3F' },
          { name: '創客教室 (Maker Space)', type: 'lab', desc: '3D列印、雷切與創客動手做工坊' },
          { name: '生活科技教室', type: 'lab', desc: '生活科技工藝與機械操作實習教室' },
          { name: '綜合教室', type: 'special', desc: '綜合活動與社團研討教室' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間' }
        ]
      }
    ],
    accessibility: [
      '設有無障礙坡道，一樓走道平順暢通',
      '三樓跨棟天橋平整無門檻，可直通大智樓無障礙電梯'
    ]
  },
  {
    id: 'plaza_garden',
    name: '中庭廣場與桃李花園 (3F空中天橋)',
    shortName: '中庭與桃李花園',
    enName: 'Courtyard Plaza & Tao-Li Garden',
    icon: 'fa-tree',
    position: { x: -70, y: 0, z: 14 },
    cameraOffset: { x: 0, y: 42, z: 40 },
    tags: ['校園景觀', '中庭廣場', '3F空中天橋', '紅色六角涼亭', '桃李花園'],
    desc: '夾在大智樓與大勇樓之間的兩大核心景觀區。特別特徵：兩樓之間「僅於三樓設有挑高跨棟空中天橋」，一二樓地面完全挑空，學生可自中庭廣場（雙水池、紅色六角涼亭、曲折小溪）自由步行穿梭至桃李花園！',
    floors: [
      { floor: '1F地面', desc: '挑空穿堂步道、中庭廣場、紅色六角涼亭、雙水池、桃李花園' },
      { floor: '3F高空', desc: '三樓專屬空中景觀天橋（連通大智樓 3F 與大勇樓 3F）' }
    ],
    accessibility: [
      '全區平整地磚步道與無障礙緩坡，一樓穿行暢通無阻'
    ]
  },
  {
    id: 'complex',
    name: '多功能綜合大樓 (Multi-functional Complex - 6層樓)',
    shortName: '多功能綜合大樓',
    enName: 'Multi-functional Complex Building',
    icon: 'fa-building-columns',
    position: { x: -48, y: 0, z: -21 },
    cameraOffset: { x: 22, y: 46, z: 40 },
    tags: ['6層樓', '教務處', '圖書館', '演藝廳', '電腦教室', '校長室', '無障礙電梯'],
    desc: '依「雙溪高中校舍平面圖」標準配置：面朝梅竹蹊路之現代旗艦大樓，樓高六層（1F~6F）！1F為教務處、會議中心與儲藏室；2F為雙溪高中圖書館閱覽大廳與討論室；3F配置高中與國中電腦教室、專任教師辦公室與群組教室；4F為校長室、行政辦公室與高中導師室；5F為大型挑高多功能演藝廳(中控室/VIP區)、校史室、環景科技教室與商科情境教室；6F為演藝廳挑高頂棚與機電設備。',
    floors: [
      {
        floor: '1F',
        desc: '靠近校門側西側樓梯/男女洗手間、會議中心、行政儲藏室、綠博士廣場大穿堂、教務處核心處室、教具油印室與東南角無障礙電梯',
        rooms: [
          { name: '樓梯 (西側)', type: 'service', desc: '西側通廊樓梯 (靠近校門口側)' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間 (西端靠近校門口側)' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間 (西端靠近校門口側)' },
          { name: '會議中心', type: 'special', desc: '全校大型學術會議與校務決策中心 (南側)' },
          { name: '儲藏室 (西側)', type: 'service', desc: '西側校務物資儲藏室 (北側)' },
          { name: '綠博士廣場 (穿堂)', type: 'corridor', desc: '一樓挑高大穿堂，東端直通操場跑道與合照大階梯' },
          { name: '教務處', type: 'office', desc: '教學組、註冊組、設備組核心辦公處室' },
          { name: '教具室', type: 'service', desc: '各學科教具器材保管與借調中心' },
          { name: '油印室', type: 'service', desc: '全校試卷與教學講義印刷製作中心' },
          { name: '儲藏室 (東側)', type: 'service', desc: '教務教學設備儲存庫' },
          { name: '無障礙電梯', type: 'accessible', desc: '直通 1F 至 6F 專用無障礙電梯 (東南角)' },
          { name: '樓梯 (東側)', type: 'service', desc: '東側安全通道樓梯' }
        ]
      },
      {
        floor: '2F',
        desc: '靠近校門側西側樓梯/男女洗手間、圖書館儲藏室、圖書館行政辦公室、雙溪高中圖書館開架閱覽大廳與專題討論室',
        rooms: [
          { name: '樓梯 (西側)', type: 'service', desc: '西側通廊樓梯 (靠近校門口側)' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間 (西端靠近校門口側)' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間 (西端靠近校門口側)' },
          { name: '圖書館儲藏室', type: 'service', desc: '珍貴館藏與典籍儲備庫 (北側)' },
          { name: '圖書館行政辦公室', type: 'office', desc: '圖書資訊管理與採訪編目辦公室 (北側)' },
          { name: '圖書館 (開架閱覽大廳)', type: 'special', desc: '開架藏書區、學生自習與自主學習大廳 (東側核心採光大廳)' },
          { name: '專題討論室', type: 'office', desc: '小組合作研習與專案討論空間 (南側)' },
          { name: '無障礙電梯', type: 'accessible', desc: '直通 1F 至 6F 專用無障礙電梯 (東南角)' }
        ]
      },
      {
        floor: '3F',
        desc: '靠近校門側西側樓梯/男女洗手間、群組教室一/二、專任教師辦公室、資訊主機房、高中/國中電腦教室與逃生緩降梯',
        rooms: [
          { name: '樓梯 (西側)', type: 'service', desc: '西側通廊樓梯 (靠近校門口側)' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間 (西端靠近校門口側)' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間 (西端靠近校門口側)' },
          { name: '群組教室一', type: 'special', desc: '互動式分組討論與翻轉學習專用教室 (南側)' },
          { name: '群組教室二', type: 'special', desc: '跨學科小組合作學習教室 (南側)' },
          { name: '專任教師辦公室', type: 'office', desc: '全校專任教師研討與備課聯合辦公室 (北側)' },
          { name: '主機房', type: 'service', desc: '校園骨幹網路與伺服器核心主機房 (北側)' },
          { name: '高中電腦教室', type: 'lab', desc: '高中部資訊科技與程式設計專用教室 (東南側)' },
          { name: '國中電腦教室', type: 'lab', desc: '國中部資訊科技與數位學習教室 (東北側)' },
          { name: '逃生緩降梯', type: 'service', desc: '東側緊急逃生與安全避難設施' },
          { name: '無障礙電梯', type: 'accessible', desc: '直通 1F 至 6F 專用無障礙電梯 (東南角)' }
        ]
      },
      {
        floor: '4F',
        desc: '靠近校門側西側樓梯/男女洗手間、校長室、高中導師辦公室、中控室與大型演藝廳觀眾席',
        rooms: [
          { name: '樓梯 (西側)', type: 'service', desc: '西側通廊樓梯 (靠近校門口側)' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間 (西端靠近校門口側)' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間 (西端靠近校門口側)' },
          { name: '校長室', type: 'office', desc: '校長辦公室與貴賓接待會客室 (南側)' },
          { name: '高中導師辦公室', type: 'office', desc: '高中部各班導師輔導與教學準備辦公室 (南側)' },
          { name: '中控室', type: 'special', desc: '演藝廳專業舞台音響、燈光與多媒體主控室 (北側)' },
          { name: '大型演藝廳 (觀眾席)', type: 'hall', desc: '多功能大型演藝廳觀眾進場玄關與下層觀眾席 (東側核心大廳)' },
          { name: '無障礙電梯', type: 'accessible', desc: '直通 1F 至 6F 專用無障礙電梯 (東南角)' }
        ]
      },
      {
        floor: '5F',
        desc: '靠近校門側西側樓梯/雙溪校史室(無洗手間)、環景科技教室、商科情境教室、大型演藝廳挑高主館(VIP席)與空調機房',
        rooms: [
          { name: '樓梯 (西側)', type: 'service', desc: '西側通廊樓梯 (靠近校門口側)' },
          { name: '雙溪校史室', type: 'special', desc: '雙溪高中創校建校歷史文物、榮譽獎盃與校史展示室 (西端靠近校門口側，原圖此樓層無配置廁所)' },
          { name: '環景科技教室', type: 'lab', desc: 'VR/AR 沉浸式環景體驗與未來科技情境教室 (南側)' },
          { name: '商科情境教室', type: 'lab', desc: '商業經營、行銷與電子商務模擬情境教室 (南側)' },
          { name: '大型演藝廳 (挑高大廳 / VIP席)', type: 'hall', desc: '挑高舞台、貴賓席與上層觀賞看臺 (東側核心大廳)' },
          { name: '空調機房', type: 'service', desc: '大型中央空調機電控制室 (東北側)' },
          { name: '無障礙電梯', type: 'accessible', desc: '直通 1F 至 6F 專用無障礙電梯 (東南角)' }
        ]
      },
      {
        floor: '6F',
        desc: '西側安全樓梯/機電維護空間與東側大型演藝廳挑高頂棚舞台吊架設備',
        rooms: [
          { name: '樓梯通道 (西側)', type: 'service', desc: '直通頂樓安全通道樓梯 (西側靠近校門口)' },
          { name: '機電維護空間', type: 'service', desc: '頂樓高壓配電與機電管線檢修維護空間' },
          { name: '大型演藝廳 (挑高頂棚/舞台吊架)', type: 'hall', desc: '演藝廳挑高頂棚之天花燈光貓道與專業吸音舞台設備 (東側)' },
          { name: '無障礙電梯機房', type: 'accessible', desc: '無障礙電梯頂樓機房與安全維護通道 (東南角)' }
        ]
      }
    ],
    accessibility: [
      '配置專用無障礙電梯，直通 1F 至 6F 各樓層',
      '演藝廳設有無障礙輪椅席與專屬緩坡進場通道',
      '北側梅竹蹊路大門具備標準無障礙專用坡道'
    ]
  },
  {
    id: 'teaching',
    name: '教學大樓 (Teaching Building - 5層樓)',
    shortName: '教學大樓',
    enName: 'Teaching Building',
    icon: 'fa-landmark',
    position: { x: -36, y: 0, z: 3.5 },
    cameraOffset: { x: 26, y: 38, z: 36 },
    tags: ['5層樓', '學務處', '健康中心', '高中部教室', '無障礙電梯'],
    desc: '依「雙溪高中校舍平面圖」標準配置：南北走向之獨立五層大樓（1F~5F），西臨桃李花園，東臨田徑跑道。1F為學務處核心、學務處會議室、健康中心（保健室）與文化走廊；2F為高中一年級班級(103, 104, 105)與文史專科教室；3F為高中一、二年級班級(101, 102, 204, 205)與無障礙電梯；4F為高中二、三年級班級(201, 202, 203, 305)；5F為高中三年級班級(301, 302, 303, 304)。每層樓皆配有完善洗手間。',
    floors: [
      {
        floor: '1F',
        desc: '學務處行政樞紐、學務處會議室、健康中心（保健室）與文化走廊',
        rooms: [
          { name: '學務處會議室', type: 'office', desc: '學生事務決策與生輔常態研討會議室' },
          { name: '學務處', type: 'office', desc: '生輔組、訓育組、體衛組聯合辦公室' },
          { name: '文化走廊 (一樓穿堂)', type: 'corridor', desc: '一樓完全挖空挑空之貫通穿堂，自由穿梭中庭與操場路網' },
          { name: '健康中心 (保健室)', type: 'office', desc: '校園傷病醫療救護、健康檢查與休息病床室' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間' }
        ]
      },
      {
        floor: '2F',
        desc: '高中一年級普通教室(103, 104, 105)與文史專科教室',
        rooms: [
          { name: '高中 103 教室', type: 'classroom', desc: '高中部一年三班班級教室' },
          { name: '高中 104 教室', type: 'classroom', desc: '高中部一年四班班級教室' },
          { name: '高中 105 教室', type: 'classroom', desc: '高中部一年五班班級教室' },
          { name: '文史專科教室', type: 'lab', desc: '國文與歷史社會領域情境教學教室' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間' }
        ]
      },
      {
        floor: '3F',
        desc: '高中一、二年級教室(204, 205, 101, 102)與無障礙電梯通廊',
        rooms: [
          { name: '高中 204 教室', type: 'classroom', desc: '高中部二年四班班級教室' },
          { name: '高中 205 教室', type: 'classroom', desc: '高中部二年五班班級教室' },
          { name: '高中 101 教室', type: 'classroom', desc: '高中部一年一班班級教室' },
          { name: '高中 102 教室', type: 'classroom', desc: '高中部一年二班班級教室' },
          { name: '無障礙電梯', type: 'accessible', desc: '教學大樓無障礙電梯，直通各樓層' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間' }
        ]
      },
      {
        floor: '4F',
        desc: '高中二、三年級普通教室(305, 201, 202, 203)與安全樓梯',
        rooms: [
          { name: '高中 305 教室', type: 'classroom', desc: '高中部三年五班班級教室' },
          { name: '高中 201 教室', type: 'classroom', desc: '高中部二年一班班級教室' },
          { name: '高中 202 教室', type: 'classroom', desc: '高中部二年二班班級教室' },
          { name: '高中 203 教室', type: 'classroom', desc: '高中部二年三班班級教室' },
          { name: '中央樓梯', type: 'service', desc: '南北貫穿安全疏散樓梯' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間' }
        ]
      },
      {
        floor: '5F',
        desc: '高中三年級普通班級教室(301, 302, 303, 304)',
        rooms: [
          { name: '高中 301 教室', type: 'classroom', desc: '高中部三年一班班級教室' },
          { name: '高中 302 教室', type: 'classroom', desc: '高中部三年二班班級教室' },
          { name: '高中 303 教室', type: 'classroom', desc: '高中部三年三班班級教室' },
          { name: '高中 304 教室', type: 'classroom', desc: '高中部三年四班班級教室' },
          { name: '男生廁所', type: 'restroom', desc: '男用洗手間' },
          { name: '女生廁所', type: 'restroom', desc: '女用洗手間' }
        ]
      }
    ],
    accessibility: [
      '配置專用無障礙電梯，直通 1F 至 5F 各樓層',
      '大門設有無障礙坡道引道',
      '南側臨操場設有無障礙專屬停車位與平順動線'
    ]
  },
  {
    id: 'fish_platform',
    name: '觀魚平臺與沿溪木棧道 (Fish-viewing Platform & Boardwalk)',
    shortName: '觀魚平臺木棧道',
    enName: 'Fish-viewing Platform & Boardwalk',
    icon: 'fa-fish',
    position: { x: -44, y: 0, z: 38 },
    cameraOffset: { x: 8, y: 18, z: 22 },
    tags: ['平林溪生態', '沿溪木棧道', '雙車道走道', '生態教育'],
    desc: '沿平林溪北岸綿延的親水木棧步道與觀魚核心平臺。緊臨可供兩輛汽車會車通行的雙向走道，設有防腐木欄杆、觀景長椅與生態解說牌，是全校師生近距離觀察溪流魚群與山水風光的極佳景點。',
    floors: [
      { floor: '木棧道設施', desc: '沿溪防腐木棧道、外凸觀魚大平臺、安全防護木欄杆、生態解說牌、休憩長椅' }
    ],
    accessibility: [
      '緊鄰寬敞平整的雙向車道，全線平緩無門檻，輪椅同行暢通'
    ]
  },
  {
    id: 'track',
    name: '田徑操場與球場區',
    shortName: '操場球場',
    enName: 'Track & Field / Ball Courts',
    icon: 'fa-person-running',
    position: { x: 3.5, y: 0, z: -18 },
    cameraOffset: { x: 0, y: 55, z: 46 },
    tags: ['雙半圓膠囊跑道', '內側籃球場', '亮天藍PU地坪'],
    desc: '標準兩端半圓弧紅色 PU 環形田徑跑道，中央設有亮天藍色 PU 球場地坪與籃球場；南側與風雨操場保持開闊安全間距，東端與活動中心保有充足綠化通道，西側與教學大樓保持寬敞主幹道，徹底杜絕任何遮擋。',
    floors: [
      { floor: '田徑場', desc: '精緻雙半圓膠囊紅色 PU 跑道' },
      { floor: '內場', desc: '亮天藍色 PU 地坪、標準籃球場' }
    ],
    accessibility: [
      '環校道路平順連通，出入口無階梯障礙'
    ]
  },
  {
    id: 'shrine',
    name: '校園福德宮 (土地公廟)',
    shortName: '土地公廟',
    enName: 'Fude Shrine (Earth God Temple)',
    icon: 'fa-place-of-worship',
    position: { x: -11, y: 0, z: 22 },
    cameraOffset: { x: 0, y: 15, z: -22 },
    tags: ['校園信仰', '守護神', '土地公廟', '座南朝北面向操場'],
    desc: '雙溪高中與地方的重要精神守護地標！座落於風雨操場西南角、合作社東側，廟宇特色為「座南朝北，祭拜正門完全朝向操場」，庇佑操場上活動奔馳的全體師生出入平安、身體強健。',
    floors: [
      { floor: '神龕正門', desc: '座南朝北面向操場，設有天公香爐、供桌與福德正神尊像' },
      { floor: '參拜動線', desc: '信眾由操場與風雨操場側迎面參拜，背依環校道路' }
    ],
    accessibility: [
      '緊鄰操場平坦地坪，無門檻阻礙，輪椅參拜便利'
    ]
  },
  {
    id: 'wind_shelter',
    name: '風雨操場 (Sheltered Sports Ground)',
    shortName: '風雨操場',
    enName: 'Sheltered Sports Ground',
    icon: 'fa-campground',
    position: { x: -1, y: 0, z: 18 },
    cameraOffset: { x: 0, y: 35, z: 42 },
    tags: ['體育設施', '大型白色張拉膜', '雨天活動場', '鋼構大棚'],
    desc: '座落於田徑跑道南側、司令臺西側的大型白色弧形張拉膜鋼構風雨操場，與田徑場保持開闊安全間隔，具備優異的遮陽避雨功能，為各類球類教學與大型集會首選場地。',
    floors: [
      { floor: '地面場館', desc: '天藍色防滑運動地坪、挑高白色張拉膜鋼構穹頂、防撞軟墊' }
    ],
    accessibility: [
      '四周出入口均為平坦地坪，無階梯障礙'
    ]
  },
  {
    id: 'west_services',
    name: '體育器材室、韻律舞蹈教室與合作社 (1層樓平房)',
    shortName: '合作社與器材室',
    enName: 'Sports Equipment, Dance Studio & School Co-op',
    icon: 'fa-store',
    position: { x: -22, y: 0, z: 17 },
    cameraOffset: { x: -12, y: 28, z: 32 },
    tags: ['1層樓平房', '學校合作社', '體育器材室', '韻律舞蹈教室', '生活服務'],
    desc: '依「雙溪高中校舍平面圖」標準配置：位於風雨操場西側之 1 層樓平房服務設施，依序規劃：體育器材室、韻律舞蹈教室，以及供應全校文具點心飲品的學校合作社。',
    floors: [
      {
        floor: '1F',
        desc: '體育器材室、韻律舞蹈教室、學校合作社',
        rooms: [
          { name: '體育器材室', type: 'service', desc: '體育教學器材存放與球具管理室' },
          { name: '韻律舞蹈教室', type: 'special', desc: '鋪設木地板與全身鏡之舞蹈體適能韻律教室' },
          { name: '學校合作社', type: 'service', desc: '師生日常生活用品、文具與食品福利社' }
        ]
      }
    ],
    accessibility: [
      '合作社大門平坦，1樓無門檻出入，通道寬敞'
    ]
  },
  {
    id: 'sports_stage_court',
    name: '司令臺與戶外球場',
    shortName: '司令臺與球場',
    enName: 'Flag Stage & Outdoor Courts',
    icon: 'fa-bullhorn',
    position: { x: 18, y: 0, z: 16 },
    cameraOffset: { x: -10, y: 32, z: 36 },
    tags: ['升旗司令臺', '戶外籃球場', '體育場地'],
    desc: '位於風雨操場東側，西側為典禮升旗司令臺與看臺，東側配置標準戶外全場籃球場，視野開闊。',
    floors: [
      { floor: '西側', desc: '升旗司令臺、典禮播音控制區、附屬臺' },
      { floor: '東側', desc: '戶外標準籃球場（紅邊綠底PU地坪、標準球架）' }
    ],
    accessibility: [
      '司令臺側設有無障礙專屬觀賽位置'
    ]
  },
  {
    id: 'activity',
    name: '活動中心 (Activity Center)',
    shortName: '活動中心',
    enName: 'Activity Center',
    icon: 'fa-basketball',
    position: { x: 48, y: 0, z: -26 },
    cameraOffset: { x: -20, y: 45, z: 38 },
    tags: ['室內體育館', '大禮堂', '獨立大樓', '無障礙車位'],
    desc: '位於操場東側，為南北走向的大型長方形綜合體育館，包含室內球場與全校集會大禮堂。南側隔著 15 米寬敞人行通道與綠帶，與男學生宿舍完全獨立分開，東側為西職務宿舍。',
    floors: [
      {
        floor: '1F',
        desc: '室內多功能綜合球場、舞臺控制室、體育器材庫',
        rooms: [
          { name: '綜合運動球場 (籃/排/羽)', type: 'special', desc: '室內楓木地板多功能球場' },
          { name: '大禮堂表演舞臺', type: 'hall', desc: '大型集會與典禮活動舞臺' },
          { name: '體育器材總庫', type: 'service', desc: '活動中心體育教學與球類器材庫' }
        ]
      },
      {
        floor: '2F',
        desc: '環形看臺迴廊、體能健身室',
        rooms: [
          { name: '環形看臺觀眾席', type: 'hall', desc: '俯瞰全場之高空觀眾看臺' },
          { name: '體能健身訓練室', type: 'special', desc: '重訓設備與體能鍛鍊空間' }
        ]
      }
    ],
    accessibility: [
      '正側門均設有無障礙專用坡道與專屬車位'
    ]
  },
  {
    id: 'job_dorm',
    name: '教職員宿舍區 (Staff Dormitories - 共五棟)',
    shortName: '教職員宿舍',
    enName: 'Staff Dormitories',
    icon: 'fa-house-user',
    position: { x: 82, y: 0, z: -18 },
    cameraOffset: { x: -18, y: 38, z: 32 },
    tags: ['教職員宿舍', '五棟分佈', '西棟', '南橫棟', '中北短棟', '中央長棟', '東長棟'],
    desc: '依平面圖標示「教職員宿舍區」：分佈於東北側區域的完整 5 棟教職員職務宿舍，提供遠道教職員安居之溫馨生活家園。',
    floors: [
      { floor: '棟1 (西棟)', desc: '活動中心正東側獨立職務宿舍，兩側鋪設水池與景觀綠地' },
      { floor: '棟2 (南橫棟)', desc: '位於廚房西北側、T字路口北緣的橫向長方形宿舍' },
      { floor: '棟3 (中北棟)', desc: '中央上方偏左之獨立短直立職務宿舍' },
      { floor: '棟4 (中長棟)', desc: '位於棟3右下方、垂直錯位排列之長條型宿舍' },
      { floor: '棟5 (東長棟)', desc: '最東側靠平林溪水岸之細長型景觀職務宿舍' }
    ],
    accessibility: [
      '平緩步道連通，設有無門檻進出通道'
    ]
  },
  {
    id: 'male_dorm',
    name: '男學生宿舍 (Boys Dormitory - 5層樓)',
    shortName: '男學生宿舍',
    enName: 'Boys Dormitory',
    icon: 'fa-building-user',
    position: { x: 53, y: 0, z: 11 },
    cameraOffset: { x: -16, y: 32, z: 28 },
    tags: ['5層樓', '學生宿舍', 'K書中心', '重訓室', '窯烤區', '無障礙電梯塔'],
    desc: '依「雙溪高中校舍平面圖」標準配置：男學生宿舍樓高五層（5F），1F明確規劃「K書中心」與「重訓室」，西南角草坪配置「窯烤區」；東北翼配有直通 5F 之無障礙電梯塔，生活機能健全。',
    floors: [
      {
        floor: '1F',
        desc: '男宿交誼大廳、K書中心、重訓室、無障礙專用寢室、窯烤區連通道',
        rooms: [
          { name: 'K書中心', type: 'special', desc: '住宿生晚自習安靜讀書專用空間' },
          { name: '住宿生重訓室', type: 'special', desc: '專業重訓啞鈴槓鈴體能鍛鍊室' },
          { name: '男宿交誼大廳', type: 'service', desc: '沙發會客、電視休閒與公共冰箱區' },
          { name: '無障礙專用寢室', type: 'accessible', desc: '標準無障礙輪椅友善寢室' }
        ]
      },
      {
        floor: '2F-5F',
        desc: '男生宿舍標準寢室單元、洗衣曬衣空間、生活衛浴區',
        rooms: [
          { name: '男生宿舍標準寢室', type: 'service', desc: '四人套房標準寢室單元' },
          { name: '公共衛浴與洗衣房', type: 'service', desc: '投幣式洗衣機、烘衣機與日照曬衣陽臺' }
        ]
      }
    ],
    accessibility: [
      '東北翼配置直達 5F 專用無障礙電梯塔',
      '西北側入口設有標準無障礙輪椅專用斜坡道'
    ]
  },
  {
    id: 'pizza_oven',
    name: '山羌造型泥土披薩窯 (Muntjac Earth Pizza Oven)',
    shortName: '山羌泥土披薩窯',
    enName: 'Muntjac Earth Pizza Oven',
    icon: 'fa-pizza-slice',
    position: { x: 46, y: 0, z: 24 },
    cameraOffset: { x: -10, y: 18, z: 18 },
    tags: ['泥土山羌造型', '手作土坏柴燒窯', '食農教育', '在地生態美學'],
    desc: '平面圖標示「窯烤區」：座落於男學生宿舍正西南角獨立草坪。由師生發揮在地生態美學與手作工藝，運用自然紅土坏泥精心捏塑而成的「山羌造型泥土披薩窯」，具備食農烘焙體驗與環境教育意義。',
    floors: [
      { floor: '窯烤設施', desc: '泥土山羌造型柴燒窯、防雨原木涼亭、備料工作臺、柴火堆放區' }
    ],
    accessibility: [
      '平緩地面步道，適合全體師生一同參與體驗'
    ]
  },
  {
    id: 'female_dorm',
    name: '女學生宿舍與廣場 (5層樓)',
    shortName: '女學生宿舍',
    enName: 'Girls Dormitory & Plaza',
    icon: 'fa-hotel',
    position: { x: 82, y: 0, z: 10 },
    cameraOffset: { x: -20, y: 42, z: 36 },
    tags: ['5層樓', '學生宿舍', '女宿廣場', '學生餐廳', '生態復育池', '無障礙電梯塔'],
    desc: '依「雙溪高中校舍平面圖」標準配置：女學生宿舍樓高五層（5F），南面配置寬廣的「女學生宿舍廣場」與親水景觀；北側連通中央廚房與學生餐廳，西北側鄰接生態復育池，南側配置直通 5F 之專屬無障礙電梯塔。',
    floors: [
      {
        floor: '1F',
        desc: '女宿交誼大廳、無障礙友善寢室、生活輔導室、宿舍廣場',
        rooms: [
          { name: '女宿交誼大廳', type: 'service', desc: '接待會客、休閒交誼大廳' },
          { name: '舍監與生活輔導室', type: 'office', desc: '住宿生生活照護與安全值勤室' },
          { name: '無障礙友善寢室', type: 'accessible', desc: '寬敞輪椅出入無門檻寢室' }
        ]
      },
      {
        floor: '2F-5F',
        desc: '女學生宿舍標準寢室、景觀陽臺、洗衣房',
        rooms: [
          { name: '女學生標準寢室', type: 'service', desc: '標準採光寢室與衛浴設備' },
          { name: '洗衣間與曬衣大露臺', type: 'service', desc: '洗衣機、脫水機與獨立曬衣露臺' }
        ]
      },
      { floor: '南側廣場', desc: '大型圓形親水景觀水池、幾何觀景步道、戶外休憩長椅' }
    ],
    accessibility: [
      '南側外牆配置直通 5F 之獨立無障礙電梯塔',
      '親水廣場設有無障礙環形緩坡漫步道'
    ]
  },
  {
    id: 'dining_kitchen',
    name: '學生餐廳、中央廚房與食農教學區',
    shortName: '餐廳、廚房與食農',
    enName: 'Dining Hall, Kitchen & Agri-food Area',
    icon: 'fa-utensils',
    position: { x: 95, y: 0, z: 5 },
    cameraOffset: { x: -15, y: 32, z: 30 },
    tags: ['學校餐廳', '中央廚房', '洗滌區', '食農教學區', '營養午餐'],
    desc: '依「雙溪高中校舍平面圖」標準配置：連通女學生宿舍，包含：全校學生大餐廳、現代化中央廚房、洗滌區，以及南側緊鄰之「食農教學區」，為食農教育與全校師生營養午餐的核心基地。',
    floors: [
      {
        floor: '餐飲與實作區',
        desc: '學生大餐廳、中央烹飪廚房、洗滌區、食農教學區',
        rooms: [
          { name: '全校學生大餐廳', type: 'service', desc: '全校師生集體用餐大廳與取餐動線' },
          { name: '中央營養午餐廚房', type: 'service', desc: '高規格中央供餐烹飪廚房與保溫配膳室' },
          { name: '餐具洗滌區', type: 'service', desc: '標準高溫消毒與自動化餐具洗滌區' },
          { name: '食農教學區', type: 'special', desc: '水耕蔬菜、有機農園與食農體驗教育園地' }
        ]
      }
    ],
    accessibility: [
      '餐廳大門平整無階梯，配置無障礙寬門與專屬用餐席'
    ]
  },
  {
    id: 'bbq_area',
    name: '親溪烤肉區 (BBQ Area)',
    shortName: '烤肉區',
    enName: 'Riverside BBQ Area',
    icon: 'fa-fire-burner',
    position: { x: 105, y: 0, z: 10 },
    cameraOffset: { x: -12, y: 24, z: 25 },
    tags: ['戶外休閒', '臨平林溪', '烤肉野炊'],
    desc: '位於餐廳正東側、依傍清澈平林溪畔的戶外烤肉活動區，設有固定式烤肉磚爐臺與景觀木質遮陽野餐桌椅。',
    floors: [
      { floor: '戶外', desc: '排式烤肉磚爐、戶外洗滌水槽、親溪野餐座椅、平林溪護欄' }
    ],
    accessibility: [
      '平緩地坪，連接環校平整步道'
    ]
  },
  {
    id: 'wetland',
    name: '人工溼地生態園區',
    shortName: '人工溼地',
    enName: 'Artificial Wetland Ecological Park',
    icon: 'fa-water',
    position: { x: 80, y: 0, z: 36 },
    cameraOffset: { x: -22, y: 38, z: 42 },
    tags: ['人工溼地', '生態池塘', '木棧道', 'S型步道'],
    desc: '位於校園東南角平林溪環抱處，包含天然雙水池塘、池間橫條木棧拱橋與 S 型景觀漫步道，是學校生態環境教育的自然教室。',
    floors: [
      { floor: '溼地區', desc: '水生淨化池、沉澱池、橫條景觀木棧橋、S型白色步道' }
    ],
    accessibility: [
      '全線鋪設平整景觀木棧道，輪椅可輕鬆親近自然水岸'
    ]
  },
  {
    id: 'paintball',
    name: '漆彈場 (Paintball Field)',
    shortName: '漆彈場',
    enName: 'Paintball Field',
    icon: 'fa-crosshairs',
    position: { x: 82, y: 0, z: 54 },
    cameraOffset: { x: -20, y: 30, z: 40 },
    tags: ['體育活動', '探索教育', '漆彈射擊場'],
    desc: '位於人工溼地南側、緊鄰平林溪彎道的專屬漆彈野戰運動場，為雙溪高中特色戶外探索課程場地。',
    floors: [
      { floor: '運動場', desc: '漆彈障礙掩體戰術場地、安全防護網、裝備整備區' }
    ],
    accessibility: [
      '平緩地坪，具備安全無障礙觀摩區'
    ]
  },
  {
    id: 'river',
    name: '平林溪 (Pinglin River)',
    shortName: '平林溪',
    enName: 'Pinglin River',
    icon: 'fa-water',
    position: { x: 10, y: 0, z: 58 },
    cameraOffset: { x: 0, y: 55, z: 75 },
    tags: ['天然水系', '環校河流', '沿溪木棧道', '雙車道走道', '雙溪母親河'],
    desc: '清澈美麗的平林溪順沿校園南側流淌，溪水潺潺。溪流與校園建築之間設有一條可供兩輛汽車會車通行的平整走道，並緊貼溪邊築有木質親水木棧道與觀魚平臺，溪畔柳堤倒映，環境極為清幽。',
    floors: [
      { floor: '水岸空間', desc: '天然鵝卵石溪床、沿溪親水木棧道、觀魚平臺、雙向通車走道' }
    ],
    accessibility: [
      '沿線配置高規格防護安全護欄及平整觀景道，無障礙通行順暢'
    ]
  },
  {
    id: 'dog_xiangxiang',
    name: '校狗「祥祥」 (Campus Dog Xiang-Xiang)',
    shortName: '校狗祥祥',
    enName: 'Campus Dog Xiang-Xiang',
    icon: 'fa-shield-dog',
    position: { x: -45, y: 0, z: 14 },
    cameraOffset: { x: 6, y: 9, z: 12 },
    tags: ['雙溪校狗', '校園守護犬', '招牌立耳白尾尖', '親人溫馴', '自由漫步巡邏中'],
    desc: '雙溪高中的大明星守護犬「祥祥」！黑白相間乳牛斑紋、胸前戴著帥氣米白項圈、兩隻招牌黑色大立耳、高高翹起的長尾巴末端帶有純白尾尖。祥祥平日溫和親人、恪盡職守，在校園各處步道、花園、操場與沿溪木棧道自由巡邏漫步，是全校師生最喜愛的校園大家庭成員！',
    floors: [
      { floor: '目前狀態', desc: '在校園各處自由巡邏漫步中，守護全校師生安全' },
      { floor: '外貌特徵', desc: '黑色精神立耳、黑白花斑身軀、米白項圈、招牌白尾尖' }
    ],
    accessibility: [
      '祥祥個性極度溫馴友善，全體師生與訪客皆可溫柔與他互動'
    ]
  }
];

// Three.js 全域變數
let scene, camera, renderer, controls;
let buildingObjects = new Map(); // 儲存建築物件，方便拾取與高亮
let raycaster, mouse;
let hoveredObject = null;
let selectedBuilding = null;
let labelsVisible = true;
let isTourRunning = false;
let tourTimeout = null;

// 日夜模式與校園夜燈系統
let isNightMode = false;
let sceneLights = {};
let nightPointLights = [];
let campusMaterials = {};

// 校狗祥祥物件與巡邏狀態
let dogGroup = null;
let dogAnimator = null;
const clock = new THREE.Clock();

// 平林溪錦鯉生態魚群陣列
const riverFishList = [];

// 初始化應用程式
function init() {
  const container = document.getElementById('webgl-container');

  // 1. 建立場景（預設為晴朗清新的白天青空）
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfe0f7);
  scene.fog = new THREE.FogExp2(0xbfe0f7, 0.0022);

  // 2. 建立攝影機（透視相機）
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 2500);
  camera.position.set(-40, 145, 175);

  // 3. 建立渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // 4. 控制器 (OrbitControls)
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = true;
  controls.maxPolarAngle = Math.PI / 2.05; // 避免鏡頭鑽入地面
  controls.minDistance = 20;
  controls.maxDistance = 600;
  controls.target.set(0, 0, 8);

  // 5. 燈光配置
  setupLighting();

  // 6. 建構校園 3D 地形、河流與建築
  buildTerrainAndRiver();
  buildCampusBuildings();
  buildTreesAndDetails();

  // 6-A. 依「雙溪高中校舍平面圖」建立各大樓室內樓板、走廊隔間與3D浮空教室標籤
  buildIndoorRoomsForBuildings();
  setupRoomSearchSystem();

  // 6-B. 建構全校實體路燈系統與夜燈景觀（支援白天/黑夜模式切換）
  buildStreetLampsAndNightLights();

  // 6-C. 建立雙溪高中校狗「祥祥」巡邏模型（依真實照片特徵建模）
  createCampusDog();

  // 6-D. ★ 依使用者指示：平林溪水中增加大量悠游游動的錦鯉生態魚群 ★
  buildPinglinRiverCarp();

  // 7. 射線拾取設定
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // 8. 介面互動與事件綁定
  setupUI();
  setupEventListeners();
  setupMascotDrag();
  setupNavWindowInteractions();

  // 9. 動畫循環
  animate();
}

/**
 * 燈光配置（模擬晴朗陽光與環境漫射）
 */
function setupLighting() {
  // 環境光
  const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.7);
  scene.add(ambientLight);

  // 半球光（模擬天空與草地反光）
  const hemiLight = new THREE.HemisphereLight(0xbfdbfe, 0x166534, 0.5);
  hemiLight.position.set(0, 100, 0);
  scene.add(hemiLight);

  // 主太陽光
  const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
  sunLight.position.set(-150, 200, 120);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 600;
  const shadowDist = 180;
  sunLight.shadow.camera.left = -shadowDist;
  sunLight.shadow.camera.right = shadowDist;
  sunLight.shadow.camera.top = shadowDist;
  sunLight.shadow.camera.bottom = -shadowDist;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  // 補光（使陰影處更具立體感）
  const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.45);
  fillLight.position.set(150, 80, -100);
  scene.add(fillLight);

  // 儲存燈光參照供白天/黑夜模式切換使用
  sceneLights = { ambientLight, hemiLight, sunLight, fillLight };
}

/**
 * 建構基礎地形、環繞山脈與平林溪（依原圖 U 型走勢校正）
 */
function buildTerrainAndRiver() {
  // 1. 校園主基底平面
  const groundGeo = new THREE.PlaneGeometry(360, 240);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a1e, // 翠綠深草皮色
    roughness: 0.9,
    metalness: 0.05
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // 2. 校園主要走道路網與環校雙向車道（依使用者指示：溪與學校間保持兩輛汽車通行的寬度走道）
  const roadGroup = new THREE.Group();
  const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 }); // 柏油深灰
  const roadMarkingYellow = new THREE.MeshBasicMaterial({ color: 0xfacc15 }); // 車道中央分向黃線
  const roadMarkingWhite = new THREE.MeshBasicMaterial({ color: 0xf8fafc }); // 路側白線
  const walkwayBrickMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.75 }); // 操場南側紅褐色步道

  // (1) ★ 依使用者指示：梅竹蹊路西段（南北向直達校門口與大橋路口）★
  // 自西北角彎道起點 (Z: -36) 筆直向南一路貫通至大橋路口 (Z: 33.5)，長度 69.5m
  const meizhuStraightRoad = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.12, 69.5), asphaltMat);
  meizhuStraightRoad.position.set(-106, 0.06, -1.25);
  meizhuStraightRoad.receiveShadow = true;
  roadGroup.add(meizhuStraightRoad);

  // 西段梅竹蹊路中央雙黃分向實線（長 69.5m 沿 Z 軸）
  const meizhuYellow1 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 69.5), roadMarkingYellow);
  meizhuYellow1.rotation.x = -Math.PI / 2;
  meizhuYellow1.position.set(-106.12, 0.13, -1.25);
  const meizhuYellow2 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 69.5), roadMarkingYellow);
  meizhuYellow2.rotation.x = -Math.PI / 2;
  meizhuYellow2.position.set(-105.88, 0.13, -1.25);
  roadGroup.add(meizhuYellow1, meizhuYellow2);

  // 西段梅竹蹊路兩側路緣白線（在校門口路口前 Z: 28 處自然停止，絕不闖進路口交會區）
  const meizhuWhiteW = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 64), roadMarkingWhite);
  meizhuWhiteW.rotation.x = -Math.PI / 2;
  meizhuWhiteW.position.set(-110.4, 0.13, -4.0);
  const meizhuWhiteE = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 64), roadMarkingWhite);
  meizhuWhiteE.rotation.x = -Math.PI / 2;
  meizhuWhiteE.position.set(-101.6, 0.13, -4.0);
  roadGroup.add(meizhuWhiteW, meizhuWhiteE);

  // 西側人行道鋪面（依使用者指示 media_1791526713260.png：徹底去除南側突兀伸出的長段，收束於 Z: 16，不再侵入校門口草坪）
  const meizhuWestSidewalk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.16, 52), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.85 }));
  meizhuWestSidewalk.position.set(-112.0, 0.08, -10.0);
  meizhuWestSidewalk.receiveShadow = true;
  roadGroup.add(meizhuWestSidewalk);

  // (1-B) ★ 西北角平滑連續 90 度弧形轉彎彎道（解決 media_1791525392181.png 標註的直角交叉生硬問題！）★
  // 建立輔助幾何帶狀路面函式
  const createCurvedRoadGeo = (curve, width, segments = 32, yOffset = 0.06) => {
    const points = curve.getPoints(segments);
    const vertices = [];
    const indices = [];
    for (let i = 0; i <= segments; i++) {
      const p = points[i];
      const tangent = curve.getTangent(i / segments);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const left = new THREE.Vector3().copy(p).addScaledVector(normal, width / 2);
      const right = new THREE.Vector3().copy(p).addScaledVector(normal, -width / 2);
      vertices.push(left.x, yOffset, left.z, right.x, yOffset, right.z);
      if (i < segments) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  };

  // 西北角中心轉彎曲線（自北段 X: -96, Z: -46 平滑圓弧左轉至西段 X: -106, Z: -36）
  const cornerCenterCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-96, 0, -46),
    new THREE.Vector3(-101.5, 0, -45.5),
    new THREE.Vector3(-105.0, 0, -42.0),
    new THREE.Vector3(-106, 0, -36)
  ]);

  // 1. 寬 9.6m 圓滑瀝青路面
  const cornerRoadMesh = new THREE.Mesh(createCurvedRoadGeo(cornerCenterCurve, 9.6, 32, 0.06), asphaltMat);
  cornerRoadMesh.receiveShadow = true;
  roadGroup.add(cornerRoadMesh);

  // 2. 圓滑轉彎中央雙黃線（相距 0.22m 沿曲線平滑轉彎，絕不十字交叉穿刺！）
  const yellowCurve1 = new THREE.CatmullRomCurve3(cornerCenterCurve.getPoints(32).map((p, idx) => {
    const tangent = cornerCenterCurve.getTangent(idx / 32);
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    return new THREE.Vector3().copy(p).addScaledVector(normal, 0.11);
  }));
  const yellowCurve2 = new THREE.CatmullRomCurve3(cornerCenterCurve.getPoints(32).map((p, idx) => {
    const tangent = cornerCenterCurve.getTangent(idx / 32);
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    return new THREE.Vector3().copy(p).addScaledVector(normal, -0.11);
  }));
  const cornerYellowMesh1 = new THREE.Mesh(createCurvedRoadGeo(yellowCurve1, 0.16, 32, 0.13), roadMarkingYellow);
  const cornerYellowMesh2 = new THREE.Mesh(createCurvedRoadGeo(yellowCurve2, 0.16, 32, 0.13), roadMarkingYellow);
  roadGroup.add(cornerYellowMesh1, cornerYellowMesh2);

  // 3. 轉彎外側人行道圓弧銜接
  const sidewalkCurve = new THREE.CatmullRomCurve3(cornerCenterCurve.getPoints(32).map((p, idx) => {
    const tangent = cornerCenterCurve.getTangent(idx / 32);
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    return new THREE.Vector3().copy(p).addScaledVector(normal, 5.9);
  }));
  const cornerSidewalkMesh = new THREE.Mesh(createCurvedRoadGeo(sidewalkCurve, 2.2, 32, 0.08), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.85 }));
  roadGroup.add(cornerSidewalkMesh);

  // (1-C) 校園南側沿溪雙向雙車道（自校門口馬路與大橋路口 X: -106 一路筆直通往東區宿舍與人工溼地 X: 110）
  const ringRoadSouth = new THREE.Mesh(new THREE.BoxGeometry(218, 0.12, 7.8), asphaltMat);
  ringRoadSouth.position.set(3, 0.06, 33.5);
  ringRoadSouth.receiveShadow = true;
  roadGroup.add(ringRoadSouth);

  // 沿溪雙車道中央黃色分向虛線（依使用者指示：路口交會處淨空，自 X: -90 開始向東劃設，絕不伸入路口）
  for (let lx = -90; lx <= 108; lx += 10) {
    const dashLine = new THREE.Mesh(new THREE.PlaneGeometry(5, 0.22), roadMarkingYellow);
    dashLine.rotation.x = -Math.PI / 2;
    dashLine.position.set(lx, 0.13, 33.5);
    roadGroup.add(dashLine);
  }

  // 沿溪雙車道南北兩側白色邊線（依使用者指示：自路口東側 X: -94 開始向東延伸，絕不橫切路口形成突兀白線）
  const edgeLineNorth = new THREE.Mesh(new THREE.PlaneGeometry(206, 0.2), roadMarkingWhite);
  edgeLineNorth.rotation.x = -Math.PI / 2;
  edgeLineNorth.position.set(9, 0.13, 29.8);
  const edgeLineSouth = new THREE.Mesh(new THREE.PlaneGeometry(206, 0.2), roadMarkingWhite);
  edgeLineSouth.rotation.x = -Math.PI / 2;
  edgeLineSouth.position.set(9, 0.13, 37.2);
  roadGroup.add(edgeLineNorth, edgeLineSouth);

  // 校門迎賓廣場前方大路口平整柏油銜接面（覆蓋校門口迎賓口與大智樓西南角）
  const gatePlazaRoadJunction = new THREE.Mesh(new THREE.BoxGeometry(18, 0.12, 28), asphaltMat);
  gatePlazaRoadJunction.position.set(-106, 0.06, 18);
  gatePlazaRoadJunction.receiveShadow = true;
  roadGroup.add(gatePlazaRoadJunction);

  // (2) 田徑場西側南北向主幹道（教學大樓東側，北起側門，南接環校雙車道）
  const northSouthAvenue = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.12, 66), asphaltMat);
  northSouthAvenue.position.set(-27, 0.06, -2);
  northSouthAvenue.receiveShadow = true;
  roadGroup.add(northSouthAvenue);

  // (3) 操場南側寬闊人行幹道（跑道南側、風雨操場北側之通道）
  const trackSouthPath = new THREE.Mesh(new THREE.BoxGeometry(72, 0.13, 5), walkwayBrickMat);
  trackSouthPath.position.set(10, 0.07, 4.5);
  trackSouthPath.receiveShadow = true;
  roadGroup.add(trackSouthPath);

  // (4) 東區活動中心前道路（通往男生宿舍、職務宿舍與女宿）
  const eastRoad = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.12, 75), asphaltMat);
  eastRoad.position.set(45, 0.06, 8);
  eastRoad.receiveShadow = true;
  roadGroup.add(eastRoad);

  // (5) ★ 北側梅竹蹊路（Meizhuxi Road - 自西北角彎道起點 X: -96 一路平順通往東側烤肉區 X: 110）★
  // 雙溪高中臨路主幹道，寬 8m，長度 206m（中心位於 X: 7）
  const meizhuxiRoad = new THREE.Mesh(new THREE.BoxGeometry(206, 0.12, 8), asphaltMat);
  meizhuxiRoad.position.set(7, 0.06, -46);
  meizhuxiRoad.receiveShadow = true;
  roadGroup.add(meizhuxiRoad);

  // 梅竹蹊路中央雙黃實線（長 206m，自 X: -96 直通東端）
  const doubleYellow1 = new THREE.Mesh(new THREE.PlaneGeometry(206, 0.15), roadMarkingYellow);
  doubleYellow1.rotation.x = -Math.PI / 2;
  doubleYellow1.position.set(7, 0.13, -46.12);
  const doubleYellow2 = new THREE.Mesh(new THREE.PlaneGeometry(206, 0.15), roadMarkingYellow);
  doubleYellow2.rotation.x = -Math.PI / 2;
  doubleYellow2.position.set(7, 0.13, -45.88);
  roadGroup.add(doubleYellow1, doubleYellow2);

  // 梅竹蹊路外側邊界白線
  const meizhuWhiteN = new THREE.Mesh(new THREE.PlaneGeometry(206, 0.18), roadMarkingWhite);
  meizhuWhiteN.rotation.x = -Math.PI / 2;
  meizhuWhiteN.position.set(7, 0.13, -49.7);
  const meizhuWhiteS = new THREE.Mesh(new THREE.PlaneGeometry(206, 0.18), roadMarkingWhite);
  meizhuWhiteS.rotation.x = -Math.PI / 2;
  meizhuWhiteS.position.set(7, 0.13, -42.3);
  roadGroup.add(meizhuWhiteN, meizhuWhiteS);

  // 學校臨街人行道鋪面（淺灰人行道磚，寬 2.5m，長 206m）
  const meizhuSidewalk = new THREE.Mesh(new THREE.BoxGeometry(206, 0.16, 2.5), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.85 }));
  meizhuSidewalk.position.set(7, 0.08, -40.8);
  meizhuSidewalk.receiveShadow = true;
  roadGroup.add(meizhuSidewalk);

  // (7) ★ 沿梅竹蹊路學校經典景觀圍牆（依街景照片 media_1791474604482.jpg）★
  // 洗石子水泥方柱 + 經典亮天藍格柵金屬欄杆 + 藍灰石基座
  const wallPillarMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  const fenceBlueMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35, metalness: 0.6 });
  const fenceBaseMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.75 });

  const fenceGroup = new THREE.Group();
  // 連續矮牆基座
  const fenceBase = new THREE.Mesh(new THREE.BoxGeometry(200, 0.5, 0.35), fenceBaseMat);
  fenceBase.position.set(0, 0.25, -39.4);
  fenceGroup.add(fenceBase);

  // 每隔 3.5 米一座水泥立柱與亮藍色格柵面板
  for (let fx = -100; fx <= 95; fx += 3.5) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.6, 0.45), wallPillarMat);
    pillar.position.set(fx, 0.8, -39.4);
    pillar.castShadow = true;
    fenceGroup.add(pillar);

    // 柱間亮天藍色金屬格柵
    if (fx < 95) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(3.05, 1.0, 0.08), fenceBlueMat);
      panel.position.set(fx + 1.75, 1.0, -39.4);
      fenceGroup.add(panel);
    }
  }

  // (8) ★ 街景照片極度醒目的長排自行車與機車遮雨棚 ★
  // 位於圍牆內側、大勇樓與教學大樓北側
  const bikeShedGroup = new THREE.Group();
  const shedRoofMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.65 }); // 深紅棕金屬浪板
  const shedSteelMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5, metalness: 0.7 });

  // 長達 68 米之遮雨棚（長 68m, 寬 3.2m, 單坡向外傾斜）
  const shedRoof = new THREE.Mesh(new THREE.BoxGeometry(68, 0.12, 3.2), shedRoofMat);
  shedRoof.rotation.x = -0.12;
  shedRoof.position.set(-55, 2.7, -36.5);
  bikeShedGroup.add(shedRoof);

  // 遮雨棚支撐鋼柱
  for (let sx = -88; sx <= -22; sx += 6) {
    const col1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.8, 8), shedSteelMat);
    col1.position.set(sx, 1.4, -37.8);
    const col2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.5, 8), shedSteelMat);
    col2.position.set(sx, 1.25, -35.2);
    bikeShedGroup.add(col1, col2);
  }
  fenceGroup.add(bikeShedGroup);
  scene.add(fenceGroup);

  scene.add(roadGroup);

  // 3. 沿著溪邊的木棧道（Wood Boardwalk - 依使用者指示：自大橋東側向東延伸，路口完全避讓，不橫截大橋！）
  const boardwalkGroup = new THREE.Group();
  const woodDeckMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.78 }); // 溫潤防腐木質
  const woodRailingMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.82 }); // 木護欄

  // (1) 沿溪木棧道主體（自平林溪大橋東側 X: -97 一路延伸至東區宿舍 X: 111，在大橋路口完全避讓，絕不橫切大橋路面！）
  const boardwalkMain = new THREE.Mesh(new THREE.BoxGeometry(208, 0.18, 3.0), woodDeckMat);
  boardwalkMain.position.set(7, 0.15, 39.5);
  boardwalkMain.receiveShadow = true;
  boardwalkGroup.add(boardwalkMain);

  // (2) 木棧板刻線與靠溪側防護欄杆
  const railingBar = new THREE.Mesh(new THREE.BoxGeometry(208, 0.12, 0.15), woodRailingMat);
  railingBar.position.set(7, 1.0, 40.9);
  const midRailingBar = new THREE.Mesh(new THREE.BoxGeometry(208, 0.08, 0.12), woodRailingMat);
  midRailingBar.position.set(7, 0.6, 40.9);
  boardwalkGroup.add(railingBar, midRailingBar);

  // 連續安全立柱（自大橋東側 X: -96 至 X: 110 每 5 米一根）
  for (let bx = -96; bx <= 110; bx += 5) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.95, 8), woodRailingMat);
    post.position.set(bx, 0.6, 40.9);
    boardwalkGroup.add(post);

    // 沿棧道休閒觀景木長椅（每隔 25 米設置一張）
    if (bx % 25 === 0) {
      const bench = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.45, 0.75), woodDeckMat);
      bench.position.set(bx, 0.45, 38.6);
      boardwalkGroup.add(bench);
    }
  }

  scene.add(boardwalkGroup);

  // 4. 平林溪（Pinglin River）筆直河道（依使用者指示 media_1791523834238.png：平林溪整條筆直平行於校園南側，完全不彎到校門口前面！）
  const riverCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-190, -0.09, 56),  // 筆直西向出校園
    new THREE.Vector3(-150, -0.09, 56),  // 筆直平林溪西段（大橋西側，筆直向西流淌，完全不向北彎曲）
    new THREE.Vector3(-105, -0.09, 56),  // 正好穿過平林溪大橋底下
    new THREE.Vector3(-75, -0.09, 56),   // 大智樓南側柳堤外
    new THREE.Vector3(-35, -0.09, 55),   // 觀魚平臺木棧道外
    new THREE.Vector3(10, -0.09, 55),    // 操場、風雨操場正南方
    new THREE.Vector3(55, -0.09, 57),    // 男生宿舍南側
    new THREE.Vector3(95, -0.09, 62),    // 女生宿舍與餐廳南側
    new THREE.Vector3(130, -0.09, 70),   // 人工濕地東南角大弧形彎
    new THREE.Vector3(145, -0.09, 25),   // 轉折向北
    new THREE.Vector3(142, -0.09, -35),  // 烤肉區與人工濕地東側
    new THREE.Vector3(136, -0.09, -95)   // 延伸出校園
  ]);

  // 河道水體（平緩清澈：半徑 15，壓平後水面頂部自然維持在 Y: -0.03，平穩流經橋下，永不淹沒路面）
  const riverGeo = new THREE.TubeGeometry(riverCurve, 100, 15, 16, false);
  const riverMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // 清澈蔚藍水色
    roughness: 0.1,
    metalness: 0.85,
    transparent: true,
    opacity: 0.88
  });
  const river = new THREE.Mesh(riverGeo, riverMat);
  river.scale.set(1, 0.004, 1); // 壓平使水面頂部維持在 Y: -0.03
  river.receiveShadow = true;
  scene.add(river);

  // 平林溪河床沙洲淺灘底座（半徑 17，自然深淺層次）
  const riverBedGeo = new THREE.TubeGeometry(riverCurve, 100, 17, 12, false);
  const riverBedMat = new THREE.MeshStandardMaterial({
    color: 0x0f3b58,
    roughness: 0.9
  });
  const riverBed = new THREE.Mesh(riverBedGeo, riverBedMat);
  riverBed.scale.set(1, 0.006, 1);
  riverBed.position.y = -0.05;
  scene.add(riverBed);

  river.userData = { buildingId: 'river' };
  buildingObjects.set('river', river);

  // 4. 周圍遠山群（呼應雙溪多山自然環境）
  const mountainGroup = new THREE.Group();
  const mountainMat = new THREE.MeshStandardMaterial({
    color: 0x163820,
    roughness: 0.95,
    flatShading: true
  });

  const mountainPositions = [
    { x: -160, z: -100, r: 65, h: 75 },
    { x: -95, z: -120, r: 55, h: 80 },
    { x: -20, z: -130, r: 70, h: 90 },
    { x: 50, z: -125, r: 60, h: 85 },
    { x: 125, z: -110, r: 65, h: 75 },
    { x: 160, z: -40, r: 50, h: 65 },
    { x: 165, z: 30, r: 55, h: 70 }
  ];

  mountainPositions.forEach(m => {
    const coneGeo = new THREE.ConeGeometry(m.r, m.h, 7);
    const mountain = new THREE.Mesh(coneGeo, mountainMat);
    mountain.position.set(m.x, m.h / 2, m.z);
    mountain.castShadow = true;
    mountainGroup.add(mountain);
  });
  scene.add(mountainGroup);
}

/**
 * /**
 * 建構校園各大建築物、操場與設施（完全依據學校公告正式版導覽圖建構）
 */
function buildCampusBuildings() {
  const materials = {
    brickOrange: new THREE.MeshStandardMaterial({ color: 0xdd6b20, roughness: 0.65 }), // 大智樓/大勇樓磚橘
    teachingOrange: new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.6 }), // 教學大樓橘黃
    whiteConcrete: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.7 }), // 現代米白混凝土
    darkRoof: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 }), // 屋頂深灰
    gymRoof: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 }), // 活動中心屋頂
    windShelterGreen: new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.5 }), // 風雨操場綠棚
    shrineRed: new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 }), // 土地公廟朱紅
    windowDark: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.7 }), // 窗格黑
    trackRed: new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.8 }), // 操場跑道紅
    turfGreen: new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.85 }), // 草坪綠
    courtGreen: new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.8 }), // 球場綠
    waterWetland: new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.15, metalness: 0.5, transparent: true, opacity: 0.85 }),
    parkingLot: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 }), // 停車場深灰
    lampBulb: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.2, emissive: 0x000000, emissiveIntensity: 0 }), // 夜燈燈泡材質
    // ★ 依據航拍照 media_1791473269865 特徵專用材質 ★
    pitchedRedRoof: new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 }), // 鮮豔朱紅斜坡金屬瓦屋頂
    pitchedRedRidge: new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.35 }), // 屋脊深紅飾條
    dormerRed: new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 }), // 老虎窗鮮紅頂
    corridorWall: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 }), // 走廊白色混凝土
    railingMetal: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3, metalness: 0.7 }), // 不鏽鋼銀白金屬扶手
    pavilionGreen: new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.35 }), // 中庭八卦涼亭琉璃翠綠頂
    pineGreenDark: new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.85, flatShading: true }), // 南洋杉高聳巨松蒼綠色
    // ★ 依據最新照片 media_1791473588241 等特寫專用材質 ★
    solarPanelMat: new THREE.MeshStandardMaterial({ color: 0x091e3a, roughness: 0.18, metalness: 0.85, emissive: 0x0369a1, emissiveIntensity: 0.08 }), // 太陽能板多晶矽深藍黑
    solarFrameMat: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4, metalness: 0.8 }), // 太陽能鋁合金邊框
    skyBlueCourt: new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.7 }), // 照片中標誌性之亮天藍色 PU 地坪！
    canopyFabricWhite: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.45, side: THREE.DoubleSide }) // 風雨操場大跨距白色弧形張拉膜
  };
  campusMaterials = materials;

  // ================= 1. 校門口與迎賓廣場 (Gate & Welcome Plaza) =================
  // 使用者明確指定：「校門口沒這麼小」、「那個藍色的建築物昰警衛室，警衛室在大智樓的正前方。」
  // 「要寫上新北市立雙溪高級中學，並且還有下面的英文」！
  // 依據實景航拍（media_1791470571661）與特寫高解析照（media_1791472693976）精密重構：
  // 1. 警衛室大器座落於大智樓西山牆正前方 (X: -102.5, Z: 24)，寬度完全對齊大智樓！
  // 2. 藍色波浪大鋼門拓寬至 16m，迎賓圓形拼花廣場擴大至直徑 24m！
  // 3. 校名牆銘牌以 CanvasTexture 繪製高解析「新北市立雙溪高級中學」與「New Taipei Municipal Shuang-Xi High School」！
  const gateGroup = new THREE.Group();

  // 特色專用材質
  const gateBlue = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.28, metalness: 0.65 }); // 亮藍色金屬漆
  const gateSkyBlue = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.35, metalness: 0.5 }); // 天藍色水波飾條
  const pebbleWallMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9 }); // 洗石子灰褐砂岩
  const badgeFrameMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.2, metalness: 0.9 }); // 校徽金色外圈
  const badgeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }); // 校徽白色底面
  const redAlertMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2, emissive: 0x991b1b, emissiveIntensity: 0.5 }); // 門柱紅警示燈

  // 輔助函式：動態繪製高解析度校名銘牌貼圖（中英文雙排立體金色字樣）
  const createSchoolNameTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // 1. 下方黑色金屬銘牌飾底
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.roundRect(80, 305, 1888, 145, 18);
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#d97706';
    ctx.stroke();

    // 2. 上方「新北市立雙溪高級中學」立體正楷大字
    const chineseText = '新北市立雙溪高級中學';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 立體深褐色陰影
    ctx.font = '900 155px "Noto Serif TC", "Songti TC", "STSong", "Microsoft JhengHei", serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText(chineseText, 1028, 178);

    // 正面金色漸層
    const goldGrad = ctx.createLinearGradient(0, 70, 0, 240);
    goldGrad.addColorStop(0, '#fef08a');
    goldGrad.addColorStop(0.25, '#f59e0b');
    goldGrad.addColorStop(0.7, '#d97706');
    goldGrad.addColorStop(1, '#b45309');

    ctx.fillStyle = goldGrad;
    ctx.fillText(chineseText, 1024, 170);

    // 金色高光細邊框
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fef08a';
    ctx.strokeText(chineseText, 1024, 170);

    // 3. 下方「New Taipei Municipal Shuang-Xi High School」金色英文
    const engText = 'New Taipei Municipal Shuang-Xi High School';
    ctx.font = '700 68px "Arial", "Helvetica", "Segoe UI", sans-serif';
    
    // 英文陰影
    ctx.fillStyle = '#000000';
    ctx.fillText(engText, 1026, 382);

    // 英文亮金色
    const engGrad = ctx.createLinearGradient(0, 335, 0, 420);
    engGrad.addColorStop(0, '#fef08a');
    engGrad.addColorStop(0.5, '#f59e0b');
    engGrad.addColorStop(1, '#d97706');

    ctx.fillStyle = engGrad;
    ctx.fillText(engText, 1024, 380);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // (1) ★ 依使用者明確指示：平林溪大橋全段為完全平整連貫之平坦道路，徹底消除突起斜坡與接縫！★
  // 【一體化平坦大道設計】：
  // 1. 路面全線嚴格齊平地面道路標高 (頂面標高 Y: 0.12，中心 y: 0.06，厚度 0.12)，零落差、無斜坡、無斷層黑縫！
  // 2. 自校門口沿溪大道 (Z: -22.5) 直通對岸南端公路 (Z: 44)，長達 66.5m 一體成型平整深灰柏油鋪面！
  // 3. 中央雙黃分向線與兩側白線自北向南筆直貫通，跨河段兩側設置平直大氣白色安全護欄與端柱！
  const bridgeGrp = new THREE.Group();
  const bridgeAsphaltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
  const bridgeYellowLineMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const bridgeWhiteLineMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

  const totalRoadLen = 66.5; // 自北路口 (z: -22.5) 至南端 (z: 44) 總長度
  const roadCenterZ = 10.75; // 道路中心點

  // 1. 底層白色混凝土承重主梁托座（僅位於跨水段 Z: -18 ~ 18，厚度 0.08m，位置 y: -0.02，支撐於路面下方）
  const bridgeMain = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.08, 36), materials.whiteConcrete);
  bridgeMain.position.set(0, -0.02, 0);
  bridgeMain.receiveShadow = true;
  bridgeGrp.add(bridgeMain);

  // 2. 一體化平整深灰柏油大馬路（厚度 0.12m，頂面標高 Y: 0.12，完全平整連貫，零接縫黑線）
  const bridgeRoad = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.12, totalRoadLen), bridgeAsphaltMat);
  bridgeRoad.position.set(0, 0.06, roadCenterZ);
  bridgeRoad.receiveShadow = true;
  bridgeGrp.add(bridgeRoad);

  // 3. 中央雙黃分向實線（長 66.5m 筆直貫穿全路段，標高 Y: 0.13，完全平整連續）
  const bYellow1 = new THREE.Mesh(new THREE.PlaneGeometry(0.16, totalRoadLen), bridgeYellowLineMat);
  bYellow1.rotation.x = -Math.PI / 2;
  bYellow1.position.set(-0.11, 0.13, roadCenterZ);
  const bYellow2 = new THREE.Mesh(new THREE.PlaneGeometry(0.16, totalRoadLen), bridgeYellowLineMat);
  bYellow2.rotation.x = -Math.PI / 2;
  bYellow2.position.set(0.11, 0.13, roadCenterZ);
  bridgeGrp.add(bYellow1, bYellow2);

  // 4. 兩側路緣邊界白線（自護欄北端端柱 z: -18 起向南延伸至南岸公路 z: 44，長 62m，路口交會處徹底淨空）
  const bridgeWhiteLineLen = 62;
  const bridgeWhiteLineCenterZ = 13;
  const bWhiteW = new THREE.Mesh(new THREE.PlaneGeometry(0.18, bridgeWhiteLineLen), bridgeWhiteLineMat);
  bWhiteW.rotation.x = -Math.PI / 2;
  bWhiteW.position.set(-5.0, 0.13, bridgeWhiteLineCenterZ);
  const bWhiteE = new THREE.Mesh(new THREE.PlaneGeometry(0.18, bridgeWhiteLineLen), bridgeWhiteLineMat);
  bWhiteE.rotation.x = -Math.PI / 2;
  bWhiteE.position.set(5.0, 0.13, bridgeWhiteLineCenterZ);
  bridgeGrp.add(bWhiteW, bWhiteE);

  // 5. 跨平林溪段白色混凝土安全防撞護欄（僅設於跨水區域長 36m，Z: -18 ~ 18，平直端正，高 0.85m）
  const railWest = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.85, 36), materials.whiteConcrete);
  railWest.position.set(-5.4, 0.545, 0);
  const railEast = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.85, 36), materials.whiteConcrete);
  railEast.position.set(5.4, 0.545, 0);
  bridgeGrp.add(railWest, railEast);

  // 6. 水中實體圓柱混凝土橋墩（依使用者指示 media_1791526809291.png：橋墩不要出來！頂端嚴格止於梁底 Y: -0.06，絕不穿透冒出路面）
  for (let pz of [-9, 9]) {
    const pier1 = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 1.4, 16), materials.whiteConcrete);
    pier1.position.set(-3.5, -0.76, pz);
    const pier2 = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 1.4, 16), materials.whiteConcrete);
    pier2.position.set(3.5, -0.76, pz);
    bridgeGrp.add(pier1, pier2);
  }

  // 7. 橋頭四角端正大器迎賓端柱（座落於護欄端點 Z: -18 與 18，底座切齊路面 Y: 0.12）
  [[-5.4, -18.0], [5.4, -18.0], [-5.4, 18.0], [5.4, 18.0]].forEach(([px, pz]) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.0, 0.68), pebbleWallMat);
    post.position.set(px, 0.62, pz);
    bridgeGrp.add(post);
  });

  // 8. 市道 102 號平林溪大橋牌（立於北端橋頭東側端柱旁路邊草坪）
  const bridgeSignPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 8), materials.railingMetal);
  bridgeSignPole.position.set(6.4, 1.2, -18.5);
  const bridgeSignBoard = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.85, 0.08), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3 }));
  bridgeSignBoard.position.set(6.4, 2.2, -18.5);
  bridgeGrp.add(bridgeSignPole, bridgeSignBoard);

  // 定位於校門口馬路路口正前方：正南北向跨越平林溪主流
  bridgeGrp.position.set(-106, 0, 56);
  gateGroup.add(bridgeGrp);

  // ★ 校門口迎賓大道標準行人穿越斑馬線（依衛星圖路口特徵）★
  const zebraGrp = new THREE.Group();
  for (let zx = -4.5; zx <= 4.5; zx += 1.3) {
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 4.2), bridgeWhiteLineMat);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(zx, 0.14, 0);
    zebraGrp.add(stripe);
  }
  zebraGrp.position.set(-106, 0, 20);
  gateGroup.add(zebraGrp);

  // ★ 雙溪高中公車候車亭（依衛星圖上標示之雙溪高中站點）★
  const busShelter = new THREE.Group();
  const busRoof = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.16, 2.2), gateBlue);
  busRoof.position.set(0, 2.6, 0);
  const busGlass = new THREE.Mesh(new THREE.BoxGeometry(5.0, 2.2, 0.1), new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 }));
  busGlass.position.set(0, 1.3, -0.9);
  const busBench = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.45, 0.6), pebbleWallMat);
  busBench.position.set(0, 0.35, -0.4);
  busShelter.add(busRoof, busGlass, busBench);
  busShelter.position.set(-84, 0, 38.0);
  gateGroup.add(busShelter);

  // (2) 校門內側迎賓大圓形拼花地坪廣場（使用者指示：校門口沒這麼小！直徑擴大至 24m）
  const gatePlazaFloor = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 0.14, 36), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 }));
  gatePlazaFloor.position.set(-87, 0.08, 12);
  gatePlazaFloor.receiveShadow = true;
  gateGroup.add(gatePlazaFloor);

  // 迎賓廣場中央圓形景觀花壇（空拍圖特徵）
  const centerPlanter = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.8, 0.42, 24), pebbleWallMat);
  centerPlanter.position.set(-87, 0.24, 12);
  const centerShrub = createTree(2.2, 3.5);
  centerShrub.position.set(-87, 0.45, 12);
  gateGroup.add(centerPlanter, centerShrub);

  // (3) ★ 藍色校門（使用者核心指定：校門口沒這麼小！寬度大氣拓寬至 16m，面朝西方迎賓！）★
  const mainGate = new THREE.Group();
  
  // 大門藍色波浪造型主框架（寬 15.5m, 高 2.6m）
  const gateFrameTop = new THREE.Mesh(new THREE.BoxGeometry(15.5, 0.18, 0.14), gateBlue);
  gateFrameTop.position.set(0, 2.5, 0);
  const gateFrameBottom = new THREE.Mesh(new THREE.BoxGeometry(15.5, 0.26, 0.18), gateBlue);
  gateFrameBottom.position.set(0, 0.13, 0);
  mainGate.add(gateFrameTop, gateFrameBottom);

  // 波浪形起伏飾條（象徵雙溪水波）
  const wavePlate = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.55, 0.09), gateSkyBlue);
  wavePlate.position.set(0, 1.35, 0);
  mainGate.add(wavePlate);

  // 密集立體垂直柵欄格柵（每隔 0.32m 一根垂直藍色鋼管）
  for (let gx = -7.4; gx <= 7.4; gx += 0.35) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 2.3, 6), gateBlue);
    bar.position.set(gx, 1.25, 0);
    mainGate.add(bar);
  }

  // 大門飾板上彩色琉璃立體水滴氣球珠（黃、紅、天藍彩色球）
  [-5.6, -4.2, -2.8, -1.4, 0, 1.4, 2.8, 4.2, 5.6].forEach((bx, idx) => {
    const ballColor = [0xfacc15, 0xef4444, 0x38bdf8, 0x10b981][idx % 4];
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), new THREE.MeshStandardMaterial({ color: ballColor, roughness: 0.2 }));
    ball.position.set(bx, 1.45, 0.07);
    mainGate.add(ball);
  });

  // 左右側亮藍金屬支撐大門柱
  const postLeft = new THREE.Mesh(new THREE.BoxGeometry(0.85, 3.2, 0.85), pebbleWallMat);
  postLeft.position.set(-8.15, 1.6, 0);
  const alertLampL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 8), redAlertMat);
  alertLampL.position.set(-8.15, 3.3, 0);

  const postRight = new THREE.Mesh(new THREE.BoxGeometry(0.85, 3.2, 0.85), pebbleWallMat);
  postRight.position.set(8.15, 1.6, 0);
  const alertLampR = alertLampL.clone();
  alertLampR.position.set(8.15, 3.3, 0);

  // 人行進校藍色小門（地面特寫照片中位於警衛室側，寬 1.8m）
  const smallDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 0.09), gateBlue);
  smallDoor.position.set(9.5, 1.1, 0);

  mainGate.add(postLeft, alertLampL, postRight, alertLampR, smallDoor);
  
  // 旋轉 -Math.PI / 2：使大門南北橫跨於 Z: 3.5 ~ 19.5，門面正對西方 (-X)，人行小門朝南銜接警衛室
  mainGate.rotation.y = -Math.PI / 2;
  mainGate.position.set(-98, 0, 11.5);
  gateGroup.add(mainGate);

  // (4) ★ 大門右側警衛室（使用者指示：警衛室在大智樓的正前方！）★
  // 大智樓中心在 Z: 24，西山牆在 X: -99。警衛室精確座落於大智樓西山牆正前方 (X: -102.5, Z: 24)！
  const guardHouse = new THREE.Group();
  // 警衛室主體（長 8.5m 正對大智樓寬度，深 5.2m，高 3.6m）
  const guardBody = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.6, 8.5), materials.whiteConcrete);
  guardBody.position.set(0, 1.8, 0);
  // 大面積對外管理窗格（正面與側面窗戶）
  const guardWindowWest = new THREE.Mesh(new THREE.BoxGeometry(5.3, 1.5, 5.5), materials.windowDark);
  guardWindowWest.position.set(0, 1.9, -0.5);
  // ★ 照片特寫極度醒目焦點：亮藍色大斜頂波浪金屬遮陽天棚（氣勢磅礡覆蓋大智樓正前方）★
  const guardRoof = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.35, 9.6), gateBlue);
  guardRoof.position.set(0, 3.7, 0);
  guardRoof.rotation.z = -0.16; // 朝西側進校大道微傾斜
  guardRoof.castShadow = true;
  guardHouse.add(guardBody, guardWindowWest, guardRoof);
  // 精準定位於大智樓西山牆正前方！
  guardHouse.position.set(-102.5, 0, 24);
  gateGroup.add(guardHouse);

  // (5) ★ 中央高聳校徽精神紀念立柱（頂端雙溪高中金色校徽圓盤與飛舞藍水波，立於大門北側）★
  const monumentPillar = new THREE.Group();
  // 洗石子高柱身（高 6.5m）
  const pillarBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 6.5, 1.6), pebbleWallMat);
  pillarBody.position.set(0, 3.25, 0);
  monumentPillar.add(pillarBody);

  // 頂部立體金邊圓盤校徽（面朝西方迎賓，直徑 1.6m）
  const badgeFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.2, 24), badgeFrameMat);
  badgeFrame.rotation.z = Math.PI / 2;
  badgeFrame.position.set(0, 7.1, 0);
  const badgeFace = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.22, 24), badgeWhiteMat);
  badgeFace.rotation.z = Math.PI / 2;
  badgeFace.position.set(0, 7.1, 0);
  // 校徽中央雙溪高山圖騰浮雕（面朝西方 -X）
  const badgeCore = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.55, 3), redAlertMat);
  badgeCore.rotation.z = Math.PI / 2;
  badgeCore.position.set(-0.12, 7.1, 0);
  monumentPillar.add(badgeFrame, badgeFace, badgeCore);

  // 柱身騰空飛揚的藍色旋渦水波飄帶金屬雕塑（象徵雙溪水韻）
  const ribbonCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.3, 1.4, -0.9),
    new THREE.Vector3(0.5, 3.0, -1.4),
    new THREE.Vector3(0.2, 4.4, -1.0),
    new THREE.Vector3(0.1, 5.6, -1.5),
    new THREE.Vector3(0.0, 6.6, -0.7)
  ]);
  const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 20, 0.12, 8, false);
  const ribbonMesh = new THREE.Mesh(ribbonGeo, gateBlue);
  monumentPillar.add(ribbonMesh);

  // 柱身表面鑲嵌之彩色琉璃立體水滴
  [2.4, 3.8, 5.0].forEach((py, i) => {
    const drop = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), gateSkyBlue);
    drop.position.set(-0.72, py, 0.45);
    monumentPillar.add(drop);
  });

  // 定位於大門北門柱外側 (世界座標 X: -98.5, Z: 2.5)
  monumentPillar.position.set(-98.5, 0, 2.5);
  gateGroup.add(monumentPillar);

  // (6) ★ 校門左側弧形洗石子波浪矮牆與金色校名題字銘板（大勇樓西山牆前）★
  // 使用者明確指定：「要寫上新北市立雙溪高級中學，並且還有下面的英文」！
  const nameWallGroup = new THREE.Group();
  
  // 弧形洗石子主體牆（長 13m, 高 2.3m, 沿南北向自然向外弧展）
  const wallGeo = new THREE.BoxGeometry(0.85, 2.3, 13);
  const nameWall = new THREE.Mesh(wallGeo, pebbleWallMat);
  nameWall.position.set(0, 1.15, 0);
  nameWall.castShadow = true;

  // 牆頂彩色馬賽克波浪水波飾帶（天藍與湖綠拼花色帶）
  const mosaicCrest = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.38, 13.1), gateSkyBlue);
  mosaicCrest.position.set(0, 2.35, 0);

  // ★ 核心銘板：貼上高解析 CanvasTexture，清晰呈現「新北市立雙溪高級中學」與「New Taipei Municipal Shuang-Xi High School」★
  const nameTexture = createSchoolNameTexture();
  const namePlaqueMat = new THREE.MeshBasicMaterial({ map: nameTexture, transparent: true });
  // 面向西方迎賓 (-X) 的立體銘板
  const textPlaqueGeo = new THREE.PlaneGeometry(11.2, 2.1);
  const textPlaque = new THREE.Mesh(textPlaqueGeo, namePlaqueMat);
  textPlaque.rotation.y = -Math.PI / 2; // 面朝西方 (-X)
  textPlaque.position.set(-0.46, 1.18, 0);

  nameWallGroup.add(nameWall, mosaicCrest, textPlaque);
  // 順應大勇樓西山牆微弧旋轉面向進校道路 (世界座標 X: -100, Z: -4.5)
  nameWallGroup.rotation.y = -0.15;
  nameWallGroup.position.set(-100, 0, -4.5);
  gateGroup.add(nameWallGroup);

  // (7) 柳堤景觀垂柳樹（依使用者指示 media_1791526809291.png：整齊排列於大橋以東河岸，絕不長在橋上或橋面）
  for (let wx = -92; wx <= -52; wx += 14) {
    const willow = createTree(2.2, 4.2);
    willow.position.set(wx, 0, 42.5);
    gateGroup.add(willow);
  }

  scene.add(gateGroup);
  setupBuildingInteractive(gateGroup, 'gate');

  // ================= 1-B. 觀魚平臺 (Fish-viewing Platform - 親水景觀平臺) =================
  // 依使用者指示：徹底清除侵入車道之木塊！
  // 觀魚平臺作為向平林溪河道外凸延伸之親水木棧平臺，北緣整齊緊貼沿溪木棧道，絕不占用車道路面
  const fishPlatformGroup = new THREE.Group();

  // (1) 外凸親水觀景木棧大平臺（長 26m, 寬 3.6m，朝河水方向延伸）
  const deckMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.78 });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(26, 0.22, 3.6), deckMat);
  deck.position.set(0, 0.16, 0);
  deck.receiveShadow = true;
  fishPlatformGroup.add(deck);

  // (2) 沿河岸外側木質親水安全防護欄杆
  const deckRailMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
  const railOuter = new THREE.Mesh(new THREE.BoxGeometry(26, 0.8, 0.2), deckRailMat);
  railOuter.position.set(0, 0.65, 1.7);
  fishPlatformGroup.add(railOuter);

  // 欄杆立柱
  for (let rx = -12; rx <= 12; rx += 4) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.9, 8), deckRailMat);
    post.position.set(rx, 0.6, 1.7);
    fishPlatformGroup.add(post);
  }

  // (3) 觀景木長椅（設於外凸觀景平臺兩側）
  for (let bx of [-8, 8]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.45, 0.8), deckMat);
    bench.position.set(bx, 0.45, -0.6);
    fishPlatformGroup.add(bench);
  }

  // (4) 生態觀魚解說告示牌
  const signPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.6, 8), materials.whiteConcrete);
  signPole.position.set(-1, 0.9, 1.2);
  const signBoard = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.1), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
  signBoard.position.set(-1, 1.6, 1.2);
  fishPlatformGroup.add(signPole, signBoard);

  // 座落於沿溪木棧道臨水外側 (X: -38, Z: 41.5)，完全在車道之外，向溪面自然外凸！
  fishPlatformGroup.position.set(-38, 0, 41.5);
  scene.add(fishPlatformGroup);
  setupBuildingInteractive(fishPlatformGroup, 'fish_platform');

  // 輔助函式：建立實景鮮豔朱紅雙坡斜屋頂、排列三角老虎窗與太陽能光電板 (Solar Panels)
  const createPitchedRoofWithDormers = (length, width, height, dormerCount, dormerSide = 1) => {
    const roofGroup = new THREE.Group();
    
    // 1. 雙坡人字斜屋頂主體
    const shape = new THREE.Shape();
    const halfW = width / 2;
    shape.moveTo(-halfW, 0);
    shape.lineTo(0, height);
    shape.lineTo(halfW, 0);
    shape.closePath();

    const extrudeSettings = { depth: length, bevelEnabled: false };
    const prismGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    prismGeo.rotateY(Math.PI / 2);
    prismGeo.translate(-length / 2, 0, 0);

    const prismMesh = new THREE.Mesh(prismGeo, materials.pitchedRedRoof);
    prismMesh.castShadow = true;
    roofGroup.add(prismMesh);

    // 2. 屋脊深紅飾條
    const ridge = new THREE.Mesh(new THREE.BoxGeometry(length + 0.6, 0.25, 0.35), materials.pitchedRedRidge);
    ridge.position.set(0, height + 0.12, 0);
    roofGroup.add(ridge);

    // 3. ★ 航拍照 media_1791473588241 核心特徵：屋頂雙坡鋪設整齊之深藍黑多晶矽太陽能板陣列！★
    const slopeAngle = Math.atan2(height, halfW);
    const panelCount = Math.floor((length - 6) / 3.4);
    const pStep = (length - 6) / panelCount;
    const pStartX = -(length - 6) / 2 + pStep / 2;

    for (let side of [-1, 1]) {
      for (let i = 0; i < panelCount; i++) {
        // 如果此側有老虎窗，跳開部分位置
        if (side === dormerSide && (i % 2 === 1)) continue;

        const px = pStartX + i * pStep;
        const panelGrp = new THREE.Group();
        // 銀灰鋁合金邊框
        const pFrame = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 1.4), materials.solarFrameMat);
        // 深藍黑反光晶矽發電板
        const pCell = new THREE.Mesh(new THREE.BoxGeometry(2.48, 0.10, 1.28), materials.solarPanelMat);
        panelGrp.add(pFrame, pCell);

        // 貼合屋頂斜坡
        const pz = side * (halfW * 0.52);
        const py = height * 0.48;
        panelGrp.position.set(px, py, pz);
        panelGrp.rotation.x = -side * slopeAngle;
        roofGroup.add(panelGrp);
      }
    }

    // 4. 沿朝向中庭斜坡整齊排列的立體三角採光老虎窗 (Dormers)
    const step = (length - 10) / (dormerCount - 1);
    const startX = -(length - 10) / 2;

    for (let i = 0; i < dormerCount; i++) {
      const dx = startX + i * step;
      const dormer = new THREE.Group();
      // 小三角斜面坡頂
      const dShape = new THREE.Shape();
      dShape.moveTo(-0.95, 0);
      dShape.lineTo(0, 0.95);
      dShape.lineTo(0.95, 0);
      dShape.closePath();
      const dGeo = new THREE.ExtrudeGeometry(dShape, { depth: 1.8, bevelEnabled: false });
      dGeo.rotateY(Math.PI / 2);
      dGeo.translate(-0.9, 0, 0);
      const dMesh = new THREE.Mesh(dGeo, materials.dormerRed);
      // 小採光窗格
      const dWindow = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.65, 0.08), materials.windowDark);
      dWindow.position.set(0, 0.38, 0.92 * dormerSide);
      dormer.add(dMesh, dWindow);

      const dz = dormerSide * (halfW * 0.42);
      const dy = height * 0.46;
      dormer.position.set(dx, dy, dz);
      if (dormerSide < 0) {
        dormer.rotation.y = Math.PI;
      }
      roofGroup.add(dormer);
    }

    return roofGroup;
  };

  // 輔助函式：建立向中庭面外凸的三層通長外廊陽臺與不鏽鋼欄杆
  const createBuildingCorridors = (length, corridorZ, isSouth = true) => {
    const corridorGroup = new THREE.Group();
    // 1F, 2F, 3F 樓層陽臺挑板與欄杆（高度 0.15, 3.2, 6.4）
    [0.15, 3.2, 6.4].forEach(fy => {
      // 挑出走廊水泥地坪
      const slab = new THREE.Mesh(new THREE.BoxGeometry(length, 0.22, 1.4), materials.corridorWall);
      slab.position.set(0, fy, corridorZ);
      slab.receiveShadow = true;
      corridorGroup.add(slab);

      // 外側不鏽鋼防護欄杆與扶手
      const railBar = new THREE.Mesh(new THREE.BoxGeometry(length, 0.08, 0.06), materials.railingMetal);
      railBar.position.set(0, fy + 0.95, corridorZ + (isSouth ? 0.65 : -0.65));
      const midBar = new THREE.Mesh(new THREE.BoxGeometry(length, 0.06, 0.05), materials.railingMetal);
      midBar.position.set(0, fy + 0.5, corridorZ + (isSouth ? 0.65 : -0.65));
      corridorGroup.add(railBar, midBar);

      // 間隔立柱（每 4 米一根）
      for (let rx = -length / 2 + 2; rx <= length / 2 - 2; rx += 4) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.95, 6), materials.railingMetal);
        post.position.set(rx, fy + 0.48, corridorZ + (isSouth ? 0.65 : -0.65));
        corridorGroup.add(post);
      }
    });
    return corridorGroup;
  };

  // ================= 2. 大智樓 (Da Zhi Building - 3層樓，實景朱紅斜頂+7座老虎窗) =================
  const dazhiGroup = new THREE.Group();
  // 主建物體：2F~3F 上部連續橫跨主體（長 52m, 高 6.4m, 深 8.5m，Y: 6.4）
  const dazhiUpper = createBuildingBlock(52, 6.4, 8.5, materials.whiteConcrete, materials.windowDark, materials.corridorWall);
  dazhiUpper.position.set(0, 6.4, 0);
  dazhiGroup.add(dazhiUpper);

  // ★ 依使用者指示：1F 文化走廊挖穿堂（中央 X: -3.5 ~ +3.5 挖空挑空通透）★
  // 1F 西段（長 22.5m, 高 3.2m, 深 8.5m，中心 X: -14.75）
  const dazhi1FWest = createBuildingBlock(22.5, 3.2, 8.5, materials.whiteConcrete, materials.windowDark, materials.corridorWall);
  dazhi1FWest.position.set(-14.75, 1.6, 0);
  // 1F 東段（長 22.5m, 高 3.2m, 深 8.5m，中心 X: 14.75）
  const dazhi1FEast = createBuildingBlock(22.5, 3.2, 8.5, materials.whiteConcrete, materials.windowDark, materials.corridorWall);
  dazhi1FEast.position.set(14.75, 1.6, 0);
  dazhiGroup.add(dazhi1FWest, dazhi1FEast);

  // ★ 1F 中央文化走廊穿堂設施（寬 7m, 高 3.2m, 完全透空貫通）★
  const dazhiPassageGrp = new THREE.Group();
  const dzFloor = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.12, 10.5), new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 }));
  dzFloor.position.set(0, 0.06, 0);
  dzFloor.receiveShadow = true;
  dazhiPassageGrp.add(dzFloor);

  // 穿堂承重混凝土方柱（兩側各 2 根）
  [[-3.2, -3.8], [-3.2, 3.8], [3.2, -3.8], [3.2, 3.8]].forEach(([px, pz]) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.2, 0.6), materials.whiteConcrete);
    col.position.set(px, 1.6, pz);
    dazhiPassageGrp.add(col);
  });

  // 穿堂北面拱門上方「文化走廊 穿堂」金色字牌
  const dzSign = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.45, 0.1), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 }));
  dzSign.position.set(0, 2.9, -4.3);
  dazhiPassageGrp.add(dzSign);
  dazhiGroup.add(dazhiPassageGrp);

  // ★ 航拍特徵：鮮豔朱紅人字雙坡斜屋頂 + 朝向中庭整齊排列 7 個三角採光老虎窗！★
  const dazhiRoof = createPitchedRoofWithDormers(52, 9.4, 3.2, 7, -1);
  dazhiRoof.position.set(0, 9.6, 0);
  dazhiGroup.add(dazhiRoof);

  // 北側（朝向中庭）三層外凸陽臺走廊與不鏽鋼欄杆
  const dazhiCorridors = createBuildingCorridors(50, -4.95, false);
  dazhiGroup.add(dazhiCorridors);

  // 西端迎賓山牆公共藝術彩繪壁畫（空拍照片中極度醒目的綠黃藍大地色塊與展翅和平鴿）
  const dazhiMural = new THREE.Group();
  const dMuralBg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 7.2, 7.2), materials.whiteConcrete);
  dMuralBg.position.set(-26.06, 5.0, 0);
  const dPatchGreen = new THREE.Mesh(new THREE.BoxGeometry(0.14, 4.2, 3.8), new THREE.MeshStandardMaterial({ color: 0x84cc16 }));
  dPatchGreen.position.set(-26.08, 5.2, -0.6);
  const dPatchYellow = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.0, 2.8), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
  dPatchYellow.position.set(-26.08, 3.8, 1.0);
  const dPatchBlue = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.6, 3.2), new THREE.MeshStandardMaterial({ color: 0x38bdf8 }));
  dPatchBlue.position.set(-26.08, 6.0, 0.8);
  const dDove1 = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.8, 3), materials.whiteConcrete);
  dDove1.rotation.z = Math.PI / 4;
  dDove1.position.set(-26.12, 7.0, -1.6);
  const dDove2 = dDove1.clone();
  dDove2.position.set(-26.12, 6.2, -2.2);
  dazhiMural.add(dMuralBg, dPatchGreen, dPatchYellow, dPatchBlue, dDove1, dDove2);
  dazhiGroup.add(dazhiMural);

  // 東南角無障礙坡道引道與洗手間造型
  const dazhiRamp = new THREE.Mesh(new THREE.BoxGeometry(7, 1.5, 5), materials.whiteConcrete);
  dazhiRamp.position.set(23, 0.75, 3.5);
  dazhiGroup.add(dazhiRamp);

  dazhiGroup.position.set(-73, 0, 24);
  scene.add(dazhiGroup);
  setupBuildingInteractive(dazhiGroup, 'dazhi');

  // ================= 3. 大勇樓 (Da Yong Building - 3層樓，實景朱紅斜頂+5座老虎窗) =================
  const dayongGroup = new THREE.Group();
  // 主建物體：2F~3F 上部連續橫跨主體（長 44m, 高 6.4m, 深 8.5m，Y: 6.4）
  const dayongUpper = createBuildingBlock(44, 6.4, 8.5, materials.whiteConcrete, materials.windowDark, materials.corridorWall);
  dayongUpper.position.set(0, 6.4, 0);
  dayongGroup.add(dayongUpper);

  // ★ 依使用者指示：1F 文化走廊挖穿堂（中央 X: -3.5 ~ +3.5 挖空挑空通透，正對大智樓穿堂）★
  // 1F 西段（長 18.5m, 高 3.2m, 深 8.5m，中心 X: -12.75）
  const dayong1FWest = createBuildingBlock(18.5, 3.2, 8.5, materials.whiteConcrete, materials.windowDark, materials.corridorWall);
  dayong1FWest.position.set(-12.75, 1.6, 0);
  // 1F 東段（長 18.5m, 高 3.2m, 深 8.5m，中心 X: 12.75）
  const dayong1FEast = createBuildingBlock(18.5, 3.2, 8.5, materials.whiteConcrete, materials.windowDark, materials.corridorWall);
  dayong1FEast.position.set(12.75, 1.6, 0);
  dayongGroup.add(dayong1FWest, dayong1FEast);

  // ★ 1F 中央文化走廊穿堂設施（寬 7m, 高 3.2m, 完全透空貫通）★
  const dayongPassageGrp = new THREE.Group();
  const dyFloor = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.12, 10.5), new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 }));
  dyFloor.position.set(0, 0.06, 0);
  dyFloor.receiveShadow = true;
  dayongPassageGrp.add(dyFloor);

  // 穿堂承重方柱（兩側各 2 根）
  [[-3.2, -3.8], [-3.2, 3.8], [3.2, -3.8], [3.2, 3.8]].forEach(([px, pz]) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.2, 0.6), materials.whiteConcrete);
    col.position.set(px, 1.6, pz);
    dayongPassageGrp.add(col);
  });

  // 穿堂南面拱門上方「文化走廊 穿堂」金色字牌
  const dySign = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.45, 0.1), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 }));
  dySign.position.set(0, 2.9, 4.3);
  dayongPassageGrp.add(dySign);
  dayongGroup.add(dayongPassageGrp);

  // ★ 航拍特徵：鮮豔朱紅人字雙坡斜屋頂 + 朝向中庭整齊排列 5 個三角採光老虎窗！★
  const dayongRoof = createPitchedRoofWithDormers(44, 9.4, 3.2, 5, 1);
  dayongRoof.position.set(0, 9.6, 0);
  dayongGroup.add(dayongRoof);

  // 南側（朝向中庭）三層外凸陽臺走廊與不鏽鋼欄杆
  const dayongCorridors = createBuildingCorridors(42, 4.95, true);
  dayongGroup.add(dayongCorridors);

  // 大勇樓西端山牆公共藝術彩繪壁畫
  const dayongMural = dazhiMural.clone();
  dayongMural.position.set(4, 0, 0); // 對應 44m 長度之西端
  dayongGroup.add(dayongMural);

  dayongGroup.position.set(-70, 0, 0);
  scene.add(dayongGroup);
  setupBuildingInteractive(dayongGroup, 'dayong');

  // ================= 4. 中庭廣場、桃李花園與「3樓空中天橋」 =================
  // 使用者極度關鍵指定：「中庭廣場的天橋只有三樓有！」
  // 1樓與2樓完全挑空暢通，地面可直接穿行中庭草坪與桃李花園；
  // 天橋高懸於 3 樓（高 3.2m，底高 6.4m，頂高 9.6m，中心 Y: 8.0）！
  // 精準定位：連通大勇樓 3F (Z: 0) 與大智樓 3F (Z: 24)，中庭中心世界座標為 Z: 12！
  const gardenGroup = new THREE.Group();

  // (1) 大勇樓與教學大樓之間的南北人行走道（寬 4.5 米，使兩樓完全分離暢通）
  const walkwayBetweenMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 });
  const walkwayDayongTeaching = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.14, 26), walkwayBetweenMat);
  walkwayDayongTeaching.position.set(26.5, 0.07, 0);
  gardenGroup.add(walkwayDayongTeaching);

  // (2) 教學大樓南側與大智樓東側之間的轉角步道
  const walkwayDazhiTeaching = new THREE.Mesh(new THREE.BoxGeometry(16, 0.14, 5.5), walkwayBetweenMat);
  walkwayDazhiTeaching.position.set(28, 0.07, 9);
  gardenGroup.add(walkwayDazhiTeaching);

  // (3) ★ 3F 景觀空中天橋（Skybridge - 只有三樓有，一二樓挑空貫通！）★
  // 天橋跨距 20m，在局部 Z: 0（世界座標 Z: 12）筆直連通大勇樓 3F 與大智樓 3F！
  const skybridge = createBuildingBlock(4.6, 3.2, 20, materials.whiteConcrete, materials.windowDark, materials.darkRoof);
  skybridge.position.set(0, 8.0, 0); // 局部 Z: 0，高 8.0m（底面高 6.4m，頂部 9.6m）
  gardenGroup.add(skybridge);

  // 天橋兩端挑空支撐鋼柱（撐於一二樓挑空空間，Y: 0 ~ 6.4，位於天橋兩側）
  const skyColMat = materials.whiteConcrete;
  const skyColGeo = new THREE.CylinderGeometry(0.18, 0.18, 6.4, 8);
  [[-1.8, -5.5], [1.8, -5.5], [-1.8, 5.5], [1.8, 5.5]].forEach(([cx, cz]) => {
    const col = new THREE.Mesh(skyColGeo, skyColMat);
    col.position.set(cx, 3.2, cz);
    col.castShadow = true;
    gardenGroup.add(col);
  });

  // (4) 1F 地面挑空貫通之人行連通步道（天橋正下方地面，自由穿行，長 20m）
  const groundPassPath = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.14, 20), walkwayBetweenMat);
  groundPassPath.position.set(0, 0.07, 0);
  gardenGroup.add(groundPassPath);

  // (5) 西側中庭廣場（Courtyard Plaza，長度 20m，介於兩棟大樓之間）
  const plazaFloor = new THREE.Mesh(new THREE.BoxGeometry(26, 0.15, 20), materials.turfGreen);
  plazaFloor.position.set(-16, 0.08, 0);
  gardenGroup.add(plazaFloor);

  // 西側入口雙圓景觀水池（大圓 + 小圓疊合）
  const pondBig = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 5.5, 0.4, 24), materials.waterWetland);
  pondBig.position.set(-23, 0.2, 2.5);
  const pondSmall = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 3.8, 0.4, 20), new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.6 }));
  pondSmall.position.set(-25, 0.22, -3.5);
  gardenGroup.add(pondBig, pondSmall);

  // 輔助函式：建立航拍照中正中央高聳入雲的南洋杉巨樹 (Araucaria Pine)
  const createAraucariaPine = (totalH) => {
    const pineGrp = new THREE.Group();
    // 筆直挺拔深棕樹幹
    const trunkH = totalH * 0.35;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.55, trunkH, 8),
      new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 })
    );
    trunk.position.y = trunkH / 2;
    trunk.castShadow = true;
    pineGrp.add(trunk);

    // 7 層層層遞縮的尖塔狀深翠綠樹冠（極具辨識度！）
    const tiers = 7;
    for (let t = 0; t < tiers; t++) {
      const frac = t / tiers;
      const tierR = (1 - frac * 0.75) * (totalH * 0.16);
      const tierH = (totalH / tiers) * 1.5;
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(tierR, tierH, 7),
        materials.pineGreenDark
      );
      cone.position.y = trunkH * 0.8 + t * (totalH * 0.65 / tiers);
      cone.castShadow = true;
      pineGrp.add(cone);
    }
    return pineGrp;
  };

  // ★ 航拍照特徵：古色古香的八卦六角涼亭（琉璃翠綠頂+暗紅朱漆立柱）！★
  const pavilionGroup = new THREE.Group();
  const pavBase = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.7, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 }));
  pavBase.position.y = 0.25;
  pavilionGroup.add(pavBase);
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 2.6, 8), materials.shrineRed);
    col.position.set(Math.cos(angle) * 1.9, 1.55, Math.sin(angle) * 1.9);
    col.castShadow = true;
    pavilionGroup.add(col);
  }
  // ★ 航拍特徵：翠綠色琉璃六角攢尖頂！★
  const pavRoof = new THREE.Mesh(new THREE.ConeGeometry(3.3, 1.8, 6), materials.pavilionGreen);
  pavRoof.position.y = 3.6;
  pavRoof.castShadow = true;
  pavilionGroup.add(pavRoof);
  const pavTop = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8 }));
  pavTop.position.y = 4.6;
  pavilionGroup.add(pavTop);
  const pavTable = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.9, 12), materials.whiteConcrete);
  pavTable.position.y = 0.7;
  pavilionGroup.add(pavTable);

  pavilionGroup.position.set(-14, 0, 0);
  gardenGroup.add(pavilionGroup);

  // ★ 航拍極度醒目的三大巨樹：中央三株直衝天際的南洋杉巨松（高 16m ~ 18m）！★
  const pine1 = createAraucariaPine(18);
  pine1.position.set(-7, 0, 1.5);
  const pine2 = createAraucariaPine(16.5);
  pine2.position.set(-4, 0, -2.5);
  const pine3 = createAraucariaPine(17.5);
  pine3.position.set(-1, 0, 3.0);
  gardenGroup.add(pine1, pine2, pine3);

  // 藍色曲折水景小徑
  const streamCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-21, 0.18, 2.5),
    new THREE.Vector3(-18, 0.18, 4.5),
    new THREE.Vector3(-12, 0.18, 3),
    new THREE.Vector3(-7, 0.18, 1),
    new THREE.Vector3(-3.2, 0.18, 0)
  ]);
  const streamGeo = new THREE.TubeGeometry(streamCurve, 24, 0.6, 8, false);
  const streamMesh = new THREE.Mesh(streamGeo, materials.waterWetland);
  gardenGroup.add(streamMesh);

  // (6) 東側桃李花園（Tao-Li Garden）
  const taoliFloor = new THREE.Mesh(new THREE.BoxGeometry(20, 0.15, 20), materials.turfGreen);
  taoliFloor.position.set(13, 0.08, 0);
  gardenGroup.add(taoliFloor);

  // 桃李花園幾何對稱環形步道
  const pathMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 });
  const pathNorth = new THREE.Mesh(new THREE.BoxGeometry(16, 0.18, 1.8), pathMat);
  pathNorth.position.set(13, 0.1, -6.5);
  const pathSouth = new THREE.Mesh(new THREE.BoxGeometry(16, 0.18, 1.8), pathMat);
  pathSouth.position.set(13, 0.1, 6.5);
  const pathEast = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.18, 14.8), pathMat);
  pathEast.position.set(20.1, 0.1, 0);
  const pathWest = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.18, 14.8), pathMat);
  pathWest.position.set(5.9, 0.1, 0);
  gardenGroup.add(pathNorth, pathSouth, pathEast, pathWest);

  // 幾何花園中央景觀花圃與桃李植栽
  for (let gx = 9; gx <= 17; gx += 4) {
    const flowerBed = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 2.4), new THREE.MeshStandardMaterial({ color: 0xca8a04 }));
    flowerBed.position.set(gx, 0.25, 0);
    gardenGroup.add(flowerBed);
    const tree = createTree(1.3, 2.8);
    tree.position.set(gx, 0.4, 0);
    gardenGroup.add(tree);
  }

  // 精確座落於大勇樓 (Z: 0) 與大智樓 (Z: 24) 的正中央 (X: -70, Z: 12)！
  gardenGroup.position.set(-70, 0, 12);
  scene.add(gardenGroup);
  setupBuildingInteractive(gardenGroup, 'plaza_garden');

  // ================= 5. 多功能綜合大樓 (Multi-functional Complex - 5層樓旗艦) =================
  // 使用者明確指正：「這不是活動中心 是多功能」！
  // 依據最新實景外觀照片 (media_1791475470331.jpg) 與航拍照 (media_1791473588241.jpg)：
  // 核心視覺特徵：
  // 1. 北向臨梅竹蹊路立面：山牆上部米黃色菱形格紋外牆，正中高懸圓形雙溪高中校徽與金色校名橫額。
  // 2. 立面正中央最醒目的「亮天藍色馬賽克造型窗套」（上下雙排直櫺採光窗與白色防護格柵）。
  // 3. 窗套左側 4 扇水泥灰色外凸方形窗、上方水平通風高窗。
  // ================= 5. 多功能綜合大樓 (Multi-functional Complex - 5層樓旗艦) =================
  // 使用者明確指出：「這個是從外面拍的 所以那面是朝馬路」！
  // 依據 Google 街景與實景照片 (media_1791477594354.png) 精密重構面向梅竹蹊路（朝北方向）之經典立面：
  // 1. 徹底清除臨街覆蓋整棟大樓之死黑色長方塊與粗暴粉紅塊，改建為具備規律窗格與水平樓層線條之典雅校舍。
  // 2. 東側核心主館（面朝梅竹蹊路臨街立面，局部 X: 16）：
  //    - 頂部拱形雙坡挑高屋簷 (Arch Gable Roof)。
  //    - 上部山牆：米黃色面磚底色、細緻菱形斜交格紋 (Diamond Argyle Grid)。
  //    - 正中高懸：圓形雙溪高中校徽（綠白紅三色、綠葉桂冠、正體「雙溪」）。
  //    - 校徽下方：立體金色大字「新北市立雙溪高級中學」與英文校名橫額。
  //    - 正立面核心：「經典亮天藍色馬賽克造型窗套」（立體外凸 0.6m，上下雙排採光直櫺窗，下排配置白色防護格柵）。
  //    - 窗套左側：上下兩排共 4 扇外凸水泥灰色方形窗（立體方框 + 採光玻璃）。
  //    - 窗套上方：水平採光通風高窗。
  //    - 門廳入口：亮藍馬賽克邊緣斜頂鋼構雨棚、支撐圓鋼柱與花崗石迎賓臺階。
  // 3. 中棟與西棟：米黃色面磚、精緻規律之鋁框採光窗格矩陣、水平樓層分線飾條。
  // 4. 屋頂：鮮豔朱紅瓦雙坡坡頂、深紅屋脊飾條，整齊鋪設深藍黑多晶矽太陽能光電板矩陣。
  // 5. 西南角保留歐式紅瓦四角錐尖頂鐘樓方塔 (Clock Tower)。
  const complexGroup = new THREE.Group();
  const complexWallMat = new THREE.MeshStandardMaterial({ color: 0xecdcb9, roughness: 0.72 });
  const complexBeigeMat = new THREE.MeshStandardMaterial({ color: 0xf3e8d2, roughness: 0.75 });
  const floorBandMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.65 }); // 樓層白色分隔帶
  const mosaicBlueMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.32, metalness: 0.45 }); // 亮天藍馬賽克
  const concreteFrameMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.75 }); // 水泥灰窗框

  // 輔助函式：建立具備精細窗格與白色窗框的現代教學排窗立面（徹底淘汰粗暴死黑方塊！）
  const createModernWallWithWindows = (w, h, cols, rows, winW = 1.8, winH = 1.4) => {
    const wallGrp = new THREE.Group();
    // 牆體主板
    const mainWall = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.4), complexWallMat);
    wallGrp.add(mainWall);

    // 樓層白色水平腰線飾板
    const floorH = h / rows;
    for (let r = 1; r < rows; r++) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.28, 0.48), floorBandMat);
      band.position.set(0, -h / 2 + r * floorH, 0);
      wallGrp.add(band);
    }

    // 均勻分佈之標準鋁框採光窗格矩陣
    const startX = -w / 2 + w / (cols + 1);
    const stepX = w / (cols + 1);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const wx = startX + c * stepX;
        const wy = -h / 2 + (r + 0.5) * floorH;

        // 白色外框
        const frame = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.16, winH + 0.16, 0.44), materials.whiteConcrete);
        frame.position.set(wx, wy, 0.04);

        // 深色採光玻璃
        const glass = new THREE.Mesh(new THREE.BoxGeometry(winW, winH, 0.46), materials.windowDark);
        glass.position.set(wx, wy, 0.05);

        // 窗格白色橫挺
        const mullion = new THREE.Mesh(new THREE.BoxGeometry(winW, 0.08, 0.48), materials.whiteConcrete);
        mullion.position.set(wx, wy, 0.06);

        wallGrp.add(frame, glass, mullion);
      }
    }
    return wallGrp;
  };

  // (1) 西側棟主體 (West Block - 局部 X: -18, 寬 15m, 高 16.5m, 深 15m)
  const westBlockGrp = new THREE.Group();
  const westCore = new THREE.Mesh(new THREE.BoxGeometry(15, 16.5, 14.6), complexWallMat);
  westBlockGrp.add(westCore);

  // 西側棟朝馬路（北面，Z = -7.3）精緻排窗立面（3排 x 4列窗）
  const westNorthFacade = createModernWallWithWindows(15, 16.5, 4, 4, 1.9, 1.4);
  westNorthFacade.position.set(0, 0, -7.3);
  westBlockGrp.add(westNorthFacade);

  // 西側棟朝中庭（南面，Z = 7.3）排窗立面
  const westSouthFacade = createModernWallWithWindows(15, 16.5, 4, 4, 1.9, 1.4);
  westSouthFacade.position.set(0, 0, 7.3);
  westBlockGrp.add(westSouthFacade);

  // 西側棟屋頂朱紅坡頂
  const westRoof = new THREE.Mesh(new THREE.BoxGeometry(15.8, 1.2, 15.6), materials.pitchedRedRoof);
  westRoof.position.set(0, 8.85, 0);
  westBlockGrp.add(westRoof);

  // ★ 依使用者指示 media_1791538143072.png：徹底刪除冗長之中間棟 (midBlockGrp)！
  // 西側棟緊密銜接東側館西壁（寬 15m，中心 X: 0.5，範圍 X: -7.0 到 +8.0），與東側館無縫合體！
  westBlockGrp.position.set(0.5, 8.25, 0);
  complexGroup.add(westBlockGrp);

  // (3) ★★★ 東側標誌性核心主館（依實景照片 media_1791535513001.png 真實挖空大穿堂與大階梯！）★★★
  // 寬 17m, 高 18.5m, 深 14.6m，局部 X: 16.5, Y: 9.25, Z: 0
  const eastHallGrp = new THREE.Group();

  // (A) ★ 核心修正：徹底淘汰實心擋死盒子！上部 2F~6F 連續橫跨主體（高 13.75m, Y 中心: 2.375）★
  const eastUpperBody = new THREE.Mesh(
    new THREE.BoxGeometry(17, 13.75, 14.6),
    complexWallMat
  );
  eastUpperBody.position.set(0, 2.375, 0);
  eastUpperBody.castShadow = true;
  eastUpperBody.receiveShadow = true;
  eastHallGrp.add(eastUpperBody);

  // (B) ★ 1F 實體側牆：面向操場跑道側（東立面 X: 8.5）中央寬度 11.2m 完全大敞開為挑高大穿堂！★
  // 1F 北側支撐結構（寬 17.0m, 高 4.75m, 厚 1.8m，中心 Z: -6.4, Y: -6.875）
  const east1FNorth = new THREE.Mesh(new THREE.BoxGeometry(17.0, 4.75, 1.8), complexWallMat);
  east1FNorth.position.set(0, -6.875, -6.4);
  // 1F 南側支撐結構（寬 17.0m, 高 4.75m, 厚 1.8m，中心 Z: 6.4, Y: -6.875）
  const east1FSouth = new THREE.Mesh(new THREE.BoxGeometry(17.0, 4.75, 1.8), complexWallMat);
  east1FSouth.position.set(0, -6.875, 6.4);
  // 1F 西側連通隔牆柱（厚 2.0m, 高 4.75m, 深 11.0m，中心 X: -7.5, Y: -6.875）
  const east1FWestCol = new THREE.Mesh(new THREE.BoxGeometry(2.0, 4.75, 11.0), complexWallMat);
  east1FWestCol.position.set(-7.5, -6.875, 0);
  eastHallGrp.add(east1FNorth, east1FSouth, east1FWestCol);

  // (C) 頂部優雅拱弧形雙坡紅瓦頂
  const eastRoofGeo = new THREE.CylinderGeometry(8.6, 8.6, 17.2, 32, 1, false, 0, Math.PI);
  const archRoofMaterials = [
    materials.pitchedRedRoof, // 側弧面：鮮豔朱紅瓦坡頂棚
    complexWallMat,           // 北端山牆面：米黃面磚山牆
    complexWallMat            // 南端山牆面：米黃面磚山牆
  ];
  const eastRoof = new THREE.Mesh(eastRoofGeo, archRoofMaterials);
  eastRoof.rotation.z = Math.PI / 2;
  eastRoof.rotation.y = Math.PI / 2;
  eastRoof.position.set(0, 9.25, 0);
  eastHallGrp.add(eastRoof);

  // 1. 動態生成高解析度【朝馬路（梅竹蹊路）】旗艦立面貼圖（具備雙溪高中校徽與中英文校名）
  const streetFacadeCanvas = document.createElement('canvas');
  streetFacadeCanvas.width = 2048;
  streetFacadeCanvas.height = 1024;
  const sCtx = streetFacadeCanvas.getContext('2d');
  if (sCtx) {
    // 米黃色面磚底色
    sCtx.fillStyle = '#ecdcb9';
    sCtx.fillRect(0, 0, 2048, 1024);

    // 菱形斜交格線 (Diamond Argyle Grid)
    sCtx.strokeStyle = '#c4b595';
    sCtx.lineWidth = 4;
    const step = 64;
    for (let x = -1024; x <= 3072; x += step) {
      sCtx.beginPath();
      sCtx.moveTo(x, 0);
      sCtx.lineTo(x + 1024, 1024);
      sCtx.stroke();

      sCtx.beginPath();
      sCtx.moveTo(x, 0);
      sCtx.lineTo(x - 1024, 1024);
      sCtx.stroke();
    }

    // 上半部頂端雙溪高中圓形校徽徽章（直徑約 320px）
    const cx = 1024;
    const cy = 250;
    const cr = 145;

    // 白色底圓
    sCtx.beginPath();
    sCtx.arc(cx, cy, cr, 0, Math.PI * 2);
    sCtx.fillStyle = '#ffffff';
    sCtx.fill();
    sCtx.lineWidth = 10;
    sCtx.strokeStyle = '#15803d';
    sCtx.stroke();

    // 綠色月桂葉桂冠外圈
    sCtx.beginPath();
    sCtx.arc(cx, cy, cr - 20, 0, Math.PI * 2);
    sCtx.lineWidth = 7;
    sCtx.strokeStyle = '#22c55e';
    sCtx.stroke();

    // 內部紅色圓形雙溪水紋徽心
    sCtx.beginPath();
    sCtx.arc(cx, cy, cr - 50, 0, Math.PI * 2);
    sCtx.fillStyle = '#dc2626';
    sCtx.fill();

    // 校徽中央白色正體「雙溪」
    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 64px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
    sCtx.textAlign = 'center';
    sCtx.textBaseline = 'middle';
    sCtx.fillText('雙溪', cx, cy);

    // 校徽下方第一行金色正楷題字「新北市立雙溪高級中學」
    sCtx.font = 'bold 76px "Noto Serif TC", "Songti TC", "Microsoft JhengHei", serif';
    sCtx.fillStyle = '#b45309';
    sCtx.fillText('新北市立雙溪高級中學', cx, 460);

    // 第二行金色英文全稱「New Taipei Municipal Shuang-Xi High School」
    sCtx.font = '600 42px "Noto Sans TC", sans-serif';
    sCtx.fillStyle = '#d97706';
    sCtx.fillText('New Taipei Municipal Shuang-Xi High School', cx, 545);
  }

  // 2. 動態生成【朝校內（面朝中庭）】純淨立面貼圖
  const innerFacadeCanvas = document.createElement('canvas');
  innerFacadeCanvas.width = 2048;
  innerFacadeCanvas.height = 1024;
  const iCtx = innerFacadeCanvas.getContext('2d');
  if (iCtx) {
    // 米黃色面磚底色
    iCtx.fillStyle = '#ecdcb9';
    iCtx.fillRect(0, 0, 2048, 1024);

    // 菱形斜交格線 (Diamond Argyle Grid)
    iCtx.strokeStyle = '#c4b595';
    iCtx.lineWidth = 4;
    const step = 64;
    for (let x = -1024; x <= 3072; x += step) {
      iCtx.beginPath();
      iCtx.moveTo(x, 0);
      iCtx.lineTo(x + 1024, 1024);
      iCtx.stroke();

      iCtx.beginPath();
      iCtx.moveTo(x, 0);
      iCtx.lineTo(x - 1024, 1024);
      iCtx.stroke();
    }
  }

  // 朝北面臨梅竹蹊路專用貼圖（高解析標準正向貼圖）
  const streetFacadeTextureNorth = new THREE.CanvasTexture(streetFacadeCanvas);
  streetFacadeTextureNorth.anisotropy = 4;

  // 朝南面朝校內中庭專用貼圖（純菱形格紋面磚）
  const innerFacadeTextureSouth = new THREE.CanvasTexture(innerFacadeCanvas);
  innerFacadeTextureSouth.anisotropy = 4;

  // 輔助函式：建立立體真實的特色立面幾何
  const createStreetFeatureFacade = (isFacingRoad) => {
    const facadeGrp = new THREE.Group();

    // (A) 上半部山牆貼圖面板（高 8.5m, 寬 16.8m）
    const gablePlate = new THREE.Mesh(
      new THREE.PlaneGeometry(16.8, 8.5),
      new THREE.MeshStandardMaterial({
        map: isFacingRoad ? streetFacadeTextureNorth : innerFacadeTextureSouth,
        roughness: 0.65
      })
    );
    gablePlate.position.set(0, 5.0, 0);
    facadeGrp.add(gablePlate);

    // (B) 下半部米黃面磚底牆
    const btmWall = new THREE.Mesh(
      new THREE.PlaneGeometry(16.8, 10.0),
      complexWallMat
    );
    btmWall.position.set(0, -4.25, 0);
    facadeGrp.add(btmWall);

    // (C) 核心「經典亮天藍色馬賽克造型窗套」（立體凸出 0.55m）
    const mosaicFrame = new THREE.Mesh(new THREE.BoxGeometry(7.8, 5.8, 0.55), mosaicBlueMat);
    mosaicFrame.position.set(0, -2.5, 0.28);
    facadeGrp.add(mosaicFrame);

    // 窗套內上下兩排直櫺採光窗
    for (let wi = -2.8; wi <= 2.8; wi += 1.85) {
      const topWin = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.1, 0.2), materials.windowDark);
      topWin.position.set(wi, -1.2, 0.48);
      facadeGrp.add(topWin);

      const btmWin = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.9, 0.2), materials.windowDark);
      btmWin.position.set(wi, -3.7, 0.48);
      const grill = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.08), materials.whiteConcrete);
      grill.position.set(wi, -3.7, 0.53);
      facadeGrp.add(btmWin, grill);
    }

    // (D) 窗套側邊外凸方形窗
    const winLeftXs = isFacingRoad ? [-5.5, -7.3] : [5.5, 7.3];
    const winYs = [-1.2, -3.7];
    winLeftXs.forEach(fx => {
      winYs.forEach(fy => {
        const cFrame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.42), concreteFrameMat);
        cFrame.position.set(fx, fy, 0.16);
        const cWin = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.18), materials.windowDark);
        cWin.position.set(fx, fy, 0.32);
        facadeGrp.add(cFrame, cWin);
      });
    });

    // (E) 窗套正上方水平採光通風高窗
    const highWinFrame = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.1, 0.22), materials.whiteConcrete);
    highWinFrame.position.set(0, 1.0, 0.1);
    const highWinGlass = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.8, 0.12), materials.windowDark);
    highWinGlass.position.set(0, 1.0, 0.22);
    facadeGrp.add(highWinFrame, highWinGlass);

    // (F) 側邊門廳斜頂入口雨棚與迎賓臺階
    const canopyX = isFacingRoad ? 5.8 : -5.8;
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 2.8), mosaicBlueMat);
    canopy.rotation.x = isFacingRoad ? -0.15 : 0.15;
    canopy.position.set(canopyX, -5.8, 1.1);

    const pillar1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.6, 8), materials.whiteConcrete);
    pillar1.position.set(canopyX + (isFacingRoad ? 1.6 : -1.6), -7.5, 2.1);
    const pillar2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.6, 8), materials.whiteConcrete);
    pillar2.position.set(canopyX - (isFacingRoad ? 1.6 : -1.6), -7.5, 2.1);

    const stairs = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.45, 2.0), materials.whiteConcrete);
    stairs.position.set(canopyX, -9.0, 0.8);

    facadeGrp.add(canopy, pillar1, pillar2, stairs);
    return facadeGrp;
  };

  // (D) 朝梅竹蹊路（北面，Z = -7.35）立面
  const northRoadFacade = createStreetFeatureFacade(true);
  northRoadFacade.position.set(0, 0, -7.35);
  northRoadFacade.rotation.y = Math.PI;
  eastHallGrp.add(northRoadFacade);

  // (E) ★ 南立面（面向中庭與教學大樓，Z = 7.35）外觀 ★
  const southFacadeGrp = new THREE.Group();
  const sTopWall = new THREE.Mesh(new THREE.BoxGeometry(17, 13.75, 0.4), complexWallMat);
  sTopWall.position.set(0, 2.375, 7.3);
  southFacadeGrp.add(sTopWall);

  // 南立面上半部標準採光排窗
  for (let wx = -5.4; wx <= 5.4; wx += 3.6) {
    const sWin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 0.46), materials.windowDark);
    sWin.position.set(wx, 3.2, 7.3);
    southFacadeGrp.add(sWin);
  }
  eastHallGrp.add(southFacadeGrp);

  // (F) ★★★ 東立面（正對操場跑道側 X = 8.5）：依使用者紅圈與照片實景精確開立挑高大穿堂與合照大階梯！★★★
  const eastTrackFacadeGrp = new THREE.Group();

  // 1. 東立面 2F~6F 現代排窗外牆（消滅死白大方塊！高 13.75m，寬 14.6m 即 Z: -7.3 到 +7.3）
  const eWallPlate = new THREE.Mesh(new THREE.BoxGeometry(0.35, 13.75, 14.6), complexWallMat);
  eWallPlate.position.set(8.52, 2.375, 0);
  eastTrackFacadeGrp.add(eWallPlate);

  // 東立面 2F~6F 白色水平分層腰線
  [-2.2, 2.3, 6.8].forEach(by => {
    const eBand = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.28, 14.8), floorBandMat);
    eBand.position.set(8.55, by, 0);
    eastTrackFacadeGrp.add(eBand);
  });

  // 東立面 2F~6F 標準現代採光窗格矩陣（3 排 x 4 列，白色窗框 + 深色玻璃）
  for (let r = 0; r < 3; r++) {
    const wy = 0.0 + r * 4.4;
    for (let c = -4.5; c <= 4.5; c += 3.0) {
      // 窗框
      const cFrame = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.2, 1.8), materials.whiteConcrete);
      cFrame.position.set(8.58, wy, c);
      // 採光玻璃
      const cGlass = new THREE.Mesh(new THREE.BoxGeometry(0.44, 2.0, 1.6), materials.windowDark);
      cGlass.position.set(8.59, wy, c);
      // 窗格橫挺
      const cMull = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.08, 1.6), materials.whiteConcrete);
      cMull.position.set(8.60, wy, c);
      eastTrackFacadeGrp.add(cFrame, cGlass, cMull);
    }
  }

  // 2. ★ 1F 挑高大穿堂（挑高 4.75m，依使用者指示寬度精確設為 7.2m，兩側為穩固實體外牆！）★
  // (1) 東立面 1F 北側外牆（寬 3.7m，高 4.75m，中心 Z: -5.45, Y: -6.875）
  const e1FNorthWall = new THREE.Mesh(new THREE.BoxGeometry(0.35, 4.75, 3.7), complexWallMat);
  e1FNorthWall.position.set(8.52, -6.875, -5.45);
  // (2) 東立面 1F 南側外牆（寬 3.7m，高 4.75m，中心 Z: 5.45, Y: -6.875）
  const e1FSouthWall = new THREE.Mesh(new THREE.BoxGeometry(0.35, 4.75, 3.7), complexWallMat);
  e1FSouthWall.position.set(8.52, -6.875, 5.45);
  eastTrackFacadeGrp.add(e1FNorthWall, e1FSouthWall);

  const breezewayHall = new THREE.Group();

  // (3) 挑高頂棚（深灰吸音底層，寬 7.2m，Y: -4.5）
  const bwCeiling = new THREE.Mesh(
    new THREE.BoxGeometry(16.0, 0.2, 7.2),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 })
  );
  bwCeiling.position.set(0, -4.5, 0);
  breezewayHall.add(bwCeiling);

  // (4) 天花板承重橫樑結構與金色聚光嵌燈（依合照 media_1791535513001.png 特徵）
  for (let bx = 7.0; bx >= -7.0; bx -= 3.5) {
    const bBeam = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 7.2), materials.whiteConcrete);
    bBeam.position.set(bx, -4.8, 0);
    breezewayHall.add(bBeam);

    // 橫樑上排溫暖金色嵌燈
    [-2.2, 0, 2.2].forEach(lz => {
      const bLamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.08, 12),
        new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfde047, emissiveIntensity: 0.9 })
      );
      bLamp.position.set(bx, -5.1, lz);
      breezewayHall.add(bLamp);
    });
  }

  // (5) 穿堂內部平整大理石地面（寬 7.2m，Y: -8.25）
  const bwFloorMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
  const bwFloor = new THREE.Mesh(new THREE.BoxGeometry(16.0, 0.2, 7.2), bwFloorMat);
  bwFloor.position.set(0, -8.15, 0);
  bwFloor.receiveShadow = true;
  breezewayHall.add(bwFloor);

  // (6) 正面東門楣上方「雙溪高中校舍大穿堂」金色立體題字牌匾（寬 6.8m，精準居中對齊 7.2m 開口）
  const signMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.75, 6.8),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.28, metalness: 0.5 })
  );
  signMesh.position.set(8.65, -4.0, 0);
  breezewayHall.add(signMesh);

  // (7) ★★★ 照片最醒目核心主角：全幅寬敞「5 階大理石合照大階梯」(Grand Photo Stairs) ★★★
  // 自穿堂東門平臺（X: 8.5）向東（正對操場跑道方向）逐階向下鋪設，精準對齊 7.2m 開口！
  const stairMarbleMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.5 });
  const numSteps = 5;
  const sRise = 0.20; // 階高 20cm
  const sRun = 0.65;  // 踏面深 65cm (寬敞，足夠學生並肩合照站立就座)

  for (let s = 0; s < numSteps; s++) {
    const sW = 7.2 + s * 0.15; // 寬度沿 Z 軸 (7.2m ~ 7.8m，精準契合使用者紅框範圍)
    const sD = sRun;           // 踏面深沿 X 軸 (向操場跑道延伸)
    const sH = sRise;          // 階高沿 Y 軸
    const sMesh = new THREE.Mesh(new THREE.BoxGeometry(sD, sH, sW), stairMarbleMat);
    // 依序向東 (+X 方向，正對跑道) 逐階延伸
    const sX = 8.5 + (s + 0.5) * sRun;
    // 依序由高 (穿堂門口 Y: -8.25) 向低 (操場地面 Y: -9.05 ~ -9.25) 鋪出
    const sY = -8.25 - (s * sRise);
    sMesh.position.set(sX, sY, 0);
    sMesh.receiveShadow = true;
    breezewayHall.add(sMesh);
  }

  eastTrackFacadeGrp.add(breezewayHall);
  eastHallGrp.add(eastTrackFacadeGrp);

  eastHallGrp.position.set(16.5, 9.25, 0);
  complexGroup.add(eastHallGrp);

  // (4) ★ 西南側歐式四角錐尖頂紅瓦鐘樓方塔 (Clock Tower) ★
  const complexTower = new THREE.Group();
  const towerBody = new THREE.Mesh(new THREE.BoxGeometry(6.5, 21.0, 6.5), materials.whiteConcrete);
  towerBody.position.set(0, 10.5, 0);
  complexTower.add(towerBody);

  // 鐘樓四面金色鐘面錶盤
  [
    { pos: [0, 18.2, 3.3], rot: [0, 0, 0] },
    { pos: [0, 18.2, -3.3], rot: [0, Math.PI, 0] },
    { pos: [3.3, 18.2, 0], rot: [0, Math.PI / 2, 0] },
    { pos: [-3.3, 18.2, 0], rot: [0, -Math.PI / 2, 0] }
  ].forEach(cp => {
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.1, 16), new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3, metalness: 0.6 }));
    dial.rotation.x = Math.PI / 2;
    dial.rotation.y = cp.rot[1];
    dial.position.set(cp.pos[0], cp.pos[1], cp.pos[2]);
    complexTower.add(dial);
  });

  const pyramidRoof = new THREE.Mesh(new THREE.ConeGeometry(4.8, 4.0, 4), materials.pitchedRedRoof);
  pyramidRoof.position.set(0, 23.0, 0);
  pyramidRoof.rotation.y = Math.PI / 4;
  pyramidRoof.castShadow = true;
  complexTower.add(pyramidRoof);

  // 鐘樓方塔緊貼西側棟西南角（X: -8.5, Z: 3）
  complexTower.position.set(-8.5, 0, 3);
  complexGroup.add(complexTower);

  // (5) 屋頂維持平整乾淨的朱紅斜瓦坡頂

  // (6) ★ 轉角無障礙電梯塔（墨綠鋼柱 + 天藍透光玻璃觀景梯）★
  const elevGroup = new THREE.Group();
  const elevTower = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 17.0, 3.2),
    new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.3, metalness: 0.6 })
  );
  elevTower.position.set(0, 8.5, 0);
  const elevGlass = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 16.0, 3.3),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.8 })
  );
  elevGlass.position.set(0, 8.5, 0);
  elevGroup.add(elevTower, elevGlass);
  elevGroup.position.set(18.5, 0, 8.5);
  complexGroup.add(elevGroup);

  // (7) 北側臨梅竹蹊路綠化景觀步道（長度適配大樓縮短後之 36m）
  const frontWalkway = new THREE.Mesh(new THREE.BoxGeometry(36, 0.14, 3.2), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 }));
  frontWalkway.position.set(9.0, 0.07, -9.5);
  complexGroup.add(frontWalkway);

  // 定位於 (X: -52, Z: -21)，東側外牆精準止於 X: -27.0，既比教學大樓凸出，又與跑道保持 11.5 米暢通！
  // ★ 依使用者指示圖片 media_1791534925389.png 核心校正：★
  // 1. 穿堂直接開在白色建築南面 (紅色「穿」字位置)！
  // 2. 徹底移除藍色圈起的多餘立柱與橫桿！
  // 3. 淺藍色地坪完全擴展至黃色塗抹區域，並無縫深入鋪設進穿堂內部！
  const drGreenPlazaGrp = new THREE.Group();

  // (1) 擴展後之淺藍色地坪（寬 24.0m, 深 24.0m，完全涵蓋東立面大穿堂階梯前坪、教學大樓間隙並一路平鋪至操場跑道邊緣）
  const drGreenFloor = new THREE.Mesh(
    new THREE.BoxGeometry(24.0, 0.14, 24.0),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.65 })
  );
  // 定位於 X: 30.0（承接東立面大階梯腳下 X: 28.25 並延伸至跑道邊緣），Z: 2.0
  drGreenFloor.position.set(30.0, 0.07, 2.0);
  drGreenFloor.receiveShadow = true;
  drGreenPlazaGrp.add(drGreenFloor);

  complexGroup.add(drGreenPlazaGrp);

  complexGroup.position.set(-52, 0, -21);
  scene.add(complexGroup);
  setupBuildingInteractive(complexGroup, 'complex');

  // ================= 6. 教學大樓 (Teaching Building - 5層樓，南北走向獨立大樓) =================
  // 使用者明確指定：教學大樓有 5 層樓（高度 16.0m，Y中心 8.0）！
  // 建築量體完全獨立，北端與多功能大樓南牆無縫結合，東牆位於 X: -31.5，完全在多功能大樓突出翼內側！
  const teachingGroup = new THREE.Group();
  // 教學大樓：2F~5F 上部連續橫跨主體（寬 9, 高 12.8, 深 30，Y: 9.6）
  const teachUpper = createBuildingBlock(9, 12.8, 30, materials.teachingOrange, materials.windowDark, materials.darkRoof);
  teachUpper.position.set(0, 9.6, 0);
  teachingGroup.add(teachUpper);

  // ★ 依使用者指示：教學大樓 1F 文化走廊也是穿堂！中央 Z: -0.5 ~ +4.5 挖空挑空通透 ★
  // 1F 北段（深 14.5m，高 3.2m，寬 9m，中心 Z: -7.75）
  const teach1FNorth = createBuildingBlock(9, 3.2, 14.5, materials.teachingOrange, materials.windowDark, materials.darkRoof);
  teach1FNorth.position.set(0, 1.6, -7.75);
  // 1F 南段（深 10.5m，高 3.2m，寬 9m，中心 Z: 9.75）
  const teach1FSouth = createBuildingBlock(9, 3.2, 10.5, materials.teachingOrange, materials.windowDark, materials.darkRoof);
  teach1FSouth.position.set(0, 1.6, 9.75);
  teachingGroup.add(teach1FNorth, teach1FSouth);

  // ★ 1F 中央文化走廊穿堂（深 5m, 寬 9m, 高 3.2m, 完全透空貫通，依指示移除遮擋立柱與橫桿）★
  const teachPassageGrp = new THREE.Group();
  const teachPassageFloor = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.12, 5.0), new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 }));
  teachPassageFloor.position.set(0, 0.06, 2.0);
  teachPassageFloor.receiveShadow = true;
  teachPassageGrp.add(teachPassageFloor);
  teachingGroup.add(teachPassageGrp);

  // 教學大樓南側專用停車場 (P) 與無障礙出入口
  const teachPark = new THREE.Mesh(new THREE.BoxGeometry(11, 0.1, 10), materials.parkingLot);
  teachPark.position.set(0, 0.05, 19);
  teachingGroup.add(teachPark);

  // 南端無障礙專用斜坡引道
  const teachRamp = new THREE.Mesh(new THREE.BoxGeometry(4, 0.8, 6), materials.whiteConcrete);
  teachRamp.position.set(-3.5, 0.4, 16);
  teachingGroup.add(teachRamp);

  teachingGroup.position.set(-36, 0, 4.0);
  scene.add(teachingGroup);
  setupBuildingInteractive(teachingGroup, 'teaching');

  // ================= 7. 田徑操場與內側球場 (Track & Field - 標準半圓彎道膠囊型跑道) =================
  // 使用者明確指定：「操場跑道應該不是長方形 請調整」！
  // 依據標準田徑場規格建模：兩端為圓潤半圓弧彎道、中央為平直跑道的標準膠囊環形 PU 跑道！
  const trackGroup = new THREE.Group();

  // 輔助函式：建立兩端半圓弧之標準田徑跑道膠囊形狀幾何體
  const createStadiumMesh = (straightLen, radius, depth, mat) => {
    const shape = new THREE.Shape();
    const halfL = straightLen / 2;
    shape.moveTo(-halfL, -radius);
    shape.lineTo(halfL, -radius);
    shape.absarc(halfL, 0, radius, -Math.PI / 2, Math.PI / 2, false);
    shape.lineTo(-halfL, radius);
    shape.absarc(-halfL, 0, radius, Math.PI / 2, Math.PI * 1.5, false);

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.03
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    return mesh;
  };

  // (1) 外圈標準紅色 PU 跑道底座（中央直道 22m，外半徑 15.0m，總長 52m，總寬 30m，兩端平滑半圓弧！）
  const trackBase = createStadiumMesh(22, 15.0, 0.16, materials.trackRed);
  trackBase.position.y = 0.08;
  trackGroup.add(trackBase);

  // (2) ★ 航拍照 media_1791473588241 與 media_1791473639293 核心亮點：田徑場內場為標誌性之亮天藍色 PU 地坪！★
  const innerTurf = createStadiumMesh(22, 9.5, 0.19, materials.skyBlueCourt);
  innerTurf.position.y = 0.10;
  trackGroup.add(innerTurf);

  // (3) 白色跑道分道線（中圈跑道分道弧線）
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const trackDivider = createStadiumMesh(22, 12.25, 0.02, lineMat);
  trackDivider.position.y = 0.18;
  trackGroup.add(trackDivider);

  // (4) 內側兩座籃球場（標準綠底球場）
  const court1 = new THREE.Mesh(new THREE.BoxGeometry(10, 0.22, 15), materials.courtGreen);
  court1.position.set(-6, 0.14, 0);
  const court2 = court1.clone();
  court2.position.set(6, 0.14, 0);
  trackGroup.add(court1, court2);

  // 使用者明確指示：「壓到跑道了」並在附圖中以藍箭頭指示跑道移動方向、將北側車棚打叉！
  // 1. 移除干擾的北側長條棚，依箭頭將跑道平移至 (X: 3.5, 0, -18)：
  // 跑道南端外緣精確止於 Z: -3.0，距風雨操場北端 (Z: 4.0) 保有 7 米以上開闊通道，徹底杜絕任何壓迫與重疊！
  trackGroup.position.set(3.5, 0, -18);
  scene.add(trackGroup);
  setupBuildingInteractive(trackGroup, 'track');

  // ================= 8. 操場南側核心活動設施區（特寫圖重點重構） =================

  // ------ A. 器材室、團練室與合作社 (West Services - 1層樓平房) ------
  const westServicesGroup = new THREE.Group();
  const servBody = createBuildingBlock(10, 3.8, 20, materials.whiteConcrete, materials.windowDark, materials.darkRoof);
  servBody.position.set(0, 1.9, 0);
  westServicesGroup.add(servBody);
  // 南側合作社遮陽雨棚與出入口
  const coopCanopy = new THREE.Mesh(new THREE.BoxGeometry(11, 0.4, 4), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
  coopCanopy.position.set(0, 2.4, 8);
  westServicesGroup.add(coopCanopy);

  westServicesGroup.position.set(-22, 0, 17);
  scene.add(westServicesGroup);
  setupBuildingInteractive(westServicesGroup, 'west_services');

  // ------ B. 風雨操場 (Sheltered Sports Ground - 實景白色弧形張拉膜鋼構大棚) ------
  // 使用者明確詢問：「為什麼風雨操場衹有一邊有柱子」！
  // 全面重構為結構真實、南北兩側對稱立柱與優雅起翹之現代白色張拉膜鋼構大棚：
  // 1. 南北向對稱圓弧拱形穹頂（跨度 18m, 長度 28m）。
  // 2. 南北兩側簷口各配置 4 根粗壯深綠色圓鋼管支柱（共 8 根柱，完全對稱）。
  // 3. 跨越每對立柱的半圓弧鋼管桁架拱梁與張拉膜封邊鋼圈。
  const windShelterGroup = new THREE.Group();

  // (1) 亮天藍色運動防滑地坪（寬 30m, 深 20m）
  const windTurf = new THREE.Mesh(new THREE.BoxGeometry(30, 0.25, 20), materials.skyBlueCourt);
  windTurf.position.set(0, 0.12, 0);
  windShelterGroup.add(windTurf);

  // (2) ★ 核心白色弧形張拉膜穹頂（南北向對稱跨越 18m，東西向長 28m）★
  const archShape = new THREE.Shape();
  const halfSpan = 9.0; // 南北半跨度 9m（Z: -9.0 到 +9.0）
  const archHeight = 3.8; // 拱頂自簷口向上挑高 3.8m
  archShape.moveTo(-halfSpan, 0);
  archShape.quadraticCurveTo(0, archHeight, halfSpan, 0);
  archShape.lineTo(halfSpan, 0.15);
  archShape.quadraticCurveTo(0, archHeight + 0.15, -halfSpan, 0.15);
  archShape.closePath();

  // 東西向拉伸 28m
  const extrudeSettings = { depth: 28, bevelEnabled: false, steps: 1 };
  const archGeo = new THREE.ExtrudeGeometry(archShape, extrudeSettings);
  archGeo.rotateY(Math.PI / 2);
  archGeo.translate(-14, 4.8, 0); // 簷口高 4.8m，拱頂高 8.6m
  const arcCanopy = new THREE.Mesh(archGeo, materials.canopyFabricWhite);
  arcCanopy.castShadow = true;
  windShelterGroup.add(arcCanopy);

  // (3) ★ 兩側完全對稱深綠色圓鋼管支柱（共 8 根柱，南北簷口各 4 根！）★
  const pillarGeo = new THREE.CylinderGeometry(0.32, 0.35, 4.8, 12);
  const pillarMat = materials.windShelterGreen;
  const pillarXList = [-12, -4, 4, 12];

  // A. 北側簷口 4 根立柱（Z = -9.0，頂托北簷口）
  pillarXList.forEach(px => {
    const pilNorth = new THREE.Mesh(pillarGeo, pillarMat);
    pilNorth.position.set(px, 2.4, -9.0);
    pilNorth.castShadow = true;
    windShelterGroup.add(pilNorth);
  });

  // B. 南側簷口 4 根立柱（Z = +9.0，頂托南簷口，絕對對稱！）
  pillarXList.forEach(px => {
    const pilSouth = new THREE.Mesh(pillarGeo, pillarMat);
    pilSouth.position.set(px, 2.4, 9.0);
    pilSouth.castShadow = true;
    windShelterGroup.add(pilSouth);
  });

  // (4) 4 道橫跨南北立柱的鋼管拱架桁架梁（緊貼膜面托底）
  pillarXList.forEach(px => {
    const trussShape = new THREE.Shape();
    trussShape.moveTo(-halfSpan, 0);
    trussShape.quadraticCurveTo(0, archHeight, halfSpan, 0);
    trussShape.lineTo(halfSpan, 0.18);
    trussShape.quadraticCurveTo(0, archHeight + 0.18, -halfSpan, 0.18);
    trussShape.closePath();
    const trussGeo = new THREE.ExtrudeGeometry(trussShape, { depth: 0.3, bevelEnabled: false, steps: 1 });
    trussGeo.rotateY(Math.PI / 2);
    trussGeo.translate(px - 0.15, 4.75, 0);
    const trussMesh = new THREE.Mesh(trussGeo, pillarMat);
    windShelterGroup.add(trussMesh);
  });

  // (5) 東西兩端張拉膜起翹鋼管邊緣弧
  [-14, 14].forEach(ex => {
    const edgeShape = new THREE.Shape();
    edgeShape.moveTo(-halfSpan, 0);
    edgeShape.quadraticCurveTo(0, archHeight, halfSpan, 0);
    edgeShape.lineTo(halfSpan, 0.22);
    edgeShape.quadraticCurveTo(0, archHeight + 0.22, -halfSpan, 0.22);
    edgeShape.closePath();
    const edgeGeo = new THREE.ExtrudeGeometry(edgeShape, { depth: 0.35, bevelEnabled: false, steps: 1 });
    edgeGeo.rotateY(Math.PI / 2);
    edgeGeo.translate(ex - 0.17, 4.75, 0);
    const edgeMesh = new THREE.Mesh(edgeGeo, materials.railingMetal);
    windShelterGroup.add(edgeMesh);
  });

  // 座落於田徑跑道南側 (X: -1, Z: 18)，南側距環校道路保持安全距離，北端與跑道開闊分離
  windShelterGroup.position.set(-1, 0, 18);
  scene.add(windShelterGroup);
  setupBuildingInteractive(windShelterGroup, 'wind_shelter');

  // ------ C. 校園福德宮 (土地公廟) —— 特寫圖精確定位：風雨操場西南角！ ------
  // 非常重要！傳統閩南式廟宇精雕細琢：紅柱、石臺基、燕尾飛簷橘紅瓦頂、神龕供桌、天公爐與平安燈火
  const shrineGroup = new THREE.Group();

  // 1. 廟基石臺階
  const shrineBase = new THREE.Mesh(new THREE.BoxGeometry(6, 0.6, 6), new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 }));
  shrineBase.position.set(0, 0.3, 0);
  shrineGroup.add(shrineBase);

  // 2. 朱紅色神龕殿堂
  const shrineHall = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.2, 4.2), materials.shrineRed);
  shrineHall.position.set(0, 2.2, 0);
  shrineHall.castShadow = true;
  shrineGroup.add(shrineHall);

  // 3. 廟內金色神龕與供桌（前開口）
  const shrineAltar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 1.5), new THREE.MeshStandardMaterial({ color: 0xb45309 }));
  shrineAltar.position.set(0, 1.2, 1.5);
  shrineGroup.add(shrineAltar);

  // 4. 前廊朱紅雙立柱
  const colL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.2, 8), materials.shrineRed);
  colL.position.set(-1.8, 2.2, 2.4);
  const colR = colL.clone();
  colR.position.set(1.8, 2.2, 2.4);
  shrineGroup.add(colL, colR);

  // 5. 傳統閩南式燕尾脊雙層琉璃大屋頂
  const roofMain = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.8, 5.6), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 }));
  roofMain.position.set(0, 4.2, 0.2);
  roofMain.castShadow = true;
  shrineGroup.add(roofMain);

  // 上層燕尾翹脊造型
  const roofRidge = new THREE.Mesh(new THREE.ConeGeometry(3.6, 1.6, 4), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
  roofRidge.rotation.y = Math.PI / 4;
  roofRidge.position.set(0, 5.2, 0.2);
  roofRidge.scale.set(1.2, 0.7, 1);
  shrineGroup.add(roofRidge);

  // 6. 廟前銅製天公香爐
  const censer = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.4, 0.8, 12), new THREE.MeshStandardMaterial({ color: 0x78350f, metalness: 0.8 }));
  censer.position.set(0, 1, 3.2);
  shrineGroup.add(censer);

  // 7. 福德宮平安長明燈火（柔和溫暖金光，夜視極度莊嚴醒目）
  const shrineLight = new THREE.PointLight(0xf59e0b, 1.2, 15);
  shrineLight.position.set(0, 2.8, 1.8);
  shrineGroup.add(shrineLight);

  // 守護榕樹造景
  const guardTree = createTree(1.6, 3.6);
  guardTree.position.set(3.6, 0, -1);
  shrineGroup.add(guardTree);

  // 精確座落於：風雨操場西南角落 (X: -11, Z: 22)，緊鄰合作社東側！
  shrineGroup.position.set(-11, 0, 22);
  shrineGroup.rotation.y = Math.PI; // 祭拜正面、神龕、供桌與香爐面向北方操場（非南側走道）
  scene.add(shrineGroup);
  setupBuildingInteractive(shrineGroup, 'shrine');

  // ------ D. 司令臺與戶外球場 (Sports Stage & Ball Court) ------
  // 輔助函式：動態生成司令臺立柱運動插畫彩繪貼圖
  const createStagePillarMuralTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 0, 512, 1024);
    // 彩色幾何波點彩繪（排球、羽球、游泳運動意象）
    const dots = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'];
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = dots[i % dots.length];
      ctx.beginPath();
      ctx.arc((i * 49 + 30) % 460 + 25, (i * 77 + 50) % 920 + 50, (i % 3 + 2) * 10, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // ------ D. 司令臺與戶外球場 (Sports Stage & Ball Court) ------
  // 依據照片 media_1791473668489 與 media_1791473695550 特寫精密建模：
  // 灰色石造厚挑簷大頂棚、前廊兩根粗壯運動員彩繪圓柱、正面紅黃綵旗錦旗橫額與背景運動彩繪牆！
  const sportsStageGroup = new THREE.Group();

  // (1) 司令臺石造主基座（長 12m, 寬 6m, 高 1.4m）
  const stage = new THREE.Mesh(new THREE.BoxGeometry(12, 1.4, 6), materials.whiteConcrete);
  stage.position.set(0, 0.7, 0);
  stage.castShadow = true;
  sportsStageGroup.add(stage);

  // 臺前階梯（正面三層臺階）
  const stageSteps = new THREE.Mesh(new THREE.BoxGeometry(12.6, 0.45, 1.2), materials.corridorWall);
  stageSteps.position.set(0, 0.22, -3.4);
  sportsStageGroup.add(stageSteps);

  // (2) 挑高厚實深灰水泥磨石子大屋頂簷棚（長 14m, 寬 7.2m, 厚 0.7m，高 5.0m）
  const stageRoof = new THREE.Mesh(new THREE.BoxGeometry(14, 0.7, 7.2), materials.darkRoof);
  stageRoof.position.set(0, 5.0, 0);
  stageRoof.castShadow = true;
  sportsStageGroup.add(stageRoof);

  // (3) ★ 照片核心特徵：前廊兩根粗壯大圓柱（半徑 0.45m，高 4.3m，表面繪有彩色運動插畫彩繪！）★
  const stagePillarGeo = new THREE.CylinderGeometry(0.45, 0.48, 4.3, 16);
  const stagePillarMat = new THREE.MeshStandardMaterial({
    map: createStagePillarMuralTexture(),
    roughness: 0.6
  });
  const pillarL = new THREE.Mesh(stagePillarGeo, stagePillarMat);
  pillarL.position.set(-5.2, 2.85, -2.4);
  pillarL.castShadow = true;
  const pillarR = new THREE.Mesh(stagePillarGeo, stagePillarMat);
  pillarR.position.set(5.2, 2.85, -2.4);
  pillarR.castShadow = true;
  sportsStageGroup.add(pillarL, pillarR);

  // (4) 司令臺後方藍天白雲與校慶運動彩繪壁畫背景牆
  const stageBackdrop = new THREE.Mesh(new THREE.BoxGeometry(11.8, 3.6, 0.25), new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.8 }));
  stageBackdrop.position.set(0, 3.2, 2.7);
  sportsStageGroup.add(stageBackdrop);

  // (5) 基座正面紅色校慶宣傳布條與錦旗
  const stageBanner = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.65, 0.1), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
  stageBanner.position.set(0, 0.75, -3.05);
  sportsStageGroup.add(stageBanner);

  // 戶外標準籃球場（紅邊綠底、三分線、籃球架）
  const outCourt = new THREE.Mesh(new THREE.BoxGeometry(18, 0.25, 24), materials.courtGreen);
  outCourt.position.set(20, 0.12, 0);
  sportsStageGroup.add(outCourt);
  // 籃球架立柱與籃板
  const hoopPole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3.8, 6), materials.whiteConcrete);
  hoopPole1.position.set(20, 1.9, -11.5);
  const backboard1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 0.1), materials.whiteConcrete);
  backboard1.position.set(20, 3.4, -11.5);
  const hoopPole2 = hoopPole1.clone();
  hoopPole2.position.set(20, 1.9, 11.5);
  const backboard2 = backboard1.clone();
  backboard2.position.set(20, 3.4, 11.5);
  sportsStageGroup.add(hoopPole1, backboard1, hoopPole2, backboard2);

  sportsStageGroup.position.set(16, 0, 16);
  scene.add(sportsStageGroup);
  setupBuildingInteractive(sportsStageGroup, 'sports_stage_court');

  // ================= 9. 活動中心 (Activity Center - 綜合體育館) =================
  // 使用者明確指定：「這不是活動中心 是多功能，活動中心請恢復」！
  // 活動中心為操場東側之獨立綜合體育館，外觀恢復為米白混凝土主體、大跨距挑高拱形頂棚與西側迎賓門廊
  const actGroup = new THREE.Group();

  // (1) 活動中心主館體（寬 20m, 高 13.5m, 深 32m，完全獨立大樓）
  const actMain = createBuildingBlock(20, 13.5, 32, materials.whiteConcrete, materials.windowDark, materials.darkRoof);
  actMain.position.set(0, 6.75, 0);
  actGroup.add(actMain);

  // (2) 體育館大跨距挑高拱形頂棚
  const actRoof = new THREE.Mesh(new THREE.BoxGeometry(22, 2.8, 34), materials.gymRoof);
  actRoof.position.set(0, 14.8, 0);
  actRoof.castShadow = true;
  actGroup.add(actRoof);

  // (3) 西側操場迎面正門挑高門廊與迎賓階梯
  const actEntrance = new THREE.Mesh(new THREE.BoxGeometry(4, 5.5, 12), materials.brickOrange);
  actEntrance.position.set(-11, 2.75, 0);
  const actSteps = new THREE.Mesh(new THREE.BoxGeometry(3, 0.6, 14), materials.whiteConcrete);
  actSteps.position.set(-13.5, 0.3, 0);
  actGroup.add(actEntrance, actSteps);

  // 座落於操場東側北段 (X: 48, Z: -26)，南側留出 15 米寬敞通道，與男宿完全分開！
  actGroup.position.set(48, 0, -26);
  scene.add(actGroup);
  setupBuildingInteractive(actGroup, 'activity');

  // ================= 10. 職務宿舍群 (Staff Dormitories - 共五棟) =================
  const jobDormGroup = new THREE.Group();

  // 棟1：西直棟 (靠近活動中心東側)
  const dorm1_west = createBuildingBlock(8, 6.5, 13, materials.brickOrange, materials.windowDark, materials.darkRoof);
  dorm1_west.position.set(68, 3.25, -26);
  // 西棟左右兩側水池與綠地
  const dorm1_waterL = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 8), materials.waterWetland);
  dorm1_waterL.position.set(62.5, 0.15, -26);
  const dorm1_waterR = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 8), materials.waterWetland);
  dorm1_waterR.position.set(73.5, 0.15, -26);
  const dorm1_turf = new THREE.Mesh(new THREE.BoxGeometry(16, 0.18, 16), materials.turfGreen);
  dorm1_turf.position.set(68, 0.09, -26);
  jobDormGroup.add(dorm1_west, dorm1_waterL, dorm1_waterR, dorm1_turf);

  // 棟2：南橫棟 (中間下方橫向長方形，面對女宿廚房路口)
  const dorm2_midHoriz = createBuildingBlock(16, 6.5, 8, materials.brickOrange, materials.windowDark, materials.darkRoof);
  dorm2_midHoriz.position.set(84, 3.25, -9);
  jobDormGroup.add(dorm2_midHoriz);

  // 棟3：中北短直棟 (中央上方偏左之獨立短直大樓)
  const dorm3_midNorth = createBuildingBlock(8, 6.5, 9, materials.brickOrange, materials.windowDark, materials.darkRoof);
  dorm3_midNorth.position.set(81.5, 3.25, -30.5);
  jobDormGroup.add(dorm3_midNorth);

  // 棟4：中央長直棟 (位於棟3右下方，垂直錯位排列之長條大樓)
  const dorm4_midLong = createBuildingBlock(8, 6.5, 17, materials.brickOrange, materials.windowDark, materials.darkRoof);
  dorm4_midLong.position.set(86.5, 3.25, -20);
  jobDormGroup.add(dorm4_midLong);

  // 棟5：東長直棟 (最東側細長大樓，靠平林溪景觀)
  const dorm5_eastLong = createBuildingBlock(7, 6.5, 22, materials.brickOrange, materials.windowDark, materials.darkRoof);
  dorm5_eastLong.position.set(96, 3.25, -22);
  jobDormGroup.add(dorm5_eastLong);

  scene.add(jobDormGroup);
  setupBuildingInteractive(jobDormGroup, 'job_dorm');

  // 活動中心與男生宿舍之間的分隔景觀大道（寬 8m，確保兩棟絕不黏在一起！）
  const actDormAvenue = new THREE.Mesh(new THREE.BoxGeometry(38, 0.12, 8), materials.parkingLot);
  actDormAvenue.position.set(54, 0.06, -6);
  const actDormTurf = new THREE.Mesh(new THREE.BoxGeometry(36, 0.14, 4), materials.turfGreen);
  actDormTurf.position.set(54, 0.07, 0);
  scene.add(actDormAvenue, actDormTurf);

  // ================= 11. 男學生宿舍 (Boys Dormitory - 5層樓) =================
  // 使用者明確指定：「男學生宿舍跟活動中心不要黏在一起」！
  // 男宿往南與東南精準落位 (X: 58, Z: 14)，保持大於 15 米獨立間隔
  const maleDormGroup = new THREE.Group();

  // 男宿主體（5層樓高，長向西南至東北走向）
  const dormBody = createBuildingBlock(10, 16.0, 22, materials.brickOrange, materials.windowDark, materials.darkRoof);
  dormBody.position.set(0, 8.0, 0);
  maleDormGroup.add(dormBody);

  // 東北端凸出北翼（5層樓高）
  const dormNorthWing = createBuildingBlock(12, 16.0, 9, materials.brickOrange, materials.windowDark, materials.darkRoof);
  dormNorthWing.position.set(6, 8.0, -9);
  maleDormGroup.add(dormNorthWing);

  // 直達 5F 之專用無障礙電梯塔
  const maleElevator = new THREE.Mesh(new THREE.BoxGeometry(3, 18, 3), materials.whiteConcrete);
  maleElevator.position.set(10, 9.0, -9);
  maleDormGroup.add(maleElevator);

  // 西北側無障礙坡道引道（面向跑道側）
  const maleRamp = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.8, 10), materials.whiteConcrete);
  maleRamp.position.set(-6.5, 0.4, -2);
  maleDormGroup.add(maleRamp);

  // 東南側通往步道的臺階
  const maleStairs = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.4, 7), new THREE.MeshStandardMaterial({ color: 0x334155 }));
  maleStairs.position.set(6, 0.2, 5);
  maleDormGroup.add(maleStairs);

  // 使用者明確指定：「男生宿舍和披薩窯是不是再靠近女宿一點（但是不要連在一起 中間有道路可走）」！
  // 男宿向東靠近女宿落位於 (X: 53, 0, 11)，東側與女宿間保留寬敞暢通道路！
  maleDormGroup.rotation.y = -0.42;
  maleDormGroup.position.set(53, 0, 11);
  scene.add(maleDormGroup);
  setupBuildingInteractive(maleDormGroup, 'male_dorm');

  // ================= 12. 山羌造型泥土披薩窯 (Muntjac Earth Pizza Oven) =================
  // 使用者明確指定：「披薩窯是一個泥土做的山羌造型」！
  // 依特寫圖精確座落於男學生宿舍正西南角獨立草坪 (X: 28, Z: 20)
  const pizzaGroup = new THREE.Group();

  // (1) 洗石子與防潮紅磚地坪平臺
  const pizzaPlatform = new THREE.Mesh(new THREE.BoxGeometry(9, 0.25, 7.5), materials.parkingLot);
  pizzaPlatform.position.set(0, 0.12, 0);
  pizzaGroup.add(pizzaPlatform);

  // (2) 防雨原木木構涼亭遮棚（四根木柱 + 斜屋頂，保護泥土窯不受雨淋）
  const timberMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
  const roofTileMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });
  // 四根木柱
  [[-3.8, -2.8], [3.8, -2.8], [-3.8, 2.8], [3.8, 2.8]].forEach(([px, pz]) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.2, 8), timberMat);
    post.position.set(px, 2.1, pz);
    post.castShadow = true;
    pizzaGroup.add(post);
  });
  // 雙斜人字木桁架屋頂
  const shelterRoof = new THREE.Mesh(new THREE.ConeGeometry(5.4, 1.4, 4), roofTileMat);
  shelterRoof.position.set(0, 4.8, 0);
  shelterRoof.rotation.y = Math.PI / 4;
  shelterRoof.scale.set(1.1, 0.9, 0.85);
  pizzaGroup.add(shelterRoof);

  // (3) ★ 核心泥土山羌造型披薩窯 (Muntjac Mud Earth Oven) ★
  const muntjacClayMat = new THREE.MeshStandardMaterial({
    color: 0xa45224, // 天然紅褐黃土胚泥色
    roughness: 0.92,
    metalness: 0.05
  });
  const muntjacDarkMat = new THREE.MeshStandardMaterial({
    color: 0x5c2e0b, // 深褐泥塑色（蹄部、眼角與角叉）
    roughness: 0.9
  });
  const fireGlowMat = new THREE.MeshStandardMaterial({
    color: 0xff3b00,
    emissive: 0xff3b00,
    emissiveIntensity: 0.85,
    roughness: 0.4
  });

  // A. 山羌圓潤趴臥身軀（泥土窯膛主體：長 2.8m, 寬 2.2m, 高 1.8m）
  const muntjacBody = new THREE.Mesh(new THREE.SphereGeometry(1.4, 20, 20), muntjacClayMat);
  muntjacBody.scale.set(1.15, 0.9, 1.35);
  muntjacBody.position.set(0, 1.35, 0);
  muntjacBody.castShadow = true;
  pizzaGroup.add(muntjacBody);

  // B. 披薩窯入料拱門口（設於山羌胸口/腹前，朝向操作區）
  const ovenArchOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.5, 16, 1, false, 0, Math.PI), muntjacClayMat);
  ovenArchOuter.rotation.x = Math.PI / 2;
  ovenArchOuter.position.set(0, 1.0, 1.6);
  // 拱門內部燃燒炭火微光（烘烤披薩處）
  const ovenFire = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.4), fireGlowMat);
  ovenFire.position.set(0, 0.75, 1.4);
  pizzaGroup.add(ovenArchOuter, ovenFire);

  // C. 山羌泥塑頭頸部（向上前方揚起）
  const muntjacNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.6, 1.1, 12), muntjacClayMat);
  muntjacNeck.rotation.x = -Math.PI / 6;
  muntjacNeck.position.set(0, 2.1, 1.1);
  muntjacNeck.castShadow = true;
  pizzaGroup.add(muntjacNeck);

  // 山羌頭部（前伸的吻部、圓頭）
  const muntjacHead = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.1, 14), muntjacClayMat);
  muntjacHead.rotation.x = Math.PI / 2.3;
  muntjacHead.position.set(0, 2.65, 1.65);
  muntjacHead.castShadow = true;
  pizzaGroup.add(muntjacHead);

  // 黑色小鼻頭
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0x18181b }));
  nose.position.set(0, 2.5, 2.2);
  pizzaGroup.add(nose);

  // 雙側黑色靈動小眼睛
  [-0.22, 0.22].forEach(ex => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), new THREE.MeshBasicMaterial({ color: 0x09090b }));
    eye.position.set(ex, 2.8, 1.6);
    pizzaGroup.add(eye);
  });

  // 山羌兩隻立體大耳朵（斜向外側伸展）
  [-1, 1].forEach(side => {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 8), muntjacClayMat);
    ear.rotation.z = side * 0.7;
    ear.rotation.x = -0.3;
    ear.position.set(side * 0.42, 3.0, 1.4);
    pizzaGroup.add(ear);
  });

  // 雄山羌額頭特有的兩隻泥塑角叉（短角）
  [-1, 1].forEach(side => {
    const horn = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.07, 0.45, 8), muntjacDarkMat);
    horn.rotation.x = -0.35;
    horn.rotation.z = side * 0.2;
    horn.position.set(side * 0.16, 3.1, 1.55);
    pizzaGroup.add(horn);
  });

  // D. 山羌趴臥的四隻泥塑小腿與蹄腳
  [[-1.0, 0.8], [1.0, 0.8], [-1.0, -0.8], [1.0, -0.8]].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.4, 0.6), muntjacClayMat);
    leg.position.set(lx, 0.45, lz);
    pizzaGroup.add(leg);
  });

  // E. 泥塑短尾巴
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.4, 8), muntjacClayMat);
  tail.rotation.x = -Math.PI / 3;
  tail.position.set(0, 1.6, -1.8);
  pizzaGroup.add(tail);

  // F. 窯背陶管排煙囪（自背部向上穿過屋頂）
  const chimneyPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.8, 12), materials.darkRoof);
  chimneyPipe.position.set(0, 3.2, -0.3);
  const chimneyCap = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.25, 8), materials.darkRoof);
  chimneyCap.position.set(0, 4.65, -0.3);
  pizzaGroup.add(chimneyPipe, chimneyCap);

  // G. 窯前操作工作木桌與披薩鏟、相思木柴堆
  const prepTable = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 1.0), timberMat);
  prepTable.position.set(2.4, 0.55, 1.2);
  const peelHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.8, 8), timberMat);
  peelHandle.rotation.z = Math.PI / 4;
  peelHandle.position.set(1.8, 1.1, 1.2);
  const peelBlade = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.02, 12), materials.whiteConcrete);
  peelBlade.position.set(1.15, 0.8, 1.2);
  const firewood = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 0.8), muntjacDarkMat);
  firewood.position.set(-2.5, 0.42, 1.2);
  pizzaGroup.add(prepTable, peelHandle, peelBlade, firewood);

  // 配合男學生宿舍平移，精確座落於男學生宿舍正西南角獨立草坪 (X: 46, Z: 24)
  pizzaGroup.position.set(46, 0, 24);
  scene.add(pizzaGroup);
  setupBuildingInteractive(pizzaGroup, 'pizza_oven');

  // ================= ★ 男女宿舍之間的寬闊斜向貫穿大道（兩棟宿舍完全獨立、中間道路可通行）★ =================
  // 使用者明確指定：「不要連在一起 中間有道路可走」！
  // 貫穿男宿 (X: 53) 與女宿 (X: 82) 之間的斜向貫穿大道，北接活動中心、南抵平林溪木棧道，寬達 7.5 米！
  const dormAvenueGroup = new THREE.Group();
  const avenueMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
  const avenueTurfMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.85 });

  // 斜向柏油大道主幹道（長 48m, 寬 7.5m，斜向穿行於男女宿舍之間）
  const diagAvenue = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.12, 48), avenueMat);
  diagAvenue.rotation.y = -0.45;
  diagAvenue.position.set(67, 0.06, 12);
  diagAvenue.receiveShadow = true;

  // 大道兩側隔離景觀綠帶（確保兩宿舍各自獨立且通道開闊暢通）
  const avenueTurfWest = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.14, 42), avenueTurfMat);
  avenueTurfWest.rotation.y = -0.45;
  avenueTurfWest.position.set(62, 0.07, 11);

  const avenueTurfEast = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.14, 42), avenueTurfMat);
  avenueTurfEast.rotation.y = -0.45;
  avenueTurfEast.position.set(72, 0.07, 13);

  dormAvenueGroup.add(diagAvenue, avenueTurfWest, avenueTurfEast);
  scene.add(dormAvenueGroup);

  // ================= 13. 女學生宿舍與親水景觀圓池 (5層樓，完全獨立) =================
  // 使用者明確指定：「請重新對應位置不要讓男女宿舍連在一起」！
  // 女學生宿舍落位於東側 (X: 82, Z: 10)，與男學生宿舍 (X: 38, Z: 10) 間隔達 44 米！
  const femaleDormGroup = new THREE.Group();

  // 女學生宿舍主體大樓（5層樓高，寬 22m, 高 16.0m, 深 14m）
  const girlDorm = createBuildingBlock(22, 16.0, 14, materials.brickOrange, materials.windowDark, materials.darkRoof);
  girlDorm.position.set(0, 8.0, 0);
  femaleDormGroup.add(girlDorm);

  // 女宿正北方接「中央廚房」（特寫圖標示「廚房」）
  const kitchen = createBuildingBlock(11, 6.0, 9, materials.whiteConcrete, materials.windowDark, materials.darkRoof);
  kitchen.position.set(4, 3.0, -10.5);
  femaleDormGroup.add(kitchen);

  // 女宿東南方接「學生餐廳」（特寫圖標示「餐廳」）
  const dining = createBuildingBlock(12, 6.5, 16, materials.whiteConcrete, materials.windowDark, materials.darkRoof);
  dining.position.set(10, 3.25, 8);
  femaleDormGroup.add(dining);

  // 女宿南側直通 5F 之無障礙電梯塔（特寫圖綠色電梯標示）
  const girlElevator = new THREE.Mesh(new THREE.BoxGeometry(3, 18, 3), materials.whiteConcrete);
  girlElevator.position.set(2, 9.0, 7.5);
  femaleDormGroup.add(girlElevator);

  // 特寫圖核心細節！女學生宿舍南側「大型深藍色圓形水景廣場」
  const pondCircle = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 8.5, 0.35, 28), materials.waterWetland);
  pondCircle.position.set(-6, 0.18, 16);
  femaleDormGroup.add(pondCircle);

  // 圓池周圍環形漫步道
  const pondWalkway = new THREE.Mesh(new THREE.RingGeometry(8.6, 10.5, 28), new THREE.MeshBasicMaterial({ color: 0x94a3b8, side: THREE.DoubleSide }));
  pondWalkway.rotation.x = -Math.PI / 2;
  pondWalkway.position.set(-6, 0.2, 16);
  femaleDormGroup.add(pondWalkway);

  // 幾何水景階梯廣場與綠化植栽
  const geoWalk = new THREE.Mesh(new THREE.BoxGeometry(11, 0.25, 9), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
  geoWalk.position.set(5, 0.16, 16);
  femaleDormGroup.add(geoWalk);

  femaleDormGroup.position.set(82, 0, 10);
  scene.add(femaleDormGroup);
  setupBuildingInteractive(femaleDormGroup, 'female_dorm');

  // ================= 14. 親溪烤肉區 (BBQ Area) =================
  // 特寫圖：餐廳正東側、臨平林溪長方形烤肉區
  const bbqGroup = new THREE.Group();
  const bbqGround = new THREE.Mesh(new THREE.BoxGeometry(7, 0.2, 15), materials.parkingLot);
  bbqGround.position.set(0, 0.1, 0);
  bbqGroup.add(bbqGround);

  // 烤肉涼亭遮陽架
  const bbqRoof = new THREE.Mesh(new THREE.BoxGeometry(6, 0.4, 13), materials.darkRoof);
  bbqRoof.position.set(0, 3.5, 0);
  bbqGroup.add(bbqRoof);

  // 烤肉磚爐臺
  for (let z = -5; z <= 5; z += 3.5) {
    const stove = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.6), materials.brickOrange);
    stove.position.set(0, 0.7, z);
    bbqGroup.add(stove);
  }

  bbqGroup.position.set(105, 0, 10);
  scene.add(bbqGroup);
  setupBuildingInteractive(bbqGroup, 'bbq_area');

  // ================= 12. 人工溼地生態園區 (Artificial Wetland) =================
  // 特寫圖細節：左側有 S 型圓弧小徑，中央為雙水池，池塘間有明顯黑白橫條的木棧橋！
  const wetlandGroup = new THREE.Group();

  // 生態雙水池
  const pond1 = new THREE.Mesh(new THREE.CylinderGeometry(9, 11, 0.35, 20), materials.waterWetland);
  pond1.position.set(-3, 0.15, -4);
  const pond2 = new THREE.Mesh(new THREE.CylinderGeometry(8, 10, 0.35, 18), materials.waterWetland);
  pond2.position.set(5, 0.15, 6);
  wetlandGroup.add(pond1, pond2);

  // 特寫圖中的「黑白條紋景觀木棧橋」！
  const stripedBridge = new THREE.Mesh(new THREE.BoxGeometry(14, 0.5, 3), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 }));
  stripedBridge.position.set(1, 0.3, 1);
  stripedBridge.rotation.y = 0.3;
  wetlandGroup.add(stripedBridge);

  // 左側 S 型白色景觀漫步道
  const sCurvePath = new THREE.Mesh(new THREE.TorusGeometry(5, 0.6, 6, 16, Math.PI * 1.4), new THREE.MeshBasicMaterial({ color: 0xf8fafc }));
  sCurvePath.rotation.x = -Math.PI / 2;
  sCurvePath.position.set(-9, 0.2, -4);
  wetlandGroup.add(sCurvePath);

  // 環池水生灌木
  for (let a = 0; a < Math.PI * 2; a += 0.75) {
    const shrub = createTree(1.2, 2.2);
    shrub.position.set(Math.cos(a) * 13, 0, Math.sin(a) * 11);
    wetlandGroup.add(shrub);
  }

  wetlandGroup.position.set(80, 0, 36);
  scene.add(wetlandGroup);
  setupBuildingInteractive(wetlandGroup, 'wetland');

  // ================= 13. 漆彈場 (Paintball Field) =================
  const paintballGroup = new THREE.Group();
  const pbTurf = new THREE.Mesh(new THREE.BoxGeometry(26, 0.2, 16), materials.turfGreen);
  pbTurf.position.set(0, 0.1, 0);
  paintballGroup.add(pbTurf);

  // 漆彈場掩體
  const bunkerMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9 });
  const b1 = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 1), bunkerMat);
  b1.position.set(-6, 1, -3);
  const b2 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2, 10), bunkerMat);
  b2.position.set(5, 1, 2);
  const b3 = b1.clone();
  b3.position.set(2, 1, -4);
  paintballGroup.add(b1, b2, b3);

  paintballGroup.position.set(82, 0, 54);
  scene.add(paintballGroup);
  setupBuildingInteractive(paintballGroup, 'paintball');
}

/**
 * 輔助函式：建立具備樓層分隔線條與窗戶的立體建築區塊
 */
function createBuildingBlock(w, h, d, wallMat, windowMat, roofMat) {
  const group = new THREE.Group();

  // 主建物體
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // 屋頂凸出層
  const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.8, 0.7, d + 0.8), roofMat);
  roof.position.set(0, h / 2 + 0.35, 0);
  roof.castShadow = true;
  group.add(roof);

  // 模擬立面長條窗格飾板
  const glass = new THREE.Mesh(new THREE.BoxGeometry(w * 0.88, h * 0.6, d + 0.15), windowMat);
  group.add(glass);

  return group;
}

/**
 * 建立 Low-Poly 樹木
 */
function createTree(radius, height) {
  const treeGroup = new THREE.Group();
  // 樹幹
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.2, radius * 0.3, height * 0.35, 6),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 })
  );
  trunk.position.y = height * 0.175;
  trunk.castShadow = true;
  treeGroup.add(trunk);

  // 樹冠
  const leaves = new THREE.Mesh(
    new THREE.ConeGeometry(radius, height * 0.85, 7),
    new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8, flatShading: true })
  );
  leaves.position.y = height * 0.65;
  leaves.castShadow = true;
  treeGroup.add(leaves);

  return treeGroup;
}

/**
 * 沿校園周圍散佈大量樹木與綠美化（依原圖綠帶分佈校正）
 */
function buildTreesAndDetails() {
  const treeBatch = new THREE.Group();

  // 1. 校門進入沿線道路綠樹（依使用者指示：自大橋東側 X: -92 起向東排列，橋上不生成樹木）
  for (let i = -92; i <= -45; i += 10) {
    const t = createTree(2.2, 5);
    t.position.set(i, 0, 42);
    treeBatch.add(t);
  }

  // 2. 操場北側山坡後方森林綠帶
  for (let i = -40; i <= 60; i += 8) {
    const t = createTree(3, 7);
    t.position.set(i, 0, -42);
    treeBatch.add(t);
  }

  // 3. 沿著平林溪河岸兩側之親水綠帶（依使用者指示 media_1791526809291.png：大橋範圍 X: -118 ~ -94 徹底避讓，橋上絕不長樹）
  for (let i = -140; i <= 90; i += 12) {
    if (i >= -118 && i <= -94) continue;
    const t = createTree(2.6, 5.8);
    t.position.set(i, 0, 52 + Math.sin(i * 0.06) * 5);
    treeBatch.add(t);
  }

  scene.add(treeBatch);
}

/**
 * 建構全校實體路燈系統與夜間景觀燈具
 */
function buildStreetLampsAndNightLights() {
  const lampGroup = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7, metalness: 0.4 });
  const bulbMat = campusMaterials.lampBulb;

  // 輔助函式：建立單盞標準造型路燈（高 4.6m）
  const createStreetLamp = (x, z, rotY = 0) => {
    const grp = new THREE.Group();
    // 燈柱
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 4.2, 8), poleMat);
    pole.position.y = 2.1;
    pole.castShadow = true;
    grp.add(pole);

    // 橫向燈臂
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.08), poleMat);
    arm.position.set(0.35, 4.2, 0);
    grp.add(arm);

    // 燈罩
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.2, 8), poleMat);
    shade.position.set(0.7, 4.15, 0);
    grp.add(shade);

    // 發光燈泡
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), bulbMat);
    bulb.position.set(0.7, 4.05, 0);
    grp.add(bulb);

    grp.position.set(x, 0, z);
    grp.rotation.y = rotY;
    lampGroup.add(grp);
  };

  // 輔助函式：建立親溪木棧道景觀矮柱燈（高 1.1m）
  const createBollardLamp = (x, z) => {
    const grp = new THREE.Group();
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.9, 8), poleMat);
    post.position.y = 0.45;
    grp.add(post);

    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), bulbMat);
    bulb.position.y = 0.95;
    grp.add(bulb);

    grp.position.set(x, 0, z);
    lampGroup.add(grp);
  };

  // 1. 平林溪南側雙向雙車道（沿線均勻分佈路燈）
  const roadLampXs = [-95, -70, -45, -20, 5, 30, 55, 80, 105];
  roadLampXs.forEach(lx => {
    createStreetLamp(lx, 37.5, Math.PI); // 朝向車道北側照亮
  });

  // 2. 教學大樓與田徑場之間的南北大道
  [-30, -5, 20].forEach(lz => {
    createStreetLamp(-23.5, lz, Math.PI / 2);
  });

  // 3. 中庭廣場綠化步道與校門迎賓大道
  createStreetLamp(-56, 16, -Math.PI / 2);
  createStreetLamp(-76, 16, Math.PI / 2);
  createStreetLamp(-102, 17, -Math.PI / 2); // 校門口前迎賓路燈

  // 4. 活動中心前與男宿大道
  createStreetLamp(46, -10, Math.PI);
  createStreetLamp(52, 12, -Math.PI / 3);

  // 5. 女宿與人工溼地周邊
  createStreetLamp(76, 18, Math.PI / 4);

  // 6. 親溪木棧道景觀矮柱燈（水岸夜燈）
  [-95, -75, -55, -35, -15, 10, 35, 60].forEach(bx => {
    createBollardLamp(bx, 42.0);
  });

  scene.add(lampGroup);

  // 7. 配置關鍵節點柔和夜間點光源（黑夜時點亮、白天時關閉）
  const nightLightDefs = [
    { x: -98, y: 5, z: 12, color: 0x38bdf8, intensity: 1.8, distance: 35 },    // 校門口迎賓夜燈（天藍色）
    { x: 0, y: 5, z: 34, color: 0xfef08a, intensity: 1.8, distance: 45 },      // 車道中央夜燈
    { x: -70, y: 5, z: 34, color: 0xfde047, intensity: 1.6, distance: 40 },    // 西側車道夜燈
    { x: 65, y: 5, z: 20, color: 0xfde047, intensity: 1.6, distance: 40 },     // 東側宿舍大道夜燈
    { x: -24, y: 5, z: -5, color: 0xfef08a, intensity: 1.8, distance: 45 },    // 教學大樓大道夜燈
    { x: 10, y: 5, z: 12, color: 0xfde047, intensity: 1.6, distance: 40 },     // 操場司令臺夜燈
    { x: -60, y: 4, z: 8, color: 0x93c5fd, intensity: 1.3, distance: 35 },     // 中庭花園景觀燈（淡藍）
    { x: -11, y: 2.5, z: 22, color: 0xef4444, intensity: 1.5, distance: 18 },  // 土地公廟神龕長明紅燈
    { x: 46, y: 1.5, z: 24, color: 0xf97316, intensity: 1.6, distance: 16 }   // 披薩窯柴燒暖紅微光
  ];

  nightPointLights = [];
  nightLightDefs.forEach(def => {
    const pl = new THREE.PointLight(def.color, 0, def.distance, 1.2);
    pl.position.set(def.x, def.y, def.z);
    pl.userData.nightIntensity = def.intensity;
    scene.add(pl);
    nightPointLights.push(pl);
  });
}

/**
 * 切換白天模式與黑夜(夜燈)模式
 */
function toggleDayNight() {
  setDayNightMode(!isNightMode);
}

/**
 * 設定白天或黑夜(夜燈)模式
 */
function setDayNightMode(night) {
  isNightMode = night;
  const btn = document.getElementById('btn-toggle-daynight');

  if (isNightMode) {
    // ============ 黑夜模式 (Night Mode with Lights) ============
    if (btn) {
      btn.classList.add('active');
      btn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
      btn.title = '切換為白天模式';
    }

    // 1. 深邃星空夜幕與夜間薄霧
    scene.background.set(0x060c18);
    scene.fog.color.set(0x060c18);
    scene.fog.density = 0.0032;

    // 2. 主環境光與太陽光轉為冷藍月光
    if (sceneLights.ambientLight) {
      sceneLights.ambientLight.color.set(0x1e293b);
      sceneLights.ambientLight.intensity = 0.28;
    }
    if (sceneLights.hemiLight) {
      sceneLights.hemiLight.color.set(0x0f172a);
      sceneLights.hemiLight.groundColor.set(0x022c22);
      sceneLights.hemiLight.intensity = 0.12;
    }
    if (sceneLights.sunLight) {
      sceneLights.sunLight.color.set(0x60a5fa);
      sceneLights.sunLight.intensity = 0.22;
    }
    if (sceneLights.fillLight) {
      sceneLights.fillLight.intensity = 0.05;
    }

    // 3. 全校建築窗戶透出自習溫馨暖燈（夜讀自習氛圍）
    if (campusMaterials.windowDark) {
      campusMaterials.windowDark.color.set(0xfef08a);
      campusMaterials.windowDark.emissive.set(0xf59e0b);
      campusMaterials.windowDark.emissiveIntensity = 0.95;
    }

    // 4. 校園路燈群與木棧道燈泡自發光點亮（金黃暖光）
    if (campusMaterials.lampBulb) {
      campusMaterials.lampBulb.color.set(0xfffbeb);
      campusMaterials.lampBulb.emissive.set(0xfde047);
      campusMaterials.lampBulb.emissiveIntensity = 2.8;
    }

    // 5. 啟動夜間代表性點光源
    nightPointLights.forEach(pl => {
      pl.intensity = pl.userData.nightIntensity || 1.6;
    });

  } else {
    // ============ 白天模式 (Daylight Mode) ============
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      btn.title = '切換為黑夜(有夜燈)模式';
    }

    // 1. 晴朗青天與清新晨霧
    scene.background.set(0xbfe0f7);
    scene.fog.color.set(0xbfe0f7);
    scene.fog.density = 0.0022;

    // 2. 明亮陽光與溫和天光
    if (sceneLights.ambientLight) {
      sceneLights.ambientLight.color.set(0xe0f2fe);
      sceneLights.ambientLight.intensity = 0.75;
    }
    if (sceneLights.hemiLight) {
      sceneLights.hemiLight.color.set(0xdbeafe);
      sceneLights.hemiLight.groundColor.set(0x166534);
      sceneLights.hemiLight.intensity = 0.55;
    }
    if (sceneLights.sunLight) {
      sceneLights.sunLight.color.set(0xfffdf5);
      sceneLights.sunLight.intensity = 1.45;
    }
    if (sceneLights.fillLight) {
      sceneLights.fillLight.intensity = 0.45;
    }

    // 3. 建築窗戶關閉自發光
    if (campusMaterials.windowDark) {
      campusMaterials.windowDark.color.set(0x0f172a);
      campusMaterials.windowDark.emissive.set(0x000000);
      campusMaterials.windowDark.emissiveIntensity = 0;
    }

    // 4. 路燈燈泡關閉自發光
    if (campusMaterials.lampBulb) {
      campusMaterials.lampBulb.color.set(0x94a3b8);
      campusMaterials.lampBulb.emissive.set(0x000000);
      campusMaterials.lampBulb.emissiveIntensity = 0;
    }

    // 5. 關閉夜間點光源
    nightPointLights.forEach(pl => {
      pl.intensity = 0;
    });
  }
}

/**
 * 綁定建築物物件的拾取資料
 */
function setupBuildingInteractive(group, buildingId) {
  group.traverse(child => {
    if (child.isMesh) {
      child.userData = { buildingId: buildingId };
    }
  });
  buildingObjects.set(buildingId, group);
}

/**
 * 建立 UI 導覽按鈕與螢幕地標浮動標籤
 */
function setupUI() {
  const navContainer = document.getElementById('building-nav-list');
  const labelsContainer = document.getElementById('labels-container');

  navContainer.innerHTML = '';
  labelsContainer.innerHTML = '';

  CAMPUS_DATA.forEach(item => {
    // 1. 左側導覽欄項目
    const navItem = document.createElement('div');
    navItem.className = 'nav-item';
    navItem.dataset.id = item.id;
    navItem.innerHTML = `<i class="fa-solid ${item.icon}"></i> <span>${item.shortName}</span>`;
    navItem.addEventListener('click', () => {
      focusOnBuilding(item.id);
    });
    navContainer.appendChild(navItem);

    // 2. 3D 浮動標籤（Screen Overlays）
    const label = document.createElement('div');
    if (item.id === 'dog_xiangxiang') {
      // 校狗祥祥專屬特別標識（生動活潑的琥珀金圓角膠囊、搖動狗爪徽章與即時巡邏狀態標籤）
      label.className = 'dog-world-label';
      label.id = `label-${item.id}`;
      label.innerHTML = `<i class="fa-solid fa-paw paw-icon"></i> <span>${item.shortName}</span> <span class="dog-status-tag" id="dog-status-tag">巡邏中</span>`;
    } else {
      label.className = 'world-label';
      label.id = `label-${item.id}`;
      label.innerHTML = `<i class="fa-solid ${item.icon}"></i> ${item.shortName}`;
    }
    label.addEventListener('click', (e) => {
      e.stopPropagation();
      focusOnBuilding(item.id);
    });
    labelsContainer.appendChild(label);
  });
}

/**
 * 更新 3D 浮動標籤在 2D 螢幕畫面的投影座標
 */
function updateScreenLabels() {
  if (!labelsVisible) return;

  const tempV = new THREE.Vector3();
  const widthHalf = window.innerWidth / 2;
  const heightHalf = window.innerHeight / 2;

  CAMPUS_DATA.forEach(item => {
    const labelEl = document.getElementById(`label-${item.id}`);
    if (!labelEl) return;

    const labelHeight = (item.id === 'dog_xiangxiang') ? 2.6 : 12;
    tempV.set(item.position.x, item.position.y + labelHeight, item.position.z);
    tempV.project(camera);

    // 檢查是否在攝影機前方視錐範圍內
    if (tempV.z > 1) {
      labelEl.style.display = 'none';
      return;
    }

    const x = (tempV.x * widthHalf) + widthHalf;
    const y = -(tempV.y * heightHalf) + heightHalf;

    labelEl.style.display = 'flex';
    labelEl.style.left = `${x}px`;
    labelEl.style.top = `${y}px`;
  });
}

/**
 * 聚焦並平滑飛向指定建築物
 */
function focusOnBuilding(buildingId) {
  const data = CAMPUS_DATA.find(d => d.id === buildingId);
  if (!data) return;

  selectedBuilding = data;
  updateDetailPanel(data);

  // 突出顯示左側選單狀態
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === buildingId);
  });

  // 行動裝置切換時自動收起左側導覽抽屜
  const campusNav = document.getElementById('campus-nav');
  if (campusNav) campusNav.classList.remove('open');

  // 計算目標相機位置與觀察點
  const targetCamPos = {
    x: data.position.x + data.cameraOffset.x,
    y: data.position.y + data.cameraOffset.y,
    z: data.position.z + data.cameraOffset.z
  };

  const targetLookAt = {
    x: data.position.x,
    y: data.position.y + 4,
    z: data.position.z
  };

  // Tween 平滑視角推進動畫
  new TWEEN.Tween(camera.position)
    .to(targetCamPos, 1200)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();

  new TWEEN.Tween(controls.target)
    .to(targetLookAt, 1200)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();
}

/**
 * 更新右側詳細資訊面板內容
 */
function updateDetailPanel(data) {
  const panel = document.getElementById('detail-panel');
  document.getElementById('building-name').textContent = data.name;
  document.getElementById('building-en-name').textContent = data.enName;
  document.getElementById('building-desc').textContent = data.desc;

  // 圖示 Badge
  const badge = document.getElementById('building-icon-badge');
  badge.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;

  // 標籤 Tags
  const tagsRow = document.getElementById('building-tags');
  tagsRow.innerHTML = '';
  data.tags.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tag-badge';
    span.innerHTML = `<i class="fa-solid fa-check"></i> ${t}`;
    tagsRow.appendChild(span);
  });

  // 樓層配置與室內格局
  const floorList = document.getElementById('floor-list');
  const floorTabs = document.getElementById('floor-tabs');
  const floorLayoutBox = document.getElementById('floor-layout-box');
  const btnPanelXray = document.getElementById('btn-panel-xray');

  floorList.innerHTML = '';
  if (floorTabs) floorTabs.innerHTML = '';

  const hasFloors = data.floors && data.floors.length > 0;
  // ★ 動態判定：只要該建築任一樓層包含房間資料 (rooms)，即全面啟用室內空間標示、2D格局地圖與透視開關！
  const hasIndoorRooms = hasFloors && data.floors.some(f => f.rooms && f.rooms.length > 0);

  if (hasFloors) {
    document.getElementById('floors-section').style.display = 'block';

    // 室內透視開關連動
    if (btnPanelXray) {
      btnPanelXray.style.display = hasIndoorRooms ? 'inline-flex' : 'none';
      btnPanelXray.classList.toggle('active', isIndoorXRay && activeXRayBuilding === data.id);
      btnPanelXray.onclick = () => {
        const nextState = !(isIndoorXRay && activeXRayBuilding === data.id);
        toggleIndoorXRay(nextState, data.id);
        btnPanelXray.classList.toggle('active', nextState);
      };
    }

    if (hasIndoorRooms) {
      if (floorLayoutBox) floorLayoutBox.style.display = 'block';

      // 產生樓層 Tab 按鈕
      data.floors.forEach((f, idx) => {
        const tabBtn = document.createElement('button');
        tabBtn.className = `floor-tab-btn ${idx === 0 ? 'active' : ''}`;
        tabBtn.setAttribute('data-index', idx);
        tabBtn.textContent = f.floor;

        tabBtn.addEventListener('click', () => {
          document.querySelectorAll('.floor-tab-btn').forEach(b => b.classList.remove('active'));
          tabBtn.classList.add('active');
          renderFloorPlan(data, idx);
          if (isIndoorXRay) {
            filterIndoorFloor(data.id, idx);
          }
        });

        floorTabs.appendChild(tabBtn);
      });

      // 預設渲染 1F (index 0) 的 2D 平面格局圖
      renderFloorPlan(data, 0);
    } else {
      // 一般設施（無複雜室內教室，如操場、景點）
      if (floorLayoutBox) floorLayoutBox.style.display = 'none';
      data.floors.forEach(f => {
        const item = document.createElement('div');
        item.className = 'floor-item';
        item.innerHTML = `<span class="floor-tag">${f.floor}</span><span class="floor-desc">${f.desc}</span>`;
        floorList.appendChild(item);
      });
    }
  } else {
    document.getElementById('floors-section').style.display = 'none';
  }

  // 無障礙設施
  const accessList = document.getElementById('access-list');
  accessList.innerHTML = '';
  if (data.accessibility && data.accessibility.length > 0) {
    document.getElementById('accessibility-section').style.display = 'block';
    data.accessibility.forEach(acc => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${acc}</span>`;
      accessList.appendChild(li);
    });
  } else {
    document.getElementById('accessibility-section').style.display = 'none';
  }

  panel.classList.add('open');
}

/**
 * 註冊使用者事件
 */
function setupEventListeners() {
  window.addEventListener('resize', onWindowResize);

  // 滑鼠懸停與點擊拾取
  const container = document.getElementById('webgl-container');
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerdown', onPointerDown);

  // 關閉右側面板
  document.getElementById('btn-close-detail').addEventListener('click', () => {
    document.getElementById('detail-panel').classList.remove('open');
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  });

  // 特寫目前建築
  document.getElementById('btn-focus-cam').addEventListener('click', () => {
    if (selectedBuilding) {
      focusOnBuilding(selectedBuilding.id);
    }
  });

  // 重置視角按鈕
  document.getElementById('btn-reset-cam').addEventListener('click', resetCamera);

  // 俯視全景按鈕
  document.getElementById('btn-top-view').addEventListener('click', () => {
    new TWEEN.Tween(camera.position)
      .to({ x: 10, y: 220, z: 10 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
    new TWEEN.Tween(controls.target)
      .to({ x: 10, y: 0, z: 0 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  });

  // 切換地標標籤按鈕
  const toggleBtn = document.getElementById('btn-toggle-labels');
  toggleBtn.addEventListener('click', () => {
    labelsVisible = !labelsVisible;
    toggleBtn.classList.toggle('active', labelsVisible);
    const container = document.getElementById('labels-container');
    container.style.display = labelsVisible ? 'block' : 'none';
  });

  // 呼叫祥祥立刻跑來功能
  const callDogBtn = document.getElementById('btn-call-dog');
  if (callDogBtn) {
    callDogBtn.addEventListener('click', callDogToUser);
  }

  // 切換白天與黑夜(夜燈)模式按鈕
  const dayNightBtn = document.getElementById('btn-toggle-daynight');
  if (dayNightBtn) {
    dayNightBtn.addEventListener('click', toggleDayNight);
  }

  // 自動巡覽按鈕
  document.getElementById('btn-tour').addEventListener('click', toggleTour);

  // 行動版導覽清單開關按鈕
  const mobileNavBtn = document.getElementById('btn-toggle-nav');
  const campusNav = document.getElementById('campus-nav');
  if (mobileNavBtn && campusNav) {
    mobileNavBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      campusNav.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (campusNav.classList.contains('open') && !campusNav.contains(e.target) && e.target !== mobileNavBtn) {
        campusNav.classList.remove('open');
      }
    });
  }

  // 底部操作說明縮小/展開按鈕（避免遮擋平林溪與道路視線）
  const toggleHintBtn = document.getElementById('btn-toggle-hint');
  const interactionHint = document.getElementById('interaction-hint');
  if (toggleHintBtn && interactionHint) {
    const toggleHint = (e) => {
      e.stopPropagation();
      const isMin = interactionHint.classList.toggle('minimized');
      if (isMin) {
        toggleHintBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
        toggleHintBtn.title = '展開操作說明';
      } else {
        toggleHintBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
        toggleHintBtn.title = '縮小操作說明';
      }
    };
    toggleHintBtn.addEventListener('click', toggleHint);

    // 縮小狀態下，點擊膠囊本身即可一鍵展開
    interactionHint.addEventListener('click', (e) => {
      if (interactionHint.classList.contains('minimized')) {
        toggleHint(e);
      }
    });
  }
}

/**
 * 設定吉祥物任意拖曳（使用者指示：頭上不帶對話框，純本體自由拖曳）
 */
function setupMascotDrag() {
  const mascot = document.getElementById('mascot-widget');
  if (!mascot) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  const onStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    isDragging = true;
    startX = clientX;
    startY = clientY;

    const rect = mascot.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    mascot.style.bottom = 'auto';
    mascot.style.right = 'auto';
    mascot.style.left = `${initialLeft}px`;
    mascot.style.top = `${initialTop}px`;
    mascot.style.transition = 'none';

    document.addEventListener('mousemove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    if (Math.hypot(deltaX, deltaY) > 5) {
      if (e.cancelable) e.preventDefault();
    }

    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;

    const mascotWidth = mascot.offsetWidth;
    const mascotHeight = mascot.offsetHeight;
    const maxLeft = window.innerWidth - mascotWidth;
    const maxTop = window.innerHeight - mascotHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    mascot.style.left = `${newLeft}px`;
    mascot.style.top = `${newTop}px`;
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    mascot.style.transition = 'transform 0.15s ease-out';

    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);
  };

  mascot.addEventListener('mousedown', onStart);
  mascot.addEventListener('touchstart', onStart, { passive: true });
}

/**
 * 設定左側「校園景點導覽」黑浮動視窗互動功能（支援自由拖曳移動、折疊縮小/放大還原、右下角手動縮放大小）
 */
function setupNavWindowInteractions() {
  const campusNav = document.getElementById('campus-nav');
  const dragHandle = document.getElementById('nav-drag-handle');
  const btnMinimize = document.getElementById('btn-minimize-nav');
  if (!campusNav || !dragHandle) return;

  // 1. 浮動視窗自由拖曳移動功能
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  const onDragStart = (e) => {
    // 若點擊的是控制按鈕，不觸發拖曳
    if (e.target.closest('.nav-ctrl-btn') || e.target.closest('button')) {
      return;
    }
    e.stopPropagation();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    isDragging = true;
    startX = clientX;
    startY = clientY;

    const rect = campusNav.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    campusNav.style.bottom = 'auto';
    campusNav.style.right = 'auto';
    campusNav.style.left = `${initialLeft}px`;
    campusNav.style.top = `${initialTop}px`;
    campusNav.classList.add('is-dragging');

    document.addEventListener('mousemove', onDragMove, { passive: false });
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    if (e.cancelable && (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)) {
      e.preventDefault();
    }

    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;

    const navW = campusNav.offsetWidth;
    const navH = campusNav.offsetHeight;
    const maxLeft = Math.max(0, window.innerWidth - navW - 10);
    const maxTop = Math.max(0, window.innerHeight - 45);

    newLeft = Math.max(8, Math.min(newLeft, maxLeft));
    newTop = Math.max(50, Math.min(newTop, maxTop));

    campusNav.style.left = `${newLeft}px`;
    campusNav.style.top = `${newTop}px`;
  };

  const onDragEnd = (e) => {
    if (!isDragging) return;
    if (e) e.stopPropagation();
    isDragging = false;
    campusNav.classList.remove('is-dragging');

    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);
  };

  dragHandle.addEventListener('mousedown', onDragStart);
  dragHandle.addEventListener('touchstart', onDragStart, { passive: false });

  // 避免導覽清單本體內部點擊、選取或滾動事件穿透到地圖 controls
  campusNav.addEventListener('mousedown', (e) => e.stopPropagation());
  campusNav.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
  campusNav.addEventListener('wheel', (e) => e.stopPropagation(), { passive: false });

  // 2. 折疊縮小 / 放大還原功能
  if (btnMinimize) {
    btnMinimize.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMinimized = campusNav.classList.toggle('minimized');
      if (isMinimized) {
        btnMinimize.innerHTML = '<i class="fa-solid fa-expand"></i>';
        btnMinimize.title = '放大展開視窗';
      } else {
        btnMinimize.innerHTML = '<i class="fa-solid fa-minus"></i>';
        btnMinimize.title = '縮小折疊視窗';
      }
    });
  }

  // 雙擊標題列亦可快速縮小或還原展開
  dragHandle.addEventListener('dblclick', (e) => {
    if (e.target.closest('.nav-ctrl-btn')) return;
    if (btnMinimize) btnMinimize.click();
  });
}

/**
 * 重置相機至預設等角透視鳥瞰位置
 */
function resetCamera() {
  new TWEEN.Tween(camera.position)
    .to({ x: -40, y: 145, z: 175 }, 1200)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();
  new TWEEN.Tween(controls.target)
    .to({ x: 0, y: 0, z: 8 }, 1200)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();
}

/**
 * 滑鼠指標移動檢測
 */
function onPointerMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  let found = null;
  for (let i = 0; i < intersects.length; i++) {
    const obj = intersects[i].object;
    if (obj.userData && obj.userData.buildingId) {
      found = obj.userData.buildingId;
      break;
    }
  }

  if (found) {
    document.body.style.cursor = 'pointer';
  } else {
    document.body.style.cursor = 'default';
  }
}

/**
 * 滑鼠點擊拾取
 */
let pointerDownPos = { x: 0, y: 0 };
function onPointerDown(event) {
  pointerDownPos = { x: event.clientX, y: event.clientY };
  
  const handlePointerUp = (upEvent) => {
    window.removeEventListener('pointerup', handlePointerUp);
    // 檢查是否為拖曳旋轉而非純點擊
    const dist = Math.hypot(upEvent.clientX - pointerDownPos.x, upEvent.clientY - pointerDownPos.y);
    if (dist > 5) return;

    mouse.x = (upEvent.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(upEvent.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
      const obj = intersects[i].object;
      if (obj.userData && obj.userData.isRoom) {
        focusOnRoom(obj.userData.buildingId, obj.userData.floorIndex, obj.userData.roomIndex, obj.userData.roomData);
        break;
      }
      if (obj.userData && obj.userData.isRoomLabel) {
        focusOnRoom(obj.userData.buildingId, obj.userData.floorIndex, obj.userData.roomIndex, obj.userData.roomData);
        break;
      }
      if (obj.userData && obj.userData.buildingId) {
        focusOnBuilding(obj.userData.buildingId);
        break;
      }
    }
  };

  window.addEventListener('pointerup', handlePointerUp);
}

/**
 * 自動巡覽導覽模式
 */
function toggleTour() {
  const btn = document.getElementById('btn-tour');
  if (isTourRunning) {
    isTourRunning = false;
    clearTimeout(tourTimeout);
    btn.innerHTML = `<i class="fa-solid fa-route"></i>`;
    btn.title = '自動巡覽';
    btn.classList.remove('active');
    return;
  }

  isTourRunning = true;
  btn.classList.add('active');
  btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  btn.title = '暫停巡覽';

  const tourSequence = [
    'gate', 'dazhi', 'dayong', 'plaza_garden', 'complex',
    'teaching', 'track', 'shrine', 'wind_shelter', 'west_services',
    'sports_stage_court', 'fish_platform', 'activity', 'job_dorm',
    'male_dorm', 'pizza_oven', 'female_dorm', 'dining_kitchen',
    'bbq_area', 'wetland', 'paintball', 'river', 'dog_xiangxiang'
  ];
  let step = 0;

  function nextStep() {
    if (!isTourRunning) return;
    const currentId = tourSequence[step];
    focusOnBuilding(currentId);
    // 依序輪播，到最後一個景點後自動接回第一個，永不停歇持續輪播！
    step = (step + 1) % tourSequence.length;
    tourTimeout = setTimeout(nextStep, 5000); // 精確每 5 秒切換
  }

  nextStep();
}

/**
 * 視窗尺寸調整
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

/**
 * 建立雙溪高中守護校狗「祥祥」3D 模型
 * 依據使用者上傳真實照片（黑白斑紋、立耳、淺米項圈、招牌白尾尖）精準建構
 */
function createCampusDog() {
  dogGroup = new THREE.Group();
  dogGroup.position.set(-45, 0, 14); // 初始位置：大智樓與中庭走道
  dogGroup.scale.set(1.15, 1.15, 1.15); // 自然身形大小（肩高約 0.65m）

  // 材質庫
  const blackFur = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.72 }); // 炭黑短毛
  const whiteFur = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.75 }); // 雪白胸腹毛
  const collarMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.85 }); // 米白/灰項圈
  const bellMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 }); // 金色金屬吊牌
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.2, metalness: 0.1 }); // 濕潤黑鼻
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x09090b }); // 黑眼球
  const eyeHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff }); // 眼神高光

  // 1. 軀幹身軀（Body）：前胸白毛、背部大塊黑背鞍斑
  const bodyGroup = new THREE.Group();
  
  // (1) 白胸腹軀幹基底（前粗後細的健美身形）
  const bodyWhite = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.75, 12), whiteFur);
  bodyWhite.rotation.x = Math.PI / 2;
  bodyWhite.position.set(0, 0.48, 0);
  bodyGroup.add(bodyWhite);

  // (2) 背部鞍形黑色大斑塊（照片中的主要黑背毛特徵）
  const saddleBlack = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.205, 0.48, 12, 1, false, 0, Math.PI), blackFur);
  saddleBlack.rotation.x = Math.PI / 2;
  saddleBlack.rotation.y = Math.PI; // 覆蓋於背部上方
  saddleBlack.position.set(0, 0.48, -0.05);
  bodyGroup.add(saddleBlack);

  // (3) 帥氣米白色項圈（帶金屬吊牌，照片亮點）
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 14), collarMat);
  collar.rotation.x = Math.PI / 4;
  collar.position.set(0, 0.62, 0.35);
  const tag = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.015, 8), bellMat);
  tag.position.set(0, 0.55, 0.45);
  bodyGroup.add(collar, tag);

  dogGroup.add(bodyGroup);

  // 2. 頭頸部（Head & Neck）：敏銳大立耳、黑吻部、白下巴
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.62, 0.35);

  // 頸部
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.28, 10), whiteFur);
  neck.rotation.x = -Math.PI / 6;
  neck.position.set(0, 0.1, 0.05);
  headGroup.add(neck);

  // 頭部主輪廓（黑色）
  const headMain = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), blackFur);
  headMain.position.set(0, 0.22, 0.14);
  headGroup.add(headMain);

  // 突出的吻部（黑色口鼻部）
  const muzzle = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.26, 10), blackFur);
  muzzle.rotation.x = Math.PI / 2;
  muzzle.position.set(0, 0.18, 0.28);
  headGroup.add(muzzle);

  // 濕潤黑鼻頭
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), noseMat);
  nose.position.set(0, 0.22, 0.4);
  headGroup.add(nose);

  // 雙眼（帶高光，忠誠機靈的眼神）
  [-0.08, 0.08].forEach(ex => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), eyeMat);
    eye.position.set(ex, 0.25, 0.22);
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 6), eyeHighlightMat);
    hl.position.set(ex + 0.008, 0.26, 0.24);
    headGroup.add(eye, hl);
  });

  // ★ 招牌黑色大立耳（高高聳立、警戒敏捷，如照片所示！）★
  [-1, 1].forEach(side => {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.24, 8), blackFur);
    ear.rotation.z = side * 0.28;
    ear.rotation.x = -0.2;
    ear.position.set(side * 0.12, 0.4, 0.1);
    ear.scale.set(0.65, 1, 1);
    headGroup.add(ear);
  });

  dogGroup.add(headGroup);

  // 3. ★ 招牌尾巴（昂揚上翹長尾，黑底帶雪白尾尖！）★
  const tailGroup = new THREE.Group();
  tailGroup.position.set(0, 0.54, -0.36);

  // 尾巴基部與中段（黑色，向上向後微弧形彎曲）
  const tailBase = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.045, 0.26, 8), blackFur);
  tailBase.rotation.x = -Math.PI / 3;
  tailBase.position.set(0, 0.11, -0.09);
  
  const tailMid = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.038, 0.22, 8), blackFur);
  tailMid.rotation.x = -Math.PI / 5;
  tailMid.position.set(0, 0.27, -0.18);

  // ★ 尾巴尖端：雪白色毛絨尾尖（祥祥獨特祥瑞象徵！）★
  const tailWhiteTip = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.14, 8), whiteFur);
  tailWhiteTip.rotation.x = -Math.PI / 7;
  tailWhiteTip.position.set(0, 0.42, -0.24);

  tailGroup.add(tailBase, tailMid, tailWhiteTip);
  dogGroup.add(tailGroup);

  // 4. 四肢（修長靈巧，分立可擺動關節）
  const legFL = new THREE.Group();
  const legFR = new THREE.Group();
  const legBL = new THREE.Group();
  const legBR = new THREE.Group();

  // 前肢幾何（白毛帶斑）
  const makeFrontLeg = () => {
    const grp = new THREE.Group();
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.45, 8), whiteFur);
    upper.position.y = -0.22;
    const paw = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.04, 0.09), blackFur);
    paw.position.set(0, -0.44, 0.02);
    grp.add(upper, paw);
    return grp;
  };

  // 後肢幾何（帶大腿肌肉曲線）
  const makeBackLeg = () => {
    const grp = new THREE.Group();
    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.045, 0.26, 8), blackFur);
    thigh.rotation.x = 0.25;
    thigh.position.set(0, -0.12, 0);
    const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.24, 8), whiteFur);
    calf.position.set(0, -0.32, 0.02);
    const paw = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.04, 0.09), blackFur);
    paw.position.set(0, -0.44, 0.02);
    grp.add(thigh, calf, paw);
    return grp;
  };

  const lfl = makeFrontLeg(); legFL.add(lfl); legFL.position.set(-0.13, 0.45, 0.26);
  const lfr = makeFrontLeg(); legFR.add(lfr); legFR.position.set(0.13, 0.45, 0.26);
  const lbl = makeBackLeg(); legBL.add(lbl); legBL.position.set(-0.14, 0.45, -0.26);
  const lbr = makeBackLeg(); legBR.add(lbr); legBR.position.set(0.14, 0.45, -0.26);

  dogGroup.add(legFL, legFR, legBL, legBR);

  // 註冊互動拾取標記
  dogGroup.traverse(child => {
    if (child.isMesh) {
      child.userData = { buildingId: 'dog_xiangxiang' };
      child.castShadow = true;
    }
  });

  scene.add(dogGroup);
  buildingObjects.set('dog_xiangxiang', dogGroup);

  // 初始化祥祥漫步巡視 AI
  dogAnimator = {
    dogGroup: dogGroup,
    headGroup: headGroup,
    tailGroup: tailGroup,
    legFL: legFL,
    legFR: legFR,
    legBL: legBL,
    legBR: legBR,
    // 校園漫步巡邏航點列表（在校園四處自由走動）
    waypoints: [
      { x: -95, z: 33.5, name: '校門口大道' },
      { x: -70, z: 33.5, name: '大智樓前雙車道' },
      { x: -44, z: 39.5, name: '觀魚平臺木棧道' },
      { x: -45, z: 16, name: '中庭廣場草坪' },
      { x: -65, z: 12, name: '中庭涼亭水池' },
      { x: -27, z: 8, name: '教學大樓步道' },
      { x: 0, z: 10, name: '操場南側走道' },
      { x: 25, z: 15, name: '風雨操場前' },
      { x: 46, z: 24, name: '山羌泥土披薩窯前' },
      { x: 50, z: 8, name: '活動中心前大道' },
      { x: 15, z: 33.5, name: '雙向雙車道' },
      { x: 0, z: 39.5, name: '沿溪親水木棧道' }
    ],
    currentIndex: 0,
    state: 'WALKING',
    pauseTimeLeft: 0,
    walkPhase: 0,
    speed: 3.6 // 米 / 秒
  };
}

/**
 * 呼叫校狗「祥祥」立刻飛奔至使用者當前鏡頭視角前
 */
function callDogToUser() {
  if (!dogAnimator || !dogGroup) return;

  const anim = dogAnimator;
  const btn = document.getElementById('btn-call-dog');
  const statusTag = document.getElementById('dog-status-tag');

  // 目標點取自使用者當前視角觀察焦點 (controls.target)
  const targetX = controls.target.x;
  const targetZ = controls.target.z;

  anim.targetPos = { x: targetX, z: targetZ };
  anim.state = 'RUNNING_TO_USER';
  anim.speed = 7.5; // 奔跑速度提升至 7.5 米 / 秒

  if (btn) {
    btn.classList.add('running');
    btn.innerHTML = `<i class="fa-solid fa-paw fa-bounce"></i>`;
    btn.title = '祥祥飛奔中...';
  }
  if (statusTag) {
    statusTag.textContent = '飛奔中';
  }
}

/**
 * 每一幀更新校狗「祥祥」行走動畫、尾巴搖動與校園自由巡邏位移
 */
function updateCampusDog(delta) {
  if (!dogAnimator || !dogGroup) return;

  const anim = dogAnimator;
  const btn = document.getElementById('btn-call-dog');
  const statusTag = document.getElementById('dog-status-tag');

  if (anim.state === 'PAUSING') {
    anim.pauseTimeLeft -= delta;

    // 停留時：四肢立正，尾巴慢悠悠輕搖，頭部四處張望巡視嗅聞
    anim.legFL.rotation.x = 0;
    anim.legFR.rotation.x = 0;
    anim.legBL.rotation.x = 0;
    anim.legBR.rotation.x = 0;

    const lookTime = (anim.pauseTimeLeft || 0) * 2;
    anim.headGroup.rotation.y = Math.sin(lookTime) * 0.35;
    anim.headGroup.rotation.x = Math.sin(lookTime * 1.5) * 0.15;
    anim.tailGroup.rotation.y = Math.sin(lookTime * 3) * 0.28;

    if (anim.pauseTimeLeft <= 0) {
      anim.state = 'WALKING';
      anim.currentIndex = (anim.currentIndex + 1) % anim.waypoints.length;
      anim.headGroup.rotation.set(0, 0, 0);
      if (statusTag) statusTag.textContent = '巡邏中';
    }
  } else if (anim.state === 'WALKING') {
    const currentWp = anim.waypoints[anim.currentIndex];
    const dx = currentWp.x - dogGroup.position.x;
    const dz = currentWp.z - dogGroup.position.z;
    const dist = Math.hypot(dx, dz);

    if (dist < 1.0) {
      // 到達巡邏航點，駐足停留 2.5 ~ 4.0 秒
      anim.state = 'PAUSING';
      anim.pauseTimeLeft = 2.8 + Math.random() * 1.2;
    } else {
      // 走向航點
      const targetAngle = Math.atan2(dx, dz);
      let diff = targetAngle - dogGroup.rotation.y;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      dogGroup.rotation.y += diff * Math.min(1, delta * 6.0);

      const moveStep = Math.min(dist, anim.speed * delta);
      dogGroup.position.x += (dx / dist) * moveStep;
      dogGroup.position.z += (dz / dist) * moveStep;

      // 四肢交替邁步動畫（對角步態）
      anim.walkPhase += delta * 11;
      const legAngle = Math.sin(anim.walkPhase) * 0.42;
      anim.legFL.rotation.x = legAngle;
      anim.legFR.rotation.x = -legAngle;
      anim.legBL.rotation.x = -legAngle;
      anim.legBR.rotation.x = legAngle;

      // 行走時尾巴歡快擺動，招牌白尾尖搖曳！
      anim.tailGroup.rotation.y = Math.sin(anim.walkPhase * 1.6) * 0.36;
      anim.tailGroup.rotation.z = Math.sin(anim.walkPhase * 0.8) * 0.08;
    }
  } else if (anim.state === 'RUNNING_TO_USER') {
    // 呼叫祥祥狀態：以高頻步伐與 7.5 m/s 高速直奔使用者當前視角焦點
    const target = anim.targetPos || { x: controls.target.x, z: controls.target.z };
    const dx = target.x - dogGroup.position.x;
    const dz = target.z - dogGroup.position.z;
    const dist = Math.hypot(dx, dz);

    if (dist < 2.5) {
      // 祥祥抵達使用者身邊！切換為熱情陪伴與歡快搖尾狀態
      anim.state = 'GREETING';
      anim.greetTimeLeft = 8.0;
      anim.speed = 3.6;

      if (btn) {
        btn.classList.remove('running');
        btn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        btn.title = '祥祥在身邊！';
        setTimeout(() => {
          btn.innerHTML = `<i class="fa-solid fa-paw"></i>`;
          btn.title = '呼叫祥祥';
        }, 3500);
      }
      if (statusTag) {
        statusTag.textContent = '陪伴中';
      }
    } else {
      // 面向目標並飛奔前進
      const targetAngle = Math.atan2(dx, dz);
      let diff = targetAngle - dogGroup.rotation.y;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      dogGroup.rotation.y += diff * Math.min(1, delta * 8.0);

      const moveStep = Math.min(dist, anim.speed * delta);
      dogGroup.position.x += (dx / dist) * moveStep;
      dogGroup.position.z += (dz / dist) * moveStep;

      // 飛奔時高頻邁步動畫（跨步幅度加大）
      anim.walkPhase += delta * 20;
      const legAngle = Math.sin(anim.walkPhase) * 0.65;
      anim.legFL.rotation.x = legAngle;
      anim.legFR.rotation.x = -legAngle;
      anim.legBL.rotation.x = -legAngle;
      anim.legBR.rotation.x = legAngle;

      // 奔跑時尾巴高頻歡快搖擺
      anim.tailGroup.rotation.y = Math.sin(anim.walkPhase * 2.0) * 0.45;
      anim.tailGroup.rotation.z = Math.sin(anim.walkPhase * 1.0) * 0.15;
    }
  } else if (anim.state === 'GREETING') {
    anim.greetTimeLeft -= delta;

    // 陪伴問候時：四肢站定、頭部可愛歪頭、白尾尖興奮狂搖
    anim.legFL.rotation.x = 0;
    anim.legFR.rotation.x = 0;
    anim.legBL.rotation.x = 0;
    anim.legBR.rotation.x = 0;

    const gTime = (8.0 - (anim.greetTimeLeft || 0)) * 5;
    anim.headGroup.rotation.y = Math.sin(gTime * 0.8) * 0.25;
    anim.headGroup.rotation.z = Math.sin(gTime * 0.5) * 0.15; // 俏皮歪頭
    anim.tailGroup.rotation.y = Math.sin(gTime * 3.6) * 0.5; // 熱情搖尾巴

    if (anim.greetTimeLeft <= 0) {
      // 陪伴結束，恢復校園自由漫步巡邏
      anim.state = 'WALKING';
      anim.headGroup.rotation.set(0, 0, 0);
      if (statusTag) {
        statusTag.textContent = '巡邏中';
      }
    }
  }

  // 同步更新 CAMPUS_DATA 中的祥祥即時座標（讓螢幕地標標籤即時跟隨祥祥移動）
  const xiangData = CAMPUS_DATA.find(d => d.id === 'dog_xiangxiang');
  if (xiangData) {
    xiangData.position.x = dogGroup.position.x;
    xiangData.position.y = dogGroup.position.y;
    xiangData.position.z = dogGroup.position.z;
  }
}

/**
 * ★ 依使用者指示：平林溪水中增加大量悠游游動的錦鯉與原生溪魚群 ★
 * 包含經典大紅錦鯉、亮橙錦鯉、黃金錦鯉、紅白斑紋錦鯉與原生苦花魚
 * 具備逼真的流線身軀、透明魚鰭與自主左右擺尾動態巡游動畫
 */
function buildPinglinRiverCarp() {
  const carpGroup = new THREE.Group();

  // 錦鯉專用精緻材質
  const carpMats = {
    red: new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35, metalness: 0.25 }), // 鮮豔大紅錦鯉
    orange: new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.35, metalness: 0.25 }), // 亮橙金錦鯉
    gold: new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.25, metalness: 0.65 }), // 閃亮黃金錦鯉
    white: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }), // 珍珠雪白底
    fin: new THREE.MeshStandardMaterial({ color: 0xfecdd3, transparent: true, opacity: 0.75, roughness: 0.2 }), // 水波輕透半透明魚鰭
    native: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4, metalness: 0.45 }) // 臺灣原生苦花魚
  };

  // 輔助函式：建立單隻鯉魚模型
  const createCarp = (colorType = 'red', scale = 1.0) => {
    const fishObj = new THREE.Group();
    const mat = carpMats[colorType] || carpMats.red;

    // 1. 魚頭與前胸（圓錐流線型，頭部指向前方 +Z 軸）
    const headGeo = new THREE.ConeGeometry(0.18, 0.46, 8);
    const headMesh = new THREE.Mesh(headGeo, mat);
    headMesh.rotation.x = Math.PI / 2;
    headMesh.position.set(0, 0, 0.18);
    fishObj.add(headMesh);

    // 2. 魚腹與中後身（圓柱向後漸縮）
    const bodyGeo = new THREE.CylinderGeometry(0.18, 0.08, 0.52, 8);
    const bodyMesh = new THREE.Mesh(bodyGeo, mat);
    bodyMesh.rotation.x = Math.PI / 2;
    bodyMesh.position.set(0, 0, -0.24);
    fishObj.add(bodyMesh);

    // 3. 紅白斑紋特色斑塊（若為紅白錦鯉，在背部裝飾鮮紅浮島斑塊）
    if (colorType === 'whiteRed') {
      const spot1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), carpMats.red);
      spot1.position.set(0, 0.09, 0.08);
      spot1.scale.set(1.1, 0.35, 1.4);
      const spot2 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), carpMats.red);
      spot2.position.set(0, 0.08, -0.22);
      spot2.scale.set(1.0, 0.35, 1.2);
      fishObj.add(spot1, spot2);
    }

    // 4. 魚背鰭（立於魚背上方）
    const finTopGeo = new THREE.BoxGeometry(0.02, 0.14, 0.28);
    const finTop = new THREE.Mesh(finTopGeo, carpMats.fin);
    finTop.position.set(0, 0.16, -0.1);
    fishObj.add(finTop);

    // 5. 左右舒展之胸鰭
    [-1, 1].forEach(side => {
      const pecFin = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.13), carpMats.fin);
      pecFin.position.set(side * 0.19, -0.04, 0.12);
      pecFin.rotation.z = side * 0.36;
      pecFin.rotation.y = side * 0.32;
      fishObj.add(pecFin);
    });

    // 6. 尾柄與尾鰭（獨立子群組，旋轉中心設於 -0.50，可動態左右大幅擺動）
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0, -0.50);

    const tailFinGeo = new THREE.BoxGeometry(0.02, 0.28, 0.34);
    const tailFin = new THREE.Mesh(tailFinGeo, carpMats.fin);
    tailFin.position.set(0, 0, -0.17);
    tailGroup.add(tailFin);

    fishObj.add(tailGroup);
    fishObj.scale.set(scale, scale, scale);

    return { root: fishObj, tail: tailGroup };
  };

  // 水域三大群落配置（共 38 隻錦鯉生態群）
  const zones = [
    // 1. 觀魚平臺前方核心活躍錦鯉群（觀魚平臺在 X: -35 ~ 0，親水最集中處，熱鬧盤旋！）
    { count: 16, minX: -45, maxX: -8, minZ: 53.5, maxZ: 57.5, speedMult: 1.15 },
    // 2. 平林溪大橋下方及兩側水域（大橋在 X: -106，穿過大橋橋跨悠游自在）
    { count: 13, minX: -130, maxX: -82, minZ: 53.8, maxZ: 58.2, speedMult: 0.95 },
    // 3. 操場與東南人工溼地南側溪段（原生態深潭溪魚群）
    { count: 9, minX: -6, maxX: 75, minZ: 54.0, maxZ: 58.8, speedMult: 1.05 }
  ];

  const colorPool = ['red', 'orange', 'gold', 'whiteRed', 'orange', 'native', 'red'];

  zones.forEach((zone, zIdx) => {
    for (let i = 0; i < zone.count; i++) {
      const colorType = colorPool[(i + zIdx * 3) % colorPool.length];
      const scale = 0.85 + Math.random() * 0.45; // 0.85m ~ 1.30m
      const { root, tail } = createCarp(colorType, scale);

      // 隨機初始位置（微浮於水面 Y: -0.03 下方之 Y: -0.07 ~ -0.11，清澈可辨）
      const px = zone.minX + Math.random() * (zone.maxX - zone.minX);
      const pz = zone.minZ + Math.random() * (zone.maxZ - zone.minZ);
      const py = -0.07 - Math.random() * 0.04;

      root.position.set(px, py, pz);
      const initAngle = Math.random() * Math.PI * 2;
      root.rotation.y = initAngle;
      carpGroup.add(root);

      riverFishList.push({
        group: root,
        tail: tail,
        speed: (0.95 + Math.random() * 0.85) * zone.speedMult,
        tailFreq: 5.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        zone: zone,
        target: new THREE.Vector3(
          zone.minX + Math.random() * (zone.maxX - zone.minX),
          py,
          zone.minZ + Math.random() * (zone.maxZ - zone.minZ)
        ),
        targetWait: Math.random() * 2.0
      });
    }
  });

  scene.add(carpGroup);
}

/**
 * 錦鯉游動動畫循環：自然擺尾、魚身隨波擺動、全域平滑巡游
 */
let fishAnimTime = 0;
function updateRiverFish(delta) {
  if (!riverFishList.length) return;
  fishAnimTime += delta;

  riverFishList.forEach(fish => {
    const { group, tail, zone } = fish;

    // 1. 檢視是否抵達當前目標點，若是則選取新目標
    const dx = fish.target.x - group.position.x;
    const dz = fish.target.z - group.position.z;
    const distSq = dx * dx + dz * dz;

    if (distSq < 1.2) {
      fish.targetWait -= delta;
      if (fish.targetWait <= 0) {
        fish.target.x = zone.minX + Math.random() * (zone.maxX - zone.minX);
        fish.target.z = zone.minZ + Math.random() * (zone.maxZ - zone.minZ);
        fish.targetWait = 1.0 + Math.random() * 2.5;
      }
    }

    // 2. 朝向目標點平滑轉向（+Z 為前方朝向）
    const targetAngle = Math.atan2(dx, dz);
    let diff = targetAngle - group.rotation.y;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    group.rotation.y += diff * Math.min(delta * 2.6, 1.0);

    // 3. 沿著前方游動前進
    const moveDist = fish.speed * delta;
    group.position.x += Math.sin(group.rotation.y) * moveDist;
    group.position.z += Math.cos(group.rotation.y) * moveDist;

    // 4. 水域邊界保護（若游出邊界則自然回彈約束）
    if (group.position.x < zone.minX) group.position.x = zone.minX;
    if (group.position.x > zone.maxX) group.position.x = zone.maxX;
    if (group.position.z < zone.minZ) group.position.z = zone.minZ;
    if (group.position.z > zone.maxZ) group.position.z = zone.maxZ;

    // 5. 魚尾生動擺動與魚身微幅律動
    tail.rotation.y = Math.sin(fishAnimTime * fish.tailFreq + fish.phase) * 0.45;
    group.rotation.z = Math.sin(fishAnimTime * (fish.tailFreq * 0.5) + fish.phase) * 0.06;
  });
}

/**
 * 核心渲染與物理循環
 */
function animate(time) {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  TWEEN.update();
  controls.update();
  updateCampusDog(delta);
  updateRiverFish(delta);
  updateScreenLabels();
  updateRoomHighlightAnim(time);
  renderer.render(scene, camera);
}

// 啟動程式
window.addEventListener('DOMContentLoaded', init);



// ============================================================================
// ★ 室內空間 3D 可視化、樓層透視系統 (X-Ray)、2D 平面格局圖與教室智慧搜尋 ★
// 依據「雙溪高中校舍平面圖」標準配置深度開發
// ============================================================================

let indoorGroups = new Map(); // 建築 ID -> THREE.Group (包含室內樓板、隔間與標籤)
let isIndoorXRay = false;
let activeXRayBuilding = null;
let currentFloorFilter = 'all';
let indoorRoomSprites = [];
let allCampusRooms = []; // 全校所有教室與處室平坦清單供搜尋使用
let currentHighlightedRoom = null; // 當前單獨高亮的房間資訊
let roomHighlightBeacon = null;    // 3D 浮動發光指標與地面雷達光環

/**
 * 依房間類型取得顏色主題與圖示
 */
function getRoomTypeMeta(type) {
  switch (type) {
    case 'office':
      return { color: '#f59e0b', hex: 0xf59e0b, icon: 'fa-briefcase', label: '行政處室' };
    case 'classroom':
      return { color: '#0ea5e9', hex: 0x0ea5e9, icon: 'fa-chalkboard-user', label: '普通教室' };
    case 'lab':
      return { color: '#10b981', hex: 0x10b981, icon: 'fa-flask', label: '實驗/專科' };
    case 'special':
      return { color: '#8b5cf6', hex: 0x8b5cf6, icon: 'fa-palette', label: '特色/研討' };
    case 'hall':
      return { color: '#ec4899', hex: 0xec4899, icon: 'fa-masks-theater', label: '大型展演' };
    case 'accessible':
      return { color: '#06b6d4', hex: 0x06b6d4, icon: 'fa-wheelchair', label: '無障礙設施' };
    case 'restroom':
      return { color: '#64748b', hex: 0x64748b, icon: 'fa-restroom', label: '化妝室' };
    case 'corridor':
      return { color: '#475569', hex: 0x475569, icon: 'fa-arrows-left-right', label: '走廊通道' };
    case 'service':
    default:
      return { color: '#71717a', hex: 0x71717a, icon: 'fa-door-closed', label: '設備設施' };
  }
}

/**
 * 動態建立高清晰度 Canvas 3D Sprite 浮空教室銘牌
 */
function createRoomSpriteLabel(roomName, roomType) {
  const meta = getRoomTypeMeta(roomType);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  // 背景半透明圓角玻璃卡片
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.strokeStyle = meta.color;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(16, 16, 480, 128, 24);
  ctx.fill();
  ctx.stroke();

  // 頂部彩色發光指示線
  ctx.fillStyle = meta.color;
  ctx.beginPath();
  ctx.roundRect(40, 22, 432, 12, 6);
  ctx.fill();

  // 教室/處室名稱文字
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Noto Sans TC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 縮短過長字元
  let displayTitle = roomName;
  if (displayTitle.length > 10) {
    displayTitle = displayTitle.substring(0, 9) + '…';
  }
  ctx.fillText(displayTitle, 256, 78);

  // 空間分類標籤徽章
  ctx.fillStyle = meta.color;
  ctx.font = '500 24px "Noto Sans TC", sans-serif';
  ctx.fillText(meta.label, 256, 116);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.95,
    depthTest: true,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(6.2, 1.9, 1);
  return sprite;
}

/**
 * 為四大主要建築與生活區建立實體 3D 室內樓板、走廊、教室隔間方塊與浮空標籤
 */
function buildIndoorRoomsForBuildings() {
  const indoorConfig = [
    {
      id: 'dazhi',
      w: 50, h: 9.6, d: 8.2,
      axis: 'x', // 教室沿 X 軸線性排列
      floorsCount: 3,
      baseY: 0
    },
    {
      id: 'dayong',
      w: 42, h: 9.6, d: 8.2,
      axis: 'x',
      floorsCount: 3,
      baseY: 0
    },
    {
      id: 'teaching',
      w: 8.4, h: 16.0, d: 29.0,
      axis: 'z', // 教室沿 Z 軸線性排列 (南北向)
      floorsCount: 5,
      baseY: 0
    },
    {
      id: 'complex',
      w: 32.0, h: 18.0, d: 14.6,
      centerX: 8.75, // 縮短 18 米後，西側棟與東側主館合體之中心 X 軸
      axis: 'x',
      floorsCount: 6,
      baseY: 0
    },
    {
      id: 'activity',
      w: 19.0, h: 13.5, d: 30.0,
      axis: 'z',
      floorsCount: 2,
      baseY: 0
    },
    {
      id: 'west_services',
      w: 9.6, h: 3.8, d: 19.0,
      axis: 'z',
      floorsCount: 1,
      baseY: 0
    },
    {
      id: 'male_dorm',
      w: 22.0, h: 16.0, d: 13.0,
      axis: 'x',
      floorsCount: 2,
      baseY: 0
    },
    {
      id: 'female_dorm',
      w: 21.0, h: 16.0, d: 13.5,
      axis: 'x',
      floorsCount: 2,
      baseY: 0
    }
  ];

  indoorConfig.forEach(cfg => {
    const bGroup = buildingObjects.get(cfg.id);
    const bData = CAMPUS_DATA.find(d => d.id === cfg.id);
    if (!bGroup || !bData || !bData.floors) return;

    const buildingIndoorGroup = new THREE.Group();
    buildingIndoorGroup.name = `indoor_${cfg.id}`;
    buildingIndoorGroup.visible = false; // 預設平常隱藏，透視模式時顯現

    const floorH = cfg.h / cfg.floorsCount;
    const cx = cfg.centerX || 0;
    const cz = cfg.centerZ || 0;

    bData.floors.forEach((fl, flIdx) => {
      const floorGroup = new THREE.Group();
      floorGroup.name = `floor_${cfg.id}_${flIdx}`;
      floorGroup.userData = { floorIndex: flIdx, floorLabel: fl.floor };

      const floorY = cfg.baseY + flIdx * floorH;

      // 1. 各樓層實體分隔樓板 (Floor Slab)
      const slabGeo = new THREE.BoxGeometry(cfg.w * 0.98, 0.16, cfg.d * 0.98);
      const slabMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.6,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.set(cx, floorY + 0.08, cz);
      floorGroup.add(slab);

      // 2. 室內走廊通道與各教室房間方塊
      const rooms = fl.rooms || [];
      const numRooms = rooms.length;
      if (numRooms > 0) {
        rooms.forEach((rm, rIdx) => {
          const meta = getRoomTypeMeta(rm.type);
          const roomMat = new THREE.MeshStandardMaterial({
            color: meta.hex,
            roughness: 0.5,
            metalness: 0.15,
            transparent: true,
            opacity: 0.55
          });

          let rw, rd, rx, rz;
          if (cfg.id === 'complex') {
            const stepX = (cfg.w * 0.94) / numRooms;
            rw = Math.max(stepX * 0.88, 2.2);
            rx = cx - cfg.w * 0.47 + stepX * (rIdx + 0.5);

            // 依據平面圖 media_1791539418645.png 精確判定南北隔間縱深 (Z 軸)
            const isNorthSide = /女生廁所|男生廁所|儲藏室 \(西側\)|圖書館儲藏室|圖書館行政辦公室|專任教師辦公室|主機房|中控室|國中電腦教室|空調機房|機電維護/.test(rm.name);
            const isSouthSide = /會議中心|群組教室|校長室|高中導師辦公室|環景科技教室|商科情境教室|高中電腦教室|無障礙電梯|教具室|油印室|儲藏室 \(東側\)/.test(rm.name);

            if (isNorthSide) {
              rd = cfg.d * 0.42;
              rz = cz - cfg.d * 0.22;
            } else if (isSouthSide) {
              rd = cfg.d * 0.42;
              rz = cz + cfg.d * 0.22;
            } else {
              rd = cfg.d * 0.78;
              rz = cz;
            }
          } else if (cfg.axis === 'x') {
            const stepX = (cfg.w * 0.92) / numRooms;
            rw = stepX * 0.86;
            rd = cfg.d * 0.72;
            rx = cx - cfg.w * 0.46 + stepX * (rIdx + 0.5);
            rz = cz;
          } else {
            const stepZ = (cfg.d * 0.92) / numRooms;
            rw = cfg.w * 0.72;
            rd = stepZ * 0.86;
            rx = cx;
            // ★ 使用者指示：教學大樓順序校正，rIdx 0 (學務處會議室/301) 位於南端 (+Z)，洗手間/電梯位於北端 (-Z，靠近綠博士廣場)
            rz = cz + (cfg.d * 0.46) - stepZ * (rIdx + 0.5);
          }

          const rh = floorH * 0.75;
          const ry = floorY + rh / 2 + 0.1;

          // 教室隔間實體方塊
          const roomBoxGeo = new THREE.BoxGeometry(rw, rh, rd);
          const roomMesh = new THREE.Mesh(roomBoxGeo, roomMat);
          roomMesh.position.set(rx, ry, rz);
          roomMesh.userData = {
            isRoom: true,
            buildingId: cfg.id,
            floorIndex: flIdx,
            roomIndex: rIdx,
            roomData: rm
          };
          floorGroup.add(roomMesh);

          // 教室內立體白色桌面教學設施造型
          const desk = new THREE.Mesh(
            new THREE.BoxGeometry(rw * 0.45, 0.4, rd * 0.45),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, transparent: true, opacity: 0.65 })
          );
          desk.position.set(rx, floorY + 0.3, rz);
          floorGroup.add(desk);

          // 3D 浮空教室銘牌 Sprite 標籤 (放在房間上方)
          const sprite = createRoomSpriteLabel(rm.name, rm.type);
          sprite.position.set(rx, ry + rh * 0.55 + 0.8, rz);
          sprite.userData = {
            isRoomLabel: true,
            buildingId: cfg.id,
            floorIndex: flIdx,
            roomIndex: rIdx,
            roomName: rm.name,
            roomData: rm
          };
          floorGroup.add(sprite);
          indoorRoomSprites.push(sprite);
        });
      }

      buildingIndoorGroup.add(floorGroup);
    });

    bGroup.add(buildingIndoorGroup);
    indoorGroups.set(cfg.id, buildingIndoorGroup);
  });
}

/**
 * 切換大樓室內透視視圖 (X-Ray Mode)
 */
function toggleIndoorXRay(enable, targetBuildingId = null) {
  isIndoorXRay = enable;
  const btnXray = document.getElementById('btn-indoor-xray');
  const btnPanelXray = document.getElementById('btn-panel-xray');

  if (btnXray) btnXray.classList.toggle('active', enable);
  if (btnPanelXray) btnPanelXray.classList.toggle('active', enable);

  const targetIds = targetBuildingId ? [targetBuildingId] : (indoorGroups.size > 0 ? Array.from(indoorGroups.keys()) : ['dazhi', 'dayong', 'teaching', 'complex', 'activity', 'west_services', 'male_dorm', 'female_dorm']);

  targetIds.forEach(bId => {
    const bGroup = buildingObjects.get(bId);
    const indoorGrp = indoorGroups.get(bId);
    if (!bGroup) return;

    if (indoorGrp) {
      indoorGrp.visible = enable;
    }

    // 遍歷大樓外部 Mesh，切換半透明磨砂玻璃與正常材質
    bGroup.traverse(child => {
      if (child.isMesh && !child.userData.isRoom && !child.parent?.name?.startsWith('floor_')) {
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material;
        }

        if (enable) {
          if (!child.userData.xrayMaterial) {
            child.userData.xrayMaterial = new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              roughness: 0.2,
              metalness: 0.3,
              transparent: true,
              opacity: 0.22,
              depthWrite: false
            });
          }
          child.material = child.userData.xrayMaterial;
        } else {
          child.material = child.userData.originalMaterial;
        }
      }
    });
  });

  activeXRayBuilding = enable ? targetBuildingId : null;
}

/**
 * 依樓層隔離顯示室內空間 (Floor Isolation Filter)
 */
function filterIndoorFloor(buildingId, floorIndex) {
  const indoorGrp = indoorGroups.get(buildingId);
  if (!indoorGrp) return;

  indoorGrp.children.forEach(flGroup => {
    const isTarget = (floorIndex === 'all') || (flGroup.userData.floorIndex === floorIndex);
    flGroup.visible = isTarget;
  });
}

/**
 * 繪製詳情側邊欄之「2D 樓層室內空間格局地圖」與「房間互動卡片」
 */
function renderFloorPlan(buildingData, floorIndex) {
  const container = document.getElementById('floor-plan-grid');
  const labelEl = document.getElementById('current-floor-label');
  const floorList = document.getElementById('floor-list');
  if (!container || !buildingData.floors || !buildingData.floors[floorIndex]) return;

  const currentFloor = buildingData.floors[floorIndex];
  if (labelEl) {
    labelEl.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${buildingData.shortName} - ${currentFloor.floor} 室內格局平面圖`;
  }

  container.innerHTML = '';
  floorList.innerHTML = '';

  const rooms = currentFloor.rooms || [];
  if (rooms.length === 0) {
    container.innerHTML = `<div class="corridor-bar">${currentFloor.desc}</div>`;
    return;
  }

  // 1. 室內走廊通道指示條（標記穿堂與方位）
  const topCorridor = document.createElement('div');
  topCorridor.className = 'corridor-bar';
  let corridorText = '<i class="fa-solid fa-arrows-left-right"></i> 文化走廊穿堂 (一樓完全挑空通透) / 採光通廊 <i class="fa-solid fa-arrows-left-right"></i>';
  if (buildingData.id === 'teaching') {
    corridorText = '<i class="fa-solid fa-arrow-down"></i> 【南端：第一停車場/操場】 ─── 文化走廊穿堂 (1F) ───> 【北端：綠博士廣場穿堂】 <i class="fa-solid fa-arrow-up"></i>';
  } else if (buildingData.id === 'dazhi' || buildingData.id === 'dayong') {
    corridorText = '<i class="fa-solid fa-arrows-left-right"></i> 【西翼教室群】 ─── 文化走廊穿堂 (1F挖空貫通) ─── 【東翼教室群】 <i class="fa-solid fa-arrows-left-right"></i>';
  } else if (buildingData.id === 'complex') {
    corridorText = '<i class="fa-solid fa-arrow-left"></i> 【西側：西側樓梯 / 男女洗手間 (靠近校門口側)】 ─── 中央通廊 ───> 【東側：教務處 / 綠博士廣場大穿堂 / 演藝廳 / 無障礙電梯 (靠近操場跑道)】 <i class="fa-solid fa-arrow-right"></i>';
  } else if (buildingData.id === 'activity') {
    corridorText = '<i class="fa-solid fa-arrows-left-right"></i> 【西側迎賓門廊 (操場側)】 ─── 綜合運動球場 / 大禮堂 ─── 【東側職務宿舍群】 <i class="fa-solid fa-arrows-left-right"></i>';
  } else if (buildingData.id === 'male_dorm') {
    corridorText = '<i class="fa-solid fa-arrows-left-right"></i> 【西側迎賓坡道 / K書中心】 ─── 宿舍生活通廊 ─── 【東側無障礙電梯塔】 <i class="fa-solid fa-arrows-left-right"></i>';
  } else if (buildingData.id === 'female_dorm') {
    corridorText = '<i class="fa-solid fa-arrows-left-right"></i> 【南側親水廣場 / 交誼大廳】 ─── 宿舍生活通廊 ─── 【北側中央廚房與餐廳】 <i class="fa-solid fa-arrows-left-right"></i>';
  } else if (buildingData.id === 'west_services') {
    corridorText = '<i class="fa-solid fa-arrows-left-right"></i> 【北側體育器材室】 ─── 韻律舞蹈教室 ─── 【南側合作社出入口】 <i class="fa-solid fa-arrows-left-right"></i>';
  } else if (buildingData.id === 'dining_kitchen') {
    corridorText = '<i class="fa-solid fa-arrows-left-right"></i> 【學生大餐廳】 ─── 中央供餐保溫動線 ─── 【中央廚房與食農教育園區】 <i class="fa-solid fa-arrows-left-right"></i>';
  }
  topCorridor.innerHTML = corridorText;
  container.appendChild(topCorridor);

  // 2. 房間網格排布
  const roomsRow = document.createElement('div');
  roomsRow.className = 'rooms-row';

  rooms.forEach((rm, idx) => {
    const meta = getRoomTypeMeta(rm.type);

    const cell = document.createElement('div');
    cell.className = `room-cell type-${rm.type}`;
    cell.title = `${rm.name} (${meta.label}) - ${rm.desc || ''}`;
    cell.innerHTML = `
      <i class="fa-solid ${meta.icon} room-icon"></i>
      <span class="room-name">${rm.name}</span>
      <span class="room-type-tag">${meta.label}</span>
    `;

    // 點擊房間方塊：聚焦該教室，並在 3D 中開啟透視特寫
    cell.addEventListener('click', () => {
      document.querySelectorAll('.room-cell').forEach(c => c.classList.remove('active-focus'));
      cell.classList.add('active-focus');
      focusOnRoom(buildingData.id, floorIndex, idx, rm);
    });

    roomsRow.appendChild(cell);

    // 同步生成詳細列表項目
    const item = document.createElement('div');
    item.className = 'floor-item';
    item.innerHTML = `
      <span class="floor-tag" style="background:${meta.color}">${rm.name}</span>
      <span class="floor-desc"><strong>${meta.label}</strong>：${rm.desc || currentFloor.desc}</span>
    `;
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      cell.click();
    });
    floorList.appendChild(item);
  });

  container.appendChild(roomsRow);
}

/**
 * 清除當前房間的高亮狀態與發光光柱
 */
function clearRoomHighlight() {
  if (currentHighlightedRoom) {
    const bGroup = buildingObjects.get(currentHighlightedRoom.buildingId);
    if (bGroup) {
      bGroup.traverse(child => {
        if (child.isMesh && child.userData && child.userData.isRoom) {
          if (child.userData.originalMat) {
            child.material = child.userData.originalMat;
          }
        }
        if (child.isSprite && child.userData && child.userData.isRoomLabel) {
          if (child.userData.origScaleX) {
            child.scale.set(child.userData.origScaleX, child.userData.origScaleY, 1);
          }
        }
      });
    }

    if (roomHighlightBeacon && roomHighlightBeacon.parent) {
      roomHighlightBeacon.parent.remove(roomHighlightBeacon);
    }
    roomHighlightBeacon = null;
    currentHighlightedRoom = null;
  }

  // 移除 2D 格局圖中的高亮外框
  document.querySelectorAll('.room-cell.highlight-target').forEach(c => {
    c.classList.remove('highlight-target');
  });
}

/**
 * 使指定房間單獨發亮，並建立天降光柱與地面脈衝光環
 */
function highlightSingleRoom(buildingId, floorIndex, roomIndex, roomData) {
  clearRoomHighlight();

  const indoorGrp = indoorGroups.get(buildingId);
  if (!indoorGrp) return null;

  let targetMesh = null;
  let targetSprite = null;

  // 取得目標樓層 Group
  const targetFloorGroup = indoorGrp.children.find(fl => fl.userData && fl.userData.floorIndex === floorIndex);
  if (!targetFloorGroup) return null;

  targetFloorGroup.traverse(child => {
    if (child.isMesh && child.userData && child.userData.isRoom) {
      if (!child.userData.originalMat) {
        child.userData.originalMat = child.material;
      }

      if (child.userData.roomIndex === roomIndex) {
        targetMesh = child;
        // 目標房間：超強金色霓虹發光材質，具備呼吸脈衝光
        const highlightMat = new THREE.MeshStandardMaterial({
          color: 0xfff066,
          emissive: 0xf59e0b,
          emissiveIntensity: 2.2,
          roughness: 0.2,
          metalness: 0.1,
          transparent: true,
          opacity: 0.95
        });
        child.material = highlightMat;
      } else {
        // 同樓層其他房間：暫時調暗並微透，讓目標房間成為全場唯一發光焦點！
        if (!child.userData.dimMat) {
          child.userData.dimMat = new THREE.MeshStandardMaterial({
            color: 0x334155,
            roughness: 0.8,
            metalness: 0.0,
            transparent: true,
            opacity: 0.18
          });
        }
        child.material = child.userData.dimMat;
      }
    }

    if (child.isSprite && child.userData && child.userData.isRoomLabel) {
      if (!child.userData.origScaleX) {
        child.userData.origScaleX = child.scale.x;
        child.userData.origScaleY = child.scale.y;
      }
      if (child.userData.roomIndex === roomIndex) {
        targetSprite = child;
        child.scale.set(child.userData.origScaleX * 1.5, child.userData.origScaleY * 1.5, 1);
      } else {
        child.scale.set(child.userData.origScaleX * 0.75, child.userData.origScaleY * 0.75, 1);
      }
    }
  });

  if (targetMesh) {
    const beaconGrp = new THREE.Group();
    beaconGrp.name = 'room_highlight_beacon';

    const rmHeight = targetMesh.geometry.parameters.height || 2.2;

    // 1. 頂部向下倒立金黃色箭頭錐體
    const coneGeo = new THREE.ConeGeometry(0.7, 1.8, 16);
    coneGeo.rotateX(Math.PI);
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0xffe066,
      emissive: 0xf59e0b,
      emissiveIntensity: 2.5,
      roughness: 0.1,
      metalness: 0.2
    });
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneMesh.position.y = rmHeight * 0.5 + 2.2;
    beaconGrp.add(coneMesh);

    // 2. 垂直穿透性聚光柱 (Spotlight Beam)
    const beamGeo = new THREE.CylinderGeometry(0.6, 1.6, 5.5, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.y = rmHeight * 0.5 + 3.2;
    beaconGrp.add(beamMesh);

    // 3. 地面擴散雷達光波環 (Pulsing Ripple Ring)
    const ringGeo = new THREE.RingGeometry(0.8, 1.4, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = -rmHeight * 0.48;
    beaconGrp.add(ringMesh);

    beaconGrp.position.copy(targetMesh.position);
    targetFloorGroup.add(beaconGrp);
    roomHighlightBeacon = beaconGrp;

    currentHighlightedRoom = {
      buildingId,
      floorIndex,
      roomIndex,
      targetMesh,
      coneMesh,
      beamMesh,
      ringMesh,
      baseConeY: coneMesh.position.y
    };
  }

  return targetMesh;
}

/**
 * 每一幀更新發光呼吸燈與光柱指標動畫
 */
function updateRoomHighlightAnim(time) {
  if (!currentHighlightedRoom || !roomHighlightBeacon) return;

  const pulse = (Math.sin(time * 0.007) + 1) * 0.5;

  // 1. 房間實體方塊呼吸發光
  if (currentHighlightedRoom.targetMesh && currentHighlightedRoom.targetMesh.material) {
    currentHighlightedRoom.targetMesh.material.emissiveIntensity = 1.3 + pulse * 2.2;
  }

  // 2. 倒立錐體指針上下漂浮與自轉
  if (currentHighlightedRoom.coneMesh) {
    currentHighlightedRoom.coneMesh.position.y = currentHighlightedRoom.baseConeY + Math.sin(time * 0.006) * 0.35;
    currentHighlightedRoom.coneMesh.rotation.y = time * 0.003;
  }

  // 3. 垂直光柱呼吸與旋轉
  if (currentHighlightedRoom.beamMesh) {
    currentHighlightedRoom.beamMesh.rotation.y = -time * 0.002;
    currentHighlightedRoom.beamMesh.material.opacity = 0.25 + pulse * 0.35;
  }

  // 4. 地面雷達波環循環擴散放大並漸隱
  if (currentHighlightedRoom.ringMesh) {
    const cycle = (time * 0.0016) % 1.0;
    const s = 1.0 + cycle * 1.8;
    currentHighlightedRoom.ringMesh.scale.set(s, s, s);
    currentHighlightedRoom.ringMesh.material.opacity = (1.0 - cycle) * 0.85;
  }
}

/**
 * 鏡頭聚焦至特定大樓的特定教室，並在 3D 中高亮該空間
 */
function focusOnRoom(buildingId, floorIndex, roomIndex, roomData) {
  // 1. 先開啟該大樓的室內透視
  toggleIndoorXRay(true, buildingId);
  filterIndoorFloor(buildingId, floorIndex);

  // 2. 觸發目標空間單獨發亮
  const targetMesh = highlightSingleRoom(buildingId, floorIndex, roomIndex, roomData);

  // 3. 計算目標房間在世界坐標系中的絕對位置
  let roomWorldPos = new THREE.Vector3();
  if (targetMesh) {
    targetMesh.getWorldPosition(roomWorldPos);
  } else {
    const bData = CAMPUS_DATA.find(d => d.id === buildingId);
    if (bData) {
      roomWorldPos.set(bData.position.x, bData.position.y + 7 + floorIndex * 3, bData.position.z);
    }
  }

  // 4. 鏡頭精準特寫飛向目標房間（不再只是盲目看大樓中心！）
  const targetPos = new THREE.Vector3(roomWorldPos.x, roomWorldPos.y + 1.2, roomWorldPos.z);
  const camPos = new THREE.Vector3(
    roomWorldPos.x + 9.0,
    roomWorldPos.y + 9.5,
    roomWorldPos.z + 12.5
  );

  new TWEEN.Tween(camera.position)
    .to(camPos, 1000)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();

  new TWEEN.Tween(controls.target)
    .to(targetPos, 1000)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();

  // 5. 連動 2D 平面格局圖格子，加上金色呼吸發光效果
  const cells = document.querySelectorAll('.room-cell');
  cells.forEach((c, idx) => {
    if (idx === roomIndex) {
      c.classList.add('highlight-target');
      c.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      c.classList.remove('highlight-target');
    }
  });

  const listItems = document.querySelectorAll('.floor-item');
  listItems.forEach((item, idx) => {
    if (idx === roomIndex) {
      item.classList.add('active-focus');
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      item.classList.remove('active-focus');
    }
  });
}

/**
 * 初始化全校教室與處室智慧搜尋系統
 */
function setupRoomSearchSystem() {
  allCampusRooms = [];
  CAMPUS_DATA.forEach(b => {
    if (b.floors) {
      b.floors.forEach((fl, flIdx) => {
        if (fl.rooms) {
          fl.rooms.forEach((rm, rmIdx) => {
            allCampusRooms.push({
              buildingId: b.id,
              buildingName: b.shortName,
              floorIndex: flIdx,
              floorLabel: fl.floor,
              roomIndex: rmIdx,
              name: rm.name,
              type: rm.type,
              desc: rm.desc || fl.desc
            });
          });
        }
      });
    }
  });

  const modal = document.getElementById('room-search-modal');
  const input = document.getElementById('room-search-input');
  const resultsContainer = document.getElementById('search-results-list');
  const btnClose = document.getElementById('btn-close-search');
  const btnClear = document.getElementById('btn-clear-search');
  const filterPills = document.querySelectorAll('#search-filter-pills .filter-pill');

  let activeFilter = 'all';

  const renderSearchResults = () => {
    const kw = input.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';

    const filtered = allCampusRooms.filter(item => {
      // 分類過濾
      if (activeFilter === 'office' && item.type !== 'office') return false;
      if (activeFilter === 'classroom_shs' && !(item.name.includes('高中') || item.type === 'classroom' && item.buildingId === 'teaching')) return false;
      if (activeFilter === 'classroom_jhs' && !(item.name.includes('國中') || item.type === 'classroom' && (item.buildingId === 'dazhi' || item.buildingId === 'dayong'))) return false;
      if (activeFilter === 'lab' && item.type !== 'lab') return false;
      if (activeFilter === 'special' && (item.type !== 'special' && item.type !== 'hall')) return false;

      // 關鍵字過濾
      if (!kw) return true;
      return item.name.toLowerCase().includes(kw) ||
             item.buildingName.toLowerCase().includes(kw) ||
             item.floorLabel.toLowerCase().includes(kw) ||
             (item.desc && item.desc.toLowerCase().includes(kw));
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<div class="no-results"><i class="fa-solid fa-face-meh"></i> 找不到符合「${kw}」的教室或處室，請嘗試其他關鍵字。</div>`;
      return;
    }

    filtered.forEach(item => {
      const meta = getRoomTypeMeta(item.type);
      const row = document.createElement('div');
      row.className = 'search-result-item';
      row.innerHTML = `
        <div class="result-main">
          <div class="result-badge" style="background:${meta.color}22; color:${meta.color}; border:1px solid ${meta.color}66">
            <i class="fa-solid ${meta.icon}"></i>
          </div>
          <div class="result-info">
            <h4>${item.name}</h4>
            <p><i class="fa-solid fa-location-dot"></i> ${item.buildingName} ${item.floorLabel}・${meta.label} - ${item.desc}</p>
          </div>
        </div>
        <div class="result-locate-btn">
          <i class="fa-solid fa-crosshairs"></i> 前往定位
        </div>
      `;

      row.addEventListener('click', () => {
        modal.classList.remove('open');
        focusOnBuilding(item.buildingId);
        
        // 切換面板到該樓層 Tab 並單獨聚焦高亮該教室
        setTimeout(() => {
          const tabBtn = document.querySelector(`.floor-tab-btn[data-index="${item.floorIndex}"]`);
          if (tabBtn) tabBtn.click();
          focusOnRoom(item.buildingId, item.floorIndex, item.roomIndex, item);
        }, 350);
      });

      resultsContainer.appendChild(row);
    });
  };

  input.addEventListener('input', () => {
    btnClear.style.display = input.value ? 'block' : 'none';
    renderSearchResults();
  });

  btnClear.addEventListener('click', () => {
    input.value = '';
    btnClear.style.display = 'none';
    renderSearchResults();
    input.focus();
  });

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-type');
      renderSearchResults();
    });
  });

  btnClose.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  // 頂部導航按鈕打開搜尋
  document.getElementById('btn-search-room')?.addEventListener('click', () => {
    modal.classList.add('open');
    input.focus();
    renderSearchResults();
  });

  // 全域大樓透視按鈕切換
  document.getElementById('btn-indoor-xray')?.addEventListener('click', () => {
    toggleIndoorXRay(!isIndoorXRay, selectedBuilding?.id);
  });
}
