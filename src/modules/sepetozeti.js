
const state = {
    sepetozeti : "", // sepet odeme sayfasindaki sepet ozeti alaninin doldurulmasi icin
    sepetadres : "", // sepet olusturmada gerekli sepet adres alaninin doldurulmasi icin
    sepetfatura : "", // sepet olusturmada gerekli sepet fatura alaninin doldurulmasi icin
    siparisbasarili : "", // siparis basarili ise basarili siparis ekrani icin
    fiyatguncellendi : "", // sepet odeme sayfasinda urun degisikligi algilandigi zaman gerekli bilgiler buraya yazilir
    sepetodemekayit : "", // sepet odeme sayfasinda gelinen asamaya kadarki bilgileri kayit altinda tutmak icin
    showfaturabilgisicard : "", // fatura ekle-ye basildiginda SepetOdemePage-de fatura bilgisi alaninin show/hide-i icin
}

const getters = {
    sepetOzeti : state => state.sepetozeti,
    sepetAdres : state => state.sepetadres,
    sepetFatura : state => state.sepetfatura,
    siparisBasarili : state => state.siparisbasarili,
    fiyatGuncellendi : state => state.fiyatguncellendi,
    sepetOdemeKayit : state => state.sepetodemekayit,
    showFaturaBilgisiCard : state => state.showfaturabilgisicard,
}

const actions = {}

const mutations = {
    addSepetOzeti(state,value) {
        state.sepetozeti = value
    },
    addSepetAdres(state,value) {
        state.sepetadres = value
    },
    addSepetFatura(state,value) {
        state.sepetfatura = value
    },
    addSiparisBasarili(state,value) {
        state.siparisbasarili = value
    },
    addFiyatGuncellendi(state,value) {
        state.fiyatguncellendi = value
    },
    addSepetOdemeKayit(state,value) {
        state.sepetodemekayit = value
    },
    addShowFaturaBilgisiCard(state,value) {
        state.showfaturabilgisicard = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}