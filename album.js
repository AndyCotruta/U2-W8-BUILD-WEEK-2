window.onload = () => {
  getUser();
};

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
        <div class="d-flex mx-3">
          <p class="info-list-paragraph song-number">${i}</p>
              <i class="li-audio-controls d-none bi bi-play-fill li-pl-btn"></i>
              <i class="li-audio-controls d-none bi bi-pause-fill li-pa-btn"></i>
        </div>
       
        <div>
          <p class="info-title-paragraph rendered-song-title">
            <strong>${element.title}</strong>
          </p>
          <p class="info-list-paragraph rendered-artist-name">${element.artist.name}</p>
        </div>
        <audio src="${element.preview}" id="audio"></audio>
      </div>
      <div class="d-flex">
      <i class="bi bi-heart d-flex align-items-center hidden px-2"></i>
        <p class="info-list-paragraph d-flex align-items-center px-2">${minutes}:${seconds1}${seconds2}</p>
        <i class="bi bi-three-dots d-flex align-items-center hidden px-2"></i>
      </div>
    </div>
  </li>`;
  });
  const audioArray = document.querySelectorAll("#audio");
  const liArray = document.querySelectorAll(".music-list");
  const titleArray = document.querySelectorAll(".rendered-song-title");
  const artistArray = document.querySelectorAll(".rendered-artist-name");
  const songNumberArray = document.querySelectorAll(".song-number");
  const audioControlsArray = document.querySelectorAll(".li-audio-controls");
  const liPlayBtn = document.querySelectorAll(".li-pl-btn");
  const liPauseBtn = document.querySelectorAll(".li-pa-btn");
  const liHeart = document.querySelectorAll(".bi-heart");
  const liDots = document.querySelectorAll(".bi-three-dots");

  playLiAudio(
    audioArray,
    liArray,
    titleArray,
    artistArray,
    songNumberArray,
    audioControlsArray,
    liPlayBtn,
    liPauseBtn,
    liHeart,
    liDots
  );
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

const getUser = () => {
  const usernameText = document.querySelector(".user-name-text");
  const currentUser = localStorage.getItem("username");
  console.log(currentUser);
  if (currentUser !== null) {
    usernameText.innerText = currentUser;
  } else {
    const userNameDiv = document.querySelector(".user-name-div");
    userNameDiv.classList.add("hidden");
    const navbarSignupBtn = document.querySelector(".navbar-signup-btn");
    navbarSignupBtn.classList.remove("d-none");
    const navbarLoginBtn = document.querySelector(".navbar-login-btn");
    navbarLoginBtn.classList.remove("d-none");
  }
};

const dropdownBtn = document.querySelector(".dropdownBtn");
dropdownBtn.addEventListener("click", () => {
  const dropdownMenu = document.querySelector(".dropMenu");
  dropdownMenu.classList.toggle("d-none");
});

const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", () => {
  const userNameDiv = document.querySelector(".user-name-div");
  userNameDiv.classList.add("hidden");
  const navbarSignupBtn = document.querySelector(".navbar-signup-btn");
  navbarSignupBtn.classList.remove("d-none");
  const navbarLoginBtn = document.querySelector(".navbar-login-btn");
  navbarLoginBtn.classList.remove("d-none");
  const dropdownMenu = document.querySelector(".dropMenu");
  dropdownMenu.classList.add("d-none");
  localStorage.clear();
});

const loginBtn = document.querySelector(".navbar-login-btn");
loginBtn.addEventListener("click", () => {
  window.location.assign("./login.html");
});
const playLiAudio = (
  audioArray,
  liArray,
  titleArray,
  artistArray,
  songNumberArray,
  audioControlsArray,
  liPlayBtn,
  liPauseBtn,
  liHeart,
  liDots
) => {
  liArray.forEach((li, index) => {
    playGlobal(
      audioArray,
      index,
      liArray,
      liPlayBtn,
      liPauseBtn,
      titleArray,
      artistArray,
      songNumberArray
    );
    nowPlaying(
      audioArray,
      index,
      liArray,
      liPlayBtn,
      liPauseBtn,
      titleArray,
      artistArray,
      songNumberArray
    );
    li.addEventListener("mouseover", () => {
      if (!liArray[index].classList.contains("clicked")) {
        liArray[index].classList.add("white-background");
        liPlayBtn[index].classList.remove("d-none");
        liHeart[index + 1].classList.remove("hidden");
        liDots[index + 1].classList.remove("hidden");
        songNumberArray[index].classList.add("d-none");
        for (let i = 0; i < liArray.length; i++) {
          if (i !== index) {
            liArray[i].classList.remove("white-background");
            liPlayBtn[i].classList.add("d-none");
            liHeart[i + 1].classList.add("hidden");
            liDots[i + 1].classList.add("hidden");
            songNumberArray[i].classList.remove("d-none");
          }
        }
      }
    });

    liPlayBtn[index].addEventListener("click", () => {
      liArray.forEach((li) => {
        li.classList.remove("clicked");
      });

      liPauseBtn.forEach((btn) => {
        btn.classList.add("d-none");
      });
      songNumberArray.forEach((songNumber) => {
        if (songNumber.classList.contains("song-index-away")) {
          songNumber.classList.remove("song-index-away");
        }
      });

      liArray[index].classList.add("clicked");
      liPlayBtn[index].classList.add("d-none");
      liPauseBtn[index].classList.remove("d-none");
      songNumberArray[index].classList.add("song-index-away");

      const playerSongTitle = document.querySelector(".song-title");
      playerSongTitle.innerText = titleArray[index].innerText;

      const playerArtistName = document.querySelector(".song-artist");
      playerArtistName.innerText = artistArray[index].innerText;
      liArray[index].classList.add("white-background-all");
      titleArray[index].classList.add("green-text");
      artistArray[index].classList.add("white-text");
      for (let i = 0; i < audioArray.length; i++) {
        audioArray[i].pause();
        if (i !== index) {
          liArray[i].classList.remove("white-background-all");
          titleArray[i].classList.remove("green-text");
          artistArray[i].classList.remove("white-text");
        }
      }
      console.log("Audio Array for liPlayButton: " + audioArray);
      audioArray[index].play();
      const globalPlayBtn = document.querySelector(".global-play-btn");
      globalPlayBtn.classList.add("d-none");
      const globalPauseBtn = document.querySelector(".global-pause-btn");
      globalPauseBtn.classList.remove("d-none");

      const nowPlayingPlayBtn = document.querySelector(".pl-btn");
      nowPlayingPlayBtn.classList.add("d-none");
      const nowPlayingPauseBtn = document.querySelector(".pa-btn");
      nowPlayingPauseBtn.classList.remove("d-none");
    });

    liPauseBtn[index].addEventListener("click", () => {
      console.log("Audio Array for liPauseButton: " + audioArray);
      audioArray[index].pause();
      liPauseBtn[index].classList.add("d-none");
      liPlayBtn[index + 1].classList.remove("d-none");
      songNumberArray[index].classList.remove("song-index-away");
      liArray[index].classList.remove("clicked");
      const globalPlayBtn = document.querySelector(".global-play-btn");
      globalPlayBtn.classList.remove("d-none");
      const globalPauseBtn = document.querySelector(".global-pause-btn");
      globalPauseBtn.classList.add("d-none");
      const nowPlayingPlayBtn = document.querySelector(".pl-btn");
      nowPlayingPlayBtn.classList.remove("d-none");
      const nowPlayingPauseBtn = document.querySelector(".pa-btn");
      nowPlayingPauseBtn.classList.add("d-none");
    });
  });
};

const playGlobal = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  titleArray,
  artistArray,
  songNumberArray
) => {
  const globalPlayBtn = document.querySelector(".global-play-btn");
  globalPlayBtn.addEventListener("click", () => {
    console.log("Audio Array for globalPlay: " + audioArray);
    globalPlayBtn.classList.add("d-none");
    const globalPauseBtn = document.querySelector(".global-pause-btn");
    globalPauseBtn.classList.remove("d-none");
    const nowPlayingPlayBtn = document.querySelector(".pl-btn");
    nowPlayingPlayBtn.classList.add("d-none");
    const nowPlayingPauseBtn = document.querySelector(".pa-btn");
    nowPlayingPauseBtn.classList.remove("d-none");
    audioArray[0].play();
    liArray[0].classList.add("clicked");
    liPlayBtn[0].classList.add("d-none");
    liPauseBtn[0].classList.remove("d-none");
    songNumberArray[0].classList.add("song-index-away");
    const playerSongTitle = document.querySelector(".song-title");
    playerSongTitle.innerText = titleArray[0].innerText;
    const playerArtistName = document.querySelector(".song-artist");
    playerArtistName.innerText = artistArray[0].innerText;
    titleArray[0].classList.add("green-text");
    liArray[0].classList.add("white-background-all");
  });
  pauseGlobal(
    audioArray,
    index,
    liArray,
    liPlayBtn,
    liPauseBtn,
    titleArray,
    artistArray,
    songNumberArray
  );
};

const pauseGlobal = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  titleArray,
  artistArray,
  songNumberArray
) => {
  const globalPauseBtn = document.querySelector(".global-pause-btn");
  globalPauseBtn.addEventListener("click", () => {
    console.log("The Pause Button was pressed");
    globalPauseBtn.classList.add("d-none");
    const globalPlayBtn = document.querySelector(".global-play-btn");
    globalPlayBtn.classList.remove("d-none");
    const nowPlayingPlayBtn = document.querySelector(".pl-btn");
    nowPlayingPlayBtn.classList.remove("d-none");
    const nowPlayingPauseBtn = document.querySelector(".pa-btn");
    nowPlayingPauseBtn.classList.add("d-none");
    audioArray[index].pause();
    liPauseBtn[index].classList.add("d-none");
    songNumberArray[index].classList.remove("song-index-away");
    liArray[index].classList.remove("clicked");
    titleArray[index].classList.remove("green-text");
  });
};

const nowPlaying = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  titleArray,
  artistArray,
  songNumberArray
) => {
  const nowPlayingPlayBtn = document.querySelector(".pl-btn");
  nowPlayingPlayBtn.addEventListener("click", () => {
    nowPlayingPlayBtn.classList.add("d-none");
    const nowPlayingPauseBtn = document.querySelector(".pa-btn");
    nowPlayingPauseBtn.classList.remove("d-none");
    const globalPlayBtn = document.querySelector(".global-play-btn");
    globalPlayBtn.classList.add("d-none");
    const globalPauseBtn = document.querySelector(".global-pause-btn");
    globalPauseBtn.classList.remove("d-none");

    audioArray[0].play();
    liArray[0].classList.add("clicked");
    liPlayBtn[0].classList.add("d-none");
    liPauseBtn[0].classList.remove("d-none");
    songNumberArray[0].classList.add("song-index-away");
    const playerSongTitle = document.querySelector(".song-title");
    playerSongTitle.innerText = titleArray[0].innerText;
    const playerArtistName = document.querySelector(".song-artist");
    playerArtistName.innerText = artistArray[0].innerText;
    titleArray[0].classList.add("green-text");
    liArray[0].classList.add("white-background-all");
  });
  nowPausing(
    audioArray,
    index,
    liArray,
    liPlayBtn,
    liPauseBtn,
    titleArray,
    artistArray,
    songNumberArray
  );
};

const nowPausing = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  titleArray,
  artistArray,
  songNumberArray
) => {
  const nowPlayingPauseBtn = document.querySelector(".pa-btn");
  nowPlayingPauseBtn.addEventListener("click", () => {
    nowPlayingPauseBtn.classList.add("d-none");
    const nowPlayingPlayBtn = document.querySelector(".pl-btn");
    nowPlayingPlayBtn.classList.remove("d-none");
    const globalPlayBtn = document.querySelector(".global-play-btn");
    globalPlayBtn.classList.remove("d-none");
    const globalPauseBtn = document.querySelector(".global-pause-btn");
    globalPauseBtn.classList.add("d-none");
    audioArray[index].pause();
    liPauseBtn[index].classList.add("d-none");
    songNumberArray[index].classList.remove("song-index-away");
    liArray[index].classList.remove("clicked");
    titleArray[index].classList.remove("green-text");
  });
};
