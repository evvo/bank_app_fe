<script>
    import { Circle } from "svelte-loading-spinners"
    import {loading} from "./stores"

    export let loadingContext = 'global'
    export let message = null
</script>

<style>
    #centered-grid {
        margin-left: auto;
        margin-right: auto;
        width:70px;
    }

    .loading {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(211, 233, 255, 0.5);
    }

    :global(.loading #centered-grid div) {
        position: absolute;
        top: 50%;
    }

    .message {
        margin-top: 10px;
        text-align: center;
    }

    .message-global {
        margin-top: 100px;
        text-align: center;
    }
</style>

{#if $loading[loadingContext] && loadingContext !== 'global'}
    <div id="centered-grid">
        <div>
            <Circle size="60" color="#FF3E00" unit="px" />
            {#if message}
                <div class="message">{message}</div>
            {/if}
        </div>
    </div>
{/if}

{#if $loading[loadingContext] && loadingContext === 'global'}
    <div class="loading">
        <div id="centered-grid" class="global-loading">
            <div>
                <Circle size="60" color="#FF3E00" unit="px" />
                {#if message}
                    <div class="message-global">{message}</div>
                {/if}
            </div>
        </div>
    </div>
{/if}

{#if !$loading[loadingContext]}
    <slot />
{/if}