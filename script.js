
  const key = 'api_key=eddfd80689ca924dc0425f0168822b9c';
   const base = 'https://api.themoviedb.org/3/';
   const url = base + 'discover/movie?sort_by=popularity.desc&'+key;
   const searchUrl = base + 'search/movie?' + key;
   const imgUrl = 'https://image.tmdb.org/t/p/w500';
   const movies = document.getElementById('movies');
   const form = document.querySelector('form');
   const search = document.getElementById('search');

getMovies(url);

function getMovies(url){
    
    fetch(url).then(res=> res.json()).then(data=>{
       showMovies(data.results);
    })
}

function showMovies(data){
    movies.innerHTML = '';
    data.forEach(movie=> {
        const {title, poster_path, vote_average, overview,} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');
        movieEl.innerHTML = `
        <img src="${imgUrl+poster_path}" alt="${title}" />

        <div class="movie-info">
        <h2 class="title">${title}</h2>
        <span class="${getRating(vote_average)}">${vote_average}</span>
    </div>

        <div class="overview">
        <h3>Overview</h3>
          <p>
          ${overview}
          </p>
        </div>
         `
         movies.appendChild(movieEl);
    })
    

}

function getRating(vote){
    if(vote>=8){
        return 'green';
    }else if(vote>=5){
        return 'yellow';
    }else{
        return 'red';
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    console.log("search");

    if(searchTerm){
        getMovies(searchUrl+'&query='+searchTerm);
    }else{
        getMovies(url);
    }
})