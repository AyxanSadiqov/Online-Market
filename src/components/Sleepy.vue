<template>
    <div>
        <div @dblclick="clickH()" class="hd-cl">z</div>
        <div v-if="hidden" class="hd-class">
            <img src="@/assets/gif/e-hide.gif" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            hidden : false,
        }
    },
    methods : {
        clickH(){
            this.hidden = true
            setTimeout(() => this.hidden = false, 4500)
        },
    },
}
</script>

<style scoped>
    .hd-cl{
        position: absolute;
        right: 0;
        bottom: 0;
        border: 1px solid transparent;
        width: 20px;
        color: transparent;
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    .hd-class{
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(15px);
    }
</style>