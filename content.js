// content.js

// Request notification permission
if (Notification.permission !== "granted" && Notification.permission !== "denied") {
  Notification.requestPermission().then((permission) => {
    console.log("Notification permission:", permission);
  });
}

// Function to notify the user
function notifyUser(message) {
  if (Notification.permission === "granted") {
    new Notification("New Response", { body: message });
  }
}

// Set up a MutationObserver to watch for changes in the chat container
const chatContainer = document.querySelector("#chat-container"); // Replace with your chat container selector

if (chatContainer) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        // Check if a new message has been added
        const newMessages = mutation.addedNodes;
        if (newMessages.length > 0) {
          const lastMessage = newMessages[newMessages.length - 1].textContent; // Define lastMessage
          if (lastMessage) {
            notifyUser(lastMessage); // Use lastMessage
          }
        }
      }
    }
  });

  // Start observing the chat container for changes
  observer.observe(chatContainer, { childList: true });
} else {
  console.error("Chat container not found.");
}
