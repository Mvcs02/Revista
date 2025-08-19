$(document).ready(function() {
  // Elementos del DOM
  const $coverPreview = $('#cover-preview');
  const $magazineWrapper = $('#magazine-wrapper');
  const $flipbook = $('#flipbook');
  const $openBtn = $('#open-magazine');
  const $prevBtn = $('#prev-page');
  const $nextBtn = $('#next-page');
  const $currentPage = $('#current-page');
  const $totalPages = $('#total-pages');
  const $indexBtn = $('#goto-index');

  let magazineInitialized = false;
  let currentPage = 1;
  const totalPages = 32; // 32 páginas técnicas incluyendo las 6 nuevas páginas + páginas existentes sin páginas 26-27
  const displayTotalPages = 30; // 30 páginas visibles para el usuario (Portada + Índice + 6 nuevas + 22 contenido + Contraportada)

  // Actualizar contador de páginas con el total visible
  $totalPages.text(displayTotalPages);

  // Función para asignar clases par/impar automáticamente
  function setupPageClasses() {
    $('#flipbook .page').each(function(index) {
      const pageNumber = index + 1; // Las páginas empiezan desde 1
      if (pageNumber % 2 === 0) {
        $(this).addClass('page-even'); // Páginas pares (lado izquierdo)
      } else {
        $(this).addClass('page-odd'); // Páginas impares (lado derecho)
      }
      console.log(`Página ${pageNumber}: ${pageNumber % 2 === 0 ? 'par (izquierda)' : 'impar (derecha)'}`);
    });
  }

  // Función para inicializar Turn.js
  function initializeMagazine() {
    if (magazineInitialized) return;

    // Configurar clases de páginas antes de inicializar Turn.js
    setupPageClasses();

    $flipbook.turn({
      width: 1000,
      height: 700,
      autoCenter: true,
      elevation: 50,
      gradients: true,
      display: 'double',
      pages: 32, // Total 32 páginas (6 nuevas + 26 existentes sin páginas 26-27)
      when: {
        turning: function(event, page, view) {
          currentPage = page;
          updatePageCounter();
          updateNavigationButtons();
          updateShadowEffects();
        },
        turned: function(event, page, view) {
          currentPage = page;
          updatePageCounter();
          updateNavigationButtons();
          updateShadowEffects();
          
          console.log(`Página ${page} mostrada`);
        }
      }
    });

    magazineInitialized = true;
  }

  // Función para actualizar el contador de páginas
  function updatePageCounter() {
    // Obtener la página actual directamente de Turn.js por seguridad
    if (magazineInitialized && $flipbook.turn('page')) {
      currentPage = $flipbook.turn('page');
    }
    
    console.log('📊 updatePageCounter - currentPage:', currentPage);
    
    if (currentPage === 1) {
      $currentPage.text('Portada');
    } else if (currentPage === 2) {
      $currentPage.text('Índice');
    } else if (currentPage === 3) {
      $currentPage.text('1');
    } else if (currentPage === 4) {
      $currentPage.text('2');
    } else if (currentPage === 5) {
      $currentPage.text('3');
    } else if (currentPage === 6) {
      $currentPage.text('4');
    } else if (currentPage === 7) {
      $currentPage.text('5');
    } else if (currentPage === 8) {
      $currentPage.text('6');
    } else if (currentPage === 9) {
      $currentPage.text('7');
    } else if (currentPage === 10) {
      $currentPage.text('8');
    } else if (currentPage === 11) {
      $currentPage.text('9');
    } else if (currentPage === 12) {
      $currentPage.text('10');
    } else if (currentPage === 13) {
      $currentPage.text('11');
    } else if (currentPage === 14) {
      $currentPage.text('12');
    } else if (currentPage === 15) {
      $currentPage.text('13');
    } else if (currentPage === 16) {
      $currentPage.text('14');
    } else if (currentPage === 17) {
      $currentPage.text('15');
    } else if (currentPage === 18) {
      $currentPage.text('16');
    } else if (currentPage === 19) {
      $currentPage.text('17');
    } else if (currentPage === 20) {
      $currentPage.text('18');
    } else if (currentPage === 21) {
      $currentPage.text('19');
    } else if (currentPage === 22) {
      $currentPage.text('20');
    } else if (currentPage === 23) {
      $currentPage.text('21');
    } else if (currentPage === 24) {
      $currentPage.text('22');
    } else if (currentPage === 25) {
      $currentPage.text('23');
    } else if (currentPage === 26) {
      $currentPage.text('24');
    } else if (currentPage === 27) {
      $currentPage.text('25');
    } else if (currentPage === 28) {
      $currentPage.text('26');
    } else if (currentPage === 29) {
      $currentPage.text('27');
    } else if (currentPage === 30) {
      $currentPage.text('28');
    } else if (currentPage === 31) {
      $currentPage.text('29');
    } else if (currentPage === 32) {
      $currentPage.text('Contraportada'); // La página 32 es la contraportada
    } else {
      // Para cualquier caso inesperado, mostrar debug
      console.log('⚠️ Página no reconocida:', currentPage);
      $currentPage.text(currentPage);
    }
  }

  // Función para actualizar botones de navegación
  function updateNavigationButtons() {
    // Obtener la página actual directamente de Turn.js por seguridad
    if (magazineInitialized && $flipbook.turn('page')) {
      currentPage = $flipbook.turn('page');
    }
    
    console.log('🔄 Actualizando botones - Página actual:', currentPage, 'Total:', totalPages);
    
    $prevBtn.prop('disabled', currentPage <= 1);
    $nextBtn.prop('disabled', currentPage >= totalPages);
    
    // Mostrar botón siguiente en todas las páginas excepto la última real (página 32)
    // Pero considerando que ahora la página 32 es contraportada, ocultar desde la página 32
    if (currentPage >= 32) {
      $nextBtn.hide();
      console.log('❌ Ocultando botón siguiente en página', currentPage);
    } else {
      $nextBtn.show();
      console.log('✅ Mostrando botón siguiente en página', currentPage);
    }
    
    // Cambiar texto del botón siguiente
    if (currentPage === 1) {
      $nextBtn.find('.text').text('Entrar');
    } else if (currentPage === 30) {
      $nextBtn.find('.text').text('Contraportada'); 
    } else {
      $nextBtn.find('.text').text('Siguiente');
    }
    // Cambiar texto del botón anterior
    if (currentPage === 2) {
      $prevBtn.find('.text').text('Portada');
    } else if (currentPage === 32) {
      $prevBtn.find('.text').text('Anterior'); // Desde contraportada
    } else {
      $prevBtn.find('.text').text('Anterior');
    }
    
    // Mostrar/ocultar botón de índice (visible en todas las páginas de contenido, oculto solo en portada y contraportada)
    if (currentPage === 1 || currentPage === 32) {
      $indexBtn.hide();
    } else {
      $indexBtn.show();
    }
  }

  // Función para actualizar efectos de la línea divisoria
  function updateShadowEffects() {
    console.log('📏 updateShadowEffects llamada - currentPage:', currentPage);
    
    // Si estamos en la portada (página 1), ocultar línea divisoria
    if (currentPage === 1) {
      $flipbook.removeClass('magazine-opened turn-page');
      console.log('📕 Portada - ocultando línea divisoria');
    } else {
      // En cualquier otra página, mostrar línea divisoria con delay
      setTimeout(() => {
        if (currentPage > 1) { // Verificar que no hayamos vuelto a la portada
          $flipbook.addClass('magazine-opened turn-page');
          console.log('📖 Páginas abiertas - mostrando línea divisoria con delay');
        }
      }, 400); // 400ms delay 
    }
  }

  // Función para abrir la revista
  function openMagazine() {
    // FASE 1: Mostrar mensaje de apertura sobre la portada actual
    const $openingMsg = $('<div class="opening-message">📖 Abriendo libro...</div>');
    $openingMsg.css({
      'position': 'absolute',
      'top': '20px',
      'left': '50%',
      'transform': 'translateX(-50%)',
      'background': 'rgba(139, 69, 19, 0.9)',
      'color': 'white',
      'padding': '10px 20px',
      'border-radius': '25px',
      'font-weight': 'bold',
      'z-index': 1001,
      'opacity': '0',
      'transition': 'all 0.5s ease'
    });
    
    $coverPreview.append($openingMsg);
    
    setTimeout(() => {
      $openingMsg.css('opacity', '1');
    }, 100);

    // FASE 2: Transición - deslizar la portada hacia la derecha (1.5s)
    setTimeout(() => {
      $coverPreview.css({
        'transform': 'translateX(25%) scale(0.9) rotateY(-15deg)',
        'opacity': '0.8',
        'transition': 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      // FASE 3: Después de la transición, activar Turn.js
      setTimeout(() => {
        // Ocultar cover-preview
        $coverPreview.addClass('hidden');
        $magazineWrapper.removeClass('hidden');
        
        // Quitar mensaje
        $openingMsg.remove();
        
        // Inicializar Turn.js
        initializeMagazine();
        
        // Empezar en la portada (página 1)
        if (magazineInitialized) {
          $flipbook.turn('page', 1);
        }
        
        currentPage = 1;
        updatePageCounter();
        updateNavigationButtons();
        
        // Asegurar que empiece sin clases de sombra
        $flipbook.removeClass('magazine-opened turn-page');
        updateShadowEffects(); // Inicializar efectos de sombra
        
        console.log('📖 Revista abierta, estado inicial:', {
          currentPage: currentPage,
          totalPages: totalPages,
          magazineInitialized: magazineInitialized
        });
        
        // Animación de entrada suave del flipbook
        $magazineWrapper.css({
          'transform': 'scale(1.1)',
          'opacity': '0'
        });
        
        setTimeout(() => {
          $magazineWrapper.css({
            'transform': 'scale(1)',
            'opacity': '1',
            'transition': 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          });
        }, 50);
        
      }, 1500);
    }, 500);
  }

  // Función para cerrar la revista
  function closeMagazine() {
    // Animación de salida de la revista
    $magazineWrapper.css({
      'transform': 'scale(0.8) rotateX(10deg)',
      'opacity': '0',
      'transition': 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    setTimeout(() => {
      $magazineWrapper.addClass('hidden');
      $coverPreview.removeClass('hidden');
      
      // Restaurar portada preview a su estado original
      $coverPreview.css({
        'transform': 'scale(1)',
        'opacity': '1',
        'transition': 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      });
      
      // Resetear estilos de la revista
      setTimeout(() => {
        $magazineWrapper.css({
          'transform': '',
          'opacity': '',
          'transition': ''
        });
        
        // Volver a la portada cuando se reabra
        if (magazineInitialized) {
          $flipbook.turn('page', 1);
          currentPage = 1;
          updatePageCounter();
          updateNavigationButtons();
        }
      }, 100);
    }, 500);
  }

  // Función para ir a página anterior
  function prevPage() {
    console.log('🔙 Intentando ir a página anterior. Estado:', {currentPage, magazineInitialized});
    if (magazineInitialized && currentPage > 1) {
      $flipbook.turn('previous');
    }
  }

  // Función para ir a página siguiente
  function nextPage() {
    console.log('➡️ Intentando ir a página siguiente. Estado:', {currentPage, totalPages, magazineInitialized});
    if (magazineInitialized && currentPage < totalPages) {
      $flipbook.turn('next');
    }
  }

  // Función para ir al índice
  function goToIndex() {
    console.log('📋 Intentando ir al índice. Estado:', {currentPage, magazineInitialized});
    if (magazineInitialized) {
      $flipbook.turn('page', 2); // Página 2 es el índice
      currentPage = 2;
      updatePageCounter();
      updateNavigationButtons();
      console.log('📋 Navegando al índice');
    }
  }

  // Event listeners
  $openBtn.on('click', openMagazine);
  $prevBtn.on('click', prevPage);
  $nextBtn.on('click', nextPage);
  $indexBtn.on('click', goToIndex);
  
  console.log('🎮 Event listeners configurados:', {
    openBtn: $openBtn.length,
    prevBtn: $prevBtn.length,
    nextBtn: $nextBtn.length,
    indexBtn: $indexBtn.length
  });

  // Navegación del índice
  $(document).on('click', '.index-item', function(e) {
    e.preventDefault();
    const targetPage = $(this).data('page');
    if (targetPage && magazineInitialized) {
      // Efecto visual de click
      $(this).addClass('clicked');
      setTimeout(() => $(this).removeClass('clicked'), 200);
      
      // Navegar a la página
      $flipbook.turn('page', targetPage);
      currentPage = targetPage;
      updatePageCounter();
      updateNavigationButtons();
      
      console.log(`📖 Navegando a página ${targetPage} desde índice`);
    }
  });

  // Navegación por teclado
  $(document).on('keydown', function(e) {
    if (!$magazineWrapper.hasClass('hidden')) {
      switch(e.which) {
        case 37: // Flecha izquierda
          e.preventDefault();
          prevPage();
          break;
        case 39: // Flecha derecha
          e.preventDefault();
          nextPage();
          break;
        case 27: // Escape
          e.preventDefault();
          closeMagazine();
          break;
        case 32: // Spacebar
          e.preventDefault();
          nextPage();
          break;
        case 36: // Home - ir a portada
          e.preventDefault();
          if (magazineInitialized) {
            $flipbook.turn('page', 1);
          }
          break;
        case 35: // End - ir a contraportada
          e.preventDefault();
          if (magazineInitialized) {
            $flipbook.turn('page', totalPages);
          }
          break;
      }
    } else if (!$coverPreview.hasClass('hidden')) {
      if (e.which === 13 || e.which === 32) { // Enter o Spacebar
        e.preventDefault();
        openMagazine();
      }
    }
  });

  // Click en la portada para abrir
  $('.cover-page').on('click', openMagazine);

  // Navegación táctil mejorada
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  $flipbook.on('touchstart', function(e) {
    const touch = e.originalEvent.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
  });

  $flipbook.on('touchend', function(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touch = e.originalEvent.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;
    const touchEndTime = Date.now();
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    const deltaTime = touchEndTime - touchStartTime;
    
    // Solo procesar swipes rápidos y horizontales
    if (deltaTime < 500 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 30) { // Mínima distancia
        if (deltaX > 0) {
          // Swipe hacia la izquierda - página siguiente
          nextPage();
        } else {
          // Swipe hacia la derecha - página anterior
          prevPage();
        }
      }
    }
    
    // Reset
    touchStartX = 0;
    touchStartY = 0;
    touchStartTime = 0;
  });

  // Manejo de redimensionamiento
  $(window).on('resize', function() {
    if (magazineInitialized) {
      setTimeout(() => {
        $flipbook.turn('resize');
      }, 100);
    }
  });

  // Inicialización
  updateNavigationButtons();
  updatePageCounter();
  
  // Precargar Turn.js cuando se hace hover en la portada
  $('.cover-page').on('mouseenter', function() {
    if (!magazineInitialized) {
      // Precargar los recursos de Turn.js
      setTimeout(initializeMagazine, 500);
    }
  });

  // Efectos de sonido simulados (opcional)
  function playPageSound() {
    // Aquí podrías agregar efectos de sonido reales
    console.log('📖 Sonido de página');
  }

  // Agregar efectos visuales adicionales
  $flipbook.on('start', function(event, pageObject, corner) {
    // Cuando empieza a voltearse una página
    $(pageObject.next).css('z-index', 999);
  });

  $flipbook.on('end', function(event, pageObject, corner) {
    // Cuando termina de voltearse una página
    playPageSound();
  });

  console.log('📚 Revista Digital inicializada - Sin páginas invisibles');
});
