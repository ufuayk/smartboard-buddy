const translations = {
    en: {
        'title': 'Smartboard Buddy',
        'subtitle': 'Your Smart Teaching Assistant',
        'timer': 'Timer',
        'notepad': 'Quick Notepad',
        'notepad-placeholder': 'Type your quick notes here...',
        'student-picker': 'Random Student Picker',
        'student-list-placeholder': 'Enter student names (one per line)',
        'pick-student': 'Pick a Student',
        'drawing-board': 'Drawing Board',
        'clear': 'Clear',
        'noise-meter': 'Noise Meter',
        'start-noise-meter': 'Start Noise Meter',
        'stop-noise-meter': 'Stop Noise Meter',
        'group-creator': 'Group Creator',
        'group-student-list-placeholder': 'Enter student names (one per line)',
        'create-groups': 'Create Groups',
        'noise-level-quiet': 'Quiet',
        'noise-level-moderate': 'Moderate',
        'noise-level-loud': 'Loud',
        'noise-level-very-loud': 'Very Loud',
        'credit': 'Made with ❤️ for teachers everywhere.',
        'by': 'Created by'
        
    },
    tr: {
        'title': 'Akıllı Tahta Yardımcısı',
        'subtitle': 'Akıllı Öğretmen Asistanınız',
        'timer': 'Zamanlayıcı',
        'notepad': 'Hızlı Not Defteri',
        'notepad-placeholder': 'Hızlı notlarınızı buraya yazın...',
        'student-picker': 'Rastgele Öğrenci Seçici',
        'student-list-placeholder': 'Öğrenci isimlerini girin (her satıra bir isim)',
        'pick-student': 'Öğrenci Seç',
        'drawing-board': 'Çizim Tahtası',
        'clear': 'Temizle',
        'noise-meter': 'Gürültü Ölçer',
        'start-noise-meter': 'Gürültü Ölçeri Başlat',
        'stop-noise-meter': 'Gürültü Ölçeri Durdur',
        'group-creator': 'Grup Oluşturucu',
        'group-student-list-placeholder': 'Öğrenci isimlerini girin (her satıra bir isim)',
        'create-groups': 'Grupları Oluştur',
        'noise-level-quiet': 'Sessiz',
        'noise-level-moderate': 'Normal',
        'noise-level-loud': 'Gürültülü',
        'noise-level-very-loud': 'Çok Gürültülü',
        'credit': 'Her yerdeki öğretmenler için ❤️ ile üretilmiştir.',
        'by': 'Tarafından oluşturuldu'
    },
    es: {
        'title': 'Compañero de Pizarra Inteligente',
        'subtitle': 'Tu Asistente de Enseñanza Inteligente',
        'timer': 'Temporizador',
        'notepad': 'Bloc de Notas Rápido',
        'notepad-placeholder': 'Escribe tus notas rápidas aquí...',
        'student-picker': 'Selector Aleatorio de Estudiantes',
        'student-list-placeholder': 'Introduce los nombres de los estudiantes (uno por línea)',
        'pick-student': 'Elegir un Estudiante',
        'drawing-board': 'Pizarra de Dibujo',
        'clear': 'Borrar',
        'noise-meter': 'Medidor de Ruido',
        'start-noise-meter': 'Iniciar Medidor de Ruido',
        'stop-noise-meter': 'Detener Medidor de Ruido',
        'group-creator': 'Creador de Grupos',
        'group-student-list-placeholder': 'Introduce los nombres de los estudiantes (uno por línea)',
        'create-groups': 'Crear Grupos',
        'noise-level-quiet': 'Silencio',
        'noise-level-moderate': 'Moderado',
        'noise-level-loud': 'Ruidoso',
        'noise-level-very-loud': 'Muy Ruidoso',
        'credit': 'Hecho con ❤️ para maestros en todas partes.',
        'by': 'Creado por'
    },
};

function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
        const key = element.getAttribute('data-lang-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
});