# Problem : Code Sharing Strategies in the context of FE apps

According to [DéjàVu: a map of code duplicates on GitHub][1] out of 428 million investigated files on github only 85 million are unique.

When working in a company consisting of  development teams, where new features are implemented on daily basis, there is high possibility, if you had not integrated some kind of code sharing system/process, that huge chunk of your development hours is rediscovering the wheel, that some of your colleagues had discovered last week, or maybe multiple people might be trying to solve the same task in parallel. 

If you are familiar with the code base of your neighbor teams, you might be able to `copy` => `paste` some code, which also does not solves the copying problem at all.

In long therm the differences that occur, will stack upon each other, which will lead to serious mismatches in the products delivered by the different teams, which often is not the desired result.

Overall those problems cost a lot of development hours for
 * Implementing same features in different projects
 * Fixing design mismatches across different projects
 * Applying design changes across different projects


# Check out this links :
https://hackernoon.com/5-practical-ways-to-share-code-from-npm-to-lerna-and-bit-732f2a4db512

https://blog.sindresorhus.com/small-focused-modules-9238d977a92a



# WTF should we do now
* The following examples are applicable in the context of separated FE and BE or repositories that hold both the FE and BE logic

## Git Submodules

Git submodules are native-git code sharing strategy which aim is to reuse code from another repository somewhere inside another repository, where the goal is to benefit from already written and central maintained code, without using the mentioned copy-paste strategy (which automatically will remove the benefit of using maintained code)

Pros
* Share code across git repositories
* Separate git history per submodule/repository

Pitfalls

* Every time you add a submodule, change its remote’s URL, or change the referenced commit for it, you demand a manual update by every collaborator.

* Forgetting this explicit update can result in silent regressions of the submodule’s referenced commit.
Commands such as status and diff display precious little info about submodules by default.

* Because lifecycles are separate, updating a submodule inside its container project requires two commits and two pushes.

* Submodule heads are generally detached, so any local update requires various preparatory actions to avoid creating a lost commit.

* Removing a submodule requires several commands and tweaks, some of which are manual and unassisted.


For the ones that want how to use git modules the right way check out [Mastering Git submodules][12] and [Git Submodules Pros and Cons][13] and [Git Tools - Submodules][14]

## Monorepo

"Monorepo" or "Molonolithic repository" is a software development strategy where multiple projects are stored in single repository. We can see implementations of this strategy in projects owned by Google, Facebook, Microsoft, Uber.

### Advantages

* Single source of true
   - As the name of the approach we are discussing suggest we are working with only one instance of the code, which makes the instance with which we are working the single source of true.
   - Also resolve the diamond dependency problem

* Ease of migration
   - As all the code lives in the same place, the transfer from one source control system to another is seamless process (Gitlab => Github) as we have to migrate just one single repository

* Ease of code reuse
  - As all the codes is stored in the same repository it's very easy to refer pieces of code belonging to one project in another

* Atomic commit possibility
  - As all of the code base is in one place it is seamless process to modify thousands of files in a single operation (single commit), for example changing class/function/method name

* Simplified dependency management

  - As mentioned all projects are in single repository and thanks to that it is possible to share single package json file and single `node_modules` folder, which is beneficial because this strategy resolves two trivial problems, which are turrning in non-trivial matter as the code base grows.
    
    - The size of the project locally hosted
    - Version management
     
* Collaborations across teams / Flexible code ownership

  - By choosing the "Monorepoic" path, all teams are enforced to collaborate with each other which indirectly improves the code quality and raises each individual (developer)  understandig of the system as whole. (The second part is very beneficial and often neglected when talking about big systems that depend on each other)

* Easier integration of tools
   
   - When working in single repository it's easier to integrate **the same tools** related to code linting, analysis etc. , which simplifies the introduction and implementation of common code conventions that improve the code quality
 
