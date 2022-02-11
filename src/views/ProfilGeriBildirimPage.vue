<template>
    <div>
        <Navbar />
        <BottomNavMenu />
        <div class="row m-4">
            <div class="col-md-2 col-2 col-sm-2 col-lg-2">
                <ProfilSidebarMenu />
            </div>
            <div class="col-md-10 col-10 col-sm-10 col-lg-10">
                <div class="panel-two"></div>
                <GeriBildirim />
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import ProfilSidebarMenu from "@/components/ProfilSidebarMenu"
import GeriBildirim from "@/components/GeriBildirim"
import BottomNavMenu from "@/components/BottomNavMenu"

export default {
    metaInfo() {
        return{
            title: 'Profil',
            titleTemplate: '%s | Geri Bildirim'
        }
    },
    components : {
        Navbar,
        ProfilSidebarMenu,
        GeriBildirim,
        BottomNavMenu
    },
}
</script>

<style scoped>
    @media (max-width : 1200px){
        .col-md-10{
            padding-left: 3%;
        }
    }
    @media (max-width : 1100px){
        .col-md-10{
            padding-left: 7%;
        }
    }
    @media (max-width : 1000px){
        .col-md-10{
            padding-left: 6%;
        }
    }
    @media (max-width : 900px){
        .col-md-10{
            padding-left: 10%;
        }
    }
    @media (max-width : 800px){
        .col-md-10{
            padding-left: 13%;
        }
    }
    @media (max-width : 700px){
        .col-md-10{
            padding-left: 16%;
        }
    }
    @media (max-width : 600px){
        .col-md-10{
            padding-left: 24%;
        }
    }
    @media (max-width : 500px){
        .col-md-10{
            padding-left: 0;
        }
    }
</style>