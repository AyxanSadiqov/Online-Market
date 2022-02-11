<template>
    <transition name="fade">
        <div v-if="showKopyalandi" class="kopyalandi">
            Kopyalandı
        </div>
    </transition>
</template>

<script>
export default {
    props : ["showKopyalandi"]
}
</script>

<style scoped>
    @media (max-width : 990px){
        .kopyalandi{
            bottom: 60px !important;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .kopyalandi{
        z-index: 9999;
        position: fixed;
        bottom: 20px;
        left: 36%;
        border-radius: 5px;
        letter-spacing: 1px;
        font-size: 13px;
        font-weight: 800;
        color: white;
        background: #1d1d1d;
        padding: 10px 20px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
    .kopyalandi:hover{
        box-shadow: 0 8px 10px 0 rgba(0,0,0,0.3);
        cursor: pointer;
    }
</style>