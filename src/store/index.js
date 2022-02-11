import Vue from 'vue'
import Vuex from 'vuex'
import haftaninfirsatlari from "@/modules/haftaninfirsatlari"
import gruplar from "@/modules/gruplar"
import grupurunler from "@/modules/grupurunler"
import sepetozeti from "@/modules/sepetozeti"
import others from "@/modules/others"
import wglobal from "@/modules/wglobal"
import communicate from "@/modules/communicate"
import kampanya from "@/modules/kampanya"
import promosyon from "@/modules/promosyon"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    haftaninfirsatlari,
    gruplar,
    grupurunler,
    sepetozeti,
    others,
    wglobal,
    communicate,
    kampanya,
    promosyon,
  }
})
