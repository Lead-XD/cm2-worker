# cm2-worker

## 4.0.0

### Major Changes

- 23db80a: Add suport for typeform workers

## 3.20.2

### Patch Changes

- d87b0ed: Add logs to closeDBConnection

## 3.20.1

### Patch Changes

- 5aa7640: Fix closeDBConnection functions

## 3.20.0

### Minor Changes

- 87fbf4f: Close DB connection on process exit

## 3.19.0

### Minor Changes

- 1ffa9c4: Updated the README.md file

## 3.18.0

### Minor Changes

- 1d2c7b6: Add command and event filter api to worker package

## 3.17.0

### Minor Changes

- 568e16a: Disable winston-mongodb logger

## 3.16.0

### Minor Changes

- 570fc69: Add postAttachmentToTask API

## 3.15.0

### Minor Changes

- c7d3a75: Add AsanaProject model,add setParentForTask API

## 3.14.1

### Patch Changes

- 37a6881: Fix updateStoryOnTask path

## 3.14.0

### Minor Changes

- 9dc5667: Add updateStoryOnTask API

## 3.13.0

### Minor Changes

- cc5a2fa: Add AIThread model and mongoose document

## 3.12.1

### Patch Changes

- dd3982a: Fix AsanaUser model

## 3.12.0

### Minor Changes

- 75c2773: Add asanaUserDocument in job data

## 3.11.1

### Patch Changes

- 89e0671: Fix Employee mongoose model

## 3.11.0

### Minor Changes

- 918ad38: Add createProjectFromProjectTemplate API to Cloudmat2API sdk

## 3.10.0

### Minor Changes

- a24270c: Add Employee model

## 3.9.0

### Minor Changes

- 76fb3da: Add EMPLOYEE_RECORD project type

## 3.8.0

### Minor Changes

- 80e4dee: Add time logging and employees project types

## 3.7.0

### Minor Changes

- 45eec4e: Add source attribute to exception class and API

## 3.6.0

### Minor Changes

- 0b9e5b1: Add endpoint getCustomFieldByGID to the Cloudmate2API class

## 3.5.1

### Patch Changes

- 7693a2c: Add exception descriptions and exceptionMetaTypes

## 3.5.0

### Minor Changes

- 8dee519: Add getAttachmentByGID to Cloudmate2API

## 3.4.1

### Patch Changes

- c643af9: Fix CloudmateException class

## 3.4.0

### Minor Changes

- 7d4f149: Add a flag "throwInAsana" in CloudmateException class

## 3.3.0

### Minor Changes

- ed1c1d4: Support for multiple project level filters

## 3.2.0

### Minor Changes

- f44f188: Create exception class for Cloudmate2API

## 3.1.0

### Minor Changes

- fc26c0c: Support for Command to have multiple event filters

## 3.0.0

### Major Changes

- f488cd2: Support for project level command configurations added.

## 2.17.1

### Patch Changes

- c3c68cb: Add console.log for exception

## 2.17.0

### Minor Changes

- 9c7eeb0: Add getAllStoriesForTask endpoint in Cloudmate2API class

## 2.16.0

### Minor Changes

- 0cf7d89: Add project and customfield typeahaed APIs

## 2.15.0

### Minor Changes

- 8010af8: Pass cloudmate user and owner user object to worker queues.

## 2.14.0

### Minor Changes

- 2517986: Create and export AsanaComment model

## 2.13.0

### Minor Changes

- 9a84ace: Add sections API endpoints to the Cloudmate2API class
- 325252d: Update Projects model

## 2.12.1

### Patch Changes

- f94045e: Fix saveAllProjectsInWorkspace sdk function

## 2.12.0

### Minor Changes

- 6e60a7a: Add postNotificationOnTask,updateNotificationOnTask,getProjectByGID and saveAllProjectsInWorkspace endpoints to Cloudmat2API class

## 2.11.0

### Minor Changes

- e227a7e: Add logging functionality to cm2-worker

## 2.10.2

### Patch Changes

- 5814da6: Fix AsanaEvent interface and model.

## 2.10.1

### Patch Changes

- 97ba703: Worker should proccess jobs async

## 2.10.0

### Minor Changes

- 6c2c858: Add getCustomFieldSettingsForProject, createTask and createSubTask functions to Cloudmate2API

## 2.9.0

### Minor Changes

- dd52611: Categorize Cloudmate 2 API functions in to resources.

## 2.8.0

### Minor Changes

- 1ac99ba: Package will stop using mongoose default connection. So that the consumer can use mongoose default connection.

## 2.7.0

### Minor Changes

- 1e2e403: Changes made to AsanaTask model

## 2.6.2

### Patch Changes

- d7ba759: https://app.asana.com/0/445384129536859/1205137419101239
- 7794a69: Remove console.logs

## 2.6.1

### Patch Changes

- 634d382: Fix createException function in Cloudmate2API class

## 2.6.0

### Minor Changes

- 678390d: Various fixes

## 2.5.1

### Patch Changes

- abe2242: Fix work logs checks

## 2.5.0

### Minor Changes

- 3515141: Update work logs queue name

## 2.4.0

### Minor Changes

- 879fe4b: Only support full redis url in CloudmateWorker class constructor

## 2.3.0

### Minor Changes

- d3da0c4: Removing scope from package

## 2.2.0

### Minor Changes

- f807d9e: Release as public

## 2.1.0

### Minor Changes

- d51820e: Adding scope to package

## 2.0.0

### Major Changes

- 19bae78: Beta Release
