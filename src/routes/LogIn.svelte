<script>
    import {logIn} from '../request'
    import {loading} from '../stores'
    import Button from '@smui/button';
    import Textfield from '@smui/textfield'
    import Loading from "../Loading.svelte";

    export let location

    let logInForm = {
        username: '',
        password: ''
    }
</script>

<svelte:head>
    <title>Log In</title>
</svelte:head>

<Loading message="Logging you in..." />
{#if !$loading.global}
    <form on:submit={ (e) => e.preventDefault() }>
        <Textfield bind:value={logInForm.username} label="Username" input$autocomplete="username"/>
        <Textfield bind:value={logInForm.password} type="password" label="Password" input$autocomplete="current-password" />
        <Button type="button" on:click={() => logIn(logInForm) }>Log In</Button>
    </form>
{/if}