<script>
    import {Row, Cell} from '@smui/data-table';
    import TransactionStatus from "./TransactionStatus.svelte";
    import {navigate} from "svelte-routing";
    import TransactionDate from "./TransactionDate.svelte";
    import {user} from '../stores'
    import {beforeUpdate} from "svelte";

    export let transaction
    let transactionClass = 'unknown'

    function getTransactionClass() {
        if(transaction.status === 1) {
            return 'paid'
        }

        if(transaction.from_user.id === $user.user_id) {
            return 'sent'
        }

        if(transaction.to_user.id === $user.user_id) {
            return 'received'
        }

        return 'unknown'
    }

    beforeUpdate(() => {
        transactionClass = getTransactionClass()
    })
</script>

<style>
    :global(.sent) {
        color: red;
    }

    :global(.received) {
        color: yellow;
    }

    :global(.paid) {
        color: green;
    }

    :global(.unknown) {
        color: gray;
    }
</style>

<Row on:click={() => navigate(`/details?transaction_id=${transaction.id}`, { replace: false })}>
    <Cell class="{transactionClass}">||||</Cell>
    <Cell><TransactionDate transaction={transaction} format='MMM D' /></Cell>
    <Cell>{transaction.to_user.name}</Cell>
    <Cell numeric>{transaction.amount}</Cell>
    <Cell><TransactionStatus transaction={transaction} /></Cell>
</Row>