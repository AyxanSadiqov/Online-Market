<template>
    <div v-cloak>
        <h4 class="mt-4 mb-4"><span class="first-word">K</span>ullanıcı Bilgilerim</h4>
        <!-- {{user}} -->
        <div class="row text-muted" id="kullaniciBilgilerimID">
            <div class="bio-row">
                <p><span>Ad, Soyad </span>: {{user.adsoyad}}</p>
            </div>
            <div class="bio-row">
                <p><span>E-posta </span>: {{user.mail}}</p>
            </div>
            <div class="bio-row">
                <p><span>Telefon </span>: {{utel}}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            user : [],
            // cookie bilgileri START
            utel : "",
            // cookie bilgileri END
        }
    },
    methods : {
        getLocalUserBilgisi(){
            this.user = JSON.parse(localStorage.getItem("user"))
        },
        getUid_Udep(){
            this.utel = this.decryptCookie("utel")
        },
    },
    created(){
        this.getLocalUserBilgisi()
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 990px){
        #kullaniciBilgilerimID{
            margin-bottom: 40px;
        }
    }
    .first-word{
        text-decoration: underline;
    }
</style>