import { ResponsiveModal } from "@/components/responsive-modal";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ThumbnailGenerateModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  prompt: z.string().min(10),
});

export const ThumbnailGenerateModal = ({
  videoId,
  open,
  onOpenChange,
}: ThumbnailGenerateModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

   const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
      onSuccess: () => {
        toast.success("Background job started", {
          description: "This may take some time",
        });
        form.reset();
        onOpenChange(false);
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    generateThumbnail.mutate({
      prompt: values.prompt,
      id: videoId
    })
    onOpenChange(false);
  };
  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col  gap-4">
          <FormField control={form.control} name="prompt" render={({field}) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" cols={30} rows={5} placeholder="Description for thumbnail"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
          />
            <div className="flex justify-end">
                <Button type="submit" disabled={generateThumbnail.isPending}>
                  Generate
                </Button>
            </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
};
