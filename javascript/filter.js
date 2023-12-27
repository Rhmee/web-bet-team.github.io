let movies = null;

class MovieList extends HTMLElement {
    moviesData = null;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.moviesData = null;
        console.log("movie duudagdav");
    }

    connectedCallback() {
        this.fetchMoviesData();
    }

    fetchMoviesData() {
        const API_URL = "https://api.jsonbin.io/v3/b/65815955266cfc3fde6ab114";
        const API_KEY1 =
            "$2a$10$xgjEuMB695YYdVlN5PlH3O71Mntu9XSGLsO3KwS0wv6NxzenB.fCW";

        const headers = {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY1,
        };

      fetch(API_URL, { headers })
          .then((response) => response.json())
          .then((data) => {
              if (Array.isArray(data.record.movies)) {
                movies = data.record.movies;
                this.render();
              } else {
                console.error("Data.record.movies is not an array.");
              }
          })
          .catch((error) => console.error("Error fetching JSON:", error));
    }

    render() {
      this.shadowRoot.innerHTML = `
          <section class="movies-content" id="movies"></section>
        `;
    }

    formatViews(views) {
      if (views >= 1000000000) {
        return (views / 1000000000).toFixed(1) + "B";
      } else if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + "M";
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + "K";
      } else {
        return views.toString();
      }
    }

    displayMovies(movies) {
      const moviesSection = document.getElementById("movies");
      console.log(moviesSection, "before");
      moviesSection.innerHTML = "";
      console.log(moviesSection, "after");
      movies.forEach((movie) => {
        const movieArticle = document.createElement("article");
        movieArticle.classList.add("one_movies");

        movieArticle.innerHTML = `
                <a href="info.html?id=${movie.id}">
                    <div class="imagee">
                        <img src="${movie.poster}" alt="${movie.ner}">
                        <p class="unelgee">
                            <span>${this.formatViews(
                              movie.views
                            )} <i class="fa fa-eye" aria-hidden="true"></i></span>
                            <spanthis/>${this.formatRate(
                              movie.rate
                            )} <i class="fa fa-star" style="color: #ffd747;"></i></span>
                            <span>${
                              movie.rate
                            } <i class="fa fa-heart" style="color:red"></i></span>
                        </p>
                    </div>
                    <h4>${movie.ner}</h4>
                </a>
            `;

        moviesSection.appendChild(movieArticle);
      });
    }
  }

  customElements.define("movie-list", MovieList);

  class FilterFunctions extends HTMLElement {
    constructor() {
      super();
      this.moviesData = null;
      this.API_URL = "https://api.jsonbin.io/v3/b/65815955266cfc3fde6ab114";
      this.API_KEY1 =
        "$2a$10$xgjEuMB695YYdVlN5PlH3O71Mntu9XSGLsO3KwS0wv6NxzenB.fCW";
      console.log("filter duudagdav");

      this.attachShadow({ mode: "open" });
      const container = document.createElement("div");
      container.id = "movies";
      this.shadowRoot.appendChild(container);
      this.fetchMovies();
    }

    formatRate(rate) {
      return rate.toFixed(1);
    }

    formatViews(views) {
      if (views >= 1000000000) {
        return (views / 1000000000).toFixed(1) + "B";
      } else if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + "M";
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + "K";
      } else {
        return views.toString();
      }
    }

    connectedCallback() {
      console.log(document.getElementById("byPopularity"), "dqiowdjqwi");
      document
        .getElementById("byPopularity")
        .addEventListener("click", () => this.sortByPopularity());
      document
        .getElementById("byGenre")
        .addEventListener("change", () => this.applyFilters());
      document
        .getElementById("byRating")
        .addEventListener("change", () => this.applyFilters());
      document
        .getElementById("byYear")
        .addEventListener("change", () => this.applyFilters());
      document
        .getElementById("A_Z")
        .addEventListener("click", () => this.sortAlphabetically());
    }

    fetchMovies() {
      const headers = {
        "Content-Type": "application/json",
        "X-Master-Key": this.API_KEY1,
      };

      fetch(this.API_URL, { headers })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.record.movies)) {
            this.moviesData = data.record.movies;
            this.displayMovies(data.record.movies);
          } else {
            console.error("Data.record.movies is not an array.");
          }
        })
        .catch((error) => console.error("Error fetching JSON:", error));
    }

    sortByPopularity() {
      console.log(movies, "movielist");
      console.log("sort popu");
      const sortedMovies = [...movies].sort((a, b) => b.views - a.views);
      console.log(sortedMovies);
      this.displayMovies(sortedMovies);
    }

    applyFilters() {
      const selectedGenre = this.shadowRoot.getElementById("byGenre").value;
      const selectedRating = this.shadowRoot.getElementById("byRating").value;
      const selectedYear = this.shadowRoot.getElementById("byYear").value;

      let filteredMovies = moviesData;

      if (selectedGenre !== "AllMovie") {
        filteredMovies = filteredMovies.filter(
          (movie) => movie.genre === selectedGenre
        );
      }

      if (selectedRating !== "AllRate") {
        filteredMovies = filteredMovies.filter((movie) => {
          if (selectedRating === "5") {
            return movie.rate <= 5.99;
          } else {
            const lowerBound = parseInt(selectedRating);
            const upperBound = lowerBound + 1;
            return movie.rate >= lowerBound && movie.rate < upperBound;
          }
        });
      }

      if (selectedYear !== "AllYear") {
        filteredMovies = filteredMovies.filter(
          (movie) =>
            new Date(movie.release_date).getFullYear() === parseInt(selectedYear)
        );
      }

      if (selectedRating === "AllRate") {
        filteredMovies = filteredMovies.sort((a, b) => b.rate - a.rate);
      }

      this.displayMovies(filteredMovies);
    }

    sortAlphabetically() {
      const sortedMovies = [...this.moviesData].sort((a, b) =>
        a.ner.localeCompare(b.ner, "en", { sensitivity: "base" })
      );
      this.displayMovies(sortedMovies);
    }

    displayMovies(movies) {
      const moviesSection = document.getElementById("movies");
      console.log(moviesSection);
      moviesSection.innerHTML = "";
      movies.forEach((movie) => {
        const movieArticle = document.createElement("article");
        movieArticle.classList.add("one_movies");

        movieArticle.innerHTML = `
                <a href="info.html?id=${movie.id}">
                    <div class="imagee">
                        <img src="${movie.poster}" alt="${movie.ner}">
                        <p class="unelgee">
                            <span>${this.formatViews(
                              movie.views
                            )} <i class="fa fa-eye" aria-hidden="true"></i></span>
                            <span>${this.formatRate(
                              movie.rate
                            )} <i class="fa fa-star" style="color: #ffd747;"></i></span>
                            <span>${
                              movie.rate
                            } <i class="fa fa-heart" style="color:red"></i></span>
                        </p>
                    </div>
                    <h4>${movie.ner}</h4>
                </a>
            `;

        moviesSection.appendChild(movieArticle);
      });
    }
}

customElements.define("filter-functions", FilterFunctions);