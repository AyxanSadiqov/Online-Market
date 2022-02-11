Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div>
        {{baglantiDurumu()}}
        <div v-if="showButton" class="internet-durum">
            <div>
                <i class="fas fa-2x fa-wifi animated flash infinite"></i> 
                BAĞLANTI YOK. Lütfen bağlantınızı kontrol edip tekrar deneyin. <br>
                <button @click="tekrarDene()" type="button" class="btn btn-md btn-outline-danger mt-4">Tekrar dene</button>
            </div>
        </div>
        <!-- <button v-if="showButton" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalPush"><i class="fas fa-2x fa-wifi animated flash infinite"></i></button>

        <div class="modal fade" id="modalPush" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-notify modal-danger" role="document">
                <div class="modal-content text-center">
                    <div class="modal-header d-flex justify-content-center">
                        <p class="heading">Bildirim</p>
                    </div>
                    <div class="modal-body">
                        <i class="fas fa-bell fa-4x animated rotateIn mb-4"></i>
                        <p>Cihazınız internete bağlı değil. Lütfen bağlantınızı kontrol ediniz.</p>
                    </div>
                    <div class="modal-footer flex-center">
                        <a type="button" class="btn btn-outline-danger waves-effect" data-dismiss="modal">Tamam</a>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            showButton : false
        }
    },
    mounted () {
        addEventListener('click', this.baglantiDurumu)
    },
    beforeUnmount () {
        removeEventListener('click', this.baglantiDurumu)
    },
    methods : {
        baglantiDurumu(){
            if(navigator.onLine){
                this.showButton = false
            }else{
                this.showButton = true
            }
        },
        tekrarDene(){
            if(navigator.onLine){
                // this.$forceUpdate();
                this.$router.go(0)
            }else{
                return
            }
        }
    }
}
</script>

<style scoped>
    button{
        z-index: 10;
        outline:none !important;
    }
    .internet-durum{
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(15px);
    }
    .internet-durum div{
        font-size: 20px;
        font-weight: 800;
        padding: 20px;
    }
    .internet-durum div i{
        display: block;
        margin: -40px 0 20px 0;
        color: red;
    }
    button{
        border-radius: 10px;
    }
</style>