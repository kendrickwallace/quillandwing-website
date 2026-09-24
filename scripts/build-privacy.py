#!/usr/bin/env python3
"""Render the privacy policy from its Markdown source into the site.

Source:  "Quill and Wing - Privacy Policy.md" (repo root) — edit that, then run this.
Writes:  privacy.html (standalone page — the URL to give Google / Apple), and the
         policy dialog inside index.html between the <!-- privacy:start/end --> markers.
"""
import html, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "Quill and Wing - Privacy Policy.md")

def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', t)
    t = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"_([^_]+)_", r"<em>\1</em>", t)
    return t

def render(md):
    out, para, items = [], [], []
    def flush():
        nonlocal para, items
        if para: out.append("<p>" + inline(" ".join(para)) + "</p>"); para = []
        if items: out.append("<ul>" + "".join("<li>" + inline(i) + "</li>" for i in items) + "</ul>"); items = []
    for line in md.splitlines():
        s = line.strip()
        if not s or s == "---": flush(); continue
        if s.startswith("# "): flush(); out.append("<h2>" + inline(s[2:]) + "</h2>"); continue
        if s.startswith("## "): flush(); out.append("<h3>" + inline(s[3:]) + "</h3>"); continue
        if s.startswith("- "): 
            if para: flush()
            items.append(s[2:]); continue
        if items: flush()
        para.append(s)
    flush()
    return "\n".join(out)

body = render(open(SRC, encoding="utf-8").read())
# The lines directly under the title (name, dates) read as a paragraph; give them the dateline style.
body = body.replace("<p><strong>Quill &amp; Wing</strong> Effective", '<p class="dateline"><strong>Quill &amp; Wing</strong><br>Effective', 1)

# 1. the dialog in index.html
idx = os.path.join(ROOT, "index.html")
page = open(idx, encoding="utf-8").read()
start, end = "<!-- privacy:start -->", "<!-- privacy:end -->"
dialog = f'''{start}
<dialog class="support policy" id="privacy-dialog" aria-labelledby="privacy-title">
  <div class="support-inner">
    <button type="button" class="support-close" data-dialog-close aria-label="Close">×</button>
    <div class="policy-body" id="privacy-title">
{body}
    </div>
  </div>
</dialog>
{end}'''
if start in page:
    page = re.sub(re.escape(start) + r".*?" + re.escape(end), lambda m: dialog, page, flags=re.S)
else:
    page = page.replace('\n<script src="flight.js" defer></script>', "\n" + dialog + '\n\n<script src="flight.js" defer></script>', 1)
open(idx, "w", encoding="utf-8").write(page)

# 2. the standalone page
standalone = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy Policy — Quill &amp; Wing</title>
<meta name="description" content="Quill &amp; Wing runs on your Mac. Your letters, replies and credentials stay there. No accounts, no analytics, nothing sold.">
<meta name="theme-color" content="#e9dbbe">
<link rel="icon" href="images/crest-64.png" type="image/png">
<link rel="apple-touch-icon" href="images/crest-180.png">
<link rel="stylesheet" href="fonts/fonts.css">
<link rel="stylesheet" href="styles.css">
</head>
<body class="policy-page">
<header class="masthead">
  <nav aria-label="Main"><a href="./">Home</a><a href="./#desk">The writing desk</a><a href="./#travels">How a letter travels</a></nav>
  <div class="crest"><a href="./" aria-label="Quill &amp; Wing home"><img src="images/crest.webp" width="480" height="499" alt="Quill &amp; Wing — Aerial correspondence, since 1783"></a></div>
  <div class="cta"><a href="./#download" class="btn btn-gold btn-sm">Download for Mac</a></div>
</header>
<main class="policy-main">
  <div class="policy-body">
{body}
  </div>
</main>
<footer class="footer">
  <div class="wrap footer-row">
    <div class="tag">Aerial correspondence, since 1783.</div>
    <nav aria-label="Footer"><a href="./#support">Support</a><a href="privacy.html">Privacy</a></nav>
    <div class="copy">© 2026 Quill &amp; Wing · www.quillandwing.com</div>
  </div>
</footer>
</body>
</html>
'''
open(os.path.join(ROOT, "privacy.html"), "w", encoding="utf-8").write(standalone)
print("privacy.html written; dialog", "updated" if start in page else "inserted", "; sections:", body.count("<h3>"))
