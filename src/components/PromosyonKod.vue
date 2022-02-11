<template>
    <div v-cloak>
        <button @click="promosyonKoduEkle()" type="button" :disabled='isDisabled()' class="btn btn-danger z-depth-0">
            <div class="baslik">Promosyon kodu ekle</div>
        </button>
        <div v-if="showPromosyonModal">
            <PromosyonKodIcerik />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PromosyonKodIcerik from "@/components/PromosyonKodIcerik"

export default {
    data(){
        return{
            disabled : true, // button disable-i icin
        }
    },
    components : {
        PromosyonKodIcerik
    },
    computed : {
        ...mapGetters(["showPromosyonModal","promosyonVarmi"]),
    },
    methods : {
        promosyonKoduEkle(){
            this.$store.commit('addShowPromosyonModal', true) // promosyon kodu input modali gorunsun diye
        },
        isDisabled(){
            if(this.promosyonVarmi === false){ // promosyon ekli degilse buton tiklanilabilir
                return this.disabled = false
            }
            else{ // promosyon ekliyse buton disable olur
                return this.disabled = true
            }
        },
    },
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    .btn-danger{
        font-size: 10px;
        background: #fc2828;
        color: white;
        border-radius: 3px;
        padding: 5px 10px;
    }
    button{
        outline:none !important;
    }
</style>