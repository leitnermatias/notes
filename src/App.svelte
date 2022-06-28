<script lang="ts">
  import {Router, Route} from "svelte-navigator";
  import Notes from "./routes/Notes.svelte";
  import Configuration from "./routes/Configuration.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import {setForLocalStorage} from "./service/utils";

  if (window.localStorage.getItem('category') === null) {
    setForLocalStorage('category', [
      { name: "General" },
    ])
  }

</script>

<main>
  <Router>
    <Navbar/>
    <div>
      <Route path="/" component={Notes} />
      <Route path="/configuration" component={Configuration} />
    </div>
  </Router>
</main>

<style>
 
</style>
