# Simple Translations with Angular && Node

# What is the challenges

Every application at a certain point ends up in a need of some kind of translation functionality and the implementation of such usually is a drag. One of the main reasons for this to be such a painful process some times is because the complexity of this feature is usually underestimated in the design phase, which may lead to multiple re-writes of the whole translation logic, or cause a situation where the developers are stuck with something hardly usable because there is just no free time to improve/re-write something that kind of work.
Of course, there many more challenges that occur especially if we are talking about translations management for mid-size or big applications, but these problems are usually communication or internal process-related and we won't focus on them.

-- Keep in mind while reading this article that we are looking for a simple solution that is usable and makes sense for small to mid-size apps

# What is already on the market

As a self-respecting developers the first thing that we are going to do when we receive such a task is to google-it and as expected there are already solutions for our problems.

 ## Angular i18n

The thing that we all love about Angular is that it is a framework, and inside of it there is a solution for every problem. The straight out of the docs Angular solution is the usage of the so-called i18n tooling. This tooling allows us to embed and extract translation-related information from our HTML templates with the help of directives and scripts. The extracted data comes usually in `.xlf` files, thanks to the angular tooling we can merge those `.xlf` files, we can find if there are any new translations or remove unused translations and so on.


i18n in action

```html
<h1 i18n="site header|An introduction header for this sample@@introductionHeader">Hello i18n!</h1>
```

which will produce

```xml
<trans-unit id="introductionHeader" datatype="html">
  <source>Hello i18n!</source>
  <note priority="1" from="description">An introduction header for this sample</note>
  <note priority="1" from="meaning">site header</note>
</trans-unit>
```

This snippets above show the standard usage and output of `i18n`, usually, the source value is in the base language, which is also used as a fallback value, in the cases where the translation is missing.

```xml
<trans-unit id="introductionHeader" datatype="html">
  <source>Hello i18n!</source>
  <target>Bonjour i18n !</target>
  <note priority="1" from="description">An introduction header for this sample</note>
  <note priority="1" from="meaning">site header</note>
</trans-unit>
```

After you receive the translated files you have to build one application package for each supported language and just serve them, the reason for that is because angular embeds the translated files (in other words the translations are happening compile time not on the user machine) and removes the excessive translation meta (the i18n translation related information), thanks to those two action we get probably the most preferment translation solution for angular.



| <span style='color:green'>Pros</span> | <span style="color:red">Cons</span>           |
|---------------------------------------|-----------------------------------------------|
| Fast                                  | Hard to reason at first                       |
| Small bundles                         | Multiple applications for different languages |
| Angular native                        | No .ts extraction                             |

 ## ngx-translate

 The other popular solution out there is the `ngx-translate` library, which exposes a convenient pipe named : `translate` and service named : `TranslateService` trough which we can translate dynamically our pages. 
 Just like angular's i18n solution `ngx-translate` provides a full set of tooling trough additional utility packages: `ngx-translate/http-loader` and `ngx-translate-extract`, which as the names suggest help us fetch our translations or help us in the process of extraction and management of our translation. 
 A thing to be noted here is that `ngx-translate` uses `json` files instead `.xlf` files, anyway if you have already translations in '.xlf' format there are tools for converting 'xlf' in 'json'.

After configuring the library the usage is pretty simple

```html
<div>{{ 'HELLO' | translate }}</div>
```

```ts
...
constructor(translate: TranslateService) {
translate.get('HELLO').subscribe((res: string) => {
    console.log(res);
    //=> 'hello' where hello is tha translation behind the key `HELLO`
});
}
...
```

| <span style='color:green'>Pros</span> | <span style="color:red">Cons</span>        |
|---------------------------------------|--------------------------------------------|
| Easy to use                           | Slower compared to the i18n implementation |
| Dynamic imports/translations          | Third party library                        |
| .ts extraction                        |                                            |

 Keep in mind 'slower' doesn't mean slow, so in a environment with normal connection speed and on pretty much most of the machines used today the end-users will not find any speed difference when using `ngx-translate` compared to the `i18n`


  ## i18n + ngx-translate

There is also the possibility to use both strategies together, by doing so you can add the extraction of translations from `.ts` and the dynamic translations of values when needed, but definitely that is not a way that i will suggest you to go :)


| <span style='color:green'>Pros</span> | <span style="color:red">Cons</span>           |
|---------------------------------------|-----------------------------------------------|
| Fast                                  | Harder to reason at first                     |
| Small bundles                         | Multiple applications for different languages |
| Mostly Angular native                 | Third party library                           |


# What are we going to build

