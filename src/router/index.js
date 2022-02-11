import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/subelerimiz',
    name: 'Subelerimiz',
    component: () => import(/* webpackChunkName: "subelerimiz" */"../views/Subelerimiz"),
    meta: {
      title: 'Şubelerimiz'
    }
  },
  {
    path: '/kategori/:id/:g_ad',
    name: 'AltgruplarPage',
    props : true,
    component: () => import(/* webpackChunkName: "altgruplarpage" */"../views/AltgruplarPage"),
  },
  {
    path: '/kategori/:g_id/:id/:g_ad/:altg_ad',
    name: 'UrunlerPage',
    props : true,
    component: () => import(/* webpackChunkName: "urunlerpage" */"../views/UrunlerPage"),
  },
  {
    path: '/sepet',
    name: 'SepetPage',
    props : true,
    component: () => import(/* webpackChunkName: "sepetpage" */"../views/SepetPage"),
  },
  {
    path: '/sepet/odeme',
    name: 'SepetOdemePage',
    props : true,
    component: () => import(/* webpackChunkName: "sepetodemepage" */"../views/SepetOdemePage"),
    beforeEnter: (to, from, next) => {
      let sayfa_izin = document.cookie
      if (sayfa_izin.includes("uid")){ // eger cookie-de uid bilgisi varsa profil sayfasi goruntulenebilecek
        next()
      }
      else { // eger uid bilgisi yoksa Giris sayfasina yonlendirilecek
        // kullanici kaydi olmadan sepet odeme sayfasina giris yapmayi denemisse haberim olsun diye locale deger yazilir
        localStorage.setItem("sptdm","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
        next({ name: 'GirisYapPage' })
      }
    },
  },
  {
    path: '/sepet/odeme/basarili',
    name: 'SepetOdemeBasariliPage',
    props : true,
    component: () => import(/* webpackChunkName: "sepetodemebasarilipage" */"../views/SepetOdemeBasariliPage"),
  },
  {
    path: '/girisyap',
    name: 'GirisYapPage',
    props : true,
    component: () => import(/* webpackChunkName: "girisyappage" */"../views/GirisYapPage"),
    // meta: {
    //   title: 'Giriş Yap',
    //   // script: [
    //   //   { src: '/assets/js/cryptojs-aes.min.js', body: true },
    //   //   { src: '/assets/js/cryptojs-aes-format.js', body: true },
    //   // ]
    // }
  },
  {
    path: '/kaydol',
    name: 'KaydolPage',
    props : true,
    component: () => import(/* webpackChunkName: "kaydolpage" */"../views/KaydolPage"),
  },
  {
    path: '/profilim',
    name: 'ProfilPage',
    props : true,
    component: () => import(/* webpackChunkName: "profilpage" */"../views/ProfilPage"),
    beforeEnter: (to, from, next) => {
      // let sayfa_izin = document.cookie
      var getUserInLocal = localStorage.getItem("user")
      if (getUserInLocal != null){ // local-de giris yaptiktan sonra donen user bilgisi var mi diye kontrol edilir
        next()
      }
      else { // eger uid bilgisi yoksa Giris sayfasina yonlendirilecek
        // kullanici kaydi olmadan profilim sayfasina giris yapmayi denemisse haberim olsun diye locale deger yazilir
        localStorage.setItem("prf","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
        next({ name: 'GirisYapPage' })
      }
    },
  },
  {
    path: '/profil/adreslerim',
    name: 'ProfilAdreslerimPage',
    props : true,
    component: () => import(/* webpackChunkName: "profiladreslerimpage" */"../views/ProfilAdreslerimPage"),
    beforeEnter: (to, from, next) => {
      var getUserInLocal = localStorage.getItem("user")
      if (getUserInLocal != null){
        next()
      }
      else {
        localStorage.setItem("prf","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
        next({ name: 'GirisYapPage' })
      }
    },
  },
  {
    path: '/profil/faturalarim',
    name: 'ProfilFaturalarimPage',
    props : true,
    component: () => import(/* webpackChunkName: "profilfaturalarimpage" */"../views/ProfilFaturalarimPage"),
    beforeEnter: (to, from, next) => {
      var getUserInLocal = localStorage.getItem("user")
      if (getUserInLocal != null){
        next()
      }
      else {
        localStorage.setItem("prf","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
        next({ name: 'GirisYapPage' })
      }
    },
  },
  {
    path: '/profil/siparislerim',
    name: 'ProfilSiparislerimPage',
    props : true,
    component: () => import(/* webpackChunkName: "profilsiparislerimpage" */"../views/ProfilSiparislerimPage"),
    beforeEnter: (to, from, next) => {
      var getUserInLocal = localStorage.getItem("user")
      if (getUserInLocal != null){
        next()
      }
      else {
        localStorage.setItem("prf","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
        next({ name: 'GirisYapPage' })
      }
    },
  },
  {
    path: '/profil/sifremi-degistir',
    name: 'ProfilSifremiDegistirPage',
    props : true,
    component: () => import(/* webpackChunkName: "profilsifremidegistirpage" */"../views/ProfilSifremiDegistirPage"),
    beforeEnter: (to, from, next) => {
      var getUserInLocal = localStorage.getItem("user")
      if (getUserInLocal != null){
        next()
      }
      else {
        localStorage.setItem("prf","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
        next({ name: 'GirisYapPage' })
      }
    },
  },
  {
    path: '/profil/ayarlarim',
    name: 'ProfilAyarlarPage',
    props : true,
    component: () => import(/* webpackChunkName: "profilayarlarpage" */"../views/ProfilAyarlarPage"),
    beforeEnter: (to, from, next) => {
      var getUserInLocal = localStorage.getItem("user")
      if (getUserInLocal != null){
        next()
      }
      else {
        localStorage.setItem("prf","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
        next({ name: 'GirisYapPage' })
      }
    },
  },
  {
    path: '/profil/geri-bildirim',
    name: 'ProfilGeriBildirimPage',
    props : true,
    component: () => import(/* webpackChunkName: "profilgeribildirimpage" */"../views/ProfilGeriBildirimPage"),
    beforeEnter: (to, from, next) => {
      // let sayfa_izin = document.cookie
      var getUserInLocal = localStorage.getItem("user")
      if (getUserInLocal != null){ // local-de giris yaptiktan sonra donen user bilgisi var mi diye kontrol edilir
        next()
      }
      else { // eger uid bilgisi yoksa Giris sayfasina yonlendirilecek
        // kullanici kaydi olmadan profilim sayfasina giris yapmayi denemisse haberim olsun diye locale deger yazilir
        localStorage.setItem("prf","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
        next({ name: 'GirisYapPage' })
      }
    },
  },
  {
    path: '/onay',
    name: 'VerifyPage',
    props : true,
    component: () => import(/* webpackChunkName: "verifypage" */"../views/VerifyPage"),
  },
  {
    path: '/sifremi-unuttum',
    name: 'SifremiUnuttumTelPage',
    props : true,
    component: () => import(/* webpackChunkName: "sifremiunuttumtelpage" */"../views/SifremiUnuttumTelPage"),
  },
  {
    path: '/sifremi-onayla',
    name: 'SifremiUnuttumPassPage',
    props : true,
    component: () => import(/* webpackChunkName: "sifremiunuttumpasspage" */"../views/SifremiUnuttumPassPage"),
  },
  {
    path: '/urun/:urun_ad/:g_id/:g_ad/:altg_id', // hata burda /:altg_ad
    name: 'UrunPage',
    props : true,
    component: () => import(/* webpackChunkName: "urunpage" */"../views/UrunPage"),
  },
  {
    path: '/arama/:aratilan',
    name: 'AramaPage',
    props : true,
    component: () => import(/* webpackChunkName: "aramapage" */"../views/AramaPage"),
  },
  {
    path: '/kullanim-sartlari',
    name: 'KullanimSartlariPage',
    props : true,
    component: () => import(/* webpackChunkName: "kullanimsartlaripage" */"../views/KullanimSartlariPage"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import(/* webpackChunkName: "notfound" */"../views/NotFound"),
  },
]

const router = new VueRouter({
  mode: 'history', // for remove hashbang
  routes
})

// Sitemap cikarmak icin bazi ornek fonksiyonlar START
// // getRoutesList fonksiyonu, uygulama icindeki tum router-lari donduren bir dizi dondurur
// function getRoutesList(routes, pre) {
//   return routes.reduce((array, route) => {
//     const path = `${pre}${route.path}`;

//     if (route.path !== '*') {
//       array.push(path);
//     }

//     if (route.children) {
//       array.push(...getRoutesList(route.children, `${path}/`));
//     }
//     return array;
//   }, []);
// }
// getRoutesList(router.options.routes, 'http://localhost:8080');

// // getRoutesList ayrıca XML site haritası formatı oluşturmak için de kullanılabilir.
// function getRoutesXML() {
//   const list = getRoutesList(router.options.routes, 'http://localhost:8080')
//     .map(route => `<url><loc>${route}</loc></url>`)
//     .join('\r\n');
//   // console.log(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//   //   ${list}
//   // </urlset>`)
//   return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//     ${list}
//   </urlset>`;
// }
// getRoutesXML();
// Sitemap cikarmak icin bazi ornek fonksiyonlar END

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Günkay Sanal Market | Sanal Marketin Tek Adresi | Günkay market | Günkay Mağazacılık';
  next();
})

export default router
