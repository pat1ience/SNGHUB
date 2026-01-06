document.addEventListener('DOMContentLoaded', function() {
    // Находим все блоки видео на странице
    const videoBlocks = document.querySelectorAll('.block_video');

    videoBlocks.forEach(block => {
        // Делаем курсор "ручкой" при наведении
        block.style.cursor = 'pointer';

        block.addEventListener('click', function() {
            // Получаем данные из блока
            const id = this.getAttribute('data-id');
            const videoSrc = this.getAttribute('data-video');
            const title = this.querySelector('.block__video-title').innerText;

            // Формируем адрес страницы плеера с параметрами
            const url = `player.html?id=${id}&title=${encodeURIComponent(title)}&src=${encodeURIComponent(videoSrc)}`;
            
            // Переходим на страницу
            window.location.href = url;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const videos = Array.from(document.querySelectorAll('.block_video'));
    const container = document.querySelector('.content_videos'); // Контейнер с видео
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const videosPerPage = 28; 
    let currentPage = 1;
    const totalPages = Math.ceil(videos.length / videosPerPage);

    function showPage(page, scroll = true) {
        currentPage = page;
        
        // Показываем нужные видео
        const start = (page - 1) * videosPerPage;
        const end = start + videosPerPage;

        videos.forEach((video, index) => {
            video.style.display = (index >= start && index < end) ? 'block' : 'none';
        });

        // СКРОЛЛ НАВЕРХ
        if (scroll) {
            // Вариант 1: Скролл к самому верху страницы
            // window.scrollTo({ top: 0, behavior: 'smooth' });

            // Вариант 2: Скролл именно к началу блока с видео (лучше для UX)
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        renderPagination();
    }

    function renderPagination() {
        pageNumbersContainer.innerHTML = ''; 
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.classList.add('pag-btn');
            if (i === currentPage) btn.classList.add('active');
            btn.innerText = i;
            btn.onclick = () => showPage(i);
            pageNumbersContainer.appendChild(btn);
        }

        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);
        prevBtn.style.opacity = (currentPage === 1) ? "0.3" : "1";
    }

    prevBtn.onclick = () => { if (currentPage > 1) showPage(currentPage - 1); };
    nextBtn.onclick = () => { if (currentPage < totalPages) showPage(currentPage + 1); };

    // При первой загрузке показываем 1 страницу БЕЗ скролла
    showPage(1, false);
});

