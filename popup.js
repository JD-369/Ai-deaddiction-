const today = new Date().toLocaleDateString();

chrome.storage.local.get(["usageTime"], (result) => {
  const usageTime = result.usageTime || {};
  const seconds = usageTime[today] || 0;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const remainingSec = seconds % 60;

  document.getElementById("usage-count").innerText =
    `Used AI Tools for ${hours} h ${remainingMinutes} min ${remainingSec} sec today`;
});
