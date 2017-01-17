gitadd:
	git add ./imports/*.jsx ./server/*.js ./client/*.js
	git add package.json
	git add Makefile
	git status

clean:
	rm -rf *.o *~

countlines:
	find ./imports -name '*.js' | xargs wc -l
	find ./server -name '*.js' | xargs wc -l
	find ./client -name '*.js' | xargs wc -l
	find ./public -name '*.js' | xargs wc -l
	find ./imports ./server ./client ./public -name '*.js' | xargs wc -l