---
icon: fas fa-camera-retro
order: 2
layout: default
---

<head>
  <script type="module">
    import PhotoSwipeLightbox from '/assets/js/photoswipe/photoswipe-lightbox.esm.js';
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery--zoom-transition',
      children: 'a',
      showHideAnimationType: 'zoom',
      pswpModule: () => import('/assets/js/photoswipe/photoswipe.esm.js')
    });
    lightbox.init();
  </script>

  <link rel="stylesheet" href="/assets/css/photoswipe/photoswipe.css">
</head>

<body>

<p>Here are some photos from previous trips I took</p>

<div class="pswp-gallery pswp-gallery--single-column" id="gallery--getting-started">
  <a href="/assets/img/photography/austria/austria_001.jpg" 
    data-pswp-width="1640" 
    data-pswp-height="738" 
    target="_blank">
    <img src="/assets/img/photography/austria/austria_001.jpg" alt="something" />
  </a>
  <!-- cropped thumbnail: -->
  <a href="/assets/img/photography/austria/austria_002.jpg" 
    data-pswp-width="1640" 
    data-pswp-height="738" 
    data-cropped="true" 
    target="_blank">
    <img src="/assets/img/photography/austria/austria_002.jpg" alt="another one" />
  </a>
  <!-- data-pswp-src with custom URL in href -->
  <a href="/assets/img/photography/austria/austria_003.jpg" 
    data-pswp-width="738" 
    data-pswp-height="1640" 
    target="_blank">
    <img src="/assets/img/photography/austria/austria_003.jpg" alt="what the hell" />
  </a>
  <!-- Without thumbnail: -->
  <a href="/assets/img/photography/austria/austria_004.jpg" 
    data-pswp-width="1640" 
    data-pswp-height="738" 
    target="_blank">
  </a>
  <!-- wrapped with any element: -->
  <div>
    <a href="/assets/img/photography/austria/austria_005.jpg"
    data-pswp-width="1640" 
    data-pswp-height="738" 
      target="_blank">
      <img src="/assets/img/photography/austria/austria_005.jpg" alt="" />
    </a>
  </div>
</div>

</body>


