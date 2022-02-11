<template>
    <div id="seconNavbarID" class="d-flex justify-content-between align-items-center noselect" :style="navbar2Color">
        <div><AdresSecim /></div>
        <div><EnYakinRandevuTarihi /></div>
        <div id="sepetNavID" v-if="showSepetNavbar"><SepetNavbar /></div>
    </div>
</template>

<script>
import EnYakinRandevuTarihi from "@/components/EnYakinRandevuTarihi"
import AdresSecim from "@/components/AdresSecim"
import SepetNavbar from "@/components/SepetNavbar"
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            showSepetNavbar : true,
        }
    },
    components : {
        EnYakinRandevuTarihi,
        AdresSecim,
        SepetNavbar
    },
    computed : {
        ...mapGetters(["navbar2Color"]),
    },
    methods : {
        butonKontrolu(){ // SepetOdemePage, her adresteki 'sil' butonunun yerine 'ekle' butonunun show/hide-i icin kontrol
            var baseUrl = document.baseURI
            if(baseUrl.includes("/sepet/odeme") || baseUrl.includes("/sepet")){
                this.showSepetNavbar = false
            }
        },
    },
    created(){
        this.butonKontrolu()
    }
}
</script>

<style scoped>
    @media (max-width : 1200px){
        #seconNavbarID{
            padding-right: 1% !important;
            padding-left: 1% !important;
        }
    }
    @media (max-width : 1000px){
        #sepetNavID{
            display: none;
        }
    }
    #seconNavbarID{
        z-index: 9990;
        border: 1px solid rgb(204, 203, 203, 0.4);
        margin-top: -4px;
        margin-left: -5px;
        color: white;
        font-size: 12px;
        padding: 9px 10px;
        min-height: 50px;
        padding-right: 10.5%;
        padding-left: 10.5%;
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
</style>