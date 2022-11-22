window.onload = () => {
  getUser();
  console.log(currentIndex);
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
      console.log(data);
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
  const src = image.getAttribute("src");
  console.log(src);
  renderAlertModalImg(src);

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
            <strong>${element.title}<span class="songId hidden">${element.id}<span/></strong>
          </p>
          <p class="info-list-paragraph rendered-artist-name">${element.artist.name}</p>
        </div>
        <div class="li-animated hidden ml-3"><img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif"></div>
        <audio src="${element.preview}" id="audio"></audio>
      </div>
      <div class="d-flex">
      <i class="bi bi-heart-fill fill-hearts hidden px-2"></i>
      <i class="bi bi-heart empty-hearts  hidden px-2"></i>
        <p class="info-list-paragraph d-flex align-items-center px-2">${minutes}:${seconds1}${seconds2}</p>
        <i class="bi bi-three-dots li-dots hidden px-2"></i>
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
  const liAnimated = document.querySelectorAll(".li-animated");
  const liHeart = document.querySelectorAll(".empty-hearts");
  const liFillHearts = document.querySelectorAll(".fill-hearts");
  const liDots = document.querySelectorAll(".bi-three-dots");
  const idArray = document.querySelectorAll(".songId");

  playLiAudio(
    idArray,
    audioArray,
    liArray,
    titleArray,
    artistArray,
    songNumberArray,
    audioControlsArray,
    liPlayBtn,
    liPauseBtn,
    liAnimated,
    liHeart,
    liDots,
    liFillHearts
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
    const alertModal = document.querySelector(".alert-modal");
    alertModal.style.backgroundImage = `linear-gradient( 0deg, rgba(18, 18, 18, 1) 0%, rgba(${R}, ${G}, ${B}, 1) 100% )`;
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
    const logInBanner = document.querySelector(".logIn-banner");
    logInBanner.classList.add("hidden");
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
  window.location.assign("./homepage.html");
});

const loginBtn = document.querySelector(".navbar-login-btn");
loginBtn.addEventListener("click", () => {
  window.location.assign("./login.html");
});

