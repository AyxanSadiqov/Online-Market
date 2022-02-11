Bu sayfadaki puf noktalar:
1 - Bos
<template>
    <div v-cloak id="slideID">
        <div class="row ml-4 mr-4 mb-4">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12 slider" @mouseenter="slideDurdur()" @mouseleave="slideDevam()">
                <transition :name="slideName" tag="div">
                    <div v-for="i in [currentIndex]" :key="i">
                        <!-- undefined kontrolunun yapilma sebebi console-da gorunen bir hatanin onune gecmek icin. kontrol kaldirilirsa gorulecegi uzere -->
                        <img v-if="currentImg!=undefined" :src="'http://gunkaysanalmarket.zdc.com.tr/img/banner/'+currentImg+'.png?'+slider.enddate" :draggable="false" alt=""/>
                    </div>
                </transition>
                <span class="prev" @click="prev">&#10094; </span>
                <span class="next" @click="next">&#10095; </span>
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            slide : [], // sorgudan donen bilgi buraya yazilir
            errors : [],
            slider : [], // slide id-leri tek tek bu diziye atilir ve gosterme islemi bu dizi uzerinden yapilir
            timer : null,
            currentIndex : 0,
            // cookie bilgileri START
            utel : "",
            uid : "",
            // cookie bilgileri END
            slideName : "",
            koordinat : "",
        }
    },
    mounted(){
        this.startSlide()
    },
    computed : {
        ...mapGetters(["serverRequest"]),
        currentImg(){
            return this.slider[Math.abs(this.currentIndex) % this.slider.length]
        }
    },
    methods : {
        startSlide(){
            this.timer = setInterval(this.next, 10000) // bir sonraki slide gecis zamani
        },
        next(){
            this.currentIndex += 1
            this.slideName = "slideRight" // slide yonu saga degistirmek icin
        },
        prev(){
            this.currentIndex -= 1
            this.slideName = "slideLeft" // slide yonu sola degistirmek icin
        },
        async fetchSlide(){
            this.getKoordinat()
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'web_get_init_data');
                formData.append('depo', this.koordinat);
                formData.append('os', 'web');
                formData.append('version', '1');
                formData.append('fbid', '0');
                formData.append('teslimattip', '1');
                var getUserInLocal = localStorage.getItem("user")
                if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
                    formData.append('user', this.utel);
                    formData.append('uid', this.uid);
                }
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                        // 'Accept': 'application/json',
                        // "Access-Control-Allow-Origin": "*",
                        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.slide = response.data
                var banners = [];
                this.slide.map((item) => {
                    banners.push(item.banners)
                })
                banners[2].map((item) => {
                    this.slider.push(item.id)
                })
            }catch (error) {
                this.errors.push(error)
            }
        },
        getKoordinat(){
            this.koordinat = localStorage.getItem("koord")
        },
        getUid_Udep(){
            this.utel = this.decryptCookie("utel")
            this.uid = this.decryptCookie("uid")
        },
        slideDurdur(){ // mouse enter oldugunda slide-i durdurmak icin
            clearTimeout(this.timer)
        },
        slideDevam(){ // mouse leave oldugunda slide-in devam etmesi icin
            this.startSlide()
        },
    },
    created(){
        this.fetchSlide()
        this.slideName = "slideRight"
    }
}
</script>

<style scoped>
[v-cloak] > * { display:none; }
    @media (max-width : 990px){
        img{ width: 95vw !important; }
    }
    @media (max-width : 768px){
        .slider{ width: 100vw !important; }
    }
    @media (max-width : 500px){
        img{ width: 90vw !important; }
    }
    #slideID{
        overflow: hidden;
    }
    /* normal slide yonu sagdan sola dogru */
    .slideRight-leave-active,
    .slideRight-enter-active {
        transition: 1s;
    }
    .slideRight-enter {
        transform: translate(100%, 0);
    }
    .slideRight-leave-to {
        transform: translate(-100%, 0);
    }
    
    /* slide yonu soldan saga dogru */
    .slideLeft-leave-active,
    .slideLeft-enter-active {
        transition: 1s;
    }
    .slideLeft-enter {
        transform: translate(-100%, 0);
    }
    .slideLeft-leave-to {
        transform: translate(100%, 0);
    }

    .slider{
        overflow: hidden;
        position: relative;
        width: 40vw;
        height: 40vw; /* same as width */
        border: 1px solid #eee;
        border-radius: 10px;
        margin-bottom: 45px;
        object-fit: contain;
    }
    img {
        /* height: 530px; */
        width: 80vw;
        height: 40vw;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right:0;
        border-radius: 10px;
    }
    .prev, .next {
        position: absolute;
        cursor: pointer;
        top: 39%;
        width: auto;
        padding: 10px;
        color: black;
        background: white;
        font-weight: bold;
        font-size: 14px;
        transition: 0.7s ease;
        text-decoration: none;
        user-select: none;
        box-shadow: 0 4px 10px 0 rgba(0,0,0,0.3);
    }
    .next {
        border-radius: 30px 0 0 30px;
        right: 0;
    }
    .prev {
        border-radius: 0 30px 30px 0;
        left: 0;
    }
</style>