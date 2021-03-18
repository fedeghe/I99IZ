## Move dependencies  

Almost all of the _prototype.js_ sourcecode could be simplified a lot using a DOM library and a _utility_ library (could be _jQuery_ and _lodash_)

## the agnostic approach
Let's assume **we dont have enough knowledge of javascript** and what is the current wide supported apis (which also strictly depends on our target suppoorted browsers) to consider to graps the _prototype.js_ sourcecode. 
We dont have much choice then, given we want to remove _prototype.js_ and the listed effects we have to:
- remove _prototype.js_
- integrate a similar library (e.g. _jQuery_) for `$-ish` functions (at least some) and transform all occurrences
- ask an expert developer to rewrite all global `non $-ish` stuff (maybe just writing adapters to a well known alive library), and replace all occurrences
- integrate a utility library (e.g. _lodash_) to replace all _NCPPF_ (native constructor prototype polluting functions), and translate all occurrences
- rewrite additional constructors using as opssible the dependencies

this approach is
- quite feasibe for a small application
- really unfeasible for a big application

[◀️ BACK](../README.md)