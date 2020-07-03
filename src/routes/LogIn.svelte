<script>
    import {logIn} from '../request'
    import Button from '@smui/button';
    import Textfield from '@smui/textfield'

    let logInForm = {
        username: '',
        password: ''
    }
</script>

<Textfield bind:value={logInForm.username} label="Username"/>
<Textfield bind:value={logInForm.password} type="password" label="Password"/>
<Button on:click={() => logIn(logInForm) }>Log In</Button>