import {
  AppraisalResult,
  CheatSkill,
  ClassId,
  IsekaiClass,
  Question,
  QuestionOption,
  SkillTier,
  StatKey,
  Stats,
} from '../types/game';

export const STAT_LABELS: Record<StatKey, { label: string; short: string }> = {
  str: { label: '力量', short: 'STR' },
  mag: { label: '魔力', short: 'MAG' },
  luk: { label: '幸运', short: 'LUK' },
  int: { label: '智力', short: 'INT' },
  cha: { label: '颜值', short: 'CHA' },
  abs: { label: '抽象度', short: 'ABS' },
};

export const INTRO_DIALOGUES: Array<{ speaker: string; text: string }> = [
  {
    speaker: '系统提示',
    text: '【刺耳的刹车声与命运的鸣笛同时响起——】你甚至没来得及清空购物车，视野便陷入了一片纯白。',
  },
  {
    speaker: '转生女神 · 莉莉娅',
    text: '“咳咳……欢迎来到异世界转生资质鉴定所！我是负责给你办理入职——啊不，转生手续的女神莉莉娅。”',
  },
  {
    speaker: '转生女神 · 莉莉娅',
    text: '“最近卡车司机KPI冲太猛，排队投胎的人有点多。来吧，回答我 8 个灵魂拷问，我好给你盖章发《冒险者登记证》！”',
  },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    chapter: '第一章 · 灵魂初检',
    scene: '纯白神殿 / 女神正吸溜着冰美式',
    prompt: '刚睁眼看见女神正一边喝冰美式一边刷手机，你的第一反应是？',
    options: [
      {
        id: 'A',
        text: '“女神大人，请问异世界包五险一金和周末双休吗？”',
        tag: '打工人之魂',
        goddessReaction: '“……你甚至死了都还惦记着五险一金，我敬你是条汉子。”',
        statDelta: { int: 12, abs: 8, luk: 4 },
        affinity: { guildmaster: 3, sage: 2, courier: 2 },
        styleTag: 'slacker',
      },
      {
        id: 'B',
        text: '“先别急着转生，我能把刚才撞我的卡车也召唤过去吗？”',
        tag: '因果律鬼才',
        goddessReaction: '“？？？你想开着泥头车去碾压魔王吗？有点东西，但不多。”',
        statDelta: { abs: 18, str: 10, mag: 4 },
        affinity: { calamity: 3, debugger: 3 },
        styleTag: 'chaotic',
      },
      {
        id: 'C',
        text: '礼貌鞠躬：“您好，请问这里有提供免费的热水和wifi吗？”',
        tag: '社恐礼貌',
        goddessReaction: '“没有wifi，但有圣水。你看起来很想找个角落安静待着。”',
        statDelta: { mag: 10, cha: 8, int: 6 },
        affinity: { necro: 3, hiddengod: 2 },
        styleTag: 'pragmatic',
      },
      {
        id: 'D',
        text: '“哇！女神姐姐颜值好高，能先合个影发个朋友圈吗？”',
        tag: '社交悍匪',
        goddessReaction: '“哎呀嘴真甜～虽然发不出去，但我决定给你多加两点颜值分！”',
        statDelta: { cha: 16, luk: 10 },
        affinity: { charmer: 3, priest: 1 },
        styleTag: 'greedy',
      },
    ],
  },
  {
    id: 2,
    chapter: '第二章 · 初始赐福',
    scene: '命运转盘前 / 闪烁着诡异的紫光',
    prompt: '女神允许你挑选一件不太正经的初始外挂，你会拿走哪一个？',
    options: [
      {
        id: 'A',
        text: '《中华小当家级万能菜刀》——切什么都能自动发光并附带美味buff',
        tag: '干饭人',
        goddessReaction: '“好家伙，别人去屠龙你去搞餐饮，魔王估计都得来你店里办卡。”',
        statDelta: { str: 12, cha: 10, luk: 6 },
        affinity: { chef: 4, courier: 1 },
        styleTag: 'pragmatic',
      },
      {
        id: 'B',
        text: '《带薪摸鱼结界》——只要在心里默念“我在工作”，敌人就看不见你',
        tag: '隐身摸鱼',
        goddessReaction: '“这技能连神明审核都差点没看出来，太适合混日子了。”',
        statDelta: { mag: 14, int: 10, luk: 6 },
        affinity: { sage: 4, hiddengod: 2 },
        styleTag: 'slacker',
      },
      {
        id: 'C',
        text: '《物理超度圣经》——一本重达八十斤的精装纯金法典，专拍天灵盖',
        tag: '物理牧师',
        goddessReaction: '“圣光确实照耀了他们……主要是砸得眼冒金星的那种光。”',
        statDelta: { str: 18, mag: 8 },
        affinity: { priest: 4, calamity: 2 },
        styleTag: 'heroic',
      },
      {
        id: 'D',
        text: '《异界控制台权限（仅限查看报错）》——能看到万物头顶的Bug提示',
        tag: '赛博观测',
        goddessReaction: '“警告！请勿尝试卡地形刷金币，本世界程序员已经很秃了。”',
        statDelta: { int: 15, abs: 14 },
        affinity: { debugger: 4, necro: 1 },
        styleTag: 'chaotic',
      },
    ],
  },
  {
    id: 3,
    chapter: '第三章 · 新手村初战',
    scene: '晨露草原 / 微风吹过青草香',
    prompt: '刚出新手村，一只浑身散发苹果清香的史莱姆朝你弹了过来，你选择？',
    options: [
      {
        id: 'A',
        text: '掏出勺子和炼乳：“太好了，是天然果冻布丁！”',
        tag: '食物链顶端',
        goddessReaction: '“史莱姆连夜召开种族大会，把你列为了头号不可名状天敌。”',
        statDelta: { str: 10, abs: 12, luk: 6 },
        affinity: { chef: 3, calamity: 3 },
        styleTag: 'chaotic',
      },
      {
        id: 'B',
        text: '蹲下来和它聊了半小时人生，顺便把它收编成室友',
        tag: '社恐交友',
        goddessReaction: '“你宁愿跟史莱姆聊天也不去酒馆找队友，不愧是你。”',
        statDelta: { mag: 12, cha: 6, abs: 8 },
        affinity: { necro: 3, charmer: 2 },
        styleTag: 'slacker',
      },
      {
        id: 'C',
        text: '迅速估算它的魔核市场价，然后决定把它卖给炼金术士',
        tag: '商业奇才',
        goddessReaction: '“第一天就开启了供应链思维，新手村的经济要被你盘活了。”',
        statDelta: { int: 15, luk: 8 },
        affinity: { guildmaster: 3, courier: 2 },
        styleTag: 'greedy',
      },
      {
        id: 'D',
        text: '平平无奇地挥了一下树枝，结果史莱姆连同背后的山头一起消失了',
        tag: '满级大佬',
        goddessReaction: '“喂！说好新手村不要开大招呢！地形修复费从你赏金里扣！”',
        statDelta: { str: 14, mag: 14 },
        affinity: { hiddengod: 4, priest: 2 },
        styleTag: 'heroic',
      },
    ],
  },
  {
    id: 4,
    chapter: '第四章 · 公会风云',
    scene: '橡木酒馆 / 麦酒与烤肉的气息',
    prompt: '一位自称“勇者”的少年邀请你入队，但队里只有爱花钱的女神官和总想自爆的法师，你？',
    options: [
      {
        id: 'A',
        text: '“我可以加入，但我是后勤兼厨师，伙食费必须日结。”',
        tag: '稳健后勤',
        goddessReaction: '“只要管饱，这支草台班子说不定真能一路平推到魔王城。”',
        statDelta: { int: 10, str: 8, cha: 8 },
        affinity: { chef: 3, courier: 2 },
        styleTag: 'pragmatic',
      },
      {
        id: 'B',
        text: '假装没听见，默默退到角落申请单人任务，顺便帮他们把账单结了',
        tag: '深藏不露',
        goddessReaction: '“典型的被退队流主角前传……不过你主动帮他们付钱也太亚撒西了吧。”',
        statDelta: { luk: 12, mag: 10, cha: 6 },
        affinity: { hiddengod: 3, necro: 2 },
        styleTag: 'pragmatic',
      },
      {
        id: 'C',
        text: '反手掏出一份《冒险者劳动合同》，把他们全签成自己旗下的签约艺人',
        tag: '资本降临',
        goddessReaction: '“勇者小队还没出发就已经背上了三十年竞业协议，你好狠的心！”',
        statDelta: { int: 16, cha: 10 },
        affinity: { guildmaster: 4, charmer: 2 },
        styleTag: 'greedy',
      },
      {
        id: 'D',
        text: '“太好了！只要我物理超度得够快，队友就来不及拖后腿！”',
        tag: '全能C位',
        goddessReaction: '“有你在，这支队伍的画风瞬间从搞笑番变成了无双割草番。”',
        statDelta: { str: 16, abs: 8 },
        affinity: { priest: 3, calamity: 2 },
        styleTag: 'heroic',
      },
    ],
  },
  {
    id: 5,
    chapter: '第五章 · 迷宫抉择',
    scene: '古老地下城 / 火把在石壁上摇曳',
    prompt: '迷宫深处有个会呼吸的宝箱，上面贴着“绝对不是宝箱怪”的纸条，你会？',
    options: [
      {
        id: 'A',
        text: '先给它点根烟（雾），然后趁它不注意连箱子带怪一起打包带走',
        tag: '土匪行径',
        goddessReaction: '“宝箱怪做梦也没想到，有一天自己会被冒险者当成宠物兼移动仓库。”',
        statDelta: { abs: 15, str: 10, luk: 6 },
        affinity: { calamity: 3, courier: 2 },
        styleTag: 'chaotic',
      },
      {
        id: 'B',
        text: '检查纸条的笔迹和胶水年份，推理出这是上一任冒险者留下的恶作剧',
        tag: '细节侦探',
        goddessReaction: '“逻辑满分！顺便一提，纸条背面其实写了藏宝库的真密码。”',
        statDelta: { int: 16, luk: 8 },
        affinity: { sage: 3, debugger: 3 },
        styleTag: 'pragmatic',
      },
      {
        id: 'C',
        text: '用温柔的眼神凝视它：“我知道你很孤独，要跟我回墓园吗？”',
        tag: '万物皆可魅惑',
        goddessReaction: '“宝箱怪脸红了！它吐出了两枚金币当见面礼，这是什么奇幻剧情？”',
        statDelta: { cha: 14, mag: 10 },
        affinity: { charmer: 3, necro: 3 },
        styleTag: 'slacker',
      },
      {
        id: 'D',
        text: '“管它是不是，先一拳打晕再开箱！”',
        tag: '暴力美学',
        goddessReaction: '“物理学家和牧师同时流下了赞许的泪水，简单粗暴但非常有效。”',
        statDelta: { str: 16, luk: 4 },
        affinity: { priest: 3, hiddengod: 2 },
        styleTag: 'heroic',
      },
    ],
  },
  {
    id: 6,
    chapter: '第六章 · 魔王的Offer',
    scene: '黑曜石城堡外 / 魔界HR递来烫金名片',
    prompt: '魔王军四天王突然找上门，开出双倍工资 + 五险一金 + 周末双休招安你，去不去？',
    options: [
      {
        id: 'A',
        text: '“先签个劳务派遣协议吧，我两边同时领工资，帮魔王送外卖也行。”',
        tag: '时间管理大师',
        goddessReaction: '“好家伙，王国和魔王军都在你的配送范围内，全大陆唯一指定骑手！”',
        statDelta: { luk: 12, int: 10, str: 8 },
        affinity: { courier: 4, guildmaster: 2 },
        styleTag: 'greedy',
      },
      {
        id: 'B',
        text: '“双休是真的吗？那我去了！只要不让我加班打勇者，让我干嘛都行。”',
        tag: '躺平正义',
        goddessReaction: '“事实证明，只要福利到位，人类防线当场就会少一位顶尖战力。”',
        statDelta: { mag: 12, int: 10, abs: 6 },
        affinity: { sage: 4, necro: 2 },
        styleTag: 'slacker',
      },
      {
        id: 'C',
        text: '“拒绝！除非把魔王城的食堂承包权交给我！”',
        tag: '原则坚定',
        goddessReaction: '“魔王听说后连夜修改了合同，只求你明天就能来掌勺。”',
        statDelta: { cha: 10, str: 10, luk: 8 },
        affinity: { chef: 4, charmer: 1 },
        styleTag: 'pragmatic',
      },
      {
        id: 'D',
        text: '“四天王是吧？刚好一起超度了，省得我跑四趟。”',
        tag: '正道的光',
        goddessReaction: '“不愧是你，魔王军HR部门今天全员申请调岗去后勤了。”',
        statDelta: { str: 14, mag: 12, luk: 6 },
        affinity: { priest: 3, hiddengod: 3 },
        styleTag: 'heroic',
      },
    ],
  },
  {
    id: 7,
    chapter: '第七章 · 拯救？还是吃瓜？',
    scene: '赤红龙巢 / 恶龙正端着下午茶',
    prompt: '国王求你救回被恶龙抓走的公主，但你赶到时发现恶龙很帅，而且公主正在追剧吃瓜……',
    options: [
      {
        id: 'A',
        text: '掏出瓜子加入他们：“大兄弟，这集我刚看过，后面还有反转！”',
        tag: '资深吃瓜',
        goddessReaction: '“勇者、恶龙与公主在山洞里达成了跨种族追剧联盟，可喜可贺。”',
        statDelta: { abs: 14, cha: 10, luk: 8 },
        affinity: { sage: 2, charmer: 3, debugger: 2 },
        styleTag: 'slacker',
      },
      {
        id: 'B',
        text: '和公主、恶龙商量好：演一场假救人大戏，回去三个人平分国王的赏金',
        tag: '商业闭环',
        goddessReaction: '“这波三赢操作直接让王国国库少了一半，你真是天生的公会会长。”',
        statDelta: { int: 16, luk: 10, cha: 6 },
        affinity: { guildmaster: 4, courier: 2 },
        styleTag: 'greedy',
      },
      {
        id: 'C',
        text: '用系统视角看了一眼，发现这是“第404号剧情触发异常”，顺手修复了它',
        tag: '世界管理员',
        goddessReaction: '“连世界线的Bug都能顺手改掉，你到底是什么来头啊！”',
        statDelta: { int: 14, mag: 12, abs: 10 },
        affinity: { debugger: 4, hiddengod: 2 },
        styleTag: 'chaotic',
      },
      {
        id: 'D',
        text: '给他们做了顿龙肉风味（素食版）大餐，然后默默溜走不留功与名',
        tag: '潇洒退场',
        goddessReaction: '“你留下了一道传说中的食谱，恶龙到现在还在打听你的下落。”',
        statDelta: { cha: 12, str: 8, luk: 10 },
        affinity: { chef: 3, hiddengod: 2 },
        styleTag: 'pragmatic',
      },
    ],
  },
  {
    id: 8,
    chapter: '终章 · 灵魂宣誓',
    scene: '鉴定水晶前 / 金色羊皮纸缓缓展开',
    prompt: '资质鉴定即将完成！请对着水晶球喊出你在异世界的终极生存信条：',
    options: [
      {
        id: 'A',
        text: '“只要我够抽象，命运的镰刀就追不上我的脑回路！”',
        tag: '抽象圣体',
        goddessReaction: '“鉴定水晶发出了一声清脆的叹息……但它还是为你亮起了金光。”',
        statDelta: { abs: 20, luk: 8 },
        affinity: { calamity: 3, debugger: 3 },
        styleTag: 'chaotic',
      },
      {
        id: 'B',
        text: '“低调发育，准点下班，世界毁灭也别打扰我睡觉！”',
        tag: '人间清醒',
        goddessReaction: '“非常健康的作息理念，祝你在异世界睡个好觉！”',
        statDelta: { mag: 12, int: 12, luk: 8 },
        affinity: { sage: 3, necro: 3 },
        styleTag: 'slacker',
      },
      {
        id: 'C',
        text: '“吃饭第一，赚钱第二，顺便用拳头和微笑解决一切麻烦！”',
        tag: '全能派',
        goddessReaction: '“听起来朴实无华，但往往这种人能活到最后。”',
        statDelta: { str: 12, cha: 12, luk: 8 },
        affinity: { chef: 2, courier: 3, priest: 2 },
        styleTag: 'pragmatic',
      },
      {
        id: 'D',
        text: '“一切都是我的计划！这个异世界的剧本归我写了！”',
        tag: '幕后黑手',
        goddessReaction: '“好大的口气！不过……你的灵魂波形确实有点吓人呢。”',
        statDelta: { int: 14, cha: 12, mag: 8 },
        affinity: { guildmaster: 3, hiddengod: 3, charmer: 2 },
        styleTag: 'greedy',
      },
    ],
  },
];

