Bu sayfadaki puf noktalar:
1 - params ile veri aktarimi var
<template>
    <div v-cloak>
        <div class="mevcut-bolge">
            <!-- <MevcutBolgeSecimi /> -->
        </div>
        <!-- {{ $t('welcome') }} -->
        <div class="row m-4">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12">
                <div v-if="showYukleniyor" class="row urunler-mobile">
                    <div v-for="sc in sceleton" :key="sc.id" class="col-lg-2 col-md-2 col-sm-3 col-6 mb-3">
                        <div class="each skeleton-card"></div>
                    </div>
                </div>
                <div v-for="liste in gruplar" :key="liste.id" class="row urunler-mobile">
                    <div v-for="grup in liste.gruplar" :key="grup.id" class="col-lg-2 col-md-2 col-sm-3 col-6 mb-3">
                        <router-link :to="{ name : 'AltgruplarPage', params : {id:grup.id, g_ad:grup.ad} }">
                            <div class="view each grup-col" :style="gruplarCard">
                                <img class=" w-100 first" :src="grupimage + grup.resim + '.png?' + grup.imageupdate" alt="">
                                <a href="#!" class="text-dark">
                                <div class="mask card-mask-color">
                                    <div class="d-flex align-items-end h-100 p-3">
                                    <h6 class="mb-0" :class="gruplarAd">{{ grup.ad }}</h6>
                                    </div>
                                </div>
                                </a>
                            </div>
                        </router-link>
                        <router-view />
                    </div>
                </div>

                <div v-if="showCikisYapildiMi">
                    <CikisYapildiMesaji :showCikisYapildiMi="showCikisYapildiMi" />
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>

        <!-- Deneme alanim START -->
        <div v-if="showDenemeAlanim" class="deneme-alanim">
            <div><code>lastModified</code> --> {{ lastModified() }}</div>
            <div><code>documentURI</code> --> {{ documentURI() }}</div>
            <div><code>baseURI</code> --> {{ baseURI() }}</div>
            <div><code>cookie</code> --> {{ cookie() }}</div>
        </div>
        <!-- Deneme alanim END -->
    </div>
</template>

