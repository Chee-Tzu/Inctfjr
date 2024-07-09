# Haunt_hunt

### Difficulty : Easy

### Description
It seems obscured with hidden secrets. Can you uncover anything within this strange evidence?


**Challenge File**:
```
```
```
```

```MD5 Hash: 908a8ad88a6130416861a5550d566296```

### Solve
When opened the png file in hex editor, file structure seems to be manipulated by incorrect chunks. By replacing the chunks with correct format, image will be fixed and flag can be sighted.

chunks to be replaced:
25 70 4E 67 (%pNg) ---> 89 50 4E 47 (‰PNG)
69 48 6F 52 (iHoR) ---> 49 48 44 52 (IHDR)
49 44 65 54 (IDeT) ---> 49 44 41 54 (IDAT)
49 45 6E 44 (IEnD) ---> 49 45 4E 44 (IEND)
73 52 47 62 (sRGb) ---> 73 52 47 42 (sRGB)
67 41 6D 41 (gAmA) ---> 67 41 4D 41 (gAMA)
70 48 59 53 (pHYS) ---> 70 48 59 73 (pHYs)


### Flag

```
inctfj{15_th15_pn9_chunk_m4nupul4t10n??}
```

### Author
**```__m1m1__```**