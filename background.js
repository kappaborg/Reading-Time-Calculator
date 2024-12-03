chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "calculateReadingTime",
        title: "Calculate Reading Time",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "calculateReadingTime" && info.selectionText) {
        const wordPerSec = 2;
        const text = info.selectionText.trim();
        const words = text.split(/\s+/).length;
        const time = words / wordPerSec;

        let result;
        if (time < 60) {
            result = `${Math.ceil(time)} seconds`;
        } else if (time < 3600) {
            result = `${Math.ceil(time / 60)} minutes`;
        } else {
            result = `${Math.floor(time / 3600)} hours`;
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: (readingTime) => {
                alert(`Estimated reading time: ${readingTime}`);
            },
            args: [result]
        });
    }
});
