import { useState, useEffect, useRef } from "react";
import * as italianData from "./data";
import * as koreanData from "./korean_data";
import * as hebrewData from "./hebrew_data";
import * as spanishData from "./spanish_data";
import * as englishData from "./english_data";
import * as russianData from "./russian_data";
import * as portugueseData from "./portuguese_data";
import * as frenchData from "./french_data";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// ── UTILITY ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// The frontend now makes secure POST requests to the Vercel backend.
// The true GEMINI_API_KEY lives entirely out-of-bounds in the Vercel environment variables.
async function callGemini(messages, system = "") {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, system }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP Error ${response.status}`);
    }

    const data = await response.json();
    if (!data.result) {
      throw new Error('Invalid response structure from backend handler');
    }

    return data.result;
  } catch (err) {
    console.error("Gemini Proxy Error:", err);
    throw err;
  }
}

// Removed ApiKeyManager component since keys are managed server-side

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function Badge({ children, color }) {
  const colors = {
    noun: "#e8d5b7",
    verb: "#b7d5e8",
    adjective: "#d5b7e8",
    adverb: "#b7e8cc",
    preposition: "#e8ccb7",
    conjunction: "#e8e8b7",
    pronoun: "#f0c4c4",
    number: "#c4f0e8",
  };
  return (
    <span
      style={{
        background: colors[color] || "#ddd",
        color: "#333",
        padding: "2px 8px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      {children}
    </span>
  );
}

// ── VOCABULARY TAB ────────────────────────────────────────────────────────────
function VocabularyTab({ data, gainXP }) {
  const [mode, setMode] = useState("flashcard"); // flashcard | multiple | conjugation
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState(() => shuffle(data.VOCABULARY));
  const [mcq, setMcq] = useState(null);
  const [mcqAnswer, setMcqAnswer] = useState(null);
  const [conjIdx, setConjIdx] = useState(0);
  const [conjAnswers, setConjAnswers] = useState({});
  const [conjChecked, setConjChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const defaultTopics = [...new Set(data.VOCABULARY.map(v => v.topic || "Misc & Core Vocab"))];
  const baseProgression = data.PROGRESSION || [];
  const wordTopics = [...new Set([...baseProgression.filter(t => defaultTopics.includes(t)), ...defaultTopics])];
  const [typeFilter, setTypeFilter] = useState(wordTopics[0] || "all");

  const filteredCards = typeFilter === "all" ? cards : cards.filter(c => c.topic === typeFilter);
  const card = filteredCards[cardIdx % (filteredCards.length || 1)] || cards[0];

  function generateMcq(fromCards) {
    const pool = shuffle(fromCards);
    const correct = pool[0];
    const wrong = shuffle(pool.slice(1)).slice(0, 3);
    const opts = shuffle([correct, ...wrong]);
    return { correct, opts };
  }

  useEffect(() => {
    // If language changes, reset cards for the new vocabulary pool
    const dTopics = [...new Set(data.VOCABULARY.map(v => v.topic || "Misc & Core Vocab"))];
    const bProgression = data.PROGRESSION || [];
    const newTopics = [...new Set([...bProgression.filter(t => dTopics.includes(t)), ...dTopics])];
    setCards(shuffle(data.VOCABULARY));
    setCardIdx(0);
    setFlipped(false);
    setTypeFilter(newTopics[0] || "all");
    setMode("flashcard");
    setScore({ correct: 0, total: 0 });
  }, [data.VOCABULARY]);

  useEffect(() => {
    if (mode === "multiple") {
      setMcq(generateMcq(shuffle(data.VOCABULARY)));
      setMcqAnswer(null);
    }
    if (mode === "conjugation") {
      setConjIdx(Math.floor(Math.random() * data.CONJUGATIONS.length));
      setConjAnswers({});
      setConjChecked(false);
    }
  }, [mode, data]);

  const conj = data.CONJUGATIONS?.[conjIdx];

  const handleConjCheck = () => {
    let c = 0;
    conj.forms.forEach((f) => {
      if ((conjAnswers[f.pronoun] || "").trim().toLowerCase() === f.form.toLowerCase()) c++;
    });
    setScore((s) => ({ correct: s.correct + c, total: s.total + conj.forms.length }));
    setConjChecked(true);
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {wordTopics.map(t => {
          const count = t === "all" ? data.VOCABULARY.length : data.VOCABULARY.filter(v => v.topic === t).length;
          if (count === 0 && t !== "all") return null;
          return (
            <button key={t} onClick={() => { setTypeFilter(t); setCardIdx(0); setFlipped(false); }}
              style={{ padding: "4px 12px", borderRadius: 14, border: typeFilter === t ? "none" : "1px solid #ddd", background: typeFilter === t ? "#8b6914" : "#f5f0e8", color: typeFilter === t ? "#fff" : "#555", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600 }}>
              {t === "all" ? `All (${count})` : `${t} (${count})`}
            </button>
          )
        })}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {["flashcard", "multiple", ...(data.CONJUGATIONS && data.CONJUGATIONS.length > 0 ? ["conjugation"] : [])].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setFlipped(false); }}
            style={{
              padding: "8px 18px",
              borderRadius: 20,
              border: mode === m ? "none" : "1px solid #8b6914",
              background: mode === m ? "#8b6914" : "transparent",
              color: mode === m ? "#fff" : "#8b6914",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
              fontSize: 13,
              transition: "all 0.2s",
            }}
          >
            {m === "flashcard" ? "🃏 Flashcards" : m === "multiple" ? "✅ Multiple Choice" : "🔤 Conjugation"}
          </button>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 13, color: "#666", alignSelf: "center" }}>
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {mode === "flashcard" && (
        <div>
          <div
            className="flashcard-box"
            onClick={() => setFlipped(!flipped)}
            style={{
              background: flipped ? "#8b6914" : "#fff",
              color: flipped ? "#fff" : "#222",
              border: "2px solid #d4a017",
              borderRadius: 16,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 32,
              boxShadow: "0 4px 20px rgba(139,105,20,0.15)",
            }}
          >
            {card.topic && <Badge color={card.topic}>{card.topic}</Badge>}
            <div className="flashcard-word" style={{ fontSize: 36, fontWeight: 700, marginTop: 16, textAlign: "center", transition: "all 0.2s" }}>
              {flipped ? card.en : (card.it || card.es || card.he || card.kr || card.ru || card.fr || card.pt || card.en)}
            </div>
            {!flipped && card.rom && <div style={{ fontSize: 18, color: "#666", marginTop: 8 }}>{card.rom}</div>}
            {!flipped && <div style={{ marginTop: 12, fontSize: 13, color: "#999" }}>Click to reveal</div>}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: "center" }}>
            <button
              onClick={() => { setCardIdx((i) => (i - 1 + filteredCards.length) % filteredCards.length); setFlipped(false); }}
              style={btnStyle("#fff", "#8b6914")}
            >← Prev</button>
            <button
              onClick={() => { setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 })); setCardIdx((i) => (i + 1) % filteredCards.length); setFlipped(false); gainXP(2, `vocab-flash-${card.en}`); }}
              style={btnStyle("#4caf50", "#fff")}
            >✓ Knew it</button>
            <button
              onClick={() => { setScore((s) => ({ correct: s.correct, total: s.total + 1 })); setCardIdx((i) => (i + 1) % filteredCards.length); setFlipped(false); }}
              style={btnStyle("#e53935", "#fff")}
            >✗ Missed</button>
            <button
              onClick={() => { setCardIdx((i) => (i + 1) % filteredCards.length); setFlipped(false); }}
              style={btnStyle("#fff", "#8b6914")}
            >Next →</button>
          </div>
          <div style={{ textAlign: "center", marginTop: 12, color: "#888", fontSize: 13 }}>
            {cardIdx + 1} / {filteredCards.length}
          </div>
        </div>
      )}

      {mode === "multiple" && mcq && (
        <div>
          <div style={{ fontSize: 18, color: "#555", marginBottom: 8 }}>What does this mean?</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#222", marginBottom: 8 }}>{mcq.correct.it || mcq.correct.es || mcq.correct.he || mcq.correct.kr || mcq.correct.ru || mcq.correct.fr || mcq.correct.pt || mcq.correct.en}</div>
          {mcq.correct.rom && <div style={{ fontSize: 18, color: "#666", marginBottom: 8 }}>{mcq.correct.rom}</div>}
          {mcq.correct.topic && <Badge color={mcq.correct.topic}>{mcq.correct.topic}</Badge>}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
            {mcq.opts.map((opt, i) => {
              const isCorrect = opt.en === mcq.correct.en;
              const isSelected = mcqAnswer?.en === opt.en;
              let bg = "#fff", border = "1.5px solid #ddd";
              if (mcqAnswer) {
                if (isCorrect) { bg = "#e8f5e9"; border = "2px solid #4caf50"; }
                else if (isSelected && !isCorrect) { bg = "#ffebee"; border = "2px solid #e53935"; }
              }
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (mcqAnswer) return;
                    setMcqAnswer(opt);
                    const correct = opt.en === mcq.correct.en;
                    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
                    if (correct) gainXP(5, `vocab-mcq-${mcq.correct.en}`);
                  }}
                  style={{ padding: "14px 20px", borderRadius: 10, border, background: bg, textAlign: "left", cursor: mcqAnswer ? "default" : "pointer", fontFamily: "inherit", fontSize: 16, transition: "all 0.2s" }}
                >
                  {opt.en}
                </button>
              );
            })}
          </div>
          {mcqAnswer && (
            <button
              onClick={() => { setMcq(generateMcq(shuffle(data.VOCABULARY))); setMcqAnswer(null); }}
              style={{ ...btnStyle("#8b6914", "#fff"), marginTop: 20, width: "100%" }}
            >Next Question →</button>
          )}
        </div>
      )}

      {mode === "conjugation" && conj && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 26, fontWeight: 700 }}>{conj.verb}</span>
            <span style={{ color: "#666", marginLeft: 10 }}>{conj.en} — {conj.tense}</span>
          </div>
          <div className="conj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {conj.forms.map((f) => {
              const val = conjAnswers[f.pronoun] || "";
              const correct = val.trim().toLowerCase() === f.form.toLowerCase();
              return (
                <div key={f.pronoun} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: conjChecked ? (correct ? "2px solid #4caf50" : "2px solid #e53935") : "1.5px solid #ddd", background: conjChecked ? (correct ? "#f1f8f1" : "#fff5f5") : "#fff" }}>
                  <span style={{ fontWeight: 600, minWidth: 60, color: "#8b6914" }}>{f.pronoun}</span>
                  {conjChecked ? (
                    <span style={{ fontWeight: 700, color: correct ? "#2e7d32" : "#c62828" }}>
                      {correct ? f.form : <><s style={{ color: "#999" }}>{val}</s> → {f.form}</>}
                    </span>
                  ) : (
                    <input
                      value={val}
                      onChange={(e) => setConjAnswers({ ...conjAnswers, [f.pronoun]: e.target.value })}
                      placeholder="type form..."
                      style={{ border: "none", borderBottom: "1.5px solid #ccc", outline: "none", fontFamily: "inherit", fontSize: 15, flex: 1, padding: "2px 4px", background: "transparent", width: "100%" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          {!conjChecked ? (
            <button onClick={handleConjCheck} style={{ ...btnStyle("#8b6914", "#fff"), marginTop: 20, width: "100%" }}>Check Answers</button>
          ) : (
            <button onClick={() => { setConjIdx((conjIdx + 1) % data.CONJUGATIONS.length); setConjAnswers({}); setConjChecked(false); }} style={{ ...btnStyle("#8b6914", "#fff"), marginTop: 20, width: "100%" }}>Next Verb →</button>
          )}
        </div>
      )}
    </div>
  );
}

// ── GRAMMAR ANALYSIS TAB ──────────────────────────────────────────────────────
function GrammarTab({ data, gainXP }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const q = data.GRAMMAR_QUESTIONS[qIdx];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQIdx(0);
    setSelected(null);
    setScore({ correct: 0, total: 0 });
  }, [data.GRAMMAR_QUESTIONS]);

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === q.answer;
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    if (correct) gainXP(10, `grammar-${q.sentence}`);
  };

  if (!q) return <div style={{ padding: "20px 0" }}>No grammar questions available for this language yet.</div>;

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#888" }}>Question {qIdx + 1} of {data.GRAMMAR_QUESTIONS.length}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#8b6914" }}>Score: {score.correct}/{score.total}</div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #fdf6e3, #fff9ee)", border: "1px solid #d4a017", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontStyle: "italic", color: "#222", marginBottom: 6 }}>"{q.sentence}"</div>
        <div style={{ fontSize: 14, color: "#666" }}>{q.en}</div>
      </div>

      <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 14 }}>{q.question}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isSelected = selected === i;
          let bg = "#fff", border = "1.5px solid #ddd", color = "#333";
          if (selected !== null) {
            if (isCorrect) { bg = "#e8f5e9"; border = "2px solid #4caf50"; }
            else if (isSelected) { bg = "#ffebee"; border = "2px solid #e53935"; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{ padding: "13px 18px", borderRadius: 10, border, background: bg, textAlign: "left", cursor: selected !== null ? "default" : "pointer", fontFamily: "inherit", fontSize: 15, color, transition: "all 0.2s" }}>
              <span style={{ fontWeight: 600, marginRight: 8, color: "#8b6914" }}>{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 12, background: "#fffde7", border: "1px solid #f9a825" }}>
          <div style={{ fontWeight: 700, marginBottom: 6, color: selected === q.answer ? "#2e7d32" : "#c62828" }}>
            {selected === q.answer ? "✓ Correct!" : "✗ Not quite."}
          </div>
          <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{q.explanation}</div>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={() => { setQIdx((qIdx + 1) % data.GRAMMAR_QUESTIONS.length); setSelected(null); }}
          style={{ ...btnStyle("#8b6914", "#fff"), marginTop: 16, width: "100%" }}
        >Next Question →</button>
      )}
    </div>
  );
}

// ── SENTENCE BUILDER TAB ──────────────────────────────────────────────────────
function SentenceBuilderTab({ data, languageStr, gainXP }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const prompt = data.SENTENCE_BUILD_PROMPTS[promptIdx];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPromptIdx(0);
    setInput("");
    setFeedback(null);
  }, [data.SENTENCE_BUILD_PROMPTS]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const text = await callGemini(
        [{
          role: "user", content: `You are an expert ${languageStr} language teacher evaluating a student's sentence.
        
