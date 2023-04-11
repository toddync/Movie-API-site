var holder = document.getElementById("CardsHolder");
const key = "f4e22f1a9612fbe0d5a878abe5aa42f9";
const poster = "https://image.tmdb.org/t/p/w500/";
const changer = function (){
<<<<<<< HEAD
    document.querySelectorAll(".change").forEach(change => {change.addEventListener("click", function(){
            subject("change")
    })})
=======
    document.querySelectorAll(".change").forEach(change => {change.addEventListener("click", function(){subject("change")})})
>>>>>>> 3c8b5cef1f72dea175ef7547ee19768aa29b89c3
}
const subject = function (mode){
    if (mode == "change"){
        var now = document.querySelector("strong").getAttribute("data-now")
        var then = document.querySelector("strong").getAttribute("data-subject")
        document.querySelector("strong").setAttribute("data-subject", now)
        document.querySelector("strong").setAttribute("data-now", then)
        document.querySelector("strong").innerHTML = then
        LIST(1)
    } else if (mode == "get"){
        if (document.querySelector("strong").getAttribute("data-now") == "Movies<span class='change'>(<blue>Tv shows</blue>)</span>"){
            return "movie"
        } else {
            return "tv"
        }
    } else if (mode == "set"){
        document.querySelector("strong").innerHTML = "Movies<span class='change'>(<bluee>Tv shows</blue>)</span>"
        document.querySelector("strong").setAttribute("data-now", "Movies<span class='change'>(<blue>Tv shows</blue>)</span>")
        document.querySelector("strong").setAttribute("data-subject", "Tv shows<span class='change'>(<blue>Movies</blue>)</span>")
        LIST(1)
    }
    changer()
    document.querySelector("#search").value = "" 
    document.getElementById("number").innerHTML = "1"
    document.querySelector("#previous").classList.add("none")
};
var search_text
var TMDb

changer()

function LIST(page_count){
    axios.get(`https://api.themoviedb.org/3/discover/${subject("get")}`, {
        params:{
            api_key: key,
            language: "pt-BR",
            region:"BR",
            page: page_count,
            include_adult: false
        }
    }).then( response => {
        CardBuilder(response.data.results, response.data.total_pages, subject("get"))
        console.log(response)
    }).catch();
}

function search(page_count, q){
    axios.get("https://api.themoviedb.org/3/search/multi", {
        params:{
            api_key: key,
            language: "pt-BR",
            page: page_count,
            query: q,
            include_adult: false
        }
    }).then( response => {
        CardBuilder(response.data.results, response.data.total_pages)
    }).catch();
}

function descMv(id){
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params:{
            api_key: key,
            language: "pt-BR",
        }
    }).then( response => {
        DescBuilder(response.data)
    }).catch();
}

function descTv(id){
    axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
        params:{
            api_key: key,
            language: "pt-BR",
        }
    }).then( response => {
        DescBuilder(response.data)
    }).catch();
}

