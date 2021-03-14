## I99IZ

a migration plan for a huge appication that is using **_prototype.js_** (1.7.X)  


Final goal: free the application from prototype.js

---

Should be clear **why** a library like prototype.js is a problem nowadays (2021) 


1) global scope is filled with a lot of stuff, ... some not even [documented](http://api.prototypejs.org/)  

2) some additional functions/properties pollute existing entities in BOM (e.g. _document_)  

3) prototype pollution, the involved constructors are the following ones:  
    _Array, Date, Element, Event, Number, Object, RegExp, String_  

    The consequences should be clear anyway in case they are not, or there are doubts please get a  look at [this]() or simply search for _javascript prototype pollution consequences_.

4) prototype last version is dated Sep 2015, is no more mantained  


Other considerations in the implementation must be highlighted on the higher level: 

5) [Sizzle](https://github.com/jquery/sizzle) in 2021 is [not needed](https://caniuse.com/?search=querySelector) (still some exceptions may apply).

6) ... things we can't be aware of till our hands gets dirty 

---

## First fork  

0) [maximize the performances.](readme/maximize_performances.md)  
1) 
2) [minimize the effort and introduce other dependencies, lowering performances.](readme/move_depencencies.md)

since **both cant be achieved** we have to either opt for one of the two either have hybrid solution in the middle.
