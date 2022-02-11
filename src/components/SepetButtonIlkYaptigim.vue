Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div>
        <!-- Shopping Cart Button BuyukEkran START -->
        <button type="button" class="btn btn-primary shopping-button" data-toggle="modal" data-target="#modalAbandonedCart"><i class="fas fa-shopping-cart"></i></button>
        <span class="badge badge-danger ml-2 shopping-button-count">{{ sepettekiUrunSayisi }}</span>
        <!-- Shopping Cart Button END -->

        <!-- Shopping Cart Button KucukEkran START -->
        <button type="button" class="btn btn-primary shopping-button1" data-toggle="modal" data-target="#modalAbandonedCart"><i class="fas fa-shopping-cart"></i></button>
        <span class="badge badge-danger ml-2 shopping-button-count1">{{ sepettekiUrunSayisi }}</span>
        <!-- Shopping Cart Button END -->

        <!-- Modal: modalAbandonedCart-->
        <div class="modal fade right" id="modalAbandonedCart" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
            <div class="modal-dialog modal-side modal-bottom-right modal-notify modal-info" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="heading">Sepetim</p>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>
                    </div>

                    <div class="modal-body max-height">
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
                                            <p>Sepetiniz boş</p>
                                        </div>
                                    </div>
                                </div>
                                <table v-else class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Resim</th>
                                        <th>Ürün Ad</th>
                                        <th>Fiyat</th>
                                        <th>Kaldır</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="sepet in tumSepet" :key="sepet.id">
                                            <th scope="row"><img :src="require('@/assets/img/' + sepet.image)" width="50" height="60" alt=""/></th>
                                            <td>{{ sepet.name }}</td>
                                            <td>{{ sepet.price }} TL</td>
                                            <td><a><i @click="removeUrun(sepet)" class="fas fa-times"></i></a></td>
                                        </tr>
                                        <tr class="total">
                                            <th scope="row"></th>
                                            <td><b>Toplam</b></td>
                                            <td><b>{{ toplamTutar }}</b></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer justify-content-center">
                        <router-link to="/sepet" type="button" class="btn btn-info">SEPETİME GİT</router-link>
                        <a type="button" class="btn btn-outline-info waves-effect" data-dismiss="modal">Devam et</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: modalAbandonedCart-->

        <!-- Mesajlar START -->
        <transition name="slide-fade">
            <div v-if="showUrunSilindi" class="alert alert-danger urun-silindi" role="alert">
                <i class="fas fa-times"></i> Ürün sepetinizden <strong>silindi.</strong>
            </div>
        </transition>
        <!-- Mesajlar END -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            showUrunSilindi : false
        }
    },
    computed : {
        ...mapGetters(["tumHaftaninfirsatlari","tumSepet"]),
        toplamTutar(){
            return (this.tumSepet.reduce((acc, item) => acc + item.price, 0)).toFixed(2) + ' TL'
        },
        sepettekiUrunSayisi(){
            return this.tumSepet.length
        },
        ayniUrunSayisi() {
            return this.count(this.tumSepet);
        }
    },
    methods : {
        removeUrun(sepet){
            this.tumSepet.splice(this.tumSepet.indexOf(sepet), 1);
            this.showUrunSilindi = true
            if(this.showUrunSilindi==true){
                setTimeout(() => this.showUrunSilindi = false, 1000)
            }
        },
        count(array) {
            //add 1 if the name exists, initialize as 1 if it does not
            let counts = array.reduce((out, {name}) => ({ ...out, [name]: out[name]+1 || 1}), {});
            return Object.keys(counts).map(key => ({name: key, count: counts[key]}));
        }
    }
}
</script>

<style scoped>
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
    .shopping-button{
        z-index: 5;
        position: fixed;
        bottom: 10px;
        right: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    }
    .shopping-button-count{
        z-index: 5;
        position: fixed;
        bottom: 50px;
        right: 87px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    }
    .shopping-button1{
        z-index: 5;
        position: fixed;
        bottom: 65px;
        right: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    }
    .shopping-button-count1{
        z-index: 5;
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
</style>