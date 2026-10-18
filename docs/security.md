# Security, Integrity & Data Privacy

## 1. Absolute Preservation of `D:\chatbot`
- The chatbot source repository at `D:\chatbot` is treated as strictly read-only.
- No package installs, migrations, builds, file writes, or modifications are executed against `D:\chatbot`.
- Portfolio integration is achieved exclusively via client-side adapters and decoupled network requests.

---

## 2. Client-Side Input Sanitization & Form Handling
- **No Unsafe Execution**: Input strings in the chatbot interface and contact form are treated strictly as text data, rendered safely via React JSX escaping.
- **SSRF & Command Injection Defense**: The chatbot interface does not execute system commands or file system calls.
- **Form Submissions**: Direct handoff to authenticated mailto or verified endpoints without exposing secrets in client bundles.

---

## 3. Link Security & External Referrals
- All external links (`toolkb.in`, `github.com`, `linkedin.com`) include `rel="noopener noreferrer"` attributes to prevent tab-nabbing vulnerabilities and window.opener hijacking.
