<template>
    <div>
        <Navbar />
        <div class="color-grey-light mt-70">
            <div class="d-flex align-items-center h-100">
                <div class="container text-center py-5">
                    <h3 class="mb-0">Şifremi Unuttum</h3>
                </div>
            </div>
        </div>
        
        <!-- Hata mesaji START -->
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="showTelefonHata" class="card rgba-brown-strong text-center z-depth-0">
                <div class="card-body">
                    <p class="white-text mb-0 font-size-12">Hata. Telefon numaranızı doğru girdiğinize emin olun.</p>
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
                            <div class="md-form md-outline">
                                <input v-model="ceptel" @input="telefonAlan" type="text" id="defaultForm-email1" class="form-control">
                                <label data-error="wrong" data-success="right" for="defaultForm-email1">{{ $t('Phone number') }}</label>
                                <small v-if="ceptelConf" class="form-text danger-text mb-4">{{ $t('Enter valid phone number. For example: (555) 555 55 55') }}</small>
                            </div>
                        </form>

                        <div class="text-center pb-2">
                            <button type="submit" @click="fetchTelefonNo()" :disabled='isDisabled()' class="btn mb-4" :style="loginButtons">
                                Onay Kodu Gönder
                                <img v-if="spinner" class="spinner" src="@/assets/svg/spinner.gif" alt="">
                            </button>
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
import Footer from "@/components/Footer"

export default {
    metaInfo() {
        return{
            title: 'Şifremi Unuttum',
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    data(){
        return{
            telSonuc : [],
            errors : [],
            showTelefonHata : false,
            ceptel : '',
            ceptelConf : false,
            spinner : false,
        }
    },
    components : {
        Navbar,
        Footer
    },
    computed : {
        ...mapGetters(["serverRequest","loginButtons"]),
    },
    methods : {
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
        isDisabled(){
            if(this.ceptelConf != true && this.ceptel){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        onaySayfasiIzin(){ // onay sayfasini goruntulemek icin gerekli data dolduruldu. onay sayfasi goruntuleme izni verildi yani
            this.$store.commit('addOnaySayfaIzin',{izinVarMi:"evet", oncekiSayfa:"SifremiUnuttumTelPage"})
        },
        async fetchTelefonNo(){
            try {
                const formData = new FormData();
                formData.append('f', 'resend_verification_code_forgot');
                formData.append('user', this.ceptel);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.telSonuc = response.data
            } catch (error) {
                this.errors.push(error)
            }
            if(this.telSonuc.status == "success"){
                this.spinner = true;
                setTimeout(() => {
                    this.encryptCookie(['utel'],[this.ceptel],1) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
                    this.$router.push({name: 'VerifyPage'})
                    this.spinner = false;
                }, 500)
                this.onaySayfasiIzin() // onay sayfasini goruntelemek icin gerekli fonk cagrilir
            }
            else if(this.telSonuc.status == "fail"){
                this.spinner = true;
                setTimeout(() => {
                    this.showTelefonHata = true
                    this.spinner = false;
                }, 500)
            }
        },
    },
    created(){}
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
    .danger-text{
        color: #ff2929;
    }
</style>