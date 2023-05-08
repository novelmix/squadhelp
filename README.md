# Exam Project
## Run Locally
Clone the project
```bash
  git clone https://github.com/novelmix/squadhelp.git
```
To deploy this project in DEV mode
```bash
  bash ./start-dev.sh
```
or
```bash
  docker compose --file docker-compose-dev.yaml up --build
```
## Info
|     login     |     email     |    password   |
| ------------- | ------------- | ------------- |
| creator       | ct@test.test  | hello12       |
| customer      | bt@test.test  | hello12       |
| moderator     | mt@test.test  | hello12       |

|     bank      |    card number    |      name     | expiry | cvc |
| ------------- | -------------     | ------------- | ------ | --- |
| creator       | 5136703999532547  | Creator       | 09/24  | 555 |
| customer      | 4111111111111111  | Buyer         | 09/23  | 505 |