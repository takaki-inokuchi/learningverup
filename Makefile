build:
	npm install
	npm run build

deploy: build
	firebase deploy