export const ISEKAI_CLASSES: Record<ClassId, IsekaiClass> = {
  chef: {
    id: 'chef',
    name: '满级厨师',
    title: 'Lv.99 异界料理宗师',
    badgeText: '美食霸主',
    stampText: '鉴定合格',
    stampType: 'qualified',
    description:
      '你用一口铁锅征服了整个大陆的胃。无论是史莱姆布丁还是炭烤魔龙肋排，在你手里都能变成SSR级回复道具。',
    guildMasterComment:
      '“自从他入驻公会食堂，冒险者们连讨伐魔王都变得积极了——因为打完仗能免费加餐。”',
    baseStats: { str: 68, mag: 55, luk: 74, int: 66, cha: 78, abs: 62 },
    survivalBase: 2800,
    accentColor: '#c97b2e',
    iconType: 'chef',
  },
  sage: {
    id: 'sage',
    name: '摸鱼大贤者',
    title: '带薪冥想大魔导师',
    badgeText: '效率至上',
    stampText: '鉴定合格',
    stampType: 'qualified',
    description:
      '为了能准点下班，你把原本需要咏唱三分钟的禁咒压缩成了“算了就这样吧”五个字，意外成为史上最强懒人法师。',
    guildMasterComment:
      '“每天下午五点半准时消失得无影无踪，比刺客还会潜行，但交给他的活从没出过岔子。”',
    baseStats: { str: 42, mag: 92, luk: 76, int: 88, cha: 65, abs: 70 },
    survivalBase: 3650,
    accentColor: '#3f7d8a',
    iconType: 'sage',
  },
  necro: {
    id: 'necro',
    name: '社恐死灵法师',
    title: '独居墓园召唤师',
    badgeText: '静音模式',
    stampText: '特殊人才',
    stampType: 'anomaly',
    description:
      '比起和活人尴尬寒暄，你更喜欢指挥沉默寡言的骷髅兵帮你拿快递、扫地和端茶。你的墓园是全大陆最安静的5A级社区。',
    guildMasterComment:
      '“提交任务永远只派一只骷髅举着纸条来，字迹工整，从不讨价还价，简直是理想打工人。”',
    baseStats: { str: 38, mag: 89, luk: 64, int: 82, cha: 71, abs: 74 },
    survivalBase: 2400,
    accentColor: '#6f4e8e',
    iconType: 'necro',
  },
  priest: {
    id: 'priest',
    name: '物理超度圣职者',
    title: '拳法系大祭司',
    badgeText: '圣光铁拳',
    stampText: '危险分子',
    stampType: 'danger',
    description:
      '信奉“只要把敌人的物理存在抹除，灵魂就能直接升天”的硬核牧师。治疗术是用来给自己续杯体力继续挥拳的。',
    guildMasterComment:
      '“每次他大喊‘愿圣光祝福你’的时候，对面魔物都会膝盖一软——主要是被他的沙包大拳头吓的。”',
    baseStats: { str: 94, mag: 72, luk: 66, int: 58, cha: 70, abs: 68 },
    survivalBase: 2950,
    accentColor: '#b54434',
    iconType: 'priest',
  },
  guildmaster: {
    id: 'guildmaster',
    name: '黑心公会会长',
    title: '异世界风险投资人',
    badgeText: '资本巨鳄',
    stampText: '危险分子',
    stampType: 'danger',
    description:
      '别人下副本靠剑与魔法，你靠《冒险者绩效考核表》与《药水贷款协议》。不到半年，半个王国的勇者都在给你打工。',
    guildMasterComment:
      '“等等，他昨天是不是还想把我也签进他的经纪公司？快把公会公章藏好！”',
    baseStats: { str: 50, mag: 62, luk: 80, int: 95, cha: 82, abs: 66 },
    survivalBase: 4200,
    accentColor: '#9c7118',
    iconType: 'guildmaster',
  },
  hiddengod: {
    id: 'hiddengod',
    name: '被退队的隐藏真神',
    title: '满级低调挂逼',
    badgeText: '降维打击',
    stampText: '传说降临',
    stampType: 'legend',
    description:
      '明明拥有一指碾碎星辰的实力，却因为懒得抢风头而被菜鸟小队踢出队伍。如今过着喝茶养花、顺手拯救世界的退休生活。',
    guildMasterComment:
      '“鉴定水晶看到他的时候直接过载冒烟了……建议全公会成员对他保持最高敬意。”',
    baseStats: { str: 90, mag: 90, luk: 88, int: 84, cha: 80, abs: 58 },
    survivalBase: 9999,
    accentColor: '#b8860b',
    iconType: 'hiddengod',
  },
  calamity: {
    id: 'calamity',
    name: '人形自走灾厄',
    title: '史莱姆天敌 · 混沌体',
    badgeText: '混沌最高',
    stampText: '危险分子',
    stampType: 'danger',
    description:
      '你的脑回路完全无法被异世界法则预测。别人避之不及的迷宫陷阱，常常因为你的奇葩操作反过来被你卡死。',
    guildMasterComment:
      '“求求你去祸害魔王城吧！新手村的史莱姆昨天连夜打车逃去隔壁大陆了！”',
    baseStats: { str: 84, mag: 68, luk: 72, int: 54, cha: 60, abs: 98 },
    survivalBase: 1850,
    accentColor: '#a63429',
    iconType: 'calamity',
  },
  courier: {
    id: 'courier',
    name: '异世界外卖骑手',
    title: '极速风行全境通',
    badgeText: '使命必达',
    stampText: '鉴定合格',
    stampType: 'qualified',
    description:
      '无论是在岩浆湖底还是魔王王座前，只要下单时备注“放门口”，你就能在30分钟内顶着龙息准时送达。',
    guildMasterComment:
      '“全大陆速度最快的男人/女人，连魔王的夜宵都是他送的，顺便帮我们带回了机密情报。”',
    baseStats: { str: 78, mag: 58, luk: 86, int: 72, cha: 74, abs: 72 },
    survivalBase: 3100,
    accentColor: '#2d7a5f',
    iconType: 'courier',
  },
  charmer: {
    id: 'charmer',
    name: '魅魔首席咨询师',
    title: '芳心纵火外交官',
    badgeText: '魅力溢出',
    stampText: '鉴定合格',
    stampType: 'qualified',
    description:
      '你不需要武器，一个真诚的微笑和两句彩虹屁就能让守关Boss把钥匙亲手奉上，顺便加你好友聊感情烦恼。',
    guildMasterComment:
      '“上次派他去讨伐恶龙，结果恶龙不仅退了赃款，还向他咨询了半小时脱单技巧。”',
    baseStats: { str: 46, mag: 74, luk: 82, int: 79, cha: 97, abs: 64 },
    survivalBase: 3400,
    accentColor: '#a8426b',
    iconType: 'charmer',
  },
  debugger: {
    id: 'debugger',
    name: '时空漏洞管理员',
    title: 'Bug 级观测者',
    badgeText: '权限狗',
    stampText: '特殊人才',
    stampType: 'anomaly',
    description:
      '你总能一眼看穿这个异世界代码层面的草台本质：卡进墙角就能回城、对着空气连跳三次就能跳过Boss战。',
    guildMasterComment:
      '“创世神昨天专门托梦给我，让我看好你，别让你再往许愿池里投负数的金币了。”',
    baseStats: { str: 52, mag: 82, luk: 78, int: 92, cha: 68, abs: 94 },
    survivalBase: 5120,
    accentColor: '#3a5a99',
    iconType: 'debugger',
  },
};

