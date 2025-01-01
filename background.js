// background.js

// Function to update the badge based on the active tab
function updateBadge(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    if (tab.url) {
      // Set the badge to "O" (active)
      chrome.action.setBadgeText({ text: "O", tabId });
      chrome.action.setBadgeBackgroundColor({ color: "#00FF00", tabId }); // Green
    } else {
      // Set the badge to "X" (inactive)
      chrome.action.setBadgeText({ text: "X", tabId });
      chrome.action.setBadgeBackgroundColor({ color: "#FF0000", tabId }); // Red
    }
  });
}

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  updateBadge(activeInfo.tabId);
});

// Listen for tab updates (e.g., URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    updateBadge(tabId);
  }
});

// Initialize the badge when the extension starts
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (tab) {
    updateBadge(tab.id);
  }
});
