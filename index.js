//import axios from './node_modules/axios/dist/axios.min.js';

var holder = document.getElementById("CardsHolder");
const key = "f4e22f1a9612fbe0d5a878abe5aa42f9";
const poster = "http://image.tmdb.org/t/p/w500/";

var TMDb

function MOV(page_count){
    var content = "";

    axios.get("https://api.themoviedb.org/3/discover/movie", {
        params:{
            api_key: key,
            language: "pt-BR",
            region: "BR",
            page: page_count
        }
    }).then( response => {
        TMDb = response.data.results ;
        TMDb.map( movies => {
            content += CardBuilder(poster+movies.poster_path,movies.title);
        });
    }).then(function (){
        holder.innerHTML = content;
        document.querySelector("loader").classList.add("none");
        document.body.style.overflow = "auto";
    }).catch();
}
document.querySelector("loader").classList.remove("none")
MOV(1);

var arrows = document.querySelectorAll("span");
arrows.forEach( arrow => {
    if( arrow.getAttribute("data-page")){
    arrow.addEventListener("click", function (){

        var number = document.getElementById("number");

        if(this.getAttribute("data-page") == "next"){

            document.querySelector("loader").classList.remove("none")
            MOV(parseInt(number.innerHTML)+1);
            number.innerHTML = parseInt(number.innerHTML)+1;
            document.querySelector("span[data-page='prev']").classList.remove("none");
            document.body.style.overflow = "hidden";
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } else if(this.getAttribute("data-page") == "prev" && (parseInt(number.innerHTML)-1) > 1){
    
            document.querySelector("loader").classList.remove("none")
            MOV(parseInt(number.innerHTML)-1);
            number.innerHTML = parseInt(number.innerHTML)-1;
            document.body.style.overflow = "hidden";
            window.scrollTo({ top: 0, behavior: 'smooth' });
            

        } else if(this.getAttribute("data-page") == "prev" && (parseInt(number.innerHTML)-1) >= 1){
            document.querySelector("loader").classList.remove("none")
            this.classList.add("none");
            MOV(parseInt(number.innerHTML)-1);
            number.innerHTML = parseInt(number.innerHTML)-1;
            document.body.style.overflow = "hidden";
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } else if(this.getAttribute("data-page") == "prev" && (parseInt(number.innerHTML)-1) < 1){
            this.classList.add("none");
        }
    })
    }
});

const CardBuilder = (src, name) => {
    return `
    <figure class="card">

        <img src="${src}" />

        <figcaption>${name}</figcaption>

    </figure>`;
};

