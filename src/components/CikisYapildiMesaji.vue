<template>
    <!-- Cikis yapildi mesaji START -->
    <transition name="slide-fade">
        <div v-if="showCikisYapildiMi" class="note note-success urun-eklendi">
            Hesabınızdan başarılı bir şekilde <strong>çıkış yapıldı.</strong>
        </div>
    </transition>
    <!-- Cikis yapildi mesaji END -->
</template>

<script>
export default {
    props : ["showCikisYapildiMi"]
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
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
</style>