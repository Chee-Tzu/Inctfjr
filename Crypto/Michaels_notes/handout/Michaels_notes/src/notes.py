from Crypto.Util.number import *
import sys
import flag
import os
import sys
from time import sleep

def typewriter(words,delay):
    for char in words:
        sleep(delay)
        sys.stdout.write(char)
        sys.stdout.flush()

def header():
    
    typewriter("""\033[91m
 _                            _____ _                           
| |    __ _ _   _  ___ _ __  |_   _| |__  _ __ ___  ___         
| |   / _` | | | |/ _ \ '__|   | | | '_ \| '__/ _ \/ _ \  _____ 
| |__| (_| | |_| |  __/ |      | | | | | | | |  __/  __/ |_____|
|_____\__,_|\__, |\___|_|      |_| |_| |_|_|  \___|\___|        
            |___/                                               
 _____ _            ____       _       _            __   _   _       
|_   _| |__   ___  |  _ \ ___ (_)_ __ | |_    ___  / _| | \ | | ___  
  | | | '_ \ / _ \ | |_) / _ \| | '_ \| __|  / _ \| |_  |  \| |/ _ \ 
  | | | | | |  __/ |  __/ (_) | | | | | |_  | (_) |  _| | |\  | (_) |
  |_| |_| |_|\___| |_|   \___/|_|_| |_|\__|  \___/|_|   |_| \_|\___/ 
                                                                     
 ____      _                    
|  _ \ ___| |_ _   _ _ __ _ __  
| |_) / _ \ __| | | | '__| '_ \ 
|  _ <  __/ |_| |_| | |  | | | |
|_| \_\___|\__|\__,_|_|  |_| |_|
                                


\033[0m\n""",0.005)
    
def round_commencer():
    symbol = "█"
    
    typewriter(f"\033[91m{symbol*70}\033[0m\n",0.05)
    
def v1speak():
    
    typewriter(f"""\n\033[34m
Status: Online
Identity: V1
Location: Underworld
Goal: Break out of Underworld
Current Objective: Analyse and decipher the Scientist's notes 
Analysis...Complete.\n\033[0m""",0.05)
    
def generate(bits):
    while True:
        prime = getPrime(bits) 
        if prime % 4 == 3:
            return prime
    
text1 = os.urandom(37)
flag = flag.Flag

def main():
    header()
    round_commencer()
    v1speak()
    p = generate(1024)
    q = generate(1024)
    n = p * q
    f = bytes_to_long(flag)
    n = p * q
    ct = pow(f,2,n)
    print(f"p = {p}\nq = {q}\nct = {ct}")

main()
