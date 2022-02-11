Bu sayfadaki puf noktalar:
1 - Navbar > NavbarTwo > AdresSecim seklinde component yapisi
<template>
    <div id="adresSecimNavbar">
        <div v-if="showGiristenSonraAdres">
            <AdresSecimGiristenSonra @adresdeger="adresdegerMi" />
        </div>
        <!-- Adresim :  -->
        <button @click="adresKontrolleri()" v-if="adresButtonKontrol" id="buttonID" data-toggle="modal" :data-target="dataTarget" type="button" class="btn adres-ekle z-depth-0 overflow-ellipsis">
            <img class="adres-svg" src="@/assets/svg/Address.svg" alt=""> {{adresDeger}}
        </button>
        
        <div v-if="showAdres_Arka">
            <div class="arkafon" @click="modalKapat()">
                <transition name="slide-fade">
                    <div v-if="showAdres_Modal" class="ownModal" @click="modalAcikTut">
                        <div class="baslik">
                            <h4 class="d-flex justify-content-center">
                                Adresinizi Seçiniz
                                <button @click="modalKapat()" type="button" class="close" aria-label="Close"><span aria-hidden="true" class="black-text">&times;</span></button>
                            </h4>
                        </div>
                        <div class="icerik">
                            <ProfilAdreslerim @adressecimkapat="adressecimkapatMi" @adresad="adresadMi" />
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <div class="modal fade top" id="AdresEklemekIcinGirisYap" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-full-height modal-top" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title w-100 d-flex justify-content-center" id="myModalLabel">Uyarı</h4>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex justify-content-center">Adres ekleyebilmek için giriş yapmanız lazım.</div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button @click="$router.push({name: 'KaydolPage'})" type="button" class="btn btn-secondary" data-dismiss="modal">Kaydol</button>
                        <button @click="$router.push({name: 'GirisYapPage'})" type="button" class="btn btn-primary" data-dismiss="modal">Gİrİş yap</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfilAdreslerim from "@/components/ProfilAdreslerim"
import AdresSecimGiristenSonra from "@/components/AdresSecimGiristenSonra"