export const CHEAT_SKILLS: CheatSkill[] = [
  {
    id: 'off_work_on_time',
    name: '《绝对准点下班》',
    tier: 'SSR',
    description: '一到下班时间，强制解除所有战斗与Debuff，瞬间传送回安全屋。',
    preferredStyles: ['slacker', 'pragmatic'],
  },
  {
    id: 'closed_eyes_dodge',
    name: '《闭眼绝对回避》',
    tier: 'SSR',
    description: '只要紧闭双眼心里默念“我看不到危险”，就能躲避99%的物理攻击。',
    preferredStyles: ['chaotic', 'slacker'],
  },
  {
    id: 'causal_blame_shift',
    name: '《因果律级甩锅》',
    tier: 'SSR',
    description: '受到的伤害与黑锅有较高概率自动转移给在场看起来最像反派的人。',
    preferredStyles: ['greedy', 'chaotic'],
  },
  {
    id: 'one_punch_bless',
    name: '《物理意义上的祝福》',
    tier: 'SSR',
    description: '普通攻击附带“圣光震慑”特效，击中敌人时会自动播放圣歌。',
    preferredStyles: ['heroic', 'pragmatic'],
  },
  {
    id: 'slime_treaty',
    name: '《史莱姆友好互助协议》',
    tier: 'SR',
    description: '所有史莱姆见到你都会主动让路，并有概率为你吐出零钱。',
    preferredStyles: ['pragmatic', 'slacker'],
  },
  {
    id: 'no_awkwardness',
    name: '《只要我不尴尬》',
    tier: 'SR',
    description: '社交失败时自动触发范围性沉默光环，让尴尬转移到对方身上。',
    preferredStyles: ['chaotic', 'greedy'],
  },
  {
    id: 'negotiation_halo',
    name: '《双倍工资谈判术》',
    tier: 'SR',
    description: '与任何NPC交易或接取悬赏时，报酬自动上浮20%且免收手续费。',
    preferredStyles: ['greedy', 'pragmatic'],
  },
  {
    id: 'holy_crit',
    name: '《正义背刺》',
    tier: 'SR',
    description: '面对体积比自己大的敌人时，暴击率提升35%并附带吐槽音效。',
    preferredStyles: ['heroic'],
  },
  {
    id: 'infinite_water',
    name: '《无限续杯白开水》',
    tier: 'R',
    description: '随时随地从空气中变出一杯温度刚刚好的白开水，永远不会渴死。',
    preferredStyles: ['slacker', 'pragmatic'],
  },
  {
    id: 'night_vision_toilet',
    name: '《微弱夜视（仅限找厕所）》',
    tier: 'R',
    description: '在漆黑迷宫中能精准发光标记最近的卫生间与安全出口。',
    preferredStyles: ['chaotic', 'heroic', 'greedy'],
  },
];