let currentIndex;
let currentAnimationIndex;
const playLiAudio = (
  idArray,
  audioArray,
  liArray,
  titleArray,
  artistArray,
  songNumberArray,
  audioControlsArray,
  liPlayBtn,
  liPauseBtn,
  liAnimated,
  liHeart,
  liDots,
  liFillHearts
) => {
  liArray.forEach((li, index) => {
    playGlobal(
      idArray,
      audioArray,
      index,
      liArray,
      liPlayBtn,
      liPauseBtn,
      liAnimated,
      titleArray,
      artistArray,
      songNumberArray
    );
    nowPlaying(
      idArray,
      audioArray,
      index,
      liArray,
      liPlayBtn,
      liPauseBtn,
      liAnimated,
      titleArray,
      artistArray,
      songNumberArray
    );
    li.addEventListener("mouseover", () => {
      if (!liArray[index].classList.contains("clicked")) {
        //if the song is not playing
        liArray[index].classList.add("white-background"); // add the white background on nonPlaying Songs on mouseover
        songNumberArray[index].classList.add("d-none"); // remove the numbers on nonPlaying Songs on mouseover and
        liPlayBtn[index].classList.remove("d-none"); // display the playbutton on nonPlaying Songs on mouseover,
        liHeart[index].classList.remove("hidden"); // also add the heart icon on nonPlaying Songs on mouseover
        liDots[index + 1].classList.remove("hidden"); // add the dots icon on nonPlaying Songs on mouseover
      } else {
        //if the song is playing
        liHeart[index].classList.remove("hidden"); // display the heart icon on Playing Song on mouseover and
        liDots[index + 1].classList.remove("hidden"); //display the dots icon on Playing Song on mouseover,
        liPauseBtn[index].classList.remove("d-none"); //display the pause button on Playing Song on mouseover
      }
      for (let i = 0; i < liArray.length; i++) {
        if (i !== index) {
          //check if the current hovered index is the same as the playing index
          liArray[i].classList.remove("white-background"); //remove the white background of the hovered index
          liPlayBtn[i].classList.add("d-none"); //remove the play button of the
          liHeart[i].classList.add("hidden");
          liDots[i + 1].classList.add("hidden");
          songNumberArray[i].classList.remove("d-none");
        }
      }
    });
    if (localStorage.getItem("username") === null) {
      liHeart[index].addEventListener("click", () => {
        console.log(`The heart icon with index ${index} was clicked`);
        const noUserCenterNavbarAlert = document.querySelector(
          ".no-user-centerNavbar-alert"
        );
        noUserCenterNavbarAlert.classList.remove("hidden");
      });
    } else {
      liHeart[index].addEventListener("click", () => {
        console.log("You can like this song");
        console.log(
          `This song was added to liked: ${titleArray[index].innerText}`
        );
        console.log(idArray[index]);
        liFillHearts[index].classList.remove("hidden");
        liHeart[index].classList.add("d-none");
        liFillHearts[index].addEventListener("click", () => {
          liFillHearts[index].classList.add("hidden");
          liHeart[index].classList.remove("d-none");
        });
      });
    }
    if (localStorage.getItem("username") !== null) {
      liPlayBtn[index].addEventListener("click", () => {
        liArray.forEach((li) => {
          li.classList.remove("clicked");
        });

        liAnimated.forEach((li) => {
          li.classList.add("hidden");
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
        liAnimated[index].classList.remove("hidden");
        // liPauseBtn[index].classList.remove("d-none");
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

        currentIndex = index;
        currentAnimationIndex = console.log(currentIndex);
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
    } else {
      liPlayBtn[index].addEventListener("click", () => {
        console.log("Li Play Button was clicked");
        const alertModal = document.querySelector(".alert-modal");
        alertModal.classList.remove("hidden");
        const main = document.querySelector(".main");
        main.classList.add("no-events");
      });
    }

    liPauseBtn[index].addEventListener("click", () => {
      console.log("Audio Array for liPauseButton: " + audioArray);
      audioArray[index].pause();
      liAnimated[index].classList.add("hidden");
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
  liAnimated,
  titleArray,
  artistArray,
  songNumberArray
) => {
  if (localStorage.getItem("username") !== null) {
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
      if (currentIndex === undefined) {
        currentIndex = 0;
      }
      audioArray[currentIndex].play();
      liAnimated[currentIndex].classList.remove("hidden");
      liArray[currentIndex].classList.add("clicked");
      liPlayBtn[currentIndex].classList.add("d-none");
      liPauseBtn[currentIndex].classList.remove("d-none");
      songNumberArray[currentIndex].classList.add("song-index-away");
      const playerSongTitle = document.querySelector(".song-title");
      playerSongTitle.innerText = titleArray[currentIndex].innerText;
      const playerArtistName = document.querySelector(".song-artist");
      playerArtistName.innerText = artistArray[currentIndex].innerText;
      titleArray[currentIndex].classList.add("green-text");
      liArray[currentIndex].classList.add("white-background-all");
    });
  }

  pauseGlobal(
    audioArray,
    index,
    liArray,
    liPlayBtn,
    liPauseBtn,
    liAnimated,
    titleArray,
    artistArray,
    songNumberArray
  );
};

const globalPlayBtn = document.querySelector(".global-play-btn");
console.log(globalPlayBtn);
if (localStorage.getItem("username") == null) {
  globalPlayBtn.addEventListener("click", () => {
    console.log("Please Log In to Play");
    const alertModal = document.querySelector(".alert-modal");
    alertModal.classList.remove("hidden");
    const main = document.querySelector(".main");
    main.classList.add("no-events");
  });
}

const centerNavbarAlertCloseBtn = document.querySelector(
  ".centerNavbar-alert-closeBtn"
);
centerNavbarAlertCloseBtn.addEventListener("click", () => {
  const noUserCenterNavbarAlert = document.querySelector(
    ".no-user-centerNavbar-alert"
  );
  noUserCenterNavbarAlert.classList.add("hidden");
});

const pauseGlobal = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  liAnimated,
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
    liAnimated[index].classList.add("hidden");
    liPauseBtn[index].classList.add("d-none");
    songNumberArray[index].classList.remove("song-index-away");
    // liArray[index].classList.remove("clicked");
    // titleArray[index].classList.remove("green-text");
  });
};

const nowPlaying = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  liAnimated,
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
    if (currentIndex === undefined) {
      currentIndex = 0;
    }
    audioArray[currentIndex].play();
    liArray[currentIndex].classList.add("clicked");
    liPlayBtn[currentIndex].classList.add("d-none");
    liPauseBtn[currentIndex].classList.remove("d-none");
    liAnimated[currentIndex].classList.remove("hidden");
    songNumberArray[currentIndex].classList.add("song-index-away");
    const playerSongTitle = document.querySelector(".song-title");
    playerSongTitle.innerText = titleArray[currentIndex].innerText;
    const playerArtistName = document.querySelector(".song-artist");
    playerArtistName.innerText = artistArray[currentIndex].innerText;
    titleArray[currentIndex].classList.add("green-text");
    liArray[currentIndex].classList.add("white-background-all");
  });
  skipLeft(
    audioArray,
    index,
    liArray,
    liPlayBtn,
    liPauseBtn,
    liAnimated,
    titleArray,
    artistArray,
    songNumberArray
  );
  skipRight(
    audioArray,
    index,
    liArray,
    liPlayBtn,
    liPauseBtn,
    liAnimated,
    titleArray,
    artistArray,
    songNumberArray
  );
  nowPausing(
    audioArray,
    index,
    liArray,
    liPlayBtn,
    liPauseBtn,
    liAnimated,
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
  liAnimated,
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
    liAnimated[index].classList.add("hidden");
    songNumberArray[index].classList.remove("song-index-away");
    liArray[index].classList.remove("clicked");
  });
};

