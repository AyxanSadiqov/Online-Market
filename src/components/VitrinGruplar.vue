Bu sayfadaki puf noktalar:
1 - scroll icin unique id gerekli oldugu icin ":id="'vitrinlerID'+vitrin.grupsira"" boyle mantikla yaklasildi olaya
<template>
    <div v-cloak>
        <div class="row m-4 urunler-mobile">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12">
                <div class="vitrin-grup-yazi-baslik"><span>En çok satan kategoriler</span></div>
            </div>
            <div class="col-md-1"></div>
        </div>
        <div v-for="vitrin in vitrinEnGrupAdlar" :key="vitrin.id">
            <!-- <div v-for="vitriin in vitrinler" :key="vitriin.id">
                <div v-for="vit in vitriin.vitrinengrup1" :key="vit.id + vit.vitringrup">
                    {{vit.ad}}
                </div>
            </div> -->
            <div class="row m-4 urunler-mobile">
                <div class="col-md-1"></div>
                <div class="col-lg-10 col-md-12">
                    <div class="d-flex justify-content-between noselect">
                        <div class="vitrin-yazi-baslik">{{ vitrin.ad }}</div>
                        <div class="vitrin-right-left-icons">
                            <span class="prev" @click="scrollToLeft(vitrin)">&#10094; </span>
                            <span class="next" @click="scrollToRight(vitrin)">&#10095; </span>
                        </div>
                    </div>
                    
                    <div class="vitrin-urunler" :id="'vitrinlerID'+vitrin.grupsira">
                        <div class="blurred"></div>
                        <div v-for="vitriin in vitrinler" :key="vitriin.id">
                            <div v-for="vit in vitriin.vitrinengrupdetay" :key="vit.id" class="vitrinler">                        
                                <div v-if="vit.vitringrup==vitrin.grupsira" class="card mb-3 urunler-col float-left" :style="altgrupUrunlerShadow">
                                    <router-link :to="{ name : 'UrunPage', params : {urun_ad:vit.ad, g_id:vit.grup, g_ad:vit.grupad, altg_id:vit.altgrup, altg_ad:vit.altgrupad} }">
                                        <div class="zoom flex-center max-width-img">
                                            <img v-if="vit.barkod.length < 8" class="img-fluid w-100 first" :src="imagecompany + ushp + '/' + vit.barkod + '.jpeg?' + vit.imageupdate" alt="">
                                            <img v-else class="img-fluid w-100 first" :src="image + vit.barkod + '.jpeg?' + vit.imageupdate" alt="">
                                        </div>
                                    </router-link>
                                    <router-view />
                                    <IndirimYazisi :urun="vit" v-if="vit.kampanyalimi==1" />
                                    <div class="card-body text-center" :style="altgrupUrunleer">
                                        <h6 class="min-height-name">{{ vit.ad }}</h6>
                                        <hr style="background-color:white">
                                        <h6 class="mb-3">
                                            <span class="text-danger">{{ vit.satisfiyat }} TL</span>
                                            <span v-if="vit.kampanyalimi==1" class="ml-1 text-grey"><s>{{ vit.kampanyasizsatisfiyat }} TL</s></span>
                                        </h6>
                                        <div class="urunler-adet-input">
                                            <AdetInputveSepeteEkleButton :liste="vit" />
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
    </div>
</template>

<script>
import AdetInputveSepeteEkleButton from "@/components/AdetInputveSepeteEkleButton"
import IndirimYazisi from "@/components/IndirimYazisi"
import { mapGetters } from 'vuex'

export default {
    props : ["vitrinler","udep","ushp","vitrinEnGrupAdlar"],
    data(){
        return{}
    },
    components : {
        AdetInputveSepeteEkleButton,
        IndirimYazisi
    },
    computed : {
        ...mapGetters(["altgrupUrunleer","altgrupUrunlerShadow","serverRequest","imagecompany","image"]),
    },
    methods : {
        scrollToRight(vitrin){ // vitrinler alaninda saga dogru scroll icin
            let pos = document.querySelector('#vitrinlerID'+vitrin.grupsira) // scroll yapilacak div-in id-si alinir
            // horizantal olarak smooth scroll icin islemler yapildi asagida
            let scrollAmount = 0
            var slideTimer = setInterval(() => {
                pos.scrollLeft += 60
                scrollAmount += 60
                if(scrollAmount >= 600){
                    window.clearInterval(slideTimer)
                }
            }, 25)
            // pos.scrollLeft += 50
        },
        scrollToLeft(vitrin){ // vitrinler alaninda sola dogru scroll icin
            let pos = document.querySelector('#vitrinlerID'+vitrin.grupsira) // scroll yapilacak div-in id-si alinir
            // horizantal olarak smooth scroll icin islemler yapildi asagida
            let scrollAmount = 0
            var slideTimer = setInterval(() => {
                pos.scrollLeft -= 60
                scrollAmount += 60
                if(scrollAmount >= 600){
                    window.clearInterval(slideTimer)
                }
            }, 25)
            // pos.scrollLeft += 50
        },
    },
}
</script>

<style scoped src="@/assets/css/vitrin.css"></style>
<style scoped>
    [v-cloak] > * { display:none; }
</style>