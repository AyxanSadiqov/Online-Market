<template>
    <div>
        <Navbar />
        <BottomNavMenu />
        <div class="row m-4">
            <div class="col-md-2 col-2 col-sm-2 col-lg-2">
                <ProfilSidebarMenu />
            </div>
            <div class="col-md-10 col-10 col-sm-10 col-lg-10">
                <div class="panel-two">
                    <div class="gecmis-siparis-filtre-drop">
                        <select name="select" @change="filtreSec($event)">
                            <option v-for="filtre in filtreler" :key="filtre.id" :value="filtre.id">{{ filtre.ad }}</option>
                        </select>
                    </div>
                </div>
                <ProfilSiparislerim :filtreId="filtreId" />
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import ProfilSidebarMenu from "@/components/ProfilSidebarMenu"
import ProfilSiparislerim from "@/components/ProfilSiparislerim"
import BottomNavMenu from "@/components/BottomNavMenu"

export default {
    data(){
        return{
            filtreler : [
                { id : 0, ad : "Son 1 ay" },
                { id : 1, ad : "Son 3 ay" },
                { id : 2, ad : "Son 6 ay" }
            ],
            filtreId : 0
        }
    },
    methods : {
        filtreSec(event){
            this.filtreId = event.target.value // secilenin id-si
            this.$store.commit('addShowSiparisBekleniyor', false)
        },
    },
    metaInfo() {
        return{
            title: 'Profil',
            titleTemplate: '%s | Siparişlerim'
        }
    },
    components : {
        Navbar,
        ProfilSidebarMenu,
        ProfilSiparislerim,
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
    .gecmis-siparis-filtre-drop{
        position: absolute;
        top: 6px;
        right: 22px;
    }
    select{
        padding: 3px 6px;
        background: white;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
        font-size: 14px;
        outline:none !important;
    }
    option{
        color: #4e4e4e;
        background: white;
    }
    select:focus > option:checked { 
        background: #d4d4d4 !important;
    }
</style>