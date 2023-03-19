//import axios from './node_modules/axios/dist/axios.min.js';

var holder = document.getElementById("CardsHolder");
const key = "f4e22f1a9612fbe0d5a878abe5aa42f9";
var content = "";

var TMDb = axios.get("https://api.themoviedb.org/3/discover/movie", {
    params:{
        api_key: key
    }
});

    console.log(TMDb.data)


const CardBuilder = (src, name) => {
    return `
    <figure class="card">

        <img src="${src}" />

        <figcaption>${name}</figcaption>

    </figure>`;
};

