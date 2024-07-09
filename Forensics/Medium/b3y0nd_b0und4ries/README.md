# B3y0nd_b0und4ries

### Difficulty : Medium

### Description

 Where secrets lurk within the shadows,unravel mysteries that transcend the boundaries of the ordinary, revealing whispers from the unknown.


```MD5 HASH: f434f7caa1ced6febc568bd928b99a82```

### Solve
Since the zip file is password protected we can crack it using frackzip or john-the-ripper

Command to crack using fcrackzip
```bash
fcrackzip -v -u -D -p <path_to_wordlist_file> <file_name.zip>
```
Commadnto crack using john-the-ripper
```bash
zip2john <file_name.zip> > hash.txt
john hash.txt 
```
On cracking it we get to see the password of the zip to be
>50cent

On extracting the zip we get a jpg.
Manipulating the height of the jpg with the help of a hex editor we get the flag

![alt text](images/image.png)


### Flag

```
 inctfj{elev4tion_m4st3r_BOOM!!!}
```

### Author

**```kr4z31n```**