
SINCE THERE ARE NO ASYNC DATABASE/API CALLS IN THE APPLIATION,
ERROR HANDLING CALLLBACKS/PROMISES HAVE BEEN OMITTED TO SIMPLIFY CODE

3rd PARTY LIBRARIES KEPT AT MINIMUM

NodeJS v6.11.1
Ubuntu 16.04

To run server:
    npm run start

To run test:
    npm run test


Booking:
    Book Normal: localhost:9000/user/start?user=batman&pickup=12,13&drop=13,18
    Book Hipster: localhost:9000/user/start?name=joker&pickup=12,13&drop=13,18&type=hipster

    Response
    {
      "car": {
        "car_id": "CarHC",
        "car_location": {
          "x": 12,
          "y": 18
        },
        "waiting": false,
        "hipster": true
      },
      "user": {
        "_id": "joker"
      },
      "pickup": {
        "x": 13,
        "y": 17
      },
      "drop": {
        "x": 5,
        "y": 16
      },
      "booking_id": "i5wqnkcjc2lbgz4yyuehlg14i"
    }


End Trip: 
    localhost:9000/user/end?name=joker&booking_id=i5wqnkcjc2lbgz4yyuehlg14i
    
    Response
    {
      "fare": 135
    }