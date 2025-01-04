# React Email Microservice

A simple microservice template created to use the [react-email](https://github.com/resend/react-email) package. It has
same examples as "[create-email](https://www.npmjs.com/package/create-email)" (react-email) and the following features
have been added.

-   [express](https://github.com/expressjs/express) implementation
-   [rollup plugin](./rollup/plugin-clone-static-files.ts) for static file versioning

## Commands

List of available commands.

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Start the dev server.                          |
| `npm run build` | Build the production server with static files. |
| `npm run start` | Run the production server.                     |

## Example Usage

After build you can send component properties to the `[POST] http://localhost:3000/:template` endpoint as a JSON body.
For example:

```bash
curl \
    --request POST \
    --url http://localhost:3000/notion-magic-link \
    --header 'Content-Type: application/json' \
    --data '{"loginCode":"sparo-ndigo-amurt-secan"}'
```

Response will be something like that:

```json
{
    "message": "SUCCESS",
    "body": {
        "html": "...",
        "text": "..."
    }
}
```

## TODOs

-   [ ] `zod` implementation for request payloads
-   [ ] automatic template/file discovery for express side
-   [ ] move core functions/files into a package
