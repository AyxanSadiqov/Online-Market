Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div>
        <Navbar />
        <Urunler />
        <BottomNavMenu />
        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import Urunler from "@/components/Urunler"
import BottomNavMenu from "@/components/BottomNavMenu"
import Footer from "@/components/Footer"

export default {
    metaInfo() {
        return{
            title: this.$route.params.altg_ad,
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    components : {
        Navbar,
        Urunler,
        BottomNavMenu,
        Footer
    },
}
</script>

<style scoped>
    
</style>