Bu sayfadaki puf noktalar:
1 - Bu componente UrunSayiFiltreleme-den emit ile data geliyor ve geldigi gibi yine emit ile AltgrupUrunler ve Urunler-e gonderiliyor
<template>
    <div class="sticky noselect">
        <div v-if="showYukleniyor" class="card skeleton-card1"></div>
        <div v-if="showUrunlerBar" class="card w-100 pl-4 float-left" :class="[altgrupUrunlerBar,rotateClass]">
            <div v-if="showCardFront" class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="urunler-yazisi">
                        <img @click="rotateBar()" src="@/assets/svg/Compare.svg" class="filtreye-degistir-svg" alt="">
                        <span class="filtreleri-goruntule-tooltip">değİştİrmek İçİn tıklayın</span>
                        <div v-if="showFiltreBildirim" class="filtre-goruntule-bildirim">
                            Filtreleri görüntülemek için tıklayın
                            <button @click="closeFiltreBildirim()" type="button" class="close" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>
                            <span class="triangle-down"></span>
                        </div>
                        <span @click="rotateBar()" class="product-yazi">{{ $t('Products') }}</span>
                    </h5>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div>
                        <span @click="scrollToTop()" class="yukari-cik"><small class="font-weight-light">{{ $t('Go Up') }}</small> <i class="far fa-arrow-alt-circle-up"></i></span>
                    </div>
                    <div v-if="showYukleniyor" class="d-flex justify-content-center">
                        <span class="yukleniyor">Yükleniyor...</span>
                    </div>
                    <div v-for="liste in urunler" :key="liste.id" class="urun-sayisi">
                        <small class="font-weight-light text-muted">{{ $t('Number of products') }}: </small>
                        <small><strong>{{ liste.length }}</strong></small>
                    </div>
                </div>
            </div>
            <div v-if="showCardBack" class="card-body flip-card-back">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="urunler-yazisi">
                        <img @click="rotateBar()" src="@/assets/svg/Compare.svg" class="filtreye-degistir-svg" alt="">
                        <span @click="rotateBar()" class="filtre-yazi pl-4">Filtreleme</span>
                    </h5>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div>
                        <UrunSayiFiltreleme @sayimi="filterSayi" />
                    </div>
                    <div>
                        <Filtreleme :urunler="urunler" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UrunSayiFiltreleme from "@/components/UrunSayiFiltreleme"
import Filtreleme from "@/components/Filtreleme"
import { mapGetters } from 'vuex'

export default {
    props : ["showYukleniyor","showUrunlerBar","urunler"],
    data(){
        return{
            rotateClass : "", // dondurme class-i buraya yazilir
            showCardFront : true, // on taraf gosteriminin show/hide-i icin
            showCardBack : false, // arka taraf gosteriminin show/hide-i icin
            showFiltreBildirim : true, // kullanicilar filtrenin nerede oldugunu anlasin diye eklenen bildirimin show/hide-i icin
        }
    },
    components : {
        UrunSayiFiltreleme,
        Filtreleme
    },
    computed : {
        ...mapGetters(["altgrupUrunlerBar"]),
    },
    methods : {
        scrollToTop(){ // sayfanin en basina donmek icin fonksiyon
            window.scrollTo(0,0);
        },
        filterSayi(params){ // UrunSayiFiltreleme.vue-dan yani child-dan gelen data dahaFazlaGoster-e gonderilmesi icin burada yazilir
            this.$emit("sayimi", params)
        },
        rotateBar(){
            if(this.rotateClass == ""){ // on taraf gosterimdeyken
                this.rotateClass = "rotate-urunustbar" // card-in donmesi icin class eklenir
                this.showCardFront = false // on taraf gizlenir
                this.showCardBack = true // arka taraf gosterilir
            }else{ // arka taraf gosterimdeyken
                this.rotateClass = "" // class silinir
                this.showCardFront = true // on taraf gosterilir
                this.showCardBack = false // arka taraf gizlenir
            }
            this.closeFiltreBildirim() // bildirim kapatilmasa bile degistirmek istendiginde kapansin diye
        },
        closeFiltreBildirim(){ // filtrenin nerede oldugunu gosteren bildirimi kapatmak icin
            this.showFiltreBildirim = false
            localStorage.setItem("filter-popup",1)
        },
    },
    created(){
        if(localStorage.getItem("filter-popup") === '1'){
            this.showFiltreBildirim = false
        }else{
            this.showFiltreBildirim = true
        }
    }
}
</script>

<style scoped>
    @media (max-width : 500px){
        .urunler-yazisi{
            font-size: 14px;
            margin-left: -20px;
        }
        .filtreye-degistir-svg{
            width: 12px !important;
            left: 8px !important;
            top: 29px !important;
        }
        .filtreleri-goruntule-tooltip{
            top: 23px !important;
        }
        .filtre-goruntule-bildirim{
            left: -18px !important;
        }
    }
    @media (max-width : 420px){
        .filtre-yazi{ display: none; }
    }
    @media (max-width : 350px){
        .urunler-yazisi{
            font-size: 14px;
            margin-left: -35px;
        }
        .urun-sayisi{ margin-right: -15px; }
        .product-yazi{ display: none; }
        .filtreye-degistir-svg{
            width: 13px !important;
            left: 15px !important;
            top: 26px !important;
        }
    }
    /* iPhone 5/SE */
    @media (max-width : 320px){
        .urun-sayisi{
            margin-right: -15px;
        }
        .urunler-yazisi{
            font-size: 11px;
            margin-left: -35px;
        }
        .urunler-mobile .float-left{
            padding: 10px;
        }
    }
    .product-yazi, .filtre-yazi{
        cursor: pointer;
    }
    .float-left{
        display: inline;
        float: left;
        transition: .5s;
    }
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
    .yukari-cik{
        color: #777;
    }
    .yukari-cik:hover{
        color: black;
        cursor: pointer;
    }
    .yukleniyor{
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        color: #616161;
    }
    h5{
        padding-top: 8px;
    }
    .sticky {
        z-index: 5;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 2px;
    }
    .skeleton-card1{
        height: 80px;
        background-image: linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc),
            linear-gradient(white, white);
        background-size: 8% 20px, 10% 20px, 10% 20px, 100% 100%;
        background-position: 5% 30px, 76% 30px, 97% 30px, 0 0;
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
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    .filtreye-degistir-svg{
        width: 15px;
        position: absolute;
        left: 15px;
        top: 32px;
        transform: rotateZ(90deg);
        cursor: pointer;
    }
    .filtreye-degistir-svg:hover + .filtreleri-goruntule-tooltip{
        display: block !important;
    }
    .filtreleri-goruntule-tooltip{
        display: none;
        position: absolute;
        top: 28px;
        font-size: 11px !important;
        font-weight: 800;
        text-transform: uppercase;
        background: #797979;
        color: white;
        border: 1px solid #797979;
        border-radius: 10px;
        padding: 5px 10px;
    }
    .rotate-urunustbar{
        transform: rotateX(180deg);
    }
    .flip-card-back{
        transform: rotateX(180deg);
        margin-left: -24px;
    }
    /* belirli sure filtre goruntulemek icin bildiri popup-i gosterilecek START */
    .filtre-goruntule-bildirim{
        position: absolute;
        font-size: 15px;
        bottom: 70px;
        left: -10px;
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
    .triangle-down{
        position: absolute;
        top: 38px;
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
</style>