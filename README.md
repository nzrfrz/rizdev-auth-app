## Auth app backend with NodeJS Typescript, Express, React deploy on Vercel.
[Live App](https://rizdev-auth-app.vercel.app/), Frontend part [here...](https://github.com/nzrfrz/auth-app-frontend)


### Specification
1. Cookie credential for login and access API.
2. No duplicate login.
3. User role ROOT | ADMIN | ENDUSER
    - ROOT user can edit, delete ADMIN and ENDUSER user role.
    - ADMIN user can edit, delete ENDUSER user role.
4. Send activation and reset password link to user email.
5. Link in email with expiration time.
6. Authentication using access and refresh token inside http only cookie.