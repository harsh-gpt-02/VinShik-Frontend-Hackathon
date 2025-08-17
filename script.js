        document.addEventListener('DOMContentLoaded', function() {
            // Initialize map
            const map = L.map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add sample markers
            const markers = [
                { lat: 51.5, lng: -0.09, title: 'Acme Corporation', job: 'Website Redesign' },
                { lat: 51.51, lng: -0.1, title: 'Globex Inc.', job: 'Mobile App' },
                { lat: 51.49, lng: -0.08, title: 'Initech', job: 'SEO Optimization' },
                { lat: 51.52, lng: -0.11, title: 'Umbrella Corp', job: 'E-commerce' }
            ];

            markers.forEach(marker => {
                L.marker([marker.lat, marker.lng])
                    .addTo(map)
                    .bindPopup(`<b>${marker.title}</b><br>${marker.job}`);
            });

            // Toggle sidebar on mobile
            const menuToggle = document.getElementById('menuToggle');
            const sidebar = document.getElementById('sidebar');
            
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });

            // Page navigation
            const navItems = document.querySelectorAll('.nav-item');
            const pages = document.querySelectorAll('.page-content');

            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    const pageId = this.getAttribute('data-page');
                    
                    // Update active nav item
                    navItems.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show selected page
                    pages.forEach(page => page.classList.remove('active'));
                    document.getElementById(`${pageId}-page`).classList.add('active');
                    
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 992) {
                        sidebar.classList.remove('active');
                    }

                    // Resize map when it becomes visible
                    if (pageId === 'map') {
                        setTimeout(() => {
                            map.invalidateSize();
                        }, 300);
                    }
                });
            });

            // Add ripple effect to cards
            const cards = document.querySelectorAll('.card, .service-card');
            cards.forEach(card => {
                card.addEventListener('click', function(e) {
                    const x = e.clientX - e.target.getBoundingClientRect().left;
                    const y = e.clientY - e.target.getBoundingClientRect().top;
                    
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 1000);
                });
            });

            // Add style for ripple effect
            const style = document.createElement('style');
            style.innerHTML = `
                .ripple {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    width: 10px;
                    height: 10px;
                    background: rgba(108, 92, 231, 0.3);
                    border-radius: 50%;
                    animation: rippleEffect 1s ease-out;
                    pointer-events: none;
                }
                
                @keyframes rippleEffect {
                    from {
                        width: 10px;
                        height: 10px;
                        opacity: 1;
                    }
                    to {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        });

        // Make the dashboard more dynamic with random data updates
        setInterval(() => {
            const changes = document.querySelectorAll('.card-change');
            changes.forEach(change => {
                // Randomly toggle between positive and negative
                if (Math.random() > 0.5) {
                    change.classList.remove('negative', 'neutral');
                    change.classList.add('positive');
                    change.innerHTML = `<i class="fas fa-arrow-up"></i> +${(Math.random() * 20 + 1).toFixed(1)}%`;
                } else {
                    change.classList.remove('positive', 'neutral');
                    change.classList.add('negative');
                    change.innerHTML = `<i class="fas fa-arrow-down"></i> -${(Math.random() * 15 + 1).toFixed(1)}%`;
                }
            });
        }, 5000);