Bu sayfadaki puf noktalar:
1 - neden 'kampanyalari goruntule' alanina tiklandiginda sorgu yapilmiyor? cunku asamalar arasi gecis yaparken her defasinda
kampanya alani gizleniyor ve her defa gostermek icin tiklandiginda sorgu yapiliyor. Bunun icin tek seferde sayfa render
oldugu zaman sorgu yapiliyor.
<template>
    <div v-cloak>
        <!-- Kampanya alani START -->
        <button v-if="showKampanyaBaslik" type="button" class="kampanya-goruntule w-100 mt-3 mb-2">
            <div @click="kampanyaGoruntule()" class="baslik">Kampanyaları görüntülemek için tıklayın</div>
        </button>
        <!-- Kosul saglaniyorsa otomatik olarak acilir modal START -->
        <div v-if="showKampanyaEklendi">
            <div class="arkafon" @click="modalKapat()">
                <div class="ownModal" @click="modalAcikTut">
                    <div class="baslik">
                        <span class="d-flex justify-content-center">
                            Kampanya Ödül
                            <button @click="modalKapat()" type="button" class="close" aria-label="Close"><span aria-hidden="true" class="black-text">&times;</span></button>
                        </span>
                    </div>
                    <div class="icerik">
                        <div class="row mb-1">
                            <div v-if="kampanyaIcerigi.barkod != null" class="col-md-3 col-3 col-sm-3 d-flex align-items-center resim-border">
                                <img v-if="kampanyaIcerigi.barkod.length < 8" :src="imagecompany + ushp + '/' + kampanyaIcerigi.barkod + '.jpeg'" class="img-width" alt="">
                                <img v-else :src="image + kampanyaIcerigi.barkod + '.jpeg'" class="img-width" alt="">
                            </div>
                            <div class="col-md-8 col-8 col-sm-8 d-flex align-items-center mt-1 ml-1">
                                <div class="kapmanya-icerigi">
                                    <strong>{{ kampanyaIcerigi.ad }}</strong> <br>
                                    <del> {{ (kampanyaIcerigi.satisfiyat * kampanyaIcerigi.adet).toFixed(2) }} TL</del>  <br>
                                    <span v-if="kampanyaIcerigi.odulfiyat!=0"> {{ (kampanyaIcerigi.odulfiyat * kampanyaIcerigi.adet).toFixed(2) }} TL</span>
                                    <span v-else> Ücretsiz</span>
                                </div>
                            </div>
                        </div>
                        <div class="kapmanya-aciklama mt-3">
                            Kampanya koşulu olan {{kampanyaIcerigi.siparislimit}} TL ve üzeri sepet miktarınız olduğu için sepetinizdeki
                            "{{ kampanyaIcerigi.ad }}" adlı ürün ile kampanyamızdan faydalandınız.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Kosul saglaniyorsa otomatik olarak acilir modal END -->
        <div v-if="showKampanyalar" class="kampanya-div mt-3 mb-2">
            <div class="baslik">Kampanyalar</div>
            <div v-for="kampanya in kampanyalar.kampanyalar" :key="kampanya.id">
                <KampanyaIcerik :kampanya="kampanya" :kampanyaID="kampanyaID" :showKampanyaYok="showKampanyaYok" />
                {{kampanyaVarsaEkle(kampanya)}}
            </div>
            <div class="kampanya-yok" v-if="showKampanyaYok">
                Kampanya mevcut değil
            </div>
        </div>
        <!-- Kampanya alani END -->
    </div>
</template>

