import os

os.makedirs('d:/مشروعي/assets/coursera/partners', exist_ok=True)

logos = {
    'stanford.svg': 'Stanford',
    'michigan.svg': 'Michigan',
    'duke.svg': 'Duke',
    'vanderbilt.svg': 'Vanderbilt',
    'johns_hopkins.svg': 'Johns Hopkins'
}

svg_template = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100">
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="42" font-weight="800" fill="#E6F7F7" letter-spacing="1">{}</text>
</svg>"""

for filename, name in logos.items():
    try:
        with open('d:/مشروعي/assets/coursera/partners/' + filename, 'w', encoding='utf-8') as f:
            f.write(svg_template.format(name))
        print(f"Generated {filename}")
    except Exception as e:
        print(f"Error generating {filename}: {e}")
