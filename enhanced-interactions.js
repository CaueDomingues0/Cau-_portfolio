// Adicionar animação de partículas flutuantes
document.addEventListener('DOMContentLoaded', function() {
    // Configuração para a seção de eventos
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Adicionar efeito de hover 3D aos cards
    const cards = document.querySelectorAll('.project-card, .event-card, .language-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / 20;
            const deltaY = (y - centerY) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Adicionar contador de números para as porcentagens de habilidades
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const width = progressBar.style.width;
        const percentage = parseInt(width);
        
        const counter = document.createElement('div');
        counter.className = 'skill-counter';
        counter.textContent = '0%';
        
        item.querySelector('.skill-bar').appendChild(counter);
        
        let count = 0;
        const interval = setInterval(() => {
            if (count >= percentage) {
                clearInterval(interval);
            } else {
                count++;
                counter.textContent = count + '%';
            }
        }, 20);
    });
    
    // Adicionar botão de voltar ao topo com animação suave
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Adicionar efeito de destaque para a navegação ativa
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Adicionar efeito de digitação para a seção de contato
    const contactTitle = document.querySelector('.contact .section-title');
    const originalText = contactTitle.textContent;
    contactTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            contactTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar efeito de digitação quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.contact'));
    
    // Adicionar efeito de parallax para a seção hero
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero');
        const particles = document.querySelector('.particles-container');
        
        if (particles && scrollY <= heroSection.offsetHeight) {
            particles.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
    
    // Adicionar animação para as barras de progresso de idiomas
    const languageCards = document.querySelectorAll('.language-card');
    
    const animateLanguageProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.language-progress-bar');
                progressBar.style.width = progressBar.getAttribute('style').split('width:')[1].trim();
                observer.unobserve(entry.target);
            }
        });
    };
    
    const languageObserver = new IntersectionObserver(animateLanguageProgress, { threshold: 0.5 });
    
    languageCards.forEach(card => {
        const progressBar = card.querySelector('.language-progress-bar');
        const width = progressBar.style.width;
        progressBar.style.width = '0';
        setTimeout(() => {
            languageObserver.observe(card);
        }, 500);
    });
});

// Adicionar estilos CSS dinâmicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
    }
    
    .back-to-top.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-counter {
        position: absolute;
        right: 0;
        top: -25px;
        font-size: 12px;
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .event-card {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-card, .event-card, .language-card, .about-card {
        transition: transform 0.3s ease;
    }
    
    .language-progress-bar {
        transition: width 1.5s ease-in-out;
    }
`;

document.head.appendChild(dynamicStyles);
