Bu sayfadaki puf noktalar:
1 - Mobil uyumluluk icin @media kullanildi
2 - Kullanici kayitli mi degil mi kontrolu(giris yap ve kayit ol butonlari saklanir, profilim butonu gorunur) yapiliyor
<template>
    <div v-cloak>
        <!--Navbar -->
        <nav class="mb-1 navbar navbar-expand-lg navbar-dark lighten-1" :style="navbarColor">
            <router-link class="nav-brand" to="/">
                <span class="navbar-brand"><img src="@/assets/img/logo-footer.png" alt=""></span>
            </router-link>
            
            <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
                aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
                <!-- <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/sepet">
                            <i class="fas fa-cart-arrow-down"></i>{{ $t('Cart') }}
                            <span class="badge badge-danger">{{ sepettekiUrunSayisi }}</span>
                        </router-link>
                    </li>
                </ul> -->
                <ul class="navbar-nav ml-auto nav-flex-icons">
                    <form class="form-inline arama-alan">
                        <div class="my-0">
                            <img class="search-svg" src="@/assets/svg/Search.svg" alt="">
                            <input id="ara" @focus="fetchGecmisArama()" class="mr-sm-2" @input="aramaAlan" v-model="aratilanUrun" onkeypress="return event.keyCode != 13;" type="text" :placeholder="$t('Search')" autocomplete="off" aria-label="Search">
                            <div class="hiddendiv">
                                <div class="gecmis-arama-text">Geçmiş Aramalarım
                                    <transition name="fade"><span v-if="aramaConf">En az 3 harf İçermelİ</span></transition>
                                </div>
                                <div v-if="showAramaYukleniyor"><img class="loading" src="@/assets/svg/loading.gif" alt=""></div>
                                <div v-for="gecmisarama in gecmisArama.response" :key="gecmisarama.id">
                                    <div v-if="gecmisarama.gecmis_aramalar==''">- Henüz bulunmamaktadır.</div>
                                    <div v-for="gecmis in gecmisarama.gecmis_aramalar" :key="gecmis.id">
                                        <div @mousedown="gecmisKelimeyiAra(gecmis)">
                                            {{gecmis.kelime}}
                                            <span class="float-right pr-2"><i class="fas fa-external-link-alt"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div v-if="aramaConf" class="arama-conf">En az 3 harf olmalıdır.</div> -->
                        </div>
                        <button @click="araButton()" :disabled="isDisabled()" type="button" class="btn btn-md waves-effect waves-light" :style="navbar2Color">{{ $t('Search') }}</button>
                        <!-- <router-link :to="{ name : 'AramaPage', params : {aratilan:aratilanUrun+'='} }" class="btn btn-outline-white btn-md btn-rounded waves-effect waves-light my-2 my-sm-0 ml-3">{{ $t('Search') }}</router-link> -->
                        <!-- <button class="btn btn-outline-white btn-md btn-rounded waves-effect waves-light my-2 my-sm-0 ml-3" type="submit">{{ $t('Search') }}</button> -->
                    </form>
                    <li v-if="showLoginButtons" class="nav-item mb-2 mb-md-0">
                        <router-link to="/girisyap" href="#" type="button" class="btn btn-outline-white 
                        btn-md btn-navbar waves-effect waves-light girisyap-button">Gİrİş yap veya Üye ol</router-link>
                    </li>
                    <!-- Kullanici kayit olusturmussa gorunecek START -->
                    <li v-if="showProfil" class="nav-item mb-2 mb-md-0">
                        <router-link to="/profilim" href="#" type="button" class="btn btn-outline-white 
                        btn-md btn-navbar waves-effect waves-light profilim-button">{{ $t('My Profile') }}</router-link>
                    </li>
                    <!-- Kullanici kayit olusturmussa gorunecek END -->
                    
                </ul>
            </div>
        </nav>
        <!--/.Navbar -->
        
        <NavbarTwo />
        
    </div>
    <!-- <TumKategoriler /> -->
</template>

