
import { useEffect, useState } from 'react';
import { getAuthenticatedUser, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'
import axios from 'axios';
import { CreateCheckoutResponse } from '@/types/subscribe';
import supabase from '@/src/lib/supabase';
import AuthForm from '@/src/components/auth-form';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { cookies } from 'next/headers'
 
export default function Page() {
  const cookieStore = cookies()
  const value = cookieStore.getAll().map((cookie) => {
    const regex = /[\w-]+-auth-token$/;
    if(regex.test(cookie.name)){
      return cookie.value;
    }
  })
  console.log(value)
  const valueString = String(value);
  const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
  const match = valueString.match(emailRegex);

  console.log(match ? `Email found: ${match[0]}` : "No email found.");
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
// export default TestSWR;

// export default function SubscribePage() {
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState(null);
//     //   const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
//     const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI5YzM3YjQwYjNkNmM0NTUyYTIzM2EwMjA4MmI0OWQzYmI0YTc5NGUxYTg5ZGNlN2U4NDIxNDU4MTdjY2IwZTZmNjk0Yzc2ODExN2UyM2VhMyIsImlhdCI6MTcxMzQ5MTk0My4wMzE2MzIsIm5iZiI6MTcxMzQ5MTk0My4wMzE2MzUsImV4cCI6MjAyOTAyNDc0My4wMDU2NDMsInN1YiI6IjIwMTIyNDUiLCJzY29wZXMiOltdfQ.qUeJkYXsb7jOzEw3ayEkhTIkZyepFEsU7AnABzRoIBZaVdzIUNmHdsr9Oam5hjZNwsbFx9Ci0ZEv643NBqFP-BkVrI9w7cHm_j1KLDzsst45fVIAIzquUcbGNgDNSh080KMvEu2e-jVl7kGpFum9Hhm67opV0CEOxDbS2196l8zG_yTwHr83-py0OylPSAY4IV2mDlEK6kNibh9WVNJx2QWQpYVCkkUZ28fbyMdG-HqUgjbQtjeXnhZvRhi-C1XnVxjYIq_pRFhZHV8Jrr0JMsnLPh7CjM9y4Q02E11V0e_sx9vrjWNQr6GKPut9W6sqcY-K8mL7AybOq6QZWdaHk04XNq2E5LvnQmPEiuUrMJOZr8LfxuD3cDg4C5j7bMtQYc6-kElRfDfkui0Qz2led3isXWy7pP4iaMfg5tIN9g4oya1PW4iAiUwaSu2wBYLVrrI8VA3Ec64ctq-BJpV5qkmPkoC09TIvuUVAoGdtvTZLwMpWLjyqF6-zoHbruC93'


//     lemonSqueezySetup({
//         apiKey,
//         onError: (error) => console.error("Error!", error),
//     });

//     const handleSubscribe = async () => {
//         console.log(apiKey);
//         setLoading(true);
//         const { data, error, statusCode } = await getAuthenticatedUser();
//         console.log(data);
//         setLoading(false);
//     };
//     const fetchSubscriptionsByEmail = async (email: string) => {
//         try {
//           const response = await axios.get(`https://api.lemonsqueezy.com/v1/subscriptions?filter[user_email]=${email}`, {
//             headers: {
//               'Accept': 'application/vnd.api+json',
//               'Content-Type': 'application/vnd.api+json',
//               'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY}`
//             }
//           });
      
//           console.log(response.data);
//         } catch (error) {
//           console.error('Error fetching subscriptions:', error);
//         }
//       };
//     const subscribe = async () => {
//         // if (!user || !user.userId) {
//         //   toast.error("Please login first");
//         //   return;
//         // }
//         // fetchSubscriptionsByEmail('test@gmail.com');
//         // return
//         try {
//             const supabase = createBrowserClient(
//                 process.env.NEXT_PUBLIC_SUPABASE_URL!,
//                 process.env.NEXT_PUBLIC_SUPABASE_KEY!)
//             const session = await supabase.auth.getSession()
//             console.log(session.data.session?.user);
//             axios.post('/api/payment/subscribe', { user: session.data.session?.user })
//             .then(response => {
//                 const checkoutURL = response.data.checkoutURL;
//                 // console.log(checkoutURL);  
//                 window.location.href = checkoutURL;
//             })
//             .catch(error => {
//                 console.error('Error fetching checkout URL:', error);
//             });

//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div>
//             <h1>Subscribe to Our Service</h1>
//             <button onClick={subscribe} disabled={loading}>
//                 {loading ? 'Subscribing...' : 'Subscribe'}
//             </button>
//             <p>{message}</p>
//             <div className="flex flex-col justify-center">
//                 <div className="mx-auto w-1/4">
//                     <AuthForm view='sign_in' />
//                 </div>
//             </div>
//         </div>

//     );
// }
