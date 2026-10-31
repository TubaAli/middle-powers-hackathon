# Subscription-backed image generation

Generates images through Gemini's normal **Create image** control in an existing,
authorised Chrome session. Playwright drives the page and downloads the original
files. No API keys, cookies, tokens, private endpoints or exported browser
profiles are used. This is browser automation, not a Gemini API entitlement.

## Tools

- `images.status`: browser availability; no generation.
- `images.generate`: submit and wait for full-sized downloads.
- `images.submit`: start a request and return a chat/response receipt.
- `images.collect`: recover a pending request without generating it twice.

Omit `chat_url` to create a new background tab. Pass the returned URL for a
follow-up edit or consistent image series. The selected chat must not contain
an unsent draft or an active response. Tabs remain open for human inspection.

The tool does not bypass provider limits, change subscriptions, complete logins
or launch a second browser profile. Resolve sign-in, quota or provider errors
in the visible app. There is no automatic paid-API fallback.

## Installation

Run the installer with an existing Playwright-enabled Python environment:

```sh
python3 tools/image-generation/install.py --python /absolute/path/to/venv/bin/python
```

The installer preserves the virtualenv executable path and backs up changed
plugin files. Host paths remain local in `host.json`.

Place this directory at `~/.config/opencode/plugins/browser-images/`, with a
`host.json` containing nonsecret host bindings:

```json
{"python":"/absolute/path/to/python-with-playwright","cdp_url":"http://localhost:9222"}
```

OpenCode V2 discovers global plugin directories and reloads them automatically.
The installed Python must already have Playwright. The Chrome debug endpoint
must belong to the dedicated, signed-in browser, not a copied normal profile.

CLI equivalent (JSON stdin, JSON stdout):

```sh
python browser_images.py <<'JSON'
{"action":"generate","prompt":"A cinematic anime diplomatic conference, no text","output_dir":"/absolute/path/to/output","prefix":"conference"}
JSON
```

Outputs use actual file signatures and a SHA256 suffix, preserve full-resolution
originals, and never overwrite a different existing file. Receipts include
private chat URLs: keep those local; publish only intended images and prompts.

## Verification

The adapter was developed against the signed-in Gemini Work / Ultra web app.
Use `status`, then verify an actual requested image generation and original
download. Browser UI selectors can change; failures are explicit and pending
requests can be recovered with `collect`. A cancellation terminates the local
driver, not a generation already accepted by the provider; collect it later.

Official integration references: OpenCode V2 `build/plugins/server` (tool
registration and cancellation) and `plugins` (global directory discovery).
