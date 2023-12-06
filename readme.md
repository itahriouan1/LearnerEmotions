# Introduction

LearnerEmotions aims to provide educators with a tool that makes it easier for them to monitor their student's emotions in real time. Additionally, the program can assist in creating a massive data source for several kinds of data science studies that employ the understanding of students' emotions as a factor of enhancing instruction. The most recent research on the importance of comprehending students' emotions in both teaching and learning is presented in the next section. 
LearnerEmotions is a web application that can run on students’ computers and access their frontal cameras in order to analyze their faces and detect their emotions. Figure 1 shows the student’s interface that displays in real time his face and a pie chart of percentages of his emotions during the actual session. These detected emotions are processed on the server side and saved in a database related to multiple other parameters like the concerned student, course title, course nature and many others. This application is primarily intended for teachers who want to analyze the emotions of their students during their course sessions, practical work or any type of teaching activity. It allows teachers to view their students' emotions in real time in simple mode or even in the form of dashboards.

![image](https://github.com/itahriouan1/LearnerEmotions/assets/5239947/c733f800-8718-4ee6-831c-69b7c9b83f90)

*Figure 1:  Interface of student’s emotions recording and displaying in real-time*

# How to use

## for teacher
1. Create an account and validate by email.
2. Create groups of students.
3. Invite Students to the groups (one by one or based on a .CSV file).
4. Students have to accept the invitation to join the group.
5. Create a session (the equivalent of a real session even face to face or remote session).
6. Specify the group concerned by the session.
7. In the beginning of the real session, teacher have to start the session on LearnerEmotions to indicate the beginning of emotions detection and registration.
8. Students have to enter to LearnerEmotions on this specific session and accept the access to the camera.
9. Teacher can visualize the emotions of students in real time in the form of charts (figures 2 and 3).

![image](https://github.com/itahriouan1/LearnerEmotions/assets/5239947/0a52a933-a6b2-4e8c-856e-2cbaaa948c15)

*Figure 2:  Pie chart of a student’s emotions during a session* 

![image](https://github.com/itahriouan1/LearnerEmotions/assets/5239947/97b28cb9-57e8-40c8-a9c5-e19792f0c190)

*Figure 3:  Variation curve of a student’s emotions during a session*

## for student

1. Creates an account and validate it by email.
2. Receives invitation to join a group.
3. Accepts or reject the invitation.
4. In the beginning of the real session, student enter to this specific session and accept the access to the camera.
5. The student can visualize his detected emotions in real time (figure 1) on his displayed video and also in the form of charts.

# How to setup
## Configuration

1. Create a MongoDB database and email account specific to the application.

2. Add environment variables to the config.env File in the following location:

> \backend\config\config.env

This is an example of the .env file that uses cloudinary cloud as a host and mailtrap as smtp server:

> PORT = 4000
> NODE_ENEV = DEVELOPMENT

> DB_LOCAL_URI = mongodb+srv://user:password@host/DB-Expressions
> DB_URI = mongodb+srv://user:password@host/DB-Expressions

> JWT_SECRET = {secret key for secured exchange}
> JWT_EXPIRES_TIME = 7d
> COOKIE_EXPIRES_TIME = 7

> CLOUDINARY_CLOUD_NAME = {CLOUDINARY_CLOUD_NAME}
> CLOUDINARY_API_KEY = {CLOUDINARY_API_KEY}
> CLOUDINARY_API_SECRET = {CLOUDINARY_API_SECRET}

> SMTP_HOST = smtp.mailtrap.io
> SMTP_PORT = 2525
> SMTP_EMAIL = {SMTP_EMAIL}
> SMTP_PASSWORD = {SMTP_PASSWORD}
> SMTP_FROM_EMAIL = {email to use}
> SMTP_FROM_NAME = Expression App

## Project Setup

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the backend server in development mode:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the frontend server with nodemon:
   ```bash
   nodemon start
   ```

## Project Information

### Node.js Version

This project is developed and tested with Node.js version 16.13.0. Please ensure you have this version of Node.js installed before running the project.

To check your Node.js version, you can run:

```bash
node -v
```
