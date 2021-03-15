## Maximize perfomances

As all optimizations also that one comes with prerequisites & costs:

Basic **prerequisites** needed to understand _prototype.js_ code:  

0) know [ES3](https://www.ecma-international.org/wp-content/uploads/ECMA-262_3rd_edition_december_1999.pdf) and [differences with ES5](https://kangax.github.io/compat-table/es5/) (_prototype.js_ is written in ES3 and is IE6 compat.).  
1) know 100% of prototypal inheritance in javascript.  
2) know all native polluted constructors.  
3) have at least an idea about how XHR was working before the advent of those libraries that started allowing almost anyone to run ajax calls.  
4) being able to fail on the way to the goal.  

Among the **costs**:  

0) must be mantained  
1) takes more time to implement  
2) needs to be 100% covered  



## 6th sense
It is extremely important to solve all problems paying particular attention to dependencies choice since we would like to delay as much as possible problems caused by the 4th point (up in the main readme).  

I'll assume now one or more available _ninjas_ are confident they **cwill** solve the problem, the point still is to plan the solution correctly, in order:  
1) create a namespace with configurable name (here **NS**), this will be **the only global variable**   
2) in **NS** create a subnamespace (p) to contain each polluted constructor containing the uncontextualized (no `this`) methods implemented in the polluted version. Could be considered some way to avoid to do it manually, anyway all those methods should be covered 100%.  
Here we can still consider to either implement on our own (which makes a lot of sense since we have available ninjas) or rely for example on lodash or similar, which slows down a lot the execution times.  
This step is needed before others cause most of the other stuff inside __prototype.js__ rely internally on those NCPPF.  
    
3) in NS we must also move all stuff _prototype.js_ puts in the global scope.  
Clearly also those must be rewritten and 100% covered (here also _lodash_ could speed up development, surely not execution... no, I'll not stop highlighting that)

4) in NS add also some functions _prototype.js_ adds to some DOM elements (e.g. `document`). Translate usage.

some considerations:  
- #1 and most of #2 and #3 needs to be done manually, but still the usage translations could be achieved via script.
- before starting is needed a small analysis to find out what actually is used in our application, so to avoid to write stuff that will never be used.
- as last step ...after all coverage is done we need to exploit ES5


## The heavy-lift
The heavy part here comes when NS is ready, the migration of potentially GB of code needs to be managed in the most correct, un-human, fast possible way. Keep in mind that this process can be fully automated. ... **wip** ...

# Starting step

A staring point would be writing tests (using jest) for _prototype.js_ trying to cover each case. This allows us to be confident of our replacement.  But there is a fundamental aspect to consider. Let's image we have 100% covered _prototype.js_ and we have our brand new shining `NS` namespace containing what we want: same behaviour in different namespace, but polluted constructors moved into NS.p (where we have to pass the context, see next section). Now if we load NS instead of _prototype.js_ **all tests will clearly fail**, I know it might look wierd to menton why, but I'll do it anyway: the structure of prototype is no more there, prototypes are no more polluted and the translated method can be found else where. How to solve it? 
One way could be to write a dual test, one for prototype one for NS, which must check exactly the same things, same cases, they must be specular (strategy pattern could also allow to write a single one).


[◀️ BACK](../README.md)