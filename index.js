/* =========================================================
   Club Andino Villa Carlos Paz — index.js

   1. Menú móvil: abre y cierra, mantiene aria-expanded al día,
      se cierra al tocar un enlace, con Escape y al pasar a escritorio.
   2. Año dinámico en el pie.

   Sin dependencias. Si el JavaScript no carga, la página sigue
   siendo legible y navegable: el menú de escritorio y todos los
   contenidos son HTML puro.
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. Menú móvil ---------- */
  var boton = document.getElementById('btn-menu');
  var menu  = document.getElementById('menu-movil');

  if (boton && menu) {

    function abrir() {
      menu.hidden = false;
      boton.setAttribute('aria-expanded', 'true');
      boton.setAttribute('aria-label', 'Cerrar menú');
    }

    function cerrar() {
      menu.hidden = true;
      boton.setAttribute('aria-expanded', 'false');
      boton.setAttribute('aria-label', 'Abrir menú');
    }

    function alternar() {
      if (boton.getAttribute('aria-expanded') === 'true') {
        cerrar();
      } else {
        abrir();
      }
    }

    boton.addEventListener('click', alternar);

    // Cerrar al tocar cualquier enlace del menú
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (enlace) {
      enlace.addEventListener('click', cerrar);
    });

    // Cerrar con Escape y devolver el foco al botón
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') {
        cerrar();
        boton.focus();
      }
    });

    // Cerrar solo si la pantalla pasa a ancho de escritorio
    var escritorio = window.matchMedia('(min-width: 1000px)');

    function alCambiar(e) {
      if (e.matches) { cerrar(); }
    }

    if (typeof escritorio.addEventListener === 'function') {
      escritorio.addEventListener('change', alCambiar);
    } else if (typeof escritorio.addListener === 'function') {
      escritorio.addListener(alCambiar);   // navegadores viejos
    }
  }

  /* ---------- 2. Año dinámico en el pie ---------- */
  var anio = document.getElementById('anio');
  if (anio) {
    anio.textContent = String(new Date().getFullYear());
  }

})();
