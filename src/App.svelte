<script lang="ts">
  import ChessBoard from "./chessBoard/chessBoard.svelte";
  import "toastify-js/src/toastify.css";
</script>

<style>
  main {
    font-family: "Lato", sans-serif;
    font-weight: 300;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 26px;
    font-weight: 100;
    color: #fcc9b9;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  span {
    font-weight: 900;
    color: #ccc;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Svelte <span>Chess</span></h1>
  <ChessBoard />
</main>
