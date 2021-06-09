const apiKey = `?api_key=9ca53593f50ef7ae15aa5e856bce4bf1`;
const defaultURL = `https://api.themoviedb.org/3/discover/movie?api_key=9ca53593f50ef7ae15aa5e856bce4bf1&`;
function createParamString(optionObject) {
  var string = Object.keys(optionObject)
    .map(key => key + "=" + optionObject[key])
    .join("&");
  return string;
}
export default {
  getMovies: function(urlOptions) {
    var paramString = createParamString(urlOptions);
    return new Promise(function(resolve, reject) {
      fetch(`${defaultURL}${paramString}`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json.results);
          resolve({ results: json.results, isLoading: false });
        })
        .catch(err => {
          console.log("Error" + err);
          reject(err);
        });
    });
  },
  getMovie: function(urlOptions, movieID) {
    var paramString = createParamString(urlOptions);
    return new Promise(function(resolve, reject) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieID}${apiKey}&${paramString}`
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          localStorage.setItem("currentMovieID", json.id);
          resolve({ results: json, isLoading: false });
        })
        .catch(err => {
          console.log("Error" + err);
          reject(err);
        });
    });
  },
  getPerson: function(urlOptions, personID) {
    var paramString = createParamString(urlOptions);
    return new Promise(function(resolve, reject) {
      fetch(
        `https://api.themoviedb.org/3/person/${personID}${apiKey}&${paramString}`
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          localStorage.setItem("currentPersonID", json.id);
          console.log(json);
          resolve({ results: json, isLoading: false });
        })
        .catch(err => {
          console.log("Error" + err);
          reject(err);
        });
    });
  },
  search: function(urlOptions) {
    var paramString = createParamString(urlOptions);
    return new Promise(function(resolve, reject) {
      fetch(`https://api.themoviedb.org/3/search/multi${apiKey}&${paramString}`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json.results);
          resolve({ results: json.results, isLoading: false });
        })
        .catch(err => {
          console.log("Error" + err);
          reject(err);
        });
    });
  },
  getPopular: function(urlOptions, type) {
    var paramString = createParamString(urlOptions);
    return new Promise(function(resolve, reject) {
      fetch(
        `https://api.themoviedb.org/3/${type}/popular${apiKey}&${paramString}`
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json.results);
          resolve({ results: json.results, isLoading: false });
        })
        .catch(err => {
          console.log("Error" + err);
          reject(err);
        });
    });
  },
  getGenres: function(urlOptions, genreList, storeToLS) {
    var paramString = createParamString(urlOptions);
    return new Promise(function(resolve, reject) {
      fetch(
        `https://api.themoviedb.org/3/genre/${genreList}/list${apiKey}&${paramString}`
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json.genres);
          resolve({ results: json.genres, isLoading: false });
          if (storeToLS) {
            localStorage.setItem(
              `${genreList}NavItems`,
              JSON.stringify(json.genres)
            );
          }
        })
        .catch(err => {
          console.log("Error" + err);
          reject(err);
        });
    });
  }
};
