Bu sayfadaki puf noktalar:
1 - BottomNavMenu gorundugu takdirde sepet button-unun biraz daha yukariya cikmasi dikkate alindi
2 - Bu sayfa dinamik olarak yapildi. Istenilen sayfada tanimlanarak kullanilabilir.
    Her parent-a child-lik yapabilir. Kisaca hayirli bir child bu sayfa :)
3 - Bu sayfa parent-ten gelen verilere degil de direkt localstorage-e bagli oldugu icin dinamik 
    yapida diger sayfalarda sorunsuz kullanilabiliyor
4 - NavbarTwo-ya sepet eklendigi icin bu SepetButton(yani bu sayfa) sadece belirli width-in altina inildiginde gorunecek.
<template v-cloak>
    <div id="sepetButton">
        <!-- Shopping Cart Button BuyukEkran START -->
        <button @click="sepetButton()" type="button" class="btn shopping-button" :style="sepetButtonColor" data-toggle="modal" data-target="#modalAbandonedCart"><i class="fas fa-shopping-cart"></i><span class="sepet-btn-toplam" :class="{ 'sepet-button-hidden': !showSayfaKonum }"> <span class="tt">{{ toplam_tutar }}</span></span></button>
        <span class="badge badge-danger ml-2 shopping-button-count" :class="{ 'sepet-button-hidden': showSayfaKonum }">{{ sepettekiUrunSayisi }}</span>
        <!-- Shopping Cart Button END -->

        <!-- Shopping Cart Button KucukEkran START -->
        <button @click="sepetButton()" type="button" class="btn shopping-button1" :style="sepetButtonColor" data-toggle="modal" data-target="#modalAbandonedCart"><i class="fas fa-shopping-cart"></i><span class="sepet-btn-toplam" :class="{ 'sepet-button-hidden': !showSayfaKonum }"> <span class="tt">{{ toplam_tutar }}</span></span></button>
        <span class="badge badge-danger ml-2 shopping-button-count1" :class="{ 'sepet-button-hidden': showSayfaKonum }">{{ sepettekiUrunSayisi }}</span>
        <!-- Shopping Cart Button END -->

        <!-- Modal: modalAbandonedCart-->
        <div class="modal fade right" id="modalAbandonedCart" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="true">
            <div class="modal-dialog modal-side modal-bottom-right modal-notify" role="document">
                <div class="modal-content">
                    <div class="modal-header" :style="sepetModalHead">
                        <p class="heading">{{ $t('My Cart') }}</p>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>
                    </div>

                    <div class="modal-body max-height" :style="modalBody">
                        <div class="row">
                            <div class="col-12">
                                <div v-if="sepettekiUrunSayisi==0">
                                    <div class="row">
                                        <div class="col-3">
                                            <p></p>
                                            <p class="text-center"><i class="fas fa-shopping-cart fa-4x"></i></p>
                                        </div>

                                        <div class="col-9">
                                            <p></p><p></p>
                                            <p>{{ $t('Your cart is empty') }}</p>
                                        </div>
                                    </div>
                                </div>
                                <table v-else class="table" :class="sepetButtonTableHover" :style="whiteText">
                                    <thead>
                                        <tr>
                                        <th>{{ $t('Image') }}</th>
                                        <th>{{ $t('Product Name') }}</th>
                                        <th>{{ $t('Price') }}</th>
                                        <th>{{ $t('Remove') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="sepet in geciciSepet" :key="sepet.id">
                                            <!-- arama yaparken urun bilgisi icinde stokkod degil de stok_kodu bilgisi oldugu icin sepet buttonda gosterirken resim bulunsun diye eklenen kontrol -->
                                            <th v-if="sepet.barkod!=null" scope="row">
                                                <div class="resim-border d-flex justify-content-center align-items-center">
                                                    <img v-if="sepet.barkod.length < 8" :src="imagecompany + ushp + '/' + sepet.barkod + '.jpeg?' + sepet.imageupdate" class="img-width" alt=""/>
                                                    <img v-else :src="image + sepet.barkod + '.jpeg'" class="img-width" alt=""/>
                                                </div>
                                            </th>
                                            <th v-if="sepet.barkod==null" scope="row">
                                                <div class="resim-border d-flex justify-content-center align-items-center">
                                                    <img :src="image + sepet.barkod + '.jpeg'" class="img-width" alt=""/>
                                                </div>
                                            </th>
                                            <td id="resp-urunad">
                                                {{ sepet.ad }}
                                                <h6 class="text-muted">
                                                    <small>{{ sepet.adet }} {{ $t('Piece') }}</small>
                                                </h6>
                                            </td>
                                            <td id="resp-fiyat">{{ (sepet.satisfiyat * sepet.adet).toFixed(2) }} TL</td>
                                            <td><a><i @click="removeUrun(sepet)" class="fas fa-times" :style="sepetButtonRemove"></i></a></td>
                                        </tr>
                                        <tr class="total">
                                            <th scope="row"></th>
                                            <td><b>{{ $t('Total') }}</b></td>
                                            <td><b>{{ toplam_tutar }}</b></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer justify-content-center" :style="modalFooter">
                        <button @click="sepetimeGit()" v-if="showSepetimeGitButton" type="button" class="btn" id="sepetimeGitButton" :style="sepetButtonSepetimeGitColor" data-dismiss="modal">{{ $t('Go to my cart') }}</button>
                        <button @click="sepetButton()" type="button" class="btn waves-effect" id="devamEtButton" :style="sepetButtonDevamEtColor" data-dismiss="modal">{{ $t('Continue') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: modalAbandonedCart-->

        <UrunSilindiMesaji :showUrunSilindi="showUrunSilindi" :silinenUrun="silinenUrun" :silinenUrunAdet="silinenUrunAdet" @urunsilindi="urunsilindiMi" :myTimeOut="myTimeOut" :birimAdetKg="birimAdetKg" />
        
    </div>
</template>

<script>
import UrunSilindiMesaji from "@/components/UrunSilindiMesaji"
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            showUrunSilindi : false,
            geciciSepet : '',
            toplam_tutar : '',
            sepettekiUrunSayisi : '',
            silinenUrun : '', // silinecek urunun adi buraya yazilir
            silinenUrunAdet : '', // silinecek urunun adeti buraya yazilir
            showSepetimeGitButton : true, // sepetime git butonunun show/hide-i icin
            showSayfaKonum: true, // 
            lastScrollPosition: 0, // son scroll konumu icin
            // cookie bilgileri START
            ushp : "",
            // cookie bilgileri END
            // UrunSilindiMesaji.vue icinde mouse enter oldugunda sayac sifirlansin diye setTimeout degeri myTimeOut-a atanir
            myTimeOut : "", // urun eklendi mesajinin settimeout degeri buraya yazilip, mesaj hover oldugunda bu deger sifirlanir
            birimAdetKg : "", // eklendi mesajinda gosterilecek 1 Adet mi yoksa 1 Kg mi kontrolu icin
        }
    },
    components : {
        UrunSilindiMesaji
    },
    mounted () {
        // sepetButton-a her click yapildiginda tetiklenir, yani icerigin degistigini anlayabiliyoruz
        window.addEventListener('click', this.sepetButton)
        window.addEventListener('scroll', this.onScroll)
    },
    beforeUnmount () {
        window.removeEventListener('click', this.sepetButton)
        window.removeEventListener('scroll', this.onScroll)
    },
    computed : {
        ...mapGetters(["image","imagecompany","tumSepet","sepetButtonColor","sepetButtonTableHover","sepetButtonSepetimeGitColor",
        "sepetButtonDevamEtColor","sepetModalHead","sepetButtonRemove","modalBody","whiteText","modalFooter"]), // wglobal.js-den image degeri alinir
        ayniUrunSayisi() {
            return this.count(this.tumSepet);
        }  
    },
    methods : {
        sepetButton(){ // sepet urunleri uzerindeki islemler(listeleme, silme) daha rahat bir sekilde yapilabilsin diye localstorage.sepet gecicisepet-e eklendi
            if(localStorage.getItem("sepet") == null){
                localStorage.setItem("sepet", "[]")
            }
            var localSpt = (JSON.parse(localStorage.getItem("sepet"))) // localstorage "sepet" icindeki veriler parse edilerek localspt-e yazilir
            this.geciciSepet = localSpt // localSpt-deki veriler geciciSepet-e yazilir ve artik tum islemleri localstorage uzerinden degil de geciciSepet uzerinden yapilacak hale getirilir burada
            if(localStorage.getItem("sepet") == null){ // localstorage(bir nevi sepet) bos oldugu zaman toplam_tutar yazdirirken hata veriyordu. Bu kosul onu handle etmek icin yazildi
                return
            }
            else{
                this.toplam_tutar = this.geciciSepet.reduce((acc, item) => acc + parseFloat(item.satisfiyat * item.adet), 0).toFixed(2) + ' TL'
            }
            this.sepettekiUrunSayisi = this.geciciSepet.length // sepetteki urun sayisini almak icin
            if(this.sepettekiUrunSayisi === 0){ // sepet bossa sepetime git butonu gizlenir
                this.showSepetimeGitButton = false
            }else{ // dolu ise gosterilir. else kosulu olmak zorunda, aksi taktirde her sepet butonuna tiklandiginda butonun show/hide-i aninda algilanmiyor
                this.showSepetimeGitButton = true
            }
        },
        removeUrun(sepet){
            this.geciciSepet.splice(this.geciciSepet.indexOf(sepet), 1); // gecicisepet-ten tiklanilan urun silinir
            localStorage.setItem("sepet", JSON.stringify(this.geciciSepet)) // gecicisepet-ten tiklanilan urun silindikten sonra localstorage-e gecicisepet-in en son hali atilir. Boylelikle silinmek istenen urun sanki localstorage-den siliniyormus gibi bir yapi ortaya konuldu
            this.toplam_tutar = this.geciciSepet.reduce((acc, item) => acc + parseFloat(item.satisfiyat * item.adet), 0).toFixed(2) + ' TL' // her urun silindiginde toplam_tutar guncellensin diye
            this.silinenUrun = sepet.ad // silinecek urun adi silinenUrun-e yazilir
            this.silinenUrunAdet = sepet.adet // silinecek urun adet silinenUrunAdet-e yazilir
            if(parseInt(sepet.birim) === 0){
                this.birimAdetKg = "adet"
            }else if(parseInt(sepet.birim) === 1){
                this.birimAdetKg = "kg"
            }
            this.showUrunSilindi = true
            if(this.showUrunSilindi==true){
                this.myTimeOut = setTimeout(() => this.showUrunSilindi = false, 2000) // urun silindi mesaji 1 saniye icinde kaybolur
            }
        },
        getUid_Udep(){
            this.ushp = this.decryptCookie("ushp")
        },
        count(array) {
            // name varsa 1 ekle, yoksa standart degeri 1 yap
            let counts = array.reduce((out, {name}) => ({ ...out, [name]: out[name]+1 || 1}), {});
            return Object.keys(counts).map(key => ({name: key, count: counts[key]}));
        },
        sepetimeGit(){
            this.$router.push({name: 'SepetPage'})
        },
        onScroll () {
            // Mevcut scroll konumunu al
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
            // Cep telefonlarında momentum scroll-u nedeniyle, sıfırdan küçükse devam etmemeli
            if (currentScrollPosition < 0) {
                return
            }
            // Mevcut kaydırma konumu ile son scroll konumu arasındaki fark bir ofsetten daha azsa bu işlevi yürütmeyi durdur
            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 100) {
                return
            }
            // Burada showSayfaKonum-u göstermemiz veya gizlememiz gerekip gerekmediğini belirleriz
            this.showSayfaKonum = currentScrollPosition < this.lastScrollPosition
            // Mevcut scroll konumunu son scroll konumu olarak ayarla
            this.lastScrollPosition = currentScrollPosition
        },
        urunsilindiMi(params){ // UrunSilindiMesaji.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showUrunSilindi = params
        },
    },
    created(){ // sayfa render oldugu zaman ilk calisacak metod burasi
        this.sepetButton() // sayfa render oldugunda sepetButton-unun uzerindeki sepettekiUrunSayisi gorunsun diye bu fonksiyon created()-a eklendi
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    /* boyut 1000-in altinda indiginde sepet button gorunur */
    #sepetButton{
       display: none;
    }
    @media (max-width : 1000px){
        #sepetButton{
            display: block;
        }
    }
    @media (max-width : 989px){
        .shopping-button, .shopping-button-count{
            display: none;
        }
    }
    @media (min-width : 990px){
        .shopping-button1, .shopping-button-count1{
            display: none;
        }
    }
    @media (max-width : 500px){
        #resp-urunad{
            font-size: 12px;
            width: 115px !important;
        }
        #resp-fiyat{
            font-size: 13px;
        }
        .text-muted{
            font-size: 14px;
        }
    }
    @media (max-width : 360px){
        table{
            margin-left: -20px;
        }
        #sepetimeGitButton{
            font-size: 9px;
        }
        #devamEtButton{
            font-size: 9px;
        }
    }
    @media (max-width : 350px){
        #sepetimeGitButton{
            font-size: 10px;
        }
        #devamEtButton{
            font-size: 10px;
        }
    }
    .shopping-button{
        z-index: 7;
        position: fixed;
        bottom: 10px;
        right: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    }
    .shopping-button-count{
        z-index: 7;
        position: fixed;
        bottom: 50px;
        right: 87px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    }
    .shopping-button1{
        z-index: 9;
        position: fixed;
        bottom: 65px;
        right: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    }
    .shopping-button-count1{
        z-index: 9;
        position: fixed;
        bottom: 105px;
        right: 87px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    }
    button{
        outline:none !important;
    }
    .urun-silindi{
        z-index: 9999;
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }
    .max-height{
        max-height:480px;
        overflow-y: auto;
    }
    .img-width{
        max-width: 55px;
        max-height: 65px;
        object-fit: contain;
    }
    .resim-border{
        border: 1px solid #eee;
        border-radius: 10px;
        background: white;
        width: 60px;
        height: 80px;
        margin: -10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
    }
    #resp-urunad{
        /* noktalama icin */
        display: inline-block;
        width: 160px;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
    }
    .sepet-button-hidden {
        display: none;
        transform: translate3d(0, -100%, 0);
    }
    .sepet-btn-toplam{
        font-size: 12px;
        font-weight: 800;
    }
    .modal{
        z-index: 1051;
    }
    .tt{
        padding-left: 5px;
    }
</style>