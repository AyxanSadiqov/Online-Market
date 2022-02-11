// import axios from 'axios'      ŞU AN İÇİN KULLANILMIYOR.. AltgrupUrunler.vue-da direkt request kullanıldı.
// // import qs from 'qs'

// const state = {
//     urunler : []
// }

// const getters = {
//     grupUrunler : state => state.urunler
// }

// const actions = {
//     async fetchGrupUrunler({ commit }){
//         const formData = new FormData();
//         formData.append('f', 'get_init_data');
//         const response = await axios.post('https://gunkaysanalmarket.zdc.com.tr/fonksiyon.php',formData,{
//             headers: {
//                 // 'Accept': 'application/json',
//                 // "Access-Control-Allow-Origin": "*",
//                 // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//             }
//         })
//         commit('setUrunler', response.data)
//     }
// }

// const mutations = {
//     setUrunler: (state, urunler) => (state.urunler = urunler)
// }

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }