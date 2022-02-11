Bu sayfadaki puf noktalar:
1 - Bu sayfa Sepet-in child-i. ayni zamanda Sepet-in kendisi de child. child-in child-i yani
2 - Sepet sayfasindan(yani parent-indan) props olarak veri aktarimi var
3 - Sepet sayfasina(yani parent-ina) emits olarak veri aktarimi var
4 - this.$emit ile gonderilecek verinin gecici adi ve adi paketlenip gonderilir
<template>
    <div>
        <div v-if="showGiftButton" @click="showGiftButton=!showGiftButton">
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalCoupon"><i class="fas fa-2x fa-gift"></i></button>
            <span class="badge badge-danger ml-2 shopping-button-count">1</span>
        </div>

        <div class="modal fade top" id="modalCoupon" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="true">
            <div class="modal-dialog modal-frame modal-top modal-notify modal-success" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="row d-flex justify-content-center align-items-center">
                            <h2>
                                <span @click="indirimKoduKopyala()" class="badge noselect indirim-kupon">{{rastgele_indirim_kodu}}</span>
                            </h2>
                            <p class="pt-3 mx-4">Bu kodu <strong>indirim kodu ekleyin</strong> alanında kullanırsanız 
                            <strong>20 TL </strong>değerinde indirim kuponu kazanacaksınız.
                            Kopyalamak için kodun üzerine tıklayınız.</p>

                            <a type="button" class="btn btn-outline-success waves-effect" data-dismiss="modal">Teşekkürler</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Kopyalandi bildirimi START -->
        <transition name="slide-fade">
            <div v-if="showKopyalandi" class="kopyalandi-mesaji">
                Kopyalandı
            </div>
        </transition>
        <!-- Kopyalandi bildirimi END -->
    </div>
</template>

<script>
export default {
    props : ["rastgele_indirim_kodu"], // parent-ten child-a yani buraya gelen
    emits: ["kopyalandimi"], // child-dan yani buradan parent-e giden. NOT: parente veri gidecekse props gibi emits-in de tanimlanmasi lazim. yeni ozellik boyle
    data(){
        return{
            showGiftButton : true,
            showKopyalandi : false,
            kupon_kopyalandimi : false
        }
    },
    methods : {
        indirimKoduKopyala(){ // indirim koduna tiklandigi zaman calisacak fonksiyon
            localStorage.setItem("k_kopy", this.rastgele_indirim_kodu) // kodu localstorage-de gecici tutuyoruz
            this.showKopyalandi = true
            if(this.showKopyalandi==true){
                setTimeout(() => this.showKopyalandi = false, 2500)
            }
            if(localStorage.getItem("k_kopy") != null){
                this.kupon_kopyalandimi = true
                this.$emit("kopyalandimi", this.kupon_kopyalandimi) // kodun uzerine tiklandiginda kupon_kopyalandimi bilgisi parent(Sepet.vue)-e gonderiliyor
            }else{
                return
            }
        }
    }
}
</script>

<style scoped>
    /* Urun Eklendi/Silindi Mesaji START */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(10px);
        opacity: 0;
    }
    /* Urun Eklendi/Silindi Mesaji END */
    button{
        z-index: 5;
        position: fixed;
        bottom: -10px;
        right: 45%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
        padding: 15px;
    }
    .shopping-button-count{
        z-index: 5;
        position: fixed;
        bottom: 45px;
        right: 47%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    .indirim-kupon{
        cursor: pointer;
    }
    .kopyalandi-mesaji{
        z-index: 1200;
        position: fixed;
        bottom: 25px;
        left: 20px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
        padding: 15px 20px 15px 20px;
        background-color: rgb(48, 48, 48);
        color: white;
        border-radius: 5px;
    }
</style>