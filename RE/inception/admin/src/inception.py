ciphertext = [121, 121, 9, 9, 217, 217, 168, 168, 137, 137, 73, 73, 88, 88, 120, 120, 25, 25, 184, 184, 200, 200, 185, 185, 26, 26, 153, 153, 185, 185, 168, 168, 168, 168, 121, 121, 9, 9, 153, 153, 26, 26, 153, 153, 25, 25, 25, 25, 169, 169, 26, 26, 249, 249, 168, 168, 26, 26, 168, 168, 105, 105, 121, 121, 216, 216, 26, 26, 200, 200, 185, 185, 136, 136, 185, 185, 200, 200, 216, 216, 121, 121, 9, 9, 153, 153, 26, 26, 216, 216, 168, 168, 184, 184, 137, 137, 137, 137, 253, 253, 253, 253, 56, 56]

def check(password):
    if len(password) == 1:
        a = (((password[0] // 2 ** 4) | (password[-1] * 2 ** 4) & 0xff) ^ 0xef ^ ciphertext.pop())
        b = (((password[0] >> 4) | (password[-1] << 4) & 0xff) ^ 0xef ^ ciphertext.pop())
        return not (a or b)
    return check([password[-1]]) and check(password[:-1])

def main():
    password = input("What's the password: ").encode()
    password = bytearray(password)

    if (check(password)):
        print("good")
    else:
        print("bad")

if __name__ == "__main__":
    main()
