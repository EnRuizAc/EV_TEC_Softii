<template>
    <nav class="navbar">
      <div class="container">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link class="nav-link" to="/propinas">Pago Propinas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/recibos">Ver recibos</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <style scoped>
.navbar {
  background-color: #ff4d4d;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-item {
  margin-left: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>

  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "Nav-bar",
  });
  </script>