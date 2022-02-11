Bu sayfadaki puf noktalar:
1 - Browser geri tusuna basilirkenki kontrol yapildi.
<template>
    <div>
        <Navbar />
        <div class="color-grey-light mt-70">
            <div class="d-flex align-items-center h-100">
                <div class="container text-center py-5">
                    <h3 class="mb-0">Şifremi Onayla</h3>
                </div>
            </div>
        </div>
        <!-- Bilgilendirme mesaji START -->
        <div class="d-flex justify-content-between">
            <div></div>
            <div v-if="showSifreBilgilendirme" class="card rgba-grey-slight text-center z-depth-0">
                <div class="card-body">
                    <p class="black-text mb-0 font-size-12 bilgi-baslik">Şİfre oluştururken dİkkat edİlmesİ gereken adımlar :</p>
                    <div class="text-left font-size-12 text-muted">
                        <span><i class="fas fa-times-circle"></i> Şifreniz kullanıcı adınız veya adınızı içermemelidir</span><br>
                        <span><i class="fas fa-times-circle"></i> Şifreniz yalnızca harfler ya da yalnızca rakamlardan oluşmamalıdır.</span><br>
                        <span><i class="fas fa-check-circle"></i> Şifrenizin rakam, işaret, büyük ve küçük harfleri içerecek şekilde oluşturulmasına dikkat edilmelidir.</span><br>
                        <span><i class="fas fa-times-circle"></i> Örnek şifre : mahmut123</span><br>
                        <span><i class="fas fa-check-circle"></i> Örnek şifre : M2458t.</span>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
        <!-- Bilgilendirme mesaji END -->
        <SifremiUnuttumPass />

        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import SifremiUnuttumPass from "@/components/SifremiUnuttumPass"
import Footer from "@/components/Footer"

export default {
    metaInfo() {
        return{
            title: 'Şifremi Onayla',
            // titleTemplate: '%s | My Awesome Webapp'
        }
    },
    data(){
        return{
            showSifreBilgilendirme : true,
        }
    },
    mounted () {
        history.pushState(null, document.title, location.href); // browser back button deaktif icin
        addEventListener('popstate', this.birOncekiSayfaErisimKontrolu)
    },
    beforeUnmount () {
        removeEventListener('popstate', this.birOncekiSayfaErisimKontrolu)
    },
    components : {
        Navbar,
        SifremiUnuttumPass,
        Footer
    },
    methods: {
        // browser-dan bir onceki sayfaya gitmek istendiginde normalde sepet odeme sayfasi yerine belirlenen sayfaya gonderilir
        birOncekiSayfaErisimKontrolu(){
            history.pushState(null, document.title, location.href);
            if (confirm('Yaptığınız değişiklikler kaybolacak. Çıkmak istediğinize emin misiniz?')) {
                // evet
                localStorage.removeItem("user1")
                // uid cookie-den temizlenir, utel cookie-den temizlenir
                this.encryptCookie(['uid','utel'],['',''],2) // 1ci dizi: cookie name(sirasiyla), 2ci dizi: cookie value(sirasiyla), 3cu deger: cookie-ye yazilacak eleman sayisi
                this.$router.push({name: 'KaydolPage'})
            } else {
                // hayir
                return ''
            }
        },
    },
}
</script>

<style scoped>
    .font-size-12{
        font-size: 12px;
    }
    .bilgi-baslik{
        font-weight: 800;
        text-transform: uppercase;
    }
    .fa-times-circle{
        color: red;
    }
    .fa-check-circle{
        color: green;
    }
</style>