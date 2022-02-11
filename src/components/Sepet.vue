Bu sayfadaki puf noktalar:
1 - Bu sayfa SepetButton-da sepetime git-e tiklanildigi zaman acilacak olan SepetPage-in child-i
2 - child-i SepetAdetInput
3 - props ile childe veri aktarimi var
4 - mobil uyumlu olsun diye kontrol var (bu yuzden <SepetAdetInput /> iki kere kullanildi. ileride kafa karismasin)
5 - bu sayfada yer alan; urun adetinin arttirilip, azaltilmasi icin input alani ve kontrolleri SepetAdetInput-da yer almaktadir
6 - sayfa icinde gerek gorulen yerlere yorum satirlari birakildi zaten (detaylar yorumlar okunarak da anlasilabilir)
NOT : eger parent-ten child-a veri aktarilacaksa props kullanilir. ve bu props alani parent-te degil de child-da tanimlanir.
      parent-te sadece :sepet="sepet" gibi deger child-in yolunda yazilir.
7 - 05.09.2021 tarihinden itibaren getirilen yeni ozellik : sepet ozeti alani mobilde bottom nav menunun uzerinde gorunecek sekilde ayarlandi.
    bu degisiklik oncesi sepet ozeti alani uzerinde yapilan degisiklikler(media query-ler mesela) kaldirilmadi.
8 - covid mesajini gostermek icin gerekli sorgu her sayfa render oldugunda gitmesin diye created aninda kontroller yapildi.
    sayfa created oldugunda;
    - ilk defa render olmussa sorgu yapilir ve sorgu sonucu global degiskende tutulur. (others.js icindeki parameterstab)
    - ikinci kez render olmussa sorgu yerine covid mesaji, hizmet bedeli gibi degerlerin ekranda gorunmesi icin getParameters() fonk cagrilir
    getParameters() fonk icinde daha onceden sorgu esnasinda global degiskene atanmis sonuc uzerinden covid mesaji, hizmet bedeli gibi atamalar yapildi
9 - ONEMLI: getGoogleGeocodeWaypoints() fonku icindeki yorum satirlari silinmesin. ileride lazim olabilir.
    fonkun ne ise yaradigi da fonk icindeki yorum satirlarinda yazildi. bakilabilir anlasilmadigi taktirde