<script>
import KampanyaIcerik from "@/components/KampanyaIcerik"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data(){
        return{
            kampanyalar : [],
            errors : [],
            showKampanyaBaslik : true,
            showKampanyalar : false,
            // cookie bilgileri START
            uid : "",
            utel : "",
            ushp : "",
            // cookie bilgileri END
            showKampanyaEklendi : false,
            kampanyaIcerigi : "",
            kampanyaID : "",
            showKampanyaYok : false,
        }
    },
    components : {
        KampanyaIcerik
    },
    computed : {
        ...mapGetters(["sepetOzeti","serverRequest","image","imagecompany","kampanyaninIDsi","toplamKazanc",
            "birlestirilebilir","birlestirilebilir","kampanyaVarMi","showKampanyaAlani","kazancList",
            "promosyonVarmi"]),
    },
    methods : {
        modalKapat(){
            this.showKampanyaEklendi = false
        },
        modalAcikTut(e){ // modal dışı degil de icine tiklandiginda modali acik tutmasi icin
            // stopPropagation() mevcut olayin yayilmasini engeller. Ancak, herhangi bir varsayılan davranışın oluşmasını engellemez;
            // örneğin, bağlantılara yapılan tıklamalar hala işlenir. Bu davranışları durdurmak istiyorsanız, preventDefault() yöntemi kullanilabilir
            e.stopPropagation()
            return false
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
            this.ushp = this.decryptCookie("ushp")
        },
        kampanyaGoruntule(){
            this.showKampanyaBaslik = false
            this.showKampanyalar = true
            this.fetchKampanyaCheck()
        },
        async fetchKampanyaCheck(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'kampanya_check');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('tutar', this.sepetOzeti.araToplam); // ara toplam
                formData.append('siparisdetay', JSON.stringify(this.sepetOzeti.sepetim));
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.kampanyalar = response.data
                if(this.kampanyalar.kampanyalar.length === 0){ // dizi uzunlugu 0'sa yani kapmanya yoksa
                    this.showKampanyaYok = true
                }
            } catch (error) {
                this.errors.push(error)
            }
            // console.log("kampanya sorgu")
        },
        kampanyaVarsaEkle(kampanya){
            // sorgudan gelen kampanyalarin birinci elemaninin adini almak icin gerekli islemler START
            var kampanyalar_dizi = []; var kampanyaAdlar = []
            this.kampanyalar.kampanyalar.map((item) => {
                kampanyalar_dizi.push(item)
            })
            kampanyalar_dizi.map((item) => {
                kampanyaAdlar.push(item.urun_ad) // sorgudan donen tum kampanya urun adlari bir diziye yazildi. artik dizinin 0ci elemani bizim isimizi gorur hale geldi
            })
            // sorgudan gelen kampanyalarin birinci elemaninin adini almak icin gerekli islemler END
            var localSepet = localStorage.getItem("sepet")
            var local = JSON.parse(localStorage.getItem("sepet")) // localdeki sepet parse edilmis olarak bir daha alinir
            local.map((item) => { // kampanya urunu kampanya disinda normal olarak sepete eklenmisse o urunun adetini kampanya odul adeti kadar indirmek icin map ile islem gorulur
                var sepetteki_kampanya_urun = item
                if(sepetteki_kampanya_urun.ad === kampanyaAdlar[0]){ // sepetteki tek o urunu almak icin..
                    if(sepetteki_kampanya_urun.kampanyalimi === 0 || sepetteki_kampanya_urun.kampanyalimi === '0'){ // ..eger urun sepete normal olarak eklenmisse..
                        if(kampanya.odul_adet <= sepetteki_kampanya_urun.adet){ // ..kampanya urun adeti sepetteki urunun adetinden kucuk esitse, yani iceriyorsa
                            var karsilastirma = JSON.stringify(sepetteki_kampanya_urun) // sepetteki eski degerle yeniyi ayirt edebilmek icin
                            sepetteki_kampanya_urun.kampanyalimi = 1 // kampanyali mi alani 0, 1 olarak degistirilir
                            var yeniLocal = localSepet.replace(karsilastirma,JSON.stringify(sepetteki_kampanya_urun))
                            localStorage.removeItem("sepet")
                            localStorage.setItem("sepet",yeniLocal)
                            this.showKampanyaEklendi = true
                            // sepet ozetinde kampanya eklendikten sonra gorunecek ustu cizgili toplam tutar ve indirimsiz fiyat hesaplamari START
                            var sepet_ozeti_indirimsiz_tutar = this.sepetOzeti.toplamTutar
                            var sepet_ozeti_toplam_tutar
                            if(this.kampanyaVarMi.show === false){ // eger daha oncesinde kamp veya prom eklenmemisse otomatik eklenen urun indirimi toplam tutardan cikilir
                                sepet_ozeti_toplam_tutar = (parseFloat(this.sepetOzeti.toplamTutar) - kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                                this.$store.commit('addKampanyaVarMi',{show:true}) // ustu cizgili toplam tutar gosterilir. asagidaki kosula girerse zaten true demektir
                            }
                            else if(this.kampanyaVarMi.show === true){ // eger daha oncesinde kamp veya prom eklenmisse otomatik eklenen urun indirimi kampanyali tutardan cikilir
                                sepet_ozeti_toplam_tutar = (parseFloat(this.showKampanyaAlani.kampanyaliTutar) - kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                            }
                            // sepet ozetinde kampanya eklendikten sonra gorunecek ustu cizgili toplam tutar ve indirimsiz fiyat hesaplamari END                       
                            // sepet odemedeki sepet ozeti alaninda kazanc alan guncellemeleri icin START
                            var toplam_kazanc
                            var indirim_miktar = (kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                            if(this.toplamKazanc.kazanc == null || this.toplamKazanc.kazanc === ""){ // daha onceden kapmanya eklenmemisse yani kazanc hizmet bedeline esitse >>
                                var kazanc_icin_hesaplama = indirim_miktar // tiklanan urunun indirim miktari
                                // >> toplam kazancimiz hizmet bedeli ile indirim miktarinin toplamina esit olur
                                toplam_kazanc = (parseFloat(this.sepetOzeti.hizmetBedeli) + parseFloat(kazanc_icin_hesaplama)).toFixed(2)
                            }else{ // kampanya ekliyse, toplam kazanc; bir onceki kazanc ile tiklanan urunun indirim miktarinin toplamina esit olur
                                toplam_kazanc = (parseFloat(this.toplamKazanc.kazanc) + parseFloat(indirim_miktar)).toFixed(2)
                            }
                            // sepet odemedeki sepet ozeti alaninda kazanc alan guncellemeleri icin END
                            this.$store.commit('addShowKampanyaAlani',{kampanyaliIndirimsizTutar:sepet_ozeti_indirimsiz_tutar,
                                kampanyaliTutar:sepet_ozeti_toplam_tutar})
                            this.$store.commit('addKazanc',{kazanc:toplam_kazanc})
                            // kazanc yanindaki unlem icon-ununa tiklandiginda acilacak div iceriginin doldurulmasi icin START
                            var kmpkznc = kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat)).toFixed(2)
                            if(this.promosyonVarmi === false){
                                this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:kmpkznc})
                            }else if(this.promosyonVarmi === true){
                                this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:kmpkznc, promosyon:this.kazancList.promosyon})
                            }
                            // kazanc yanindaki unlem icon-ununa tiklandiginda acilacak div iceriginin doldurulmasi icin END
                            // modal icinde gorunecek alan icin START
                            var urun_detay = JSON.parse(kampanya.urundetay)
                            var sepeteEklenenKampanyaUrunu = '"id":"'+urun_detay.id+'","stokkod":"'+kampanya.odul_urun+'","barkod":"'+kampanya.odul_barkod+'","ad":"'+kampanya.urun_ad+'","satisfiyat":"'+kampanya.urun_satisfiyat+'","odulfiyat":"'+kampanya.odul_urunfiyat+'","adet":'+kampanya.odul_adet+',"siparislimit":'+kampanya.kosul_siparislimit+''
                            var parantezlieklenenUrun = "{"+sepeteEklenenKampanyaUrunu+"}" // {} parantezli hale geri getirilir
                            this.kampanyaIcerigi = JSON.parse(parantezlieklenenUrun) // html modal icinde eklenen urunu gostermek icin
                            // her ekleye basildiginda o urun ileride gerekli kontroller icin bir dizide tutulur
                            this.$store.commit('addKampanyaDizisi',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                                birlestirilebilir:kampanya.birlesim})                          
                            // modal icinde gorunecek alan icin END
                            this.kampanyaID = kampanya.id
                            // sepet olustururken gonderilen kampanya id-si diziye ayni id birden fazla eklenmesin diye START
                            var str_kampanyaid = JSON.stringify(this.kampanyaninIDsi)
                            if(str_kampanyaid.includes(kampanya.id)){
                                return
                            }else{
                                this.$store.commit('addKampanyaninIDsi',kampanya.id) // sepet olustururken lazim
                            }
                            // birlestirilebilir mi birlestirilemez mi kontrollerini daha rahat yapabilmek icin ayri ayri dizilerde tutulur START
                            if(kampanya.birlesim===1){ // tiklanilan kapmanya birlestirilebilirse
                                this.$store.commit('addBirlestirilebilir',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                                    birlestirilebilir:kampanya.birlesim})
                            }else{ // tiklanilan kapmanya birlestirilemezse
                                this.$store.commit('addBirlestirilemez',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                                    birlestirilebilir:kampanya.birlesim})
                            }
                            // cikara bastiginda cikarilmak istenen kampanyanin indirim miktari sepet ozetindeki kampanya indirimi guncellensin diye
                            var kampanya_indirimi = (parseFloat(this.sepetOzeti.kampIndirimi) + kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                            this.$store.commit('addSepetOzeti',{araToplam:this.sepetOzeti.araToplam,
                                promIndirimi:this.sepetOzeti.promIndirimi, kampIndirimi:kampanya_indirimi,
                                toplamTutar:this.sepetOzeti.toplamTutar, toplamTutar2:this.sepetOzeti.toplamTutar2,
                                sepetim:this.sepetOzeti.sepetim, hizmetBedeli:this.sepetOzeti.hizmetBedeli, hizmetBedeliAlindiMi:this.sepetOzeti.hizmetBedeliAlindiMi})
                            // birlestirilebilir mi birlestirilemez mi kontrollerini daha rahat yapabilmek icin ayri ayri dizilerde tutulur END
                            // sepet olustururken gonderilen kampanya id-si diziye ayni id birden fazla eklenmesin diye END
                            // sayfa refresh yapilmadigi taktirde kampanya ekliyse, ekli kampanyayi ekli gosterebilmek icin otomatik eklenen kampanyanin id-si yazilir
                            // this.$store.commit('addEkliKampanya',{kid:kampanya.id, kbarkod:kampanya.odul_barkod})
                        } // ileride kampanyanin odul_adet-i sepetteki urunun adetinden fazla olursa buraya 'else' ekle
                    }
                }
            })
        },
    },
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    .kampanya-goruntule{
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 10px;
        background: white;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
    .kampanya-goruntule .baslik{
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        background: #2BBBAD;
        color: white;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 10px;
        margin: 0 5px 0 5px;
    }
    .kampanya-div{
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 10px;
        background: white;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
    .kampanya-div .baslik{
        text-align: center;
        background: #2BBBAD;
        color: white;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 5px;
        margin: 0 5px 0 5px;
    }
    .arkafon{
        z-index: 1000;
        color: black;
        position: fixed;
        top: 0;
        left: 0;
        margin-left: calc(50% - 50vw);
        width: 100vw;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        overflow-x: scroll;
    }
    .ownModal{
        z-index: 100;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        background: white;
        max-width: 300px;
        min-width: 250px;
        position: absolute;
        top: 20px;
        padding: 30px;
    }
    button{
        outline:none !important;
    }
    .baslik{
        padding-bottom: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: white;
        font-size: 16px;
    }
    .baslik span{
        padding-top: 10px;
        font-weight: 400;
        text-transform: uppercase;
    }
    .close{
        position: absolute;
        right: 30px;
    }
    .kapmanya-icerigi{
        font-size: 14px;
    }
    .kapmanya-icerigi del{
        color: red;
        font-weight: 400;
    }
    .kapmanya-icerigi span{
        font-weight: 400;
        color: blue;
    }
    .kapmanya-aciklama{
        font-size: 15px;
        font-weight: 400;
    }
    .img-width{
        max-width: 75px;
        max-height: 85px;
        margin-left: -10px;
        object-fit: contain;
    }
    .resim-border{
        border: 1px solid #eee;
        border-radius: 10px;
        background: white;
        width: 80px;
        height: 90px;
    }
    .kampanya-yok{
        padding: 10px;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #a0a0a0;
    }
</style>