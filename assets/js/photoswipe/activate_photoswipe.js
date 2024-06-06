import PhotoSwipeLightbox from './photoswipe-lightbox.esm.js'

const options = {
  gallerySelector: '.photoswipe-gallery',
  childSelector: '.photoswipe',
  pswpModule: '/assets/js/photoswipe/photoswipe.esm.js',
  pswpCSS: '/assets/css/photoswipe/photoswipe.css'
}

const lightbox = new PhotoSwipeLightbox(options)
lightbox.init()