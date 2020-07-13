# Nest Backend

Nest Backend is the module that manages the business logic of the application, through which both the fulfilment staff and health worker can processes commands to be carry out.

### App Stack

- PostgreSQL 10.13
- Python 3.7 & Django 3.0
- Django Rest Framework 3.10

### Prerequisites

These instructions assume that you are a Dev, Ops or DevOps person familiar with pipenv and shell scripting.

- Pipenv
  - `pipenv` is the virtual environment of choice.
- Database
  - `catalog` is the name of the postgres db. I'll advise you create it manually.
- Port `3001` should be available on your machine.

### Setup

First of all, unzip the the project folder (zipline) and `cd` into the root directory from your terminal, by running the code below:

<pre>$ cd zipline</pre>

Once you are in the root directory, the next step is to start the pipenv virtual environment, by running the code below:

<pre>$ pipenv shell</pre>

Once the virtual environment is created then, you install all the environment dependencies, by running the code below:

<pre>
$ pipenv install
</pre>

Ok, now, let us go to the django root folder, by running the code below:

<pre>
$ cd nest
</pre>

Great! It's good practice to make and run migrations manually, here's how:

<pre>
$ python manage.py makemigrations
$ python manage.py migrate
</pre>

And finally, we need to put you in charge of your django instance and call it a day!

<pre>
$ python manage.py createsuperuser --email your@email-address --username your-username
</pre>

Now, you can run the django app, by running the code below:

<pre>$ python manage.py runserver 127.0.0.1:3001</pre>

Good job! Let's go the `react` subfolder and setup the frontend as well, by running the code below:

<pre>
$ cd nest/frontend/
</pre>

If the `react` application has ready been setup then, you can enter the url below to access the application. Enjoy!

<pre>http://localhost:3001</pre>