<template>
    <div v-cloak>
        <!-- urun resmine tiklandiginda ModalUrunImage.vue-ya gonderilecek urun resim bilgileri START -->
        <div v-if="showModalUrunImageComponent">
            <ModalUrunImage :modalUrunResim="modalUrunResim"/>
        </div>
        <!-- urun resmine tiklandiginda ModalUrunImage.vue-ya gonderilecek urun resim bilgileri END -->

        {{sepetBosMu()}}
        <!-- Sepet indirim kuponu alani kullanimdan kaldirilmak yerine gecerlilik fiyati cok yuksege alindi. -->
        <div v-if="rastgele_indirim_kodun_bekleme_suresi">
            <!-- props(rastgele_indirim_kodu) ile child-a data gonderildi. Kuponun kopyalandi bilgisi de emit(kopyalandimi) ile geri donduruldu -->
            <SepetIndirimKuponu :rastgele_indirim_kodu="rastgele_indirim_kodu" @kopyalandimi="kuponKopyalandimi" />
        </div>
        <!-- Covid ile ilgili alan bildiri mesaji START -->
        <div v-if="!showSepetBos" class="row m-4">
            <div class="col-md-12">
                <div class="card rgba-red-strong text-center z-depth-0">
                    <div class="card-body">
                        <p class="white-text mb-0 covid-bildiri">
                            <img src="@/assets/svg/covid1.svg" style="margin:-20px 0 -20px 0" width="40" height="40" alt="">
                            {{covidMesaji}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- END -->
        <div class="row m-4">
            <div id="sepet-col9" class="col-md-9">
                
                <div class="card mb-4">
                    <div class="card-body" :style="modalHeader">
                        <div v-if="showSepetBos" class="text-center m-5 text-muted">
                            {{ $t('There are no items in your cart') }}.
                            <span @click="goBack()" class="geri-don"><i class="fas fa-angle-left"></i> Geri dön</span>
                            <p><router-link to="/">{{ $t('Back to Home Page') }}</router-link></p>
                        </div>
                        <div v-if="!showSepetBos" class="table-responsive-lg resp-sepet" :style="modalBody"> <!-- table-responsive idi, table-responsive-lg yapildi -->

                            <table class="table product-table" :style="whiteText">
                                <thead class="mdb-color lighten-5">
                                    <tr :style="modalHeader">
                                        <th>
                                            <i data-toggle="modal" data-target="#sepetiTemizleDesktop" class="far fa-2x fa-trash-alt trash-icon"></i>
                                            <!-- Sepeti temizle modal Top -->
                                            <div class="modal fade top" id="sepetiTemizleDesktop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                <div class="modal-dialog modal-frame modal-top" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-body">
                                                            <div class="row d-flex justify-content-center align-items-start">
                                                                <p class="pt-3 pr-2 text-dark">
                                                                    Sepeti temizlemek istediğinize emin misiniz?
                                                                </p>
                                                                <button type="button" class="btn z-depth-0 btn-light" data-dismiss="modal">Hayır</button>
                                                                <button type="button" class="btn z-depth-0 btn-primary" data-dismiss="modal" @click="sepetiTemizle()">Evet</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Sepeti temizle modal Top -->
                                            <span class="sepeti-temizle">{{ $t('Delete Cart') }}</span>
                                        </th>
                                        <th class="font-weight-bold">
                                        <strong>{{ $t('Product Name') }}</strong>
                                        </th>
                                        <th></th>
                                        <th class="font-weight-bold">
                                        <strong>{{ $t('Piece') }}</strong>
                                        </th>
                                        <th></th>
                                        <th class="font-weight-bold">
                                        <strong>{{ $t('Price') }}</strong>
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="sepet in sepetim" :key="sepet.id">
                                        <!-- arama yaparken urun bilgisi icinde stokkod degil de stok_kodu bilgisi oldugu icin sepet buttonda gosterirken resim bulunsun diye eklenen kontrol -->
                                        <th v-if="sepet.barkod!=null" scope="row">
                                            <div class="resim-border d-flex justify-content-center align-items-center waves-effect waves-light" @click="modalaUrunResmiEkle(sepet)" data-toggle="modal" data-target="#modalUrunImage">
                                                <img v-if="sepet.barkod.length < 8" :src="imagecompany + ushp + '/' + sepet.barkod + '.jpeg?' + sepet.imageupdate" width="70" height="70" class="img-fluid z-depth-0 img-width" alt="" title="Görüntülemek için tıklayın">
                                                <img v-else :src="image + sepet.barkod + '.jpeg?' + sepet.imageupdate" width="70" height="70" class="img-fluid z-depth-0 img-width" alt="" title="Görüntülemek için tıklayın">
                                            </div>
                                        </th>
                                        <th v-if="sepet.barkod==null" scope="row">
                                            <div class="resim-border d-flex justify-content-center align-items-center">
                                                <img :src="image + sepet.barkod + '.jpeg?' + sepet.imageupdate" width="70" height="70" class="img-fluid z-depth-0 img-width" alt="">
                                            </div>
                                        </th>
                                        <td style="min-width:280px;max-width:280px;"> <!-- sikinti olursa style kaldirilabilir -->
                                        <h6 class="mt-3">
                                            <span v-if="sepet.kampanyalimi==='1' || sepet.kampanyalimi===1" class="kapmanyali-urun">Kampanya</span>
                                            <strong>{{ sepet.ad }}</strong>
                                        </h6>
                                        <p class="text-muted">{{ $t('Unit price') }} : {{ sepet.satisfiyat }} TL</p>
                                        </td>
                                        <td></td>
                                        <td>
                                        <!-- props ile sepet ve sepetim SepetAdetInput.vue-ya gecti -->
                                        <SepetAdetInput :sepet="sepet" :sepetimm="sepetim" @urunlertoplamtutar="urunlerToplamTutar" @promosyonindirimidahiltutar="promosyonIndirimiDahilTutar" @promosyonindirimi="promosyonIndirimi" @sepetozetitoplamtutar="sepetOzetiToplamTutar" />
                                        </td>
                                        <td></td>
                                        <td>
                                        <strong>{{ (sepet.satisfiyat * sepet.adet).toFixed(2) }} TL</strong>
                                        <p class="text-muted"><small>({{ sepet.adet }} x {{ sepet.satisfiyat }} TL)</small></p>
                                        </td>
                                        <td>
                                        <button @click="removeUrun(sepet)" type="button" class="btn z-depth-0 btn-sm" :style="sepetButtonColor" data-toggle="tooltip" data-placement="top"
                                            title="Ürünü kaldır">X
                                        </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colspan="2">
                                            <button @click="$router.go(-1)" type="button" class="btn z-depth-0 btn-light"><i class="fas fa-angle-left"></i>&nbsp;{{ $t('Continue To The Shopping') }}</button>
                                        </td>
                                        <td>
                                        <h4 class="mt-2">
                                        </h4>
                                        </td>
                                        <td colspan="3" class="text-right">
                                            <h6 class="font-weight-bold">{{ urunler_toplam_tutar }} TL</h6>
                                        </td>
                                        <td colspan="1" class="text-right">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- sayfa boyutu 500-un altina indiginde gorunecek START -->
                        <div v-if="!showSepetBos" class="table-responsive-lg resp-sepet-mobile" :style="modalBody">
                            <table class="table product-table" :style="whiteText">
                                <thead class="mdb-color lighten-5">
                                    <tr :style="modalHeader">
                                        <th></th>
                                        <th class="font-weight-bold">
                                        <strong>{{ $t('Product information') }}</strong>
                                        </th>
                                        <th>
                                            <i data-toggle="modal" data-target="#sepetiTemizleMobile" class="far fa-2x fa-trash-alt trash-icon ml-3"></i>
                                            <!-- Sepeti temizle modal Top -->
                                            <div class="modal fade top" id="sepetiTemizleMobile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                <div class="modal-dialog modal-frame modal-top" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-body">
                                                            <div class="row d-flex justify-content-center align-items-start">
                                                                <p class="pt-3 pr-2 text-dark">
                                                                    Sepeti temizlemek istediğinize emin misiniz?
                                                                </p>
                                                                <button type="button" class="btn z-depth-0 btn-light" data-dismiss="modal">Hayır</button>
                                                                <button type="button" class="btn z-depth-0 btn-primary" data-dismiss="modal" @click="sepetiTemizle()">Evet</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Sepeti temizle modal Top -->
                                            <span class="sepeti-temizle-mobil">{{ $t('Delete Cart') }}</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="sepet in sepetim" :key="sepet.id">
                                        <td></td>
                                        <td class="resp-sepet-mobile-font">
                                            <h6 class="mt-3 resp-sepet-mobile-fontad">
                                                <span v-if="sepet.kampanyalimi==='1' || sepet.kampanyalimi===1" class="kapmanyali-urun">Kampanya</span>
                                                <strong>{{ sepet.ad }}</strong>
                                            </h6>
                                            <p class="text-muted">{{ $t('Unit price') }} : {{ sepet.satisfiyat }} TL</p>
                                            <!-- props ile sepet ve sepetim SepetAdetInput.vue-ya gecti -->
                                            <SepetAdetInput :sepet="sepet" :sepetimm="sepetim" @urunlertoplamtutar="urunlerToplamTutar" @promosyonindirimidahiltutar="promosyonIndirimiDahilTutar" @promosyonindirimi="promosyonIndirimi" @sepetozetitoplamtutar="sepetOzetiToplamTutar" />
                                            <strong>{{ (sepet.satisfiyat * sepet.adet).toFixed(2) }} TL </strong>
                                            <span class="text-muted"><small>({{ sepet.adet }} x {{ sepet.satisfiyat }} TL)</small></span>
                                        </td>
                                        <td>
                                            <button @click="removeUrun(sepet)" type="button" class="btn z-depth-0 btn-sm" :style="sepetButtonColor" data-toggle="tooltip" data-placement="top"
                                                title="Ürünü kaldır">X
                                            </button>
                                            <!-- arama yaparken urun bilgisi icinde stokkod degil de stok_kodu bilgisi oldugu icin sepet buttonda gosterirken resim bulunsun diye eklenen kontrol -->
                                            <p v-if="sepet.barkod!=null" class="resim-border d-flex justify-content-center align-items-center waves-effect waves-light" @click="modalaUrunResmiEkle(sepet)" data-toggle="modal" data-target="#modalUrunImage">
                                                <img v-if="sepet.barkod.length < 8" :src="imagecompany + ushp + '/' + sepet.barkod + '.jpeg?' + sepet.imageupdate" width="70" height="70" class="img-fluid z-depth-0 img-width-mobile" alt="">
                                                <img v-else :src="image + sepet.barkod + '.jpeg?' + sepet.imageupdate" width="70" height="70" class="img-fluid z-depth-0 img-width-mobile" alt="">
                                            </p>
                                            <p v-if="sepet.barkod==null" class="resim-border d-flex justify-content-center align-items-center">
                                                <img :src="image + sepet.barkod + '.jpeg?' + sepet.imageupdate" width="70" height="70" class="img-fluid z-depth-0 img-width-mobile" alt="">
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <button @click="$router.go(-1)" type="button" class="btn z-depth-0 btn-light resp-sepet-mobile-button">{{ $t('Continue To The Shopping') }}</button>
                                        </td>
                                        <td colspan="1" class="text-left">
                                            <h6 class="font-weight-bold">{{ urunler_toplam_tutar }} TL</h6>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- sayfa boyutu 500-un altina indiginde gorunecek END -->
                    </div>
                </div>
            </div>
            <!-- Sepet ozeti START -->
            <div class="col-md-3 sepet-ozeti">
                <div :style="altgrupUrunlerShadow" v-if="showSepetBos" class="card mb-4">
                    <div :style="altgrupUrunleer" class="card-body">
                        <h5 class="mb-3">{{ $t('Cart summary') }}</h5>
                        <div class="m-4 text-muted">
                            {{ $t('Your cart is empty') }} <br><br>
                        </div>
                    </div>
                </div>
                <div class="sticky">
                    <div v-if="!showSepetBos" class="card mb-4" :style="altgrupUrunlerShadow" id="sepetOzetiID">
                        <div class="card-body font-size-13" :style="altgrupUrunleer">
                            <h5 class="mb-3">{{ $t('Cart summary') }}</h5>
                            <!-- Eger kupon kodu kullanildiysa burasi gorunecek START -->
                            <transition name="fade">
                                <div v-if="get_localstorage_kupon()=='true'" class="card indigo text-center z-depth-0 mb-1">
                                    <div class="card-body">
                                        <p class="white-text mb-0">{{ indirim_kodu_degeri }} TL'lik indirim kuponu şu an sepetinizde kullanılmaktadır.</p>
                                        <a @click="indirimKoduCikar()" class="btn btn-success btn-sm mt-2">kuponu çıkar</a>
                                    </div>
                                </div>
                            </transition>
                            <!-- Eger kupon kodu kullanildiysa burasi gorunecek END -->
                            <ul class="list-group list-group-flush">
                                <li :style="altgrupUrunleer" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    {{ $t('Subtotal') }}
                                    <span>{{ urunler_toplam_tutar }} TL</span>
                                </li>
                                <li :style="altgrupUrunleer" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    {{ $t('Promotional discount') }}
                                    <span>- {{ promosyon_indirimi.toFixed(2) }} TL</span>
                                </li>
                                <li :style="altgrupUrunleer" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    {{ $t('Reduced amount') }}
                                    <span>{{ promosyon_indirimi_dahil_tutar }} TL</span>
                                </li>
                                <li :style="altgrupUrunleer" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    {{ $t('Service fee') }}
                                    <!-- Hizmet alindiysa uzeri cizgili -->
                                    <div v-if="hizmetBedeliAlindiMi=='0'">
                                        <span style="text-decoration: line-through;">{{ parseFloat(hizmetBedeli).toFixed(2) }} TL</span>
                                    </div>
                                    <!-- Alinmadiysa normal gider olarak gosterilir ve asagi fonkiyonlarda toplam tutara eklenir -->
                                    <div v-else-if="hizmetBedeliAlindiMi=='1'">
                                        <span>{{ parseFloat(hizmetBedeli).toFixed(2) }} TL</span>
                                    </div>
                                </li>
                                <transition name="fade">
                                    <li :style="altgrupUrunleer" v-if="get_localstorage_kupon()=='true'" class="teal-text list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Kupon
                                        <span>- {{ indirim_kodu_degeri.toFixed(2) }} TL</span>
                                    </li>
                                </transition>
                                <li :style="altgrupUrunleer" class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    {{ $t('Shipping') }}
                                    <span>Günkay Sanal Market</span>
                                </li>
                                <!-- "border-0" ile toplam altindaki cizgi kontrolu -->
                                <li :style="altgrupUrunleer" class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <div>
                                        <strong>{{ $t('Total') }}</strong>
                                        <strong v-if="get_localstorage_kupon()=='true'"><p class="mb-0">(Kupon dahil)</p></strong>
                                    </div>
                                    <span><strong>{{ sepetOzeti_toplam_tutar > 0 ? sepetOzeti_toplam_tutar : 0 }} TL</strong></span>
                                </li>
                                <li v-if="hizmetBedeliAlindiMi=='0'" style="color:#00C851" class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Kazancınız
                                    <div>
                                        <span>{{ parseFloat(hizmetBedeli).toFixed(2) }} TL</span>
                                    </div>
                                </li>
                            </ul>
                            

                            <div v-if="showMinSiparisTutari" class="minimum-siparis-tutari">
                                Sepet tutarınız <u>{{minimumSiparisTutari}} TL</u> ve üzerİ olmalıdır.
                            </div>
                            <!-- END -->

                            <button @click="alisverisiTamamla()" type="button" class="btn z-depth-0 btn-block waves-effect waves-light resp-alisveristamamla-button" :style="sepetButtonColor">{{ $t('Complete shopping') }}</button>

                            <div v-if="sepetOdemeKayitliAsama.varMi=='evet'" @click="kaldigimYerdenDevamEt()" class="kaldigim-yerden">
                                Kaldığım yerden devam et
                            </div>
                            
                        </div>
                    </div>
                    
                    <!-- indirim kuponu kullan alani simdilik gerekli olmadigi icin kullanilmiyor (display bu yuzden none) -->
                    <div style="display:none" :style="altgrupUrunlerShadow" v-if="!showSepetBos" class="card mb-4" :class="classRainbow" @click="removeRainbow()">
                        <div :style="altgrupUrunleer" v-if="show_indirim_kodu_ekleyin" class="card-body font-size-13">
                            <a class="dark-grey-text d-flex justify-content-between" data-toggle="collapse" href="#collapseExample"
                                aria-expanded="false" aria-controls="collapseExample">
                                İndirim kodu ekleyin (isteğe bağlı)
                                <span><i class="fas fa-chevron-down pt-1"></i></span>
                            </a>
                            <div class="collapse" id="collapseExample">
                                <div class="mt-3">
                                    <div class="md-form md-outline mb-0">
                                        <!-- Eger indirim kodu kopyalandiysa gorunecek alan START -->
                                        <div v-if="kupon_kopyalandimi==true">
                                            <a @click="kuponuYapistir()" class="text-muted" style="font-size:11px;">YAPIŞTIR</a>
                                        </div>
                                        <!-- Eger indirim kodu kopyalandiysa gorunecek alan END -->
                                        <input type="text" v-model="indirim_kodu_alani" id="discount-code" class="form-control font-weight-light"
                                        placeholder="İndirim kodunu girin">
                                    </div>
                                    <!-- Indirim kodu alani START -->
                                    <div class="text-muted" style="font-size:10px;">{{indirimKodu()}}</div>
                                    <div v-if="!show_indirim_kupon">
                                        <div v-if="show_indirim_kodu_icerik" class="card indigo text-center z-depth-2">
                                            <div class="card-body">
                                                <h4 class="text-uppercase font-weight-bold amber-text mt-2 mb-3"><strong>Tebrİkler</strong></h4>
                                                <p class="white-text mb-0">{{ indirim_kodu_degeri }} TL değerinde indirim kuponu kazandınız.</p>
                                                <a @click="indirimKoduKullan()" class="btn btn-success btn-sm mt-2">kuponu kullan</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Indirim kodu alani END -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sepet ozeti END -->

            <!-- Sepet ozeti mobil gorunum START -->
            <div v-if="!showSepetBos" class="sepet-ozeti-mobil">
                <transition name="fade">
                    <div v-if="showSepetOzetiMobil" class="sepet-ozeti-mobil-icerik">
                        <div class="d-flex justify-content-between">
                            <div>{{ $t('Subtotal') }}</div>
                            <div>{{ urunler_toplam_tutar }} TL</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>{{ $t('Service fee') }}</div>
                            <div>
                                <!-- Hizmet alindiysa uzeri cizgili -->
                                <div class="text-muted" v-if="hizmetBedeliAlindiMi=='0'">
                                    <span style="text-decoration: line-through;">{{ parseFloat(hizmetBedeli).toFixed(2) }} TL</span>
                                </div>
                                <!-- Alinmadiysa normal gider olarak gosterilir ve asagi fonkiyonlarda toplam tutara eklenir -->
                                <div class="text-muted" v-else-if="hizmetBedeliAlindiMi=='1'">
                                    <span>{{ parseFloat(hizmetBedeli).toFixed(2) }} TL</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between" style="color:#00C851">
                            <div>Kazancınız</div>
                            <div>{{ parseFloat(hizmetBedeli).toFixed(2) }} TL</div>
                        </div>
                    </div>
                </transition>
                <div v-if="showMinSiparisTutari" class="minimum-siparis-tutari-mobil">
                    Sepet tutarınız <u>{{minimumSiparisTutari}} TL</u> ve üzerİ olmalıdır.
                </div>
                <div class="sepet-ozeti-mobil-main d-flex justify-content-between align-items-center">
                    <div></div>
                    <div @click="sepetOzetiFonk()" class="sepet-ozeti-mobil-icon">
                        <i class="fas fa-angle-up" :class="sepetOzetiMobilIcon"></i>
                    </div>
                    <div @click="sepetOzetiFonk()" class="sepet-ozeti-mobil-tutar">
                        Toplam <br>
                        <span>{{ sepetOzeti_toplam_tutar > 0 ? sepetOzeti_toplam_tutar : 0 }} TL</span>
                    </div>
                    <div></div>
                    <div></div>
                    <!-- kayitli asama varsa START -->
                    <div v-if="sepetOdemeKayitliAsama.varMi=='evet'" class="mobil-kaldigim-yerden">
                        <img src="@/assets/svg/kaldigim-yerden.svg" width="30" height="30" data-toggle="modal" data-target="#MobilKaldigimYerden" alt="">
                        <!-- mobil gorunumde alisverisi tamamla butonunun yanindaki svg tiklandiginda acilacak modal START -->
                        <div class="modal fade top" id="MobilKaldigimYerden" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-full-height modal-top" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title w-100 d-flex justify-content-center" id="myModalLabel">Bilgilendirme</h4>
                                        <button type="button" class="close z-depth-0" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="d-flex justify-content-center">Sepet ödeme sayfasında yaptığınız en son değişiklikler kaydedilmiş. Kaldığınız yerden devam etmek istiyor musunuz?</div>
                                    </div>
                                    <div class="modal-footer justify-content-center">
                                        <button type="button" class="btn z-depth-0 btn-light" data-dismiss="modal">Hayır</button>
                                        <button @click="kaldigimYerdenDevamEt()" type="button" class="btn z-depth-0 btn-primary" data-dismiss="modal">Evet</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- mobil gorunumde alisverisi tamamla butonunun yanindaki svg tiklandiginda acilacak modal END -->
                    </div>
                    <div v-else></div>
                    <!-- kayitli asama varsa END -->
                    <div class="sepet-ozeti-mobil-button">
                        <button @click="alisverisiTamamla()" type="button" class="btn z-depth-0 btn-block waves-effect waves-light resp-alisveristamamla-button" :style="sepetButtonColor">{{ $t('Complete shopping') }}</button>
                    </div>
                    <div></div>
                </div>
            </div>
            <!-- Sepet ozeti mobil gorunum END -->

            <UrunSilindiMesaji :showUrunSilindi="showUrunSilindi" :silinenUrun="silinenUrun" :silinenUrunAdet="silinenUrunAdet" @urunsilindi="urunsilindiMi" :myTimeOut="myTimeOut" :birimAdetKg="birimAdetKg" />
            <UrunFiyatiGuncellendiMesaji />
            
        </div>
    </div>
</template>

<script>
import SepetIndirimKuponu from "@/components/SepetIndirimKuponu"
import SepetAdetInput from "@/components/SepetAdetInput"
import UrunSilindiMesaji from "@/components/UrunSilindiMesaji"
import UrunFiyatiGuncellendiMesaji from "@/components/UrunFiyatiGuncellendiMesaji"
import ModalUrunImage from "@/components/ModalUrunImage"
import { mapGetters } from 'vuex'
import axios from 'axios'
import {gmapApi} from 'vue2-google-maps'

export default {
    data(){
        return{
            sepetim : '',
            urunler_toplam_tutar : '',
            sepetOzeti_toplam_tutar : '',
            promosyon_indirimi : 0, // promosyon indirimi buradan degisir. gosterirken .toFixed(2) yapiliyor zaten, buradan direkt virgulsuz rakam yazilacak
            promosyon_indirimi_dahil_tutar : '',
            kampanya_indirimi : 0, // sepet odemede gorunecek alan icin
            // indirim kuponu degiskenleri START
            show_indirim_kodu_ekleyin : true, // indirim kodu ekleyin card-inin show/hide-i icin. burasi false olursa bu alan altindaki tum islemler gizlenmis olur bir nevi
            rastgele_indirim_kodu : '', // rastgeleKuponId() fonksiyonu icerisinde rastgele uretilen 10 haneli deger buraya atanir. alan kontrolu de bunun uzerinden yapilir
            rastgele_indirim_kodun_bekleme_suresi : false, // rastgeleKuponId() fonksiyonu icinde rastgele uretilen kod sayfa render olduktan belirli sure sonra gosterilir
            indirim_kodu_alani : '', // v-model-a bagli degisken
            indirim_kodu_degeri : 20,
            show_indirim_kodu_icerik : false,
            show_indirim_kupon : false, // kuponu kullan-a tiklandiginda sepet-te gorunecek, show/hide
            kupon_kopyalandimi : '', // child-dan gelen 'kupon_kopyalandimi' degeri buraya yazilir
            classRainbow : '',
            // indirim kuponu degiskenleri END
            sepettekiUrunSayisi : '',
            showSepetBos : false,
            showUrunSilindi : false,
            silinenUrun : '', // silinecek urunun adi buraya yazilir
            silinenUrunAdet : '', // silinecek urunun adeti buraya yazilir
            minimumOrderPrice : [],
            errors : [],
            minimumSiparisTutari : "",
            showMinSiparisTutari : false,
            covidMesaji : "", // covid mesaji buraya yazilir
            hizmetBedeli : "", // hizmet bedeli fiyati buraya yazilir. su an icin 4.9
            hizmetBedeliAlindiMi : "", // hizmet bedeli alindi mi bilgisi burada tutulur. 0-hayir, 1-evet
            // mobil icin sepet ozeti alani START
            showSepetOzetiMobil : false,
            sepetOzetiMobilIcon : "", // up/down iconlarina rotate efekti icin
            // mobil icin sepet ozeti alani END
            modalUrunResim : "", // urun resmine tiklandiginda tiklanan urunun resmi ModalUrunImage.vue-ya gonderilmesi icin
            showModalUrunImageComponent : false, // resime tiklanmasa bile ModalUrunImage component-i sayfada var oldugu icin barkod.length degeri undefined olarak console-da hata donmesin diye
            // cookie bilgileri START
            ushp : "",
            utel : "",
            uid : "",
            // cookie bilgileri END
            // UrunSilindiMesaji.vue icinde mouse enter oldugunda sayac sifirlansin diye setTimeout degeri myTimeOut-a atanir
            myTimeOut : "", // urun eklendi mesajinin settimeout degeri buraya yazilip, mesaj hover oldugunda bu deger sifirlanir
            birimAdetKg : "", // eklendi mesajinda gosterilecek 1 Adet mi yoksa 1 Kg mi kontrolu icin
            googleRoute : [], // google sorgudan donen sonuc buraya yazilir
            koordinat : "",
        }
    },
    components : {
        SepetIndirimKuponu,
        SepetAdetInput,
        UrunSilindiMesaji,
        UrunFiyatiGuncellendiMesaji,
        ModalUrunImage, // urun resmine tiklandiginda acilmasi icin gereken modal ayri bir component olarak yazildi
    },
    mounted () {
        addEventListener('click', this.get_localstorage_kupon) // localstorage-deki kupon degistiginde tetiklenir
    },
    beforeUnmount () {
        removeEventListener('click', this.get_localstorage_kupon)
    },
    computed : {
        ...mapGetters(["image","imagecompany","sepetButtonColor","modalHeader","modalBody","whiteText",
        "altgrupUrunleer","altgrupUrunlerShadow","sepetOdemeKayit","serverRequest"]), // wglobal.js-den image degeri alinir
        sepetozeti:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.sepetOzeti;
            }
        },
        parameterstab:{ // bu mapgetters ile ayni islevi yapmaktadir. fonksiyona bakildiginda anlasilacagi uzere
            get() {
                return this.$store.getters.parametersTab;
            }
        },
        // sepet odeme sayfasinda kaydedilen asama var mi kontrolu yapilmasi icin
        sepetOdemeKayitliAsama(){
            if(this.sepetOdemeKayit === ""){
                return{varMi : "hayir"}
            }else{
                return{varMi : "evet"}
            }
        },
        google: gmapApi
    },
    methods: {
        // goruntulenmek istenen resime tiklandiginda calisacak olan fonksiyon
        modalaUrunResmiEkle(sepet){
            this.modalUrunResim = sepet
            this.showModalUrunImageComponent = true //..tiklandiginda o resimi goruntulenmesi icin gerekli modal(component)-in show/hide- icin
        },
        sepetOzetiFonk(){
            if(this.showSepetOzetiMobil === false){
                this.showSepetOzetiMobil = true
                this.sepetOzetiMobilIcon = "rotate-down"
                this.showMinSiparisTutari = false // sepet ozet icerigi acildiginda eger minimum siparis tutari bildirisi aciksa kapanmasi icin
            }else{
                this.showSepetOzetiMobil = false
                this.sepetOzetiMobilIcon = "rotate-up"
            }
        },
        goBack(){
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },
        sepetimdekiUrunler(){
            this.sepetim = JSON.parse(localStorage.getItem("sepet"))
            if(localStorage.getItem("sepet") == null){ 
                this.showSepetBos = true
                return 0
            }
            else{
                this.urunler_toplam_tutar = this.sepetim.reduce((acc, item) => acc + parseFloat(item.satisfiyat * item.adet), 0).toFixed(2)
                this.promosyon_indirimi_dahil_tutar = (this.urunler_toplam_tutar - this.promosyon_indirimi).toFixed(2)
                if(this.hizmetBedeliAlindiMi === '1'){ // hizmet bedeli alindiysa toplam tutara eklenir
                    this.sepetOzeti_toplam_tutar = (parseFloat(this.promosyon_indirimi_dahil_tutar) + parseFloat(this.hizmetBedeli)).toFixed(2)
                }else{
                    this.sepetOzeti_toplam_tutar = this.promosyon_indirimi_dahil_tutar
                }
            }
            this.sepettekiUrunSayisi = this.sepetim.length // sepetteki urun sayisini almak icin
            if(this.sepettekiUrunSayisi === 0){ // sepet bossa sepetime git butonu gizlenir
                this.showSepetBos = true
            }else{ // dolu ise gosterilir. else kosulu olmak zorunda, aksi taktirde her sepet butonuna tiklandiginda butonun show/hide-i aninda algilanmiyor
                this.showSepetBos = false
            }
        },
        removeUrun(sepet){
            this.sepetim.splice(this.sepetim.indexOf(sepet), 1); // gecicisepet-ten tiklanilan urun silinir
            localStorage.setItem("sepet", JSON.stringify(this.sepetim)) // gecicisepet-ten tiklanilan urun silindikten sonra localstorage-e gecicisepet-in en son hali atilir. Boylelikle silinmek istenen urun sanki localstorage-den siliniyormus gibi bir yapi ortaya konuldu
            // her urun silindiginde asagidaki bilgiler guncellensin diye START
            this.urunler_toplam_tutar = this.sepetim.reduce((acc, item) => acc + parseFloat(item.satisfiyat * item.adet), 0).toFixed(2)
            this.promosyon_indirimi_dahil_tutar = (this.urunler_toplam_tutar - this.promosyon_indirimi).toFixed(2)
            if(this.hizmetBedeliAlindiMi === '1'){ // hizmet bedeli alindiysa toplam tutara eklenir
                this.sepetOzeti_toplam_tutar = (parseFloat(this.promosyon_indirimi_dahil_tutar) + parseFloat(this.hizmetBedeli)).toFixed(2)
            }else{
                this.sepetOzeti_toplam_tutar = this.promosyon_indirimi_dahil_tutar
            }
            // her urun silindiginde yukaridaki bilgiler guncellensin diye END
            this.silinenUrun = sepet.ad // silinecek urun adi silinenUrun-e yazilir
            this.silinenUrunAdet = sepet.adet // silinecek urun adet silinenUrunAdet-e yazilir
            if(parseInt(sepet.birim) === 0){
                this.birimAdetKg = "adet"
            }else if(parseInt(sepet.birim) === 1){
                this.birimAdetKg = "kg"
            }
            this.showUrunSilindi = true
            if(this.showUrunSilindi==true){
                this.myTimeOut = setTimeout(() => this.showUrunSilindi = false, 2000) // urun silindi mesaji 1 saniye icinde kaybolur
            }
            this.sepetOzetiStore() // sepet odeme sayfasindaki sepet ozeti alani icerisindeki bilgilerin doldurulmasi icin
        },
        indirimKodu(){
            if(this.indirim_kodu_alani == this.rastgele_indirim_kodu && this.indirim_kodu_alani != ''){ // indirim kodu uretilmedigi zaman icindeki deger bos oldugu icin indirim kod alani ile indirim kodu birbirine esit oluyordu yani kosul saglaniyordu. Bundan dolayi VE ile ikinci sart yazildi
                this.show_indirim_kodu_icerik = true
            }else if(this.indirim_kodu_alani == ''){
                return
            }else{
                this.show_indirim_kodu_icerik = false
                return "- GEÇERSİZ KOD"
            }
        },
        indirimKoduKullan(){
            this.show_indirim_kupon = !this.show_indirim_kupon
            localStorage.setItem("kupon", this.show_indirim_kupon)
        },
        indirimKoduCikar(){
            this.show_indirim_kupon = !this.show_indirim_kupon
            localStorage.removeItem("kupon")
        },
        get_localstorage_kupon(){
            if(localStorage.getItem("kupon") == 'true'){
                if(this.hizmetBedeliAlindiMi === '1'){ // hizmet bedeli alindiysa toplam tutara eklenir
                    this.sepetOzeti_toplam_tutar = (parseFloat((this.promosyon_indirimi_dahil_tutar - this.indirim_kodu_degeri).toFixed(2)) + parseFloat(this.hizmetBedeli)).toFixed(2)
                }else{
                    this.sepetOzeti_toplam_tutar = (this.promosyon_indirimi_dahil_tutar - this.indirim_kodu_degeri).toFixed(2)
                }
            }else{
                if(this.hizmetBedeliAlindiMi === '1'){ // hizmet bedeli alindiysa toplam tutara eklenir
                    this.sepetOzeti_toplam_tutar = (parseFloat(this.promosyon_indirimi_dahil_tutar) + parseFloat(this.hizmetBedeli)).toFixed(2)
                }else{
                    this.sepetOzeti_toplam_tutar = this.promosyon_indirimi_dahil_tutar
                }
            }
            return localStorage.kupon
        },
        // sepet indirim kuponu alani kullanimdan kaldirilmak yerine kosul degeri 150 tl-den cok yuksege alindi
        rastgeleKuponId(){ // sepet tutari 150 TL-den fazla oldugunda rastgele indirim kuponu uretilir
            if(this.urunler_toplam_tutar >= 150000){
                setTimeout(() => this.rastgele_indirim_kodun_bekleme_suresi = true, 3000)
                this.rastgele_indirim_kodu = Math.random().toString(36).slice(-10);
                return this.rastgele_indirim_kodu
            }
        },
        kuponKopyalandimi(params){ // SepetIndirimKuponu.vue-dan yani child-dan gelen data kupon_kopyalandimi-ya burada yazilir
            this.kupon_kopyalandimi = params
            this.classRainbow = 'rainbow' // indirim kuponuna tiklandiginda rainbow class-i aktif hale gelecek
        },
        removeRainbow(){
            this.classRainbow = ''
        },
        kuponuYapistir(){ // YAPISTIR-a basildiginda indirim kodu ekleyin alanina indirimli kodu yazar
            this.indirim_kodu_alani = this.rastgele_indirim_kodu
            localStorage.removeItem("k_kopy") // yapistira basildiktan sonra localstorage-den kopyalanmis kodu siler
        },
        urunlerToplamTutar(params){ // SepetAdetInput.vue-dan yani child-dan gelen data burada yazilir
            this.urunler_toplam_tutar = params
        },
        promosyonIndirimiDahilTutar(params){ // SepetAdetInput.vue-dan yani child-dan gelen data burada yazilir
            this.promosyon_indirimi_dahil_tutar = params
        },
        promosyonIndirimi(params){ // SepetAdetInput.vue-dan yani child-dan gelen data burada yazilir
            this.promosyon_indirimi = params
        },
        sepetOzetiToplamTutar(params){ // SepetAdetInput.vue-dan yani child-dan gelen data burada yazilir
            this.sepetOzeti_toplam_tutar = params
        },
        
        sepetiTemizle(){
            localStorage.removeItem("sepet")
            this.sepetim = ""
            this.urunler_toplam_tutar = 0
            this.promosyon_indirimi_dahil_tutar = 0
            this.sepetOzeti_toplam_tutar = 0
        },
        sepetBosMu(){
            if(this.sepetim === null){ // sepetim null kontrolu sepetim degeri bos oldugunda(yani null-a esit oldugunda) .length hatasini handle etmek icin yazildi
                this.showSepetBos = true
            }else{
                if(this.sepetim.length === 0){ // sepet bossa sepetime git butonu gizlenir
                    this.showSepetBos = true
                }else{ // dolu ise gosterilir. else kosulu olmak zorunda, aksi taktirde her sepet butonuna tiklandiginda butonun show/hide-i aninda algilanmiyor
                    this.showSepetBos = false
                }
            }
        },
        getUid_Udep(){
            this.ushp = this.decryptCookie("ushp")
            this.utel = this.decryptCookie("utel")
            this.uid = this.decryptCookie("uid")
        },
        getKoordinat(){
            this.koordinat = localStorage.getItem("koord")
        },
        async fetchMinimumOrderPrice(){
            this.getKoordinat()
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'web_get_init_data');
                formData.append('depo', this.koordinat);
                formData.append('os', 'web');
                formData.append('version', '1');
                formData.append('fbid', '0');
                formData.append('teslimattip', '1');
                var getUserInLocal = localStorage.getItem("user")
                if(getUserInLocal != null){ // kullanici kaydi varsa. kontrol localdeki 'user'-e gore yapiliyor
                    formData.append('user', this.utel);
                    formData.append('uid', this.uid);
                }
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.minimumOrderPrice = response.data
                // sorgudan donen deger minimumOrderPrice-a, minimumOrderPrice da parametersTab-a eklenip, islemler parametersTab uzerinden yapiliyor
                this.$store.commit('addParametersTab',{minimumOrderPrice:this.minimumOrderPrice}) // bir daha sorgu yapilip yapilmayacagini anlamak icin boyle bir deger tutuldu
                this.getParameters() // minimumOrderPrice-in ici addParametersTab-dan sonra dolduktan sonra covid mesaji, hizmet bedeli, hizmet alindi mi gibi gerekli bilgilerin alinmasi icin fonk cagirildi
                // console.log("sorgu-yapildi")
            } catch (error) {
                this.errors.push(error)
            }
        },
        // parameters tablosundaki bize lazim degerleri almak icin gerekli fonksiyon
        getParameters(){
            var parameters = [];
            // minimumOrderPrice, addParametersTab-dan geliyor
            // map islemi minimumOrderPrice (yani response.data)-ya gore yapilmiyor.
            // sayfa ilk yuklendiginde response-u zaten parameterstab-a atmistik bir daha sorgu yapilmasini engellemek icin
            // o yuzden map islemi parameterstab-a gore yapiliyor. created aninda da karisiklik olmasin diye kontrol(else durumu) eklendi
            this.parameterstab.minimumOrderPrice.map((item) => { // sorgudan parameters-e ulasmak icin
                parameters.push(item.parameters)
            })
            // sorgudan donen json-daki 3cu deger parameters-e denk geliyor. parameters-in de 9cusu randevulu icin minimum siparis tutarina denk geliyor.
            // o yuzden parameters[3][9] yapildi. ileride bakilip anlasilmadiginda bu yorum okunsun !
            this.minimumSiparisTutari = parameters[3][9].deger // minimum siparis tutari burada eklendi
            this.covidMesaji = parameters[3][12].deger // covid mesaji burada eklendi
            this.hizmetBedeli = parameters[3][10].deger // hizmet bedeli (4.9) burada eklendi
            this.hizmetBedeliAlindiMi = parameters[3][11].deger // hizmet alindi mi bilgisi burada eklendi
            // geocode waypoint islemleri baslangici
            this.getGoogleGeocodeWaypoints(parameters) // gunkay ile google arasinda karsilastirma yapilsin diye parameters de gonderildi
        },
        // bu fonksiyonda google directions-a sorgu yapiliyor, gunkaydan gelen degerler ile karsilastirilip ona gore minimum siparis tutari guncellensin mi guncellenmesin mi karari veriliyor bu foksiyonda
        async getGoogleGeocodeWaypoints(parameters){
            var kullanici_kordinat = localStorage.getItem('koord') // localden kullanicinin koordinati alindi
            var depo_kordinat = localStorage.getItem('kooord') // localden deponun koordinati alindi
            this.getUid_Udep()
            try {
                const formData = new FormData();
                formData.append('f', 'get_google_route');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('start', depo_kordinat);
                formData.append('end', kullanici_kordinat);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.googleRoute = response.data
                if(this.googleRoute.status == 'success'){ // basarili sonuc donduyse yani mesafe degerinin ici doluysa (mesafe bossa sepet olusturma asamasinda kontrole gore dolu ya da 0 olarak gonderiliyor)
                    this.$store.commit('addGoogleMesafe', this.googleRoute.mesafe) // basariliysa - sepet odeme sayfasinda sepet olusturma asamasinda mesafe'nin icine mesafe degeri yazilabilsin diye store-a atilir
                }else{
                    this.$store.commit('addGoogleMesafe', "") // basarisizsa - mesafe bos gonderilir. bos gonderildigi icin de sepet olusturulurken mesafe degerinin icine 0 yazilir
                }
                // gunkaydan gelen degerler ile google degerleri karsilastirma islemi START
                // buradan sonra mesafeye gore minimum siparis tutari guncellensim mi diye kontroller basliyor
                // saga sola parantez eklenip parse edilip, array formatina getirildi. artik [0],[1],[2] gibi index vererek icindeki degerlere ulasilabilecek
                var minimum_order_price_randevu_array = JSON.parse('[' + parameters[3][13].deger + ']') // (orn: 150,150,300)
                var minimum_order_price_randevu_distance_array = JSON.parse('[' + parameters[3][14].deger + ']') // (orn: 0,5000,7000)
                var minimum_order_price_randevu_array_durum = parameters[3][15].deger // (orn: false)

                var distance_value = this.googleRoute.mesafe // sorgudan donen mesafe degeri karsilastirma icin degiskene atanir
                
                if(minimum_order_price_randevu_array_durum === 'false'){ // durum false ise bisey yapilmayacak
                    return
                }
                else if(minimum_order_price_randevu_array_durum === 'true'){ // ama eger durum true ise artik karsilastirma kontrolleri yapilacak
                    // google-dan donen mesafe degeri, gunkaydan donen mesafe arrayinin 0ci ve 1ci indeksi arasindaysa (yani 0<x<5000 kontrolu)..
                    if(distance_value > minimum_order_price_randevu_distance_array[0] && distance_value <= minimum_order_price_randevu_distance_array[1]){
                        this.minimumSiparisTutari = minimum_order_price_randevu_array[0] //..minimum sip tutari gunkaydan donen fiyat arrayinin 0ci indeksi olur (yani 150)
                        // console.log("0<X<5000")
                    }
                    // google-dan donen mesafe degeri, gunkaydan donen mesafe arrayinin 1ci ve 2ci indeksi arasindaysa (yani 5000<x<7000 kontrolu)..
                    else if(distance_value > minimum_order_price_randevu_distance_array[1] && distance_value <= minimum_order_price_randevu_distance_array[2]){
                        this.minimumSiparisTutari = minimum_order_price_randevu_array[1] //..minimum sip tutari gunkaydan donen fiyat arrayinin 1ci indeksi olur (yani 150)
                        // console.log("5000<X<7000")
                    }
                    // google-dan donen mesafe degeri, gunkaydan donen mesafe arrayinin 2ci indeksinden buyukse (yani x>7000 kontrolu)..
                    else if(distance_value > minimum_order_price_randevu_distance_array[2]){
                        this.minimumSiparisTutari = minimum_order_price_randevu_array[2] //..minimum sip tutari gunkaydan donen fiyat arrayinin 2ci indeksi olur (yani 300)
                        // console.log("X>7000")
                    }
                }
                // gunkaydan gelen degerler ile google degerleri karsilastirma islemi END
                // console.log("sorgu-yapildi")
            } catch (error) {
                this.errors.push(error)
            }
            // NOT : zorla bela ile google-un directions-ina sorgu atildi ama sonradan status OK icinde tanimlanan..
            // ..datalara kenardan ulasilamiyordu. Icinde ulasalim dedigimizde yine sorun cikariyordu..
            // ..mesela status OK icinde siparis olusturmak icin gerekli sorgu icindeki mesafe degerini doldurmak icin..
            // ..google-dan donen mesafe degerini store-da bir degiskene atmak da olmuyordu. hata veriyordu..
            // ..bu yuzden Hakan abinin yazmis oldugu get google route-a sorgu atilmaya baslanildi......
            // // geocode icin http request atilabilirken directions icin atilamiyor. arastirmalar sonucu asagidaki yol izlenildi
            // // srcipt tag-i yaratilip gerekli islemler yapilir
            // var script = document.createElement('script');
            // script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAAQukCk9fzUmYe22z6-8DowdgrTjNAsB8&callback=initMap';
            // script.async = true;

            // // callback fonksiyonu (burada initMap oluyor) window nesnesine eklenir
            // window.initMap = function() {
            //     // JS API yuklendi ve hazir
            //     const directionsService = new this.google.maps.DirectionsService();
            //     directionsService.route({
            //         origin: depo_kordinat, // baslangic adres (deponun koordinati)
            //         destination: kullanici_kordinat, // bitis adres (kullanicinin koordinati)
            //         travelMode: "DRIVING"
            //     },
            //     (response, status) => {
            //         // console.log(response);
            //         // console.log(status);
            //         if(status === 'OK'){
            //             var direction = []; // sorgudan donen response buraya yazilir
            //             direction.push(response)
            //             var route = []; var legs = []
            //             direction.map((item) => {
            //                 route.push(item.routes)
            //             })
            //             route[0].map((item) => {
            //                 legs.push(item.legs)
            //             })
            //             var distance_value = legs[0][0].distance.value // mesafe (karsilastirma icin)
            //             // var duration_value = legs[0][0].duration.value // zaman

            //             // gunkaydan gelen degerler ile google degerleri karsilastirma islemi START
            //             // buradan sonra mesafeye gore minimum siparis tutari guncellensim mi diye kontroller basliyor
            //             // saga sola parantez eklenip parse edilip, array formatina getirildi. artik [0],[1],[2] gibi index vererek icindeki degerlere ulasilabilecek
            //             var minimum_order_price_randevu_array = JSON.parse('[' + parameters[3][13].deger + ']') // (orn: 150,150,300)
            //             var minimum_order_price_randevu_distance_array = JSON.parse('[' + parameters[3][14].deger + ']') // (orn: 0,5000,7000)
            //             var minimum_order_price_randevu_array_durum = parameters[3][16].deger // (orn: false)

            //             if(minimum_order_price_randevu_array_durum === 'false'){ // durum false ise bisey yapilmayacak
            //                 return
            //             }
            //             else if(minimum_order_price_randevu_array_durum === 'true'){ // ama eger durum true ise artik karsilastirma kontrolleri yapilacak
            //                 // google-dan donen mesafe degeri, gunkaydan donen mesafe arrayinin 0ci ve 1ci indeksi arasindaysa (yani 0<x<5000 kontrolu)..
            //                 if(distance_value > minimum_order_price_randevu_distance_array[0] && distance_value <= minimum_order_price_randevu_distance_array[1]){
            //                     this.minimumSiparisTutari = minimum_order_price_randevu_array[0] //..minimum sip tutari gunkaydan donen fiyat arrayinin 0ci indeksi olur (yani 150)
            //                     // console.log("0<X<5000")
            //                 }
            //                 // google-dan donen mesafe degeri, gunkaydan donen mesafe arrayinin 1ci ve 2ci indeksi arasindaysa (yani 5000<x<7000 kontrolu)..
            //                 else if(distance_value > minimum_order_price_randevu_distance_array[1] && distance_value <= minimum_order_price_randevu_distance_array[2]){
            //                     this.minimumSiparisTutari = minimum_order_price_randevu_array[1] //..minimum sip tutari gunkaydan donen fiyat arrayinin 1ci indeksi olur (yani 150)
            //                     // console.log("5000<X<7000")
            //                 }
            //                 // google-dan donen mesafe degeri, gunkaydan donen mesafe arrayinin 2ci indeksinden buyukse (yani x>7000 kontrolu)..
            //                 else if(distance_value > minimum_order_price_randevu_distance_array[2]){
            //                     this.minimumSiparisTutari = minimum_order_price_randevu_array[2] //..minimum sip tutari gunkaydan donen fiyat arrayinin 2ci indeksi olur (yani 300)
            //                     // console.log("X>7000")
            //                 }
            //             }
            //             // gunkaydan gelen degerler ile google degerleri karsilastirma islemi END
            //         }
            //     })
            // };
            // // 'You have included the Google Maps JavaScript API multiple times on this page' hatasinin onune gecmek icin asagidaki eklendi
            // window.google = {};
            // // 'head'-e yazmis olunan script eklenir
            // document.head.appendChild(script);
        },
        // sepetozeti.js-deki addSepetOzeti fonksiyonu calisir ve degerler sepetozeti-ne yazilir
        sepetOzetiStore(){
            // buradaki toplamTutar2-nin olma sebebi; sepet odeme sayfasinda poset degeri toplam tutara ekleniyor ve
            // browser-dan geri/ileri yapildiginda odeme sayfasindaki toplam tutar, toplam tutar + poset fiyatina esit oluyor. kontrolu sepetOdemePage-de yapilmistir
            this.$store.commit('addSepetOzeti',{araToplam:this.urunler_toplam_tutar,
                promIndirimi:this.promosyon_indirimi.toFixed(2), kampIndirimi:this.kampanya_indirimi.toFixed(2), 
                toplamTutar:this.sepetOzeti_toplam_tutar, toplamTutar2:this.sepetOzeti_toplam_tutar,
                sepetim:this.sepetim, hizmetBedeli:this.hizmetBedeli, hizmetBedeliAlindiMi:this.hizmetBedeliAlindiMi})
            this.$store.commit('addMinimumSepetTutari', this.minimumSiparisTutari)
        },
        // burasi normal alisverisi tamamla butonu icin gerekli ozellikleri tasiyan fonksiyon. ama sepet odeme sayfasinda..
        // ..kayitli asama oldugunda, kaldigim yerden devam et ve alisverisimi tamamla butonlarini farklandirmak icin boyle yapildi
        kaldigimYerdenDevamEt(){
            // let sayfa_izin = document.cookie // onceden kontrol tek uid ile yapiliyordu
            var getUserInLocal = localStorage.getItem("user")
            if (getUserInLocal != null){ // eger local-de user bilgisi varsa sepet odeme sayfasi goruntulenebilecek
                this.sepetOzetiStore() // sepet odeme sayfasindaki sepet ozeti alani icerisindeki bilgilerin doldurulmasi icin
                if(this.urunler_toplam_tutar < parseFloat(this.minimumSiparisTutari)){
                    this.showMinSiparisTutari = true
                }
                else{
                    this.$router.push({name: 'SepetOdemePage'})
                }
            }
            else { // eger uid bilgisi yoksa Giris sayfasina yonlendirilecek
                // kullanici kaydi olmadan sepet odeme sayfasina giris yapmayi denemisse haberim olsun diye locale deger yazilir
                localStorage.setItem("sptdm","9aGs9a2BTa") // oylesine olusturulmus bir deger. onemi yok
                this.$router.push({ name: 'GirisYapPage' })
            }
        },
        // alisverisi tamamla butonuna basildiginda kayitli asama varsa silinir
        alisverisiTamamla(){
            this.kaldigimYerdenDevamEt() // sepet odeme sayfasi goruntenmesi icin
            this.$store.commit('addSepetOdemeKayit',"") // kaldigim yerden devam et icin gerekli data ici basarili siparis sonrasi bosaltilir
        },
        urunsilindiMi(params){ // UrunSilindiMesaji.vue-dan gelen emit burada mesajin gosterilme durumu icin
            this.showUrunSilindi = params
        },
    },
    created(){
        this.sepetimdekiUrunler() // sayfa render oldugu anda sepetimdeki urunler listelenir
        this.rastgeleKuponId()
        this.getUid_Udep()
        // bu kontrol her defasinda sorgu yapilmasin diye eklendi. fetchMinimumOrderPrice fonksiyonu icinde store-daki parameterstab icine
        // sorgu sonrasi donen response yaziliyor. eger bu degerin ici doluysa sorgu yapilmistir demektir ve bir daha sorgu yapilmiyor
        if(this.parameterstab === ""){
            this.fetchMinimumOrderPrice() // bu sorgunun yapilma sebebi hizmet bedelinin sepet ozet kisminda gorunmesi ve minimum sepet tutarinin kontrolu icin
        }
        else{ // ama eger bu degerin ici bossa sorgu yapilmiyor. fakat covid mesaji, sepet ozeti alanindaki hizmetbedeli gibi degerler gorunsun diye..
            this.getParameters() //..sorgu esnasinda yedegi alinmis parameterstab icindeki degerler ile islem yapilmis fonksiyon cagrilir. detaylari o fonksiyon icindeki yorum satirlarinda da yazilmistir
        }
        this.sepetOdemeKayitliAsama
    }
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 990px){
        #sepetOzetiID{
            margin-bottom: 50px !important;
        }
    }
    /* iPad */
    @media (max-width : 780px){
        .list-group-flush{
            font-size: 10px;
        }
        .resp-alisveristamamla-button{
            font-size: 8px;
        }
    }
    @media (max-width : 760px){
        .resp-alisveristamamla-button{
            font-size: 11px;
        }
    }
    @media (max-width : 500px){
        :is(.sepet-ozeti, .resp-sepet){
            display: none;
        }
        #sepet-col9{
            margin-bottom: 10px !important;
        }
        :is(.sepet-ozeti-mobil, .resp-sepet-mobile){
            display: block !important;
        }
        .sepet-ozeti-mobil-button button{
            padding: 10px 15px;
        }
        .resp-sepet-mobile-font{
            font-size: 12px;
        }
        .resp-sepet-mobile-fontad{
            font-size: 14px;
        }
        .resp-sepet-mobile-button{
            width: auto;
            font-size: 11px;
        }
        .row{
            margin-left: 0 !important;
            margin-right: 0 !important;
        }
        .list-group-flush{
            font-size: 13px;
        }
        .resp-alisveristamamla-button{
            font-size: 11px;
        }
        .resim-border{
            background: white !important;
            width: 70px !important;
            cursor: pointer;
        }
        .kapmanyali-urun{
            margin-top: 47px !important;
            padding: 5px 49px !important;
            left: -70px !important;
        }
    }
    @media (min-width : 501px){
        .resp-sepet-mobile{
            display: none;
        }
    }
    /* Pixel 2, Pixel XL */
    @media (max-width : 420px){
        .sepeti-temizle-mobil{
            position: relative;
            top: 15px !important;
            right: 35px !important;
            font-size: 11px;
            white-space: nowrap;
        }
    }
    /* iPhone 6/7/8 */
    @media (max-width : 375px){
        .sepeti-temizle-mobil{
            position: relative;
            top: 5px !important;
            right: -6px !important;
            font-size: 11px;
            white-space: nowrap;
        }
    }
    /* Moto G4, Galaxy S5 */
    @media (max-width : 360px){
        .sepeti-temizle-mobil{
            position: relative;
            top: 5px !important;
            right: -6px !important;
            font-size: 11px;
            white-space: nowrap;
        }
    }
    /* Indirim kodu bilgisi START */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
    /* Indirim kodu bilgisi END */
    .sticky {
        z-index: 1;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 15px;
    }
    .font-size-13{
        font-size: 13px;
    }
    /* indirim kuponu kopyalandiysa calisacak alan START */
    @keyframes rotate {
        100% {
            transform: rotate(1turn);
        }
    }
    .rainbow {
        position: relative;
        z-index: 0;
        overflow: hidden;
    }
	.rainbow::before {
		content: '';
		position: absolute;
		z-index: -2;
		left: -50%;
		top: -50%;
		width: 200%;
		height: 1500%;
		background-color: #399953;
		background-repeat: no-repeat;
		background-size: 50% 50%, 50% 50%;
		background-position: 0 0, 100% 0, 100% 100%, 0 100%;
		background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
		animation: rotate 4s linear infinite;
	}
	.rainbow::after {
		content: '';
		position: absolute;
		z-index: -1;
		left: 6px;
		top: 6px;
		width: calc(100% - 12px);
		height: calc(100% - 12px);
		background: white;
		border-radius: 5px;
	}
    /* indirim kuponu kopyalandiysa calisacak alan END */
    .img-width{
        max-width: 45px;
        max-height: 90px;
        object-fit: contain;
    }
    .img-width-mobile{
        margin-left: 5px;
        max-width: 50px;
        max-height: 85px;
        object-fit: contain;
    }
    .trash-icon{
        margin-left: 10px;
    }
    .trash-icon:hover{
        cursor: pointer;
    }
    .sepeti-temizle{
        position: absolute;
        top: 65px;
        left: 32px;
        font-size: 11px;
    }
    .sepeti-temizle-mobil{
        position: relative;
        top: 5px;
        right: -6px;
        font-size: 11px;
        white-space: nowrap;
    }
    .minimum-siparis-tutari{
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 5px;
        color: #FF2626;
        border: 1px solid #FF2626;
        border-radius: 4px;
        padding: 5px;
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 1s;
    }
    .minimum-siparis-tutari-mobil{
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 5px;
        color: #FF2626;
        border: 1px solid #eee;
        padding: 5px;
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 1s;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0px rgba(0,0,0,0.2);
        backdrop-filter: blur(15px);
        margin-bottom: 0;
    }
    @keyframes fadeInOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .covid-bildiri{
        font-size: 15px;
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 1s;
    }
    .resim-border{
        border: 1px solid #eee;
        border-radius: 10px;
        background: white;
        width: 60px;
        height: 95px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
        cursor: pointer;
    }
    .geri-don{
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 12px;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        transition: .3s;
    }
    .geri-don:hover{
        background: #F4F4F4;
        border: 1px solid #E4E4E4;
    }
    /* sepet ozeti mobil icin START */
    .fade-enter-active, .fade-leave-active {
        transform: translateY(0%);
        transition-timing-function: ease-out;
        transition: .4s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateY(80%);
        opacity: 0;
    }
    .sepet-ozeti-mobil{
        z-index: 999;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        bottom: 55px;
        width: 100%;
        display: none;
    }
    .sepet-ozeti-mobil-icon{
        color: #4285F4;
        font-weight: 400;
    }
    .sepet-ozeti-mobil-tutar{
        font-size: 13px;
        font-weight: 400;
        margin-left: -15px;
    }
    .sepet-ozeti-mobil-tutar span{
        color: #4285F4;
        font-weight: 400;
    }
    .sepet-ozeti-mobil-main{
        border: 1px solid #eee;
        padding: 12px 0 12px 0;
        background: white;
    }
    /* toplam-a tiklandiginda acilir div */
    .sepet-ozeti-mobil-icerik{
        z-index: -1;
        position: absolute;
        bottom: 60px;
        font-size: 13px;
        font-weight: 400;
        border: 1px solid #eee;
        padding: 8px 0 8px 0;
        width: 100%;
        padding: 15px 15px 8px 15px;
        background: white;
    }
    .sepet-ozeti-mobil-icerik .d-flex{
        padding: 2px;
    }
    .rotate-up{
        transform: rotate(0deg);
        transition: .4s;
    }
    .rotate-down{
        transform: rotate(-180deg);
        transition: .4s;
    }
    /* sepet ozeti mobil icin END */
    .kapmanyali-urun{
        border: 1px solid #1878A9;
        background: #1878A9;
        color: white;
        margin-top: 17px;
        padding: 5px 21px;
        font-size: 13px;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 2px;
        position: absolute;
        left: -50px;
        transform: rotate(90deg);
    }
    .kaldigim-yerden{
        margin-top: 10px;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 800;
        border: 1px solid #eeeeee;
        background: #eeeeee;
        padding: 5px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        transition: .2s;
    }
    .kaldigim-yerden:hover{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        background: red;
        color: white;
    }
    .mobil-kaldigim-yerden{
        border: 1px solid #eeeeee;
        border-radius: 20px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
</style>