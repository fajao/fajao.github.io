---
icon: fa fa-camera
order: 2
---

<style>
.image-gallery {
    display: flex;
    flex-wrap: wrap;
    row-gap: 0px; /* Adjust the vertical spacing between rows */
    column-gap: 5px; /* Adjust the horizontal spacing between columns */
    justify-content: center; /* Center the gallery */
    margin: 0 auto; /* Center the gallery within the page */
    max-width: 1200px; /* Maximum width of the gallery */
}

.gallery-item {
    position: relative; /* Position for overlay */
    flex: 1 1 calc(50% - 16px); /* 2 images per row with gap */
    max-width: calc(50% - 16px); /* Ensure images don’t exceed container width */
    margin: 0;
    padding: 0;
    overflow: hidden; /* Hide overflow */
}

.gallery-item3 {
    position: relative; /* Position for overlay */
    flex: 1 1 calc(33.33% - 12px); /* 3 images per row with gap */
    max-width: calc(33.33% - 12px); /* Ensure images don’t exceed container width */
    margin: 0;
    padding: 0;
    overflow: hidden; /* Hide overflow */
}

.gallery-item.large {
    flex: 1 1 calc(70% - 10px); /* Larger width item */
    max-width: calc(70% - 10px);
}

.gallery-item.small {
    flex: 1 1 calc(30% - 10px); /* Larger width item */
    max-width: calc(30% - 10px);
}

.gallery-image {
    width: 100%; /* Make image take up the full width of its container */
    height: 100%; /* Maintain aspect ratio */
    border: 0.5px solid #ddd; /* Border around each image */
    border-radius: 1px; /* Rounded corners */
    box-shadow: 0 1px 2px rgba(0,0,0,0.1); /* Subtle shadow */
    transition: transform 0.3s ease; /* Smooth hover effect */
}

.gallery-item:hover .gallery-image {
    transform: scale(1.05); /* Slightly enlarge image on hover */
}

.gallery-caption {
    display: none; /* Hide caption by default */
    position: absolute; /* Position caption absolutely */
    bottom: 0; /* Align caption to the bottom */
    left: 0; /* Align caption to the left */
    right: 0; /* Align caption to the right */
    background: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
    color: #fff; /* White text */
    text-align: center; /* Center the caption text */
    padding: 8px; /* Padding for the caption */
    opacity: 0; /* Initially hide caption */
    transition: opacity 0.3s ease; /* Smooth transition for opacity */
}

.gallery-item:hover .gallery-caption, .gallery-item3:hover .gallery-caption {
    display: block; /* Show caption on hover */
    opacity: 1; /* Fade in caption on hover */
}
</style>

## Vienna - Austria (November 2023)

