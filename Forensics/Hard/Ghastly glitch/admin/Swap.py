def swap_bytes(img):
    with open(img, 'rb') as f:
        png_data = f.read()

    swapped_data = bytearray()
    for i in range(len(png_data)):
        if i % 2 == 0:
            if i + 1 < len(png_data):
                swapped_data.append(png_data[i + 1])
            else:
                swapped_data.append(png_data[i])
        elif i % 2 == 1:
            if i + 1 < len(png_data):
                swapped_data.append(png_data[i-1])
            else:
                swapped_data.append(png_data[i])
    with open('swapped_' + img, 'wb') as f:
        f.write(swapped_data)

swap_bytes('chall.png')
