// pages/privacy.js

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from "@/src/components/Navbar";

const PrivacyPolicy = () => {
    return (
        <main>
            <Navbar />
            <div className="container flex w-screen flex-col justify-center">
            <ReactMarkdown>{privacyContent}</ReactMarkdown>
            </div>
            

        </main>
    );
};

const privacyContent = `

# **Privacy Policy**

Updated on: February 1st, 2024



Welcome to our Chrome extension! Your privacy is critically important to us. This privacy policy outlines how we collect, use, and share information when you use our Chrome extension.

## **Data Collection and Usage**

1. **Usage Information**: We collect non-personally identifiable information related to your usage of our extension such as how frequently you use the extension and which features are utilized. This data helps us improve functionality and user experience.
   
2. **Account Information**: When you create an account within our extension, we require your email address to serve as your unique identifier and login name. This is also used for password recovery purposes.
   
3. **Location Information**: We collect information about your country or region, derived from your IP address, to tailor our services to your geographical context.

4. **Analytics**: We use Google Analytics to gather aggregated, anonymized data that helps us understand how our extension is used without identifying individual users.

## **Data Sharing**

1. **Service Providers**: Your data may be shared with trusted third-party service providers as necessary for them to perform services on our behalf, such as hosting services or customer support, under strict confidentiality agreements.
   
2. **Legal Requirements**: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).

3. **No Sale of Data**: We do not sell or rent your personal data to third parties for their marketing purposes.

## **Automatic Bookmark Management**

Our extension automatically organizes and categorizes your bookmarks using AI. This process involves parsing the content of web pages you bookmark to determine their relevance and categorization. All data handling is designed to respect your privacy and is conducted under strict data security protocols.

## **Data Deletion**

You can request the deletion of your data at any time by contacting us at zy892065502@gmail.com. We will address such requests on a case-by-case basis. We retain personal data as long as necessary for our legitimate business interests, such as fraud detection and prevention and legal compliance.

## **Consent**

By using our Chrome extension, you consent to the collection, use, and sharing of your information as described in this privacy policy.

## **Contact Us**

If you have any questions about this privacy policy, please feel free to contact us at zy892065502@gmail.com.

`

export default PrivacyPolicy;
