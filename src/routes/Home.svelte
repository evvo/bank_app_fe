<script>
    import queryString from "query-string";
    import {onMount, onDestroy} from "svelte";
    import {fetchTransactions, createTransaction} from "../request";
    import {loading, errors} from "../stores";

    import {mainFilters} from '../stores'
    import Filters from "../transaction/Filters.svelte";
    import TransactionListing from "../transaction/TransactionListing.svelte";
    import NewTransactionForm from "../transaction/NewTransactionForm.svelte";

    export let location
    let transactions = [];

    loading.set(false)
    setFilters(queryString.parse(location.search))

    async function updateTransactions() {
        // loading.set(true)
        const result = await fetchTransactions(queryString.stringify($mainFilters))

        if (result.success) {
            transactions = result.data
        }

        // loading.set(false)
    }

    function setFilters(queryStrings) {
        ['sort', 'direction', 'search'].forEach((key) => {
            if (queryStrings[key]) {
                $mainFilters[key] = queryStrings[key]
            }
        })
    }

    $: $mainFilters, updateTransactions()
    $: $mainFilters, changeQueryStrings()

    function getDirection(sortField) {
        return $mainFilters.sort === sortField ? $mainFilters.direction : ''
    }

    function changeQueryStrings() {
        const filters = {}
        Object.keys($mainFilters).forEach((filter) => {
            if ($mainFilters[filter] !== '' && $mainFilters[filter] !== null) {
                filters[filter] = $mainFilters[filter]
            }
        })

        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" +
                queryString.stringify(filters)
        window.history.pushState({path: newurl}, '', newurl)
    }
</script>

<style type="text/scss">
    @import '@material/layout-grid/mdc-layout-grid';

    :global(.mdc-data-table thead) {
        display: none;
    }

    :global(.mdc-data-table) {
        width: 100%;
    }
</style>

<div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">

        <div class="mdc-layout-grid__cell">
            <NewTransactionForm callbackAfterSuccess={updateTransactions} />
        </div>

        <div class="mdc-layout-grid__cell--span-4-phone
                            mdc-layout-grid__cell--span-8-tablet
                            mdc-layout-grid__cell--span-8-desktop">
            {#if $loading === false}
                <Filters />
                <TransactionListing transactions={transactions} />
            {/if}
        </div>

    </div>
</div>