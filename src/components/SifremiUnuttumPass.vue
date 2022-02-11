<template>
    <div v-cloak>
        <h4 v-if="showSifremiDegistir" class="mt-4 mb-4"><span class="first-word">Ş</span>ifremi Değiştir</h4>
        <!-- Hata mesaji START -->
        <div v-if="!showSifremiDegistir" class="d-flex justify-content-between">
            <div></div>
            <div v-if="showHataMesaji" class="card rgba-red-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Yeni şifre oluşturulurken bir hata oluştu.</p>
                </div>
            </div>
            <div></div>
        </div>
        <!-- profil sifremi degistir alani icin asagidaki -->
        <div v-if="showSifremiDegistir" class="d-flex justify-content-between">
            <div></div>
            <div v-if="showHataMesaji" class="card rgba-red-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Şifre değiştirilirken bir hata oluştu. Alanları doğru girdiğinizden emin olun.</p>
                </div>
            </div>
            <div></div>
        </div>
        <div v-if="showSifremiDegistir" class="d-flex justify-content-between">
            <div></div>
            <div v-if="showBasariliSifreMesaji" class="card rgba-green-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Şifreniz başarılı şekilde değiştirildi.</p>
                </div>
            </div>
            <div></div>
        </div>
        <!-- Hata mesaji END -->
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6">
                    <section class="mb-5">
                        <form action="#!">
                            <div v-if="showSifremiDegistir" class="md-form md-outline">
                                <input v-model="eskisifre" type="password" id="defaultForm-pass1" class="form-control">
                                <label data-error="wrong" data-success="right" for="defaultForm-pass1">Eski Şifre</label>
                            </div>
                            <div class="md-form md-outline">
                                <input v-model="sifre" @input="sifreAlan" type="password" id="defaultForm-pass2" class="form-control">
                                <label data-error="wrong" data-success="right" for="defaultForm-pass2">Yeni Şifre</label>
                                <small v-if="sifreConf" class="form-text danger-text mb-4">Şifre en az 6 karakterli olmalıdır.</small>
                            </div>
                            <transition name="slide">
                                <div v-if="showSifreTekrar" class="md-form md-outline">
                                    <input v-model="sifretekrar" @input="sifretekrarAlan" :type="typePassword" id="defaultForm-pass3" class="form-control">
                                    <SifreShowHide @typee="type" :showEye="showEye"/>
                                    <label data-error="wrong" data-success="right" for="defaultForm-pass3">Yeni Şifre Tekrar</label>
                                    <small v-if="sifretekrarConf" class="form-text danger-text mb-4">İki alan da aynı olmalıdır.</small>
                                </div>
                            </transition>
                        </form>

                        <div class="text-center pb-2">
                            <button type="submit" @click="fetchSifreDegistir()" :disabled='isDisabled()' class="btn mb-4" :style="loginButtons">
                                <span v-if="!showSifremiDegistir">Şİfremİ yenİle</span>
                                <span v-if="showSifremiDegistir">Şİfremİ değİştİr</span>
                                <img v-if="spinner" class="spinner" src="@/assets/svg/spinner.gif" alt="">
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { CryptoJSAesJson } from '../assets/js/cryptojs-aes-format';
import SifreShowHide from "@/components/SifreShowHide"

