const state = {
    showkampanyaalani : "",
    kampanyavarmi : "", // kampanya ve promosyon var mi yok mu kontrolleri icin
    kampanyaninidsi : [], // sepet olustururken kapmanya alanina yazilacak kampanya id-si icin bir dizi
    // alttaki, 1) sepet odeme sayfasindayken sepetten kampanyali urun cikarilip yine spt odeme sayfasi goruntulendiginde sepet ozeti kampanyali degil normal fiyatlar gorunur
    eklikampanya : "", // ""SIMDILIK KULLANIMA KAPANDI BURASI"" 2) kampanya iceriginde ekli kampanyanin butonunun 'cikar' olarak gosterilmesi icin (ileride burasi dizi olsun)
    kampanyadizisi : [], // her kampanya ekleye basildiginda o urun bu diziye eklenir
    birlestirilebilir : [], // ekleye basildiginda birlestirilebilir kampanyalari buraya eklenecek
    birlestirilemez : [], // ekleye basildiginda birlestirilemez kampanyalari buraya eklenecek
    toplamkazanc : "", // kampanya varsa sepet odeme sepet ozeti alaninda gosterilecek kazanc buraya yazilir
    toplamkampanyaindirimi : "", // sepet ozeti alaninda kampanya indirimi alaninda gorunecek deger icin
    kazanclist : "", // sepet ozeti kazancin yanindaki unlem ikonuna tiklandiginda acilacak div-in icindekiler icin
}
const getters = {
    showKampanyaAlani : state => state.showkampanyaalani,
    kampanyaVarMi : state => state.kampanyavarmi,
    kampanyaninIDsi : state => state.kampanyaninidsi,
    ekliKampanya : state => state.eklikampanya,
    kampanyaDizisi : state => state.kampanyadizisi,
    birlestirilebilir : state => state.birlestirilebilir,
    birlestirilemez : state => state.birlestirilemez,
    toplamKazanc : state => state.toplamkazanc,
    toplamKampanyaIndirimi : state => state.toplamkampanyaindirimi,
    kazancList : state => state.kazanclist,
}

const actions = {
    emptyKampanyaninIDsi ({ commit }) {
        commit('emptyKampanyaninIDsi')
    },
    emptyKampanyaDizisi ({ commit }) {
        commit('emptyKampanyaDizisi')
    },
    emptyBirlestirilebilir ({ commit }) {
        commit('emptyBirlestirilebilir')
    },
    emptyBirlestirilemez ({ commit }) {
        commit('emptyBirlestirilemez')
    },
}

const mutations = {
    addShowKampanyaAlani(state,value) {
        state.showkampanyaalani = value
    },
    addKampanyaVarMi(state,value) {
        state.kampanyavarmi = value
    },
    addKampanyaninIDsi(state,value) {
        state.kampanyaninidsi.push({id:value})
    },
    popKampanyaninIDsi(state,value) { // tiklanilan kampanya id-sini diziden cikarmak icin
        var stringify = JSON.stringify(state.kampanyaninidsi)
        var parse = JSON.parse(stringify)
        var index = parse.findIndex(x => x.id === value)
        if (index !== undefined) parse.splice(index, 1)
        state.kampanyaninidsi = parse
    },
    // sepet odeme sayfasi yuklenmeden once sorgu icin olusturulmus tiklanilan kampanyanin id-sinin tutuldugu dizi sifirlanmasi icin
    emptyKampanyaninIDsi(state) {
        state.kampanyaninidsi = []
    },
    addEkliKampanya(state,value) {
        state.eklikampanya = value
    },
    addKampanyaDizisi(state,value) {
        state.kampanyadizisi.push(value)
    },
    popKampanyaDizisi(state,value) { // tiklanilan kampanya objectini diziden cikarmak icin
        var stringify = JSON.stringify(state.kampanyadizisi)
        var parse = JSON.parse(stringify)
        var index = parse.findIndex(x => x.id === value.id)
        if (index !== undefined) parse.splice(index, 1)
        state.kampanyadizisi = parse
    },
    // sepet odeme sayfasi yuklenmeden once ekli kampanyalarin tutuldugu dizi sifirlanmasi icin
    emptyKampanyaDizisi(state) {
        state.kampanyadizisi = []
    },
    addBirlestirilebilir(state,value) {
        state.birlestirilebilir.push(value)
    },
    popBirlestirilebilir(state,value) { // tiklanilan kampanya objectini diziden cikarmak icin
        var stringify = JSON.stringify(state.birlestirilebilir)
        var parse = JSON.parse(stringify)
        var index = parse.findIndex(x => x.id === value.id)
        if (index !== undefined) parse.splice(index, 1)
        state.birlestirilebilir = parse
    },
    emptyBirlestirilebilir(state) {
        state.birlestirilebilir = []
    },
    addBirlestirilemez(state,value) {
        state.birlestirilemez.push(value)
    },
    popBirlestirilemez(state,value) { // tiklanilan kampanya objectini diziden cikarmak icin
        var stringify = JSON.stringify(state.birlestirilemez)
        var parse = JSON.parse(stringify)
        var index = parse.findIndex(x => x.id === value.id)
        if (index !== undefined) parse.splice(index, 1)
        state.birlestirilemez = parse
    },
    emptyBirlestirilemez(state) {
        state.birlestirilemez = []
    },
    addKazanc(state,value) {
        state.toplamkazanc = value
    },
    addToplamKampanyaIndirimi(state,value) {
        state.toplamkampanyaindirimi = value
    },
    addKazancList(state,value) {
        state.kazanclist = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}