// app/api/payment/subscribe/route.ts

import { axios } from "@/src/lib/axios";
import { NextResponse } from "next/server";
import { Checkout } from "@lemonsqueezy/lemonsqueezy.js";
import { User } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const { user } = await request.json() as { user: User | undefined};
        // 检查用户
        console.log(user?.email);
        if (!user) {
            return NextResponse.json({ message: "Your account was not found" }, { status: 401 });
        }

        // 通过 API 获取购买链接
        console.log(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_HOST)
        const checkout = (await axios.post(
            `${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_HOST}/checkouts`,
            {
                data: {
                    type: "checkouts",
                    attributes: {
                        checkout_data: { 
                            email: user.email, 
                            custom: { email: user.email, userId: user.id } }
                    },
                    relationships: {
                        store: { data: { type: "stores", id: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID } },
                        variant: { data: { type: "variants", id: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_MEMBERSHIP_YEARLY_VARIANT_ID } },
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY}`,
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            }
        )) as Checkout;
        console.log(checkout.data.attributes.url);

        return NextResponse.json({ checkoutURL: checkout.data.attributes.url }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message || err }, { status: 500 });
    }
}