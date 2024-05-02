'use client'
import { useEffect, useState } from 'react';
import { getAuthenticatedUser, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'
import axios from 'axios';
import { CreateCheckoutResponse } from '@/types/subscribe';
import supabase from '@/src/lib/supabase';
import AuthForm from '@/src/components/auth-form';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/router';
import { cookies } from 'next/headers'
 
export default function Page() {
  // const cookieStore = cookies()
  // const value = cookieStore.getAll().map((cookie) => {
  //   const regex = /[\w-]+-auth-token$/;
  //   if(regex.test(cookie.name)){
  //     return cookie.value;
  //   }
  // })
  // console.log(value)
  // const valueString = String(value);
  // const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
  // const match = valueString.match(emailRegex);
  // console.log(match ? `Email found: ${match[0]}` : "No email found.");

  // return cookieStore.getAll().map((cookie) => (
  //   <div key={cookie.name}>
  //     <p>Name: {cookie.name}</p>
  //     <p>Value: {cookie.value}</p>
  //   </div>
  // ))
  const [response, setResponse] = useState('');
  const handle = () => {
    fetch('https://r.jina.ai/https://bookmarkbot.fun', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())  // Convert the response to JSON
    .then(data => {
      console.log(data);
      setResponse(JSON.stringify(data, null, 2));  // Display formatted JSON
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setResponse('Failed to fetch data');
    });
  };

  return (
    <div>
      <button onClick={handle}>Test API</button>
      <pre>{response}</pre>
    </div>
  );
}
// export default TestSWR;

// export default function SubscribePage() {
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState(null);

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
