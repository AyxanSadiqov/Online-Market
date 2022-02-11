Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div>
        <Navbar />
        <div class="color-grey-light mt-70" :class="girisYap">
            <div class="d-flex align-items-center h-100">
                <div class="container text-center py-5">
                    <h3 class="mb-0">{{ $t('Register') }}</h3>
                </div>
            </div>
        </div>
        <!-- Hata mesaji START -->
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="showHataMesaji" class="card rgba-red-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">{{ $t('Records were created before with X phone numbers. Please try again with another number', { ceptel: dublicateCeptel}) }}.</p>
                    <p v-if="showTelKullanicin" class="white-text mb-0 font-size-12">Bu telefon numarası size aitse <span @click="onaySayfasinaGit()">daha önceden telefonunuza gönderdiğimiz onay kodunu giriniz</span>.</p>
                </div>
            </div>
            <div></div>
        </div>
        <!-- Hata mesaji END -->
        <!-- 0 ile baslayan telefon numarasi girildiginde gorunecek olan bildiri START -->
        <div v-if="showSifirIleBaslayanTelNo">
            <div class="arkafon">
                <div class="ownModal">
                    <div class="baslik">
                        <h4 class="d-flex justify-content-center">
                            Öneri
                        </h4>
                    </div>
                    <div>
                        <div class="text-center">
                            <div>Girmiş olduğunuz <b>{{ceptel}}</b> numaralı telefonda bir hata var. Numaranız <b>0</b> ile başlayamaz.</div>
                            <div>Lütfen <b class="gecerli-tel-no">geçerli telefon numarası<span>(555) 555 55 55</span></b> girin.</div>
                        </div>
                        <div class="buton-sec mt-3">
                            <a @click="sifirIleBaslayanNumaraIseDegistir()">Değiştir</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 0 ile baslayan telefon numarasi girildiginde gorunecek olan bildiri START -->
        
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6">
                    <section class="mt-4 mb-5">
                        <form action="#!">
                            <div class="form-row">
                                <div class="col">
                                    <div class="md-form md-outline mt-0">
                                        <input v-model="adsoyad" type="text" id="materialRegisterFormFirstName" class="form-control">
                                        <label for="materialRegisterFormFirstName">{{ $t('Name, Surname') }}</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="md-form md-outline mt-0">
                                        <input v-model="ceptel" @input="telefonAlan" @keypress="telefonKontrol" type="text" id="materialRegisterFormNumber" class="form-control">
                                        <label for="materialRegisterFormNumber">{{ $t('Phone number') }}</label>
                                        <small v-if="ceptelConf" class="form-text danger-text mb-4">{{ $t('Enter valid phone number. For example: (555) 555 55 55') }}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="md-form md-outline mt-0">
                                <input v-model="mail" @input="mailAlan" type="email" id="defaultForm-email2" class="form-control">
                                <label data-error="wrong" data-success="right" for="defaultForm-email2">{{ $t('E-mail address') }}</label>
                                <small v-if="mailConf" class="form-text danger-text mb-4">{{ $t('Enter valid e-mail address. For example: zdc@bilisim.com') }}</small>
                            </div>
                            <div class="md-form md-outline mt-0">
                                <input v-model="sifre" @input="sifreAlan" :type="typePassword" id="defaultForm-pass2" class="form-control">
                                <SifreShowHide @typee="type" :showEye="showEye"/>
                                <label data-error="wrong" data-success="right" for="defaultForm-pass2">{{ $t('Password') }}</label>
                                <small v-if="sifreConf" class="form-text danger-text mb-4">Şifre en az 6 karakterli olmalıdır.</small>
                            </div>
                        </form>
                        <div class="text-center mb-2" :class="girisYap">
                            <button @click="kaydolButon()" :disabled='isDisabled()' type="submit" class="btn mb-4" :style="loginButtons">
                                {{ $t('Register') }}
                                <img v-if="spinner" class="spinner" src="@/assets/svg/spinner.gif" alt="">
                            </button>
                            <p>Zaten hesabım var. <router-link to="/girisyap" :style="loginTexts"><b>Giriş Yap</b></router-link></p>
                            <hr class="mt-4">
                            <p>
                                <em>Kaydol</em> 'a tıklayarak
                                <router-link to="/kullanim-sartlari" :style="loginTexts"><b>kullanım şartlarını</b></router-link> kabul etmiş oluyorsunuz
                            </p>
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
import Footer from "@/components/Footer"

