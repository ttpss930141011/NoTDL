<div align="center">
  <img src="./packages/main/assets/icon.png" width="219" alt="project-logo">
</div>
<h1 align="center">NoTDL</h1>
<p align="center">
    <em>Boost Your Productivity and Well-being with Intelligent Task Management</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/ttpss930141011/NoTDL?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/ttpss930141011/NoTDL?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/ttpss930141011/NoTDL?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/ttpss930141011/NoTDL?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
    <img src="https://img.shields.io/badge/Vue 3-4FC08D.svg?style&logo=vuedotjs&logoColor=white" alt="Vue.js" />
    <img src="https://img.shields.io/badge/Electron-47848F.svg?style&logo=electron&logoColor=white" alt="electron" />
    <img src="https://img.shields.io/badge/Vuetify-1867C0.svg?style&logo=Vuetify&logoColor=white" alt="Vuetify" />
    <img src="https://img.shields.io/badge/Vitest-6E9F18.svg?style&logo=Vitest&logoColor=white" alt="Vitest" />
    <img src="https://img.shields.io/badge/TypeORM-FE0803.svg?style&logo=typeorm&logoColor=white" alt="TypeORM" />
    <img src="https://img.shields.io/badge/SQLite-003B57.svg?style&logo=sqlite&logoColor=white" alt="TypeORM" />
    <img src="https://img.shields.io/badge/LangChain-1C3C3C.svg?style&logo=langchain&logoColor=white" alt="LangChain" />
    <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style&logo=Prettier&logoColor=black" alt="Prettier" />
    <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
</p>

## Overview

**NoTDL** is a AI-powered to-do list app designed to boost productivity and mental well-being. It prioritizes tasks automatically based on
urgency, importance, and cognitive load, helping users manage their responsibilities efficiently while maintaining a
balanced mental state.

## Infrastructure

