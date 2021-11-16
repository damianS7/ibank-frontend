<template>
  <b-col id="login" cols="12" class="d-flex justify-content-center">
    <b-card>
      <img alt="Vue logo" src="@/assets/logo.png" />
      <b-form-group v-if="registerView">
        <b-form-input
          v-model="email"
          type="email"
          placeholder="Introduce tu email"
        ></b-form-input>
      </b-form-group>

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
        <button
          v-if="loginView"
          @click="login"
          class="btn btn-block btn-primary"
        >
          Login
        </button>
        <button
          v-if="registerView"
          @click="register"
          class="btn btn-block btn-primary"
        >
          Register
        </button>
      </b-form-group>

      <b-form-group>
        <b-alert v-if="successMessage.length > 0" show variant="success">
          {{ successMessage }}
        </b-alert>
        <b-alert v-if="errorMessage.length > 0" show variant="danger">
          {{ errorMessage }}
        </b-alert>
      </b-form-group>

      <b-form-group class="text-center">
        <a @click="switchView" class="btn btn-link">
          {{ loginView ? "Necesitas una cuenta?" : "Volver a Login" }}
        </a>
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
      email: "",
      errorMessage: "",
      successMessage: "",
      loginView: true,
      registerView: false,
    };
  },
  methods: {
    login() {},
    register() {},

    // Comprobacion de los input del componente
    checkFields() {
      if (this.username.length == 0 || this.password.length == 0) {
        this.errorMessage = "Todos los campos son obligatorios!";
        return false;
      }

      if (this.registerView && this.email.length == 0) {
        this.errorMessage = "Todos los campos son obligatorios!";
        return false;
      }

      // Comprobaciones superadas
      return true;
    },

    // Metodo para cambiar entre vista de usuario y registro
    switchView() {
      // Si esta mostrando el formulario de LOGIN ...
      if (this.loginView) {
        this.loginView = false; // Se oculta LOGIN
        this.registerView = true; // Se muestra REGISTER
      } else {
        this.loginView = true;
        this.registerView = false;
      }
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
