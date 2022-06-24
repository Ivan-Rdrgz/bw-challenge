
# Running project



## Database Structure

Below is an example of a user stored in lowdb. 
Some fields are optional and some are required. 
```
{
  "users": [
    {
      "_id": "d4e0d20c793a01019204",
      "guid": "82c7aaee-1ffc-4cb6-bf5c-2172c3895dc1",
      "isActive": true,
      "balance": "$38,569,420.31",
      "picture": "https://via.placeholder.com/230x230",
      "age": "",
      "eyecolor": "",
      "name": {
        "first": "ivan",
        "last": "Rodriguez"
      },
      "company": "",
      "email": "ivan@ivan.com",
      "salt": "$2a$10$Ivki1ZnKUpXz3ZK0ZzeNe.",
      "password": "$2a$10$Ivki1ZnKUpXz3ZK0ZzeNe.db00/C9W9sA0Ks603o09yr1jQgeWeoe",
      "phone": "",
      "address": ""
    }
  ]
}
```
## Requirements

* Create a sign up page to allow user to register new login :white_check_mark:
* Login to the app via email and password :white_check_mark:
* Restrict access to valid a User :white_check_mark:
* Once logged in show the details of the user on the page :white_check_mark:
* Authorized users can check their account balance :white_check_mark:
* Allow the user to change their details :white_check_mark:
* lowdb (DB) -> https://github.com/typicode/lowdb :white_check_mark:
* node.js -> http://nodejs.org/ :white_check_mark:

## Bonus Points

* Implememnt password hashing (eg. append a salt onto the password before hash with SHA1) :white_check_mark:
* Fully responsive UI :white_check_mark:
* Unit Tests of the API
* Functional Tests of the UI

<img width="802" alt="Screen Shot 2022-06-24 at 1 29 51 PM" src="https://user-images.githubusercontent.com/24576662/175662864-17dba472-ad54-42e5-9721-98970551342e.png">
<img width="798" alt="Screen Shot 2022-06-24 at 1 25 27 PM" src="https://user-images.githubusercontent.com/24576662/175662497-d8dbb69d-fe39-46cd-b4cc-a34e910d7dd4.png">
<img width="803" alt="Screen Shot 2022-06-24 at 1 26 43 PM" src="https://user-images.githubusercontent.com/24576662/175662501-289433b6-478e-4aad-8442-fe833f56f1d0.png">
<img width="801" alt="Screen Shot 2022-06-24 at 1 27 06 PM" src="https://user-images.githubusercontent.com/24576662/175662507-ad9a273e-956e-446a-93e5-47147fa7861f.png">
