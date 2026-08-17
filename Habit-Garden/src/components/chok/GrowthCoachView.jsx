import { useEffect, useRef, useState } from "react";
import "./GrowthCoachView.css";

function GrowthCoachView({ habits = [] }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEnd = useRef(null);

  // Scroll to the newest message
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Get a simple response from the coach
  const getCoachReply = (text) => {
    const message = text.toLowerCase();

    if (message.includes("morning") || message.includes("routine")) {
      return "Start with a simple morning routine. Pick 2 or 3 small habits and do them at the same time each day. 🌱";
    }

    if (message.includes("water") || message.includes("hydrated")) {
      return "Keep a bottle of water nearby and take small sips throughout the day. You can also set reminders. 💧";
    }

    if (message.includes("reading")) {
      return "Start with just 10 minutes of reading each day. Once it becomes easy, slowly increase the time. 📖";
    }

    if (message.includes("consistent") || message.includes("consistency")) {
      return "Don't try to be perfect. Focus on doing your habit regularly, even when you can only do a little. 🌿";
    }

    if (message.includes("habit")) {
      return "Choose one small habit, connect it to something you already do, and repeat it every day. 🌱";
    }

    return "That's a good question! Start small, stay consistent, and give yourself time to grow. 🌿";
  };

  // Send a message
  const handleSend = (text = input) => {
    const message = text.trim();

    if (!message || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate the coach thinking
    setTimeout(() => {
      const coachMessage = {
        id: Date.now() + 1,
        role: "coach",
        content: getCoachReply(message),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((previous) => [...previous, coachMessage]);
      setLoading(false);
    }, 700);
  };

  const suggestions = [
    "How do I build a morning routine?",
    "How can I stay hydrated?",
    "How do I build a reading habit?",
    "How do I stay consistent?",
  ];

  return (
    <main className="coach-page">
      {/* Header */}
      <div className="coach-header">
        <div className="coach-icon">🌱</div>

        <div>
          <h1>Growth Coach</h1>
          <p>Always here to help you grow</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="chat-area">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="welcome">
            <div className="welcome-icon">🌿</div>

            <h2>Hi! I'm your Growth Coach.</h2>

            <p>Ask me about building habits or keeping your plants healthy.</p>

            <div className="suggestions">
              {suggestions.map((suggestion) => (
                <button key={suggestion} onClick={() => handleSend(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.role === "user" ? "user-message" : "coach-message"
            }`}
          >
            {message.role === "coach" && (
              <span className="coach-name">🌱 Growth Coach</span>
            )}

            <div className="message-bubble">{message.content}</div>

            <span className="message-time">{message.time}</span>
          </div>
        ))}

        {/* Loading message */}
        {loading && (
          <div className="thinking">🌱 Growth Coach is thinking...</div>
        )}

        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <form
        className="coach-input"
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask your coach anything..."
        />

        <button type="submit" disabled={!input.trim() || loading}>
          Send
        </button>
      </form>
    </main>
  );
}

export default GrowthCoachView;
