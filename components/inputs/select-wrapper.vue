<template>
  <div class="box-select">
    <svg xmlns="http://www.w3.org/2000/svg" width="12.664" height="6.375" viewBox="0 0 12.664 6.375">
      <g id="Group_367" data-name="Group 367" transform="translate(13.332 7.706) rotate(-90)">
        <g id="Group_269" data-name="Group 269" transform="translate(7.333 -13) rotate(180)">
          <path
            id="Path_187"
            data-name="Path 187"
            d="M0,0,5.333-6,0-12"
            fill="none"
            stroke="#b4a4a9"
            stroke-width="1"
          />
        </g>
      </g>
    </svg>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "SelectWrapper"
}
</script>

<style scoped lang="scss">
.box-select {
  position: relative;
  display: inline-block;
  background-color: white;
  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    min-height: 45px;
    width: 45px;
    border-left: 1px solid #E1DBDD;
    display: block;
    padding: 0 16px;
  }
  select {
    font-family: 'Corporate S Pro';
    appearance: none;
    font-size: 14px;
    position: relative;
    -moz-appearance: none;
    -webkit-appearance: none;
    padding: 4px 50px 4px 20px;
    background: none;
    z-index: 100;
    min-height: 45px;
    width: 250px;
    position: relative;
    box-shadow: none;
    outline: none;
    border-color: #E1DBDD;
    border-radius: 0;
    color: #9C8A8F;
    z-index: 0;
    @include respond-below(sm){
      width: 100%;
    }

    &:focus{
      box-shadow: none;
      outline: none;
      border-color: #F29131;
      background: none;
    }
  }
}
</style>
