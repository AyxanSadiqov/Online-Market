<template>
    <div id="footer">
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="footer-baslik">Kurumsal</div>
                        <div class="footer-altbaslik"><span>Hakkimizda</span></div>
                        <div class="footer-altbaslik"><span>Vizyon</span></div>
                        <div class="footer-altbaslik"><span>Misyon</span></div>
                        <div class="footer-altbaslik"><span>Iletisim</span></div>
                    </div>
                    <div class="col-lg-4">
                        <div class="footer-baslik">Yardım</div>
                        <div class="footer-altbaslik">
                            <router-link to="/kullanim-sartlari"><span>Gizlilik ve Güvenlik</span></router-link>
                        </div>
                        <div class="footer-altbaslik">
                            <router-link to="/kaydol"><span>Yeni Üyelik</span></router-link>
                        </div>
                        <div class="footer-altbaslik">
                            <router-link to="/profil/geri-bildirim"><span>Geri Bildirim</span></router-link>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="footer-baslik">İletişim</div>
                        <div class="footer-altbaslik">
                            <span><i class="fas fa-phone-alt"></i></span>
                            <span><a href="tel:0 (850) 307 00 41">0 (850) 307 00 41</a></span>
                        </div>
                        <div class="footer-altbaslik">
                            <span><i class="fas fa-envelope"></i></span>
                            <span><a href="mailto:e-siparis@gunkay.com?subject=Bize Mail Bırakın">e-siparis@gunkay.com</a></span>
                        </div>
                        <div class="footer-ios-play">
                            <span><a href="https://apps.apple.com/tr/app/g%C3%BCnkay-sanal-market/id1530725843?l=tr" target="_blank"><img src="@/assets/svg/icon-ios.svg" alt="ios"></a></span>
                            <span><a href="https://play.google.com/store/apps/details?id=com.zdc.android.gunkay"><img src="@/assets/svg/icon-play.svg" alt="play"></a></span>
                        </div>
                        <div class="footer-social">
                            <SocialMediaIcons />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="footer-bottom">
                            <router-link to="/">
                                <img src="@/assets/img/logo-footer.png" alt="logo">
                            </router-link>
                            <span>2021 ® GÜNKAY Sanal Market |</span> Tüm hakları saklıdır. Kredi kartı bilgileriniz 256bit SSL sertifikası ile korunmaktadır.
                            <div><img src="@/assets/img/visa-master.png" alt="logo"></div>
                            <div class="footer-etbis"><div id="ETBIS"><div id="01a73e3c64bc48efbc31dd122e8afe61"><a href="https://etbis.eticaret.gov.tr/sitedogrulama/01a73e3c64bc48efbc31dd122e8afe61" target="_blank"><img style='width:70px; height:90px' src="data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAIIAAACWCAYAAAASRFBwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAEX0SURBVHhe7Z0HnF1VtcYh1FBCE5AOgjQB6b0KCiII0iK9BUFApER67wgKSAcB6Si9Y0QglJTJ1GRSSALpPZNMeoX91v/c891Z98y+ZZIQns/3/X4fYXY7556z9t5rrb32PksYwqLgX//615DF008/HS0bY2NjY1Kna9eurfI6dOgQJkyYkOSXw6233tqq/t57753mtmDq1KlhrbXWSvI7duyYppbHj3/841btiyuuuGIYM2ZMWrIFhx12WJK/0UYbhblz56apLdh+++2T/N122y1NacGMGTPCuuuum+Qfc8wxaWoIv/zlL/PXXUi+YkwQy2wzF1YQGhoakjoxQYDz5s1L8svhtttua1V3xx13THNbsKCCsNNOO7VqXywnCJtsskmaUojNNtssyd9mm23SlEKsv/76Sf5iEYRNN900nHzyyW3iT3/603yD5QThoIMOSuoceeSR+bTtttsu39bIkSOTOl4Qdt999yTv9NNPD48//njS3qeffpqUAx988EGS5nnDDTfk2xR/97vf5fO/+OKLpG4xQfj3v/9d0F6WG264Yf7+siwnCN/73vfCk08+2arNc889N7nP888/v1Uez3W11VZL6scEgWueeOKJrX5zKZ5wwglhhRVW0H0XCsJvfvOb9BKVo7q6Wo2VFYTu3bsnaePHjw9LLrlkkkbvzcILwnPPPZemhrD00ksnaUcccUSaEsIee+yRLytefvnlaW4Lampq8vn33HNPkoYgrLnmmknacccdl6SBffbZJ1+2reThjh07Nm2pBRKEYhw0aFBSrk+fPtF8MSYIG2+8cZrSNmywwQZqt1AQTj311LRI5fjwww/VWFQQnn/++Xz+u+++m6QNHDgwLwg333xzkubh23zggQeStClTpiS9iTSkX4i9tOuuuy7NbcHHH3+cz//LX/6SpNGmegUPVTj00EPzZReECFgWfhSMccCAAUm5+vr6aL4YEwRGqDlz5qSplWHWrFlhvfXWU7vFBeGyyy4LBx98cFEOHz48KRcThOnTpyc3TLkLL7wwvP/++wknTpyY5HtBYDpSm0OHDk3yJ02alK8zYsSIJK2YIDAi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"/></a></div></div></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="footer-son">
                            <span>Powered By <a href="https://market.zdc.com.tr/" target="_blank">ZDC Bilişim</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>
