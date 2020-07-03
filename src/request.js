import {errors, token} from './stores.js';
import {get} from "svelte/store";

async function makeRequest(path, method = 'GET', data, auth = true) {
    const headers = {'content-type': 'application/json'}
    if (auth) {
        headers.Token = get(token)
    }

    return await fetch(`API_URL${path}`, {
        method: method,
        headers: new Headers(headers),
        body: JSON.stringify(data)
    })
        .then(r => r.json())
        .then(result => {
            if (result.success) {
                errors.set([])
                return result
            }

            if (result.errors.auth) {
                token.set(null)
            }

            errors.set(result.errors)
            return result
        })
        .catch((exception) => {
            errors.set({
                server : ['Server error']
            })

            return exception
        })
}

export async function logIn(logInForm) {
    const result = await makeRequest('/login', 'POST', logInForm, false)
    if (result && result.success) {
        token.set(result.data.token)
    }
}

export async function fetchTransactions(mainFilters) {
    return await makeRequest(`/transactions?${mainFilters}`)
}

export async function fetchTransaction(transactionId) {
    return await makeRequest(`/transactions/${transactionId}`)
}

export async function createTransaction(transaction) {
    return await makeRequest(`/transactions/`, 'POST', transaction)
}

export async function updateTransactionStatus(transaction, status) {
    return await makeRequest(
        `/transactions/${transaction.id}`,
        'PUT',
        {status: parseInt(status)}
    )
}

export async function fetchUsersByName(name) {
    const result = await makeRequest(`/users/?name=${name}`)

    if (result && result.success) {
        return result.data
    }
}