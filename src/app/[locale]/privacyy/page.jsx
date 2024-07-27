// pages/privacy.js

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from "@/src/components/Navbar";

const PrivacyPolicy = () => {
    return (
        <main>
            {/* <Navbar /> */}
            <div className="container flex w-screen flex-col justify-center">
            <ReactMarkdown>{privacyContent}</ReactMarkdown>
            </div>
            

        </main>
    );
};

const privacyContent = `

# **Privacy Policy**

Updated on: July 27, 2024

Welcome to BookMark Organizer! Your privacy is critically important to us. This privacy policy outlines how we collect, use, and share information when you use our BookMark Organizer Chrome extension.

## **Data Collection and Usage**

1. **Bookmark Data**: We collect and analyze bookmark data, including the titles and URLs of your bookmarks. This information is exclusively used to automatically categorize your bookmarks into different folders using AI.

2. **Usage Information**: We collect anonymized, non-personally identifiable information related to your usage of our extension, such as frequency of use and features utilized. This data helps us improve functionality and user experience.

3. **Analytics**: We use anonymized, aggregated data for internal analytics to understand how our extension is used, helping us enhance our services.

## **User Control and Data Security**

1. **User Control**: You have full control over your data. You can disable the extension at any time, which stops all data processing activities.

2. **Data Security**: We implement appropriate security measures to protect your data against unauthorized access, disclosure, alteration, or destruction.

## **Data Sharing**

1. **Service Providers**: We will not share your data.

2. **Legal Requirements**: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).

3. **No Sale of Data**: We do not sell or rent your personal data to third parties for their marketing purposes.

## **Data Deletion**

You can request the deletion of your data at any time by contacting us at zy892065502@gmail.com. We will address such requests on a case-by-case basis. We retain personal data as long as necessary for our legitimate business interests, such as fraud detection and prevention and legal compliance.

## **Consent**

By using our BookMark Organizer Chrome extension, you consent to the collection, use, and sharing of your information as described in this privacy policy.

## **Contact Us**

If you have any questions about this privacy policy, please feel free to contact us at zy892065502@gmail.com.

`

export default PrivacyPolicy;
