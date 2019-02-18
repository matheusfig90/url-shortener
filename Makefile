install:
	npm install

run:
	@docker-compose up --build -d
	npm start
