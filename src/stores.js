import { writable } from 'svelte/store'

let augmentedWritable = function (name, defaultValue) {
    const storeObject = writable(JSON.parse(localStorage.getItem(name)) || defaultValue)
    storeObject.subscribe(val => localStorage.setItem(name, JSON.stringify(val)))
    return storeObject
}

export const token = augmentedWritable('token', null)
export const loading = writable(true)
export const errors = writable([])
export const mainFilters = writable({
    sort: null,
    direction: '',
    search: ''
})