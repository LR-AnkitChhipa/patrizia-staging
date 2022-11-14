<template>
  <div :id="draggableId" :ref="draggableId" class="draggable">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Draggable',
  data() {
    return {
      draggableId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    }
  },
  mounted() {
    this.dragElement(this.$refs[this.draggableId])
  },
  methods: {
    dragElement(elmnt) {
      let pos1 = 0;
      let pos2 = 0;
      let pos3 = 0;
      let pos4 = 0

      const draggableElementContainer = document.getElementById(elmnt.id)
      if (draggableElementContainer) {
        draggableElementContainer.querySelector('.drag-handle').onmousedown = dragMouseDown
        draggableElementContainer.querySelector('.drag-handle').ontouchstart = dragMouseDown

      }

      function dragMouseDown(e) {
        try {
          e = e || window.event
          e.preventDefault()
          // get the mouse cursor position at startup ifwe have one, if its a touch event use that instead
          pos3 = e.clientX ? e.clientX : e.touches[0].clientX
          pos4 = e.clientY ? e.clientY : e.touches[0].clientY
          document.onmouseup = closeDragElement
          document.ontouchend = closeDragElement
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag
          document.ontouchmove = elementDrag
        } catch (ex) {
        }
      }

      function elementDrag(e) {
        console.log('draggy touch')
        e = e || window.event
        try {
          e.preventDefault()
        } catch (e) {
        }
        // calculate the new cursor position:
        pos1 = pos3 - (e.clientX ? e.clientX:  e.touches[0].clientX)
        pos2 = pos4 - (e.clientY ? e.clientY:  e.touches[0].clientY)
        pos3 = e.clientX ? e.clientX : e.touches[0].clientX
        pos4 = e.clientY ? e.clientY : e.touches[0].clientY
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
        elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
        document.ontouchend = null
        document.ontouchmove = null
      }
    }
  }
}
</script>

<style lang="scss">
.draggable {
  position: absolute;
}
</style>
