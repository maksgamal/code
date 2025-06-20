flowchart TD
    LP[Landing Page] --> SU[Sign Up Sign In]
    SU --> EV[Email Verification]
    EV --> OW[Onboarding Wizard]
    OW --> DB[Dashboard]
    DB --> PL[Prospect Leads]
    DB --> LM[List Management]
    DB --> BS[Billing Subscription]
    DB --> ST[Settings]
    PL --> SF[Search Filters]
    SF --> CP[Contact Profile]
    CP --> DC{Sufficient Credits}
    DC -->|Yes| UN[Unlock Data]
    UN --> HC[Update Credit Log]
    HC --> CP
    DC -->|No| LA[Low Credit Warning]
    LM --> CL[Create Or Rename List]
    LM --> SH[Share Team List]
    LM --> EX[Export CSV XML]
    BS --> VP[View Subscription Plans]
    VP --> SC[Stripe Checkout]
    SC --> DB
    ST --> PR[Profile Management]
    ST --> NP[Notification Settings]