# Myst3ry_Mel0dies

### Difficulty : Medium

### Description :

Secrets lie within the silence. Embark on a journey where mystery is spacial !



**Challenge file**
```
```
```
```

```MD5 HASH : 233f864781a1bb81c05eead09b24ea5f```

### Solve:

-->Extract the `hidden audio file` from the zip obtained from the png using `binwalk `

>command to extract  

```bash
binwalk -e <filename.png>
```


Or 

-->Extract the zip file hex from the hex of the image.


After extracting `.wav` file open it in audacity or sonic-visualizer and check the `spectogram` to get the flag.



Spectogram :

![!\[specflag\]](images/image.png)

### Flag
```
inctfj{v0ices_hidd3n_h3r3_4nd_th3r3}
```

### Author
**```kr4z31n```**