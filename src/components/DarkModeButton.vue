<template>
    <label class="switch">
        <input @click="modeSwitch()" :v-model="currentSwitch" type="checkbox" :checked="checked">
        <span class="slider round">
            <i class="fas fa-sun"></i>
            <i class="far fa-moon"></i>
        </span>
    </label>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data(){
        return{
            currentSwitch : "light",
            checked : false,
        }
    },
    methods:{
        ...mapActions(["fetchnavbarColor"]),
        modeKontrol(){ // theme degeri localde daha yoksa ilk olarak standart degeri light olarak yazilir
            if(localStorage.getItem("theme") == null){
                localStorage.setItem("theme",this.currentSwitch)
            }
            if(localStorage.getItem("theme") == "light"){
                this.checked = false
            }else if(localStorage.getItem("theme") == "dark"){
                this.checked = true
            }
        },
        modeSwitch(){
            if(this.checked == false){
                this.checked = true
                this.currentSwitch = "dark"
            }else{
                this.checked = false
                this.currentSwitch = "light"
            }
            localStorage.setItem("theme",this.currentSwitch) // currentSwitch-ten cikan dark yada light degeri locale yazilir
            this.fetchnavbarColor() // her switch toggle-a tiklandiginda wglobal.js actions icindeki fetchnavbarColor fonktsiyonu calisir
        }
    },
    created(){
        this.modeKontrol()
        this.fetchnavbarColor() // her sayfa render oldugunda bir onceki renk degisimi uygulansin diye
    }
}
</script>

<style scoped>
    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 22px;
        margin-top: 10px;
    }
    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    input:checked + .slider {
        background-color:black;
    }
    input:focus + .slider {
        box-shadow: 0 0 1px black;
    }
    input:checked + .slider:before {
        -webkit-transform: translateX(28px);
        -ms-transform: translateX(28px);
        transform: translateX(28px);
    }
    /* Rounded sliders */
    .slider.round {
        border-radius: 15px;
    }
    .slider.round:before {
        border-radius: 50%;
    }
    .fa-sun{
        margin-left: 3px;
        color: rgb(255, 238, 0);
        text-shadow: 0 0 20px rgb(255, 238, 0);
    }
    .fa-moon{
        margin-left: 10px;
        color: rgb(255, 255, 255);
        text-shadow: 0 0 20px rgb(255, 255, 255);
    }
</style>