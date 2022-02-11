const state = {
    promosyonvarmi : false, // promosyon var mi yok mu kontrolleri icin, burasi promosyon ekliyse promosyon ekle butonunun disable-i icin
    showpromosyonmodal : false, // sepet odeme 4. asamada promosyon kodu ekleye tiklandiginda modalin show/hide-i icin
    // promosyonindirimi : "", // sepet ozeti alaninda gosterilecek olan promosyon indirim tutari
    secilenpromosyonkodu : "",
    promosyonindirimtutar : "",
}
const getters = {
    promosyonVarmi : state => state.promosyonvarmi,
    showPromosyonModal : state => state.showpromosyonmodal,
    // promosyonIndirimi : state => state.promosyonindirimi,
    secilenPromosyonKodu : state => state.secilenpromosyonkodu,
    promosyonIndirimTutar : state => state.promosyonindirimtutar,
}

const actions = {}

const mutations = {
    addPromosyonVarmi(state,value) {
        state.promosyonvarmi = value
    },
    addShowPromosyonModal(state,value) {
        state.showpromosyonmodal = value
    },
    // addPromosyonIndirimi(state,value) {
    //     state.promosyonindirimi = value
    // },
    addSecilenPromosyonKodu(state,value) {
        state.secilenpromosyonkodu = value
    },
    addPromosyonIndirimTutar(state,value) {
        state.promosyonindirimtutar = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}