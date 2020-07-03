<script>
    import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
    import TransactionRow from "./TransactionRow.svelte";

    export let transactions
</script>

{#if transactions.length > 0}
    <DataTable>
        <Head>
            <Row>
            </Row>
        </Head>
        <Body>
        {#each transactions as transaction}
            <TransactionRow transaction={transaction} />
        {/each}
        </Body>
    </DataTable>
{:else}
    No transactions found
{/if}