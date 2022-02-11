Bu sayfadaki puf noktalar:
1 - Bu sayfada en onemlisi; kampanyadaki gibi islemlerin yapilmamasi.
1.1 - Normalde kampanya eklenmek istendiginde; kampanya ekli mi degil mi anlamak icin show degiskeni true ya da false yapiliyor.
1.2 - Ekli kampanyanin sepet ozeti alaninda yaratacagi degisikliklerin degerleri bir dizide tutuluyor.
1.3 - Sonrasinda kampanya ekli mi degil mi anlamak icin tutulan show-un true olmasina karsilik sepet ozeti alanindaki degerlerin yerine
      guncellenmis degerler yaziliyor. Kampanya kisaca boyle calisiyor.
2 - Ama promosyon alani boyle degil. Cunku islem sayilari, kontroller kampanyadakiler gibi olacak, belki de daha fazla.
2.1 - Bunun icin kampanyadakinin aksine promosyon basarili eklendiginde direkt sepetozeti toplamtutari degisiyor. Burada bir sakinca yok
      cunku promosyon ardindan kampanya eklenmek istendiginde, ki kampanya direkt sepetozeti toplamtutari uzerinden islemler yapiyor.
3 - Sonuc olarak, promosyon eklendiginde toplam tutar direkt degisecek ama toplamtutar2 sabit kalacak. Sepet olusturmak icin sorgu
    gittiginde de promosyon varsa toplamtutar degil de toplamtutar2 yazilacak.
