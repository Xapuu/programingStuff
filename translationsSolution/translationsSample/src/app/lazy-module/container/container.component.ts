import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from 'src/translations/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  /** 
   * The following strings in the comments will be added to the list for translations
   * 'xtr-orange'
   * 'xtr-red'
   * 'xtr-green'
   */

  colors = ['orange', 'red', 'green'];
  translatedColors = this.colors.map(color => this.translationService.translate('xtr-' + color));
  subRef: Subscription;
  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.subRef = this.translationService.languageChange$.subscribe(() => {
      this.translatedColors = this.colors.map(color => this.translationService.translate('xtr-' + color));
    });
  }

  ngOnDestroy() {
    this.subRef.unsubscribe();
  }

}
