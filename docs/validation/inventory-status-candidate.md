# Inventory and Status candidate validation

- Candidate ref: `candidate/inventory-status-research-2026-11-27`.
- Exact candidate commit: `be7ddd88e5b25fee9fdbbc9a7f63c29f21a53457`.
- Base: `936f6eae66896c14e0e4c0e0016e7da9a0d9900b`.
- This branch exists only to run the isolated Actions workflow. The workflow checks out the exact candidate SHA and does not deploy it.
- Production at validation start is PWA shell v23; post-promotion verification will compare deployed v24 CSS and service worker with the candidate.
