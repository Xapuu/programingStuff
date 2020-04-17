import { Injectable } from '@angular/core';
import { languageData } from './language-singleton';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
    languageChange$ = new Subject();

    get selectedLanguage() {
        return languageData.selectedLanguage;
    }

    setLanguage = (language) => {
        languageData.selectedLanguage = language;
        this.languageChange$.next();
    };

    translate = (translationId, interpolate?) => languageData.translate(translationId, interpolate);
}
