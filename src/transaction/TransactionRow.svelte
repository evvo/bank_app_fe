<script>
    import {Row, Cell} from '@smui/data-table';
    import TransactionStatus from "./TransactionStatus.svelte";
    import {navigate} from "svelte-routing";
    import TransactionDate from "./TransactionDate.svelte";

    export let transaction
</script>

<Row on:click={() => navigate(`/details?transaction_id=${transaction.id}`, { replace: false })}>
    <Cell><TransactionDate transaction={transaction} format='MMM D' /></Cell>
    <Cell>{transaction.to_user.name}</Cell>
    <Cell numeric>{transaction.amount}</Cell>
    <Cell><TransactionStatus transaction={transaction} /></Cell>
</Row>