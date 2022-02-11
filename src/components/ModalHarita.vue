Bu sayfadaki puf noktalar:
1 - Standart modal kullanmak yerine kendi olusturdugum modal kullandim. Sebebi z-index uyumsuzlugu
<template>
    <div v-if="showHarita">
        <div class="arkafon">
            <div class="ownModal">
                <div class="baslik">
                    <span class="d-flex justify-content-center">Teslimat Adresi Ekleyin</span>
                    <div class="d-flex justify-content-end mr-2">
                        <button @click="kapat()" type="button" class="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="icerik">
                    <Harita />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Harita from "@/components/Harita"

export default {
    props: ["showHarita"],
    data(){
        return{
            haritayiKapat : true,
        }
    },
    components: {
        Harita
    },
    methods : {
        kapat(){
            this.$emit("haritakapat", this.haritayiKapat = false)
        }
    },
}
</script>

<style scoped>
    @media (max-height : 690px){
        .ownModal{ padding-bottom: 10px; }
    }
    @media (max-height : 650px){
        .ownModal{ padding-bottom: 40px; }
    }
    button{
        outline:none !important;
    }
    .arkafon{
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        margin-left: calc(50% - 50vw);
        width: 100vw;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        overflow-x: auto;
    }
    .ownModal{
        z-index: 1000;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        background: white;
        max-width: 800px;
        position: absolute;
        top: 20px;
    }
    .baslik{
        padding-bottom: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: white;
        font-size: 17px;
    }
    .baslik span{
        margin-bottom: -23px;
        padding-top: 10px;
        font-weight: 400;
    }
    .icerik{
        display: flex;
        justify-content: center;
    }
</style>