import urllib.request
import os

os.makedirs('d:/مشروعي/assets/coursera/partners', exist_ok=True)

urls = [
    ("https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", "google.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", "ibm.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/b/b5/Stanford_University_seal_2003.svg", "stanford.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/8/8f/Stanford_University_logo.svg", "stanford2.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/f/f6/University_of_Michigan_logo.svg", "michigan.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/9/93/University_of_Michigan_Logo.svg", "michigan2.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/e/e5/Duke_University_logo.svg", "duke.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/e/e0/Duke_University_logo.svg", "duke2.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/b/be/Vanderbilt_University_logo_2022.svg", "vanderbilt.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/8/87/Vanderbilt_University_logo.svg", "vanderbilt2.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/3/36/Johns_Hopkins_University_Logo.svg", "johns_hopkins.svg"),
    ("https://upload.wikimedia.org/wikipedia/commons/1/1d/Johns_Hopkins_University_logo.svg", "johns_hopkins2.svg")
]

req_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for url, filename in urls:
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as response:
            with open('d:/مشروعي/assets/coursera/partners/' + filename, 'wb') as f:
                f.write(response.read())
        print(f"Downloaded: {filename}")
    except Exception as e:
        print(f"Failed {filename}: {url} - {e}")
