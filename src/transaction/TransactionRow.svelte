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
    :global(.transaction-border) {
        border-left: 10px solid;
    }

    :global(.sent) {
        border-left-color: red;
    }

    :global(.received) {
        border-left-color: yellow;
    }

    :global(.paid) {
        border-left-color: green;
    }

    :global(.unknown) {
        border-left-color: gray;
    }

    :global(.small) {
        width: 10%;
    }

    :global(.very-small) {
        width: 5%;
    }

    :global(.user-picture) {
        padding: 10px;
    }

    :global(.user-name) {
        font-size: 13pt;
        font-weight: 500;
    }

    :global(.amount) {
        font-size: 13pt;
        font-weight: 900;
    }
</style>

<Row class="transaction-border {transactionClass}"
     on:click={() => navigate(`/details?transaction_id=${transaction.id}`)}
    >
    <Cell class="small"><TransactionDate transaction={transaction} format='MMM. D' /></Cell>
    <Cell class="small user-picture">
        <img src="https://robohash.org/{transaction.to_user.name}?size=70x70">
    </Cell>
    <Cell>
        <span class="user-name">{transaction.to_user.name}</span> <br />
        Payment
    </Cell>
    <Cell numeric class="amount small">-&#36;{transaction.amount}</Cell>
    <Cell><TransactionStatus transaction={transaction} /></Cell>
</Row>