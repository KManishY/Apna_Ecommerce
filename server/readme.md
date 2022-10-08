# api

## Routes

### Admin

-   first signup with the same id which is give by developers
-   when login it gerate a token which is expire in some time after
-   admin can create delete the products which is present in database
-   admin can see the how many user present in their website
-   admin can see what user order
-   admin can see is order delevired or not

### user

-   first user have to signup/ register their account
-   with same username and password user can login anytime and see that what is added in thier cart
-   user can filter the acc. to their need
-   user will able to sort the item acc to price and raiting

### user login/Signup

### user dashboard

### admin dashboard

## Product Route

-   filter part done in this route
-   sorting part (pending)
- add to cart 


## userauth route

````        
detail user have to fill at the time of registration
            name,
			email,
			password: hash,
			username,
			mobile
            
````
#### Register
- At the time user register the password is increpted before stored in database

#### Login 




###  posting all data to cart and get all using userDashboard

- action => postCartData => payload= [data]
