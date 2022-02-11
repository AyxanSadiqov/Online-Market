Bu sayfadaki puf noktalar:
1 - Bu sayfa ProfilAdreslerim-in parent-i
2 - Kampanya ekli olup olmadigi durumlar icin kontroller var
2.1 - Sayfa yuklenmeden once kampanya eklenmisse ise sepet ozeti kampanya ekli duruma gore gosterilir.
    Olmadigi durumda zaten sepetten gelen degerler yazilir.
2.2 - Kampanya ekli oldugu durumda sepet olustururken sepet ozetindeki sepet olusturmak icin gerekli alanlar
    kampanyali urunun fiyatlarina gore guncellenip oyle sorgu yapilir.
<template>
    <div>
        <Navbar />
        <BottomNavMenu />
        <!-- {{sepetOzeti.toplamTutar}} - {{sepetOzeti.toplamTutar2}} -->
        <!-- promosyon kodu - {{secilenPromosyonKodu.code}} <br>
        --------------------------------- -->
        <!-- {{showKampanyaAlani}} -- K -->
        <!-- {{kampanyaVarMi}} -- -->
        <!-- {{ekliKampanya}} -- K -->
        <!-- {{kampanyaDizisi}} --
        {{kampanyaninIDsi}} --
        <p>birlestirilebilir - {{birlestirilebilir}}</p>
        <p>birlestirilemez - {{birlestirilemez}}</p> -->
        <!-- ---------------------------------------------- -->
        <!-- {{kampanya}} <br>
        tel - {{utel}} <br>
        uid - {{uid}}<br>
        tutar - {{sepetOzeti.toplamTutar}} <br>
        indirimsiz tutar - {{indirimsizTutar}}<br>
        kampanya id - {{kampanyaninIDsi}} <br>
        odeme tip - {{odemeTip}}<br>
        teslim suresi - {{teslimSuresi}}<br>
        not - {{siparisNot}}<br>
        adresId - {{sepetAdres.adresId}}<br>
        sepetim - {{sepetOzeti.sepetim}}<br>
        hizmet alindi mi - {{sepetOzeti.hizmetBedeliAlindiMi}}<br>
        hizmet bedeli - {{sepetOzeti.hizmetBedeli}}<br>
        randevu saat id - {{randevuSaatId}}<br>
        poset degeri - {{posetDegeri}}<br>
        fatura - {{sepetFatura.faturaId}}<br>
        ------ <br> -->
        <!-- {{sepetOdemeKayit}} -->
        <!-- siparis durumu - <b>{{siparisTamamla}}</b><br>
        <b>{{siparisHatali()}}</b> -->
        <!-- 1.ci asama disabled : {{birSonrakiAsamaDogruluk}} <br>
        2.ci asama disabled : {{birSonrakiAsamaDogruluk}} <br>
        3.ci asama disabled : {{birSonrakiAsamaDogruluk}} <br>
        {{asama1baraGecis}}
        {{asama2baraGecis}}
        {{asama3baraGecis}} -->
        <div v-if="showMinimumSepetTutari">
            <div class="arkafon">
                <div class="ownModal">
                    <div class="baslik">
                        <h4 class="d-flex justify-content-center closeC">
                            Uyarı
                        </h4>
                    </div>
                    <div>
                        Sepet tutarınız {{minimumSepetTutari}} TL ve üzeri olmalıdır.
                        <div class="d-flex justify-content-center mt-3 tamam-anladim">
                            <a @click="closeMinSepetTutarMesaj">Tamam, anladım</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row m-4">
            <div class="col-md-9 mb-4">
                <div class="row ml-0 mr-0 mb-3 noselect odeme-each-mobile">
                    <div @click="asamaBir()" class="odeme-each col-md-3 col-3 col-sm-3" :class="odemeClass1">
                        <span>1.</span> <span class="one">Adres bİlgİlerİ <i class="fas" :class="classIcon1"></i></span>
                    </div>
                    <div @click="asamaIki()" class="odeme-each col-md-3 col-3 col-sm-3" :class="odemeClass2">
                        <span>2.</span> <span class="one">Teslİmat zamani <i class="fas" :class="classIcon2"></i></span>
                    </div>
                    <div @click="asamaUc()" class="odeme-each col-md-3 col-3 col-sm-3" :class="odemeClass3">
                        <span>3.</span> <span class="one">Ödeme tÜrÜ <i class="fas" :class="classIcon3"></i></span>
                    </div>
                    <div @click="asamaDort()" class="odeme-each col-md-3 col-3 col-sm-3" :class="odemeClass4">
                        <span>4.</span> <span class="one">Sİparİş onayı <i class="fas" :class="classIcon4"></i></span>
                    </div>
                </div>

                <!-- Asama 1 START -->
                <transition name="fade">
                    <div v-if="asama1" class="card">
                        {{adresBilgileri()}}
                        <div class="card-body">
                            <h5 class="card-title text-uppercase">Teslİmat bİlgİlerİ</h5>
                            <h6 class="card-subtitle mb-4 text-muted">Tercih ettiğiniz adresleri seçiniz.</h6>
                            <!-- Adres Alani START -->
                            <div class="card-text">
                                <div>
                                    <div class="card w-75 z-depth-0 mb-3">
                                        <div class="card-body sepetodeme-adres">
                                            <h5 class="card-title">{{adresler.ad}}</h5>
                                            <p class="card-text">
                                                {{adresler.adrestext}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button @click="adresKontrolleri()" type="button" class="btn z-depth-0 btn-md" :style="sepetOdemePageColor" data-toggle="modal" data-target="#exampleModal">
                                    <i class="fas fa-address-card"></i> Adreslerİm
                                </button>
                                <div v-if="showAdres">
                                    <div class="arkafon">
                                        <div class="ownModal">
                                            <div class="baslik">
                                                <h4 class="d-flex justify-content-center closeC">
                                                    Adresinizi Seçiniz
                                                    <button @click="showAdres=false" type="button" class="close z-depth-0" aria-label="Close"><span aria-hidden="true" class="black-text">&times;</span></button>
                                                </h4>
                                            </div>
                                            <div class="icerik">
                                                <ProfilAdreslerim @adressecimkapat="adressecimkapatMi" @teslimatadres="teslimatadresMi" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Adres Alani END -->
                        </div>
                    </div>
                </transition>
                <!-- Asama 1 END -->

                <!-- Asama 2 START -->
                <transition name="fade">
                    <div v-if="asama2" class="card">
                        <div class="card-body">
                            <h5 class="card-title text-uppercase">Teslİmat zamani</h5>
                            <h6 class="card-subtitle mb-4 text-muted">Tercih ettiğiniz zamanı seçiniz.</h6>
                            <div class="card-text">
                                <div class="row">
                                    <div class="col-md-3 col-4 col-sm-4" style="z-index:2;">
                                        <div v-for="randevu in randevuBilgi" :key="randevu.id">
                                            <div v-for="rand in randevu.randevu_bilgi" :key="rand.id" class="vertical-menu">
                                                <SepetOdemeVerticalMenu :rand="rand" :currentDateFormat="currentDateFormat" @tarihalani="tarihAlani" @secilentarih="secilenTarih" @saatlerad="saatler_ad" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-8 col-sm-8 noselect" style="z-index:1;">
                                        <div v-for="randevu in randevuBilgi" :key="randevu.id">
                                            <div v-for="rand in randevu.randevu_bilgi" :key="rand.id">
                                                <!-- api-den gelen 'saatler' icerisindeki tarih_en alanina gore karsilastirma yapilir ve o tarihe gore saatler listelenir -->
                                                <div v-if="rand.tarih_en==tarih_alani" class="vertical-menu-item">
                                                    <span class="rand-tarih">{{rand.tarih}} {{bugun(rand)}}</span>
                                                    <div class="row">
                                                        <div v-for="saatler in rand.saatler" :key="saatler.id" class="col-md-5 col-5 her-saat">
                                                            <!-- Bu, saatler arasindaki gecerliligi kontrol etmek icin START -->
                                                            <div v-if="saatler.status!='true'">
                                                                <input type="radio" disabled>&nbsp;
                                                                <label class="saatler-disable">{{saatler.ad}}</label>
                                                            </div>
                                                            <div v-else>
                                                                <input type="radio" :id="saatler.ad" v-model="saatlerAd" :value="saatler.ad" @click="getTeslimSuresi(rand,saatler)">&nbsp;
                                                                <label class="saatler-enable" :for="saatler.ad">{{saatler.ad}}</label>
                                                            </div>
                                                            <!-- Bu, saatler arasindaki gecerliligi kontrol etmek icin END -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-11 col-sm-11 sectiginiz-tarih">
                                        <span>Teslimat Zamanınız :</span>
                                        <p>{{teslimatZamani()}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <!-- Asama 2 END -->

                <!-- Asama 3 START -->
                <transition name="fade">
                    <div v-if="asama3">
                        {{odemeTuru()}}
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title text-uppercase">Ödeme bİlgİlerİ</h5>
                                <h6 class="card-subtitle mb-4 text-muted">Tercih ettiğiniz ödeme şeklini seçiniz.</h6>
                                <div class="card-text noselect">
                                    <div class="odeme-yontemi-secimi">
                                        <div v-for="yontem in odemeYontemi" :key="yontem.id" @click="odemeYontemiSec(yontem)" :class="{odemeYontemiActive:yontem.id == seciliOdemeYontemi}">
                                            <i :class="yontem.icon"></i> {{ yontem.ad }}
                                        </div>
                                    </div>

                                    <div v-if="seciliOdemeYontemi==1" class="row">
                                        <div class="col-md-6">
                                            <div @click="addNakit()" :class="nakitActive" class="row odeme-sekli-nakit">
                                                <div class="col-md-1 col-1 col-sm-1"><i class="fas fa-coins"></i></div>
                                                <div class="col-md-11 col-10 col-sm-10">
                                                    Nakit
                                                    <p class="odeme-sekli-nakit-aciklama">Nakit ödeme</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div @click="addKrediKarti()" :class="krediKartiActive" class="row odeme-sekli-nakit">
                                                <div class="col-md-1 col-1 col-sm-1"><i class="fas fa-money-check"></i></div>
                                                <div class="col-md-11 col-10 col-sm-10">
                                                    Kredi Kartı
                                                    <p class="odeme-sekli-nakit-aciklama">Sipariş tesliminde kredi kartı / banka kartı ile ödeme</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="seciliOdemeYontemi==2" class="row">
                                        <div class="col-md-6">
                                            <SepetOdemeKrediKarti />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Siparis Notu Alani START -->
                            <div class="card-body">
                                <h5 class="card-title text-uppercase">Sİparİş Notunuz</h5>
                                <h6 class="card-subtitle mb-4 text-muted">Siparişinize not ekleyebilirsiniz. (isteğe bağlı)</h6>
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea class="form-control" placeholder="Sipariş notunuz (En fazla 400 karakter)" v-model="siparisNot" @copy="kopyalandi()" rows="2" maxlength="400"></textarea>
                                            </div>
                                            <KopyalandiMesaji :showKopyalandi="showKopyalandi" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Siparis Notu Alani END -->
                        </div>
                    </div>
                </transition>
                <!-- Asama 3 END -->

                <!-- Asama 4 START -->
                <transition name="fade">
                    <div v-if="asama4">
                        <div class="card" id="dorduncu-asama">
                            {{siparisOnayi()}}
                            <div class="card-body">
                                <button type="button" class="btn btn-sm fatura-bilgisi-ekle-button z-depth-0" :style="sepetOdemePageColor" data-toggle="modal" data-target="#exampleModal">
                                    <i class="fas fa-address-card"></i> fatura bİlgİsİ ekle
                                </button>
                                <div class="modal fade left" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-full-height modal-left">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close z-depth-0" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="dark-text">&times;</span></button>
                                            </div>
                                            <div class="modal-body sepetodeme-profil-adreslerim">
                                                <ProfilFaturalarim />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h5 class="card-title text-uppercase">Poşet Seçİmİ</h5>
                                <h6 class="card-subtitle mb-4 text-muted">Tercih ettiğiniz poşeti seçiniz.</h6>
                                <div class="card-text">
                                    <div class="row noselect">
                                        <div class="col-md-3 col-3 col-sm-5 ml-2 mb-2 poset-secimi" :class="posetActive" @click="posetSecimi()">
                                            <img src="@/assets/svg/poset.svg" width="70" height="70" alt="">
                                            <span class="ml-2">Poşet <b>(0.25 TL)</b> </span>
                                        </div>
                                        <div class="col-md-3 col-3 col-sm-5 ml-2 mb-2 poset-secimi" :class="bezcantaActive" @click="bezcantaSecimi()">
                                            <img src="@/assets/svg/bez-canta.svg" width="70" height="70" alt="">
                                            <span class="ml-2">Bez Çanta <b>(1.75 TL)</b> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 promosyon-ekle-button">
                                <PromosyonKod />
                            </div>
                        </div>
                        <div>
                            <Kampanya />
                        </div>
                        <!-- BILGILENDIRME; showFaturaBilgisiCard icerisine profilfaturalarim sayfasinda ekle butonuna basildiginda 'true' degeri yazilir -->
                        <div v-if="showFaturaBilgisiCard" class="card mt-4">
                            <div class="card-body">
                                <h5 class="card-title text-uppercase">Fatura Bİlgİsİ</h5>
                                <h6 class="card-subtitle mb-4 text-muted">Tercih ettiğiniz fatura;</h6>
                                <!-- Fatura Alani START -->
                                <div class="card-text">
                                    <div v-for="fatura in faturalar" :key="fatura.id">
                                        <div class="card w-75 z-depth-0 mb-3 fatura-card">
                                            <div class="card-body sepetodeme-adres">
                                                <h5 class="card-title">
                                                    <i v-if="fatura.tip==0" class="fas fa-building"></i> 
                                                    <i v-else class="fas fa-home"></i> 
                                                    {{fatura.ad}}
                                                </h5>
                                                <p class="card-text">
                                                    <span v-if="fatura.tip==0">Vergi dairesi - {{fatura.vergidairesi}}, </span>
                                                    <span v-else></span>
                                                    <span v-if="fatura.tip==0">Vergi numarası - {{fatura.vergino}}</span>
                                                    <span v-else>TC numarası - {{fatura.vergino}}</span>
                                                </p>
                                                <div @click="faturayiKaldir()" class="faturayi-sepetten-kaldir">çıkar</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Fatura Alani END -->
                            </div>
                        </div>
                    </div>
                </transition>
                <!-- Asama 4 END -->
    
                <button @click="ilerle()" data-toggle="modal" :data-target="dataTargetSiparisVer" type="button" :disabled="birSonrakiAsamaDogruluk" class="btn waves-effect waves-light w-100 ml-0 alisverisi-tamamla z-depth-0" :style="sepetOdemePageColor" data-mdb-ripple-color="dark">
                    İlerle
                </button>
            </div>
            <div class="col-md-3">
                <div class="sticky" :style="styleSticky">
                    <div class="card mb-4" id="sepetOzetiID">
                        <div class="card-body font-size-13">
                            <h5 class="mb-3">Sepet özeti</h5>
                            <!-- Sepet alani START -->
                            <div class="ozet-sepetim noselect">
                                <div class="d-flex bd-highlight">
                                    <div class="flex-grow-1 bd-highlight">Sepetim ({{sepettekiUrunSayi}})</div>
                                    <div @click="sepetiGoruntule()" class="bd-highlight goruntule noselect">
                                        <span>{{ sepetiGoruntuleText }} </span>
                                        <i class="fas" :class="classSepetArrowIcon"></i>
                                    </div>
                                </div>
                                <transition name="bounce">
                                    <div id="sepet-urunler" v-if="showSepetim">
                                        <div v-for="sepet in sepetOzeti.sepetim" :key="sepet.id">
                                            <hr>
                                            <div class="row mb-1">
                                                <!-- arama yaparken urun bilgisi icinde stokkod degil de stok_kodu bilgisi oldugu icin sepet buttonda gosterirken resim bulunsun diye eklenen kontrol -->
                                                <div v-if="sepet.barkod!=null" class="col-md-3 col-3 col-sm-3">
                                                    <div class="resim-border d-flex justify-content-center align-items-center">
                                                        <img v-if="sepet.barkod.length < 8" :src="imagecompany + ushp + '/' + sepet.barkod + '.jpeg?' + sepet.imageupdate" class="img-width" alt="">
                                                        <img v-else :src="image + sepet.barkod + '.jpeg?' + sepet.imageupdate" class="img-width" alt="">
                                                    </div>
                                                </div>
                                                <div v-if="sepet.barkod==null" class="col-md-3 col-3 col-sm-3">
                                                    <div class="resim-border d-flex justify-content-center align-items-center">
                                                        <img :src="image + sepet.barkod + '.jpeg?' + sepet.imageupdate" class="img-width" alt="">
                                                    </div>
                                                </div>
                                                <div class="col-md-9 col-9 col-sm-9">
                                                    <div class="sepet-icerigi">
                                                        <strong>{{ sepet.ad }}</strong> <br>
                                                        <span class="fiyat">({{ sepet.adet }} Adet x {{ sepet.satisfiyat }} TL)</span>
                                                        <strong class="tutar"> = {{ (sepet.satisfiyat * sepet.adet).toFixed(2) }} TL</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="showSepetOzetiMore" class="sepet-ozeti-more animated fadeInDown infinite">
                                            <i class="fas fa-angle-double-down"></i>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                            <!-- Sepet alani END -->
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Ara toplam
                                    <span>{{ sepetOzeti.araToplam }} TL</span>
                                    <!-- <span v-if="kampanyaVarMi.show">{{ showKampanyaAlani.kampanyaliIndirimsizTutar }} TL</span> -->
                                </li>
                                <li v-if="!promosyonVarmi" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Promosyon indirimi
                                    <span>{{ sepetOzeti.promIndirimi }} TL</span>
                                </li>
                                <li v-if="promosyonVarmi" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 prom-var">
                                    Promosyon indirimi
                                    <span>{{ sepetOzeti.promIndirimi }} TL</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Kampanya indirimi
                                    <span>{{ sepetOzeti.kampIndirimi }} TL</span>
                                </li>
                                <li v-if="posetDegeri" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Poşet ücreti
                                    <span v-if="posetDegeri==='11'">{{posetFiyati}} TL</span>
                                    <span v-else-if="posetDegeri==='21'">{{bezcantaFiyati}} TL</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Hizmet bedeli
                                    <!-- Hizmet alindiysa uzeri cizgili -->
                                    <div v-if="sepetOzeti.hizmetBedeliAlindiMi=='0'">
                                        <span style="text-decoration: line-through;">{{ parseFloat(sepetOzeti.hizmetBedeli).toFixed(2) }} TL</span>
                                    </div>
                                    <!-- Alinmadiysa normal gider olarak gosterilir ve asagi fonkiyonlarda toplam tutara eklenir -->
                                    <div v-else-if="sepetOzeti.hizmetBedeliAlindiMi=='1'">
                                        <span>{{ parseFloat(sepetOzeti.hizmetBedeli).toFixed(2) }} TL</span>
                                    </div>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Nakliye
                                    <span>Günkay Sanal Market</span>
                                </li>
                                <li v-if="!kampanyaVarMi.show" class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <div>
                                        <strong>Toplam</strong>
                                    </div>
                                    <span><strong>{{ sepetOzeti.toplamTutar }} TL</strong></span>
                                </li>
                                <!-- kampanya ekliyse toplam alan degisir -->
                                <li v-if="kampanyaVarMi.show" class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Toplam
                                    <span>
                                        <span class="pr-2"><del>{{ showKampanyaAlani.kampanyaliIndirimsizTutar }} TL</del></span>
                                        <strong>{{ showKampanyaAlani.kampanyaliTutar }} TL</strong>
                                    </span>
                                </li>
                                <li v-if="sepetOzeti.hizmetBedeliAlindiMi=='0'" style="color:#00C851" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                                    Kazancınız
                                    <div v-if="!kampanyaVarMi.show">
                                        <span class="kazanc-icon" @focus="showKazancInfo()" @blur="hideKazancInfo()" tabindex="-1"><i class="fas fa-exclamation-circle"></i></span>
                                        <span>{{ kazanciniz=parseFloat(sepetOzeti.hizmetBedeli).toFixed(2) }} TL</span>
                                    </div>
                                    <div v-if="kampanyaVarMi.show">
                                        <span class="kazanc-icon" @focus="showKazancInfo()" @blur="hideKazancInfo()" tabindex="-1"><i class="fas fa-exclamation-circle"></i></span>
                                        <span>{{ kazanciniz=toplamKazanc.kazanc }} TL</span>
                                    </div>
                                    <div class="kazanc-info" @mousedown="kazancInfoMessage" :class="showKazancInfoClass">
                                        <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 pt-1">
                                            Hizmet bedeli
                                            <span>{{ kazancList.hizmetbedeli }} TL</span>
                                        </li>
                                        <li v-if="kazancList.kampanya!=null" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 pt-1">
                                            Kampanya indirimi
                                            <span>{{ (kazancList.kampanya).toFixed(2) }} TL</span>
                                        </li>
                                        <li v-if="kazancList.promosyon!=null" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 pt-1">
                                            Promosyon indirimi
                                            <span>{{ kazancList.promosyon }} TL</span>
                                        </li>
                                    </div>
                                </li>
                            </ul>

                            <!-- Siparis olusturulurken sepetteki herhangi bir urunun stok sayisi yetersiz ise START -->
                            <div v-if="showYetersizStokMesaji" class="yetersiz-stok">
                                <div v-for="sepet in sepetOzeti.sepetim" :key="sepet.id">
                                    <div v-if="sepet.id==yetersizUrununIdsi">
                                        Sepetinizde bulunan "{{sepet.ad}}" isimli ürününüzün adet sayısı şu an stoklarımızda bulunmamaktadır. <br>
                                        (Stoktaki adet sayısı - {{siparisTamamla.extra_bilgi}}) <br>
                                        <span @click="sepetimeGit()" class="yetersiz-stok-button">Sepetİme gİt</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Siparis olusturulurken sepetteki herhangi bir urunun stok sayisi yetersiz ise END -->
                            <!-- Siparis olustururken sepetteki herhangi bir urunun fiyati degismisse START -->
                            <div v-if="showFiyatDegismis" class="yetersiz-stok">
                                <div v-for="sepet in sepetOzeti.sepetim" :key="sepet.id">
                                    <div v-if="sepet.id==fiyatiDegisenUrunIdsi">
                                        Sepetinizde bulunan "{{sepet.ad}}" isimli ürünün fiyatı {{siparisTamamla.extra_bilgi}} olarak değişmiş. <br>
                                        Devam etmek için <span @click="urunFiyatiniGuncelle(sepet)" class="yetersiz-stok-button">Ürün fİyatını güncelle</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Siparis olustururken sepetteki herhangi bir urunun fiyati degismisse END -->

                            <button @click="ilerle()" data-toggle="modal" :data-target="dataTargetSiparisVer" type="button" :disabled="birSonrakiAsamaDogruluk" class="btn waves-effect waves-light w-100 ml-0 alisverisi-tamamla z-depth-0" :style="sepetOdemePageColor" data-mdb-ripple-color="dark">
                                {{ilerleButton}}
                            </button>
                            <!-- Son asamada iken siparis olusturulsun mu uyari gosterimi modal Top -->
                            <div class="modal fade top" id="siparisOlusturmaBildirimi" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-frame modal-top" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <div class="row d-flex justify-content-center align-items-start">
                                                <p class="pt-3 pr-2 text-dark">
                                                    Sepetinizde bir sorun yoksa onayla'ya tıkladığınız takdirde siparişiniz oluşturulacaktır. Emin misiniz?
                                                </p>
                                                <button type="button" class="btn btn-light z-depth-0" data-dismiss="modal">Hayır</button>
                                                <button type="button" class="btn btn-primary z-depth-0" data-dismiss="modal" @click="siparisOlustur()">Evet, onayla</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Son asamada iken siparis olusturulsun mu uyari gosterimi modal Top -->
                            <div>
                                <div v-if="siparisTamamla.status=='success'">
                                    <span>{{siparisBasarili()}}</span>
                                </div>
                                <div v-else>
                                    {{siparisHatali()}}
                                </div>
                            </div>
                            <!-- <button @click="siparisOlustur()" disabled type="button" class="btn btn-block waves-effect waves-light" :class="sepetButtonColor">SİPARİŞ VER</button>
                            <div v-for="siparis in siparisTamamla" :key="siparis.id">
                                <div v-if="siparis=='success'">
                                    <span>Siparisiniz basarili sekilde olustu</span>
                                </div>
                                <div v-else>
                                    hata var abeey
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import ProfilAdreslerim from "@/components/ProfilAdreslerim"
import ProfilFaturalarim from "@/components/ProfilFaturalarim"
import SepetOdemeVerticalMenu from "@/components/SepetOdemeVerticalMenu"
import Kampanya from "@/components/Kampanya"
import PromosyonKod from "@/components/PromosyonKod"
import BottomNavMenu from "@/components/BottomNavMenu"
import Footer from "@/components/Footer"
import KopyalandiMesaji from "@/components/KopyalandiMesaji"
import SepetOdemeKrediKarti from "@/components/SepetOdemeKrediKarti"
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    metaInfo() {
        return{
            title: 'Sepet',
            titleTemplate: '%s | Sepet Ödeme'
        }
    },
    data(){
        return{
            siparisTamamla : [],
            ilerleButton : 'Teslİmat zamanı',
            randevuBilgi : [],
            errors : [],
            adresler : '',
            faturalar : '',
            saatlerAd : '', // mevcut saat modali icerisindeki secili saatin adi buraya yazilir
            currentDateFormat : '', // apiden gelen saatler arrayi icerisindeki tarih_en alani ile karsilastirma yapilan deger buraya yazilir
            tarih_alani : '', // emit ile doldurulur
            secilen_tarih : '', // emit ile doldurulur
            dayMonth : '', // currentDayMonth() fonksiyonundan '11 Ocak' formatindaki date buraya yazilir
            odemeClass1 : '',
            odemeClass2 : '',
            odemeClass3 : '',
            odemeClass4 : '',
            asama1 : false, // 1. asama iceriginin show/hide-i icin
            asama2 : false, // 2. asama iceriginin show/hide-i icin
            asama3 : false, // 3. asama iceriginin show/hide-i icin
            asama4 : false, // 4. asama iceriginin show/hide-i icin
            birSonrakiAsamaDogruluk : false, // o anki asama icindeki gerekli bilgiler dolu ise bir sonraki asamaya gecis icin gerekli ilerle buton disable-inin active/deactive icin
            asama1baraGecis : false,
            asama2baraGecis : false,
            asama3baraGecis : false,
            asama4baraGecis : false,
            odemeSekli : '', // tiklanan ture gore odeme seklinin yazilacagi alan
            nakitActive : '',
            krediKartiActive : '',
            odemeTip : "",
            classIcon1 : "",
            classIcon2 : "",
            classIcon3 : "",
            classIcon4 : "",
            teslimSuresi : "", // siparisOlustur() fonksiyonunda teslim suresi alaninda yazilacak
            randevuSaatId : "", // siparisOlustur() fonksiyonunda randevu saat id alaninda yazilacak
            siparisNot : "", // siparisOlustur() fonksiyonunda siparis not alaninda yazilacak
            bezcantaActive : "",
            posetActive : "active",
            posetDegeri : "",
            posetFiyati : '0.25',
            bezcantaFiyati : '1.75',
            // sepet ozeti alanindaki sepetim alani START
            showSepetim : false,
            sepetiGoruntuleText : "Görüntüle",
            classSepetArrowIcon : "fa-angle-down",
            // sepet ozeti alanindaki sepetim alani END
            // siparis verirken karsilasilabilecek hatali durumlar alani START
            showYetersizStokMesaji : false, // siparis verirken urunun stok sayisi yetersiz ise stok yetersiz mesajinin show/hide-i icin
            yetersizUrununIdsi : "",
            showFiyatDegismis : false,
            fiyatiDegisenUrunIdsi : "",
            showUrunFiyatiGuncellendi : false, // urun fiyati guncellendikten sonra sepet sayfasindaki mesajin gosterimi icin
            // siparis verirken karsilasilabilecek hatali durumlar alani END
            showSepetOzetiMore : false,
            styleSticky : "", // son asamada siparis ver-e tiklandiginda gosterilecek uyarinin z-index-i icin
            dataTargetSiparisVer : "", // son asama yani siparis ver-e tiklandigi anda bildirim gosterilmesi icin gerekli data-target id atanmasi
            // cookie bilgileri START
            uid : "",
            utel : "",
            ushp : "",
            // cookie bilgileri END
            kazanciniz : "", // burasi sadece anlik olarak kazanci aldigimiz yer
            kazanciniz2 : "", // sepet odeme basarilida burasi gorunecek
            indirimsizTutar : "",
            teslimSuresiSonSaat : "",
            kampanya : "",
            basariliPosetFiyati : "", // sepet odeme basarili sayfasinda goruntulenecek poset fiyati buraya yazilir. bu sayfada kullanilmiyor
            showAdres : false,
            showKopyalandi : false,
            showKazancInfoClass : false,
            koordinat : "",
            // 3cu asamadaki odeme yontemi icin (kapida / online odeme) START
            odemeYontemi : [
                { id: 1, ad: "Kapıda Ödeme", icon: "fas fa-door-open"},
                { id: 2, ad: "Onlİne Ödeme", icon: "far fa-credit-card"}
            ],
            seciliOdemeYontemi : 0, // active class-inin hangisine eklenecegini anlamak icin ve secilen yonteme gore gosterilecek icerik icin
            // 3cu asamadaki odeme yontemi icin (kapida / online odeme) END
        }
    },
    components : {
        Navbar,
        ProfilAdreslerim,
        ProfilFaturalarim,
        SepetOdemeVerticalMenu,
        Kampanya,
        PromosyonKod,
        BottomNavMenu,
        Footer,
        KopyalandiMesaji,
        SepetOdemeKrediKarti
    },
    mounted () { // adresler alanindan ekle-ye basildigi anda degisiklik algilansin diye
        addEventListener('click', this.getKullaniciFatura)
        addEventListener('click', this.kontrolMinimumSepetTutari)
    },
    beforeUnmount () {
        removeEventListener('click', this.getKullaniciFatura)
        removeEventListener('click', this.kontrolMinimumSepetTutari)
    },
    beforeMount(){ // sayfa render olmadan sepetOzeti degeri bos mu diye kontrol edilir
        // sepet odeme sayfasi goruntulenebilmesi icin sepet sayfasindan sepet tutarinin 150 tl ve uzeri olmasi lazim.
        // bu kontrol de sepet sayfasinda 'alisverisi tamamla' butonuna basldiginda tetiklenir. 150 tl-den az tutar ile browser-in ileri butonunu kullanilarak
        // sepet odeme sayfasi goruntulenmek istendiginde engellemek icin bu veya kontrolu var.
        if(this.sepetOzeti === "" || this.sepetOzeti.araToplam < 150){
            this.$router.push({name: 'SepetPage'})
        }
        // toplam tutar sepet odeme sayfasinda ilk goruntulendigi zaman poset tutari gibi hic bir seyden etkilenmesin diye.
        // aciklama Sepet icindeki sepetOzetiStore() fonksiyonda yapilmistir.
        if(this.sepetOzeti.toplamTutar != this.sepetOzeti.toplamTutar2){
            this.sepetOzeti.toplamTutar = this.sepetOzeti.toplamTutar2
        }
        if(this.sepetOdemeKayit != ""){
            this.kaldigimYerdenDevamEt()
        }
        // kampanyali urun kampanyadan degil de sepetten cikarildiginda sepet ozeti, sepetten gelen normal fiyatlarla, yani olmasi gerektigi gibi doldurulur
        var localSepet = localStorage.getItem("sepet")
        // !! burayi GUNCELLE. kampanyali urun sepetten silindiginde indirimsiz tutar ve kampanyali indirim tutarlari eski halinde kaliyor !!
        if(localSepet.includes(this.ekliKampanya.kid)){ // sepet ozeti kampanyali ise kampanyali olarak kalir
            this.$store.commit('addKampanyaVarMi',{show:false}) // kullanim devre disi kalsin diye bu eklendi. SILINECEK
            this.$store.commit('addKazanc',{kazanc:""}) // bura da SILINECEK
            return
        }else{ // kampanya ekli degilmis gibi davranir, ki zaten ekli olmadigi durumda calisir
            this.$store.commit('addKampanyaVarMi',{show:false}) // sepet ozeti eski, normal haline doner
            this.emptyKampanyaninIDsi // sepet olustururken lazim olan kampanya id sifirlanir (kampanya.js icindeki fonk calisir)
            this.emptyKampanyaDizisi // ekli kampanyalarin tutuldugu dizi sifirlanir (kampanya.js icindeki fonk calisir)
            this.emptyBirlestirilebilir // birlestirilebilir kampanyalarin tutuldugu dizi sifirlanir (kampanya.js icindeki fonk calisir)
            this.emptyBirlestirilemez // birlestirilemez kampanyalarin tutuldugu dizi sifirlanir (kampanya.js icindeki fonk calisir)
            this.$store.commit('addKazanc',{kazanc:""}) // bura da SILINECEK
        }
        this.$store.commit('addPromosyonVarmi',false) // kullanim devre disi kalsin diye bu eklendi. SILINECEK
    },
    computed : {
        ...mapGetters(["image","imagecompany","sepetOzeti","sepetButtonColor","sepetAdres","sepetFatura","sepetOdemeKayit",
        "showFaturaBilgisiCard","serverRequest","sepetOdemePageColor","showKampanyaAlani","kampanyaVarMi","kampanyaninIDsi",
        "ekliKampanya","kampanyaDizisi","toplamKazanc","birlestirilebilir","birlestirilemez",
        "secilenPromosyonKodu","promosyonIndirimTutar","promosyonVarmi","kazancList",
        "minimumSepetTutari","showMinimumSepetTutari","googleMesafe"]),
        ...mapActions(["emptyKampanyaninIDsi","emptyKampanyaDizisi","emptyBirlestirilebilir","emptyBirlestirilemez"]),
        sepettekiUrunSayi(){
            if(this.sepetOzeti.sepetim != null){
                var urun_sayi = this.sepetOzeti.sepetim.length
                return urun_sayi
            }
            return 0
        },
    },
    methods : {
        asamaBir(){
            if(this.asama1baraGecis == true){ // asamanin icindeki bilgiler doldurulmadan bar-dan asama degisimini engellemek icin kontrol
                this.asama2 = false; this.asama3 = false; this.asama4 = false
                this.odemeClass2 = ''; this.odemeClass3 = ''; this.odemeClass4 = '';
                this.odemeClass1 = 'odeme-each-active'
                this.ilerleButton = 'Teslİmat zamanı'
                this.classIcon1 = "fa-check-circle"
                setTimeout(() => this.asama1 = true, 520)
            }
            if(this.asama2baraGecis == true){ // 1ci bar secili oldugu halde eger 2ci bar bilgileri doluysa 2ci bar aktif renkle gozukur
                this.odemeClass2 = 'odeme-each-secilebilir'
                this.classIcon2 = "fa-check-circle"
            }
            if(this.asama3baraGecis == true){ // 1ci bar secili oldugu halde eger 3cu bar bilgileri doluysa 3cu bar aktif renkle gozukur
                this.odemeClass3 = 'odeme-each-secilebilir'
                this.classIcon3 = "fa-check-circle"
            }
            if(this.asama4baraGecis == true){ // 1ci bar secili oldugu halde eger 4cu bar bilgileri doluysa 4cu bar aktif renkle gozukur
                this.odemeClass4 = 'odeme-each-secilebilir'
                this.classIcon4 = "fa-check-circle"
            }
        },
        asamaIki(){
            if(this.asama2baraGecis == true){ // asamanin icindeki bilgiler doldurulmadan bar-dan asama degisimini engellemek icin kontrol
                this.asama1 = false; this.asama3 = false; this.asama4 = false
                this.odemeClass1 = 'odeme-each-secilebilir'; this.odemeClass3 = ''; this.odemeClass4 = '';
                this.odemeClass2 = 'odeme-each-active'
                this.ilerleButton = 'Ödeme tÜrÜ'
                this.classIcon2 = "fa-check-circle"
                setTimeout(() => this.asama2 = true, 520)
            }
            if(this.asama3baraGecis == true){ // 2ci bar secili oldugu halde eger 3cu bar bilgileri doluysa 3cu bar aktif renkle gozukur
                this.odemeClass3 = 'odeme-each-secilebilir'
                this.classIcon3 = "fa-check-circle"
            }
            if(this.asama4baraGecis == true){ // 2ci bar secili oldugu halde eger 4cu bar bilgileri doluysa 4cu bar aktif renkle gozukur
                this.odemeClass4 = 'odeme-each-secilebilir'
                this.classIcon4 = "fa-check-circle"
            }
        },
        asamaUc(){
            if(this.asama3baraGecis == true){ // asamanin icindeki bilgiler doldurulmadan bar-dan asama degisimini engellemek icin kontrol
                this.asama1 = false; this.asama2 = false; this.asama4 = false
                this.odemeClass1 = 'odeme-each-secilebilir'; this.odemeClass2 = 'odeme-each-secilebilir'; this.odemeClass4 = '';
                this.odemeClass3 = 'odeme-each-active'
                this.ilerleButton = 'sİparİş onayı'
                this.classIcon3 = "fa-check-circle"
                setTimeout(() => this.asama3 = true, 520)
            }
            if(this.asama4baraGecis == true){ // 3cu bar secili oldugu halde eger 4cu bar bilgileri doluysa 4cu bar aktif renkle gozukur
                this.odemeClass4 = 'odeme-each-secilebilir'
                this.classIcon4 = "fa-check-circle"
            }
        },
        asamaDort(){
            if(this.asama4baraGecis == true){ // asamanin icindeki bilgiler doldurulmadan bar-dan asama degisimini engellemek icin kontrol
                this.asama1 = false; this.asama2 = false; this.asama3 = false
                this.odemeClass1 = 'odeme-each-secilebilir'; this.odemeClass2 = 'odeme-each-secilebilir'; this.odemeClass3 = 'odeme-each-secilebilir';
                this.odemeClass4 = 'odeme-each-active'
                this.ilerleButton = 'sİparİş ver'
                this.classIcon4 = "fa-check-circle"
                this.otomatikPosetAtamasi() // yatay bardaki 4cu asamaya tiklandiginda otomatik poset atamasi yapilir
                setTimeout(() => this.asama4 = true, 520)
            }
        },
        getKullaniciAdres(){ // ProfilAdreslerim sayfasinda localstorage-e kayd edilen adres icerigini almak icin
            this.adresler = JSON.parse(localStorage.getItem("adres"))
        },
        getKullaniciFatura(){ // ProfilFaturalarim sayfasinda localstorage-e kayd edilen adres icerigini almak icin
            this.faturalar = JSON.parse(localStorage.getItem("sepet-fatura"))
        },
        scrollToTop(){ // sayfanin en basina donmek icin fonksiyon
            window.scrollTo(0,0);
        },
        asamayiKaydet(){ // gelinen asamaya kadarki bilgileri kayit altinda tutmak icin
            this.$store.commit('addSepetOdemeKayit',{adres_id:this.sepetAdres.adresId, teslim_suresi:this.teslimSuresi,
            randevu_saat_id:this.randevuSaatId, saat_ad:this.saatlerAd, current_date:this.currentDateFormat,
            teslim_suresi_son_saat:this.teslimSuresiSonSaat, odeme_tip:this.odemeTip,
            not:this.siparisNot, poset_degeri:this.posetDegeri, fatura:this.sepetFatura.faturaId})
        },
        kaldigimYerdenDevamEt(){
            this.odemeClass4 = 'odeme-each-active'; this.odemeClass1 = 'odeme-each-secilebilir'; this.odemeClass2 = 'odeme-each-secilebilir'; this.odemeClass3 = 'odeme-each-secilebilir';
            this.classIcon1 = "fa-check-circle"; this.classIcon2 = "fa-check-circle"; this.classIcon3 = "fa-check-circle";
            this.asama1baraGecis = true; this.asama2baraGecis = true; this.asama3baraGecis = true
            this.asama1 = false; this.asama2 = false; this.asama3 = false; this.asama4 = true;
            if(this.sepetOdemeKayit.odeme_tip === 2){
                this.odemeSekli = "Nakİt"; this.odemeTip = 2; this.nakitActive = "odeme-active"
            }else{
                this.odemeSekli = "Kredİ Kartı"; this.odemeTip = 1; this.krediKartiActive = "odeme-active"
            }
            this.teslimSuresi = this.sepetOdemeKayit.teslim_suresi
            this.randevuSaatId = this.sepetOdemeKayit.randevu_saat_id
            this.siparisNot = this.sepetOdemeKayit.not
            this.otomatikPosetAtamasi()
        },
        ilerle(){
            this.scrollToTop()
            if(this.asama1 == true){
                this.asama1 = false
                this.odemeClass1 = 'odeme-each-secilebilir'
                this.odemeClass2 = 'odeme-each-active'
                this.ilerleButton = 'Ödeme tÜrÜ'
                this.classIcon1 = "fa-check-circle"
                setTimeout(() => this.asama2 = true, 520)
            }else if(this.asama2 == true){
                this.asama2 = false
                this.odemeClass2 = 'odeme-each-secilebilir'
                this.odemeClass3 = 'odeme-each-active'
                this.ilerleButton = 'sİparİş onayı'
                this.classIcon2 = "fa-check-circle"
                setTimeout(() => this.asama3 = true, 520)
            }else if(this.asama3 == true){
                this.asama3 = false
                this.odemeClass3 = 'odeme-each-secilebilir'
                this.odemeClass4 = 'odeme-each-active'
                this.ilerleButton = 'sİparİş ver'
                this.classIcon3 = "fa-check-circle"
                this.otomatikPosetAtamasi() // yatay bardaki 4cu asamaya tiklandiginda otomatik poset atamasi yapilir
                setTimeout(() => this.asama4 = true, 520)
            }else if(this.asama4 == true){
                this.styleSticky = "z-index:1041;" // bildirim en ustte gozuksun diye, sticky class-inin z-index-ine etki eder
                this.dataTargetSiparisVer = "#siparisOlusturmaBildirimi" // bildirimin gozukmesi icin id atamasi
                // tum kontroller ilerle butonu uzerinden yapildigi icin, 4. asamadaki siparis ver butonu disinda
                // siparisiniz olusturulacaktir bildirimi gosterilmesin diye belirli saniye icinde dataTargetSiparisVer ici bosaltilir
                if(this.dataTargetSiparisVer != ""){ // daha onceden tiklanmis demektir..
                    setTimeout(() => this.dataTargetSiparisVer = "", 10) // ..tiklandiysa 10 mls icinde data icini bosalt
                }
                // this.siparisOlustur() // son asamada yani siparis olusturulurken bildirim eklemeden once
            }
        },
        asama1Kontrol(){ // sayfa ilk yuklendiginde 1ci asamanin aktif olarak gorunmesi icin
            this.asama1 = true
            this.odemeClass1 = 'odeme-each-active'
        },
        async fetchRandevuBilgi(){
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
                this.randevuBilgi = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
                this.ikinciAsamaOtomatikDoldurma() // ikinci asama otomatik doldurulmasi icin gerekli fonk cagrilir
                this.tarihAlaniKontrolu() // fonk cagrilmasi created-dan alinip buraya konuldu.
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
        },
        // 2. asamada tesimat tarihi alani ilkte OTOMATIK ilk gunun ilk aktif saati olarak dolsun diye yapilmasi gereken islemler
        ikinciAsamaOtomatikDoldurma(){
            if(this.teslimSuresi === ""){ // fetchRandevuBilgi sayfa created oldugunda calistigi icin asama kayitli asama yerine ilk gunun ilk saati otomatik olarak yazilmasin diye
                var en_yakin = []; var ran_bilgi = []
                this.randevuBilgi.map((item) => { // bu map islemi Teslimat Zamanınız ve ayni zamanda bir sonraki asamaya gecis icin gerekli izin data iceriginin doldurulmasi icin
                    en_yakin.push(item.enyakinrandevu)
                    ran_bilgi.push(item.randevu_bilgi)
                })
                var secilen = []; var saatler = []; var tarih_en_array = []; var day_month = []
                ran_bilgi[4].map((item) => { // bu map islemi siparis olusturulmasi icin gerekli teslim suresi ve randevu saat id degerlerini alabilmek icin
                    secilen.push(item.secilen)
                    saatler.push(item.saatler)
                    day_month.push(item.tarih)
                    this.dayMonth = day_month[0]
                    tarih_en_array.push(item.tarih_en)
                    this.currentDateFormat = tarih_en_array[0] // teslim suresi icin gerekli yil/ay/gun formati burada alindi
                })
                var secilen_id = secilen[0] + 1 // secilen_id-ye sorgudan donen bilgideki secilen bilgisi yazilir. karsilastirilacak 1
                saatler[0].map((item) => { // bu map islemi siparis olusturulmasi icin gerekli teslim suresi ve randevu saat id degerlerini alabilmek icin
                    if(item.id === secilen_id){ // saatler arrayi icindeki her saatin id-sine gore secilen karsilastirilir ve bilgileri sepet odeme olustururken kullanilsin diye alinir
                        this.teslimSuresiSonSaat = item.end // teslim sure icin gerekli end time buradan alinir. var degil de this olarak tanimlandi cunku asama kaydette kullaniliyor
                        this.saatlerAd = item.ad // 1) saat input alani secili olsun diye saatlerAd-a bu atama yapildi
                        this.teslimSuresi = this.currentDateFormat + " " + this.teslimSuresiSonSaat // 2) siparis olusturmak icin gerekli formata donusturuldu: 2020-12-08 16:00:00
                        this.randevuSaatId = item.id // 3) siparis olusturmak icin gerekli randevu saat id buraya yazilir
                    }
                })
            }else{ // asama kayitli ise 2ci asama icindeki bilgilerin doldurulmasi
                this.saatlerAd = this.sepetOdemeKayit.saat_ad
                this.tarih_alani = this.sepetOdemeKayit.current_date
                this.secilen_tarih = this.sepetOdemeKayit.current_date
                this.randevuSaatId = this.sepetOdemeKayit.randevu_saat_id
            }
        },
        tarihAlani(params){ // SepetOdemeVerticalMenu.vue-dan yani child-dan gelen data burada yazilir
            this.tarih_alani = params
        },
        secilenTarih(params){ // SepetOdemeVerticalMenu.vue-dan yani child-dan gelen data burada yazilir
            this.secilen_tarih = params
        },
        saatler_ad(params){ // SepetOdemeVerticalMenu.vue-dan yani child-dan gelen data burada yazilir
            this.saatlerAd = params
        },
        tarihAlaniKontrolu(){ // bu kontrol sayfa ilk yuklendiginde bugunku tarihin saatlerini secilmeden otomatik olarak getirmesi icin
            if(this.tarih_alani == ""){
                this.tarih_alani = this.currentDateFormat
            }else{
                this.tarih_alani
            }
        },
        // 2. Asama gerekli bilgiler dolduruldu mu kontrolu buradan yapilir
        teslimatZamani(){ // 'Teslimat Zamanınız :' alaninin doldurulmasi icin. secilen tarih + secilen saat bilgisi gelir. orn '13 Ocak 10:00 - 12:00'
            var teslimat_zamani = []
            var tarih_bilgisi = this.secilen_tarih // orn secilen_tarih '12 Ocak'
            var saat_adi = this.saatlerAd // orn saatlerAd '10:00 - 12:00'
            teslimat_zamani.push(tarih_bilgisi)
            teslimat_zamani.push(saat_adi)
            // BIR SONRAKI ASAMA ICIN KONTROL BURADAN YAPILIR
            // teslimat zamani henuz secilmediyse veya saat adi bos ise ekrana bos deger doner.
            // bu kontrolun amaci bir sonraki asamaya tum alanlar doldurulmadan gecilememesi
            if(teslimat_zamani==',' || teslimat_zamani[1]==""){
                this.birSonrakiAsamaDogruluk = true // bu asama istendigi gibi doldurulmadi, bir sonraki asamaya gecilemez demektir
                this.asama2baraGecis = false // ..asama secim bar-indaki o asamanin alani(mesela 1,2,3,4) gecisi acilir
                return ""
            }else{
                if(teslimat_zamani[0]==""){ // teslimat zamani icerisinde ilk deger yani 'gun + ay' alani bos ise
                    tarih_bilgisi = this.dayMonth // ikinciAsamaOtomatikDoldurma() fonksiyonundan elde edilen 'gun + ay' formatli deger tarih bilgisine yazilir
                    this.birSonrakiAsamaDogruluk = false // bu asama istendigi gibi dolduruldu, bir sonraki asamaya gecilebilir demektir
                    this.asama2baraGecis = true // ..asama secim bar-indaki o asamanin alani(mesela 1,2,3,4) gecisi acilir
                    return tarih_bilgisi + " " + saat_adi
                }else{ // 'gun + ay' alani seciliyse zaten secilen degerler yazilir
                    this.birSonrakiAsamaDogruluk = false // bu asama istendigi gibi dolduruldu, bir sonraki asamaya gecilebilir demektir
                    this.asama2baraGecis = true // ..asama secim bar-indaki o asamanin alani(mesela 1,2,3,4) gecisi acilir
                    return tarih_bilgisi + " " + saat_adi
                }
            }
        },
        // 1. Asama gerekli bilgiler dolduruldu mu kontrolu buradan yapilir
        adresBilgileri(){// getKullaniciAdres() fonksiyonu icinde doldurulan adresler alanina gore adres secildi mi kontrolu yapilir
            if(this.adresler == null){ // adres secilmemisse..
                this.birSonrakiAsamaDogruluk = true // ..ilerle butonu deaktif yapilir (true demek disabled=true)
                this.asama1baraGecis = false // ..asama secim bar-indaki o asamanin alani(mesela 1,2,3,4) gecisi engellenir
            }else{ // adres secilmisse..
                this.birSonrakiAsamaDogruluk = false // ..ilerle butonu aktif yapilir (false demek disabled=false)
                this.asama1baraGecis = true // ..asama secim bar-indaki o asamanin alani(mesela 1,2,3,4) gecisi acilir
            }
        },
        addNakit(){
            this.odemeSekli = "Nakİt"
            this.odemeTip = 2 // siparis olusturma asamasinda nakit icin odeme tipi 2
            this.nakitActive = "odeme-active"
            this.krediKartiActive = ""
        },
        addKrediKarti(){
            this.odemeSekli = "Kredİ Kartı"
            this.odemeTip = 1 // siparis olusturma asamasinda kredi karti icin odeme tipi 1
            this.krediKartiActive = "odeme-active"
            this.nakitActive = ""
        },
        // 3. Asama gerekli bilgiler dolduruldu mu kontrolu buradan yapilir
        odemeTuru(){
            if(this.odemeSekli == '' || this.odemeSekli == null){
                this.birSonrakiAsamaDogruluk = true // ..ilerle butonu deaktif yapilir (true demek disabled=true)
                this.asama3baraGecis = false // ..asama secim bar-indaki o asamanin alani(mesela 1,2,3,4) gecisi acilir
            }else{
                this.birSonrakiAsamaDogruluk = false // ..ilerle butonu deaktif yapilir (true demek disabled=true)
                this.asama3baraGecis = true // ..asama secim bar-indaki o asamanin alani(mesela 1,2,3,4) gecisi acilir
            }
        },
        // 4. Asama gerekli bilgiler dolduruldu mu kontrolu buradan yapilir
        siparisOnayi(){
            if(this.posetDegeri == ''){
                this.birSonrakiAsamaDogruluk = true
                this.asama4baraGecis = false
            }else{
                this.birSonrakiAsamaDogruluk = false
                this.asama4baraGecis = true
            }
        },
        // bu fonksiyon icinde siparis olusturulmasi icin gerekli 'teslimsuresi' ve 'randevusaatid' bilgileri alinir
        getTeslimSuresi(rand,saatler){ // 2.asama olan yani teslimat zamani alanindaki her radio button-a tiklanildigi anda siparis olusturmak icin gerekli teslim suresi alinir
            var teslimSuresiYilAyGun = rand.tarih_en // orn format: 2020-12-08
            var teslimSuresiEndSaat = saatler.end // orn format: 16:00:00
            this.teslimSuresi = teslimSuresiYilAyGun + " " + teslimSuresiEndSaat // siparis olusturmak icin gerekli formata donusturuldu: 2020-12-08 16:00:00
            this.randevuSaatId = saatler.id // siparis olusturmak icin gerekli randevu saat id buraya yazilir
        },
        // sayfa ilk render oldugunda onceden secilmis kayitli bir adres var ise localdeki kayitli adresin id-si store-daki sepet adres-e yazilir
        // ProfilAdreslerim.vue-da adres ekle alanina basildiginda secili adresin id-si alindigi icin, ekleye basilmadigi durumda sayfa ilk render oldugunda sepet adres bos oluyor.
        // bu fonk bu durumu kontrol etmek icin var
        adresIdVarmi(){
            if(this.sepetAdres === ""){
                // localde adres yok ise localdekiAdresin 0-inci indeks okunurken hatayi handle etmek icin bu kosul yapildi
                if(localStorage.getItem("adres") === null){
                    return
                }else{
                    var localdekiAdres = JSON.parse(localStorage.getItem("adres"))
                }
                // sepetozeti.js-deki addSepetAdres fonk calisir ve sepet adres-e localdeki adres.id yazilir ([0] yani 0-ci indeksin id-sinin alinmasi demek zaten adres onceden kurulan yapi geregi hep bir elemanli dizi oluyor)
                this.$store.commit('addSepetAdres',{adresId:localdekiAdres.id})
            }
        },
        // poset secimi alanina gelindiginde otomatik olarak poset secili olsun diye
        otomatikPosetAtamasi(){
            if(this.posetDegeri === ''){ // daha once herhangi bir poset secimi yapilmadiginda fonk calisir
                this.posetActive = "active"
                this.posetDegeri = "11"
                this.basariliPosetFiyati = this.posetFiyati // sepet odeme basarili sayfasi icin
                // otomatik poset atamasinda toplam tutar guncellensin diye
                this.sepetOzeti.toplamTutar = (parseFloat(this.sepetOzeti.toplamTutar) + parseFloat(this.posetFiyati)).toFixed(2)
            }
        },
        bezcantaSecimi(){
            if(this.posetDegeri != "21"){
                this.bezcantaActive = "active"
                this.posetActive = ""
                this.posetDegeri = "21"
                if(this.showKampanyaAlani === "" || this.kampanyaVarMi.show === false){ // kampanya secili degilse
                    this.sepetOzeti.toplamTutar = (parseFloat(this.sepetOzeti.toplamTutar) + parseFloat(this.bezcantaFiyati) - parseFloat(this.posetFiyati)).toFixed(2)
                }else{ // kampanya secili ise
                    this.showKampanyaAlani.kampanyaliTutar = (parseFloat(this.showKampanyaAlani.kampanyaliTutar) + parseFloat(this.bezcantaFiyati) - parseFloat(this.posetFiyati)).toFixed(2)
                    this.showKampanyaAlani.kampanyaliIndirimsizTutar = (parseFloat(this.showKampanyaAlani.kampanyaliIndirimsizTutar) + parseFloat(this.bezcantaFiyati) - parseFloat(this.posetFiyati)).toFixed(2)
                }
            }
        },
        posetSecimi(){
            if(this.posetDegeri != "11"){
                this.posetActive = "active"
                this.bezcantaActive = ""
                this.posetDegeri = "11"
                if(this.showKampanyaAlani === "" || this.kampanyaVarMi.show === false){ // kampanya secili degilse
                    this.sepetOzeti.toplamTutar = (parseFloat(this.sepetOzeti.toplamTutar) + parseFloat(this.posetFiyati) - parseFloat(this.bezcantaFiyati)).toFixed(2)
                }else{ // kampanya secili ise
                    this.showKampanyaAlani.kampanyaliTutar = (parseFloat(this.showKampanyaAlani.kampanyaliTutar) + parseFloat(this.posetFiyati) - parseFloat(this.bezcantaFiyati)).toFixed(2)
                    this.showKampanyaAlani.kampanyaliIndirimsizTutar = (parseFloat(this.showKampanyaAlani.kampanyaliIndirimsizTutar) + parseFloat(this.posetFiyati) - parseFloat(this.bezcantaFiyati)).toFixed(2)
                }
            }
        },
        getKoordinat(){
            this.koordinat = localStorage.getItem("koord")
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
            this.ushp = this.decryptCookie("ushp")
        },
        // siparis olusturmadan sepet ozeti alaninda yer alan 'tutar' ve 'indirimsiz tutar' alanlarinin guncellenmesi.
        // bu fonksiyonda simdilik secili poset degerleri 'tutar' ve 'indirimsiz tutar'-dan cikarilip sorgu icin hazir hale getiriliyor.
        sepetOzetiGuncelle(){
            this.kazanciniz2 = this.kazanciniz
            this.kampanya = JSON.stringify(this.kampanyaninIDsi) // burayi guncelle
            if(this.kampanyaVarMi.show === false){ // kampanya secili degilse
                this.sepetOzeti.toplamTutar = this.sepetOzeti.araToplam
                this.indirimsizTutar = this.sepetOzeti.araToplam
            }else if(this.kampanyaVarMi.show === true){ // kampanya seciliyse
                if(this.posetDegeri === '11'){ // sorgu yapildiginda sepet tutarindan poset fiyati cikarilarak gonderilsin diye
                    this.sepetOzeti.toplamTutar = (this.showKampanyaAlani.kampanyaliTutar - this.posetFiyati).toFixed(2)
                    this.indirimsizTutar = (this.showKampanyaAlani.kampanyaliIndirimsizTutar - this.posetFiyati).toFixed(2)
                    this.basariliPosetFiyati = this.posetFiyati // sepet odeme basarili sayfasi icin
                    // console.log("var - poset")
                }else{
                    this.sepetOzeti.toplamTutar = (this.showKampanyaAlani.kampanyaliTutar - this.bezcantaFiyati).toFixed(2)
                    this.indirimsizTutar = (this.showKampanyaAlani.kampanyaliIndirimsizTutar - this.bezcantaFiyati).toFixed(2)
                    this.basariliPosetFiyati = this.bezcantaFiyati // sepet odeme basarili sayfasi icin
                    // console.log("var - bez")
                }
            }
            if(this.promosyonVarmi === true){
                this.sepetOzeti.toplamTutar = (parseFloat(this.showKampanyaAlani.kampanyaliTutar) + parseFloat(this.promosyonIndirimTutar)).toFixed(2)
            }
        },
        async siparisOlustur(){
            this.sepetOzetiGuncelle() // tutarlardan secili poset degerinin cikarilmasi icin fonk cagrilir
            try {
                const formData = new FormData();
                formData.append('f', 'add_order_v4');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('tutar', this.sepetOzeti.toplamTutar);
                formData.append('indirimsiztutar', this.indirimsizTutar);
                formData.append('kampanya', this.kampanya);
                formData.append('promosyon', this.secilenPromosyonKodu.code);
                formData.append('odemetip', this.odemeTip);
                formData.append('teslimsuresi', this.teslimSuresi);
                if(this.googleMesafe == "" || this.googleMesafe == null){
                    formData.append('mesafe', "0");
                }else{
                    formData.append('mesafe', this.googleMesafe);
                }
                formData.append('siparisnot', this.siparisNot);
                formData.append('iptalneden', '');
                formData.append('adres', this.sepetAdres.adresId); // this.sepetAdres.adresId
                formData.append('siparisdetay', JSON.stringify(this.sepetOzeti.sepetim));
                formData.append('toplamsure', '0');
                formData.append('hizmetalindimi', this.sepetOzeti.hizmetBedeliAlindiMi);
                formData.append('hizmetbedeli', this.sepetOzeti.hizmetBedeli);
                formData.append('os', 'web');
                formData.append('randevusaatid', this.randevuSaatId);
                formData.append('fatura', this.sepetFatura.faturaId);
                formData.append('poset', this.posetDegeri);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.siparisTamamla = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
                this.$store.commit('addSepetOdemeKayit',"") // kaldigim yerden devam et icin gerekli data ici basarili siparis sonrasi bosaltilir
                // console.log(JSON.stringify(this.siparisTamamla))
            } catch (error) {
                this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
            }
        },
        siparisBasarili(){ // siparisi ver butonuna tiklandiginda sorgudan donen sonuc success ise
            var indirimsiz_tutar = (parseFloat(this.indirimsizTutar) + parseFloat(this.basariliPosetFiyati)).toFixed(2)
            var sepet_toplam = (parseFloat(this.sepetOzeti.toplamTutar) + parseFloat(this.basariliPosetFiyati)).toFixed(2)
            if(this.promosyonVarmi === true){ // promosyon ekli oldugunda sepetOdemeBasariliPage-de kullaniciya toplam tutardan prom indirimli degeri cikarilmis sekilde gostermek icin
                sepet_toplam = (parseFloat(sepet_toplam) - parseFloat(this.promosyonIndirimTutar)).toFixed(2)
            }
            this.$store.commit('addSiparisBasarili',{sepet:this.sepetOzeti.sepetim,
                ara_toplam:this.sepetOzeti.araToplam, toplam:sepet_toplam, kazanc:this.kazanciniz2,
                k_varmi:this.kampanya, indirimsiztutar:indirimsiz_tutar, poset:this.basariliPosetFiyati})
            this.sepetiTemizle()
            this.$router.push({name: 'SepetOdemeBasariliPage'})
        },
        // siparis olusturulurken olusabilecek hata veya uyarilar icin
        siparisHatali(){
            // yetersiz stok kontrolu
            if(this.siparisTamamla.status === "fail" && this.siparisTamamla.result === "not_enough_stock"){
                this.showYetersizStokMesaji = true
                this.yetersizUrununIdsi = this.siparisTamamla.urun_id
            }
            // eger urunun fiyati degismisse
            if(this.siparisTamamla.status === "fail" && this.siparisTamamla.result === "pricechange"){
                this.showFiyatDegismis = true
                this.fiyatiDegisenUrunIdsi = this.siparisTamamla.urun_id
            }
        },
        sepetiTemizle(){
            localStorage.removeItem("sepet")
            this.$store.commit('addShowKampanyaAlani',"")
        },
        sepetiGoruntule(){ // sepet ozeti alanindaki sepeti goruntule butonu icin. sepetteki urunlerin show/hide-i icin
            if(this.showSepetim === false){
                this.showSepetim = true
                this.sepetiGoruntuleText = "Gizle"
                this.classSepetArrowIcon = "fa-angle-up"
                if(this.sepettekiUrunSayi > 3){
                    this.showSepetOzetiMore = true // sepetteki urun sayi 3-ten fazla ise bunu kullaniciya bildirme amacli
                    setTimeout(() => { this.showSepetOzetiMore = false }, 4000) // 4 saniye boyunca icon yanip sonecek
                }else{
                    this.showSepetOzetiMore = false
                }
            }else{
                this.showSepetim = false
                this.sepetiGoruntuleText = "Görüntüle"
                this.classSepetArrowIcon = "fa-angle-down"
            }
        },
        sepetimeGit(){
            this.$router.push({name: 'SepetPage'})
            this.asamayiKaydet()
        },
        // eger urun fiyati degismisse sepet ozeti alaninda gorunecek olan mesaj icindeki 'urun fiyatini guncelle' butonuna basilirsa calisacak olan fonk
        urunFiyatiniGuncelle(sepet){
            var localdekiSepet = localStorage.getItem("sepet").slice(2,-2)
            var sepetim = JSON.stringify(sepet).slice(1,-1)
            var satisfiyatiIndex = sepetim.indexOf("satisfiyat")
            var stokIndex = sepetim.indexOf("stok")
            var satisfiyati = sepetim.slice(satisfiyatiIndex-1,stokIndex-2)
            var guncellenmisFiyat = '"satisfiyat":"' + this.siparisTamamla.extra_bilgi + '"'
            var guncellenmisSepetim = sepetim.replace(satisfiyati,guncellenmisFiyat)
            var guncellenmisLocaldekiSepet = JSON.parse("[{" + localdekiSepet.replace(sepetim,guncellenmisSepetim) + "}]")
            localStorage.removeItem("sepet")
            localStorage.setItem("sepet",JSON.stringify(guncellenmisLocaldekiSepet))
            this.showUrunFiyatiGuncellendi = true
            this.$store.commit('addFiyatGuncellendi',{urunAdi:sepet.ad, urunGuncelFiyati:this.siparisTamamla.extra_bilgi, showMesaj:this.showUrunFiyatiGuncellendi})
            this.$router.push({name: 'SepetPage'})
            this.asamayiKaydet()
        },
        // teslimat zamani alanindaki 4lu vertical tarih alani icindeki bugunun tarihini yazmak icin
        bugun(rand){
            if(rand.tarih_en === this.currentDateFormat){
                return "- Bugün"
            }
        },
        faturayiKaldir(){ // 4. asamadaki fatura ekliyse kaldirmak icin
            localStorage.removeItem("sepet-fatura")
            this.sepetFatura.faturaId = "" // fatura cikarildiginda fatura id bilgisi de sifirlansin diye
            this.$store.commit('addShowFaturaBilgisiCard',false) // SepetOdemePage-de fatura bilgisi alaninin gizlenmesi icin
        },
        adresKontrolleri(){
            this.showAdres = true
        },
        adressecimkapatMi(params){ // ProfilAdreslerim.vue-dan yani child-dan gelen data burada yazilir
            this.showAdres = params
        },
        teslimatadresMi(params){
            this.adresler = params
        },
        kopyalandi(){
            this.showKopyalandi = true
            if(this.showKopyalandi == true){
                setTimeout(() => { this.showKopyalandi = false }, 1000)
            }
        },
        showKazancInfo(){
            this.showKazancInfoClass = "kazanc-info-show"
        },
        hideKazancInfo(){
            this.showKazancInfoClass = ""
        },
        kazancInfoIcerikAtamasi(){ // kazanc yanindaki unlem iconuna tiklandiginda acilacak div-in doldurulmasi
            if(this.sepetOzeti.hizmetBedeliAlindiMi=='0'){
                this.$store.commit('addKazancList',{hizmetbedeli:parseFloat(this.sepetOzeti.hizmetBedeli).toFixed(2)})
            }
        },
        kazancInfoMessage(e){
            e.preventDefault();
        },
        // tarayicinin bir sayfasinda sepet odeme sayfasindayken, diger sayfasinda sepetten urun silindiginde
        // toplam tutar degisecegi icin toplam tutarin minimum siparis tutarindan asagi oldugunu
        // anlamak icin yazilmis bir kontrol
        kontrolMinimumSepetTutari(){ // sepet tutari minimum sepet tutarindan az oldugunda uyari icin
            var sepetim_local = JSON.parse(localStorage.getItem("sepet"))
            var sepetim_toplam_tutar = sepetim_local.reduce((acc, item) => acc + parseFloat(item.satisfiyat * item.adet), 0).toFixed(2)
            if(parseFloat(sepetim_toplam_tutar) >= parseFloat(this.minimumSepetTutari)){
                this.$store.commit('addShowMinimumSepetTutari', false) // buyukse
            }else{
                this.$store.commit('addShowMinimumSepetTutari', true) // kucukse
            }
        },
        // minimum sepet tutari mesajini bir nevi kapatmak icin
        closeMinSepetTutarMesaj(e){
            e.stopPropagation(); // her click'te kontrolMinimumSepetTutari fonksiyonu calistigi icin, showMinimumSepetTutari false yapilabilsin diye
            this.$store.commit('addShowMinimumSepetTutari', false)
            this.$router.push('/sepet')
        },
        // 3cu asamadaki odeme yontemi secmek icin (kapida / online odeme)
        odemeYontemiSec(yontem){
            this.seciliOdemeYontemi = yontem.id // aktif odeme class-i kontrolu icin secili id degiskene eklendi
            // kapida odeme icindeki secili odeme sekilleri sifirlansin diye START
            this.odemeTip = '' // sorguda gonderilecek olan odeme tip(1 veya 2 degeri) sifirlanir
            this.odemeSekli = '' // asama gecis kontrolu icin gerekli alan sifirlanir. asama gecilmesin diye
            this.nakitActive = ''; this.krediKartiActive = '' // secili class gosterimi de sifirlanir
            // kapida odeme icindeki secili odeme sekilleri sifirlansin diye END
        },
        // async siparisOlustur(){
        //     try {
        //         const formData = new FormData();
        //         formData.append('f', 'add_order_v4');
        //         formData.append('user', '(533) 776 72 75');
        //         formData.append('uid', 'cad4c04cd080dee7a6dba659e48a1f68');
        //         formData.append('tutar', '201.89');
        //         formData.append('odemetip', '2');
        //         formData.append('teslimsuresi', '2020-12-08 16:00:00');
        //         formData.append('mesafe', '0');
        //         formData.append('siparisnot', 'test');
        //         formData.append('iptalneden', '');
        //         formData.append('adres', '11');
        //         formData.append('siparisdetay', '[{"id":"26178","ad":"Dana Antrikot","satisfiyat":"81.95","imageupdate":"8","stokkod":"KGR-22400","kampanyalimi":"0","birim":"1","kampanyasizsatisfiyat":"81.95","stok":"100","kdvoran":"8","altgrup":"400","grup":"40","markaoncelik":null,"aciklama":" ","adet":2,"barkod":"KGR-22400","kampanyasizfiyat":"81.95"},{"id":"26193","ad":"Dana Az Yagli Kiyma (Kg)","satisfiyat":"55.95","imageupdate":"1","stokkod":"KGR-22410","birim":"1","kampanyalimi":"0","altgrup":"400","stok":"100","kdvoran":"8","kampanyasizsatisfiyat":"55.95","grup":"40","markaoncelik":null,"aciklama":" ","adet":0.5,"barkod":"KGR-22410","kampanyasizfiyat":"55.95"},{"birim":"0","stokkod":"869063790645","kampanyasizsatisfiyat":"21.95","imageupdate":"1","id":"14778","kdvoran":"18","markaoncelik":null,"satisfiyat":"21.95","grup":"60","barkod":"869063790645","stok":"204","adet":1,"altgrup":"602","aciklama":" ","kampanyasizfiyat":"21.95","kampanyalimi":"0","ad":"Cif Pouch Sprey Mutfak 750 Ml +750 Ml"}]');
        //         formData.append('toplamsure', '0');
        //         formData.append('hizmetalindimi', '0');
        //         formData.append('hizmetbedeli', '4.9');
        //         formData.append('indirimsiztutar', '213.83');
        //         formData.append('os', 'web');
        //         formData.append('randevusaatid', '3');
        //         formData.append('fatura', '0');
        //         formData.append('poset', '21');
        //         const response = await axios.post('https://gunkaysanalmarket.zdc.com.tr/test/fonksiyon.php',formData,{
        //             headers: {
        //             // 'Accept': 'application/json',
        //             // "Access-Control-Allow-Origin": "*",
        //             // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //             }
        //         });
        //         this.siparisTamamla = response.data // data() icerisinde de tanimlanan altgrupUrunler array-ine request sonrasi donen bilgiler yazilir
        //     } catch (error) {
        //         this.errors.push(error) // hata mesajlari data() icerisinde de tanimlanan error array-ine yazilir
        //     }
        // }
    },
    created(){
        this.fetchRandevuBilgi()
        this.getKullaniciAdres()
        this.asama1Kontrol()
        this.adresIdVarmi()
        this.getUid_Udep()
        this.kazancInfoIcerikAtamasi()
    }
}
</script>

<style scoped>
    /* @media (max-width : 400px){
        .odeme-each{
            max-height: 110px;
        }
        .one{
            font-size: 11px !important;
        }
        .vertical-menu{
            font-size: 10px;
        }
        .vertical-menu-item{
            font-size: 10px;
            padding: 12px 0px 6px 20px !important;
        }
        .sectiginiz-tarih{
            margin: 10px -20px 5px 10px !important;
        }
        .dark-grey-text{
            font-size: 12px !important;
        }
    } */
    @media (max-width : 990px){
        #sepetOzetiID{ margin-bottom: 50px !important; }
    }
    @media (max-width : 770px){
        .odeme-each{ max-height: 110px; }
        .one{ font-size: 12px !important; }
        .vertical-menu{ font-size: 12px; }
        .vertical-menu-item{
            font-size: 12px;
            padding: 12px 0px 6px 60px !important;
        }
        .sectiginiz-tarih{ margin: 10px -20px 5px 15px !important; }
        .dark-grey-text{ font-size: 12px !important; }
        .list-group-flush{ font-size: 11px; }
        .list-group-flush span{ font-size: 12px; }
        .ozet-sepetim{ font-size: 9px; }
        .goruntule span{ font-size: 9px; }
        .goruntule i{ font-size: 9px; }
        .sepet-icerigi strong{ font-size: 9px; }
        .alisverisi-tamamla{ font-size: 8px; }
    }
    /* row margin kontrolu burada yapildi */
    @media (max-width : 500px){
        .odeme-each{ max-height: 110px; }
        .one{ font-size: 12px !important; }
        .vertical-menu{ font-size: 10px; }
        .vertical-menu-item{
            font-size: 10px;
            padding: 12px 0px 6px 20px !important;
        }
        .sectiginiz-tarih{ margin: 10px -20px 5px 15px !important; }
        .dark-grey-text{ font-size: 12px !important; }
        .row{
            margin-left: 0 !important;
            margin-right: 0 !important;
        }
        .alisverisi-tamamla{ font-size: 11px; }
        .list-group-flush{ font-size: 13px; }
        .list-group-flush span{ font-size: 13px; }
        .ozet-sepetim{ font-size: 12px; }
        .goruntule span{ font-size: 12px; }
        .goruntule i{ font-size: 12px; }
    }
    @media (max-width : 480px){
        #dorduncu-asama{
            padding-top: 35px !important;
        }
    }
    @media (max-width : 420px){
        .odeme-each i{ display: none; }
    }
    /* Indirim kodu bilgisi START */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
    /* Indirim kodu bilgisi END */
    /* Sepet Ozeti alanindaki Sepetim START */
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .3s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    /* Sepet Ozeti alanindaki Sepetim END */
    .card-subtitle{
        font-size: 12px;
    }
    button{
        outline:none !important;
    }
    .sepetodeme-profil-adreslerim{
        margin-top: -20px;
    }
    .sepetodeme-adres{
        transition: all 0.3s ease;
    }
    .sepetodeme-adres:hover{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
    }
    .odeme-each{
        border: 1px solid #D9D9D9;
        text-align: left;
        color: #D7D7D7;
        padding: 15px;
    }
    .odeme-each:hover{
        cursor: pointer;
    }
    .odeme-each-active{
        background-color:#5FA56C;
        color: white;
    }
    .odeme-each-secilebilir{ /* o anki asamanin secilebilirlik durumu icin */
        color: #A2A2A2;
        transition: 1s;
    }
    .odeme-each span{
        font-size: 26px;
        font-weight: 800;
    }
    .odeme-each .one{
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
    }
    /* .vertical-menu{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
    } */
    .vertical-menu-item{
        margin-left: -31px;
        border: 1px solid #eee;
        min-height: 180px;
        max-height: auto;
        padding: 12px 12px 12px 60px;
        background-color: white;
        /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1); */
    }
    .her-saat{
        border: 1px solid #eee;
        border-radius: 5px;
        margin: 3px;
        padding: 5px;
        text-align: center;
    }
    input[type="radio"]{
        top: -1px;
        left: -5px;
        position: relative;
    }
    input[type="radio"]::after{
        cursor: pointer;
        width: 18px;
        height: 18px;
        border-radius: 5px;
        background-color: #d1d3d1;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
        transition: .2s;
    }
    input[type='radio']:checked:after {
        width: 18px;
        height: 18px;
        border-radius: 5px;
        background-color: #5FA56C;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
    input[type="radio"]:disabled::after {
        background-color: #f1f1f1;
    }
    .saatler-enable{
        cursor: pointer;
    }
    .saatler-disable{
        cursor: no-drop;
        color: #D7D7D7;
    }
    .rand-tarih{
        font-size: 11px;
        border: 1px solid #5FA56C;
        border-radius: 3px;
        background-color: #5FA56C;
        color: white;
        padding: 2px;
    }
    .sectiginiz-tarih{
        border: 1px solid #eee;
        margin-left: -10px;
        padding: 12px;
    }
    .sectiginiz-tarih span{
        font-size: 13px;
    }
    .sectiginiz-tarih p{
        margin-top: 10px;
        font-size: 13px;
    }
    .odeme-sekli-nakit{
        border: 1px solid #eee;
        border-radius: 5px;
        background-color: white;
        color: #343434;
        padding: 15px;
        width: auto;
        margin: 0 5px 3px 5px;
    }
    .odeme-sekli-nakit:hover{
        cursor: pointer;
        background-color: #F5F5F5;
    }
    .odeme-active{
        cursor: pointer;
        background-color: #F5F5F5;
        border: 1px solid #c7c7c7;
    }
    .odeme-sekli-nakit-aciklama{
        font-size: 12px;
        color: #989898;
        margin-bottom: 0px;
    }
    .odeme-sekli-sonucu{
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 10px 10px 10px 15px;
        width: 150px;
    }
    .sticky {
        z-index: 1;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 15px;
    }
    .font-size-13{
        font-size: 13px;
    }
    .poset-secimi{
        border: 2px solid #dddddd;
        border-radius: 4px;
        padding: 10px;
        min-width: 230px;
        transition: .5s;
    }
    .poset-secimi:hover{
        cursor: pointer;
    }
    .poset-secimi span{
        font-size: 13px;
        text-align: center;
    }
    .active{
        border: 2px solid #5FA56C;
    }
    /* sepet alani START */
    .ozet-sepetim{
        border: 1px solid #eee;
        border-radius: 5px;
        background: #e9e9e9;
        color: rgb(122, 122, 122);
        padding: 10px;
        transition: .4s;
        animation: background 5s infinite alternate;
    }
    @keyframes background {
        from {
            background: #e9e9e9;
        }
        to {
            background: #ffffff;
        }
    }
    .ozet-sepetim:hover{
        border: 1px solid rgb(207, 207, 207);
        background: #f7f7f7;
    }
    .goruntule{
        border: 1px solid #eee;
        padding: 2px 5px 2px 5px;
        font-size: 11px;
        color: rgb(122, 122, 122);
        cursor: pointer;
        transition: .2s;
    }
    .goruntule:hover{
        border: 1px solid rgb(212, 211, 211);
        color: rgb(78, 78, 78);
        border-radius: 2px;
    }
    .sepet-icerigi{
        font-size: 12px;
    }
    .sepet-icerigi .fiyat{
        font-size: 10px;
    }
    .sepet-icerigi .tutar{
        font-size: 11px;
    }
    /* sepet alani END */
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    /* Siparis olustururken olusabilecek hata durumlari START */
    .yetersiz-stok{
        font-size: 12px;
        font-weight: 800;
        text-align: center;
        margin-bottom: 5px;
        color: #3F729B;
        border: 1px solid #3F729B;
        border-radius: 4px;
        padding: 5px;
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 1s;
    }
    @keyframes fadeInOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .yetersiz-stok-button{
        display: block;
        font-size: 10px;
        text-transform: uppercase;
        border: 1px solid #cccccc;
        border-radius: 3px;
        color: rgb(61, 61, 61);
        padding: 3px;
        cursor: pointer;
    }
    .yetersiz-stok-button:hover{
        border: 1px solid #a7a7a7;
    }
    /* Siparis olustururken olusabilecek hata durumlari END */
    .img-width{
        max-width: 45px;
        max-height: 60px;
        object-fit: contain;
    }
    .resim-border{
        border: 1px solid #eee;
        border-radius: 10px;
        background: white;
        width: 50px;
        height: 70px;
        /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1); */
    }
    #sepet-urunler{
        max-height: 320px;
        overflow: hidden;
    }
    #sepet-urunler:hover{
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 14px; /* y ekseni uzerindeki genisligi */
        height: 7px; /* x ekseni uzerindeki yuksekligi */
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
    }
    .sepet-ozeti-more{
        position: absolute;
        top: 400px;
        left: 50%;
    }
    .faturayi-sepetten-kaldir{
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.3s linear;
        position: absolute;
        top: 41%;
        right: 4%;
        font-size: 11px;
        text-transform: uppercase;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 3px 5px;
        color: white;
        background: red;
        box-shadow: 0 0 3px red;
        cursor: pointer;
        transition: .4s;
    }
    .faturayi-sepetten-kaldir:hover{
        color: red;
        background: white;
        font-weight: 800;
    }
    .fatura-card:hover .faturayi-sepetten-kaldir{
        visibility: visible;
        opacity: 1;
    }
    /* fatura modal acildiginda bottom nav menu-nun uzerinde gorunmesin diye */
    #exampleModal{
        z-index: 1042;
    }
    .form-group textarea{
        min-height: 50px;
        max-height: 100px;
        font-size: 12px;
    }
    .fatura-bilgisi-ekle-button{
        position: absolute;
        top: 12px;
        right: 8px;
        padding: 5px 10px;
    }
    .arkafon{
        z-index: 1000;
        color: black;
        position: fixed;
        top: 0;
        left: 0;
        margin-left: calc(50% - 50vw);
        width: 100vw;
        height: 100%;
        background: rgba(43, 43, 43, 0.8);
        display: flex;
        justify-content: center;
        overflow-x: scroll;
    }
    .ownModal{
        z-index: 100;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        background: white;
        max-width: 500px;
        min-width: 250px;
        position: absolute;
        top: 20px;
        padding: 30px;
    }
    .baslik{
        padding-bottom: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: white;
    }
    .baslik span{
        padding-top: 10px;
        font-weight: 400;
    }
    .icerik{
        display: flex;
        justify-content: center;
    }
    .closeC .close{
        position: absolute;
        right: 30px;
    }
    .prom-var{
        color: #fc2828;
    }
    .promosyon-ekle-button{
        position: absolute;
        top: 4px;
        right: 150px;
    }
    .kazanc-icon{
        margin-right: 5px;
        font-size: 14px;
        cursor: pointer;
    }
    .kazanc-info{
        position: absolute;
        bottom: 40px;
        right: 0px;
        display: none;
        border: 1px solid #00C851;
        border-radius: 5px;
        padding: 10px;
        color: black;
        background: white;
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0px rgba(0,0,0,0.2);
        backdrop-filter: blur(15px);
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
        font-size: 12px;
        font-weight: 800;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: .2s;
    }
    .kazanc-info li{
        margin-bottom: 2px;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0px rgba(0,0,0,0.2);
        backdrop-filter: blur(15px);
    }
    .kazanc-info-show{
        display: block;
    }
    .tamam-anladim{
        border: 1px solid #eeeeee;
        padding: 5px;
        background: #eeeeee;
    }
    .card{
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        box-shadow: 0 0px rgba(0,0,0,0.2);
    }
    /* 3cu asamadaki odeme yontemi secimi START */
    .odeme-yontemi-secimi{
        font-weight: 400;
        font-size: 14px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .odeme-yontemi-secimi div{
        border: 2px solid #eee;
        background-color: white;
        color: #838383;
        padding: 15px;
        width: auto;
        margin: 0 5px 3px 5px;
        cursor: pointer;
        transition: .4s;
    }
    .odeme-yontemi-secimi div:hover{
        border: 2px solid #569129;
        border-radius: 5px;
        color:  white;
        background: #5FA56C;
    }
    .odeme-yontemi-secimi .odemeYontemiActive{ /* secili/aktif odeme yontemi class-i */
        border: 2px solid #569129;
        border-radius: 5px;
        color:  white;
        background: #5FA56C;
    }
    /* 3cu asamadaki odeme yontemi secimi END */
</style>