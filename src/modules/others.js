
const state = {
    enyakinrandevutarihi : "", // EnYakinRandevuTarihi.vue-da her component render oldugunda sorgu gitmemesi icin
    onaysayfaizin : "", // bir tek kayd ol sayfasindan basarili giris oldugunda buraya deger yazilir. baska turlu onay sayfasinin goruntulenmesini engellemek icin
    basarilionaykodu : "", // onay kodu dogru girildikten sonra giris yap sayfasinda bununla ilgili bildirimin gorunmesi icin
    sifremionaylaizin : "", // sifremi-onayla sayfasini goruntulemek icin
    activebtn : "", // profil sidebar menu active link icin
    activenavbtn : "", // bottom nav menu active link icin
    parameterstab : "", // sepet sayfasindaki covid-19 testi pozitif...(tek covid mesaji icin degil. hizmet bedeli, hizmet alindi mi bilgileri de bu array-den cekiliyor) mesajinin her sayfa render oldugunda sorgu gitmemesi icin
    minimumsepettutari : "", // sepet odeme sayfasinda minimum sepet tutarini dinamik sekilde kontrolunu yapabilmek icin
    showminimumsepettutari : "", // sepet odeme sayfasinda toplam tutar, minimum sepet tutarindan az oldugunda sepet sayfasinda bildirim gorunmesi icin
    googlemesafe : "", // sepet sayfasinda getGoogleGeocodeWaypoints() fonksiyonu icinde google-dan donen mesafe bilgisi buraya yazilir
}
const getters = {
    enYakinRandevuTarihi : state => state.enyakinrandevutarihi,
    onaySayfaIzin : state => state.onaysayfaizin,
    basariliOnayKodu : state => state.basarilionaykodu,
    sifremiOnaylaIzin : state => state.sifremionaylaizin,
    activeBtn : state => state.activebtn,
    activeNavBtn : state => state.activenavbtn,
    parametersTab : state => state.parameterstab,
    minimumSepetTutari : state => state.minimumsepettutari,
    showMinimumSepetTutari : state => state.showminimumsepettutari,
    googleMesafe : state => state.googlemesafe,
}

const actions = {}

const mutations = {
    addEnYakinRandevuTarihi(state,value) {
        state.enyakinrandevutarihi = value
    },
    addOnaySayfaIzin(state,value) {
        state.onaysayfaizin = value
    },
    addBasariliOnayKodu(state,value) {
        state.basarilionaykodu = value
    },
    addSifremiOnaylaIzin(state,value) {
        state.sifremionaylaizin = value
    },
    addActiveBtn(state,value) {
        state.activebtn = value
    },
    addActiveNavBtn(state,value) {
        state.activenavbtn = value
    },
    addParametersTab(state,value) {
        state.parameterstab = value
    },
    addMinimumSepetTutari(state,value) {
        state.minimumsepettutari = value
    },
    addShowMinimumSepetTutari(state,value) {
        state.showminimumsepettutari = value
    },
    addGoogleMesafe(state,value) {
        state.googlemesafe = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}