#!/usr/bin/env python3
"""Turn lychee's JSON output into a concise Markdown report for the link-check issue.

lychee checks the source files directly, so its JSON already pins each broken link to a
source file and line. This renders one row per unique broken URL: the link, its status,
and a clickable link to the source line(s) so a maintainer can jump straight to the fix.

Usage: link-report.py <lychee.json>   # writes Markdown to stdout

Environment (all provided by GitHub Actions):
  GITHUB_SERVER_URL   e.g. https://github.com
  GITHUB_REPOSITORY   e.g. kescalada/gdsepac
  GITHUB_REF_NAME     branch the run is on (blob links point here); defaults to "main"
  GITHUB_RUN_ID       used to build the "view run" link
"""
import json
import os
import sys
from pathlib import Path


def status_label(status):
    """A short status cell: the HTTP code if present, else a trimmed reason."""
    if "code" in status:
        return f"`{status['code']}`"
    reason = status.get("details") or status.get("text") or "unreachable"
    # Collapse lychee's long connection-error prose to the first clause.
    return reason.split(" (")[0].split(". ")[0].strip()


def main():
    data = json.load(open(sys.argv[1], encoding="utf-8"))

    server = os.environ.get("GITHUB_SERVER_URL", "https://github.com")
    repo = os.environ.get("GITHUB_REPOSITORY", "")
    ref = os.environ.get("GITHUB_REF_NAME", "main")
    run_id = os.environ.get("GITHUB_RUN_ID", "")
    run_url = f"{server}/{repo}/actions/runs/{run_id}" if run_id else ""

    # One entry per unique URL; keep every (file, line) the URL was found at. lychee keys
    # error_map by the input file it scanned, and each entry carries its source span.
    urls = {}  # url -> {"status": <status>, "locs": [(file, line), ...]}
    for src_file, entries in data.get("error_map", {}).items():
        for e in entries:
            rec = urls.setdefault(e["url"], {"status": e["status"], "locs": []})
            line = e.get("span", {}).get("line")
            loc = (src_file, line)
            if loc not in rec["locs"]:
                rec["locs"].append(loc)

    out = []
    run_link = f" &mdash; [view run]({run_url})" if run_url else ""
    out.append(
        f"_Automated weekly external-link sweep{run_link}. Status codes like 403/500 are "
        "treated as reachable (many sites block automated checkers); a link is only "
        "reported when it is genuinely gone (404/410) or unreachable. To mute a false "
        "positive, add its URL to `.lycheeignore`._"
    )
    out.append("")

    if not urls:
        out.append("No broken external links. :tada:")
        print("\n".join(out))
        return

    n = len(urls)
    out.append(f"## {n} broken link{'s' if n != 1 else ''}")
    out.append("")
    out.append("| Link | Status | Source |")
    out.append("| --- | --- | --- |")

    def src_link(file, line):
        name = Path(file).name
        if line:
            return f"[{name}:{line}]({server}/{repo}/blob/{ref}/{file}#L{line})"
        return f"[{name}]({server}/{repo}/blob/{ref}/{file})"

    rows = []
    for url, rec in urls.items():
        locs = rec["locs"]
        src_cell = ", ".join(src_link(f, ln) for f, ln in locs)
        sort_key = (locs[0][0], locs[0][1] or 0)
        rows.append((sort_key, f"| {url} | {status_label(rec['status'])} | {src_cell} |"))

    for _, row in sorted(rows, key=lambda r: r[0]):
        out.append(row)

    print("\n".join(out))


if __name__ == "__main__":
    main()
