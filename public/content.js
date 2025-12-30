function validPage(callback) {
  const urlParts = window.location.pathname.split('/');
  const currentUsername = urlParts[1];
  
  if (!currentUsername || urlParts.length > 2) {
    callback(false);
    return;
  }
  
  chrome.storage.sync.get(['username'], (result) => {
    const savedUsername = result.username;
    if (savedUsername && currentUsername === savedUsername) {
      callback(true);
    } else {
      callback(false);
    }
  });
}