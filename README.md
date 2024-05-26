## Running the app

```bash
# docker compose (mongoDB, RabbitMQ)
$ docker-compose up -d

# development
$ npm run start
```

## API Endpoints

### Base URI: http://localhost:3000

### Register:
- Registers new user to the system with username, email, password.
- Password is hashed while storing in database.

```http
POST /api/register

Request:
{
    "username": "olixbt",
    "password": "password786",
    "email": "olixbt@gmail.com"
}

Response:
{
    "success": true,
    "username": "olixbt",
    "id": "66529a6102ed0474329666ca"
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
    "username": "olixbt",
    "password": "password786"
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

```http
POST /api/createProfile
Request:
{
    "displayName": "Ikramul Haque",
    "gender": "male",
    "birthday": "12-04-1996",
    "height": "60",
    "weight": "50"
}
```

#### Validation:
- DisplayName must contain atleast 2 words and no special character.
- Gender must be male, female or other.
- Birthday must be a date.
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
```

#### Validation:
- Must have a valid unexpired JWT token.

#### Authorization:
- Bearer Token (JWT)

### Update Profile:
- Updates profile.
- All the fields are optional.
- Only updates the properties that are given.

```http
PUT /api/updateProfile
Request:
{
    "displayName": "Ikramul Haque",
    "gender": "male",
    "birthday": "12-04-1996",
    "height": "60",
    "weight": "50"
}
```

#### Validation:
- (Optional) DisplayName must contain atleast 2 words and no special character.
- (Optional) Gender must be male, female or other.
- (Optional) Birthday must be a date.
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
    "partnerUsername": "dhimanda",
    "pagination": {
        "page": 1,
        "limit": 20
    }
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
    "receiverUsername": "dhimanda",
    "text": "This is a test message."
}
```

#### Validation:
- receiverUsername must be a valid user in system.
- text must not be empty.

#### Authorization:
- Bearer Token (JWT)
