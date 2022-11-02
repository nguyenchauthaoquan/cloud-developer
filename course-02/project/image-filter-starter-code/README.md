# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. [Covered in the course]
2. [The RestAPI Backend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-restapi), a Node-Express server which can be deployed to a cloud service. [Covered in the course]
3. [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images. [Your assignment]

## Tasks

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Input to test
#### Image Url
1. https://th.bing.com/th/id/R.42038ff03c4f495b446d651e57b7da55?rik=bg94Iw8tIc4QLQ&pid=ImgRaw&r=0
2. https://th.bing.com/th/id/R.433a1fe398e2e5cd11ca3417ea3fd26c?rik=sz5ApcCgojcrsg&riu=http%3a%2f%2fchangeidentity.org%2fwp-content%2fuploads%2f2015%2f07%2fidentity.jpg&ehk=iTXHnhWQXk3IGk9goQYq7NtSbDMWkZULgIMaNBM3DIc%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1
3. https://ded9.com/wp-content/uploads/2021/05/Redux-Framework.jpg
4. https://www.motortrend.com/uploads/sites/11/2014/04/2014-ferrari-laferrari-front-three-quarters-motion-11.jpg?fit=around%7C875:492
5. https://automacha.com/wp-content/uploads/2019/02/Lamborghini-Urus-12-620x350.jpg
6. https://1cars.org/wp-content/uploads/2015/03/Lamborghini-Veneno-800x500.jpg
7. https://www.carscoops.com/wp-content/uploads/2021/07/Lamborghini-Gallardo-1a.jpg
### Elastic Beanstalk URL
1. http://image-filter-service.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://th.bing.com/th/id/R.42038ff03c4f495b446d651e57b7da55?rik=bg94Iw8tIc4QLQ&pid=ImgRaw&r=0
2. http://image-filter-service.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://th.bing.com/th/id/R.433a1fe398e2e5cd11ca3417ea3fd26c?rik=sz5ApcCgojcrsg&riu=http%3a%2f%2fchangeidentity.org%2fwp-content%2fuploads%2f2015%2f07%2fidentity.jpg&ehk=iTXHnhWQXk3IGk9goQYq7NtSbDMWkZULgIMaNBM3DIc%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1
3. http://image-filter-service.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://ded9.com/wp-content/uploads/2021/05/Redux-Framework.jpg
4. http://image-filter-service.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://www.motortrend.com/uploads/sites/11/2014/04/2014-ferrari-laferrari-front-three-quarters-motion-11.jpg?fit=around%7C875:492
5. http://image-filter-service.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://automacha.com/wp-content/uploads/2019/02/Lamborghini-Urus-12-620x350.jpg
6. http://image-filter-service.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://1cars.org/wp-content/uploads/2015/03/Lamborghini-Veneno-800x500.jpg
7. http://image-filter-service.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://www.carscoops.com/wp-content/uploads/2021/07/Lamborghini-Gallardo-1a.jpg
### Create a new endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query parameter to download an image from a public URL, filter the image, and return the result.

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts`  file.

```typescript
import {filterImageFromURL, deleteLocalFiles} from './util/util';
```

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

## Stand Out (Optional)

### Refactor the course RESTapi

If you're feeling up to it, refactor the course RESTapi to make a request to your newly provisioned image server.

### Authentication

Prevent requests without valid authentication headers.
> !!NOTE if you choose to submit this, make sure to add the token to the postman collection and export the postman collection file to your submission so we can review!

### Custom Domain Name

Add your own domain name and have it point to the running services (try adding a subdomain name to point to the processing server)
> !NOTE: Domain names are not included in AWS’ free tier and will incur a cost.
