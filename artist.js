window.onload = () => {
  getUser();
  console.log(currentIndex);
};

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
  let background = document.getElementById("background");
  background.classList.add("background");
  background.style.backgroundImage = `url(${info.picture_xl})`;
  background.innerHTML += `
  <div class="artist-info artist-text px-35">
   
                <p>
                  <i class="bi bi-patch-check-fill verified-icon"></i> Verified
                  Artist
                </p>
             
                 <h1 class="artist-h1">${info.name}</h1>
                

                <p class="mb-3">21,697,859 monthly listeners</p>
              </div>
              <img class="artist-image d-none p-4" src="${info.picture_xl}">`;
  const image = document.querySelector(".artist-image");
  console.log(image);
  renderGradient(image);

  // ........................Large Picture Version above............................//

  //...........................Small Picture Version.....................................//

  // `<div class="artistbanner d-flex mt-5">
  //             <div class="artist-info">
  //               <img
  //                 src="${info.picture_xl}"
  //                 class="card-img-top artist-image"
  //                 alt="album-image"
  //               />
  //             </div>
  //             <div class="d-flex flex-column w-100 align-items-start justify-content-center ml-4">

  //                 <div>
  //                 <h1>${info.name}</h1>
  //                 </div>
  //                 <div>
  //                   <div class="d-flex justify-content-center">
  //                   <img
  //                       class="avatar"
  //                       src="${info.picture_xl}"
  //                       alt=""
  //                     />
  //                     <p class="mb-3">21,697,859 monthly listeners</p>
  //                   </div>
  //                 </div>

  //             </div>
  //           </div>`;
  // ...........................................................................//
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
        <div class="mx-3">
          <p class="info-list-paragraph song-number">${index + 1}</p>
          <i class="li-audio-controls d-none bi bi-play-fill li-pl-btn"></i>
              <i class="li-audio-controls d-none bi bi-pause-fill li-pa-btn"></i>
        </div>
        <div>
        <p class="info-title-paragraph rendered-song-title">
            <strong>${element.title}</strong>
          </p>
       
          <p class="info-list-paragraph rendered-artist-name">${
            element.artist.name
          }</p>
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

getData(artistId);

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
console.log(dropdownBtn);
dropdownBtn.addEventListener("click", () => {
  const dropdownMenu = document.querySelector(".dropMenu");
  dropdownMenu.classList.toggle("d-none");
});

const toggle = () => {
  const dropdownMenu = document.querySelector(".dropMenu");
  dropdownMenu.classList.toggle("d-none");
};

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

const logOut = () => {
  const userNameDiv = document.querySelector(".user-name-div");
  userNameDiv.classList.add("hidden");
  const navbarSignupBtn = document.querySelector(".navbar-signup-btn");
  navbarSignupBtn.classList.remove("d-none");
  const navbarLoginBtn = document.querySelector(".navbar-login-btn");
  navbarLoginBtn.classList.remove("d-none");
  const dropdownMenu = document.querySelector(".dropMenu");
  dropdownMenu.classList.add("d-none");
  localStorage.clear();
};

const loginBtn = document.querySelector(".navbar-login-btn");
loginBtn.addEventListener("click", () => {
  window.location.assign("./login.html");
});

const loginRedirect = () => {
  window.location.assign("./login.html");
};

let currentIndex;
let currentAudioArray = [];
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
      currentIndex = index;
      console.log(currentIndex);
      currentAudioArray = audioArray;
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
    if (currentIndex === undefined) {
      currentIndex = 0;
    }
    audioArray[currentIndex].play();
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
  skipLeft(
    audioArray,
    index,
    liArray,
    liPlayBtn,
    liPauseBtn,
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

const skipLeft = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
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
    songNumberArray[newcurrentIndex].classList.add("song-index-away");
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

      songNumberArray.forEach((songNumber) => {
        if (songNumber.classList.contains("song-index-away")) {
          songNumber.classList.remove("song-index-away");
        }
      });
    }
  });
};

const skipRight = (
  audioArray,
  index,
  liArray,
  liPlayBtn,
  liPauseBtn,
  titleArray,
  artistArray,
  songNumberArray
) => {
  const nextSongBtn = document.querySelector(".skip-right-button");
  nextSongBtn.addEventListener("click", () => {
    console.log("nextSongBtn clicked");
    newcurrentIndex = currentIndex + 1;
    for (let i = 0; i < audioArray.length; i++) {
      audioArray[i].pause();
    }

    liArray[newcurrentIndex].classList.add("clicked");
    liPlayBtn[newcurrentIndex].classList.add("d-none");
    liPauseBtn[newcurrentIndex].classList.remove("d-none");
    songNumberArray[newcurrentIndex].classList.add("song-index-away");
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

      songNumberArray.forEach((songNumber) => {
        if (songNumber.classList.contains("song-index-away")) {
          songNumber.classList.remove("song-index-away");
        }
      });
    }
  });
};