const skipLeft = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  liAnimated,
  titleArray,
  artistArray,
  songNumberArray
) => {
  const prevSongBtn = document.querySelector(".skip-left-button");
  prevSongBtn.addEventListener("click", () => {
    console.log("prevSongBtn clicked");
    newcurrentIndex = currentIndex - 1;
    for (let i = 0; i < audioArray.length; i++) {
      audioArray[i].pause();
    }

    liArray[newcurrentIndex].classList.add("clicked");
    liPlayBtn[newcurrentIndex].classList.add("d-none");
    liPauseBtn[newcurrentIndex].classList.remove("d-none");
    liAnimated[newcurrentIndex].classList.remove("hidden");

    const playerSongTitle = document.querySelector(".song-title");
    playerSongTitle.innerText = titleArray[newcurrentIndex].innerText;
    const playerArtistName = document.querySelector(".song-artist");
    playerArtistName.innerText = artistArray[newcurrentIndex].innerText;
    titleArray[newcurrentIndex].classList.add("green-text");
    liArray[newcurrentIndex].classList.add("white-background-all");
    artistArray[newcurrentIndex].classList.add("white-text");
    for (let i = 0; i < audioArray.length; i++) {
      audioArray[i].pause();
      if (i !== newcurrentIndex) {
        liArray[i].classList.remove("white-background-all");
        titleArray[i].classList.remove("green-text");
        artistArray[i].classList.remove("white-text");
      }
      audioArray[newcurrentIndex].play();
      liArray.forEach((li) => {
        li.classList.remove("clicked");
      });
      liArray[newcurrentIndex].classList.add("clicked");

      liPauseBtn.forEach((btn) => {
        btn.classList.add("d-none");
      });
      liPauseBtn[newcurrentIndex].classList.remove("d-none");
      songNumberArray[newcurrentIndex].classList.add("d-none");
      liAnimated.forEach((li) => {
        li.classList.add("hidden");
      });
      liAnimated[newcurrentIndex].classList.remove("hidden");
      songNumberArray.forEach((songNumber) => {
        if (songNumber.classList.contains("song-index-away")) {
          songNumber.classList.remove("song-index-away");
        }
      });
      songNumberArray[newcurrentIndex].classList.add("song-index-away");
    }
  });
};

