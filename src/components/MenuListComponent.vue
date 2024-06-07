<template>
  <!-- <div class="menu-header1">
    <RouterLink to="/menu">
      <button class="menu-topic" id="btn-one">
        <p class="menu-txt">All Categories</p>
      </button>
    </RouterLink>

    <RouterLink to="/lunch">
      <button class="menu-topic">
        <p class="menu-txt">Lunch</p>
      </button>
    </RouterLink>

    <RouterLink to="/dinner">
      <button class="menu-topic">
        <p class="menu-txt">Dinner</p>
      </button>
    </RouterLink>

    <RouterLink to="/dessert">
      <button class="menu-topic">
        <p class="menu-txt">Dessert</p>
      </button>
    </RouterLink>

    <RouterLink to="/drinks">
      <button class="menu-topic" id="btn-last">
        <p class="menu-txt">Drinks</p>
      </button>
    </RouterLink>
  </div> -->

  <div class="menu-header1">
    <RouterLink to="/menu">
      <div class="menu-topic">
        <P class="text">All Categories</P>
      </div>
    </RouterLink>

    <RouterLink to="/lunch">
      <div class="menu-topic">
        <P class="text">Lunch</P>
      </div>
    </RouterLink>

    <RouterLink to="/dinner">
      <div class="menu-topic">
        <P class="text">Dinner</P>
      </div>
    </RouterLink>

    <RouterLink to="/dessert">
      <div class="menu-topic">
        <P class="text">Dessert</P>
      </div>
    </RouterLink>

    <RouterLink to="/drinks">
      <div class="menu-topic">
        <P class="text">Drinks</P>
      </div>
    </RouterLink>
  </div>
</template>
<script>
export default {
  name: 'MenuListComponent'
}
</script>
<style scoped>
.menu-header1 {
  display: flex;
  justify-content: space-evenly;
  width: 75%;
  height: 5.2rem;
  margin: 0 auto;
  gap: 2rem;
  margin-top: 50px;
}

.menu-topic {
  width: 10rem;
  height: 70%;
  margin-top: 0.7rem;
  background-color: rgb(229, 230, 230);
  border-radius: 10px;
  color: rgba(0, 0, 0, 1);
}

.text {
  font-size: 1.3rem;
  text-align: center;
  font-weight: 500;
  line-height: 3.3rem;
}

.menu-topic:hover {
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  background-color: rgb(249, 232, 232);
  color: rgb(0, 0, 0);
}

text:hover {
  color: rgb(255, 255, 255);
}

.menu-topic:active {
  background-color: rgb(245, 71, 72);
  color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-weight: 600;
}

.router-link-active.router-link-exact-active .menu-topic {
  background-color: rgb(245, 71, 72);
  color: rgb(255, 255, 255);
}
</style>
