// popup.js
document.addEventListener("DOMContentLoaded", () => {
  // Get the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab && tab.url) {
      // Extract the domain from the URL
      const domain = new URL(tab.url).hostname;

      // Display the domain in the popup
      document.querySelector(".hello-world").textContent = `You are on page ${domain}`;
    } else {
      document.querySelector(".hello-world").textContent = "Unable to fetch the current page URL.";
    }
  });
});
