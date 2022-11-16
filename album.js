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
              <div class="card" style="width: 12rem">
                <img
                  src="${chosenAlbumInfo.cover}"
                  class="card-img-top"
                  alt="album-image"
                />
              </div>
              <div class="d-flex w-100 align-items-end ml-4">
                <div>
                  <div>
                    <h3 class="albumTitle">ALBUM</h3>
                    <h1>${chosenAlbumInfo.title}</h1>
                  </div>
                  <div>
                    <div class="d-flex justify-content-center">
                    <img
                        class="avatar"
                        src="${chosenAlbumInfo.cover}"
                        alt=""
                      />
                      <p class="artist-info-banner">
                      <span onclick=goToArtist('${String(
                        artistId
                      )}')>${chosenArtist}</span> - 1994 - 15 songs, 38 min 22 sec
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

  chosenAlbumTracks.forEach((element) => {
    let minutes = Math.floor(Math.random() * (4 - 2)) + 2;
    let seconds1 = Math.floor(Math.random() * (5 - 1)) + 1;
    let seconds2 = Math.floor(Math.random() * (9 - 0)) + 0;
    i++;
    albumContainer.innerHTML += `    
    <li class="music-list">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="mr-5">
          <p class="info-list-paragraph">${i}</p>
        </div>
        <div>
          <p class="info-list-paragraph">
            <strong>${element.title}</strong>
          </p>
          <p class="info-list-paragraph">${element.artist.name}</p>
        </div>
      </div>
      <div class="mr-3">
        <p class="info-list-paragraph">${minutes}:${seconds1}${seconds2}</p>
      </div>
    </div>
  </li>`;
  });
}

const goToArtist = (artistId) => {
  console.log(`This is the artist id ${artistId} `);
  window.location.assign(`./artist.html?artistId=${artistId}`);
};
