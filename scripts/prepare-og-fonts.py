"""Converts the variable woff2 brand fonts into static TTFs that fontconfig can serve.

librsvg, which sharp uses to rasterize the social card, reads fonts through fontconfig
and cannot use the variable woff2 files that @fontsource-variable ships. This writes
static instances into .cache/fonts and a fontconfig file pointing at them.

    pip install fonttools brotli
    python3 scripts/prepare-og-fonts.py
    FONTCONFIG_FILE="$PWD/.cache/fonts/fonts.conf" node scripts/build-og-image.mjs

.cache/ is disposable and git-ignored; rerun this whenever it is missing.
"""

import pathlib
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / ".cache" / "fonts"

LITERATA = "node_modules/@fontsource-variable/literata/files/literata-latin-wght-normal.woff2"
PLEX = "node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2"

# (source, output, weight, family exposed to fontconfig, style)
JOBS = [
    (LITERATA, "Literata-Bold.ttf", 700, "Literata OG", "Bold"),
    (LITERATA, "Literata-Regular.ttf", 400, "Literata OG", "Regular"),
    (PLEX, "Plex-Bold.ttf", 700, "Plex OG", "Bold"),
    (PLEX, "Plex-Medium.ttf", 500, "Plex OG", "Regular"),
]

FONTS_CONF = """<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>{font_dir}</dir>
  <cachedir>{cache_dir}</cachedir>
</fontconfig>
"""


def main() -> None:
    (FONT_DIR / "cache").mkdir(parents=True, exist_ok=True)

    for source, filename, weight, family, style in JOBS:
        font = TTFont(ROOT / source)
        static = instancer.instantiateVariableFont(
            font, {"wght": weight}, inplace=False, updateFontNames=False
        )
        for record in static["name"].names:
            if record.nameID == 1:
                record.string = family
            elif record.nameID == 2:
                record.string = style
            elif record.nameID == 4:
                record.string = f"{family} {style}"
            elif record.nameID == 6:
                record.string = f"{family.replace(' ', '')}-{style}"
        static.flavor = None
        static.save(FONT_DIR / filename)
        print(f"  {filename}")

    (FONT_DIR / "fonts.conf").write_text(
        FONTS_CONF.format(font_dir=FONT_DIR, cache_dir=FONT_DIR / "cache"), encoding="utf-8"
    )
    print(f"\nfontconfig: {FONT_DIR / 'fonts.conf'}")


if __name__ == "__main__":
    main()
