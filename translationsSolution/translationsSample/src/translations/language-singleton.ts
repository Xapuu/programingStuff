import translations from './translations.json';

export const languageData = (() => {
    const defaultLanguage = 'EN';

    let _selectedLanguage;

    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', JSON.stringify(defaultLanguage));
    }

    _selectedLanguage = JSON.parse(localStorage.getItem('language'));

    const translate = (translationId: string, interpolate?: string[]) => {
        let translation = translations[translationId][languageData.selectedLanguage];

        if (!translation || translation === "Need translation") {
            translation = translations[translationId][defaultLanguage];
        }

        if (interpolate) {
            interpolate.forEach((val, i) => {
                const rgx = new RegExp(`-${i}-`, 'g');
                translation = translation.replace(rgx, val);
            });
        }
        return translation;
    };

    return {
        get selectedLanguage() {
            return _selectedLanguage;
        },
        set selectedLanguage(language) {
            localStorage.setItem('language', JSON.stringify(language));
            _selectedLanguage = language;
        },
        translate
    };
})();
