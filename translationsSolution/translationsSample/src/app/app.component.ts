import { Component } from '@angular/core';
import { TranslationService } from 'src/translations/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translationService: TranslationService) { }
  setLanguage(languageCode) {
    this.translationService.setLanguage(languageCode);
  }
}