function clampStat(val: number): number {
  return Math.max(15, Math.min(99, Math.round(val)));
}

export function calculateAppraisal(selectedOptions: QuestionOption[]): AppraisalResult {
  const affinityScores: Record<ClassId, number> = {
    chef: 0,
    sage: 0,
    necro: 0,
    priest: 0,
    guildmaster: 0,
    hiddengod: 0,
    calamity: 0,
    courier: 0,
    charmer: 0,
    debugger: 0,
  };

  const deltaSum: Stats = { str: 0, mag: 0, luk: 0, int: 0, cha: 0, abs: 0 };
  const styleCounts: Record<QuestionOption['styleTag'], number> = {
    pragmatic: 0,
    chaotic: 0,
    slacker: 0,
    heroic: 0,
    greedy: 0,
  };

  for (const opt of selectedOptions) {
    styleCounts[opt.styleTag] += 1;
    (Object.keys(opt.statDelta) as StatKey[]).forEach((k) => {
      deltaSum[k] += opt.statDelta[k] ?? 0;
    });
    (Object.keys(opt.affinity) as ClassId[]).forEach((cid) => {
      affinityScores[cid] += opt.affinity[cid] ?? 0;
    });
  }

  // Find winning class
  const sortedClasses = (Object.keys(affinityScores) as ClassId[]).sort(
    (a, b) => affinityScores[b] - affinityScores[a]
  );
  const winningClassId = sortedClasses[0];
  const isekaiClass = ISEKAI_CLASSES[winningClassId];

  // Calculate final 6D stats
  const finalStats: Stats = {
    str: clampStat(isekaiClass.baseStats.str * 0.55 + deltaSum.str * 0.9),
    mag: clampStat(isekaiClass.baseStats.mag * 0.55 + deltaSum.mag * 0.9),
    luk: clampStat(isekaiClass.baseStats.luk * 0.55 + deltaSum.luk * 0.95),
    int: clampStat(isekaiClass.baseStats.int * 0.55 + deltaSum.int * 0.9),
    cha: clampStat(isekaiClass.baseStats.cha * 0.55 + deltaSum.cha * 0.9),
    abs: clampStat(isekaiClass.baseStats.abs * 0.55 + deltaSum.abs * 0.95),
  };

  // Dominant style
  const dominantStyle = (Object.keys(styleCounts) as Array<QuestionOption['styleTag']>).sort(
    (a, b) => styleCounts[b] - styleCounts[a]
  )[0];

  // Determine skill tier based on total stats + luck
  const totalStatScore =
    finalStats.str +
    finalStats.mag +
    finalStats.luk +
    finalStats.int +
    finalStats.cha +
    finalStats.abs;

  let targetTier: SkillTier = 'SR';
  if (totalStatScore >= 415 || finalStats.luk >= 88 || winningClassId === 'hiddengod') {
    targetTier = 'SSR';
  } else if (totalStatScore < 355) {
    targetTier = 'R';
  }

  // Pick a matching skill from that tier
  const tierCandidates = CHEAT_SKILLS.filter((s) => s.tier === targetTier);
  const styleMatched = tierCandidates.filter((s) => s.preferredStyles.includes(dominantStyle));
  const pool = styleMatched.length > 0 ? styleMatched : tierCandidates;
  const skillIndex = (totalStatScore + selectedOptions.length * 7) % pool.length;
  const skill = pool[skillIndex];

  // Survival days calculation
  const survivalBonus =
    finalStats.luk * 12 + finalStats.int * 8 + finalStats.str * 5 - Math.max(0, finalStats.abs - 85) * 15;
  const survivalDays = Math.max(365, Math.round(isekaiClass.survivalBase + survivalBonus));

  // Deterministic-feeling Guild ID
  const codeNum = String((totalStatScore * 137 + survivalDays) % 9000 + 1000);
  const prefixMap: Record<ClassId, string> = {
    chef: 'CK',
    sage: 'SG',
    necro: 'NC',
    priest: 'PR',
    guildmaster: 'GM',
    hiddengod: 'EX',
    calamity: 'CL',
    courier: 'EXS',
    charmer: 'CH',
    debugger: 'DBG',
  };

  return {
    adventurerId: `IS-${prefixMap[winningClassId]}-${codeNum}`,
    isekaiClass,
    skill,
    stats: finalStats,
    survivalDays,
    dominantStyle,
    createdAt: new Date().toISOString(),
  };
}
