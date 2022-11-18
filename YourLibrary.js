async function getData(albumId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47b90c0b15msh1f32277e69c01c9p123c88jsn0c5b7d2ef6ab",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}}`,
    options
  )
    .then(async (response) => await response.json())
    .then((response) => {
      const data = response;
      console.log(data);
      console.log(data.title);
      displayAlbuns(data);
      displayPodcast(data)
    })
    .catch((err) => console.error(err));
}

async function displayAlbuns(data) {
  boxContent = document.getElementById("card-box");
  boxContent.innerHTML += `
    <div class="col mb-4 card-box ">
     <div class="card mb-3 bg-dark">
       <img src="${data.cover}" class="card-img-top imagem" alt="" />
       <div class="card-body libray-playslist-card">
         <h5 class="card-title-white">${data.title}</h5>
       </div>
     </div>
    </div>`;
}

async function displayPlaylists() {
  let albuns = ["81912", "6899610", "340077257"];
  for (let i = 0; i < albuns.length; i++) {
    let albumId = albuns[i];
    getData(albumId);
  }
}

  async function displayPodcast(datas){
    // alert("hihi")
    console.log(datas.title);
     let contentPodcast = document.getElementById("card-boxx")
     contentPodcast.innerHTML += `
     <div class="card">
  <img src="${datas.cover}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${datas.title}</p>
  </div>
</div>
     `
  }
  async function displayPod(){
    let pods = ["8912", "68996", "340077"];
       for (let m = 0; m < pods.length; m++) {
        const element = pods[m];
        console.log(element);
         getData(element)
        
       }
  }
 