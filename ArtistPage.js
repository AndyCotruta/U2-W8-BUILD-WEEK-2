let artistId = "412";

function getData(search) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${search}`, options)
    .then((response) => response.json())
    .then((response) => {
      let info = response;

      console.log(info);
      RenderArtistName(info);
    })
    .catch((err) => console.error(err));
}

function RenderSongs(artist){
    fetch(``)
}

function RenderArtistName(info) {
  // Artist name
  let aristNameBox = document.getElementById("artistNameBox");
  aristNameBox.innerHTML = `<h1 class="title-artist" >${info.name}</h1> `;
}

getData(artistId);
