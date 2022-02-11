Bu sayfadaki puf noktalar:
1 - emit ile veri aktarimi var (Altgrupurunler-e, Urunler-e)
<template>
    <div id="sayi-filtreleme" class="dropdown">
        <button class="dropbtn">{{norm}}</button>
        <div class="dropdown-content">
            <a v-for="filter in filter" :key="filter.id" @click="filterSec(filter)"> {{filter.sayi}} {{filter.ad}} </a>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            filter : [
                {
                    id : 1,
                    sayi : 8,
                    ad : "adet"
                },
                {
                    id : 2,
                    sayi : 16,
                    ad : "adet"
                },
                {
                    id : 3,
                    sayi : 32,
                    ad : "adet"
                },
            ],
            norm : "32 adet",
        }
    },
    methods : {
        filterSec(filter){
            this.norm = filter.sayi + " " + filter.ad
            this.$emit("sayimi", filter.sayi) // uzerine tiklandiginda filter.sayi bilgisi parent(AltgrupUrunler.vue)-e gonderiliyor
        },
    },
}
</script>

<style scoped>
    .dropbtn {
        background-color: #5FA56C;
        border-radius: 5px;
        color: white;
        padding: 5px 10px;
        font-size: 13px;
        border: none;
        cursor: pointer;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        transition: all 0.4s ease;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 105px;
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
        z-index: 1;
    }
    .dropdown-content a {
        color: black;
        padding: 10px 14px;
        font-size: 14px;
        text-decoration: none;
        display: block;
    }
    .dropdown-content a:hover {background-color: #f1f1f1}
    .dropdown:hover .dropdown-content {
        visibility: visible;
        opacity: 1;
    }
    .dropdown:hover .dropbtn {
        background-color: #206736;
    }
    button{
        outline:none !important;
    }
</style>