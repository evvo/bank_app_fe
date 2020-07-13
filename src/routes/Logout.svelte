<script>
    import {user} from '../stores.js';
    import {navigate} from "svelte-routing";
    import {clearUser} from "../request";

    export let location

    clearUser()

    navigate("/");
</script>

Logging you out...