4 - Bu sayfada modal disinda tiklandiginda kapanmasi icin, modal icerigine tiklandiginda acik durmasi icin ozellikler eklendi. (Ilk buraya eklendi)
<template>
    <div>
        <div class="arkafon" @click="modalKapat()">
            <div class="ownModal" @click="modalAcikTut">
                <div class="baslik">
                    <span class="d-flex justify-content-center">
                        Promosyon
                        <button @click="modalKapat()" type="button" class="close" aria-label="Close"><span aria-hidden="true" class="black-text">&times;</span></button>
                    </span>
                </div>
                <div v-if="showPromoForm" class="icerik">
                    <span>Promosyon kodu gİrİşİ</span>
                    <!-- {{promosyonKodu}} -->
                    <!-- Sorgu sonucu donen bilgilere gore mesajlarin gosterimi START -->
                    <div v-if="showNotValid" class="d-flex justify-content-between">
                        <div></div>
                        <div class="card rgba-red-strong text-center z-depth-0">
                            <div class="card-body">
                                <p class="white-text mb-0 font-size-12">Promosyon kodu geçersiz! Lütfen Tekrar Deneyin.</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div v-if="showUsedBefore" class="d-flex justify-content-between">
                        <div></div>
                        <div class="card rgba-red-strong text-center z-depth-0">
                            <div class="card-body">
                                <p class="white-text mb-0 font-size-12">Bu promosyon kodu daha önce kullanıldığı için yeniden kullanılamaz!</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div v-if="showUsedGroupBefore" class="d-flex justify-content-between">
                        <div></div>
                        <div class="card rgba-red-strong text-center z-depth-0">
                            <div class="card-body">
                                <p class="white-text mb-0 font-size-12">Bu promosyon grubu için daha önce promosyon kodu kullanarak indirim hakkınızı kullandınız.</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div v-if="showOrderLimit" class="d-flex justify-content-between">
                        <div></div>
                        <div class="card rgba-red-strong text-center z-depth-0">
                            <div class="card-body">
                                <p class="white-text mb-0 font-size-12">Bu promosyon kodu {{ kullanim_limit }} TL ve üzeri sipariş tutarları için kullanılabilir!</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <!-- Sorgu sonucu donen bilgilere gore mesajlarin gosterimi END -->
                    <div class="d-flex justify-content-center">
                        <input type="text" v-model="code" autocomplete="off" id="promo" name="promo">
                    </div>
                    <div class="promo-kod-kullan-button mt-2">
                        <button type="button" @click="fetchPromosyonKod()" :disabled='isDisabled()' class="btn btn-danger waves-effect waves-light w-100">promosyon kodunu kullan</button>
                    </div>
                </div>
                <div v-else class="icerik-success">
                    <div>
                        <img src="@/assets/gif/promosyon-basarili.gif" style="margin:-40px 0 -20px 0" width="250" height="250" alt="">
                    </div>
                    <div>
                        <span>Tebrikler!</span>
                        <span>Promosyon Kodu ile {{ indirim_tutar }} TL indirim kazandınız.</span>
                        <span>Sipariş Tutarınız {{ sepetOzeti.toplamTutar }} TL'den {{ promosyonlu_toplam_tutar }} TL'ye düşürülmüştür.</span>
                    </div>
                    <div class="promo-kod-kullan-button mt-2">
                        <button type="button" @click="modalKapat()" class="btn btn-danger waves-effect waves-light w-100">tamam</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data(){
        return{
            promosyonKodu : [],
            errors : [],
            // cookie bilgileri START
            uid : "",
            utel : "",
            // cookie bilgileri END
            code : "",
            disabled : false,
            // NOT: success durumu icin ayrica showSuccess gibi bir degisken yerine showPromoForm-nun true yada false
            // oldugu duruma gore kontrol yapiliyor. (true - form gosterilir) (false - success mesaji gosterilir)
            showPromoForm : true, // success oldugunda promosyon formunun hide-i icin
            // sorgudan donen bilgiler dogrultusunda mesajlarin show/hide-i icin START
            showNotValid : false,
            showUsedBefore : false,
            showUsedGroupBefore : false,
            showOrderLimit : false,
            // sorgudan donen bilgiler dogrultusunda mesajlarin show/hide-i icin END
            kullanim_limit : "", // sorgudan donen siparis limit
            indirim_tutar : "", // sorgudan donen indirim miktari
            promosyonlu_toplam_tutar : "", // success oldugunda (toplam tutar - indirim tutari) sonucu buraya yazilir
        }
    },
    computed : {
        ...mapGetters(["sepetOzeti","serverRequest","kampanyaVarMi","showKampanyaAlani","toplamKazanc","kazancList"]),
    },
    methods : {
        modalKapat(){
            this.$store.commit('addShowPromosyonModal', false) // promosyon kodu input modali kapansin diye
        },
        modalAcikTut(e){ // modal dışı degil de icine tiklandiginda modali acik tutmasi icin
            // stopPropagation() mevcut olayin yayilmasini engeller. Ancak, herhangi bir varsayılan davranışın oluşmasını engellemez;
            // örneğin, bağlantılara yapılan tıklamalar hala işlenir. Bu davranışları durdurmak istiyorsanız, preventDefault() yöntemi kullanilabilir
            e.stopPropagation()
            return false
        },
        isDisabled(){
            if(this.code.length != 0 && this.code){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        async fetchPromosyonKod(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'check_promo_code');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('code', this.code);
                formData.append('tutar', this.sepetOzeti.toplamTutar); // ara toplam
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.promosyonKodu = response.data
            } catch (error) {
                this.errors.push(error)
            }
            if(this.promosyonKodu.status === 'fail'){
                if(this.promosyonKodu.reason === 'not_valid'){
                    this.showNotValid = true
                    this.showUsedBefore = false; this.showUsedGroupBefore = false; this.showOrderLimit = false; // diger mesajlar gizlenir
                }
                else if(this.promosyonKodu.reason === 'used_before'){
                    this.showUsedBefore = true
                    this.showNotValid = false; this.showUsedGroupBefore = false; this.showOrderLimit = false; // diger mesajlar gizlenir
                }
                else if(this.promosyonKodu.reason === 'used_group_before'){
                    this.showUsedGroupBefore = true
                    this.showNotValid = false; this.showUsedBefore = false; this.showOrderLimit = false; // diger mesajlar gizlenir
                }
                else if(this.promosyonKodu.reason === 'order_limit'){
                    this.showOrderLimit = true
                    this.showNotValid = false; this.showUsedBefore = false; this.showUsedGroupBefore = false; // diger mesajlar gizlenir
                    this.kullanim_limit = parseInt(this.promosyonKodu.response.siparislimit)
                }
            }
            else if(this.promosyonKodu.status === 'success'){
                this.showPromoForm = false // success demektir, form gizlenir. False oldugunda zaten success mesaji gosterilir
                this.kullanim_limit = (this.promosyonKodu.response.siparislimit).toFixed(2) // tebrikler mesajinda gostermek icin burasi
                this.indirim_tutar = (this.promosyonKodu.response.indirim).toFixed(2) // tebrikler mesajinda gostermek icin burasi
                this.$store.commit('addPromosyonIndirimTutar',this.indirim_tutar) // sepet odeme sayfasinda kullanilacak. bide genel olarak global data olarak tutulsun faydasi olur
                this.promosyonlu_toplam_tutar = (parseFloat(this.sepetOzeti.toplamTutar) - parseFloat(this.promosyonKodu.response.indirim)).toFixed(2) // tebrikler mesajinda gostermek icin burasi
                // sepet ozetindeki islemler START
                var kod = this.code
                this.$store.commit('addSecilenPromosyonKodu',{code:kod}) // siparis olustururken lazim olacak diye secilen kod burada tutulur
                // kampanyada eklendiginde indirimsiz tutar ve kampanyali tutar guncelleniyor, sepet olusturulurken de bu degerler oyle gonderiliyor.
                // promosyon, kampanyadaki sistem gibi degil de posetteki gibi olacak. yani kullaniciya indirimsiz tutar ve kampanyali tutar guncellenmis olarak gosterilip,
                // sepet olusturuldugunda indirimli tutar etki etmiyormus gibi gonderilecek..
                this.$store.commit('addPromosyonVarmi',true) // ..promosyon ekle butonunun disable-i icin.
                var promosyonlu_kazanc
                var sepet_ozeti_indirimsiz_tutar
                var sepet_ozeti_toplam_tutar
                if(this.kampanyaVarMi.show === false){ // promosyon eklendiginde kampanya YOKSA
                    this.$store.commit('addKampanyaVarMi',{show:true}) // sepet ozeti alaninda promosyon indirim tutari -0.00 degil de eklenen promosyon indirimi gorunsun diye
                    sepet_ozeti_indirimsiz_tutar = this.sepetOzeti.toplamTutar // urun sepette varsa toplam toplam guncellenmez
                    // birden fazla kampanya ekli oldugu durumda kampanya cikarilsa toplam tutar alaninin dogru degeri gostermesi icin
                    sepet_ozeti_toplam_tutar = (parseFloat(this.sepetOzeti.toplamTutar) - parseFloat(this.promosyonKodu.response.indirim)).toFixed(2)
                    this.$store.commit('addShowKampanyaAlani',{kampanyaliIndirimsizTutar:sepet_ozeti_indirimsiz_tutar,
                        kampanyaliTutar:sepet_ozeti_toplam_tutar})
                    this.$store.commit('addSepetOzeti',{araToplam:this.sepetOzeti.araToplam,
                        promIndirimi:this.indirim_tutar, kampIndirimi:this.sepetOzeti.kampIndirimi,
                        toplamTutar:this.sepetOzeti.toplamTutar, toplamTutar2:this.sepetOzeti.toplamTutar2,
                        sepetim:this.sepetOzeti.sepetim, hizmetBedeli:this.sepetOzeti.hizmetBedeli, hizmetBedeliAlindiMi:this.sepetOzeti.hizmetBedeliAlindiMi})
                    var kazanc_icin_hesaplama = this.promosyonKodu.response.indirim // tiklanan urunun indirim miktari
                    promosyonlu_kazanc = (parseFloat(this.sepetOzeti.hizmetBedeli) + parseFloat(kazanc_icin_hesaplama)).toFixed(2)
                    this.$store.commit('addKazanc',{kazanc:promosyonlu_kazanc})
                }
                else if(this.kampanyaVarMi.show === true){ // promosyon eklendiginde kampanya VARSA
                    sepet_ozeti_toplam_tutar = (parseFloat(this.showKampanyaAlani.kampanyaliTutar) - parseFloat(this.promosyonKodu.response.indirim)).toFixed(2)
                    this.$store.commit('addShowKampanyaAlani',{kampanyaliIndirimsizTutar:this.showKampanyaAlani.kampanyaliIndirimsizTutar,
                        kampanyaliTutar:sepet_ozeti_toplam_tutar})
                    this.$store.commit('addSepetOzeti',{araToplam:this.sepetOzeti.araToplam,
                        promIndirimi:this.indirim_tutar, kampIndirimi:this.sepetOzeti.kampIndirimi,
                        toplamTutar:this.sepetOzeti.toplamTutar, toplamTutar2:this.sepetOzeti.toplamTutar2,
                        sepetim:this.sepetOzeti.sepetim, hizmetBedeli:this.sepetOzeti.hizmetBedeli,
                        hizmetBedeliAlindiMi:this.sepetOzeti.hizmetBedeliAlindiMi})
                    if(this.toplamKazanc.kazanc != null || this.toplamKazanc.kazanc != ""){ // daha onceden kapmanya eklenmisse yani kazanc hizmet bedeline esitse >>
                        promosyonlu_kazanc = (parseFloat(this.toplamKazanc.kazanc) + parseFloat(this.promosyonKodu.response.indirim)).toFixed(2)
                    }
                    this.$store.commit('addKazanc',{kazanc:promosyonlu_kazanc})
                }
                var prmkznc = parseFloat(this.promosyonKodu.response.indirim).toFixed(2)
                this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:this.kazancList.kampanya, promosyon:prmkznc})
            }
            // console.log("promosyon sorgu")
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
        },
    },
}
</script>

<style scoped>
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
        top: 40px;
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
    .icerik{
        margin-top: 20px;
    }
    .icerik span{
        display: flex;
        justify-content: center;
        font-size: 15px;
        text-transform: uppercase;
    }
    input{
        outline:none !important;
        padding: 10px;
        margin-top: 10px;
        border: 2px solid #838383;
        border-radius: 5px;
        text-align: center;
        transition: .3s;
    }
    input:focus{
        border: 2px solid red;
    }
    .promo-kod-kullan-button{
        display: flex;
        justify-content: center;
    }
    .promo-kod-kullan-button button{
        padding: 10px 17px;
        font-size: 12px;
    }
    .font-size-12{
        font-size: 12px;
    }
    .icerik-success{
        margin-top: 20px;
    }
    .icerik-success span{
        display: flex;
        justify-content: center;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
    }
    .icerik-success span:nth-child(1){
        color: red;
        font-weight: 800;
    }
</style>