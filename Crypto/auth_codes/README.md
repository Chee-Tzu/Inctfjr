# Auth Codes

### Challenge Description

This service seems to be dynamically generating auth codes using a secure algorithm called LCG.  
Without the secret values, no one should be able to generate the right auth code unless it's the admin!
Can you hack the service? 

**Challenge File**:
+ app.py 

**MD5 Hash**: 003967695de28758517f100fd7088d54

### Short Writeup

+ The username is checked against a sha256 hash, which can be cracked using crackstation or any other tool to get `admin`
+ Using 3 consecutive values of the LCG, recover the values `a` and `c`. 
+ Let the values be `x1, x2, x3`, then `a = (x3-x2) / (x2-x1) mod m`
+ `c = (x3 - a*x2) mod m`
+ After recovering the values `a = 123456` and `c = 111111`, calculate `x4 = (a*x3 + c) mod m`
+ Use `x4` as the auth code and `admin` as the username to log in. 

### Flag

ENV Variable: FLAG
flag{LCG_1snt_s3cur3_3n0ugH}

### Author

**LS**