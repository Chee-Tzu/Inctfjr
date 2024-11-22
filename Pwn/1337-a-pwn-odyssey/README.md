# 1337: A pwn odyssey

### Difficulty
easy

### Challenge Description

"Dave" is not allowed access to the mothership by the AI, HAL 9000. HAL learns that Dave is going to shut him down. The AI has changed the password for Dave's access to the central core, which is the only way to shut down the AI. Your job is to gain access to HAL's "central core" and shut him down once and for all.

**Challenge File**:
+ [Primary Link](https://drive.google.com/file/d/1kSQ8P4re76upxNBLCsmrDgWHpRI9eA14/view?usp=sharing)
+ [Mirror Link](https://1drv.ms/u/s!AmwNFYE660J7gnj0mLafzqPAD0VN?e=R2gMjJ)

**MD5 Hash**: 1255ef41f262bba017d991bc8e9a4797

### Short Writeup

+  The challenge is basically a simple ret2win. 
+  Here the username is "Dave". 
+  The password field has a buffer overflow vulnerability (gets function). 
+  By exploiting it we can call the function central_core which pops a shell, from there we can just cat the flag.

### Flag

inctfj{1_7th1nk_y0u_kn0w_wh47_7h3_pr0bl3m_1s_4s_w3ll_as_1_d0}

### Author

**HeartStoller**