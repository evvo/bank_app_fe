<script>
    import queryString from "query-string";
    import {onMount} from "svelte";
    import {fetchTransaction, updateTransactionStatus} from '../request'
    import NewTransactionForm from "../transaction/NewTransactionForm.svelte";
    import SingleTransaction from "../transaction/SingleTransaction.svelte";
    import Loading from "../Loading.svelte";

    export let location
    let transaction = null

    onMount(async () => {
        const queryStrings = queryString.parse(location.search)
        if (!queryStrings.transaction_id) {
            return
        }

        const result = await fetchTransaction(queryStrings.transaction_id)
        if (result.success) {
            transaction = result.data
        }
    })

    async function update(e) {
        await updateTransactionStatus(transaction, e.target.value)
    }

</script>

<style type="text/scss">
    @import '@material/layout-grid/mdc-layout-grid';
</style>

<svelte:head>
    {#if transaction}
        <title>Transaction {transaction.id}</title>
    {/if}
</svelte:head>

<Loading>
    {#if !transaction}
        Transaction cannot be found
    {/if}

    {#if transaction}
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
</Loading>