### Disadvantages
* Common git version history (if git is used)
    * As this strategy uses single repository, there is single git version, which means if git revert is necessary in order to fix introduced bug in a single project, you will revert the whole repository.
  
* Loss of version information (if git is used)
 
    * Tools that kind of fix this problem is [Lerna][2]
        *15488 stars on GitHub* and [Bit][3] *5721 stars on GitHub, paid tool*

* Tight coupling
  * The tight coupling is also disadvantage, because as metioned in monorepo we are aiming to reuse as much code as possible, which means that if we change a single method it will affects all method users across the project 
   
* Lock per-project security (if git is used)
  * When working in single repository, it's impossible to create permission based access to different sub projects

* Increased build complexity 
    * Tools like : Buck, Bazel, Pants or custom pipelines, need to be integrated 
* Limitations of source control systems when working with gigantic repositories **Non common cases!!**
    * Google uses [Piper][4]
    * Facebook made contributions to [Mercurial][5]
    * Microsoft made [VFS for Git][6] 
You can learn more about the performance issues in this article [15]

Overall this is approach where all projects **are** living in the same repository, code reusability happens seamlessly, dependency management is child's play, and unicorns take care of the code consistency and everything else.

The price for all those benefits is increased build complexity, source management and probably a living hell in the process of migrating your old projects in new `monorepo`, in case you want to adopt this strategy

# But isn't there anything out there already to help us

## nrwl to the rescue 

First thing first we are not talking about actual narwhals, that swim in the oceans, but about the Nrwl extensions for Angular also known as [**Nx**][12] and why we should keep an eye on them .

!!! Note: We are talking about the benefits of integrating nx in the context of angular applications with above average of size codebase.

### Why should we check out nrwl 

For those of you guys, that are angular driven beings the name [Victor Savkin][https://vsavkin.com/] is nothing new, he is ex-google angular team employee, while at google he created the angular dependency injection, change detection, forms and router module, he is also co-founder of nrwl, so thats why there are some takeaways from checking out nrwl even if we dont implement it in our projects.


## Nx

### What is Nx

`Nx` is set of angular @schematics, which provides the user with the opportunity to build nx-workspace, which is pretty much regular angular project, but on steroids (here we are talking about ng cli generate projects prior angular V6), as said it's just a set of @schematics extending the ones in the cli, which means it's still a normal angular project. As of ng cli V6 part of the nrwl provided functionality comes build in with the client. 
`Nx` also comes with `NgRx` which is library for data presistence and a set of binaries (cmd commands) for code formating and linting

### What architecure Nx suggests

The people from Nrwl had identified this problem that we are tackling here some time ago, and suggested a special kind of monorepo architecture, which follow some interesting code organization patterns. 

#### Nx explained Step by step

## **Step 1** installation

To be able to use the nx @scematics first we must install the [**ng-cli**][7] and their npm package holding the nrwl @schematics

```
npm install -g @angular/cli @nrwl/schematics
```

## **Step 2** generate project

The next step is to create our nx-workspace

```
create-nx-workspace ${your-workpsace-name}
```

As mentioned the nx is something like **superset** of the **ng-cli** so the process of generating new project is similar to the one when generating project with the cli, so there will be some questions asked along the way:
 * Style preprocesor - CSS/SCSS/SASS/LESS/Stylus
 * Workpsace scope 
   
    * This will be the name of the scpoe trough which you will be able to access the project, for example if the scope is `greatApp` you will be able to access the assets of the project trough `@greatApp/...`

* Type of project

  * Here you will be asked what kind of workspace you want to create : empty project/single angular application/ single react application/ web components application, we will go with empty
  * 
Let's look at would look like nx-workspace structure

```
<workspaceName>
  .git
  apps
  libs
  tools
    angular.json
    nx.json
    package.json
    README.md
    tsconfig.json
    tslint.json
    ...
```

Now let's decipher the workspace structure

The two most important things in the structe are the **apps** and **libs** folders

## apps

As the name suggest the apps folder holds multiple apps, where an app should be the minimal amount of code required to package libs to create a deployable bundle (artifact) eg a stand alone app.

## libs

In the libs folder we hold all of our libs where **lib** is set of files consumed by apps, they are similar to `node_modules`, they are bundled in the artifact, that we mentioned, or can be deployed on the `npm` for whatever purpouse. Their used in order to partion our code in smaller units, of easily reusable and maintainable blocks.

Acoording to **nrwl** recommendentions there should be 4 library types in nx-workspace are : feature, data-access, ui, and util.
 
 * Feature libraries - library in which a whole feature is implemented, for example a feature might be a cart logic (in the context of shop applications) where you have the same shopping cart in multiple applications
 * Ui libraries - library that holds only presentational components, for example a button componet
 * Data-access libraries - library that holds services, utilities, also state management services
 * Utility libraries - as the name suggests this is a library that holds utility functions services etc.

In some of nrwl whitepapers papers there are also some suggestions for holding the back-end application logic in the same repository in order to further optimize the code reusability, but this strategies won't be further examined here.

## Step 3 adding projects

### Add app

```
ng g app myapp
ng generate app myapp # same thing
ng generate application myapp # same thing
```

Here you will be walked trough another set of configurations
 * Select type of app Angular/React/Web component app
 * Select sub-directory if desired (inside the apps directory)
 * Unit Test runner Karma/Jest
 * E2E test runner Cypress/Protractor
 * Select tag (linting purpouses)

    * Note you can add more configuration to the creation process 

By default this command will generate two projects, just as the stock cli would do one project for the application and one for the E2E.

## Add lib

```
ng generate lib mylib
ng generate library mylib # same thing
```

Here you will be walked trough another set of configurations
 * Select sub-directory if desired (inside the libs directory)
 * Select type of lib Angular/React/Typescript
 * Select tag (linting purpouses)
 * Unit Test runner Karma/Jest

## Step 4 use the lib

Import your lib in your app and start using it :)

