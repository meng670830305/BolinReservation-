<template>
  <div class="panel-header">
    <div class="panel-lead">
      <div class="title">{{props.route.meta.name}}</div>
      <p class="description">{{props.route.meta.describe}}</p>

    </div>
  </div>
</template>
<script  setup>
const props = defineProps({
  route: {
    type: Object,
  },
})
</script>


<style lang="less">
.panel-header {
  padding: 15px;
  background: #e8edf0;
  border-color: #e8edf0;
  position: relative;
  .panel-lead {
    font-size: 14px;
    .title {
      font-weight: bold;
      font-style: normal;
    }
    .description {
      margin-top: 5px;
    }
  }
}
</style>