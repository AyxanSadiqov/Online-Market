Bu sayfadaki puf noktalar:
1 - Bu sayfa UrunPage-de kullaniliyor(yani o sayfanin child-i)
2 - Bu sayfa SepetAdetInput gibi degil. SepetAdetInput-tan farkli olarak dinamik olarak istenilen yerde kullanilabilir
3 - Bu component AltgrupUrunler ve AramaPage-de kullaniliyor. AltgrupUrunler-de gelen urunlerin liste.birim-i string, 
    AramaPage-de gelen urunlerin liste.birim-i integer. Bu yuzden this.liste.birim-in gectigi her yer integer-a
    donusturulup oyle islem yaptiriliyor.
<template>
    <div v-cloak>
        <div class="input-group">
            <transition name="bounce">
                <span v-if="showMinus" class="badge rounded-pill bg-danger minus">
                    <span v-if="parseInt(liste.birim)==0">-1</span>
                    <span v-else>-0.5</span>
                </span>
            </transition>
            <transition name="bounce">
                <span v-if="showPlus" class="badge rounded-pill bg-success plus">
                    <span v-if="parseInt(liste.birim)==0">+1</span>
                    <span v-else>+0.5</span>
                </span>
            </transition>
            <span @click="adetAzalt()" class="input-group-addon prefix noselect" :style="adetInputColor">-</span>
            <input v-if="parseInt(liste.birim)==0" :value="urunAdet" class="text-center" :style="adetInputArasiColor" readonly>
            <input v-else :value="urunKgAdet" class="text-center" :style="adetInputArasiColor" readonly>
            <span @click="adetArttir()" class="input-group-addon suffix noselect" :style="adetInputColor">+</span>
        </div>
        <button @click="sepeteEkle(liste)" type="button" data-toggle="modal" :data-target="dataTarget" class="btn btn-sm mr-1 mb-2 cart-button z-depth-0" :class="classClicked" :style="sepetButtonColor">
            <span class="add-to-cart">{{ $t('Add to cart') }}</span>
            <span class="added">Eklendİ</span>
            <i class="fas fa-shopping-cart"></i>
            <i class="fas fa-box"></i>
        </button>

        <UrunEklendiMesaji :showUrunEklendi="showUrunEklendi" :eklenenUrun="eklenenUrun" :eklenenUrunAdeti="eklenenUrunAdeti" @uruneklendi="uruneklendiMi" :myTimeOut="myTimeOut" :birimAdetKg="birimAdetKg" />
        <StokSayisiMesaji :showStokSayisiMesaji="showStokSayisiMesaji" @stoksayisimesaj="stoksayisimesajMi" :myTimeOut="myTimeOut" />
        <UrunFarkliDepodan :showFarkliDepo="showFarkliDepo" @farklidepo="farklidepoMu" :myTimeOut="myTimeOut" />
        <UrunEklemekIcinGirisYap />
    </div>
</template>

<script>
import UrunEklendiMesaji from "@/components/UrunEklendiMesaji"
import StokSayisiMesaji from "@/components/StokSayisiMesaji"
import UrunFarkliDepodan from "@/components/UrunFarkliDepodan"
import UrunEklemekIcinGirisYap from "@/components/UrunEklemekIcinGirisYap"
import { mapGetters } from 'vuex'

