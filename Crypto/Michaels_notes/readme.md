# Michael's notes

### Challenge Description

As you venture through the third layer, you come across aged notes penned by a human scientist named Michael. 
They contain encrypted numbers, hinting at an unfamiliar cryptosystem. 
But the fading ink proves to be too difficult to read...
Unearth the Truth that Michael learned by arriving at the same answer and escape the second layer.

**Challenge File**:
+ [Primary Link](./Handout/chall.zip)

+ [Mirror Link](https://drive.google.com/file/d/1AhrBPY-eOJRALx9IzkKF7cBMtzCjuSl4/view?usp=drive_link)

**a7c38f70e8beec317a64f87031a8c1af**: 

### Short Writeup

The challenge involves decrypting a ciphertext encrypted by squaring a plaintext under an RSA modulus n=p×qn=p×q, where pp and qq are primes congruent to 3 mod 4.

Solution:

    Generate Primes:
        Two primes pp and qq of 1024 bits, each congruent to 3 mod 4, are generated.

    Encryption:
        The plaintext flag is squared under the modulus nn to produce the ciphertext.

    Decryption:
        Compute four possible plaintext roots using the Chinese Remainder Theorem (CRT).
        Convert these roots from long integers to bytes to obtain potential plaintexts. 

This is a very basic implementation of the rabin cryptosystem

### Flag

inctfj{5h0uld_h4v3_ju57_57uck_w17h_r54_huh}

### Author

**Arch-Zero**
