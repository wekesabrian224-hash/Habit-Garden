import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

const GrowthCoachView = ({ habits }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // Scroll to the newest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    // Send message to the coach
    const handleSend = async (customPrompt) => {
        const text = customPrompt || input.trim();

        if (!text || loading) return;

        const userMessage = {
            id: `user-${Date.now()}`,
            role: "user",
            content: text,
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages((previous) => [...previous, userMessage]);

        if (!customPrompt) {
            setInput("");
        }

        setLoading(true);

        try {
            const response = await fetch("/api/coach", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: text,
                    habits,
                    history: messages.slice(-6),
                }),
            });

            const data = await response.json();

            const coachMessage = {
                id: `coach-${Date.now()}`,
                role: "assistant",
                content:
                    data.reply ||
                    "I'm always here to help your daily habits blossom! 🌿",
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            setMessages((previous) => [...previous, coachMessage]);
        } catch (error) {
            console.error("Coach API Call Error:", error);

            const errorMessage = {
                id: `coach-${Date.now()}`,
                role: "assistant",
                content:
                    "Remember, even small steps help your soil rest and stay healthy! 🌱",
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            setMessages((previous) => [...previous, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="pt-20 pb-36 px-4 max-w-[1100px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <header className="flex items-center gap-3 pb-4 border-b border-[#c3c8bf]/30 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#8ba888] text-[#243d24] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl filled">
                        potted_plant
                    </span>
                </div>

                <div>
                    <h1 className="font-bold text-xl text-[#1c1c17] dark:text-[#fdf9f0]">
                        Growth Coach
                    </h1>

                    <p className="text-xs text-[#434841] dark:text-[#c3c8bf]">
                        Always here to help you grow
                    </p>
                </div>
            </header>

            {/* Messages */}
            <section className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[350px]">

                {messages.length === 0 ? (
                    <motion.section
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-md mx-auto py-8"
                    >
                        <div className="w-24 h-24 mx-auto rounded-full bg-[#ece8df] dark:bg-[#243d24] flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-[#4a6549]">
                                eco
                            </span>
                        </div>

                        <h2 className="font-bold text-xl text-[#1c1c17] dark:text-[#fdf9f0] mb-2">
                            Hi! I'm your Growth Coach.
                        </h2>

                        <p className="text-sm text-[#434841] dark:text-[#c3c8bf] mb-8">
                            Ask me about building habits or how to keep your plants thriving 🌿
                        </p>

                        {/* Suggestions */}
                        <div className="flex flex-wrap justify-center gap-2.5">
                            {[
                                "How do I build a morning routine?",
                                "Tips for staying hydrated?",
                                "How to build a reading habit?",
                            ].map((prompt) => (
                                <button
                                    key={prompt}
                                    onClick={() => handleSend(prompt)}
                                    className="bg-[#f1eee5] dark:bg-[#243d24] text-[#1c1c17] dark:text-[#ccebc7] px-4 py-2.5 rounded-full text-xs font-semibold"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </motion.section>
                ) : (
                    messages.map((message) => (
                        <article
                            key={message.id}
                            className={`flex flex-col ${message.role === "user"
                                    ? "items-end"
                                    : "items-start"
                                }`}
                        >
                            {message.role === "assistant" && (
                                <small className="text-[#737970]">
                                    🌱 Growth Coach
                                </small>
                            )}

                            <p
                                className={`max-w-[85%] px-5 py-3.5 rounded-3xl ${message.role === "user"
                                        ? "bg-[#4a6549] text-white"
                                        : "bg-[#8ba888] dark:bg-[#243d24]"
                                    }`}
                            >
                                {message.content}
                            </p>

                            <small className="text-[#737970]">
                                {message.timestamp}
                            </small>
                        </article>
                    ))
                )}

                {/* Loading */}
                {loading && (
                    <p className="text-sm text-[#737970] italic">
                        🌱 Coach is thinking...
                    </p>
                )}

                <div ref={messagesEndRef} />
            </section>

            {/* Input */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSend();
                }}
                className="bg-[#f1eee5] dark:bg-[#243d24] rounded-2xl p-2 flex items-center"
            >
                <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask your coach anything..."
                    className="flex-grow bg-transparent outline-none px-3"
                />

                <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="bg-[#4a6549] text-white p-3 rounded-xl disabled:opacity-50"
                >
                    <span className="material-symbols-outlined">
                        send
                    </span>
                </button>
            </form>
        </main>
    );
};

export { GrowthCoachView };