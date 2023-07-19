# Hanamaru CreditCard Validator

## A simple credit card validator

### How to use

1. Clone this repository
2. npm install
3. npm start
4. access localhost:3000 or ip:3000
5. POST to /credit/verify with a JSON body containing the credit card number
6. Content-Type must be application/json
7. {
  "cname": "Yoshiki Onaga",
  "cno": "4539692580891212",
  "edate": "11/28"
}
