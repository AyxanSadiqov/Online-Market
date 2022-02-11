Bu sayfadaki puf noktalar:
1 - Gruplar -> AlgrupUrunler -> Urunler seklinde yapi
2 - AltgrupUrunler-de herhangi bir altgrupa tikladiktan sonra gelecek olan UrunlerPage-in child-i
3 - params ile AltgrupUrunler-den 'params.altg_ad' gibi veriler geliyor
4 - mounted kullanildi. sayfa scroll oldugu zaman 'sayfa konum bar'in gorunmesi ya da gizlenmesinin tetiklenmesi icin
5 - diger gerekli detaylar yorum satirlari ile belirtildi zaten
<template>
    <div v-cloak>
        <!-- {{geciciSepet}} -->
        <SepetButton />
        <div class="row m-4">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12">
                <div class="row">
                    <div v-if="showYukleniyor" class="col-lg-3 col-sm-12 col-12 col-md-3">
                        <div class="card skeleton-card sticky"></div>
                    </div>
                    <div v-if="showUrunGruplari" class="col-lg-3 col-sm-12 col-12 col-md-3">
                        <div class="card text-center sticky mb-4">
                            <div class="card-header white-text urun-gruplari-baslik" :style="urunGruplariColor">
                                {{ $t('Product Groups') }}
                            </div>
                            <div class="card-body grup-basliklari-body" :style="urunGruplari">
                                <h4 class="card-title resp-urun-baslik" :class="urunGruplariBaslik">
                                    {{$route.params.g_ad}} - {{$route.params.altg_ad}}
                                </h4>
                                <!-- <p class="card-text urun-gruplari-each">Nasıl bir bilgi konabilir buraya ???</p> -->
                                <router-link to="/" class="btn btn-sm white-text mt-3 resp-urun-button z-depth-0" :style="urunGruplariColor">{{ $t('All Categories') }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 col-sm-12 col-12 col-md-9">
                        <UrunlerUstBar 
                            :showYukleniyor="showYukleniyor"
                            :showUrunlerBar="showUrunlerBar"
                            :urunler="altgrupUrunler"
                            @sayimi="filterSayi"
                        />

                        <!-- Sayfa konum bar START -->
                        <div class="row sticky-sayfa-konum" :class="{ 'sayfa-konum-hidden': !showSayfaKonum }">
                            <div class="page-bar-div">
                                <router-link to="/" class="page-bar">{{ $t('Home Page') }}</router-link> &nbsp;<i class="fas fa-angle-right"></i>&nbsp;
                                <router-link :to="{ name : 'AltgruplarPage', params : {id:$route.params.g_id, g_ad:$route.params.g_ad} }" class="page-bar"><a @click="$router.go(-1)">{{$route.params.g_ad}}</a></router-link> &nbsp;<i class="fas fa-angle-right"></i>&nbsp;
                                <router-link :to="$router.currentRoute" class="page-bar">{{$route.params.altg_ad}}</router-link>
                            </div>
                        </div>
                        <!-- Sayfa konum bar END -->

                        <div v-if="showYukleniyor" class="row urunler-mobile">
                            <div v-for="sc in dahaFazlaGoster" :key="sc.id" class="col-lg-3 col-sm-6 col-6 col-md-3 mt-2">
                                <div class="card skeleton-card-urunler urunler-col"></div>
                            </div>
                        </div>
                        <div v-for="liste in altgrupUrunler" :key="liste.id" class="row mt-2 float-left urunler-mobile">
                            <div v-for="daha in dahaFazlaGoster" :key="daha.id" class="col-lg-3 col-sm-6 col-6 col-md-3 float-left">
                                <div v-if="liste.length>=daha">
                                    <div class="card mb-3 urunler-col" :style="altgrupUrunlerShadow">
                                        <router-link :to="{ name : 'UrunPage', params : {urun_ad:liste[daha - 1].ad, g_id:$route.params.g_id, g_ad:$route.params.g_ad, altg_id:$route.params.id, altg_ad:$route.params.altg_ad} }">
                                            <div class="zoom flex-center max-width-img">
                                                <img v-if="liste[daha - 1].barkod.length < 8" class="img-fluid w-100 first" :src="imagecompany + ushp + '/' + liste[daha - 1].barkod + '.jpeg?' + liste[daha - 1].imageupdate" alt="">
                                                <img v-else class="img-fluid w-100 first" :src="image + liste[daha - 1].barkod + '.jpeg?' + liste[daha - 1].imageupdate" alt="">
                                            </div>
                                        </router-link>
                                        <router-view />
                                        <IndirimYazisi :urun="liste[daha - 1]" v-if="liste[daha - 1].kampanyalimi==1" />
                                        <div class="card-body text-center" :style="altgrupUrunleer"> 
                                            <h6 class="min-height-name">{{ liste[daha - 1].ad }}</h6>
                                            <hr style="background-color:white">
                                            <h6 class="mb-3">
                                                <span class="text-danger">{{ liste[daha - 1].satisfiyat }} TL</span>
                                                <span v-if="liste[daha - 1].kampanyalimi==1" class="ml-1 text-grey"><s>{{ liste[daha - 1].kampanyasizsatisfiyat }} TL</s></span>
                                            </h6>
                                            <div class="urunler-adet-input">
                                                <AdetInputveSepeteEkleButton :liste="liste[daha - 1]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center text-muted" v-if="liste.length==0">
                                {{ $t('There is no product under this subgroup') }}.
                            </div>
                            <div class="row" id="dahaFazlaID">
                                <div class="col-md-12">
                                    <div v-if="showDahaFazla()" class="d-flex justify-content-center">
                                        <button type="button" class="btn daha-fazla" :style="dahaFazlaGosterButton">
                                            <scroll-loader :loader-method="loadMoreUrun" :loader-enable="loadMore" class="daha-fazla">
                                                <img class="loading" src="@/assets/svg/loading.gif" alt="">
                                            </scroll-loader>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            <div class="col-md-1"></div>
        </div>
    </div>
    
</template>

<script>
import SepetButton from "@/components/SepetButton"
import AdetInputveSepeteEkleButton from "@/components/AdetInputveSepeteEkleButton"
import UrunlerUstBar from "@/components/UrunlerUstBar"
import IndirimYazisi from "@/components/IndirimYazisi"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    components : {
        SepetButton,
        AdetInputveSepeteEkleButton,
        UrunlerUstBar,
        IndirimYazisi
    },
    data(){
        return{
            altgrupUrunler : [], // fetchAltgrupUrunler() sorgusu sonrasi donen bilgileri bu array-e atilip, sonrasindaki tum urunler bu array uzerinden listeleniyor
            errors : [], // hata olursa buraya doner
            // UrunSayiFiltreleme emit-ten gelen bilgi ayni zamanda dahaFazlaGoster yazilir, urun filtrelemede kullanilir
            dahaFazlaGoster : 32, // daha fazla goster butonu icin. ilk degeri 30 verildi. Ve sayfa render edildiginde 30 urun listeler. Sonrasinda her "daha fazla goster" butonuna tiklanildigi anda fazlaGoster() fonksiyonu calisir
            showSayfaKonum: true, // 'Ana sayfa > Et/Tavuk > Kirmizi Et' navigasyon barinin show/hide-i icin
            lastScrollPosition: 0, // son scroll konumu icin
            showYukleniyor : true, // sorgu beklenene kadar ki sure zarfinda gorunecek loading svg show/hide-i icin
            showUrunGruplari : false,
            showUrunlerBar : false,
            // cookie bilgileri START
            udep : "",
            ushp : "",
            // cookie bilgileri END
            loadMore: true,
        }
    },
    mounted () {
        window.addEventListener('scroll', this.onScroll)
    },
    beforeUnmount () {
        window.removeEventListener('scroll', this.onScroll)
    },
    computed : {
        ...mapGetters(["image","imagecompany","urunGruplariColor","urunGruplari","urunGruplariBaslik","altgrupUrunlerBar",
        "altgrupUrunleer","altgrupUrunlerShadow","dahaFazlaGosterButton","serverRequest"]),
    },
    methods : {
        loadMoreUrun(){ // en alta geldiginda otomatik olarak 30 tane daha urun listelenir
            this.dahaFazlaGoster += 32
        },
        onScroll () {
            // Mevcut scroll konumunu al
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
            // Cep telefonlarında momentum scroll-u nedeniyle, sıfırdan küçükse devam etmemeli
            if (currentScrollPosition < 0) {
                return
            }
            // Mevcut kaydırma konumu ile son scroll konumu arasındaki fark bir ofsetten daha azsa bu işlevi yürütmeyi durdur
            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 70) {
                return
            }
            // Burada showSayfaKonum-u göstermemiz veya gizlememiz gerekip gerekmediğini belirleriz
            this.showSayfaKonum = currentScrollPosition < this.lastScrollPosition
            // Mevcut scroll konumunu son scroll konumu olarak ayarla
            this.lastScrollPosition = currentScrollPosition
        },
        showDahaFazla(){ // urun sayisi 30-dan buyukse daha fazla goster butonu gorunecek
            return this.altgrupUrunler.urunler.length > this.dahaFazlaGoster
        },
        urun(){ // Kullanilmiyor simdilik. sebebi de altgrupUrunler.urunler.length kisminin html kismi icerisindeki dongu icinden baska bir yerde calismiyor olmasi
            // (this.altgrupUrunler.urunler.length / this.dahaFazlaGoster).toString()[0]
        },
        getUid_Udep(){
            this.udep = this.decryptCookie("udep")
            this.ushp = this.decryptCookie("ushp")
        },
        async fetchAltgrupUrunler(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_urunler');
                formData.append('grup', this.$route.params.g_id); // g_id ---> grup_id demek
                formData.append('altgrup', this.$route.params.id);
                formData.append('depo', this.udep);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.altgrupUrunler = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
            if(this.altgrupUrunler.status != ""){
                this.showYukleniyor = false
                this.showUrunGruplari = true // skeletor loader-i gittikten sonra gorunmesi icin
                this.showUrunlerBar = true // skeletor loader-i gittikten sonra gorunmesi icin
            }
        },
        filterSayi(params){ // UrunSayiFiltreleme.vue-dan yani child-dan gelen data dahaFazlaGoster-e burada yazilir
            this.dahaFazlaGoster = params
        },
    },
    created(){ // sayfa render oldugu zaman ilk calisacak metod burasi
        this.fetchAltgrupUrunler() // sayfa render oldugunda request yapilir ve urunler listelenir
        // document.title = this.$route.params.altg_ad // sayfa render oldugunda title-a altgrup adi yazilir
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 990px){
        #dahaFazlaID{
            margin-bottom: 40px;
        }
    }
    /* iPad */
    @media (max-width : 780px){
        .resp-urun-baslik{
            font-size: 15px;
        }
        .urun-gruplari-each{
            font-size: 12px !important;
        }
        .resp-urun-button{
            font-size: 8px;
        }
    }
    @media (max-width : 500px){
        .text-danger{
            font-size: 13px;
        }
        .text-grey{
            font-size: 13px;
        }
    }
    @media (max-width : 400px){
        .page-bar{
            font-size: 11px;
        }
        .min-height-name{
            font-size: 12px;
            min-height: 26px !important;
            max-height: 26px !important;
        }
        .row .urunler-mobile{
            margin-left: -20px;
            margin-right: -20px;
        }
        .urunler-col{
            margin-left: -10px;
            margin-right: -10px;
        }
    }
    /* iPhone 5/SE */
    @media (max-width : 320px){
        .urunler-mobile .float-left{
            padding: 10px;
        }
        .row .urunler-mobile{
            margin-left: -24px;
            margin-right: -24px;
        }
        .urunler-col{
            margin-left: -7px;
            margin-right: -7px;
        }
    }
    .resp-urun-button{
        border-radius: 10px;
    }
    .urunler-col{
        margin-left: -10px;
        margin-right: -10px;
        height: 365px;
    }
    .urun-gruplari-baslik{
        border-top-left-radius: 10px !important;
        border-top-right-radius: 10px !important;
        padding: 22px 0px 22px 0px;
    }
    .grup-basliklari-body{
        border-radius: 10px;
    }
    .sayfa-konum-hidden {
        display: none;
        transform: translate3d(0, -100%, 0);
    }
    h5{
        padding-top: 8px;
    }
    .sticky {
        z-index: 8;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 2px;
    }
    .sticky-sayfa-konum{
        z-index: 5;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 80px;
        padding-left: 15px;
        padding-right: 15px;
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
    .float-left{
        display: inline;
        float: left;
    }
    img.first{
        max-width: 100px;
        max-height: 130px;
        object-fit: contain;
    }
    .max-width-img{
        min-height: 150px;
        max-height: 150px;
    }
    .daha-fazla {
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 2px;
        padding: 5px 10px;
    }
    .urun-gruplari-baslik{
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        padding: 22px 0px 22px 0px;
    }
    .page-bar-div{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        font-size: 13px;
        color: #c4c4c4;
        background-color: white;
        padding: 15px;
        margin-top: 5px;
        overflow-x: auto; /* bar-in x ekseninde scroll-u icin */
        white-space: nowrap; /* bar-in x ekseninde scroll-u icin */
    }
    .page-bar{
        border: 1px solid;
        border-radius: 5px;
        padding: 10px;
        color: #c4c4c4;
    }
    .page-bar:hover{
        color: #5FA56C;
    }
    .loading{
        width: 17px;
        height: 17px;
    }
    .urunler-adet-input{
        padding-left: 8px;
        display: flex;
        justify-content: center;
    }
    .baslik-dark{
        background-color: #212121;
        color: white;
    }
    .spinner{
        width: 45px;
        height: 45px;
    }
    .yukleniyor{
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        color: #616161;
    }

    /* skeleton loader START */
    .skeleton-card{
        height: 250px;
        background-image: linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc),
            linear-gradient(white, white);
        background-size: 120px 25px, 160px 20px, 100px 15px, 100px 15px, 120px 30px, 190px 20px, 100% 100%;
        background-position: 50% 24px, 50% 85px, 50% 120px, 50% 146px, 50% 200px, 0 0;
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
    .skeleton-card-urunler{
        height: 365px;
        background-image: radial-gradient(circle 35px, #ccc 100%, transparent),
            linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(white, white);
        background-size: 75px 75px, 25% 15px, 14% 15px, 20% 15px, 90% 1px, 30% 15px, 75% 32px, 75% 32px, 100% 100%;
        background-position: 50% 44px, 20% 180px, 50% 180px, 75% 180px, 50% 220px, 50% 245px, 50% 280px, 50% 320px, 0 0;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    .skeleton-card-urunler::before { /* div uzerindeki tarama efekti icin */
        content: '';
        display: block;
        position: absolute;
        left: -30px;
        top: 0;
        height: 100%;
        width: 50px;
        background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
        animation: load-urunler 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }
    @keyframes load-urunler {
        from {
            left: -10px;
        }
        to   {
            left: 100%;
        }
    }
    /* skeleton loader END */
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
</style>