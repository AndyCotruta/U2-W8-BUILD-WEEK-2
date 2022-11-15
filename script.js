window.onload = () => {
  fetchAndCreate();
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4fb92d580fmsh29489d65e968a28p1565bbjsncea4009bc4b4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const fetchAndCreate = async () => {
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
    <div class="col-sm-6 col-md-3 col-xl-2">
    <div class="good-morning-cards card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src=${dataArray[i].album.cover} alt="...">
    </div>
    <div class="col-md-8">
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
