Bu sayfadaki puf noktalar:
1 - Vitrin.vue-nun child-i
<template>
    <div>
        <!-- virtin menulerde dinamik sekilde resim eklendi. vitringrup-un id-si 1 ise baska resim, 2 ise baska resim gosteriliyor -->
        <div class="vitrin-menuler">
            <div v-for="vitrin in vitrinler" :key="vitrin.id">
                <a v-for="vit in vitrin.vitringrup" :key="vit.id" @click="vitrinMenuSec(vit)" :class="{current:vit.id == current}">
                    <img v-if="vit.id==1" src="@/assets/svg/vitrin-encoksatan.svg" class="img-fluid" alt="">
                    <img v-if="vit.id==2" src="@/assets/svg/vitrin-indirimdeki.svg" class="img-fluid" alt="">
                    <span>{{ vit.ad }}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ["vitrinler"],
    data(){
        return{
            showYukleniyor : true, // sorgu beklenene kadar ki sure zarfinda gorunecek loading svg show/hide-i icin
            current : 1, // aktif olacak menuye aktifligi gosterecek class eklenebilmesi icin burasi var.
        }
    },
    methods : {
        vitrinMenuSec(vit){
            this.$emit("vitrinmenuid", vit.id) // tiklanilan vitrinin id-si emit ile parente(yani Vitrin.vue-e) gonderilir
            this.current = vit.id
        },
    },
}
</script>

<style scoped>
    @media (max-width : 500px){
        .vitrin-menuler{ width: 60px !important; }
        .vitrin-menuler a span{ display: none !important; }
        .vitrin-menuler img{
            width: 50px !important;
        }
    }
    .vitrin-menuler{
        float: left;
        height: 365px;
        margin: 10px 10px 0 0;
        border-radius: 10px;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.3);
        transition: .5s;
    }
    .vitrin-menuler a{
        display: block;
        position: relative;
        margin: 20px 10px;
        padding: 5px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        transition: .1s;
    }
    .vitrin-menuler a span{
        z-index: 1;
        font-size: 14px;
        font-weight: 800;
        color: #5e5e5e;
    }
    .current{
        -webkit-box-shadow: inset 0 0 10px #bbbbbb;
        -moz-box-shadow: inset 0 0 10px #bbbbbb;
        box-shadow: inset 0 0 10px #bbbbbb;
        transition: .5s;
    }
    .current span{
        color: black !important;
        transition: .5s;
    }
</style>