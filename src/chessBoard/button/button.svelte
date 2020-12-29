<script lang="ts">
  export let text: string;
  export let callback: () => void;
</script>

<style>
  button {
    border: 2px solid #fcc9b9;
    border-radius: 5px;
    padding: 9px 10px 10px 10px;
    margin-top: 20px;
    background: white;
    font-size: 20px;
    font-weight: 300;
    font-family: "Lato";
    color: #555;
  }

  button:hover {
    box-shadow: 0 0px 10px -3px #888;
  }
</style>

<button on:click={callback}>{text}</button>
