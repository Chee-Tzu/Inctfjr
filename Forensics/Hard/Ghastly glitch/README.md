#  Ghastly glitch

### Difficulty : Hard

### Description
Investigating this mansion has been an eerie experience so far. I have come across a piece of evidence. Can you help me reorder the pieces and uncover the secrets it conceals? The only other time I had fear was when I had to skydive off a plane for my last mission. I have sent you a photo.Can you reveal the secrets hidden deep within layers of terror?


**Challenge File**:
```
```
```
```

```MD5 Hash: 8fb8d38cd65745e0e3c78ddbece7ac8c ```

### Solve

When viewed hex of the image, it seems like the bytes are swapped.
By making a script to fix the image, flag can be obtained

Solve script:

```
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
```
Fixed image :

![alt text](images/swapped_chall.png)


### Flag

```
inctfj{are_w3_b3ing_w4tch3d}
```

### Author
**```rudraagh```**