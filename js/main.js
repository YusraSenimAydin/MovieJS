//toggle Js
$("#toggle").click( function(){
    var w = $('#sidebar').width();
    var pos = $('#sidebar').offset().left;
   
    if(pos == 0){
    $("#sidebar").animate({"left": -w}, "slow");
    }
    else
    {
    $("#sidebar").animate({"left": "0"}, "slow");
    }
    
  });


const APIURL='../contents.json'
const main = document.getElementById("main");
// Menu item Link
async function getMenuItem(){
    moviesCategoryElement=[];
    moviesCategory=[];
    const menus=document.getElementsByClassName('menu_item');
    for(let i=0;i<menus.length;i++){
      menus[i].addEventListener('click',async (e) => {
        main.innerHTML = "";
        const resp = await fetch(APIURL);
        const respData = await resp.json();
        respData.Contents.forEach(element=>{
            for (let property of element.Category) {
            if(property=='/Secizle/'+menus[i].id){        
                     const { Title, id, Poster } = element;
                     const movieEl = document.createElement("div");
                    movieEl.classList.add("movie");            
                    movieEl.innerHTML = `
                        <img 
                            src="${Poster}"
                            alt="${Title}"
                            onclick="getAlert(${id})"                            
                        />
                        `;            
                    main.appendChild(movieEl);            }
            else{
               // console.log('/Secizle/'+menus[i].id);
            }}
    });
      })
    } 
}
getMenuItem();

// initially get movies
getMovies(APIURL);
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.Contents);
}
//Main Movie
function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach((movie) => {
         const { Title, id, Poster } = movie;
         const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img 
                src="${Poster}"
                alt="${Title}"
                onclick="getAlert(${id})"
                
            />
            `;
        main.appendChild(movieEl);
    });
}

// Modal Movie Detail JS
async function getAlert(id){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    const resp = await fetch(APIURL);
    const respData = await resp.json();
    let movieDiv=document.getElementById('getMovieDetail');
    movieDiv.innerHTML = "";
    let MovieDetail=respData.Contents.find(mv=>mv.id==id);
    const { Title, Description , IMDbRating , Director , Writer , Stars, Poster , Genre , PlaybackURL } = MovieDetail;
    const movieDetail = document.createElement("div");
    movieDetail.classList.add("moviedetail");

    movieDetail.innerHTML = `
    <div class="left">
        <img 
            src="${Poster}"
            alt="${Title}" />
        </div>
        <div>
        <p><h1 class="title">${Title}</h1></p>
        <p><h2 class="imbd">IMBD:${IMDbRating}&nbsp;
        <i style="border-left:2px solid #000;height:50px;"></i>&nbsp;WRITER:${Writer}&nbsp;
        <i style="border-left:2px solid #000;height:50px;"></i>&nbsp; DIRECTOR:${Director} 
         </h2></p>     
        <p><h2 class="stars">STARS:${Stars}&nbsp;<i style="border-left:2px solid #000;height:50px;"></i>&nbsp;GENRE: ${Genre}</h2></p>
        
        <p class="description">${Description}</p>
       
      
        </div>
        `;
        movieDiv.appendChild(movieDetail);
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
          }
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }
          $(document).keyup(function(e) {
            if (e.key === "Escape") { 
            modal.style.display = "none";
           }
       });       
}