<script>
import CikisYapildiMesaji from "@/components/CikisYapildiMesaji"
// import MevcutBolgeSecimi from "@/components/MevcutBolgeSecimi"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data(){
        return{
            gruplar : [],
            errors : [],
            showDenemeAlanim : false,
            showCikisYapildiMi : false,
            showYukleniyor : true,
            sceleton : 15,
            // cookie bilgileri START
            udep : "",
            utel : "",
            uid : "",
            // cookie bilgileri END
            koordinat : "",
        }
    },
    components : {
        CikisYapildiMesaji,
        // MevcutBolgeSecimi,
    },
    methods : {
        // // tiklanilan grup adini url-de kullanilabilecek hale getirme islemi START
        // nextPage(grup){
        //     var strUrl = this.turkishtoEnglish(grup.ad).toLowerCase()
        //     this.$router.push({ name : 'AltgruplarPage', params : {id:grup.id, g_ad:strUrl} })
        // },
        // // g - global, i - insensitive-den gelir. tek g oldugunda buyuk harfe duyarli olmuyor, gi oldugunda duyarli oluyor
        // turkishtoEnglish(kelime) {
        //     return kelime.replace(/Ğ/gi,'g')
        //         .replace(/Ü/gi,'u')
        //         .replace(/Ş/gi,'s')
        //         .replace(/I/gi,'i')
        //         .replace(/İ/gi,'i')
        //         .replace(/Ö/gi,'o')
        //         .replace(/Ç/gi,'c')
        //         .replace(/ğ/gi,'g')
        //         .replace(/ü/gi,'u')
        //         .replace(/ş/gi,'s')
        //         .replace(/ı/gi,'i')
        //         .replace(/ö/gi,'o')
        //         .replace(/ç/gi,'c')
        //         .replace(/ /gi,'-')
        //         .replace('-/-','-')
        //         .replace('/','-')
        //         .replace('--','-')
        // },
        // // tiklanilan grup adini url-de kullanilabilecek hale getirme islemi END
        getKoordinat(){
            this.koordinat = localStorage.getItem("koord")
        },
        async fetchGruplar(){
            this.getKoordinat()
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'web_get_init_data');
                formData.append('depo', this.koordinat);
                formData.append('os', 'web');
                formData.append('version', '1');
                formData.append('fbid', '0');
                formData.append('teslimattip', '1');
                var getUserInLocal = localStorage.getItem("user")
                if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
                    formData.append('user', this.utel);
                    formData.append('uid', this.uid);
                }
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.gruplar = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
                // sepet sayfasinda adresin degistigini anlayip, sepet sayfasinda bir daha sorgu yapmak yerine zaten her basarili adres degisimi sonrasi..
                // ..watch ile izlenip gruplar yenilensin diye bir daha sorgu yapiliyor. sepet sayfasindaki ile bu sayfadaki sorgu ayni oldugundan, sepet sayfasi yerine..
                // ..burada parametersTab icerigi (her basarili adres degisimi sonrasi) dolduruluyor.
                // eger basarili sekilde adres degisimi yapilirsa sepet sayfasindaki hizmet bedeli, minimum siparis tutari gibi degerlerin guncellenmesi icin
                // bir daha sorgu yapilmak yerine, burada yani gruplar sayfasi icinde sorgu sonucu donen deger parametersTab yaziliyor(bir nevi guncelleniyor)
                // zaten parametersTab icindeki hizmet bedeli gibi degerler gosteriliyor (direkt sorgudan donen deger degil)
                this.$store.commit('addParametersTab',{minimumOrderPrice:this.gruplar})
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
            if(this.gruplar.status != ""){
                this.showYukleniyor = false
            }
            // console.log("sorgu yapildi")
        },
        getUid_Udep(){
            this.udep = this.decryptCookie("udep")
            this.utel = this.decryptCookie("utel")
            this.uid = this.decryptCookie("uid")
        },
        cikisYapildiMi(){
            if(localStorage.getItem("cks") == "10bHt10b3CUb"){
                this.showCikisYapildiMi = true // cikis yapildi mesaji show olur
                if(this.showCikisYapildiMi==true){
                    setTimeout(() => this.showCikisYapildiMi = false, 2000) // cikis yapildi mesaji 2 saniye icinde kaybolur
                }
                setTimeout(() => { // ve localdeki bu deger 1.5 saniye icinde kaybolur. bu da sayfa bir daha refresh olursa bu mesaj goruntulenemeyecek
                    localStorage.removeItem("cks")
                }, 1500)
            }
        },
        // Deneme alanim START
        lastModified(){
            return document.lastModified
        },
        documentURI(){
            return document.documentURI
        },
        baseURI(){
            return document.baseURI
        },
        cookie(){
            return document.cookie
        },
        // Deneme alanim END
    },
    computed : {
        ...mapGetters(["grupimage","gruplarCard","gruplarAd","serverRequest","adresDegisti"]),
    },
    watch: {
        adresDegisti(val) { // profil adreslerimden basarili sekilde adres degisimi yapilirsa
            // data degistiginde bir seyler yapilir
            if(val) {
                this.fetchGruplar()
                // console.log("degisti")
            }
        },
    },
    created(){
        this.fetchGruplar() // watch kullanildiktan sonra created oldugu anda ve watch ile birlikte iki kere sorgu gidiyor
        // document.cookie = "username=Ayxan Sadiqov; expires=Tue, 29 Dec 2020 09:46:00 UTC;"
        this.cikisYapildiMi()
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 400px){
        .row .urunler-mobile{
            margin-left: -35px;
            margin-right: -35px;
        }
        .grup-col{
            margin-left: -5px;
            margin-right: -5px;
        }
    }
    /* Deneme alanim START */
    .deneme-alanim{
        border: 2px solid;
        border-radius: 10px;
        padding: 10px;
        margin: 10px 30px 10px 30px;
    }
    .deneme-alanim:hover{
        border: 2px solid red;
    }
    /* Deneme alanim END */
    .each{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        margin: -3px -8px;
        min-height: 130px;
        max-height: 130px;
    }
    img.first{
        min-width: 50px;
        max-width: 75px;
        margin: auto;
    }
    .mask h6{
        font-size: 13px;
        font-weight: 800;
    }
    /* .gruplar-overlay{
        background-color: #2E2E2E;
        opacity: 0.7;
    } */
    .black-text{ /* wglobal-de */
        font-size: 15px;
        font-weight: 400;
    }
    .mevcut-bolge{
        margin-top: 30px;
    }

    /* skeleton loader START */
    .skeleton-card{
        background-image: radial-gradient(circle 20px, #ccc 100%, transparent),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(white, white);
        background-size: 48px 48px, 80% 15%, 190px 20px, 100% 100%;
        background-position: 50% 24px, 15px 100px, 15px 200px, 0 0;
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
    /* skeleton loader END */
</style>