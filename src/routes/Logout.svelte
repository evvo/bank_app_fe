<script>
    import {token} from '../stores.js';
    import {navigate} from "svelte-routing";

    token.set(null)

    navigate("/", { replace: true });
</script>

Logging you out...