<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import portrait from "./assets/Portrait.jpg";
  export let url: string = "";
</script>

<main>
  <Router {url}>
    <Route path="/">
      <div class="jumbotron">
        <img alt="Self Portrait" src={portrait} />
        <div>
          <h1 class="no-select">Max Allen</h1>
          <strong class="no-select">They / Them &mdash; Technical Game Developer</strong>
          <p>Hello and welcome to my portfolio website! I am a game developer specializing in the technical aspects of game development. Some of my specialties are software architecture, online networking, and graphics programming.</p>
          <p>Scroll down to view a collection of my projects which highlight my skills.</p>
        </div>
      </div>
    </Route>
  </Router>
</main>

<style>
  .jumbotron {
    display: flex;
    flex-direction: row;
    align-items: center;
    > *:not(:first-child) {
      padding-left: 5rem;
    }
  }

  h1 {
    font-size: 5rem;
    margin: 0;

    &::after {
      transition: 0.25s ease-out;
      content: " ";
      display: block;
      width: 70%;
      height: 2px;
      background-color: white;
      margin: 0% 15%;
      border-radius: 1px;
      transform: translateY(-3px);
    }

    &:hover::after {
      width: 90%;
      margin: 0% 5%;
    }
  }
</style>
