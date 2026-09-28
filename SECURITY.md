# Security Policy

## Reporting a Vulnerability

If you find a security issue in this project, please report it privately rather than opening a
public issue — use GitHub's [private vulnerability reporting](https://github.com/SGrappelli/pronto/security/advisories/new)
(repo's **Security** tab → "Report a vulnerability").

Please include:

- A description of the issue and its impact
- Steps to reproduce
- The affected file(s) or commit

We'll verify the report independently and credit you below (if you'd like) once a fix ships.

## Acknowledgments

Thanks to the following people for responsibly reporting security issues:

- **kta1kri** — reported that `app/api/inventory/[id]/photo/route.ts` used a service-role Supabase
  client with no authentication check, letting an unauthenticated request overwrite any inventory
  item's photo on any tenant. Fixed in [#17](https://github.com/SGrappelli/pronto/pull/17).
