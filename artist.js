let artistId = "412";
let artistName = "greenday";

async function getData(search) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/artist/${search}`,
    options
  )
    .then(async (response) => await response.json())
    .then((response) => {
      let info = response;
      renderArtistName(info);
      // console.log(info);
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
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`,
    options
  )
    .then(async (response) => await response.json())
    .then((response) => {
      let info = response;
      renderSongs(info);
      // console.log(info.data);
    })
    .catch((err) => console.error(err));
}

function renderSongs(info) {
  let musicListBox = document.getElementById("musicList");
  let musicList = info.data;
  musicList.forEach((element) => {
    // console.log(element);
    musicListBox.innerHTML += `
    <li>
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="mr-5">
          <p class="info-list-paragraph">1</p>
        </div>
        <div>
          <p class="info-list-paragraph">
            <strong>${element.title}</strong>
          </p>
          <p class="info-list-paragraph">${element.artist.name}</p>
        </div>
      </div>
  
      <div class="mr-3">
        <p class="info-list-paragraph">2:07</p>
      </div>
    </div>
  </li>`;
  });
}

getSongs(artistName);
getData(artistId);
