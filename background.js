// Create an alarm to trigger every day at 11:00 AM
chrome.alarms.create("clockInAlarm", {
    when: Date.now() + 1000, // Start ASAP for the first time
    periodInMinutes: 24 * 60 // Repeat every 24 hours
  });
  
  // Listen for the alarm event
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "clockInAlarm") {
      const dayOfWeek = new Date().getDay();
      // Check if today is Monday (1) to Friday (5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Find the tab with the Darwinbox URL
        chrome.tabs.query({ url: "http://connections.darwinbox.in/*" }, (tabs) => {
          if (tabs.length > 0) {
            // If the tab exists, execute the content script
            chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
          } else {
            // If the tab doesn't exist, create a new tab and then execute the content script
            chrome.tabs.create({ url: "http://connections.darwinbox.in/" }, (tab) => {
              chrome.tabs.executeScript(tab.id, { file: "content.js" });
            });
          }
        });
      }
    }
  });
  