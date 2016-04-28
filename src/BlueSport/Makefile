
gitadd:
	git add modules/*.js screens/*.js styles/*.js parts/*.js 
	git add smallparts/*.js bigparts/*.js libs/*.js 
	git add messenger/*.js
	git add index.ios.js index.android.js 
	git add Makefile
	git status

clean:
	rm -rf *.o *~

countlines:
	find ./smallparts -name '*.js' | xargs wc -l
	find ./messenger -name '*.js' | xargs wc -l
	find ./modules -name '*.js' | xargs wc -l
	find ./screens -name '*.js' | xargs wc -l
	find ./styles -name '*.js' | xargs wc -l
	find ./libs -name '*.js' | xargs wc -l
	find ./bigparts -name '*.js' | xargs wc -l
	find ./parts -name '*.js' | xargs wc -l
	find ./smallparts ./messenger ./modules ./screens ./styles ./libs ./bigparts ./parts -name '*.js' | xargs wc -l
