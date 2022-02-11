Bu sayfadaki puf noktalar:
1 - Bu sayfa SepetOdemePage-in child-i ayni zamanda
2 - SepetOdemePage-de kullanim sekline uygun olarak sayfa icindeki bazi yerler show/hide oluyor
2.1 - Ornek olarak sil butonu SepetOdemePage-de ekle butonuna donusuyor
3 - adres degisimi basarili bir sekilde oldugunda bunu diger sayfalarda da kullanabilmek icin global degisken tanimlandi (communicate.js-de)
4 - localstorage-deki koord: kullanicinin koordinati, kooord: deponun koordinati demektir. unutulursa buraya bakilsin
<template>
    <div v-cloak>
        <h4 class="mt-4 mb-4"><span class="first-word">A</span>dreslerim</h4>
        <!-- {{adreslerim}} -->
        <!-- <div v-for="adresler in adreslerim.response" :key="adresler.id">
            <div v-for="adres in adresler.adresler" :key="adres.id">
                {{adres}}
            </div>
        </div> -->

        <ModalHarita :showHarita="showHarita" @haritakapat="haritakapatMi" />
        
        <!-- Adres eklendi mesaj START bu alan Harita.vue-da yeni adres basarili sekilde eklenirse calisir -->
        <transition name="slide-fade">
            <div v-if="adresEklemeForm.showAdresEklendi" class="note note-success urun-silindi">
                Adresiniz başarılı bir şekilde <strong>eklendi.</strong>
            </div>
        </transition>
        <!-- Adres eklendi mesaj END -->

        <!-- Adres silindi mesaj START -->
        <transition name="slide-fade">
            <div v-if="showAdresSilindi" class="note note-danger urun-silindi">
                Adresiniz başarılı bir şekilde <strong>silindi.</strong>
            </div>
        </transition>
        <!-- Urun silindi mesaj END -->

        <div v-if="!showAdresBekleniyor" class="row text-muted ml-0">
            <span>Bekleniyor...</span>
        </div>
        <div v-if="showAdresHataIcerik" class="text-muted ml-0">
            <span>Beklenmedik bir hata oluştu <span class="uzgun">:(</span></span>
            <ul>
                <li><span @click="sayfayiYenile()">Sayfayı yenileyip</span> tekrar deneyin.</li>
                <li>Oturumunuzu kapatıp tekrar giriş yapın.</li>
            </ul>
        </div>
        {{baglantiDurumu()}}
        <div v-if="showInternetBagliMi" class="row ml-0">
            <p class="note note-danger baglanti-durumu"><strong>Bağlantı hatası:</strong> İnternete bağlı değilsiniz. Lütfen bağlantınızı kontrol edip tekrar deneyin.</p>
        </div>

        <div v-for="adresler in adreslerim.response" :key="adresler.id" class="row text-muted ml-0">
            <div v-if="adresler.adresler==''">
                <!-- Yeni giris yapildiktan sonra AdresSecimGiristenSonra.vue icinde kullaniciya adres secmeden devam edemeyecegini gosterecek yazi icin -->
                <div v-if="showAdresSecimGiristen_sonra" class="devam-icin">Devam edebilmek için lütfen adres ekleyin.</div>
                <span>Geçerli adresiniz bulunmamaktadır.</span>
            </div>
        </div>
        
        <div v-if="showAdresBekleniyor">
            <div v-for="adresler in adreslerim.response" :key="adresler.id" class="row text-muted ml-0 d-flex justify-content-center">
                <div v-for="adres in adresler.adresler" :key="adres.id" class="card col-md-11 ml-3 mr-4 mb-3" :class="{seciliadresclass:adres.id == checkSeciliAdres.id}">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{adres.ad}}
                            <span class="secili-adres" :class="{seciliadresyaziclass:adres.id == checkSeciliAdres.id}">- seçİlİ adresİm</span>
                        </h5>
                        <p class="card-text">
                            {{adres.adrestext}}
                        </p>
                        <p class="card-text">
                            {{adres.tarif}}
                        </p>
                        <div v-if="showProfilAdreslerim" id="adresSilButtonID" class="text-right">
                            <button @click="adresSil(adres)" type="button" class="btn btn-outline-danger z-depth-0 btn-md" data-mdb-ripple-color="dark">Sİl</button>
                        </div>
                        <div v-if="showNavbarAdresEkle" id="adresEkleButtonID" class="text-right">
                            <button @click="setAdresDepoBilgileri(adres)" type="button" class="btn eklee-button z-depth-0 btn-md" data-mdb-ripple-color="dark">Seç</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Yeni adres ekleme alani START -->
        <div class="row d-flex justify-content-center" id="adresEkleID">
            <div class="col-md-12 mt-3 mb-2 ml-1">
                <div v-if="showAdresEkleButton">
                    <button @click="adresEkleButton()" type="button" class="btn btn-md btn-lg btn-block adres-ekle-button z-depth-0" data-mdb-ripple-color="dark">
                        Adres ekle <i class="fas fa-plus ml-1"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- Yeni adres ekleme alani END -->

        <!-- bu modal AdresSecimGiristenSonra.vue componenti icin START -->
        <div v-if="showSepetSifirla_Arka">
            <div class="arkafon">
                <transition name="slide-fade">
                    <div v-if="showSepetSifirla_Modal" class="ownModal">
                        <div class="baslik">
                            <span class="d-flex justify-content-center">Bilgilendirme</span>
                        </div>
                        <div class="icerik">
                            Adres değişimi sonrası teslimat yapılacak şubemiz değişeceği için sepetinizdeki ürünleri temizleyeceğiz, adresi değiştirmek istediğinizden emin misiniz?
                        </div>
                        <div class="footer justify-content-center">
                            <button @click="sepetiSifirlaHayir()" type="button" class="btn btn-light">Hayır</button>
                            <button @click="sepetiSifirlaEvet()" type="button" class="btn btn-info">Evet</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <div v-if="depoSahipAlanDisi_Arka">
            <div class="arkafon">
                <transition name="slide-fade">
                    <div v-if="depoSahipAlanDisi_Modal" class="ownModal">
                        <div class="baslik">
                            <span class="d-flex justify-content-center">Uyarı</span>
                        </div>
                        <div class="icerik">
                            Seçtiğiniz adres teslimat alanımızın dışında. Şu an bu adrese teslimat sağlayamıyoruz.
                        </div>
                        <div class="footer justify-content-center anladim-button">
                            <button @click="sepetiSifirlaHayir()" type="button" class="btn btn-danger">Anladım, başka adres seçmeme izin ver</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <div v-if="showDepoFarkli">
            <div class="arkafon">
                <div class="ownModal">
                    <div class="baslik">
                        <span class="d-flex justify-content-center">Bilgilendirme</span>
                    </div>
                    <div class="icerik">
                        Adres değişimi sonrası teslimat yapılacak şubemiz değişeceği için sepetinizdeki bazı ürünler kaldırılabilir, adresi değiştirmek istediğinizden emin misiniz?
                    </div>
                    <div class="footer justify-content-center">
                        <button @click="depoFarkliHayir()" type="button" class="btn btn-secondary">Hayır</button>
                        <button @click="depoFarkliEvet()" type="button" class="btn btn-primary">Evet</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- bu modal AdresSecimGiristenSonra.vue componenti icin END -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import ModalHarita from "@/components/ModalHarita"

