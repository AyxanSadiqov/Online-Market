Bu sayfadaki puf noktalar:
1 - Horizontal olarak smooth scroll yazildi.
2 - Bu sayfanin child-i VitrinMenu.vue ve VitrinGruplar.vue
3 - watch ile adresin degistigini anlik olarak anlayabildigimiz icin, adres degisimi sonrasi yeni sorgu yapiliyor ve vitrindeki urunler yenileniyor.
    yenilenen urunlerden de image 404 not found hatasi geliyor. simdilik sebebini anlayamadim. ama isleyiste sıkıntı olmadigi icin oyle duruyor.
4 - VitrinGruplar bu componentin icinde tanimlandi. Sebebi de VitrinGruplar-in icinde bir daha sorgu fala yapilmamasi icin.
    (Vitrinler icin sorgu burada yapiliyordu. VitrinGruplar ve VitrinMenu-ye props olarak gonderiliyordu.)
    vitrinler surekli props olarak gittigi icin adres degisimi sonra VitrinGruplarin icindeki eski urunlerin uzerine yeni urunler yaziliyor niyeyse.
    bu yuzden sorgu iki tarafta da(yani Vitrin.vue ve VitrinGruplar.vue) yapildi.
<template>
    <div v-cloak>
        <!-- <div v-for="vitrin in vitrinler" :key="vitrin.id">
            <div v-for="vit in vitrin.vitrindetay" :key="vit.id">
                <div v-if="vit.vitringrup==vitrinMenuId">
                    {{vit.vitringrup}} - {{vit.ad}}
                </div>
            </div>
        </div> -->
        <div class="row m-4 urunler-mobile">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12">
                <div class="d-flex justify-content-between noselect">
                    <div class="vitrin-yazi-baslik">İlginizi Çekebilecek Ürünler</div>
                    <div class="vitrin-right-left-icons">
                        <span class="prev" @click="scrollToLeft()">&#10094; </span>
                        <span class="next" @click="scrollToRight()">&#10095; </span>
                    </div>
                </div>
                <VitrinMenu :vitrinler="vitrinler" @vitrinmenuid="vitrinMenuIdMi" />
                <div v-if="showYukleniyor" class="text-center">Yükleniyor...</div>
                <div v-if="!showYukleniyor" class="vitrin-urunler" id="vitrinlerID">
                    <div class="blurred"></div>
                    <div v-for="vitrin in vitrinler" :key="vitrin.id">
                        <div v-for="vit in vitrin.vitrindetay" :key="vit.id + vit.vitringrup" class="vitrinler">                        
                            <transition name="fade">
                                <div v-if="vit.vitringrup==vitrinMenuId" class="card mb-3 urunler-col float-left" :style="altgrupUrunlerShadow">
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
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>

        <VitrinGruplar
            :vitrinler="vitrinler"
            :udep="udep"
            :ushp="ushp"
            :vitrinEnGrupAdlar="vitrinEnGrupAdlar"
        />
    </div>
</template>

<script>
import AdetInputveSepeteEkleButton from "@/components/AdetInputveSepeteEkleButton"
import VitrinMenu from "@/components/VitrinMenu"
import VitrinGruplar from "@/components/VitrinGruplar"
import IndirimYazisi from "@/components/IndirimYazisi"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data(){
        return{
            vitrinler : [],
            errors : [],
            // cookie bilgileri START
            ushp : "",
            udep : "",
            // cookie bilgileri END
            showYukleniyor : true, // sorgu beklenene kadar ki sure zarfinda gorunecek loading svg show/hide-i icin
            vitrinMenuId : 1, // child-dan (yani VitrinMenu.vue)-dan gelen data buraya yazilir
            // VitrinGruplar-a gonderilecek datalar START
            vitrinEnGrupAdlar : [],
            // VitrinGruplar-a gonderilecek datalar END
        }
    },
    components : {
        AdetInputveSepeteEkleButton,
        VitrinMenu,
        VitrinGruplar,
        IndirimYazisi
    },
    computed : {
        ...mapGetters(["altgrupUrunleer","altgrupUrunlerShadow","serverRequest","imagecompany","image",
            "adresDegisti"]),
    },
    methods : {
        scrollToRight(){ // vitrinler alaninda saga dogru scroll icin
            let pos = document.querySelector('#vitrinlerID') // scroll yapilacak div-in id-si alinir
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
        scrollToLeft(){ // vitrinler alaninda sola dogru scroll icin
            let pos = document.querySelector('#vitrinlerID') // scroll yapilacak div-in id-si alinir
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
        async fetchVitrin(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_vitrin_data');
                formData.append('deposahip', this.ushp);
                formData.append('depo', this.udep);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.vitrinler = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
                this.vitrinGruplar(response.data)
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
            if(this.vitrinler != []){
                this.showYukleniyor = false
            }
            // console.log("sorgu yapildi")
        },
        // VitrinGruplar.vue-da gonderilmesi,kullanilmasi icin gerekli islemlerin yapildigi fonksiyon
        vitrinGruplar(vitrinler){
            this.vitrinEnGrupAdlar = [] // onemli: grup sayilari birbirinin uzerine yazilmasin diye sifirlaniyor ilk basta
            var vitrin_engruplar = [];
            vitrinler.map((item) => { // sorgudan gelen vitrinengruplar-i aliyoruz
                vitrin_engruplar.push(item.vitrinengruplar)
            })
            vitrin_engruplar[2].map((item) => { // ikinci index sorgudaki vitrinengruplara denk geliyor
                // grupsira; o gruba ait urunleri listelemek icin gerekli id-dir. o yuzden child component-e bu id gonderilir
                this.vitrinEnGrupAdlar.push({grupsira: item.grupsira, ad: item.ad})
            })
            // console.log(this.vitrinEnGrupAdlar)
        },
        getUid_Udep(){
            this.ushp = this.decryptCookie("ushp")
            this.udep = this.decryptCookie("udep")
        },
        vitrinMenuIdMi(params){ // SepetOdemeVerticalMenu.vue-dan yani child-dan gelen data burada yazilir
            this.vitrinMenuId = params
        },
    },
    watch: {
        adresDegisti(val) { // profil adreslerimden basarili sekilde adres degisimi yapilirsa
            // data degistiginde bir seyler yapilir
            if(val) {
                this.fetchVitrin()
                // console.log("degisti")
            }
        },
    },
    created(){
        this.fetchVitrin()
    }
}
</script>

<style scoped src="@/assets/css/vitrin.css"></style>
<style scoped>
    [v-cloak] > * { display:none; }
</style>