This project is structured based on
the [Vite Electron Builder Boilerplate](https://github.com/cawa-93/vite-electron-builder), a template for secure
electron applications, written following the latest safety requirements, recommendations, and best practices. Under the
hood, it leverages [Vite](https://github.com/vitejs/vite/), a next-generation blazing fast bundler,
and [electron-builder](https://github.com/electron-userland/electron-builder) for packaging.

## Repository Structure

```sh
└── NoTDL/
    ├── .github
    │   ├── FUNDING.yml
    │   ├── ISSUE_TEMPLATE
    │   ├── renovate.json
    │   └── workflows
    ├── LICENSE
    ├── README.md
    ├── buildResources
    │   ├── .gitkeep
    │   ├── icon.icns
    │   └── icon.png
    ├── contributing.md
    ├── electron-builder.yml
    ├── package-lock.json
    ├── package.json
    ├── packages
    │   ├── main
    │   ├── preload
    │   └── renderer
    ├── scripts
    │   ├── update-electron-vendors.js
    │   └── watch.js
    ├── tests
    │   └── e2e.spec.ts
    ├── types
    │   └── env.d.ts
    └── vitest.config.js
```

## Modules

<details><summary>.</summary>

| File                                                                                             | Summary                                                                                                                                                                                                                                                                                                      |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [package-lock.json](https://github.com/ttpss930141011/NoTDL/blob/master/package-lock.json)       | This code file in the NoTDL repository is responsible for managing the build resources necessary for the project. It includes icons in different formats essential for the applications user interface. These resources play a crucial role in delivering a visually appealing and cohesive user experience. |
| [vitest.config.js](https://github.com/ttpss930141011/NoTDL/blob/master/vitest.config.js)         | Defines global end-to-end testing configuration in the tests folder. Specifies test file search scope and adjusts timeouts to optimize the testing process. Intended for enhancing e2e testing efficiency in the Vite project.                                                                               |
| [package.json](https://github.com/ttpss930141011/NoTDL/blob/master/package.json)                 | Defines scripts for building, testing, and maintaining Electron app components. Manages Vue, TypeScript, linting, and test configurations. Handles dependencies for development and production environments, ensuring efficient code management and reliable software releases.                              |
| [electron-builder.yml](https://github.com/ttpss930141011/NoTDL/blob/master/electron-builder.yml) | Defines output and build resource directories, specifying files to include in packaging for Linux deb target in the NoTDL Electron app.                                                                                                                                                                      |

</details>

<details><summary>packages.renderer</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                                                  |
|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [vite.config.js](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/vite.config.js)       | Defines Vite config for the renderer package, setting environment mode, aliases, and build options. Plugins include Vue for framework integration and auto-expose for importing modules. Sharply focuses on configuration and build settings for seamless bundle generation and testing. |
| [vuetify-plugin.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/vuetify-plugin.ts) | Enables Vuetify integration in the renderer package. Initializes Vuetify with custom components and directives. Configures styles and icons for a consistent UI experience. Enhances rendering capabilities of the application.                                                          |
| [tsconfig.json](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/tsconfig.json)         | Defines TypeScript compiler options and custom module paths for the renderer package, ensuring strict type checking and compatibility with Vue files. Excludes test files from compilation to maintain code integrity in the open-source Electron application architecture.              |
| [.eslintrc.json](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/.eslintrc.json)       | Defines browser-specific ESLint rules for Vue3 in the renderer package. Enables Vue3 linting with TypeScript support and disables conflicting rules for compatibility with Prettier. Maintains code quality and consistency while adhering to Vue.js best practices.                     |
| [index.html](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/index.html)               | Defines HTML template for NoTDL app with key meta tags, viewport settings, CSS link, and TypeScript module script. Displays NoTDL title and mounts app to app element in body.                                                                                                           |

</details>

<details><summary>packages.renderer.src</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                             |
|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [App.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/App.vue)   | Manages app theming and layout with dynamic switching.-Controls sidebar visibility based on interactions.-Updates theme between light and dark modes.-Dynamically adjusts main container height.-Utilizes custom scrollbar styling for enhanced UI. |
| [index.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/index.ts) | Enables rendering a Vue application with Vuetify plugin in the parent repositorys architecture. Uses the App.vue component to create and mount the app for user interaction.                                                                        |

</details>

<details><summary>packages.renderer.src.types</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                 |
|--------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [task.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/types/task.d.ts) | Task` class encapsulates task details. `GetAllTasks` fetches all tasks, `GetAllTaskTitles` retrieves task titles, and `CreateTask` adds a new task. Contributes to the task management functionality in the repository. |
| [week.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/types/week.ts)     | Defines structures to represent a week with days and activities, aiding in calendar visualization for the NoTDL app.                                                                                                    |

</details>

<details><summary>packages.renderer.src.styles</summary>

| File                                                                                                    | Summary                                                                                  |
|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| [index.css](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/styles/index.css) | Defines global styling variables for the Swiper navigation in the renderer packages CSS. |

</details>

<details><summary>packages.renderer.src.layouts</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                                    |
|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [HeadBar.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/layouts/HeadBar.vue) | Implements a dynamic HeadBar layout with title and slot-based triggers. Uses Vue composition API to manage a WeekSwiper components instance and dynamically update the header title based on WeekSwipers state. Complements the parent repository's frontend architecture. |
| [SideBar.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/layouts/SideBar.vue) | Implements a sidebar layout with dynamic drawer functionality and links in the Vue component. Manages drawer state and color settings using reactive properties. It enhances user navigation experience within the application interface.                                  |

</details>

<details><summary>packages.renderer.src.hooks</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                                |
|----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [useWeek.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/hooks/useWeek.ts) | Enables dynamic week navigation and day selection for a calendar interface. Manages week objects with days, updates selected day properties, handles navigation to previous and next weeks, and dynamically adds new weeks when reaching array limits. |

</details>

<details><summary>packages.renderer.src.components</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                            |
|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ReactiveHash.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/components/ReactiveHash.vue)         | Enables dynamic hashing of user input in a Vue component using Nodes crypto library. Supports real-time updates to display both the original and hashed values. Critical for enhancing data security features within the renderer package of the repository.       |
| [CreateTaskForm.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/components/CreateTaskForm.vue)     | Enables task creation with form validation and submission handling. Utilizes Vue 3 composition API for managing task title input and emitting events upon task addition. Interacts with preload module to create tasks in the parent repositorys renderer package. |
| [ShowAllTasks.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/components/ShowAllTasks.vue)         | Displays and manages tasks in a timeline format. Fetches tasks on mount, allows task deletion, and updates task list accordingly. Facilitates interaction with the task list by exposing a function for fetching tasks.                                            |
| [ElectronVersions.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/components/ElectronVersions.vue) | Displays Electron versions in a table sourced from the preload package. Dynamically rendering version information for each library, enhancing visibility into the Electron versions used within the Electron application.                                          |
| [WeekSwiper.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/components/WeekSwiper.vue)             | Enables interactive week navigation and selection within a Swiper component, handling slide changes, navigation events, and styling. Integrates Vue, Swiper, and custom hooks for a smooth calendar UI experience in the repositorys frontend architecture.        |
| [ReactiveCounter.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/components/ReactiveCounter.vue)   | Enables reactive counting functionality using Vues Composition API, facilitating dynamic updates in the NoTDL repositorys renderer package.                                                                                                                        |
| [MainPage.vue](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/src/components/MainPage.vue)                 | Defines main component layout with CreateTaskForm and ShowAllTasks, handling new task addition by fetching task titles asynchronously when triggered, ensuring a smooth user experience.                                                                           |

</details>

<details><summary>packages.renderer.types</summary>

| File                                                                                                                         | Summary                                                                                                                                                                                                                                    |
|------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [shims-vue.d.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/types/shims-vue.d.ts)                 | Enables Vue single-file components in the renderer package. Declares a module for Vue files, defining a component with unspecified props, emits, and slots using Vue 3s DefineComponent.                                                   |
| [global-components.d.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/renderer/types/global-components.d.ts) | Defines global components interface for tasks API required by the parent repository. The file specifies functions to get all tasks, task titles, and create tasks, linking to task-related types for static type checking in the codebase. |

</details>

<details><summary>packages.preload</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                                                    |
|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [vite.config.js](https://github.com/ttpss930141011/NoTDL/blob/master/packages/preload/vite.config.js) | Enhance Electron app performance and maintainability.                                                                                                                                                                                                      |
| [tsconfig.json](https://github.com/ttpss930141011/NoTDL/blob/master/packages/preload/tsconfig.json)   | Defines TypeScript compiler options for preloaded scripts, allowing synthetic default imports, enforcing strict type checking and ESNext modules. Excludes test files and specifies path mappings for source files in the parent repositorys architecture. |

</details>

<details><summary>packages.preload.src</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                                                                |
|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [tasks.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/preload/src/tasks.ts)           | Handles IPC requests for task data using Electrons ipcRenderer, abstracting getAllTasks, getAllTaskTitles, createTask, and deleteTask operations. The file aids in communication between the preload process and the main process within the repositorys architecture. |
| [versions.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/preload/src/versions.ts)     | Facilitates access to Node.js process versions. Centralizes version information for efficient retrieval within the parent repositorys preload package. Enhances performance by streamlining version management across different components.                            |
| [nodeCrypto.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/preload/src/nodeCrypto.ts) | Computes SHA-256 hash using Node.js crypto module for data input, optimizing security and integrity checks within the preload package.                                                                                                                                 |
| [index.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/preload/src/index.ts)           | Provides preload module functionalities for tasks, versions, and cryptographic operations. Exposes task-related requests for fetching, creating, and deleting tasks. Implemented within the parent repositorys architecture for Electron app functionality.            |

</details>

<details><summary>packages.preload.src.types</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                                                                            |
|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [task.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/preload/src/types/task.d.ts) | Defines task structure with id, title, priority, mental load, completion status, creation and update timestamps. Exports functions for retrieving all tasks, task titles, and creating tasks. Aligns with parent repositorys architecture for managing tasks in a preload package. |

</details>

<details><summary>packages.main</summary>

| File                                                                                               | Summary                                                                                                                                                                                                         |
|----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [vite.config.js](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/vite.config.js) | Sets root, resolves aliases, enables SSR, targets Node.js, manages outputs, and optimizes for production.                                                                                                       |
| [tsconfig.json](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/tsconfig.json)   | Defines TypeScript compiler options for the main package to support modern ESNext syntax and Node resolution. Ensures strict type checking and enables decorators, while excluding test files from compilation. |

</details>

<details><summary>packages.main.src</summary>

| File                                                                                                                       | Summary                                                                                                                                                                                                                                                  |
|----------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [security-restrictions.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/src/security-restrictions.ts) | Restricts navigation to approved origins, handles permission requests, opens approved external links in a browser, and verifies webview options. Mitigates common navigation exploits and restricts window creation for enhanced security.               |
| [mainWindow.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/src/mainWindow.ts)                       | Implements main window creation, data source initialization, IPC event handling, and window restoration in the Electron app. Manages window settings, loads content, and interacts with backend services using IPC.                                      |
| [index.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/src/index.ts)                                 | Manages single instance, window behavior, IPC communication, and automatic updates. Disables hardware acceleration for resource optimization, and initializes app window on readiness. Ensures update checks and installations only in production build. |

</details>

<details><summary>packages.main.src.services</summary>

| File                                                                                                | Summary                                                                                                                                                                                                |
|-----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [index.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/src/services/index.ts) | Retrieves all tasks with titles, creates a task, and deletes a task. Utilizes the TaskRepo for database operations. Promotes modularity and separation of concerns within the repository architecture. |

</details>

<details><summary>packages.main.src.types</summary>

| File                                                                                               | Summary                                                                                                                                        |
|----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| [task.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/src/types/task.d.ts) | Fetching all tasks, task titles, and creating a task. This file contributes to managing tasks within the main package of the NoTDL repository. |

</details>

<details><summary>packages.main.src.database</summary>

| File                                                                                                | Summary                                                                                                                                                                                                                     |
|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [index.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/src/database/index.ts) | Enables centralized database management for NoTDL through TypeORM with SQLite, ensuring data integrity and persistence. Introduces tasks entity and sets up datasource for efficient data handling within the main package. |

</details>

<details><summary>packages.main.src.database.entity</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                    |
|----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Task.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/src/database/entity/Task.ts) | Defines Task entity properties for the ORM. Manages task details such as title, priority, mental load, completion status, and timestamps. Key component of the database structure for task management in the main package. |

</details>

<details><summary>packages.main.src.database.repository</summary>

| File                                                                                                                   | Summary                                                                                                                                                                                                        |
|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [TasksRepo.ts](https://github.com/ttpss930141011/NoTDL/blob/master/packages/main/src/database/repository/TasksRepo.ts) | Fetching all tasks and task titles, creating a new task, and deleting a task. Utilizes the Task entity and datasource for seamless interaction with the database in the main packages repository architecture. |

</details>

<details><summary>types</summary>

| File                                                                           | Summary                                                                                                                                                                                                                                                                |
|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [env.d.ts](https://github.com/ttpss930141011/NoTDL/blob/master/types/env.d.ts) | Defines environment variables for the project. Ensures type safety and IntelliSense support. Limits exposure to only certain prefixed variables for security. Enhances code completion and type checking. Contributing to a reliable and secure codebase architecture. |

</details>

<details><summary>scripts</summary>

| File                                                                                                                 | Summary                                                                                                                                                                                                                                                                      |
|----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [update-electron-vendors.js](https://github.com/ttpss930141011/NoTDL/blob/master/scripts/update-electron-vendors.js) | Generates Electron vendor data and updates browserslist configuration to align with Electrons versions. Written for NoTDL repos electron context, enriching project build processes.                                                                                         |
| [watch.js](https://github.com/ttpss930141011/NoTDL/blob/master/scripts/watch.js)                                     | Enables automatic reloading of Electron app and web page on file changes. Utilizes Vite for watching `main` and `preload` package changes. Establishes development server for `renderer` package, ensuring seamless coordination between components in the NoTDL repository. |

</details>

<details><summary>.github</summary>

| File                                                                                       | Summary                                                                                                                                                                                                                    |
|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [renovate.json](https://github.com/ttpss930141011/NoTDL/blob/master/.github/renovate.json) | Defines Renovate configurations for Vite packages, enabling major updates from the Vite GitHub repository. Automates commits and pushes with semantic commit labels, pins versions, and disables the dependency dashboard. |
| [FUNDING.yml](https://github.com/ttpss930141011/NoTDL/blob/master/.github/FUNDING.yml)     | Promotes funding models via platforms Buy Me a Coffee and MonoBank, supporting project sustainability.                                                                                                                     |

</details>

<details><summary>.github.workflows</summary>

| File                                                                                                       | Summary                                                                                                                                                                                                                               |
|------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [release.yml](https://github.com/ttpss930141011/NoTDL/blob/master/.github/workflows/release.yml)           | Automates release process using GitHub Actions. Triggers on tag creation, publishes Electron app artifacts, updates release notes, and notifies contributors. Enhances project automation and collaboration.                          |
| [tests.yml](https://github.com/ttpss930141011/NoTDL/blob/master/.github/workflows/tests.yml)               | Verifies, executes, and reports test results for the NoTDL repository. Implements automated testing workflows for ensuring code quality and reliability within the projects architecture.                                             |
| [ci.yml](https://github.com/ttpss930141011/NoTDL/blob/master/.github/workflows/ci.yml)                     | Enables automated continuous integration (CI) workflows for the repository. Sets up linting, testing, and building pipelines to ensure code quality and functionality. Key for maintaining project health and developer productivity. |
| [lint.yml](https://github.com/ttpss930141011/NoTDL/blob/master/.github/workflows/lint.yml)                 | Ensures consistent code quality by running linting checks in CI workflow. Facilitates early detection of errors and enforces coding standards across the project.                                                                     |
| [typechecking.yml](https://github.com/ttpss930141011/NoTDL/blob/master/.github/workflows/typechecking.yml) | Enables automated type checking for the repository, ensuring code integrity. Incorporates TypeScript checking across project files, aiding in the early detection and prevention of potential type-related issues in the codebase.    |

</details>

<details><summary>.github.ISSUE_TEMPLATE</summary>

| File                                                                                                | Summary                                                                                                                                                                                             |
|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [config.yml](https://github.com/ttpss930141011/NoTDL/blob/master/.github/ISSUE_TEMPLATE/config.yml) | Facilitates GitHub issue customization by disabling blank issue creation and providing a predefined contact link for inquiries and discussions within the repositorys issue template configuration. |

</details>

## Getting Started

### Installation

<h4>From <code>source</code></h4>

> 1. Clone the NoTDL repository:
>
> ```console
> $ git clone https://github.com/ttpss930141011/NoTDL
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd NoTDL
> ```
>
> 3. Install the dependencies:
> ```console
> $ npm install
> ```

### Usage

<h4>From <code>source</code></h4>

> Run NoTDL using the command below:
> ```console
> $ npm run build && node dist/main.js
> ```

<h4>From <code>development</code></h4>

> Run NoTDL using the command below:
> ```console
> $ npm run watch
> ```
>

### Tests

> Run the test suite using the command below:
> ```console
> $ npm test
> ```

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/ttpss930141011/NoTDL/issues)**: Submit bugs found or log feature requests for
  the `NoTDL` project.
- **[Submit Pull Requests](https://github.com/ttpss930141011/NoTDL/blob/main/CONTRIBUTING.md)**: Review open PRs, and
  submit your own PRs.
- **[Join the Discussions](https://github.com/ttpss930141011/NoTDL/discussions)**: Share your insights, provide
  feedback, or ask questions.

<details>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/ttpss930141011/NoTDL
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and
   their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your
   contribution!

</details>

<details>
<summary>Contributor Graph</summary>
<br>
<p style="text-align: center;">
   <a href="https://github.com{/ttpss930141011/NoTDL/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=ttpss930141011/NoTDL" alt="Contributor Graph" />
   </a>
</p>
</details>

## License

This project is protected under the [MIT License](LICENSE). For more details, refer to
the [LICENSE](https://choosealicense.com/licenses/) file.

---