export default {
    metaInfo() {
        return{
            title: 'Kaydol',
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    data(){
        return{
            kayitSonuc : [],
            errors : [],
            adsoyad : '',
            ceptel : '',
            dublicateCeptel : '', // direkt ceptel-e gore hata mesaji gosterildiginde, telefon numarasi alani guncellendiginde hata mesaji icindeki tel de guncelleniyordu. tel bilgisi buraya, bu da hata mesajina yaziliyor
            mail : '',
            sifre : '',
            encryptedSifre : '',
            ceptelConf : false,
            mailConf : false,
            sifreConf : false,
            disabled : true, // button disable-i icin
            spinner : false,
            showHataMesaji : false, // kayit olurken hata olursa mesajin show/hide-i icin
            getUtel : "", // burasi kullanicin cookie-sinde utel bilgisi varsa tekrar onay kodu gonderebilmek icin var
            showTelKullanicin : false,
            typePassword : "password",
            showEye : false,
            showSifirIleBaslayanTelNo : false, // 0 ile baslayan tel no girildiginde gosterilecek bildirinin show/hide-i icin
        }
    },
    components : {
        Navbar,
        SifreShowHide,
        Footer
    },
    computed : {
        ...mapGetters(["girisYap","serverRequest","loginButtons","loginTexts"]),
    },
    methods : {
        telefonKontrol(){ // simdilik burada ilk rakamin 0 olmasina karsilik islemler yapiliyor
            if(this.ceptel.length == 3 && this.ceptel[0] == 0){
                this.ceptel = this.ceptel.slice(1,14)
            }
        },
        sifirIleBaslayanNumaraIseDegistir(){
            this.showSifirIleBaslayanTelNo = false // bildirim gizlenir
            this.ceptel = "" // ceptel alani bir daha doldurulsun diye temizlenir
            this.ceptelConf = true // telefon numarasinin uyari mesaji show olur
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
        sifreAlan(){
            if(this.sifre.length < 6){
                this.sifreConf = true
            }else{
                this.sifreConf = false
            }
            if(this.sifre == '' || this.sifre.length == 0){
                this.showEye = false
            }else{
                this.showEye = true
            }
        },
        isDisabled(){
            if(this.adsoyad != "" && this.ceptelConf != true && this.ceptel != "" && this.mailConf != true && this.mail != "" && this.sifre && !this.sifreConf){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        encryptPassword(){
            let valueToEncrypt = this.sifre // this could also be object/array/whatever
            let key = '123456'
            let encrypted = CryptoJSAesJson.encrypt(valueToEncrypt, key)
            this.encryptedSifre = encrypted
            // console.log('Encrypted:', encrypted)
        },
        // decryptPassword(){
        //     let encrypted = '{"ct":"xWJRqpNhDV3HX+YnsrsiVA==","iv":"a2d48bc4570b85c09b777f157b9800de","s":"c13a33527eb6a0ab"}'
        //     let key = 'zdc.com.tr'
        //     let decrypted = CryptoJSAesJson.decrypt(encrypted, key)
        //     console.log('Decrypted:', decrypted)
        // },
        onaySayfasinaGit(){
            this.onaySayfasiIzin() // onay sayfasini goruntelemek icin geregkli fonk cagrilir
            this.$router.push({name: 'VerifyPage'})
        },
        onaySayfasiIzin(){ // onay sayfasini goruntulemek icin gerekli data dolduruldu. onay sayfasi goruntuleme izni verildi yani
            this.$store.commit('addOnaySayfaIzin',{izinVarMi:"evet", oncekiSayfa:"KaydolPage"})
        },
        telefonNoKullanicininMi(){
            var utel = this.decryptCookie("utel")
            this.getUtel = utel.pop().split(';').shift()
            if(this.ceptel === this.getUtel){
                this.showTelKullanicin = true
            }
        },
        kaydolButon(){ // kullanici yanlislikla 0 ile baslayan numara girerse kontrolu saglamak icin
            // normalde bu kontrol telefon alanindaki keypress icindeki fonksiyon ile saglaniyor ama farkli tarayici oldugunda ya da mobilden girildiginde
            // dogru calismiyor. bu yuzden simdilik boyle bir kontrol de eklendi.
            if(this.ceptel[1] === '0'){ // girilen telefon no-nun ilk hanesi 0 ise kullaniciya bildiri gosterilsin
                this.showSifirIleBaslayanTelNo = true // 0 ile baslayan tel no girildiginde gosterilecek bildirim gizlenir
            }
            else{ // istenilen formatta girildiyse kayit olusturulur
                this.yeniKayitOlustur()
            }
        },
        async yeniKayitOlustur(){
            this.showSifirIleBaslayanTelNo = false // 0 ile baslayan tel no girildiginde gosterilecek bildirim gizlenir
            this.encryptPassword()
            try {
                const formData = new FormData();
                formData.append('f', 'web_add_new_user');
                formData.append('adsoyad', this.adsoyad);
                formData.append('ceptel', this.ceptel);
                formData.append('mail', this.mail);
                formData.append('sifre', this.encryptedSifre); // AwHFRT0HnGHDY+zfGKy4BSi4DRv3DWM9fh24O2z1F8b0QfoyddhEHZsr3OgkFZKPTa2mWmpFMclGxfN8H+7VShAO0UbDwIABk7ycvBXNI5UhIA==
                formData.append('os', 'web');
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.kayitSonuc = response.data
                localStorage.removeItem("adres")
            } catch (error) {
                this.errors.push(error)
            }
            if(this.kayitSonuc.status == "success"){ // kayit islemi eksiksiz tamamlandiysa onay sayfasina yonlendirilir
                this.spinner = true;
                this.encryptCookie(['uid','utel'],[this.kayitSonuc.uid,this.ceptel],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
                setTimeout(() => {
                    this.$router.push({name: 'VerifyPage'})
                    this.spinner = false;
                }, 1500)
                this.onaySayfasiIzin() // onay sayfasini goruntelemek icin geregkli fonk cagrilir
            }
            else if(this.kayitSonuc.status == "duplicate"){ // numara kayitliysa hata mesaji vermesi icin
                this.spinner = true;
                setTimeout(() => {
                    this.showHataMesaji = true
                    this.dublicateCeptel = this.ceptel
                    this.telefonNoKullanicininMi()
                    this.spinner = false;
                }, 1500)
            }
        },
        // SifreShowHide-dan gelen bilgiye gore sifrenin show/hide-i
        type(params){ // SifreShowHide.vue-dan yani child-dan gelen data burada yazilir
            this.typePassword = params
        },
    }
}
</script>

<style scoped>
    @media (max-width : 500px){
        .form-control{
            height: 50px;
            font-size: 20px;
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
    .danger-text{
        color: #ff2929;
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
        top: 30%;
        padding: 30px;
    }
    .baslik{
        padding-bottom: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: white;
    }
    .buton-sec{
        display: flex;
        justify-content: center;
    }
    .buton-sec a{
        background: #eeeeee;
        width: 100%;
        padding: 5px;
        margin-right: 10px;
        text-align: center;
    }
    .buton-sec a:hover{
        background: #cccccc;
    }
    .gecerli-tel-no{
        position: relative;
        cursor: pointer;
    }
    .gecerli-tel-no:hover span{
        visibility: visible;
        opacity: 1;
    }
    .gecerli-tel-no span{
        position: absolute;
        left: 30px;
        bottom: 20px;
        width: 120px;
        font-size: 15px;
        border: 1px solid red;
        border-radius: 5px;
        background: #ff2929;
        color: white;
        visibility: hidden;
        opacity: 0;
        transition:visibility 0.3s linear,opacity 0.3s linear;
    }
</style>