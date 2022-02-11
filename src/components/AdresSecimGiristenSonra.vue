<template>
    <div v-if="showGiristenSonraAdres">
        <div class="arkafon">
            <div class="ownModal">
                <div class="baslik">
                    <span class="d-flex justify-content-center">Adresinizi Seçiniz</span>
                </div>
                <div class="icerik">
                    <ProfilAdreslerim @adressecimkapat="adressecimkapatMi" @adresad="adresadMi" />
                </div>
                <div class="footer">
                    <span>YA DA</span> <hr>
                </div>
                <button @click="cikisyap()" type="button" class="btn btn-md btn-lg btn-block btn-danger" data-mdb-ripple-color="dark">
                    <i class="fas fa-sign-out-alt"></i> <span>Hesap değİştİr</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import ProfilAdreslerim from "@/components/ProfilAdreslerim"

export default {
    data(){
        return{
            showGiristenSonraAdres : true,
            adresDeger : ""
        }
    },
    components : {
        ProfilAdreslerim
    },
    methods : {
        adressecimkapatMi(params){ // AdresSecim.vue-dan yani parent-dan gelen data burada yazilir
            this.showGiristenSonraAdres = params
        },
        adresadMi(params){ // ProfilAdreslerim.vue-dan yani child-dan gelen data burada yazilir
            this.adresDeger = params
        },
        cikisyap(){
            this.encryptCookie(['uid','utel'],['',''],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
            localStorage.removeItem("user")
            localStorage.removeItem("sepet-fatura")
            localStorage.removeItem("adres")
            this.$router.push({name: 'GirisYapPage'})
        },
    },
    watch: {
        adresDeger(val) {
            // data degistiginde bir seyler yapilir
            if(val) {
                this.$emit("adresdeger", this.adresDeger) // AdresSecim.vue-da adresdeger alanini aninda guncellemek icin
                // console.log("degisti")
            }
        },
    },
    created(){
        this.$store.commit('addBottomNavZindex','z-index:999') // bottom nav menu zindexi de guncellenir. burayi silme
        this.$store.commit('addSidebarMenuZindex','z-index:998') // profil sidebar menu zindexi de guncellenir
    }
}
</script>

<style scoped>
    @media (max-width : 990px){
        .footer{
            margin-top: -40px;
        }
    }
    button{
        outline:none !important;
    }
    .arkafon{
        z-index: 1000;
        color: black;
        position: fixed;
        top: 0;
        left: 0;
        margin-left: calc(50% - 50vw);
        width: 100vw;
        height: 100%;
        background: rgba(43, 43, 43, 0.8);
        display: flex;
        justify-content: center;
        overflow-x: scroll;
    }
    .ownModal{
        z-index: 100;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        background: white;
        max-width: 700px;
        min-width: 250px;
        position: absolute;
        top: 20px;
        padding: 30px;
    }
    .baslik{
        padding-bottom: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: white;
        font-size: 16px;
    }
    .baslik span{
        margin-bottom: -23px;
        padding-top: 10px;
        font-weight: 400;
    }
    .icerik{
        display: flex;
        justify-content: center;
    }
    .btn{
        border-radius: 30px;
    }
    .footer{
        display: flex;
        justify-content: center;
    }
    .footer span{
        position: absolute;
        bottom: 77px;
        padding: 0 5px;
        color: #7e7e7e;;
        background: white;
    }
    .footer hr{
        width: 100%;
    }
    hr{
        background: #e0e0e0;
    }
</style>