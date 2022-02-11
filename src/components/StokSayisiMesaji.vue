<template>
    <!-- Stok sayisi mesaj START -->
    <transition name="slide-fade">
        <div v-if="showStokSayisiMesaji" @click="mesajiKapat()" @mouseenter="mesajiGoster()" @mouseleave="mesajiKapat()" class="note note-primary urun-silindi noselect">
            {{ $t('The number you want to add is more than our stock number') }}
        </div>
    </transition>
    <!-- Stok sayisi mesaj END -->
</template>

<script>
export default {
    props : ["showStokSayisiMesaji","myTimeOut"],
    data(){
        return{
            stokSayisiMesaj : false
        }
    },
    methods : {
        mesajiKapat(){ // tiklandiginda ve mouse leave oldugunda mesaji kapatmak icin
            this.stokSayisiMesaj = false
            this.$emit("stoksayisimesaj", this.stokSayisiMesaj)
        },
        mesajiGoster(){ // mouse enter oldugunda mesaji gostermeye devam et
            this.stokSayisiMesaj = true
            clearTimeout(this.myTimeOut)
            this.$emit("stoksayisimesaj", this.stokSayisiMesaj)
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
    .urun-silindi{
        z-index: 9999;
        position: fixed;
        font-size: 14px;
        color: black;
        top: 10px;
        right: 10px;
        padding: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
    .urun-silindi:hover{
        box-shadow: 0 8px 10px 0 rgba(0,0,0,0.3);
        cursor: pointer;
    }
    .urun-silindi:active{
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