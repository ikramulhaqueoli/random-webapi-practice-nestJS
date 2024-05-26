## Running the app

```bash
# docker compose (mongoDB, RabbitMQ)
$ docker-compose up -d

# development
$ npm run start
```

## API Endpoints

### Base URI: http://localhost:3000
### Swagger UI: http://localhost:3000/swagger

### Register:
- Registers new user to the system with username, email, password.
- Password is hashed while storing in database.

```http
POST /api/register

Request:
{
    "username": "oli.xbt",
    "password": "Amixbt1!",
    "email": "oli.xbt@gmail.com"
}

Response:
{
    "success": true,
    "username": "oli.xbt",
    "id": "665326c767f489169d214fba"
}
```

#### Validation:
- Username must be unique.
- Email must be unique.
- Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character

#### Authorization:
- No Authorization

### Login:
- Gives a JWT token in the response when credentials are valid.

```http
POST /api/login

Request:
{
    "username": "oli.xbt",
    "password": "Amixbt1!"
}

Response:
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9saS54YnQiLCJpYXQiOjE3MTY3MjU0ODMsImV4cCI6MTcxNjcyOTA4M30.4aYHAZ9_cTlGLy1t7ZAmMrMeFJ0hSAgDZ-srbAcVioI"
}
```

#### Validation:
- Username must be unique.
- Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character
- Password must be atleast 6 characters long.

#### Authorization:
- No Authorization

### Create Profile:
- Create Profile for the logged-in user to the system.
- Zodiac and Horoscope is calculated if birthday is given.

```http
POST /api/createProfile
Request:
{
    "displayName": "Ikramul Haque",
    "gender": "male",
    "birthday": "12-04-1996",
    "height": 60,
    "weight": 50
}

Reponse:
{
    "displayName": "Ikramul Haque",
    "gender": "male",
    "birthday": "1998-01-28T18:00:00.000Z",
    "height": 60,
    "weight": 50,
    "_id": "6653284c529ee3501d5d21ec",
    "username": "oli.xbt",
    "zodiac": Tiger,
    "horoscope": "Sagittarius",
    "__v": 0
}
```

#### Validation:
- DisplayName must contain atleast 2 words and no special character.
- Gender must be male, female or other.
- Birthday must be a date and ##Age must be atleast 13##.
- Height must be a number.
- Weight must be a number.
- Must have a valid unexpired JWT token.

#### Authorization:
- Bearer Token (JWT)

### Get Profile:
- Gets the profile information of the logged-in user.

```http
GET /api/getProfile

Request:
{
}

Response:
{
    "_id": "6653284c529ee3501d5d21ec",
    "displayName": "Ikramul Haque",
    "gender": "male",
    "birthday": "1998-01-28T18:00:00.000Z",
    "height": 60,
    "weight": 50,
    "username": "oli.xbt",
    "zodiac": "Tiger",
    "horoscope": "Sagittarius",
    "__v": 0
}
```

#### Validation:
- Must have a valid unexpired JWT token.

#### Authorization:
- Bearer Token (JWT)

### Update Profile:
- Updates profile.
- All the fields are optional.
- Only updates the properties that are given.
- Zodiac and Horoscope is updated when birthday is updated.

```http
PUT /api/updateProfile
Request:
{
    "displayName": "Ikramul Haque",
    "gender": "male",
    "birthday": "01-28-1998",
    "height": 40,
    "weight": 30
}
Response:
{
    "_id": "6653284c529ee3501d5d21ec",
    "displayName": "Ikramul Haque",
    "gender": "male",
    "birthday": "1998-01-27T18:00:00.000Z",
    "height": 40,
    "weight": 30,
    "username": "oli.xbt",
    "zodiac": "Ox",
    "horoscope": "Aquarius",
    "__v": 0
}
```

#### Validation:
- (Optional) DisplayName must contain atleast 2 words and no special character.
- (Optional) Gender must be male, female or other.
- (Optional) Birthday must be a date and ##Age must be atleast 13##.
- (Optional) Height must be a number.
- (Optional) Weight must be a number.
- (Optional) Must have a valid unexpired JWT token.

#### Authorization:
- Bearer Token (JWT)

### View Messages:
- Get paginated messages with partnerUsername of logged-in user.

```http
POST /api/viewMessages
Request:
{
    "partnerUsername": "olixbt",
    "pagination": {
        "page": 1,
        "limit": 20
    }
}

Response:
{
    "data": [
        {
            "_id": "66532992529ee3501d5d21f4",
            "receiverUsername": "olixbt",
            "text": "This is a test message.",
            "sentAt": "2024-05-26T12:22:42.051Z",
            "senderUsername": "oli.xbt",
            "__v": 0
        }
    ],
    "totalMessages": 1,
    "totalPages": 1,
    "currentPage": 1
}
```

#### Validation:
- partnerUsername must be a valid user in system.
- Pagination is Optional.
- Pagination.page must not be 0.
- Pagination.limit must not be 0.

#### Authorization:
- Bearer Token (JWT)

### Send Message:
- Saves message to the database.
- Send notification through the RabbitMQ queue.

```http
POST /api/sendMessage
Request:
{
    "receiverUsername": "olixbt",
    "text": "This is a test message."
}
Response:
{
    "success": true,
    "message": {
        "receiverUsername": "olixbt",
        "text": "This is a test message.",
        "_id": "66532992529ee3501d5d21f4",
        "sentAt": "2024-05-26T12:22:42.051Z",
        "senderUsername": "oli.xbt",
        "__v": 0
    }
}
```

#### Validation:
- receiverUsername must be a valid user in system.
- text must not be empty.

#### Authorization:
- Bearer Token (JWT)
