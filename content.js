function getPageHTML() {
  return document.documentElement.outerHTML;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "REQUEST_PAGE_HTML") {
    const html = getPageHTML();
    sendResponse({ html });
  }
  return true;
});
