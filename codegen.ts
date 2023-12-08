import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
    schema: "https://beta.pokeapi.co/graphql/v1beta",
    documents: ["src/**/*.{ts,tsx}"],
    generates: {
        "./src/__generated__/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
}

export default config
