<template>
    <div class="row m-2 kampanya-each-div">
        <div class="col-md-3">
            <img :src="kampanyaimage + kampanya.id + '.jpg' + '?' + kampanya.imageupdate" width="130" height="100" class="img-fluid z-depth-0 kampanya-img-width" alt="">
        </div>
        <div class="col-md-7 kampanya-ad">
            {{kampanya.ad}}
            <div class="mt-2">
                <div v-if="kampanyaKontrol(kampanya).kullanilabilirlikDurumu === 'evet'">
                    <span class="kullanilabilir-kampanya">{{kullanilabilir}}</span>
                    <span v-if="buttonEkle=='Çıkar'" class="kampanyanin-kazanci">
                        Kazancınız : {{ (kampanya.urun_satisfiyat - kampanya.odul_urunfiyat).toFixed(2) }} TL
                    </span>
                </div>
                <div v-else-if="kampanyaKontrol(kampanya).kullanilabilirlikDurumu === 'hayir'">
                    <div><span class="kullanilamaz-kampanya">{{kullanilamaz}}</span> <span class="text-muted">({{ kampanyaKontrol(kampanya).kullanimKosulu }})</span></div>
                </div>
                <!-- <div v-else-if="kampanyaKontrol(kampanya) === 'kosul tip 2'">
                    <b style="color:#ff4444">kosul tip 2</b>
                </div> -->
            </div>
        </div>
        <div class="col-md-2">
            <div class="d-flex justify-content-end mt-3">
                <button @click="ekleButton(kampanya)" type="button" :disabled="kampanyaKontrol(kampanya).disableEkleButton" class="btn btn-info btn-md" id="ekleCikarButonID">
                    {{buttonEkle}}
                </button>
                <div v-if="kampanya.birlesim=='1'" class="birlestirilebilir">BİRLEŞTİRİLEBİLİR</div>
                <!-- Acilir modal START -->
                <div v-if="showKampanyaEklendi">
                    <div class="arkafon" @click="modalKapat()">
                        <div class="ownModal" @click="modalAcikTut">
                            <div class="baslik">
                                <span class="d-flex justify-content-center">
                                    Kampanya
                                    <button @click="modalKapat()" type="button" class="close" aria-label="Close"><span aria-hidden="true" class="black-text">&times;</span></button>
                                </span>
                            </div>
                            <div class="icerik">
                                <div v-if="kampanyaUrunuSepetimdeMi=='eklenilen'">
                                    <div class="row mb-1">
                                        <div v-if="kampanyaOdulIcerigi.barkod != null" class="col-md-3 d-flex align-items-center">
                                            <img v-if="kampanyaOdulIcerigi.barkod.length < 8" :src="imagecompany + ushp + '/' + kampanyaOdulIcerigi.barkod + '.jpeg?'" class="img-width" alt="">
                                            <img v-else :src="image + kampanyaOdulIcerigi.barkod + '.jpeg'" class="img-width" alt="">
                                        </div>
                                        <div class="col-md-9 d-flex align-items-center mt-1">
                                            <div class="sepet-icerigi">
                                                <strong>{{ kampanyaOdulIcerigi.ad }}</strong> <br>
                                                <span>({{ kampanyaOdulIcerigi.adet }} Adet x {{ kampanyaOdulIcerigi.satisfiyat }} TL) =</span>
                                                <del> {{ (kampanyaOdulIcerigi.satisfiyat * kampanyaOdulIcerigi.adet).toFixed(2) }} TL</del>
                                                <strong v-if="kampanyaOdulIcerigi.odulfiyat!=0"> {{ (kampanyaOdulIcerigi.odulfiyat * kampanyaOdulIcerigi.adet).toFixed(2) }} TL</strong>
                                                <strong v-else> Ücretsiz</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <span style="color:#00C851">Ürün sepetinize eklendi ve kampanya uygulandı</span>
                                </div>
                                <div v-if="kampanyaUrunuSepetimdeMi=='var-eklenilen'">
                                    <div class="row mb-3">
                                        <div v-if="kampanyaOdulIcerigi.barkod != null" class="col-md-3 d-flex align-items-center">
                                            <img v-if="kampanyaOdulIcerigi.barkod.length < 8" :src="imagecompany + ushp + '/' + kampanyaOdulIcerigi.barkod + '.jpeg?'" class="img-width" alt="">
                                            <img v-else :src="image + kampanyaOdulIcerigi.barkod + '.jpeg'" class="img-width" alt="">
                                        </div>
                                        <div class="col-md-9 d-flex align-items-center mt-1">
                                            <div class="sepet-icerigi">
                                                <strong>{{ kampanyaOdulIcerigi.ad }}</strong> <br>
                                                <span>({{ kampanyaOdulIcerigi.adet }} Adet x {{ kampanyaOdulIcerigi.satisfiyat }} TL) =</span>
                                                <del> {{ (kampanyaOdulIcerigi.satisfiyat * kampanyaOdulIcerigi.adet).toFixed(2) }} TL</del>
                                                <strong v-if="kampanyaOdulIcerigi.odulfiyat!=0"> {{ (kampanyaOdulIcerigi.odulfiyat * kampanyaOdulIcerigi.adet).toFixed(2) }} TL</strong>
                                                <strong v-else> Ücretsiz</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <span style="color:#00C851">Kampanya sepetinize eklendi</span>
                                </div>
                                <!-- <div v-if="kampanyaUrunuSepetimdeMi=='cikarilan'">
                                    Kampanya ödül ürünü şu an sepetinizde. Bir tane daha ekleyemezsiniz.
                                    <p><b>Ürünü sepetimden <button @click="kampanyayiCikar()" type="button" data-dismiss="modal" class="btn btn-md btn-info">çıkar</button></b></p>
                                </div> -->
                                <div v-if="kampanyaUrunuSepetimdeMi=='cikar'">
                                    <span class="kamp-kaldirildi">Kampanya seçiminiz kaldırıldı, sepetinizdeki ürünün fiyatı kampanyasız fiyata dönüştürüldü.</span>
                                </div>
                                <div v-if="kampanyaUrunuSepetimdeMi=='birlestirilemez-mesaji'">
                                    <span class="kamp-kaldirildi">Bu kampanya birleştirilemez.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Acilir modal END -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
    props : ["kampanya","kampanyaID"],
    data(){
        return{
            kampanyaUrunuSepetimdeMi : "",
            kampanyaOdulIcerigi : "", // html modal icinde eklenen urunu gostermek icin
            silinecekKampanyaUrun : "",
            silinecekUrunStokkod : "", // sepette ekli kampanyali urun cikarilmak istendiginde, kampanyali urunun stokkodu buraya yazilir
            kullanilabilir : "Kullanılabİlİr",
            kullanilamaz : "Kullanılamaz",
            buttonEkle : "Ekle",
            // cookie bilgileri START
            ushp : "",
            // cookie bilgileri END
            showKampanyaEklendi : false,
        }
    },
    computed : {
        ...mapGetters(["sepetOzeti","image","kampanyaimage","imagecompany","ekliKampanya","toplamKazanc",
            "kampanyaVarMi","showKampanyaAlani","kampanyaDizisi","birlestirilebilir","birlestirilemez",
            "kazancList","promosyonVarmi"]),
        ...mapActions(["deleteKampanyaninIDsi"]),
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
        // kampanya kullanilabilir mi? ya da diger kontrollerin yapilabilmesi icin gerekli fonk
        kampanyaKontrol(kampanya){
            // kosul_tip 1 ise bir tek siparis limite bakiyoruz, 2 ise siparis limite degil diger kosullara bakiyoruz
            if(kampanya.kosul_tip === 1){ // kosul tip 1 esitse (yani burada bir tek siparis limite bakacagiz)
                if(this.sepetOzeti.araToplam > kampanya.kosul_siparislimit){ // sepet tutari siparis limitten buyuk ise
                    return{
                        kullanilabilirlikDurumu : "evet", // kampanya kullanilabilir demek
                        disableEkleButton : false // ekle button active olur
                    }
                }else if(this.sepetOzeti.araToplam < kampanya.kosul_siparislimit){ // sepet tutari limitten kucuk ise
                    return{
                        kullanilabilirlikDurumu : "hayir", // kampanya kullanilamaz demek
                        disableEkleButton : true, //  ekle button disable olur
                        kullanimKosulu : kampanya.aciklama2
                    }
                }
            }else if(kampanya.kosul_tip === 2){ // kosul tip 2 esitse (yani burada siparis limitten baska diger kosullar dikkate alinacak)
                var localSepet = localStorage.getItem("sepet")
                var kampanyaKosulUrunAdi = kampanya.kosul_urun
                if(localSepet.includes(kampanyaKosulUrunAdi)){
                    var urunIndex = localSepet.indexOf(kampanyaKosulUrunAdi)
                    var kismiSepettekiKampanyaliUrun = localSepet.slice(urunIndex,urunIndex+70) // ileride sikinti olursa buradan kaynakli olabilir. cunku kampanyali urunun adetini bulmak icin belirli sayi kadar sepet kesilir
                    // console.log(kismiSepettekiKampanyaliUrun) // bu konsol yazdirilirsa hatanin nerede oldugu anlasilir
                    var parantez = kismiSepettekiKampanyaliUrun.indexOf("}")
                    var kontroladet = kismiSepettekiKampanyaliUrun.slice(kismiSepettekiKampanyaliUrun.indexOf("adet")+6,parantez)
                    var adet
                    if(kontroladet.includes('"')){ // adet tirnak iceriyor mu diye kontrol edilir
                        adet = kontroladet.slice(1,-1)
                    }else{
                        adet = kontroladet
                    }
                    // sepetteki urun adeti, kampanya kosulu icin gerekli adet sayisini karsiliyor mu diye kontrol edilir
                    if(adet >= kampanya.kosul_adet){ // kampanya kosulu saglandi demektir
                        return{
                            kullanilabilirlikDurumu : "evet", // kampanya kullanilabilir demek
                            disableEkleButton : false // ekle button active olur
                        }
                    }else{ // kampanya kosulu saglanmadi demektir
                        return{
                            kullanilabilirlikDurumu : "hayir", // kampanya kullanilamaz demek
                            disableEkleButton : true, //  ekle button disable olur
                            kullanimKosulu : kampanya.aciklama2
                        }
                    }
                }
                else{
                    return{
                        kullanilabilirlikDurumu : "hayir", // kampanya kullanilamaz demek
                        disableEkleButton : true, //  ekle button disable olur
                        kullanimKosulu : kampanya.aciklama2
                    }
                }
            }
        },
        // burasi dinamik olarak birlestirilebilir ve birlestirilemez alanlarinda kullanilabilsin diye ayri fonksiyon olarak yazildi
        butonFonksiyonelligi(kampanya, urun_detay, indirim_miktar, toplam_kazanc, localSepet, sepet_ozeti_indirimsiz_tutar, sepet_ozeti_toplam_tutar, kampanya_indirimi){
            this.$store.commit('addKampanyaninIDsi',kampanya.id) // sepet olustururken lazim
            if(kampanya.kosul_tip === 1){
                // kampanyali urunun sepete eklenme islemi START
                this.silinecekKampanyaUrun = '"id":"'+urun_detay.id+'","stokkod":"'+kampanya.odul_urun+'","barkod":"'+kampanya.odul_barkod+'","ad":"'+kampanya.urun_ad+'","satisfiyat":"'+kampanya.urun_satisfiyat+'","odulfiyat":"'+kampanya.odul_urunfiyat+'","adet":'+kampanya.odul_adet+',"kampanyalimi":1'+',"birim":0'
                this.silinecekUrunStokkod = kampanya.odul_urun // kampanyali urun sepettek silinirken index bulmada gerekli olacagi icin
                var sepeteEklenenKampanyaUrunu = '"id":"'+urun_detay.id+'","stokkod":"'+kampanya.odul_urun+'","barkod":"'+kampanya.odul_barkod+'","ad":"'+kampanya.urun_ad+'","satisfiyat":"'+kampanya.urun_satisfiyat+'","odulfiyat":"'+kampanya.odul_urunfiyat+'","adet":'+kampanya.odul_adet+',"kampanyalimi":1'+',"birim":0'
                var parantezlieklenenUrun = "{"+sepeteEklenenKampanyaUrunu+"}" // {} parantezli hale geri getirilir
                this.kampanyaOdulIcerigi = JSON.parse(parantezlieklenenUrun) // html modal icinde eklenen urunu gostermek icin
                // sepet odemedeki sepet ozeti alaninda kazanc alan guncellemeleri icin START
                if(this.toplamKazanc.kazanc == null || this.toplamKazanc.kazanc === ""){ // daha onceden kapmanya eklenmemisse yani kazanc hizmet bedeline esitse >>
                    var kazanc_icin_hesaplama = indirim_miktar // tiklanan urunun indirim miktari
                    // >> toplam kazancimiz hizmet bedeli ile indirim miktarinin toplamina esit olur
                    toplam_kazanc = (parseFloat(this.sepetOzeti.hizmetBedeli) + parseFloat(kazanc_icin_hesaplama)).toFixed(2)
                }else{ // kampanya ekliyse, toplam kazanc; bir onceki kazanc ile tiklanan urunun indirim miktarinin toplamina esit olur
                    toplam_kazanc = (parseFloat(this.toplamKazanc.kazanc) + parseFloat(indirim_miktar)).toFixed(2)
                }
                // asagidaki kontrol birden fazla kampanya eklendigindeki sepet ozetindeki kampanya indirimi alaninin dogru degeri gostermesi icin
                kampanya_indirimi = (parseFloat(this.sepetOzeti.kampIndirimi) + kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                // sepet odemedeki sepet ozeti alaninda kazanc alan guncellemeleri icin END
                // her ekleye basildiginda o urun ileride gerekli kontroller icin bir dizide tutulur
                if(JSON.stringify(this.kampanyaDizisi).includes(urun_detay.ad)){ // daha onceden ekliyse
                    return 0
                }else{ // yeni ekleniyorsa
                    this.$store.commit('addKampanyaDizisi',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                        birlestirilebilir:kampanya.birlesim})
                }
                // birlestirilebilir mi birlestirilemez mi kontrollerini daha rahat yapabilmek icin ayri ayri dizilerde tutulur START
                if(kampanya.birlesim===1){ // tiklanilan kapmanya birlestirilebilirse
                    if(JSON.stringify(this.birlestirilebilir.id) != null){ // dizi bos oldugunda .includes-da hata vermesin diye
                        if(JSON.stringify(this.birlestirilebilir).includes(urun_detay.ad)){ // daha onceden ekliyse
                            return 0
                        }else{ // yeni ekleniyorsa
                            this.$store.commit('addBirlestirilebilir',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                                birlestirilebilir:kampanya.birlesim})
                        }
                    }else{
                        this.$store.commit('addBirlestirilebilir',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                            birlestirilebilir:kampanya.birlesim})
                    }
                }else{ // tiklanilan kapmanya birlestirilemezse
                    if(JSON.stringify(this.birlestirilebilir.id) != null){ // dizi bos oldugunda .includes-da hata vermesin diye
                        if(JSON.stringify(this.birlestirilemez).includes(urun_detay.ad)){ // daha onceden ekliyse
                            return 0
                        }else{ // yeni ekleniyorsa
                            this.$store.commit('addBirlestirilemez',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                                birlestirilebilir:kampanya.birlesim})
                        }
                    }else{
                        this.$store.commit('addBirlestirilemez',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                            birlestirilebilir:kampanya.birlesim})
                    }
                }
                // kazanc yanindaki unlem icon-ununa tiklandiginda acilacak div iceriginin doldurulmasi icin START
                var kmpkznc;
                if(this.kampanyaVarMi.show==false){
                    kmpkznc = kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat)).toFixed(2)
                    if(this.promosyonVarmi === false){
                        this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:kmpkznc})
                    }else if(this.promosyonVarmi === true){
                        this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:kmpkznc, promosyon:this.kazancList.promosyon})
                    }
                }else{
                    kmpkznc = (parseFloat(this.kazancList.kampanya) + kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                    if(isNaN(parseFloat(this.kazancList.kampanya))){ // kazancList bos oldugu durumu handle etmek icin. NaN degeri donuyordu normalde
                        kmpkznc = kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat)).toFixed(2)
                    }
                    if(this.promosyonVarmi === false){
                        this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:kmpkznc})
                    }else if(this.promosyonVarmi === true){
                        this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:kmpkznc, promosyon:this.kazancList.promosyon})
                    }
                }
                // kazanc yanindaki unlem icon-ununa tiklandiginda acilacak div iceriginin doldurulmasi icin END
                // birlestirilebilir mi birlestirilemezse kontrollerini daha rahat yapabilmek icin ayri ayri dizilerde tutulur END
                if(localSepet.includes(kampanya.odul_urun)){ // sepette kampanya odul urunu var mi diye kontrol edilir, (VARSA)
                    this.kampanyaUrunuSepetimdeMi = 'var-eklenilen'
                    // sepet ozeti alan fiyat guncellemeleri START
                    sepet_ozeti_indirimsiz_tutar = this.sepetOzeti.toplamTutar // urun sepette varsa toplam toplam guncellenmez
                    // asagidaki kontrol birden fazla kampanya eklendigindeki toplam tutar alaninin dogru degeri gostermesi icin
                    if(this.kampanyaVarMi.show==false){
                        sepet_ozeti_toplam_tutar = (parseFloat(this.sepetOzeti.toplamTutar) - kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                    }else{
                        sepet_ozeti_toplam_tutar = (parseFloat(this.showKampanyaAlani.kampanyaliTutar) - kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                    }
                    this.$store.commit('addKampanyaVarMi',{show:true})
                    this.$store.commit('addShowKampanyaAlani',{kampanyaliIndirimsizTutar:sepet_ozeti_indirimsiz_tutar,
                        kampanyaliTutar:sepet_ozeti_toplam_tutar})
                    this.$store.commit('addKazanc',{kazanc:toplam_kazanc})
                    this.$store.commit('addSepetOzeti',{araToplam:this.sepetOzeti.araToplam,
                        promIndirimi:this.sepetOzeti.promIndirimi, kampIndirimi:kampanya_indirimi,
                        toplamTutar:this.sepetOzeti.toplamTutar, toplamTutar2:this.sepetOzeti.toplamTutar2,
                        sepetim:this.sepetOzeti.sepetim, hizmetBedeli:this.sepetOzeti.hizmetBedeli, hizmetBedeliAlindiMi:this.sepetOzeti.hizmetBedeliAlindiMi})
                    // sepet ozeti alan fiyat guncellemeleri END
                    this.kullanilabilir = "sepetİnİzde"
                    this.buttonEkle = "Çıkar"
                }else{ // sepette o urun yoksa odul sepete eklenir, (YOKSA)
                    this.kampanyaUrunuSepetimdeMi = 'eklenilen'
                    // sepet ozeti alan fiyat guncellemeleri START
                    sepet_ozeti_indirimsiz_tutar = (parseFloat(this.sepetOzeti.toplamTutar) + parseFloat(kampanya.urun_satisfiyat)).toFixed(2) // urun sepette varsa ara toplam guncellenmez
                    var kampanya_ara_toplam = (parseFloat(this.sepetOzeti.araToplam) + parseFloat(kampanya.urun_satisfiyat)).toFixed(2) // sepette olmayan urun kampanyali eklendiginde ara toplam degisir
                    // asagidaki kontrol birden fazla kampanya eklendigindeki toplam tutar alaninin dogru degeri gostermesi icin
                    if(this.kampanyaVarMi.show==false){
                        sepet_ozeti_toplam_tutar = (parseFloat(sepet_ozeti_indirimsiz_tutar) - kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                    }else{
                        sepet_ozeti_toplam_tutar = (parseFloat(this.showKampanyaAlani.kampanyaliTutar) + kampanya.odul_adet*parseFloat(kampanya.urun_satisfiyat) - kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                    }
                    this.$store.commit('addKampanyaVarMi',{show:true})
                    this.$store.commit('addShowKampanyaAlani',{kampanyaliIndirimsizTutar:sepet_ozeti_indirimsiz_tutar,
                        kampanyaliTutar:sepet_ozeti_toplam_tutar})
                    this.$store.commit('addKazanc',{kazanc:toplam_kazanc})
                    var toplam_Tutar = (parseFloat(this.sepetOzeti.toplamTutar) + parseFloat(kampanya.urun_satisfiyat)).toFixed(2) // burasinin ayri olarak hesaplanma sebebi, hesaba poset tutarini da katmak icin. zaten sepet odemede toplam tutara poset katilip hesaplaniyor. simdi tek yapilmasi gereken o hesaplanani burada kullanmak
                    // sepette 2 urun var diyelim, kampanya eklendigi zaman sepetteki urun 3 olacak ve sepet odeme alaninda da 3 urun icin gerekli dogru fiyatlar gorunsun diye
                    this.$store.commit('addSepetOzeti',{araToplam:kampanya_ara_toplam,
                        promIndirimi:this.sepetOzeti.promIndirimi, kampIndirimi:kampanya_indirimi,
                        toplamTutar:toplam_Tutar, toplamTutar2:toplam_Tutar,
                        sepetim:this.sepetOzeti.sepetim, hizmetBedeli:this.sepetOzeti.hizmetBedeli, hizmetBedeliAlindiMi:this.sepetOzeti.hizmetBedeliAlindiMi})
                    // sepet ozeti alan fiyat guncellemeleri END
                    var eski_data = JSON.parse(localStorage.getItem("sepet"))
                    eski_data.push(JSON.parse(parantezlieklenenUrun)) // degisikliklerin son hali array-e eklenir.
                    localStorage.setItem("sepet", JSON.stringify(eski_data))
                    this.sepetOzeti.sepetim.push(JSON.parse(parantezlieklenenUrun)) // sepet odeme sayfasinda sepet ozeti alanini da guncelliyoruz
                    this.kullanilabilir = "sepetİnİzde"
                    this.buttonEkle = "Çıkar"
                }
                // sayfa refresh yapilmadigi taktirde kampanya ekliyse, ekli kampanyayi ekli gosterebilmek icin otomatik eklenen kampanyanin id-si yazilir
                // this.$store.commit('addEkliKampanya',{kid:kampanya.id, kbarkod:kampanya.odul_barkod})
                // kampanyali urunun sepete eklenme islemi END
            }
        },
        // ayni sekilde ekle butonuna basarken kosul tipin 1 mi 2 mi bilmesi lazim ve ona gore sonuc cikarmasi lazim
        ekleButton(kampanya){
            var toplam_kazanc; var indirim_miktar
            indirim_miktar = (kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
            // butondaki 'ekle' yada 'cikar' yazisina gore kontrolun olma sebebi; kampanya otomatik sekilde eklenmisse butonda 'cikar' yazacak.
            // ve bu butona tiklandiginda butona ekleme fonksiyonu degil de cikarmak icin gerekli fonk cagrilir.
            this.showKampanyaEklendi = true
            var localSepet = localStorage.getItem("sepet") // bir kac kosulda kullanilacagi icin burada tanimlandi
            var urun_detay = JSON.parse(kampanya.urundetay)
            var sepet_ozeti_indirimsiz_tutar
            var sepet_ozeti_toplam_tutar
            var kampanya_indirimi
            if(this.buttonEkle === "Ekle"){
                if(kampanya.birlesim===1){ // tiklanilan kapmanya birlestirilebilirse
                    this.butonFonksiyonelligi(kampanya, urun_detay, indirim_miktar, toplam_kazanc, localSepet, sepet_ozeti_indirimsiz_tutar, sepet_ozeti_toplam_tutar, kampanya_indirimi)
                }
                else{ // tiklanilan kapmanya birlestirilebilir degilse
                    if(this.kampanyaDizisi.length === 0){ // kampanya birlestirilemez ve ayni zamanda hic kampanya secilmemisse eklenebilir
                        this.butonFonksiyonelligi(kampanya, urun_detay, indirim_miktar, toplam_kazanc, localSepet, sepet_ozeti_indirimsiz_tutar, sepet_ozeti_toplam_tutar, kampanya_indirimi)
                    }else if(this.kampanyaDizisi.length != 0 && this.birlestirilemez.length === 0){
                        this.butonFonksiyonelligi(kampanya, urun_detay, indirim_miktar, toplam_kazanc, localSepet, sepet_ozeti_indirimsiz_tutar, sepet_ozeti_toplam_tutar, kampanya_indirimi)
                    }else{ // kampanya birlestirilemez ama onceden kampanya eklenmisse, 'birlestirilemez' mesaji gorunur
                        this.kampanyaUrunuSepetimdeMi = 'birlestirilemez-mesaji'
                    }
                }
            }
            else if(this.buttonEkle === "Çıkar"){
                this.kampanyaUrunuSepetimdeMi = 'cikar'
                // sepet odemedeki sepet ozeti alaninda kazanc alan guncellemeleri icin START
                toplam_kazanc = (parseFloat(this.toplamKazanc.kazanc) - parseFloat(indirim_miktar)).toFixed(2)
                this.$store.commit('addKazanc',{kazanc:toplam_kazanc})
                // kazanc yanindaki unlem icon-ununa tiklandiginda acilacak div iceriginin doldurulmasi icin START
                var kmpkznc1 = (parseFloat(this.kazancList.kampanya) - kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                if(parseInt(kmpkznc1) == 0){ // secili kampanya cikarildiginda geriye cikarilacak kampanya kalmadiginda, bir nevi kampanya ekli degilse
                    if(this.promosyonVarmi === false){
                        this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli})
                    }else if(this.promosyonVarmi === true){
                        this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, promosyon:this.kazancList.promosyon})
                    }
                }else{ // secili kampanya cikarilmasina ragmen hala kampanya varsa
                    if(this.promosyonVarmi === false){
                        this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:kmpkznc1})
                    }else if(this.promosyonVarmi === true){
                        this.$store.commit('addKazancList',{hizmetbedeli:this.kazancList.hizmetbedeli, kampanya:kmpkznc1, promosyon:this.kazancList.promosyon})
                    }
                }
                // kazanc yanindaki unlem icon-ununa tiklandiginda acilacak div iceriginin doldurulmasi icin END
                sepet_ozeti_indirimsiz_tutar = this.sepetOzeti.toplamTutar // urun sepette varsa toplam toplam guncellenmez
                // birden fazla kampanya ekli oldugu durumda kampanya cikarilsa toplam tutar alaninin dogru degeri gostermesi icin
                sepet_ozeti_toplam_tutar = (parseFloat(this.showKampanyaAlani.kampanyaliTutar) + kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                this.$store.commit('addShowKampanyaAlani',{kampanyaliIndirimsizTutar:sepet_ozeti_indirimsiz_tutar,
                    kampanyaliTutar:sepet_ozeti_toplam_tutar})
                // sepet odemedeki sepet ozeti alaninda kazanc alan guncellemeleri icin END
                // kampanya cikarildiktan sonraki kazanc hizmetbedeline esitse kampanya kullanilmamistir demek
                if(parseFloat(this.toplamKazanc.kazanc).toFixed(2) === parseFloat(this.sepetOzeti.hizmetBedeli).toFixed(2)){
                    this.$store.commit('addKampanyaVarMi',{show:false}) // sepet ozeti fiyat icin
                }
                this.kullanilabilir = "Kullanılabİlİr"
                this.buttonEkle = "Ekle"
                // local sepetteki o kampanya urununun kampanyalimi alanini 0 yapmak icin START
                var local = JSON.parse(localStorage.getItem("sepet")) // localdeki sepet parse edilmis olarak bir daha alinir
                local.map((item) => { // kampanya urunu kampanya disinda normal olarak sepete eklenmisse o urunun adetini kampanya odul adeti kadar indirmek icin map ile islem gorulur
                    var sepetteki_kampanya_urun = item
                    if(sepetteki_kampanya_urun.ad === kampanya.urun_ad){ // sepetteki tek o urunu almak icin..
                        if(sepetteki_kampanya_urun.kampanyalimi === 1 || sepetteki_kampanya_urun.kampanyalimi === '1'){ // ..eger urun sepete normal olarak eklenmisse..
                            var karsilastirma = JSON.stringify(sepetteki_kampanya_urun) // sepetteki eski degerle yeniyi ayirt edebilmek icin
                            sepetteki_kampanya_urun.kampanyalimi = 0 // kampanyali mi alani 0, 1 olarak degistirilir
                            var yeniLocal = localSepet.replace(karsilastirma,JSON.stringify(sepetteki_kampanya_urun))
                            localStorage.removeItem("sepet")
                            localStorage.setItem("sepet",yeniLocal)
                        }
                    }
                })
                // cikarilmak istenen kampanyayi sepet olustururkenki gereken diziden cikarir
                this.$store.commit('popKampanyaninIDsi',kampanya.id)
                // her cikar-a basildiginda cikarilmak istenen urun bilgisi diziden cikarilir
                this.$store.commit('popKampanyaDizisi',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                    birlestirilebilir:kampanya.birlesim})
                if(kampanya.birlesim===1){ // her cikar-a basildiginda cikarilmak istenen urun birlestirilebilirse
                    this.$store.commit('popBirlestirilebilir',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                        birlestirilebilir:kampanya.birlesim})
                }else{ // her cikar-a basildiginda cikarilmak istenen urun birlestirilemezse
                    this.$store.commit('popBirlestirilemez',{id:urun_detay.id, ad:urun_detay.ad, barkod:urun_detay.barkod,
                        birlestirilebilir:kampanya.birlesim})
                }
                // cikara bastiginda cikarilmak istenen kampanyanin indirim miktari sepet ozetindeki kampanya indirimi guncellensin diye
                kampanya_indirimi = (parseFloat(this.sepetOzeti.kampIndirimi) - kampanya.odul_adet*(parseFloat(kampanya.urun_satisfiyat) - parseFloat(kampanya.odul_urunfiyat))).toFixed(2)
                this.$store.commit('addSepetOzeti',{araToplam:this.sepetOzeti.araToplam,
                    promIndirimi:this.sepetOzeti.promIndirimi, kampIndirimi:kampanya_indirimi,
                    toplamTutar:this.sepetOzeti.toplamTutar, toplamTutar2:this.sepetOzeti.toplamTutar2,
                    sepetim:this.sepetOzeti.sepetim, hizmetBedeli:this.sepetOzeti.hizmetBedeli, hizmetBedeliAlindiMi:this.sepetOzeti.hizmetBedeliAlindiMi})
            }
        },
        // kampanyayiCikar(){
        //     var localSepet = localStorage.getItem("sepet")
        //     if(localSepet.includes(this.silinecekKampanyaUrun)){ // sepette kampanya odul urunu var mi diye kontrol edilir
        //         var eski_data = JSON.parse(localStorage.getItem("sepet"))
        //         var index = eski_data.findIndex(x => x.stokkod === this.silinecekUrunStokkod); // x.stokkod yani stokkod ile baslayan objectin indeksi eski data-dan bulunur
        //         if (index !== undefined) eski_data.splice(index, 1);
        //         localStorage.setItem("sepet", JSON.stringify(eski_data))
        //         // sepet odeme sayfasinda sepet ozeti alanini da guncelliyoruz
        //         var indexSepetOzeti = this.sepetOzeti.sepetim.findIndex(x => x.stokkod === this.silinecekUrunStokkod); // sepet icin yapilan aynisi sepet ozeti alani icindeki sepet icin de yapilir
        //         if (indexSepetOzeti !== undefined) this.sepetOzeti.sepetim.splice(indexSepetOzeti, 1);
        //         this.kullanilabilir = "Kullanılabİlİr"
        //         this.buttonEkle = "Ekle"
        //         this.$store.commit('addKampanyaVarMi',{show:false})
        //         // 1 saniye bekletildi. bekletilmedigi taktirde bir modal kapanip alttaki gozukuyordu
        //         setTimeout(() => this.kampanyaUrunuSepetimdeMi = 'cikarilan', 1000) // html modal icinde urun gorunecek sekilde yeniden ayarlanir
        //         this.deleteKampanyaninIDsi
        //     }else{
        //         return
        //     }
        // },
        kampanyaOtomatikEklendiMi(){
            setTimeout(() => { 
                if(this.kampanyaID === this.kampanya.id){ // kampanya ekliyse butonu 'cikar' yapmak icin
                    this.kullanilabilir = "sepetİnİzde"
                    this.buttonEkle = "Çıkar"
                }
                // var localSepet = localStorage.getItem("sepet")
                // // 1. kontrol, sayfa refresh yapilmadan kampanyalar goruntulenirse ekli olan kampanya varsa,
                // // 2. kontrol, yine sayfa refresh yapilmadigi halde kampanya ekli ola ola urun sepetten silinmemise
                // if(this.ekliKampanya.kid === this.kampanya.id && localSepet.includes(this.ekliKampanya.kbarkod)){
                //     this.kullanilabilir = "sepetİnİzde"
                //     this.buttonEkle = "Çıkar"
                // }else{
                //     this.kullanilabilir = "Kullanılabİlİr"
                //     this.buttonEkle = "Ekle"
                // }
            }, 100) // 100 mls bekletilme sebebi created oldugunda otomatik eklenen kampanya id-sinin hala var var olmamasi
        },
        getUid_Udep(){
            this.ushp = this.decryptCookie("ushp")
        },
    },
    created(){
        this.kampanyaOtomatikEklendiMi()
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    @media (max-width : 500px){
        .ownModal{
            max-width: 350px !important;
            min-width: 350px !important;
        }
        #ekleCikarButonID{
            margin-bottom: 32px;
            width: 100%;
        }
        .birlestirilebilir{
            right: 32% !important;
        }
    }
    .kampanya-img-width{
        max-width: 140px;
        max-height: 90px;
        min-width: 140px;
        min-height: 90px;
    }
    .kampanya-each-div{
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 5px;
        transition: .3s;
    }
    .kampanya-each-div:hover{
        border: 1px solid #2BBBAD;
        background: #eee;
    }
    .kampanya-each-div:hover .kullanilabilir-kampanya{
        border: 1px solid white;
        background: #00C851;
        color: white;
    }
    .kampanya-ad{
        font-size: 15px;
    }
    .text-muted{
        font-size: 13px;
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    button{
        outline:none !important;
    }
    .kullanilabilir-kampanya{
        color: #00C851;
        border: 1px solid #00C851;
        border-radius: 5px;
        padding: 5px;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        transition: .3s;
    }
    .kullanilamaz-kampanya{
        color: #fc9c9c;
        border: 1px solid #fc9c9c;
        border-radius: 5px;
        padding: 5px;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
    }
    .kampanyanin-kazanci{
        color: #00C851;
        font-weight: 800;
        text-transform: uppercase;
        font-size: 12px;
        margin-left: 5px;
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
        max-width: 500px;
        min-width: 450px;
        position: absolute;
        top: 20px;
        padding: 30px;
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
    .kamp-kaldirildi{
        color: red;
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .birlestirilebilir{
        position: absolute;
        top: 65px;
        right: 9px;
        font-size: 11px;
        font-weight: 400;
        color: #0099CC;
        transition: .3s;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 5px 5px 3px 5px;
    }
    .kampanya-each-div:hover .birlestirilebilir{
        border: 1px solid white;
        background: #2BBBAD;
        color: white;
    }
    .img-width{
        max-width: 85px;
        max-height: 95px;
        margin: -10px;
        object-fit: contain;
    }
</style>