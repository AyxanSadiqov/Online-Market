<template>
    <div>
        <button type="button" class="btn geribildirim-button" :style="loginButtons" data-toggle="modal" data-target="#fullHeightModalGeriBildirim">
            <span>Gerİ Bİldİrİm</span>
            <img src="@/assets/svg/comment.svg" width="20" height="20" alt="">
        </button>

        <div class="modal fade left" id="fullHeightModalGeriBildirim" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-full-height modal-left" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <GeriBildirim />
                    </div>
                    <div class="modal-footer justify-content-center geribildirim-button-footer">
                        <span>Powered By <a href="https://market.zdc.com.tr/" target="_blank">ZDC Bilişim</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GeriBildirim from "@/components/GeriBildirim"

export default {
    components : {
        GeriBildirim
    },
    computed : {
        ...mapGetters(["loginButtons"]),
    },
}
</script>

<style scoped>
    .geribildirim-button{
        z-index: 7;
        position: fixed;
        bottom: 10px;
        left: -112px;
        padding: 10px 20px;
        border-radius: 30px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        display: flex;
        align-items: center;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
        transition: .3s;
    }
    .geribildirim-button:hover{
        left: -10px;
    }
    .geribildirim-button span{
        padding-right: 15px;
    }
    button{
        outline:none !important;
    }
    .geribildirim-button-footer{
        display: flex;
        justify-content: center;
        font-size: 13px;
    }
</style>