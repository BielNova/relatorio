// Configuração dos slides
const slides = [
    { id: 'capa', title: 'Capa' },
    { id: 'resumo_dia', title: 'Resumo do Dia' },
    { id: 'indicadores_chave', title: 'Indicadores-Chave' },
    { id: 'ocorrencias', title: 'Ocorrências' },
    { id: 'acoes_amanha', title: 'Ações p/ Amanhã' },
    { id: 'acompanhamento_acoes', title: 'Acompanhamento de Ações' }
];

// Função para adicionar navegação a cada slide
function addNavigation() {
    // Encontrar o slide atual
    const currentPath = window.location.pathname;
    const currentSlide = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const currentIndex = slides.findIndex(slide => currentSlide === slide.id + '.html');
    
    // Criar o elemento de navegação
    const navElement = document.createElement('div');
    navElement.className = 'slide-navigation';
    navElement.innerHTML = `
        <div class="nav-controls">
            <button id="prevSlide" ${currentIndex <= 0 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>
            <select id="slideSelect">
                ${slides.map((slide, index) => `
                    <option value="${slide.id}.html" ${currentIndex === index ? 'selected' : ''}>
                        ${index + 1}. ${slide.title}
                    </option>
                `).join('')}
            </select>
            <button id="nextSlide" ${currentIndex >= slides.length - 1 ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    
    // Adicionar o elemento ao corpo do documento
    document.body.appendChild(navElement);
    
    // Adicionar estilos CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .slide-navigation {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            background-color: rgba(10, 10, 10, 0.8);
            border-radius: 8px;
            padding: 8px 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-controls {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .nav-controls button {
            background-color: #1a3c6e;
            color: white;
            border: none;
            border-radius: 4px;
            width: 36px;
            height: 36px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }
        
        .nav-controls button:hover:not([disabled]) {
            background-color: #2a5ca8;
        }
        
        .nav-controls button[disabled] {
            background-color: #333;
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .nav-controls select {
            background-color: #1a1a1a;
            color: white;
            border: 1px solid #333;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 14px;
            min-width: 200px;
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .slide-navigation {
                bottom: 10px;
                width: 90%;
            }
            
            .nav-controls select {
                min-width: 150px;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Adicionar event listeners
    document.getElementById('prevSlide').addEventListener('click', () => {
        if (currentIndex > 0) {
            window.location.href = slides[currentIndex - 1].id + '.html';
        }
    });
    
    document.getElementById('nextSlide').addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            window.location.href = slides[currentIndex + 1].id + '.html';
        }
    });
    
    document.getElementById('slideSelect').addEventListener('change', (e) => {
        window.location.href = e.target.value;
    });
    
    // Adicionar navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            window.location.href = slides[currentIndex - 1].id + '.html';
        } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
            window.location.href = slides[currentIndex + 1].id + '.html';
        }
    });
}

// Adicionar a navegação quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', addNavigation);
