export const TMDB_CONFIG = {
    BASE_URL:'https://api.themoviedb.org/3',
    API_KEY:process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    header:{
        accept:'application/json',
        Authorization:`Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async({query}:{query:string})=>{
    const endpoint = query
    ?`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method:'GET',
        headers:TMDB_CONFIG.header,
    });

    if(!response.ok){
        //@ts-ignore
        throw new Error('Failed to fetch movies',response.statusText);

    }
    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async(movieId: string):Promise<MovieDetails>=>{
    try{
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method:'GET',
            headers:TMDB_CONFIG.header,
    });

    if(!response.ok) throw new Error('Failed to fetch movie details');
    const data = await response.json();
    return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmNmZjExNzI0NTdjZDhjNTE4ODVlYjEwM2JiOTIyNiIsIm5iZiI6MTc1Mjk5MDE1MC4yNDQsInN1YiI6IjY4N2M4MWM2NWFjZjY5YTgxZjUyODhjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWHB_NZBi3dEBwfg6JIDEdCczQtRnM3VqRHr2OcLAaw'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));