<script>
    import Button from '@smui/button';
    import Textfield from '@smui/textfield'
    import {mainFilters, loading} from '../stores'

    function handleSort(sortField) {
        $mainFilters.sort = sortField
        $mainFilters.direction = ($mainFilters.direction === 'ASC' ? 'DESC' : 'ASC')
    }

    let isDisabled
    let searchField = $mainFilters
    let searchTimeout
    const searchTimeoutTime = 400

    function updateSearchField(e) {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
            $mainFilters.search = e.target.value
        }, searchTimeoutTime)
    }

    $: $loading, isDisabled = ($loading.fetchTransactions === true)
    $: $mainFilters, searchField
</script>

<div>
    <Textfield type="search" bind:value={searchField.search} on:input={updateSearchField} label="Search" />
    <Button on:click={() => handleSort('date')} disabled="{isDisabled}">
        Date {$mainFilters.sort === 'date' ? $mainFilters.direction : ''}
    </Button>

    <Button on:click={() => handleSort('to_user')} disabled="{isDisabled}">
        Beneficiary {$mainFilters.sort === 'to_user' ? $mainFilters.direction : ''}
    </Button>

    <Button on:click={() => handleSort('amount')} disabled="{isDisabled}">
        Amount {$mainFilters.sort === 'amount' ? $mainFilters.direction : ''}
    </Button>
</div>