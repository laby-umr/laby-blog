import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';
import LoadingScreen from '@site/src/components/Loading/LoadingScreen';

interface Hashira {
  id: number;
  name: string;
  title: string;
  breathing: string;
  quote: string;
  image: string;
  color: string;
}

interface Character {
  id: number;
  name: string;
  nameEn: string;
  image: string;
  color: string;
}

const characterData: Character[] = [
  {
    id: 1,
    name: '贝蒂',
    nameEn: 'Beatrice',
    image: '/img/home/beatrice.jpg',
    color: 'yellow-blue' // 明黄+粉蓝
  },
  {
    id: 2,
    name: '艾米莉亚',
    nameEn: 'Emilia',
    image: '/img/home/emilia.jpg',
    color: 'purple-pink' // 深紫+玫粉
  },
  {
    id: 3,
    name: '艾米莉亚',
    nameEn: 'Emilia',
    image: '/img/home/emilia2.jpg',
    color: 'purple-pink' // 深紫+玫粉
  },
  {
    id: 4,
    name: '拉姆',
    nameEn: 'Ram',
    image: '/img/home/ram.jpg',
    color: 'cyan-pink' // 浅青+玫红
  },
  {
    id: 5,
    name: '蕾姆',
    nameEn: 'Rem',
    image: '/img/home/rem-blue.jpg',
    color: 'pink-blue' // 亮粉+青蓝
  },
  {
    id: 6,
    name: '蕾姆',
    nameEn: 'Rem',
    image: '/img/home/rem-red.jpg',
    color: 'pink-blue' // 亮粉+青蓝
  },
  {
    id: 7,
    name: '菜月昂',
    nameEn: 'Subaru',
    image: '/img/home/subaru.jpg',
    color: 'gray-orange' // 灰+橙黑
  }
];

const hashiraData: Hashira[] = [
  {
    id: 1,
    name: '富冈义勇',
    title: '水柱 Water Hashira',
    breathing: 'Water Breathing (Mizu no kokyū)',
    quote: '"那些后悔自己行为的人，我绝不会践踏他们。因为鬼也曾经是人类。" - 富冈义勇以其冷静的判断力和强大的水之呼吸法守护着人类，他相信即使是鬼也曾有过人性。',
    image: '/img/home/giyuu.jpg',
    color: 'primary'
  },
  {
    id: 2,
    name: '炼狱杏寿郎',
    title: '炎柱 Flame Hashira',
    breathing: 'Flame Breathing (Honō no kokyū)',
    quote: '"让你的心燃烧起来！超越你的极限！我是炼狱杏寿郎，炎之柱！我会履行我的职责！我不会让这里的任何人死去！" - 炼狱以其不屈的精神和炽热的炎之呼吸法激励着所有人。',
    image: '/img/home/rengoku.jpg',
    color: 'error'
  },
  {
    id: 3,
    name: '悲鸣屿行冥',
    title: '岩柱 Stone Hashira',
    breathing: 'Stone Breathing (Iwa no kokyū)',
    quote: '"南无阿弥陀佛...愿佛祖指引你。" - 悲鸣屿是最强的柱，尽管双目失明，但他温柔的内心和如岩石般坚不可摧的力量守护着所有人。',
    image: '/img/home/gyomei.jpg',
    color: 'secondary-dim'
  },
  {
    id: 4,
    name: '不死川实弥',
    title: '风柱 Wind Hashira',
    breathing: 'Wind Breathing (Kaze no kokyū)',
    quote: '"我要杀光所有的鬼！" - 不死川浑身伤痕，被纯粹的愤怒驱使。他的"稀血"对鬼有着致命的诱惑力，而他的风之呼吸法如同狂风般凶猛。',
    image: '/img/home/sanemi.jpg',
    color: 'secondary'
  },
  {
    id: 5,
    name: '时透无一郎',
    title: '霞柱 Mist Hashira',
    breathing: 'Mist Breathing (Kasumi no kokyū)',
    quote: '"即使付出生命，我也要打败你。" - 时透是一个天才少年，在拿起刀后仅两个月就成为了柱。他常常陷入沉思，但他的霞之呼吸法如同迷雾般难以捉摸。',
    image: '/img/home/muichiro.jpg',
    color: 'outline-variant'
  },
  {
    id: 6,
    name: '甘露寺蜜璃',
    title: '恋柱 Love Hashira',
    breathing: 'Love Breathing (Koi no kokyū)',
    quote: '"我想对大家有用！我想帮忙！" - 甘露寺拥有常人八倍的肌肉密度，使用鞭状的日轮刀。她的恋之呼吸法充满了优雅和力量。',
    image: '/img/home/mitsuri.jpg',
    color: 'tertiary-fixed'
  },
  {
    id: 7,
    name: '伊黑小芭内',
    title: '蛇柱 Serpent Hashira',
    breathing: 'Serpent Breathing (Hebi no kokyū)',
    quote: '"我会保护需要保护的东西。" - 伊黑严格而愤世嫉俗，他的蛇之呼吸法允许进行不可预测的、蜿蜒曲折的攻击，如同毒蛇般致命。',
    image: '/img/home/obanai.jpg',
    color: 'inverse-primary'
  },
  {
    id: 8,
    name: '宇髓天元',
    title: '音柱 Sound Hashira',
    breathing: 'Sound Breathing (Oto no kokyū)',
    quote: '"我是祭典之神！宇髓天元！" - 自称"华丽之神"的前忍者，他重视华丽胜过一切。他的战斗是爆炸的交响乐，音之呼吸法震撼人心。',
    image: '/img/home/tengen.jpg',
    color: 'error'
  },
  {
    id: 9,
    name: '蝴蝶忍',
    title: '虫柱 Insect Hashira',
    breathing: 'Insect Breathing (Mushi no kokyū)',
    quote: '"我可能没有太多力量，但我可以用毒药杀死鬼。" - 蝴蝶优雅而致命。由于缺乏体力无法斩首鬼，她用致命的紫藤花毒药来弥补，虫之呼吸法精准而优雅。',
    image: '/img/home/shinobu.jpg',
    color: 'tertiary'
  }
];

