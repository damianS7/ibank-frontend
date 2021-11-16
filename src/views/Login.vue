<template>
  <b-col id="login" cols="12" class="d-flex justify-content-center">
    <b-card>
      <img alt="Vue logo" src="@/assets/logo.png" />

      <b-form-group>
        <b-form-input
          v-model="username"
          type="text"
          placeholder="Introduce tu nombre"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Introduce tu password"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <button @click="login" class="btn btn-block btn-primary">Login</button>
      </b-form-group>

      <b-form-group>
        <b-alert v-if="successMessage.length > 0" show variant="success">
          {{ successMessage }}
        </b-alert>
        <b-alert v-if="errorMessage.length > 0" show variant="danger">
          {{ errorMessage }}
        </b-alert>
      </b-form-group>
    </b-card>
  </b-col>
</template>

<script>
export default {
  data: function () {
    return {
      username: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async login() {
      // Comprueba que los campos no estan vacios
      if (!this.checkFields()) {
        return;
      }

      // Llamada a la accion LOGIN con los datos introducidos por el usuario y
      // Obtenemos la respuesta enviada por el servidor.
      let response = await this.$store.dispatch("security/login", {
        username: this.username,
        password: this.password,
      });
      // Si la respuesta no es exitosa, mostramos el error
      if (response.status != 200) {
        this.errorMessage = "Error a logear";
        return;
      }
      // Si la respusta es exitosa (200) cargamos los datos en la app
      await this.$store.dispatch("app/init");
    },
    // Comprobacion de los input del componente
    checkFields() {
      if (this.username.length == 0 || this.password.length == 0) {
        this.errorMessage = "Todos los campos son obligatorios!";
        return false;
      }

      // Comprobaciones superadas
      return true;
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  text-align: center;
  background: #fff;
}
.form-group {
  margin-bottom: 10px;
}

.form-group button {
  width: 100%;
}
</style>
