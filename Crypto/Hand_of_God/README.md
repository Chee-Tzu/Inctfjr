# Hand of God

### Challenge Description:

The Final layer to destroy, but an entity awaits you. Its attacks are seemingly random....or do you lack the means to see through it?

**Challenge File**:
+ [Primary Link](./Handout/Hand_of_God.zip)
+ [Mirror Link](https://drive.google.com/file/d/1inRT8RCeItNZfuCe-GMQWTz9G-yCIHPY/view?usp=drive_link)

**MD5 Hash: d45114b42d05e87821db25941ad03945**: 

### Short Writeup:

+  This is a challenge based on the Python Random Module which internally uses Mersenne Twister for generating pseudo-random numbers.
+  We can use the extend_mt19937_predictor module to solve this question and pwntools for interacting with the remote server
+  We can skip most of the cutscenes by using "skip" and then use only "tank" to get a predictable number of tries before our HP drops to 0
+  Now we can use the 256 bit number which the boss supposedly leaks after every turn and feed it to the predictor until ready
+  Then we can do (Predictor's_value % 6)-1 % 6 to accurately counter each and every move and then get the flag

### Flag:

inctfj{r4nd0mn355_h45_b33n_4b0053d}

### Author:

**AeroSol**