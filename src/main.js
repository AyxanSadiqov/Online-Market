import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
// import './assets/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import './assets/css/profilim.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import VueMeta from 'vue-meta'
import vueScrollto from 'vue-scrollto'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'
import ScrollLoader from 'vue-scroll-loader'
import { CryptoJSAesJson } from './assets/js/cryptojs-aes-format';

Vue.mixin({ // global fonksiyonlar tanimlamak icin mixin kullanilir
  methods: {
    getCookie(cname){
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    // bu fonksiyon icinkdei num degeri cookie-ye yazilmak istenen adlarin sayisi. mesela uid, udep adinda iki tane ad..
    //..cookie-ye yazilacaksa num 2 olur. boyle yapilmasinin sebebi ise cookie-ye 1'den fazla deger yazilmak istendiginde..
    //..encryptCookie fonksiyonu birden fazla cagiralacakti. bunun yerine fonk 1 kere cagirilir ve parametre olarak kac defa..
    //..calisacagi verilir. fonksiyon ona gore hareket eder.
    encryptCookie(cookieName, cookieValue, num){ // sifrelenip cookie-ye 'YAZILACAK' cookie adi ve cookie degeri
      let i = 0
      while(i < num){ // cookie-ye yazilmak istenen ad sayisi kadar dongu calisir ve degerler cookie-ye kaydedilir
        let valueToEncrypt = cookieValue[i] // this could also be object/array/whatever
        let key = '123456'
        var encryptedCookie = CryptoJSAesJson.encrypt(valueToEncrypt, key)
        document.cookie = cookieName[i] + '=' + encryptedCookie + "; expires=Mon, 01 Jan 2022 09:00:00 UTC;"
        i++
      }
    },
    decryptCookie(cookieName){ // sifresi cozulup 'GOSTERILECEK' cookie-nin adi
      let allcookies = document.cookie
      // olsa da olmasa da gerekli tum sayfalarda decryptCookie fonksiyonu cagriliyor. bazen istenilen ad cookie-de olmadigi..
      //..durumlardaki hatayi kontrol etmek icin asagidaki kontrol yapildi.
      if(allcookies.includes(cookieName)){ // eger cookie-de o ad varsa
        let encrypted = this.getCookie(cookieName)
        let password = '123456'
        let decrypted = CryptoJSAesJson.decrypt(encrypted, password)
        return decrypted
      }else{ // yoksa
        return ''
      }
    },
  },
})

i18n.locale = 'tr'; // setting the initial locale

Vue.config.productionTip = false

Vue.use(VueMeta).use(vueScrollto).use(ScrollLoader)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAAQukCk9fzUmYe22z6-8DowdgrTjNAsB8',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
