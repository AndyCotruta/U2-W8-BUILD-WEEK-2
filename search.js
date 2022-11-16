window.onload = () => {
  fetchAndCreateRecommended();
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

  for (let i = 0; i < 20; i++) {
    const browseAllRow = document.querySelector(".browse-all");
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
    </div>
    `;
  }
  fetchAndCreateSearched(fetchAndCreateRecommended);
};

const input = document.querySelector("#search-field");
input.addEventListener(
  "input",
  (fetchAndCreateSearched = async (fetchAndCreateRecommended) => {
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
</div>
    </div>
    `;
    }
  })
);

const goToAlbum = (albumId) => {
  console.log(`This is the album id ${albumId} `);
  window.location.assign(`./album.html?albumId=${albumId}`);
};
