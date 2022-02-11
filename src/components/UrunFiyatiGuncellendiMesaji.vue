Bu sayfadaki puf noktalar:
1 - asagidaki bilgilerin hepsi store-dan geliyor(sepet odeme sayfasindaki urunFiyatiniGuncelle fonksiyonuna bakilabilir)
<template>
    <!-- Urun silindi mesaj START -->
    <transition name="slide-fade">
        <div v-if="fiyatGuncellendi.showMesaj" class="note note-success urun-guncellendi">
            {{fiyatGuncellendi.urunAdi}} ürünün fiyatı {{fiyatGuncellendi.urunGuncelFiyati}} olarak <strong>güncellendi.</strong>
            {{hideMesaj()}}
        </div>
    </transition>
    <!-- Urun silindi mesaj END -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed : {
        ...mapGetters(["fiyatGuncellendi"])
    },
    methods : {
        hideMesaj(){
            if(this.fiyatGuncellendi.showMesaj === true){
                setTimeout(() => this.fiyatGuncellendi.showMesaj = false, 4000)
            }
        }
    }
}
</script>

<style scoped>
    /* Urun Guncellendi Mesaji START */
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
    /* Urun Guncellendi Mesaji END */
    .urun-guncellendi{
        z-index: 9999;
        position: fixed;
        top: 10px;
        font-size: 14px;
        color: black;
        right: 10px;
        padding: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
</style>