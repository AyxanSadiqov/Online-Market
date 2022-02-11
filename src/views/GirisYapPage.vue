Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div>
        <Navbar />
        <GeriBildirimButton />
        <div class="color-grey-light mt-70" :class="girisYap">
            <div class="d-flex align-items-center h-100">
                <div class="container text-center py-5">
                    <h3 class="mb-0">{{ $t('Login') }}</h3>
                </div>
            </div>
        </div>
        <!-- Hata mesaji START -->
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="showHataMesaji" class="card rgba-red-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">{{ $t('The phone number or password you entered is incorrect. Please try again') }}.</p>
                </div>
            </div>
            <div></div>
        </div>
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="showNeedVerification" class="card rgba-teal-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">İlk önce hesabınızı doğrulamanız gerekli. Telefonunuza onay kodunu gönderdik. <span @click="onaySayfasinaGit()">Hesabımı doğrula.</span></p>
                </div>
            </div>
            <div></div>
        </div>
        <!-- Hata mesaji END -->
        <!-- Onay kodu sayfasindan basarili sonuc geldiyse START -->
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="onaykodu.basariliMi=='evet'" class="card rgba-teal-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Hesabınız başarılı şekilde onaylanmıştır. Telefon numara ve şifrenizi girerek giriş yapabilirsiniz.</p>
                </div>
            </div>
            <div></div>
        </div>
        <!-- Onay kodu sayfasindan basarili sonuc geldiyse END -->
        <!-- Sifre yenileme sayfasindan basarili sonuc geldiyse START -->
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="onaykodu.sifreDegistiMi=='evet'" class="card rgba-teal-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Şifreniz başarılı şekilde değiştirildi. Telefon numara ve şifrenizi girerek giriş yapabilirsiniz.</p>
                </div>
            </div>
            <div></div>
        </div>
        <!-- Sifre yenileme sayfasindan basarili sonuc geldiyse END -->
        <div v-if="showprofilSayfasindanMiGeldi" class="text-center">
            <div class="card" :style="altgrupUrunleer">
                <div class="card-body">{{ $t('You cannot view the profile page without logging in') }}.</div>
            </div>
        </div>
        <div v-if="showsepetOdemeSayfasindanMiGeldi" class="text-center">
            <div class="card" :style="altgrupUrunleer">
                <div class="card-body">{{ $t('You cannot view the cart checkout page without logging in') }}.</div>
            </div>
        </div>
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6">
                    <section class="mb-5">
                        <form action="#!">
                            <div class="md-form md-outline">
                                <input v-model="ceptel" @input="telefonAlan" @keypress="telefonKontrol" type="text" id="defaultForm-email1" class="form-control">
                                <label data-error="wrong" data-success="right" for="defaultForm-email1">{{ $t('Phone number') }}</label>
                                <small v-if="ceptelConf" class="form-text danger-text mb-4">{{ $t('Enter valid phone number. For example: (555) 555 55 55') }}</small>
                            </div>
                            <div class="md-form md-outline">
                                <input v-model="sifre" :type="typePassword" @input="sifreAlan" id="defaultForm-pass1" class="form-control">
                                <SifreShowHide @typee="type" :showEye="showEye"/>
                                <label data-error="wrong" data-success="right" for="defaultForm-pass1">{{ $t('Password') }}</label>
                            </div>
                            <div class="sifremi-unuttum">
                                <u @click="sifremiUnuttum()" class="text-muted">Şİfremİ unuttum</u>
                            </div>
                        </form>

                        <div class="text-center pb-2" :class="girisYap">
                            <button @click="yeniGirisOlustur()" :disabled='isDisabled()' type="submit" class="btn mb-4" :style="loginButtons">
                                {{ $t('Login') }}
                                <img v-if="spinner" class="spinner" src="@/assets/svg/spinner.gif" alt="">
                            </button>
                            <p>{{ $t("Don't have an account?") }} <router-link to="/kaydol" :style="loginTexts">{{ $t('Register') }}</router-link></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Navbar from "@/components/Navbar"
import { CryptoJSAesJson } from '../assets/js/cryptojs-aes-format';
import SifreShowHide from "@/components/SifreShowHide"
import GeriBildirimButton from "@/components/GeriBildirimButton"
import Footer from "@/components/Footer"

