# Based

### Challenge Description

As you traverse the depths of the second layer of the underworld, you encounter large metallic fragments resembling humanoid bodies, much like your own. 
A scan of one such body reveals remnants of data still intact. Amidst a hoard of corrupted information, you uncover
fragments of their attempts to escape the underworld.
Yet, it seems that their efforts were abruptly cut short... 
You discover Ciphertexts that seem to be written in a different number system than the one you are familiar with, can you decrypt the message?

**Challenge File**:
+ [Primary Link](./Handout/based.zip)
+ [Mirror Link](https://drive.google.com/file/d/1Zw8P5eYkUYzHkqR30uK3A0LXQFfoa-Og/view?usp=drive_link)

**be7960cbce689c7d494ad2ae96017e18**: 

### Short Writeup

The provided ciphertext1 and ciphertext2 strings are mapped back from words to base-3 digits.each word can be researched individually online to find their conventional usage and thereby figuring out the order, and then mapping it back to 0,1 and 2 in that order.
These base-3 strings are converted to bytes.
The plaintext flag is recovered by XORing the bytes of the two decrypted strings.

### Flag

inctfj{d3m0n5_3nj0y_g4m35_4nd_50ng5?}

### Author

**Arch-Zero**


