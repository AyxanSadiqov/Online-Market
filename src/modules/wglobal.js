
const state = {
    imageurl : 'http://gunkaysanalmarket.zdc.com.tr/img/newbarkod/',
    imageurlcompany : 'http://gunkaysanalmarket.zdc.com.tr/img/company/',
    grupimageurl : 'http://gunkaysanalmarket.zdc.com.tr/img/grup/',
    // baseurl alanlari simdilik devre disi. Sebebi ise bilgisayarda www diye olmasina ragmen mobilde olmamasi
    // baseurl : 'http://localhost:8080/',
    // baseurl : 'https://web.zdc.com.tr/#/', // web.zdc.com.tr icin
    // baseurl : 'https://gunkaysanalmarket.com/#/', // gunkaysanalmarket.com icin
    kampanyaimageurl : 'http://gunkaysanalmarket.zdc.com.tr/img/kampanya/',
    serverrequest : 'https://gunkaysanalmarket.zdc.com.tr/fonksiyonweb.php',
    // sayfa ici renkler START
    bodycolor : "background-color:white", // tum sayfalarda body rengi
    gruplarcard : "background-color:white", // gruplar sayfasi her grup div rengi
    gruplarad : "",
    altgruplarad : "",
    altgruplarbaslik : "background:#206736; color:white",
    altgrupurunlerbar : "",
    altgrupurunleer : "", // sepet,girisyap sayfasinda da kullaniliyor
    altgrupurunlershadow : "",
    altgrupgruplar : "",
    loginbuttons : "background:#206736; color:white",
    logintexts : "color:#206736",
    urungruplari : "background-color:white", // algruplar ver urunler sayfasinda urun gruplari barinin basligi arka renk
    urungruplaribaslik : "black-text", // algruplar ver urunler sayfasinda urun gruplari barinin basligi text renk
    urungruplarieach : "",
    navbarcolor : 'background:#206736', // bg-secondary
    navbar2color : 'background:#5FA56C', // bg-secondary
    sepetbuttoncolor : 'background:#5FA56C; color:white', // btn-secondary - sepetButton hangi renk ise Sepet sayfasi da ayni renk olacak
    sepetodemepagecolor : 'background:#5FA56C; color:white',
    sepetmodalhead : 'background:#5FA56C; color:white',
    sepetbuttonsepetimegitcolor : 'background:#5FA56C; color:white', // btn-success
    sepetbuttondevametcolor : 'background:white; color:#5FA56C; border:2px solid #5FA56C; font-weight:800', // btn-outline-success
    sepetbuttonremove : 'color:#5FA56C;',
    sepetbuttontablehover : "table-hover",
    urungruplaricolor : 'background:#206736; color:white', // secondary-color
    adetinputcolor : 'background:#FFA700; color:white', // primary-color white-text
    adetinputarasicolor : 'background:#FEF3DD; color:black', // primary-color white-text
    modalheader : "",
    modalbody : "", // ayni zamanda sepetButton,sepet da kullaniliyor
    modalfooter : "",
    whitebutton : "",
    whitetext : "",
    urunpage : "",
    girisyap : "", // giris yap ve kaydol sayfalarinda kullanildi
    girisyapbildiri : "",
    dahafazlagosterbutton : "background:white; color:#5FA56C; border:2px solid #5FA56C; font-weight:800",
    // sayfa ici renkler END
}

