Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div id="BottomNavMenu" v-cloak>
        <nav class="nav" :style="bottomNavZindex">
            <router-link to="/" class="nav__link" @click.native="$store.commit('addActiveNavBtn','btn1')" :class="{active: activenavbtn === 'btn1' }">
                <i class="fas fa-home nav__icon"></i>
                <span class="nav__text">{{ $t('Home Page') }}</span>
            </router-link>
            <router-link to="/arama/=" class="nav__link" @click.native="$store.commit('addActiveNavBtn','btn2')" :class="{active: activenavbtn === 'btn2' }">
                <i class="fas fa-search nav__icon"></i>
                <span class="nav__text">{{ $t('Search (BottomNavMenu)') }}</span>
            </router-link>
            <router-link to="/sepet" class="nav__link" @click.native="$store.commit('addActiveNavBtn','btn3')" :class="{active: activenavbtn === 'btn3' }">
                <i class="fas fa-shopping-bag nav__icon"></i>
                <span class="nav__text">{{ $t('My Cart') }}
                    <div class="absolute"><span class="badge badge-danger">{{ sepettekiUrunSayisi }}</span></div>
                </span>
            </router-link>
            <router-link to="/" class="nav__link" @click.native="$store.commit('addActiveNavBtn','btn4')" :class="{active: activenavbtn === 'btn4' }">
                <i class="fas fa-money-check nav__icon"></i>
                <span class="nav__text">Odeme</span>
            </router-link>
            <router-link v-if="showLoginButtons" to="/girisyap" class="nav__link" @click.native="$store.commit('addActiveNavBtn','btn5')" :class="{active: activenavbtn === 'btn5' }">
                <i class="fas fa-sign-in-alt nav__icon"></i>
                <span class="nav__text">{{ $t('Login') }}</span>
            </router-link>
            <router-link v-if="showProfil" to="/profilim" class="nav__link" @click.native="$store.commit('addActiveNavBtn','btn6')" :class="{active: activenavbtn === 'btn6' }">
                <i class="fas fa-user nav__icon"></i>
                <span class="nav__text">{{ $t('My Profile') }}</span>
            </router-link>
            <router-view />
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            geciciSepet : '',
            sepettekiUrunSayisi : '',
            showLoginButtons : true, // kaydi olmayan kullaniciya gorunecek giris yap ve kayit ol butonlarinin show/hide-i icin
            showProfil : false, // kaydi olan kullanicinin gorecegi profilim butonunun show/hide-i icin
        }
    },
    mounted () {
        // sepetButton-a her click yapildiginda tetiklenir, yani icerigin degistigini anlayabiliyoruz
        window.addEventListener('click', this.urunSayisi)
    },
    beforeUnmount () {
        window.removeEventListener('click', this.urunSayisi)
    },
    computed : {
        ...mapGetters(["bottomNavZindex"]),
        activenavbtn:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.activeNavBtn;
            }
        }
    },
    methods : {
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
            var baseUrl = document.baseURI
            if(document.documentURI.includes("arama")){ // url-e aranacak kelime de eklenecegi icin kontrol includes ile yapilir
                this.$store.commit('addActiveNavBtn','btn2')
            }else if(baseUrl.includes("/sepet")){
                this.$store.commit('addActiveNavBtn','btn3')
            }else if(baseUrl.includes("/girisyap")){
                this.$store.commit('addActiveNavBtn','btn5')
            }else if(baseUrl.includes("/profilim")){
                this.$store.commit('addActiveNavBtn','btn6')
            }
        }
    },
    created(){
        this.urunSayisi()
        // var getCookie = document.cookie
        var getUserInLocal = localStorage.getItem("user")
        if(getUserInLocal != null){
            this.showLoginButtons = false // varsa login button-lari hide olur
            this.showProfil = true // profilim button-u show olur
        }
        this.activeButtonKontrol() // her sayfa yuklendiginda aktiflik kontrolu fonk-u calisir 
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (min-width : 990px){
        #BottomNavMenu{
            display : none;
        }
    }
    .nav{
        z-index: 1042;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 55px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.9);
        background-color: white;
        display: flex;
        overflow: hidden;
    }
    .nav__link{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        min-width: 50px;
        overflow: hidden;
        white-space: nowrap;
        font-family: sans-serif;
        font-size: 13px;
        color: #9c9c9c;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        transition: background-color 0.1 ease-in-out;
        margin-left: -10px; /* sepetim butonunu biraz ortalamak icin yazildi (silinebilir duruma gore) */
    }
    /* .nav__link:hover{
        background-color: #eeeeee;
    } */
    .active{
        /* background-color: #eeeeee; */
        color: #206736;
    }
    .nav__icon{
        font-size: 18px;
        margin-bottom: 5px;
    }
    .absolute{
        position: absolute;
    }
    .badge{
        position: relative;
        bottom: 49px;
        left: 27px;
        font-size: 11px;
    }
</style>