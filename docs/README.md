# cm2-worker (NPM Package)

[NPM Package](https://www.npmjs.com/package/cm2-worker)

## Overview

`cm2-worker` is an internal NPM package that provides a standardized framework for building worker services within the Cloudmate ecosystem. It facilitates the implementation of the worker side of the Conductor/Worker pattern.

## Purpose

*   Provides abstractions for connecting to the BullMQ command queue used by the `Conductor`.
*   Simplifies the process of defining and executing commands received from the queue.
*   Offers convenient access to the `app.cloudmate.works` API client.
*   Bundles shared resources like Mongoose models, TypeScript interfaces, constants, and common utility classes.

## Technologies

*   **Language:** TypeScript
*   **Runtime:** Node.js
*   **Queueing:** BullMQ (with Redis via ioredis)
*   **Database:** MongoDB (with Mongoose)
*   **Logging:** Winston
*   **HTTP Client:** Axios

## Notes

*   This is not a standalone service but a library consumed by actual worker implementations (e.g., `Primary worker`, `Cloudmate-Finance`).
*   It promotes code reuse and consistency across different worker services. 