import {errors, user, startLoading, stopLoading} from './stores.js';
import {get} from "svelte/store";

export function clearUser() {
    user.set({
        token: null,
        user_id: null
    })
}

async function makeRequest({ path, method = 'GET', data, auth = true, loadingContext = 'global'}) {
    const headers = {'content-type': 'application/json'}
    errors.set([])
    if (auth) {
        headers.Token = get(user).token
    }

    startLoading(loadingContext)

    return await fetch(`API_URL${path}`, {
        method: method,
        headers: new Headers(headers),
        body: JSON.stringify(data)
    })
        .then(r => r.json())
        .then(result => {
            stopLoading(loadingContext)
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
            stopLoading(loadingContext)
            errors.set({
                server : ['Server error']
            })

            return exception
        })
}

export async function logIn(data) {
    const result = await makeRequest({path: '/login', method: 'POST', data, auth: false})
    if (result && result.success) {
        user.set(result.data)
    }
}

export async function fetchTransactions(mainFilters) {
    return await makeRequest({ path: `/transactions?${mainFilters}`, loadingContext: 'fetchTransactions' })
}

export async function fetchTransaction(transactionId) {
    return await makeRequest({ path: `/transactions/${transactionId}`, loadingContext: 'global' })
}

export async function createTransaction(data) {
    return await makeRequest({ path: `/transactions/`, method: 'POST', data, loadingContext: 'createTransaction' })
}

export async function updateTransactionStatus(transaction, status) {
    return await makeRequest({
        path: `/transactions/${transaction.id}`,
        method: 'PUT',
        data: {status: parseInt(status)},
        loadingContext: 'updateTransactionStatus'
    })
}

export async function fetchUsersByName(name) {
    const result = await makeRequest({path: `/users/?name=${name}`, loadingContext:'autocomplete'})

    if (result && result.success) {
        return result.data
    }

    return []
}