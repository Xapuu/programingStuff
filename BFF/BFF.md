# BFF new BFF for your FE team


-- as seen https://samnewman.io/patterns/architectural/bff/
# Introduction


# General-Purpose API Backend
A first step in accommodating more than one type of UI is normally to provide a single, server-side API, and add more functionality as required over time to support new types of mobile interaction:


STRANGLER PATTERN - https://martinfowler.com/bliki/StranglerFigApplication.html



NETFLIX:  https://netflixtechblog.com/embracing-the-differences-inside-the-netflix-api-redesign-15fd8b3dc49d
CLIENT CODE
CLIENT ADAPTER CODE
SERVER CODE

## ACT I About me - 3-5 min

## ACT II Target

The goal of this talk is beside us learning few new keywords, so that we can sound smart in round-tables and stuff, but also to understand what was the need for inventing this new patterns, so that next time we see the management we can convince them why we should adopt the new thing that we learned for the last JSTalks


A bit of context history
(Show slide with old PC and terminal program running)
(Show slide with old PC and some kind of program with UI)
(Show slide with lot of devices)


With the advent and success of the web, the de facto way of delivering user interfaces has shifted from thick-client applications to interfaces delivered via the web, a trend that has also enabled the growth of SAAS-based solutions in general. The benefits of delivering a user interface over the web were huge - primarily as the cost of releasing new functionality was significantly reduced as the cost of client-side installs was (in most cases) eliminated altogether.

This simpler world didn't last long though, as the age of the mobile followed shortly afterwards. Now we had a problem. We had server-side functionality which we wanted to expose both via our desktop web UI, and via one or more mobile UIs. With a system that had initially been developed with a desktop-web UI in mind, we often faced a problem in accommodating these new types of user interface, often as we already had a tight coupling between the desktop web UI and our backed services.


## ACT III Classic BFF





In the next few decades

https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-1-ae3557c187e2
Optimizing the Netflix API: https://netflixtechblog.com/optimizing-the-netflix-api-5c9ac715cf19
: https://netflixtechblog.com/embracing-the-differences-inside-the-netflix-api-redesign-15fd8b3dc49d