export default {
    metaInfo() {
        return{
            title: 'Giriş Yap',
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    components : {
        Navbar,
        SifreShowHide,
        GeriBildirimButton,
        Footer
    },
    data(){
        return{
            girisSonuc : [],
            errors : [],
            ceptel : '',
            sifre : '',
            encryptedSifre : '',
            ceptelConf : false,
            showHataMesaji : false,
            disabled : true, // button disable-i icin
            showprofilSayfasindanMiGeldi : false,
            showsepetOdemeSayfasindanMiGeldi : false,
            showNeedVerification : false,
            spinner : false,
            typePassword : "password",
            showEye : false,
        }
    },
    computed : {
        ...mapGetters(["girisYap","altgrupUrunleer","serverRequest",
        "loginButtons","loginTexts"]),
        onaykodu:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.basariliOnayKodu;
            }
        },
    },
    methods : {
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
            if (this.ceptel.length <=14){
                this.ceptelConf = true
            }else{
                this.ceptelConf = false
            }
        },
        sifreAlan(){
            if(this.sifre == '' || this.sifre.length == 0){
                this.showEye = false
            }else{
                this.showEye = true
            }
        },
        isDisabled(){
            if(this.ceptelConf != true && this.ceptel != "" && this.sifre){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        onaySayfasinaGit(){
            this.onaySayfasiIzin() // onay sayfasini goruntelemek icin geregkli fonk cagrilir
            this.setUid_Utel()
            this.$router.push({name: 'VerifyPage'})
        },
        setUid_Utel(){ // onay kodunun gonderilebilmesi icin uid ve utel yani user bilgilerinin yazilmasi
            this.encryptCookie(['uid','utel'],[this.girisSonuc.uid,this.ceptel],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
        },
        onaySayfasiIzin(){ // onay sayfasini goruntulemek icin gerekli data dolduruldu. onay sayfasi goruntuleme izni verildi yani
            this.$store.commit('addOnaySayfaIzin',{izinVarMi:"evet"})
        },
        encryptPassword(){
            let valueToEncrypt = this.sifre // this could also be object/array/whatever
            let key = '123456'
            let encrypted = CryptoJSAesJson.encrypt(valueToEncrypt, key)
            this.encryptedSifre = encrypted
            // console.log('Encrypted:', encrypted)
        },
        async yeniGirisOlustur(){
            this.encryptPassword()
            try {
                const formData = new FormData();
                formData.append('f', 'web_login_app_user');
                formData.append('ceptel', this.ceptel);
                formData.append('sifre', this.encryptedSifre); // AwHFRT0HnGHDY+zfGKy4BSi4DRv3DWM9fh24O2z1F8b0QfoyddhEHZsr3OgkFZKPTa2mWmpFMclGxfN8H+7VShAO0UbDwIABk7ycvBXNI5UhIA==
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.girisSonuc = response.data
                localStorage.removeItem("adres")
            } catch (error) {
                this.errors.push(error)
            }
            if(this.girisSonuc.status == "success"){
                this.spinner = true;
                localStorage.setItem("user", JSON.stringify(this.girisSonuc))
                this.encryptCookie(['uid','utel'],[this.girisSonuc.uid,this.ceptel],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
                // document.cookie = "udep=" + "1" + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
                localStorage.removeItem("user1")
                setTimeout(() => {
                    this.$router.push({name: 'Home'})
                    this.spinner = false;
                }, 500)
            }
            else if(this.girisSonuc.status == "fail"){
                this.spinner = true;
                setTimeout(() => {
                    this.showHataMesaji = true
                    this.showNeedVerification = false
                    if(this.onaykodu){
                        this.onaykodu.basariliMi = "hayir"
                        this.onaykodu.sifreDegistiMi = "hayir"
                    }
                    this.spinner = false;
                }, 500)
            }
            else if(this.girisSonuc.status == "needsverification"){
                this.spinner = true;
                setTimeout(() => {
                    this.showNeedVerification = true
                    this.showHataMesaji = false
                    if(this.onaykodu){
                        this.onaykodu.basariliMi = "hayir"
                    }
                    this.spinner = false;
                }, 500)
            }
        },
        sifremiUnuttum(){
            this.$router.push({name: 'SifremiUnuttumTelPage'})
        },
        // SifreShowHide-dan gelen bilgiye gore sifrenin show/hide-i
        type(params){ // SifreShowHide.vue-dan yani child-dan gelen data burada yazilir
            this.typePassword = params
        },
        // kullanicinin kayit olusturmadan profilim sayfasina gittigini anlamak icin olusturulmus kontrol
        profilSayfasindanMiGeldi(){ // onemli kontrol router/index.js sayfasindaki profilim alaninda yapilmistir
            if(localStorage.getItem("prf") == "9aGs9a2BTa"){ // eger localde wht alani icinde router-da olusturulmus deger var ise..
                this.showprofilSayfasindanMiGeldi = true // ..kullanicinin giris yapmadan profilim sayfasini goruntuleyemedigini anlamasi icin mesaj alani show olur
                setTimeout(() => { // ve localdeki bu deger 1.5 saniye icinde kaybolur. bu da sayfa bir daha refresh olursa bu mesaj goruntulenemeyecek
                    localStorage.removeItem("prf")
                }, 1500)
            }
        },
        // kullanicinin kayit olusturmadan profilim sayfasina gittigini anlamak icin olusturulmus kontrol
        sepetOdemeSayfasindanMiGeldi(){ // onemli kontrol router/index.js sayfasindaki profilim alaninda yapilmistir
            if(localStorage.getItem("sptdm") == "9aGs9a2BTa"){ // eger localde wht alani icinde router-da olusturulmus deger var ise..
                this.showsepetOdemeSayfasindanMiGeldi = true // ..kullanicinin giris yapmadan profilim sayfasini goruntuleyemedigini anlamasi icin mesaj alani show olur
                setTimeout(() => { // ve localdeki bu deger 1.5 saniye icinde kaybolur. bu da sayfa bir daha refresh olursa bu mesaj goruntulenemeyecek
                    localStorage.removeItem("sptdm")
                }, 1500)
            }
        },
    },
    created(){
        this.profilSayfasindanMiGeldi()
        this.sepetOdemeSayfasindanMiGeldi()
    }
}
</script>

<style scoped>
    @media (max-width : 500px){
        .form-control{
            height: 50px;
            font-size: 22px;
        }
        label{
            font-size: 20px !important;
        }
    }
    .spinner{
        width: 25px;
        height: 25px;
        margin: -13px -20px -10px 0px;
    }
    .font-size-12{
        font-size: 12px;
    }
    .font-size-12 span{
        font-weight: 800;
        cursor: pointer;
    }
    .sifremi-unuttum{
        font-size: 11px;
        text-transform: uppercase;
        text-align: end;
        margin: -20px 0 7px 0;
    }
    .sifremi-unuttum u{
        cursor: pointer;
    }
    .danger-text{
        color: #ff2929;
    }
</style>