document.addEventListener('DOMContentLoaded', function () {
    const mainSneaker = document.getElementById('main-sneaker');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let positions = ['thumbnail-1', 'thumbnail-2', 'thumbnail-3'];

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function (event) {
            event.preventDefault();

            const newSrc = this.getAttribute('data-large');

            animateSneakerChange(mainSneaker, newSrc);
            updateThumbnailPositions(this);
        });
    });

    function animateSneakerChange(element, newSrc) {
        element.style.animation = 'rotate-out 0.5s forwards';

        element.addEventListener('animationend', function() {
            element.src = newSrc;
            element.style.animation = 'rotate-in 0.5s forwards';
        }, { once: true });
    }

    function updateThumbnailPositions(clickedThumbnail) {
        const clickedIndex = Array.from(thumbnails).indexOf(clickedThumbnail);

        const direction = clickedIndex === 0 ? 'clockwise' : 'counterclockwise';

        thumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('rotate-clockwise');
            thumbnail.classList.remove('rotate-counterclockwise');
            thumbnail.classList.add(direction === 'clockwise' ? 'rotate-clockwise' : 'rotate-counterclockwise');
        });

        setTimeout(() => {
            thumbnails.forEach(thumbnail => {
                positions.forEach(pos => thumbnail.classList.remove(pos));
            });

            const newPositions = Array.from(thumbnails);
            newPositions.splice(clickedIndex, 1); 
            newPositions.splice(1, 0, clickedThumbnail); 

            newPositions.forEach((thumbnail, index) => {
                thumbnail.classList.add(positions[index]);
            });

            
            setTimeout(() => {
                thumbnails.forEach(thumbnail => {
                    thumbnail.classList.remove('rotate-clockwise');
                    thumbnail.classList.remove('rotate-counterclockwise');
                });
            }, 500);
        }, 50); 
    }
});