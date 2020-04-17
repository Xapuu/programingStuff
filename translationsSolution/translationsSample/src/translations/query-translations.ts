const fs = require('fs');
const path = require('path');
const currentTranslations = require('./translations.json');
const keys = new Set();

const parseTranslations = (startPath, selector = 'xtr') => {
    const currentLevelFiles = fs.readdirSync(startPath);
    currentLevelFiles.forEach(file => {
        const currentFilePath = path.join(startPath, file);
        const stats = fs.statSync(currentFilePath);

        if (stats.isFile()) {
            const matchedFile = fs.readFileSync(currentFilePath, 'utf8');
            const regex = new RegExp(`'(${selector}-.+?)'`, 'gmi');

            let match = regex.exec(matchedFile);
            while (match) {
                keys.add(match[1]);
                match = regex.exec(matchedFile);
            }
        }

        if (stats.isDirectory()) {
            parseTranslations(currentFilePath, selector);
        }
    });
};

parseTranslations('../', 'xtr');

const supportedLanguages = ['EN', 'BG', 'JPN', 'MISS'];
keys.forEach((translationKey) => {
    if (!currentTranslations[translationKey]) {
        currentTranslations[translationKey] = {};
    }
    currentTranslations[translationKey] = supportedLanguages.reduce((acc, abr) => {
        acc[abr] = currentTranslations[translationKey][abr] ?
            currentTranslations[translationKey][abr]
            : 'Need translation';
        return acc;
    }, {});
});

fs.writeFileSync('./translations.json', JSON.stringify(currentTranslations, null, 4));
