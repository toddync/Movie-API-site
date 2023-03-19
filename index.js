import axios from 'axios';

var holder = document.getElementById("CardsHolder");
const key = "?";

var data = axios.get("https://api.themoviedb.org/3/discover/movie", {
    params:{
        api_key: key
    }
}); 
console.log(data)

const CardBuilder = (src, name) => {
    return `
    <figure class="card">

        <img src="${src}" />

        <figcaption>${name}</figcaption>

    </figure>`;
};

