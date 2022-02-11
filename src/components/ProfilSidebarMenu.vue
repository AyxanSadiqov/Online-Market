Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div class="sticky" :style="sidebarMenuZindex" v-cloak>
        <div class="wrapper">
            <nav id="sidebar">
                <!-- <div id="dismiss">
                    <i class="fas fa-arrow-left"></i>
                </div> -->
                <div class="sidebar-header">
                    <h3>{{user.adsoyad}}</h3> <h6>{{user.mail}}</h6>
                </div>
                <ul class="list-unstyled components">
                    <!-- <p>Dummy Heading</p> -->
                    <li @click="$store.commit('addActiveBtn','btn1')" :class="{active: activebtn === 'btn1' }">
                        <router-link to="/profilim"><i class="fas fa-user"></i> <span>Kullanıcı Bilgilerim</span></router-link>
                    </li>
                    <li @click="$store.commit('addActiveBtn','btn2')" :class="{active: activebtn === 'btn2' }">
                        <router-link to="/profil/adreslerim"><i class="fas fa-address-card"></i> <span>Adreslerim</span></router-link>
                    </li>
                    <li @click="$store.commit('addActiveBtn','btn3')" :class="{active: activebtn === 'btn3' }">
                        <router-link to="/sepet"><i class="fas fa-shopping-cart"></i> <span>Alışveriş Sepetim</span><span class="badge badge-danger">{{ sepettekiUrunSayisi }}</span></router-link>
                    </li>
                    <li @click="$store.commit('addActiveBtn','btn4')" :class="{active: activebtn === 'btn4' }">
                        <router-link to="/profil/faturalarim"><i class="fas fa-file-invoice ml-1"></i> <span>Faturalarım</span></router-link>
                    </li>
                    <li @click="$store.commit('addActiveBtn','btn5')" :class="{active: activebtn === 'btn5' }">
                        <router-link to="/profil/siparislerim"><i class="fas fa-credit-card"></i> <span>Siparişlerim</span></router-link>
                    </li>
                    <li @click="sifremiOnaylaIzin()" :class="{active: activebtn === 'btn6' }">
                        <a><i class="fas fa-key"></i> <span>Şifremi Değiştir</span></a>
                    </li>
                    <li @click="$store.commit('addActiveBtn','btn7')" :class="{active: activebtn === 'btn7' }">
                        <router-link to="/profil/ayarlarim"><i class="fas fa-cog"></i> <span>Ayarlarım</span></router-link>
                    </li>
                    <li @click="$store.commit('addActiveBtn','btn8')" :class="{active: activebtn === 'btn8' }">
                        <router-link to="/profil/geri-bildirim"><i class="fas fa-comment-dots"></i> <span>Geri Bildirim</span></router-link>
                    </li>
                    <li @click="cikisyapModaliGoster()" data-toggle="modal" :data-target="dataTarget">
                        <a><i class="fas fa-sign-out-alt"></i> <span>Güvenli Çıkış</span></a>
                    </li>
                    <!-- Cikis yapmak modal Top -->
                    <div class="modal fade top" id="frameModalTop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-frame modal-top" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="row d-flex justify-content-center align-items-start">
                                        <p class="pt-3 pr-2 text-dark">
                                            Hesabınızdan çıkış yapmak istediğinize emin misiniz?
                                        </p>
                                        <button type="button" class="btn btn-light" data-dismiss="modal">Hayır</button>
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="cikisyap()">Evet</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Cikis yapmak modal Top -->
                    <!-- <li class="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                        <ul class="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <a href="#">Home 1</a>
                            </li>
                            <li>
                                <a href="#">Home 2</a>
                            </li>
                            <li>
                                <a href="#">Home 3</a>
                            </li>
                        </ul>
                    </li> -->
                    <Sleepy />
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import Sleepy from "@/components/Sleepy"
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            user : [],
            geciciSepet : '',
            sepettekiUrunSayisi : '',
            dataTarget : "",
            baseUrl : "",
        }
    },
    components : {
        Sleepy
    },
    computed : {
        // profil adreslerimden adres ekleye basildiginda sidebarin zindex-ini dusuruyor. mapdeki arama sonuclari modalda ustte gorunsun diye
        ...mapGetters(["sidebarMenuZindex"]),
        activebtn:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.activeBtn;
            }
        }
    },
    methods : {
        getLocalUserBilgisi(){
            this.user = JSON.parse(localStorage.getItem("user"))
        },
        cikisyapModaliGoster(){
            this.dataTarget = "#frameModalTop" // modal gorunmesi icin gereken data-target degeri eklendi
            // profil adreslerimden adres ekleye basildiktan sonra sidebarin inen zindex-i burada eski haline getiriliyor.
            this.$store.commit('addSidebarMenuZindex','z-index:1041')
            this.$store.commit('addBottomNavZindex','z-index:1042') // bottom nav menu zindexi de guncellenir. burayi silme
        },
        cikisyap(){
            // uid cookie-den temizlenir, utel cookie-den temizlenir
            this.encryptCookie(['uid','utel'],['',''],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
            localStorage.removeItem("user")
            localStorage.removeItem("sepet-fatura")
            localStorage.removeItem("adres")
            localStorage.removeItem("sepet")
            localStorage.removeItem("koord")
            localStorage.removeItem("kooord")
            localStorage.setItem("cks","10bHt10b3CUb") // kullanicinin cikis yaptigini anlamak icin. kontrol gruplar.vue-da yapiliyor.
            this.$router.push({name: 'Home'})
        },
        sifremiOnaylaIzin(){ // onay kodu dogru girildikten sonra sifremi onayla sayfasinin goruntulenebilmesi icin
            this.$store.commit('addSifremiOnaylaIzin',{izinVarMi:"evet"})
            this.$store.commit('addActiveBtn','btn6')
            // sifre degistire birden fazla basildiginda current route hatasinin handle-i icin
            this.baseUrl = document.baseURI
            if(this.baseUrl.includes("/profil/sifremi-degistir")){
                return
            }else{
                this.$router.push({path: "/profil/sifremi-degistir"})
            }
        },
        urunSayisi(){
            if(localStorage.getItem("sepet") == null){
                localStorage.setItem("sepet", "[]")
            }
            var localSpt = (JSON.parse(localStorage.getItem("sepet"))) // localstorage "sepet" icindeki veriler parse edilerek localspt-e yazilir
            this.geciciSepet = localSpt // localSpt-deki veriler geciciSepet-e yazilir ve artik tum islemleri localstorage uzerinden degil de geciciSepet uzerinden yapilacak hale getirilir burada
            this.sepettekiUrunSayisi = this.geciciSepet.length // sepetteki urun sayisini almak icin
        },
        // sayfa yuklendikten sonra url bilgisine gore menudeki alanin aktifligi icin
        activeButtonKontrol(){
            this.baseUrl = document.baseURI
            if(this.baseUrl.includes("/profilim")){
                this.$store.commit('addActiveBtn','btn1')
            }else if(this.baseUrl.includes("/profil/adreslerim")){
                this.$store.commit('addActiveBtn','btn2')
            }else if(this.baseUrl.includes("/profil/faturalarim")){
                this.$store.commit('addActiveBtn','btn4')
            }else if(this.baseUrl.includes("/profil/siparislerim")){
                this.$store.commit('addActiveBtn','btn5')
            }else if(this.baseUrl.includes("/profil/sifremi-degistir")){
                this.$store.commit('addActiveBtn','btn6')
            }else if(this.baseUrl.includes("/profil/ayarlarim")){
                this.$store.commit('addActiveBtn','btn7')
            }else if(this.baseUrl.includes("/profil/geri-bildirim")){
                this.$store.commit('addActiveBtn','btn8')
            }
        }
    },
    created(){
        this.getLocalUserBilgisi()
        this.urunSayisi()
        this.activeButtonKontrol() // her sayfa yuklendiginda aktiflik kontrolu fonk-u calisir 
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 500px){
        #sidebar{
            min-width: 60px !important;
            max-width: 60px !important;
        }
        .sidebar-header h3{
            display: none;
        }
        .sidebar-header h6{
            display: none;
        }
        li span:nth-child(2){
            display: none;
        }
        li i{
            padding-left: 9px;
        }
        li span:nth-child(3){
            display: block !important;
            font-size: 9px;
            position: absolute;
            right: 10px;
            top: 150px;
        }
    }
    /* cikis yaparken acilan modal sticky icindeki z-index degerinin kucuk olmasindan dolayi en arkada gorunuyordu. */
    /* en ustte yani normal gorunmesi icin z-index degerinin minimum 1041 olmasi lazim. degisiklikler ona gore yapildi */
    /* buranin z-index degisirse bottom nav menu de etkilenecek ona gore */
    .sticky {
        z-index: 1041;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 20px;
    }
    /* side menu START */
    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }
    a, a:hover, a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }
    #sidebar {
        background: #206736;
        color: #fff;
        transition: all 0.3s;
        min-width: 210px;
        max-width: 210px;
        min-height: 100vh;
        position: absolute;
        top: -24px;
        left: -40px;
    }
    #sidebar .sidebar-header {
        padding: 20px;
        background: #206736;
    }
    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }
    #sidebar ul p {
        color: #fff;
        padding: 10px;
    }
    #sidebar ul li a {
        padding: 10px 10px 10px 15px;
        font-size: 15px;
        display: block;
    }
    #sidebar ul li a:hover {
        color: #206736;
        background: #fff;
    }
    #sidebar ul li.active > a, a[aria-expanded="true"] {
        color: #206736;
        background: white;
    }
    .wrapper {
        display: flex;
        align-items: stretch;
    }
    #sidebar.active {
        margin-left: -250px;
    }
    a[data-toggle="collapse"] {
        position: relative;
    }
    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }
    /* side menu END */
    li i{
        padding-right: 5px;
    }
    h6{
        font-size: 14px;
    }
    li span:nth-child(3){
        display: none;
    }
    .text-dark{
        font-size: 16px;
    }
</style>