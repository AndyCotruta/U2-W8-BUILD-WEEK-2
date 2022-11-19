window.onload = () => {
  fetchAndCreateGoodMorning();
  fetchAndCreateRecentlyPlayed();
  fetchAndCreateShowsToTry();
  getUser();
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4fb92d580fmsh29489d65e968a28p1565bbjsncea4009bc4b4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const fetchAndCreateGoodMorning = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem",
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;
  console.log(dataArray);
  for (let i = 0; i < 12; i++) {
    const goodMorningRow = document.querySelector(".good-morning");
    goodMorningRow.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
    <div class="good-morning-cards card mb-3" onclick=goToAlbum('${String(
      dataArray[i].album.id
    )}')>
    <div class="row">
    <div class="col-md-4">
      <img src=${dataArray[i].album.cover} alt="...">
    </div>
    <div class="good-morning-card-body col-md-8">
      <div class="card-body">
        <h5 class="card-title">${dataArray[i].album.title}</h5>
        
      </div>
    </div>
  </div>
  <button class="green-player-btn-gm">
                <svg id="gm-play" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>
              </button>
</div>
    </div>
    
    `;
  }
};

const fetchAndCreateRecentlyPlayed = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=rihanna",
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;
  for (let i = 0; i < 6; i++) {
    const recentlyPlayedRow = document.querySelector(".recently-played");
    recentlyPlayedRow.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
    <div class="recently-played-cards card mb-3" onclick=goToAlbum('${String(
      dataArray[i].album.id
    )}')>
  <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
  <div class="recently-played-card-body card-body">
    <p class="card-text">${dataArray[i].album.title}</p>
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

const fetchAndCreateShowsToTry = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=luis",
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;
  for (let i = 0; i < 6; i++) {
    const showsToTryRow = document.querySelector(".shows-to-try");
    showsToTryRow.innerHTML += `
    <div class="col-sm-6 col-md-4 col-xl-2">
    <div class="recently-played-cards card mb-3" onclick=goToAlbum('${String(
      dataArray[i].album.id
    )}')>
  <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
  <div class="recently-played-card-body card-body">
    <p class="card-text">${dataArray[i].album.title}</p>
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
    alert("Please Log In first to access this feature");
  } else {
    window.location.assign("./YourLibrary.html");
  }
});

const likedSongs = document.querySelector(".liked-songs");
likedSongs.addEventListener("click", () => {
  console.log("Your Library was clicked");
  console.log(localStorage.getItem("username"));
  if (localStorage.getItem("username") == null) {
    alert("Please Log In first to access this feature");
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
