const today = new Date().toLocaleDateString();

chrome.storage.local.get(["usage"], (result) => {
  const usage = result.usage || {};
  document.getElementById("usage-count").innerText =
    `AI Tools used ${usage[today] || 0} times today`;
});
