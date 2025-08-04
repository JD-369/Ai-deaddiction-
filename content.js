
function showBlockingOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "thinkmore-overlay";

  overlay.innerHTML = `
    <div id="thinkmore-popup">
      <h2>🧠 Think First!</h2>
      <p>Try solving it on your own before asking AI.</p>
      <button id="thinkmore-ok">Okay, I'll try</button>
    </div>
  `;

  Object.assign(overlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#0201013a",
    color: "#fff",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });

  
  const popupStyle = `
    #thinkmore-popup {
      background: white;
      color: #333;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      max-width: 320px;
      font-family: sans-serif;
      box-shadow: 0 6px 20px #631717d6;
    }
    #thinkmore-popup h2 {
      margin-top: 0;
    }
    #thinkmore-popup button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 14px;
      border: none;
      background-color: rgba(149, 28, 28, 1);
      color: white;
      border-radius: 6px;
      cursor: pointer;
    }
    #thinkmore-popup button:hover {
      background-color: rgba(128, 17, 17, 0.76);
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = popupStyle;
  document.head.appendChild(styleTag);

  
  document.body.appendChild(overlay);

  
  document.getElementById("thinkmore-ok")?.addEventListener("click", () => {
    overlay.remove();
  });
}


showBlockingOverlay();



let startTime = Date.now();

function saveUsageDuration() {                           // Duration calculation
  const duration = Math.round((Date.now() - startTime) / 1000); 
  const today = new Date().toLocaleDateString();

  chrome.storage.local.get(["usageTime"], (result) => {
    let usageTime = result.usageTime || {};
    usageTime[today] = (usageTime[today] || 0) + duration;
    chrome.storage.local.set({ usageTime });
  });
}


document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    saveUsageDuration();
  } else {
    startTime = Date.now(); 
  }
});

window.addEventListener("beforeunload", saveUsageDuration); // Track the page is closed or refreshed
