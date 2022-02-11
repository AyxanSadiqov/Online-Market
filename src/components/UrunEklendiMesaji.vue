<template>
    <!-- Urun eklendi mesaji START -->
    <transition name="slide-fade">
        <div v-if="showUrunEklendi" @click="mesajiKapat()" @mouseenter="mesajiGoster()" @mouseleave="mesajiKapat()" class="note note-success urun-eklendi noselect">
            {{ eklenenUrun }} ({{ eklenenUrunAdeti }} {{ birimAdetKg }}) sepetinize <strong>eklendi.</strong>
        </div>
    </transition>
    <!-- Urun eklendi mesaji END -->
</template>

<script>
export default {
    props : ["showUrunEklendi","eklenenUrun","eklenenUrunAdeti","myTimeOut","birimAdetKg"],
    data(){
        return{
            urunEklendi : false
        }
    },
    methods : {
        mesajiKapat(){ // tiklandiginda ve mouse leave oldugunda mesaji kapatmak icin
            this.urunEklendi = false
            this.$emit("uruneklendi", this.urunEklendi)
        },
        mesajiGoster(){ // mouse enter oldugunda mesaji gostermeye devam et
            this.urunEklendi = true
            clearTimeout(this.myTimeOut)
            this.$emit("uruneklendi", this.urunEklendi)
        },
    },
}
</script>

<style scoped>
    /* Urun Eklendi/Silindi Mesaji START */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(10px);
        opacity: 0;
    }
    /* Urun Eklendi/Silindi Mesaji END */
    .urun-eklendi{
        z-index: 9999;
        position: fixed;
        top: 10px;
        font-size: 14px;
        color: black;
        right: 10px;
        padding: 15px;
        max-width: 330px;
        overflow: hidden;
        text-overflow: clip;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
    .urun-eklendi:hover{
        box-shadow: 0 8px 10px 0 rgba(0,0,0,0.3);
        cursor: pointer;
    }
    .urun-eklendi:active{
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.3);
        cursor: pointer;
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
</style>