Bu sayfadaki puf noktalar:
1 - VerifyPage.vue-da kullaniliyor
<template>
    <div v-cloak>
        <div class="d-flex justify-content-center">
            <div class="base-timer">
                <svg class="base-timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g class="base-timer-circle">
                        <circle class="base-timer-path-elapsed" cx="50" cy="50" r="45" />
                        <!-- path icinde :stroke-dasharray="circleDasharray" -->
                        <path :class="remainingPathColor" :stroke-dasharray="circleDasharray" class="base-timer-path-remaining" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0 "></path>
                    </g>
                </svg>
                <span class="base-timer-label">
                    {{ formattedTimeLeft }}
                </span>
                <span v-if="timeLeft<=0" class="base-timer-bitti text-muted">Zaman doldu</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        timeLeft: {
            type: Number,
            required: true
        },
        alertThreshold: {
            type: Number,
            default: 10
        },
        warningThreshold: {
            type: Number,
            default: 30
        },
    },
    data(){
        return{
            timeLimit: 180,
        }
    },
    computed : {
        formattedTimeLeft() {
            if(this.timeLeft > 0){
                var timeLeft = this.timeLeft
                // The largest round integer less than or equal to the result of time divided being by 60.
                var minutes = Math.floor(timeLeft / 60)
                // Seconds are the remainder of the time divided by 60 (modulus operator)
                var seconds = timeLeft % 60
                // If the value of seconds is less than 10, then display seconds with a leading zero
                if (seconds < 10) {
                    seconds = `0${seconds}`
                }
                // The output in MM:SS format
                return `${minutes}:${seconds}`
            }
            else{
                return "00:00"
            }
        },
        // Update the dasharray value as time passes, starting with 283
        circleDasharray() {
            var FULL_DASH_ARRAY = 278
            // Length = 2πr = 2 * π * 45 = 283
            return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
        },
        timeFraction() {
            const rawTimeFraction = this.timeLeft / this.timeLimit
            return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
        },
        colorCodes() {
            return {
                info: {
                    color: "green"
                },
                warning: {
                    color: "orange",
                    threshold: this.warningThreshold
                },
                alert: {
                    color: "red",
                    threshold: this.alertThreshold
                }
            }
        },
        remainingPathColor() {
            const { alert, warning, info } = this.colorCodes;
            if (this.timeLeft <= alert.threshold) {
                return alert.color;
            } else if (this.timeLeft <= warning.threshold) {
                return warning.color;
            } else {
                return info.color;
            }
        }
    },
    methods : {},
    created(){}
}
</script>

<style scoped>
    [v-cloak] > * { display:none; }
    .base-timer{
        position: relative;
        width: 150px;
        height: 150px;
    }
    /* Removes SVG styling that would hide the time label */
    .base-timer-circle {
        fill: none;
        stroke: none;
    }
    /* The SVG path that displays the timer's progress */
    .base-timer-path-elapsed {
        stroke-width: 5px;
        stroke:#eeeeee;
    }
    .base-timer-label{
        position: absolute;
        /* Size should match the parent container */    
        width: 150px;
        height: 150px;
        /* Keep the label aligned to the top */    
        top: 0;
        /* Create a flexible box that centers content vertically and horizontally */    
        display: flex;
        align-items: center;
        justify-content: center;
        /* Sort of an arbitrary number; adjust to your liking */
        font-size: 40px;
    }
    .base-timer-bitti{
        position: absolute;
        /* Size should match the parent container */    
        width: 150px;
        height: 150px;
        /* Keep the label aligned to the top */    
        top: 30px;
        /* Create a flexible box that centers content vertically and horizontally */    
        display: flex;
        align-items: center;
        justify-content: center;
        /* Sort of an arbitrary number; adjust to your liking */
        font-size: 13px;
    }
    .base-timer-path-remaining{
        stroke-width: 5px;
        stroke-linecap: round;
        transform: rotate(90deg);
        transform-origin: center;
        transition: 1s linear all;
        fill-rule: nonzero;
        stroke: currentColor;
    }
    .base-timer-svg{
        /* Flips the svg and makes the animation to move left-to-right */
        transform: scaleX(-1);
    }
    .green {
        color: rgb(65, 184, 131);
    }
    .orange {
        color: orange;
    }
    .red {
        color: red;
    }
</style>