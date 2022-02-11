Bu sayfadaki puf noktalar:
1 - siparisler yuklenene(success donene) kadar 'bekleniyor' yazisi showSiparisBekleniyor ile gosteriliyor;
    showSiparisBekleniyor - false olmasi 'bekleniyor' yazisi gosteriliyor demektir
2 - siparislerde hata(fail donerse) olursa 'beklenmedik hata olustu' yazisi showGecmisSiparisHataIcerik ile gosteriliyor;
    hata oldugunda showSiparisBekleniyor - true oldugundan 'gecmis siparisleriniz bulunmamaktadir' yazisi da gorunuyor
    'beklenmedik hata olustu' yazisi ile 'gecmis siparisleriniz bulunmamaktadir' yazisi ayni anda gorunmesin diye;
        'gecmis siparisleriniz bulunmamaktadir' yazisi showGecmisSiparisHataIcerik - true oldugunda gorunmeyecek
3 - datalarin sirayla true/false olma yapisi sorunsuz calisiyor. kullaniciya daha anlasilir detaylar gosterilmede faydali
<template>
    <div v-cloak>
        <h4 class="mt-4 mb-4"><span class="first-word">G</span>eçmiş Siparişlerim</h4>
        <!-- {{filtreId}} - {{gecmisSiparislerim}} -->

        <div v-if="!showSiparisBekleniyor" class="row text-muted ml-0">
            <span>Bekleniyor...</span>
        </div>
        <div v-if="showGecmisSiparisHataIcerik" class="text-muted ml-0">
            <span>Beklenmedik bir hata oluştu <span class="uzgun">:(</span></span>
            <ul>
                <li>Sayfayı yenileyip tekrar deneyin.</li>
                <li>Oturumunuzu kapatıp tekrar giriş yapın.</li>
            </ul>
        </div>
        {{baglantiDurumu()}}
        <div v-if="showInternetBagliMi" class="row ml-0">
            <p class="note note-danger baglanti-durumu"><strong>Bağlantı hatası:</strong> İnternete bağlı değilsiniz. Lütfen bağlantınızı kontrol edip tekrar deneyin.</p>
        </div>

        <!-- <div v-for="gecmis in gecmisSiparislerim.response" :key="gecmis.id" class="row text-muted ml-0">
            <div v-if="gecmis.siparisler==''">
                <span>Geçmiş siparişleriniz bulunmamaktadır.</span>
            </div>
        </div> -->
        
        <div v-if="showSiparisBekleniyor" id="profilSiparislerimID">
            <div v-for="gSiparislerim in gecmisSiparislerim.response" :key="gSiparislerim.id">
                <div v-for="gecmis in gSiparislerim.siparisler" :key="gecmis.id">
                    <!-- her div-e tiklandiginda bir tek o div-e ait icerigin show/hide-i olacagi icin yeni component olusturuldu ve gerekli datalar props ile gecildi -->
                    <ProfilSiparislerimIcerik :gecmis="gecmis" />
                </div>
                <div v-if="gSiparislerim.siparisler==''" class="row text-muted ml-0">
                    <span v-if="!showGecmisSiparisHataIcerik">Geçmiş siparişleriniz bulunmamaktadır.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfilSiparislerimIcerik from "@/components/ProfilSiparislerimIcerik"
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    props : ["filtreId"],
    data(){
        return{
            gecmisSiparislerim : [],
            showGecmisSiparisHataIcerik : false,
            showInternetBagliMi : false,
            // cookie bilgileri START
            uid : "",
            utel : "",
            // cookie bilgileri END
        }
    },
    components : {
        ProfilSiparislerimIcerik
    },
    computed : {
        ...mapGetters(["serverRequest","showSiparisBekleniyor"]),
    },
    methods : {
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
        },
        async fetchGecmisSiparislerim(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'past_orders_with_paging');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('filtre', this.filtreId);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.gecmisSiparislerim = response.data
                // console.log("sorgu yapildi")
            } catch (error) {
                this.errors.push(error)
            }
            if(this.gecmisSiparislerim.status == "fail"){
                this.$store.commit('addShowSiparisBekleniyor', false)
                setTimeout(() => {
                    this.showGecmisSiparisHataIcerik = true
                    if(this.showGecmisSiparisHataIcerik === true){
                        this.$store.commit('addShowSiparisBekleniyor', true)
                    }
                }, 4000)
            }
            else if(this.gecmisSiparislerim.status == "success"){
                this.$store.commit('addShowSiparisBekleniyor', true)
            }
        },
        baglantiDurumu(){
            if(navigator.onLine){
                return '';
            }else{
                this.$store.commit('addShowSiparisBekleniyor', true)
                this.showInternetBagliMi = true
            }
        }
    },
    watch: {
        filtreId(val) { // ProfilSiparislerimPage.vue-dan filtre degisirse sorgu tekrardan yapilsin
            // data degistiginde bir seyler yapilir
            if(val) {
                this.fetchGecmisSiparislerim()
                // console.log("degisti")
            }
        },
    },
    created(){
        this.fetchGecmisSiparislerim()
        this.$store.commit('addShowSiparisBekleniyor', false)
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 990px){
        #profilSiparislerimID{
            margin-bottom: 40px;
        }
    }
    .first-word{
        text-decoration: underline;
    }
    .baglanti-durumu{
        font-size: 15px;
    }
    .uzgun{
        position: absolute;
        margin-left: 10px;
        font-weight: 400;
        transform: rotateZ(90deg);
    }
</style>