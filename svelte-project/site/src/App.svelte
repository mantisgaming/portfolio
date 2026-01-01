<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import portrait from "./assets/Portrait.jpg";
  export let url: string = "";
</script>

<main>
  <Router {url}>
    <Route path="/">
      <div class="jumbotron">
        <img class="portrait" alt="Self Portrait" src={portrait} />
        <div>
          <h1 class="no-select">Max Allen</h1>
          <strong class="no-select">They / Them &mdash; Technical Game Developer</strong>
          <p>Hello and welcome to my portfolio website! I am a game developer specializing in the technical aspects of game development. Some of my specialties are software architecture, online networking, and graphics programming.</p>
          <p>Scroll down to view a collection of my projects which highlight my skills!</p>
          <p>For any business inquiries, feel free to email me at <a href="mailto:maxwell.allen.business@gmail.com" target="_blank">maxwell.allen.business@gmail.com</a></p>
        </div>
      </div>
    </Route>
  </Router>
</main>

<style>
  .portrait {
    border-radius: 2rem;
    box-shadow: 0 0 3rem -1rem black;
  }

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
      content: " ";
      display: block;
      width: 70%;
      height: 2px;
      background-color: white;
      margin: 0% 15%;
      border-radius: 1px;
      transform: translateY(-3px);
    }
  }
</style>
