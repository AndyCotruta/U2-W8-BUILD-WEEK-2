window.onload = () => {
  fetchAndCreateGoodMorning();
  fetchAndCreateRecentlyPlayed();
  fetchAndCreateShowsToTry();
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
    <div class="good-morning-cards card mb-3">
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
    <div class="col-sm-6 col-md-4 col-xl-2">
    <div class="recently-played-cards card mb-3">
  <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
  <div class="recently-played-card-body card-body">
    <p class="card-text">${dataArray[i].album.title}</p>
  </div>
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
    <div class="recently-played-cards card mb-3">
  <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
  <div class="recently-played-card-body card-body">
    <p class="card-text">${dataArray[i].album.title}</p>
  </div>
</div>
    </div>
    `;
  }
};
