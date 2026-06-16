auth workfloe->

client ----> request to a route --> validate token and attach user
obect in req by jwt auth guard ---> roles guard check if the role is correct and matched with required role--> id yes allowto controller




Client Request
      │
      ▼
Middleware
      │
      ▼
Guards
   ├── AuthGuard
   └── RoleGuard
      │
      ▼
Interceptors (Before)
      │
      ▼
Pipes (Validation/Transformation)
      │
      ▼
Controller
      │
      ▼
Provider / Service
      │
      ▼
Interceptors (After)
      │
      ▼
Exception Filters (if error)
      │
      ▼
Response


the flow must be this