Bu sayfadaki puf noktalar:
1 - Bu sayfa, Gruplar sayfasindaki herhangi bir gruba tiklandiktan sonra gelecek olan sayfa
2 - Bu sayfada tiklanan grubun adi ve o gruba ait altgrup bilgileri listelenmektedir.
3 - child-i AltgrupUrunler
<template>
    <div>
        <Navbar />
        <BottomNavMenu />
        <div class="row m-4">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12">
                <div v-if="showYukleniyor" class="row">
                    <div class="col-lg-12 col-sm-12 col-12 col-md-12 mb-3">
                        <div class="card skeleton-card"></div>
                    </div>
                    <div v-for="sc in sceleton" :key="sc.id" class="col-lg-3 col-sm-4 col-6 col-md-3 mb-3">
                        <div class="each skeleton-card1"></div>
                    </div>
                </div>
                <!-- Grup Baslik START -->
                
                <div v-if="!showYukleniyor" id="resp-baslik" class="z-depth-1">
                    <div class="d-flex justify-content-center">
                        <span class="pl-5 d-flex align-items-center baslik" :style="altgruplarBaslik">{{ $route.params.g_ad }}</span>
                    </div>
                </div>
                <!-- Grup Baslik END -->
                <div v-for="liste in gruplar" :key="liste.id" class="row mt-3">
                    <div v-for="altgrup in liste" :key="altgrup.id" class="col-lg-2 col-md-3 col-sm-4 col-6">
                        <router-link :to="{ name : 'UrunlerPage', params : {id:altgrup.id, g_id:altgrup.grup, g_ad:$route.params.g_ad, altg_ad:altgrup.ad} }">
                            <div class="each mb-2" :style="altgrupGruplar">
                                <div class="title d-flex justify-content-center align-items-center baslik-altbaslik" :class="altgruplarAd">{{ altgrup.ad }}</div>
                            </div>
                        </router-link>
                        <router-view />
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>

        <AltgrupUrunler />
        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import AltgrupUrunler from "@/components/AltgrupUrunler"
import BottomNavMenu from "@/components/BottomNavMenu"
import Footer from "@/components/Footer"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    metaInfo() {
        return{
            title: this.$route.params.g_ad,
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    data(){
        return{
            gruplar : [],
            errors : [],
            showYukleniyor : true,
            sceleton : 2,
            // cookie bilgileri START
            ushp : "",
            // cookie bilgileri END
        }
    },
    components : {
        Navbar,
        AltgrupUrunler,
        BottomNavMenu,
        Footer
    },
    methods : {
        getUid_Udep(){
            this.ushp = this.decryptCookie("ushp")
        },
        async fetchGruplar(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_altgruplar');
                formData.append('grup', this.$route.params.id);
                formData.append('deposahip', this.ushp);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.gruplar = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
            if(this.gruplar.status != ""){
                this.showYukleniyor = false
            }
            // console.log("sorgu yapildi")
        },
    },
    computed : {
        ...mapGetters(["altgrupGruplar","altgruplarAd","altgruplarBaslik","serverRequest"])
    },
    created(){
        this.fetchGruplar()
        // document.title = this.$route.params.g_ad // sayfa render oldugunda title-a grup adi yazilir
    }
}
</script>

<style scoped>
    @media (max-width : 500px){
        .each{
            min-height: 60px !important;
            max-height: 60px !important;
            margin: 0 -10px 10px -10px !important;
        }
        .baslik{
            padding-left: 20px !important;
            font-size: 20px !important;
        }
        #resp-baslik{
            margin: 0 -10px 0 -10px !important;
        }
        .skeleton-card{
            margin: 0 -10px 0 -10px !important;
            background-size: 130px 17px, 190px 20px, 100% 100% !important;
            background-position: 20px 20px, 15px 200px, 0 0 !important;
        }
        .skeleton-card1{
            margin: 0 -10px 0 -10px !important;
            background-size: 60px 10px, 190px 20px, 100% 100% !important;
            background-position: 50% 20px, 15px 200px, 0 0 !important;
        }
    }
    /* iPhone 6/7/8 */
    @media (max-width : 380px){
        .baslik-altbaslik{
            font-size: 11px !important;
        }
    }
    /* Moto G4, Galaxy S5 */
    @media (max-width : 360px){
        .baslik-altbaslik{
            font-size: 11px !important;
        }
    }
    /* iPhone 5/SE */
    @media (max-width : 320px){
        .baslik-altbaslik{
            font-size: 10px !important;
            word-break: normal;
        }
    }
    .title{
        min-height: 20px;
        max-height: 20px;
        font-family: 'Yanone Kaffeesatz', sans-serif;
        font-size: 12px;
        font-weight: 800;
        color: #505050;
    }
    .each{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        padding: 15px;
        transition: all 0.3s ease;
    }
    #resp-baslik{
        border-radius: 10px;
    }
    li {
        display: inline;
        float: left;
    }
    .baslik{
        font-family: 'Yanone Kaffeesatz', sans-serif;
        font-weight: 800;
        font-size: 24px;
        font-weight: bold;
        border-radius: 10px;
        /* background-image: linear-gradient(rgba(255, 255, 255, 0.05),rgba(255, 255, 255, 0.05)), url("~@/assets/svg/Large-Triangles.svg"); */
        /* background-size: 250px; */
        background-color: #4285F4;
        color: white;
        width: 100%;
        height: 70px;
        padding: 10px 0px 10px 0px;
        transition: all 0.8s ease;
    }
    .baslik:hover{
        background-size: 270px;
    }
    .baslik-dark{
        background-color: #212121;
    }
    /* skeleton loader START */
    .skeleton-card{
        height: 60px;
        border-radius: 10px;
        background-image: linear-gradient(#ccc, #ccc),
            linear-gradient(white, white);
        background-size: 200px 20px, 190px 20px, 100% 100%;
        background-position: 35px 20px, 15px 200px, 0 0;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    .skeleton-card::before { /* div uzerindeki tarama efekti icin */
        content: '';
        display: block;
        position: absolute;
        left: -30px;
        top: 0;
        height: 100%;
        width: 50px;
        background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
        animation: load 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }
    @keyframes load {
        from {
            left: -10px;
        }
        to   {
            left: 100%;
        }
    }
    .skeleton-card1{
        padding: 25px;
        background-image: linear-gradient(#ccc, #ccc),
            linear-gradient(white, white);
        background-size: 80px 13px, 190px 20px, 100% 100%;
        background-position: 50% 15px, 15px 200px, 0 0;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    .skeleton-card1::before { /* div uzerindeki tarama efekti icin */
        content: '';
        display: block;
        position: absolute;
        left: -30px;
        top: 0;
        height: 100%;
        width: 50px;
        background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
        animation: load1 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }
    @keyframes load1 {
        from {
            left: -10px;
        }
        to   {
            left: 100%;
        }
    }
    /* skeleton loader END */
</style>