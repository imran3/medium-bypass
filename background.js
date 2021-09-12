chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "open_in_incognito") {
            chrome.windows.create({"url": request.url, "incognito": true});
		}
    }
);