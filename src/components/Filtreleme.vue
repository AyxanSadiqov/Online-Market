Bu sayfadaki puf noktalar:
1 - Bu component dinamik olarak AltgrupUrunler ve Urunler-den gelen urunlere gore filtrelemer yapiyor
<template>
    <div>
        <select name="select" @change="filtreSec($event)">
            <option style="display:none">Filtre Seçiniz</option>
            <option v-for="filtre in filtreler" :key="filtre.id" :value="filtre.id">{{ filtre.ad }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props : ["urunler"],
    data(){
        return{
            filtreler : [
                { id : 1, ad : "A'dan Z'ye" },
                { id : 2, ad : "Z'den A'ya" },
                { id : 3, ad : "Artan Fiyat" },
                { id : 4, ad : "Azalan Fiyat" },
            ]
        }
    },
    methods : {
        filtreSec(event){
            var filtre_id = event.target.value // secilenin id-si
            if(filtre_id === '1'){
                this.filterAtoZ()
            }else if(filtre_id === '2'){
                this.filterZtoA()
            }else if(filtre_id === '3'){
                this.filterPriceMinToMax()
            }else if(filtre_id === '4'){
                this.filterPriceMaxToMin()
            }
        },
        filterAtoZ(){ // A-dan Z-ye siralama icin
            let sortedUrunler = this.urunler.urunler
            sortedUrunler = sortedUrunler.sort((a,b) => {
                let fa = a.ad.toLowerCase(), fb = b.ad.toLowerCase()
                if(fa < fb){
                    return -1
                }
                if(fa > fb){
                    return 1
                }
                return sortedUrunler
            })
        },
        filterZtoA(){ // Z-den A-ya siralama icin
            let sortedUrunler = this.urunler.urunler
            sortedUrunler = sortedUrunler.sort((a,b) => {
                let fa = a.ad.toLowerCase(), fb = b.ad.toLowerCase()
                if(fa > fb){
                    return -1
                }
                if(fa < fb){
                    return 1
                }
                return sortedUrunler
            })
        },
        filterPriceMinToMax(){ // artan fiyata gore siralamak icin
            let sortedUrunler = this.urunler.urunler
            sortedUrunler = sortedUrunler.sort((a,b) => {
                return a.satisfiyat - b.satisfiyat
            })
            return sortedUrunler
        },
        filterPriceMaxToMin(){ // azalan fiyata gore siralamak icin
            let sortedUrunler = this.urunler.urunler
            sortedUrunler = sortedUrunler.sort((a,b) => {
                return b.satisfiyat - a.satisfiyat
            })
            return sortedUrunler
        },
    }
}
</script>

<style scoped>
    select{
        width: 170px;
        padding: 5px 10px;
        background: white;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
        outline:none !important;
    }
    option{
        color: #4e4e4e;
        background: white;
    }
    select:focus > option:checked { 
        background: #d4d4d4 !important;
    }
</style>