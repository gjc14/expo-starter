# EAS

> [!IMPORTANT] If you'd like to build ios on simulator, use
> `--profile development-simulator` instead. Or you'll need a developer account
> to build for ios device

## Build

-   [› Your computer requires some additional setup before you can build onto physical iOS devices.](https://github.com/expo/fyi/blob/main/setup-xcode-signing.md)
-   [Expo Go vs Development Builds: Which should you use?](https://www.youtube.com/watch?v=FdjczjkwQKE&t=1250s)
-   [How to make a development build with EAS Build](https://www.youtube.com/watch?v=LUFHXsBcW6w)

1. Build with EAS (Takes about 10-15 minutes)
2. Follow cli and download the app to your simulator or vm
3. From now on you could `npm start` and press `s` to toggle Expo Go and
   development build

To build for devices.

```sh
eas build --profile development -p android
eas build --profile development -p ios
```

To build for simulator for ios.

```sh
eas build --profile development-simulator -p ios
```

## Submit

-   [Async Office Hours: How to quickly publish to the App Store & Play Store with EAS Submit](https://www.youtube.com/watch?v=-KZjr576tuE)

---

# Supabase

## Types

1. Make sure `SUPABASE_ACCESS_TOKEN` in `.env.local` is added
2. Run `npm run db:typegen` to generate database type from
   `EXPO_PUBLIC_SUPABASE_URL` configed in `.env`

## Auth

1. ### Define your deep linking scheme in `app.json`:
    Function to redirect from `myapp://` to your app. Usefull when using
    MagicLink.
2. ### Run SQL Editor script:
    In SQL Editor > Quickstarts > User management starter, run the script to
    **create profile table and avatar storage**, and generate **trigger** to let
    user also added to profile table while sign up. Also create **select,
    insert, update policies**.
3. ### Add redirect url to Supabase:
    In Authentication > URL Configuration section, fill in site url as web url
    (`localhost:8081`), redirect url as deep linking (`myapp://`, `myapp://**`).

---

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with
[`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
     npx expo start
    ```

In the output, you'll find options to open the app in a

-   [development build](https://docs.expo.dev/develop/development-builds/introduction/)
-   [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   [Expo Go](https://expo.dev/go), a limited sandbox for trying out app
    development with Expo

You can start developing by editing the files inside the **app** directory. This
project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and
create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following
resources:

-   [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into
    advanced topics with our [guides](https://docs.expo.dev/guides).
-   [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow
    a step-by-step tutorial where you'll create a project that runs on Android,
    iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

-   [Expo on GitHub](https://github.com/expo/expo): View our open source
    platform and contribute.
-   [Discord community](https://chat.expo.dev): Chat with Expo users and ask
    questions.
