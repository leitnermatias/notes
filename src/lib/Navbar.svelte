<script lang="ts">
    import {Link, useLocation} from "svelte-navigator";
    import Button from "./Button.svelte";


    const location = useLocation();
    let currentLocation: string;
    $: currentLocation = $location.pathname;
</script>

<nav id="navbar">
    <Link to="/">
      <Button --border-color={currentLocation === '/' ? 'orange' : 'white'} --width="100px" --font-size="16px">Notes</Button>
    </Link>
    <Link to="/configuration">
      <Button --border-color={currentLocation === '/configuration' ? 'orange' : 'white'} --width="120px" --font-size="16px">Configuration</Button>
    </Link>
</nav>

<style>
    #navbar {
        padding: 10px;
        display: flex;
        justify-content: center;
        gap: 10px;
        background-color: rgba(8, 154, 180, 0.11);
        border-radius: 5px;
        border: 1px groove rgba(0, 0, 0, 0.267);
        margin-bottom: 20px;
    }
</style>