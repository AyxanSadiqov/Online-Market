Bu sayfadaki puf noktalar:
1 - Sifre alanlarinda gorunecek olan goz icon-u.
2 - Normalde sifre show/hide-i kullanildigi sayfa icinde yazilir ama birden fazla yerde sifre alani oldugu icin
ayri bir component olarak ayrildi. 
<template>
    <div v-if="showEye" v-cloak>
        <span @click="gosterGizle()" class="eye-icon noselect">{{eyeIcon}}</span>
    </div>
</template>

<script>
export default {
    props : ["showEye"],
    emits : ["typee"],
    data(){
        return{
            eyeIcon : "Göster",
            type : "",
        }
    },
    methods : {
        gosterGizle(){
            if(this.eyeIcon == "Göster"){
                this.eyeIcon = "Gizle"
                this.type = "text"
            }else{
                this.eyeIcon = "Göster"
                this.type = "password"
            }
            this.$emit("typee", this.type)
        },
    },
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    @media (max-width : 500px){
        .eye-icon{
            top: 13px !important;
            font-size: 15px !important;
        }
    }
    .eye-icon{
        position: absolute;
        top: 9px;
        right: 10px;
        color: #4d4d4d;
        cursor: pointer;
        font-size: 13px;
        font-weight: 800;
    }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
</style>