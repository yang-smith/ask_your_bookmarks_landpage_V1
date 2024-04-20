// app/api/payment/subscribe/route.ts

import { axios } from "@/src/lib/axios";
import { NextResponse } from "next/server";
import { Checkout } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(request: Request) {
    try {
        // const { userId } = await request.json() as { userId: string};
        // // 检查用户和variant是否存在
        // if (!userId) {
        //     return NextResponse.json({ message: "Your account was not found" }, { status: 401 });
        // }

        // 通过 API 获取购买链接
        console.log(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_HOST)
        const checkout = (await axios.post(
            `${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_HOST}/checkouts`,
            {
                data: {
                    type: "checkouts",
                    attributes: {checkout_data: { custom: { email: user.email, userId: user.id } }},
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
        console.log(checkout);

        return NextResponse.json({ checkoutURL: checkout.data.attributes.url }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message || err }, { status: 500 });
    }
}