Bu sayfadaki puf noktalar:
1 - Bu sayfa AltgruplarPage-in child-i
2 - Gruplar sayfasindaki herhangi bir gruba tiklandiktan sonra o gruba ait urunlerin listelenecegi sayfa burasi
3 - fetchGrupUrunler()-e dinamik olarak Gruplar sayfasindan gelen $route.params.id (grup id) yazilir
4 - params ile bir veri aktarimi var
5 - Urun Gruplari div-i surukle/birak ozelligine sahip
    - Surukleme halindeyken div-in sol tarafinin koordinati, pencerenin uzunlugunun yarisina geldigi an
      urunlerin gosterildigi div sola veya saga kaydirilir.
      (Urun Gruplari sagdaysa urunler sola, Urun Gruplari soldaysa urunler saga seklinde)
<template>
    <div v-cloak>
        <SepetButton />
        <div class="row m-4">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12">
                <!-- {{$route.params.id}} -->
                <div class="row">
                    <div v-if="showYukleniyor" id="grup-basiklari-div" class="col-lg-3 col-sm-12 col-12 col-md-3">
                        <div class="card skeleton-card sticky"></div>
                    </div>
                    <div v-if="showUrunGruplari" id="grup-basiklari-div" ref="draggableContainer" class="col-lg-3 col-sm-12 col-12 col-md-3">
                        <div v-if="showDragBildirim" class="drag-goruntule-bildirim noselect">
                            <div class="d-flex justify-content-center">
                                <img src="@/assets/gif/draganddrop.gif" width="80" alt="">
                                <span class="drag-goruntule-bildirim-yazi">Ürün Grupları'nı basılı tut, sürükle ve bırak. Sayfayı size özel yapın.</span>
                            </div>
                            <button @click="closeDragBildirim()" type="button" class="close" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>
                            <span class="triangle-down"></span>
                        </div>
                        <div class="card text-center sticky mb-4">
                            <div class="card-header white-text urun-gruplari-baslik" id="draggable-header" :style="urunGruplariColor" @mousedown="dragMouseDown">
                                {{ $t('Product Groups') }}
                            </div>
                            <div class="card-body grup-basliklari-body" :style="urunGruplari">
                                <h4 class="card-title resp-urun-baslik" :class="urunGruplariBaslik">
                                    {{$route.params.g_ad}}
                                </h4>
                                <div v-for="liste in gruplar" :key="liste.id">
                                    <div v-for="altgrup in liste" :key="altgrup.id">
                                        <router-link :to="{ name : 'UrunlerPage', params : {id:altgrup.id, g_id:altgrup.grup, g_ad:$route.params.g_ad, altg_ad:altgrup.ad} }">
                                            <p class="card-text urun-gruplari-each" :class="urunGruplariEach">{{ altgrup.ad }}</p>
                                        </router-link>
                                        <router-view />
                                    </div>
                                </div>
                                <router-link to="/" class="btn btn-sm white-text mt-3 resp-urun-button z-depth-0" :style="urunGruplariColor">{{ $t('All Categories') }}</router-link>
                            </div>
                        </div>
                    </div>

                    <div ref="urunlerRef" class="col-lg-9 col-sm-12 col-12 col-md-12 urunler_ref">
                        <UrunlerUstBar 
                            :showYukleniyor="showYukleniyor"
                            :showUrunlerBar="showUrunlerBar"
                            :urunler="grupUrunler"
                            @sayimi="filterSayi"
                        />

                        <!-- Sayfa konum bar START -->
                        <!-- <div class="row sticky-sayfa-konum" :class="{ 'sayfa-konum-hidden': !showSayfaKonum }">
                            <div class="page-bar-div">
                                <router-link to="/" class="page-bar">{{ $t('Home Page') }}</router-link> &nbsp;<i class="fas fa-angle-right"></i>&nbsp;
                                <router-link :to="$router.currentRoute" class="page-bar">{{$route.params.g_ad}}</router-link>
                            </div>
                        </div> -->
                        <!-- Sayfa konum bar END -->
                        <!-- Card src="@/assets/img/no-image.png" -->
                        <div v-if="showYukleniyor" class="row urunler-mobile">
                            <div v-for="sc in dahaFazlaGoster" :key="sc.id" class="col-lg-3 col-sm-6 col-6 col-md-3 mt-2">
                                <div class="card skeleton-card-urunler urunler-col"></div>
                            </div>
                        </div>
                        <div v-for="liste in grupUrunler" :key="liste.id" class="row mt-2 float-left urunler-mobile">
                            <div v-for="daha in dahaFazlaGoster" :key="daha.id" class="col-lg-3 col-sm-6 col-6 col-md-3 float-left">
                                <div v-if="liste.length>=daha" class="card mb-3 urunler-col" :style="altgrupUrunlerShadow">
                                    <router-link :to="{ name : 'UrunPage', params : {urun_ad:liste[daha - 1].ad, g_id:$route.params.id, g_ad:$route.params.g_ad, altg_id:$route.params.id, altg_ad:$route.params.altg_ad} }">
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
                                        <!-- {{liste[daha-1].adet}} -->
                                        <div class="urunler-adet-input">
                                            <AdetInputveSepeteEkleButton :liste="liste[daha - 1]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="dahaFazlaID">
                                <div class="col-md-12">
                                    <div v-if="showDahaFazla" class="d-flex justify-content-center">
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
            gruplar : [],
            grupUrunler : [], // fetchAltgrupUrunler() sorgusu sonrasi donen bilgileri bu array-e atilip, sonrasindaki tum urunler bu array uzerinden listeleniyor
            errors : [], // hata olursa buraya doner
            // UrunSayiFiltreleme emit-ten gelen bilgi ayni zamanda dahaFazlaGoster yazilir, urun filtrelemede kullanilir
            dahaFazlaGoster : 32, // daha fazla goster butonu icin. ilk degeri 30 verildi. Ve sayfa render edildiginde 30 urun listeler. Sonrasinda her "daha fazla goster" butonuna tiklanildigi anda fazlaGoster() fonksiyonu calisir
            showYukleniyor : true, // sorgu beklenene kadar ki sure zarfinda gorunecek loading svg show/hide-i icin
            showUrunGruplari : false,
            showUrunlerBar : false,
            // cookie bilgileri START
            udep : "",
            ushp : "",
            // cookie bilgileri END
            loadMore: true,
            koordinat : "",
            positions: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0
            },
            showDragBildirim : true, // kullanicilar urun gruplarinin suruklenebilir olmasini bilmeleri icin bildirimin show/hide-i icin
        }
    },
    mounted () {
        // bu listener TumKategoriler-de her gruba tiklandiginda, o gruba uygun urunler listelensin diye degisiklik algilansin ve yeniden sorgu yapilsin diye var.
        // eger bu olmasa TumKategoriler-deki her gruba tiklandiginda grup id, grup.ad params ile gonderiliyor orada sikinti yok..
        // ..url ve o gruba ait altgrup bilgileri yenileniyordu fakat sorgu her grup degistiginde bir daha yapilmiyordu.
        // window.addEventListener('click', this.fetchGrupUrunler)
    },
    beforeUnmount () {
        // window.removeEventListener('click', this.fetchGrupUrunler)
    },
    computed : {
        ...mapGetters(["tumListe","image","imagecompany","urunGruplariColor","urunGruplari","urunGruplariBaslik","urunGruplariEach",
        "altgrupUrunleer","altgrupUrunlerShadow","dahaFazlaGosterButton","serverRequest"]),
        showDahaFazla(){ // urun sayisi 30-dan buyukse daha fazla goster butonu gorunecek
            return this.grupUrunler.urunler.length > this.dahaFazlaGoster
        },
    },
    methods : {
        loadMoreUrun(){ // en alta geldiginda otomatik olarak 30 tane daha urun listelenir
            this.dahaFazlaGoster += 32
        },
        getKoordinat(){
            this.koordinat = localStorage.getItem("koord")
        },
        async fetchGruplar(){ // urun gruplari icin
            this.getUid_Udep()
            this.getKoordinat()
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
            if(this.gruplar == ""){
                this.showYukleniyor = false
            }
            // console.log("sorgu yapildi")
        },
        async fetchGrupUrunler(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_urunler');
                formData.append('grup', this.$route.params.id);
                formData.append('altgrup', '-1');
                formData.append('depo', this.udep);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.grupUrunler = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
            if(this.grupUrunler.status != ""){
                this.showYukleniyor = false
                this.showUrunGruplari = true // skeletor loader-i gittikten sonra gorunmesi icin
                this.showUrunlerBar = true // skeletor loader-i gittikten sonra gorunmesi icin
            }
            // console.log("sorgu yapildi")
        },
        getUid_Udep(){
            this.udep = this.decryptCookie("udep")
            this.ushp = this.decryptCookie("ushp")
        },
        filterSayi(params){ // UrunSayiFiltreleme.vue-dan yani child-dan gelen data dahaFazlaGoster-e gonderilmesi icin burada yazilir
            this.dahaFazlaGoster = params
        },
        dragMouseDown: function (event) {
            event.preventDefault()
            // get the mouse cursor position at startup:
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            document.onmousemove = this.elementDrag
            document.onmouseup = this.closeDragElement
        },
        elementDrag: function (event) {
            event.preventDefault()
            this.positions.movementX = this.positions.clientX - event.clientX
            this.positions.movementY = this.positions.clientY - event.clientY
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            // set the element's new position:
            this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
            this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
            // div-in hareket edebilecegi cerceveyi belirlemek icin
            let left_style = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) // div-in sol tarafinin koordinati
            // console.log(left_style, "window--",window.innerWidth, "drag--",this.$refs.draggableContainer.clientWidth)
            if(left_style <= -140){ // sol tarafa gidebilecegi en son nokta -140. Eger -140-dan kucuk ise..
                this.$refs.draggableContainer.style.left = '-140px' //..yeniden -140-a sabitle
            }
            let right_side = window.innerWidth - this.$refs.draggableContainer.clientWidth*1.5 - 3 // hesaplamaya gore div-in sag tarafa yaslanma koordinati
            if(left_style >= right_side){ // sag tarafa gidebilecegi en son nokta icin
                this.$refs.draggableContainer.style.left = right_side + 'px'
            }
            // draggable div-in sol koordinati, pencerenin boyutunun yarisini gectiginde; urunler sola, draggable saga gecmis gibi olsun diye
            if(left_style >= window.innerWidth/2){
                this.$refs.urunlerRef.style.right = this.$refs.draggableContainer.clientWidth + 'px'
            }
            if(left_style < window.innerWidth/2 && this.$refs.urunlerRef.offsetLeft <= 0){
                this.$refs.urunlerRef.style.right = 0 + 'px'
            }
        },
        closeDragElement () {
            document.onmouseup = null
            document.onmousemove = null
        },
        controlUrunGruplariPosition(){ // sayfanin en basina donuldugunde Urun gruplari div-ini eski haline getirmek icin
            if(window.pageYOffset === 0){
                // urunler sag tarafta ise yani standart halindelerse, urun gruplari yukaridan ve solda sifirlanir. yani eski haline geri doner
                this.$refs.draggableContainer.style.top = 0 + 'px'
                this.$refs.draggableContainer.style.left = 0 + 'px'
                this.$refs.draggableContainer.style.transition = 'all 0.2s ease'
                // ama eger urunler sol tarafta ise, urun gruplari yukaridan sifirlanir ve sag taraf koordinati = urunler div-inin uzunlugu oluyor
                if(this.$refs.urunlerRef.offsetLeft <= 0){
                    this.$refs.draggableContainer.style.top = 0 + 'px'
                    this.$refs.draggableContainer.style.left = this.$refs.urunlerRef.clientWidth + 'px'
                    this.$refs.draggableContainer.style.transition = 'all 0.2s ease'
                }
                // bir daha suruklenmek istendiginde transition 0-lansin diye (10ms sonra)
                setTimeout(() => this.$refs.draggableContainer.style.transition = '0s', 10)
            }
        },
        closeDragBildirim(){ // surukle/birak nerede oldugunu gosteren bildirimi kapatmak icin
            this.showDragBildirim = false
            localStorage.setItem("drag-popup",1)
        },
    },
    created(){ // sayfa render oldugu zaman ilk calisacak metod burasi
        this.fetchGruplar()
        this.fetchGrupUrunler() // sayfa render oldugunda request yapilir ve urunler listelenir
        window.addEventListener('scroll', this.controlUrunGruplariPosition)
        if(localStorage.getItem("drag-popup") === '1'){
            this.showDragBildirim = false
        }else{
            this.showDragBildirim = true
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.controlUrunGruplariPosition)
    },
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 990px){
        #dahaFazlaID{
            margin-bottom: 40px;
        }
        :is(#grup-basiklari-div){
            display: none;
        }
    }
    /* iPad */
    @media (max-width : 780px){
        .resp-urun-baslik{
            font-size: 15px;
        }
        .urun-gruplari-each{
            font-size: 13px !important;
        }
        .resp-urun-button{
            font-size: 8px;
        }
    }
    @media (max-width : 500px){
        .resp-urun-baslik{
            font-size: 20px;
        }
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
    #grup-basiklari-div{
        /* sticky-ler genellikle her sayfada 5 olarak ayarlandi. Urun gruplari div-i suruklenirken,
        Urunler ust bar-inin uzerinde gorunmesi icin zindex 6 olarak ayarlandi burada */
        z-index: 6;
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
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 22px 0px 22px 0px;
    }
    #draggable-header {
        cursor: grab;
    }
    #draggable-header:active{
        cursor: grabbing;
    }
    .grup-basliklari-body{
        border-radius: 10px;
    }
    .urun-gruplari-each{
        transition: all 0.1s ease;
    }
    .urun-gruplari-each:hover{
        border: #f3f3f3;
        background-color: #f3f3f3;
    }
    .urun-gruplari-each-dark{
        transition: all 0.1s ease;
    }
    .urun-gruplari-each-dark:hover{
        font-size: 18px;
        border: #DEDEDE;
        background-color: #DEDEDE;
        color: #212121;
    }
    .sayfa-konum-hidden {
        display: none;
        transform: translate3d(0, -100%, 0);
    }
    .page-bar-div{
        border: 1px solid white;
        border-radius: 5px;
        font-size: 13px;
        color: #c4c4c4;
        background-color: white;
        padding: 15px;
        margin-top: 5px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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
        color: #4285F4;
    }
    .sticky {
        z-index: 5;
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
    .daha-fazla {
        position: sticky;
        top: 2px;
        padding: 5px 10px;
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
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
    .urunler_ref{
        transition: .2s;
    }
    /* belirli sure drag goruntulemek icin bildiri popup-i gosterilecek START */
    .drag-goruntule-bildirim{
        position: absolute;
        top: -125px;
        font-size: 14px;
        left: 0px;
        max-width: 240px;
        border: 1px solid #4285F4;
        border-radius: 5px;
        background: #4285F4;
        color: white;
        padding: 10px 40px 10px 10px;
        box-shadow: 0 8px 8px 0 rgba(0,0,0,0.2);
        animation: bounce 1s infinite alternate;
        -webkit-animation: bounce 1s infinite alternate;
    }
    @keyframes bounce {
        from {
            transform: translateY(5px);
        }
        to {
            transform: translateY(-5px);
        }
    }
    @-webkit-keyframes bounce {
        from {
            transform: translateY(5px);
        }
        to {
            transform: translateY(-5px);
        }
    }
    .drag-goruntule-bildirim-yazi{
        padding-left: 10px;
        margin-right: -25px;
    }
    .triangle-down{
        position: absolute;
        top: 105px;
        left: 21px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 12px solid #4285F4;
    }
    .close{
        position: absolute;
        top: 9px;
        right: 10px;
        font-size: 20px;
        outline:none !important;
    }
    /* belirli sure filtre goruntulemek icin bildiri popup-i gosterilecek END */
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
</style>