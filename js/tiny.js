// Snapshots can be nudged around with a mouse, like photos on a desk.
// Touch screens keep normal scrolling, so this only listens to mouse pointers.
(function () {
  var top = 10;
  document.querySelectorAll('.snap').forEach(function (el) {
    var sx, sy, ox = 0, oy = 0;
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      e.preventDefault();
      sx = e.clientX - ox; sy = e.clientY - oy;
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
      el.style.zIndex = ++top;
    });
    el.addEventListener('pointermove', function (e) {
      if (!el.classList.contains('dragging')) return;
      ox = e.clientX - sx; oy = e.clientY - sy;
      el.style.setProperty('--dx', ox + 'px');
      el.style.setProperty('--dy', oy + 'px');
    });
    function drop() { el.classList.remove('dragging'); }
    el.addEventListener('pointerup', drop);
    el.addEventListener('pointercancel', drop);
  });
})();
