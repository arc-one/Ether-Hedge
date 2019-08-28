export const getFromLS = (key) => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

export const saveToLS = (key, value) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      key,
      JSON.stringify({
        [key]: value
      })
    );
  }
}
