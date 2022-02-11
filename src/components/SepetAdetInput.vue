Bu sayfadaki puf noktalar:
1 - bu sayfa Sepet sayfasinin child-i
2 - props kullanimi var
3 - emits kullanimi var (emits, child-dan parent-e veri aktarimi zaman kullanilir ve child-da tanimlanir)
4 - props ile gelen verinin mutasyona ugramamasi icin yaklasim kullanildi. 'sepetim : this.sepetimm' gibi
5 - urun silindikten sonra sepetteki bir sonraki ya da bir onceki urunun adet degeri "2" degil de 2 seklinde oluyordu.
    ilk basta bu dikkate alinmamisti, sonradan sorun cozuldu. bu yuzdendir ki adetAzalt ve adetArttir fonksiyonlarinda kod sayisi fazla.
<template>
    <div v-cloak>
        <div class="input-group">
            <transition name="bounce">
                <span v-if="showMinus" class="badge rounded-pill bg-danger minus">
                    <span v-if="parseInt(sepet.birim)==0">-1</span>
                    <span v-else>-0.5</span>
                </span>
            </transition>
            <transition name="bounce">
                <span v-if="showPlus" class="badge rounded-pill bg-success plus">
                    <span v-if="parseInt(sepet.birim)==0">+1</span>
                    <span v-else>+0.5</span>
                </span>
            </transition>
            <span @click="adetAzalt(sepet)" class="input-group-addon prefix noselect" :style="adetInputColor">
                <span v-if="showMinusIcon">-</span>
                <span v-if="showTrashIcon"><i class="far fa-trash-alt"></i></span>
            </span>
            {{sepetAdetiBirMi(sepet)}}
            <input :value="sepet.adet" :v-if="(sepet.adet==1) ? sepetAdeti=1 : (sepet.adet==0.5) ? sepetAdeti=0.5 :sepetAdeti" class="text-center input" :style="adetInputArasiColor" readonly>
            <span @click="adetArttir(sepet)" :class="classDeaktif" :style="adetInputColor" class="input-group-addon suffix noselect">+</span>
        </div>

        <StokSayisiMesaji :showStokSayisiMesaji="showStokSayisiMesaji" @stoksayisimesaj="stoksayisimesajMi" :myTimeOut="myTimeOut" />
    </div>
    
</template>

<script>
import StokSayisiMesaji from "@/components/StokSayisiMesaji"
import { mapGetters } from 'vuex'

