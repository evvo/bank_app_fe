<script>
    import {statuses} from '../constants'

    export let transaction
    let transactionStatus = "UNKNOWN"

    function getTransactionStatus() {
        const result = statuses.filter((st) => parseInt(transaction.status) === st.value)

        if (result && result[0]) {
            transactionStatus = result[0].text
            return
        }

        transactionStatus = "UNKNOWN"
    }

    $: transaction, getTransactionStatus()
</script>

Status: {transactionStatus}