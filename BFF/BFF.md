
OSFA - one size fits them all


## ACT Intro - 3 min
### BFF new BFF for your FE team 

Overview of the BFF solutions and how they can help you boost up your app performance, speed up your development processes, or help you in your next back-end migration
## ACT II Target + History recap- 3 min


!! Disclaimer = GraphQL doesn't exist

My goal for this talk is not only to learn few new catchy words, with which we can sound smart in round-tables and stuff, but also to understand what was the need for defining the pattern that we are going to discuss today, so that next time we see the management we can convince them why we should adopt some new thing that we learned for the last JSTalks

In order to understand the need of this technique we will have a quick recap about the history of software and where it lives.

(Show slide with old PC and terminal program running) // On old machines locally
(Show slide with old PC and some kind of program with UI) // On newer machines in the web
(Show slide with lot of devices) // Everywhere

Era of desktop | Local | Prior 2000
Era of web | REST | 2000 - 2010
Era of mobile | Beyond | 2010 + 

-- as seen https://samnewman.io/patterns/architectural/bff/
With the advent and success of the web, the de facto way of delivering user interfaces has shifted from thick-client applications to interfaces delivered via the web, a trend that has also enabled the growth of SAAS-based solutions in general. The benefits of delivering a user interface over the web were huge - primarily as the cost of releasing new functionality was significantly reduced as the cost of client-side installs was (in most cases) eliminated altogether.

This simpler world didn't last long though, as the age of the mobile followed shortly afterwards. Now we had a problem. We had server-side functionality which we wanted to expose both via our desktop web UI, and via one or more mobile UIs. With a system that had initially been developed with a desktop-web UI in mind, we often faced a problem in accommodating these new types of user interface, often as we already had a tight coupling between the desktop web UI and our backed services.


## ACT III Classic BFF - 5 min

So in 2012 the article "Why REST Keeps Me Up At Night" by Daniel Jacobs(@daniel_jacobs) director of engineering of the NETFLIX API went out on the surface. In summary this is an article describing the current state of the NETFLIX API-s. So what were they doing, they had on One Size Fits Them All (OSFA) rest solution, where they had one huge GENERAL API, that served all interested consumers.

(FE + GENERAL API diagram)
-- Add auth header + Some geo data in the FE headers 

As seen on the diagram, this is pretty common case and some of you can probably recognize your own architecture in this diagram. So what we have here, multiple FE application consuming whatever they may need from this general API. This is pretty straightforward approach used by a lot of companies, where behind this general API you may have single monolith or fleet of microservice or whatever, but in the end you have single entry point for all your data.

And this approach by itself is good, there is huge community support, a lot of papers on the topic how to write REST APIs, those API-s are excellent at handling requests in a generic way, establishing a set of rules that allow a large number of known and unknown developers to easily consume the services that the API offers.


But the findings that NETFLIX made by inspecting their architecture, is that they actually know what their consumers are, in their case at that time they had over 800 types of devices and they made the following observation

* Different devices may have different memory capacity
* Some devices may require a unique or proprietary format or delivery method
* Some devices may perform better with a flatter or more hierarchical document model
* Different devices have different screen real estate sizes which may impact which data elements are needed
* Some devices may perform better having bits streamed across HTTP rather than delivered as a complete document
* Different devices allow for different user interaction models, which could influence the metadata fields, delivery method, interaction model, etc.

The conclusion to which the NETFLIX team reached was, that probably different devices have different needs in order to work optimal, or in other words they needed custom tailored data sources, provided in custom way.

If we have to give a real-life example, we can imagine that we are at a restaurant and the waiter is the GENERAL API, if i order '/meal' i will get 
{
    salad: "Shopska",
    meal: "Steak",
    desert: "Cake" 
}
and as i eat all type of food i would all of it, but if someone is vegeterian for example, if he/she calls/orders the same API they will have to throw the "Steak" which is 1/3 of the response, so i guess the issue here kind of get obvious.


So an example in terms of code will be for example something like this

(Diagram of Android phone and Iphone and Web)

So here we can have different BFF layers for each different platform. So what is the reason to make such separation, the answer is quite simple, just as described in the previous example
different devices have different needs, for example if we are talking about some kind of blog, probably on desktop you would like to load 20 articles, that contain the name of the articles + first 100 words from the article, while on mobile you will want to load just 10 articles and the first 10 words, because the technical limitation of the small screen doesn't allow us to preview more text.

So this is an example of the classic BFF, where different BFF-s are made for each platform


## Experience Based BFF-s

So let's say you are already hyped about the BFF-s but you are concerned that there will be too much code duplication and your development process will be slowed down considerably, so what now.

(Diagram of Android Phone, Iphone, TV, Web)
-- 4 BFFs
(Diagram of Android Phone, Iphone, TV, Web)
-- 3 BFFs (merge Android And Iphone)

So based on the diagram above we may do the following assumption, that both Iphone and Android phone, can work in optimal way while using the same API, so we can directly merge both of those BFF-s into a single one, again it depends on the needs of devices


(CRM, ORDERS)
-- Few web apps, different BFF-s

The experience based BFF-s, can also split based on application requirements, for example different apps need different slice of the GENERAL API response. ..

So those are the BFF-s that i call classic on a high level

Now is the time for me to convince you about the 3 improvements that you can achieve by using the BFF solutions

(list of all 3 points)
## app performance
## speed up your development processes
## tool for migration

## Performance

So it is already obvious that if we have custom tailored responses from our API-s we will reduce the total traffic, as we will be sending only tata that will be actually consumed, but that is not all lets see what else can be done.

// Tailored API-s
// Batch request
// Auth




So probably most of us are not Netflix, you might be working in smaller team or you think that your 





## Who is Owner of the BFFS   


"
That means that each device potentially has to work a little harder (or sometimes a lot harder) to get the data needed to create great user experiences because devices are different from each other.

"


"People were thinking about ways to let the UI have more control in dictating what is needed from a service in support of their needs"

Some went in the direction



# General-Purpose API Backend
A first step in accommodating more than one type of UI is normally to provide a single, server-side API, and add more functionality as required over time to support new types of mobile interaction:


STRANGLER PATTERN - https://martinfowler.com/bliki/StranglerFigApplication.html


NETFLIX:  https://netflixtechblog.com/embracing-the-differences-inside-the-netflix-api-redesign-15fd8b3dc49d
CLIENT CODE
CLIENT ADAPTER CODE
SERVER CODE





In the next few decades

Why REST Keeps Me Up At Night: https://www.programmableweb.com/news/why-rest-keeps-me-night/2012/05/15
https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-1-ae3557c187e2
Optimizing the Netflix API: https://netflixtechblog.com/optimizing-the-netflix-api-5c9ac715cf19
Embracing the Differences : Inside the Netflix API Redesign : https://netflixtechblog.com/embracing-the-differences-inside-the-netflix-api-redesign-15fd8b3dc49d