document.querySelector("loader").classList.remove("none")
document.querySelector("main").classList.remove("none")
LIST(1);
function set(){
changer()
var arrows = document.querySelectorAll("span");
arrows.forEach( arrow => {
    if( arrow.getAttribute("data-page")){
    arrow.addEventListener("click", function (){

        var number = document.getElementById("number");
        holder.innerHTML = ""
console.log(parseInt(number.getAttribute("data-pages")))
console.log(parseInt(number.innerHTML))
        if(this.getAttribute("data-page") == "next" && parseInt(number.getAttribute("data-pages")) >= (parseInt(number.innerHTML)+1) ){

            document.querySelector("loader").classList.remove("none")
            document.querySelector("main").classList.remove("none")

            if(document.querySelector("#search").getAttribute("data-search") == "yes"){
                search(parseInt(number.innerHTML)+1, search_text)
            }else{
                LIST(parseInt(number.innerHTML)+1);
            }
            number.innerHTML = parseInt(number.innerHTML)+1;
            document.querySelector("span[data-page='prev']").classList.remove("none");
            document.body.style.overflow = "hidden";
            window.scrollTo({ top: 0, behavior: 'smooth' });

             if(parseInt(number.getAttribute("data-pages")) < (parseInt(number.innerHTML)+1) ){
              this.classList.add("none")
             }
        }else if(this.getAttribute("data-page") == "prev" && (parseInt(number.innerHTML)-1) > 1){
    
            document.querySelector("loader").classList.remove("none")
            document.querySelector("main").classList.remove("none")

            if(document.querySelector("#search").getAttribute("data-search") == "yes"){
                search(parseInt(number.innerHTML)-1, search_text)
            }else{
                LIST(parseInt(number.innerHTML)-1);
            }
            number.innerHTML = parseInt(number.innerHTML)-1;
            document.body.style.overflow = "hidden";
            window.scrollTo({ top: 0, behavior: 'smooth' });
            

        } else if(this.getAttribute("data-page") == "prev" && (parseInt(number.innerHTML)-1) >= 1){
            document.querySelector("loader").classList.remove("none")
            document.querySelector("main").classList.remove("none")

            this.classList.add("none");
            if(document.querySelector("#search").getAttribute("data-search") == "yes"){
                search(parseInt(number.innerHTML)-1, search_text)
            }else{
                LIST(parseInt(number.innerHTML)-1);
            }
            number.innerHTML = parseInt(number.innerHTML)-1;
            document.body.style.overflow = "hidden";
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } else if(this.getAttribute("data-page") == "prev" && (parseInt(number.innerHTML)-1) < 1){
            this.classList.add("none");
        }

        if(parseInt(number.getAttribute("data-pages")) > parseInt(number.innerHTML)){
            document.querySelector("span[data-page='next']").classList.remove("none")
        }
    })
    }

});

document.querySelector("#search").addEventListener("keydown", function (){
    search(1,this.value)
    if(this.value != ""){
        document.querySelector("strong").innerHTML="Search results";
        document.querySelector(".footer").setAttribute("data-search", "yes");
    } else {
        LIST(1)
        subject("set") 
    }
})

document.querySelector("#search").addEventListener("keyup", function (){
    search_text = this.value
    search(1,this.value)
    if(this.value != ""){
        document.querySelector("#previous").classList.add("none")
        if (subject("get") == "movie"){
            document.querySelector("strong").innerHTML= "Search results<span class='change'>(<blue>Tv shows</blue>)</span>";
        } else {
            document.querySelector("strong").innerHTML= "Search results<span class='change'>(<blue>Movies</blue>)</span>";
        }
        this.setAttribute("data-search", "yes");
        document.getElementById("number").innerHTML = "1"
        changer()
    } else {
        document.querySelector("#previous").classList.add("none")
        LIST(1)
        subject("set")
        this.setAttribute("data-search", "no");
        document.getElementById("number").innerHTML = "1"
    }
})

}
set()
const CardBuilder = (array, counter, type) => {
    var holder = document.getElementById("CardsHolder");
    var content = "";
    array.map( movies => {
        content += `
    <figure class="card" data-id='${movies.id}' onclick="`; if(movies.media_type == "movie" || type == "movie"){content+= `descMv(${movies.id})`}else if(movies.media_type == "tv" || type == "tv"){content+= `descTv(${movies.id})`} content+=`"">
        <img src="`; if(movies.poster_path){content+=poster+movies.poster_path}else if(movies.profile_path){content+=poster+movies.profile_path} content+=`" />
        <figcaption>${movies.title||movies.name}</figcaption>
    </figure>`;
    document.getElementById("number").setAttribute("data-pages", counter);
        if(counter > 1){
            document.querySelector(".footer").classList.remove("none");
        } else {
            document.querySelector(".footer").classList.add("none");
        }
});
    holder.innerHTML = content;
    document.querySelector("loader").classList.add("none");
    document.querySelector("main").classList.add("none")
    document.body.style.overflow = "auto";
};

const DescBuilder = (array) => {
    var oi = `
        <div class="movieHolder">
            <button id="remove"></button>
            <div class="movie_card">
                <div class="info_section">
                    <div class="movie_header">
                    <img class="locandina" src="${poster+array.poster_path}"/>
                    <h1>${array.title || array.name}</h1>
                    <h4>${array.release_date}</h4>
                    <span class="minutes">${unnecessary(array.runtime)}</span>
                    <p class="type">`; array.genres.map(names => { oi+=" "+names.name+"; "}) ;oi+=`</p>
                </div>
            <div class="movie_desc">
                <p class="text">${array.overview}</p>
            </div>
        </div>
        <div class="blur_back bright_back" style="background-image: url(${img(array.backdrop_path || array.poster_path)})"></div>
        </div>
    </div>
  `;
  document.body.innerHTML += oi;
    set()
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector("#remove").addEventListener("click", function(){
        document.body.removeChild(document.querySelector(".movieHolder"))
        document.body.style.overflow = "auto";
    })
}

const unnecessary = function(time){
    if(time == undefined || time == "null"){
        return "Series"
    } else {
        return time+"min"
    }
}
const img = function(path){
    if(path == undefined || path == "null"){
        return "./default.png"
    } else {
        return poster+path
    }
}