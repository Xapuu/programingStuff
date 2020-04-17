import { Pipe, PipeTransform } from '@angular/core';
import { languageData } from './language-singleton';
@Pipe({ name: 'xtr', pure: false })
export class XTranslatePipe implements PipeTransform {
    transform(translationId: string, interpolate?: string[]): string {
        return languageData.translate(translationId, interpolate);
    }
}
