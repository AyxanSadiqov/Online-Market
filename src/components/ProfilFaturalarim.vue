Bu sayfadaki puf noktalar:
1 - Bu sayfa SepetOdemePage-in child-i ayni zamanda
2 - SepetOdemePage-de kullanim sekline uygun olarak sayfa icindeki bazi yerler show/hide oluyor
2.1 - Ornek olarak sil butonu SepetOdemePage-de ekle butonuna donusuyor
3 - SCROLL iki turlu kullanilabilir: 
    1-yazmis oldugum "scrollTo" fonksiyonu, (su an bu kullaniliyor)
    2-main.js-de eklenen "vue-scrollto" paketi.
<template>
    <div v-cloak>
        <h4 class="mt-4 mb-4"><span class="first-word">F</span>aturalarım</h4>
        <!-- {{faturalarim}} -->
        <!-- <div v-for="adresler in faturalarim.response" :key="adresler.id">
            <div v-for="adres in adresler.adresler" :key="adres.id">
                {{adres}}
            </div>
        </div> -->
        

        <!-- Fatura eklendi mesaj START -->
        <transition name="slide-fade">
            <div v-if="showFaturaEklendi" class="note note-success urun-silindi">
                Faturanız başarılı bir şekilde <strong>eklendi.</strong>
            </div>
        </transition>
        <!-- Fatura eklendi mesaj END -->

        <!-- Fatura silindi mesaj START -->
        <transition name="slide-fade">
            <div v-if="showFaturaSilindi" class="note note-danger urun-silindi">
                Faturanız başarılı bir şekilde <strong>silindi.</strong>
            </div>
        </transition>
        <!-- Fatura silindi mesaj END -->

        <div v-if="!showFaturaBekleniyor" class="row text-muted ml-0">
            <span>Bekleniyor...</span>
        </div>
        <div v-if="showFaturaHataIcerik" class="text-muted ml-0">
            <span>Beklenmedik bir hata oluştu. :(</span>
            <ul>
                <li>Sayfayı yenileyip tekrar deneyin.</li>
                <li>Oturumunuzu kapatıp tekrar giriş yapın.</li>
            </ul>
        </div>
        {{baglantiDurumu()}}
        <div v-if="showInternetBagliMi" class="row ml-0">
            <p class="note note-danger baglanti-durumu"><strong>Bağlantı hatası:</strong> İnternete bağlı değilsiniz. Lütfen bağlantınızı kontrol edip tekrar deneyin.</p>
        </div>

        <div v-for="faturalar in faturalarim.response" :key="faturalar.id" class="row text-muted ml-0">
            <div v-if="faturalar.faturalar==''">
                <span>Geçerli faturanız bulunmamaktadır.</span>
            </div>
        </div>

        <div v-if="showFaturaBekleniyor">
            <div v-for="faturalar in faturalarim.response" :key="faturalar.id" class="row text-muted ml-0 d-flex justify-content-center">
                <div v-for="fatura in faturalar.faturalar" :key="fatura.id" class="card col-md-11 ml-3 mr-4 mb-3">
                    <div class="card-body">
                        <h5 class="card-title">
                            <i v-if="fatura.tip==0" class="fas fa-building"></i> 
                            <i v-else class="fas fa-home"></i> 
                            {{fatura.ad}}
                        </h5>
                        <p class="card-text">
                            {{fatura.sehir}}/{{fatura.ilce}} - {{fatura.adres}}
                        </p>
                        <p class="card-text">
                            <span v-if="fatura.tip==0">Vergi dairesi - {{fatura.vergidairesi}}, </span>
                            <span v-else></span>
                            <span v-if="fatura.tip==0">Vergi numarası - {{fatura.vergino}}</span>
                            <span v-else>TC numarası - {{fatura.vergino}}</span>
                        </p>
                        <div v-if="showProfilFaturalarim" id="faturaSilButtonID" class="text-right">
                            <button @click="faturaSil(fatura)" type="button" class="btn btn-outline-danger z-depth-0 btn-md" data-mdb-ripple-color="dark">Sİl</button>
                        </div>
                        <div v-if="showSepetOdemePage" id="faturaEkleButtonID" class="text-right">
                            <button @click="faturaEkle(fatura)" type="button" class="btn btn-outline-info z-depth-0 btn-md" data-dismiss="modal" data-mdb-ripple-color="dark">Ekle</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Yeni adres ekleme alani START -->
        <!-- {{faturaTip}} -->
        <div class="row d-flex justify-content-center" id="adresEkleID">
            <div class="col-md-12 mt-3 mb-2 ml-1">
                <div v-if="showFaturaEkleButton">
                    <button @click="faturaEkleButton()" type="button" class="btn btn-md btn-lg btn-block fatura-ekle-button z-depth-0" data-mdb-ripple-color="dark">
                        Fatura ekle <i class="fas fa-plus ml-1"></i>
                    </button>
                </div>
                <transition name="slide-fade">
                    <div v-if="showFaturaTipSecimAlani" class="row d-flex justify-content-center">
                        <div v-if="showKurumsalFaturaCard" class="card fatura-ekle-card col-md-5 col-5 col-sm-5 col-lg-5 ml-2" :class="classKurumsal">
                            <div @click="kurumsalFatura()" @click.prevent="scrollTo('#kurumsalID')" class="card-body noselect">
                                Kurumsal Fatura
                            </div>
                            <transition name="bounce">
                                <div id="kurumsalID" v-if="showKurumsalForm" class="p-2">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-outline mb-2">
                                                <label>Vergi No*</label>
                                                <input type="text" @input="vergiNoAlan" :onkeyup="this.vergiNo=this.vergiNo.replace(/[^\d]/,'')" v-model="vergiNo" maxlength="10" class="form-control form-control-sm" />
                                                <small v-if="vergiNoConf" class="form-text text-muted mb-1">Geçerli vergi numarası giriniz.</small>
                                            </div>
                                            <div class="form-outline mb-2">
                                                <label>Vergi Dairesi*</label>
                                                <input type="text" v-model="vergiDairesi" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-outline mb-2">
                                                <label>İl*</label>
                                                <input type="text" v-model="il" class="form-control form-control-sm" />
                                            </div>
                                            <div class="form-outline mb-2">
                                                <label>İlçe*</label>
                                                <input type="text" v-model="ilce" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-outline mb-2">
                                                <label>Fatura Ünvanı*</label>
                                                <input type="text" v-model="faturaUnvani" class="form-control form-control-sm" />
                                            </div>
                                            <div class="form-outline mb-2">
                                                <label>Adres*</label>
                                                <textarea class="form-control" v-model="adres" rows="2"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div>*<span class="text-muted">-zorunlu alan</span></div>
                                    {{yeniKurumsalEkleButtonKontrol()}}
                                    <button @click="yeniFaturaEkle()" :disabled="disableAdresEkleme" type="button" class="btn btn-info btn-md btn-lg btn-block fatura-ekle" data-mdb-ripple-color="dark">
                                        Kurumsal Fatura ekle
                                    </button>
                                </div>
                            </transition>
                        </div>
                        <div v-if="showBireyselFaturaCard" class="card fatura-ekle-card col-md-5 col-5 col-sm-5 col-lg-5 ml-3" :class="classKurumsal">
                            <div @click="bireyselFatura()" @click.prevent="scrollTo('#bireyselID')" class="card-body noselect">
                                Bireysel Fatura
                            </div>
                            <transition name="bounce">
                                <div id="bireyselID" v-if="showBireyselForm" class="p-2">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-outline mb-2">
                                                <label>TC Kimlik No*</label>
                                                <input type="text" @input="tcNoAlan" :onkeyup="this.tcNo=this.tcNo.replace(/[^\d]/,'')" v-model="tcNo" maxlength="11" class="form-control form-control-sm" />
                                                <small v-if="tcNoConf" class="form-text text-muted mb-1">Geçerli TC kimlik numarası giriniz.</small>
                                            </div>
                                            <div class="form-outline mb-2">
                                                <label>Fatura Ünvanı*</label>
                                                <input type="text" v-model="faturaUnvani" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-outline mb-2">
                                                <label>İl*</label>
                                                <input type="text" v-model="il" class="form-control form-control-sm" />
                                            </div>
                                            <div class="form-outline mb-2">
                                                <label>İlçe*</label>
                                                <input type="text" v-model="ilce" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-outline mb-2">
                                                <label>Adres*</label>
                                                <textarea class="form-control" v-model="adres" rows="2"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div>*<span class="text-muted">-zorunlu alan</span></div>
                                    {{yeniBireyselEkleButtonKontrol()}}
                                    <button @click="yeniFaturaEkle()" :disabled="disableAdresEkleme" type="button" class="btn btn-info btn-md btn-lg btn-block fatura-ekle" data-mdb-ripple-color="dark">
                                        Bİreysel fatura ekle
                                    </button>
                                </div>
                            </transition>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <!-- Yeni adres ekleme alani END -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data(){
        return{
            faturalarim : [],
            errors : [],
            showFaturaBekleniyor : false, // sorgu yapilirken hata var mi yok mu kontrolune gore alanlarin show/hide-i icin
            showFaturaHataIcerik : false,
            faturaId : '', // faturaSil-e basildigi anda o faturanin id-si buraya yazilir
            showFaturaSilindi : false,
            showFaturaEklendi : false,
            // SepetOdemePage START
            showProfilFaturalarim : false, // sil butonunun show/hide-i icin
            showSepetOdemePage : false, // SepetOdemePage-de gozukecek ekle butonunun show/hide-i icin
            // SepetOdemePage END
            showFaturaEkleButton : true,
            showFaturaTipSecimAlani : false,
            faturaTip : "",
            vergiNo : "",
            vergiNoConf : false,
            vergiDairesi : "",
            il : "",
            ilce : "",
            faturaUnvani : "",
            adres : "",
            tcNo : "",
            tcNoConf : false,
            disableAdresEkleme : true,
            showInternetBagliMi : false,
            showKurumsalFaturaCard : true,
            showBireyselFaturaCard : true,
            classKurumsal : "",
            showKurumsalForm : false,
            showBireyselForm : false,
            // cookie bilgileri START
            uid : "",
            utel : "",
            // cookie bilgileri END
        }
    },
    computed : {
        ...mapGetters(["serverRequest"]),
    },
    methods : {
        scrollTo(selector){ // js-den ziyade istenilen id-ye scroll icin
            if(this.showKurumsalForm == true || this.showBireyselForm == true){ // form kapali durumunda scrollIntoView null donmesin diye
                // 600 mlsaniye bekleme sebebi de form acilirkenki efektinde bu kadar saniye bekletiliyor. yine ayni sekilde null hatasinin onune gecmek icin bu kadar sure bekletiliyor.
                setTimeout(() => document.querySelector(selector).scrollIntoView({behavior: 'smooth'}), 600)
            }
        },
        async faturaSil(fatura){
            this.getUid_Udep()
            this.faturaId = fatura.id
            try {
                const formData = new FormData();
                formData.append('f', 'delete_fatura');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('fatura_id', this.faturaId);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.faturalarim = response.data
                this.$router.go(0)
                this.showFaturaSilindi = true;
                setTimeout(() => {
                    this.showFaturaSilindi = false;
                }, 1500)
            } catch (error) {
                this.errors.push(error)
            }
        },
        async getMusteriFatura(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_fatura');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.faturalarim = response.data
            } catch (error) {
                this.errors.push(error)
            }
            if(this.faturalarim.status == "fail"){
                this.showFaturaBekleniyor = false
                setTimeout(() => {
                    this.showFaturaHataIcerik = true
                    if(this.showFaturaHataIcerik === true){
                        this.showFaturaBekleniyor = true
                    }
                }, 4000)
            }
            else if(this.faturalarim.status == "success"){
                this.showFaturaBekleniyor = true
            }
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
        },
        butonKontrolu(){ // SepetOdemePage, her faturadaki 'sil' butonunun yerine 'ekle' butonunun show/hide-i icin kontrol
            var baseUrl = document.baseURI
            if(baseUrl.includes("/profil/faturalarim")){
                this.showProfilFaturalarim = true
            }
            else if(baseUrl.includes("/sepet/odeme")){
                this.showSepetOdemePage = true
            }
        },
        faturaEkle(fatura){
            this.$store.commit('addSepetFatura',{faturaId:fatura.id}) // sepetozeti.js-deki addSepetFatura fonk calisir ve sepet fatura-ya fatura.id yazilir. bu alan SepetOdemePage.vue-da sepet olustururken kullanilir
            localStorage.removeItem("sepet-fatura") // eger daha onceden bir fatura ekliyse eskiyi silip yerine..
            localStorage.setItem("sepet-fatura", "["+JSON.stringify(fatura)+"]") // ..yeni fatura array olarak yazar
            this.$store.commit('addShowFaturaBilgisiCard',"true") // SepetOdemePage-de fatura bilgisi alaninin gosterilmesi icin
        },
        async addYeniFatura(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'add_fatura');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('ad', this.faturaUnvani);
                formData.append('sehir', this.il);
                formData.append('ilce', this.il);
                formData.append('adres', this.adres);
                if(this.faturaTip === "0"){
                    formData.append('tip', "0");
                    formData.append('vergidaire', this.vergiDairesi);
                    formData.append('vergino', this.vergiNo);
                }else if(this.faturaTip === "1"){
                    formData.append('tip', "1");
                    formData.append('vergidaire', "");
                    formData.append('vergino', this.tcNo);
                }
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.faturalarim = response.data
                this.$router.go(0)
                this.showFaturaEklendi = true;
                setTimeout(() => {
                    this.showFaturaEklendi = false;
                }, 1500)
            } catch (error) {
                this.errors.push(error)
            }
        },
        faturaEkleButton(){
            if(this.showFaturaEkleButton){
                this.showFaturaEkleButton = false // 'adres ekle +' butonu gizlenir
                this.showFaturaTipSecimAlani = true // adres eklemek icin gerekli form acilir
            }else{
                setTimeout(() => { this.showFaturaEkleButton = true }, 600) // 'adres ekle +' butonu acilir
                this.showFaturaTipSecimAlani = false // adres eklemek icin gerekli form kapanir
            }
        },
        yeniFaturaEkle(){
            this.addYeniFatura() // request yapilir
        },
        // zorunlu alanlar doldurulduktan sonraki 'Kurumsal fatura ekle' butonunun disable kontrolu
        yeniKurumsalEkleButtonKontrol(){
            if(this.vergiNo === "" || this.vergiDairesi === "" || this.il === "" || this.ilce === "" || this.faturaUnvani === "" || this.adres === "" || this.vergiNoConf == true){
                this.disableAdresEkleme = true
            }else{
                this.disableAdresEkleme = false
            }
        },
        // zorunlu alanlar doldurulduktan sonraki 'Bireysel fatura ekle' butonunun disable kontrolu
        yeniBireyselEkleButtonKontrol(){
            if(this.tcNo === "" || this.faturaUnvani === "" || this.il === "" || this.ilce === "" || this.adres === "" || this.tcNoConf == true){
                this.disableAdresEkleme = true
            }else{
                this.disableAdresEkleme = false
            }
        },
        baglantiDurumu(){
            if(navigator.onLine){
                return '';
            }else{
                this.showFaturaBekleniyor = true
                this.showInternetBagliMi = true
            }
        },
        kurumsalFatura(){
            if(this.showBireyselFaturaCard === true){
                this.showBireyselFaturaCard = false
                this.classKurumsal = "open-kurumsal"
                this.showKurumsalForm = true
                this.faturaTip = "0"
            }else{
                setTimeout(() => this.showBireyselFaturaCard = true, 600)
                this.classKurumsal = ""
                this.showKurumsalForm = false
            }
        },
        bireyselFatura(){
            if(this.showKurumsalFaturaCard === true){
                this.showKurumsalFaturaCard = false
                this.classKurumsal = "open-kurumsal"
                this.showBireyselForm = true
                this.faturaTip = "1"
            }else{
                setTimeout(() => this.showKurumsalFaturaCard = true, 600)
                this.classKurumsal = ""
                this.showBireyselForm = false
            }
        },
        vergiNoAlan(){
            if(this.vergiNo.length < 10){
                this.vergiNoConf = true
            }else{
                this.vergiNoConf = false
            }
        },
        tcNoAlan(){
            if(this.tcNo.length < 11){
                this.tcNoConf = true
            }else{
                this.tcNoConf = false
            }
        },
    },
    created(){
        this.getMusteriFatura()
        this.butonKontrolu()
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
    /* fatura formlarin show/hide efekti START */
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .3s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    /* fatura formlarin show/hide efekti END */
    .open-kurumsal{
        min-width: 90%;
        height: 100%;
    }
    .urun-silindi{
        z-index: 9999;
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
    .first-word{
        text-decoration: underline;
    }
    .fatura-ekle-button{
        border-radius: 30px;
        background: #5FA56C;
        color: white;
    }
    .fatura-ekle-card{
        border-radius: 10px;
        border-style: solid;
        border-width: 2px;
        border-color: #eee;
        background: #eee;
        font-size: 13px;
        padding: 15px 0px;
        align-items: center;
        transition: .4s;
    }
    .fatura-ekle-card:hover{
        border-style: solid;
        border-width: 2px;
        border-color: #39C0ED;
    }
    .fatura-ekle-card:hover .card-body{
        cursor: pointer;
        color: #39C0ED;
        font-weight: 800;
    }
    /* .fatura-ekle-card .row{
        z-index: 5;
    } */
    .form-outline label{
        font-size: 12px;
        margin-bottom: 0;
    }
    .form-outline textarea{
        min-height: 50px;
        max-height: 100px;
        font-size: 12px;
    }
    .form-outline i{
        position: absolute;
        font-size: 8px;
        border: 1px solid #eee;
        border-radius: 10px;
        background: rgb(143, 143, 143);
        color: white;
        margin-left: 4px;
        padding: 5px;
        cursor: pointer;
    }
    .fatura-ekle{
        margin-top: 10px;
        border-radius: 10px;
    }
    .baglanti-durumu{
        font-size: 15px;
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    #faturaSilButtonID{
        position: absolute;
        top: 30%;
        right: 5%;
    }
    #faturaEkleButtonID{
        position: absolute;
        top: 30%;
        right: 5%;
    }
    .card-text{
        max-width: 68%;
    }
    .btn-outline-danger{
        background: white !important;
        border-radius: 5px;
    }
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
</style>