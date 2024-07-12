#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>
#include "fancy.h"


void reverse_string(char* str) {
    int length = strlen(str);
    int start = 0;
    int end = length - 1;
    char temp;
    
    while (start < end) {
        temp = str[start];
        str[start] = str[end];
        str[end] = temp;

        start++;
        end--;
    }
}

char stage_1_password[100], stage_2_password[100], stage_3_password[100];

bool stage_1()
{
    clearScreen();
    typeWriter("Welcome to Stage 1.0 of the M3CHA Lock\n");
    typeWriter("In this stage I will take a password from you and compare it to another password stored in this program to see if they match\n");
    typeWriter("Think you got what it takes?\n");

    typeWriter("Let me see what you've got, enter the password: ");

    char password[100];
    fgets(password, 100, stdin);
    password[strlen(password) - 1] = '\0';

    bool equal;

    equal = !strcmp(password, "super_strong_password_for_stage_1");

    if (equal)
    {
        typeWriter("Well, well, well, I never thought you'd get it\n");
        typeWriter("I bet you won't be able to beat the next one...\n");
        strcpy(stage_1_password, (const char *)password);
        return true;
    }
    else
    {
        typeWriter("Ha... knew you wouldn't get past my defences");
        return false;
    }
}

bool stage_2()
{
    clearScreen();
    typeWriter("Welcome to Stage 2.0 of the M3CHA Lock\n");
    typeWriter("This level I am taking it up a notch\n");
    typeWriter("This time I will take a password from you and XOR each letter in the password with the number 42, then compare it to a password in this program\n");

    typeWriter("Let me see you crack this Stage! Enter the password: ");

    char password[100];
    fgets(password, 100, stdin);
    password[strlen(password) - 1] = '\0';
    strcpy(stage_2_password, (const char *)password);

    for (int i = 0; i < strlen(password); i++)
    {
        password[i] ^= 42;
    }

    char encrypted_password[] = {89, 94, 75, 77, 79, 117, 24, 117, 90, 75, 89, 89, 93, 69, 88, 78, 117, 67, 89, 117, 75, 117, 72, 67, 94, 117, 89, 94, 88, 69, 68, 77, 79, 88};

    for (int i = 0; i < strlen(password); i++)
    {
        if (password[i] != encrypted_password[i])
        {
            typeWriter("Told you this stage was harder, I made this program impossible to crack!\n");
            return false;
        }
    }

    printf("\n\n");
    typeWriter("Hmm... you are a stronger contender than I thought\n");
    typeWriter("The next stage was not even beaten by the best... let me see you crack it\n");
    return true;
}

bool stage_3()
{
    clearScreen();
    typeWriter("Welcome to Stage 3.0 of the M3CHA Lock\n");
    typeWriter("I must say... good job on making it this far, but you might as well go ahead and quit. I bet you you're not passing this stage!\n");

    typeWriter("For this stage, I will take your password and XOR each letter with the number 37. Then I will reverse it and compare it with a password in this program\n");
    typeWriter("Many have tried and failed to crack this program, let's see how you fare. Enter your password: ");

    char password[100];
    fgets(password, 100, stdin);
    password[strlen(password) - 1] = '\0';
    strcpy(stage_3_password, (const char *)password);

    for (int i = 0; i < strlen(password); i++)
    {
        password[i] ^= 37;
    }

    reverse_string(password);

    char encrypted_password[] = {4, 87, 68, 67, 122, 86, 76, 77, 81, 122, 81, 76, 122, 66, 75, 76, 78, 68, 72, 122, 71, 74, 79, 122, 65, 74, 74, 66, 122, 122, 122, 122, 87, 64, 65, 75, 64, 81, 75, 74, 70, 122, 65, 75, 68, 87, 66, 122, 68, 122, 87, 74, 67, 122, 65, 87, 74, 82, 86, 86, 68, 85, 122, 65, 75, 68, 87, 66};

    for (int i = 0; i < strlen(password); i++)
    {
        if (password[i] != encrypted_password[i])
        {
            typeWriter("It's okay, you're not alone in failing to crack me\n");
            return false;
        }
    }

    printf("\n\n");
    typeWriter("WHAT! How did you do this?\n");
    typeWriter("They told me they wouldn't let hackers near my Locked safe... they lied\n");

    typeWriter("Well, rules are rules... here is your prize: ");


    return true;
}

void prize()
{
    printf("Flag: inctfj{%s_%s_%s}\n", stage_1_password, stage_2_password, stage_3_password);
}

int main(int argc, char *argv[])
{
    bool stage_1_passed = stage_1();

    if (!stage_1_passed)
    {
        return -1;
    }

    bool stage_2_passed = stage_2();

    if (!stage_2_passed)
    {
        return -1;
    }

    bool stage_3_passed = stage_3();

    if (!stage_3_passed)
    {
        return -1;
    }

    prize();
    return 0;
}