Bu sayfa su anda kullanilmamaktadir. Acilir kapanir div ileride gerekli olur diye silinmedi
<template>
    <div class="d-flex justify-content-between randevu-bilgi mb-1" :class="classVisibility">
        <div class="p-2 bd-highlight">En yakın randevu tarihi </div>
        <div class="p-2 bd-highlight">
            <div v-for="randevu in randevuBilgi" :key="randevu.id">
                {{randevu.enyakinrandevu}}
            </div>
        </div>
        <div @click="alaniKapat()" class="up-arrow">
            <i v-if="upArrow" class="fas fa-angle-up"></i>
        </div>
        <div @click="alaniAc()" class="down-arrow" :class="classDownArrow">
            <i class="fas fa-angle-down"></i>
        </div>
    </div>  
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            randevuBilgi : [],
            errors : [],
            classVisibility : "",
            upArrow : true,
            classDownArrow : ""
        }
    },
    methods : {
        alaniKapat(){
            localStorage.setItem("r-alan",0)
            this.classVisibility='visibility-hidden'
            this.classDownArrow = 'visibility-show'
            this.upArrow = false
        },
        alaniAc(){
            localStorage.setItem("r-alan",1)
            this.classVisibility=''
            this.classDownArrow = ''
            this.upArrow = true
        },
        randevuAlanAcikKapaliKontrolu(){
            if(localStorage.getItem("r-alan") === '0'){
                this.classVisibility='visibility-hidden'
                this.classDownArrow = 'visibility-show'
                this.upArrow = false
            }else if(localStorage.getItem("r-alan") === '1'){
                this.classVisibility=''
                this.classDownArrow = ''
                this.upArrow = true
            }
        },
        async fetchRandevuBilgi(){
            try {
                const formData = new FormData();
                formData.append('f', 'get_init_data');
                const response = await axios.post('https://gunkaysanalmarket.zdc.com.tr/test/fonksiyonweb.php',formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.randevuBilgi = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
        },
    },
    created(){
        this.fetchRandevuBilgi()
        this.randevuAlanAcikKapaliKontrolu()
    }
}
</script>

<style scoped>
    .randevu-bilgi{
        z-index: 6;
        position: absolute;
        background: #33b5e5;
        color: white;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 1px;
        font-size: 12px;
        font-family: 'Lucida Console';
        margin-top: -4px;
        transition: 1s;
        text-shadow: 0 0 10px white;
    }
    .up-arrow{
        position: absolute;
        top: 35px;
        left: 52%;
        cursor: pointer;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0 10px 0 10px;
        background: #33b5e5;
        transition: .3s;
    }
    .randevu-bilgi:hover .up-arrow{
        color: black;
    }
    .down-arrow{
        visibility: hidden;
        position: absolute;
        top: 35px;
        left: 52%;
        cursor: pointer;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0 10px 0 10px;
        background: #33b5e5;
        transition: .3s;
    }
    .randevu-bilgi:hover .down-arrow{
        color: black;
    }
    .visibility-hidden{
        visibility: hidden;
        margin-top: -40px;
    }
    .visibility-show{
        visibility: visible;
        margin-top: 0px;
    }
</style>