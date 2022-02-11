Bu sayfadaki puf noktalar:
1 - Vanilla-tilt.js kullanildi. (vue icin npm ile "npm i vanilla-tilt-vue")
<template>
    <div class="socialMedia">
        <ul class="sci">
            <li data-text="Facebook" data-color="#1877f2" @mouseenter="iconMouseEnter" @mouseleave="iconMouseLeave">
                <a href="https://www.facebook.com/gunkaymarket/" target="_blank" class="facebook"><i class="fab fa-facebook-f"></i></a>
            </li>
            <li data-text="Youtube" data-color="#ff0000" @mouseenter="iconMouseEnter" @mouseleave="iconMouseLeave">
                <a href="https://www.youtube.com/channel/UCjIxtFE1URu7Kb2maQyFBYA?view_as=subscriber" target="_blank" class="youtube"><img src="@/assets/svg/youtube-icon.svg" width="40" height="40" alt=""></a>
            </li>
            <li data-text="Twitter" data-color="#0099ff" @mouseenter="iconMouseEnter" @mouseleave="iconMouseLeave">
                <a href="https://twitter.com/gunkaymarket" target="_blank" class="twitter"><i class="fab fa-twitter"></i></a>
            </li>
            <li data-text="Instagram" data-color="#e4405f" @mouseenter="iconMouseEnter" @mouseleave="iconMouseLeave">
                <a href="https://www.instagram.com/gunkaymarket/" target="_blank" class="instagram"><i class="fab fa-instagram"></i></a>
            </li>
        </ul>
    </div>
</template>

<script>
import { VanillaTilt } from '../assets/js/vanilla-tilt.min.js';

export default {
    methods : {
        iconMouseEnter(e){
            VanillaTilt.init(document.querySelectorAll(".sci li a"),{
                max : 30,
                speed : 400,
                glare : true,
                "max-glare": 1,
            })
            let bg = document.querySelector('.socialMedia')
            let color = e.target.getAttribute('data-color')
            bg.style.backgroundColor = color
        },
        iconMouseLeave(){
            let bg = document.querySelector('.socialMedia')
            bg.style.backgroundColor = '#fff'
        }
    }
}
</script>

<style scoped>
    .socialMedia{
        /* border: 1px solid red; */
        min-height: 130px;
        margin-left: -50px;
        border-radius: 10px;
        transition: .5s;
    }
    .sci{
        position: relative;
        display: flex;
    }
    .sci li{
        list-style: none;
    }
    .sci li::before{
        content: attr(data-text);
        position: absolute;
        top: 50%;
        left: 52%;
        transform: translate(-50%, -50%);
        font-size: 4vw;
        pointer-events: none;
        font-weight: 700;
        transition: .5s;
        opacity: 0;
    }
    .sci li:hover::before{
        opacity: 0.1;
        transform: translate(-50%, calc(-50% + 60px));
    }
    .sci li a{
        position: relative;
        display: inline-block;
        width: 50px;
        height: 50px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        border-radius: 10px;
        text-decoration: none;
        margin: 12px;
        font-size: 2em;
        transform-style: preserve-3d;
        perspective: 500px;
        box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
        transition: background 0.25s;
    }
    .sci li a:hover.facebook{
        background: #1877f2;
    }
    .sci li a:hover.youtube{
        background: #ff0000;
    }
    .sci li a:hover.twitter{
        background: #0099ff;
    }
    .sci li a:hover.instagram{
        background: #e4405f;
    }
    .sci li a .fab{
        transition: 0.25s;
        pointer-events: none;
    }
    .sci li a:hover .fab{
        color: #fff;
        transform: scale(1.5) translateZ(30px);
    }
    .sci li a img{
        transition: 0.25s;
        pointer-events: none;
    }
    .sci li a:hover img{
        color: #fff;
        transform: scale(1.5) translateZ(30px);
    }
    /* .js-tilt-glare{
        border-radius: 10px !important;
    } */
</style>