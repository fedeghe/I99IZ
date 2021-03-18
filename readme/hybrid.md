## on the way
In case we're brave enough and we (or whoever is paying us) can live leaving the global scope polluted with all names _prototype.js_ introduces in the global scope then we could write a small library that:
- redefines globally all $-ish functions (using _querySelector_, lodash where needed)
- implements all NCPPF in a well defined namespace. All occurrences must be translated.
- rewrite (or at least copy and cover 100%) all global non $-ish stuff and existing BOM polluted functions, no usage replacement is needed

this approach still:
- **CON**: leaves global scope as polluted as before
- **CON**: the maintenance burden is on us
- **PRO**: solved prototype pollution (but moves that maintenance burden on us, we still can use a _lodash-ish lib_ to delegate that)
- **PRO**: requires a workload that is **O(ncppf usage)** + some work
- **PRO**: no need to care about replacing `$-ish` usage


[◀️ BACK](../README.md)