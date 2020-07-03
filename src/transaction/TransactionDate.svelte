<script>
    import moment from 'moment';
    export let transaction
    export let format
    let formattedDate

    function getFormattedDate() {
        const date = moment(transaction.date)
        formattedDate = date.format(format)
    }

    $: transaction, getFormattedDate()
</script>


{formattedDate}
