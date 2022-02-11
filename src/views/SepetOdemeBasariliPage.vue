Bu sayfadaki puf noktalar:
1 - Browser geri tusuna basilirkenki kontrol ilk burada yapildi.
<template>
    <div>
        <div class="row m-4 d-flex justify-content-center">
            <div class="col-md-6 col-12 col-sm-12">
                <div class="card rgba-green-strong text-center z-depth-1">
                    <div class="card-body">
                        <p class="white-text mb-0 siparis-basarili-baslik">
                            <img src="@/assets/svg/siparis-basarili-icon.svg" width="70" height="70" alt="">    
                            <span>SİPARİŞİNİZ BAŞARILI ŞEKİLDE OLUŞTU</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-md-10 col-12 col-sm-12">
                <div class="row m-4">
                    <div v-for="sepet in siparisBasarili.sepet" :key="sepet.id" class="col-md-6 col-12 col-sm-12 mb-3">
                        <div class="text-center z-depth-1 basarili-sepet">
                            <div class="row">
                                <!-- arama yaparken urun bilgisi icinde stokkod degil de stok_kodu bilgisi oldugu icin sepet buttonda gosterirken resim bulunsun diye eklenen kontrol -->
                                <div v-if="sepet.barkod!=null" class="col-md-2 col-2 col-sm-2 sepet-image">
                                    <img v-if="sepet.barkod.length < 8" :src="imagecompany + ushp + '/' + sepet.barkod + '.jpeg?' + sepet.imageupdate" class="img-width" alt="">
                                    <img v-else :src="image + sepet.barkod + '.jpeg?' + sepet.imageupdate" class="img-width" alt="">
                                </div>
                                <div v-if="sepet.barkod==null" class="col-md-2 col-2 col-sm-2 sepet-image">
                                    <img :src="image + sepet.stok_kodu + '.jpeg?' + sepet.imageupdate" class="img-width" alt="">
                                </div>
                                <div class="col-md-7 col-7 col-sm-7 text-left sepet-ad">
                                    {{sepet.ad}}
                                    <p>({{ sepet.adet }} Adet x {{ sepet.satisfiyat }} TL) = {{ (sepet.satisfiyat * sepet.adet).toFixed(2) }} TL</p>
                                </div>
                                <div class="col-md-3 col-3 col-sm-3 sepet-fiyat">
                                    <span class="fiyat"></span>
                                    <p>{{ (sepet.satisfiyat * sepet.adet).toFixed(2) }} TL</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-content-center mb-4">
                    <div class="col-md-6 col-10 col-sm-10 z-depth-1 odeme-basarili-sepet-ozeti">
                        <div class="d-flex justify-content-between">
                            <span>Ara toplam</span>
                            <div v-if="siparisBasarili.k_varmi !='[]'">{{(siparisBasarili.indirimsiztutar-siparisBasarili.poset).toFixed(2)}} TL</div>
                            <div v-else>{{siparisBasarili.ara_toplam}} TL</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Poşet tutarı</span>
                            <div>{{siparisBasarili.poset}} TL</div>
                        </div> <hr>
                        <div class="d-flex justify-content-between">
                            <span>Toplam</span>
                            <div>
                                <del v-if="siparisBasarili.k_varmi !='[]'">{{siparisBasarili.indirimsiztutar}} TL</del> 
                                {{siparisBasarili.toplam}} TL
                            </div>
                        </div>
                        <div class="d-flex justify-content-between kazanc">
                            <span>Kazancınız</span>
                            <div>{{siparisBasarili.kazanc}} TL</div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-4">
                    <button @click="anaSayfayaDon()" type="button" class="btn btn-success">Ana sayfa'ya gerİ dön</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    metaInfo() {
        return{
            title: 'Başarılı',
            titleTemplate: '%s | Siparişiniz Bize Ulaşmıştır...'
        }
    },
    data(){
        return{
            // cookie bilgileri START
            ushp : "",
            // cookie bilgileri END
        }
    },
    mounted () {
        // odeme basarili sayfasinda browser-in back tusu ile geriye gidilmek istendiginde dogal olarak bir onceki sayfa olan
        // sepetodeme-ye gidiliyordu. popstate ile bu olaya(event) erisim saglanir ve yazilan fonksiyon ile back-e basildiginda
        // bir onceki sayfaya degil de istenilen sayfaya yonlendirilme yapilir.
        addEventListener('popstate', this.birOncekiSayfaErisimKontrolu)
    },
    beforeUnmount () {
        removeEventListener('popstate', this.birOncekiSayfaErisimKontrolu)
    },
    // sayfa render olmadan SepetPage degeri bos mu diye kontrol edilir. bos ise ana sayfaya yonlendirilir. tek gosterimlik sayfa olsun diye boyle yapildi
    beforeMount(){
        if(this.siparisBasarili === ""){
            this.$router.push({name: 'Home'})
        }
    },
    computed : {
        ...mapGetters(["image","imagecompany","siparisBasarili","sepetOzeti"]),
    },
    methods: {
        anaSayfayaDon(){ // ana sayfaya donerken onceden tutulan bilgiler sifirlanir
            this.$store.commit('addSiparisBasarili',{sepet:""})
            this.$router.push({name: 'Home'})
        },
        getUid_Udep(){
            this.ushp = this.decryptCookie("ushp")
        },
        // browser-dan bir onceki sayfaya gitmek istendiginde normalde sepet odeme sayfasi yerine belirlenen sayfaya gonderilir
        birOncekiSayfaErisimKontrolu(){
            this.$router.push({name: 'SepetPage'})
        },
    },
    created(){
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    @media (max-width : 500px){
        .row{
            font-size: 13px;
            margin: 0 -15px;
        }
        .siparis-basarili-baslik span{
            display: block;
            font-size: 19px;
        }
        .basarili-sepet{
            margin: 0 -20px;
        }
        .sepet-ad p{
            font-size: 12px;
        }
    }
    .row{
        font-family: 'Trebuchet MS', sans-serif;
    }
    .siparis-basarili-baslik{
        font-size: 22px;
    }
    .basarili-sepet{
        border: 1px solid white;
        border-radius: 5px;
        background: white;
        color: black;
        min-height: 130px;
        max-height: 130px;
        font-size: 14px;
        transition: .5s;
    }
    .sepet-image{
        margin-top: 10px;
        padding: 25px 0 25px 20px;
    }
    .sepet-ad{
        margin-top: 8px;
        padding: 25px;
    }
    .sepet-ad p{
        color: #7c7c7c;
    }
    .sepet-fiyat{
        margin-top: 1px;
        padding-top: 35px;
    }
    .basarili-sepet:hover{
        border: 1px solid white;
        border-left-color: #00C851;
        border-left-width: 10px;
    }
    .fiyat{
        opacity: .9;
        position: relative;
        top: -30px;
        border-radius: 5px;
        padding: 15px;
        background: #00C851;
        transition: .5s;
    }
    .basarili-sepet:hover .fiyat{
        opacity: 1;
    }
    .odeme-basarili-sepet-ozeti{
        border: 1px solid white;
        border-radius: 5px;
        background: white;
        color: black;
        font-size: 14px;
        padding: 20px;
        transition: .5s;
    }
    .odeme-basarili-sepet-ozeti:hover{
        border: 1px solid white;
        border-left-color: #00C851;
        border-left-width: 7px;
        border-right-color: #00C851;
        border-right-width: 7px;
    }
    .kazanc{
        color: #00C851;
        font-weight: 400;
    }
    del{
        color: #747474;
    }
    .img-width{
        max-width: 55px;
        max-height: 75px;
        object-fit: contain;
    }
</style>