# Whisper_Waltz

### Difficulty : Hard

### Description
Since arriving here, creepy music and voices have become noticeable. The atmosphere is unsettling, with every shadow suggesting secrets are nearby. I've found this evidence. Can you help me piece together these clues and uncover the dark secrets hidden within? 


**Challenge File**:
```
```
```
```

```MD5 Hash:258466fed72af1baea1045dd188921ae```

### Solve
The pcap contains HTTP where an audio file can be seen transferred through this protocol. It can be extracted directly from the pcap by `File-->Export Objects-->HTTP` in wireshark. Download the audio file.
There was also a conversation in pcap where we can find `Macabre_mystery` to be the password for audio file.
By using `Deep Sound`, we can extract the data embedded inside the audio files using password.
A jpg file will be extracted, when used jsteg on the file, will reveal a base64 encoded text
`aW5jdGZqe3VucjR2M2wzZF90aDNfNTNjcjN0NV9jMG5jMzRsM2RfYjNoMW5kX3RoMTVfbTRuNTEwbn0=`
by decoding it, flag can be obtained.

### Flag

```
inctfj{unr4v3l3d_th3_53cr3t5_c0nc34l3d_1n_th15_m4n510n}
```

### Author
**```__m1m1__```**