const skipRight = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  liAnimated,
  titleArray,
  artistArray,
  songNumberArray
) => {
  const nextSongBtn = document.querySelector(".skip-right-button");
  nextSongBtn.addEventListener("click", () => {
    newcurrentIndex = currentIndex + 1;
    for (let i = 0; i < audioArray.length; i++) {
      audioArray[i].pause();
    }

    liArray[newcurrentIndex].classList.add("clicked");
    liPlayBtn[newcurrentIndex].classList.add("d-none");
    liPauseBtn[newcurrentIndex].classList.remove("d-none");
    liAnimated[newcurrentIndex].classList.remove("hidden");

    const playerSongTitle = document.querySelector(".song-title");
    playerSongTitle.innerText = titleArray[newcurrentIndex].innerText;
    const playerArtistName = document.querySelector(".song-artist");
    playerArtistName.innerText = artistArray[newcurrentIndex].innerText;
    titleArray[newcurrentIndex].classList.add("green-text");
    liArray[newcurrentIndex].classList.add("white-background-all");
    artistArray[newcurrentIndex].classList.add("white-text");
    for (let i = 0; i < audioArray.length; i++) {
      audioArray[i].pause();
      if (i !== newcurrentIndex) {
        liArray[i].classList.remove("white-background-all");
        titleArray[i].classList.remove("green-text");
        artistArray[i].classList.remove("white-text");
      }
      audioArray[newcurrentIndex].play();
      liArray.forEach((li) => {
        li.classList.remove("clicked");
      });
      liArray[newcurrentIndex].classList.add("clicked");

      liPauseBtn.forEach((btn) => {
        btn.classList.add("d-none");
      });
      liPauseBtn[newcurrentIndex].classList.remove("d-none");
      songNumberArray[newcurrentIndex].classList.add("d-none");
      liAnimated.forEach((li) => {
        li.classList.add("hidden");
      });
      liAnimated[newcurrentIndex].classList.remove("hidden");
      songNumberArray.forEach((songNumber) => {
        if (songNumber.classList.contains("song-index-away")) {
          songNumber.classList.remove("song-index-away");
        }
      });
      songNumberArray[newcurrentIndex].classList.add("song-index-away");
    }
  });
};

const yourLibrary = document.querySelector(".your-library");
yourLibrary.addEventListener("click", () => {
  console.log("Your Library was clicked");
  console.log(localStorage.getItem("username"));
  if (localStorage.getItem("username") == null) {
    const alertWindowPlaylist = document.querySelector(
      ".no-user-leftNavbar-alert-playlist"
    );
    alertWindowPlaylist.classList.add("hidden");
    const alertWindowLikedSongs = document.querySelector(
      ".no-user-leftNavbar-alert-likedSongs"
    );
    alertWindowLikedSongs.classList.add("hidden");
    const alertWindowLibrary = document.querySelector(
      ".no-user-leftNavbar-alert"
    );
    alertWindowLibrary.classList.remove("hidden");
    const notNowBtn = document.querySelector(".alert-notNow-btn");

    notNowBtn.addEventListener("click", () => {
      const alertWindowLibrary = document.querySelector(
        ".no-user-leftNavbar-alert"
      );
      alertWindowLibrary.classList.add("hidden");
    });
    const logInBtn = document.querySelector(".alert-logIn-btn");
    logInBtn.addEventListener("click", () => {
      window.location.assign("./login.html");
    });
  } else {
    window.location.assign("./YourLibrary.html");
  }
});

const createPlaylist = document.querySelector(".create-playlist");
createPlaylist.addEventListener("click", () => {
  console.log("Create Playlist was clicked");
  console.log(localStorage.getItem("username"));
  if (localStorage.getItem("username") == null) {
    const alertWindowLibrary = document.querySelector(
      ".no-user-leftNavbar-alert"
    );
    alertWindowLibrary.classList.add("hidden");
    const alertWindowLikedSongs = document.querySelector(
      ".no-user-leftNavbar-alert-likedSongs"
    );
    alertWindowLikedSongs.classList.add("hidden");
    const alertWindowPlaylist = document.querySelector(
      ".no-user-leftNavbar-alert-playlist"
    );
    alertWindowPlaylist.classList.remove("hidden");
    const notNowBtn = document.querySelector(".notNow-playlist");

    notNowBtn.addEventListener("click", () => {
      const alertWindowPlaylist = document.querySelector(
        ".no-user-leftNavbar-alert-playlist"
      );
      alertWindowPlaylist.classList.add("hidden");
    });
    const logInBtn = document.querySelector(".logIn-playlist");
    logInBtn.addEventListener("click", () => {
      window.location.assign("./login.html");
    });
  } else {
    window.location.assign("./YourLibrary.html");
  }
});

