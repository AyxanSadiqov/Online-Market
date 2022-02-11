<template>
    <div class="row" v-if="updateExists">
        <div class="col-md-4 col-11 col-sm-11 col-lg-4 alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            Yeni sürüm mevcut! <a href="#" @click="refreshApp">Güncellemek için tıklayın</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            refreshing: false,
            registration: null,
            updateExists: false,
        };
    },
    methods: {
        showRefreshUI (e) {
            this.registration = e.detail;
            this.updateExists = true;
        },
        refreshApp () {
            this.updateExists = false;
            if (!this.registration || !this.registration.waiting) { return; }
            this.registration.waiting.postMessage('skipWaiting');
        },
    },
    created () {
        document.addEventListener(
            'swUpdated', this.showRefreshUI, { once: true }
        );
        if (navigator.serviceWorker) {  
            navigator.serviceWorker.addEventListener(
                'controllerchange', () => {
                    if (this.refreshing) return;
                    this.refreshing = true;
                    window.location.reload();
                }
            );
        }
    },
};
</script>

<style scoped>
    .alert{
        z-index: 9999;
        position: fixed;
        left: 10px;
        top: 15%;
        border: 1px solid #ff4444;
        border-radius: 5px;
        font-weight: 800;
        font-size: 15px;
        transition: .3s;
    }
    .alert:hover{
        border: 1px solid #CC0000;
    }
    button{
        outline:none !important;
    }
</style>