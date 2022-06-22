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

| Username  | Password | ID                                   |
| --------- | -------- | ------------------------------------ |
| jschröder | test1234 | a7f6550d-80ce-4bc2-b6e9-434c014c8a8b |
| mvogt     | test1234 | d1822a8d-7951-4fae-beee-25feee17c6af |
| mkönig    | test1234 | 689569fd-2283-4e32-8898-b94e77d8a817 |
| swexler   | test1234 | 45215f7d-e7cd-47d4-a27c-6734b8f1424c |
| pbürger   | test1234 | c3540aaa-728d-441e-8898-f5c157d7f941 |
| skappel   | test1234 | 79126fa6-4323-4376-8da8-46ec6dedbe02 |
| kfischer  | test1234 | ed129ff3-5732-4d11-9ba6-39a53efd7386 |
| tkortig   | test1234 | eab56c5a-f5be-4c86-8b1d-e2be8eeb80da |
| ffreytag  | test1234 | 3326d733-31fb-4313-8070-68c705accbd5 |
| jfiedler  | test1234 | 03419e71-b4b3-43bc-ad9c-166b7912bd6e |

### Doctors

| Username   | Password | ID                                   |
| ---------- | -------- | ------------------------------------ |
| damberg    | test1234 | 145a1e9b-64c5-4831-b3ac-ef12a73eb90e |
| hbierwirth | test1234 | 3e10f956-632d-4c0f-abfe-cbe529731600 |
| eguhlmann  | test1234 | 16803954-bd42-40e1-8fba-a847f9ba8f78 |
| fziebula   | test1234 | 58852ee4-2a60-4101-80dc-61e9497aaded |
| tfeilscher | test1234 | a676675e-0a8a-4321-9703-37be0d79678c |
| jsteinberg | test1234 | 2078949c-dcb8-41cd-a26e-fe0925c33f5c |
| mböhnke    | test1234 | 0f6d79a3-9930-43ec-8f6c-51d5b28f7e29 |
| mhfricke   | test1234 | 46a64ab9-253e-4d94-a26a-ddd4fed31b2f |
| dheitmann  | test1234 | 590d3869-5d07-4cca-96d4-60557ace64c6 |
| dessers    | test1234 | abb1f05f-0c08-49b5-aeab-2c887fc22c6e |
| gbroß      | test1234 | 99e21648-ece5-4ff6-be65-865614c7cba9 |
| mmeffert   | test1234 | f232afc4-746e-4640-b455-e7af1972bff2 |

### Representatives

| Username | Password | E-Mail | ID   |
| -------- | -------- | ------ | ---- |
|          |          |        |      |
|          |          |        |      |
|          |          |        |      |



