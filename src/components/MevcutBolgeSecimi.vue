Bu sayfadaki puf noktalar:
1 - Harita eklendikten ve adrese gore kontroller yapilmaya basladiktan sonra bu sayfa kullanilmiyor simdilik.
<template>
    <div v-cloak>
        <div class="text-right mevcutbolge-button mr-2">
            <button @click="fetchDepolar()" type="button" class="btn btn-md btn-navbar waves-effect waves-light resp-mevcut-bolge-button" :class="sepetButtonColor" data-toggle="modal" data-target="#exampleModal">
                {{ $t('Current Region') }} -
                <span>{{ depoAd }}</span>
            </button>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" :style="modalHeader">
                        <h5 class="modal-title" id="exampleModalLabel">Teslimat Bölgesi</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="dark-text">&times;</span></button>
                    </div>
                    <!-- <div v-for="depos in depolar" :key="depos.id">
                        <div v-for="depo in depos.depolar" :key="depo.id">
                            {{depo.ad}}
                        </div>
                    </div>
                    <div class="modal-body">
                        <select v-for="depos in depolar" :key="depos.id" class="browser-default custom-select">
                            <option v-for="depo in depos.depolar" :key="depo.id" :value="depo.id">{{depo.ad}}</option>
                        </select>
                    </div> -->
                    <!-- <div class="modal-body">
                        <select class="browser-default custom-select">
                            <option selected>Depo Seçimi</option>
                            <option :value="1">Depo 1</option>
                            <option :value="2">Depo 2</option>
                            <option :value="3">Depo 3</option>
                        </select>
                    </div> -->
                    <div class="modal-body" :style="modalBody">
                        <div v-for="depos in depolar" :key="depos.id">
                            <div v-for="depo in depos.depolar" :key="depo.id">
                                <div @click="depoSahipSec(depo)">
                                    <input type="radio" :id="depo.id" v-model="depoId" :value="depo.id">&nbsp;
                                    <label :for="depo.id">{{depo.ad}}</label>
                                </div>
                            </div>
                        </div>
                        <!-- <span>value: {{depoId}}</span> -->
                        <transition name="bounce">
                            <div v-if="showDepoDegisikligi" class="card rgba-indigo-strong text-center z-depth-0">
                                <div class="card-body">
                                    <p class="white-text mb-0 font-size-13">
                                        Deponuzu değiştirdiğiniz taktirde sepetiniz sıfırlanacaktır. Yine de değiştirmek istiyor musunuz?
                                        <br><br>
                                        <span @click="depoDegisimiEvet()" class="evet">Evet</span>
                                        <span @click="depoDegisimiHayir()" data-dismiss="modal" class="hayir">Hayır</span>
                                    </p>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div class="modal-footer" :style="modalFooter">
                        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                        <button type="button" @click="teslimatBolgesiSec()" class="btn btn-outline-primary btn-md" :class="whiteButton" :data-dismiss="modal">Teslİmat Bölgesİnİ Seçİn</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data(){
        return{
            depolar : [],
            errors : [],
            showLoginButtons : true, // kaydi olmayan kullaniciya gorunecek giris yap ve kayit ol butonlarinin show/hide-i icin
            showProfil : false, // kaydi olan kullanicinin gorecegi profilim butonunun show/hide-i icin
            depoAd : '', // navbar-da mevcut bolge alaninin yaninda gorunecek depo ad bilgisi
            depoBilgisi : '',
            depoId : '', // mevcut bolge modali icerisindeki secili deponun id-si buraya yazilir
            depoSahip : '',
            showDepoDegisikligi : false,
            modal : "",
            koordinat : "",
        }
    },
    computed : {
        ...mapGetters(["sepetButtonColor","modalHeader","modalBody","modalFooter","whiteButton","serverRequest"]),
    },
    methods : {
        defaultMevcutBolgeAtamasi(){ // sayfa ilk yuklendiginde cookie-de depo bilgisi var mi diye kontrol edilir
            var depo_cookie = document.cookie
            if(depo_cookie.includes("udep")){
                return
            }
            else{ // eger yoksa default olarak depo numarasi cookie-ye 1 olarak yazilir
                document.cookie = "udep=" + "1" + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
                document.cookie = "ushp=" + "1" + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
            }
        },
        getUdep(){
            var getCookie = document.cookie
            var udep = getCookie.split("udep=") // udep iki elemanli bir dizi olur ('udep=' silinmis halde)
            this.depoBilgisi = udep.pop().split(';').shift() // ..udep degeri alinana kadar dizi kesilip bicilir ve depoBilgisi-ne yazilir
            this.depoId = this.depoBilgisi // secili bolge gosteriminin radio button-da gosterimi icin
            if(this.depoBilgisi == 1){
                this.depoAd = "Kuruçeşme"
            }else if(this.depoBilgisi == 2){
                this.depoAd = "Derİnce"
            }else if(this.depoBilgisi == 3){
                this.depoAd = "Körfez"
            }else if(this.depoBilgisi == 4){
                this.depoAd = "Dumlupınar"
            }else if(this.depoBilgisi == 5){
                this.depoAd = "Petkim"
            }else if(this.depoBilgisi == 6){
                this.depoAd = "Yenikent"
            }
        },
        teslimatBolgesiSec(){
            if(this.depoId == ""){ // olur da localden udep bilgisi silinirse diye
                document.cookie = "udep=" + "1" + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
                document.cookie = "ushp=" + "1" + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
                this.modal = "modal"
                this.$router.go(0)
            }else if(this.depoId != this.depoBilgisi){ // 2.sart) simdikinden farkli bir depo secilmek istendiginde
                this.showDepoDegisikligi = true
            }else if(this.depoSahip === ""){ // 3.sart) herhangi biri secilmeden 'teslimat bolgesi secin'-e tiklandigi anda bir degisiklik olmadi demektir
                this.modal = "modal"
                setTimeout(() => this.modal = "", 300) // ilkte 3.sart sonrasinda baska sart saglansa bile modal kapanmamasi icin
            }
            else{
                document.cookie = "udep=" + this.depoId + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
                document.cookie = "ushp=" + this.depoSahip + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
                this.modal = "modal"
                this.$router.go(0)
            }
        },
        depoDegisimiEvet(){
            document.cookie = "udep=" + this.depoId + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
            document.cookie = "ushp=" + this.depoSahip + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
            localStorage.removeItem("sepet")
            this.modal = "modal"
            this.$router.go(0)
        },
        depoDegisimiHayir(){
            setTimeout(() => 
                this.showDepoDegisikligi = false,
                this.depoId = "",
            500)
        },
        depoSahipSec(depo){
            this.depoSahip = depo.deposahip
        },
        getKoordinat(){
            this.koordinat = localStorage.getItem("koord")
        },
        async fetchDepolar(){
            this.getKoordinat()
            try {
                const formData = new FormData();
                formData.append('f', 'web_get_init_data');
                formData.append('depo', this.koordinat);
                formData.append('os', 'web');
                formData.append('version', '1');
                formData.append('fbid', '0');
                formData.append('teslimattip', '1');
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.depolar = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
        }
    },
    created(){
        this.defaultMevcutBolgeAtamasi()
        this.getUdep()
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 500px){
        .resp-mevcut-bolge-button{
            font-size: 10px;
            padding: 10px 13px 10px 13px;
        }
    }
    button{
        outline:none !important;
    }
    .mevcutbolge-button{
        margin-top: -25px;
    }
    .font-size-13{
        font-size: 13px;
    }
    .evet{
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 5px 15px 5px 15px;
        margin-right: 5px;
    }
    .evet:hover{
        cursor: pointer;
        border: 1px solid rgb(204, 204, 204);
    }
    .hayir{
        padding: 5px 15px 5px 15px;
        margin-left: 5px;
    }
    .hayir:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    /* Depo degisimi bildirim efekti START */
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
    /* Depo degisimi bildirim efekti END */
</style>