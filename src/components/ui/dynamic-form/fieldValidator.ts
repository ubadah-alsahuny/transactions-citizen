import { z } from 'zod';

export type RequiredInitialData = {
    id: string;
    keyName: string;
    keyType: string;
    isRequired: boolean;
};

// Maps each keyType to its corresponding Zod validator with localized Arabic messages
function buildFieldSchema(field: RequiredInitialData): z.ZodTypeAny {
    const { keyType, isRequired, keyName } = field;

    const requiredMsg = `${keyName} مطلوب`;
    const invalidMsg  = `${keyName} غير صالح`;

    switch (keyType.toLowerCase()) {
        case 'phone': {
            // Accepts Libyan / international mobile phone numbers
            const base = z
                .string()
                .regex(/^(\+?964|0)?7[3-9]\d{8}$|^\+?\d{7,15}$/, invalidMsg);
            return isRequired ? base.min(1, requiredMsg) : base.optional();
        }

        case 'number': {
            const base = z
                .string()
                .regex(/^\d+(\.\d+)?$/, `${keyName} يجب أن يكون رقماً`);
            return isRequired ? base.min(1, requiredMsg) : base.optional();
        }

        case 'email': {
            const base = z.string().email(invalidMsg);
            return isRequired ? base.min(1, requiredMsg) : base.optional();
        }

        case 'boolean':
        case 'checkbox': {
            // Boolean fields are never "required" in the empty-string sense
            return z.boolean().default(false);
        }

        case 'datetime':
        case 'date-time-picker':
        case 'date': {
            const base = z
                .string()
                .refine((v) => !isNaN(Date.parse(v)), { message: invalidMsg });
            return isRequired ? base.min(1, requiredMsg) : base.optional();
        }

        case 'string':
        default: {
            const base = z.string();
            return isRequired ? base.min(1, requiredMsg) : base.optional();
        }
    }
}

/**
 * Builds a full Zod object schema from an array of dynamic field definitions.
 * Uses Object.fromEntries to stay compatible with Zod v4's readonly ZodRawShape.
 */
export function buildZodSchema(fields: RequiredInitialData[]) {
    const shape = Object.fromEntries(
        fields.map((field) => [field.keyName, buildFieldSchema(field)])
    );
    return z.object(shape);
}
