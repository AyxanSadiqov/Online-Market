Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div>
        <Navbar />
        <Sepet />
        <BottomNavMenu />
        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import Sepet from "@/components/Sepet"
import BottomNavMenu from "@/components/BottomNavMenu"
import Footer from "@/components/Footer"

export default {
    metaInfo() {
        return{
            title: 'Sepet',
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    components : {
        Navbar,
        Sepet,
        BottomNavMenu,
        Footer
    }
}
</script>

<style scoped>

</style>