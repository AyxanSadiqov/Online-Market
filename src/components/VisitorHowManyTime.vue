Bu sayfadaki puf noktalar:
1 - Bu sayfa, kullanicinin oldugu sayfayi kac defa ziyaret ettigini loglamak icin var
<template>
    <div id="app">
        {{amt()}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            visits : "",
            expDays : 30,
            exp : new Date()
        }
    },
    mounted(){
        this.exp.setTime(this.exp.getTime() + (this.expDays*24*60*60*1000))
    },
    methods:{
        amt(){
            var vm = this
            var count = vm.GetCookie('vcount') // vcount - visitor count demek
            if(count == null){
                vm.SetCookie('vcount','1')
                // return 1
            }
            else{
                var newcount = parseInt(count) + 1
                vm.DeleteCookie('vcount')
                vm.SetCookie('vcount',newcount,vm.exp)
                // return count
            }
        },
        GetCookie(name){
            var vm = this
            var arg = name + "="
            var alen = arg.length
            var clen = document.cookie.length
            var i = 0
            while(1<clen){
                var j = i + alen
                if(document.cookie.substring(i, j) == arg){
                    return vm.getCookieVal (j)
                }
                i = document.cookie.indexOf(" ", i) + 1
                if(i == 0){
                    break
                }
            }
            return null
        },
        SetCookie(name, value){
            var vm = this
            var argv = vm.SetCookie
            var argc = vm.SetCookie.length
            var expires = (argc > 2) ? argv[2] : null
            var path = (argc > 3) ? argv[3] : null
            var domain = (argc > 4) ? argv[4] : null
            var secure = (argc > 5) ? argv[5] : false
            document.cookie = name + "=" + escape(value) + 
                ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
                ((path == null) ? "" : ("; path=" + path)) +
                ((domain == null) ? "" : ("; domain=" + domain)) +
                ((secure == true) ? "; secure" : "")
        },
        DeleteCookie(name){
            var vm = this
            var exp = new Date()
            exp.setTime(exp.getTime() - 1)
            var cval = vm.GetCookie(name)
            document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString()
        },
        getCookieVal(offset){
            var endstr = document.cookie.indexOf(";", offset)
            if(endstr == -1){
                endstr = document.cookie.length
                return unescape(document.cookie.substring(offset, endstr))
            }
        }
    }
}
// .$mount("#app")
</script>

<style scoped>

</style>