 let albumId = '119606'


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

// function renderAlbum(data) {
//   const albumContainer = document.getElementById("albumData");
//   const albumCard = document.getElementById("card-album");
//   let i = 0;

//   artistId = data.artist.id;
//   chosenAlbumTracks = data.tracks.data;
//   chosenAlbumInfo = data.tracks.data[0].album;
//   chosenArtist = data.tracks.data[0].artist.name;

//   albumCard.innerHTML += ``;
//   const image = document.querySelector(".rendered-image");

//   chosenAlbumTracks.forEach((element) => {
   
//     albumContainer.innerHTML += ` `;
//   });
// }