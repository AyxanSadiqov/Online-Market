<template>
    <div>
        <Navbar />
        <SepetButton />
        <BottomNavMenu />
        <span style="display: none;">{{kelimeToBeWatched = $route.params.aratilan.slice(0,-1)}}</span>
        
        <!-- boyut 990-in altina indiginde gorunecek arama alani START -->
        <div class="mobil-arama">
            <div class="input-group pt-2 pl-3 pr-3">
                <input v-if="$route.params.aratilan.slice(0,-1)" v-model="mobilAranacakKelime" type="search" class="form-control">
                <input v-else v-model="mobilAranacakKelime" type="search" class="form-control" placeholder="Ürün adını giriniz..">
                <div class="input-group-append">
                    <button @click="araButton()" :disabled="isDisabled()" class="btn ara-button btn-rounded btn-sm my-0 waves-effect waves-light" type="submit">{{ $t('Search') }}</button>
                </div>
            </div>
            <div v-if="showAramaSonuc" class="bulunan-urun-sayi-mobile"><span>"{{dublicateMobilAranacakKelime}}"</span> için {{bulunanUrunSayi}} ürün bulundu.</div>
            
            <!-- gecmis aramalar -->
            <div id="gecmisAramaID" v-if="showGecmisArama">
                <div class="text-muted gecmis-arama-text">Geçmiş Aramalarım</div>
                <div v-for="gecmisarama in gecmisArama.response" :key="gecmisarama.id" class="row ml-3 mt-2">
                    <div v-if="gecmisarama.gecmis_aramalar==''" class="gecmis-arama-yok">- Henüz bulunmamaktadır.</div>
                    <div v-for="gecmis in gecmisarama.gecmis_aramalar" :key="gecmis.id">
                        <div @click="tiklananGecmisKelime(gecmis)" class="gecmis-arama-each">{{gecmis.kelime}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- boyut 990-un altina indiginde gorunecek arama alani END -->

        <div v-if="showAramaSonuc" class="bulunan-urun-sayi-desktop"><span>{{bulunanUrunSayi}}</span> ürün bulundu.</div>

        <!-- NOT : yukleniyor yazisi 990px-nin altinda gorunmeyecek sekilde ayarlandi -->
        <div v-if="$route.params.aratilan.slice(0,-1)">
            <div v-if="showYukleniyor" class="d-flex justify-content-center yukleniyor-alan">
                <span class="yukleniyor">Yükleniyor...</span>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12">
                <transition name="slide-fade">
                    <div v-for="aramalar in aramaSonuc.response" :key="aramalar.id" class="row mt-2 urunler-mobile">
                        <span style="display: none;">{{bulunanUrunSayi = aramalar.aramalar.length}}</span>
                        <div v-for="daha in dahaFazlaGoster" :key="daha.id" class="col-lg-3 col-sm-4 col-6 col-md-3">
                            <div v-if="aramalar.aramalar.length>=daha">
                                <div class="card mb-3 urunler-col">
                                    <router-link :to="{ name : 'UrunPage', params : {urun_ad:aramalar.aramalar[daha - 1].ad, g_id:aramalar.aramalar[daha - 1].grup, g_ad:aramalar.aramalar[daha - 1].grupad, altg_id:aramalar.aramalar[daha - 1].altgrup, altg_ad:aramalar.aramalar[daha - 1].altgrupad} }">
                                        <div class="zoom flex-center max-width-img">
                                            <img v-if="aramalar.aramalar[daha - 1].barkod.length < 8" class="img-fluid w-100 first" :src="imagecompany + ushp + '/' + aramalar.aramalar[daha - 1].barkod + '.jpeg?' + aramalar.aramalar[daha - 1].imageupdate" alt="">
                                            <img v-else class="img-fluid w-100 first" :src="image + aramalar.aramalar[daha - 1].barkod + '.jpeg?' + aramalar.aramalar[daha - 1].imageupdate" alt="">
                                        </div>
                                    </router-link>
                                    <IndirimYazisi :urun="aramalar.aramalar[daha - 1]" v-if="aramalar.aramalar[daha - 1].kampanyalimi==1" />
                                    <div class="card-body text-center">
                                        <h6 class="min-height-name">{{ aramalar.aramalar[daha - 1].ad }}</h6>
                                        <hr style="background-color:white">
                                        <h6 class="mb-3">
                                            <span class="text-danger">{{ aramalar.aramalar[daha - 1].satisfiyat }} TL</span>
                                            <span v-if="aramalar.aramalar[daha - 1].kampanyalimi==1" class="ml-1 text-grey"><s>{{ aramalar.aramalar[daha - 1].kampanyasizsatisfiyat }} TL</s></span>
                                        </h6>
                                        <div class="urunler-adet-input">
                                            <AdetInputveSepeteEkleButton :liste="aramalar.aramalar[daha - 1]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12" id="dahaFazlaID">
                            <div v-if="showDahaFazla(aramalar)" class="d-flex justify-content-center">
                                <button type="button" class="btn daha-fazla" :style="dahaFazlaGosterButton">
                                    <scroll-loader :loader-method="loadMoreUrun" :loader-enable="loadMore" class="daha-fazla">
                                        <img class="loading" src="@/assets/svg/loading.gif" alt="">
                                    </scroll-loader>
                                </button>
                            </div>
                        </div>
                        <!-- aranan kelimeye gore sonuc bulunmadiginda START -->
                        <div v-if="aramalar.aramalar==0" class="col-12 col-lg-12">
                            <div class="d-flex justify-content-center">
                                <div class="sonuc-bulunamadi">
                                    <img src="@/assets/svg/search-find.svg" width="100" height="100" alt="">
                                    <p class="text-muted">Sonuç bulunamadı</p>
                                </div>
                            </div>
                        </div>
                        <!-- aranan kelimeye gore sonuc bulunmadiginda END -->
                    </div>
                </transition>
            </div>
            <div class="col-md-1"></div>
        </div>

        <!-- Sayfa ilk acildiginda gorunecek alan START -->
        <div v-if="!$route.params.aratilan.slice(0,-1)">
            <div v-if="showSayfaIlkResim" class="col-12 col-lg-12">
                <div class="d-flex justify-content-center">
                    <div class="sonuc-bulunamadi">
                        <img src="@/assets/svg/search-enter.svg" width="100" height="100" alt="">
                        <p class="text-muted">Aramak istediğiniz ürünü yazın</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Sayfa ilk acildiginda gorunecek alan END -->

        <Footer />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Navbar from "@/components/Navbar"
import AdetInputveSepeteEkleButton from "@/components/AdetInputveSepeteEkleButton"
import SepetButton from "@/components/SepetButton"
import IndirimYazisi from "@/components/IndirimYazisi"
import BottomNavMenu from "@/components/BottomNavMenu"
import Footer from "@/components/Footer"

export default {
    metaInfo() {
        return{
            title: 'Günkay Sanal Market',
            titleTemplate: '%s | Arama'
        }
    },
    data(){
        return{
            aramaSonuc : [],
            gecmisArama : [],
            errors : [],
            kelimeToBeWatched : '', // navbardaki arama alanindan donen params buraya yazilir, watch ile bu data izlenir
            showYukleniyor : true, // sorgu beklenene kadar ki sure zarfinda gorunecek loading svg show/hide-i icin
            dahaFazlaGoster : 32,
            mobilAranacakKelime : "",
            dublicateMobilAranacakKelime : "",
            disabled : false,
            bulunanUrunSayi : "",
            showAramaSonuc : false,
            showSayfaIlkResim : true,
            showGecmisArama : true, // arama alani bos oldugunda, daha aranilacak urun adi yazilmadiginda gecmis aramalar goruntulenecebilecek
            // cookie bilgileri START
            uid : "",
            utel : "",
            udep : "",
            ushp : "",
            // cookie bilgileri END
            loadMore: true,
        }
    },
    components : {
        Navbar,
        AdetInputveSepeteEkleButton,
        SepetButton,
        IndirimYazisi,
        BottomNavMenu,
        Footer
    },
    computed : {
        ...mapGetters(["image","imagecompany","dahaFazlaGosterButton","serverRequest"])
    },
    methods : {
        loadMoreUrun(){ // en alta geldiginda otomatik olarak 30 tane daha urun listelenir
            this.dahaFazlaGoster += 32
        },
        // gecmis aramalardaki kelimeye tiklandiginda calisacak fonksiyon
        tiklananGecmisKelime(gecmis){
            this.kelimeToBeWatched = gecmis.kelime // kelimeye tiklandiginda sorgu yapilmasi icin
            this.mobilAranacakKelime = this.kelimeToBeWatched // arama input-unda tiklanan urunun gorunmesi icin
            this.dublicateMobilAranacakKelime = this.mobilAranacakKelime // bulunan urun sayisi alaninda urun adinin gorunmesi icin
        },
        // her araya basildiginda mobilAranacakKelime kelimeToBeWatched-e yazilir
        // kelimeToBeWatched de watch ile izlendigi icin her degisimde yani araya basildiginda sorgu gider
        araButton(){
            this.kelimeToBeWatched = this.mobilAranacakKelime
            this.$router.push({ name : 'AramaPage', params : {aratilan:this.mobilAranacakKelime+'='} })
            // cikan sonucta aranan kelime, aranacak kelimeye gore anlik degismesin diye
            this.dublicateMobilAranacakKelime = this.mobilAranacakKelime
        },
        isDisabled(){
            if(this.mobilAranacakKelime != "" && this.mobilAranacakKelime){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        async fetchArama(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_and_save_aranan_kelime');
                formData.append('aratilan_kelime', this.kelimeToBeWatched);
                formData.append('depo', this.udep);
                // kullanici giris yapmadiysa bile Utel cookiden farkli bir deger ile ici doluyor. simdilik kontrol 7-den kucuk mu-ye gore yapiliyor
                // ileride Utel ve Udep degerlerin alindigi fonk guncellenecek ve bu degerler her sayfada ayri ayri degil de site acildiginda store-a kaydedilecek
                formData.append('user', (this.utel.length < 7) ? "" : this.utel);
                formData.append('uid', (this.utel.length < 7) ? "" : this.uid);
                formData.append('os', 'web');
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.aramaSonuc = response.data
            } catch (error) {
                this.errors.push(error)
            }
            if(this.aramaSonuc.status != ""){
                this.showYukleniyor = false
                this.showAramaSonuc = true
                this.showSayfaIlkResim = false // sonuc bulunamadi ve sayfa ilk acildiginda gorunen aramak istediginiz urun sayisi alani bazi durumlarda birlikte gorunuyordu. goruldugu kadariyla bu kontrol is gorur
                this.showGecmisArama = false // urun adi arandiktan sonra gecmis arama alani gizlenir
            }
            // console.log("sorgu yapildi")
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
            this.udep = this.decryptCookie("udep")
            this.ushp = this.decryptCookie("ushp")
        },
        async fetchGecmisArama(){
            this.getUid_Udep()
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
            } catch (error) {
                this.errors.push(error)
            }
            // console.log("sorgu yapildi")
        },
        showDahaFazla(aramalar){ // urun sayisi 30-dan buyukse daha fazla goster butonu gorunecek
            return aramalar.aramalar.length > this.dahaFazlaGoster
        },
    },
    watch: {
        kelimeToBeWatched(val) {
            // data degistiginde bir seyler yapilir
            if(val) {
                this.fetchArama(); // yani navbardaki her aranacak kelime degistiginde sorgu yapilir
                // console.log("degisti")
            }
        }
    },
    created(){
        this.fetchGecmisArama()
        // sayfa refresh edilidiginde onceki aranan kelime arama alaninda gorunur
        if(this.$route.params.aratilan.slice(0,-1)){
            this.mobilAranacakKelime = this.$route.params.aratilan.slice(0,-1)
            this.dublicateMobilAranacakKelime = this.$route.params.aratilan.slice(0,-1)
        }
    }
}
</script>

<style scoped>
    /* Aranan urun listeleme (urun silindiden alindi) START */
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
    /* Aranan urun listeleme END */
    @media (max-width : 990px){
        .mobil-arama{
            display: block !important;
        }
        :is(.yukleniyor-alan, .bulunan-urun-sayi-desktop){
            display: none !important;
        }
        #dahaFazlaID{
            margin-bottom: 40px;
        }
    }
    @media (max-width : 500px){
        .urunler-col{
            margin-left: -10px;
            margin-right: -10px;
        }
        .urunler-mobile{
            margin-left: -25px !important;
            margin-right: -25px !important;
        }
    }
    @media (max-width : 400px){
        .min-height-name{
            font-size: 12px;
            min-height: 30px !important;
            max-height: 30px !important;
        }
        .urunler-col{
            margin-left: -10px;
            margin-right: -10px;
        }
    }
    @media (max-width : 320px){
        .urunler-mobile{
            padding: 10px;
        }
        .urunler-col{
            margin-left: -10px;
            margin-right: -10px;
        }
    }
    .urunler-mobile{
        margin-left: -10px;
        margin-right: -10px;
    }
    .urunler-col{
        margin-left: -10px;
        margin-right: -10px;
        height: 365px;
    }
    .row{
        margin: 20px;
    }
    .max-width-img{
        min-height: 150px;
        max-height: 150px;
    }
    .urunler-adet-input{
        padding-left: 8px;
        display: flex;
        justify-content: center;
    }
    img.first{
        max-width: 90px;
        max-height: 130px;
        object-fit: contain;
    }
    .min-height-name{
        margin-top: -5px;
        min-height: 40px;
        max-height: 40px;
        overflow: hidden !important;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .text-danger{
        font-size: 14px;
    }
    .text-grey{
        font-size: 14px;
    }
    .loading{
        width: 17px;
        height: 17px;
    }
    .daha-fazla {
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 2px;
        padding: 5px 10px;
    }
    .yukleniyor{
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        color: #616161;
    }
    ::placeholder{
        font-size: 15px;
    }
    .mobil-arama{
        display: none;
    }
    .sonuc-bulunamadi{
        text-align: center;
        padding-top: 80px;
    }
    .sonuc-bulunamadi p{
        padding-top: 10px;
        font-size: 16px;
    }
    .bulunan-urun-sayi-mobile{
        color: rgb(165, 165, 165);
        font-size: 11px;
        text-align: center;
    }
    .bulunan-urun-sayi-mobile span{
        color: rgb(121, 121, 121);
    }
    .bulunan-urun-sayi-desktop{
        color: rgb(165, 165, 165);
        font-size: 11px;
        text-align: center;
    }
    .bulunan-urun-sayi-desktop span{
        color: rgb(85, 85, 85);
    }
    /* .input-group-append{
        margin-left: -6px;
    } */
    .btn-rounded{
        border-radius: 5px;
    }
    .gecmis-arama-text{
        font-size: 14px;
        margin: 10px 0 0 17px;
    }
    .gecmis-arama-each{
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 4px 10px;
        background: #eee;
        margin: 0 15px 8px 0;
        font-size: 14px;
        cursor: pointer;
    }
    .gecmis-arama-yok{
        font-size: 12px;
        color: rgb(141, 141, 141);
        font-style: italic;
    }
    #gecmisAramaID{
        margin-bottom: -40px;
    }
    .ara-button{
        background: #569129;
        color: white;
    }
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
</style>