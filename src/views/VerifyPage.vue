Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div>
        <Navbar />
        <div class="color-grey-light mt-70">
            <div class="d-flex align-items-center h-100">
                <div class="container text-center py-5">
                    <h3 class="mb-0">Üyelik Doğrulaması</h3>
                </div>
            </div>
        </div>
        <!-- Hata mesaji START -->
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="showOnaylaHataMesaji" class="card rgba-red-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Onay kodunu doğru girmeniz gerekli.</p>
                </div>
            </div>
            <div></div>
        </div>
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="showTekrarGonderHataMesaji" class="card rgba-red-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Kullanıcı zaten onaylı veya kod gönderilirken bir hata oluştu.</p>
                </div>
            </div>
            <div></div>
        </div>
        <!-- Hata mesaji END -->
        <!-- Tekrar onay kodu gonderimi basarili mesaji START -->
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="showTekrarGonderBasariliMesaji" class="card rgba-green-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Onay kodu başarılı bir şekilde gönderildi.</p>
                </div>
            </div>
            <div></div>
        </div>
        <!-- Tekrar onay kodu gonderimi basarili mesaji END -->
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6">
                    <section class="mb-5">
                        <form action="#!" class="d-flex justify-content-center">
                            <div class="md-form md-outline form-lg">
                                <input v-model="code" @keypress="codeAlan" maxlength="6" autocomplete="off" type="text" id="defaultForm-email1" class="form-control-lg">
                                <label data-error="wrong" data-success="right" for="defaultForm-email1">Onaylama Kodu</label>
                            </div>
                        </form>

                        <div class="text-center pb-2">
                            <button @click="onayla()" :disabled='isDisabled()' id="button" type="submit" class="btn btn-md mb-4" :style="loginButtons">
                                Onayla
                                <img v-if="spinnerOnayla" class="spinner" src="@/assets/svg/spinner.gif" alt="">
                            </button>
                            <BaseTimer :time-left="timeLeft" />
                            <p>
                                <button :disabled='isDisabledTime()' type="submit" class="btn btn-md btn-danger mb-4">
                                    Yenİden gönder
                                    <img v-if="spinnerYeniden" class="spinner" src="@/assets/svg/spinner.gif" alt="">
                                </button>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import BaseTimer from "@/components/BaseTimer"
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    metaInfo() {
        return{
            title: 'Onaylama',
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    data(){
        return{
            onaylaSonuc : [],
            yenidenGonderSonuc : [],
            errors : [],
            showOnaylaHataMesaji : false,
            showTekrarGonderHataMesaji : false,
            showTekrarGonderBasariliMesaji : false,
            code : "",
            spinnerOnayla : false,
            spinnerYeniden : false,
            disabled : false,
            timeLimit: 180,
            timePassed: 0,
            timerInterval: null,
            disabledTime : false,
            // cookie bilgileri START
            uid : "",
            utel : "",
            // cookie bilgileri END
        }
    },
    components : {
        Navbar,
        BaseTimer
    },
    mounted() {
        this.startTimer();
        history.pushState(null, document.title, location.href); // browser back button deaktif icin
        addEventListener('popstate', this.birOncekiSayfaErisimKontrolu)
    },
    beforeUnmount () {
        removeEventListener('popstate', this.birOncekiSayfaErisimKontrolu)
    },
    beforeMount(){ // sayfa render olmadan onaysayfasina degeri bos mu diye kontrol edilir
        if(this.onaysayfasina.izinVarMi != "evet"){
            this.$router.push({name: 'KaydolPage'})
        }
    },
    computed : {
        ...mapGetters(["serverRequest","loginButtons"]),
        onaysayfasina:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.onaySayfaIzin;
            }
        },
        timeLeft() {
            return this.timeLimit - this.timePassed
        }
    },
    methods : {
        // browser-dan bir onceki sayfaya gitmek istendiginde normalde sepet odeme sayfasi yerine belirlenen sayfaya gonderilir
        birOncekiSayfaErisimKontrolu(){
            history.pushState(null, document.title, location.href);
            if (confirm('Yaptığınız değişiklikler kaybolacak. Çıkmak istediğinize emin misiniz?')) {
                // evet
                this.$router.push({name: 'KaydolPage'})
            } else {
                // hayir
                return ''
            }
        },
        startTimer() {
            this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        },
        isDisabledTime(){
            if(this.timeLeft <= 0){
                return this.disabledTime = false
            }
            else{
                return this.disabledTime = true
            }
        },
        codeAlan($event){
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if (keyCode < 48 || keyCode > 57) { // yalnizca rakam girilebilmesi icin
                $event.preventDefault();
            }
        },
        isDisabled(){
            if(this.code.length === 6 && this.code){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
        },
        onaySayfasiIzin(){ // onay kodu dogru girildikten sonra giris yap ve sifre yenileme sayfasinda bununla ilgili bildirimin gorunmesi icin
            this.$store.commit('addBasariliOnayKodu',{basariliMi:"evet"})
        },
        sifremiOnaylaIzin(){ // onay kodu dogru girildikten sonra sifremi onayla sayfasinin goruntulenebilmesi icin
            this.$store.commit('addSifremiOnaylaIzin',{izinVarMi:"evet"})
        },
        async onayla(){
            if(this.onaysayfasina.oncekiSayfa === 'KaydolPage'){
                try {
                    const formData = new FormData();
                    formData.append('f', 'verify_user_register');
                    formData.append('user', this.utel);
                    formData.append('code', this.code);
                    formData.append('uid', this.uid);
                    const response = await axios.post(this.serverRequest,formData,{
                        headers: {
                        // 'Accept': 'application/json',
                        // "Access-Control-Allow-Origin": "*",
                        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    });
                    this.onaylaSonuc = response.data
                } catch (error) {
                    this.errors.push(error)
                }
                if(this.onaylaSonuc.status == "success"){
                    this.spinnerOnayla = true;
                    setTimeout(() => {
                        this.$router.push({name: 'GirisYapPage'})
                        this.onaySayfasiIzin()
                        this.spinnerOnayla = false;
                    }, 500)
                }
                else if(this.onaylaSonuc.status == "fail"){
                    this.spinnerOnayla = true;
                    setTimeout(() => {
                        this.showOnaylaHataMesaji = true
                        this.spinnerOnayla = false;
                    }, 500)
                }
            }else if(this.onaysayfasina.oncekiSayfa === 'SifremiUnuttumTelPage'){
                try {
                    const formData = new FormData();
                    formData.append('f', 'verify_forgot_password');
                    formData.append('user', this.utel);
                    formData.append('code', this.code);
                    const response = await axios.post(this.serverRequest,formData,{
                        headers: {
                        // 'Accept': 'application/json',
                        // "Access-Control-Allow-Origin": "*",
                        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    });
                    this.onaylaSonuc = response.data
                } catch (error) {
                    this.errors.push(error)
                }
                if(this.onaylaSonuc.status == "success"){
                    this.spinnerOnayla = true;
                    localStorage.setItem("user1", JSON.stringify(this.onaylaSonuc))
                    setTimeout(() => {
                        this.$router.push({name: 'SifremiUnuttumPassPage'})
                        this.onaySayfasiIzin()
                        this.sifremiOnaylaIzin()
                        this.spinnerOnayla = false;
                    }, 500)
                }
                else if(this.onaylaSonuc.status == "fail"){
                    this.spinnerOnayla = true;
                    setTimeout(() => {
                        this.showOnaylaHataMesaji = true
                        this.spinnerOnayla = false;
                    }, 500)
                }
            }
        },
        async yenidenGonder(){
            try {
                const formData = new FormData();
                formData.append('f', 'resend_verification_code');
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
                this.yenidenGonderSonuc = response.data
            } catch (error) {
                this.errors.push(error)
            }
            if(this.yenidenGonderSonuc.status == "success"){
                this.spinnerYeniden = true;
                setTimeout(() => {
                    this.showTekrarGonderBasariliMesaji = true
                    this.spinnerYeniden = false;
                }, 500)
            }
            else if(this.yenidenGonderSonuc.status == "fail"){
                this.spinnerYeniden = true;
                setTimeout(() => {
                    this.showTekrarGonderHataMesaji = true
                    this.spinnerYeniden = false;
                }, 500)
            }
        },
    },
    created(){
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    .form-control-lg{
        font-size: 30px;
        max-width: 250px;
        text-align: center;
        min-height: 50px;
        max-height: 50px;
    }
    #button{
        width: 250px;
    }
    .spinner{
        width: 25px;
        height: 25px;
        margin: -13px -20px -10px 0px;
    }
    .font-size-12{
        font-size: 12px;
    }
</style>