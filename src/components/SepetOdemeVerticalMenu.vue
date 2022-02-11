Bu sayfadaki puf noktalar:
1 - Bu sayfanin parent-i SepetOdemePage
<template>
    <div v-cloak>
        <!-- eger apiden gelen saatler arrayi icerisindeki 'tarih_en' alani(orn; 2021-01-11) su anki zamana esitse(yani currentDateFormat) menudeki active class-i devreye girer -->
        <a @click="select(rand)" :class="[(rand.tarih_en==currentDateFormat) ? classActive : '']" @mouseenter="enter()" @mouseleave="leave()">
            <span v-if="showTarih">{{rand.tarih}}</span>
            <transition name="fade"><span v-if="showGun">{{rand.gun}}</span></transition>
        </a>
    </div>
</template>

<script>

export default {
    props : ["rand","currentDateFormat"],
    emits : ["tarihalani","secilentarih","saatlerad"],
    data(){
        return{
            classActive : '',
            tarih_alani : '', // orn deger '2021-01-12'
            secilen_tarih : '', // orn deger '11 Ocak'
            saatlerAd : '',
            showTarih : true,
            showGun : false,
        }
    },
    methods : {
        select(rand){ // tarih alanina tiklandigi zaman o tarihe ait saatlerin gosterilmesi icin
            this.tarih_alani = rand.tarih_en
            this.$emit("tarihalani", this.tarih_alani) // tiklanilan tarihin degeri emit ile parente(yani SepetOdemePage-e) gonderilir
            this.secilen_tarih = rand.tarih
            this.$emit("secilentarih", this.secilen_tarih) // tiklanilan tarihin degeri emit ile parente(yani SepetOdemePage-e) gonderilir
            this.saatlerAd = "" // tarihler menusune her tiklandiginda onceki menuden secili olan saat adi sifirlanir..
            this.$emit("saatlerad", this.saatlerAd) // ..sifirlanan bu deger de parent-e v-model icindeki saatlerAd alanina gonderilir
            // if(this.classActive == "active"){
            //     this.classActive = ""
            // }else{
            //     this.classActive = "active"
            // }
        },
        enter(){ // mouse enter oldugunda o gunun adi yerine haftanin gunu gorunur. (15 Haziran, sali olarak degisir mesela)
            this.showTarih = false
            this.showGun = true
        },
        leave(){ // mouse leave oldugunda eski hali gorunur
            this.showTarih = true
            this.showGun = false
        },
    },
    created(){
        this.classActive = "active"
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .vertical-menu a {
        background-color: #eee;
        color: black;
        display: block;
        padding: 11px;
        text-decoration: none;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
    .vertical-menu a:hover {
        background-color: white;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
    .vertical-menu a.active {
        background-color: white;
        color: black;
    }
</style>