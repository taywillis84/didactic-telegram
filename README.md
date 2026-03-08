# Input Field Highlighter (Firefox Extension)

A lightweight Firefox extension that highlights every editable field on a web page.

This helps penetration testers and security analysts quickly identify user-input surfaces that may be relevant for testing:

- XSS
- SQL Injection
- Command Injection
- CSRF workflow manipulation
- Other client/server-side input handling issues

## What gets highlighted

The extension marks:

- `input` fields (except hidden/disabled/readonly)
- `textarea`
- `select`
- elements using `contenteditable`

It also watches for dynamically inserted DOM nodes and highlights new editable fields automatically.

## Install (temporary in Firefox)

1. Open Firefox.
2. Go to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...**.
4. Select `manifest.json` from this directory.

## Files

- `manifest.json` — extension metadata and registration
- `content.js` — editable-element detection and mutation observer
- `highlight.css` — visual styling for highlighted fields

## Notes

- This extension is for discovery/triage and does not actively test payloads.
- To run persistent scans in a formal workflow, pair it with your existing pentest tooling and manual verification.
