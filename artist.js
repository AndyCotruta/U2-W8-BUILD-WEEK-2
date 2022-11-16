let parameters = new URLSearchParams(document.location.search); //searching for params in the navbar
const artistId = parameters.get("artistId"); //applying get() method to read the actual value present in the navbar - albumId is the one passed

async function getData(search) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${search}`,
    options
  )
    .then(async (response) => await response.json())
    .then((response) => {
      let info = response;
      let chosenArtist = info.name;
      console.log(chosenArtist);
      renderArtistName(info);
      getSongs(chosenArtist);
    })
    .catch((err) => console.error(err));
}

function renderArtistName(info) {
  let background = document.getElementById("background");
  background.classList.add("background");
  background.style.backgroundImage = `url(${info.picture_xl})`;
  background.innerHTML = `
  <div class="center-nav-bar artist-navbar px-35 py-2">
              <div class="btns-prev-next">
                <img class="img-btn" src="img/prev.svg" alt="" />

                <img class="img-btn" src="img/next.svg" alt="" />
              </div>

              <div class="user-name-div text-white">
                <span class="user-name-image"
                  ><i class="bi bi-person-circle"></i
                ></span>
                <span class="user-name-text">User Name</span>
                <span><i class="bi bi-caret-down-fill"></i></span>
              </div>
            </div>
  <div class="artist-info artist-text px-35">
   
                <p>
                  <i class="bi bi-patch-check-fill verified-icon"></i> Verified
                  Artist
                </p>
             
                 <h1 class="artist-h1">${info.name}</h1>
                

                <p class="mb-3">21,697,859 monthly listeners</p>
              </div>
              <img class="artist-image d-none p-4" src="${info.picture_xl}">`;
  const image = document.querySelector(".artist-image");
  console.log(image);
  renderGradient(image);

  // ........................Large Picture Version above............................//

  //...........................Small Picture Version.....................................//

  // `<div class="artistbanner d-flex mt-5">
  //             <div class="artist-info">
  //               <img
  //                 src="${info.picture_xl}"
  //                 class="card-img-top artist-image"
  //                 alt="album-image"
  //               />
  //             </div>
  //             <div class="d-flex flex-column w-100 align-items-start justify-content-center ml-4">

  //                 <div>
  //                 <h1>${info.name}</h1>
  //                 </div>
  //                 <div>
  //                   <div class="d-flex justify-content-center">
  //                   <img
  //                       class="avatar"
  //                       src="${info.picture_xl}"
  //                       alt=""
  //                     />
  //                     <p class="mb-3">21,697,859 monthly listeners</p>
  //                   </div>
  //                 </div>

  //             </div>
  //           </div>`;
  // ...........................................................................//
}

async function getSongs(search) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${search}`,
    options
  )
    .then(async (response) => await response.json())
    .then((response) => {
      let info = response;
      renderSongs(info);
    })
    .catch((err) => console.error(err));
}

function renderSongs(info) {
  let musicListBox = document.getElementById("musicList");
  let musicList = info.data;
  musicList.forEach((element, index) => {
    let minutes = Math.floor(Math.random() * (4 - 2)) + 2;
    let seconds1 = Math.floor(Math.random() * (5 - 1)) + 1;
    let seconds2 = Math.floor(Math.random() * (9 - 0)) + 0;
    musicListBox.innerHTML += `
    <li class="music-list">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="mx-3">
          <p class="info-list-paragraph">${index + 1}</p>
        </div>
        <div>
        <p class="info-title-paragraph">
            <strong>${element.title}</strong>
          </p>
       
          <p class="info-list-paragraph">${element.artist.name}</p>
        </div>
      </div>
  
      <div class="">
        <p class="info-list-paragraph">${minutes}:${seconds1}${seconds2}</p>
      </div>
    </div>
  </li>`;
  });
}

getData(artistId);

function getColor(imageElement, ratio) {
  const canvas = document.createElement("canvas");
  let width = (canvas.width = imageElement.width);
  let height = (canvas.height = imageElement.height);
  const context = canvas.getContext("2d");
  context.drawImage(imageElement, 0, 0);
  let data, length;
  let i = -4,
    count = 0;
  try {
    data = context.getImageData(0, 0, width, height);
    length = data.data.length;
  } catch (err) {
    console.error(err);
    return {
      R: 0,
      G: 0,
      B: 0,
    };
  }
  let R, G, B;
  R = G = B = 0;
  while ((i += ratio * 4) < length) {
    ++count;
    R += data.data[i];
    G += data.data[i + 1];
    B += data.data[i + 2];
  }
  R = ~~(R / count);
  G = ~~(G / count);
  B = ~~(B / count);
  return {
    R,
    G,
    B,
  };
}

const renderGradient = (image) => {
  image.crossOrigin = "Anonymous";
  image.onload = function () {
    const { R, G, B } = getColor(image, 4);
    const centerSection = document.querySelector(".center-section");
    centerSection.style.backgroundImage = `linear-gradient( 0deg, rgba(18, 18, 18, 1) 0%, rgba(${R}, ${G}, ${B}, 1) 100% )`;
  };
};
