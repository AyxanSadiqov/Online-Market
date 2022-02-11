Bu sayfadaki puf noktalar:
1 - Acilir sepet modal-i icin fixed, position ayarlamalari yapildi.
    Sayfa boyutu ile oynandiginda sıkıntı çıkmıyor.
    Sepetteki urun sayisi degistiginde button div-in asagisinda hep sabit kaliyor.
<template>
    <div class="row sepet-navbar">
        <div @click="navbarSepetiGoster()" class="col-lg-2 d-flex justify-content-center">
            <img class="sepet-svg" src="@/assets/svg/Basket.svg" alt="">
            <span class="sepet-urunsayi">{{ sepettekiUrunSayisi }}</span>
        </div>
        <div @click="navbarSepetiGoster()" class="col-lg-8 sepet-yazi d-flex justify-content-center">
            <div class="sepet-sepetim">Sepetim</div>
            <div class="sepet-fiyat">{{ toplam_tutar }}</div>
        </div>
        <div @click="navbarSepetiGoster()" class="col-lg-2 sepet-downicon">
            <i class="fas fa-angle-down"></i>
        </div>
        <div v-if="showNavbarSepet" @click="modalKapat()" class="arkafon"></div>
        <transition name="slide-fade">
            <div v-if="showNavbarSepet" class="sepetnavbarMain-icerik">
                <div class="sepetnavbar-icerik">
                    <div class="row">
                        <div class="col-12">
                            <div v-if="sepettekiUrunSayisi==0">
                                <div class="row">
                                    <div class="col-3">
                                        <p></p>
                                        <p class="text-center"><i class="fas fa-shopping-cart fa-3x"></i></p>
                                    </div>

                                    <div class="col-9 d-flex align-items-center mt-4">
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
                                        <td>{{ (sepet.satisfiyat * sepet.adet).toFixed(2) }} TL</td>
                                        <td><a><i @click="removeUrun(sepet)" class="fas fa-times" :style="sepetButtonRemove"></i></a></td>
                                    </tr>
                                    <tr class="total">
                                        <th scope="row"></th>
                                        <td><b>{{ $t('Total') }}</b></td>
                                        <td><b style="margin-left:-30px">{{ toplam_tutar }}</b></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="sepetnavbar-button" v-if="showSepetimeGitButton">
                        <div><button @click="sepetimeGit()" type="button" class="btn z-depth-0 w-100" id="sepetimeGitButton" :style="sepetButtonSepetimeGitColor">{{ $t('Go to my cart') }}</button></div>
                    </div>
                </div>
            </div>
        </transition>

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
            // cookie bilgileri START
            ushp : "",
            // cookie bilgileri END
            // UrunSilindiMesaji.vue icinde mouse enter oldugunda sayac sifirlansin diye setTimeout degeri myTimeOut-a atanir
            myTimeOut : "", // urun eklendi mesajinin settimeout degeri buraya yazilip, mesaj hover oldugunda bu deger sifirlanir
            birimAdetKg : "", // eklendi mesajinda gosterilecek 1 Adet mi yoksa 1 Kg mi kontrolu icin
            showNavbarSepet : false,
        }
    },
    components : {
        UrunSilindiMesaji
    },
    mounted () {
        // sepetButton-a her click yapildiginda tetiklenir, yani icerigin degistigini anlayabiliyoruz
        window.addEventListener('click', this.sepetButton)
    },
    beforeUnmount () {
        window.removeEventListener('click', this.sepetButton)
    },
    computed : {
        ...mapGetters(["image","imagecompany","tumSepet","sepetButtonColor","sepetButtonTableHover","sepetButtonSepetimeGitColor",
        "sepetButtonDevamEtColor","sepetModalHead","sepetButtonRemove","modalBody","whiteText","modalFooter"]), // wglobal.js-den image degeri alinir
    },
    methods : {
        scrollToTop(){ // sayfanin en basina donmek icin fonksiyon
            window.scrollTo(0,0);
        },
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
        sepetimeGit(){
            this.$router.push({name: 'SepetPage'})
        },
        urunsilindiMi(params){ // UrunSilindiMesaji.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showUrunSilindi = params
        },
        navbarSepetiGoster(){
            this.showNavbarSepet = true
            this.scrollToTop()
        },
        modalKapat(){
            this.showNavbarSepet = false
        },
    },
    created(){ // sayfa render oldugu zaman ilk calisacak metod burasi
        this.sepetButton() // sayfa render oldugunda sepetButton-unun uzerindeki sepettekiUrunSayisi gorunsun diye bu fonksiyon created()-a eklendi
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
    @media (max-width : 1200px){
        .sepet-navbar{
            margin-right: 1% !important;
        }
    }
    .sepet-navbar{
        z-index: 10;
        position: relative;
        right: 12px;
        border: 1px solid white;
        border-radius: 8px;
        background: white;
        color: #206736;
        font-weight: 800;
        width: 200px;
        height: 32px;
        padding: 5px;
        cursor: pointer;
    }
    .sepet-svg{
        width: 20px;
        margin-top: -1px;
    }
    .sepet-urunsayi{
        position: absolute;
        bottom: 11px;
        left: 19px;
        border: 1px solid white;
        border-radius: 20px;
        padding: 1px 5px;
        background: #206736;
        color: white;
        font-size: 9px;
        font-weight: 400;
    }
    .sepet-yazi{
        position: relative;
        bottom: 10px;
        text-align: center;
        color: #5f5f5f;
        text-transform: capitalize;
    }
    .sepet-sepetim{
        position: absolute;
        top: 3px;
    }
    .sepet-fiyat{
        position: absolute;
        top: 17px;
        font-size: 14px;
        color: #206736;
    }
    .sepet-downicon{
        position: relative;
        right: 10px;
        bottom: 2px;
    }
    .fa-angle-down{
        /* border: 1px solid #206736; */
        font-size: 15px;
        border-radius: 20px;
        padding: 5px 7px;
    }
    /* sepet navbar tiklandiginca acilacak icerik START */
    .sepetnavbarMain-icerik{
        position: fixed;
    }
    .sepetnavbar-icerik{
        position: absolute;
        top: 35px;
        right: -194px;
        border: 5px solid white;
        border-radius: 10px;
        border-bottom-width: 5px;
        width: 375px;
        max-height: 350px;
        overflow-x: scroll;
        color: black;
        background: white;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.3);
        cursor: default;
    }
    button{
        outline:none !important;
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
    .arkafon{
        z-index: -1;
        color: black;
        position: fixed;
        top: 0px;
        right: 0px;
        width: 100vw;
        height: 100%;
        background: rgba(43, 43, 43, 0.6);
    }
    .sepetnavbar-button{
        position: absolute;
        bottom: -1px;
        left: -5px;
    }
    .sepetnavbar-button div{
        position: fixed;
        border: 1px solid white;
        padding: 5px 10px;
        width: 375px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: white;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.3);
    }
    .sepetnavbar-button button{
        margin-left: 0px;
        border-radius: 10px;
    }
    /* sepet navbar tiklandiginca acilacak icerik END */
</style>