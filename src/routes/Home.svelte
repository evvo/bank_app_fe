<script>
    import queryString from "query-string"
    import {fetchTransactions,} from "../request"
    import {mainFilters} from "../stores"
    import Filters from "../transaction/Filters.svelte"
    import TransactionListing from "../transaction/TransactionListing.svelte"
    import NewTransactionForm from "../transaction/NewTransactionForm.svelte"
    import Loading from "../Loading.svelte"

    export let location
    let transactions = []

    async function updateTransactions() {
        const result = await fetchTransactions(queryString.stringify($mainFilters))

        if (result.success) {
            transactions = result.data
        }
    }

    function setFilters(queryStrings) {
        ['sort', 'direction', 'search'].forEach((key) => {
            if (queryStrings[key]) {
                $mainFilters[key] = queryStrings[key]
            }
        })
    }

    setFilters(queryString.parse(location.search))

    $: $mainFilters, changeQueryStrings(), updateTransactions()

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

        let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" +
                queryString.stringify(filters)

        if (newUrl !== window.location.href) {
            window.history.pushState({ path: newUrl }, '', newUrl)
        }
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

<svelte:head>
    <title>Transactions Listing</title>
</svelte:head>

<div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">

        <div class="mdc-layout-grid__cell">
            <NewTransactionForm callbackAfterSuccess={updateTransactions} />
        </div>

        <div class="mdc-layout-grid__cell--span-4-phone
                            mdc-layout-grid__cell--span-8-tablet
                            mdc-layout-grid__cell--span-8-desktop">

            <Filters />

            <Loading loadingContext="fetchTransactions">
                <TransactionListing transactions={transactions} />
            </Loading>
        </div>

    </div>
</div>