import { useState, useCallback } from 'react';
import { burstConfetti } from './confetti';

export interface QuizStrings {
  heading: string;
  restart: string; yes: string; no: string;
  resultBoy: string; resultGirl: string;
  share: string; disclaimer: string; progress: string;
}

interface Question {
  text: string;
  /** Weight added to each side for the answer. */
  a: 'boy' | 'girl';
  emoji: string;
}

const QUESTIONS: Question[] = [
  { text: 'My pregnancy belly sits low.', a: 'boy', emoji: '🤰' },
  { text: 'I crave salty and savory snacks.', a: 'boy', emoji: '🧂' },
  { text: 'I crave sweets and chocolate.', a: 'girl', emoji: '🍫' },
  { text: 'My morning sickness is intense.', a: 'girl', emoji: '🤢' },
  { text: 'My hair looks extra glossy and thick.', a: 'boy', emoji: '💇‍♀️' },
  { text: 'My left breast looks bigger than my right.', a: 'girl', emoji: '🍼' },
  { text: 'The ring test swings in circles over my belly.', a: 'girl', emoji: '💍' },
  { text: 'My urine glows bright yellow (bright, neon-ish).', a: 'boy', emoji: '🧪' },
  { text: 'The mood swings are real!', a: 'girl', emoji: '🎭' },
  { text: 'I am exhausted all the time (extra sleepy).', a: 'boy', emoji: '😴' },
  { text: 'My dreams feel calm and serene lately.', a: 'girl', emoji: '🌙' },
  { text: 'My skin broke out more than usual.', a: 'girl', emoji: '✨' },
];

/** Old wives' tales quiz island — pure fun, tallies folklore points. */
export default function GenderQuiz({ strings }: { strings: QuizStrings }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0); // negative = girl side, positive = boy side
  const [done, setDone] = useState(false);

  const answer = useCallback((q: Question) => {
    setScore((s) => s + (q.a === 'boy' ? 1 : -1));
    if (step + 1 >= QUESTIONS.length) {
      setDone(true);
    }
    setStep((s) => s + 1);
  }, [step]);

  const restart = () => {
    setStep(0);
    setScore(0);
    setDone(false);
  };

  const total = QUESTIONS.length;
  const guessed = done ? (score === 0 ? (Math.random() < 0.5 ? 'boy' : 'girl') : score > 0 ? 'boy' : 'girl') : null;

  if (done) {
    const pct = Math.round((Math.abs(score) / total) * 50 + 50);
    void guessed;
    const isBoy = (guessed ?? 'boy') === 'boy';
    burstConfetti(guessed ?? 'boy');
    return (
      <div className={`calculator-card p-8 text-center ${isBoy ? 'ring-2 ring-boy-200' : 'ring-2 ring-girl-200'}`}>
        <p className="text-6xl" aria-hidden="true">{isBoy ? '🩵' : '🩷'}</p>
        <h3 className="mt-3 font-display text-3xl font-extrabold text-plum-900">
          {pct}% {isBoy ? strings.resultBoy : strings.resultGirl}
        </h3>
        <p className="mt-2 text-sm text-plum-600">
          {strings.progress}: {stepsSummary(score, total)}
        </p>
        <div className="mx-auto mt-4 h-4 max-w-sm overflow-hidden rounded-full bg-gradient-to-r from-boy-400 to-girl-400" aria-hidden="true">
          <div className="h-full bg-white/60" style={{ width: `${pct}%` }}></div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={restart} className="btn-primary">↻ {strings.restart}</button>
          <button
            type="button"
            onClick={() => {
              const text = `Old wives' tales say: ${pct}% ${isBoy ? 'BOY 💙' : 'GIRL 💗'} — try the quiz at chinesebabypredictor.com/gender-quiz/`;
              if (navigator.share) void navigator.share({ text });
              else void navigator.clipboard.writeText(text);
            }}
            className="btn-secondary"
          >
            🔗 {strings.share}
          </button>
        </div>
        <p className="mt-5 text-xs font-semibold text-plum-500">{strings.disclaimer}</p>
      </div>
    );
  }

  const q = QUESTIONS[step];
  if (!q) return null;

  return (
    <div className="calculator-card p-6 sm:p-8">
      <div aria-live="polite">
        <p className="font-display text-xs font-extrabold uppercase tracking-widest text-girl-400">
          {strings.heading} · {step + 1}/{total}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold text-plum-900 sm:text-3xl">
          <span aria-hidden="true">{q.emoji}</span> {q.text}
        </h3>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => answer(q)} className="btn-primary">✓ {strings.yes}</button>
          <button type="button" onClick={() => { setStep((s) => s + 1); }} className="btn-secondary">✗ {strings.no}</button>
        </div>
        <div className="mx-auto mt-6 h-2.5 max-w-md overflow-hidden rounded-full bg-cream-200">
          <div className="h-full rounded-full bg-gradient-to-r from-girl-400 to-boy-400 transition-all duration-500"
               style={{ width: `${(step / total) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function stepsSummary(score: number, total: number): string {
  const boyish = Math.round(((score + total) / 2 / total) * 100);
  return `${boyish}% blue signals`;
}
