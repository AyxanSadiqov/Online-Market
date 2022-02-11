// import axios from 'axios'        ŞU AN İÇİN KULLANILMIYOR.. Depo sahip eklendigi icin her sayfada ayri ayri sorgu kullanildi.
// // import qs from 'qs'

// const state = {
//     liste : []
// }

// const getters = {
//     tumListe : state => state.liste
// }

// const actions = {
//     async fetchListe({ commit }){
//         const formData = new FormData();
//         formData.append('f', 'get_init_data');
//         // formData.append('f', 'get_urunler');
//         // formData.append('grup', '10');
//         // formData.append('altgrup', '101');
//         // formData.append('depo', '1');
//         const response = await axios.post('https://gunkaysanalmarket.zdc.com.tr/test/fonksiyonweb.php',formData,{
//             headers: {
//                 // 'Accept': 'application/json',
//                 // "Access-Control-Allow-Origin": "*",
//                 // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//             }
//         })
//         commit('setListe', response.data)
//     }
// }

// const mutations = {
//     setListe: (state, liste) => (state.liste = liste)
// }

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }

//             // mode: 'no-cors',
//             // withCredentials: true,
//             // credentials: 'same-origin',
//             // headers: {
//             //     'Access-Control-Allow-Origin': '*',
//             //     'Content-Type': 'application/json',
//             //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
//             //     'Access-Control-Allow-Headers': 'Content-type,Accept,X-Access-Token,X-Key'
//             // },