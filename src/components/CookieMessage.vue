Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <transition name="fade">
        <div class="card" v-if="isOpen">
            <div class="card-body d-flex bd-highlight justify-content-between align-items-center">
                <div class="p-2 flex-grow-1 bd-highlight cookie-message">
                    {{ $t('Günkay Sanal Market uses cookies to provide you with the best shopping service. By using our site you allow cookies, for more information;') }}
                    <router-link to="/kullanim-sartlari"><span class="cookie-gizlilik">Gizlilik ve Güvenlik</span></router-link>
                </div>
                <div class="p-2 bd-highlight">
                    <button @click="kabulet" type="button" class="btn btn-primary">{{ $t('Got it') }}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return{
            isOpen : false
        }
    },
    computed: {
        getCookiePermit(){
            return localStorage.getItem('CookiePermit', true)
        },
    },
    methods: {
        kabulet(){
            this.isOpen = false
            localStorage.setItem('CookiePermit', true)
        }
    },
    created(){
        if(!this.getCookiePermit === true){
            this.isOpen = true
        }
    },
}
</script>

<style scoped>
    @media (max-width : 500px){
        .cookie-message{
            font-size: 12px;
        }
        button{
            font-size: 10px;
            margin: 0;
            padding: 10px 20px;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transform: translateY(130%);
        transition-timing-function: ease-out;
        transition: 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .card{
        z-index: 9999;
        position: fixed;
        opacity: 0.98;
        bottom: 0px;
        border: 1px solid #303030;
        border-radius: 0px;
        width: 100%;
        min-height: 150px;
        background-color: #303030;
        color: white;
    }
    .cookie-gizlilik{
        text-decoration: underline;
        color: white;
    }
</style>