So if you had never dealt with translation in the context of Angular, you just had a brief introduction of the current translation solutions out there, but probably by now, you are already asking yourself "WTF where is the 'Simple Translations with Angular && Node' part?", don't worry we've just reached that point.

Before we start with the code, let's define the MVP for a translation functionality to be usable and useful

## Translation requirements MVP
  - [ ] Easy way to define/extract keys 
    - [ ] From template
    - [ ] From js/ts
  - [ ] Way to translate keys
  - [ ] Way to interpolate translations
  - [ ] Way to export the translations for the translators


By going through the requirements you are probably thinking why we just don't go with one of the solutions that are already out there? The answer is pretty simple most of the apps just don't need all that complexity that comes with solutions like `i18n` and most of the functionality that you are going to use can be written in under 100 lines of code anyway. Don't get me wrong both `ngx-translate` and `i18n` solutions are great and provide a lot of useful functionalities, which we will probably be never used in most of the applications if you don't believe let me show you the code.

```ts
const fs = require('fs');
const path = require('path');
const currentTranslations = require('./translations.json'); // More about this import in the second snippet
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
// continues in the next snippet
```

Here we have quite a simple function that based on a starting path will query all subdirectories and read trough all files querying for specific strings, in our case a string inside of single quotes starting with `xtr-`, also while querying the files this function will also save all found keys in the `keys` set. The important part here is that we want to use only `Sync` methods because we want to parse all files before continuing with the next piece of code.


```ts
const fs = require('fs');
const path = require('path');
const currentTranslations = require('./translations.json');
const keys = new Set();
...

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

```
In this snippet, we are defining the supported languages which will be supported by us, based on them, on the queried keys and on the `currentTranslations` (this is a `JSON` file containing ant previous translations, initially it should be empty `{}`). While filling the `currentTranslations` object with the newfound keys, we are adding the keyword 'Need translation' which will be the flag for the translators that something should be added there. After we are done with the whole parsing process we just write the result file.

An example output of this function inside the `./translation.json` will look like so:

```JSON
{
  "xtr-{your-string-id}": {
      "EN": "Need translation",
      "BG": "Need translation",
      "JPN": "Need translation",
      "MISS": "Need translation"
  }
}
```
** Side note if you are using `typescript` you must add the following configurations in your `ts.config` in order to read directly `JSON` files in `.ts` files
```
 "compilerOptions": {
    ...
    "resolveJsonModule": true,
    "esModuleInterop": true
  },
```

We are done with the parsing part, now for the sake of simplicity I will create a separate function that will be dealing with the whole translation logic (or in other words, we will still beframework agnostic)

```ts
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

```

So lets see what's going on here, pretty much we defining our default language if none is set, we are exposing to the outside world a `translate` function that will take care for mapping keys to our translation object and if necessary will interpolate some values inside those translations. Here we are free to implement interpolation in whatever way we want (nothing too fancy in the example). And the last thing that we are exposing to the world is the option to change the currently selected language.

From this point on we are switching to some Angular code. The two things that we will need are a pipe so that we can directly translate stuff in the templates and a service, for the cases where we wont to access the translation function inside out `.ts` files or when we want to change the current language.

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { languageData } from './languageData';
@Pipe({ name: 'xtr', pure: false })
export class XTranslatePipe implements PipeTransform {
    transform(translationId: string, interpolate?: string[]): string {
        return languageData.translate(translationId, interpolate);
    }
}
```
The important thing to notice here is the `pure` configuration, by setting it the `false` whenever a change detection is triggered the `pipe` will be re-evaluated which will lead to showing the translated text in the newly selected language, otherwise the `transform` function won't be triggered by `ChangeDetection` events


```ts
import { Injectable } from '@angular/core';
import { languageData } from './language-singleton';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
    languageChange$ = new Subject();

    setLanguage = (language) => {
        languageData.selectedLanguage = language;
        this.languageChange$.next();
    };

    translate = (translationId, interpolate?) => languageData.translate(translationId, interpolate);
}
```

The service is even simpler, we can see again the `translate` method which just gives access to our `languageData` function. A useful thing that can be added `setLanguage` beside accessing the `languageData` is notifying the application in some way that there was a change language event, in this example this notification can happen trough the `languageChanges$` subject.


# Summary 

So we fulfilled the MVP requirements that we set, with around 100 lines of code we solved our problem without adding too much complexity to our application, also if we put some more imagination in our current translation implementation, we can see that it can be easily tweaked in such manner that it can work with any other js based framework.
The main takeaway should be that depending on the use-case sometimes it's possible to keep things simple and if it possible we should do it.