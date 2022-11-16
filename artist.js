let parameters = new URLSearchParams(document.location.search); //searching for params in the navbar
const artistId = parameters.get("artistId"); //applying get() method to read the actual value present in the navbar - albumId is the one passed

async function getData(search) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${search}`,
    options
  )
    .then(async (response) => await response.json())
    .then((response) => {
      let info = response;
      let chosenArtist = info.name;
      console.log(chosenArtist);
      renderArtistName(info);
      getSongs(chosenArtist);
    })
    .catch((err) => console.error(err));
}

function renderArtistName(info) {
  ///getting artist name
  let artistNameBox = document.getElementById("artistNameBox");
  artistNameBox.innerHTML = `<h1 class="title-artist">${info.name}</h1>`;
  ///getting background image
  let background = document.getElementById("background");
  background.classList.add("background");
  background.style.backgroundImage = `url(${info.picture_xl})`;
}

async function getSongs(search) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${search}`,
    options
  )
    .then(async (response) => await response.json())
    .then((response) => {
      let info = response;
      renderSongs(info);
    })
    .catch((err) => console.error(err));
}

function renderSongs(info) {
  let musicListBox = document.getElementById("musicList");
  let musicList = info.data;
  musicList.forEach((element, index) => {
    let minutes = Math.floor(Math.random() * (4 - 2)) + 2;
    let seconds1 = Math.floor(Math.random() * (5 - 1)) + 1;
    let seconds2 = Math.floor(Math.random() * (9 - 0)) + 0;
    musicListBox.innerHTML += `
    <li class="music-list">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="mr-5">
          <p class="info-list-paragraph">${index + 1}.</p>
        </div>
        <div>
        <p class="info-list-paragraph">
            <strong>${element.title}</strong>
          </p>
       
          <p class="info-list-paragraph">${element.artist.name}</p>
        </div>
      </div>
  
      <div class="mr-3">
        <p class="info-list-paragraph">${minutes}:${seconds1}${seconds2}</p>
      </div>
    </div>
  </li>`;
  });
}

getData(artistId);
