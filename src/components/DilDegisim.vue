<template>
    <div>
        <select v-model="$i18n.locale" class="custom-select custom-select-sm">
            <option v-for="lang in langs" :key="`Lang${lang.dil}`" :value="lang.dil">{{ lang.dilGosterim }}</option>
        </select>
        <!-- <img src="@/assets/svg/turkish.svg" width="18" height="18" alt=""> -->
    </div>
</template>

<script>
export default {
    data(){
        // "Cannot translate the value of keypath 'welcome'. Use the value of keypath as default." gibi bir 'uyari'
        // bu uyari da i18n.js icindeki 'silentFallbackWarn' ile handle edildi
        // this.$i18n.locale = 'Turkce'; // bu su an main.js icinde tanimli. aksi takdirde console-da hala 'uyari' gorunuyordu
        return{
            langs: [
                {
                    id : 1,
                    dil : 'en',
                    dilGosterim : 'English'
                },
                {
                    id : 2,
                    dil : 'tr',
                    dilGosterim : 'Türkçe'
                },
            ],
        }
    },
}
</script>

<style scoped>
    @media (max-width : 500px){
        .custom-select{
            max-width: 68px;
            font-size: 9px;
        }
    }
    .custom-select{
        width: 100px;
    }
</style>