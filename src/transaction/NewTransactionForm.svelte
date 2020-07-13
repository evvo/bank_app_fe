<script>
    import {createTransaction, fetchUsersByName} from "../request";
    import Select from 'svelte-select'
    import Button from '@smui/button';
    import {errors} from "../stores";
    import {onDestroy} from "svelte";
    import Loading from "../Loading.svelte";

    export let callbackAfterSuccess = null
    let successMessage
    let successMessageTimeout

    const optionIdentifier = 'id';
    const getOptionLabel = (option) => option.name;
    const getSelectionLabel = (option) => option.name;
    let transactionForm = {
        from_user: undefined,
        to_user: undefined,
        amount: 0.01
    }

    function intToFloat(num, decPlaces) {
        return num.toFixed(decPlaces);
    }

    function resetForm() {
        transactionForm = {
            from_user: undefined,
            to_user: undefined,
            amount: 0.01
        }
    }

    async function submitTransaction() {
        if (!transactionForm.from_user || !transactionForm.to_user) {
            errors.set({
                user : ['No User selected']
            })

            return
        }

        const result = await createTransaction({
            ...transactionForm,
            from_user: transactionForm.from_user.id,
            to_user: transactionForm.to_user.id,
            amount: intToFloat(transactionForm.amount, 2)
        })

        if (result.success && callbackAfterSuccess) {
            await callbackAfterSuccess()
            successMessage = 'Transaction saved!'
            successMessageTimeout = setTimeout(function () {
                successMessage = null
            }, 2000);

            resetForm()
        }
    }

    onDestroy(() => {
        clearTimeout(successMessageTimeout)
    })
</script>

Make a transfer
{#if successMessage}
    <div>{successMessage}</div>
{/if}

<Loading loadingContext="createTransaction" message="Saving...">
    <Select
            loadOptions={fetchUsersByName}
            {optionIdentifier}
            {getSelectionLabel}
            {getOptionLabel}
            placeholder="From user"
            bind:selectedValue={transactionForm.from_user}
    />

    <Select
            loadOptions={fetchUsersByName}
            {optionIdentifier}
            {getSelectionLabel}
            {getOptionLabel}
            placeholder="To user"
            bind:selectedValue={transactionForm.to_user}
    />

    <input type=number bind:value={transactionForm.amount} min="0.01" step=".01">

    <Button on:click={() => submitTransaction()}>
        Submit
    </Button>
</Loading>