//import axios from './node_modules/axios/dist/axios.min.js';

var holder = document.getElementById("CardsHolder");
const key = "f4e22f1a9612fbe0d5a878abe5aa42f9";
const poster = "http://image.tmdb.org/t/p/w500/";
var content = "";

var TMDb

axios.get("https://api.themoviedb.org/3/discover/movie", {
    params:{
        api_key: key
    }
}).then( response => {
    TMDb = response.data.results ;
    holder.innerHTML = TMDb;
    console.log(TMDb)
    console.log("\n\n\n\n");
    TMDb.map( movies => {
        console.log(movies);
        content += CardBuilder(poster+movies.poster_path,movies.title);
    });
    holder.innerHTML = content;
    console.log("\n\n\n\n");

    console.log(content);
}).catch();

const CardBuilder = (src, name) => {
    return `
    <figure class="card">

        <img src="${src}" />

        <figcaption>${name}</figcaption>

    </figure>`;
};

