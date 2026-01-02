// Language Switcher for IRA Auto Services Limited (English/Swahili)

const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.brands': 'Brands',
        'nav.services': 'Services',
        'nav.packages': 'Packages',
        'nav.locations': 'Locations',
        'nav.careers': 'Careers',
        'nav.offers': 'Offers',
        'nav.products': 'Products',
        'nav.contact': 'Contact Us',
        
        // Hero
        'hero.title': 'Welcome to IRA Auto Services',
        'hero.subtitle': 'THE AUTOMOBILES SERVICES YOU CAN TRUST',
        'hero.description': 'Founded over five years ago, we combine decades of expertise with innovative solutions to deliver superior car care and spare part services across Tanzania.',
        'hero.cta': 'Get a Quote',
        
        // Services
        'services.title': 'A Complete Range of CAR Services',
        'services.subtitle': 'We provide a complete spectrum of end-to-end Auto repair services and solutions',
        
        // Stats
        'stats.vehicles': 'Vehicles Serviced',
        'stats.bays': 'Working Bays',
        'stats.parking': 'Parking Bays',
        'stats.reviews': '5-Star Reviews',
        
        // Trust
        'trust.rating': 'Ministry Rating 5-Star',
        'trust.experience': '30+ Years of Expertise',
        'trust.quality': 'High Quality, Affordable Prices',
        
        // Footer
        'footer.quick': 'Quick Links',
        'footer.contact': 'Contact Us',
        'footer.rights': 'All Rights Reserved',
        
        // Booking
        'booking.title': 'Book an Appointment',
        'booking.name': 'Your Name',
        'booking.email': 'Email Address',
        'booking.phone': 'Phone Number',
        'booking.service': 'Choose Service',
        'booking.location': 'Choose Location',
        'booking.date': 'Choose Date',
        'booking.time': 'Choose Time',
        'booking.submit': 'Submit Booking',
        'booking.close': 'Close'
    },
    sw: {
        // Navigation
        'nav.home': 'Nyumbani',
        'nav.about': 'Kuhusu Sisi',
        'nav.brands': 'Chapa',
        'nav.services': 'Huduma',
        'nav.packages': 'Vifurushi',
        'nav.locations': 'Maeneo',
        'nav.careers': 'Kazi',
        'nav.offers': 'Matoleo',
        'nav.products': 'Bidhaa',
        'nav.contact': 'Wasiliana Nasi',
        'nav.book': 'Panga Miadi',
        
        // Hero
        'hero.title': 'Karibu IRA Auto Services',
        'hero.subtitle': 'Mtandao wa Huduma za Gari Unaaminika Zaidi Tanzania',
        'hero.description': 'Hakuna mtu anayejua utunzaji wa gari kama sisi. Tumehudumia magari zaidi ya milioni 2 tangu kuanza.',
        'hero.cta': 'Pata Bei',
        
        // Services
        'services.title': 'Aina Kamili za Huduma za GARI',
        'services.subtitle': 'Tunatoa aina kamili za huduma za ukarabati wa magari na suluhisho',
        
        // Stats
        'stats.vehicles': 'Magari Yaliyohudumiwa',
        'stats.bays': 'Maeneo ya Kazi',
        'stats.parking': 'Maeneo ya Kuegesha',
        'stats.reviews': 'Tathmini za Nyota 5',
        
        // Trust
        'trust.rating': 'Tathmini ya Wizara Nyota 5',
        'trust.experience': 'Uzoefu wa Zaidi ya Miaka 30',
        'trust.quality': 'Ubora wa Juu, Bei Nafuu',
        
        // Footer
        'footer.quick': 'Viungo vya Haraka',
        'footer.contact': 'Wasiliana Nasi',
        'footer.rights': 'Haki Zote Zimehifadhiwa',
        
        // Booking
        'booking.title': 'Panga Miadi',
        'booking.name': 'Jina Lako',
        'booking.email': 'Anwani ya Barua Pepe',
        'booking.phone': 'Nambari ya Simu',
        'booking.service': 'Chagua Huduma',
        'booking.location': 'Chagua Eneo',
        'booking.date': 'Chagua Tarehe',
        'booking.time': 'Chagua Muda',
        'booking.submit': 'Wasilisha Ombi',
        'booking.close': 'Funga'
    }
};

let currentLanguage = localStorage.getItem('ira-language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('ira-language', lang);
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update language switcher buttons
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLanguage);
    
    // Add click handlers to language switcher buttons
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

// Export for use in other scripts
window.setLanguage = setLanguage;
window.getCurrentLanguage = () => currentLanguage;
window.t = (key) => translations[currentLanguage]?.[key] || key;

