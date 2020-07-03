<script>
    import {statuses} from '../constants'
    import Select, {Option} from '@smui/select';

    export let transaction
    export let updateFunction
</script>

<Select bind:value={transaction.status} on:change={(e) => updateFunction(e)} label="Status">
    {#each statuses as status}
        <Option value={status.value} selected={transaction.status === status.value}>{status.text}</Option>
    {/each}
</Select>