const addSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'number'],
            properties: {
                name: { type: 'string', pattern: "\\S+" }, //pattern for non empty strings
                number: { type: 'string', pattern: "^\\d+$" } //pattern for string containing only numbers
            }
        }
    }
}

const putSchema = {
    schema: {
        body: {
            allOf: [{
                type: "object",
                properties: {
                    name: { type: "string" },
                    number: { type: "string" }
                }
            },
            {
                anyOf: [{
                    properties: {
                        name: {
                            $ref: "#/definitions/nonEmptyString"
                        }
                    }, required: ["name"]
                }, {
                    properties: {
                        number: {
                            $ref: "#/definitions/nonEmptyString"
                        }
                    }, required: ["number"]
                }]
            }],
            definitions: {
                nonEmptyString: {
                    type: "string",
                    minLength: 1
                }
            }
        }
    }
}

export { addSchema, putSchema };