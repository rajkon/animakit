<template>
    <div id="app">
        <Anima></Anima>
        <div>hello in App.vue </div>
    </div>
</template>

<script>
    import Animakit from '~/components/Animakit.vue'

    export default {
        components: {
            'Anima': Animakit
        }
    }
</script>