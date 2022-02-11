Bu sayfadaki puf noktalar:
1 - Bos
2 - Kullanim disi simdilik
<template>
    <div>
        <div class="pt-4 d-flex justify-content-center">
            <span class="title mask waves-effect waves-light">Haftanın Fırsatları</span>
        </div>
        <div class="row m-4">
            <div v-for="urun in tumHaftaninfirsatlari" :key="urun.id" class="col-md-3">
                <div class="card mb-3">
                    <div class="view zoom overlay flex-center">
                        <img class="img-fluid w-100 first" :src="require('@/assets/img/' + urun.image)" alt="">
                        <router-link :to="{ name : 'HaftaninfirsatlariPage', params : {url:urun.url} }">
                            <div class="mask flex-center waves-effect waves-light">
                                <img class="img-fluid w-100 second" :src="require('@/assets/img/' + urun.image)" alt="">
                                <div class="mask rgba-black-slight"></div>
                            </div>
                        </router-link>
                    </div>
                    <div class="card-body text-center"> 
                        <h6 class="min-height-name">{{ urun.name }}</h6>
                        <p class="small text-muted text-uppercase mb-2">{{ urun.mark }}</p>
                        <hr>
                        <h6 class="mb-3">
                            <span class="text-danger">{{ urun.price }} TL </span>
                            <span class="text-grey"><s>95.99 TL</s></span>
                        </h6>
                        <button @click="sepeteEkle(urun)" type="button" class="btn btn-primary btn-sm mr-1 mb-2">
                            <i class="fas fa-shopping-cart pr-2"></i>Sepete ekle
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mesajlar START -->
        <transition name="slide-fade">
            <div v-if="showUrunEklendi" class="alert alert-success urun-eklendi" role="alert">
                <i class="fas fa-check"></i> Ürün sepetinize <strong>eklendi.</strong>
            </div>
        </transition>
        <!-- Mesajlar END -->

        <div class="ml-5 mb-5"> <!-- localStorage -->
            Local Storage : <br>
            Urun resimi ; <b>{{get_localStorage_image()}}</b><br>
            Urun adi ; <b>{{get_localStorage_name()}}</b><br>
            Urun fiyati ; <b>{{get_localStorage_price()}}</b>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            showUrunEklendi : false
        }
    },
    computed : mapGetters(["tumHaftaninfirsatlari"]),
    methods : {
        sepeteEkle(urun){
            localStorage.image = urun.image; // localStorage
            localStorage.name = urun.name; // localStorage
            localStorage.price = urun.price; // localStorage
            this.$emit("sepeteekle", urun)
            this.showUrunEklendi = true
            if(this.showUrunEklendi==true){
                setTimeout(() => this.showUrunEklendi = false, 2000)
            }
        },
        get_localStorage_image(){ // localStorage
            return localStorage.image // localStorage
        }, // localStorage
        get_localStorage_name(){ // localStorage
            return localStorage.name // localStorage
        }, // localStorage
        get_localStorage_price(){ // localStorage
            return localStorage.price // localStorage
        } // localStorage
    }
}
</script>

<style scoped>
    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
    .title{
        font-family: FreeMono, monospace;
        font-weight: bold;
        text-align: center;
        border-radius: 5px;
        background-image: url("~@/assets/svg/haftaninfirsatlari.svg");
        background-size: 1400px;
        color: white;
        width: 100%;
        margin: 0px 70px 0px 90px;
        padding: 10px 0px 10px 0px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
        transition: all 0.8s ease;
    }
    .title:hover{
        background-size: 1300px;
    }
    .urun-eklendi{
        z-index: 9999;
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
    img.first{
        max-width: 200px;
    }
    img.second{
        max-width: 230px;
    }
    .min-height-name{
        min-height: 70px;
        max-height: 70px;
    }
</style>