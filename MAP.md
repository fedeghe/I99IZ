Assume our target namespace is names `NS`


Global -> named

all go to `NS`

- [x] $  
- [x] $$  
- [ ] $F
- [x] $A
- [ ] $H
- [ ] $R
- [ ] $w
- [ ] Prototype
    - [ ] Browser
    - [ ] BrowserFeatures
    - [ ] JsonFilter
    - [ ] K
    - [ ] ScriptFragment
    - [ ] Selector
        - [ ] select
        - [ ] match
        - [ ] find
        - [ ] extendElements
        - [ ] extendElement
    - [ ] Version
    - [ ] emptyFunction
- [ ] Ajax
    - [ ] PeriodicalUpdater
        - [ ] new
        - [ ] start
        - [ ] stop
    - [ ] Request
- [ ] Class
- [ ] Enumerable
- [ ] Form
- [ ] Hash
- [ ] ObjectRange
- [ ] PeriodicalExecuter
- [ ] Selector
- [ ] Template
- [ ] Try
    - [ ] these

## additions (dom)
- [ ] document  
goes to `NS.document`
    - [ ] viewport
    - [ ] loaded
    - [ ] fire (fn)
    - [ ] observe (fn)
    - [ ] on (fn)
    - [ ] stopObserving (fn)


## prototype pollution

all go to `NS.p[constructor][function]`

- [ ] Array
    - [x] from
- [x] Date
- [ ] Element
    - [ ] Layout
    - [ ] Methods
    - [ ] Offset
- [ ] Event
- [ ] Number
- [ ] Object
    - [x] clone
    - [x] inspect
    - [x] isArray
    - [x] isElement
    - [x] isHash
    - [x] keys
    - [x] toHTML
    - [x] toJSON
    - [x] values
- [ ] RegExp
- [ ] String
    - [x] interpret
    - [x] blank
    - [x] camelize
    - [x] calitapize
    - [x] dasherize
    - [x] empty

---

## result  

The final result then will be structured like follows:
``` javascript
NS = {
    Prototype: {
        Selector,
        
    },
    p : {
        Array: {/* all functions */},
        Date: {/* all functions */},
        Element: {/* all functions */},
        Event: {/* all functions */},
        Number: {/* all functions */},
        Object: {/* all functions */},
        RexExp: {/* all functions */},
        String: {/* all functions */},
    },
    document: {
        viewport: Object,
        loaded: Bool,
        fire: Function,
        observe:Function,
        on: Function,
        stopObserving: Function,
    },

    $: Function,
    $$: Function,
    $F: Function,
    $A: Function,
    $H: Function,
    $R: Function,
    $w: Function,
    Prototype, // still need to check
    Ajax, // still need to check
    Class, // still need to check
    Enumberable, // still need to check
    Form, // still need to check
    Hash, // still need to check
    ObjectRange, // still need to check
    PeriodicalExecuter, // still need to check
    Selector, // still need to check
    Template, // still need to check
    Try, // no need to publish it
}
```