export default {
    props: ["liste"],
    components : {
        UrunEklendiMesaji,
        StokSayisiMesaji,
        UrunFarkliDepodan,
        UrunEklemekIcinGirisYap,
    },
    data(){
        return{
            urunAdet : 1, // adet inputta gorunecek urun adeti
            urunKgAdet : 0.5, // kgli urunlerde gorunecek adet
            birimAdetKg : "", // eklendi mesajinda gosterilecek 1 Adet mi yoksa 1 Kg mi kontrolu icin
            showMinus : false, // -1 badge-nin show/hide-i icin
            showPlus : false, // +1 badge-nin show/hide-i icin
            showUrunEklendi : false, // urun eklendi mesajinin show/hide-i icin
            eklenenUrun : '', // eklenecek urunun adi buraya yazilir
            eklenenUrunAdeti : '', // eklenecek urunun adeti buraya yazilir
            showStokSayisiMesaji : false, // urun adet sayisi stoktan fazlaysa mesajin show/hide-i icin
            showFarkliDepo : false, // ayni urun farkli depolardan eklenmek istenirse mesajin show/hide-i icin
            dataTarget : "", // giris yapilmadigi taktirde sepete ekleye basarken button data-target alani icin
            // UrunEklendiMesaji.vue icinde mouse enter oldugunda sayac sifirlansin diye setTimeout degeri myTimeOut-a atanir
            myTimeOut : "", // urun eklendi mesajinin settimeout degeri buraya yazilip, mesaj hover oldugunda bu deger sifirlanir
            classClicked : "", // sepete ekleye tiklandiginda eklenecek class efekti icin
        }
    },
    computed : {
        ...mapGetters(["adetInputColor","adetInputArasiColor","sepetButtonColor"]),
    },
    methods : {
        adetAzalt(){
            if(this.urunAdet == 1){
                this.urunAdet
            }
            else{
                this.urunAdet -= 1
                this.showMinus = true
                if(this.showMinus==true){
                    setTimeout(() => this.showMinus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
                }
            }
            if(this.urunKgAdet == 0.5){
                this.urunKgAdet
            }
            else{
                this.urunKgAdet -= 0.5
                this.showMinus = true
                if(this.showMinus==true){
                    setTimeout(() => this.showMinus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
                }
            }
        },
        adetArttir(){
            if(parseInt(this.liste.birim) === 0){
                this.urunAdet += 1
                this.showPlus = true
                if(this.showPlus==true){
                    setTimeout(() => this.showPlus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
                }
            }else if(parseInt(this.liste.birim) === 1){
                this.urunKgAdet += 0.5
                this.showPlus = true
                if(this.showPlus==true){
                    setTimeout(() => this.showPlus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
                }
            }
        },
        buttonClickedEffect(){
            this.classClicked = "clicked-cart-button"
            setTimeout(() => this.classClicked = "", 2000)
        },
        sepeteEkle(liste){
            var getUserInLocal = localStorage.getItem("user")
            if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
                this.dataTarget = "" // ileride olur da sıkıntı cikmasin diye modali gostermek icin gerekli data-target alani sifirlanir
                if(localStorage.getItem("sepet") == null){
                    localStorage.setItem("sepet", "[]")
                }
                var str = JSON.stringify(liste).slice(1, -1) // tiklanan liste bilgilerinden {} bu stringler silinir
                var adetTostok = str.replace('"adet"','"stok"') // adet yerine stok yazilir
                //
                var localsepet = localStorage.getItem("sepet")
                var slicelocalsepet = localsepet.slice(2, -2)
                var listeid = JSON.stringify(parseInt(liste.id))
                var listead = JSON.stringify(liste.ad)
                if(slicelocalsepet.includes(listead)){ // eger secilen liste sepette varsa bu kosul saglanir
                    var first = slicelocalsepet.indexOf(listeid) // adetTostok-un basladigi index alinir
                    // sikinti cikarsa +12 degerini degistir. 100 urunden fazla eklenmek istendiginde de hata veriyor olabilir
                    // NOT : +12 idi +13 yapildi (18-Feb-21 tarihinde) 100 urun uzerinde sikinti olmuyor. o anki denemelere gore bir sikinti yok gibiydi
                    // NOT : aramapage-de urun ekleyip, ayni urunu urunlerden bir daha eklendiginda sikinti verdigi icin yukaridaki not gecersiz olmus oluyor..
                    // .. +12, +13 yerine, tiklanilan urun uzuluguna belirli uzunlukta (+50 simdilik) ekleme yapilip islemler buna gore devam ediyor
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
                        if(parseInt(this.liste.birim) === 0){
                            seciliListeninAdetSayisiToInt = parseInt(adetikibasamaklimi) // adet degeri int-e cevrilir ve asagida da degeri 1 arttirilir
                            seciliListeninAdetSayisiToInt += this.urunAdet // ONEMLI: urunlere 'secilen rakam kadar urun ekle' ozelligi gelirse +1 degil de o rakam yazilacak buraya
                        }else if(parseInt(this.liste.birim) === 1){
                            seciliListeninAdetSayisiToInt = parseFloat(adetikibasamaklimi) // adet degeri float-a cevrilir ve asagida da degeri 1 arttirilir
                            seciliListeninAdetSayisiToInt += this.urunKgAdet // ONEMLI: urunlere 'secilen rakam kadar urun ekle' ozelligi gelirse +1 degil de o rakam yazilacak buraya
                        }
                        adet = '"adet":"'+seciliListeninAdetSayisiToInt+'"'
                        adetliListe = adetsizListe + adet
                        // asil kontrol burada yapiliyor. urun kendi sayfasindan eklendikten sonra sepet sayfasinda +1 yada -1 yapildiysa
                        // degeri arttirildiysa "13"-ten 14-e degisir("14"-e degil). gelen deger zaten tirnak iceriyorsa su anki kosul calisir..
                        // if(parseInt(this.liste.birim) === 0){
                        //     iparantezsizListe = adetTostok + (',"adet":"'+(seciliListeninAdetSayisiToInt-this.urunAdet)+'"')
                        // }else if(parseInt(this.liste.birim) === 1){
                        //     iparantezsizListe = adetTostok + (',"adet":"'+(seciliListeninAdetSayisiToInt-this.urunKgAdet)+'"')
                        // }
                    }else{
                        adetikibasamaklimi = seciliListeninAdetSayisi // adet iki basamakli
                        if(parseInt(this.liste.birim) === 0){
                            seciliListeninAdetSayisiToInt = parseInt(adetikibasamaklimi) // adet degeri int-e cevrilir ve asagida da degeri 1 arttirilir
                            seciliListeninAdetSayisiToInt += this.urunAdet // ONEMLI: urunlere 'secilen rakam kadar urun ekle' ozelligi gelirse +1 degil de o rakam yazilacak buraya
                        }else if(parseInt(this.liste.birim) === 1){
                            seciliListeninAdetSayisiToInt = parseFloat(adetikibasamaklimi) // adet degeri int-e cevrilir ve asagida da degeri 1 arttirilir
                            seciliListeninAdetSayisiToInt += this.urunKgAdet // ONEMLI: urunlere 'secilen rakam kadar urun ekle' ozelligi gelirse +1 degil de o rakam yazilacak buraya
                        }
                        adet = '"adet":"'+seciliListeninAdetSayisiToInt+'"'
                        adetliListe = adetsizListe + adet
                        // ..yukaridaki if-deki yorumun devami olarak eger deger tirnak icermiyorsa asagidaki degisim isleminde hata oldugu icin
                        // iparantezsizListe-de ileride "adet":14 olarak degisim yapilacak sekilde ayarlanir
                        // if(parseInt(this.liste.birim) === 0){
                        //     iparantezsizListe = adetTostok + (',"adet":'+(seciliListeninAdetSayisiToInt-this.urunAdet)+'')
                        // }else if(parseInt(this.liste.birim) === 1){
                        //     iparantezsizListe = adetTostok + (',"adet":'+(seciliListeninAdetSayisiToInt-this.urunKgAdet)+'')
                        // }
                    }
                    // stok sayisi kontrolu. burada urun ilk defa eklenmiyor. var olan bir urune ekleme yapildigi icin kontrolumuz 2 degerin toplami uzerinden yapilir
                    // urunAdet ile localstorage-deki urun adetinin(yani adetikibasamaklimi) toplami toplam urun sayisini veriyor
                    if(this.urunAdet + parseInt(adetikibasamaklimi) > liste.adet || this.urunKgAdet + parseFloat(adetikibasamaklimi) > liste.adet){
                        this.showStokSayisiMesaji = true
                        this.myTimeOut = setTimeout(() => this.showStokSayisiMesaji = false, 3000)
                    }
                    else{ // eger stok asimi yoksa normal ekleme yapilir
                        // eger ayni urun farkli depolardan eklenmek istenirseki kontrol icin
                        var depoKontrolUrunListe
                        var depoKontrolUrunParantezsiz // "adet:12}" durumu icin
                        var dIndex = slicelocalsepet.indexOf(listeid)
                        var depoKontrolUrun = depoKontrolUrun = slicelocalsepet.slice(dIndex-5,dIndex += adetTostok.length+50)
                        depoKontrolUrun.includes('}') ? depoKontrolUrunParantezsiz = depoKontrolUrun.slice(0,-1) : depoKontrolUrunParantezsiz = depoKontrolUrun
                        while(depoKontrolUrunParantezsiz.includes('}')){
                            depoKontrolUrunParantezsiz = depoKontrolUrunParantezsiz.slice(0,-1)
                        }
                        // console.log(depoKontrolUrunParantezsiz)
                        var karsilastirma
                        if(depoKontrolUrunParantezsiz[0] === '"'){
                            depoKontrolUrunListe = JSON.parse("{"+depoKontrolUrunParantezsiz+"}")
                            karsilastirma = depoKontrolUrunParantezsiz // local sepeti guncellemek icin (eski urunle karsilastirma)
                        }else{
                            depoKontrolUrunListe = JSON.parse('{"'+depoKontrolUrunParantezsiz+'}')
                            karsilastirma = '"'+depoKontrolUrunParantezsiz // local sepeti guncellemek icin (eski urunle karsilastirma)
                        }
                        // console.log(depoKontrolUrunListe.id)
                        // var depoKontrolUrunIndex = depoKontrolUrun.indexOf("id")
                        // var gecicidepoKontrolUrunID = depoKontrolUrun.slice(depoKontrolUrunIndex+5,depoKontrolUrunIndex+11) // id 7 basamakli olacak sekilde kesilir
                        // var depoKontrolUrunID
                        // if(gecicidepoKontrolUrunID.includes('"')){ // 25891" seklinde ise bir daha kesilir
                        //     depoKontrolUrunID = gecicidepoKontrolUrunID.slice(0,-1)
                        // }else{ // degilse normaline esit olur
                        //     depoKontrolUrunID = gecicidepoKontrolUrunID
                        // }
                        if(parseInt(liste.id) === parseInt(depoKontrolUrunListe.id)){ // ayni depodan demektir
                            // depo kontrolu oncesinde var olan kod alani START
                            // console.log("---------")
                            // console.log(slicelocalsepet)
                            // console.log(iparantezsizListe)
                            // console.log(adetliListe)
                            // console.log(karsilastirma)
                            var guncellenmisYeniListe = slicelocalsepet.replace(karsilastirma,adetliListe) // eski liste ile yeni liste yer degistirildi
                            var parantezliguncellenmisYeniListe = "[{"+guncellenmisYeniListe+"}]"
                            localStorage.removeItem("sepet") // localstorage-deki eski sepet silindi
                            localStorage.setItem("sepet", JSON.stringify(JSON.parse(parantezliguncellenmisYeniListe))) // sepetin son hali localstorage-e eklendi
                            // buraya kadar
                            this.eklenenUrun = liste.ad // her sepete ekleye tiklandiginda, tiklanan urunun adi eklenenUrun-e yazilir
                            if(parseInt(this.liste.birim) === 0){
                                this.eklenenUrunAdeti = this.urunAdet
                                this.birimAdetKg = "adet"
                            }else if(parseInt(this.liste.birim) === 1){
                                this.eklenenUrunAdeti = this.urunKgAdet
                                this.birimAdetKg = "kg"
                            }
                            this.showUrunEklendi = true
                            if(this.showUrunEklendi==true){
                                this.myTimeOut = setTimeout(() => this.showUrunEklendi = false, 3500)
                            }
                            this.buttonClickedEffect()
                            // this.urunAdet = 1 // sayfa yenilenmedigi takdirde urun adeti bir once arttirilan adet sayisinda kaliyordu. her urun eklendikten sonra adet 1-e esitlensin diye
                            // depo kontrolu oncesinde var olan kod alani END

                        }else{ // farkli depodan demektir
                            this.showFarkliDepo = true
                            if(this.showFarkliDepo==true){
                                this.myTimeOut = setTimeout(() => this.showFarkliDepo = false, 2500)
                            }
                        }
                    }
                }else{ // eger secilen urun sepette yoksa bu kosul saglanir
                    this.urunAdet
                    if(this.urunAdet > liste.adet || this.urunKgAdet > liste.adet){ // stok sayisi kontrolu. burada urun ilk defa ekleniyor oldugu icin urun.adet ile kontrol saglaniyor. adet=stok yani ileride kafa karismasin
                        this.showStokSayisiMesaji = true
                        this.myTimeOut = setTimeout(() => this.showStokSayisiMesaji = false, 3000)
                    }
                    else{ // secilen urun adet sayisi stok sayisindan az ise bu kosul, yani urun secilen urun adeti kadar normal eklenir
                        var parantezsizListe
                        if(parseInt(this.liste.birim) === 0){
                            parantezsizListe = adetTostok + (',"adet":"'+this.urunAdet+'"') // tiklanan urune adet eklenir
                        }else if(parseInt(this.liste.birim) === 1){
                            parantezsizListe = adetTostok + (',"adet":"'+this.urunKgAdet+'"') // tiklanan urune adet eklenir
                        }
                        var parantezliListe = "{"+parantezsizListe+"}" // {} parantezli hale geri getirilir
                        var eski_data = JSON.parse(localStorage.getItem("sepet"))
                        eski_data.push(JSON.parse(parantezliListe)) // degisikliklerin son hali array-e eklenir.
                        localStorage.setItem("sepet", JSON.stringify(eski_data))
                        // buraya kadar
                        this.eklenenUrun = liste.ad // her sepete ekleye tiklandiginda, tiklanan urunun adi eklenenUrun-e yazilir
                        if(parseInt(this.liste.birim) === 0){
                            this.eklenenUrunAdeti = this.urunAdet
                            this.birimAdetKg = "adet"
                        }else if(parseInt(this.liste.birim) === 1){
                            this.eklenenUrunAdeti = this.urunKgAdet
                            this.birimAdetKg = "kg"
                        }
                        this.showUrunEklendi = true
                        if(this.showUrunEklendi==true){
                            this.myTimeOut = setTimeout(() => this.showUrunEklendi = false, 3500)
                        }
                        this.buttonClickedEffect()
                        // this.urunAdet = 1 // sayfa yenilenmedigi takdirde urun adeti bir once arttirilan adet sayisinda kaliyordu. her urun eklendikten sonra adet 1-e esitlensin diye
                    }
                }
            }else{ // kullanici kaydi yoksa
                this.dataTarget = "#SepeteEklemekIcinGirisYap" // buton icindeki data-target alani dolsun..
            }
        },
        uruneklendiMi(params){ // UrunEklendiMesaji.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showUrunEklendi = params
        },
        stoksayisimesajMi(params){ // StokSayisiMesaji.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showStokSayisiMesaji = params
        },
        farklidepoMu(params){ // UrunFarkliDepodan.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showFarkliDepo = params
        },
    },
    created(){}
}
</script>

<style scoped src="@/assets/css/addtocart.css"></style>
<style scoped>
    [v-cloak] > * { display:none; }
    button{
        width: 135px;
        position: relative;
        margin-left: 0px !important;
    }
    /* -1 Mesaji icin START */
    .bounce-enter-active {
        animation: bounce-in 1s;
    }
    .bounce-leave-active {
        animation: bounce-in 1s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }
    /* -1 Mesaji icin END */
    .minus{
        position: absolute;
        left: 12px;
        bottom: 40px;
        padding: 5px;
    }
    .plus{
        position: absolute;
        left: 103px;
        bottom: 40px;
        padding: 5px;
    }
    /* Urun adeti arti, eksi input alani START */
    .input-group-addon {
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        color: #555;
        background-color: #eee; /* +- renk degisimi */
        border: 1px solid #ccc;
        white-space: nowrap;
        vertical-align: middle;
        /* display: table-cell; */
    }
    input {
        position: relative;
        z-index: 2;
        width: 60px;
        /* display: table-cell; */
        /* padding: 6px; */
        margin: 0 -9px 0 -2px;
        border: 1px solid #ccc;
        outline:none;
    }
    .input-group-addon.prefix {
        border-radius: 10px 0px 0px 10px;
        border-right: 0;
        padding: 10px 17px 10px 17px;
    }
    .input-group-addon.suffix {
        border-radius: 0px 10px 10px 0px;
        border-left: 0;
        padding: 10px 17px 10px 19px;
    }
    .input-group {
        position: relative;
        margin-left: 1px !important;
        border-collapse: separate;
        font-size: 12px;
    }
    .prefix:hover{
        cursor: pointer;
    }
    .suffix:hover{
        cursor: pointer;
    }
    /* Urun adeti arti, eksi input alani END */
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
</style>