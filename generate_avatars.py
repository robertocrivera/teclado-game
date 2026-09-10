import os
from PIL import Image, ImageDraw

os.makedirs('assets/images', exist_ok=True)

avatars = [
    ("avatar_robot.png", (2, 132, 199), (56, 189, 248)),
    ("avatar_dino.png", (21, 128, 61), (34, 197, 94)),
    ("avatar_astro.png", (126, 34, 206), (192, 132, 252)),
    ("avatar_unicorn.png", (219, 39, 119), (244, 114, 182)),
    ("avatar_ninja.png", (30, 41, 59), (100, 116, 139)),
]

for filename, base_color, accent_color in avatars:
    img = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Círculo base con borde
    draw.ellipse([8, 8, 120, 120], fill=base_color, outline=accent_color, width=6)
    
    # Detalle geométrico interior
    draw.ellipse([36, 36, 92, 92], fill=accent_color)
    draw.rounded_rectangle([44, 44, 84, 84], radius=8, fill=base_color)
    
    img.save(f'assets/images/{filename}')
    print(f"Generado: assets/images/{filename}")