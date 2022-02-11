<template>
    <div>
        <div v-if="urun.kampanyalimi==1">
            <div class="indirim-urun">
                <span class="indirim-oran">%</span>{{ indirimli(urun) }}
                <span class="indirim-yazisi">İndİrİm</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props : ["urun"],
    methods : {
        indirimli(urun){
            // (buyuk - kucuk)/buyuk*100
            let oran = parseInt((parseFloat(urun.kampanyasizsatisfiyat) - parseFloat(urun.satisfiyat))/parseFloat(urun.kampanyasizsatisfiyat)*100)
            return oran
        },
    },
}
</script>

<style scoped>
    .indirim-urun{
        z-index: 4;
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 12px;
        font-weight: 800;
        border: 1px solid none;
        border-radius: 8px;
        padding: 5px;
        background: #FFA700;
        color: black;
        text-align: center;
    }
    .indirim-oran{
        font-size: 10px !important;
        padding-right: 1px;
    }
    .indirim-yazisi{
        display: block;
        font-size: 9px;
        font-weight: 800;
        text-transform: uppercase;
    }
</style>