const getters = {
    image : state => state.imageurl,
    imagecompany : state => state.imageurlcompany,
    grupimage : state => state.grupimageurl,
    baseUrl : state => state.baseurl,
    kampanyaimage : state => state.kampanyaimageurl,
    serverRequest : state => state.serverrequest,
    bodyColor : state => state.bodycolor,
    gruplarCard : state => state.gruplarcard,
    gruplarAd : state => state.gruplarad,
    altgruplarAd : state => state.altgruplarad,
    altgruplarBaslik : state => state.altgruplarbaslik,
    altgrupUrunlerBar : state => state.altgrupurunlerbar,
    altgrupUrunleer : state => state.altgrupurunleer,
    altgrupUrunlerShadow : state => state.altgrupurunlershadow,
    altgrupGruplar : state => state.altgrupgruplar,
    loginButtons : state => state.loginbuttons,
    loginTexts : state => state.logintexts,
    urunGruplari : state => state.urungruplari,
    urunGruplariBaslik : state => state.urungruplaribaslik,
    urunGruplariEach : state => state.urungruplarieach,
    navbarColor : state => state.navbarcolor,
    navbar2Color : state => state.navbar2color,
    sepetButtonColor : state => state.sepetbuttoncolor,
    sepetOdemePageColor : state => state.sepetodemepagecolor,
    sepetModalHead : state => state.sepetmodalhead,
    sepetButtonSepetimeGitColor : state => state.sepetbuttonsepetimegitcolor,
    sepetButtonDevamEtColor : state => state.sepetbuttondevametcolor,
    sepetButtonRemove : state => state.sepetbuttonremove,
    sepetButtonTableHover : state => state.sepetbuttontablehover,
    urunGruplariColor : state => state.urungruplaricolor,
    adetInputColor : state => state.adetinputcolor,
    adetInputArasiColor : state => state.adetinputarasicolor,
    modalHeader : state => state.modalheader,
    modalBody : state => state.modalbody,
    modalFooter : state => state.modalfooter,
    whiteButton : state => state.whitebutton,
    whiteText : state => state.whitetext,
    urunPage : state => state.urunpage,
    girisYap : state => state.girisyap,
    girisYapBildiri : state => state.girisyapbildiri,
    dahaFazlaGosterButton : state => state.dahafazlagosterbutton,
}

const actions = {
    fetchnavbarColor (context) {
        context.commit('change')
    }
}

const mutations = {
    change (state) {
        if(localStorage.getItem("theme") == "dark"){
            state.navbarcolor = "elegant-color-dark"
            state.sepetbuttoncolor = "btn-dark"
            state.sepetmodalhead = "elegant-color-dark"
            state.sepetbuttonsepetimegitcolor = "btn-dark"
            state.sepetbuttondevametcolor = "btn-dark"
            state.sepetbuttonremove = "white-text"
            state.sepetbuttontablehover = ""
            state.bodycolor = "background-color:#2E2E2E;padding-bottom:114px" // padding-bottom sayfanin en altinda gorunen beyaz alanin gozukmemesi icin
            state.gruplarcard = "background-color:white"
            state.gruplarad = "black-text"
            state.altgruplarad = "white-text"
            state.altgruplarbaslik = "baslik-dark"
            state.altgrupurunlerbar = "baslik-dark"
            state.altgrupurunleer = "background-color:#2B2B2B;color:white"
            state.altgrupurunlershadow = "box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);"
            state.altgrupgruplar = "background-color: #212121"
            state.urungruplaricolor = "elegant-color-dark"
            state.urungruplari = "background-color:#2E2E2E"
            state.urungruplaribaslik = "white-text"
            state.urungruplarieach = "urun-gruplari-each-dark"
            state.modalheader = "background-color:#212121; color:white;"
            state.modalbody = "background-color:#2E2E2E; color:white;"
            state.modalfooter = "background-color:#212121"
            state.whitebutton = "btn-outline-light"
            state.whitetext = "color:white;"
            state.urunpage = "text-white"
            state.girisyap = "text-white"
            state.girisyapbildiri = "text-white"
            state.dahafazlagosterbutton = "btn-outline-light"
        }
        else{
            state.navbarcolor = "primary-color"
            state.sepetbuttoncolor = "btn-primary"
            state.sepetmodalhead = ""
            state.sepetbuttonsepetimegitcolor = "btn-info"
            state.sepetbuttondevametcolor = "btn-outline-info"
            state.sepetbuttonremove = ""
            state.sepetbuttontablehover = "table-hover"
            state.bodycolor = "background-color:white"
            state.gruplarcard = "background-color:white"
            state.gruplarad = ""
            state.altgruplarad = ""
            state.altgruplarbaslik = ""
            state.altgrupurunlerbar = ""
            state.altgrupurunleer = ""
            state.altgrupurunlershadow = ""
            state.altgrupgruplar = ""
            state.urungruplaricolor = "primary-color"
            state.urungruplari = "background-color:white"
            state.urungruplaribaslik = "black-text"
            state.urungruplarieach = ""
            state.modalheader = ""
            state.modalbody = ""
            state.modalfooter = ""
            state.whitebutton = ""
            state.whitetext = ""
            state.urunpage = ""
            state.girisyap = ""
            state.girisyapbildiri = ""
            state.dahafazlagosterbutton = "btn-outline-primary"
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}