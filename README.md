# AK BID Edge Delivery Services Website...
A small demo showing how you can integrate with the [Auckland Council Design System](https://designsystem.aucklandcouncil.govt.nz/index.html?path=/docs/our-design-system--guidelines), a UI Pattern Library, and Edge Delivery Services.


## Environments
### Main
- Preview: https://main--ak-bid--apsdemos.hlx.page/
- Live: https://main--ak-bid--apsdemos.hlx.live/
### Develop
- Preview: https://develop--ak-bid--apsdemos.hlx.page/
- Live: https://develop--ak-bid--apsdemos.hlx.live/

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `ak-artgallery` directory in your favorite IDE and start coding :)
