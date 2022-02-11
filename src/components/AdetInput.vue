Bu sayfadaki puf noktalar:
1 - Bu sayfa UrunPage-de kullaniliyor(yani o sayfanin child-i)
2 - urunAdet her degistiginde(artiya ya da eksiye basildiginda) emit ile parent-e(yani UrunPage-e) gonderiliyor
3 - Bu sayfa SepetAdetInput gibi degil. SepetAdetInput-tan farkli olarak dinamik olarak istenilen yerde kullanilabilir
<template>
    <div class="input-group presuffix" v-cloak>
        <transition name="bounce">
            <span v-if="showMinus" class="badge rounded-pill bg-danger minus">
                <span v-if="parseInt(urun.birim)==0">-1</span>
                <span v-else>-0.5</span>
            </span>
        </transition>
        <transition name="bounce">
            <span v-if="showPlus" class="badge rounded-pill bg-success plus">
                <span v-if="parseInt(urun.birim)==0">+1</span>
                <span v-else>+0.5</span>
            </span>
        </transition>
        <span @click="adetAzalt()" class="input-group-addon prefix noselect" :style="adetInputColor">-</span>
        <input v-if="parseInt(urun.birim)==0" :value="urunAdet" class="text-center" :style="adetInputArasiColor" readonly>
        <input v-else :value="urunKgAdet" class="text-center" :style="adetInputArasiColor" readonly>
        <span @click="adetArttir()" class="input-group-addon suffix noselect" :style="adetInputColor">+</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: ["urun"],
    data(){
        return{
            urunAdet : 1, // adet inputta gorunecek urun adeti
            urunKgAdet : 0.5, // kgli urunlerde gorunecek adet
            showMinus : false, // -1 badge-nin show/hide-i icin
            showPlus : false, // +1 badge-nin show/hide-i icin
            // UrunPage-de arti ya da eksiye tiklanilmadigi halde sepete eklenmek istendiginde UrunPage-deki ilk basta urunAdeti 1 olarak
            // tanimlandigi icin kgli da olsa normal de olsa '1 adet urun eklendi' bildirimi gorunuyordu.
            artiEksiyeTiklandiMi : false, // burasi arti ya da eksiye tiklanildi mi anlamak icin. true-tiklandi, false-tiklanmadi
        }
    },
    computed : {
        ...mapGetters(["adetInputColor","adetInputArasiColor"]),
    },
    methods : {
        adetAzalt(){
            if(this.urunAdet == 1){
                this.urunAdet
            }
            else{
                this.urunAdet -= 1
                this.showMinus = true
                if(this.showMinus==true){
                    setTimeout(() => this.showMinus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
                }
                this.$emit("urunadet", this.urunAdet) // kodun uzerine tiklandiginda urunAdet bilgisi parent(UrunPage.vue)-e gonderiliyor
            }
            if(this.urunKgAdet == 0.5){
                this.urunKgAdet
            }
            else{
                this.urunKgAdet -= 0.5
                this.showMinus = true
                if(this.showMinus==true){
                    setTimeout(() => this.showMinus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
                }
                this.$emit("urunadet", this.urunKgAdet) // kodun uzerine tiklandiginda urunAdet bilgisi parent(UrunPage.vue)-e gonderiliyor
            }
        },
        adetArttir(){
            if(parseInt(this.urun.birim) === 0){
                this.urunAdet += 1
                this.$emit("urunadet", this.urunAdet) // kodun uzerine tiklandiginda urunAdet bilgisi parent(UrunPage.vue)-e gonderiliyor
                this.$emit("artieksitiklandi", this.artiEksiyeTiklandiMi=true) // aciklama data tanimlandigi yerde yapildi
                this.showPlus = true
                if(this.showPlus==true){
                    setTimeout(() => this.showPlus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
                }
            }else if(parseInt(this.urun.birim) === 1){
                this.urunKgAdet += 0.5
                this.$emit("urunadet", this.urunKgAdet) // kodun uzerine tiklandiginda urunAdet bilgisi parent(UrunPage.vue)-e gonderiliyor
                this.$emit("artieksitiklandi", this.artiEksiyeTiklandiMi=true) // aciklama data tanimlandigi yerde yapildi
                this.showPlus = true
                if(this.showPlus==true){
                    setTimeout(() => this.showPlus = false, 10) // +1 badge-i 10 milisaniye icinde kaybolur
                }
            }
        },
    },
    created(){}
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 990px){
        .input-group{
            font-size: 12px;
            width: 140px;
        }
    }
    @media (max-width : 1300px){
        .input-group{
            font-size: 12px;
            width: 140px;
        }
    }
    @media (max-width : 500px){
        .input-group{
            font-size: 12px;
            width: 140px;
            margin-left: -33px;
        }
    }
    /* -1 Mesaji icin START */
    .bounce-enter-active {
        animation: bounce-in 1s;
    }
    .bounce-leave-active {
        animation: bounce-in 1s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }
    /* -1 Mesaji icin END */
    .minus{
        position: absolute;
        left: 12px;
        bottom: 40px;
        padding: 5px;
    }
    .plus{
        position: absolute;
        left: 103px;
        bottom: 40px;
        padding: 5px;
    }
    /* Urun adeti arti, eksi input alani START */
    .input-group-addon {
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        color: #555;
        background-color: #eee; /* +- renk degisimi */
        border: 1px solid #ccc;
        white-space: nowrap;
        vertical-align: middle;
        /* display: table-cell; */
    }
    input {
        position: relative;
        z-index: 2;
        width: 60px;
        /* display: table-cell; */
        /* padding: 6px; */
        margin: 0 -9px 0 -2px;
        border: 1px solid #ccc;
        outline:none;
    }
    .input-group-addon.prefix {
        border-radius: 10px 0px 0px 10px;
        border-right: 0;
        padding: 10px 17px 10px 17px;
    }
    .input-group-addon.suffix {
        border-radius: 0px 10px 10px 0px;
        border-left: 0;
        padding: 10px 17px 10px 19px;
    }
    .input-group {
        position: relative;
        /* display: table; */
        border-collapse: separate;
    }
    .prefix:hover{
        cursor: pointer;
    }
    .suffix:hover{
        cursor: pointer;
    }
    /* Urun adeti arti, eksi input alani END */
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
</style>