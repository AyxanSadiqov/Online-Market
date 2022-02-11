Bu sayfadaki puf noktalar:
1 - index.js-te aranan sayfa bulunmadiginda yonlenecek olan sayfa burasi
<template>
    <div>
        <h2>Maalesef böyle bir sayfamız yok :(</h2>
        <router-link style="text-decoration: none" to="/">Ana Sayfa</router-link>
        <span>'ya dönmeyi deneyebilirsin.</span>
    </div>
</template>

<script>
export default {
	metaInfo() {
        return{
            title: 'Günkay Sanal Market',
            titleTemplate: '%s | Üzgünüz :('
        }
    },
}
</script>

<style scoped>
div {
	width: 500px;
	height: 100px;
	position: absolute;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
</style>