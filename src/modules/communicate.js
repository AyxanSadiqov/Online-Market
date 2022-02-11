const state = {
    adreseklemeform : "",
    sidebarmenuzindex : "",
    bottomnavzindex : "",
    adresdegisti : 0, // ProfilAdreslerim-de basarili sekilde adres degisilirse (yani sepetiSifirlaEvet() fonksiyonu icinde), bu degisimi diger sayfalarda da algilayabilmek icin yazilmis degisken
    showsiparisbekleniyor : false, // (false:bekleniyor demek) ProfilSiparislerim sayfasinda adresler listelenene kadarki bekleniyor yazisinin gosterilmesi icin (ayni zamanda ProfilSiparislerimPage-deki filter-da da kullaniliyor)
}
const getters = {
    adresEklemeForm : state => state.adreseklemeform,
    sidebarMenuZindex : state => state.sidebarmenuzindex,
    bottomNavZindex : state => state.bottomnavzindex,
    adresDegisti : state => state.adresdegisti,
    showSiparisBekleniyor : state => state.showsiparisbekleniyor,
}

const actions = {}

const mutations = {
    addAdresEklemeForm(state,value) {
        state.adreseklemeform = value
    },
    addSidebarMenuZindex(state,value) {
        state.sidebarmenuzindex = value
    },
    addBottomNavZindex(state,value) {
        state.bottomnavzindex = value
    },
    addAdresDegisti(state,value) {
        state.adresdegisti = value
    },
    addShowSiparisBekleniyor(state,value) {
        state.showsiparisbekleniyor = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}