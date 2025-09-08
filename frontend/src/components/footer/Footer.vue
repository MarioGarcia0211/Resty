<template>
  <footer class="footer mt-3 py-4 px-4">
    <div
      class="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start"
    >
      <div class="mb-3 mb-md-0 text-white-50">
        © {{ new Date().getFullYear() }} Mario García. Todos los derechos
        reservados.
      </div>

      <ul class="list-unstyled d-flex flex-wrap justify-content-center mb-0">
        <li v-for="icono in iconos" :key="icono.nombre" class="ms-3">
          <a
            :href="icono.url"
            :class="['icon-box', icono.clase]"
            target="_blank"
            rel="noopener noreferrer"
            :title="capitalizar(icono.nombre)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <i :class="icono.icono"></i>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import * as bootstrap from "bootstrap";
export default {
  data() {
    return {
      iconos: [
        {
          nombre: "instagram",
          url: "https://www.instagram.com/jmgb0211/",
          clase: "instagram",
          icono: "bi bi-instagram",
        },
        {
          nombre: "facebook",
          url: "https://www.facebook.com/MarioGarcia.0211",
          clase: "facebook",
          icono: "bi bi-facebook",
        },
        {
          nombre: "twitter",
          url: "https://twitter.com",
          clase: "twitter",
          icono: "bi bi-twitter-x",
        },
        {
          nombre: "whatsapp",
          url: "https://wa.me/+573166142980",
          clase: "whatsapp",
          icono: "bi bi-whatsapp",
        },
        {
          nombre: "github",
          url: "https://github.com/MarioGarcia0211",
          clase: "github",
          icono: "bi bi-github",
        },
      ],
    };
  },
  mounted() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
  },
  methods: {
    capitalizar(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: #0c0022;
  border-top: 2px solid rgba(255, 255, 255, 0.05);
}

.icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, background-color 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.icon-box i {
  font-size: 1.3rem;
  transition: color 0.3s ease, transform 0.6s ease;
}

/* Animación: zoom + rotación */
.icon-box:hover {
  transform: scale(1.15);
  background-color: #f8f9fa;
}

.icon-box:hover i {
  transform: rotate(360deg);
}

/* Colores específicos + color más brillante al hacer hover */
.instagram i {
  color: #e1306c;
}
.instagram:hover i {
  color: #ff5e9c;
}

.facebook i {
  color: #1877f2;
}
.facebook:hover i {
  color: #559dff;
}

.twitter i {
  color: #000000;
}
.twitter:hover i {
  color: #333333;
}

.whatsapp i {
  color: #25d366;
}
.whatsapp:hover i {
  color: #3be87e;
}

.github i {
  color: #171515;
}
.github:hover i {
  color: #333333;
}

/* Responsive */
@media (max-width: 576px) {
  .footer {
    text-align: center;
  }
}
</style>
