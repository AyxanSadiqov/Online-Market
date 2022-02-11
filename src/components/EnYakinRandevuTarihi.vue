<template>
    <div class="tarih">
        <span><img class="tarih-svg" src="@/assets/svg/Clock.svg" alt=""></span>
        <span class="tarih-yazi">{{ $t('Nearest delivery') }}:</span>
        <span class="tarih-saat" v-for="randevu in enyakinrandevutarihi.randevu" :key="randevu.id">
            <span>{{randevu.enyakinrandevu}}</span>
        </span> 
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            randevuBilgi : [],
            errors : [],
            // cookie bilgileri START
            utel : "",
            uid : "",
            // cookie bilgileri END
            koordinat : "",
        }
    },
    computed : {
        ...mapGetters(["serverRequest"]),
        enyakinrandevutarihi:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.enYakinRandevuTarihi;
            }
        }
    },
    methods : {
        async fetchRandevuBilgi(){
            this.getKoordinat()
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'web_get_init_data');
                formData.append('depo', this.koordinat);
                formData.append('os', 'web');
                formData.append('version', '1');
                formData.append('fbid', '0');
                formData.append('teslimattip', '1');
                var getUserInLocal = localStorage.getItem("user")
                if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
                    formData.append('user', this.utel);
                    formData.append('uid', this.uid);
                }
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.randevuBilgi = response.data
                // others.js-deki addEnYakinRandevuTarihi fonksiyonu calisir ve degerler enyakinrandevutarihi-ne yazilir
                this.$store.commit('addEnYakinRandevuTarihi',{randevu:this.randevuBilgi})
                // console.log("sorgu yapildi")
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
        },
        getKoordinat(){
            this.koordinat = localStorage.getItem("koord")
        },
        getUid_Udep(){
            this.utel = this.decryptCookie("utel")
            this.uid = this.decryptCookie("uid")
        },
    },
    created(){
        // bu kontrol her defasinda sorgu yapilmasin diye eklendi. fetchRandevuBilgi fonksiyonu icinde store-daki enyakinrandevutarihi icine
        // sorgu sonrasi donen response yaziliyor. eger bu degerin ici doluysa sorgu yapilmistir demektir ve bir daha sorgu yapilmiyor
        if(this.enyakinrandevutarihi === ""){
            this.fetchRandevuBilgi()
        }
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 490px){
        .tarih{
            width: 80% !important;
            margin-left: 60px !important;
        }
    }
    @media (max-width : 390px){
        .tarih-yazi{ display: none !important; }
        .tarih{
            width: 90% !important;
            margin-left: 20px !important;
        }
    }
    .tarih{
        border: 1px solid white;
        border-radius: 8px;
        background: white;
        color: #206736;
        font-weight: 800;
        padding: 5px;
        margin-left: 210px;
    }
    .tarih-svg{
        width: 16px;
        margin: -2px 5px 0px 3px;
    }
    .tarih-yazi{
        color: #5f5f5f;
        text-transform: capitalize;
    }
    .tarih-saat span{
        position: relative;
        font-size: 13px;
        text-decoration: underline;
        margin-left: 1px;
    }
</style>