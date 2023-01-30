# Folder structure

```
├───docs
│   └───Project Architecture
└───src
    ├───auth
    |     |---dto
    |     |---guard
    |     |     |---test
    |     |---strategy
    ├───aws
    │
    │----common
    |      |---decorators
    |      |---permission
    |      |---role
    |      |---service
    |
    |---connector
    |
    |---constants
    |     |---permission
    |     |---response
    |
    ├───contact
    │
    ├───filters
    │
    │----health-check
    |
    |---helpers
    |
    │----interceptor
    |
    |----providers
    |
    |---sync
    |
    |---template
    |
    |---user
    |    |---invitation
    |
    |---work-space

```

### /src

All code will be in `/src` and `/src/app/ts` is the entrypoint.<br/>
`main.js` will handel express and its relevant middleware, example apollo, cors etc.
