## NGRX making the decision

    How to design our NGRX implementation step by step

    Most people when starting a new Angular project or when they decide to use state-management system, hopefully go tough the long process trough a long POC process of researching which library and in what way to integrate such system in their application and then mess up their project.
    Others don't bother with extensive research process and mess up their application real hard on the fly. 

    The purpose of this document is to walk you trough my experience of using the state management libraries and hopefully to save you at least one re-write of your state management logic, you read right, you will have to re-write your state management logic at least once, so that you can make it feel right in your business case.

### Do i need state management library

    1. How complex is my application
    2. How useful will be a state-managemnt library to my team
    3. What is the current seniority of my team and is it worth it to invest in rising their experties in ceartain areas
       1. Cases where the BE team is mad full-stack
    4. What problems will be solved by introducing state management library
       1. NGRX as message broker
       2. NGRX as a way to optimise performance  


A good guideline that might help answer the question, "Do I need NgRx Store?" is the SHARI principle:
Shared: state that is accessed by many components and services.
Hydrated: state that is persisted and rehydrated from external storage.
Available: state that needs to be available when re-entering routes.
Retrieved: state that must be retrieved with a side-effect.
Impacted: state that is impacted by actions from other sources.


    Let's analyze those questions
    1. How big and complex is my application
        Small app:  If we have simple application, probably we don't need to integrate state management layer at all, what are meant as "simple" applications refer to such applications where data is being visualized as it is seen from some api responses, in other words there aren't much cases where you need to add additional business logic in the FE layer.
        Complex app: We will probably already had faced some issues related to the lack of such layer, so we should proceed forward with the list

    2. How complex is my application
        Simple app: If we are working on simple application, which purpose is to visualize data as it comes from restful api-s, we 



## TODO app
    - The principal behind this pattern is that everything goes everywhere, per



## Feature based pattern
    - Each feature module has it's own 

## Entity based pattern


## 


## Business logic in actions

## Business logic in Effects

## Business logic in 




TODO test if effects are singletons
Test if effects are attached