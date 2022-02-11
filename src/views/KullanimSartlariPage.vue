<template>
    <div>
        <Navbar />
        <BottomNavMenu />
        <div class="row m-4">
            <div class="col-md-1"></div>
            <div class="col-lg-10 col-md-12 kullanim-sartlari pt-4 pb-4">
                <div class="ks-baslik">GÜNKAY SANAL MARKET ÖN BİLGİLENDİRME FORMU <hr></div>
                <div>İşbu Ön Bilgilendirme Formu, GÜNKAY Uygulaması üzerinden vermekte olduğunuz sipariş için yapacağınız Mesafeli Satış Sözleşmesi (Sözleşme) öncesinde bilgi amaçlı olarak tarafınıza sunulmaktadır.</div>
                <div>Günkay Sanal Market işbu Ön Bilgilendirme Formunda GÜNKAY olarak anılacaktır. GÜNKAY uygulaması  üzerinden sipariş konusu ürünlerin/hizmetlerin tüketiciler tarafından satın alınması ve böylece siparişin yapılması ile ilgili teknik aşama-adımlar, keza bilgi girişleriniz sırasındaki hataların belirlenmesine-düzeltilmesine ilişkin teknik araçlar, buraya kadarki işlemleriniz sırasında uygulama üzerinde açıkça belirtilmiştir. Uygulama üzerinden verdiğiniz siparişle ilgili bir bilgi girişinde hata söz konusu ise ilgili uyarı mesajı doğrultusunda işlem ile düzelterek devam edilebilmektedir. Uygulama kapsamında gösterilen kapsama alanlarımız haricinde ürün/hizmet satışımız bulunmamaktadır.</div>
                <div>Tüketici Mesafeli Satış Sözleşmesi’ni onayladığında, sipariş verdiği ürün/hizmetlerin uygulamada belirtilen bedeli ve masraflarını belirlediği ödeme yöntemi nakit, banka kartı veya kredi kartı aracılığıyla kapıda tahsil olunur.</div>
                <div>Tüketici Ürünü teslim aldığı tarihten itibaren 14 (on dört) gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin Sözleşmeden cayma hakkı vardır. Hizmet sunumuna ilişkin mesafeli sözleşmelerde ise, bu süre sözleşmenin imzalandığı tarihten itibaren başlar.</div>
                <div>Cayma hakkının kullanılması, Ürün’ün ambalajının açılmamış, bozulmamış ve kullanılmamış olması şartına bağlıdır. İade edilecek ürünlerin kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir. Ayrıca cayma hakkı süresi sona ermeden önce, tüketicilerin onayıyla ifasına başlanan hizmetler için cayma hakkı kullanılamaz.</div>
                <div>Cayma hakkının kullanılamayacağı ürünler; tüketicinin isteği ile kişiye özel olarak üretilen, üzerinde değişiklik veya ilave yapılarak kişiye özel hale getirilen ürünler, tesliminden sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan ürünler, niteliği itibarıyla geri gönderilmeye elverişli olmayan ürünler (İç çamaşırı, mayo, kozmetik gibi hijyenik durumu hassas olan ürünleri iade edebilmenin koşulu ürünün açılmamış ve denenmemiş olmasıdır), tüketici tarafından açılmış olan ses veya görüntü kayıtları (DVD, VCD, CD ve Kaset vb.), basılı ürünler ve süreli yayınlar (Kitap, dergi vb.), yazılım programları, bilgisayar ve kırtasiye sarf malzemeleri, çabuk bozulma tehlikesi olan veya son kullanma tarihi geçme ihtimali olan ürünler, fiyatı borsa veya teşkilatlanmış diğer finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve belirlenen ürünler, (Külçe, Ziynet Altın ve Gümüş kategorisindeki tüm ürünler vb.) tatil kategorisinden satın alınan otel, yurt içi/yurt dışı turlar, gezi ve uçak bileti gibi ürün ve hizmetler, çikolata, dondurma vb. gıda maddeleri, içecek ve diğer günlük tüketim maddeleri için sağlanan ürünler, tek seferde kullanılan ürünler, elektronik ortamda anında ifa edilen hizmetler, tüketiciye anında teslim edilen ürünler, hızla bozulma veya son kullanma tarihi geçme ihtimali olan ürünler ve genel olarak ilgili mevzuat uyarınca mesafeli satış kapsamı dışında kabul edilen diğer mal ve hizmetler ile tüketicinin ticari/mesleki amaçla satın alma yaptığı hallerde tüketici cayma hakkını kullanamaz. Bu ürün ve hizmetlerin iptal/iadesi, tüketicinin doğrudan cayma hakkını kullanması ile değil; GÜNKAY uygulaması doğrultusunda yapılır.</div>
                <div>Kanunen cayma hakkı öngörülmemiş hallerde cayma hakkından faydalanılamayacağı gibi bu hakkın usulüne uygun veya zamanında kullanılmadığı durumlarda Tüketici cayma hakkını kaybeder.</div>
                <div>Tüketicinin cayma hakkını kullanarak Ürün’ü iade etmek istemesi halinde, bu talebini yukarıda belirtilen 14 (on dört) günlük süre içinde GÜNKAY’e Sözleşme ekinde yer alan örnek cayma formunu (EK 1) doldurarak ve iadeli taahhütlü posta, faks veya e-posta aracılığıyla bildirecek ve ilgili cayma bildirimini yönelttiği tarihten itibaren 10 (on) gün içerisinde Ürün’ü herhangi bir kargo şirketi ile masraflar GÜNKAY’e ait olmak üzere iade edebilecektir. GÜNKAY tüketicinin talebini aldıktan sonra en geç 14 (on dört) gün içerisinde, ürünün iadesini kabul edip ürün bedelini ilgili müşteriye ödemekle yükümlüdür.</div>
                <div>385 sayılı Vergi Usul Kanunu Genel Tebliği uyarınca iade işlemlerinin yapılabilmesi için tüketiciye ürün ile birlikte gönderilmiş olan e-faturanın saklanması gerekir. Teslim alınan Ürün iade edilmek istenildiği takdirde; tüketici GÜNKAY’e Ürün ile birlikte e-fatura kopyasını geri göndermesi gerekmektedir. Ürün’ün tüketici tarafından imzalı iade faturası gönderilmeksizin GÜNKAY’e iade edilmesi ve/veya faturanın kaybedilmiş olması halinde doğabilecek masraf ve cezalar tüketiciye ait olacaktır.</div>
                <div>Uygulamanın işlem güvenliği, bilgilerin korunması, gizliliği, işlenmesi-kullanımı ve ticari elektronik iletişimler ile ilgili hususlarda GÜNKAY ve Tüketici için geçerli cari kurallar-şartlar bilginize sunulmuştur. Tüketici dilediği her zaman bu konularda belirtilen iletişim araçları ile GÜNKAY’e ulaşarak danışabilir.</div>
                <div class="pb-5">Aşağıda yer alan bilgilendirmeler ile Sözleşme'yi uygulama üzerinden onaylayarak kabulünüzden sonra tüm bunları sipariş teyidiniz ile birlikte belirttiğiniz e-posta (mail) adresinize göndereceğimizden cihazına kaydedip saklayarak her zaman erişebileceğiniz gibi, ilgili yasalar çerçevesinde ve azami üç yıl süre ile GÜNKAY nezdindeki sistemlerde muhafaza edileceklerdir.</div>
                <div class="ks-baslik">SATICI BİLGİLERİ</div>
                <div>
                    Ünvanı: Günkay Mağazacılık Tic. Ltd. Şti. <br>
                    Adres: KURUÇEŞME FATİH MAHALLESİ BARIŞ CADDESİ NO:18/A <br>
                    Telefon: 0 (262) 26 00 84 <br>
                    Email: e-siparis@gunkay.com
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>

        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import BottomNavMenu from "@/components/BottomNavMenu"
import Footer from "@/components/Footer"

export default {
    data(){
        return{}
    },
    components: {
        Navbar,
        BottomNavMenu,
        Footer
    }
}
</script>

<style scoped>
    .row{
        font-family: 'Montserrat Alternates', sans-serif;
        font-size: 15px;
        color: #919191;
    }
    .kullanim-sartlari{
        border: 1px solid #fafafa;
        border-radius: 10px;
        background: #fafafa;
        margin-bottom: 40px;
    }
    .kullanim-sartlari div{
        padding-bottom: 20px;
    }
    .ks-baslik{
        font-size: 16px;
        color: black;
    }
</style>