Task Prompt: "${prompt.prompt}"
English Hint: "${prompt.en_hint}"
Student's Response: "${input}"

Please provide structured, encouraging feedback in English. Your response should include:
1. **Feedback**: A friendly opening stating if the sentence is correct or has errors.
2. **Corrections**: If there are errors, clearly show the correct spelling and grammar.
3. **Explanation**: Break down the grammar rules or vocabulary nuances involved, explaining *why* the correction is needed.
4. **Example**: Provide 1-2 alternative, natural ways a ${languageStr} native speaker might respond to the prompt.`
        }],
        `You are a friendly, encouraging, and highly detailed ${languageStr} language teacher. Format your response using clean Markdown headers and bullet points for readability.`
      );
      setFeedback(text);
      gainXP(15, `sentence-${prompt.prompt}`);
    } catch {
      setFeedback("Error getting feedback. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ background: "linear-gradient(135deg, #fdf6e3, #fff9ee)", border: "1px solid #d4a017", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: "#8b6914", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Your Task</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 8 }}>{prompt.prompt}</div>
        <div style={{ fontSize: 13, color: "#888" }}>💡 Hint: {prompt.en_hint}</div>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Type your sentence in ${languageStr}...`}
        style={{ width: "100%", minHeight: 100, padding: "14px 16px", borderRadius: 10, border: "1.5px solid #d4a017", fontFamily: "inherit", fontSize: 16, outline: "none", resize: "vertical", boxSizing: "border-box", background: "#fffef9" }}
      />

      <div className="chat-input-row" style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button className="mobile-full-width" onClick={handleSubmit} disabled={loading || !input.trim()} style={{ ...btnStyle("#8b6914", "#fff"), flex: 1, opacity: loading || !input.trim() ? 0.6 : 1 }}>
          {loading ? "Analyzing..." : "Get Feedback"}
        </button>
        <button className="mobile-full-width" onClick={() => { setPromptIdx((promptIdx + 1) % data.SENTENCE_BUILD_PROMPTS.length); setInput(""); setFeedback(null); }} style={btnStyle("#fff", "#8b6914")}>
          New Prompt
        </button>
      </div>

      {feedback && (
        <div style={{ marginTop: 20, padding: "18px 22px", borderRadius: 12, background: "#f8f4ff", border: "1px solid #9c7ebe", whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.7, color: "#333" }}>
          <div style={{ fontWeight: 700, marginBottom: 10, color: "#6a3d9a" }}>📝 Feedback</div>
          {feedback}
        </div>
      )}
    </div>
  );
}

