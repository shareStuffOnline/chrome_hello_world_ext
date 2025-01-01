document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab) {
      document.querySelector(".current-page").textContent = "No active tab found.";
      return;
    }

    const domain = new URL(tab.url).hostname;
    document.querySelector(".current-page").textContent = `You are on page: ${domain}`;

    chrome.tabs.sendMessage(tab.id, { type: "REQUEST_PAGE_HTML" }, (response) => {
      if (chrome.runtime.lastError) {
        document.querySelector("#html-content").textContent =
          "Could not load HTML. This page may be restricted by Chrome.";
        return;
      }

      if (response && response.html) {
        document.querySelector("#html-content").textContent = response.html;
      } else {
        document.querySelector("#html-content").textContent =
          "No HTML received from content script.";
      }
    });
  });
});
