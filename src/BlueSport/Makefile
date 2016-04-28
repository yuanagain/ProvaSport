
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
	find ./smallparts ./messenger ./modules ./screens ./styles ./libs ./bigparts ./parts -name '*.js' | xargs wc -l
