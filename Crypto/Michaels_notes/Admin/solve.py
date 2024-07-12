from Crypto.Util.number import *

with open('Michaels_notes/Deployment/output.txt', 'r') as file:
    lines = file.readlines()

p = int(lines[0].strip().split('=')[1].strip())
q = int(lines[1].strip().split('=')[1].strip())
ct = int(lines[2].strip().split('=')[1].strip())
n = p * q

a1 = pow(ct, (p + 1) // 4, p)
a2 = (-a1) % p

b1 = pow(ct, (q + 1) // 4, q)
b2 = (-b1) % q

q_inv = inverse(q, p)
p_inv = inverse(p, q)

r1 = (a1 * q * q_inv + b1 * p * p_inv) % n
r2 = (a1 * q * q_inv + b2 * p * p_inv) % n
r3 = (a2 * q * q_inv + b1 * p * p_inv) % n
r4 = (a2 * q * q_inv + b2 * p * p_inv) % n

print("Possible plaintext roots:")
print(long_to_bytes(r1))
print(long_to_bytes(r2))
print(long_to_bytes(r3))
print(long_to_bytes(r4))