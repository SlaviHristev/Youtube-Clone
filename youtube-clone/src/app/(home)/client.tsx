"use client"

import { trpc } from "@/trpc/client"


export const PageClient = () =>{
    const [data] = trpc.hello.useSuspenseQuery({
        text: "Slavi"
    });

    
    return(
        <div>
            Page says: {data.greeting}
        </div>

    )
}