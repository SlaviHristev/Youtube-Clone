"use client"

import { trpc } from "@/trpc/client"


export const VideosSection = () =>{

    const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery();
    return(
        <div>
            Videos Section
        </div>
    )
}