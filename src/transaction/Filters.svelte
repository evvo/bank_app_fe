<script>
    import Button from '@smui/button';
    import Textfield from '@smui/textfield'
    import {mainFilters} from '../stores'

    function handleSort(sortField) {
        $mainFilters.sort = sortField
        $mainFilters.direction = ($mainFilters.direction === 'ASC' ? 'DESC' : 'ASC')
    }
</script>

<div>
    <Textfield type="search" bind:value={$mainFilters.search} label="Search" />
    <Button on:click={() => handleSort('date')}>
        Date {$mainFilters.sort === 'date' ? $mainFilters.direction : ''}
    </Button>

    <Button on:click={() => handleSort('to_user')}>
        Beneficiary {$mainFilters.sort === 'to_user' ? $mainFilters.direction : ''}
    </Button>

    <Button on:click={() => handleSort('amount')}>
        Amount {$mainFilters.sort === 'amount' ? $mainFilters.direction : ''}
    </Button>
</div>