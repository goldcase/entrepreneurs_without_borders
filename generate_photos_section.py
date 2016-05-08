from html import HTML
from PIL import Image

import os

PUBLIC_DIR = "public"
MEDIA_DIR  = "media"
IMGS_DIR   = "pics"
THUMBS_DIR = "thumbs"
THUMB_SIZE = (320, 320)

imgs_path      = os.path.join(PUBLIC_DIR, MEDIA_DIR, IMGS_DIR)
html_imgs_path = os.path.join(MEDIA_DIR, IMGS_DIR)

h = HTML()

i = 0
for root, dirs, files in os.walk(imgs_path):
    for img_file in files:
        if img_file != ".DS_Store" and img_file.endswith("_thumb.jpg"):
            if i % 8 == 0:
                row = h.div(klass="row")
            cell = row.div(klass="col-1-8 image-cell")
            cell.img(src=str(os.path.join(html_imgs_path, img_file)))
            i += 1

with open("photos-section-partial.html", "w") as photos_section:
    photos_section.write(str(h))

# # Code to generate thumbnails.
# for root, dirs, files in os.walk(imgs_path):
#     for img_file in files:
#         if img_file == ".DS_Store":
#             continue
#         else:
#             im = Image.open(os.path.join(imgs_path, img_file))
#             im.thumbnail(THUMB_SIZE, Image.ANTIALIAS)
#             im.save("{}_thumb.jpg".format(img_file.rstrip(".jpg")), "JPEG")




