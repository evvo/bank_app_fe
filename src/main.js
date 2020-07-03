import App from './App.svelte';

// var app = new App({
// 	target: document.body
// });

const app = new App({
	target: document.getElementById("app"),
	hydrate: false
});

export default app;