export default {
    data(){
        return{
            adreslerim : [],
            errors : [],
            showAdresBekleniyor : false, // sorgu yapilirken hata var mi yok mu kontrolune gore alanlarin show/hide-i icin
            showAdresHataIcerik : false,
            adresId : '', // adresSil-e basildigi anda o adresin id-si buraya yazilir
            showAdresSilindi : false,
            // SepetOdemePage START
            showProfilAdreslerim : false, // sil butonunun show/hide-i icin
            showNavbarAdresEkle : false, // SepetOdemePage ve ProfilAdreslerim sayfalari disinda gorunecek ekle butonu
            // SepetOdemePage END
            showAdresEkleButton : true,
            showInternetBagliMi : false,
            helpIcon : "",
            // harita olaylari START
            showHarita : false, // ModalHarita.vue icerisindeki
            // harita olaylari END
            // cookie bilgileri START
            uid : "",
            utel : "",
            // cookie bilgileri END
            showSepetSifirla_Arka : false, // AdresSecimGiristenSonra.vue icin. Adres sec-e basildiktan sonra depo sahip degeri farkliysa sepet temizle modalinin gozukmesi icin gerekli data-target alanin doldurulmasi
            showSepetSifirla_Modal : false,
            depoSahipAlanDisi_Arka : false, // arkafon icin
            depoSahipAlanDisi_Modal : false, // modal icin
            showDepoFarkli : false,
            // bu alanlar sepet temizle popup-inda gerekli islemleri gormek icin START
            sorguDepo : "",
            sorguDepoSahip : "",
            tiklanilanAdres : "",
            // bu alanlar sepet temizle popup-inda gerekli islemleri gormek icin END
            baseUrl : "",
            showAdresSecimGiristen_sonra : false, // Kullanici henuz adres eklemediyse yani adres yoksa, giristen sonraki adres secim ekraninda gosterilecek yazinin show/hide-i icin
            seciliDepoKoordinati : "", // basarili adres ise secili deponun koordinati buraya yazilir
        }
    },
    components: {
        ModalHarita
    },
    computed : {
        ...mapGetters(["serverRequest","adresEklemeForm","adresDegisti"]),
        checkSeciliAdres(){ // secili adresi kullaniciya gostermek icin
            var secili_adres = localStorage.getItem('adres')
            // ilk giris yaparken adres secim popup-indaki hatayi handle etmek icin bu kontrol yazildi
            if(secili_adres != null){ // localde secili adres varsa
                var secili_adresin_idsi = JSON.parse(secili_adres).id
                return {id: secili_adresin_idsi}
            }
            else{ // localde secili adres yoksa
                return ''
            }
        },
    },
    methods : {
        haritakapatMi(params){ // ModalHarita.vue-dan yani child-dan gelen data
            this.showHarita = params
        },
        adresEkleButton(){
            this.showHarita = true
            // modalharita-daki arama sonuclarinin zindex-i en ustte gorunsun diye sidebarin zindex-i dusuruluyor.
            // mdb su an icin cdn olarak saglanamadigi icin proje icine import disinda su an kullanilan css dosyalari elle eklenemiyor.
            // ve map-in autocomplete alaninin max zindex-i 1000lerde olmasi lazim. yani modalinkinden asagi. bu yuzden boyle cozum uretildi.
            this.$store.commit('addSidebarMenuZindex','z-index:10')
            this.$store.commit('addBottomNavZindex','z-index:999')
        },
        async adresSil(adres){
            this.getUid_Udep()
            this.adresId = adres.id
            try {
                const formData = new FormData();
                formData.append('f', 'delete_address');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('address_id', this.adresId);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.adreslerim = response.data
                this.showAdresSilindi = true;
                setTimeout(() => {
                    this.showAdresSilindi = false;
                }, 1500)
                // silinecek adres secili adres ise bunu anlayip, localden adres alanini sifirlamak lazim.
                // sifirlandiginda AdresSecimGiristenSonra zaten localdeki adres alanina gore tetiklendigi icin adres ekleme popup-i gorunur.
                var localAdres = JSON.parse(localStorage.getItem('adres')) // localdeki secili adresin parse edilmis hali buraya yazilir
                if(localAdres.id === adres.id){ // silinmek istenen adres id-si localdeki adres id-sine esitse..
                    localStorage.removeItem("adres") // ..localdeki adres de silinsin ki, AdresSecimGiristenSonra tetiklensin ve modal gorunsun
                    this.$router.push({name: 'Home'}) // ve ana sayfaya yonlendirilir. cunku ekle ve sil butonlari url kismina gore yapiliyor. adreslerim alaninda ekle yerine sil gorunuyor. bunun karsisini almak icin ana sayfaya yonlendirme yapiliyor
                }else{ // esit degilse normal silinip ayni sayfaya yonlendirilir
                    this.$router.go(0)
                }
            } catch (error) {
                this.errors.push(error)
            }
        },
        async getMusteriAdres(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_musteriadres');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                // get_init_data icinde fbid, os gibi degerleri de gonder
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.adreslerim = response.data
            } catch (error) {
                this.errors.push(error)
            }
            if(this.adreslerim.status == "fail"){
                this.showAdresBekleniyor = false
                setTimeout(() => {
                    this.showAdresHataIcerik = true
                    if(this.showAdresHataIcerik === true){
                        this.showAdresBekleniyor = true
                    }
                }, 4000)
            }
            else if(this.adreslerim.status == "success"){
                this.showAdresBekleniyor = true
            }
        },
        butonKontrolu(){ // SepetOdemePage, her adresteki 'sil' butonunun yerine 'ekle' butonunun show/hide-i icin kontrol
            this.baseUrl = document.baseURI
            if(this.baseUrl.includes("/profil/adreslerim")){
                this.showProfilAdreslerim = true
                this.helpIcon = ""
            }
            // giris yaptiktan sonra ana sayfada full sayfayi kaplayan adres secim ekrani ve normal adres secim icin
            else{
                this.showNavbarAdresEkle = true
                this.helpIcon = "display:none;"
            }
        },
        // adres ekle-ye bastiktan sonra depo, depo sahip ve bazi degerlerin degisimine gore degiskenlik gosterecegi icin
        // olumlu bir sonuc olursa (mesela kullanicinin koordinatinin locale yazilmasi gibi) bu fonksiyon icinde yapilir.
        adresiEkle(adres){
            this.$store.commit('addSepetAdres',{adresId:adres.id}) // sepetozeti.js-deki addSepetAdres fonk calisir ve sepet adres-e adres.id yazilir. bu alan SepetOdemePage.vue-da sepet olustururken kullanilir
            localStorage.removeItem("adres") // eger daha onceden bir adres ekliyse eskiyi silip yerine..
            localStorage.setItem("adres", JSON.stringify(adres)) // ..yeni adresi array olarak yazar
            this.$emit("teslimatadres", adres) // sepet odeme teslimat adresi alaninda gorunecek adres bilgisi icin
            localStorage.setItem("koord", adres.koordinat)
            this.depoKoordinatiLocaleKaydet() // depo koordinati locale yazilir
            // ana sayfadan baska bir sayfada adres degisikligi yapilirsa ana sayfaya yonlendirilsin
            this.baseUrl = document.baseURI
            if(this.$route.name != "Home"){
                this.$router.push({name: 'Home'})
            }
        },
        // navbardaki adres ekleme alaninda adres ekle butonu icin
        // giris yaptiktan sonra gorunecek adres secim ekranindan herhangi bir adres secildiginde depo ve depo sahip bilgilerinin alinmasi icin
        async setAdresDepoBilgileri(adres){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'web_get_init_data');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('depo', adres.koordinat);
                formData.append('os', "web");
                formData.append('version', "1");
                formData.append('fbid', "0");
                formData.append('teslimattip', "1");
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                var adreslerim = response.data
                var depo_bilgi = [];
                adreslerim.map((item) => {
                    depo_bilgi.push(item.depo_bilgi)
                })
                // sorgudan donen depo ve depo sahip degerlerine gore sepet sifirlansin mi uyarisi icin
                this.depoSahiPFarkliysaSepetSifirla(depo_bilgi[1], adres)
            } catch (error) {
                this.errors.push(error)
            }
        },
        depoSahiPFarkliysaSepetSifirla(sorgudanGelen_depoDegerleri, adres){
            this.seciliDepoKoordinati = sorgudanGelen_depoDegerleri.depo_koordinat // secili deponun koordinat degeri burada yazilir (ilk burada yazilir)
            var localdeki_depo = this.decryptCookie("udep")
            var localdeki_depo_sahip = this.decryptCookie("ushp")
            var adres_secimi_kapat = false
            // var adres_secimi = false
            this.tiklanilanAdres = adres // sepeti temizle popup-inda evet-e basilirsa gerekli islemler icin
            if(localdeki_depo === "" || localdeki_depo_sahip === ""){ // ilk once localde depo degerleri var mi diye kontrol yapilir
                this.adresiEkle(adres)
                this.encryptCookie(['udep','ushp'],[sorgudanGelen_depoDegerleri.depo_no,sorgudanGelen_depoDegerleri.depo_sahip],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
                this.$emit("adressecimkapat", adres_secimi_kapat) // AdresSecimGiristenSonra.vue ve AdresSecim.vue compenentini kapatmak icin
                this.seciliAdresiEmitleGonder()
                // console.log("uyari gorunmeden degis")
            }else{
                if(sorgudanGelen_depoDegerleri.depo_sahip != localdeki_depo_sahip){ // sorgudan gelen depo sahip degeri localdekinden farkliysa
                    if(sorgudanGelen_depoDegerleri.depo_sahip === -1){
                        // console.log("-1e esit")
                        this.depoSahipAlanDisi_Arka = true
                        setTimeout(() => this.depoSahipAlanDisi_Modal = true, 10)
                        this.showSepetSifirla_Arka = false
                        setTimeout(() => this.showSepetSifirla_Modal = false, 10)
                    }else{
                        this.showSepetSifirla_Arka = true
                        setTimeout(() => this.showSepetSifirla_Modal = true, 10)
                        // asagidaki degerler sepeti temizle popup-inda evet-e basilirsa gerekli islemler icin
                        this.sorguDepo = sorgudanGelen_depoDegerleri.depo_no
                        this.sorguDepoSahip = sorgudanGelen_depoDegerleri.depo_sahip
                        // this.$emit("adressecim", adres_secimi) // AdresSecim.vue compenentini kapatmak icin
                    }
                    // console.log("depo sahip farkli sepeti sil uyarisi")
                }
                else if(sorgudanGelen_depoDegerleri.depo_no != localdeki_depo){ // sorgudan gelen depo degeri localdekinden farkliysa
                    this.showDepoFarkli = true
                    this.sorguDepo = sorgudanGelen_depoDegerleri.depo_no
                    this.sorguDepoSahip = sorgudanGelen_depoDegerleri.depo_sahip
                    // console.log("depo farkli sepetteki barkodu 8den kucuk urunleri sil uyarisi")
                }
                else{ // ayniysa
                    this.adresiEkle(adres)
                    this.encryptCookie(['udep','ushp'],[sorgudanGelen_depoDegerleri.depo_no,sorgudanGelen_depoDegerleri.depo_sahip],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
                    this.$emit("adressecimkapat", adres_secimi_kapat) // AdresSecimGiristenSonra.vue ve AdresSecim.vue compenentini kapatmak icin
                    this.seciliAdresiEmitleGonder()
                }
            }
        },
        seciliAdresiEmitleGonder(){
            var local_adres = JSON.parse(localStorage.getItem("adres"))
            var adres_ad = local_adres.ad + " - " + local_adres.adrestext
            this.$emit("adresad", adres_ad)
        },
        depoKoordinatiLocaleKaydet(){
            // hemen sipariste haritada rota olusturmak icin ve sepet sayfasinda minimum siparis tutarinin google
            // sorgudan gelen mesafe degerine gore guncellenip guncellenmesinin karari icin depo koordinat bilgisi lazim
            localStorage.setItem("kooord", this.seciliDepoKoordinati)
        },
        sepetiSifirlaHayir(){
            this.depoSahipAlanDisi_Arka = false
            setTimeout(() => this.depoSahipAlanDisi_Modal = false, 10)
            this.showSepetSifirla_Arka = false
            setTimeout(() => this.showSepetSifirla_Modal = false, 10)
        },
        sepetiSifirlaEvet(){
            this.showSepetSifirla_Arka = false
            setTimeout(() => this.showSepetSifirla_Modal = false, 10)
            localStorage.removeItem("sepet")
            this.adresiEkle(this.tiklanilanAdres)
            this.encryptCookie(['udep','ushp'],[this.sorguDepo,this.sorguDepoSahip],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
            var adres_secimi_kapat = false
            this.$emit("adressecimkapat", adres_secimi_kapat) // AdresSecimGiristenSonra.vue ve AdresSecim.vue compenentini kapatmak icin
            this.seciliAdresiEmitleGonder()
            // sepet odeme teslimat adresi alaninda sepet sifirlanirsa ana sayfaya yonlendirilsin diye
            this.baseUrl = document.baseURI
            if(this.baseUrl.includes("/sepet/odeme")){
                this.$router.push({name: 'Home'})
            }
            // her adres degistiginde bir onceki degerin uzerine +1 yapiliyor. ve boylelikle her adres degisim sonrasinda 
            // bu deger de degisecegi icin baska sayfalarda gerekli yerlerde sorgu bir daha yapilabiliyor
            this.$store.commit("addAdresDegisti", this.adresDegisti+1) // adresin degistigini diger sayfalarda anlamak icin global degiskene atandi
        },
        depoFarkliHayir(){
            this.showDepoFarkli = false
        },
        depoFarkliEvet(){
            var localSepetim = JSON.parse(localStorage.getItem("sepet"))
            var barkodu_8den_kucuk_olanlar = [];
            // local sepetteki barkodu 8den kucuk olanlar bir diziye atilip, dongu bu dizinin uzunlugu kadar calisiyor
            // oyle degil de direkt local sepetin uzunlugu kadar donseydi, barkodu 8den kucuk olmasa bile her defasinda son urunu sepetten silecekti. (ilk boyle yapilmisti, sonradan duzeltildi :) )
            localSepetim.map((item) => { // barkod uzunlugu 8den kucuk olanlar diziye atanma islemi
                if(item.barkod.length<8) barkodu_8den_kucuk_olanlar.push(item.barkod)
            })
            for(let i=0; i<barkodu_8den_kucuk_olanlar.length; i++){ // tum sepeti gezip, barkodu 8den kucuk olan urunleri silmek icin
                var index = localSepetim.findIndex(x => x.barkod.length<8); // x.barkod yani barkod uzunlugu 8-den kucuk olan objectin indeksi localdeki sepet-ten bulunur
                if (index !== undefined) localSepetim.splice(index, 1);
            }
            localStorage.setItem("sepet", JSON.stringify(localSepetim))
            this.showDepoFarkli = false
            this.adresiEkle(this.tiklanilanAdres)
            this.encryptCookie(['udep','ushp'],[this.sorguDepo,this.sorguDepoSahip],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
            var adres_secimi_kapat = false
            this.$emit("adressecimkapat", adres_secimi_kapat) // AdresSecimGiristenSonra.vue ve AdresSecim.vue compenentini kapatmak icin
            this.seciliAdresiEmitleGonder()
            // sepet odeme teslimat adresi alaninda depo degisikligi algilandiginda sepete yonlendirilsin diye
            this.baseUrl = document.baseURI
            if(this.baseUrl.includes("/sepet/odeme")){
                this.$router.push({name: 'SepetPage'})
            }
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
        },
        baglantiDurumu(){
            if(navigator.onLine){
                return '';
            }else{
                this.showAdresBekleniyor = true
                this.showInternetBagliMi = true
            }
        },
        sayfayiYenile(){
            this.$router.go(0)
        },
        adresSecimGiristenSonraIse(){
            if(localStorage.getItem("adres") == null){ // adres yoksa
                this.showAdresSecimGiristen_sonra = true
            }else{ // adres varsa
                this.showAdresSecimGiristen_sonra = false
            }
        },
    },
    created(){
        this.getMusteriAdres()
        this.butonKontrolu()
        this.adresSecimGiristenSonraIse()
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 990px){
        #adresEkleID{
            margin-bottom: 40px;
        }
    }
    /* iPhone 6/7/8 */
    @media (max-width : 380px){
        .question{
            font-size: 10px !important;
            white-space: nowrap;
        }
    }
    /* iPhone 5/SE */
    @media (max-width : 320px){
        .question{
            font-size: 10px !important;
            white-space: nowrap;
        }
    }
    /* Urun Eklendi/Silindi Mesaji START */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(10px);
        opacity: 0;
    }
    /* Urun Eklendi/Silindi Mesaji END */
    .urun-silindi{
        z-index: 9999;
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 15px;
        font-size: 16px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
    .first-word{
        text-decoration: underline;
    }
    .adres-ekle-button{
        border-radius: 30px;
        background: #5FA56C;
        color: white;
    }
    .eklee-button{
        border-radius: 20px;
        background: #5FA56C;
        color: white;
    }
    .baglanti-durumu{
        font-size: 15px;
    }
    #adresSilButtonID{
        position: absolute;
        top: 30%;
        right: 5%;
    }
    #adresEkleButtonID{
        position: absolute;
        top: 30%;
        right: 5%;
    }
    .card-text{
        max-width: 68%;
    }
    ul li span{
        font-weight: 400;
        cursor: pointer;
    }
    /* sepet sifirla popup-i icin START */
    button{
        outline:none !important;
    }
    .arkafon{
        z-index: 1051;
        color: black;
        position: fixed;
        top: 0;
        left: 0;
        margin-left: calc(50% - 50vw);
        width: 100vw;
        height: 100%;
        background: rgba(43, 43, 43, 0.8);
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
        min-width: 250px;
        position: absolute;
        top: 20px;
        padding: 30px;
    }
    .baslik{
        padding-bottom: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: white;
    }
    .baslik span{
        padding-top: 10px;
        font-size: 16px;
        font-weight: 400;
    }
    .icerik{
        display: flex;
        justify-content: center;
        font-size: 14px;
    }
    .footer{
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .footer button{
        padding: 5px 7px;
        font-size: 13px;
    }
    .anladim-button button{
        text-transform: inherit;
    }
    /* sepet sifirla popup-i icin END */
    .btn-outline-danger{
        background: white !important;
        border-radius: 5px;
    }
    .devam-icin{
        font-size: 14px;
    }
    .seciliadresclass{
        border: 2px solid #5FA56C !important;
    }
    .secili-adres{
        visibility: hidden;
        opacity: 0;
    }
    .seciliadresyaziclass{
        visibility: visible;
        opacity: 1;
        margin-left: 5px;
        font-size: 13px;
        text-transform: uppercase;
        font-weight: 800;
        color: #5FA56C;
    }
    .uzgun{
        position: absolute;
        margin-left: 10px;
        font-weight: 400;
        transform: rotateZ(90deg);
    }
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
</style>