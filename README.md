__*ATTENTION: This repository is a work in progress. The live demo will be hosted soon.*__


# Onboard Clients through the Integrated Onboarding Flow

This demo project shows you how to use and configure the 360dialog Connect Button and how to consume the associated redirects, which will allow you to onboard clients through the Integrated Onboarding.

For a full documentation on the Integrated Onboarding setup visit our [Partner Documentation](https://docs.360dialog.com/partner/integration/integrated-onboarding-setup)


## Demo

[→ Access the live demo](https://integrated-onboarding-demo.vercel.app/)

When using the provided demo Partner ID, the application will use the 360dialog test environment. You can sign in as an existing client with the following credentials:

- Email: tbd
- Password: `tbd`

If you use your own Partner ID, the application will access the production environment and you can log in with your existing test client accounts or create new test accounts (speak to your account manager about the limits on test accounts).

### API key retrieval

This demo shows how to configure and use the 360dialog Connect Button for the Integrated Onboarding in order to receive a list of channel IDs (one channel equals a WhatsApp Business Profile), for which a client gave permission to retrieve the corresponding API keys on behalf. This means you as a partner will have to subsequently call the Partner API with **your partner user credentials** to retrieve API keys for the shared channels. Please note: The account credentials shared above are for a test client to log in and share a given test channel and can not be used to access the Partner API.



## How to run locally

Follow the steps below to run locally.

1. Clone the repository
```
git clone https://github.com/360dialog/integrated-onboarding-demo
```

2. Install the dependencies
```bash
npm install
# or
yarn install
```

3. Run the local development environment
```bash
npm run dev
# or
yarn dev
```

## Get support
If you want to suggest a new feature or use case please file a feature request on our [roadmap page](https://roadmap.360dialog.com) .


If you have questions, comments, or need help with code, we're here to help:
<!-- - on our community -->
- contact your account manager
