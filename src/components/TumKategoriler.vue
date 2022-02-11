<template>
    <div v-cloak>
        <button type="button" class="btn btn-md btn-info tumKategorilerDiv">
            Tüm Kategorİler&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>
            <div class="tum-kategoriler">
                <div v-for="liste in tumListe" :key="liste.id">
                    <div v-for="grup in liste.gruplar" :key="grup.id">
                        <p @mouseover="getGrupId(grup)" class="altgrupKategorilerDiv">
                            <span class="tum-kategoriler-grup">{{grup.ad}}</span>
                            <span class="altgrup-kategoriler">
                                <div v-for="liste in tumListe" :key="liste.id">
                                    <div v-for="altgrup in liste.altgruplar" :key="altgrup.id">
                                        <p v-if="altgrup.grup==grupId" class="tum-kategoriler-altgrup">
                                            <span>{{altgrup.ad}}</span>
                                        </p>
                                    </div>
                                </div>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            grupId : ""
        }
    },
    computed : {
        ...mapGetters(["tumListe"]),
    },
    methods:{
        getGrupId(grup){
            this.grupId = grup.id
        }
    },
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    /* Ana iki div START */
    .tum-kategoriler{
        display: none;
        z-index: 10;
        position: absolute;
        top: 77px;
        left: 167px;
        border: 1px solid #eee;
        background-color: white;
        color: black;
        min-width: 190px;
        max-width: 190px;
        padding: 10px 0 0 10px;
        text-align: left;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    }
    .tumKategorilerDiv:hover .tum-kategoriler{
        display: block; 
    }
    .altgrup-kategoriler{
        display: none;
        z-index: 10;
        position: absolute;
        margin: -27px 0 -11px 180px;
        border: 1px solid #eee;
        background-color: white;
        color: black;
        min-width: 190px;
        max-width: 190px;
        padding: 10px 0 0 10px;
        text-align: left;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    }
    .altgrupKategorilerDiv:hover .altgrup-kategoriler{
        display: block;
    }
    /* Ana iki div END */
    /* Ana iki div icerigi START */
    .tum-kategoriler-grup{
        font-size: 10px;
    }
    .altgrupKategorilerDiv:hover{
        background-color: #eee;
        padding: 10px;
        margin: -10px -2px 6px -10px;
        border-right-style: solid;
    }
    .tum-kategoriler-altgrup{
        font-size: 10px;
    }
    .tum-kategoriler-altgrup:hover{
        background-color: #eee;
        padding: 10px;
        margin: -10px 0 6px -10px;
    }
    /* Ana iki div icerigi END */
</style>