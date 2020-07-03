<script>
    import {errors} from './stores.js';

</script>

<style>
    div {
        color: red;
    }
</style>
{#if $errors}
    <div>
    {#each Object.keys($errors) as errorField}
        {errorField} : {#each $errors[errorField] as error}
            {error} <br />
        {/each}
    {/each}
    </div>
{/if}