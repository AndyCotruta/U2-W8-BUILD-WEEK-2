window.onload = () => {
  fetchAndCreatePlaylists();
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4fb92d580fmsh29489d65e968a28p1565bbjsncea4009bc4b4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },

};

//  ! PLaylist page
 const btnPlaylist = document.getElementById("btnPlaylist")
 btnPlaylist.addEventListener('click', () => {
  fetchAndCreatePlaylists()
 })

const fetchAndCreatePlaylists = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem",
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;
  console.log(dataArray);
  let playListDiv = document.getElementById("card-box");
  playListDiv.innerHTML = ""
  for (let i = 0; i < 6; i++) {
    const element = dataArray[i];

    console.log(element);
    let playListDiv = document.getElementById("card-box");
    console.log(playListDiv);
    playListDiv.innerHTML += `
   <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
   <div class="recently-played-cards card mb-3" onclick=goToAlbum('${String(
     dataArray[i].album.id
   )}')>
 <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
 <div class="recently-played-card-body card-body">
   <p class="card-text">${dataArray[i].album.title}</p>
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
  // console.log(dataArray);
};
// ! Podcast page

const btnPodcast = document.getElementById("btnPodcast");

btnPodcast.addEventListener("click", () => {
 fetchAndCreatePodcast()


});
const fetchAndCreatePodcast = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen",
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;
  console.log(dataArray);
  let playListDiv = document.getElementById("card-box");
  playListDiv.innerHTML = ""
  let TitleLibrary = document.getElementById("TitleLibrary")
  TitleLibrary.innerText="Podcast"
  for (let i = 0; i < 6; i++) {
    const element = dataArray[i];

    console.log(element);
    let playListDiv = document.getElementById("card-box");
    // playListDiv.innerHTML = ""
    console.log(playListDiv);
    playListDiv.innerHTML += `
   <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
   <div class="recently-played-cards card mb-3" onclick=goToAlbum('${String(
     dataArray[i].album.id
   )}')>
 <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
 <div class="recently-played-card-body card-body">
   <p class="card-text">${dataArray[i].album.title}</p>
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
  // console.log(dataArray);
};

// ! Artist page
const btnArtist = document.getElementById("btnArtist")
btnArtist.addEventListener('click', () => {
fetchAndCreateArtist()

})
const fetchAndCreateArtist = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=2pac",
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;
  console.log(dataArray);
  let playListDiv = document.getElementById("card-box");
  playListDiv.innerHTML = ""
  let TitleLibrary = document.getElementById("TitleLibrary")
  TitleLibrary.innerText="Artist"
  for (let i = 0; i < 6; i++) {
    const element = dataArray[i];

    console.log(element);
    let playListDiv = document.getElementById("card-box");
    // playListDiv.innerHTML = ""
    console.log(playListDiv);
    playListDiv.innerHTML += `
   <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
   <div class="recently-played-cards card mb-3" onclick=goToAlbum('${String(
     dataArray[i].album.id
   )}')>
 <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
 <div class="recently-played-card-body card-body">
   <p class="card-text">${dataArray[i].album.title}</p>
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
  // console.log(dataArray);
};

 
// !Albums Page
const btnAlbums = document.getElementById("btnAlbums")
btnAlbums.addEventListener('click', () => {
  fetchAndCreateAlbums()
})

const fetchAndCreateAlbums = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=xxxtentacion",
    options
  );
  const fetched = await response.json();
  const dataArray = fetched.data;
  console.log(dataArray);
  let playListDiv = document.getElementById("card-box");
  playListDiv.innerHTML = ""
  let TitleLibrary = document.getElementById("TitleLibrary")
  TitleLibrary.innerText="Albums"
  for (let i = 0; i < 6; i++) {
    const element = dataArray[i];

    console.log(element);
    let playListDiv = document.getElementById("card-box");
    // playListDiv.innerHTML = ""
    console.log(playListDiv);
    playListDiv.innerHTML += `
   <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
   
   <div class="recently-played-cards card mb-3" onclick=goToAlbum('${String(
     dataArray[i].album.id
   )}')>
 <img src=${dataArray[i].album.cover} class="card-img-top" alt="...">
 <div class="recently-played-card-body card-body">
   <p class="card-text">${dataArray[i].album.title}</p>
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
  // console.log(dataArray);
};
const goToAlbum = (albumId) => {
  console.log(`This is the album id ${albumId}` );
  window.location.assign(`./album.html?albumId=${albumId}`);
};