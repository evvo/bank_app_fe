<script>
    import TransactionStatus from "./TransactionStatus.svelte";
    import {updateTransactionStatus} from '../request'
    import TransactionDate from "./TransactionDate.svelte";
    import StatusSelector from "./StatusSelector.svelte";

    export let transaction
    const singleTransactionDateFormat = 'D MMM YYYY'

    async function update(e) {
        await updateTransactionStatus(transaction, e.target.value)
    }
</script>

{transaction.to_user.name}
<TransactionStatus transaction={transaction} />
<TransactionDate transaction={transaction} format={singleTransactionDateFormat} />
<br />
<StatusSelector transaction={transaction} updateFunction={update} />