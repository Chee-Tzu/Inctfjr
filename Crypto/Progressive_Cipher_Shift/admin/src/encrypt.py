import sys
from random import randint

pt = sys.argv[1]
alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '}']
alpha = alpha[::-1]
ct = ""
x = randint(26,50)
for i in range(len(pt)):
    ct += alpha[(alpha.index(pt[i])+x)%len(alpha)]
    x += 1
with open("./ciphertext.txt","w") as f:
    f.write(f"{ct = }")
