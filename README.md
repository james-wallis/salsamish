# Salsa Mish
This project is made up of two applications
1. Website (Frontend that users will see)
2. Admin (Manages the back end for the Salsa Mish admin to add events/employees that dynamically show up on the website)

## Goal for Salsa Mish
1. Take weight off admin's shoulders as they currently manually update the pages each few weeks with no events - each time having to create an image with the employees for different weeks
2. Refresh the design of the website, due to technology limitations certain aspects of the current website, such as a responsive design for mobile, were hindered by the technology used to create it.
3. Enhance the SEO, currently the site is made up predominately by images but the new site would use mostly HTML and CSS to achieve the same visuals

## Technologies used

## Running locally
To run locally you can `cd` into either directory's and run `npm run dev`.

### Website
Need to set a few environment variables:
```Javascript
DB_HOSTNAME='' // hostname for MongoDB (defaults to localhost)
DB_USERNAME='' // username for MongoDB
DB_PASSWORD='' // password for MongoDB
```


### Admin
Need to set a few environment variables:
```Javascript
DB_HOSTNAME='' // hostname for MongoDB (defaults to localhost)
DB_USERNAME='' // username for MongoDB
DB_PASSWORD='' // password for MongoDB
AWS_ACCESS_KEY='' // Access token for AWS account with read/write access to an S3 bucket
AWS_SECRET_KEY='' // Access token for AWS account with read/write access to an S3 bucket
AUTH_SECRET='' // A secret token used for authentication
```