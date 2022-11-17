let params = new URLSearchParams(document.location.search); //searching for params in the navbar
const albumId = params.get("albumId"); //applying get() method to read the actual value present in the navbar - albumId is the one passed

async function getData(albumId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`,
    options
  )
    .then(async (response) => await response.json())
    .then((response) => {
      const data = response;
      console.log(data.tracks.data[0].artist.name);
      // console.log(data.tracks.data);
      renderAlbum(data);
    })
    .catch((err) => console.error(err));
}

getData(albumId);

function renderAlbum(data) {
  const albumContainer = document.getElementById("albumData");
  const albumCard = document.getElementById("card-album");
  let i = 0;

  artistId = data.artist.id;
  chosenAlbumTracks = data.tracks.data;
  chosenAlbumInfo = data.tracks.data[0].album;
  chosenArtist = data.tracks.data[0].artist.name;

  albumCard.innerHTML += `
    <div class="d-flex mt-5">
              <div class="card-album">
                <img
                  src="${chosenAlbumInfo.cover_medium}"
                  class="rendered-image"
                  alt="album-image"
                />
              </div>
              <div class="album-details px-3">
                
                 
                    <h3 class="albumTitle">ALBUM</h3>
                    <h1 class="title-album">${chosenAlbumInfo.title}</h1>
                  
                  <div>
                    <div class="d-flex artist-description">
                    <img
                        class="avatar"
                        src="${chosenAlbumInfo.cover}"
                        alt=""
                      />
                      <p class="artist-info-banner artist-numbers">
                      <span class="artist-decoration" onclick=goToArtist('${String(
                        artistId
                      )}')>${chosenArtist}</span> - 1994 - 15 songs, 38 min 22 sec
                      </p>
                    </div>
                  </div>
                
              </div>
            </div>`;
  const image = document.querySelector(".rendered-image");
  console.log(image);
  renderGradient(image);

  chosenAlbumTracks.forEach((element) => {
    let minutes = Math.floor(Math.random() * (4 - 2)) + 2;
    let seconds1 = Math.floor(Math.random() * (5 - 1)) + 1;
    let seconds2 = Math.floor(Math.random() * (9 - 0)) + 0;
    i++;
    albumContainer.innerHTML += `    
    <li class="music-list">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="mx-3 play-music">
          <p id="index-album" class="info-list-paragraph">${i}</p>
          <i id="triangle-album" class="bi bi-caret-right-fill hidden"></i>
        </div>
        <div>
          <p class="info-title-paragraph">
            <strong>${element.title}</strong>
          </p>
          <p class="info-list-paragraph">${element.artist.name}</p>
        </div>
      </div>
      <div class="">
        <p class="info-list-paragraph">${minutes}:${seconds1}${seconds2}</p>
      </div>
    </div>
  </li>`;
  });
}

const goToArtist = (artistId) => {
  console.log(`This is the artist id ${artistId} `);
  window.location.assign(`./artist.html?artistId=${artistId}`);
};

function getColor(imageElement, ratio) {
  const canvas = document.createElement("canvas");
  let width = (canvas.width = imageElement.width);
  let height = (canvas.height = imageElement.height);
  const context = canvas.getContext("2d");
  context.drawImage(imageElement, 0, 0);
  let data, length;
  let i = -4,
    count = 0;
  try {
    data = context.getImageData(0, 0, width, height);
    length = data.data.length;
  } catch (err) {
    console.error(err);
    return {
      R: 0,
      G: 0,
      B: 0,
    };
  }
  let R, G, B;
  R = G = B = 0;
  while ((i += ratio * 4) < length) {
    ++count;
    R += data.data[i];
    G += data.data[i + 1];
    B += data.data[i + 2];
  }
  R = ~~(R / count);
  G = ~~(G / count);
  B = ~~(B / count);
  return {
    R,
    G,
    B,
  };
}

const renderGradient = (image) => {
  image.crossOrigin = "Anonymous";
  image.onload = function () {
    const { R, G, B } = getColor(image, 4);
    const centerSection = document.querySelector(".center-section");
    centerSection.style.backgroundImage = `linear-gradient( 0deg, rgba(18, 18, 18, 1) 0%, rgba(${R}, ${G}, ${B}, 1) 100% )`;
  };
};

// ..................Test function that actually works......................................//

// const image = document.querySelector(".test-img");
// image.crossOrigin = "Anonymous";
// image.onload = function () {
//   const { R, G, B } = getColor(image, 4);
//   const centerSection = document.querySelector(".center-section");
//   centerSection.style.backgroundImage = `linear-gradient( 0deg, rgba(18, 18, 18, 1) 0%, rgba(${R}, ${G}, ${B}, 1) 100% )`;
// };

//..................................Test function that actually works................................//

function changeGreenButton() {
  playButton = document.getElementById("play-album");
  console.log(playButton);
  pausedButton = document.getElementById("paused-album");
  playButton.classList.toggle("hidden");
  pausedButton.classList.toggle("hidden");
}

function fillHeart() {
  heartFilled = document.getElementById("heart-fill-album");
  regularHeart = document.getElementById("heart-album");
  heartFilled.classList.toggle("hidden");
  regularHeart.classList.toggle("hidden");
}

//////////SIMONE FINISH THIS FUNCTION//////////////
// playMusicBtn = document.querySelectorAll(".play-music");
// console.log(playMusicBtn);
function revealAdditionalBtns(clickEvent) {
  // indexNumber = document.getElementById("index-album");
  // triangle = document.getElementById("triangle-album");
  clickEvent.classList.toggle("hidden");
  clickEvent.classList.toggle("hidden");
}