<div class="image-gallery">
  <figure class="gallery-item">
    <img src="/assets/img/photography/austria/austria_001.jpg" alt="001" class="gallery-image">
    <figcaption class="gallery-caption">St. Stephen's Cathedral, Vienna</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/austria/austria_002.jpg" alt="002" class="gallery-image">
    <figcaption class="gallery-caption">Hundertwasser House, Vienna</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/austria/austria_004.jpg" alt="004" class="gallery-image">
    <figcaption class="gallery-caption">Rathausplatz with christmas decorations at night, Vienna</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/austria/austria_005.jpg" alt="005" class="gallery-image">
    <figcaption class="gallery-caption">Burgtheater at night, Vienna</figcaption>
  </figure>  
  <figure class="gallery-item3">
    <img src="/assets/img/photography/austria/austria_003.jpg" alt="003" class="gallery-image">
    <figcaption class="gallery-caption">Votivkirche at night, Vienna</figcaption>
  </figure>
  <figure class="gallery-item3">
    <img src="/assets/img/photography/austria/austria_007.jpg" alt="007" class="gallery-image">
    <figcaption class="gallery-caption">Graben Street, Vienna</figcaption>
  </figure> 
  <figure class="gallery-item3">
    <img src="/assets/img/photography/austria/austria_011.jpg" alt="011" class="gallery-image">
    <figcaption class="gallery-caption">Sisi Museum, Vienna</figcaption>
  </figure>   
  <figure class="gallery-item">
    <img src="/assets/img/photography/austria/austria_006.jpg" alt="006" class="gallery-image">
    <figcaption class="gallery-caption">Rathausplatz with christmas decorations at night, Vienna</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/austria/austria_008.jpg" alt="008" class="gallery-image">
    <figcaption class="gallery-caption">Outer Castle Gate, Vienna</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/austria/austria_009.jpg" alt="009" class="gallery-image">
    <figcaption class="gallery-caption">Vienna State Opera, Vienna</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/austria/austria_010.jpg" alt="010" class="gallery-image">
    <figcaption class="gallery-caption">Archduke Karl - Equestrian Statue, Vienna</figcaption>
  </figure> 
  <figure class="gallery-item3">
    <img src="/assets/img/photography/austria/austria_012.jpg" alt="012" class="gallery-image">
    <figcaption class="gallery-caption">Peterskirche, Vienna</figcaption>
  </figure>
  <figure class="gallery-item3">
    <img src="/assets/img/photography/austria/austria_013.jpg" alt="013" class="gallery-image">
    <figcaption class="gallery-caption">Austrian Parliament, Vienna</figcaption>
  </figure> 
  <figure class="gallery-item3">
    <img src="/assets/img/photography/austria/austria_014.jpg" alt="014" class="gallery-image">
    <figcaption class="gallery-caption">Rathausplatz with christmas decorations at night, Vienna</figcaption>
  </figure>   
</div>

## Budapest - Hungary (November 2023)

<div class="image-gallery">
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_001.jpg" alt="001" class="gallery-image">
    <figcaption class="gallery-caption">Liberty Bridge at night, Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_002.jpg" alt="002" class="gallery-image">
    <figcaption class="gallery-caption">Liberty Bridge from Mandulafa at night, Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_003.jpg" alt="003" class="gallery-image">
    <figcaption class="gallery-caption">Buda Castle and Széchenyi Lánchíd Bridge at night, Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_004.jpg" alt="004" class="gallery-image">
    <figcaption class="gallery-caption">Hungary Parlament at night, Budapest</figcaption>
  </figure> 
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_005.jpg" alt="005" class="gallery-image">
    <figcaption class="gallery-caption">Christmas decorations, Budapest</figcaption>
  </figure>
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_006.jpg" alt="006" class="gallery-image">
    <figcaption class="gallery-caption">Church of Saint Mary Magdalene, Budapest</figcaption>
  </figure> 
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_007.jpg" alt="007" class="gallery-image">
    <figcaption class="gallery-caption">Matthias Church, Budapest</figcaption>
  </figure> 
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_008.jpg" alt="008" class="gallery-image">
    <figcaption class="gallery-caption">Prince of Buda and the Princess of Pest monument, Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_009.jpg" alt="009" class="gallery-image">
    <figcaption class="gallery-caption">Liberty Bridge from Mandulafa, Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_010.jpg" alt="010" class="gallery-image">
    <figcaption class="gallery-caption">Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_011.jpg" alt="011" class="gallery-image">
    <figcaption class="gallery-caption">Budapest</figcaption>
  </figure> 
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_012.jpg" alt="012" class="gallery-image">
    <figcaption class="gallery-caption">Széchenyi Lánchíd Bridge, Budapest</figcaption>
  </figure>
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_015.jpg" alt="015" class="gallery-image">
    <figcaption class="gallery-caption">Tower of St. Stephen's Basilica, Budapest</figcaption>
  </figure> 
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_016.jpg" alt="016" class="gallery-image">
    <figcaption class="gallery-caption">Inside Hungary Parliament, Budapest</figcaption>
  </figure>   
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_013.jpg" alt="013" class="gallery-image">
    <figcaption class="gallery-caption">Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_014.jpg" alt="014" class="gallery-image">
    <figcaption class="gallery-caption">St. Stephen's square, Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_017.jpg" alt="017" class="gallery-image">
    <figcaption class="gallery-caption">Breakfast from Kamar Café, Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_018.jpg" alt="018" class="gallery-image">
    <figcaption class="gallery-caption">Puskás Aréna Park, Budapest</figcaption>
  </figure>  
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_019.jpg" alt="019" class="gallery-image">
    <figcaption class="gallery-caption">Budapest from St. Stephen's Basilica rooftop </figcaption>
  </figure>
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_021.jpg" alt="021" class="gallery-image">
    <figcaption class="gallery-caption">Great Market Hall, Budapest</figcaption>
  </figure> 
  <figure class="gallery-item3">
    <img src="/assets/img/photography/hungary/hung_024.jpg" alt="024" class="gallery-image">
    <figcaption class="gallery-caption">Statue of Prince Eugene Of Savoy, Buda Castle, Budapest</figcaption>
  </figure> 
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_022.jpg" alt="022" class="gallery-image">
    <figcaption class="gallery-caption">Museum of Fine Arts, Budapest</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/hungary/hung_023.jpg" alt="023" class="gallery-image">
    <figcaption class="gallery-caption">Heroes' Square, Budapest</figcaption>
  </figure>  
