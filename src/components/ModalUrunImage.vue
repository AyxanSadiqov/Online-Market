Bu sayfadaki puf noktalar:
1 - Bu componentin amaci herhangi bir urun resmine tiklandiginda o urunun resmini alip dinamik modal olarak ekrana cikarmak
2 - Su an kullanilan sayfalar: Sepet,
<template>
    <div class="modal fade" id="modalUrunImage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-body mb-0 p-0">
                    <div class="d-flex justify-content-center z-depth-1-half">
                        <img v-if="modalUrunResim.barkod.length < 8" :src="imagecompany + ushp + '/' + modalUrunResim.barkod + '.jpeg?' + modalUrunResim.imageupdate" class="img-fluid z-depth-0 img-width" alt="">
                        <img v-else :src="image + modalUrunResim.barkod + '.jpeg?' + modalUrunResim.imageupdate" class="img-fluid z-depth-0 img-width" alt="">
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <span class="mr-4 font-weight-bold">{{modalUrunResim.ad}}</span>
                    <button type="button" class="btn btn-outline-primary btn-rounded btn-md ml-4" data-dismiss="modal">Kapat</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: ["modalUrunResim"],
    data(){
        return{
            // cookie bilgileri START
            ushp : "",
            // cookie bilgileri END
        }
    },
    computed: {
        ...mapGetters(["image","imagecompany"])
    },
    methods: {
        getUid_Udep(){
            this.ushp = this.decryptCookie("ushp")
        },
    },
    created(){
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    .img-width{
        max-width: 90%;
        max-height: 350px;
    }
    .modal-content{
        border-radius: 20px;
    }
</style>