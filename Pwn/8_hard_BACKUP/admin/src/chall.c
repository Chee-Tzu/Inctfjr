#include <stdlib.h>
#include <stdio.h>
void init(){
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);
}

void print_table(char chars[]){
    for(int i=0;i<10;i++){
        printf("|");
        printf("%c", chars[i]);
    }
    puts("|");
}

void banner(){
    puts("----------------------------");
    puts("Choices: ");
    puts("1 : update the index");
    puts("2 : show index");
    puts("3 : print entire array");
    puts("n : exit");
    puts("----------------------------");
}

int len = 10;
int main(){
    init();    
    long long ind;
    char ch, characters[10] = {'0','1','2','3','4','5','6','7','8','9'};
    print_table(characters);
    while(1==1){
        banner();
        scanf("%c", &ch);
        getchar();
        if(ch == '1'){
            printf("index: ");
            scanf("%lli", &ind);
            getchar();
            if(ind >= 10){
                puts("Out of bounds, nice try...");
                continue;
            }
            printf("char: ");
            scanf("%c", &characters[ind]);
            getchar();
        }
        else if(ch == '2'){
            printf("index: ");
            scanf("%lli", &ind);
            getchar();
            if(ind >= 10){
                puts("Out of bounds, nice try...");
                continue;
            }
            printf("char: ");
            printf("%c\n", characters[ind]);
        }
        else if(ch == '3'){
            print_table(characters);
        }
        else if(ch == 'X'){
            printf("Secret option: ");
            fgets(characters, len, stdin);
        }
        else{
            return 1;
        }
    }   
}