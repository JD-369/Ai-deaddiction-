(function () {
  const today = new Date().toLocaleDateString();

  chrome.storage.local.get(["usage"], (result) => {
    let usage = result.usage || {};
    usage[today] = (usage[today] || 0) + 1;

    chrome.storage.local.set({ usage });

    alert("🧠 Think first before asking AI.\nTry solving it on your own!");
  });
})();