// ── CONVERSATION TAB ──────────────────────────────────────────────────────────
function ConversationTab({ data, languageStr, gainXP }) {
  const [topicIdx] = useState(() => Math.floor(Math.random() * data.CONVERSATION_TOPICS.length));
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [review, setReview] = useState(null);
  const [inlineFeedback, setInlineFeedback] = useState({});
  const [inlineLoading, setInlineLoading] = useState({});
  const [started, setStarted] = useState(false);
  const messagesEnd = useRef(null);
  const topic = data.CONVERSATION_TOPICS[topicIdx];

  useEffect(() => {
    if (messagesEnd.current) messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startConvo = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const opener = await callGemini(
        [{ role: "user", content: `Start a conversation about the topic: "${topic}". Ask me an engaging opening question in ${languageStr}. Keep it natural and not too long.` }],
        `You are a friendly ${languageStr} conversation partner. Respond entirely in ${languageStr}. Keep sentences clear and at an intermediate level.`
      );
      setMessages([{ role: "assistant", content: opener }]);
    } catch (e) {
      alert(e.message);
      setStarted(false);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const reply = await callGemini(
        newMessages,
        `You are a friendly ${languageStr} conversation partner discussing: "${topic}". Always respond in ${languageStr}. Keep the conversation going naturally. If the user makes obvious errors, continue naturally without pointing them out — errors will be reviewed later.`
      );
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      gainXP(10, `chat-${topicIdx}-${newMessages.length}`);
    } catch (e) {
      alert(e.message);
      setMessages(messages);
      setInput(input);
    }
    setLoading(false);
  };

  const checkInlineGrammar = async (msgContent, index) => {
    setInlineLoading((prev) => ({ ...prev, [index]: true }));
    try {
      const fb = await callGemini(
        [{ role: "user", content: `Please perform a detailed grammar check on this ${languageStr} sentence written by a learner: "${msgContent}". Point out errors, explain the grammar rules involved clearly, and provide the corrected version. Format it nicely with markdown. End with a native-sounding alternative example.` }],
        `You are an expert ${languageStr} language teacher doing a detailed error analysis.`
      );
      setInlineFeedback((prev) => ({ ...prev, [index]: fb }));
    } catch (e) {
      alert(e.message);
    }
    setInlineLoading((prev) => ({ ...prev, [index]: false }));
  };

  const endAndReview = async () => {
    setReviewing(true);
    const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content).join("\n\n");
    if (!userMessages) {
      setReview("No user messages to review.");
      return;
    }
    try {
      const reviewText = await callGemini(
        [{ role: "user", content: `Here are the ${languageStr} sentences written by a language learner during a conversation:\n\n${userMessages}\n\nPlease do a thorough grammar and spelling review. For each error, quote the original text, explain the mistake clearly, and provide the corrected version. Organize by type of error (grammar, spelling, accent marks, verb conjugation, honorifics etc.). End with a brief overall assessment and 2-3 specific things they did well. Be constructive and encouraging.` }],
        `You are an expert ${languageStr} language teacher doing a detailed error analysis.`
      );
      setReview(reviewText);
    } catch (e) {
      alert(e.message);
      setReviewing(false);
    }
  };

  if (review) {
    return (
      <div style={{ padding: "20px 0" }}>
        <h3 style={{ color: "#8b6914", marginBottom: 16 }}>📋 Conversation Review</h3>
        <div style={{ padding: "18px 22px", borderRadius: 12, background: "#f8f4ff", border: "1px solid #9c7ebe", whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.8, color: "#333", maxHeight: 500, overflowY: "auto" }}>
          {review}
        </div>
        <button onClick={() => { setMessages([]); setReview(null); setInlineFeedback({}); setInlineLoading({}); setReviewing(false); setStarted(false); }} style={{ ...btnStyle("#8b6914", "#fff"), marginTop: 16, width: "100%" }}>
          Start New Conversation
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ background: "linear-gradient(135deg, #fdf6e3, #fff9ee)", border: "1px solid #d4a017", borderRadius: 14, padding: "14px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#8b6914", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Topic</div>
        <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>💬 {topic}</div>
      </div>

      {!started ? (
        <button onClick={startConvo} style={{ ...btnStyle("#8b6914", "#fff"), width: "100%" }}>
          Start Conversation →
        </button>
      ) : (
        <>
          <div style={{ minHeight: 300, maxHeight: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, marginBottom: 16, padding: "4px 0", overflowX: "hidden" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", width: "100%" }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: m.role === "user" ? "#8b6914" : "#f5f0e8",
                  color: m.role === "user" ? "#fff" : "#333",
                  fontSize: 15,
                  lineHeight: 1.5,
                }}>
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div style={{ marginTop: 4, width: "85%" }}>
                    {!inlineFeedback[i] && (
                      <div style={{ textAlign: "right" }}>
                        <button
                          onClick={() => checkInlineGrammar(m.content, i)}
                          disabled={inlineLoading[i]}
                          style={{
                            fontSize: 12, background: "transparent", border: "none", color: "#8b6914", cursor: inlineLoading[i] ? "default" : "pointer", fontWeight: 600, padding: "2px 6px", opacity: inlineLoading[i] ? 0.6 : 1
                          }}
                        >
                          {inlineLoading[i] ? "⏳ Checking..." : "✨ Check Grammar"}
                        </button>
                      </div>
                    )}
                    {inlineFeedback[i] && (
                      <div style={{ marginTop: 6, padding: "12px 16px", borderRadius: 10, background: "#f8f4ff", border: "1px solid #9c7ebe", fontSize: 13, color: "#333", whiteSpace: "pre-wrap", textAlign: "left", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                        <div style={{ fontWeight: 700, color: "#6a3d9a", marginBottom: 6 }}>📝 Quick Grammar Check</div>
                        {inlineFeedback[i]}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {loading && <div style={{ color: "#999", fontSize: 14, fontStyle: "italic" }}>✍️ Sta scrivendo...</div>}
            <div ref={messagesEnd} />
          </div>

          <div className="chat-input-row" style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              placeholder={`Send a message...`}
              style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: "1.5px solid #d4a017", fontFamily: "inherit", fontSize: 15, outline: "none", background: "#fffef9" }}
            />
            <button className="mobile-full-width" onClick={sendMessage} disabled={loading || !input.trim()} style={{ ...btnStyle("#8b6914", "#fff"), padding: "12px 16px", opacity: loading || !input.trim() ? 0.6 : 1 }}>
              →
            </button>
          </div>
          {messages.length >= 4 && !reviewing && (
            <button className="mobile-full-width" onClick={endAndReview} style={{ ...btnStyle("#6a3d9a", "#fff"), marginTop: 12, width: "100%" }}>
              End & Get Grammar Review
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ── IDIOMS TAB ────────────────────────────────────────────────────────────────
function IdiomsTab({ data, gainXP }) {
  const [expanded, setExpanded] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const idioms = data.IDIOMS || [];
  const allCategories = ["All", ...Array.from(new Set(idioms.map(i => i.category))).sort()];

  const filtered = idioms.filter(idiom => {
    const matchCat = filterCat === "All" || idiom.category === filterCat;
    const matchSearch = !searchTerm || idiom.phrase.toLowerCase().includes(searchTerm.toLowerCase()) || idiom.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const quizItems = shuffle(idioms);
  const qi = quizItems[quizIdx % (quizItems.length || 1)] || {};
  const qiOpts = shuffle([qi.meaning, ...shuffle(idioms.filter((i) => i.meaning !== qi.meaning)).slice(0, 3).map((i) => i.meaning)]);

  const catColors = {
    "Proverbs": "#d4edda", "Social Life": "#cce5ff", "Food & Daily Life": "#fff3cd",
    "Money": "#f8d7da", "Love & Relationships": "#fce4ec", "Communication": "#e8eaf6",
    "Emotions": "#fef9c3", "Work & Business": "#e0f2f1", "Character": "#f3e5f5",
    "Frustration": "#fff8e1", "Personality & Mind": "#e3f2fd", "Anger": "#ffebee",
    "Humor": "#f0f4c3", "Opportunity": "#e8f5e9",
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={() => { setQuizMode(false); setExpanded(null); }} style={{ ...btnStyle(quizMode ? "#fff" : "#8b6914", quizMode ? "#8b6914" : "#fff"), border: quizMode ? "1px solid #8b6914" : "none" }}>📚 Browse ({idioms.length})</button>
        {idioms.length >= 4 && (
          <button onClick={() => { setQuizMode(true); setQuizAnswer(null); }} style={{ ...btnStyle(!quizMode ? "#fff" : "#8b6914", !quizMode ? "#8b6914" : "#fff"), border: !quizMode ? "1px solid #8b6914" : "none" }}>🎮 Quiz Mode</button>
        )}
      </div>

      {!quizMode ? (
        <div>
          {/* Search */}
          <input
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setExpanded(null); }}
            placeholder="Search phrases or meanings..."
            style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d4a017", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#fffef9", boxSizing: "border-box", marginBottom: 12 }}
          />
          {/* Category filter */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {allCategories.map(cat => (
              <button key={cat} onClick={() => { setFilterCat(cat); setExpanded(null); }}
                style={{ padding: "4px 12px", borderRadius: 14, border: filterCat === cat ? "none" : "1px solid #ddd", background: filterCat === cat ? "#8b6914" : "#f5f0e8", color: filterCat === cat ? "#fff" : "#555", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600 }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>Showing {filtered.length} of {idioms.length} expressions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((idiom) => {
              const origIdx = idioms.indexOf(idiom);
              return (
                <div
                  key={origIdx}
                  onClick={() => setExpanded(expanded === origIdx ? null : origIdx)}
                  style={{ padding: "14px 18px", borderRadius: 12, border: "1.5px solid #e0c87a", background: expanded === origIdx ? "#fdf6e3" : "#fff", cursor: "pointer", transition: "all 0.2s" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: "#8b2500" }}>"{idiom.phrase}"</div>
                        <span style={{ padding: "2px 8px", borderRadius: 10, background: catColors[idiom.category] || "#eee", fontSize: 10, fontWeight: 600, color: "#555", whiteSpace: "nowrap" }}>{idiom.category}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#aaa", fontStyle: "italic", marginTop: 2 }}>Lit: {idiom.literal}</div>
                      {expanded !== origIdx && <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{idiom.meaning}</div>}
                    </div>
                    <div style={{ color: "#8b6914", fontSize: 18, marginLeft: 8, flexShrink: 0 }}>{expanded === origIdx ? "▲" : "▼"}</div>
                  </div>
                  {expanded === origIdx && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #e0c87a" }}>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{ fontWeight: 600, color: "#555" }}>Meaning: </span>
                        <span style={{ fontWeight: 600 }}>{idiom.meaning}</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{ fontWeight: 600, color: "#555" }}>When to use: </span>
                        <span style={{ fontSize: 14, color: "#555" }}>{idiom.usage}</span>
                      </div>
                      {idiom.response && (
                        <div style={{ marginBottom: 10, padding: "8px 12px", background: "#fff0f0", borderRadius: 8 }}>
                          <span style={{ fontWeight: 600, color: "#c62828" }}>Traditional Response: </span>
                          <span style={{ fontStyle: "italic", color: "#c62828" }}>{idiom.response}</span>
                        </div>
                      )}
                      <div style={{ background: "#fff9ee", borderRadius: 8, padding: "10px 14px", fontStyle: "italic", fontSize: 14, color: "#333", borderLeft: "3px solid #d4a017" }}>
                        💬 {idiom.example}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ background: "linear-gradient(135deg, #fff3e0, #fff9ee)", border: "1.5px solid #d4a017", borderRadius: 14, padding: "24px", marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#8b6914", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{qi.category}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#8b2500", fontStyle: "italic" }}>"{qi.phrase}"</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 8, fontStyle: "italic" }}>Literally: "{qi.literal}"</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>What does this expression mean?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {qiOpts.map((opt, i) => {
              const isCorrect = opt === qi.meaning;
              const isSelected = quizAnswer === opt;
              let bg = "#fff", border = "1.5px solid #ddd";
              if (quizAnswer) {
                if (isCorrect) { bg = "#e8f5e9"; border = "2px solid #4caf50"; }
                else if (isSelected) { bg = "#ffebee"; border = "2px solid #e53935"; }
              }
              return (
                <button key={i} onClick={() => {
                  if (!quizAnswer) {
                    setQuizAnswer(opt);
                    if (isCorrect) gainXP(5, `idiom-${qi.phrase}`);
                  }
                }} style={{ padding: "13px 18px", borderRadius: 10, border, background: bg, textAlign: "left", cursor: quizAnswer ? "default" : "pointer", fontFamily: "inherit", fontSize: 15, transition: "all 0.2s" }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {quizAnswer && (
            <>
              <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 10, background: "#fffde7", border: "1px solid #f9a825", fontSize: 14, lineHeight: 1.7 }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>💡 {qi.usage}</div>
                <div style={{ fontStyle: "italic", color: "#666" }}>"{qi.example}"</div>
                {qi.response && <div style={{ marginTop: 8, color: "#c62828", fontStyle: "italic" }}>Response: {qi.response}</div>}
              </div>
              <button onClick={() => { setQuizIdx((quizIdx + 1) % quizItems.length); setQuizAnswer(null); }} style={{ ...btnStyle("#8b6914", "#fff"), marginTop: 14, width: "100%" }}>
                Next Idiom →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── DASHBOARD TAB ─────────────────────────────────────────────────────────────
function DashboardTab({ userXP, userLevel, completedItems, cefrThresholds, activeColor }) {
  const currentObj = cefrThresholds.find(t => userLevel === t.level) || cefrThresholds[0];
  const range = currentObj.max === Infinity ? 1 : (currentObj.max - currentObj.min);
  const progressIntoLevel = userXP - currentObj.min;
  const percentage = currentObj.max === Infinity ? 100 : Math.min(100, (progressIntoLevel / range) * 100);

  // Parse metrics
  const keys = Object.keys(completedItems);
  const flashcards = keys.filter(k => k.startsWith('vocab-flash')).length;
  const mcqs = keys.filter(k => k.startsWith('vocab-mcq')).length;
  const idioms = keys.filter(k => k.startsWith('idiom-')).length;
  const grammar = keys.filter(k => k.startsWith('grammar-')).length;
  const sentence = keys.filter(k => k.startsWith('sentence-')).length;
  const chat = keys.filter(k => k.startsWith('chat-')).length;
  const culture = keys.filter(k => k.startsWith('culture-')).length;
  const alphabet = keys.filter(k => k.startsWith('alpha-')).length;

  const MetricCard = ({ icon, label, val, color }) => (
    <div style={{
      background: "#fff", padding: "16px", borderRadius: 16, border: `1.5px solid ${color}33`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "transform 0.2s"
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: "#333" }}>{val}</div>
      <div style={{ fontSize: 13, color: "#777", fontWeight: 600, textTransform: "uppercase" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ padding: "20px 0" }}>
      {/* Top Banner Rank */}
      <div style={{
        background: `linear-gradient(135deg, ${activeColor}dd 0%, ${activeColor} 100%)`,
        borderRadius: 20, padding: 30, color: "#fff", textAlign: "center", marginBottom: 24,
        boxShadow: `0 8px 24px ${activeColor}44`
      }}>
        <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.9, fontWeight: 700, marginBottom: 8 }}>Global Rank</div>
        <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>{userLevel}</div>
        <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: 4, width: "100%", maxWidth: 300, margin: "0 auto", overflow: "hidden" }}>
          <div style={{ background: "#4ade80", height: 12, borderRadius: 8, width: `${percentage}%`, transition: "width 1s ease-out" }} />
        </div>
        <div style={{ fontSize: 14, opacity: 0.9, marginTop: 12, fontWeight: 600 }}>
          {userXP} / {currentObj.max === Infinity ? 'MAX' : currentObj.max} XP
        </div>
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#333", marginBottom: 16, paddingLeft: 8 }}>Learning Analytics</h3>

      {/* Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
        <MetricCard icon="🃏" label="Flashcards" val={flashcards} color={activeColor} />
        <MetricCard icon="✅" label="Multiple Choice" val={mcqs} color={activeColor} />
        <MetricCard icon="✏️" label="Grammar Quiz" val={grammar} color={activeColor} />
        <MetricCard icon="🗣️" label="Idioms Learned" val={idioms} color={activeColor} />
        <MetricCard icon="🔨" label="Sentences Built" val={sentence} color={activeColor} />
        <MetricCard icon="💬" label="Chats Finished" val={chat} color={activeColor} />
        <MetricCard icon="🎭" label="Culture Seen" val={culture} color={activeColor} />
        <MetricCard icon="A" label="Alphabet Items" val={alphabet} color={activeColor} />
      </div>
    </div>
  );
}

// ── PLACEMENT TEST TAB ────────────────────────────────────────────────────────
function PlacementTestTab({ data, gainXP }) {
  const [testState, setTestState] = useState("start"); // start -> listening -> reading -> results
  const [score, setScore] = useState(0);

  // Fisher-Yates array shuffle utility
  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  // Listening State
  const [listeningTarget, setListeningTarget] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [listeningChecked, setListeningChecked] = useState(false);
  const [isDictationCorrect, setIsDictationCorrect] = useState(false);

  // Reading State
  const [readingLoading, setReadingLoading] = useState(false);
  const [readingData, setReadingData] = useState(null);
  const [readingAnswer, setReadingAnswer] = useState(null);
  const [readingChecked, setReadingChecked] = useState(false);

  const startTest = async () => {
    console.log("Starting dictation fetch from static data...");
    setTestState("loading_dictation");
    setScore(0);

    // Simulate slight loading delay for UI consistency
    await new Promise(r => setTimeout(r, 500));

    try {
      const sourceIdioms = data.data && data.data.IDIOMS ? data.data.IDIOMS : [];
      if (sourceIdioms.length > 0) {
        const randomIdiom = sourceIdioms[Math.floor(Math.random() * sourceIdioms.length)];
        console.log("Using Dictation target:", randomIdiom);
        setListeningTarget({ native: randomIdiom.phrase, english: randomIdiom.meaning });
      } else {
        console.log("No dictation data available!");
        setListeningTarget({ native: "Error Loading Data", english: "Error" });
      }
    } catch (err) {
      console.error("Failed dictation generation:", err);
      setListeningTarget({ native: "Error Loading Data", english: "Error" });
    }

    console.log("Setting test state to listening");
    setTestState("listening");
  };

  const playAudio = (text) => {
    console.log("playAudio triggered with text:", text);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Clear any stuck utterances
      if (window.speechSynthesis.pause) window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      const langMap = { "Italian": "it-IT", "Korean": "ko-KR", "Hebrew": "he-IL", "Spanish": "es-ES", "English": "en-US", "Russian": "ru-RU", "Portuguese": "pt-PT", "French": "fr-FR" };
      const targetLang = langMap[data.name] || "en-US";
      utterance.lang = targetLang;
      utterance.rate = 0.85;

      // Explicitly pick a matching voice if Chrome doesn't automatically route it
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.includes(targetLang) || v.lang.includes(targetLang.split('-')[0]));
      if (voice) utterance.voice = voice;

      utterance.onerror = (e) => console.error("SpeechSynthesis Error:", e);
      utterance.onstart = () => console.log("SpeechSynthesis Started");
      utterance.onend = () => console.log("SpeechSynthesis Ended");

      window.speechSynthesis.speak(utterance);
    } else {
      console.error("TTS not supported.");
      alert("TTS not supported in this browser.");
    }
  };

  const checkListening = () => {
    if (!userInput.trim()) return;

    // Clean string utility: Normalize, strip Hebrew Niqqud, and remove punctuation
    const cleanStr = str => str.normalize("NFC").replace(/[\u0591-\u05C7]/g, '').replace(/[.,!?¿¡]/g, '').toLowerCase().trim();

    const cleanTarget = cleanStr(listeningTarget.native);
    const cleanInput = cleanStr(userInput);

    const correct = cleanTarget === cleanInput;
    setIsDictationCorrect(correct);
    if (correct) setScore(s => s + 50); // High weight for dictation
    setListeningChecked(true);
  };

  const generateReadingPrompt = async () => {
    setTestState("reading");
    setReadingLoading(true);

    try {
      const prompt = `Write a short 3-sentence story in ${data.name} suitable for a B1 language learner. Following the story, write 1 multiple choice reading comprehension question in English about the story. Provide 3 incorrect English options, and 1 correct English option. Format the response STRICTLY as a JSON object with this exact structure: { "story_native": "the story in ${data.name}", "story_english": "english translation", "question": "the question", "correct_option": "correct answer", "wrong_options": ["wrong1", "wrong2", "wrong3"] }`;

      const response = await callGemini([{ role: "user", content: prompt }], "You are a CEFR language examiner. Output ONLY raw JSON. No markdown ticks.");
      let cleanRes = response.trim();
      if (cleanRes.startsWith("```json")) cleanRes = cleanRes.replace(/```json/g, "").replace(/```/g, "");

      const parsed = JSON.parse(cleanRes);
      // Shuffle options
      const options = shuffle([parsed.correct_option, ...parsed.wrong_options]);
      setReadingData({ ...parsed, options });
    } catch (err) {
      console.error("Failed test generation:", err);
      // Fallback
      setReadingData({
        story_native: "An error occurred downloading the test data.",
        story_english: "Please refresh and try again.",
        question: "Did the test load?",
        correct_option: "No",
        wrong_options: ["Yes", "Maybe", "I don't know"],
        options: ["No", "Yes", "Maybe", "I don't know"]
      });
    }
    setReadingLoading(false);
  };

  const submitReading = (opt) => {
    if (readingAnswer) return; // already answered
    setReadingAnswer(opt);
    setReadingChecked(true);
    if (opt === readingData.correct_option) {
      setScore(s => s + 50);
    }
  };

  const finishTest = () => {
    // Determine level placement based on Score (out of 100 max)
    let assignedLevel = "A1";
    let xpLumpSum = 1000;

    if (score === 100) { assignedLevel = "B1"; xpLumpSum = 15000; }
    else if (score === 50) { assignedLevel = "A2"; xpLumpSum = 5000; }

    // Auto-Grant the lump sum XP to jump them exactly to that bracket
    gainXP(xpLumpSum, `placement-test-${data.name}-${Date.now()}`);
    setTestState("results");
  };

  if (testState === "start") {
    return (
      <div className="responsive-card" style={{ padding: "40px 20px", textAlign: "center", background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: "5rem", marginBottom: 20 }}>🎓</div>
        <h2 className="responsive-heading" style={{ fontSize: 32, fontWeight: 800, color: "#333", marginBottom: 20 }}>Placement Evaluation</h2>
        <p style={{ fontSize: 18, color: "#666", maxWidth: 600, margin: "0 auto 30px", lineHeight: 1.6 }}>
          Take a standardized dual-module exam to evaluate your proficiency in <strong>{data.name}</strong>.
          Your performance will determine your initial CEFR Rank and award a lump-sum XP bonus.
        </p>
        <button onClick={startTest} style={btnStyle("#4ade80", "#fff")}>Begin Assessment →</button>
      </div>
    );
  }

  if (testState === "loading_dictation") {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#888", fontSize: 18, background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontSize: "3rem", marginBottom: 20, animation: "bounce 1s infinite" }}>⏳</div>
        Generating your custom AI Dictation prompt...
      </div>
    );
  }

  if (testState === "listening") {
    return (
      <div className="responsive-card" style={{ padding: "40px 20px", background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <h3 className="responsive-heading" style={{ fontSize: 24, fontWeight: 700, color: "#333", marginBottom: 10, textAlign: "center" }}>Module 1: Listening Dictation</h3>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>Click the speaker to hear a phrase in {data.name}. Type exactly what you hear.</p>

        {listeningTarget ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, maxWidth: 500, margin: "0 auto" }}>
            <button
              onClick={() => playAudio(listeningTarget.native)}
              style={{ background: "#f0f4f8", border: "none", borderRadius: "50%", width: 80, height: 80, fontSize: 32, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"}
              onMouseLeave={e => e.currentTarget.style.background = "#f0f4f8"}
            >
              🔊
            </button>

            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={listeningChecked}
              placeholder="Type the phrase..."
              autoComplete="off"
              style={{ width: "100%", padding: "16px 20px", borderRadius: 16, border: "2px solid #e2e8f0", fontSize: 18, outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => e.currentTarget.style.borderColor = "#94a3b8"}
              onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"}
            />

            {listeningChecked ? (
              <div style={{ textAlign: "center", width: "100%", animation: "fadeIn 0.3s ease" }}>
                <div style={{ padding: 16, borderRadius: 12, background: isDictationCorrect ? "#f0fdf4" : "#fef2f2", color: isDictationCorrect ? "#166534" : "#991b1b", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>
                  {isDictationCorrect ? "✓ Perfect match!" : "✗ Incorrect"}
                </div>
                {!isDictationCorrect && (
                  <div style={{ color: "#666", fontSize: 15 }}>
                    Correct answer: <strong>{listeningTarget.native}</strong>
                  </div>
                )}
                <button onClick={generateReadingPrompt} style={{ ...btnStyle("#333", "#fff"), marginTop: 20, width: "100%" }}>Proceed to Module 2 →</button>
              </div>
            ) : (
              <button onClick={checkListening} style={{ ...btnStyle("#4ade80", "#fff"), width: "100%" }} disabled={!userInput.trim()}>Submit Dictation</button>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#888" }}>Insufficient data for dictation test.</div>
        )}
      </div>
    );
  }

  if (testState === "reading") {
    return (
      <div className="responsive-card" style={{ padding: "40px 20px", background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", maxWidth: 700, margin: "0 auto" }}>
        <h3 className="responsive-heading" style={{ fontSize: 24, fontWeight: 700, color: "#333", marginBottom: 10, textAlign: "center" }}>Module 2: Reading Comprehension</h3>

        {readingLoading || !readingData ? (
          <div style={{ textAlign: "center", padding: 40, color: "#888", fontSize: 18 }}>
            <div style={{ fontSize: "3rem", marginBottom: 20, animation: "bounce 1s infinite" }}>⏳</div>
            Generating AI story parameters...
          </div>
        ) : (
          <div>
            <div style={{ background: "#f8fafc", padding: 24, borderRadius: 16, borderLeft: "4px solid #94a3b8", marginBottom: 24 }}>
              <p style={{ fontSize: 20, color: "#333", lineHeight: 1.6, margin: "0 0 10px 0", fontWeight: 600 }}>{readingData.story_native}</p>
              {readingChecked && <p style={{ fontSize: 15, color: "#64748b", margin: 0, fontStyle: "italic" }}>Translation: {readingData.story_english}</p>}
            </div>

            <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>
              {readingData.question}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {readingData.options.map((opt, i) => {
                const isCorrect = opt === readingData.correct_option;
                const isSelected = readingAnswer === opt;
                let bg = "#fff", border = "2px solid #e2e8f0";

                if (readingChecked) {
                  if (isCorrect) { bg = "#f0fdf4"; border = "2px solid #22c55e"; }
                  else if (isSelected && !isCorrect) { bg = "#fef2f2"; border = "2px solid #ef4444"; }
                }

                return (
                  <button key={i} onClick={() => submitReading(opt)} disabled={readingChecked}
                    style={{ padding: "16px 20px", borderRadius: 12, border, background: bg, textAlign: "left", fontSize: 16, cursor: readingChecked ? "default" : "pointer", transition: "all 0.2s" }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {readingChecked && (
              <button onClick={finishTest} style={{ ...btnStyle("#333", "#fff"), marginTop: 30, width: "100%" }}>Complete Assessment</button>
            )}
          </div>
        )}
      </div>
    );
  }

  if (testState === "results") {
    return (
      <div className="responsive-card" style={{ padding: "50px 20px", textAlign: "center", background: "#fff", borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: "5rem", marginBottom: 20 }}>{score >= 50 ? "🎉" : "📚"}</div>
        <h2 className="responsive-heading" style={{ fontSize: 36, fontWeight: 800, color: "#333", marginBottom: 10 }}>Exam Complete</h2>
        <p style={{ fontSize: 20, color: "#666", marginBottom: 30 }}>Final Score: <strong>{score}/100</strong></p>

        <div style={{ background: "#f8fafc", padding: 24, borderRadius: 16, display: "inline-block", textAlign: "left", marginBottom: 30 }}>
          <p style={{ margin: "0 0 10px 0", fontSize: 16, color: "#475569" }}>✓ Web Dictation: <strong style={{ color: isDictationCorrect ? "#166534" : "#991b1b" }}>{isDictationCorrect ? "Pass (50/50)" : "Fail (0/50)"}</strong></p>
          <p style={{ margin: 0, fontSize: 16, color: "#475569" }}>✓ Reading Context: <strong style={{ color: readingAnswer === readingData?.correct_option ? "#166534" : "#991b1b" }}>{readingAnswer === readingData?.correct_option ? "Pass (50/50)" : "Fail (0/50)"}</strong></p>
        </div>

        <p style={{ fontSize: 18, color: "#333", marginBottom: 30 }}>
          Based on these metrics, you have been placed directly into <strong>{score === 100 ? "B1" : score === 50 ? "A2" : "A1"}</strong> and granted the respective starting XP!
        </p>

        <button onClick={() => setTestState("start")} style={btnStyle("#94a3b8", "#fff")}>Retake Exam</button>
      </div>
    )
  }

  return null;
}

// ── SPEAKING TAB ──────────────────────────────────────────────────────────────
function SpeakingTab({ data, gainXP, activeColor }) {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [loading, setLoading] = useState(true);

  // Library Support
  const [viewMode, setViewMode] = useState("practice"); // 'practice' or 'library'
  const sourceIdioms = data.data && data.data.IDIOMS ? data.data.IDIOMS : [];

  const langMap = { "Italian": "it-IT", "Korean": "ko-KR", "Hebrew": "he-IL", "Spanish": "es-ES", "English": "en-US", "Russian": "ru-RU", "Portuguese": "pt-PT", "French": "fr-FR" };

  useEffect(() => {
    function initSentences() {
      setLoading(true);
      try {
        if (sourceIdioms.length > 0) {
          // Shuffle and pick 5 random idioms for practice
          const shuffled = [...sourceIdioms].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 5).map(i => ({ native: i.phrase, english: i.meaning }));
          setItems(selected);
        } else {
          setItems([{ native: "No data available", english: "Please add Idioms to this language module." }]);
        }
      } catch (e) {
        console.error("Failed to load static speaking data:", e);
        setItems([]);
      }
      setLoading(false);
    }

    initSentences();

    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = true;
      recog.lang = langMap[data.name] || "en-US";

      recog.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        console.log("Speech API Transcript:", currentTranscript);
        setTranscript(currentTranscript);
      };

      recog.onend = () => {
        console.log("Speech API ended");
        setIsRecording(false);
      };

      recog.onerror = (event) => {
        console.error("Speech recognition error:", event.error, event);
        alert(`Speech recognition error: ${event.error}. Please ensure your microphone is connected and permitted.`);
        setIsRecording(false);
      };

      setRecognition(recog);
      console.log("Speech Recognition initialized successfully.", recog);
    }
  }, [data]);

  const toggleRecording = () => {
    if (!recognition) {
      alert("Speech Recognition API is not supported or failed to initialize in this browser. Try Chrome desktop.");
      return;
    }

    if (isRecording) {
      console.log("Stopping recording...");
      recognition.stop();
    } else {
      console.log("Starting recording...");
      setTranscript("");
      setFeedback(null);
      try {
        recognition.start();
        setIsRecording(true);
      } catch (e) {
        console.error("Failed to start recognition:", e);
        alert(`Failed to start recording: ${e.message}`);
      }
    }
  };

  const evaluateSpeech = () => {
    if (!transcript.trim()) return;
    const target = items[currentIndex].native;

    // Clean string utility: Normalize, strip Hebrew Niqqud, and remove punctuation
    const cleanStr = str => str.normalize("NFC").replace(/[\u0591-\u05C7]/g, '').replace(/[.,!?;¿¡]/g, '').toLowerCase().trim();

    const targetWords = cleanStr(target).split(/\s+/);
    const spokenWords = cleanStr(transcript).split(/\s+/);

    let correctCount = 0;
    const wordFeedback = targetWords.map(targetWord => {
      // Very simple greedy match (exact or very close substitution could be added, doing exact for now)
      const isCorrect = spokenWords.includes(targetWord);
      if (isCorrect) correctCount++;
      return { text: targetWord, correct: isCorrect };
    });

    const score = targetWords.length > 0 ? (correctCount / targetWords.length) * 100 : 0;

    setFeedback({
      score: Math.round(score),
      words: wordFeedback
    });

    // Check passing threshold (lets say 70% of words recognized)
    if (score >= 70) {
      gainXP(10, `speaking-${items[currentIndex]?.id || Date.now()}`);
    }
  };

  const nextSentence = () => {
    setFeedback(null);
    setTranscript("");
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  const playTargetAudio = () => {
    if ('speechSynthesis' in window) {
      const targetText = items[currentIndex]?.native;
      if (!targetText) return;

      window.speechSynthesis.cancel(); // Clear any stuck utterances
      if (window.speechSynthesis.pause) window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(targetText);
      const targetLang = langMap[data.name] || "en-US";
      utterance.lang = targetLang;
      utterance.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.includes(targetLang) || v.lang.includes(targetLang.split('-')[0]));
      if (voice) utterance.voice = voice;

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  const item = items[currentIndex];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 40, color: "#888", fontSize: 18 }}>
        <div style={{ fontSize: "3rem", marginBottom: 20, animation: "bounce 1s infinite" }}>🎙️</div>
        Generating pronunciation exercises using AI...
      </div>
    );
  }

  if (items.length === 0) {
    return <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No sentences available for speaking practice.</div>;
  }

  return (
    <div className="responsive-card" style={{ padding: "40px 20px" }}>
      <h2 className="responsive-heading" style={{ fontSize: 24, fontWeight: 700, color: "#333", marginBottom: 8, textAlign: "center" }}>Pronunciation Trainer</h2>

      {/* View Toggle */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 30 }}>
        <button
          onClick={() => setViewMode("practice")}
          style={{ padding: "8px 16px", borderRadius: 20, border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", background: viewMode === "practice" ? activeColor : "#e2e8f0", color: viewMode === "practice" ? "#fff" : "#64748b", transition: "all 0.2s" }}
        >
          Random Practice
        </button>
        <button
          onClick={() => setViewMode("library")}
          style={{ padding: "8px 16px", borderRadius: 20, border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", background: viewMode === "library" ? activeColor : "#e2e8f0", color: viewMode === "library" ? "#fff" : "#64748b", transition: "all 0.2s" }}
        >
          Phrase Library
        </button>
      </div>

      {viewMode === "library" ? (
        <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0", maxHeight: 500, overflowY: "auto" }}>
          <h3 style={{ fontSize: 18, color: "#333", marginBottom: 15 }}>Select a Phrase to Practice</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sourceIdioms.map((idiom, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setItems([{ native: idiom.phrase, english: idiom.meaning }]);
                  setCurrentIndex(0);
                  setTranscript("");
                  setFeedback(null);
                  setViewMode("practice");
                }}
                style={{ padding: 16, background: "#fff", borderRadius: 12, border: "1px solid #cbd5e1", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = activeColor}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#cbd5e1"}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>{idiom.phrase}</div>
                <div style={{ fontSize: 14, color: "#64748b" }}>{idiom.meaning}</div>
              </div>
            ))}
            {sourceIdioms.length === 0 && <div style={{ color: "#888", textAlign: "center", padding: 20 }}>No phrases available in library.</div>}
          </div>
        </div>
      ) : (
        <div className="responsive-card" style={{ background: "#fff", padding: "40px", borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", minHeight: 400 }}>

          <div className="speaking-target-row" style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 12 }}>
            <div className="responsive-title" style={{ fontSize: 28, fontWeight: 800, color: activeColor }}>
              {item.native}
            </div>
            <button
              onClick={playTargetAudio}
              style={{
                background: "#f0f4f8", border: "none", borderRadius: "50%", width: 44, height: 44,
                fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"}
              onMouseLeave={e => e.currentTarget.style.background = "#f0f4f8"}
              title="Listen to pronunciation"
            >
              🔊
            </button>
          </div>
          <div style={{ fontSize: 16, color: "#64748b", fontStyle: "italic", marginBottom: 40 }}>
            "{item.english}"
          </div>

          {/* Microphone Button */}
          {!feedback && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <button
                onClick={toggleRecording}
                className={isRecording ? "pulse-record" : ""}
                style={{
                  width: 90, height: 90, borderRadius: "50%",
                  background: isRecording ? "#ef4444" : "#f1f5f9",
                  border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                  boxShadow: isRecording ? "0 0 0 8px rgba(239, 68, 68, 0.2)" : "0 4px 12px rgba(0,0,0,0.05)"
                }}
              >
                <span style={{ fontSize: 36, color: isRecording ? "#fff" : activeColor }}>🎙️</span>
              </button>
              <div style={{ fontSize: 14, fontWeight: 600, color: isRecording ? "#ef4444" : "#64748b" }}>
                {isRecording ? "Listening... (Click to Stop)" : "Click mic to speak"}
              </div>
            </div>
          )}

          {/* Live Transcript or Final Validation */}
          <div style={{ marginTop: 30, width: "100%", maxWidth: 500, minHeight: 60 }}>
            {transcript && !feedback && (
              <div style={{ padding: 16, background: "#f8fafc", borderRadius: 12, border: "1px dashed #cbd5e1", color: "#334155", fontSize: 18 }}>
                "{transcript}"
              </div>
            )}

            {!isRecording && transcript && !feedback && (
              <button onClick={evaluateSpeech} style={{ ...btnStyle(activeColor, "#fff"), marginTop: 20, padding: "12px 30px" }}>
                Evaluate My Pronunciation
              </button>
            )}

            {feedback && (
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: feedback.score >= 70 ? "#22c55e" : "#eab308", marginBottom: 10 }}>
                  {feedback.score}%
                </div>
                <div style={{ fontSize: 16, color: "#64748b", marginBottom: 20 }}>Accuracy</div>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 30 }}>
                  {feedback.words.map((wf, idx) => (
                    <span key={idx} style={{
                      padding: "4px 10px", borderRadius: 8, fontSize: 18, fontWeight: 600,
                      background: wf.correct ? "#dcfce7" : "#fee2e2",
                      color: wf.correct ? "#166534" : "#991b1b"
                    }}>
                      {wf.text}
                    </span>
                  ))}
                </div>

                <button onClick={nextSentence} style={{ ...btnStyle("#333", "#fff"), padding: "14px 40px" }}>
                  Next Sentence →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes pulseRecord {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }
          .pulse-record {
            animation: pulseRecord 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
}

// ── POLYGLOT DASHBOARD ────────────────────────────────────────────────────────
const getRankBadge = (level) => {
  switch (level) {
    case 'A1': return '⭐';
    case 'A2': return '🥉';
    case 'B1': return '🥈';
    case 'B2': return '🥇';
    case 'C1': return '💎';
    case 'C2': return '👑';
    default: return '⭐';
  }
};

function LevelUpModal({ level, langName, onClose, activeColor }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.85)", zIndex: 99999, display: "flex",
      alignItems: "center", justifyContent: "center", padding: 20,
      backdropFilter: "blur(8px)", animation: "fadeIn 0.4s ease-out"
    }}>
      <div style={{
        background: "#fff", borderRadius: 32, padding: "50px 40px",
        width: "100%", maxWidth: 500, textAlign: "center",
        boxShadow: `0 20px 60px ${activeColor}66`, position: "relative",
        animation: "scaleUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }}>

        <div style={{ fontSize: "6rem", marginBottom: 20, animation: "bounce 2s infinite" }}>
          {getRankBadge(level)}
        </div>

        <div style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: 3, color: "#888", fontWeight: 700, marginBottom: 12 }}>
          Digital Certificate Achieved
        </div>

        <h2 style={{ fontSize: 42, margin: "0 0 10px 0", color: activeColor, fontWeight: 900 }}>
          {level} Rank
        </h2>

        <p style={{ fontSize: 18, color: "#555", lineHeight: 1.5, marginBottom: 40 }}>
          Congratulations! You have reached a new milestone evaluating your proficiency in <strong>{langName}</strong>.
        </p>

        <button onClick={onClose} style={{
          background: `linear-gradient(135deg, ${activeColor}dd 0%, ${activeColor} 100%)`,
          color: "#fff", border: "none", borderRadius: 30, padding: "16px 40px",
          fontSize: 18, fontWeight: 800, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: `0 8px 24px ${activeColor}66`
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 28px ${activeColor}88`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 24px ${activeColor}66`; }}
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}

function PolyglotDashboard({ onClose }) {
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    setProfiles(JSON.parse(localStorage.getItem('langue_profiles') || '{}'));
  }, []);

  const chartData = LANG_KEYS.map(key => {
    const xp = profiles[key]?.xp || 0;
    return {
      subject: LANGUAGES[key].name,
      xp: xp,
      fullMark: 100000
    };
  });

  const totalXP = Object.values(profiles).reduce((sum, p) => sum + (p.xp || 0), 0);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.8)", zIndex: 9999, display: "flex",
      alignItems: "center", justifyContent: "center", padding: 20
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: 30, width: "100%", maxWidth: 800,
        maxHeight: "90vh", overflowY: "auto", position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 20, right: 20, background: "rgba(0,0,0,0.05)",
          border: "none", borderRadius: "50%", width: 36, height: 36,
          cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center"
        }}>✕</button>

        <h2 style={{ fontSize: 32, margin: "0 0 10px 0", color: "#333", textAlign: "center" }}>🌍 Global Polyglot Profile</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>Total Lifetime XP: <strong style={{ color: "#4ade80" }}>{totalXP}</strong></p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {/* Radar Chart side */}
          <div style={{ flex: "1 1 400px", height: 400, background: "#f8f9fa", borderRadius: 16, padding: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#555', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 1000']} tick={false} axisLine={false} />
                <Radar name="XP" dataKey="xp" stroke="#4ade80" fill="#4ade80" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* List side */}
          <div style={{ flex: "1 1 250px", display: "flex", flexDirection: "column", gap: 12 }}>
            {LANG_KEYS.sort((a, b) => (profiles[b]?.xp || 0) - (profiles[a]?.xp || 0)).map(key => {
              const p = profiles[key] || { xp: 0, level: "A1" };
              return (
                <div key={key} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px", background: "#f8f9fa", borderRadius: 12, border: "1px solid #eee"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{LANGUAGES[key].flag}</span>
                    <span style={{ fontWeight: 600, color: "#333" }}>{LANGUAGES[key].name}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: LANGUAGES[key].activeColor, display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 16 }}>{getRankBadge(p.level)}</span> {p.level}
                    </div>
                    <div style={{ fontSize: 12, color: "#777" }}>{p.xp.toLocaleString()} XP</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── BUTTON STYLE ──────────────────────────────────────────────────────────────
function btnStyle(bg, color) {
  return {
    padding: "10px 22px",
    borderRadius: 20,
    border: bg === "#fff" ? "1.5px solid #8b6914" : "none",
    background: bg,
    color,
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s",
  };
}

// ── ALPHABET TAB ──────────────────────────────────────────────────────────────
function AlphabetTab({ alphabetData, langCode, gainXP }) {
  const playAudio = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode; // e.g., 'ko-KR', 'he-IL'
    window.speechSynthesis.speak(utterance);
    gainXP(1, `alpha-${langCode}- ${text}`);
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ marginBottom: 20, textAlign: "center", color: "#666", fontSize: 14 }}>
        Tap any letter to hear its pronunciation via your browser's native speech synthesis.
      </div>
      {alphabetData.map((cat, catIdx) => (
        <div key={cat.id || catIdx} style={{ marginBottom: 30 }}>
          <h2 style={{ color: "#2c5364", borderBottom: "2px solid #eee", paddingBottom: 8, marginBottom: 16 }}>{cat.label}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 12 }}>
            {cat.items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => playAudio(item.kr)}
                style={{ background: "#fff", border: "1.5px solid #b2dfdb", borderRadius: 12, padding: "16px 12px", textAlign: "center", cursor: "pointer", transition: "all 0.1s", userSelect: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ fontSize: 36, fontWeight: 700, color: "#004d40", marginBottom: 6 }}>{item.kr}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#00796b", marginBottom: 8, background: "#e0f2f1", display: "inline-block", padding: "2px 8px", borderRadius: 10 }}>{item.rom}</div>
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.3 }}>{item.exp}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── CULTURE TAB ───────────────────────────────────────────────────────────────
function CultureTab({ data, gainXP }) {
  const [filterCat, setFilterCat] = useState("All");
  const cultureItems = data.CULTURE || [];
  const categories = ["All", "Music", "TV Show", "Movie"];

  const filtered = filterCat === "All" ? cultureItems : cultureItems.filter(c => c.category === filterCat);

  return (
    <div style={{ marginTop: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#333", borderBottom: "2px solid #eee", paddingBottom: 10, marginBottom: 20 }}>
        Cultural Immersion
      </h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            style={{
              padding: "8px 16px", borderRadius: 20, border: filterCat === cat ? "none" : "1.5px solid #d4a017",
              background: filterCat === cat ? "#8b6914" : "transparent",
              color: filterCat === cat ? "#fff" : "#8b6914",
              fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {filtered.map((item) => (
          <div key={item.id} style={{
            background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column"
          }}>
            <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${item.id}`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => gainXP(5, `culture-${item.id}`)
                }
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              ></iframe >
            </div >
            <div style={{ padding: 16, display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#8b6914", textTransform: "uppercase", marginBottom: 6 }}>{item.category}</span>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#333", margin: "0 0 8px 0", lineHeight: 1.4 }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#777", marginTop: "auto" }}>{item.channel}</p>
            </div>
          </div >
        ))}
      </div >
      {
        filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
            No content available for this category yet.
          </div>
        )
      }
    </div >
  );
}

// ── VIDEO TAB ─────────────────────────────────────────────────────────────────
function VideoTab({ data, gainXP }) {
  const videos = data.VIDEOS || [];

  return (
    <div style={{ marginTop: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#333", borderBottom: "2px solid #eee", paddingBottom: 10, marginBottom: 20 }}>
        Curated Learning Videos
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {videos.map((video) => (
          <div key={video.id} style={{
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
          >
            <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              ></iframe>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#333", margin: "0 0 8px 0", lineHeight: 1.4 }}>{video.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#777", marginTop: "auto" }}>{video.channel}</p>
            </div>
          </div>
        ))}
      </div>
      {videos.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
          No videos available for this language yet.
        </div>
      )}
    </div>
  );
}

// ── CONFIGURATION ─────────────────────────────────────────────────────────────
const LANGUAGES = {
  italian: {
    id: "italian",
    name: "Italian",
    nativeName: "Italiano Vivo",
    flag: "🇮🇹",
    greeting: "Benvenuto",
    theme: "linear-gradient(135deg, #8b2500 0%, #c0392b 50%, #8b6914 100%)",
    activeColor: "#8b6914",
    data: italianData,
    tabs: [
      { id: "vocab", label: "Vocabulary", icon: "📖" },
      { id: "grammar", label: "Grammar", icon: "✏️" },
      { id: "builder", label: "Sentence Builder", icon: "🔨" },
      { id: "chat", label: "Conversation", icon: "💬" },
      { id: "idioms", label: "Phrases & Idioms", icon: "🇮🇹" },
      { id: "videos", label: "Videos", icon: "📺" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "placement", label: "Placement Test", icon: "🎓" },
      { id: "speaking", label: "Speaking", icon: "🎙️" }
    ]
  },
  korean: {
    id: "korean",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    greeting: "환영합니다",
    theme: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    activeColor: "#2c5364",
    data: koreanData,
    tabs: [
      { id: "alphabet", label: "Alphabet (Hangul)", icon: "🇰🇷" },
      { id: "vocab", label: "Vocabulary", icon: "📖" },
      { id: "grammar", label: "Grammar", icon: "✏️" },
      { id: "builder", label: "Sentence Builder", icon: "🔨" },
      { id: "chat", label: "Conversation", icon: "💬" },
      { id: "idioms", label: "Phrases & Idioms", icon: "🎎" },
      { id: "videos", label: "Videos", icon: "📺" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "placement", label: "Placement Test", icon: "🎓" },
      { id: "speaking", label: "Speaking", icon: "🎙️" }
    ]
  },
  hebrew: {
    id: "hebrew",
    name: "Hebrew",
    nativeName: "עִבְרִית",
    flag: "🇮🇱",
    greeting: "ברוכים הבאים",
    theme: "linear-gradient(135deg, #0052a5 0%, #00458a 50%, #002d5a 100%)", // Israel Blue
    activeColor: "#0052a5",
    data: hebrewData,
    tabs: [
      { id: "alphabet", label: "Alef-Bet", icon: "🇮🇱" },
      { id: "vocab", label: "Vocabulary", icon: "📖" },
      { id: "grammar", label: "Grammar", icon: "✏️" },
      { id: "builder", label: "Sentence Builder", icon: "🔨" },
      { id: "chat", label: "Conversation", icon: "💬" },
      { id: "idioms", label: "Phrases & Idioms", icon: "🐪" },
      { id: "videos", label: "Videos", icon: "📺" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "placement", label: "Placement Test", icon: "🎓" },
      { id: "speaking", label: "Speaking", icon: "🎙️" }
    ]
  },
  spanish: {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    greeting: "Bienvenido",
    theme: "linear-gradient(135deg, #FFC300 0%, #C70039 50%, #900C3F 100%)",
    activeColor: "#C70039",
    data: spanishData,
    tabs: [
      { id: "vocab", label: "Vocabulary", icon: "📖" },
      { id: "grammar", label: "Grammar", icon: "✏️" },
      { id: "builder", label: "Sentence Builder", icon: "🔨" },
      { id: "chat", label: "Conversation", icon: "💬" },
      { id: "idioms", label: "Phrases & Idioms", icon: "🇪🇸" },
      { id: "videos", label: "Videos", icon: "📺" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "placement", label: "Placement Test", icon: "🎓" },
      { id: "speaking", label: "Speaking", icon: "🎙️" }
    ]
  },
  english: {
    id: "english",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    greeting: "Welcome",
    theme: "linear-gradient(135deg, #1C2833 0%, #2E4053 50%, #34495E 100%)",
    activeColor: "#2E4053",
    data: englishData,
    tabs: [
      { id: "vocab", label: "Vocabulary", icon: "📖" },
      { id: "grammar", label: "Grammar", icon: "✏️" },
      { id: "builder", label: "Sentence Builder", icon: "🔨" },
      { id: "chat", label: "Conversation", icon: "💬" },
      { id: "idioms", label: "Phrases & Idioms", icon: "🇬🇧" },
      { id: "videos", label: "Videos", icon: "📺" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "placement", label: "Placement Test", icon: "🎓" },
      { id: "speaking", label: "Speaking", icon: "🎙️" }
    ]
  },
  russian: {
    id: "russian",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    greeting: "Добро пожаловать",
    theme: "linear-gradient(135deg, #7B241C 0%, #922B21 50%, #A93226 100%)",
    activeColor: "#922B21",
    data: russianData,
    tabs: [
      { id: "vocab", label: "Vocabulary", icon: "📖" },
      { id: "grammar", label: "Grammar", icon: "✏️" },
      { id: "builder", label: "Sentence Builder", icon: "🔨" },
      { id: "chat", label: "Conversation", icon: "💬" },
      { id: "idioms", label: "Phrases & Idioms", icon: "🇷🇺" },
      { id: "videos", label: "Videos", icon: "📺" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "placement", label: "Placement Test", icon: "🎓" },
      { id: "speaking", label: "Speaking", icon: "🎙️" }
    ]
  },
  portuguese: {
    id: "portuguese",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    greeting: "Bem-vindo",
    theme: "linear-gradient(135deg, #006600 0%, #009900 50%, #FF0000 100%)",
    activeColor: "#006600",
    data: portugueseData,
    tabs: [
      { id: "vocab", label: "Vocabulary", icon: "📖" },
      { id: "grammar", label: "Grammar", icon: "✏️" },
      { id: "builder", label: "Sentence Builder", icon: "🔨" },
      { id: "chat", label: "Conversation", icon: "💬" },
      { id: "idioms", label: "Phrases & Idioms", icon: "🇵🇹" },
      { id: "videos", label: "Videos", icon: "📺" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "placement", label: "Placement Test", icon: "🎓" },
      { id: "speaking", label: "Speaking", icon: "🎙️" }
    ]
  },
  french: {
    id: "french",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    greeting: "Bienvenue",
    theme: "linear-gradient(135deg, #002395 0%, #ffffff 50%, #ED2939 100%)",
    activeColor: "#002395",
    data: frenchData,
    tabs: [
      { id: "vocab", label: "Vocabulary", icon: "📖" },
      { id: "grammar", label: "Grammar", icon: "✏️" },
      { id: "builder", label: "Sentence Builder", icon: "🔨" },
      { id: "chat", label: "Conversation", icon: "💬" },
      { id: "idioms", label: "Phrases & Idioms", icon: "🇫🇷" },
      { id: "videos", label: "Videos", icon: "📺" },
      { id: "culture", label: "Culture", icon: "🎭" },
      { id: "placement", label: "Placement Test", icon: "🎓" },
      { id: "speaking", label: "Speaking", icon: "🎙️" }
    ]
  }
};

const LANG_KEYS = ["english", "spanish", "italian", "hebrew", "russian", "korean", "portuguese", "french"];

const CEFR_THRESHOLDS = [
  { level: "A1", min: 0, max: 5000 },
  { level: "A2", min: 5000, max: 15000 },
  { level: "B1", min: 15000, max: 30000 },
  { level: "B2", min: 30000, max: 60000 },
  { level: "C1", min: 60000, max: 100000 },
  { level: "C2", min: 100000, max: Infinity }
];

export default function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home' or 'learning'
  const [showPolyglotDashboard, setShowPolyglotDashboard] = useState(false);
  const [langIdx, setLangIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("vocab");

  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState("A1");
  const [completedItems, setCompletedItems] = useState({});
  const [showXPToast, setShowXPToast] = useState(null);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  // Load profile data whenever the language changes
  useEffect(() => {
    const currentLang = LANG_KEYS[langIdx];
    const profiles = JSON.parse(localStorage.getItem('langue_profiles') || '{}');

    // If no profile exists for this language, initialize one
    if (!profiles[currentLang]) {
      profiles[currentLang] = { xp: 0, level: "A1", completed: {} };
      localStorage.setItem('langue_profiles', JSON.stringify(profiles));
    }

    const { xp, level, completed } = profiles[currentLang];
    setUserXP(xp);
    setUserLevel(level);
    setCompletedItems(completed);
  }, [langIdx]);

  const gainXP = (amount, itemId) => {
    if (itemId && completedItems[itemId]) return; // Already completed

    const currentLang = LANG_KEYS[langIdx];
    const newCompleted = itemId ? { ...completedItems, [itemId]: true } : completedItems;

    // Check for Weakest Language Multiplier
    const profiles = JSON.parse(localStorage.getItem('langue_profiles') || '{}');
    const allXPs = LANG_KEYS.map(key => profiles[key]?.xp || 0);
    const minXP = Math.min(...allXPs.filter(x => x > 0).length ? allXPs.filter(x => x > 0) : [0]);
    const isWeakest = (userXP <= minXP) && (amount > 0);

    const finalAmount = isWeakest ? amount * 2 : amount;
    const newXP = userXP + finalAmount;

    const newLevelObj = CEFR_THRESHOLDS.find(t => newXP >= t.min && newXP < t.max) || CEFR_THRESHOLDS[CEFR_THRESHOLDS.length - 1];
    const newLevelStr = newLevelObj.level;

    setUserXP(newXP);
    setUserLevel(newLevelStr);
    setCompletedItems(newCompleted);

    // Save to global profiles object
    profiles[currentLang] = { xp: newXP, level: newLevelStr, completed: newCompleted };
    localStorage.setItem('langue_profiles', JSON.stringify(profiles));

    if (newLevelStr !== userLevel) {
      setShowLevelUpModal(newLevelStr);
    } else {
      let toastText = `+${finalAmount} XP`;
      if (isWeakest) toastText += " (x2 Weak Lang Bonus!)";
      setShowXPToast({ amount: finalAmount, text: toastText });
      setTimeout(() => setShowXPToast(null), 3000);
    }
  };

  const getProgressProps = () => {
    const currentObj = CEFR_THRESHOLDS.find(t => userLevel === t.level) || CEFR_THRESHOLDS[0];
    const range = currentObj.max === Infinity ? 1 : (currentObj.max - currentObj.min);
    const progressIntoLevel = userXP - currentObj.min;
    const percentage = currentObj.max === Infinity ? 100 : Math.min(100, (progressIntoLevel / range) * 100);
    return { percentage, currentObj };
  };

  const currentLangCode = LANG_KEYS[langIdx];
  const config = LANGUAGES[currentLangCode];
  const { data, tabs, theme, activeColor, name, nativeName, greeting, flag } = config;
  const shortCodeMap = { 'italian': 'it', 'hebrew': 'he', 'korean': 'ko', 'spanish': 'es', 'english': 'en', 'russian': 'ru', 'portuguese': 'pt', 'french': 'fr' };
  const shortCode = shortCodeMap[currentLangCode] || 'it';



  return (
    <div style={{ fontFamily: "'Georgia', 'Palatino', serif", minHeight: "100vh", background: "#faf8f2" }}>
      {currentView === "home" ? (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1f1c2c 0%, #928DAB 100%)",
          padding: 20
        }}>
          <div style={{ textAlign: "center", marginBottom: 60, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="/logo.png" alt="Pengu Glot" style={{ width: 140, height: 140, marginBottom: 20, borderRadius: 24, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }} />
            <h1 style={{ fontSize: "4rem", color: "#fff", margin: 0, textShadow: "0 4px 12px rgba(0,0,0,0.3)", letterSpacing: "-1px" }}>Pengu Glot</h1>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.8)", marginTop: 10 }}>Select a language to begin your journey</p>

            <button
              onClick={() => setShowPolyglotDashboard(true)}
              style={{
                marginTop: 20, padding: "12px 24px", borderRadius: 30, background: "rgba(255,255,255,0.2)",
                border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: 16, fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: 8
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.3)"; e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <span>🌍</span> Global Polyglot Profile
            </button>
          </div>

          <div style={{ display: "flex", gap: 30, flexWrap: "wrap", justifyContent: "center", maxWidth: 1000 }}>
            {LANG_KEYS.map((key, idx) => {
              const langConfig = LANGUAGES[key];
              return (
                <div
                  key={key}
                  onClick={() => {
                    setLangIdx(idx);
                    setCurrentView("learning");
                  }}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "30px 40px",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    minWidth: 240,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                  }}
                >
                  <div style={{ fontSize: "5rem", marginBottom: 15 }}>{langConfig.flag}</div>
                  <h2 style={{ margin: 0, fontSize: "2rem", color: langConfig.activeColor }}>{langConfig.nativeName}</h2>
                  <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "1.1rem" }}>{langConfig.name}</p>
                </div>
              );
            })}
          </div>

          {showPolyglotDashboard && <PolyglotDashboard onClose={() => setShowPolyglotDashboard(false)} />}
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="header-container" style={{ background: theme, padding: "28px 20px 20px", textAlign: "center", position: "relative", overflow: "hidden", transition: "background 0.5s ease" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", opacity: 0.3 }} />
            <div style={{ position: "relative" }}>

              {/* Home Button */}
              <button
                onClick={() => { setActiveTab("vocab"); setCurrentView("home"); }}
                style={{
                  position: "absolute", top: -10, left: 0,
                  padding: "6px 14px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "background 0.2s", display: "flex", alignItems: "center", gap: 6
                }}
              >
                <span>🏠</span> Home
              </button>

              {/* Dashboard Button */}
              <button
                onClick={() => setActiveTab("dashboard")}
                style={{
                  position: "absolute", top: -10, left: 100,
                  padding: "6px 14px", borderRadius: "20px", background: activeTab === "dashboard" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "background 0.2s", display: "flex", alignItems: "center", gap: 6
                }}
              >
                <span>📊</span> Dashboard
              </button>

              <div style={{ position: "absolute", top: -10, right: 0, display: "flex", gap: 10, alignItems: "center" }}>
                {/* XP Progress Bar */}
                <div style={{
                  background: "rgba(255, 255, 255, 0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20,
                  padding: "4px 10px", display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 13, fontWeight: 600,
                  whiteSpace: "nowrap"
                }}>
                  <span style={{ fontSize: 16 }} title={`${userXP} total XP`}>{getRankBadge(userLevel)}</span> {userLevel}
                  <div style={{ width: 50, height: 6, background: "rgba(0,0,0,0.3)", borderRadius: 3, overflow: "hidden" }} title={`${userXP} / ${getProgressProps().currentObj.max === Infinity ? 'MAX' : getProgressProps().currentObj.max} XP`}>
                    <div style={{
                      width: `${getProgressProps().percentage}%`,
                      background: "#4ade80", height: "100%", transition: "width 0.3s ease"
                    }} />
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <select
                    value={langIdx}
                    onChange={(e) => {
                      const newIdx = Number(e.target.value);
                      const newConfig = LANGUAGES[LANG_KEYS[newIdx]];
                      const isTabValid = newConfig.tabs.some(t => t.id === activeTab);
                      if (!isTabValid) {
                        setActiveTab(newConfig.tabs[0].id);
                      }
                      setLangIdx(newIdx);
                    }}
                    style={{
                      padding: "6px 28px 6px 14px",
                      borderRadius: "20px",
                      background: "rgba(255,255,255,0.2)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      transition: "background 0.2s",
                      appearance: "none",
                      WebkitAppearance: "none",
                      outline: "none"
                    }}
                  >
                    {LANG_KEYS.map((key, idx) => (
                      <option key={key} value={idx} style={{ color: "#333", background: "#fff" }}>
                        Mode: {LANGUAGES[key].flag} {LANGUAGES[key].name}
                      </option>
                    ))}
                  </select>
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: 10, color: "#fff" }}>▼</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img src={`/logo_${shortCode}.png`} alt="Pengu" style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.5)", backgroundColor: "#fff" }} />
                </div>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.9)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{greeting}</div>
              </div>
              <div className="header-title" style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: -0.5, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>{nativeName}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>Complete {name} Language Learning</div>
            </div>
          </div>

          {/* Tabs */}
          {activeTab !== "dashboard" && (
            <div className="tabs-container" style={{ background: "#fff", borderBottom: "1px solid #e8d99f", overflowX: "auto", display: "flex" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className="tab-btn"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "14px 16px",
                    border: "none",
                    borderBottom: activeTab === tab.id ? `3px solid ${activeColor}` : "3px solid transparent",
                    background: "transparent",
                    color: activeTab === tab.id ? activeColor : "#888",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: activeTab === tab.id ? 700 : 400,
                    fontSize: 13,
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    minWidth: 80,
                  }}
                >
                  <span className="tab-icon" style={{ fontSize: 18 }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="content-wrapper" style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 40px" }}>
            {activeTab === "dashboard" && (
              <DashboardTab
                userXP={userXP}
                userLevel={userLevel}
                completedItems={completedItems}
                cefrThresholds={[
                  { level: "A1", min: 0, max: 1500 },
                  { level: "A2", min: 1500, max: 4000 },
                  { level: "B1", min: 4000, max: 8000 },
                  { level: "B2", min: 8000, max: 15000 },
                  { level: "C1", min: 15000, max: 30000 },
                  { level: "C2", min: 30000, max: Infinity }
                ]}
                activeColor={activeColor}
              />
            )}
            {activeTab === "vocab" && <VocabularyTab data={data} gainXP={gainXP} />}
            {activeTab === "grammar" && <GrammarTab data={data} gainXP={gainXP} />}
            {activeTab === "builder" && (
              <SentenceBuilderTab data={data} languageStr={name} gainXP={gainXP} />
            )}
            {activeTab === "chat" && (
              <ConversationTab data={data} languageStr={name} gainXP={gainXP} />
            )}
            {activeTab === "idioms" && <IdiomsTab data={data} gainXP={gainXP} />}
            {activeTab === "videos" && <VideoTab data={data} gainXP={gainXP} />}
            {activeTab === "culture" && <CultureTab data={data} gainXP={gainXP} />}
            {activeTab === "alphabet" && (name === "Korean" || name === "Hebrew") && (
              <AlphabetTab
                alphabetData={name === "Korean" ? data.HANGUL_CATEGORIES : data.ALPHABET_CATEGORIES}
                langCode={name === "Korean" ? "ko-KR" : "he-IL"}
                gainXP={gainXP}
              />
            )}
            {activeTab === "placement" && (
              <PlacementTestTab data={data} gainXP={gainXP} />
            )}
            {activeTab === "speaking" && (
              <SpeakingTab data={data} gainXP={gainXP} activeColor={activeColor} />
            )}
          </div>
        </>
      )}

      {/* Toast Notification */}
      {showXPToast && (
        <div style={{
          position: "fixed", bottom: 40, right: 40, background: "#22c55e", color: "#fff",
          padding: "16px 24px", borderRadius: 12, boxShadow: "0 10px 25px rgba(34,197,94,0.4)",
          display: "flex", alignItems: "center", gap: 12, fontSize: 16, fontWeight: 700,
          animation: "slideIn 0.3s ease-out", zIndex: 1000
        }}>
          <span style={{ fontSize: 24 }}>✨</span>
          <div>
            <div>{showXPToast.text}</div>
            {showXPToast.amount > 0 && <div style={{ fontSize: 13, opacity: 0.9 }}>+{showXPToast.amount} XP</div>}
          </div>
        </div>
      )}

      {/* Full Screen Digital Certificate Modal */}
      {showLevelUpModal && (
        <LevelUpModal
          level={showLevelUpModal}
          langName={name}
          activeColor={activeColor}
          onClose={() => setShowLevelUpModal(false)}
        />
      )}

      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleUp {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
        `}
      </style>
    </div>
  );
}
