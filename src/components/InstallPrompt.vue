<template>
    <div class="row" v-if="showInstallBanner">
        <div class="col-md-5 col-11 col-sm-11 col-lg-3 alert alert-dismissible">
            Bu uygulamayı ana ekranınıza eklemek istiyor musunuz?
            <div class="d-flex justify-content-between alert-answers">
                <div><a @click.prevent="install">Evet!</a></div>
                <div class="pr-3" data-dismiss="alert">Hayır teşekkürler</div>
            </div>
        </div>
    </div>
</template>

<script>
let installEvent;
export default {
    name: 'installPrompt',
    data() {
        return {
            showInstallBanner: false
        };
    },
    methods: {
        install() {
            this.showInstallBanner = false;
            installEvent.prompt();
            installEvent.userChoice.then(() => {
                installEvent = null;
            });
        }
    },
    created() {
        window.addEventListener('beforeinstallprompt', e => {
            e.preventDefault();
            installEvent = e;
            this.showInstallBanner = true;
        });
    },
};
</script>

<style scoped>
    @media (max-width : 770px){
        .alert{ display: none; }
    }
    @media (max-width : 990px){
        .alert{ bottom: 50px !important; }
    }
    .alert{
        z-index: 9999;
        position: fixed;
        left: 10px;
        bottom: 15px;
        border: 1px solid #bebebe;
        background: white;
        border-radius: 5px;
        font-weight: 800;
        font-size: 15px;
        padding: 15px;
        transition: .3s;
    }
    .alert:hover{
        border: 1px solid #979797;
    }
    .alert .alert-answers{
        padding-top: 10px;
        color: #1266F1;
    }
    .alert-answers div{
        cursor: pointer;
    }
    button{
        outline:none !important;
    }
</style>