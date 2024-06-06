document.addEventListener("DOMContentLoaded", function() {
    const galleryElements = document.querySelectorAll('.lightgallery');

    galleryElements.forEach(gallery => {
        lightGallery(gallery, {
            thumbnail: true,
            animateThumb: false,
            showThumbByDefault: false,
            download: false,
            fullscreen: true
        });
    });
});
