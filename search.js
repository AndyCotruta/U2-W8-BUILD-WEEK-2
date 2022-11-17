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
   <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
   <div class="good-morning-cards card mb-3" onclick=goToAlbum('${String(
     dataArray[i].album.id
   )}')>
 <div class="row no-gutters">
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
});

const loginBtn = document.querySelector(".navbar-login-btn");
loginBtn.addEventListener("click", () => {
  window.location.assign("./login.html");
});