const likedSongs = document.querySelector(".liked-songs");
likedSongs.addEventListener("click", () => {
  console.log("Liked Songs was clicked");
  console.log(localStorage.getItem("username"));
  if (localStorage.getItem("username") == null) {
    const alertWindowLibrary = document.querySelector(
      ".no-user-leftNavbar-alert"
    );
    alertWindowLibrary.classList.add("hidden");
    const alertWindowPlaylist = document.querySelector(
      ".no-user-leftNavbar-alert-playlist"
    );
    alertWindowPlaylist.classList.add("hidden");
    const alertWindowLikedSongs = document.querySelector(
      ".no-user-leftNavbar-alert-likedSongs"
    );
    alertWindowLikedSongs.classList.remove("hidden");
    const notNowBtn = document.querySelector(".notNow-likedSongs");

    notNowBtn.addEventListener("click", () => {
      const alertWindowLikedSongs = document.querySelector(
        ".no-user-leftNavbar-alert-likedSongs"
      );
      alertWindowLikedSongs.classList.add("hidden");
    });
    const logInBtn = document.querySelector(".logIn-playlist");
    logInBtn.addEventListener("click", () => {
      window.location.assign("./login.html");
    });
  } else {
    window.location.assign("./LikedSongs.html");
  }
});

const aHeart = document.querySelector(".a-heart");
aHeart.addEventListener("click", () => {
  console.log("Your Library was clicked");
  console.log(localStorage.getItem("username"));
  if (localStorage.getItem("username") == null) {
    const alertWindowLibrary = document.querySelector(
      ".no-user-leftNavbar-alert"
    );
    alertWindowLibrary.classList.add("hidden");
    const alertWindowLikedSongs = document.querySelector(
      ".no-user-leftNavbar-alert-likedSongs"
    );
    alertWindowLikedSongs.classList.add("hidden");
    const alertWindowPlaylist = document.querySelector(
      ".no-user-leftNavbar-alert-playlist"
    );
    alertWindowPlaylist.classList.remove("hidden");
    const notNowBtn = document.querySelector(".notNow-playlist");

    notNowBtn.addEventListener("click", () => {
      const alertWindowPlaylist = document.querySelector(
        ".no-user-leftNavbar-alert-playlist"
      );
      alertWindowPlaylist.classList.add("hidden");
    });
    const logInBtn = document.querySelector(".logIn-playlist");
    logInBtn.addEventListener("click", () => {
      window.location.assign("./login.html");
    });
  } else {
    const aHeart = document.querySelector(".a-heart");
    aHeart.classList.add("d-none");
    const aHeartColor = document.querySelector(".a-heart-color");
    aHeartColor.classList.remove("d-none");
  }
});

const aHeartColor = document.querySelector(".a-heart-color");
aHeartColor.addEventListener("click", () => {
  aHeartColor.classList.add("d-none");
  aHeart.classList.remove("d-none");
});

const nowPlayingBanner = document.querySelector(".now-playing");
if (localStorage.getItem("username") == null) {
  nowPlayingBanner.innerHTML += `
  <div class = "logIn-banner w-100 d-flex justify-content-between px-3">
    <div class="logIn-banner-text text-white d-flex flex-column justify-content-center px-3">
      <div>PREVIEW OF SPOTIFY</div>
      <div>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</div>
  </div>
  <button class="btn logIn-btn-banner">Log In</button>
  </div>`;
}

const renderAlertModalImg = (src) => {
  const alertModalImg = document.querySelector(".alert-modal-img");
  alertModalImg.innerHTML = `
                         
                            <img class="alert-img" src="${src}">
                       
  `;
};

const closeAlertModalBtn = document.querySelector(".alert-modal-close-btn");
closeAlertModalBtn.addEventListener("click", () => {
  const alertModal = document.querySelector(".alert-modal");
  alertModal.classList.add("hidden");
  const main = document.querySelector(".main");
  main.classList.remove("no-events");
});
