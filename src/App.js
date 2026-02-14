import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [stage, setStage] = useState("question"); // question, customize, reveal
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const noButtonRef = useRef(null);

  const noButtonTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again...",
    "Please? 🥺",
    "Don't break my heart!",
    "One more chance?",
  ];

  const handleNoHover = () => {
    const newTop = Math.random() * 70;
    const newLeft = Math.random() * 70;
    setNoButtonPosition({ top: newTop, left: newLeft });
    setNoClickCount((prev) => Math.min(prev + 1, noButtonTexts.length - 1));
  };

  const handleYes = () => {
    setStage("reveal");
    createHearts();
  };

  // const handleCustomizeSubmit = (e) => {
  //   e.preventDefault();
  //   if (recipientName.trim()) {
  //     setStage("reveal");
  //     createHearts();
  //   }
  // };

  const createHearts = () => {
    const container = document.querySelector(".hearts-container");
    if (!container) return;

    const emojis = ["❤️", "💕", "🐵", "🙈", "🙉", "🙊", "🐒"];

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDelay = Math.random() * 2 + "s";
        heart.style.fontSize = Math.random() * 20 + 20 + "px";
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
      }, i * 100);
    }
  };

  const createFloatingElements = () => {
    const container = document.querySelector(".background-floaters");
    if (!container) return;

    const elements = ["🐵", "🙈", "🙉", "🙊", "🐒", "🐾", "🎀", "💖"];

    setInterval(() => {
      const floater = document.createElement("div");
      floater.className = "background-float";
      floater.innerHTML = elements[Math.floor(Math.random() * elements.length)];
      floater.style.left = Math.random() * 100 + "%";
      floater.style.animationDuration = Math.random() * 10 + 15 + "s";
      floater.style.fontSize = Math.random() * 30 + 30 + "px";
      container.appendChild(floater);

      setTimeout(() => floater.remove(), 25000);
    }, 2000);
  };

  React.useEffect(() => {
    createFloatingElements();
  }, []);

  const resetApp = () => {
    setStage("question");
    setRecipientName("");
    setMessage("");
    setNoClickCount(0);
  };

  return (
    <div className="App">
      <div className="hearts-container"></div>
      <div className="background-floaters"></div>

      <div className="corner-decorations">
        <span className="corner-emoji top-left">🐵</span>
        <span className="corner-emoji top-right">🎀</span>
        <span className="corner-emoji bottom-left">🙈</span>
        <span className="corner-emoji bottom-right">🙊</span>
      </div>

      {stage === "question" && (
        <div className="stage question-stage">
          <div className="stage-decorations">
            <span className="stage-emoji">🐒</span>
            <span className="stage-emoji">💕</span>
            <span className="stage-emoji">🙉</span>
          </div>
          <h1 className="main-title">💝 Will you be my Valentine? 💝</h1>
          <div className="monkey-line">
            <span>🐵</span>
            <span>🙈</span>
            <span>🙉</span>
            <span>🙊</span>
            <span>🐒</span>
          </div>
          <div className="button-container">
            <button className="yes-button" onClick={handleYes}>
              Yes! 💕
            </button>
            <button
              ref={noButtonRef}
              className="no-button"
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              style={{
                position: "absolute",
                top: `${noButtonPosition.top}%`,
                left: `${noButtonPosition.left}%`,
              }}
            >
              {noButtonTexts[noClickCount]}
            </button>
          </div>
          <p className="hint">Try clicking "No" if you dare... 😏</p>
        </div>
      )}

      {/* {stage === "customize" && (
        <div className="stage customize-stage">
          <div className="capybara-corner">
            <img
              src="https://em-content.zobj.net/source/apple/391/capybara_1f9ab.png"
              alt="capybara"
              className="capybara-img"
            />
          </div>
          <h2 className="stage-title">Yay! 🎉 Let's personalize this...</h2>
          <div className="animal-parade">
            <span>🐵</span>
            <span>🎀</span>
            <span>💖</span>
            <span>🙈</span>
            <span>🎀</span>
            <span>🐒</span>
          </div>
          <form onSubmit={handleCustomizeSubmit} className="customize-form">
            <div className="form-group">
              <label>Their name:</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter their name"
                className="name-input"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Add a sweet message (optional):</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="You make my heart skip a beat..."
                className="message-input"
                rows="4"
              />
            </div>
            <button type="submit" className="submit-button">
              Create Card 💌
            </button>
          </form>
        </div>
      )} */}

      {stage === "reveal" && (
        <div className="stage reveal-stage">
          <div className="hello-kitty-corners">
            <img
              src="https://popcultureuncovered.com/wp-content/uploads/2018/12/5e965ff0dc9123f740e9e33c33c3ca71f9f57cf1_hq.gif?w=584"
              alt="aggretsuko"
              className="hello-kitty-img top-kitty"
            />
            <img
              src="https://i.pinimg.com/736x/67/00/f5/6700f5679bfbec2a745cf665d8b97352.jpg"
              alt="Hello Kitty"
              className="hello-kitty-img bottom-kitty"
            />
          </div>
          <div className="valentine-card">
            <div className="card-header-emojis">
              <span>🐵</span>
              <span>🙈</span>
              <span>🎀</span>
              <span>🙉</span>
              <span>🐒</span>
            </div>
            <h2 className="card-title">Happy Valentine's Day</h2>
            <h1 className="card-name">My love, Daniela! 💕</h1>
            <div className="card-hearts">💖 💝 💗 💓 💞</div>
            <div className="capybara-section">
              <img
                src="data:image/jpeg;base64,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"
                alt="capybara"
                className="card-capybara"
              />
              <span className="capybara-text">Us being 2 little monkeys</span>
            </div>
            {message && <p className="card-message">{message}</p>}
            <div className="card-from">
              <p>
                While I cant be there in person at the moment, and I know I am
                cutting it close with this I hope you enjoyed this little
                project I made for you. I love you very much and I miss you to
                the moon and back. I am sorry I can't see you this weekend but I
                hope make up this Valentine's Day date maybe a week or two from
                now. Ahem. Dear Dani, I love hearing you talk about your day or
                your past rotation experiences. I love hearing how excited you
                are about whats to come for your career. I love how much you've
                grown as an individaul. I hope to be there by our side cheering
                you on. I am so thankful to have met you. You are truly a
                blessing for anyone that meets you. You are such a supportive,
                loving, caring, intelligent, delightful person to be around.
                While I can try my best to describe you, I don't know that many
                big words but regardless there aren't any words that could
                perfectly describe you. You really are one in a million. I am so
                excited to see you continue to grow and flourish into the woman
                you are destined to be. I love you.
              </p>
              <p className="signature">From Your Monkey 💘</p>
            </div>
          </div>
          <button onClick={resetApp} className="restart-button">
            Start Over ↻
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