</div>

## Scotland (August 2022)

<div class="image-gallery">
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_001.jpg" alt="001" class="gallery-image">
    <figcaption class="gallery-caption">Stonehaven War Memorial, Stonehaven</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_002.jpg" alt="002" class="gallery-image">
    <figcaption class="gallery-caption">Dunnottar Castle, Stonehaven</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_003.jpg" alt="003" class="gallery-image">
    <figcaption class="gallery-caption">St Margaret's Loch and St. Anthony's Chapel Ruins, Edinburgh</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_004.jpg" alt="004" class="gallery-image">
    <figcaption class="gallery-caption">The Old Man of Storr, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_005.jpg" alt="005" class="gallery-image">
    <figcaption class="gallery-caption">View from the Storr, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_006.jpg" alt="006" class="gallery-image">
    <figcaption class="gallery-caption">The Old Man of Storr, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_007.jpg" alt="007" class="gallery-image">
    <figcaption class="gallery-caption">View from the Storr, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_008.jpg" alt="008" class="gallery-image">
    <figcaption class="gallery-caption">View from the Storr, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_009.jpg" alt="009" class="gallery-image">
    <figcaption class="gallery-caption">Loch Rix, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_010.jpg" alt="010" class="gallery-image">
    <figcaption class="gallery-caption">Loch Leathan, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_011.jpg" alt="011" class="gallery-image">
    <figcaption class="gallery-caption">Lochend Beach (End of Loch Ness), Inverness</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_012.jpg" alt="012" class="gallery-image">
    <figcaption class="gallery-caption">Leanach Cottage, Culloden Battlefield, Inverness</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_013.jpg" alt="013" class="gallery-image">
    <figcaption class="gallery-caption">Culloden Monument, Inverness</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_019.jpg" alt="019" class="gallery-image">
    <figcaption class="gallery-caption">The Kelpies, Falkirk</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_014.jpg" alt="014" class="gallery-image">
    <figcaption class="gallery-caption">Broad Street, Stirling</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_015.jpg" alt="015" class="gallery-image">
    <figcaption class="gallery-caption">Neist Point Light House, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_016.jpg" alt="016" class="gallery-image">
    <figcaption class="gallery-caption">Waterstein Head, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_017.jpg" alt="017" class="gallery-image">
    <figcaption class="gallery-caption">Neist Point, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_018.jpg" alt="018" class="gallery-image">
    <figcaption class="gallery-caption">Edinburgh Castle (North-East View), Edinburgh</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_020.jpg" alt="020" class="gallery-image">
    <figcaption class="gallery-caption">Stein, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_022.jpg" alt="022" class="gallery-image">
    <figcaption class="gallery-caption">Stein, Isle of Skye</figcaption>
  </figure>
  <figure class="gallery-item">
    <img src="/assets/img/photography/scotland/scotland_023.jpg" alt="023" class="gallery-image">
    <figcaption class="gallery-caption">Neist Point, Isle of Skye</figcaption>
  </figure>
</div>