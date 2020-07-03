<script>
    import {Router, Link, Route} from "svelte-routing";
    import Home from "./routes/Home.svelte";
    import Transaction from './routes/Transaction.svelte'
    import LogIn from './routes/LogIn.svelte'
    import Logout from './routes/Logout.svelte'
    import NotFound from './routes/NotFound.svelte'
    import {token} from './stores'
    import Errors from "./Errors.svelte";

    export let url = "";


</script>

{#if $token == null}
    <Errors />

    <Router url="{url}">
        <Route path="/*" component={LogIn} />
    </Router>
{/if}

{#if $token != null}
    <Router url="{url}">
        <nav>
            <Link to="/">Home</Link>
            <Link to="logout">Logout</Link>
        </nav>

        <Errors />

        <div>
            <Route path="/" let:location component="{Home}"/>
            <Route path="/logout" component="{Logout}"/>
            <Route path="/details" component="{Transaction}"/>
            <Route component={NotFound} />
        </div>
    </Router>
{/if}
