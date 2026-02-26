import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import * as italianData from "./data";
import * as koreanData from "./korean_data";
import * as hebrewData from "./hebrew_data";
import * as spanishData from "./spanish_data";

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
function VocabularyTab({ data }) {
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

  const [typeFilter, setTypeFilter] = useState("all");
  const wordTypes = ["all", "noun", "verb", "adjective", "adverb", "preposition", "conjunction", "pronoun", "number", "greeting"];
  const filteredCards = typeFilter === "all" ? cards : cards.filter(c => c.type === typeFilter);
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
    setCards(shuffle(data.VOCABULARY));
    setCardIdx(0);
    setFlipped(false);
    setTypeFilter("all");
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
        {wordTypes.map(t => {
          const count = t === "all" ? data.VOCABULARY.length : data.VOCABULARY.filter(v => v.type === t).length;
          if (count === 0 && t !== "all") return null;
          return (
            <button key={t} onClick={() => { setTypeFilter(t); setCardIdx(0); setFlipped(false); }}
              style={{ padding: "4px 12px", borderRadius: 14, border: typeFilter === t ? "none" : "1px solid #ddd", background: typeFilter === t ? "#8b6914" : "#f5f0e8", color: typeFilter === t ? "#fff" : "#555", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600, textTransform: "capitalize" }}>
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
            <Badge color={card.type}>{card.type}</Badge>
            <div className="flashcard-word" style={{ fontSize: 36, fontWeight: 700, marginTop: 16, textAlign: "center", transition: "all 0.2s" }}>
              {flipped ? card.en : card.it}
            </div>
            {!flipped && <div style={{ marginTop: 12, fontSize: 13, color: "#999" }}>Click to reveal</div>}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: "center" }}>
            <button
              onClick={() => { setCardIdx((i) => (i - 1 + filteredCards.length) % filteredCards.length); setFlipped(false); }}
              style={btnStyle("#fff", "#8b6914")}
            >← Prev</button>
            <button
              onClick={() => { setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 })); setCardIdx((i) => (i + 1) % filteredCards.length); setFlipped(false); }}
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
          <div style={{ fontSize: 32, fontWeight: 700, color: "#222", marginBottom: 8 }}>{mcq.correct.it}</div>
          <Badge color={mcq.correct.type}>{mcq.correct.type}</Badge>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
            {mcq.opts.map((opt, i) => {
              const isCorrect = opt.it === mcq.correct.it;
              const isSelected = mcqAnswer?.it === opt.it;
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
                    const correct = opt.it === mcq.correct.it;
                    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
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
function GrammarTab({ data }) {
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
    setScore((s) => ({ correct: s.correct + (i === q.answer ? 1 : 0), total: s.total + 1 }));
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
function SentenceBuilderTab({ data, languageStr }) {
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
function ConversationTab({ data, languageStr }) {
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
function IdiomsTab({ data }) {
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
                <button key={i} onClick={() => { if (!quizAnswer) setQuizAnswer(opt); }} style={{ padding: "13px 18px", borderRadius: 10, border, background: bg, textAlign: "left", cursor: quizAnswer ? "default" : "pointer", fontFamily: "inherit", fontSize: 15, transition: "all 0.2s" }}>
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
function AlphabetTab({ alphabetData, langCode }) {
  const playAudio = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode; // e.g., 'ko-KR', 'he-IL'
    window.speechSynthesis.speak(utterance);
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
      { id: "idioms", label: "Phrases & Idioms", icon: "🇮🇹" }
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
      { id: "idioms", label: "Phrases & Idioms", icon: "🎎" }
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
      { id: "idioms", label: "Phrases & Idioms", icon: "🐪" }
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
      { id: "idioms", label: "Phrases & Idioms", icon: "🇪🇸" }
    ]
  }
};

const LANG_KEYS = ["italian", "korean", "hebrew", "spanish"];

export default function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home' or 'learning'
  const [langIdx, setLangIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("vocab");

  const currentLangCode = LANG_KEYS[langIdx];
  const config = LANGUAGES[currentLangCode];
  const { data, tabs, theme, activeColor, name, nativeName, greeting } = config;



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
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h1 style={{ fontSize: "4rem", color: "#fff", margin: 0, textShadow: "0 4px 12px rgba(0,0,0,0.3)", letterSpacing: "-1px" }}>Langue Learning</h1>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.8)", marginTop: 10 }}>Select a language to begin your journey</p>
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
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="header-container" style={{ background: theme, padding: "28px 20px 20px", textAlign: "center", position: "relative", overflow: "hidden", transition: "background 0.5s ease" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", opacity: 0.3 }} />
            <div style={{ position: "relative" }}>

              {/* Home Button */}
              <button
                onClick={() => setCurrentView("home")}
                style={{
                  position: "absolute", top: -10, left: 0,
                  padding: "6px 14px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "background 0.2s", display: "flex", alignItems: "center", gap: 6
                }}
              >
                <span>🏠</span> Home
              </button>

              <div style={{ position: "absolute", top: -10, right: 0 }}>
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
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>{greeting}</div>
              <div className="header-title" style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: -0.5, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>{nativeName}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>Complete {name} Language Learning</div>
            </div>
          </div>

          {/* Tabs */}
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

          {/* Content */}
          <div className="content-wrapper" style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 40px" }}>
            {activeTab === "vocab" && <VocabularyTab data={data} />}
            {activeTab === "grammar" && <GrammarTab data={data} />}
            {activeTab === "builder" && (
              <SentenceBuilderTab data={data} languageStr={name} />
            )}
            {activeTab === "chat" && (
              <ConversationTab data={data} languageStr={name} />
            )}
            {activeTab === "idioms" && <IdiomsTab data={data} />}
            {activeTab === "alphabet" && (name === "Korean" || name === "Hebrew") && (
              <AlphabetTab
                alphabetData={name === "Korean" ? data.HANGUL_CATEGORIES : data.ALPHABET_CATEGORIES}
                langCode={name === "Korean" ? "ko-KR" : "he-IL"}
              />
            )}
          </div>
        </>
      )}
      <Analytics />
    </div>
  );
}