interface PillarWarrior {
  id: number;
  name: string;
  nameEn: string;
  title: string;
  breathing: string;
  description: string;
  image: string;
  color: string;
  status?: string;
  tags?: string[];
}

const pillarWarriorsData: PillarWarrior[] = [
  {
    id: 1,
    name: '炼狱杏寿郎',
    nameEn: 'Kyojuro Rengoku',
    title: 'Flame Pillar',
    breathing: 'Flame Breathing',
    description: '一个拥有巨大魅力和不屈乐观精神的男人。他的精神燃烧着激情，点燃周围人的灵魂。面对压倒性的困难，他从未动摇。',
    image: '/img/home/rengoku.jpg',
    color: 'error'
  },
  {
    id: 2,
    name: '宇髓天元',
    nameEn: 'Tengen Uzui',
    title: 'Sound Pillar',
    breathing: 'Sound Breathing',
    description: '自称"华丽之神"。前忍者，重视华丽胜过一切。他的战斗是爆炸的交响乐。',
    image: '/img/home/tengen.jpg',
    color: 'secondary'
  },
  {
    id: 3,
    name: '蝴蝶忍',
    nameEn: 'Shinobu Kocho',
    title: 'Insect Pillar',
    breathing: 'Insect Breathing',
    description: '优雅而致命。由于缺乏体力无法斩首鬼，她用致命的紫藤花毒药来弥补。',
    image: '/img/home/shinobu.jpg',
    color: 'tertiary'
  },
  {
    id: 4,
    name: '时透无一郎',
    nameEn: 'Muichiro Tokito',
    title: 'Mist Pillar',
    breathing: 'Mist Breathing',
    description: '一个天才少年，在拿起刀后仅两个月就成为了柱。常常陷入沉思。',
    image: '/img/home/muichiro.jpg',
    color: 'primary'
  },
  {
    id: 5,
    name: '甘露寺蜜璃',
    nameEn: 'Mitsuri Kanroji',
    title: 'Love Pillar',
    breathing: 'Love Breathing',
    description: '拥有常人八倍的肌肉密度，使用鞭状的日轮刀。',
    image: '/img/home/mitsuri.jpg',
    color: 'tertiary-fixed-dim'
  },
  {
    id: 6,
    name: '伊黑小芭内',
    nameEn: 'Obanai Iguro',
    title: 'Serpent Pillar',
    breathing: 'Serpent Breathing',
    description: '严格而愤世嫉俗，伊黑的蛇之呼吸法允许进行不可预测的、蜿蜒曲折的攻击。',
    image: '/img/home/obanai.jpg',
    color: 'on-background'
  },
  {
    id: 7,
    name: '不死川实弥',
    nameEn: 'Sanemi Shinazugawa',
    title: 'Wind Pillar',
    breathing: 'Wind Breathing',
    description: '浑身伤痕，被纯粹的愤怒驱使。他的"稀血"对鬼有着致命的诱惑力。',
    image: '/img/home/sanemi.jpg',
    color: 'outline'
  },
  {
    id: 8,
    name: '悲鸣屿行冥',
    nameEn: 'Gyomei Himejima',
    title: 'Stone Pillar',
    breathing: 'Stone Breathing',
    description: '最强的柱。尽管双目失明，性格温柔爱哭，但他的力量在战场上如同泰坦。',
    image: '/img/home/gyomei.jpg',
    color: 'secondary-dim'
  },
  {
    id: 9,
    name: '富冈义勇',
    nameEn: 'Giyu Tomioka',
    title: 'Water Pillar',
    breathing: 'Water Breathing',
    description: '冷静而内敛。他认为自己不配担任这个职位，但他的"凪"技术却是完美的。',
    image: '/img/home/giyuu.jpg',
    color: 'primary'
  }
];

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [showLoading, setShowLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [selectedHashira, setSelectedHashira] = useState<Hashira>(hashiraData[0]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(characterData[0]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<PillarWarrior>(pillarWarriorsData[0]);
  const [pillarImageStates, setPillarImageStates] = useState<{[key: number]: boolean}>({});
  const [flippingPillar, setFlippingPillar] = useState<number | null>(null);

  // 切换九柱图片
  const togglePillarImage = (pillarId: number) => {
    if (flippingPillar !== null) return; // 防止动画期间重复点击
    
    setFlippingPillar(pillarId);
    
    // 在快速旋转的第一圈切换图片
    setTimeout(() => {
      setPillarImageStates(prev => ({
        ...prev,
        [pillarId]: !prev[pillarId]
      }));
    }, 150); // 快速旋转时切换
    
    // 动画结束后重置状态
    setTimeout(() => {
      setFlippingPillar(null);
    }, 800);
  };

  // 获取九柱图片路径
  const getPillarImage = (pillar: PillarWarrior) => {
    const isAlternate = pillarImageStates[pillar.id];
    if (isAlternate) {
      // 将 .jpg 替换为 2.jpg
      return pillar.image.replace('.jpg', '2.jpg');
    }
    return pillar.image;
  };

  // 检查是否已经访问过（本次会话）
  useEffect(() => {
    const visited = sessionStorage.getItem('hasVisitedSite');
    if (visited) {
      setShowLoading(false);
      setHasVisited(true);
    }
  }, []);

  // 九柱滚动动画
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 添加轻微的延迟，让动画更自然
          setTimeout(() => {
            entry.target.classList.add(styles.ninePillarAnimate);
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 延迟一点以确保DOM已加载
    setTimeout(() => {
      const cards = document.querySelectorAll(`.${styles.ninePillarItem}`);
      cards.forEach(card => {
        observer.observe(card);
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [hasVisited]);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedSite', 'true');
    setShowLoading(false);
    setHasVisited(true);
  };

  const handleCharacterSelect = (character: Character) => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    
    // 切换角色
    setTimeout(() => {
      setSelectedCharacter(character);
    }, 150);
    
    // 结束故障效果
    setTimeout(() => {
      setIsGlitching(false);
    }, 300);
  };

  // 如果显示 loading，只渲染 loading 页面
  if (showLoading && !hasVisited) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }
  
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'DevManga - 代码的呼吸法',
        description: 'The homepage title'
      })}
      description={translate({
        id: 'homepage.description',
        message: 'Slicing through bugs with First Form: Water-Cooled Logic',
        description: 'The homepage description'
      })}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Translate id="homepage.hero.badge">HASHIRA OF CODE</Translate>
            </div>
            
            <h1 className={styles.heroTitle}>
              <Translate id="homepage.hero.title.part1">Mastering the</Translate>{' '}
              <span className={styles.heroTitleAccent}>
                <Translate id="homepage.hero.title.part2">Dev-Breathing</Translate>
              </span>
            </h1>
            
            <p className={styles.heroDescription}>
              <Translate id="homepage.hero.description">
                Slicing through bugs with First Form: Water-Cooled Logic. 
                Merging ancient full-stack techniques with Neo-Tokyo speed.
              </Translate>
            </p>
            
            <div className={styles.heroActions}>
              <Link to="/blog" className={styles.heroPrimaryButton}>
                <span><Translate id="homepage.hero.button.blog">UNSHEATHE BLOG</Translate></span>
              </Link>
              <Link to="/projects" className={styles.heroSecondaryButton}>
                <span><Translate id="homepage.hero.button.projects">ARMORY</Translate></span>
              </Link>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.heroImageContainer} data-color={selectedCharacter.color}>
              <div className={`${styles.heroImageBorder} ${isGlitching ? styles.glitching : ''}`}></div>
              <div className={`${styles.heroImage} ${isGlitching ? styles.glitching : ''}`}>
                <div className={styles.heroImageContent}>
                  <img src={selectedCharacter.image} alt={selectedCharacter.name} className={styles.heroImageReal} />
                  <div className={styles.heroCharacterInfo}>
                    <div className={styles.heroCharacterName}>{selectedCharacter.name}</div>
                    <div className={styles.heroCharacterNameEn}>{selectedCharacter.nameEn}</div>
                  </div>
                </div>
              </div>
              <div className={styles.heroSticker}>
                <Translate id="homepage.hero.sticker">TOTAL CONCENTRATION*</Translate>
              </div>
            </div>
            
            {/* Character Selection Cards */}
            <div className={styles.characterSelection}>
              <div className={styles.characterRow}>
                {characterData.slice(0, 4).map((character) => (
                  <div
                    key={character.id}
                    className={`${styles.characterSelectCard} ${selectedCharacter.id === character.id ? styles.activeCard : ''}`}
                    data-color={character.color}
                    onClick={() => handleCharacterSelect(character)}
                  >
                    <div className={styles.characterCardContent}>
                      <div className={`${styles.characterAura} ${styles[`aura${character.color}`]}`}></div>
                      <img
                        src={character.image}
                        alt={character.name}
                        className={styles.characterSelectImage}
                      />
                      <div className={styles.characterSelectInfo}>
                        <div className={styles.characterSelectName}>{character.name}</div>
                        <div className={styles.characterSelectNameEn}>{character.nameEn}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.characterRow}>
                {characterData.slice(4, 7).map((character) => (
                  <div
                    key={character.id}
                    className={`${styles.characterSelectCard} ${selectedCharacter.id === character.id ? styles.activeCard : ''}`}
                    data-color={character.color}
                    onClick={() => handleCharacterSelect(character)}
                  >
                    <div className={styles.characterCardContent}>
                      <div className={`${styles.characterAura} ${styles[`aura${character.color}`]}`}></div>
                      <img
                        src={character.image}
                        alt={character.name}
                        className={styles.characterSelectImage}
                      />
                      <div className={styles.characterSelectInfo}>
                        <div className={styles.characterSelectName}>{character.name}</div>
                        <div className={styles.characterSelectNameEn}>{character.nameEn}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className={styles.techStack}>
        <div className={styles.techStackContainer}>
          <div className={styles.techStackHeader}>
            <div>
              <h2 className={styles.techStackTitle}>
                <Translate id="homepage.techStack.title">CURRENT ARSENAL</Translate>
              </h2>
              <p className={styles.techStackSubtitle}>
                <Translate id="homepage.techStack.subtitle">Breathing forms for high performance</Translate>
              </p>
            </div>
            <div className={styles.techStackBadge}>
              <Translate id="homepage.techStack.badge">LEVEL 99 TECH STACK</Translate>
            </div>
          </div>
          
          <div className={styles.techGrid}>
            {[
              { icon: 'data_object', name: 'TypeScript' },
              { icon: 'layers', name: 'React/Next' },
              { icon: 'database', name: 'PostgreSQL' },
              { icon: 'cloud_done', name: 'Cloudflare' },
              { icon: 'terminal', name: 'Rust-Lang' },
              { icon: 'shield_with_heart', name: 'Zod/Security' },
              { icon: 'code', name: 'Node.js' },
              { icon: 'api', name: 'REST API' },
              { icon: 'storage', name: 'Redis' },
              { icon: 'deployed_code', name: 'Docker' },
            ].map((tech, index) => (
              <div key={tech.name} className={`${styles.techCard} ${styles[`techCard${index % 3}`]}`}>
                <span className={`material-symbols-outlined ${styles.techIcon}`}>
                  {tech.icon}
                </span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nine Pillars Section - Exact HTML Design */}
      <section className={styles.ninePillarsSection}>
        {/* Section Header */}
        <div className={styles.ninePillarsHeader}>
          <div className={styles.ninePillarsBadge}>
            <Translate id="homepage.ninePillars.badge">DEMON SLAYER CORPS</Translate>
          </div>
          <h2 className={styles.ninePillarsTitle}>
            <Translate id="homepage.ninePillars.titlePart1">The Nine</Translate>{' '}
            <span className={styles.ninePillarsTitleHighlight}>
              <Translate id="homepage.ninePillars.titlePart2">Hashira</Translate>
            </span>
          </h2>
          <p className={styles.ninePillarsSubtitle}>
            <Translate id="homepage.ninePillars.subtitle">
              Elite warriors, each mastering unique Breathing Styles to protect humanity from demons
            </Translate>
          </p>
        </div>

        {/* Pillars List */}
        <div className={styles.ninePillarsList}>
          {pillarWarriorsData.map((pillar, index) => (
            <section
              key={pillar.id}
              className={`${styles.ninePillarItem} ${
                index % 2 === 0 ? '' : styles.ninePillarItemReverse
              }`}
            >
              {/* Content Side */}
              <div className={`${styles.ninePillarContent} ${index % 2 === 0 ? styles.contentOrder2 : styles.contentOrder1}`}>
                <div 
                  className={styles.ninePillarBadge}
                  data-color={pillar.color}
                >
                  {pillar.title}
                </div>
                <h2 
                  className={styles.ninePillarName}
                  data-color={pillar.color}
                >
                  {pillar.name} <br />
                  <span style={{ fontSize: '0.5em', opacity: 0.8 }}>{pillar.nameEn}</span>
                </h2>
                <div className={styles.ninePillarBreathingStyle}>
                  <span className="material-symbols-outlined">swords</span>
                  Breathing Style: {pillar.breathing}
                </div>
                <p 
                  className={styles.ninePillarQuote}
                  data-color={pillar.color}
                >
                  {pillar.description}
                </p>
              </div>

              {/* Image Side - Hashira Style Card */}
              <div className={`${styles.ninePillarVisual} ${index % 2 === 0 ? styles.contentOrder1 : styles.contentOrder2}`}>
                <div 
                  className={`${styles.ninePillarImageWrap} ${flippingPillar === pillar.id ? styles.ninePillarFlipping : ''}`}
                  data-color={pillar.color}
                  onClick={() => togglePillarImage(pillar.id)}
                >
                  <div className={styles.ninePillarLightSlit}></div>
                  <div className={styles.ninePillarCardBorder}></div>
                  <div className={`${styles.ninePillarAura} ${styles[`ninePillarAura${pillar.color}`]}`}></div>
                  <img
                    src={getPillarImage(pillar)}
                    alt={pillar.name}
                    className={styles.ninePillarImage}
                  />
                  <div className={styles.ninePillarCardInfo}>
                    <div className={styles.ninePillarCardName}>{pillar.name}</div>
                    <div className={`${styles.ninePillarCardTitle} ${styles[`ninePillarCardTitle${pillar.color}`]}`}>
                      {pillar.title}
                    </div>
                  </div>
                </div>
                <div className={styles.ninePillarBgText}>
                  {pillar.title.split(' ')[0].toUpperCase()}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* Hashira Selection Section */}
      <section className={styles.hashiraSection}>
        <div className={styles.hashiraContainer}>
          {/* Background Elements */}
          <div className={styles.mangaLines}></div>
          <div className={styles.bgKanji}>滅</div>

          {/* Header */}
          <header className={styles.hashiraHeader}>
            <div className={styles.hashiraBadge}>Final Selection</div>
            <h2 className={styles.hashiraTitle}>
              Choose Your <span className={styles.hashiraTitleHighlight}>Hashira</span>
            </h2>
            <p className={styles.hashiraSubtitle}>
              Select a pillar of the Demon Slayer Corps. Each Hashira possesses unique Breathing Styles and unmatched combat prowess to face the Kizuki.
            </p>
          </header>

          {/* Selection Grid */}
          <div className={styles.hashiraGrid}>
            {/* Row 1: 4 Characters */}
            <div className={`${styles.hashiraRow} ${styles.hashiraRow4}`}>
              {hashiraData.slice(0, 4).map((hashira, index) => (
                <div
                  key={hashira.id}
                  className={`${styles.hashiraCard} ${index % 2 === 0 ? styles.hashiraStaggerOdd : styles.hashiraStaggerEven}`}
                  onClick={() => setSelectedHashira(hashira)}
                >
                  <div className={styles.hashiraCardContent}>
                    <div className={`${styles.hashiraAura} ${styles[`hashiraAura${hashira.color}`]}`}></div>
                    <div className={styles.hashiraCardBorder}></div>
                    <img
                      src={hashira.image}
                      alt={`${hashira.name} - ${hashira.title}`}
                      className={styles.hashiraPortrait}
                    />
                    <div className={styles.hashiraCardInfo}>
                      <div className={styles.hashiraName}>{hashira.name}</div>
                      <div className={`${styles.hashiraRank} ${styles[`hashiraRank${hashira.color}`]}`}>
                        {hashira.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: 5 Characters */}
            <div className={`${styles.hashiraRow} ${styles.hashiraRow5}`}>
              {hashiraData.slice(4, 9).map((hashira, index) => (
                <div
                  key={hashira.id}
                  className={`${styles.hashiraCard} ${index % 2 === 0 ? styles.hashiraStaggerEven : styles.hashiraStaggerOdd}`}
                  onClick={() => setSelectedHashira(hashira)}
                >
                  <div className={styles.hashiraCardContent}>
                    <div className={`${styles.hashiraAura} ${styles[`hashiraAura${hashira.color}`]}`}></div>
                    <div className={styles.hashiraCardBorder}></div>
                    <img
                      src={hashira.image}
                      alt={`${hashira.name} - ${hashira.title}`}
                      className={styles.hashiraPortrait}
                    />
                    <div className={styles.hashiraCardInfo}>
                      <div className={styles.hashiraName}>{hashira.name}</div>
                      <div className={`${styles.hashiraRank} ${styles[`hashiraRank${hashira.color}`]}`}>
                        {hashira.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Board */}
          <div className={styles.hashiraInfoBoard}>
            <div className={styles.hashiraInfoContent}>
              <div className={styles.hashiraActiveBadge}>Active Mission</div>
              <div className={styles.hashiraInfoGrid}>
                <div className={styles.hashiraInfoImage}>
                  <img
                    src={selectedHashira.image}
                    alt={selectedHashira.name}
                    className={styles.hashiraSelectedImage}
                  />
                </div>
                <div className={styles.hashiraInfoDetails}>
                  <h3 className={styles.hashiraSelectedTitle}>
                    Selected: <span className={styles.hashiraSelectedName}>{selectedHashira.title}</span>
                  </h3>
                  <div className={styles.hashiraBreathingStyle}>
                    <span className="material-symbols-outlined">swords</span>
                    Breathing Style: {selectedHashira.breathing}
                  </div>
                  <p className={styles.hashiraQuote}>{selectedHashira.quote}</p>
                  <button className={styles.hashiraConfirmButton}>
                    Confirm Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comic Panel Blog Section */}
      <section className={styles.comicPanelSection}>
        <div className={styles.comicContainer}>
          <h2 className={styles.comicTitle}>
            <Translate id="homepage.blog.title">LATEST CHAPTERS</Translate>
          </h2>
          
          <div className={styles.comicGrid}>
            {/* Large Panel */}
            <Link to="/blog" className={styles.comicPanelLarge}>
              <div className={styles.panelBadge}>
                <Translate id="homepage.blog.featured.badge">TUTORIAL</Translate>
              </div>
              <h3 className={styles.panelTitle}>
                <Translate id="homepage.blog.featured.title">
                  Thunder Breathing: Seventh Form - Honoikazuchi no Kami (The API God)
                </Translate>
              </h3>
              <div className={styles.panelImage}>
                <img src="/img/blog/blog-1.jpg" alt="Tutorial" className={styles.panelImageReal} />
              </div>
              <p className={styles.panelDescription}>
                <Translate id="homepage.blog.featured.description">
                  Learn how to execute lightning-fast queries that would make Zenitsu proud. We explore async optimization and reactive patterns for the modern web demon hunter...
                </Translate>
              </p>
              <div className={styles.panelReadMore}>
                <Translate id="homepage.blog.readMore">READ MORE</Translate> <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </Link>
            
            {/* Right Stack Panels */}
            <div className={styles.comicPanelStack}>
              <Link to="/blog" className={styles.comicPanelSmall1}>
                <div className={styles.panelBadgeSmall}>
                  <Translate id="homepage.blog.post1.badge">Opinion</Translate>
                </div>
                <h4 className={styles.panelTitleSmall}>
                  <Translate id="homepage.blog.post1.title">
                    Why CSS Grid is basically Constant Concentration
                  </Translate>
                </h4>
                <p className={styles.panelDescSmall}>
                  <Translate id="homepage.blog.post1.description">
                    Maintaining layout state is like maintaining your breathing while sleeping...
                  </Translate>
                </p>
                <div className={styles.panelLinkSmall}>
                  <Translate id="homepage.blog.readEpisode">Read Episode</Translate>
                </div>
              </Link>
              
              <Link to="/blog" className={styles.comicPanelSmall2}>
                <div className={styles.panelBadgeSmall}>
                  <Translate id="homepage.blog.post2.badge">Review</Translate>
                </div>
                <h4 className={styles.panelTitleSmall}>
                  <Translate id="homepage.blog.post2.title">
                    Nichirin Keyboards: Mechanical Switch Quest
                  </Translate>
                </h4>
                <p className={styles.panelDescSmall}>
                  <Translate id="homepage.blog.post2.description">
                    Forging the perfect typing experience with color-changing LEDs...
                  </Translate>
                </p>
                <div className={styles.panelLinkSmall}>
                  <Translate id="homepage.blog.readEpisode">Read Episode</Translate>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Bottom Comic Strip */}
          <div className={styles.comicStrip}>
            {[
              { 
                titleId: 'homepage.blog.strip1.title',
                title: 'Zero to Pillar: Rust Basics', 
                timeId: 'homepage.blog.strip1.time',
                time: '5 MIN READ', 
                img: '/img/blog/blog-2.jpg' 
              },
              { 
                titleId: 'homepage.blog.strip2.title',
                title: 'Recovery Training: Coffee Guide', 
                timeId: 'homepage.blog.strip2.time',
                time: '8 MIN READ', 
                img: '/img/blog/blog-3.jpg' 
              },
              { 
                titleId: 'homepage.blog.strip3.title',
                title: 'Visualizing Blood Demon Arts with D3', 
                timeId: 'homepage.blog.strip3.time',
                time: '12 MIN READ', 
                img: '/img/blog/blog-4.jpg' 
              },
            ].map((item, index) => (
              <Link key={index} to="/blog" className={styles.comicStripCard}>
                <div className={styles.stripImage}>
                  <img src={item.img} alt={item.title} className={styles.stripImageReal} />
                </div>
                <h4 className={styles.stripTitle}>
                  <Translate id={item.titleId}>{item.title}</Translate>
                </h4>
                <span className={styles.stripTime}>
                  <Translate id={item.timeId}>{item.time}</Translate>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAB for Newsletter */}
      <Link to="/contact" className={styles.fab}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          mail
        </span>
      </Link>
    </Layout>
  );
}
