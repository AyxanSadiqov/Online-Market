<template>
    <div v-cloak>
        <h4 class="mt-4 mb-4"><span class="first-word">A</span>yarlarım</h4>
        
        <div class="row" id="ayarlarimID">
            <div class="col-md-6 left">
                Yapmış olacağınız değişiklikler size özel ayarlar olup, siteyi görüntülediğiniz tarayıcı üzerinde geçerli olacaktır.
                <hr>
            </div>
            <div class="vl"></div>
            <hr>
            <div class="col-md-6 right">
                <div class="d-flex bd-highlight ayarlar">
                    <div class="p-2 flex-grow-1 bd-highlight align-self-center"><span>Çoklu Dil</span></div>
                    <div class="p-2 bd-highlight"><span><Dil-degisme-dropdown /></span></div>
                </div>
                <!-- <div class="d-flex bd-highlight ayarlar-bir">
                    <div class="p-2 flex-grow-1 bd-highlight align-self-center"><span>Karanlık Mod</span></div>
                    <div class="p-2 bd-highlight"><span><DarkModeButton /></span></div>
                </div> -->
                <div class="d-flex bd-highlight ayarlar-iki">
                    <div class="p-2 flex-grow-1 bd-highlight align-self-center"><span>Siteyi görüntüleme sayı</span></div>
                    <div class="p-2 bd-highlight"><span>{{getVcount}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DilDegisim from "@/components/DilDegisim"
// import DarkModeButton from "@/components/DarkModeButton"

export default {
    data (){
        return{
            getVcount : ''
        }
    },
    components : {
        'Dil-degisme-dropdown' : DilDegisim,
        // DarkModeButton
    },
    methods : {
        getVisitorHowManyTime(){
            var getCookie = document.cookie
            var vcount = getCookie.split("vcount=")
            this.getVcount = vcount.pop().split(';').shift()
        }
    },
    created(){
        this.getVisitorHowManyTime()
    }
}
</script>
    
<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 990px){
        #ayarlarimID{
            margin-bottom: 40px;
        }
    }
    @media (max-width : 800px){
        .vl{
            display: none;
        }
        hr{
            display: block !important;
        }
    }
    .first-word{
        text-decoration: underline;
    }
    hr{
        display: none;
    }
    .left{
        font-size: 15px;
        padding-right: 15px;
        padding-left: 15px;
    }
    .ayarlar{
        border: 1px solid #eee;
        border-radius: 7px;
        padding: 6px;
        margin: 3px 3px 7px 3px;
        background: rgb(245, 245, 245);
    }
    .ayarlar-bir{
        border: 1px solid #eee;
        border-radius: 7px;
        padding: 1px 6px 1px 6px;
        margin: 3px 3px 7px 3px;
        background: rgb(245, 245, 245);
        /* box-shadow: inset 0 0 10px rgba(255, 255, 255, .5);
        filter: blur(10px); */
    }
    .ayarlar-iki{
        border: 1px solid #eee;
        border-radius: 7px;
        padding: 9px;
        margin: 3px 3px 7px 3px;
        background: rgb(245, 245, 245);
    }
    .vl{
        border-left: 1px solid #E6E6E6;
        height: 100%;
        position: absolute;
        left: 50%;
        margin-left: -3px;
        top: 105px;
    }
</style>