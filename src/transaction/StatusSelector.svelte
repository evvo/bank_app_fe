<script>
    import {statuses} from '../constants'
    import Select, {Option} from '@smui/select';
    import Loading from "../Loading.svelte";

    export let transaction
    export let updateFunction
</script>

<Loading loadingContext="updateTransactionStatus">
    <Select bind:value={transaction.status} on:change={(e) => updateFunction(e)} label="Status">
        {#each statuses as status}
            <Option value={status.value} selected={transaction.status === status.value}>{status.text}</Option>
        {/each}
    </Select>
</Loading>