</template>

<script>
import SocialMediaIcons from "@/components/SocialMediaIcons"

export default {
    components : {
        SocialMediaIcons
    }
}
</script>

<style scoped>
    @media (max-width : 990px){
        #footer{
            display: none !important;
        }
    }
    #footer{
        border-top: 1px solid #d8d8d8;
        padding: 40px 40px 0 40px;
        font-family: 'Trebuchet MS';
    }
    .footer-baslik{
        font-size: 16px;
        color: #ff5e00;
        font-weight: 800;
        padding-bottom: 25px;
    }
    .footer-baslik:after {
        content: ""; /* This is necessary for the pseudo element to work. */ 
        display: block; /* This will put the pseudo element on its own line. */
        width: 7%;
        padding-top: 2px;
        border-bottom: 2px solid #206736;
    }
    .footer-altbaslik{
        font-size: 14px;
        font-weight: 400;
        padding-bottom: 10px;
        color: black;
        transition: .5s;
    }
    .footer-altbaslik span{
        transition: .3s;
    }
    .footer-altbaslik a{
        color: black;
        cursor: pointer;
    }
    .footer-altbaslik span:hover{
        color: #206736;
        cursor: pointer;
    }
    .footer-altbaslik span i{
        border: 2px solid #eeeeee;
        border-radius: 20px;
        padding: 10px;
        transition: .3s;
    }
    .footer-altbaslik span i:hover{
        border-color: #d6d6d6;
    }
    .footer-altbaslik span:nth-child(2){
        font-weight: 400;
        padding-left: 10px;
    }
    i{
        color: #4d4d4d;
    }
    .footer-social{
        margin-top: 10px;
    }
    .footer-social i{
        border: 2px solid #eeeeee;
        border-radius: 30px;
        padding: 15px;
        transition: .3s;
        margin-right: 10px;
        font-size: 18px;
    }
    .fa-facebook-f{
        min-width: 50px;
        padding-left: 17px !important;
    }
    .footer-social span i:hover{
        border: 2px solid #206736;
        background: #206736;
        color: white;
        cursor: pointer;
        box-shadow: 0 4px 4px 0 #6b6b6b;
    }
    .footer-ios-play{
        margin-top: 20px;
    }
    .footer-ios-play span{
        margin-right: 20px;
    }
    .footer-ios-play img{
        transition: .3s;
    }
    .footer-ios-play span:hover img{
        transform: translateY(-5px);
        box-shadow: 0 5px 5px 0 rgb(151, 151, 151);
    }
    .footer-bottom::before{
        content: "";
        display: block;
        margin: 30px 0 30px 0;
        width: 100%;
        padding-top: 2px;
        border-bottom: 1px solid #d8d8d8;
    }
    .footer-bottom img{
        width: 200px;
        object-fit: contain;
    }
    .footer-bottom{
        font-size: 14px;
        color: #5e5e5e;
    }
    .footer-bottom span{
        font-weight: 800;
        padding-left: 20px;
        color: #424242;
    }
    .footer-bottom div{
        margin-top: 10px;
    }
    .footer-son{
        margin: 20px 0 5px 0;
        display: flex;
        justify-content: center;
        font-size: 13px;
    }
    .footer-etbis{
        position: absolute;
        top: 80px;
        right: 20px;
    }
</style>