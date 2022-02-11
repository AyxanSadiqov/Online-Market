<template>
  <div>
    <Navbar />
    <BottomNavMenu /> <!-- Bu component tum sayfalara eklenecek -->
    <Gruplar />
    <SepetButton />
    <Slide />
    <Vitrin />
    <!-- <Haftaninfirsatlari @sepeteekle="tumSepet.push($event)" /> -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import BottomNavMenu from "@/components/BottomNavMenu"
import Gruplar from "@/components/Gruplar"
import SepetButton from "@/components/SepetButton"
import Slide from "@/components/Slide"
import Vitrin from "@/components/Vitrin"
// import Haftaninfirsatlari from "@/components/Haftaninfirsatlari"
import Footer from "@/components/Footer"

export default {
  components : {
    Navbar,
    BottomNavMenu,
    Gruplar,
    SepetButton,
    Slide,
    Vitrin,
    // Haftaninfirsatlari,
    Footer,
  },
}
</script>
