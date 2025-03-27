import { StudioView } from "@/app/modules/studio/ui/view/studio-view";
import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";

const Page = async () =>{
    void trpc.studio.getMany.prefetchInfinite({
        limit: DEFAULT_LIMIT,
    });
    return(
        <HydrateClient>
            <StudioView/>
        </HydrateClient>
    )
}

export default Page;