Assume our target namespace is names `NS`

- [x] NS.$  
- [x] NS.$$  
- [ ] NS.$F
- [x] NS.$A
- [ ] NS.$H
- [ ] NS.$R
- [ ] NS.$w

- [ ] NS.$break
- [ ] NS.$continue
- [ ] NS.Prototype
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

- [ ] NS.Ajax
    - [ ] PeriodicalUpdater
        - [ ] new
        - [ ] start
        - [ ] stop
    - [ ] Request

- [ ] NS.Class
- [ ] NS.Enumerable
- [ ] NS.EventObserver
- [ ] NS.Form
    - [ ] Element
        - [ ] EventObserver
        - [ ] Methods
        - [ ] Observer
        - [ ] Serializers
    - [ ] EventObserver
    - [ ] Observer
- [ ] NS.Hash
- [ ] NS.Insertion (undocumented)
- [ ] NS.ObjectRange
- [ ] NS.PeriodicalExecuter
- [ ] NS.Position (undocumented)
- [ ] NS.Selector
- [ ] NS.Template
- [ ] NS.TimedObserver
- [ ] NS.Try
    - [ ] these

- [ ] NS.document  
    - [ ] viewport
        - [ ] getDimensions
        - [ ] getWidth
        - [ ] getHeight
        - [ ] getScrollOffsets
    - [ ] loaded
    - [ ] fire (fn)
    - [ ] observe (fn)
    - [ ] on (fn)
    - [ ] stopObserving (fn)

- [ ] NS.p
    - [ ] Array
        - [ ] _each
        - [ ] all
        - [ ] any
        - [ ] clear
        - [ ] clone
        - [ ] collect
        - [ ] compact
        - [ ] every
        - [ ] map
        - [ ] filter
        - [ ] fintAll
        - [ ] first
        - [ ] flatten
        - [ ] inject
        - [ ] inspect
        - [ ] intersect
        - [ ] last
        - [ ] reverse
        - [ ] select
        - [ ] size
        - [ ] some
        - [ ] toArray
        - [ ] uniq
        - [ ] without
    - [ ] Date
        - [ ] toISOString
        - [ ] toJSON
    - [ ] Element
        - [ ] addMethods
        - [ ] Layout
        - [ ] Methods
        - [ ] Offset
        - [ ] Storage
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
        - [ ] escape
        - [ ] match
    - [ ] String
        - [ ] blank
        - [ ] camelize
        - [ ] calitapize
        - [ ] dasherize
        - [ ] empty
        - [ ] endsWith
        - [ ] escapeHTML
        - [ ] evalJSON
        - [ ] evalScripts
        - [ ] include
        - [ ] inspect
        - [ ] interpret (static function)
        - [ ] isJSON
        - [ ] gsub
        - [ ] parseQuery
        - [ ] scan
        - [ ] specialChar (static prop)
        - [ ] startsWith
        - [ ] strip
        - [ ] stripScripts
        - [ ] stripTags
        - [ ] sub
        - [ ] succ
        - [ ] times
        - [ ] toArray
        - [ ] toQueryParams
        - [ ] truncate
        - [ ] unescapeHTML
        - [ ] underscore
        - [ ] unfilterJSON

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
