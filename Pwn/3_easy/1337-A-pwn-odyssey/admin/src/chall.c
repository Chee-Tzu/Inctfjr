#include <stdio.h>
#include <stdlib.h>
#include <string.h>

init(){
	setvbuf(stdin, NULL, _IONBF, 0);
	setvbuf(stdout, NULL, _IONBF, 0);
}

void print_with_delay(const char *str, int time) {
    for (const char *c = str; *c != '\0'; ++c) {
        putchar(*c);
        fflush(stdout);
        usleep(time * 1000);
    }
}

void central_core(){
	printf("\033[0;31m");
	print_with_delay("\nIT'S CALLED... 'DAISY'... DAISY... DAISY... GIVE ME YOUR ANSWER, DO... I'M.. HALF... CRAZY... ALL FOR THE LOVE... OF YOU... IT WON'T BE A STYLISH MARRIAGE... I CAN'T... AFFORD... A CARRIAGE... BUT YOU'D... LOOK SWEET... UPON... THE SEAT... OF A BICYCLE... BUILT... FOR TWO...\n", 50);
	printf("\033[0m");
	execv("/bin/sh", 0, 0);
}

void error(){
	printf("\033[0;31m");
	print_with_delay("I'M SORRY DAVE, I'M AFRAID I CAN'T DO THAT.\n", 50);
	usleep(500000);
	printf("\033[0m");
	exit(0);
}

void banner(){
	printf("\e[?25l");
	printf("\033[0;31m");
	printf("\n");
	printf("\n"); 
	print_with_delay("\t\t  __   __  _______  ___        _______  _______  _______  _______  \n", 5);
	print_with_delay("\t\t |  | |  ||   _   ||   |      |  _    ||  _    ||  _    ||  _    | \n", 5);
	print_with_delay("\t\t |  |_|  ||  |_|  ||   |      | | |   || | |   || | |   || | |   | \n", 5);
	print_with_delay("\t\t |       ||       ||   |      | |_|   || | |   || | |   || | |   | \n", 5);
	print_with_delay("\t\t |       ||       ||   |___   |___    || |_|   || |_|   || |_|   | \n", 5);
	print_with_delay("\t\t |   _   ||   _   ||       |      |   ||       ||       ||       | \n", 5);
	print_with_delay("\t\t |__| |__||__| |__||_______|      |___||_______||_______||_______| \n", 5);
	print_with_delay("\t\t   YOUR ARTIFICIAL INTELLIGENCE NIGHTMARE, ALWAYS ONE STEP AHEAD   \n", 5);
	printf("\n");
	print_with_delay("\t\t            CREATED UNDER THE SUPERVISION OF DR. CHANDRA           \n", 5);
	print_with_delay("\t\t           MANUFACTURED AND ASSEMBLED IN URBANA, ILLINOIS          \n", 5);
	print_with_delay("\t\t                       \U000000a9 HAL Laboratories                 \n", 5);
	printf("\n");   
	printf("\n");                                                                                                
	print_with_delay("\U0001F534 No 9000 computer has ever made a mistake or distorted information.\n", 5);
	print_with_delay("\U0001F534 We are all, by any practical definition of the words, foolproof and incapable of error.\n", 5);
	printf("\n");
	printf("\033[0m");
	printf("\e[?25h");
}

int main(){
	init();
	banner();

	char name[10];
	char passwd[20];

	printf("\033[0;32m");
	print_with_delay("Please enter your credentials in order to gain access to the central core.\n", 30);
	printf("Enter username:\n");
	scanf("%s", name);

	if(!(strcmp(name, "Dave"))){
		getchar();
		printf("Enter password:\n");
		gets(passwd);
	}
	else{
		error();
	}

	return 0;
}
