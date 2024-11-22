# Batcomputer Breach

### Diff
easy

### Challenge Description

Bane has breached the Batcave's defenses and locked Batman out of the Batcomputer. Batman has leaked some useful data for you. Help him regain access to the Batcomputer while he goes after Bane.  

**Challenge File**:
+ [Primary Link](https://drive.google.com/file/d/1q-9DzxSVTbUbGgUX06J7bX5NOcL-2gAH/view?usp=sharing)
+ [Mirror Link](https://1drv.ms/u/c/d7b26a698efc06c2/EZoTnvMQpi5JgygCdxBNb94BtQNhK-wxa--tSlqEe_brlA?e=C7lWtb)

**MD5 Hash**: b451c151ff0ace41946b28714433fde5

### Short Writeup

+ The Remote Hacking Function takes 2 inputs - the first input reads into the bss segment while the second input has an unchecked bounds vulnerability which we can use to rop to our shellcode.
+ The Disruptor function makes the bss segment executable.
+ The Cryptographic Sequencer function gives us a canary leak.
+ You can make your own shellcode to pop a shell or get one from shell-storm.
+ Give the shellcode as input for the first input prompt. Give 24 bytes of junk at the second prompt to control RIP.
+ Use the provided canary leak to overwrite the stack canary with itself. Pad your rop chain as the canary is 8 bytes from RIP.
+ Overwrite RIP with address where shellcode is stored.
+ Shell Spawned - Flag Obtained.

### Flag

inctfj{pr3lud3_t0_kn1gh7f4ll_r4%P7x@}

### Author

**B4tMite**