# Overall

`Nx` right is set of @schematics plus tooling that helps implementing an angular monorepo, that has all previously mentioned monorepo benefits, but with fewer disadvantages.

* There is no 'Increased build complexity' as everything you will ever need comes build in


# But lets say we can't do that, what else is left

## NPM libraries

The npm libraries are basicity a way of code sharing in the **js** ecosystem, which purpose is to tackle common problems, without the need of reinventing solutions, that already exist.

So basically by creating and sharing one, we can tackle common problems across all our projects by implementing it just once.

### Advantages
* Easy usage
* Avoid unnecessary development effort
* It can be used as single source of true, for the `right` code implementation across multiple applications
* Loose coupling from rest of the projects in the company
* Fix a bug once, fix it everywhere
* Possibility to have multiple versions

### Disadvantages
* Another repository that must be maintained
* Delays when multiple teams depend on new features from future releases 
* Introduce one bug, effect all involved systems
* Building adequate library usually takes a lot of effort, **or does it**

<!-- Can link it to git repo directly
Can use [sinopia](https://github.com/rlidwka/sinopia) local npm server
As we are living in a world where the heaviest thing in the world is the [**npm registry**](https://www.npmjs.com) no one will mind if we add some load to it. -->
## ngCLI to the rescue

As of version 6+ [**ng cli**][7] provides out of the box, the opportunity to create **Angular** libraries via the [**ng-packagr**][8] library. Basically [**ng-packagr**][8] is tool for creating node modules following the [**Angular Package Format**][9]. Without getting in too much details, this means that we will have an easy way to build and bundle production ready [libraries][10] just with few commands. 


## Library


### Do I need to build library, check whats true for your projects
 
- [ ] I have a similar design that i have to implement across multiple projects
- [ ] I have a the same logic (schematics, services, directives, .etc) across multiple projects 
- [ ] There are enough similarities in volume, so that it is worth to create common library 

If you had checked the above boxes, lets go to the code

## Step by Step guide

### 1 Install the ngCli

If you dont already have the cli installed run the following commands

```
npm install -g @angular/cli
```

### 2 Generate new empty project

As of version 6+ [**ng cli**][7], angular provides support for multiple project in one angular workspace, so in our case we will first generate an empty angular workspace, than we will generating two projects, one that will hold our library and one which we will use to visualize what we've build.

```
ng new <workspaceName> --createApplication=false
```

This will generate an empty angular workspace, after that we without leaving the terminal, we can continue

```
cd <workspaceName>

ng g library <libraryName> --prefix=<customPrefix> --style=scss --viewEncapsulation=none

ng g application <applicationName> --style=scss
```

At this point our workpspace folder structure should look like

```
<workspaceName>
    node_modules
    projects
         <libraryName>
         <applicationyName>
         <applicationyName>-e2e
    .editconfig
    .gitignore
    angular.json
    package.json
    package-lock.json
    README.md
    tsconfig.josn
    tslint.json
```

Lets break down what all those commands mean and why we are using them. First the `ng g library` is the way for generating a library trough [**ng-packagr**][8] , that we mentioned earlier, after that we are passing the `-style=scss` so that we can generate customislabel styles easier later on in our library, the `-viewEncapsulation=none` is used to enable other users to have some access over our components, so that they can modify them if needed, this is not mandatory thing but people will treat you a beer later on if you do this.

The other command that we are using `ng g application` is used in order to create another project in our workspace, in which we will develop our components, and can use as app for writing some documentation, that will be easily accessible for the people that will use our code, without the need of digging in the source.

### 3 Import and use the library

```
...
import { CommonLibraryModule } from 'common-library';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    CommonLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Build the library with

```
ng build <libraryName>

```

And now you can use all the content in your library as you please

 These libraries can be used locally in your workspace, or you can publish them as npm packages to share with other projects or other Angular developers. These packages can be published to the npm registry, a private npm Enterprise registry, or a private package management system that supports npm packages.


# Extras

## Tips on library

### Structure

As I already mentioned the Angular and ngPackagr team have taken care of all the trouble around creating a stable pipeline that will bundle and make our code npm ready, but still there are things that can go wrong and make our library unmaintainable, unreliable or even hated. 
As developers we aim to do our best, to code clean, reliable and reusable code and so on, but sometime even with the best intentions we fail to achieve our goal, often times because of minor mistakes, made form the beginning, that at some point turn in hardly repayable/unrepayable technical debt.

Let's look at few details that can be easily messed up.

 * Documentation

The most common case when working with libraries is that the everyday library users, are not the one who created it, or even if they are part of the core team, it's almost 100% sure that they did not implemented everything on their on, which in a way makes them ordinary library users, when using the library. So the point here is write docs, even if the quality is not top notch write them anyway and include examples. Even if there is no doc building pipeline write docs and comment your code in order to prolong the live your library and reduce feature maintenance costs 

 * Tests

For the same reason as the documentation
        ** Quote from someone "Better to have bad tests than none"

 * Providing your app library in non lazy manner 

  
It's highly possible that the users of your library won't need the whole library content, so it's desireable to spilt your code in appropriate modules, that can be loaded on demand and are logically independent. 
```
For example if you have `LayoutModule` that holds both your Navbar and Sidebar related elements elements, it makes no sense for the user to import the code for both elements if he/she uses just the sidebar or the navbar of your library. 
```

** Keep in mind that over separating your application also might have negative effects, in the form of making the usage of your library overcomplicated and anti intuitive.


 * Dependencies versions (There is risk to have multiple versions of the same libraries, for example different version of angular in your library app and in your primary app)
    
        
```
For example there is possibility to have different versions of angular for your library and the project where you use it.
```

 * Naming and prefixes

Add prefix to all your classes. As we mentioned and saw earlier the ngLibrary is just bundled set of ngModules, that will be imported in other projects in order to be used there, which means that the components that are shared from the library module will share the namespace of the project where imported, for example if we have component called `Table` in our library and in the project where our library is imported, we will get beautiful error message, reminding us that our class names must be unique (might do demo), which is pretty inconvenient for the library users, because in this case they will have the responsibility to rename their `Table` component to something else (assuming that we dont have direct access to the library, or do other workaround)

 * [View encapsulation][11]

Angular components have the option to define their view encapsulation, or in other words that defines the way they interaction with  the application styles.

The default behavior of the angular components is for them to use the `Emulated` view encapsulation, which while processing our code will generate css class-based scope, which will protect our components from outside of the component style manipulations. 
As we know this is one of the most important features of modern front-end frameworks, because it takes care of the responsibility to manage on our own our css class names, which as the project grows can be quite difficult.
Against the angular developer common sense, when building component based library we go against the rules, and it's kind of preferable to use `None` encapsulation, which means that there will be no component-based style protection over the html in our component. You might ask why would one want to this, actually there are 2 reasons:
 ** First by doing so you enable the users of your library to have some freedom over what the component would look like in their application, which is not always bad.  

 ** Second by doing so (and with some basic sass knowledge) you are enabling yourself to create straight forward and robust way of theming your application. 

# Demo


## So many options but what is the best decision

So as we have already seen so far there multiple options when choosing code sharing strageies, (there some more which were not discussed) so far and each one is related to major from architecture point of view decision.

If we are going for custom momorepo solution, we are granted the absolute freedom to do whatever we want, and satisfy all our requirements in custom way. The negative side effect is that we must implement everything from zero (building processes, testing processes and so), by doing so we are risking to create unmaintainable codebase, because we unintenotaly missed some best practice, which might lead to multiple rewrities of our code base which will lead to countless of lost development ours.

If we are going for the `Nx` strategy and follow their guidelines when building an nx project we are limiting the chances of creating an unmaintable code base, we reduce the configuration part (build, test etc).

If we go for the npm strategy, we risk that there might be some delays in the development process and we won't  be able to use all of the code reusage benefits of the previous approches , but this strategy allows looser coupling and easier to track code ownership plus much better version controls.

So my advice is if you are working in enviorment where the code quality and testing is the top priority instead the introduction of new functionalities, go for custom monorepo or try `Nx`, which is really great tool.

Otherwise the best solution is the creation of separate `npm` packages, as you can always fall back to working version, you can manage the scope of permissions per project and lastly but not least the code ownership is much easier to be tracked. 

<!-- # Links / Sources-->
 [Why Google Stores Billions of Lines of Code in a Single Repository][999999]

[999999]:http://delivery.acm.org/10.1145/2860000/2854146/p78-potvin.pdf?ip=213.214.74.127&id=2854146&acc=OA&key=4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E5945DC2EABF3343C&__acm__=1556711275_b8463755a59162a911f853d20d9ae0a6


[1]: https://dl.acm.org/citation.cfm?id=3133908&picked=formats
[2]:https://lernajs.io/
[3]:https://bitsrc.io/
[4]:https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext
[5]:https://code.fb.com/core-data/scaling-mercurial-at-facebook/
[6]:https://vfsforgit.org/
[7]:https://cli.angular.io/
[8]:https://github.com/ng-packagr/ng-packagr
[9]: https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview
[10]:https://angular.io/guide/libraries
[11]:https://angular.io/guide/component-styles#view-encapsulation
[12]: https://medium.com/@porteneuve/mastering-git-submodules-34c65e940407
[13]:http://jr0cket.co.uk/2014/05/git-submodules-pros-and-cons.html
[14]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
[15]: https://bitbucket.org/blog/monorepos-in-git?_ga=2.184294502.155973345.1556708288-1389070012.1556708288