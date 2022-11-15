const albumId = "81912";

function getData(albumId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`,
    options
  )
    .then((response) => response.json())
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
                    <h3>ALBUM</h3>
                    <h1>${chosenAlbumInfo.title}</h1>
                  </div>
                  <div>
                    <div class="d-flex justify-content-center">
                      <img
                        class="avatar"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3Wmrg2Lr59nEn2lG49g2849aW9eszJkao5w9m0b7CA&s"
                        alt=""
                      />
                      <p class="artist-info-banner">
                      ${chosenArtist} - 1994 - 15 songs, 38 min 22 sec
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

  chosenAlbumTracks.forEach((element) => {
    i++;
    albumContainer.innerHTML += `    
    <li class="track-list">
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
        <p class="info-list-paragraph">2:07</p>
      </div>
    </div>
  </li>`;
  });
}
