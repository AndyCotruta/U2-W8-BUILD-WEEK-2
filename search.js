const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "019cb50f37mshcb3530c666ebd8ep1595bdjsn189628c0d9c1",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch("https://deezerdevs-deezer.p.rapidapi.com/track/1109739", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
