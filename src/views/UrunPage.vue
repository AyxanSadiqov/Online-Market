Bu sayfadaki puf noktalar:
1 - Bu sayfaya Urunler ve AltgrupUrunler sayfasindan parametreler geliyor. Urunler listelenirken sikinti olusmasin
diye params.altg_ad ile bazi kontroller yapildi; 'fetchUrunler()'de, 'sayfa konum bar'da, 'urun adi altindaki altg_ad'da
2 - Ilk basta AdetInput-daki arti ya da eksiye basilmadigi taktirde urunAdeti data icindeki tanimlandigi uzere hep 1 oluyordu.
    Kgli urun olsa bile 1 ekleniliyordu. Bu olay kontrol altina alindi ve gerekli gelistirmeler yapildi.
<template>
    <div>
        <Navbar />
        <SepetButton />
        <BottomNavMenu />
        <div class="row m-4">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12">
                <!-- Sayfa konum bar START -->
                <div v-if="showYukleniyor">
                    <div class="skeleton-card-bar"></div>
                </div>
                <div v-if="!showYukleniyor" class="row mt-3 noselect">
                    <!-- UrunPage-e yani bu sayfaya iki (Urunler ve AltgrupUrunler) sayfadan bilgi geliyor. Farklandirma altg_ad uzerinden yapiliyor -->
                    <div v-if="$route.params.altg_ad!=undefined" class="urunpage-bar-div" style="float: left;">
                        <router-link to="/" class="urunpage-bar">{{ $t('Home Page') }}</router-link> &nbsp;<i class="fas fa-angle-right"></i>&nbsp;
                        <router-link :to="{ name : 'AltgruplarPage', params : {id:$route.params.g_id, g_ad:$route.params.g_ad} }" class="urunpage-bar">{{$route.params.g_ad}}</router-link> &nbsp;<i class="fas fa-angle-right"></i>&nbsp;
                        <router-link :to="{ name : 'UrunlerPage', params : {id:$route.params.altg_id, g_id:$route.params.g_id, g_ad:$route.params.g_ad, altg_ad:$route.params.altg_ad} }" class="urunpage-bar">{{$route.params.altg_ad}}</router-link> &nbsp;<i class="fas fa-angle-right"></i>&nbsp;
                        <span class="current-urunpage-bar">{{$route.params.urun_ad}}</span>
                    </div>
                    <div v-else class="urunpage-bar-div" style="float: left;">
                        <router-link to="/" class="urunpage-bar">{{ $t('Home Page') }}</router-link> &nbsp;<i class="fas fa-angle-right"></i>&nbsp;
                        <router-link :to="{ name : 'AltgruplarPage', params : {id:$route.params.g_id, g_ad:$route.params.g_ad} }" class="urunpage-bar">{{$route.params.g_ad}}</router-link> &nbsp;<i class="fas fa-angle-right"></i>&nbsp;
                        <span class="current-urunpage-bar">{{$route.params.urun_ad}}</span>
                    </div>
                </div>
                <!-- Sayfa konum bar END -->
                <hr style="background-color:white">
                <div v-if="showYukleniyor" class="row">
                    <div class="col-md-5 mb-4 mb-md-0">
                        <div class="card skeleton-card"></div>
                    </div>
                    <div class="col-md-7 mb-4 mb-md-0">
                        <div class="skeleton-card1"></div>
                    </div>
                </div>
                <div v-for="liste in tumUrunler" :key="liste.id">
                    <div v-for="urun in liste" :key="urun.id">
                        <div v-if="urun.ad==$route.params.urun_ad" class="row mt-4">
                            <div class="col-md-5 mb-4 mb-md-0">
                                <div class="view zoom overlay flex-center z-depth-0 urunpage-image-div">
                                    <img v-if="urun.barkod.length < 8" class="img-fluid w-100 urunpage-first" :src="imagecompany + ushp + '/' + urun.barkod + '.jpeg?' + urun.imageupdate" alt="">
                                    <img v-else class="img-fluid w-100 urunpage-first" :src="image + urun.barkod + '.jpeg?' + urun.imageupdate" alt="">
                                    <div class="mask flex-center waves-effect waves-light">
                                        <img v-if="urun.barkod.length < 8" class="img-fluid w-100 urunpage-second" :src="imagecompany + ushp + '/' + urun.barkod + '.jpeg?' + urun.imageupdate" alt="">
                                        <img v-else class="img-fluid w-100 urunpage-second" :src="image + urun.barkod + '.jpeg?' + urun.imageupdate" alt="">
                                        <div class="mask rgba-grey-slight"></div>
                                    </div>
                                </div>
                                <!-- <div class="mask flex-center waves-effect waves-light zoom z-depth-1 rounded urunpage-image-div">
                                    <img class="img-fluid w-100 urunpage-first" :src="image + urun.stokkod + '.jpeg'" alt="">
                                </div> -->
                                <IndirimYazisi :urun="urun" v-if="urun.kampanyalimi==1" />
                            </div>
                            <div class="col-md-7" :class="urunPage">
                                <h5>{{ urun.ad }}</h5>
                                <p class="mb-2 text-muted text-uppercase small">
                                    <!-- UrunPage-e yani bu sayfaya iki (Urunler ve AltgrupUrunler) sayfadan bilgi geliyor. Farklandirma altg_ad uzerinden yapiliyor -->
                                    <span v-if="$route.params.altg_ad!=undefined">{{ $route.params.altg_ad }}</span>
                                    <span v-else>{{ $route.params.g_ad }}</span>
                                </p>
                                <p>
                                    <span class="mr-1"><strong>{{ urun.satisfiyat }} TL</strong></span>
                                    <span v-if="urun.kampanyalimi==1" class="ml-1 text-grey"><s>{{ urun.kampanyasizsatisfiyat }} TL</s></span>
                                </p>
                                <p class="pt-1">{{ urun.aciklama }}</p>
                                <div class="table-responsive">
                                    <table class="table table-sm table-borderless mb-0" :class="urunPage">
                                        <tbody>
                                        <tr>
                                            <th class="pl-0 w-25" scope="row"><strong>{{ $t('Stock code') }}</strong></th>
                                            <td>{{ urun.stokkod }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- Bu urunun hepsi sizin sepetinizde START -->
                                <div v-if="showBuUrunSizin" class="card rgba-red-strong text-left z-depth-0 w-50 urun-hepsi">
                                    <div class="card-body">
                                        <p class="white-text mb-0 font-size-12">{{ $t('This product is all in your cart') }}.</p>
                                    </div>
                                </div>
                                <!-- Bu urunun hepsi sizin sepetinizde END -->
                                <hr style="background-color:white">
                                <div class="table-responsive mb-2">
                                    <table class="table table-sm table-borderless" :class="urunPage">
                                        <tbody>
                                        <tr>
                                            <td class="pl-0 pb-0 w-25">{{ $t('Amount') }}</td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0">
                                                <div class="urunpage-adetinput">
                                                    <AdetInput :urun="urun" @urunadet="urunadetMi" @artieksitiklandi="artieksitiklandiMi" />
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <button @click="sepeteEkle(urun)" id="sepeteEkleButtonID" data-toggle="modal" :data-target="dataTarget" type="button" class="btn btn-md urunpage-sepetbutton z-depth-0" :style="sepetButtonColor"><i class="fas fa-shopping-cart pr-2"></i>{{ $t('Add to cart') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <UrunEklendiMesaji :showUrunEklendi="showUrunEklendi" :eklenenUrun="eklenenUrun" :eklenenUrunAdeti="eklenenUrunAdeti" @uruneklendi="uruneklendiMi" :myTimeOut="myTimeOut" :birimAdetKg="birimAdetKg" />
        <StokSayisiMesaji :showStokSayisiMesaji="showStokSayisiMesaji" @stoksayisimesaj="stoksayisimesajMi" :myTimeOut="myTimeOut" />
        <UrunEklemekIcinGirisYap />

        <Footer />
        
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import SepetButton from "@/components/SepetButton"
import AdetInput from "@/components/AdetInput"
import UrunEklendiMesaji from "@/components/UrunEklendiMesaji"
import StokSayisiMesaji from "@/components/StokSayisiMesaji"
import BottomNavMenu from "@/components/BottomNavMenu"
import UrunEklemekIcinGirisYap from "@/components/UrunEklemekIcinGirisYap"
import IndirimYazisi from "@/components/IndirimYazisi"
import Footer from "@/components/Footer"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    metaInfo() {
        return{
            title: this.$route.params.urun_ad,
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    components : {
        Navbar,
        SepetButton,
        AdetInput,
        UrunEklendiMesaji,
        StokSayisiMesaji,
        BottomNavMenu,
        UrunEklemekIcinGirisYap,
        IndirimYazisi,
        Footer
    },
    data(){
        return{
            tumUrunler : [], // fetchUrunler() sorgusu sonrasi donen bilgileri bu array-e atilip, sonrasindaki tum urunler bu array uzerinden listeleniyor
            errors : [], // hata olursa buraya doner
            showUrunEklendi : false, // urun eklendi mesajinin show/hide-i icin
            eklenenUrun : '', // eklenecek urunun adi buraya yazilir
            eklenenUrunAdeti : '', // eklenecek urunun adeti buraya yazilir
            birimAdetKg : "", // eklendi mesajinda gosterilecek 1 Adet mi yoksa 1 Kg mi kontrolu icin
            showStokSayisiMesaji : false, // urun adet sayisi stoktan fazlaysa mesajin show/hide-i icin
            showBuUrunSizin : false, // secilen urun adet sayisi stok sayisina esit oldugu durumdai mesajin show/hide-i icin
            urunAdet : 1, // child-dan gelen 'urunAdet' degeri buraya yazilir
            showYukleniyor : true,
            dataTarget : "", // giris yapilmadigi taktirde sepete ekleye basarken button data-target alani icin
            // cookie bilgileri START
            udep : "",
            ushp : "",
            // cookie bilgileri END
            // UrunEklendiMesaji.vue icinde mouse enter oldugunda sayac sifirlansin diye setTimeout degeri myTimeOut-a atanir
            myTimeOut : "", // urun eklendi mesajinin settimeout degeri buraya yazilip, mesaj hover oldugunda bu deger sifirlanir
            artiEksiTiklandi : false, // aciklamasi AdetInput-da yapildi
            urunKgAdet : 0.5,
        }
    },
    computed : {
        ...mapGetters(["image","imagecompany","sepetButtonColor","urunPage","serverRequest"]),
    },
    methods : {
        urunadetMi(params){ // AdetInput.vue-dan yani child-dan gelen data urunAdet-e burada yazilir
            this.urunAdet = params
        },
        artieksitiklandiMi(params){
            this.artiEksiTiklandi = params
        },
        sepeteEkle(urun){
            if(this.artiEksiTiklandi === false){ // AdetInput-daki arti ya da eksiye tiklanilmadiysa. nicin kullanildigi data icindeki tanimlandigi yere bakilirsa anlasilir
                if(parseInt(urun.birim) === 0){
                    this.urunAdet
                }else if(parseInt(urun.birim) === 1){
                    this.urunAdet = this.urunKgAdet
                }
            }
            var getUserInLocal = localStorage.getItem("user")
            if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
                this.dataTarget = "" // ileride olur da sıkıntı cikmasin diye modali gostermek icin gerekli data-target alani sifirlanir
                if(localStorage.getItem("sepet") == null){
                    localStorage.setItem("sepet", "[]")
                }
                var str = JSON.stringify(urun).slice(1, -1) // tiklanan urun bilgilerinden {} bu stringler silinir
                var adetTostok = str.replace('"adet"','"stok"') // adet yerine stok yazilir
                //
                var localsepet = localStorage.getItem("sepet")
                var slicelocalsepet = localsepet.slice(2, -2)
                var listeid = JSON.stringify(parseInt(urun.id))
                var listead = JSON.stringify(urun.ad)
                if(slicelocalsepet.includes(listead)){ // eger secilen urun sepette varsa bu kosul saglanir
                    var first = slicelocalsepet.indexOf(listeid) // adetTostok-un basladigi index alinir
                    var localdekiListe; var sliceLocaldekiLste; var sliceListe
                    sliceLocaldekiLste = slicelocalsepet.slice(first-5,first += adetTostok.length+50) // slicelocalsepet adetTostok-un uzunlugu(+11 demek urunun adet ve degerini de al demek) kadar kesilir
                    sliceLocaldekiLste.includes('}') ? sliceListe = sliceLocaldekiLste.slice(0,-1) : sliceListe = sliceLocaldekiLste
                    while(sliceListe.includes('}')){
                        sliceListe = sliceListe.slice(0,-1)
                    }
                    sliceListe[0] === '"' ? localdekiListe = sliceListe : localdekiListe = '"' + sliceListe
                    // console.log(localdekiListe)
                    var localdekiListeFirst = localdekiListe.indexOf("adet") // burada, bir yukaridaki islemden sonra elde olunan stringteki(yani localdekiListe-deki) adet-in basladigi index alinir
                    var adetsizListe = localdekiListe.slice(0,localdekiListeFirst-1) // localdekiListe adet-e kadar kesilir
                    var seciliListeninAdetSayisi = localdekiListe.slice(localdekiListeFirst+6,localdekiListe.length) // adet-in degeri olan sayiya ulasildi
                    var adetikibasamaklimi // adetin iki basamakli olma ihtimaline karsi adeti tirnak isareti ile birlikte kesiyorum. duruma gore de asagida filtreliyorum 
                    var seciliListeninAdetSayisiToInt
                    var adet
                    var adetliListe
                    // var iparantezsizListe
                    if(seciliListeninAdetSayisi.includes('"')){
                        adetikibasamaklimi = seciliListeninAdetSayisi.slice(1,-1) // adet tek basamakli
                        if(parseInt(urun.birim) === 0){
                            seciliListeninAdetSayisiToInt = parseInt(adetikibasamaklimi) // adet degeri int-e cevrilir ve asagida da degeri 1 arttirilir
                        }else if(parseInt(urun.birim) === 1){
                            seciliListeninAdetSayisiToInt = parseFloat(adetikibasamaklimi) // adet degeri float-a cevrilir ve asagida da degeri 1 arttirilir
                        }
                        seciliListeninAdetSayisiToInt += this.urunAdet // ONEMLI: urunlere 'secilen rakam kadar urun ekle' ozelligi gelirse +1 degil de o rakam yazilacak buraya
                        adet = '"adet":"'+seciliListeninAdetSayisiToInt+'"'
                        adetliListe = adetsizListe + adet
                        // asil kontrol burada yapiliyor. urun kendi sayfasindan eklendikten sonra sepet sayfasinda +1 yada -1 yapildiysa
                        // degeri arttirildiysa "13"-ten 14-e degisir("14"-e degil). gelen deger zaten tirnak iceriyorsa su anki kosul calisir..
                        // iparantezsizListe = adetTostok + (',"adet":"'+(seciliListeninAdetSayisiToInt-this.urunAdet)+'"')
                    }else{
                        adetikibasamaklimi = seciliListeninAdetSayisi // adet iki basamakli
                        if(parseInt(urun.birim) === 0){
                            seciliListeninAdetSayisiToInt = parseInt(adetikibasamaklimi) // adet degeri int-e cevrilir ve asagida da degeri 1 arttirilir
                        }else if(parseInt(urun.birim) === 1){
                            seciliListeninAdetSayisiToInt = parseFloat(adetikibasamaklimi) // adet degeri float-a cevrilir ve asagida da degeri 1 arttirilir
                        }
                        seciliListeninAdetSayisiToInt += this.urunAdet // ONEMLI: urunlere 'secilen rakam kadar urun ekle' ozelligi gelirse +1 degil de o rakam yazilacak buraya
                        adet = '"adet":"'+seciliListeninAdetSayisiToInt+'"'
                        adetliListe = adetsizListe + adet
                        // ..yukaridaki if-deki yorumun devami olarak eger deger tirnak icermiyorsa asagidaki degisim isleminde hata oldugu icin
                        // iparantezsizListe-de ileride "adet":14 olarak degisim yapilacak sekilde ayarlanir
                        // iparantezsizListe = adetTostok + (',"adet":'+(seciliListeninAdetSayisiToInt-this.urunAdet)+'')
                    }
                    // stok sayisi kontrolu. burada urun ilk defa eklenmiyor. var olan bir urune ekleme yapildigi icin kontrolumuz 2 degerin toplami uzerinden yapilir
                    // urunAdet ile localstorage-deki urun adetinin(yani adetikibasamaklimi) toplami toplam urun sayisini veriyor
                    if(this.urunAdet + parseInt(adetikibasamaklimi) > urun.adet || this.urunAdet + parseFloat(adetikibasamaklimi) > urun.adet){
                        this.showStokSayisiMesaji = true
                        this.myTimeOut = setTimeout(() => this.showStokSayisiMesaji = false, 3000)
                        // console.log(this.urunAdet, '+', parseInt(adetikibasamaklimi), '>', urun.adet, '||', this.urunAdet, '+', parseFloat(adetikibasamaklimi), '>', urun.adet)
                    }
                    else{ // eger stok asimi yoksa normal ekleme yapilir
                        var depoKontrolUrunParantezsiz
                        var dIndex = slicelocalsepet.indexOf(listeid)
                        var depoKontrolUrun = depoKontrolUrun = slicelocalsepet.slice(dIndex-5,dIndex += adetTostok.length+50)
                        depoKontrolUrun.includes('}') ? depoKontrolUrunParantezsiz = depoKontrolUrun.slice(0,-1) : depoKontrolUrunParantezsiz = depoKontrolUrun
                        while(depoKontrolUrunParantezsiz.includes('}')){
                            depoKontrolUrunParantezsiz = depoKontrolUrunParantezsiz.slice(0,-1)
                        }
                        // console.log(depoKontrolUrunParantezsiz)
                        var karsilastirma
                        if(depoKontrolUrunParantezsiz[0] === '"'){
                            karsilastirma = depoKontrolUrunParantezsiz // local sepeti guncellemek icin (eski urunle karsilastirma)
                        }else{
                            karsilastirma = '"'+depoKontrolUrunParantezsiz // local sepeti guncellemek icin (eski urunle karsilastirma)
                        }
                        // console.log(karsilastirma)
                        var guncellenmisYeniListe = slicelocalsepet.replace(karsilastirma,adetliListe) // eski liste ile yeni liste yer degistirildi
                        var parantezliguncellenmisYeniListe = "[{"+guncellenmisYeniListe+"}]"
                        localStorage.removeItem("sepet") // localstorage-deki eski sepet silindi
                        localStorage.setItem("sepet", JSON.stringify(JSON.parse(parantezliguncellenmisYeniListe))) // sepetin son hali localstorage-e eklendi
                        // buraya kadar
                        this.eklenenUrun = urun.ad // her sepete ekleye tiklandiginda, tiklanan urunun adi eklenenUrun-e yazilir
                        // asagidaki if, else niye yazildigi unutuldugu taktirde aciklamasi data icindeki tanimlandigi yere bakilirsa anlasilir
                        if(this.artiEksiTiklandi === false){ // AdetInput-daki arti ya da eksiye tiklanilmadiysa
                            if(parseInt(urun.birim) === 0){
                                this.eklenenUrunAdeti = this.urunAdet
                                this.birimAdetKg = "adet"
                            }else if(parseInt(urun.birim) === 1){
                                this.eklenenUrunAdeti = this.urunKgAdet
                                this.birimAdetKg = "kg"
                            }
                        }else{ // tiklandiysa
                            this.eklenenUrunAdeti = this.urunAdet
                            if(parseInt(urun.birim) === 0){
                                this.birimAdetKg = "adet"
                            }else if(parseInt(urun.birim) === 1){
                                this.birimAdetKg = "kg"
                            }
                        }
                        this.showUrunEklendi = true
                        if(this.showUrunEklendi==true){
                            this.myTimeOut = setTimeout(() => this.showUrunEklendi = false, 2500)
                        }
                    }
                }else{ // eger secilen urun sepette yoksa bu kosul saglanir
                    this.urunAdet
                    if(this.urunAdet > urun.adet){ // stok sayisi kontrolu. burada urun ilk defa ekleniyor oldugu icin urun.adet ile kontrol saglaniyor. adet=stok yani ileride kafa karismasin
                        this.showStokSayisiMesaji = true
                        this.myTimeOut = setTimeout(() => this.showStokSayisiMesaji = false, 3000)
                    }
                    else{ // secilen urun adet sayisi stok sayisindan az ise bu kosul, yani urun secilen urun adeti kadar normal eklenir
                        var parantezsizListe = adetTostok + (',"adet":"'+this.urunAdet+'"') // tiklanan urune adet eklenir
                        var parantezliListe = "{"+parantezsizListe+"}" // {} parantezli hale geri getirilir
                        var eski_data = JSON.parse(localStorage.getItem("sepet"))
                        eski_data.push(JSON.parse(parantezliListe)) // degisikliklerin son hali array-e eklenir.
                        localStorage.setItem("sepet", JSON.stringify(eski_data))
                        // buraya kadar
                        this.eklenenUrun = urun.ad // her sepete ekleye tiklandiginda, tiklanan urunun adi eklenenUrun-e yazilir
                        // asagidaki if, else niye yazildigi unutuldugu taktirde aciklamasi data icindeki tanimlandigi yere bakilirsa anlasilir
                        if(this.artiEksiTiklandi === false){ // AdetInput-daki arti ya da eksiye tiklanilmadiysa
                            if(parseInt(urun.birim) === 0){
                                this.eklenenUrunAdeti = this.urunAdet
                                this.birimAdetKg = "adet"
                            }else if(parseInt(urun.birim) === 1){
                                this.eklenenUrunAdeti = this.urunKgAdet
                                this.birimAdetKg = "kg"
                            }
                        }else{ // tiklandiysa
                            this.eklenenUrunAdeti = this.urunAdet
                            if(parseInt(urun.birim) === 0){
                                this.birimAdetKg = "adet"
                            }else if(parseInt(urun.birim) === 1){
                                this.birimAdetKg = "kg"
                            }
                        }
                        this.showUrunEklendi = true
                        if(this.showUrunEklendi==true){
                            this.myTimeOut = setTimeout(() => this.showUrunEklendi = false, 2500)
                        }
                    }
                }
                // eger localstorage-deki adet sayisi stok sayisina esitse, yani o urunun tumu kullanicinin sepetinde ise bu kosul saglanir
                if(parseInt(adetikibasamaklimi) == urun.adet){
                    this.showBuUrunSizin = true
                }
            }else{ // kullanici kaydi yoksa
                this.dataTarget = "#SepeteEklemekIcinGirisYap" // buton icindeki data-target alani dolsun..
            }
        },
        getUid_Udep(){
            this.udep = this.decryptCookie("udep")
            this.ushp = this.decryptCookie("ushp")
        },
        async fetchUrunler(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_urunler');
                formData.append('grup', this.$route.params.g_id); // g_id ---> grup_id demek
                // bu sayfaya Urunler ve AltgrupUrunler-den parametreler geliyor. Altgrup altindaki urunleri listelerken
                // request-te altgrup degerine -1 yazilmasi lazim. Asagidaki kontrol yapisi bunun icin
                // Urunler sayfasindan params.altg_ad dolu geldigi halde AltgrupUrunler sayfasindan bu deger bos geliyor. kontroller params.altg_ad uzerinden yapildi
                if(this.$route.params.altg_ad != undefined){
                    formData.append('altgrup', this.$route.params.altg_id);
                }
                else{
                    formData.append('altgrup', '-1');
                }
                formData.append('depo', this.udep);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.tumUrunler = response.data // data() icerisinde de tanimlanan tumUrunler array-ine request sonrasi donen bilgiler yazilir
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
            if(this.tumUrunler.status != ""){
                this.showYukleniyor = false
            }
        },
        uruneklendiMi(params){ // UrunEklendiMesaji.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showUrunEklendi = params
        },
        stoksayisimesajMi(params){ // StokSayisiMesaji.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showStokSayisiMesaji = params
        },
    },
    created(){
        this.fetchUrunler() // sayfa render oldugunda request yapilir ve urunler listelenir
        // document.title = this.$route.params.urun_ad // sayfa render oldugunda title-a altgrup adi yazilir
    }
}
</script>

<style scoped>
    @media (max-width : 990px){
        #sepeteEkleButtonID{
            margin-bottom: 40px;
        }
    }
    @media (max-width : 500px){
        .row .urunpage-adetinput{
            padding-left: 33px;
        }
        .urun-hepsi{
            min-width: 100%;
        }
    }
    .urunpage-adetinput{
        padding-left: 0px;
    }
    .urunpage-bar-div{
        font-size: 13px;
        color: #c4c4c4;
        padding: 15px;
        overflow-x: auto; /* bar-in x ekseninde scroll-u icin */
        white-space: nowrap; /* bar-in x ekseninde scroll-u icin */
    }
    .urunpage-bar{
        border: 1px solid;
        border-radius: 5px;
        padding: 10px;
        color: #c4c4c4;
    }
    .urunpage-bar:hover{
        color: #5FA56C;
    }
    .current-urunpage-bar{
        color: #c4c4c4;
    }
    .urunpage-image-div{
        min-height: 350px;
        max-height: 450px;
        background-color: white;
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
    .urunpage-first{
        max-width: 120px;
        max-height: 170px;
        object-fit: contain;
    }
    .urunpage-second{
        max-width: 320px;
        max-height: 320px;
        object-fit: contain;
    }
    .urunpage-sepetbutton{
        margin: -10px 0px 0px 0px;
        border-radius: 10px;
    }
    .font-size-12{
        font-size: 12px;
    }

    /* skeleton loader START */
    .skeleton-card-bar{
        height: 30px;
        margin-left: -10px;
        background-image: linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc),
            linear-gradient(white, white);
        background-size: 8% 20px, 8% 20px, 15% 20px, 100% 100%;
        background-position: 1% 4px, 11% 4px, 23% 4px, 0 0;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    .skeleton-card{
        height: 350px;
        background-image: linear-gradient(white, white);
        background-size: 100% 100%;
        background-position: 0 0;
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
    .skeleton-card1{
        height: 350px;
        background-image: linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc),
            linear-gradient(white, white);
        background-size: 13% 20px, 8% 20px, 15% 20px, 16% 15px, 12% 17px, 17% 17px, 10% 17px, 15% 17px, 100% 1px, 7% 17px, 18% 30px, 18% 30px, 100% 100%;
        background-position: 1% 4px, 17% 4px, 30% 4px, 1% 40px, 1% 70px, 1% 110px, 1% 150px, 30% 150px, 1% 200px, 1% 230px, 1% 260px, 1% 310px, 0 0;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    /* skeleton loader END */
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
</style>