# Rumorush

### Difficulty : Medium

### Description
It appears that there's a conversation of the person spreading rumors about the mansion, captured in fragments. However, the text is difficult to read and seems disjointed. Help reveal the hidden message within this conversation.

Flag Format: inctfj{....}

**Challenge File**:
```
```
```
```

``` MD5 Hash:6fb3fdef0b7cc9cb3619c2f8d9d9ef34```

### Solve 
The pcap can be seen with conversation and few encoded text in ICMP.
These were the data that can be extracted using tshark
`tshark -r chall.pcapng -T fields -e data > out.txt`
 
Remove the extralines from the out.txt using the cmd `sed -i '/^$/d' out.txt`
By converting the hex to ascii, base64 encoded text can be seen, by decoding it flag can be seen in reverse.

M24xZ200fQo=     -->  3n1gm4}
dGgzXwo=         -->  th3_ 
MGZfCg==         -->  0f_  
bXk1dDNyMTM1Xwo= -->  my5t3r135_
dGgzXwo=         -->  th3_
dW52MzFsXwo=     -->  unv31l_
NXRyNG5kNV8K     -->  5tr4nd5_
M250NG5nbDNkXwo= -->  3nt4ngl3d_
aW5jdGZqewo=     -->  inctfj{                  

by rearranging them, flag can be obtained

### Flag

```
inctfj{3nt4ngl3d_5tr4nd5_unv31l_th3_my5t3r135_0f_th3_3n1gm4}
```

### Author
**```__m1m1__```**