export default {
    data(){
        return{
            sifreSonuc : [],
            errors : [],
            eskisifre : '',
            sifre : '',
            sifretekrar : '',
            encryptedSifre : '',
            encryptedEskiSifre : '',
            sifreConf : false,
            sifretekrarConf : false,
            showSifreTekrar : false,
            showSifreBilgilendirme : true,
            showHataMesaji : false,
            spinner : false,
            user : '',
            showSifremiDegistir : false, // false - sifremi unuttum, true - profil sifre degistir demektir
            showBasariliSifreMesaji : false,
            typePassword : "password",
            showEye : false,
            // cookie bilgileri START
            utel : "",
            // cookie bilgileri END
        }
    },
    components : {
        SifreShowHide
    },
    beforeMount(){ // sayfa render olmadan onaysayfasina degeri bos mu diye kontrol edilir
        if(this.sifresayfasina.izinVarMi != "evet"){
            this.$router.push({name: 'GirisYapPage'})
        }
    },
    computed : {
        ...mapGetters(["serverRequest","loginButtons"]),
        sifresayfasina:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.sifremiOnaylaIzin;
            }
        },
    },
    methods : {
        sifreUnutveyaSifirlaKontrolu(){ // sifre degistirilmek mi yoksa sifirlanmak mi isteniyoru anlamak icin kontrol
            var baseUrl = document.baseURI
            if(baseUrl.includes("/sifremi-onayla")){ // unuttum demektir
                this.showSifremiDegistir = false
            }
            else if(baseUrl.includes("/profil/sifremi-degistir")){ // degistirilmek demektir
                this.showSifremiDegistir = true
            }
        },
        sifreAlan(){
            if(this.sifre.length < 6){
                this.sifreConf = true
            }else{
                this.sifreConf = false
                this.showSifreTekrar = true
            }
            if(this.sifretekrar != '' && this.sifre != this.sifretekrar){
                this.sifretekrarConf = true
            }else{
                this.sifretekrarConf = false
            }
        },
        sifretekrarAlan(){
            if(this.sifre != this.sifretekrar){
                this.sifretekrarConf = true
            }else{
                this.sifretekrarConf = false
            }
            if(this.sifretekrar == '' || this.sifretekrar.length == 0){
                this.showEye = false
            }else{
                this.showEye = true
            }
        },
        isDisabled(){
            if(this.sifreConf != true && this.sifre && this.sifretekrarConf != true && this.sifretekrar){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        encryptPassword(){
            let valueToEncrypt = this.sifretekrar // this could also be object/array/whatever
            let valueToEncryptEski = this.eskisifre // this could also be object/array/whatever
            let key = '123456'
            let encrypted = CryptoJSAesJson.encrypt(valueToEncrypt, key)
            let encryptedEski = CryptoJSAesJson.encrypt(valueToEncryptEski, key)
            this.encryptedSifre = encrypted
            this.encryptedEskiSifre = encryptedEski
            // console.log('Encrypted:', encrypted)
        },
        getLocalUserBilgisi(){
            if(this.showSifremiDegistir === false){ // false yani sifremi unuttum alanindan
                this.user = JSON.parse(localStorage.getItem("user1"))
            }else{ // true yani profil sifremi degistir alanindan
                this.user = JSON.parse(localStorage.getItem("user"))
            }
        },
        onaySayfasiIzin(){ // sifre basarili sekilde degistikten sonra giris yap sayfasinda bununla ilgili bildirimin gorunmesi icin
            this.$store.commit('addBasariliOnayKodu',{sifreDegistiMi:"evet"})
        },
        getUid_Udep(){
            this.utel = this.decryptCookie("utel")
        },
        async fetchSifreDegistir(){
            this.encryptPassword()
            this.getLocalUserBilgisi()
            try {
                const formData = new FormData();
                formData.append('f', 'web_change_password');
                formData.append('user', this.utel);
                if(this.showSifremiDegistir === false){
                    formData.append('expassword', "");
                }else{
                    formData.append('expassword', this.encryptedEskiSifre);
                }
                formData.append('newpassword', this.encryptedSifre);
                formData.append('uid', this.user.uid);
                if(this.showSifremiDegistir === false){
                    formData.append('forgotpassword', '1'); // 0 - sifremi guncelle, 1 - sifremi unuttum
                }else{
                    formData.append('forgotpassword', '0'); // 0 - sifremi guncelle, 1 - sifremi unuttum
                }
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.sifreSonuc = response.data
            } catch (error) {
                this.errors.push(error)
            }
            if(this.sifreSonuc.status == "success"){
                this.spinner = true;
                setTimeout(() => {
                    if(this.showSifremiDegistir === false){
                        this.$router.push({name: 'GirisYapPage'})
                        this.onaySayfasiIzin()
                    }else{
                        this.$router.currentRoute
                        this.showBasariliSifreMesaji = true
                        this.showHataMesaji = false
                    }
                    this.spinner = false;
                }, 500)
            }
            else if(this.sifreSonuc.status == "fail"){
                this.spinner = true;
                setTimeout(() => {
                    this.showHataMesaji = true
                    this.showSifreBilgilendirme = false
                    this.spinner = false;
                }, 500)
            }
        },
        // SifreShowHide-dan gelen bilgiye gore sifrenin show/hide-i
        type(params){ // SifreShowHide.vue-dan yani child-dan gelen data burada yazilir
            this.typePassword = params
        },
    },
    created(){
        this.sifreUnutveyaSifirlaKontrolu()
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 500px){
        .form-control{
            height: 50px;
            font-size: 20px;
        }
        label{
            font-size: 20px !important;
        }
    }
    /* sifre tekrari icin START */
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
    /* sifre tekrari icin END */
    .spinner{
        width: 25px;
        height: 25px;
        margin: -13px -20px -10px 0px;
    }
    .font-size-12{
        font-size: 12px;
    }
    .first-word{
        text-decoration: underline;
    }
    .danger-text{
        color: #ff2929;
    }
</style>