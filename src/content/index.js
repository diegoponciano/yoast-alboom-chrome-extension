console.log('content-script!')
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
    if (request.greeting === 'hello') {
      var linkPreview = document.querySelector('div#app-viewport header a[target=_blank]')
      console.log('linkPreview')
      console.log(linkPreview)
      sendResponse({farewell: 'goodbye', previewUrl: linkPreview.href})
    }
  }
)
