## polluted constructor function -> ns.p.constructor.function

The assumptions is that the choosen element in NS to implement a polluting _function_ in a _constructor_ is: 
```
NS.p
```


Let's pollute a constructor to have an example:
``` javascript
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}
'hello There'.capitalize(); // Hello there
```
this must become
``` javascript
const NS = NS || { p: {}};
NS.p.String = NS.p.String || {};

NS.p.String.capitalize = ctx => 
    `${ctx.charAt(0).toUpperCase()}${ctx.substring(1).toLowerCase()}`;

NS.p.String.capitalize('hello There');
```
so here the translation would be  
``` js
"the string".capitalize()
/* TO */
NS.String.capitalize("the string")
```

easy enough also to automate in a script. Dont celebrate too early... this is really the easiest imaginable case 🗡️



