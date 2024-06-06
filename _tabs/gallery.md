---
icon: fas fa-camera-retro
order: 2
layout: default
---

<header>

<script type="module">
import PhotoSwipeLightbox from '/assets/js/photoswipe/photoswipe-lightbox.esm.js';
import PhotoSwipe from '/assets/js/photoswipe/photoswipe.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery--no-dynamic-import',
  children: 'a',
  pswpModule: PhotoSwipe
});

lightbox.init();
</script>

<link rel="stylesheet" href="/assets/css/photoswipe/dist/photoswipe.css">

</header>

<div class="pswp-gallery pswp-gallery--single-column" id="gallery--getting-started">
  <a href="/assets/img/photography/austria/austria_001.jpg" 
    data-pswp-width="1669" 
    data-pswp-height="2500" 
    target="_blank">
    <img src="/assets/img/photography/austria/austria_001.jpg" alt="" />
  </a>
  <!-- cropped thumbnail: -->
  <a href="/assets/img/photography/austria/austria_002.jpg" 
    data-pswp-width="1875" 
    data-pswp-height="2500" 
    data-cropped="true" 
    target="_blank">
    <img src="/assets/img/photography/austria/austria_002.jpg" alt="" />
  </a>
  <!-- data-pswp-src with custom URL in href -->
  <a href="/assets/img/photography/austria/austria_003.jpg" 
    data-pswp-width="2500" 
    data-pswp-height="1666" 
    target="_blank">
    <img src="/assets/img/photography/austria/austria_003.jpg" alt="" />
  </a>
  <!-- Without thumbnail: -->
  <a href="/assets/img/photography/austria/austria_004.jpg" 
    data-pswp-width="2500" 
    data-pswp-height="1668" 
    target="_blank">
  </a>
  <!-- wrapped with any element: -->
  <div>
    <a href="/assets/img/photography/austria/austria_005.jpg"
      data-pswp-width="2500" 
      data-pswp-height="1667" 
      target="_blank">
      <img src="/assets/img/photography/austria/austria_005.jpg" alt="" />
    </a>
  </div>
</div>

