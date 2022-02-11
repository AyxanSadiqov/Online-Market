Bu sayfadaki puf noktalar:
1 - Bu component, kullanilacagi component icine import edilip, asagidaki yorum satirlarindaki kod parcacigi
    eklenecek.
<template>
    <div ref="draggableContainer" id="draggable-container">
        <div id="draggable-header" @mousedown="dragMouseDown">
            <slot name="header"></slot>
        </div>
        <div id="draggable-main">
            <slot name="main"></slot>
        </div>
        <div id="draggable-footer">
            <slot name="footer"></slot>
        </div>
        <!-- KULLANILACAGI COMPONENT ICINE ASAGIDAKI KOD SATIRLARI EKLENECEK -->
        <!-- <DraggableDiv>
            <template slot="header">
                Başlık
            </template>
            <template slot="main">
                [[[ BAZI ICERIK ]]]
            </template>
            <template slot="footer">
                [[[ BAZI ICERIK ]]]
            </template>
        </DraggableDiv> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            positions: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0
            }
        }
    },
    methods: {
        dragMouseDown: function (event) {
            event.preventDefault()
            // get the mouse cursor position at startup:
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            document.onmousemove = this.elementDrag
            document.onmouseup = this.closeDragElement
        },
        elementDrag: function (event) {
            event.preventDefault()
            this.positions.movementX = this.positions.clientX - event.clientX
            this.positions.movementY = this.positions.clientY - event.clientY
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            // set the element's new position:
            this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
            this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
        },
        closeDragElement () {
            document.onmouseup = null
            document.onmousemove = null
        },
    },
}
</script>

<style scoped>
    #draggable-container {
        position: absolute;
        top: 17rem;
        z-index: 6;
        border: 1px solid black;
        width: 100%;
    }
    #draggable-header {
        border: 1px solid black;
        padding: 5px;
        background: black;
        color: white;
        cursor: grab;
    }
    #draggable-header:active{
        cursor: grabbing;
    }
    #draggable-main {
        padding: 10px;
        background: white;
    }
</style>