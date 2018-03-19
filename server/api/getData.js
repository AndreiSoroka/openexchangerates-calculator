const fetch = require('node-fetch');
const Storage = require('node-storage');
const store = new Storage(__dirname + '/_store.json');


let storageData = store.get('dataServer');

module.exports = async function (req, res) {
  let data = {};

  if (storageData && storageData.timestamp && Date.now() - storageData.timestamp * 1000 <= 60 * 60 * 1000) {
    data = storageData;
    data['isStorage'] = true;
  } else {
    let request = await fetch('https://openexchangerates.org/api/latest.json?app_id=b9c8712c109e43b592f548116204da71');
    data = await request.json();
    storageData = data;
    store.put('dataServer', Object.assign({}, data));
    data['isStorage'] = false;
  }

  res.send(JSON.stringify(data));
};
