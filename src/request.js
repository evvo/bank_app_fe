import {errors, user} from './stores.js';
import {get} from "svelte/store";

export function clearUser() {
    user.set({
        token: null,
        user_id: null
    })
}

async function makeRequest(path, method = 'GET', data, auth = true) {
    const headers = {'content-type': 'application/json'}
    if (auth) {
        headers.Token = get(user).token
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
                clearUser()
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
        user.set(result.data)
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