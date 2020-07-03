<script>
    import {user} from '../stores.js';
    import {navigate} from "svelte-routing";
    import {clearUser} from "../request";

    clearUser()

    navigate("/", { replace: true });
</script>

Logging you out...