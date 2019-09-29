# distance-api
Backend focused assignment submission for TechLadies Bootcamp #5.

### API Endpoints:
### /distance

__*Method:*__

`GET`

__*Description:*__ 

Returns JSON data about the distance travelled and total fare between the given bus stops for the given bus service and route. Valid token must be provided to access the endpoint.

__*Query string parameters:*__

Parameter | Required/Optional | Description 
--------- | ----------------- | -----------
bus | Required | Bus service number.
dir | Required | Direction in which bus is travelling; can be 1 or 2.
start | Required | Starting bus stop code.
end | Required | Ending bus stop code. 

__*Header parameters:*__

Parameter | Required/Optional | Description
--------- | ----------------- | -----------
x-access-token | Required | Authentication token. 

__*Example of response body:*__
```
{
  "ServiceNo": "238",
  "Direction": "1",
  "StartingBusCode": "52009",
  "EndingBusCode": "52009",
  "DistanceTravelledInKm": 6.6,
  "Fare": 1.5
}
```

<hr/>

### /register

__*Method:*__

`POST`

__*Description:*__ 

Returns JSON data containing the authentication token.

__*Body parameters:*__

Parameter | Type | Required/Optional | Description
--------- | ---- | ----------------- | ----------
Name | String | Required | Name of user.
Email | String | Required | User email.
Password | String | Required | User password.

__*Example of response body:*__
```
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsw205cCI6IkpXVCJ9.eyJpZCI6IjVkOTA5ZWMwNDAwMTxhODf1Njk2ODFiZCIsImlhdCI6MTU2OTc1ODkxMiwiZXhwqjoxNTY001Q1MzEyfQ.wUCcBcX4bpe9p4TR7v78j_mh4poqryjsv8wk8yiXCL4"
}

// token is fictional and not valid
```

<hr/>

### /login

__*Method:*__

`POST`

__*Description:*__ 

Returns JSON data containing the authentication token.

__*Body parameters:*__

Parameter | Type | Required/Optional | Description
--------- | ---- |------------------ | ----------
Email | String | Required | User email.
Password | String | Required | User password.

__*Example of response body:*__
```
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsw205cCI6IkpXVCJ9.eyJpZCI6IjVkOTA5ZWMwNDAwMTxhODf1Njk2ODFiZCIsImlhdCI6MTU2OTc1ODkxMiwiZXhwqjoxNTY001Q1MzEyfQ.wUCcBcX4bpe9p4TR7v78j_mh4poqryjsv8wk8yiXCL4"
}

// token is fictional and not valid
```

<hr/> 

### /me

__*Method:*__

`GET`

__*Description:*__ 

Returns JSON data about the user. 

__*Header parameters:*__

Parameter | Required/Optional | Description
--------- | ----------------- | -----------
x-access-token | Required | Authentication token. 

__*Example of response body:*__
```
{
  "_id": "5aqp21d02f6b1d303d6845jk",
  "name": "Alice",
  "email": "alice@xmail.com",
  "__v": 0
}

// user details are fictional 
```

