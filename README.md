# Step-Up Authentication with Keycloak and the Open Policy Agent

Proof-of-Concept project assignments to the module Security and Web-Applications from Computer Science and Media course of study at Virtuellen Fachhochschule (VFH).



## Topic & Research Question

The overall task is the implementation of a proof of concept for using step-up authentication with OAuth using Keycloak and the Open Policy Agent (OPA).
The "research question" behind this task is to clarify how step-up authentication with OAuth can enable secure and user-friendly access to sensitive data. 
To demonstrate this on a concrete application scenario, we have chosen the electronic patient record management as a example in a very abstract and hence simplified version.



## Prerequisites

In order to setup and run the PoC environment via docker, make sure you have both Docker (i.e. via [Docker Desktop](https://www.docker.com/products/docker-desktop/)) and [Docker-Compose](https://docs.docker.com/compose/install/compose-desktop/) locally installed on your machine. Please note, Docker-Compose will be automatically installed with Docker-Desktop on macOS and Windows.

To setup and boot the overall container setup, just run the following command in the checked-out repository's root directory:

```bash
docker-compose up
```



## URLS & Accounts

### Keycloak

The Keycloak can be access via http://localhost:8181

| Username     | Password | Bemerkung                                                   |
| ------------ | -------- | ----------------------------------------------------------- |
| admin        | admin    | Required to access the Admin Console                        |
| test-patient | test     | Login as sample user "Test Patient" with the role *patient* |

### Mongo-Express

The browser based MongoDB Management Software "Mongo-Express" can be accessed via http://localhost:8081

| Username     | Password | Bemerkung                                                    |
| ------------ | -------- | ------------------------------------------------------------ |
| epa-poc-user | test1234 | Required to login and access the database [*epa-poc*](http://localhost:8081/db/epa-poc/) |

## Sample Data

### Patients

| Username | Password | E-Mail | ID   |
| -------- | -------- | ------ | ---- |
|          |          |        |      |
|          |          |        |      |
|          |          |        |      |

### Doctors

| Username | Password | E-Mail | ID   |
| -------- | -------- | ------ | ---- |
|          |          |        |      |
|          |          |        |      |
|          |          |        |      |

### Representatives

| Username | Password | E-Mail | ID   |
| -------- | -------- | ------ | ---- |
|          |          |        |      |
|          |          |        |      |
|          |          |        |      |



