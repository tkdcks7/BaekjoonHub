/* Sync to local storage */
chrome.storage.local.get('isSync', (data) => {
  keys = ['BaekjoonHub_token', 'BaekjoonHub_username', 'pipe_BaekjoonHub', 'stats', 'BaekjoonHub_hook', 'mode_type'];
  if (!data || !data.isSync) {
    keys.forEach((key) => {
      chrome.storage.sync.get(key, (data) => {
        chrome.storage.local.set({ [key]: data[key] });
      });
    });
    chrome.storage.local.set({ isSync: true }, (data) => {
      if (debug) console.log('BaekjoonHub Synced to local values');
    });
  } else {
    if (debug) console.log('Upload Completed. Local Storage status:', data);
    if (debug) console.log('BaekjoonHub Local storage already synced!');
  }
});

/**
 * @author https://gist.github.com/sumitpore/47439fcd86696a71bf083ede8bbd5466
 * Chrome의 Local StorageArea에서 개체 가져오기
 * @param {string} key
 */
async function getObjectFromLocalStorage(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, function (value) {
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

/**
 * @author https://gist.github.com/sumitpore/47439fcd86696a71bf083ede8bbd5466
 * Chrome의 Local StorageArea에 개체 저장
 * @param {*} obj
 */
async function saveObjectInLocalStorage(obj) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(obj, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

/**
 * @author https://gist.github.com/sumitpore/47439fcd86696a71bf083ede8bbd5466
 * Chrome Local StorageArea에서 개체 제거
 *
 * @param {string or array of string keys} keys
 */
async function removeObjectFromLocalStorage(keys) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.remove(keys, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

/**
 * Chrome의 Sync StorageArea에서 개체 가져오기
 * @param {string} key
 */
async function getObjectFromSyncStorage(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function (value) {
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

/**
 * Chrome의 Sync StorageArea에 개체 저장
 * @param {*} obj
 */
async function saveObjectInSyncStorage(obj) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set(obj, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

/**
 * Chrome Sync StorageArea에서 개체 제거
 * @param {string or array of string keys} keys
 */
async function removeObjectFromSyncStorage(keys) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.remove(keys, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

async function getToken() {
  return await getObjectFromLocalStorage('BaekjoonHub_token');
}

// async function getPipe() {
//   return await getObjectFromLocalStorage('pipe_BaekjoonHub');
// }

async function getGithubUsername() {
  return await getObjectFromLocalStorage('BaekjoonHub_username');
}

async function getStats() {
  return await getObjectFromLocalStorage('stats');
}

async function getHook() {
  return await getObjectFromLocalStorage('BaekjoonHub_hook');
}

async function getModeType() {
  return await getObjectFromLocalStorage('mode_type');
}

async function saveToken(token) {
  return await saveObjectInLocalStorage({ BaekjoonHub_token: token });
}

async function saveStats(stats) {
  return await saveObjectInLocalStorage({ stats });
}