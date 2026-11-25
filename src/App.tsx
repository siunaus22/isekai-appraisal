import { useEffect, useRef, useState } from 'react';
import { ClassEmblemSvg, GoddessAvatarSvg } from './components/SvgIcons';
import {
  calculateAppraisal,
  INTRO_DIALOGUES,
  QUESTIONS,
  STAT_LABELS,
} from './data/isekaiData';
import {
  isToyEnvironment,
  loadCloudSave,
  loadSharedStats,
  reportClassToSharedStats,
  saveAppraisalToCloud,
  triggerToyShare,
} from './services/bilibiliToy';
import {
  AppraisalResult,
  CloudSaveRecord,
  QuestionOption,
  SharedStats,
  StatKey,
} from './types/game';
import { generateRegistrationPoster } from './utils/posterGenerator';

type Phase = 'intro' | 'quiz' | 'result';

export function App() {
  const [phase, setPhase] = useState<Phase>('intro');

  // Intro typewriter state
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [typedLen, setTypedLen] = useState(0);

  // Quiz state
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<QuestionOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<QuestionOption | null>(null);
  const autoNextTimerRef = useRef<number | null>(null);

  // Result & Cloud state
  const [result, setResult] = useState<AppraisalResult | null>(null);
  const [cloudSave, setCloudSave] = useState<CloudSaveRecord | null>(null);
  const [sharedStats, setSharedStats] = useState<SharedStats | null>(null);
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [showPosterModal, setShowPosterModal] = useState(false);

  const currentDialogue = INTRO_DIALOGUES[dialogueIdx];
  const isDialogueComplete = typedLen >= currentDialogue.text.length;

  // Typewriter effect for intro
  useEffect(() => {
    if (phase !== 'intro') return;
    setTypedLen(0);
    const fullText = INTRO_DIALOGUES[dialogueIdx].text;
    const timer = window.setInterval(() => {
      setTypedLen((prev) => {
        if (prev >= fullText.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 32);
    return () => window.clearInterval(timer);
  }, [phase, dialogueIdx]);

  // Load initial cloud save once on mount
  useEffect(() => {
    loadCloudSave().then(setCloudSave);
    loadSharedStats().then(setSharedStats);
  }, []);

  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) {
        window.clearTimeout(autoNextTimerRef.current);
      }
    };
  }, []);

  const handleIntroAdvance = () => {
    if (!isDialogueComplete) {
      setTypedLen(currentDialogue.text.length);
      return;
    }
    if (dialogueIdx < INTRO_DIALOGUES.length - 1) {
      setDialogueIdx((prev) => prev + 1);
    } else {
      setPhase('quiz');
    }
  };

  const advanceToNextQuestion = (nextAnswers: QuestionOption[]) => {
    if (autoNextTimerRef.current) {
      window.clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    setSelectedOption(null);

    if (questionIdx < QUESTIONS.length - 1) {
      setQuestionIdx((prev) => prev + 1);
    } else {
      const appraisal = calculateAppraisal(nextAnswers);
      setResult(appraisal);
      setPhase('result');

      // 仅在结算节点批量写入云存档与共享统计，避免频繁请求
      saveAppraisalToCloud(appraisal).then(setCloudSave);
      reportClassToSharedStats(appraisal.isekaiClass.id).then(setSharedStats);
    }
  };

  const handleSelectOption = (opt: QuestionOption) => {
    if (selectedOption) return;
    const nextAnswers = [...answers, opt];
    setAnswers(nextAnswers);
    setSelectedOption(opt);

    autoNextTimerRef.current = window.setTimeout(() => {
      advanceToNextQuestion(nextAnswers);
    }, 1150);
  };

  const handleSkipReaction = () => {
    if (!selectedOption) return;
    advanceToNextQuestion(answers);
  };

  const handleGeneratePoster = () => {
    if (!result) return;
    const url = generateRegistrationPoster(result);
    setPosterUrl(url);
    setShowPosterModal(true);
  };

  const handleDownloadPoster = () => {
    if (!posterUrl || !result) return;
    const link = document.createElement('a');
    link.href = posterUrl;
    link.download = `异世界冒险者登记证-${result.isekaiClass.name}.png`;
    link.click();
  };

  const handleShare = async () => {
    if (!result) return;
    const shared = await triggerToyShare(result);
    if (!shared) {
      handleGeneratePoster();
    }
  };

  const handleRestart = () => {
    setPhase('quiz');
    setQuestionIdx(0);
    setAnswers([]);
    setSelectedOption(null);
    setResult(null);
    setPosterUrl('');
    setShowPosterModal(false);
  };

  const currentQuestion = QUESTIONS[questionIdx];
  const progressPercent = ((questionIdx + (selectedOption ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="app-shell">
      <main className="parchment-card">
        <header className="guild-banner">
          <h1>异世界转生资质鉴定所</h1>
          <div className="sub">ISEKAI REINCARNATION GUILD · APPRAISAL</div>
        </header>

        {phase === 'intro' && (
          <section className="goddess-stage">
            <GoddessAvatarSvg className="goddess-avatar" />
            <div className="dialogue-box" onClick={handleIntroAdvance}>
              <span className="speaker-tag">{currentDialogue.speaker}</span>
              <p className="dialogue-text">
                {currentDialogue.text.slice(0, typedLen)}
                {!isDialogueComplete && <span className="cursor-blink" />}
              </p>
            </div>
            <button className="btn-primary" onClick={handleIntroAdvance}>
              {!isDialogueComplete
                ? '跳过打字机'
                : dialogueIdx < INTRO_DIALOGUES.length - 1
                  ? '继续对话'
                  : '开始 8 道灵魂抉择'}
            </button>
            {cloudSave && cloudSave.totalAttempts > 0 && (
              <p style={{ fontSize: '0.76rem', color: '#7d5b3b', marginTop: 10, marginBottom: 0 }}>
                已解锁图鉴职业：{cloudSave.unlockedClasses.length} / 10 · 累计鉴定 {cloudSave.totalAttempts} 次
              </p>
            )}
          </section>
        )}

        {phase === 'quiz' && currentQuestion && (
          <section key={currentQuestion.id} className="quiz-page">
            <div className="progress-header">
              <span>{currentQuestion.chapter}</span>
              <span>
                {questionIdx + 1} / {QUESTIONS.length}
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="scene-pill">{currentQuestion.scene}</div>
            <h2 className="question-prompt">{currentQuestion.prompt}</h2>

            <div className="options-list">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                    disabled={Boolean(selectedOption)}
                    onClick={() => handleSelectOption(opt)}
                  >
                    <div className="option-top">
                      <span>选项 {opt.id}</span>
                      <span>【{opt.tag}】</span>
                    </div>
                    <div className="option-text">{opt.text}</div>
                  </button>
                );
              })}
            </div>

            {selectedOption && (
              <div className="reaction-panel" onClick={handleSkipReaction}>
                <GoddessAvatarSvg className="reaction-mini-avatar" />
                <div className="reaction-body">
                  <div>
                    <strong>莉莉娅吐槽：</strong>
                    {selectedOption.goddessReaction}
                  </div>
                  <div className="reaction-hint">正在翻页（点击立即继续）…</div>
                </div>
              </div>
            )}
          </section>
        )}

        {phase === 'result' && result && (
          <section className="quiz-page">
            <div className="result-header">
              <ClassEmblemSvg
                type={result.isekaiClass.iconType}
                color={result.isekaiClass.accentColor}
                className="class-emblem"
              />
              <div className="class-meta">
                <div className="kicker">登记编号：{result.adventurerId}</div>
                <h2>{result.isekaiClass.name}</h2>
                <div className="subtitle" style={{ color: result.isekaiClass.accentColor }}>
                  {result.isekaiClass.title}
                </div>
              </div>
              <div className="stamp-seal">{result.isekaiClass.stampText}</div>
            </div>

            <p className="class-desc">{result.isekaiClass.description}</p>

            <div className="skill-box">
              <div className="skill-title-row">
                <span className={`tier-badge tier-${result.skill.tier}`}>{result.skill.tier}</span>
                <span className="skill-name">{result.skill.name}</span>
              </div>
              <p className="skill-desc">{result.skill.description}</p>
            </div>

            <div className="stats-section-header">
              <span>六维资质面板</span>
              <span className="survival-badge">预计存活：{result.survivalDays} 天</span>
            </div>
            <div className="stats-grid">
              {(Object.keys(STAT_LABELS) as StatKey[]).map((key) => {
                const val = result.stats[key];
                const meta = STAT_LABELS[key];
                return (
                  <div key={key} className="stat-item">
                    <div className="stat-label-row">
                      <span>
                        {meta.label} ({meta.short})
                      </span>
                      <span>{val}</span>
                    </div>
                    <div className="stat-bar-track">
                      <div
                        className={`stat-bar-fill ${key === 'abs' ? 'is-abs' : ''}`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="comment-box">
              <strong>公会会长评语：</strong>
              {result.isekaiClass.guildMasterComment}
            </div>

            <div className="cloud-stats-bar">
              <span>
                全服已鉴定 {sharedStats?.totalAppraisals ?? '--'} 人 · 同职业{' '}
                {sharedStats?.classCounts[result.isekaiClass.id] ?? '--'} 人
              </span>
              <span>{isToyEnvironment() ? 'B站云存档已同步' : '本地存档模式'}</span>
            </div>

            <div className="action-row">
              <button className="btn-primary" onClick={handleGeneratePoster}>
                生成登记证长图
              </button>
              <button className="btn-secondary" onClick={handleShare}>
                {isToyEnvironment() ? '分享到 B 站' : '保存 / 分享'}
              </button>
            </div>
            <button className="btn-secondary" style={{ marginTop: 10 }} onClick={handleRestart}>
              不服！再被卡车撞一次（重新鉴定）
            </button>
          </section>
        )}
      </main>

      {showPosterModal && posterUrl && (
        <div className="poster-modal-backdrop" onClick={() => setShowPosterModal(false)}>
          <div className="poster-modal" onClick={(e) => e.stopPropagation()}>
            <img src={posterUrl} alt="异世界冒险者登记证" />
            <div className="poster-modal-actions">
              <button className="btn-primary" style={{ marginTop: 0 }} onClick={handleDownloadPoster}>
                保存长图 PNG
              </button>
              <button className="btn-secondary" onClick={() => setShowPosterModal(false)}>
                关闭预览
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
