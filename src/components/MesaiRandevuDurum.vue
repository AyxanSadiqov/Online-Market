<template>
    <div v-cloak>
        <div v-for="mesaibilg in mesaiBilgi" :key="mesaibilg.id">
            <div v-for="mesai in mesaibilg.parameters" :key="mesai.id">
                <div v-if="mesai.id==8 && mesai.deger=='true'">
                    <!-- Randevulu siparis alimi acik demektir -->
                </div>
                <div v-else-if="mesai.id==8 && mesai.deger!='true'" class="mesai-randevu-durum">
                    <span>Çok Yakında Sizlerin Hizmetinizdeyiz... Uygulamamız Hizmete Açıldığında Size Bildirim İle Haber Vereceğiz</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            mesaiBilgi : [],
            error : [],
            // cookie bilgileri START
            utel : "",
            uid : "",
            // cookie bilgileri END
            koordinat : "",
        }
    },
    computed : {
        ...mapGetters(["serverRequest"]),
    },
    methods : {
        async fetchMesaiDurum(){
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
                this.mesaiBilgi = response.data
            }catch (error) {
                this.errors.push(error)
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
        this.fetchMesaiDurum()
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    .mesai-randevu-durum{
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        padding-top: 20%;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(15px);
    }
    .mesai-randevu-durum span{
        font-size: 20px;
        font-weight: 800;
        padding: 20px;
    }
</style>