<script>
import axios from 'axios'
// import TumKategoriler from "@/components/TumKategoriler"
import NavbarTwo from "@/components/NavbarTwo"
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            showLoginButtons : true, // kaydi olmayan kullaniciya gorunecek giris yap ve kayit ol butonlarinin show/hide-i icin
            showProfil : false, // kaydi olan kullanicinin gorecegi profilim butonunun show/hide-i icin
            geciciSepet : '',
            sepettekiUrunSayisi : '',
            aratilanUrun : '',
            aramaConf : false,
            disabled : false,
            // gecmis aramalar icin
            gecmisArama : [],
            errors : [],
            showAramaYukleniyor : true,
            // cookie bilgileri START
            uid : "",
            utel : "",
            // cookie bilgileri END
        }
    },
    components : {
        // TumKategoriler,
        NavbarTwo
    },
    mounted () {
        // sepetButton-a her click yapildiginda tetiklenir, yani icerigin degistigini anlayabiliyoruz
        window.addEventListener('click', this.urunSayisi)
    },
    beforeUnmount () {
        window.removeEventListener('click', this.urunSayisi)
    },
    computed : {
        ...mapGetters(["navbarColor","serverRequest","navbar2Color"]),
    },
    methods : {
        gecmisKelimeyiAra(gecmis){
            this.aratilanUrun = gecmis.kelime
            this.$router.push({ name : 'AramaPage', params : {aratilan:this.aratilanUrun+'='} })
        },
        isDisabled(){
            if(this.aratilanUrun != "" && this.aratilanUrun && this.aramaConf != true){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        aramaAlan(){
            if(this.aratilanUrun.length < 3){
                this.aramaConf = true
            }else{
                this.aramaConf = false
            }
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
        },
        araButton(){
            this.$router.push({ name : 'AramaPage', params : {aratilan:this.aratilanUrun+'='} })
        },
        urunSayisi(){ // toplam tutar da buradan aliniyor
            if(localStorage.getItem("sepet") == null){
                localStorage.setItem("sepet", "[]")
            }
            var localSpt = (JSON.parse(localStorage.getItem("sepet"))) // localstorage "sepet" icindeki veriler parse edilerek localspt-e yazilir
            this.geciciSepet = localSpt // localSpt-deki veriler geciciSepet-e yazilir ve artik tum islemleri localstorage uzerinden degil de geciciSepet uzerinden yapilacak hale getirilir burada
            this.sepettekiUrunSayisi = this.geciciSepet.length // sepetteki urun sayisini almak icin
        },
        async fetchGecmisArama(){
            try {
                const formData = new FormData();
                formData.append('f', 'get_gecmis_arama');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.gecmisArama = response.data
                this.showAramaYukleniyor = false
            } catch (error) {
                this.errors.push(error)
            }
            // console.log("sorgu yapildi")
        },
    },
    created(){
        this.urunSayisi()
        // var getCookie = document.cookie
        // getCookie.includes("uid") // onceden kontrol tek uid ile yapiliyordu
        this.getUid_Udep()
        var getUserInLocal = localStorage.getItem("user")
        if(getUserInLocal != null){ // local-de giris yaptiktan sonra donen user bilgisi var mi diye kontrol edilir
            this.showLoginButtons = false // varsa login button-lari hide olur
            this.showProfil = true // profilim button-u show olur
        }
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    /* gecmis aramalar icindeki girilmesi gereken en az harf mesaji START */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    /* gecmis aramalar icindeki girilmesi gereken en az harf mesaji END */
    @media (max-width : 1200px){
        nav{
            padding-right: 1% !important;
            padding-left: 1% !important;
        }
    }
    @media (max-width : 1050px){
        .navbar-nav{
            display: none;
        }
    }
    @media (max-width : 990px){
        .navbar{
            display: flex;
            justify-content: center;
        }
    }
    @media (max-width : 500px){
        .navbar {
            min-height: 50px !important;
        }
        .navbar-brand{
            margin-top: -15px !important;
            margin-bottom: -15px !important;
        }
        .navbar-brand img{
            width: 150px !important;
        }
    }
    nav{
        padding-right: 10.5%;
        padding-left: 10.5%;
    }
    .navbar {
        z-index: 10;
        min-height: 70px;
    }
    .navbar-brand{
        margin-top: -20px;
        margin-bottom: -20px;
        /* border: 1px solid red; */
    }
    .navbar-brand img{
        width: 150px; /* gunkay sanal market logosunda width 95 idi */
        height: 60px;
        object-fit: contain; /* gunkay sanal market logosunda object-fit cover idi */
        filter: brightness(100);
    }
    .nav-link{
        font-size: 14px;
    }
    .btn-rounded{
        border-radius: 20px;
    }
    .badge{
        font-size: 12px;
    }
    .arama-alan{
        position: absolute;
        left: 51.3%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .arama-alan button{
        position: absolute;
        right: 2px;
        color: white;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 10px 15px;
    }
    .search-svg{
        position: absolute;
        top: 8px;
        left: 9px;
        width: 20px;
    }
    #ara{
        width: 400px;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        outline:none !important;
        padding: 5px 60px 5px 35px;
    }
    .arama-conf{
        color: rgb(231, 231, 231);
        font-size: 11px;
        position: absolute;
        top: 45px;
        left: 7px;
    }
    /* input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset !important;
    } */
    .hiddendiv{
        display: none;
        z-index: 10;
        font-size: 15px;
        position: absolute;
        height: auto;
        width: 350px;
        border: 1px solid #eee;
        border-radius: 3px;
        background: white;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
        padding: 9px;
    }
    #ara:focus + .hiddendiv{
        display: block;
    }
    .gecmis-arama-text{
        font-size: 14px;
        color: #b1b1b1;
        margin-bottom: 3px;
    }
    .gecmis-arama-text span{
        float: right;
        font-size: 10px;
        text-transform: uppercase;
        border: 1px solid #ff4444;
        border-radius: 20px;
        color: white;
        background: #ff4444;
        padding: 2px 5px;
    }
    .hiddendiv div div:hover{
        cursor: pointer;
        background: #eee;
        color: #636363;
        padding-left: 5px;
        margin-left: -5px;
        border-radius: 3px;
    }
    .hiddendiv div div span{
        display: none;
        color: #636363;
    }
    .hiddendiv div div:hover span{
        display: block;
    }
    .loading{
        width: 17px;
        height: 17px;
        margin: 0 -20px 0 10px;
    }
    .girisyap-button{
        border-radius: 10px;
        margin-right: 0px;
        margin-left: -64px;
    }
    .profilim-button{
        border-radius: 10px;
        margin-right: 0px;
    }
</style>