# Database-Project---Craft-Beer-Website

A database project where we used a beer dataset with reviews and implement a web application with it.


## Overview of Directories
- <b>css</b> - holds style sheets of our web application
- <b>js</b> - the frontend javascript source code of the application, the codes are modularized so that every file is an implementation of a function
- <b>templates</b> - the frontend html code of the application, also modularized into files
<br/><br/>
- <i>dataset.txt</i> - holds a google drive link, within which are the dataset in csv format and create table sql files for the database backend
- <i>combine.js</i> - the backend source code of the web application

## How to Use
1. Run the <i>.sql</i> files to create tables in MySQL
2. Configure the database to your own database in the <i>combine.js</i> file
3. Open terminal and run
    ```bash
    nodemon combine.js
    ```
    This starts the backend server <br/>
    ( Make sure that MySQL is accessible and started )
4. Open ```templates/index.html``` in your browser and enjoy your beer browsing experience!

