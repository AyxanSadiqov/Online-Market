<template>
    <div class="harita-app">
        <div :style="haritaBar">
            <div @click="findMyLocation()" class="konumumu-bul noselect"><i class="fas fa-street-view"></i><span>Konumumu bul</span></div>
            <gmap-autocomplete
                class="input" maxlength="33"
                placeholder="Örn. Körfez, Atatürk Blv."
                @place_changed="setPlace">
            </gmap-autocomplete>
            <button @click="usePlace" type="button" class="btn btn-sm input-button" :style="loginButtons">Ekle</button>
        </div>
        <GmapMap
            :center="center"
            :zoom="zoom"
            map-type-id="roadmap"
            class="col-md-12 col-sm-12 col-12 col-lg-12 harita-boyut"
            :style="haritaBoyut"
            @click="haritaBoyunuDuzelt"
            :options="{
                zoomControl: zoomControlMap,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false,
                draggable: draggableMap
            }"
            >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="coordinates"
                :icon="m.icon"
                :clickable="clickableMarker"
                :draggable="draggableMap"
                :animation="2"
                @drag="adresiKullanButtonDisable=true"
                @dragend="updateCoordinates"
                @click="window_open=!window_open"
            />
            <gmap-info-window
                @closeclick="window_open=false" 
                :opened="window_open" 
                :position="coordinates"
                :options="{
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                }"
            >
                <div>{{googleAdresBilgi}}</div>
            </gmap-info-window>  
        </GmapMap>

        <div v-if="!showAdresEklemeForm" class="m-3">
            <button @click="buAdresiKullan()" :disabled="adresiKullanButtonDisable" type="button" class="btn btn-md btn-block buton-rounded m-0" :style="loginButtons">Bu adresi kullan</button>
        </div>
        <div v-if="showAdresEklemeForm" class="m-3">
            <div class="form-row">
                <div class="col-md-1 col-2 baslik-secim">
                    <div class="dropdown">
                        <button class="dropbtn">{{norm}}</button>
                        <div class="dropdown-content">
                            <a v-for="filter in filter" :key="filter.id" @click="filterSec(filter)"> {{filter.sayi}} {{filter.ad}} </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-11 col-10">
                    <div class="mt-0">
                        <label data-error="wrong" data-success="right" for="materialBaslik">Başlık(Ev, işyeri) <span>*</span></label>
                        <input type="text" v-model="baslik" id="materialBaslik" class="form-control">
                    </div>
                </div>
            </div>
            <div class="mt-0">
                <label data-error="wrong" data-success="right" for="materialAdres">Adres <span>*</span></label>
                <input type="text" v-model="adres" id="materialAdres" class="form-control">
            </div>
            <div class="form-row">
                <div class="col-md-4">
                    <div class="mt-0">
                        <label for="materialApartman">Apartman</label>
                        <input type="text" v-model="apartman" id="materialApartman" class="form-control">
                    </div>
                </div>
                <div class="col-md-4 col-6 col-sm-6">
                    <div class="mt-0">
                        <label for="materialKat">Kat</label>
                        <input type="text" v-model="kat" id="materialKat" class="form-control">
                    </div>
                </div>
                <div class="col-md-4 col-6 col-sm-6">
                    <div class="mt-0">
                        <label for="materialDaire">Daire</label>
                        <input type="text" v-model="daire" id="materialDaire" class="form-control">
                    </div>
                </div>
            </div>
            <!-- {{koordinat}} -->
            <div class="mt-0">
                <label data-error="wrong" data-success="right" for="materialAdresTarif">Adres Tarifi</label>
                <input type="text" v-model="tarif" id="materialAdresTarif" class="form-control">
            </div>
            <div class="zorunlu-alan"><span>*</span> - Zorunlu alan</div>
            <button @click="addYeniAdres()" :disabled="isDisabled()" type="button" class="btn btn-md btn-block buton-rounded m-0" :style="loginButtons">Kaydet</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            window_open: false,
            center: {lat:40.766666, lng:29.916668},
            zoom: 13,
            coordinates: {lat:40.766666, lng:29.916668}, // surukle birakildiginda lat, lng degerleri buraya yazilir
            markers: [{
                // position: { 
                //     lat: 40.766666, 
                //     lng: 29.916668
                // },
                icon : {
                    url: require('../assets/img/harita-konum2.png'),
                    scaledSize: {width: 40, height: 40},
                    labelOrigin: {x: 16, y: -10}
                }
            }],
            place: null, // arama alani icin
            draggableMap : true,
            zoomControlMap : true,
            clickableMarker : true,
            haritaBoyut : "",
            haritaBar : "",
            showAdresEklemeForm : false,
            googleAdresBilgi : "", // marker-in secili oldugu adres bilgisinin yazilacagi alan
            adresiKullanButtonDisable : true,
            // form icindeki alanlar START
            adreslerim : [],
            errors : [],
            koordinat : "", // marker-in surukle biraktan sonraki lat,lng degerleri
            baslik_tip : "0", //  adres eklerken sorguda tip alani yerine yazilmasi icin
            baslik : '',
            adres : '',
            apartman : '',
            kat : '',
            daire : '',
            tarif : '',
            // form icindeki alanlar END
            // cookie bilgileri START
            uid : "",
            utel : "",
            // cookie bilgileri END
            filter : [
                {
                    id : 1,
                    tip : 0,
                    ad : "Ev"
                },
                {
                    id : 2,
                    tip : 1,
                    ad : "İş"
                },
                {
                    id : 3,
                    tip : 2,
                    ad : "Diğer"
                },
            ],
            norm : "Ev"
        }
    },
    computed : {
        ...mapGetters(["serverRequest","loginButtons"]),
    },
    methods: {
        getGoogleAdresBilgi(lat,lng){
            // let url = 'https://geocode-maps.yandex.ru/1.x/?apikey=84448a13-8f7e-4617-981b-e9a444296ae4&format=json&geocode='+lng+','+lat+'&lang=tr-tr'
            let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyAAQukCk9fzUmYe22z6-8DowdgrTjNAsB8'
            axios.get(url).then(response => {
                // normal yontemle yapildiginda yani data() icinde bir dizi tanimlayip, donen response-u da bu dizi icine atildiginda..
                //..bu deger tipi dizi olarak tanimlanmiyordu. map ancak diziler icin tanimli oldugundan..
                var adres_bilgisi = [] //..donen deger bu diziye yazilmasi icin tanimlandi
                adres_bilgisi.push(response.data) // sorgudan donen deger bu array-e yazilir
                // json gezme islemleri START
                var results = []; var formatted_address = [];
                adres_bilgisi.map((item) => { // google maps geocode apisinden donen json icerigine gore dongu isimleri yapildi
                    results.push(item.results)
                })
                results[0].map((item) => {
                    formatted_address.push(item.formatted_address)
                })
                this.googleAdresBilgi = formatted_address[0] // bu asamada artik forma yazilacak hale geldi
                this.adresiKullanButtonDisable = false // 'bu adresi ekle' butonu aktiv hale getirilir
                // json gezme islemleri END
            })
        },
        getKoordinat(lat, lng){ // yeni adres olusturulmak istendiginde koordinat bilgisi buradan doldurulur
            this.koordinat = lat + ',' + lng
        },
        updateCoordinates(location) {
            this.coordinates = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            };
            this.window_open = true
            this.getGoogleAdresBilgi(this.coordinates.lat, this.coordinates.lng)
            this.getKoordinat(this.coordinates.lat, this.coordinates.lng) // adres eklemek icin koordinat bilgisi alinir
        },
        findMyLocation() {
            this.zoom = 15
            this.window_open = true // olur da onceden kapaliysa diye
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.getGoogleAdresBilgi(position.coords.latitude, position.coords.longitude)
                this.getKoordinat(position.coords.latitude, position.coords.longitude) // adres eklemek icin koordinat bilgisi alinir
                // this.markers.map((marker) => { // map ile markers icindeki position-un lat ve lng degerlerine erisildi
                //     marker.position.lat = position.coords.latitude,
                //     marker.position.lng = position.coords.longitude
                // });
                this.coordinates = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
            });
        },
        setPlace(place) {
            this.place = place
        },
        usePlace() {
            if (this.place) {
                this.getGoogleAdresBilgi(this.place.geometry.location.lat(), this.place.geometry.location.lng())
                this.getKoordinat(this.place.geometry.location.lat(), this.place.geometry.location.lng()) // adres eklemek icin koordinat bilgisi alinir
                this.coordinates = { // marker konumu
                    lat: this.place.geometry.location.lat(),
                    lng: this.place.geometry.location.lng(),
                }
                this.center = { // kamera acisi
                    lat: this.place.geometry.location.lat(),
                    lng: this.place.geometry.location.lng(),
                }
                this.window_open = true
                // this.place = null
            }
        },
        buAdresiKullan(){
            this.adres = this.googleAdresBilgi
            this.baslik = "Ev"
            // harita ve ozellikler icin gerekli yapilandirmalar asagida
            this.draggableMap = false // map ve marker draggable ozelligi kalkar
            this.zoomControlMap = false // map zoom control icin +,- bari gizlenir
            this.clickableMarker = false // marker tiklanamaz
            this.window_open = false // info window kapanir
            this.haritaBoyut = "height: 100px;"
            this.haritaBar = "display:none;"
            this.showAdresEklemeForm = true // adres eklemek icin gerekli form acilir
        },
        haritaBoyunuDuzelt(){ // bu fonk buAdresiKullan() fonksiyonunda gizlenen, deaktif birakilan alanlari geri duzeltir
            this.draggableMap = true
            this.zoomControlMap = true
            this.clickableMarker = true
            this.window_open = true
            this.haritaBoyut = ""
            this.haritaBar = ""
            this.showAdresEklemeForm = false
        },
        async addYeniAdres(){
            try {
                const formData = new FormData();
                formData.append('f', 'add_address');
                formData.append('user', this.utel);
                formData.append('uid', this.uid);
                formData.append('ad', this.baslik);
                formData.append('tip', this.baslik_tip); // ev-0, is-1, diger-2. eskiden 3 yaziliyordu
                formData.append('adres', this.adres);
                formData.append('koordinat', this.koordinat); // haritadan secilen koordinat bilgisi
                formData.append('konum_dogruluk', "-1"); // yeni bu eklenecek -1 yazilacak. eskiden 3 yaziliyordu
                formData.append('konum', "0.0,0.0"); // kullanicinin gercek konumu
                formData.append('no', this.daire);
                formData.append('apartman', this.apartman);
                formData.append('kat', this.kat);
                formData.append('tarif', this.tarif);
                const response = await axios.post(this.serverRequest,formData,{
                    headers: {
                    // 'Accept': 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                this.adreslerim = response.data
                this.$router.go(0)
                var showAdresEklendi = true
                this.$store.commit('addAdresEklemeForm',{showAdresEklendi:showAdresEklendi}) // ProfilAdreslerim.vue-da 'adres eklendi' mesajinin show etmek icin
            } catch (error) {
                this.errors.push(error)
            }
        },
        getUid_Udep(){
            this.uid = this.decryptCookie("uid")
            this.utel = this.decryptCookie("utel")
        },
        isDisabled(){ // kaydet buton disable-i icin
            if(this.baslik != "" && this.adres != ""){
                return this.disabled = false
            }
            else{
                return this.disabled = true
            }
        },
        filterSec(filter){
            this.norm = filter.ad // dropdown basliginda secilen gorunsun diye
            this.baslik = filter.ad // input icinde secilen gorunsun diye
            this.baslik_tip = filter.tip // sorguya gonderilmesi icin secilenin tipi alinir
        },
    },
    created(){
        this.getUid_Udep()
    }
}
</script>

<style scoped>
    @media (max-width : 990px){
        .harita-app{ max-width: 480px; }
        .input{ max-width: 465px; }
        .konumumu-bul{ left: 270px !important; }
        .input-button{ left: 400px !important; }
        .dropbtn{ width: 38px !important; padding-left: 4px !important; }
    }
    @media (max-width : 767px){
        .dropbtn{ width: 76px !important; }
        .dropdown-content{ min-width: 76px !important; }
    }
    @media (max-width : 500px){
        .harita-app{ max-width: 440px; }
        .input{ max-width: 425px; }
        .konumumu-bul{ left: 320px !important; }
        .input-button{ left: 360px !important; }
        .konumumu-bul span{ display: none; }
        .konumumu-bul i{ padding-right: 0px !important; }
        .dropbtn{ width: 70px !important; }
        .dropdown-content{ min-width: 70px !important; }
    }
    @media (max-width : 420px){
        .harita-app{ max-width: 380px; }
        .input{ max-width: 365px; }
        .konumumu-bul{ left: 260px !important; }
        .input-button{ left: 300px !important; }
        .dropbtn{ width: 60px !important; }
        .dropdown-content{ min-width: 60px !important; }
    }
    @media (max-width : 380px){
        .harita-app{ max-width: 345px; }
        .input{ max-width: 330px; }
        .konumumu-bul{ left: 225px !important; }
        .input-button{ left: 265px !important; }
        .dropbtn{ width: 55px !important; }
    }
    @media (max-width : 360px){
        .harita-app{ max-width: 330px; }
        .input{ max-width: 315px; }
        .konumumu-bul{ left: 210px !important; }
        .input-button{ left: 250px !important; }
    }
    @media (max-width : 320px){
        .harita-app{ max-width: 290px; }
        .input{ max-width: 275px; }
        .konumumu-bul{ left: 170px !important; }
        .input-button{ left: 210px !important; }
    }
    .harita-app{
        position: relative;
    }
    .harita-boyut{
        width: 750px;
        height: 370px;
        transition: .5s;
    }
    .input{
        z-index: 100;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 10px;
        outline:none !important;
        font-size: 14px;
        width: 730px;
        position: absolute;
        top: 20px;
        left: 8px;
    }
    .konumumu-bul{
        z-index: 102;
        outline:none !important;
        font-size: 13px;
        font-weight: 800;
        border: 1px solid #0099CC;
        border-radius: 5px;
        padding: 5px 10px;
        background: #dbf3fc;
        color: #0099CC;
        position: absolute;
        top: 14px;
        left: 530px;
        cursor: pointer;
    }
    .konumumu-bul i{
        padding-right: 7px;
    }
    .input-button{
        z-index: 100;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        outline:none !important;
        font-size: 12px;
        padding: 10px 20px;
        position: absolute;
        top: 5px;
        left: 665px;
    }
    /* .bu-adresi-kullan{
        margin-right: 5px;
    } */
    .buton-rounded{
        border-radius: 10px;
        font-size: 14px;
        text-transform: none;
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    input{
        margin: -10px 0 10px 0;
    }
    label{
        font-size: 14px;
    }
    label span{
        color: red;
        font-weight: 800;
    }
    .zorunlu-alan{
        font-size: 14px;
        margin-bottom: 10px;
        color: #666666;
        font-weight: 400;
    }
    .zorunlu-alan span{
        color: red;
        font-weight: 800;
    }
    /* baslik inputundaki dropdown icin START */
    .baslik-secim{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .dropbtn {
        background-color: #5FA56C;
        border-radius: 2px;
        color: white;
        padding: 1px 11px;
        font-size: 13px;
        border: none;
        cursor: pointer;
        width: 61px;
        height: 38px;
        margin-top: 11px;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        transition: all 0.4s ease;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        background-color: #f9f9f9;
        max-width: 61px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        font-weight: 400;
        border: 1px solid #206736;
    }
    .dropdown-content a {
        color: black;
        padding: 10px 14px;
        font-size: 14px;
        text-decoration: none;
        display: block;
    }
    .dropdown-content a:hover {background-color: #f1f1f1}
    .dropdown:hover .dropdown-content {
        visibility: visible;
        opacity: 1;
    }
    .dropdown:hover .dropbtn {
        background-color: #206736;
    }
    button{
        outline:none !important;
    }
    /* baslik inputundaki dropdown icin END */
</style>