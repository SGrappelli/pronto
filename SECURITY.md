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

- **kta1kri** — reported several issues in one round: an inventory photo-upload endpoint with no
  authentication check ([#17](https://github.com/SGrappelli/pronto/pull/17)); Telegram/Viber webhook
  requests that weren't verified as genuinely coming from Telegram/Viber, and a missing owner check
  on Telegram's `/today` command; and a booking-endpoint filter built from unescaped user input
  ([#19](https://github.com/SGrappelli/pronto/pull/19)). All fixed.
