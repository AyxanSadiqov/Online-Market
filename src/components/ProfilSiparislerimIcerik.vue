<template>
    <div v-cloak>
        <div class="row ml-0">
            <div v-if="!showBaslikDetay" class="col-md-8 col-7 col-sm-7 siparis-baslik" :class="classBorderLeft">
                <span>
                    Sipariş tarihi - {{siparisBaslik(gecmis).siparisTarihi}} ; Adres - {{siparisBaslik(gecmis).adres}}
                </span>
            </div>
            <div v-if="showBaslikDetay" class="col-md-8 col-7 col-sm-7 siparis-baslik" :class="classBorderLeft"></div>
            <div v-if="!showBaslikDetay" class="col-md-2 col-3 col-sm-3 siparis-baslik-fiyat">
                <div>{{toplamTutar}}</div>
            </div>
            <div v-if="showBaslikDetay" class="col-md-2 col-3 col-sm-3 siparis-baslik-fiyat"></div>
            <div @click="icerigiGosterGizle(gecmis)" class="col-md-1 col-1 col-sm-1 siparis-baslik-icon" :class="classBorderRight">
                <span><i class="fas" :class="arrowIcon"></i></span>
            </div>
        </div>
        <transition name="fade">
            <div v-if="showIcerik" id="icerik-id" class="row ml-0">
                <div class="col-md-11 col-11 col-sm-11 mb-3 siparis-icerik">
                    <div class="row">
                        <div class="col-md-5 siparis-detaylari">
                            <h5 class="d-flex justify-content-center">Sipariş Detayları</h5>
                            <div>Sipariş Numarası : <span>{{gecmis.id}}</span></div>
                            <div>Sipariş Tarihi : <span>{{siparisTarihi}}</span></div>
                            <div>Gönderim Tarihi : <span>{{gonderimTarihi}}</span></div>
                            <div>Hizmet Bedeli : <span v-if="gecmis.hizmetalindimi=='0'">0 TL</span><span v-if="gecmis.hizmetalindimi=='1'">{{hizmetbedeli}} TL</span></div>
                            <div>Ödeme Şekli : <span v-if="gecmis.odemetip=='1'">Kredi Kartı</span><span v-if="gecmis.odemetip=='2'">Nakit (Nakit ödeme)</span></div>
                            <div>Gönderim Zamanı : <span>{{gonderimZamani}}</span></div>
                            <div v-if="gecmis.siparisnot!=''">Sipariş Notu : <span>{{gecmis.siparisnot}}</span></div><div v-else></div>
                        </div>
                        <div class="col-md-5 gonderim-adresi">
                            <h5 class="d-flex justify-content-center">Gönderim Adresi</h5>
                            <div>İlgili Kişi : <span>{{gecmis.musteriad}}</span></div>
                            <div>İrtibat Telefonu : <span>{{gecmis.musteritelefon}}</span></div>
                            <div>Adres : <span>{{gecmis.adres}}, {{gecmis.adresdaire}}, kat {{gecmis.adreskat}}, daire {{gecmis.adresnumara}}</span></div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-11">
                            <div v-for="siparis in gecmis.siparisdetay" :key="siparis.id" class="row ml-0 mb-2 siparislerim">
                                <div class="col-md-1">
                                    <img v-if="siparis.barkod.length < 8" :src="imagecompany + ushp + '/' + siparis.barkod + '.jpeg?' + siparis.imageupdate" width="45" height="50" class="img-fluid z-depth-0 img-width" alt="">
                                    <img v-else :src="image + siparis.barkod + '.jpeg'" width="45" height="50" class="img-fluid z-depth-0 img-width" alt="">
                                </div>
                                <div class="col-md-7">
                                    <div class="siparis-ad">
                                        {{siparis.ad}} <br>
                                        <span class="text-muted">Birim fiyat : {{(siparis.satisfiyat).toFixed(2)}} TL</span>
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <span class="siparis-adet">{{siparis.adet}}</span>
                                </div>
                                <div class="col-md-3">
                                    <div class="siparis-tutar">
                                        {{(siparis.adet*siparis.satisfiyat).toFixed(2)}} TL <br>
                                        <span class="text-muted">({{siparis.adet}} x {{(siparis.satisfiyat).toFixed(2)}} TL)</span>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="siparis-toplam-tutar">Toplam <del>{{indirimsizTutar}}</del> <span>{{toplamTutar}}</span></div>
                            <div class="siparis-toplam-tutar">Kazancınız <span>{{kazanciniz}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props : ["gecmis"],
    data(){
        return{
            showIcerik : false,
            arrowIcon : "fa-angle-down",
            classBorderLeft : "border-left-kapali",
            classBorderRight : "border-right-kapali",
            siparisTarihi : "", // sorgudan gelen siparis tarihi alani duzenlenip buraya yazilir
            gonderimTarihi : "", // sorgudan gelen siparis tarihi alani gonderim tarihine yazilacak sekilde duzenlenip buraya yazilir
            gonderimZamani : "", // sorgudan gelen siparis tarihi alani gonderim zamanina yazilacak sekilde duzenlenip buraya yazilir
            showBaslikDetay : false,
            // cookie bilgileri START
            ushp : "",
            // cookie bilgileri END
        }
    },
    computed : {
        ...mapGetters(["image","imagecompany"]),
        indirimsizTutar(){
            var indirimsiz_tutar
            if(this.gecmis.tutar === this.gecmis.indirimsiztutar){
                indirimsiz_tutar = ""
            }else{
                indirimsiz_tutar = (parseFloat(this.gecmis.indirimsiztutar)).toFixed(2)
            }
            return indirimsiz_tutar
        },
        toplamTutar(){
            var toplam_tutar = (parseFloat(this.gecmis.tutar)).toFixed(2)
            return toplam_tutar + " TL"
        },
        kazanciniz(){
            var toplam_kazanc
            if(this.gecmis.hizmetalindimi === 0){
                toplam_kazanc = (parseFloat(this.gecmis.indirimsiztutar) - parseFloat(this.gecmis.tutar) + parseFloat(this.gecmis.hizmetbedeli)).toFixed(2)
            }else if(this.gecmis.hizmetalindimi === 1){
                toplam_kazanc = (parseFloat(this.gecmis.indirimsiztutar) - parseFloat(this.gecmis.tutar)).toFixed(2)
            }
            return toplam_kazanc + " TL"
        }
    },
    methods : {
        icerigiGosterGizle(gecmis){
            if(this.showIcerik === false){
                this.showIcerik = true
                this.arrowIcon = "fa-angle-up"
                this.classBorderLeft = "border-left-acik"
                this.classBorderRight = "border-right-acik"
                this.siparisTarihi = (gecmis.siparistarih).slice(0,-10)
                this.gonderimZamani = (gecmis.siparistarih).slice(11,16)
                this.gonderimTarihi = (gecmis.siparistarih).slice(0,10)
                this.showBaslikDetay = true
            }else{
                this.showIcerik = false
                this.arrowIcon = "fa-angle-down"
                this.classBorderLeft = "border-left-kapali"
                this.classBorderRight = "border-right-kapali"
                this.showBaslikDetay = false
            }
        },
        siparisBaslik(gecmis){
            return{
                siparisTarihi : (gecmis.siparistarih).slice(0,-10),
                adres : gecmis.adres,
            }
        },
        getUid_Udep(){
            this.ushp = this.decryptCookie("ushp")
        },
    },
    created(){
        this.getUid_Udep()
    }
};
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 767px){
        .siparis-tutar{
            margin-left: 35px;
        }
        .siparis-ad{
            margin-left: 0 !important;
        }
    }
    @media (max-width : 500px){
        .siparis-baslik{
            font-size: 14px !important;
        }
        .siparis-baslik-fiyat{
            font-size: 14px !important;
        }
        #icerik-id{
            margin-right: -22px !important;
        }
        .siparis-tutar{
            margin-left: 35px;
        }
    }
    /* iPhone 6/7/8 Plus */
    @media (max-width : 420px){
        #icerik-id{
            margin-right: -34px !important;
        }
    }
    /* iPhone X */
    @media (max-width : 375px){
        #icerik-id{
            margin-right: -36px !important;
        }
    }
    /* Galaxy S5, Moto G4 */
    @media (max-width : 360px){
        #icerik-id{
            margin-right: -37px !important;
        }
    }
    /* iPhone 5/SE */
    @media (max-width : 320px){
        #icerik-id{
            margin-right: -25px !important;
        }
        .siparis-baslik-fiyat{
            max-width: 10px;
        }
    }
    /* Icerik bilgisi START */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
    /* Icerik bilgisi END */
    /* bind class START */
    .border-left-kapali{
        border: 1px solid #eee;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .border-left-acik{
        border: 1px solid #eee;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 0px;
    }
    .border-right-kapali{
        border: 1px solid #eee;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .border-right-acik{
        border: 1px solid #eee;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 0px;
    }
    /* bind class END */
    .siparis-baslik{
        padding: 20px;
        background: #eee;
        color: rgb(105, 105, 105);
        margin-bottom: 10px;
        font-size: 15px;
        /* noktalama icin */
        display: inline-block;
        width: 450px;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
    }
    .fa-dot-circle{
        font-size: 10px;
        color: rgb(145, 145, 145);
    }
    .siparis-baslik-fiyat{
        border: 1px solid #eee;
        padding: 20px;
        background: #eee;
        color: rgb(102, 102, 102);
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: 400;
        text-align: end;
    }
    .siparis-baslik-icon{
        padding: 20px;
        background: #eee;
        color: rgb(119, 119, 119);
        margin-bottom: 10px;
        font-size: 16px;
        text-align: center;
        transition: .3s;
    }
    .siparis-baslik-icon:hover{
        border: 1px solid rgb(207, 207, 207);
        background: rgb(207, 207, 207);
        color: black;
        cursor: pointer;
    }
    .siparis-icerik{
        border: 1px solid #eee;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: #eee;
        color: rgb(102, 102, 102);
        padding: 0 20px 15px 20px;
        margin-top: -10px;
        transition: .5s;
    }
    .siparis-detaylari h5{
        font-weight: 400;
    }
    .siparis-detaylari div{
        font-size: 15px;
    }
    .siparis-detaylari span{
        font-size: 15px;
        color: black;
        font-weight: 400;
    }
    .gonderim-adresi h5{
        font-weight: 400;
    }
    .gonderim-adresi div{
        font-size: 15px;
    }
    .gonderim-adresi span{
        font-size: 15px;
        color: black;
        font-weight: 400;
    }
    .img-width{
        max-width: 45px;
        max-height: 50px;
    }
    .siparislerim{
        font-size: 15px;
        border: 1px solid rgb(218, 217, 217);
        padding: 5px;
        background: white;
        color: rgb(68, 64, 64);
    }
    .siparis-ad{
        font-size: 15px;
        font-weight: 400;
        margin-left: 15px;
    }
    .siparis-ad span{
        font-size: 12px;
    }
    .siparis-adet{
        border: 1px solid rgb(124, 124, 124);
        border-radius: 3px;
        background: rgb(124, 124, 124);
        color: white;
        padding: 1px 5px 1px 5px;
        position: absolute;
        top: 7px;
    }
    .siparis-tutar{
        font-size: 15px;
        font-weight: 400;
        color: black;
    }
    .siparis-tutar span{
        font-size: 12px;
    }
    .siparis-toplam-tutar{
        font-size: 15px;
        font-weight: 400;
        text-align: end;
    }
    .siparis-toplam-tutar span{
        font-weight: 800;
    }
    .detay-class{
        font-size: 16px;
    }
</style>