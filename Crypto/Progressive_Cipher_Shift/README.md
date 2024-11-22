# Progressive Cipher Shift

### Challenge Description

Given that Ceaser Cipher is relatively easy to decipher, I've developed a new cipher that significantly surpasses the Caesar Cipher in terms of security. Are you up for the challenge of cracking it?

**Challenge File**:
+ [encrypt.py](./handout/Progressive_Cipher_Shift/src/encrypt.py)
+ [ciphertext.txt](./handout/Progressive_Cipher_Shift/src/ciphertext.txt)

**MD5 Hash**: 

### Short Writeup

+ Flag format -> `inctfj{}`
+ Using this, we can find the starting value of x `x = alpha.index(ct[0]) - alpha.index("i")`

### Flag

`inctj{I_Should_Not_Have_Used_Such_A_Small_Random_Number}`

### Author

**APN**