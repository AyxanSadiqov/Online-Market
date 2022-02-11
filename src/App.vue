Bu sayfadaki puf noktalar:
1 - css tanimlamalari burada yapilir
2 - style icinde import edilen dosya genel olarak tum sayfalara etki eder
3 - o yuzden css class-i olustururken unique isimler kullanilmasi lazim (farkli sayfalar olsa bile)
4 - mesai randevu durumu iceriyor
<template>
  <div :style="bodyColor">
    <MesaiRandevuDurum />
    <InternetBaglantiDurumu />
    <CookieMessage />
    <InstallPrompt />
    <VisitorHowManyTime />
    <UpdatePrompt />
    <router-view/>
  </div>
</template>

<script>
import MesaiRandevuDurum from "@/components/MesaiRandevuDurum"
import InternetBaglantiDurumu from "@/components/InternetBaglantiDurumu"
import CookieMessage from "@/components/CookieMessage"
import InstallPrompt from '@/components/InstallPrompt'
import VisitorHowManyTime from "@/components/VisitorHowManyTime"
import UpdatePrompt from '@/components/UpdatePrompt'
import { mapGetters } from 'vuex'

export default {
  components : {
    MesaiRandevuDurum,
    InternetBaglantiDurumu,
    CookieMessage,
    InstallPrompt,
    VisitorHowManyTime,
    UpdatePrompt
  },
  // mounted() {
  //   let jquery = document.createElement('script')
  //   let bootstrapTooltips = document.createElement('script')
  //   let bootstrapJs = document.createElement('script')
  //   let mdb = document.createElement('script')
  //   jquery.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js')
  //   bootstrapTooltips.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js')
  //   bootstrapJs.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js')
  //   mdb.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js')
  //   document.head.appendChild(jquery)
  //   document.head.appendChild(bootstrapTooltips)
  //   document.head.appendChild(bootstrapJs)
  //   document.head.appendChild(mdb)
  // },
  computed : {
    ...mapGetters(["bodyColor"]),
  }
}
</script>

<style scoped>
  /* @import './assets/css/profilim.css'; */
</style>
