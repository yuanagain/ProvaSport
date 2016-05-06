gitadd:
    git add modules/*.js app/*.js styles/*.js public/*
    git add Makefile
    git status

clean:
    rm -rf *.o *~

countlines:
    find ./app/constants -name '*.js' | xargs wc -l
    find ./app/modules -name '*.js' | xargs wc -l
    find ./app/parts -name '*.js' | xargs wc -l
    find ./app/styles -name '*.js' | xargs wc -l
    find ./app/unused -name '*.js' | xargs wc -l
    find ./app -name '*.js' | xargs wc -l



