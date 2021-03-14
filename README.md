## I99IZ
---
Migration plan for a huge appication that is using **_prototype.js_** (1.7.X)  

**Goal**: free the application from prototype.js

---

First things first, should be clear **why** a library like prototype.js is a problem nowadays (2021) 

1) global scope is filled with a lot of stuff, ... some not even [documented](http://api.prototypejs.org/)  

2) some additional functions/properties pollute existing entities in BOM (e.g. _document_)  

3) prototype pollution, the involved constructors are the following ones:  
    _Array, Date, Element, Event, Number, Object, RegExp, String_  

    The consequences should be clear anyway in case they are not, or there are doubts please get a  look at [this]() or simply search for _javascript prototype pollution consequences_.

4) prototype last version is dated Sep 2015, is no more mantained  


Other considerations in the implementation must be highlighted on the higher level: 

5) [Sizzle](https://github.com/jquery/sizzle) in 2021 is [not needed](https://caniuse.com/?search=querySelector) (still some exceptions may apply).

6) ... things we can't be aware of till our hands gets dirty 


## So the first question to answer is:  
Do we want to:  
1) maximize the performances. [Best option](readme/maximize_performances.md) 
1) minimize the effort and introduce other dependencies (e.g. jQuery, lodash) lowering preformances. [I see that as a the last choice](readme/move_depencencies.md)

