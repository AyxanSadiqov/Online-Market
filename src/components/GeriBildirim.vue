<template>
    <div v-cloak>
        <h4 class="mt-4 mb-4"><span class="first-word">G</span>eri Bildirim</h4>

        <!-- <div @click="fetchGeriBildirim()">geri bildirim gonder</div>
        {{geri_bildirimler}} -->
        <div class="container">
            <transition name="fade">
                <div v-if="showGeriBildirimForm" class="row d-flex justify-content-center">
                    <div class="col-md-12 col-lg-12">
                        <div class="geribildirim-yazisi">
                            Site içerisinde işleminizi yapmakta engel olan hata veya hataları, görmek istediğiniz yeni özellikleri,
                            beğendiğiniz veya geliştirmemizi istediğiniz alanları bize bildirmeniz, sizlere daha iyi hizmet verebilmek 
                            adına bizler için önemlidir. 
                        </div>
                        <section class="mb-5">
                            <form action="#!">
                                <!-- Kullanici giris yapmadiysa ek olarak gorunecek inputlar START -->
                                <div v-if="kullaniciKayitliDegilse">
                                    <div class="md-form md-outline mt-0">
                                        <input v-model="adsoyad" type="text" id="materialRegisterFormFirstName" class="form-control">
                                        <label for="materialRegisterFormFirstName">{{ $t('Name, Surname') }}</label>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="md-form md-outline mt-0">
                                                <input v-model="mail" @input="mailAlan" type="email" id="defaultForm-email2" class="form-control">
                                                <label data-error="wrong" data-success="right" for="defaultForm-email2">{{ $t('E-mail address') }}</label>
                                                <small v-if="mailConf" class="form-text danger-text mb-4">{{ $t('Enter valid e-mail address. For example: zdc@bilisim.com') }}</small>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="md-form md-outline mt-0">
                                                <input v-model="ceptel" @input="telefonAlan" @keypress="telefonKontrol" type="text" id="materialRegisterFormNumber" class="form-control">
                                                <label for="materialRegisterFormNumber">{{ $t('Phone number') }}</label>
                                                <small v-if="ceptelConf" class="form-text danger-text mb-4">{{ $t('Enter valid phone number. For example: (555) 555 55 55') }}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Kullanici giris yapmadiysa ek olarak gorunecek inputlar END -->
                                <select name="select" @change="baslikSec($event)">
                                    <option style="display:none">Başlık Seçiniz</option>
                                    <option v-for="baslik in basliklar" :key="baslik.id" :value="baslik.id">{{ baslik.ad }}</option>
                                </select>
                                <transition name="slide">
                                    <div v-if="showBaslik" class="md-form md-outline">
                                        <input v-model="gb_baslik" @input="baslikAlan" type="text" id="defaultForm-baslik" class="form-control">
                                        <label data-error="wrong" data-success="right" for="defaultForm-baslik">Başlık</label>
                                        <small v-if="baslikConf" class="form-text text-muted mb-4">Size daha iyi yardımcı olabilmek için lütfen bu alanı boş bırakmayınız.</small>
                                    </div>
                                </transition>
                                <div class="md-form md-outline">
                                    <textarea class="form-control" @input="aciklamaAlan" placeholder="Açıklama (En fazla 300 karakter)" v-model="gb_aciklama" rows="3" maxlength="300"></textarea>                                
                                    <small v-if="aciklamaConf" class="form-text text-muted mb-4">Size daha iyi yardımcı olabilmek için lütfen bu alanı boş bırakmayınız.</small>
                                </div>
                            </form>

                            <small v-if="kullaniciKayitliDegilse" class="text-muted">NOT: Size daha iyi yardımcı olabilmek için ad, soyad, e-posta ve telefon numarası alanlarını boş bırakmayınız.</small>

                            <div class="text-center pb-2" :class="girisYap">
                                <button @click="fetchGeriBildirim()" :disabled='isDisabled()' type="submit" class="btn mb-4" :style="loginButtons">
                                    gönder
                                    <img v-if="spinner" class="spinner" src="@/assets/svg/spinner.gif" alt="">
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </transition>

            <!-- Geri bildirimden basarili sonuc geldiyse START -->
            <transition name="slide">
                <div v-if="showTesekkurler" class="row d-flex justify-content-center">
                    <div class="col-md-12 col-lg-12">
                        <div v-if="showTesekkurler" class="card rgba-green-strong text-center z-depth-0">
                            <div class="card-body">
                                <p class="white-text mb-0 tesekkurler-class">Geri bildiriminiz bize ulaşmıştır. Teşekkür ederiz.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- Geri bildirimden basarili sonuc geldiyse END -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            geri_bildirimler : [],
            errors : [],
            // cookie bilgileri START
            uid : "",
            utel : "",
            // cookie bilgileri END
            showGeriBildirimForm : true,
            gb_baslik : '',
            gb_aciklama : '',
            aciklamaConf : false,
            baslikConf : false,
            disabled : true, // button disable-i icin
            showBaslik : false,
            spinner : false,
            showTesekkurler : false,
            basliklar : [
                { id : 1, ad : "Adres eklerken hata ile karşılaşıyorum" },
                { id : 2, ad : "Adreslerim listelenmiyor" },
                { id : 3, ad : "Doğrulama kodu gelmiyor" },
                { id : 4, ad : "Hesabıma giriş yapamıyorum" },
                { id : 5, ad : "Kaydolurken hata alıyorum" },
                { id : 6, ad : "Sepetimi görüntüleyemiyorum" },
                { id : 7, ad : "Sepet sayfasında sorun yaşıyorum" },
                { id : 8, ad : "Sepet ödeme sayfasında sorun yaşıyorum" },
                { id : 9, ad : "Ürünler listelenmiyor" },
                { id : 10, ad : "Diğer..." }, // yeni secenek eklendiginde baslikSec() fonksiyonu icinde diger-in id-sini yenile
            ],
            // Kullanici giris yapmadiysa ek olarak gorunecek inputlar icin START
            adsoyad : '',
            mail : '',
            ceptel : '',
            ceptelConf : false,
            mailConf : false,
            kullaniciKayitliDegilse : false, // kullanici kaydi varsa 3 tane(adsoyad,mail,telefon) alanlari show/hide icin
            // Kullanici giris yapmadiysa ek olarak gorunecek inputlar icin END
        }
    },
    computed : {
        ...mapGetters(["girisYap","loginButtons","serverRequest"]),
    },
    methods : {
        async fetchGeriBildirim(){
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'geri_bildirimler');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('baslik', this.gb_baslik);
                formData.append('icerik', this.gb_aciklama);
                var getUserInLocal = localStorage.getItem("user")
                if(getUserInLocal == null){ // kullanici kaydi yoksa. kontrol localdeki 'user'-e gore yapiliyor
                    formData.append('adsoyad', this.adsoyad);
                    formData.append('email', this.mail);
                    formData.append('telefon', this.ceptel);
                }
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.geri_bildirimler = response.data
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            } if(this.geri_bildirimler.status == "success"){
                this.spinner = true
                setTimeout(() => {
                    this.spinner = false
                    this.showGeriBildirimForm = false
                }, 500)
                setTimeout(() => {
                    this.showTesekkurler = true
                }, 1000)
            }
            // console.log("sorgu yapildi")
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
        },
        baslikSec(event){
            var baslik_id = event.target.value // secilenin id-si
            // Diger seceneginin id-si yeni secenek eklendiginde degisecegi icin dikkat edilmesi gerek
            if(baslik_id === '10'){ // baslik diger ise
                this.gb_baslik = "" // baslik alani sifirlansin diye
                this.showBaslik = true
            }else{
                this.showBaslik = false
                this.gb_baslik = event.target.options[event.target.options.selectedIndex].text // secilenin text-i
            }
        },
        aciklamaAlan(){
            if(this.gb_aciklama == '' || this.gb_aciklama.length == 0){
                this.aciklamaConf = true
            }else{
                this.aciklamaConf = false
            }
        },
        baslikAlan(){
            if(this.gb_baslik == '' || this.gb_baslik.length == 0){
                this.baslikConf = true
            }else{
                this.baslikConf = false
            }
        },
        // Kullanici giris yapmadiysa ek olarak gorunecek inputlar icin START
        telefonKontrol(){ // simdilik burada ilk rakamin 0 olmasina karsilik islemler yapiliyor
            if(this.ceptel.length == 3 && this.ceptel[0] == 0){
                this.ceptel = this.ceptel.slice(1,14)
            }
        },
        telefonAlan ($event) {
            //console.log($event.keyCode); //keyCodes degeri
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if (keyCode < 48 || keyCode > 57) { // yalnizca rakam girilebilmesi icin
                $event.preventDefault();
            }
            var x = this.ceptel.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            this.ceptel = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ' ' + x[3] : '')+(x[4] ? ' ' + x[4] : '');
            if (this.ceptel.length < 15){
                this.ceptelConf = true
            }else{
                this.ceptelConf = false
            }
        },
        mailAlan(){
            var y = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            if (!y.test(this.mail)){
                this.mailConf = true
            }else{
                this.mailConf = false
            }
        },
        // Kullanici giris yapmadiysa ek olarak gorunecek inputlar icin END
        isDisabled(){
            if(this.gb_aciklama != "" && this.aciklamaConf != true && this.gb_baslik != ""){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
    },
    created(){
        var getUserInLocal = localStorage.getItem("user")
        if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
            this.kullaniciKayitliDegilse = false
        }else{
            this.kullaniciKayitliDegilse = true
        }
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    /* diger secildiginde baslik alani icin START */
    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }
    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
    .slide-enter-to, .slide-leave {
        max-height: 40px;
        overflow: hidden;
    }
    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
    /* diger secildiginde baslik alani icin END */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .first-word{
        text-decoration: underline;
    }
    select{
        width: 100%;
        padding: 8px;
        background: white;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
        outline:none !important;
    }
    option{
        color: #4e4e4e;
        background: white;
    }
    select:focus > option:checked { 
        background: #d4d4d4 !important;
    }
    textarea{
        border: 1px solid #d4d4d4 !important;
        border-radius: 5px !important;
        font-size: 15px;
        min-height: 50px;
        max-height: 100px;
    }
    .spinner{
        width: 25px;
        height: 25px;
        margin: -13px -20px -10px 0px;
    }
    .tesekkurler-class{
        font-size: 14px;
    }
    .card{
        width: 100%;
    }
    .card-body{
        padding: 10px;
    }
    .geribildirim-yazisi{
        font-size: 15px;
        padding-bottom: 20px;
    }
    .danger-text{
        color: #ff2929;
    }
</style>