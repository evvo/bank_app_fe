<script>
    import TransactionStatus from "./TransactionStatus.svelte";
    import {updateTransactionStatus} from '../request'
    import TransactionDate from "./TransactionDate.svelte";
    import StatusSelector from "./StatusSelector.svelte";
    import {loading} from '../stores'

    export let transaction

    async function update(e) {
        // loading.set(true)
        await updateTransactionStatus(transaction, e.target.value)
        // loading.set(false)
    }
</script>

{transaction.to_user.name}
<TransactionStatus transaction={transaction} />
<TransactionDate transaction={transaction} format='D MMM YYYY' />
<br />
<StatusSelector transaction={transaction} updateFunction={update} />