export default {
    props : ["sepet","sepetimm"],
    emits : ["urunlertoplamtutar","promosyonindirimidahiltutar","promosyonindirimi","sepetozetitoplamtutar"],
    data(){
        return{
            sepetim : this.sepetimm,
            showStokSayisiMesaji : false, // urun adet sayisi stoktan fazlaysa mesajin show/hide-i icin
            classDeaktif : '', // adet sayisi stoktan fazla oldugu durumda
            urunler_toplam_tutar : '',
            promosyon_indirimi_dahil_tutar : '',
            promosyon_indirimi : 0, // promosyon indirimi buradan degisir. gosterirken .toFixed(2) yapiliyor zaten, buradan direkt virgulsuz rakam yazilacak
            sepetOzeti_toplam_tutar : '',
            showMinus : false, // -1 badge-nin show/hide-i icin
            showPlus : false, // +1 badge-nin show/hide-i icin
            showTrashIcon : false,
            showMinusIcon : true,
            sepetAdeti : '', // sepetteki her urunun adet degeri buraya yazilir
            // UrunEklendiMesaji.vue icinde mouse enter oldugunda sayac sifirlansin diye setTimeout degeri myTimeOut-a atanir
            myTimeOut : "", // urun eklendi mesajinin settimeout degeri buraya yazilip, mesaj hover oldugunda bu deger sifirlanir
        }
    },
    components : {
        StokSayisiMesaji
    },
    computed : {
        ...mapGetters(["adetInputColor","adetInputArasiColor"]),
        sepetozeti:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.sepetOzeti;
            }
        }
    },
    methods : {
        sepetOzetiStore(){
            this.$store.commit('addSepetOzeti',{araToplam:this.urunler_toplam_tutar,
                promIndirimi:this.promosyon_indirimi.toFixed(2), promIndirimliTutar:this.promosyon_indirimi_dahil_tutar, 
                toplamTutar:this.sepetOzeti_toplam_tutar, sepetim:this.sepetim, hizmetBedeli:this.hizmetBedeli,
                hizmetBedeliAlindiMi:this.hizmetBedeliAlindiMi})
        },
        adetAzalt(sepet){
            // yeni
            var sepetAdet
            if(parseInt(sepet.birim) === 0){
                sepetAdet = parseInt(sepet.adet)
            }else if(parseInt(sepet.birim) === 1){
                sepetAdet = parseFloat(sepet.adet)
            }
            var str = JSON.stringify(sepet).slice(1, -1) // tiklanan urun
            var strindexofadet = str.indexOf("adet")
            var stradetsiz = str.slice(0,strindexofadet+6)
            var stradet = str.slice(strindexofadet+6,strindexofadet+10)
            var kontrol_stradet
            var stradetInt
            var stradetli
            if(stradet.includes('"')){
                kontrol_stradet = stradet.slice(1,-1)
                stradetInt = parseInt(kontrol_stradet)
                if(parseInt(sepet.birim) === 0){
                    stradetInt = sepetAdet - 1
                }else if(parseInt(sepet.birim) === 1){
                    stradetInt = sepetAdet - 0.5
                }
                sepet.adet = stradetInt
                if(parseInt(sepet.birim) === 0){
                    stradetli = stradetsiz + '"' + (sepet.adet+1) + '"'
                }else if(parseInt(sepet.birim) === 1){
                    stradetli = stradetsiz + '"' + (sepet.adet+0.5) + '"'
                }
            }
            else{
                kontrol_stradet = stradet
                stradetInt = parseInt(kontrol_stradet)
                if(parseInt(sepet.birim) === 0){
                    stradetInt = sepetAdet - 1
                }else if(parseInt(sepet.birim) === 1){
                    stradetInt = sepetAdet - 0.5
                }
                sepet.adet = stradetInt
                if(parseInt(sepet.birim) === 0){
                    stradetli = stradetsiz + (sepet.adet+1)
                }else if(parseInt(sepet.birim) === 1){
                    stradetli = stradetsiz + (sepet.adet+0.5)
                }
            }
            
            var localsepet = localStorage.getItem("sepet")
            var slicelocalsepet = localsepet.slice(2, -2) // parantezsiz tum localstorage-deki sepet
            var first = slicelocalsepet.indexOf(stradetli)
            var localdekiListe = slicelocalsepet.slice(first,first += stradetli.length) // localdeki tiklanan uru
            var seciliListeninAdetSayisiToInt
            if(parseInt(sepet.birim) === 0){
                seciliListeninAdetSayisiToInt = sepetAdet - 1
                if(seciliListeninAdetSayisiToInt === 1){
                    this.showTrashIcon = true
                    this.showMinusIcon = false
                }
            }else if(parseInt(sepet.birim) === 1){
                seciliListeninAdetSayisiToInt = sepetAdet - 0.5
                if(seciliListeninAdetSayisiToInt === 0.5){
                    this.showTrashIcon = true
                    this.showMinusIcon = false
                }
            }
            if(seciliListeninAdetSayisiToInt === 0){
                this.sepetim.splice(this.sepetim.indexOf(sepet), 1); // gecicisepet-ten tiklanilan urun silinir
                localStorage.setItem("sepet", JSON.stringify(this.sepetim)) // gecicisepet-ten tiklanilan urun silindikten sonra localstorage-e gecicisepet-in en son hali atilir. Boylelikle silinmek istenen urun sanki localstorage-den siliniyormus gibi bir yapi ortaya konuldu
            }else{
                sepet.adet = seciliListeninAdetSayisiToInt
                var adetliListe = stradetsiz + sepet.adet
                var guncellenmisYeniListe = slicelocalsepet.replace(localdekiListe,adetliListe) // eski liste ile yeni liste yer degistirildi
                var parantezliguncellenmisYeniListe = JSON.parse("[{"+guncellenmisYeniListe+"}]")
                localStorage.removeItem("sepet")
                localStorage.setItem("sepet", JSON.stringify(parantezliguncellenmisYeniListe))
                this.classDeaktif = '' // eksi tusuna basildiginda deaktif class-ini kaldirmak icin
            }
            // her urun silindiginde asagidaki bilgiler guncellensin diye START
            this.urunler_toplam_tutar = this.sepetim.reduce((acc, item) => acc + parseFloat(item.satisfiyat * item.adet), 0).toFixed(2)
            this.promosyon_indirimi_dahil_tutar = (this.urunler_toplam_tutar - this.promosyon_indirimi).toFixed(2)
            this.sepetOzeti_toplam_tutar = this.promosyon_indirimi_dahil_tutar + ' TL'
            // her urun silindiginde yukaridaki bilgiler guncellensin diye END
            this.$emit("urunlertoplamtutar", this.urunler_toplam_tutar)
            this.$emit("promosyonindirimidahiltutar", this.promosyon_indirimi_dahil_tutar)
            this.$emit("promosyonindirimi", this.promosyon_indirimi)
            this.showMinus = true
            if(this.showMinus==true){
                setTimeout(() => this.showMinus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
            }
            this.sepetOzetiStore() // sepet odeme sayfasindaki sepet ozeti alani icerisindeki bilgilerin doldurulmasi icin
        },
        adetArttir(sepet){
            // yeni
            var sepetAdet
            if(parseInt(sepet.birim) === 0){
                sepetAdet = parseInt(sepet.adet)
            }else if(parseInt(sepet.birim) === 1){
                sepetAdet = parseFloat(sepet.adet)
            }
            var str = JSON.stringify(sepet).slice(1, -1) // tiklanan urun
            var strindexofadet = str.indexOf("adet")
            var stradetsiz = str.slice(0,strindexofadet+6)
            var stradet = str.slice(strindexofadet+6,strindexofadet+10) // adet-ten sonraki 4 karakter alinir...
            var kontrol_stradet
            var stradetInt
            var stradetli
            if(stradet.includes('"')){ // ...eger alinan 4 karakter icinde tirnak varsa bu islem
                kontrol_stradet = stradet.slice(1,-1) // bir tek rakam kalacak hale getirilir
                stradetInt = parseInt(kontrol_stradet)
                if(parseInt(sepet.birim) === 0){
                    stradetInt = sepetAdet + 1
                }else if(parseInt(sepet.birim) === 1){
                    stradetInt = sepetAdet + 0.5
                }
                sepet.adet = stradetInt
                if(parseInt(sepet.birim) === 0){
                    stradetli = stradetsiz + '"' + (sepet.adet-1) + '"'
                }else if(parseInt(sepet.birim) === 1){
                    stradetli = stradetsiz + '"' + (sepet.adet-0.5) + '"'
                }
            }
            else{ // ...eger alinan 4 karakter icinde tirnak yoksa bu islem
                kontrol_stradet = stradet // tirnak olmadigi icin direkt rakamin kendisi demektir. o yuzden bir sonraki islemler bunun uzerinden yapilir
                stradetInt = parseInt(kontrol_stradet)
                if(parseInt(sepet.birim) === 0){
                    stradetInt = sepetAdet + 1
                }else if(parseInt(sepet.birim) === 1){
                    stradetInt = sepetAdet + 0.5
                }
                sepet.adet = stradetInt
                if(parseInt(sepet.birim) === 0){
                    stradetli = stradetsiz + (sepet.adet-1)
                }else if(parseInt(sepet.birim) === 1){
                    stradetli = stradetsiz + (sepet.adet-0.5)
                }
            }
            
            var localsepet = localStorage.getItem("sepet")
            var slicelocalsepet = localsepet.slice(2, -2) // parantezsiz tum localstorage-deki sepet
            var first = slicelocalsepet.indexOf(stradetli)
            var localdekiListe = slicelocalsepet.slice(first,first += stradetli.length) // localdeki tiklanan urun
            var seciliListeninAdetSayisiToInt
            if(parseInt(sepet.birim) === 0){
                seciliListeninAdetSayisiToInt = sepetAdet + 1
                if(seciliListeninAdetSayisiToInt !== 1){ // urun sayisi 1e esit olmadigi durumda trash iconunun hide-i icin kontrol
                    this.showTrashIcon = false
                    this.showMinusIcon = true
                    this.sepetAdeti = '' // sepetAdetiBirMi() fonksiyonunda kontrol 1-e esit miye gore yapildigi icin sepetAdet degeri 1-den farkli bir deger aldiginda trash iconu gizlenir
                }
            }else if(parseInt(sepet.birim) === 1){
                seciliListeninAdetSayisiToInt = sepetAdet + 0.5
                if(seciliListeninAdetSayisiToInt !== 0.5){ // urun sayisi 1e esit olmadigi durumda trash iconunun hide-i icin kontrol
                    this.showTrashIcon = false
                    this.showMinusIcon = true
                    this.sepetAdeti = '' // sepetAdetiBirMi() fonksiyonunda kontrol 1-e esit miye gore yapildigi icin sepetAdet degeri 1-den farkli bir deger aldiginda trash iconu gizlenir
                }
            }
            if(seciliListeninAdetSayisiToInt > sepet.stok){
                this.showStokSayisiMesaji = true
                this.myTimeOut = setTimeout(() => this.showStokSayisiMesaji = false, 3000)
                this.classDeaktif = 'deaktif'
                sepet.adet = parseInt(sepet.stok)
            }else{
                sepet.adet = seciliListeninAdetSayisiToInt
                var adetliListe = stradetsiz + sepet.adet
                var guncellenmisYeniListe = slicelocalsepet.replace(localdekiListe,adetliListe) // eski liste ile yeni liste yer degistirildi
                var parantezliguncellenmisYeniListe = JSON.parse("[{"+guncellenmisYeniListe+"}]")
                localStorage.removeItem("sepet")
                localStorage.setItem("sepet", JSON.stringify(parantezliguncellenmisYeniListe))
            }
            // her urun silindiginde asagidaki bilgiler guncellensin diye START
            this.urunler_toplam_tutar = this.sepetim.reduce((acc, item) => acc + parseFloat(item.satisfiyat * item.adet), 0).toFixed(2)
            this.promosyon_indirimi_dahil_tutar = (this.urunler_toplam_tutar - this.promosyon_indirimi).toFixed(2)
            this.sepetOzeti_toplam_tutar = this.promosyon_indirimi_dahil_tutar + ' TL'
            // her urun silindiginde yukaridaki bilgiler guncellensin diye END
            this.$emit("urunlertoplamtutar", this.urunler_toplam_tutar)
            this.$emit("promosyonindirimidahiltutar", this.promosyon_indirimi_dahil_tutar)
            this.$emit("promosyonindirimi", this.promosyon_indirimi)
            this.showPlus = true
            if(this.showPlus==true){
                setTimeout(() => this.showPlus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
            }
            // alisverisi tamamla butonuna tiklanildiginda sepet odeme sayfasindaki sepet ozeti alani icindeki bilgiler dolduruldugu icin,
            // tarayicinin kendi uzerinden sayfalar arasi ileri geri yapildiginda sepetOzeti store eski degerinde kaliyordu.
            // sepetOzetiStore() fonksiyonu bu durumu handle etmek icin. kisaca sepet odeme sayfasindaki sepet ozeti alani bir tek alisverisi tamamla butonuna
            // tiklandiginda degil, urun sayisi arttirildiginda, azaltildiginda ve urun kaldirildiginda da guncel son degerler getters ile doldurulur
            this.sepetOzetiStore()
        },
        sepetAdetiBirMi(sepet){
            if(parseInt(sepet.birim) === 0){
                if(this.sepetAdeti === 1){ // sepetAdeti 1-e esit oldugu durumda trash iconu gozukur, minus icon(-) gizlenir
                    this.showTrashIcon = true
                    this.showMinusIcon = false
                }
            }else if(parseInt(sepet.birim) === 1){
                if(this.sepetAdeti === 0.5){ // sepetAdeti 1-e esit oldugu durumda trash iconu gozukur, minus icon(-) gizlenir
                    this.showTrashIcon = true
                    this.showMinusIcon = false
                }
            }
        },
        stoksayisimesajMi(params){ // StokSayisiMesaji.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showStokSayisiMesaji = params
        },
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 1180px){
        .input { width: 50px !important; }
        .prefix{ width: 30px !important; }
        .suffix{ width: 30px !important; }
    }
    @media (max-width : 500px){
        .input-group {
            margin-right: 15px !important; /* yeni eklendi sikinti olursa burayi sil */
        }
        .input { width: 71px !important; }
        .prefix{ width: 30px !important; }
        .suffix{ width: 30px !important; }
    }
    @media (max-width : 420px){
        .input { width: 70px !important; }
        .prefix{ width: 30px !important; }
        .suffix{ width: 30px !important; }
        .input-group{
            font-size: 13px;
            width: 130px;
        }
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
        left: 9px;
        bottom: 40px;
        padding: 5px;
    }
    .plus{
        position: absolute;
        left: 105px;
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
        display: table-cell;
    }
    .input {
        position: relative;
        z-index: 2;
        width: 60px;
        display: table-cell;
        padding: 6px;
        border: 1px solid #ccc;
        outline:none;
    }
    .suffix input {
        border-radius: 4px 0px 0px 4px;
    }
    .suffix .input-group-addon {
        border-left: 0;
        border-radius: 0px 4px 4px 0px;
    }
    .prefix input {
        border-radius: 0px 4px 4px 0px;
    }
    .prefix .input-group-addon {
        border-right: 0;
        border-radius: 4px 0px 0px 4px;
    }
    .input-group-addon.prefix {
        border-radius: 10px 0px 0px 10px;
        border-right: 0;
    }
    .input-group-addon.suffix {
        border-radius: 0px 10px 10px 0px;
        border-left: 0;
    }
    .input-group {
        position: relative;
        border-collapse: separate;
    }
    .prefix{
        width: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .suffix{
        width: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .deaktif{
        pointer-events: none;
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