export default {
    data(){
        return{
            adresDeger : "",
            dataTarget : "",
            showGiristenSonraAdres : true,
            showAdres_Arka : false, // arkafon icin
            showAdres_Modal : false, // modal icin
            adresButtonKontrol : true,
        }
    },
    components : {
        ProfilAdreslerim,
        AdresSecimGiristenSonra,
    },
    mounted () { // adresler alanindan ekle-ye basildigi anda degisiklik algilansin diye
        addEventListener('click', this.getAdres)
    },
    beforeUnmount () {
        removeEventListener('click', this.getAdres)
    },
    methods : {
        modalKapat(){
            this.showAdres_Arka = false
            setTimeout(() => this.showAdres_Modal = false, 10)
        },
        modalAcikTut(e){ // modal dışı degil de icine tiklandiginda modali acik tutmasi icin
            // stopPropagation() mevcut olayin yayilmasini engeller. Ancak, herhangi bir varsayılan davranışın oluşmasını engellemez;
            // örneğin, bağlantılara yapılan tıklamalar hala işlenir. Bu davranışları durdurmak istiyorsanız, preventDefault() yöntemi kullanilabilir
            e.stopPropagation()
            return false
        },
        butonKontrolu(){ // adres secim butonunun SepetOdemePage ve ProfilAdreslerim sayfalarinda gizlemek icin
            var baseUrl = document.baseURI
            if(baseUrl.includes("/sepet/odeme") || baseUrl.includes("/profil/adreslerim")){
                this.adresButtonKontrol = false
            }
        },
        adressecimkapatMi(params){ // ProfilAdreslerim.vue-dan yani child-dan gelen data burada yazilir
            this.showAdres_Arka = params
            this.showAdres_Modal = params
        },
        adresadMi(params){ // ProfilAdreslerim.vue-dan yani child-dan gelen data burada yazilir
            this.adresDeger = params
        },
        adresdegerMi(params){ // AdresSecimGiristenSonra.vue-dan yani child-dan gelen data burada yazilir
            this.adresDeger = params
        },
        adresKontrolleri(){
            this.showAdres_Arka = true
            setTimeout(() => this.showAdres_Modal = true, 10)
            var getUserInLocal = localStorage.getItem("user")
            if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
                this.getAdres()
                this.dataTarget = ""
            }else{ // kullanici kaydi yoksa
                this.dataTarget = "#AdresEklemekIcinGirisYap"
                this.showGiristenSonraAdres = false
                this.showAdres_Arka = false
                setTimeout(() => this.showAdres_Modal = false, 10)
            }
            this.$store.commit('addBottomNavZindex','z-index:999') // bottom nav menu zindexi de guncellenir. burayi silme
            this.$store.commit('addSidebarMenuZindex','z-index:998') // profil sidebar menu zindexi de guncellenir
        },
        getAdres(){ // ProfilAdreslerim sayfasinda localstorage-e kayd edilen adres icerigini almak icin
            var getUserInLocal = localStorage.getItem("user")
            if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
                if(localStorage.getItem("adres") == null){ // adres yoksa
                    this.adresDeger = "Adres Ekle"
                    this.showGiristenSonraAdres = true
                }else{ // adres varsa
                    var adres_ad = JSON.parse(localStorage.getItem("adres"))
                    this.adresDeger = adres_ad.ad + " - " + adres_ad.adrestext
                    this.showGiristenSonraAdres = false
                }
            }else{ // kullanici kaydi yoksa
                this.adresDeger = "Adres ekle" // navbar altindaki button yazisindaki gorunecek deger
                this.showGiristenSonraAdres = false // adres secim gorunmez
            }
        },
        defaultCookieDepoAtamasi(){
            var getUserInLocal = localStorage.getItem("user")
            if(getUserInLocal == null){ // kullanici kaydi yoksa. kontrol localdeki 'user'-e gore yapiliyor
                // kayit olmadigi taktirde urunler listelenebilsin diye default olarak depo=1, deposahip=1 olarak cookie-ye yazilir
                this.encryptCookie(['udep','ushp'],['1','1'],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
            }
        },
    },
    created(){
        this.getAdres()
        this.butonKontrolu()
        this.defaultCookieDepoAtamasi()
    }
}
</script>

<style scoped>
    /* Urun Eklendi/Silindi Mesaji START */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(10px);
        opacity: 0;
    }
    /* Urun Eklendi/Silindi Mesaji END */
    @media (max-width : 690px){
        #buttonID{ max-width: 170px !important; }
    }
    @media (max-width : 500px){
        #buttonID{ max-width: 100px !important; }
        #adresSecimNavbar{ top: 59px !important; }
    }
    #adresSecimNavbar{
        position: absolute;
        top: 73px;
    }
    #buttonID{
        border-radius: 8px;
        padding: 6px 6px;
        font-size: 12px;
        text-transform: capitalize;
        max-width: 220px;
        white-space: nowrap;
        overflow: hidden;
    }
    .overflow-ellipsis {
        text-overflow: ellipsis;
    }
    .modal{
        color: black;
    }
    .modal-body{
        font-size: 16px;
    }
    .modal-footer button{
        padding: 5px 7px;
        font-size: 13px;
    }
    .adres-ekle{
        background: white;
        font-weight: 800;
        color: #206736;
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
        overflow-x: auto;
    }
    .ownModal{
        z-index: 100;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        background: white;
        max-width: 500px;
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
    }
    .baslik span{
        padding-top: 10px;
        font-weight: 400;
    }
    .icerik{
        display: flex;
        justify-content: center;
    }
    .footer{
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .footer button{
        padding: 5px 7px;
        font-size: 13px;
    }
    .close{
        position: absolute;
        right: 30px;
    }
    .adres-svg{
        width: 14px;
        margin-left: 3px;
        margin-right: 3px;
    }
</style>