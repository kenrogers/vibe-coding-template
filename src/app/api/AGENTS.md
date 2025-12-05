# API Route Guidelines

## Input Validation
Always validate with Zod:
```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = CreateUserSchema.safeParse(body);
  
  if (!result.success) {
    return Response.json(
      { error: 'Validation failed', details: result.error.flatten() },
      { status: 400 }
    );
  }
  // Use result.data (typed!)
}
```

## Error Response Shape
```typescript
interface ErrorResponse {
  error: string;
  details?: unknown;
}
```

## HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Documentation
Add JSDoc above route handlers:
```typescript
/**
 * POST /api/users
 * Creates a new user
 * @body { email: string, name: string }
 * @returns { id: string, email: string, name: string }
 */
```
