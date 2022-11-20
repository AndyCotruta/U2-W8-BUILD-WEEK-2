window.onload = () => {
  fetchAndCreateRecommended();
  getUser();
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4fb92d580fmsh29489d65e968a28p1565bbjsncea4009bc4b4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const fetchAndCreateRecommended = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=dance",
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;

  const arrOfColors = [
    "#E13400",
    "#1E3164",
    "#E8105B",
    "#148A06",
    "#BC5900",
    "#E91528",
    "#E0128B",
    "#8C67AB",
    "#7358FF",
    "#D74000",
    "#777777",
    "#527AA1",
    "#8B1A32",
    "#7D4A32",
    "#4F3750",
    "#E13400",
    "#1E3164",
    "#E8105B",
    "#148A06",
    "#BC5900",
  ];

  const browseAllRow = document.querySelector(".browse-all");

  browseAllRow.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    browseAllRow.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
    <div class="browse-all-cards card mb-4" style="background-color:${
      arrOfColors[i]
    }" onclick=goToAlbum('${String(dataArray[i].album.id)}')>
  <img src=${
    dataArray[i].album.cover
  } class="browse-all-img card-img-top" alt="...">
  <div class="browse-all-card-body">
    <p class="card-text line-clamp">${dataArray[i].album.title}</p>
  </div>
</div>
    </div>`;
  }
};

const input = document.querySelector("#search-field");
input.addEventListener("input", async () => {
  const searchField = document.querySelector("#search-field");
  const searchedValue = searchField.value;
  console.log(searchedValue);
  if (searchedValue.length === 0) {
    fetchAndCreateRecommended();
  } else {
    fetchAndCreateSearched();
  }
});

fetchAndCreateSearched = async () => {
  const searchField = document.querySelector("#search-field");
  const searchedValue = searchField.value;
  console.log(searchedValue);
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchedValue}`,
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;
  console.log(dataArray);
  const browseAllRow = document.querySelector(".browse-all");
  browseAllRow.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const browseAllRow = document.querySelector(".browse-all");
    browseAllRow.innerHTML += `
   <div class="col-sm-6 col-md-4 col-xl-2">
    <div class="recently-played-cards card mb-3" onclick=goToAlbum('${String(
      dataArray[i].album.id
    )}')>
  <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
  <div class="recently-played-card-body card-body">
     <p class="card-text p-cards-title">${dataArray[i].album.title}</p>
    <p class="card-text">${dataArray[i].artist.name}</p>
  </div>
    <button class="green-player-btn-rp">
                <svg id="rp-play" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>
              </button>
</div>
    </div>
   `;
  }
};

const goToAlbum = (albumId) => {
  console.log(`This is the album id ${albumId} `);
  window.location.assign(`./album.html?albumId=${albumId}`);
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

const nowPlayingBanner = document.querySelector(".now-playing");
if (localStorage.getItem("username") == null) {
  nowPlayingBanner.innerHTML = `
  <div class = "logIn-banner w-100 d-flex justify-content-between px-3">
    <div class="logIn-banner-text text-white d-flex flex-column justify-content-center px-3">
      <div>PREVIEW OF SPOTIFY</div>
      <div>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</div>
  </div>
  <button class="btn logIn-btn-banner">Log In</button>
  </div>`;
}
