#!/usr/bin/env bash
hdr_line="© 2025 SIGNMitra Team: Dev Shah, Ayushi Soni, Maitriba Jadeja, Vishwa Joshi"

add_header () {
  f="$1"
  # Skip if already has header (first 3 lines)
  head -n 3 "$f" | grep -qi "SIGNMitra Team" && return

  case "$f" in
    *.js|*.mjs|*.cjs|*.css)
        sed -i "1i/* $hdr_line */" "$f"
        ;;
    *.html|*.htm)
        sed -i "1i<!-- $hdr_line -->" "$f"
        ;;
    .env)
        # Will only run if you later choose to commit .env
        sed -i "1i# $hdr_line" "$f"
        ;;
    *)
        return
        ;;
  esac
}

export -f add_header
export hdr_line

# Target file types
find . -type f \( -name "*.js" -o -name "*.mjs" -o -name "*.cjs" -o -name "*.css" -o -name "*.html" -o -name "*.htm" -o -name ".env" \) \
  -exec bash -c 'add_header "$0"' {} \;

echo "Headers inserted."
