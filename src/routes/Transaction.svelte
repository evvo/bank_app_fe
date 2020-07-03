<script>
    import queryString from "query-string";
    import {onMount} from "svelte";
    import {fetchTransaction, updateTransactionStatus} from '../request'

    import {loading} from '../stores'
    import {statuses} from '../constants'
    import TransactionStatus from "../transaction/TransactionStatus.svelte";
    import StatusSelector from "../transaction/StatusSelector.svelte";
    import TransactionDate from "../transaction/TransactionDate.svelte";
    import NewTransactionForm from "../transaction/NewTransactionForm.svelte";
    import SingleTransaction from "../transaction/SingleTransaction.svelte";

    export let location
    let transaction = null

    loading.set(true)

    onMount(async () => {
        const queryStrings = queryString.parse(location.search)
        if (!queryStrings.transaction_id) {
            return
        }

        const result = await fetchTransaction(queryStrings.transaction_id)
        if (result.success) {
            transaction = result.data
        }
        loading.set(false)
    })

    async function update(e) {
        loading.set(true)
        await updateTransactionStatus(transaction, e.target.value)
        loading.set(false)
    }

</script>

<style type="text/scss">
    @import '@material/layout-grid/mdc-layout-grid';
</style>

{#if $loading === false && !transaction}
    Transaction cannot be found
{/if}

{#if $loading === false && transaction}
    <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">

            <div class="mdc-layout-grid__cell
                mdc-layout-grid__cell--span-4">
                <NewTransactionForm />
            </div>

            <div class="mdc-layout-grid__cell
                mdc-layout-grid__cell--span-8">
                <SingleTransaction transaction={transaction} />
            </div>


        </div>
    </div>
{/if}