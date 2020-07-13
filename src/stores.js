import { writable } from 'svelte/store'

let augmentedWritable = function (name, defaultValue) {
    const storeObject = writable(JSON.parse(localStorage.getItem(name)) || defaultValue)
    storeObject.subscribe(val => localStorage.setItem(name, JSON.stringify(val)))
    return storeObject
}

export const loading = writable({
    global: false
})
export const startLoading = (loadingContext = 'global') => loading.update((loading) => {
    return {...loading, [loadingContext] : true}
})
export const stopLoading = (loadingContext = 'global') => loading.update((loading) => {
    let obj = {...loading}
    delete obj[loadingContext]

    return obj
})

export const user = augmentedWritable('token', {
    token : null,
    user_id : null
})

export const errors = writable([])

export const mainFilters = writable({
    sort: null,
    direction: '',
    search: ''
})